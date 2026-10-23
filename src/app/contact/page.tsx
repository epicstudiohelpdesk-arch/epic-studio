import type { Metadata } from "next";
import ContactPage from "@/components/ContactPage";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";
import {
  breadcrumbNode,
  organizationNode,
  schemaGraph,
  webPageNode,
} from "@/lib/schema";

const PATH = "/contact";
const TITLE = "Contact & Architecture Consultation";
const DESCRIPTION =
  "Schedule a direct strategy consultation with EPIC STUDIO's principal architects, request a mutual NDA, or submit a software, mobile, AI or GovTech project brief.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Contact", path: PATH },
];

export default function Contact() {
  return (
    <>
      <JsonLd
        data={schemaGraph([
          organizationNode(),
          webPageNode({
            path: PATH,
            title: TITLE,
            description: DESCRIPTION,
            type: "WebPage",
            crumbs,
          }),
          breadcrumbNode(crumbs, PATH),
          {
            "@type": "ContactPage",
            "@id": `${SITE.url}/contact#contactpage`,
            url: `${SITE.url}/contact`,
            name: "Contact EPIC STUDIO",
            description: DESCRIPTION,
            mainEntity: { "@id": `${SITE.url}/#organization` },
          },
        ])}
      />
      <ContactPage isModalView={false} />
    </>
  );
}
