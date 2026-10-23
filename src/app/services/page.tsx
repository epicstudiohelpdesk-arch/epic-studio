import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { SERVICES } from "@/lib/services";
import { COMPANY_FAQS } from "@/lib/faqs";
import { REGIONS } from "@/lib/regions";
import { SITE } from "@/lib/site";
import {
  breadcrumbNode,
  faqNode,
  organizationNode,
  schemaGraph,
  serviceListSchema,
  webPageNode,
  websiteNode,
} from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";
import {
  AnswerBox,
  FaqBlock,
  GeoCta,
  GeoPage,
  GeoSection,
  GeoHero,
} from "@/components/geo/GeoPage";
import "@/app/geo.css";

const PATH = "/services";
const TITLE = "Services — Software, Mobile, AI, Design, GovTech & Video";
const DESCRIPTION =
  "Explore EPIC STUDIO's six services: enterprise software engineering, mobile apps, AI automation, UI/UX systems, GovTech platforms and video production.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Services", path: PATH },
];

export default function ServicesPage() {
  const faqs = COMPANY_FAQS.slice(0, 5);

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
            type: "CollectionPage",
            crumbs,
          }),
          breadcrumbNode(crumbs, PATH),
          serviceListSchema(SERVICES),
          faqNode(faqs, PATH),
        ])}
      />

      <GeoHero
        eyebrow="EPIC STUDIO services"
        title={
          <>
            SIX DISCIPLINES.<br />
            <em>ONE DELIVERY SYSTEM.</em>
          </>
        }
        lead="EPIC STUDIO builds digital products end to end: enterprise software, mobile apps, AI automation, design systems, public-sector platforms and brand video. Engage one discipline or assemble the whole studio around a single outcome."
        meta="Services overview"
      />

      <GeoSection tone="paper">
        <div className="geo-split">
          <div className="geo-prose">
            <AnswerBox label="How to choose">
              <p>
                Start with the outcome, not the deliverable. A new revenue
                product usually needs software engineering plus UI/UX; a
                document-heavy operations problem usually starts with AI
                automation; a public-facing service adds accessibility,
                identity and audit requirements. EPIC STUDIO scopes the
                minimum set of disciplines required and names what it is
                deliberately not doing.
              </p>
            </AnswerBox>
            <h2 className="geo-section-title" style={{ marginTop: 32 }}>
              Every engagement starts with constraints.
            </h2>
            <p>
              The studio does not sell fixed packages blind. Discovery covers
              users, existing systems, compliance, data sensitivity and the
              commercial deadline. The output is a system plan, a milestone
              sequence and an explicit list of assumptions — the basis for a
              written proposal.
            </p>
            <p>
              Delivery is senior-led. The people in the architecture review are
              the people writing the code, which removes the handoff layer that
              usually creates technical debt.
            </p>
          </div>
          <div>
            <table className="geo-table">
              <caption>Studio facts</caption>
              <tbody>
                <tr>
                  <th scope="row">Studio</th>
                  <td>{SITE.name}</td>
                </tr>
                <tr>
                  <th scope="row">Headquarters</th>
                  <td>Kolkata, West Bengal, India</td>
                </tr>
                <tr>
                  <th scope="row">Client hubs</th>
                  <td>Bengaluru · San Francisco · London · Singapore</td>
                </tr>
                <tr>
                  <th scope="row">Model</th>
                  <td>Senior practitioners, direct ownership</td>
                </tr>
                <tr>
                  <th scope="row">Coverage</th>
                  <td>Americas · Europe · APAC</td>
                </tr>
                <tr>
                  <th scope="row">Contact</th>
                  <td>
                    <a className="geo-link" href={`mailto:${SITE.email}`}>
                      {SITE.email}
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </GeoSection>

      <GeoSection
        tone="light"
        eyebrow="Capabilities"
        title="Choose a service"
        id="all-services"
      >
        <div className="geo-grid-3">
          {SERVICES.map((service, index) => (
            <Link
              className="geo-service-card"
              href={`/services/${service.slug}`}
              key={service.slug}
            >
              <span className="geo-card-index">
                0{index + 1} {"//"} {service.shortName}
              </span>
              <h3>{service.name}</h3>
              <p>{service.summary.split(". ")[0]}.</p>
              <span className="geo-card-more">Read the service page →</span>
            </Link>
          ))}
        </div>
      </GeoSection>

      <GeoSection tone="paper" eyebrow="Global delivery" title="Where we deliver">
        <div className="geo-split">
          <div className="geo-prose">
            <p>
              All six services are delivered internationally. Region pages cover
              time-zone overlap, data-protection context and the published
              client hub for each market.
            </p>
            <div className="geo-snapshot-links">
              {REGIONS.map((region) => (
                <Link
                  className="geo-chip"
                  href={`/locations/${region.slug}`}
                  key={region.slug}
                >
                  {region.name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <table className="geo-table">
              <caption>Coverage</caption>
              <tbody>
                {REGIONS.map((region) => (
                  <tr key={region.slug}>
                    <th scope="row">{region.name}</th>
                    <td>
                      {region.timezone} · {region.currencyCode}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </GeoSection>

      <GeoSection tone="paper" eyebrow="Questions" title="Service FAQs" id="faq">
        <FaqBlock faqs={faqs} />
      </GeoSection>

      <GeoCta
        title="Not sure which discipline you need?"
        copy="Send the problem and the constraint. We will tell you what the smallest credible engagement looks like — including when the answer is not us."
      />
    </GeoPage>
  );
}
