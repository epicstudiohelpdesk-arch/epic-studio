import type { Metadata } from "next";
import JoinUsPage from "@/components/JoinUsPage";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";
import {
  breadcrumbNode,
  organizationNode,
  schemaGraph,
  webPageNode,
} from "@/lib/schema";

const PATH = "/join";
const TITLE = "Join EPIC STUDIO | Commercial Sales & Market Intelligence Careers";
const DESCRIPTION =
  "Join EPIC STUDIO's commercial growth team: Market data collection, business intelligence research, and digital solutions sales for websites, apps, and digital growth.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Join Us", path: PATH },
];

export default function JoinPage() {
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
            "@type": "WebPage",
            "@id": `${SITE.url}/join#careerspage`,
            url: `${SITE.url}/join`,
            name: "Join EPIC STUDIO — Careers & Open Roles",
            description: DESCRIPTION,
            mainEntity: { "@id": `${SITE.url}/#organization` },
          },
        ])}
      />
      <JoinUsPage />
    </>
  );
}
