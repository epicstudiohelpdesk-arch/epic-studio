/**
 * Single source of truth for the EPIC STUDIO entity.
 *
 * Every canonical URL, schema node, sitemap entry and llms.txt line must read
 * from this file. Do not hard-code the domain anywhere else: entity
 * consistency is a ranking/trust signal for answer engines.
 */

const CANONICAL_ORIGIN = "https://www.epic-studio.in";

/**
 * Normalise the configured origin. The previous deployment published
 * `https://epic.studio`, which is a different domain and produced a canonical
 * that did not match the live host. If that legacy value is still present in
 * the environment, fall back to the real canonical origin instead of shipping
 * a conflicting signal.
 */
function resolveSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!configured) return CANONICAL_ORIGIN;

  try {
    const url = new URL(configured);
    if (/(^|\.)epic\.studio$/i.test(url.hostname)) return CANONICAL_ORIGIN;
    return url.origin;
  } catch {
    return CANONICAL_ORIGIN;
  }
}

const rawSiteUrl = resolveSiteUrl();

/** Canonical origin. The apex 308-redirects to www, so www is canonical. */
export const SITE_URL = rawSiteUrl.replace(/\/+$/, "");

export const SITE = {
  name: "EPIC STUDIO",
  shortName: "EPIC",
  legalName: "EPIC STUDIO",
  url: SITE_URL,
  domain: "epic-studio.in",
  tagline: "Multidisciplinary technology & design studio",
  slogan: "We architect the digital systems that shape global industries.",
  description:
    "EPIC STUDIO is a multidisciplinary technology and design studio that builds enterprise software, native and cross-platform mobile apps, AI automation, UI/UX systems, GovTech platforms, and brand video production.",
  shortDescription:
    "A senior-only studio for enterprise software, mobile apps, AI automation, design systems and GovTech platforms.",
  foundingDate: "2020",
  email: "contact@epic-studio.in",
  supportEmail: "contact@epic-studio.in",
  phones: ["+91-62917-73811", "+91-79805-95630"],
  address: {
    streetAddress: "Baruipur",
    addressLocality: "Kolkata",
    addressRegion: "West Bengal",
    addressCountry: "IN",
  },
  /** Verified hub cities as published on the site. */
  hubs: [
    "Kolkata",
    "Mumbai",
    "Bengaluru",
    "New Delhi",
    "San Francisco",
    "London",
    "Singapore",
  ],
  languages: ["English", "Hindi"],
  logo: "/icon-512.png",
  ogImage: "/assets/mid.png",
  /** Google Maps place used in the site footer and contact page. */
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=9C7R%2BVC+Baruipur,+West+Bengal",
  /**
   * Add only verified, brand-controlled profile URLs here.
   * Generic network homepages (linkedin.com, instagram.com) are worse than
   * no sameAs at all because they break entity resolution.
   */
  sameAs: [
    "https://www.instagram.com/epic_studio.2024",
    "https://www.linkedin.com/in/epic-studio-630a97341",
  ] as string[],
  knowsAbout: [
    "Enterprise software development",
    "Custom software engineering",
    "Mobile app development",
    "iOS development",
    "Android development",
    "React Native development",
    "Flutter development",
    "AI automation",
    "AI agent orchestration",
    "Large language model integration",
    "UI/UX and web design systems",
    "Website design and development",
    "Full-stack web application development",
    "Brand identity systems",
    "Creative technology agency",
    "Digital product engineering",
    "Cloud DevOps",
    "Kubernetes",
    "GovTech and digital public infrastructure",
    "Video editing, social media content and motion graphics",
    "Social media content production",
  ],
  /** Visible, published capability groups. Keep in sync with /services. */
  disciplines: [
    "Software & Product Engineering",
    "Mobile App Development",
    "AI Automation & Cloud DevOps",
    "UI/UX & Brand Systems",
    "GovTech & Public Platforms",
    "Video & Motion Production",
  ],
} as const;

export type NavItem = { label: string; href: string };

export const PRIMARY_NAV: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

/** Stable content date used for dateModified. Update when copy changes. */
export const CONTENT_UPDATED = "2026-10-23";
export const CONTENT_UPDATED_ISO = `${CONTENT_UPDATED}T09:00:00+05:30`;

export function absoluteUrl(path = "/"): string {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
