import { SITE, SITE_URL, absoluteUrl, CONTENT_UPDATED_ISO } from "./site";
import type { Service, Faq } from "./services";
import type { CaseStudy } from "./case-studies";
import { REGIONS, type Region } from "./regions";

export interface Crumb {
  name: string;
  path: string;
}

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export const organizationRef = { "@id": ORG_ID } as const;
export const websiteRef = { "@id": WEBSITE_ID } as const;

export function organizationNode() {
  return {
    "@type": ["Organization", "ProfessionalService"],
    "@id": ORG_ID,
    name: SITE.name,
    legalName: SITE.legalName,
    alternateName: [
      "EPIC",
      "Epic Studio",
      "The Epic Studio",
      "Epic Studios",
      "Epic Studios Mumbai",
      "Epic Studio India",
      "Studio Epic",
      "Epic Company",
      "The Epic Company",
      "Epic Apps",
      "EpicStudio",
    ],
    url: SITE.url,
    priceRange: "$$$",
    geo: {
      "@type": "GeoCoordinates",
      latitude: 22.3654,
      longitude: 88.4325,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "125",
      bestRating: "5",
      worstRating: "1",
    },
    logo: {
      "@type": "ImageObject",
      "@id": `${SITE_URL}/#logo`,
      url: absoluteUrl(SITE.logo),
      contentUrl: absoluteUrl(SITE.logo),
      width: 512,
      height: 512,
      caption: "EPIC STUDIO logo",
    },
    image: [absoluteUrl(SITE.ogImage), absoluteUrl(SITE.logo)],
    description: SITE.description,
    slogan: SITE.slogan,
    foundingDate: SITE.foundingDate,
    email: SITE.email,
    telephone: SITE.phones[0],
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.streetAddress,
      addressLocality: SITE.address.addressLocality,
      addressRegion: SITE.address.addressRegion,
      addressCountry: SITE.address.addressCountry,
    },
    hasMap: SITE.mapUrl,
    areaServed: [
      {
        "@type": "Place",
        name: "Worldwide",
      },
      ...REGIONS.map(regionArea),
    ],
    knowsAbout: [...SITE.knowsAbout],
    knowsLanguage: [...SITE.languages],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: SITE.phones[0],
        email: SITE.email,
        availableLanguage: [...SITE.languages],
        areaServed: "Worldwide",
      },
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: SITE.phones[1],
        email: SITE.supportEmail,
        availableLanguage: [...SITE.languages],
        areaServed: "Worldwide",
      },
    ],
    ...(SITE.sameAs.length > 0 ? { sameAs: [...SITE.sameAs] } : {}),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "EPIC STUDIO services",
      itemListElement: [
        "Software & Product Engineering",
        "Mobile App Development",
        "AI Automation & Cloud DevOps",
        "UI/UX, Web Design & Brand Systems",
        "GovTech & Public Platforms",
        "Video, Social Media & Motion Production",
      ].map((name) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name,
          provider: organizationRef,
        },
      })),
    },
  };
}

export function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE.url,
    name: SITE.name,
    alternateName: [
      "EPIC",
      "Epic Studio",
      "The Epic Studio",
      "Epic Studios",
      "Studio Epic",
    ],
    description: SITE.shortDescription,
    publisher: organizationRef,
    inLanguage: "en",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE.url}/services?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbNode(crumbs: Crumb[], path: string) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(path)}#breadcrumb`,
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function faqNode(faqs: Faq[], path: string) {
  return {
    "@type": "FAQPage",
    "@id": `${absoluteUrl(path)}#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function webPageNode(opts: {
  path: string;
  title: string;
  description: string;
  type?: "WebPage" | "AboutPage" | "CollectionPage" | "FAQPage";
  crumbs: Crumb[];
  dateModified?: string;
  primaryImage?: string;
  mainEntityId?: string;
}) {
  const url = absoluteUrl(opts.path);
  return {
    "@type": opts.type ?? "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: opts.title,
    description: opts.description,
    isPartOf: websiteRef,
    about: organizationRef,
    breadcrumb: { "@id": `${url}#breadcrumb` },
    inLanguage: "en",
    dateModified: opts.dateModified ?? CONTENT_UPDATED_ISO,
    ...(opts.mainEntityId ? { mainEntity: { "@id": opts.mainEntityId } } : {}),
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: absoluteUrl(opts.primaryImage ?? SITE.ogImage),
    },
  };
}

export function serviceNode(service: Service) {
  const url = absoluteUrl(`/services/${service.slug}`);
  return {
    "@type": "Service",
    "@id": `${url}#service`,
    name: service.name,
    serviceType: service.name,
    description: service.description,
    url,
    provider: organizationRef,
    areaServed: [
      { "@type": "Place", name: "Worldwide" },
      ...REGIONS.map(regionArea),
    ],
    availableLanguage: [...SITE.languages],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.name} deliverables`,
      itemListElement: service.deliverables.map((item) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: item,
        },
      })),
    },
    mainEntityOfPage: { "@id": `${url}#webpage` },
  };
}

export function serviceListSchema(services: Service[], path = "/services") {
  return {
    "@type": "ItemList",
    "@id": `${absoluteUrl(path)}#services`,
    name: "EPIC STUDIO services",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.name,
      url: absoluteUrl(`/services/${service.slug}`),
      description: service.summary,
    })),
  };
}

export function caseStudyNode(study: CaseStudy) {
  const url = absoluteUrl(`/work/${study.slug}`);
  return {
    "@type": "Article",
    "@id": `${url}#article`,
    headline: study.name,
    name: study.title,
    description: study.description,
    url,
    dateModified: `${study.updated}T09:00:00+05:30`,
    author: organizationRef,
    publisher: organizationRef,
    isPartOf: websiteRef,
    mainEntityOfPage: { "@id": `${url}#webpage` },
    about: {
      "@type": "CreativeWork",
      name: study.name,
      description: study.summary,
      genre: study.category,
      keywords: study.stack.join(", "),
    },
  };
}

/** Map display names to valid schema.org country / area names. */
function regionArea(region: Region) {
  if (region.slug === "europe") {
    return { "@type": "AdministrativeArea", name: "European Union" };
  }
  if (region.slug === "uae-dubai") {
    return { "@type": "Country", name: "United Arab Emirates" };
  }
  if (region.slug === "singapore") {
    return { "@type": "Country", name: "Singapore" };
  }
  return { "@type": "Country", name: region.name };
}

export function regionNode(region: Region) {
  const url = absoluteUrl(`/locations/${region.slug}`);
  return {
    "@type": "Service",
    "@id": `${url}#service`,
    name: `Technology, design & AI services for ${region.name}`,
    serviceType: "Software, mobile, AI, design, GovTech and video services",
    description: region.overview,
    url,
    provider: organizationRef,
    areaServed: regionArea(region),
    availableLanguage: ["English"],
    mainEntityOfPage: { "@id": `${url}#webpage` },
  };
}

export function regionListSchema(regions: Region[], path = "/locations") {
  return {
    "@type": "ItemList",
    "@id": `${absoluteUrl(path)}#regions`,
    name: "EPIC STUDIO international coverage",
    itemListElement: regions.map((region, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: region.name,
      url: absoluteUrl(`/locations/${region.slug}`),
      description: region.overview,
    })),
  };
}

export function schemaGraph(nodes: unknown[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}

/** Escape `<` so the JSON-LD cannot break out of its script element. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
