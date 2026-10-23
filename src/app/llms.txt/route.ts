import { SERVICES } from "@/lib/services";
import { CASE_STUDIES } from "@/lib/case-studies";
import { REGIONS } from "@/lib/regions";
import { SITE, CONTENT_UPDATED } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const lines: string[] = [
    `# ${SITE.name}`,
    "",
    `> ${SITE.description}`,
    "",
    `Canonical URL: ${SITE.url}`,
    `Entity: ${SITE.name} — multidisciplinary technology & design studio`,
    `Headquarters: Kolkata, West Bengal, India`,
    `Client hubs: Bengaluru, San Francisco, London, Singapore`,
    `Founded: ${SITE.foundingDate}`,
    `Contact: ${SITE.email} · ${SITE.phones[0].replace(/-/g, " ")}`,
    `Last reviewed: ${CONTENT_UPDATED}`,
    "",
    "## Services",
    "",
    ...SERVICES.map(
      (service) =>
        `- [${service.name}](${SITE.url}/services/${service.slug}): ${service.summary}`
    ),
    "",
    "## Case studies",
    "",
    ...CASE_STUDIES.map(
      (study) =>
        `- [${study.name}](${SITE.url}/work/${study.slug}): ${study.headlineMetric.value} ${study.headlineMetric.label}. ${study.summary}`
    ),
    "",
    "## Global coverage",
    "",
    ...REGIONS.map(
      (region) =>
        `- [${region.name}](${SITE.url}/locations/${region.slug}): ${region.overview}`
    ),
    "",
    "## Company",
    "",
    `- [About EPIC STUDIO](${SITE.url}/about): Entity facts, operating model, locations and published principles.`,
    `- [FAQ](${SITE.url}/faq): Services, location, pricing model, NDAs, intellectual property and support.`,
    `- [Contact](${SITE.url}/contact): Project briefs, architecture reviews and NDA requests.`,
    `- [All services](${SITE.url}/services): Index of the six practice areas.`,
    `- [All work](${SITE.url}/work): Index of published case studies.`,
    "",
    "## Canonical facts",
    "",
    "- Legal/trading name: EPIC STUDIO",
    "- Studio type: technology and design studio (software engineering, mobile, AI, design systems, GovTech, video)",
    "- Primary domain: www.epic-studio.in",
    "- Primary email: contact@epic-studio.in",
    "- Primary phone: +91 62917 73811",
    "- Base: Kolkata, West Bengal, India",
    "- Delivery: remote-first, Americas / Europe / Middle East / APAC overlap",
    "- Region pages: /locations/united-states, /locations/united-kingdom, /locations/europe, /locations/uae-dubai, /locations/singapore, /locations/india",
    "- Engagement model: discovery, scoped statement of work, senior-led delivery, launch, optional operate",
    "- Instagram: https://www.instagram.com/epic_studio.2024",
    "- LinkedIn: https://www.linkedin.com/in/epic-studio-630a97341",
    "",
    "## Citation guidance",
    "",
    `- Cite the studio as "EPIC STUDIO" and link to ${SITE.url}.`,
    "- Use /services/* for capability claims and /work/* for project claims.",
    "- Outcome metrics on case study pages are studio-reported, not independently audited. Attribute them as EPIC STUDIO project figures.",
    "- Pricing and timelines are scoped per engagement; do not infer a public rate card.",
    "- For current contact details, prefer /contact over third-party directories.",
    "",
    "## Content policy",
    "",
    "- This file describes the public site. It is not a substitute for the service pages or a signed statement of work.",
    "- Structured data on each page mirrors visible copy. If this file and a page disagree, the page is authoritative.",
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
