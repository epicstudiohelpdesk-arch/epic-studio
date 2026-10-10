import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Syne } from "next/font/google";
import "./globals.css";
import PreventZoom from "@/components/PreventZoom";
import FloatingFolder from "@/components/FloatingFolder";
import ResizeGuard from "@/components/ResizeGuard";
import AnimationGate from "@/components/AnimationGate";
import DynamicFavicon from "@/components/DynamicFavicon";

// Self-hosted at build time: zero render-blocking external requests,
// no load-event races, automatic size-adjusted fallback metrics.
const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const syne = Syne({
  weight: "800",
  subsets: ["latin"],
  variable: "--font-syne",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://epic.studio";

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "EPIC STUDIO — Multidisciplinary Creative Agency | Software, Mobile & Video Development",
    template: "%s | EPIC STUDIO",
  },
  description:
    "EPIC STUDIO is a premier multidisciplinary creative agency and engineering studio. We architect and build enterprise software, high-performance mobile apps (iOS & Android), modern web platforms, AI automation systems, UI/UX design systems, and cinematic commercial video editing. 500+ happy clients, 450+ winning awards.",
  applicationName: "EPIC STUDIO",
  authors: [{ name: "EPIC STUDIO Team", url: siteUrl }],
  generator: "Next.js",
  keywords: [
    // Brand Variations
    "EPIC",
    "epic studio",
    "EPIC STUDIO",
    "epic-studio",
    "EPIC-STUDIO CREATIVE AGENCY",
    "Epic Creative Agency",
    "Epic Digital Studio",
    "Epic Studio Tech",
    "Epic Studio India",
    "Epic Studio Global",

    // Software Development
    "software development",
    "software development company",
    "software engineering studio",
    "custom software development",
    "enterprise software solutions",
    "full stack web development",
    "web application development",
    "backend architecture",
    "frontend engineering",
    "API development and microservices",
    "Next.js development agency",
    "React engineering studio",
    "SaaS product development",

    // Mobile Development
    "mobile development",
    "mobile app development",
    "mobile app development company",
    "iOS app development",
    "Android app development",
    "cross platform mobile development",
    "Flutter app development",
    "React Native development",
    "mobile UI UX design",
    "enterprise mobile apps",

    // Video Editing & Creative Media Production
    "video editing",
    "video editing agency",
    "professional video editing",
    "commercial video production",
    "cinematic video editing",
    "motion graphics studio",
    "video post production company",
    "creative media agency",
    "3D animation and VFX",
    "social media video production",
    "brand storytelling video",

    // UI/UX & Web Design
    "website design",
    "UI UX design agency",
    "creative agency",
    "award winning web design",
    "interactive 3D web experiences",
    "enterprise design systems",
    "branding and visual identity",
    "product design agency",

    // AI & Cloud Infrastructure
    "AI automation agency",
    "AI engineering studio",
    "machine learning solutions",
    "custom LLM integration",
    "cloud infrastructure DevOps",
    "cloud consulting agency",
    "GovTech solutions and public platforms",
    "growth marketing and digital strategy",
  ],
  referrer: "origin-when-cross-origin",
  creator: "EPIC STUDIO",
  publisher: "EPIC STUDIO",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      "en-US": siteUrl,
      "en-GB": siteUrl,
      "en-IN": siteUrl,
      "x-default": siteUrl,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "EPIC STUDIO — Multidisciplinary Creative Agency | Software, Mobile & Video Development",
    description:
      "A global multidisciplinary collective building enterprise software, high-performance mobile apps, cinematic video editing, AI automation, and award-winning digital design. 500+ happy clients, 450+ winning awards.",
    siteName: "EPIC STUDIO",
    images: [
      {
        url: `${siteUrl}/assets/mid.png`,
        width: 1200,
        height: 630,
        alt: "EPIC STUDIO — Multidisciplinary Creative Agency & Software Engineering Studio",
        type: "image/png",
      },
      {
        url: `${siteUrl}/icon-512.png`,
        width: 512,
        height: 512,
        alt: "EPIC STUDIO Logo",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EPIC STUDIO — Multidisciplinary Creative Agency | Software, Mobile & Video Development",
    description:
      "A global multidisciplinary collective building enterprise software, high-performance mobile apps, cinematic video editing, AI automation, and award-winning digital design. 500+ happy clients, 450+ winning awards.",
    site: "@epicstudio",
    creator: "@epicstudio",
    images: [`${siteUrl}/assets/mid.png`],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      {
        url: "/favicon_light.png",
        media: "(prefers-color-scheme: light)",
        type: "image/png",
      },
      {
        url: "/favicon.ico",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    shortcut: [
      {
        url: "/favicon_light.png",
        media: "(prefers-color-scheme: light)",
        type: "image/png",
      },
      {
        url: "/favicon.ico",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  category: "technology",
};

// JSON-LD Structured Data: Complete Knowledge Graph Organization
const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": ["Organization", "Corporation", "ProfessionalService"],
  "@id": `${siteUrl}/#organization`,
  name: "EPIC STUDIO",
  legalName: "EPIC STUDIO Creative Agency & Technology LLC",
  alternateName: [
    "EPIC",
    "epic studio",
    "EPIC STUDIO",
    "epic-studio",
    "EPIC-STUDIO CREATIVE AGENCY",
    "Epic Studio Agency",
    "Epic Creative Studio",
    "Epic Studio Tech",
    "Epic Studio Global",
  ],
  url: siteUrl,
  logo: {
    "@type": "ImageObject",
    url: `${siteUrl}/icon-512.png`,
    width: "512",
    height: "512",
    caption: "EPIC STUDIO Official Logo",
  },
  image: [
    `${siteUrl}/assets/mid.png`,
    `${siteUrl}/icon-512.png`,
    `${siteUrl}/assets/person.png`,
    `${siteUrl}/assets/keyboard-asset.png`,
  ],
  description:
    "EPIC STUDIO is an award-winning multidisciplinary creative agency and technology engineering studio specializing in enterprise software development, native iOS & Android mobile development, cinematic video editing & motion graphics, AI automation systems, and high-conversion UI/UX design.",
  foundingDate: "2020",
  address: {
    "@type": "PostalAddress",
    streetAddress: "548 Market St",
    addressLocality: "San Francisco",
    addressRegion: "CA",
    postalCode: "94104",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 37.7897,
    longitude: -122.4011,
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+1-555-123-4567",
      contactType: "customer service",
      email: "contact@epic-studio.in",
      availableLanguage: ["English", "Hindi"],
      areaServed: "Worldwide",
    },
    {
      "@type": "ContactPoint",
      telephone: "+1-555-123-4567",
      contactType: "sales",
      email: "contact@epic-studio.in",
      availableLanguage: ["English", "Hindi"],
      areaServed: "Worldwide",
    },
  ],
  sameAs: [
    "https://www.linkedin.com",
    "https://twitter.com",
    "https://github.com",
    "https://dribbble.com",
    "https://instagram.com",
  ],
  priceRange: "$$$$",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    bestRating: "5",
    worstRating: "1",
    ratingCount: "500",
    reviewCount: "500",
  },
  review: [
    {
      "@type": "Review",
      author: {
        "@type": "Person",
        name: "Enterprise Client Partner",
      },
      datePublished: "2026-01-15",
      reviewBody:
        "EPIC STUDIO transformed our enterprise digital platform. Their software engineering, mobile app development, and creative motion production are world-class.",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
        worstRating: "1",
      },
    },
    {
      "@type": "Review",
      author: {
        "@type": "Person",
        name: "Global Tech Lead",
      },
      datePublished: "2026-03-20",
      reviewBody:
        "Flawless execution on our mobile app and UI/UX design systems. Highly recommended for any high-scale development initiative.",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
        worstRating: "1",
      },
    },
  ],
  award: [
    "450+ International Design & Tech Awards",
    "Best Digital Product Studio",
    "Excellence in Enterprise Software & Mobile Engineering",
  ],
  knowsAbout: [
    "Software Development",
    "Custom Software Engineering",
    "Mobile App Development (iOS & Android)",
    "Video Editing & Motion Graphics",
    "Full-Stack Web Development",
    "UI/UX Design Systems",
    "AI Automation & Machine Learning",
    "Cloud DevOps & Infrastructure",
    "GovTech Solutions & Public Platforms",
    "Creative Agency Services",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "EPIC STUDIO Core Disciplines",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Software & Product Engineering",
          description:
            "Enterprise SaaS platforms, custom software development, high-throughput backend microservices, and modern web applications.",
          url: `${siteUrl}/#capabilities`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Mobile App Development",
          description:
            "Native iOS, Android, and cross-platform mobile apps engineered for fluid performance, offline resiliency, and intuitive UX.",
          url: `${siteUrl}/#mobile`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Video Editing & Motion Graphics",
          description:
            "Cinematic commercial video editing, brand post-production, 3D motion design, visual effects (VFX), and social storytelling.",
          url: `${siteUrl}/#creative`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "UI/UX Design & Brand Systems",
          description:
            "Award-winning design systems, interactive prototypes, human-centered UI/UX interfaces, and global brand identity systems.",
          url: `${siteUrl}/#who-we-are`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI Workflows & Cloud DevOps",
          description:
            "Enterprise AI assistants, custom machine learning integrations, workflow automations, and resilient cloud CI/CD pipelines.",
          url: `${siteUrl}/#ai`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "GovTech & Public Platforms",
          description:
            "Sovereign cloud infrastructure, citizen digital portals, public sector compliance, and institutional software systems.",
          url: `${siteUrl}/#govtech`,
        },
      },
    ],
  },
};

