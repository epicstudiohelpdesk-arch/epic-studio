import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { REGIONS, HREFLANG_LANGUAGES } from "@/lib/regions";
import { SERVICES } from "@/lib/services";
import { SITE } from "@/lib/site";
import {
  breadcrumbNode,
  faqNode,
  organizationNode,
  regionListSchema,
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

const PATH = "/locations";
const TITLE = "Global Delivery — USA, UK, Europe, UAE, Singapore & India";
const DESCRIPTION =
  "EPIC STUDIO delivers software, mobile, AI, design and video for clients in the USA, UK, Europe, UAE/Dubai, Singapore and India, with regional compliance and time-zone overlap.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  languages: HREFLANG_LANGUAGES,
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Global delivery", path: PATH },
];

const FAQS = [
  {
    question: "Where does EPIC STUDIO deliver from?",
    answer:
      "EPIC STUDIO's engineering base is in Kolkata, West Bengal, India. It publishes client hubs in Bengaluru, San Francisco, London and Singapore and delivers remotely to clients across the Americas, Europe, the Middle East and APAC.",
  },
  {
    question: "Does EPIC STUDIO have offices in the USA, UK, Europe or Dubai?",
    answer:
      "EPIC STUDIO publishes client hubs in San Francisco, London and Singapore. It does not claim registered offices in every market. Contracting entities and any on-site requirements are confirmed in the statement of work for each engagement.",
  },
  {
    question: "How do you work across time zones?",
    answer:
      "Engagements are scheduled around a shared overlap window. The Kolkata base overlaps with Gulf Standard Time almost fully, with Europe and the UK through their morning and early afternoon, and with US Eastern and Pacific business hours in the evening IST.",
  },
  {
    question: "Can you meet regional compliance requirements?",
    answer:
      "Discovery maps the applicable data-protection, accessibility and procurement requirements for the client's jurisdiction. This can include UK GDPR, EU GDPR, UAE PDPL, Singapore PDPA, India's DPDP Act, CCPA/CPRA and WCAG 2.2 AA.",
  },
  {
    question: "Which services are available internationally?",
    answer:
      "All six services are delivered internationally: software and product engineering, mobile app development, AI automation and cloud DevOps, UI/UX and brand systems, GovTech and public platforms, and video and motion production.",
  },
  {
    question: "How is international work priced?",
    answer:
      "Engagements are scoped and quoted after discovery. The invoicing currency and payment terms are agreed in the commercial proposal; the studio does not publish a rate card.",
  },
];

export default function LocationsPage() {
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
          regionListSchema(REGIONS),
          faqNode(FAQS, PATH),
        ])}
      />

      <GeoHero
        eyebrow="Global delivery"
        title={
          <>
            ONE STUDIO.<br />
            <em>MULTIPLE MARKETS.</em>
          </>
        }
        lead="EPIC STUDIO delivers software, mobile, AI, design, GovTech and video for clients in the USA, UK, Europe, UAE, Singapore and India. Each region page covers time-zone overlap, data-protection context and how engagements are scoped."
        meta="International coverage"
        actions={false}
      />

      <GeoSection tone="paper">
        <div className="geo-split">
          <div className="geo-prose">
            <AnswerBox label="Direct answer">
              <p>
                EPIC STUDIO is headquartered in Kolkata, India, and works with
                clients across the Americas, Europe, the Middle East and APAC.
                It publishes client hubs in San Francisco, London and Singapore,
                and scopes each engagement around the client&apos;s time zone,
                data-protection regime and accessibility obligations.
              </p>
            </AnswerBox>
            <h2 className="geo-section-title" style={{ marginTop: 32 }}>
              Global reach without fake local offices.
            </h2>
            <p>
              Many agencies manufacture a city page for every market and claim
              an office they do not have. That creates a short-term keyword
              footprint and a long-term trust problem. This site does the
              opposite: one honest delivery model, six region pages with real
              regional context, and schema that only claims locations the
              studio actually publishes.
            </p>
            <p>
              Every region page links to the same six service pages. The service
              page explains what is delivered; the region page explains the
              time-zone, compliance and commercial context around it.
            </p>
          </div>
          <div>
            <table className="geo-table">
              <caption>Coverage at a glance</caption>
              <tbody>
                {REGIONS.map((region) => (
                  <tr key={region.slug}>
                    <th scope="row">
                      <Link className="geo-link" href={`/locations/${region.slug}`}>
                        {region.name}
                      </Link>
                    </th>
                    <td>
                      {region.timezone} · {region.currencyCode}
                      {region.hub ? ` · ${region.hub} hub` : " · remote coverage"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="geo-evidence-note">
              Client hubs are published collaboration points, not registered
              offices. Contracting details are confirmed per engagement.
            </div>
          </div>
        </div>
      </GeoSection>

      <GeoSection tone="light" eyebrow="Markets" title="Choose your region">
        <div className="geo-grid-3">
          {REGIONS.map((region, index) => (
            <Link
              className="geo-service-card"
              href={`/locations/${region.slug}`}
              key={region.slug}
            >
              <span className="geo-card-index">
                0{index + 1} {"//"} {region.hreflang}
              </span>
              <h3>{region.name}</h3>
              <p>{region.overview}</p>
              <span className="geo-card-more">
                {region.timezone} · {region.currencyCode} →
              </span>
            </Link>
          ))}
        </div>
      </GeoSection>

      <GeoSection tone="paper" eyebrow="Services" title="Available in every region">
        <div className="geo-grid-3">
          {SERVICES.map((service) => (
            <Link
              className="geo-service-card"
              href={`/services/${service.slug}`}
              key={service.slug}
            >
              <span className="geo-card-index">{service.shortName}</span>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <span className="geo-card-more">Service detail →</span>
            </Link>
          ))}
        </div>
      </GeoSection>

      <GeoSection tone="light" eyebrow="Questions" title="International delivery FAQ" id="faq">
        <FaqBlock faqs={FAQS} />
      </GeoSection>

      <GeoCta
        title="Need a team that works your hours?"
        copy={`Tell us the market, the compliance constraint and the deadline. Email ${SITE.email} or book a consultation.`}
      />
    </GeoPage>
  );
}
