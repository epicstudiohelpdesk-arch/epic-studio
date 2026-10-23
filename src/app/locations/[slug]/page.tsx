import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/metadata";
import {
  REGIONS,
  HREFLANG_LANGUAGES,
  REGION_GEO,
  getRegion,
} from "@/lib/regions";
import { SERVICES } from "@/lib/services";
import { CASE_STUDIES } from "@/lib/case-studies";
import { SITE } from "@/lib/site";
import {
  breadcrumbNode,
  faqNode,
  organizationNode,
  regionNode,
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
  SourceList,
} from "@/components/geo/GeoPage";
import "@/app/geo.css";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return REGIONS.map((region) => ({ slug: region.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const region = getRegion(slug);
  if (!region) return {};

  const geo = REGION_GEO[region.slug];

  return buildMetadata({
    title: `Software, AI & Design Services for ${region.name}`,
    description: region.metaDescription,
    path: `/locations/${region.slug}`,
    locale: region.ogLocale,
    geoRegion: geo.region,
    geoPlacename: geo.placename,
    languages: HREFLANG_LANGUAGES,
    modifiedTime: `${region.updated}T09:00:00+05:30`,
  });
}

export default async function RegionPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const region = getRegion(slug);
  if (!region) notFound();

  const path = `/locations/${region.slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Global delivery", path: "/locations" },
    { name: region.name, path },
  ];
  const related = REGIONS.filter((item) => item.slug !== region.slug);

  return (
    <GeoPage crumbs={crumbs}>
      <JsonLd
        data={schemaGraph([
          organizationNode(),
          websiteNode(),
          webPageNode({
            path,
            title: `Software, AI & Design Services for ${region.name}`,
            description: region.overview,
            crumbs,
            dateModified: `${region.updated}T09:00:00+05:30`,
            mainEntityId: `${SITE.url}/locations/${region.slug}#service`,
          }),
          breadcrumbNode(crumbs, path),
          regionNode(region),
          faqNode(region.faqs, path),
        ])}
      />

      <GeoHero
        eyebrow={`Serving ${region.market}`}
        title={
          <>
            BUILT FOR<br />
            <em>{region.shortName.toUpperCase()}.</em>
          </>
        }
        lead={region.overview}
        meta={`${region.timezone} · ${region.currencyCode}`}
        actions={false}
      />

      <GeoSection tone="paper">
        <div className="geo-split">
          <div className="geo-prose">
            <AnswerBox label="Direct answer">
              <p>
                EPIC STUDIO provides software engineering, mobile development,
                AI automation, UI/UX systems, GovTech platforms and video
                production to clients in {region.name}. Work is delivered from
                the Kolkata engineering base with {region.timezone} overlap,
                and scoped around the client&apos;s data-protection and
                accessibility obligations.
              </p>
            </AnswerBox>

            <h2 className="geo-section-title" style={{ marginTop: 32 }}>
              What changes in {region.name}
            </h2>
            {region.context.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div>
            <table className="geo-table">
              <caption>Engagement facts</caption>
              <tbody>
                <tr>
                  <th scope="row">Market</th>
                  <td>{region.market}</td>
                </tr>
                <tr>
                  <th scope="row">Time zone</th>
                  <td>{region.timezone}</td>
                </tr>
                <tr>
                  <th scope="row">Client hub</th>
                  <td>{region.hub ?? "Remote coverage"}</td>
                </tr>
                <tr>
                  <th scope="row">Currency</th>
                  <td>{region.currency} ({region.currencyCode}), agreed per proposal</td>
                </tr>
                <tr>
                  <th scope="row">Delivery base</th>
                  <td>Kolkata, India</td>
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
            <div className="geo-evidence-note">
              No local registered office is claimed unless explicitly published.
              Client hubs are collaboration points; contracting details are
              confirmed in the statement of work.
            </div>
          </div>
        </div>
      </GeoSection>

      <GeoSection tone="light" eyebrow="Services" title={`What we deliver in ${region.name}`}>
        <div className="geo-grid-2">
          {SERVICES.map((service) => (
            <article className="geo-card" key={service.slug}>
              <span className="geo-card-index">{service.shortName}</span>
              <h3>
                <Link className="geo-link" href={`/services/${service.slug}`}>
                  {service.name}
                </Link>
              </h3>
              <p>
                {region.serviceNotes[service.slug] ?? service.description}
              </p>
            </article>
          ))}
        </div>
      </GeoSection>

      <GeoSection tone="paper" eyebrow="Delivery" title="How the time zone and data rules work">
        <div className="geo-split">
          <div>
            <h3>Working overlap</h3>
            <p className="geo-source-note">{region.timezoneNote}</p>
            <ul className="geo-list">
              {region.delivery.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Compliance and standards</h3>
            <ul className="geo-list">
              {region.compliance.map((item) => (
                <li key={item.url}>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    {item.title}
                  </a>{" "}
                  <span className="geo-source-publisher">— {item.publisher}</span>
                </li>
              ))}
            </ul>
            <p className="geo-source-note" style={{ marginTop: 14 }}>
              Compliance mapping is scoped per engagement. This page is
              general information, not legal advice.
            </p>
          </div>
        </div>
      </GeoSection>

      <GeoSection tone="light" eyebrow="Proof" title="Published work">
        <div className="geo-grid-3">
          {CASE_STUDIES.map((study) => (
            <Link
              className="geo-service-card"
              href={`/work/${study.slug}`}
              key={study.slug}
            >
              <span className="geo-card-index">{study.category}</span>
              <h3>{study.name}</h3>
              <p>
                {study.headlineMetric.value} {study.headlineMetric.label}
              </p>
              <span className="geo-card-more">Read case study →</span>
            </Link>
          ))}
        </div>
      </GeoSection>

      <GeoSection
        tone="paper"
        eyebrow="Questions"
        title={`${region.name} delivery FAQ`}
        id="faq"
      >
        <FaqBlock faqs={region.faqs} />
        <div style={{ marginTop: 24 }}>
          <SourceList
            sources={region.sources}
            note="Primary references used for the compliance and accessibility context on this page."
          />
        </div>
      </GeoSection>

      <GeoSection tone="light" eyebrow="Other markets" title="Explore another region">
        <div className="geo-grid-3">
          {related.map((item) => (
            <Link
              className="geo-service-card"
              href={`/locations/${item.slug}`}
              key={item.slug}
            >
              <span className="geo-card-index">{item.hreflang}</span>
              <h3>{item.name}</h3>
              <p>{item.overview}</p>
              <span className="geo-card-more">View region →</span>
            </Link>
          ))}
        </div>
      </GeoSection>

      <GeoCta
        title={`Planning a launch for ${region.name}?`}
        copy={`Send the market, the compliance constraint and the date. We will respond with the delivery shape and the questions that must be answered first.`}
      />
    </GeoPage>
  );
}
