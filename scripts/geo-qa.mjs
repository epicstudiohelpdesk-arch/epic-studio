#!/usr/bin/env node
/**
 * GEO QA gate.
 *
 * Usage:
 *   node scripts/geo-qa.mjs
 *   BASE_URL=https://www.epic-studio.in node scripts/geo-qa.mjs
 *
 * Checks the things answer engines actually consume: canonical URLs, titles,
 * descriptions, a single H1, parseable JSON-LD, FAQ parity, llms.txt,
 * robots access for AI agents, sitemap hygiene and internal link health.
 */

const BASE = (process.env.BASE_URL || "http://127.0.0.1:3100").replace(/\/+$/, "");
const ORIGIN = (process.env.SITE_ORIGIN || "https://www.epic-studio.in").replace(/\/+$/, "");
const failures = [];
const warnings = [];
const checked = [];

function fail(page, message) {
  failures.push(`${page}: ${message}`);
}

function warn(page, message) {
  warnings.push(`${page}: ${message}`);
}

function stripTags(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function decodeEntities(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'");
}

async function get(path, init) {
  const res = await fetch(`${BASE}${path}`, { redirect: "follow", ...init });
  const body = await res.text();
  return { res, body };
}

function findJsonLd(html) {
  const blocks = [];
  const re = /<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = re.exec(html))) {
    try {
      blocks.push(JSON.parse(match[1]));
    } catch (error) {
      blocks.push({ __error: String(error), __raw: match[1].slice(0, 200) });
    }
  }
  return blocks;
}

function hasKey(node, key) {
  if (!node || typeof node !== "object") return false;
  if (Array.isArray(node)) return node.some((item) => hasKey(item, key));
  if (key in node) return true;
  return Object.values(node).some((value) => hasKey(value, key));
}

function flattenTypes(blocks) {
  const types = new Set();
  const walk = (node) => {
    if (!node || typeof node !== "object") return;
    if (Array.isArray(node)) {
      node.forEach(walk);
      return;
    }
    const type = node["@type"];
    if (typeof type === "string") types.add(type);
    if (Array.isArray(type)) type.forEach((t) => types.add(t));
    Object.values(node).forEach(walk);
  };
  blocks.forEach(walk);
  return types;
}

async function checkPage(path) {
  const { res, body } = await get(path);
  checked.push(path);

  if (res.status !== 200) {
    fail(path, `expected 200, got ${res.status}`);
    return null;
  }

  const html = body;
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? decodeEntities(stripTags(titleMatch[1])) : "";
  const descMatch = html.match(
    /<meta[^>]+name="description"[^>]+content="([^"]*)"/i
  );
  const description = descMatch ? decodeEntities(descMatch[1]) : "";
  const canonicalMatch = html.match(
    /<link[^>]+rel="canonical"[^>]+href="([^"]*)"/i
  );
  const canonical = canonicalMatch ? decodeEntities(canonicalMatch[1]) : "";

  if (!title) fail(path, "missing <title>");
  else if (title.length > 75) warn(path, `title is ${title.length} chars`);

  if (!description) fail(path, "missing meta description");
  else if (description.length < 70 || description.length > 185)
    warn(path, `description is ${description.length} chars`);

  const expected = path === "/" ? ORIGIN : `${ORIGIN}${path}`;
  if (!canonical) fail(path, "missing canonical");
  else if (canonical !== expected)
    fail(path, `canonical mismatch: ${canonical} !== ${expected}`);

  const h1s = html.match(/<h1[\s>]/gi) || [];
  if (h1s.length !== 1) fail(path, `expected exactly 1 h1, found ${h1s.length}`);

  if (/https:\/\/epic\.studio(?![-.])/i.test(html)) {
    fail(path, "contains legacy epic.studio URL");
  }

  const blocks = findJsonLd(html);
  if (blocks.length === 0) fail(path, "no JSON-LD blocks");
  const broken = blocks.filter((b) => b.__error);
  broken.forEach((b) => fail(path, `invalid JSON-LD: ${b.__error}`));

  const types = flattenTypes(blocks);
  if (!types.has("Organization")) fail(path, "JSON-LD missing Organization");
  if (!types.has("WebPage") && !types.has("AboutPage") && !types.has("CollectionPage") && !types.has("FAQPage"))
    fail(path, "JSON-LD missing page node");

  const text = stripTags(html);
  if (text.length < 500) fail(path, "visible text too thin (<500 chars)");

  // Every FAQ schema question must exist in the visible copy.
  if (types.has("FAQPage")) {
    const questions = [];
    const walk = (node) => {
      if (!node || typeof node !== "object") return;
      if (Array.isArray(node)) return node.forEach(walk);
      if (node["@type"] === "Question" && typeof node.name === "string") {
        questions.push(node.name);
      }
      Object.values(node).forEach(walk);
    };
    blocks.forEach(walk);
    questions.forEach((question) => {
      if (!text.includes(question)) {
        fail(path, `FAQ schema question not visible: "${question}"`);
      }
    });
  }

  return { path, html, text, types, title, description, canonical };
}

