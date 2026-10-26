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

const PATH = "/privacy";
const TITLE = "Privacy Policy — Data Protection & Privacy Standards";
const DESCRIPTION =
  "Read the EPIC STUDIO privacy policy: how personal data, analytics, client confidentiality and security are managed under the DPDP Act, GDPR and CCPA.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Privacy Policy", path: PATH },
];

export default function PrivacyPage() {
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
        eyebrow="Legal & Data Governance"
        title={
          <>
            PRIVACY POLICY &amp;<br />
            <em>DATA PROTECTION.</em>
          </>
        }
        lead="How EPIC STUDIO handles information across our public platforms, client communications, and active project engagements."
        meta="Last revised: October 2026"
      />

      <GeoSection tone="paper">
        <div className="geo-split">
          <div className="geo-prose">
            <AnswerBox label="Commitment to Privacy">
              <p>
                <strong>{SITE.name}</strong> operates with strict confidentiality,
                minimalist data collection, and robust compliance with international
                data protection frameworks including India&apos;s Digital Personal Data
                Protection Act (DPDP Act 2023), the European Union General Data
                Protection Regulation (GDPR), and the California Consumer Privacy Act
                (CCPA/CPRA).
              </p>
            </AnswerBox>

            <h2 className="geo-section-title" style={{ marginTop: 32 }}>
              1. Information We Collect
            </h2>
            <p>
              We only collect data that you voluntarily provide when contacting us,
              requesting a project consultation, or submitting inquiries via our website:
            </p>
            <ul className="geo-list">
              <li><strong>Contact Information:</strong> Name, professional email address, phone number, and organization name.</li>
              <li><strong>Project Inquiries:</strong> Technical specifications, budget ranges, and project scopes submitted through our brief forms.</li>
              <li><strong>Technical Telemetry:</strong> Aggregated, privacy-focused browser and device metrics used solely to ensure site performance, security, and rendering reliability.</li>
            </ul>

            <h2 className="geo-section-title" style={{ marginTop: 32 }}>
              2. How We Use Information
            </h2>
            <p>
              Information gathered is strictly utilized to evaluate and respond to project inquiries,
              draft non-disclosure agreements (NDAs) and statements of work, deliver engineering
              services, and uphold system security. We never sell, lease, or monetize your contact
              details or business information to third parties.
            </p>

            <h2 className="geo-section-title" style={{ marginTop: 32 }}>
              3. Client Confidentiality &amp; NDAs
            </h2>
            <p>
              Client source code, proprietary algorithms, database schemas, and business roadmaps
              are protected under rigorous mutual non-disclosure agreements executed before any project
              discovery begins. All engineering environments enforce least-privilege role-based access,
              encrypted storage at rest, and secure transit via modern TLS protocols.
            </p>

            <h2 className="geo-section-title" style={{ marginTop: 32 }}>
              4. Cookies and Web Storage
            </h2>
            <p>
              Our website uses strictly essential session markers and basic performance counters to
              maintain display states (such as navigation menus and theme preferences). We do not deploy
              intrusive cross-site tracking cookies.
            </p>

            <h2 className="geo-section-title" style={{ marginTop: 32 }}>
              5. Your Rights and Contact Information
            </h2>
            <p>
              You maintain the right to inspect, correct, export, or request deletion of your
              personal records at any time. For privacy inquiries or compliance requests,
              reach our data protection officer directly at{" "}
              <a className="geo-link" href={`mailto:${SITE.email}`}>
                {SITE.email}
              </a>{" "}
              or via telephone at {SITE.phones[0]}.
            </p>
          </div>

          <div>
            <table className="geo-table">
              <caption>Governance Overview</caption>
              <tbody>
                <tr>
                  <th scope="row">Entity</th>
                  <td>{SITE.name}</td>
                </tr>
                <tr>
                  <th scope="row">Jurisdiction</th>
                  <td>India (West Bengal)</td>
                </tr>
                <tr>
                  <th scope="row">Frameworks</th>
                  <td>DPDP Act 2023 · GDPR · CCPA</td>
                </tr>
                <tr>
                  <th scope="row">Data Controller</th>
                  <td>contact@epic-studio.in</td>
                </tr>
                <tr>
                  <th scope="row">Direct Contact</th>
                  <td>
                    <Link className="geo-link" href="/contact">
                      Contact Team →
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
