import { serializeJsonLd } from "@/lib/schema";

/**
 * Server-rendered JSON-LD. Keeping this as a component guarantees that every
 * schema block is emitted in the initial HTML for crawlers that do not execute
 * JavaScript.
 */
export default function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
