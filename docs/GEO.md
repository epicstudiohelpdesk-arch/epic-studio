# EPIC STUDIO — GEO Implementation & Operating Manual

**Scope:** epic-studio.in  
**Canonical origin:** https://www.epic-studio.in  
**Last reviewed:** 2026-10-23  
**Owner:** EPIC STUDIO (engineering + content)

This document records what Generative Engine Optimization (GEO) was implemented, why, how it is verified, and what still requires human evidence. GEO here means one thing: **making EPIC STUDIO the most quotable, verifiable source in AI-generated answers about the studio and its services.**

---

## 1. Audit: defects found on the live site

These were verified against `https://www.epic-studio.in` before changes:

| # | Defect | Impact | Severity |
|---|--------|--------|----------|
| 1 | Canonical pointed to `https://epic.studio` — a different domain from the live host | Answer engines saw a cross-domain canonical and could drop or misattribute the site | Critical |
| 2 | `sitemap.xml` listed fragment URLs (`/#capabilities`, `/#ai`) | Invalid sitemap entries; weak crawl signal | High |
| 3 | `robots.txt` did not name AI crawlers and advertised a sitemap on the wrong domain | Ambiguous AI access policy; broken sitemap discovery | High |
| 4 | Schema advertised a **4.9 rating / 500 reviews** with invented reviewer names and no visible reviews | Spam risk and entity-trust damage; review markup without on-page reviews violates Google policy | Critical |
| 5 | Schema placed the organisation at **548 Market St, San Francisco**, while the contact page and footer place the studio in **Kolkata/Baruipur, West Bengal** | Entity resolution conflict; LLMs cannot decide where the company is | Critical |
| 6 | `sameAs` pointed at `linkedin.com` and `instagram.com` homepages, not EPIC STUDIO profiles | Broken entity links are worse than no links | High |
| 7 | No `llms.txt` | No curated, machine-readable entity brief for retrieval systems | Medium |
| 8 | All services lived as accordion sections on one URL; no crawlable service pages | Nothing specific to cite for "enterprise software studio in India" style prompts | Critical |
| 9 | Case-study links pointed to non-existent anchors (`#case-study-wb-edu`) | Dead evidence paths; no citable case-study pages | High |
| 10 | A global `<h1>` in the splash screen on every page, plus a decorative duplicate `<h1>` in the hero | Ambiguous page topic; accessibility issue | Medium |
| 11 | Multiple `H1`s, placeholder `href="#"`, `+1 (555) 123-4567`, and generic social links | Machine-readable trust and consistency failures | High |
| 12 | No visible FAQ content, yet FAQ schema existed in the layout | Structured data not backed by page copy | High |
| 13 | Zoom disabled (`maximumScale: 1`, `userScalable: false`) | WCAG failure; hurts UX and quality signals | Medium |

---

## 2. What was implemented

### 2.1 Canonical entity layer

`src/lib/site.ts` is the single source of truth for:

- Canonical origin (`https://www.epic-studio.in`)
- Legal/trading name, founding date, description, slogan
- Headquarters (Kolkata, West Bengal, India) and published client hubs
- Primary email and phone numbers
- Logo, OG image, map URL
- `knowsAbout` topics and the six disciplines
- `sameAs` — intentionally empty until real profile URLs exist

No URL, phone number or location should be hard-coded outside this file.

### 2.2 Structured data (JSON-LD)

`src/lib/schema.ts` builds a connected `@graph`:

- `Organization` + `ProfessionalService` with `@id`, address, contact points, `knowsAbout`, `hasOfferCatalog`, `hasMap`
- `WebSite`
- `WebPage` / `AboutPage` / `CollectionPage` / `FAQPage` per route
- `BreadcrumbList` per route
- `Service` per service page, with deliverables as an offer catalog
- `Article` per case study
- `FAQPage` whose `Question`/`Answer` strings are imported from the same data that renders the visible FAQ

Deliberately removed: `aggregateRating`, `review`, vague `award` strings, generic `sameAs`, and the fake `SearchAction` (`/?q=`) because no search-results URL exists.

### 2.3 New crawlable surfaces

