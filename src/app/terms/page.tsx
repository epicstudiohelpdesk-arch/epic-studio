import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";
import {
  breadcrumbNode,
  organizationNode,
  schemaGraph,
  webPageNode,
  websiteNode,
} from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";
import {
  AnswerBox,
  GeoHero,
  GeoPage,
  GeoSection,
} from "@/components/geo/GeoPage";
import "@/app/geo.css";

const PATH = "/terms";
const TITLE = "Terms of Service — Client Engagement & IP Terms";
const DESCRIPTION =
  "Review EPIC STUDIO terms of service: engagement scoping, IP ownership transfer, payment milestones, code warranties and client governance.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Terms of Service", path: PATH },
];

export default function TermsPage() {
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
            type: "WebPage",
            crumbs,
          }),
          breadcrumbNode(crumbs, PATH),
        ])}
      />

      <GeoHero
        eyebrow="Commercial & Operational Standards"
        title={
          <>
            TERMS OF SERVICE &amp;<br />
            <em>ENGAGEMENT TERMS.</em>
          </>
        }
        lead="Commercial terms, intellectual property ownership, milestone deliveries, and operational standards governing EPIC STUDIO projects."
        meta="Last revised: October 2026"
      />

      <GeoSection tone="paper">
        <div className="geo-split">
          <div className="geo-prose">
            <AnswerBox label="Core Commercial Principle">
              <p>
                <strong>{SITE.name}</strong> operates on a direct, milestone-based
                statement of work (SOW) model. When an engagement completes and payment
                obligations are fulfilled, 100% of bespoke client code, design tokens,
                assets, and intellectual property transfer irrevocably to the client.
              </p>
            </AnswerBox>

            <h2 className="geo-section-title" style={{ marginTop: 32 }}>
              1. Engagement Scoping &amp; Statements of Work
            </h2>
            <p>
              Every engineering, mobile app, AI automation, design system, or media production
              engagement is governed by an executed Statement of Work detailing defined deliverables,
              sprint milestones, acceptance criteria, and project timelines. Any additions or scope
              modifications are documented through mutual written change orders.
            </p>

            <h2 className="geo-section-title" style={{ marginTop: 32 }}>
              2. Intellectual Property Ownership
            </h2>
            <p>
              Clients retain full ownership of their pre-existing proprietary materials, brand trademarks,
              and confidential business logic. Upon settlement of corresponding invoices, all bespoke source
              code, architectures, designs, and digital assets crafted by EPIC STUDIO transfer entirely to
              the client. The studio retains rights only over general-purpose open-source libraries and standard
              utility primitives that pre-existed the engagement.
            </p>

            <h2 className="geo-section-title" style={{ marginTop: 32 }}>
              3. Senior-Led Quality Standards &amp; Warranties
            </h2>
            <p>
              All software is built and verified by senior engineers against agreed automated test suites,
              accessibility benchmarks (WCAG 2.2 AA), and modern security guidelines (OWASP ASVS / MASVS).
              We provide a standard warranty period following production cutover to address any discrepancies
              against agreed specifications.
            </p>

            <h2 className="geo-section-title" style={{ marginTop: 32 }}>
              4. Payment Milestones &amp; Acceptance
            </h2>
            <p>
              Invoicing is tied to verifiable milestone deliverables rather than ambiguous retainer hours.
              Milestone reviews are conducted in production-like staging environments with full transparency,
              ensuring stakeholders validate functionality before sign-off.
            </p>

            <h2 className="geo-section-title" style={{ marginTop: 32 }}>
              5. Governing Law &amp; Dispute Resolution
            </h2>
            <p>
              Commercial agreements are executed under the applicable laws of West Bengal, India, or
              the designated international jurisdiction stipulated in the bespoke Statement of Work.
              For formal inquiries or contract clarifications, contact our legal desk at{" "}
              <a className="geo-link" href={`mailto:${SITE.email}`}>
                {SITE.email}
              </a>.
            </p>
          </div>

          <div>
            <table className="geo-table">
              <caption>Summary Table</caption>
              <tbody>
                <tr>
                  <th scope="row">Model</th>
                  <td>Milestone-based SOW</td>
                </tr>
                <tr>
                  <th scope="row">IP Rights</th>
                  <td>100% assigned upon payment</td>
                </tr>
                <tr>
                  <th scope="row">Team Model</th>
                  <td>Senior staff architects</td>
                </tr>
                <tr>
                  <th scope="row">Warranty</th>
                  <td>Included post-launch period</td>
                </tr>
                <tr>
                  <th scope="row">Inquiries</th>
                  <td>
                    <Link className="geo-link" href="/contact">
                      Request Consultation →
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </GeoSection>
    </GeoPage>
  );
}