async function main() {
  console.log(`GEO QA against ${BASE}\n`);

  // ---- infrastructure -------------------------------------------------
  const robots = await get("/robots.txt");
  if (robots.res.status !== 200) fail("/robots.txt", `status ${robots.res.status}`);
  for (const agent of [
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "ClaudeBot",
    "PerplexityBot",
    "Google-Extended",
    "Applebot-Extended",
    "CCBot",
  ]) {
    if (!robots.body.includes(agent)) fail("/robots.txt", `missing ${agent}`);
  }
  if (!robots.body.includes(`${ORIGIN}/sitemap.xml`))
    fail("/robots.txt", "sitemap does not use canonical origin");

  const sitemap = await get("/sitemap.xml");
  if (sitemap.res.status !== 200) fail("/sitemap.xml", `status ${sitemap.res.status}`);
  if (sitemap.body.includes("#"))
    fail("/sitemap.xml", "contains fragment URLs");
  const locs = [...sitemap.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (locs.length < 10) fail("/sitemap.xml", `only ${locs.length} URLs`);
  locs.forEach((loc) => {
    if (!loc.startsWith(ORIGIN)) fail("/sitemap.xml", `non-canonical URL ${loc}`);
  });

  const llms = await get("/llms.txt");
  if (llms.res.status !== 200) fail("/llms.txt", `status ${llms.res.status}`);
  if (!/text\/plain/.test(llms.res.headers.get("content-type") || ""))
    warn("/llms.txt", "content-type is not text/plain");
  for (const slug of [
    "software-engineering",
    "mobile-app-development",
    "ai-automation",
    "ui-ux-design",
    "govtech",
    "video-production",
  ]) {
    if (!llms.body.includes(`/services/${slug}`))
      fail("/llms.txt", `missing /services/${slug}`);
  }
  for (const slug of [
    "united-states",
    "united-kingdom",
    "europe",
    "uae-dubai",
    "singapore",
    "india",
  ]) {
    if (!llms.body.includes(`/locations/${slug}`))
      fail("/llms.txt", `missing /locations/${slug}`);
  }
  if (!llms.body.includes("Canonical URL:")) fail("/llms.txt", "missing canonical line");

  const llmsFull = await get("/llms-full.txt");
  if (llmsFull.res.status !== 200)
    fail("/llms-full.txt", `status ${llmsFull.res.status}`);

  const og = await fetch(`${BASE}/assets/mid.png`);
  if (og.status !== 200) fail("/assets/mid.png", `status ${og.status}`);

  // ---- page-level checks ---------------------------------------------
  const paths = locs.map((loc) => loc.replace(ORIGIN, "") || "/");
  const pages = [];
  for (const path of paths) {
    const page = await checkPage(path);
    if (page) pages.push(page);
  }

  // Regional hreflang + areaServed checks.
  const REGION_HREFLANG = {
    "united-states": "en-US",
    "united-kingdom": "en-GB",
    europe: "en-DE",
    "uae-dubai": "en-AE",
    singapore: "en-SG",
    india: "en-IN",
  };
  const allHreflang = ["en-US", "en-GB", "en-AE", "en-DE", "en-SG", "en-IN", "x-default"];

  for (const [slug, primary] of Object.entries(REGION_HREFLANG)) {
    const path = `/locations/${slug}`;
    const page = pages.find((p) => p.path === path);
    if (!page) {
      fail(path, "region page missing from sitemap");
      continue;
    }
    if (!new RegExp(`hreflang="${primary}"`, "i").test(page.html))
      fail(path, `missing hreflang=${primary}`);
    for (const code of allHreflang) {
      if (!new RegExp(`hreflang="${code}"`, "i").test(page.html))
        fail(path, `missing hreflang=${code}`);
    }
    const blocks = findJsonLd(page.html);
    if (!hasKey(blocks, "areaServed"))
      fail(path, "JSON-LD missing areaServed");
  }

  const locationsHub = pages.find((p) => p.path === "/locations");
  if (!locationsHub) fail("/locations", "missing from sitemap");
  else if (!locationsHub.types.has("CollectionPage"))
    fail("/locations", "missing CollectionPage schema");

  // FAQ parity: the homepage and FAQ page must expose visible Q&A text.
  for (const path of ["/", "/faq", "/services/software-engineering", "/work/omniflow-ai"]) {
    const page = pages.find((p) => p.path === path);
    if (!page) continue;
    if (!page.types.has("FAQPage")) fail(path, "missing FAQPage schema");
    if (!/What is EPIC STUDIO\?|What does Omniflow AI do\?|What kind of software/.test(page.text))
      fail(path, "FAQ schema has no matching visible question");
  }

  // Internal link health (same-origin only, deduplicated).
  const links = new Set();
  for (const page of pages) {
    const hrefs = [...page.html.matchAll(/href="(\/[^"#?]*)/g)].map((m) => m[1]);
    hrefs.forEach((href) => links.add(href));
  }
  for (const href of [...links].sort()) {
    if (href.startsWith("/_next") || href.startsWith("/assets") || href.endsWith(".png") || href.endsWith(".webp") || href.endsWith(".ico") || href.endsWith(".txt") || href.endsWith(".xml")) continue;
    const res = await fetch(`${BASE}${href}`, { method: "GET", redirect: "manual" });
    if (res.status >= 400) fail(href, `internal link returned ${res.status}`);
  }

  // ---- report ---------------------------------------------------------
  console.log(`Pages checked: ${checked.length}`);
  console.log(`Internal links checked: ${links.size}`);
  console.log(`Failures: ${failures.length}`);
  console.log(`Warnings: ${warnings.length}`);

  if (warnings.length) {
    console.log("\nWarnings");
    warnings.forEach((w) => console.log(`  ~ ${w}`));
  }
  if (failures.length) {
    console.log("\nFailures");
    failures.forEach((f) => console.log(`  ✗ ${f}`));
    process.exit(1);
  }
  console.log("\n✓ GEO QA passed");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