| Route | Purpose |
|-------|---------|
| `/services` | Service index and entity overview |
| `/services/software-engineering` | Enterprise software, SaaS, APIs, microservices |
| `/services/mobile-app-development` | iOS, Android, React Native, Flutter |
| `/services/ai-automation` | LLM systems, RAG, evaluation, cloud DevOps |
| `/services/ui-ux-design` | Product UX, design systems, brand |
| `/services/govtech` | Digital public infrastructure, citizen portals |
| `/services/video-production` | Brand video, motion, post-production |
| `/work` | Case-study index |
| `/work/west-bengal-education-platform` | GovTech case study |
| `/work/omniflow-ai` | AI orchestration case study |
| `/work/kairo-mobile` | Fintech mobile case study |
| `/about` | Canonical entity facts and operating model |
| `/faq` | 14-question studio FAQ with FAQ schema |
| `/locations` | International coverage hub |
| `/locations/united-states`, `united-kingdom`, `europe`, `uae-dubai`, `singapore`, `india` | Region-targeted pages with hreflang, compliance and time-zone context |
| `/llms.txt` | Curated entity brief for AI systems |
| `/llms-full.txt` | Expanded plain-text corpus for retrieval |

Every page includes: one `H1`, answer-first lead, definition block, fact table, visible FAQ, primary-source references, "last reviewed" date, and a contact CTA.

### 2.4 Technical GEO layer

- `robots.txt` explicitly allows GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Google-Extended, Applebot-Extended, CCBot and others.
- `sitemap.xml` contains only canonical 200-status URLs, with real `lastModified` values.
- Per-page canonical, Open Graph, Twitter card and robots directives.
- Legacy `epic.studio` in `NEXT_PUBLIC_SITE_URL` is normalised to the real origin at build time.
- One `H1` per page; splash screen and decorative hero outline no longer emit `H1`.
- Text zoom re-enabled (`maximumScale: 5`, `userScalable: true`).
- `llms.txt` linked from `<head>` via `<link rel="alternate" type="text/plain">`.

### 2.5 Content standard (the GEO template)

Every commercial page must answer, in this order:

1. **What is it?** — a 2–3 sentence answer that can be quoted verbatim.
2. **Who is it for?** — concrete buyer situations, not adjectives.
3. **What do you get?** — named deliverables.
4. **How does it run?** — numbered process with decision points.
5. **What proof exists?** — case study, stack, standards.
6. **What are the objections?** — 5–6 FAQs with self-contained answers.
7. **Where is the evidence?** — links to primary sources (W3C, NIST, OWASP, Apple, Google, etc.).
8. **When was it reviewed?** — visible date, matching `dateModified`.

Rules:

- Lead with the answer; never bury it under brand throat-clearing.
- One idea per paragraph; 2–4 sentence paragraphs.
- Use tables for entity facts, comparisons and metrics.
- Every number must be either (a) sourced, (b) labelled studio-reported, or (c) removed.
- No `aggregateRating`, `review`, `award` or `sameAs` markup without visible, verifiable evidence.
- Internal links use descriptive anchors; no `href="#"` in new content.

---

## 3. Verification gate

Run the automated GEO QA against a local production build:

```bash
npm run build
npx next start -H 127.0.0.1 -p 3100
node scripts/geo-qa.mjs
```

Against production:

```bash
BASE_URL=https://www.epic-studio.in SITE_ORIGIN=https://www.epic-studio.in node scripts/geo-qa.mjs
```

The gate checks:

- 200 status for every sitemap URL
- One `H1` per page
- Title, meta description, canonical
- JSON-LD parses; `Organization` and a page node exist
- FAQ schema question matches visible text
- `llms.txt` and `llms-full.txt` exist and list all services
- `robots.txt` names AI crawlers and uses the canonical sitemap
- No fragment URLs in the sitemap
- No legacy `epic.studio` URLs in HTML
- Internal links resolve
- OG image returns 200

Current result: **23 pages, 61 internal links, 0 failures, 0 warnings.**

Manual checks still required:

