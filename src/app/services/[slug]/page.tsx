import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/metadata";
import { SERVICES, getService } from "@/lib/services";
import { SITE } from "@/lib/site";
import {
  breadcrumbNode,
  faqNode,
  organizationNode,
  schemaGraph,
  serviceNode,
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
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return buildMetadata({
    title: service.title,
    description: service.description,
    path: `/services/${service.slug}`,
    modifiedTime: `${service.updated}T09:00:00+05:30`,
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const path = `/services/${service.slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.shortName, path },
  ];
  const related = service.related
    .map((relatedSlug) => getService(relatedSlug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <GeoPage crumbs={crumbs}>
      <JsonLd
        data={schemaGraph([
          organizationNode(),
          websiteNode(),
          webPageNode({
            path,
            title: service.title,
            description: service.description,
            crumbs,
            dateModified: `${service.updated}T09:00:00+05:30`,
            mainEntityId: `${SITE.url}/services/${service.slug}#service`,
          }),
          breadcrumbNode(crumbs, path),
          serviceNode(service),
          faqNode(service.faqs, path),
        ])}
      />

      <GeoHero
        eyebrow={service.eyebrow}
        title={
          <>
            {service.name.toUpperCase()}
          </>
        }
        lead={service.summary}
        meta="Service page"
      />

      <GeoSection tone="paper">
        <div className="geo-split">
          <div className="geo-prose">
            <AnswerBox label="Definition">
              <p>{service.definition}</p>
            </AnswerBox>

            <h2 className="geo-section-title" style={{ marginTop: 32 }}>
              What the engagement covers
            </h2>
            <p>{service.summary}</p>
            <p>
              Delivery is led by senior practitioners in {SITE.name}&apos;s
              Kolkata engineering base, with client hubs in Bengaluru, San
              Francisco, London and Singapore. Scope, acceptance criteria and
              exclusions are written into the statement of work before build
              starts.
            </p>

            <h3 style={{ marginTop: 28 }}>Who it is for</h3>
            <ul className="geo-list">
              {service.audience.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <table className="geo-table">
              <caption>At a glance</caption>
              <tbody>
                <tr>
                  <th scope="row">Service</th>
                  <td>{service.name}</td>
                </tr>
                <tr>
                  <th scope="row">Provider</th>
                  <td>{SITE.name}</td>
                </tr>
                <tr>
                  <th scope="row">Base</th>
                  <td>Kolkata, India</td>
                </tr>
                <tr>
                  <th scope="row">Coverage</th>
                  <td>Worldwide, remote-first</td>
                </tr>
                <tr>
                  <th scope="row">Engagement</th>
                  <td>Discovery → build → launch → operate</td>
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
              Last reviewed {service.updated}. This page describes EPIC
              STUDIO&apos;s delivery model; it is not a performance guarantee.
              Scope-specific commitments belong in the signed statement of
              work.
            </div>
          </div>
        </div>
      </GeoSection>

      <GeoSection
        tone="light"
        eyebrow="Deliverables"
        title="What you actually receive"
      >
        <div className="geo-grid-2">
          {service.deliverables.map((item, index) => (
            <article className="geo-card" key={item}>
              <span className="geo-card-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p>{item}</p>
            </article>
          ))}
        </div>
      </GeoSection>

      <GeoSection
        tone="paper"
        eyebrow="Process"
        title="How the work runs"
        id="process"
      >
        <div className="geo-grid-2">
          {service.process.map((step) => (
            <article className="geo-card" key={step.step}>
              <span className="geo-card-index">{step.step}</span>
              <h3>{step.title}</h3>
              <p>{step.detail}</p>
            </article>
          ))}
        </div>
      </GeoSection>

      <GeoSection tone="light" eyebrow="Stack & outcomes" title="Tools and results">
        <div className="geo-split">
          <div>
            <h3>Typical stack</h3>
            <div className="geo-snapshot-links">
              {service.stack.map((item) => (
                <span className="geo-chip" key={item}>
                  {item}
                </span>
              ))}
            </div>
            <p className="geo-source-note" style={{ marginTop: 14 }}>
              Stack is selected per engagement; this is the published
              technology set, not a mandatory bundle.
            </p>
          </div>
          <div>
            <h3>What good looks like</h3>
            <ul className="geo-list">
              {service.outcomes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </GeoSection>

      <GeoSection tone="paper" eyebrow="Questions" title="Frequently asked" id="faq">
        <FaqBlock faqs={service.faqs} />
        <div style={{ marginTop: 24 }}>
          <SourceList
            sources={service.sources}
            note="Primary references used to define the standards and constraints on this page."
          />
        </div>
      </GeoSection>

      {related.length > 0 ? (
        <GeoSection tone="light" eyebrow="Related" title="Adjacent services">
          <div className="geo-grid-3">
            {related.map((item) => (
              <Link
                className="geo-service-card"
                href={`/services/${item.slug}`}
                key={item.slug}
              >
                <span className="geo-card-index">{item.shortName}</span>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <span className="geo-card-more">Explore →</span>
              </Link>
            ))}
          </div>
        </GeoSection>
      ) : null}

      <GeoCta />
    </GeoPage>
  );
}
