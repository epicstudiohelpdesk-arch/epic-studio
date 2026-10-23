import type { MetadataRoute } from "next";
import { SERVICES } from "@/lib/services";
import { CASE_STUDIES } from "@/lib/case-studies";
import { REGIONS } from "@/lib/regions";
import { SITE_URL, CONTENT_UPDATED_ISO } from "@/lib/site";

/**
 * Only canonical, 200-status URLs belong in a sitemap. Fragment URLs
 * (/#capabilities) were previously listed and are invalid.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(CONTENT_UPDATED_ISO);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/services`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/work`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/faq`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/locations`, lastModified, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE_URL}/contact`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/domains`, lastModified, changeFrequency: "monthly", priority: 0.5 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = SERVICES.map((service) => ({
    url: `${SITE_URL}/services/${service.slug}`,
    lastModified: new Date(`${service.updated}T09:00:00+05:30`),
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const caseRoutes: MetadataRoute.Sitemap = CASE_STUDIES.map((study) => ({
    url: `${SITE_URL}/work/${study.slug}`,
    lastModified: new Date(`${study.updated}T09:00:00+05:30`),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const regionRoutes: MetadataRoute.Sitemap = REGIONS.map((region) => ({
    url: `${SITE_URL}/locations/${region.slug}`,
    lastModified: new Date(`${region.updated}T09:00:00+05:30`),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...serviceRoutes, ...caseRoutes, ...regionRoutes];
}