- [Rich Results Test](https://search.google.com/test/rich-results) for `/`, `/faq`, `/services/software-engineering`
- [Schema Markup Validator](https://validator.schema.org/)
- Google Search Console: submit the sitemap; inspect `/services` and one case study
- Bing Webmaster Tools: submit the sitemap
- Test the top 20 prompts in ChatGPT, Perplexity, Gemini and Google AI Overviews (see §6)

---

## 4. Claim policy (non-negotiable)

The previous schema invented social proof. That is the fastest way to lose AI trust — and it risks manual action. From now on:

| Claim type | Requirement |
|------------|-------------|
| Client count, awards, project count | Either cite a source, or keep it as visible marketing copy and **never** encode it in schema |
| Case-study metrics | Label "studio-reported"; state the measurement basis or say it is unavailable |
| Ratings / reviews | Only with visible, attributable reviews on the page. Otherwise no markup and no star rating |
| Locations | Use the registered/base location in schema. Other cities are "client hubs", not offices |
| Social profiles | Only real, brand-controlled URLs in `sameAs` |
| Pricing | No public rate card until one exists. Scope per engagement |
| IP / ownership | Defer to the MSA/SOW; do not promise ownership on a marketing page |

### Evidence backlog (blocking industrial-grade completeness)

- [ ] Confirm the registered entity name and founding date (currently `EPIC STUDIO`, `2020`)
- [ ] Provide the full registered address for the Kolkata base (currently `Baruipur, Kolkata, West Bengal, IN`)
- [x] LinkedIn and Instagram profile URLs added to `SITE.sameAs`
- [ ] Provide X, GitHub, Dribbble and YouTube profile URLs when available
- [ ] Provide written permission and measurement basis for the three case-study metrics
- [ ] Provide evidence for "500+ clients", "450+ awards", "125+ projects" or remove the numbers
- [ ] Replace footer/mobile placeholder links (`Privacy Policy`, `Terms`, `Cookie Settings`, careers, press)
- [ ] Remove the `+1 (555) 123-4567` placeholder wherever it still appears in deployed copy
- [ ] Decide whether `/domains` belongs on the studio domain; a registrar utility dilutes entity clarity

---

## 5. Off-page entity footprint (next 30 days)

On-site work is necessary but not sufficient. LLMs learn the entity from third-party consensus.

| Channel | Action | Why |
|---------|--------|-----|
| Google Business Profile | Claim/verify the Kolkata location; identical name, address, phone, website | Local entity resolution and AI Overviews |
| LinkedIn profile (`/in/epic-studio-630a97341`) | Complete the About, services, HQ, website, founding year; post case studies | Primary `sameAs` target |
| Wikidata | Create an item with official website, HQ, founded date, industry | Machine-readable entity graph |
| Crunchbase | Company profile with the same facts | Retrieval-friendly business database |
| Clutch / GoodFirms / DesignRush | Verified agency profiles with reviews | High-authority agency citations |
| G2 / Capterra | Only if a productised offering exists | Software-intent prompts |
| GitHub | Public org profile, pinned repos, clear README | Technical entity proof |
| YouTube | Case-study walkthroughs with transcripts | Multi-modal retrieval and citation |
| Reddit / Quora / HN | Genuine participation in relevant threads; never astroturf | Models frequently retrieve consensus from these surfaces |
| Press / podcasts | Founder commentary with a consistent bio and link | Third-party corroboration |

**Consistency rule:** the name, URL, email, phone, HQ and founding year must match `src/lib/site.ts` everywhere. A single conflicting directory entry weakens the whole graph.

---

## 6. Measurement: prompt set and KPIs

### Prompt panel (run monthly, logged per engine)

Brand:
1. What is EPIC STUDIO?
2. Is EPIC STUDIO a good software development agency in India?
3. Where is EPIC STUDIO based?
4. What services does EPIC STUDIO offer?

Non-brand / commercial:
5. Best enterprise software development studio in Kolkata
6. Senior-only software engineering agency for fintech
7. Who builds high-concurrency government education platforms in India?
8. Best agency for React Native fintech apps with biometric security
9. AI automation agency for enterprise document workflows
10. Design system agency for multi-platform SaaS
11. GovTech development partner for citizen portals in India
12. Video production agency for B2B SaaS product launches

Engines: ChatGPT (search mode), Perplexity, Gemini, Google AI Overviews, Copilot. Record:

- Mentioned? (yes/no)
- Cited? (URL list)
- Position in the answer (first third / middle / end)
- Sentiment (recommended / neutral / negative)
- Competitors cited
- Factual errors about the studio

### KPIs

| Metric | Baseline | 90-day target |
|--------|----------|---------------|
| Brand mention rate across the 12-prompt panel | Measure in week 1 | ≥ 50% |
| Citation rate (URLs to epic-studio.in) | Measure in week 1 | ≥ 25% |
| Correct HQ / service facts in answers | Measure in week 1 | 100% |
| AI referral sessions (GA4: `chatgpt.com`, `perplexity.ai`, `gemini.google.com`, `copilot.microsoft.com`) | Measure in week 1 | +30% |
| Indexed canonical pages | 16 | 16+ |
| Schema validation errors | 0 | 0 |
| Answer-engine-assisted enquiries | Tag in CRM | Report monthly |

Add UTM parameters only to links you control (directories, social, email). AI citations usually arrive without a referrer; use branded-search lift and CRM self-attribution as secondary signals.

---

## 7. 30 / 60 / 90-day backlog

**Days 0–30**
- Deploy this build; set `NEXT_PUBLIC_SITE_URL=https://www.epic-studio.in` in Vercel
- Submit sitemap to Google Search Console and Bing Webmaster Tools
- Run Rich Results Test on `/`, `/faq`, `/services/software-engineering`
- Complete Google Business Profile, LinkedIn, Crunchbase, Wikidata
- Resolve the evidence backlog in §4

**Days 31–60**
- Publish one original research asset (e.g., "What breaks Indian government portals on exam day" with anonymised load data)
- Publish two technical case studies with architecture diagrams and measurement notes
- Add author/reviewer boxes with real names and credentials (Person schema only when real)
- Add `sameAs` URLs and re-validate the entity graph
- Start the monthly prompt panel and log results

**Days 61–90**
- Publish a comparison/alternatives page only if it is factually defensible
- Add short video walkthroughs with transcripts
- Build 5–10 high-authority citations (press, podcasts, industry reports)
- Review the prompt panel; fix the pages that are never cited
- Run the GEO QA gate in CI on every deploy

---

## 8. File map

| File | Role |
|------|------|
| `src/lib/site.ts` | Canonical entity facts and origin |
| `src/lib/services.ts` | Six service records, FAQs, sources |
| `src/lib/case-studies.ts` | Three case studies and reported metrics |
| `src/lib/faqs.ts` | Canonical studio FAQ (visible + schema) |
| `src/lib/regions.ts` | International regions, compliance, hreflang, regional FAQs |
| `src/app/locations/*` | Global coverage hub and six region pages |
| `docs/INTERNATIONAL-SEO.md` | International SEO/GEO strategy and 90-day plan |
| `src/lib/schema.ts` | JSON-LD graph builders |
| `src/lib/metadata.ts` | Per-page metadata helper |
| `src/components/seo/JsonLd.tsx` | Server-rendered JSON-LD |
| `src/components/geo/*` | GEO page shell, answer box, FAQ, sources |
| `src/app/services/*`, `work/*`, `about`, `faq` | Crawlable content surfaces |
| `src/app/llms.txt/route.ts` | Curated AI brief |
| `src/app/llms-full.txt/route.ts` | Expanded AI corpus |
| `src/app/robots.ts` | AI crawler policy |
| `src/app/sitemap.ts` | Canonical URL inventory |
| `scripts/geo-qa.mjs` | Automated GEO quality gate |
| `docs/GEO.md` | This manual |

---

## 9. Definition of done for any future page

A page is GEO-complete only when all of the following are true:

- [ ] One `H1`, matching search intent
- [ ] Answer-first lead that works as a standalone quote
- [ ] Visible FAQ whose text is identical to the FAQ schema
- [ ] At least one table or structured fact block
- [ ] Primary sources linked for technical claims
- [ ] `dateModified` matches a visible review date
- [ ] Canonical, title, description, OG image verified
- [ ] Entity facts match `src/lib/site.ts`
- [ ] No unsupported rating, review, award or `sameAs`
- [ ] `node scripts/geo-qa.mjs` passes
- [ ] Page is reachable within two clicks of the homepage
- [ ] Prompt-panel question it is meant to win is written down
