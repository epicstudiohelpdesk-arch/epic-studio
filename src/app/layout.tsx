import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Syne } from "next/font/google";
import "./globals.css";
import "./geo.css";
import PreventZoom from "@/components/PreventZoom";
import FloatingFolder from "@/components/FloatingFolder";
import ResizeGuard from "@/components/ResizeGuard";
import AnimationGate from "@/components/AnimationGate";
import DynamicFavicon from "@/components/DynamicFavicon";
import SplashScreen from "@/components/SplashScreen";
import JsonLd from "@/components/seo/JsonLd";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { SITE, SITE_URL } from "@/lib/site";
import {
  organizationNode,
  schemaGraph,
  websiteNode,
} from "@/lib/schema";

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

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "EPIC STUDIO — Software, Mobile Apps & AI Design Studio",
    template: "%s | EPIC STUDIO",
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE_URL }],
  creator: SITE.name,
  publisher: SITE.name,
  category: "technology",
  keywords: [
    "EPIC STUDIO",
    "epic-studio.in",
    "epic studios",
    "the epic studio",
    "epic studios mumbai",
    "software development studio",
    "enterprise software development",
    "mobile app development",
    "AI automation agency",
    "AI agent development",
    "UI UX design studio",
    "GovTech development",
    "video production studio",
    "Next.js development",
    "React Native development",
    "Kolkata software studio",
    "India technology studio",
    "custom software development agency",
    "creative design studio",
  ],
  referrer: "origin-when-cross-origin",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE.name,
    title: "EPIC STUDIO — Software, Mobile Apps & AI Design Studio",
    description: SITE.description,
    images: [
      {
        url: `${SITE_URL}${SITE.ogImage}`,
        width: 1200,
        height: 630,
        alt: "EPIC STUDIO — Software, Mobile Apps & AI Design Studio",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@epicstudio",
    creator: "@epicstudio",
    title: "EPIC STUDIO — Software, Mobile Apps & AI Design Studio",
    description: SITE.description,
    images: [`${SITE_URL}${SITE.ogImage}`],
  },
  robots: {
    index: true,
    follow: true,
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
      data-splash-active="true"
      suppressHydrationWarning
    >
      <head>
        {/* Preload splash screen font */}
        <link rel="preload" href="/fonts/Folkra.woff" as="font" type="font/woff" crossOrigin="anonymous" />
        {/* Preload critical hero assets for lag-free instant rendering */}
        <link rel="preload" href="/assets/mid.webp" as="image" type="image/webp" fetchPriority="high" />
        <link rel="preload" href="/assets/orange-screen.webp" as="image" type="image/webp" fetchPriority="high" />
        <link rel="preload" href="/assets/pets.webp" as="image" type="image/webp" />
        <link rel="preload" href="/assets/2ndmockup.webp" as="image" type="image/webp" />
        <link rel="preload" href="/assets/3rdmockup.webp" as="image" type="image/webp" />
        <link rel="preload" href="/assets/keyboard-asset.webp" as="image" type="image/webp" />
        <link rel="preload" href="/assets/facebookmock.webp" as="image" type="image/webp" />
        <link rel="preload" href="/assets/person.webp" as="image" type="image/webp" />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="llms.txt" />
        <meta name="format-detection" content="telephone=no" />
        {/* Never hide primary copy when scripts are unavailable (crawlers, reader modes). */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <JsonLd data={schemaGraph([organizationNode(), websiteNode()])} />
      </head>
      <body>
        <SplashScreen />
        <DynamicFavicon />
        <PreventZoom />
        <ResizeGuard />
        <AnimationGate />
        {children}
        <FloatingFolder />
        <AnalyticsTracker />
      </body>
    </html>
  );
}


