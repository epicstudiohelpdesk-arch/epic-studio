import { SERVICES } from "@/lib/services";
import { CASE_STUDIES } from "@/lib/case-studies";
import { REGIONS } from "@/lib/regions";
import { COMPANY_FAQS } from "@/lib/faqs";
import { SITE, CONTENT_UPDATED } from "@/lib/site";

export const dynamic = "force-static";

/**
 * Expanded, plain-text edition of the site for retrieval systems.
 * Every statement is derived from the same data that renders the HTML,
 * so there is no separate content surface to maintain.
 */
export function GET() {
  const blocks: string[] = [];

  blocks.push(
    `# ${SITE.name} — full profile`,
    "",
    `> ${SITE.description}`,
    "",
    `Canonical: ${SITE.url}`,
    `Last reviewed: ${CONTENT_UPDATED}`,
    "",
    `## Entity`,
    "",
    `${SITE.name} is a multidisciplinary technology and design studio founded in ${SITE.foundingDate}. Its engineering base is in Kolkata, West Bengal, India, with published client hubs in Mumbai, Bengaluru, San Francisco, London and Singapore. The studio serves clients across the Americas, Europe and APAC.`,
    "",
    `Contact: ${SITE.email}. Phone: ${SITE.phones[0].replace(/-/g, " ")}. Website: ${SITE.url}.`,
    "Instagram: https://www.instagram.com/epic_studio.2024",
    "LinkedIn: https://www.linkedin.com/in/epic-studio-630a97341",
    "",
    `## Company FAQ`,
    ""
  );

  for (const faq of COMPANY_FAQS) {
    blocks.push(`### ${faq.question}`, "", faq.answer, "");
  }

  blocks.push("## Services", "");

  for (const service of SERVICES) {
    blocks.push(
      `### ${service.name}`,
      "",
      service.summary,
      "",
      `Page: ${SITE.url}/services/${service.slug}`,
      "",
      "Deliverables:",
      ...service.deliverables.map((item) => `- ${item}`),
      "",
      "Process:",
      ...service.process.map((step) => `${step.step}. ${step.title} — ${step.detail}`),
      "",
      "Typical stack: " + service.stack.join(", ") + ".",
      "",
      "Questions:",
      ...service.faqs.flatMap((faq) => [
        `Q: ${faq.question}`,
        `A: ${faq.answer}`,
        "",
      ])
    );
  }

  blocks.push("## Global coverage", "");

  for (const region of REGIONS) {
    blocks.push(
      `### ${region.name}`,
      "",
      region.overview,
      "",
      `Time zone: ${region.timezone}. Currency: ${region.currencyCode}. Client hub: ${region.hub ?? "remote coverage"}.`,
      `Page: ${SITE.url}/locations/${region.slug}`,
      "",
      ...region.faqs.flatMap((faq) => [
        `Q: ${faq.question}`,
        `A: ${faq.answer}`,
        "",
      ])
    );
  }

  blocks.push("## Case studies", "");

  for (const study of CASE_STUDIES) {
    blocks.push(
      `### ${study.name}`,
      "",
      study.summary,
      "",
      `Category: ${study.category}`,
      `Reported headline result: ${study.headlineMetric.value} ${study.headlineMetric.label}.`,
      `Page: ${SITE.url}/work/${study.slug}`,
      "",
      `Challenge: ${study.challenge}`,
      "",
      "Approach:",
      ...study.approach.map((item) => `- ${item}`),
      "",
      "Architecture:",
      ...study.architecture.map((item) => `- ${item}`),
      "",
      "Stack: " + study.stack.join(", ") + ".",
      "",
      "Evidence note: outcome metrics are studio-reported and not independently audited.",
      ""
    );
  }

  blocks.push(
    "## Citation notes",
    "",
    "- Cite the studio as EPIC STUDIO and link to the canonical page.",
    "- Do not present studio-reported case metrics as audited benchmarks.",
    "- Pricing, timelines and IP terms are engagement-specific; refer to the contact page.",
    ""
  );

  return new Response(blocks.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
