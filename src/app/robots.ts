import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Search and answer-engine access policy.
 *
 * The site is public and citation-friendly. AI crawlers are named explicitly
 * so access is an intentional decision rather than an accident of `*`.
 * Google-Extended controls Gemini/Vertex grounding eligibility, not Search.
 */
const AI_AGENTS = [
  // OpenAI
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  // Anthropic
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "anthropic-ai",
  // Perplexity
  "PerplexityBot",
  "Perplexity-User",
  // Google / Gemini
  "Googlebot",
  "Googlebot-Image",
  "GoogleOther",
  "Google-Extended",
  // Microsoft
  "Bingbot",
  "BingPreview",
  "MSNBot",
  // Apple
  "Applebot",
  "Applebot-Extended",
  // Meta
  "facebookexternalhit",
  "FacebookBot",
  "meta-externalagent",
  // Other answer engines and archives
  "Amazonbot",
  "CCBot",
  "cohere-ai",
  "Diffbot",
  "DuckAssistBot",
  "ImagesiftBot",
  "Omgilibot",
  "Timpibot",
  "YouBot",
  // Social / messaging previews
  "LinkedInBot",
  "Twitterbot",
  "Slackbot",
  "TelegramBot",
  "WhatsApp",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: AI_AGENTS,
        allow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}

export const revalidate = 86400;
export const dynamic = "force-static";