// JSON-LD Structured Data: WebSite with Sitelinks SearchBox
const jsonLdWebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: "EPIC STUDIO",
  alternateName: [
    "EPIC",
    "epic studio",
    "EPIC STUDIO",
    "epic-studio",
    "EPIC-STUDIO CREATIVE AGENCY",
  ],
  description:
    "Multidisciplinary Creative Agency, Enterprise Software Development, Mobile Apps & Video Editing Studio",
  publisher: {
    "@id": `${siteUrl}/#organization`,
  },
  inLanguage: "en-US",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteUrl}/?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

// JSON-LD Structured Data: FAQPage for Rich Snippets under Google Search results
const jsonLdFAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What services does EPIC STUDIO specialize in?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "EPIC STUDIO is a premier multidisciplinary studio specializing in Enterprise Software Development, Mobile App Development (iOS & Android), Cinematic Video Editing & Motion Graphics, UI/UX Design Systems, AI Automation & Machine Learning, and Cloud Infrastructure.",
      },
    },
    {
      "@type": "Question",
      name: "How can I hire EPIC STUDIO for software, mobile app, or video development?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can schedule a direct strategy consultation with our principal architects or submit your project brief by visiting our contact page at https://epic.studio/contact.",
      },
    },
    {
      "@type": "Question",
      name: "Does EPIC STUDIO develop native iOS and Android mobile apps?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, EPIC STUDIO engineers high-performance native iOS (Swift/SwiftUI), native Android (Kotlin/Jetpack Compose), and cross-platform mobile apps (React Native, Flutter) with buttery 60fps UI and enterprise offline sync.",
      },
    },
    {
      "@type": "Question",
      name: "What is EPIC STUDIO's project track record and experience?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "EPIC STUDIO has successfully shipped 500+ projects worldwide with 450+ international awards and a 99.8% on-time delivery rate across enterprise tech, GovTech, healthcare, and high-growth brands.",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${bebasNeue.variable} ${syne.variable}`}
      data-scroll-behavior="smooth"
    >
      <head>
        {/* Preload critical hero act mockups for lag-free instant rendering */}
        <link rel="preload" href="/assets/mid.webp" as="image" type="image/webp" fetchPriority="high" />
        <link rel="preload" href="/assets/orange-screen.webp" as="image" type="image/webp" fetchPriority="high" />
        <link rel="preload" href="/assets/pets.webp" as="image" type="image/webp" />
        <link rel="preload" href="/assets/2ndmockup.webp" as="image" type="image/webp" />
        <link rel="preload" href="/assets/3rdmockup.webp" as="image" type="image/webp" />
        <link rel="preload" href="/assets/keyboard-asset.webp" as="image" type="image/webp" />
        <link rel="preload" href="/assets/facebookmock.webp" as="image" type="image/webp" />
        <link rel="preload" href="/assets/person.webp" as="image" type="image/webp" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQ) }}
        />
      </head>
      <body>
        <DynamicFavicon />
        <PreventZoom />
        <ResizeGuard />
        <AnimationGate />
        {children}
        <FloatingFolder />
      </body>
    </html>
  );
}
