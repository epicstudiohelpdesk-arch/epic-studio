import type { Metadata } from "next";
import { SITE, SITE_URL, absoluteUrl } from "./site";

interface MetaOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  /** Open Graph locale, e.g. en_GB. Defaults to en_US. */
  locale?: string;
  /** ISO 3166 region for the geo meta tags, e.g. GB, AE, US. */
  geoRegion?: string;
  geoPlacename?: string;
  /** hreflang alternates. Use only on pages that genuinely have regional variants. */
  languages?: Record<string, string>;
}

/**
 * Consistent per-page metadata. The root layout owns the `%s | EPIC STUDIO`
 * template, so callers pass the bare page title.
 */
export function buildMetadata(opts: MetaOptions): Metadata {
  const url = absoluteUrl(opts.path);
  const image = absoluteUrl(opts.image ?? SITE.ogImage);
  const fullTitle = `${opts.title} | ${SITE.name}`;

  return {
    // Absolute prevents the root template from appending a second brand
    // suffix on nested routes (and fixes the homepage, which sits in the same
    // segment as the template).
    title: { absolute: fullTitle },
    description: opts.description,
    alternates: {
      canonical: url,
      ...(opts.languages ? { languages: opts.languages } : {}),
    },
    openGraph: {
      type: opts.type ?? "website",
      url,
      siteName: SITE.name,
      locale: opts.locale ?? "en_US",
      title: fullTitle,
      description: opts.description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${SITE.name} — ${opts.title}`,
        },
      ],
      ...(opts.publishedTime ? { publishedTime: opts.publishedTime } : {}),
      ...(opts.modifiedTime ? { modifiedTime: opts.modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      site: "@epicstudio",
      creator: "@epicstudio",
      title: fullTitle,
      description: opts.description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
    other: {
      "content-language": "en",
      "geo.region": opts.geoRegion ?? "IN-WB",
      "geo.placename": opts.geoPlacename ?? "Kolkata",
    },
    metadataBase: new URL(SITE_URL),
  };
}
