import type { Metadata } from "next";
import DomainSearchPage from "@/components/domains/DomainSearchPage";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/metadata";
import {
  breadcrumbNode,
  organizationNode,
  schemaGraph,
  webPageNode,
} from "@/lib/schema";

const PATH = "/domains";
const TITLE = "Domain Search & Registration";
const DESCRIPTION =
  "Search live domain availability, compare first-year and renewal pricing, and delegate DNS in one step. An EPIC STUDIO utility for founders and brands.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Domains", path: PATH },
];

export default function DomainsPage() {
  return (
    <>
      <JsonLd
        data={schemaGraph([
          organizationNode(),
          webPageNode({
            path: PATH,
            title: TITLE,
            description: DESCRIPTION,
            crumbs,
          }),
          breadcrumbNode(crumbs, PATH),
        ])}
      />
      <DomainSearchPage />
    </>
  );
}
