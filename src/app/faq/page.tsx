import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { COMPANY_FAQS } from "@/lib/faqs";
import {
  breadcrumbNode,
  faqNode,
  organizationNode,
  schemaGraph,
  webPageNode,
  websiteNode,
} from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";
import {
  AnswerBox,
  FaqBlock,
  GeoCta,
  GeoHero,
  GeoPage,
  GeoSection,
} from "@/components/geo/GeoPage";
import "@/app/geo.css";

const PATH = "/faq";
const TITLE = "FAQ — Services, Location, Pricing & IP";
const DESCRIPTION =
  "Answers about EPIC STUDIO: what the studio does, where it is based, its technology stack, pricing model, NDAs, IP ownership and post-launch support.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "FAQ", path: PATH },
];

export default function FaqPage() {
  return (
    <GeoPage crumbs={crumbs}>
      <JsonLd
        data={schemaGraph([
          organizationNode(),
          websiteNode(),
          webPageNode({
            path: PATH,
            title: TITLE,
            description: DESCRIPTION,
            type: "FAQPage",
            crumbs,
          }),
          breadcrumbNode(crumbs, PATH),
          faqNode(COMPANY_FAQS, PATH),
        ])}
      />

      <GeoHero
        eyebrow="Frequently asked questions"
        title={
          <>
            THE DIRECT<br />
            <em>ANSWERS.</em>
          </>
        }
        lead="What EPIC STUDIO does, where it is based, how engagements are priced and what happens after launch. Every answer here is also published as FAQ structured data."
        meta="Studio FAQ"
        actions={false}
      />

      <GeoSection tone="paper">
        <div className="geo-split">
          <div>
            <AnswerBox label="Short version">
              <p>
                EPIC STUDIO is a senior-only technology and design studio based
                in Kolkata, India. It builds enterprise software, mobile apps,
                AI automation, design systems, GovTech platforms and brand
                video for clients worldwide. Engagements are scoped
                individually after discovery.
              </p>
            </AnswerBox>
            <div style={{ marginTop: 24 }}>
              <FaqBlock faqs={COMPANY_FAQS} />
            </div>
          </div>
          <div>
            <table className="geo-table">
              <caption>Quick links</caption>
              <tbody>
                <tr>
                  <th scope="row">Services</th>
                  <td>
                    <Link className="geo-link" href="/services">
                      All six disciplines
                    </Link>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Work</th>
                  <td>
                    <Link className="geo-link" href="/work">
                      Case studies
                    </Link>
                  </td>
                </tr>
                <tr>
                  <th scope="row">About</th>
                  <td>
                    <Link className="geo-link" href="/about">
                      Studio profile
                    </Link>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Contact</th>
                  <td>
                    <Link className="geo-link" href="/contact">
                      Brief a project
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </GeoSection>

      <GeoCta
        title="Question not covered?"
        copy="Send it directly. A principal will answer with specifics rather than routing you through a sales sequence."
      />
    </GeoPage>
  );
}
