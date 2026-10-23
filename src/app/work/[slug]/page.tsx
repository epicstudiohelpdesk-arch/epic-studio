import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/metadata";
import { CASE_STUDIES, getCaseStudy } from "@/lib/case-studies";
import { SITE } from "@/lib/site";
import {
  breadcrumbNode,
  caseStudyNode,
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

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return CASE_STUDIES.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};

  return buildMetadata({
    title: study.title,
    description: study.description,
    path: `/work/${study.slug}`,
    type: "article",
    modifiedTime: `${study.updated}T09:00:00+05:30`,
  });
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const path = `/work/${study.slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Work", path: "/work" },
    { name: study.name, path },
  ];
  const others = CASE_STUDIES.filter((item) => item.slug !== study.slug);

  return (
    <GeoPage crumbs={crumbs}>
      <JsonLd
        data={schemaGraph([
          organizationNode(),
          websiteNode(),
          webPageNode({
            path,
            title: study.title,
            description: study.description,
            type: "WebPage",
            crumbs,
            dateModified: `${study.updated}T09:00:00+05:30`,
            mainEntityId: `${SITE.url}/work/${study.slug}#article`,
          }),
          breadcrumbNode(crumbs, path),
          caseStudyNode(study),
          faqNode(study.faqs, path),
        ])}
      />

      <GeoHero
        eyebrow={study.category}
        title={study.name.toUpperCase()}
        lead={study.summary}
        meta="Case study"
        actions={false}
      />

      <GeoSection tone="paper">
        <div className="geo-split">
          <div className="geo-prose">
            <AnswerBox label="Result">
              <p>
                {study.headlineMetric.value} —{" "}
                {study.headlineMetric.label}. The figure is EPIC STUDIO&apos;s
                published project result; the measurement basis is noted below.
              </p>
            </AnswerBox>
            <h2 className="geo-section-title" style={{ marginTop: 32 }}>
              The constraint
            </h2>
            <p>{study.challenge}</p>
          </div>
          <div>
            <div className="geo-metrics">
              {study.metrics.map((metric) => (
                <div className="geo-metric" key={metric.label}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </div>
              ))}
            </div>
            <div className="geo-evidence-note">
              Evidence note: outcome figures are studio-reported. They are not
              independently audited. Confirm the measurement method, client
              reference and operating period before relying on them in
              procurement or investment decisions.
            </div>
          </div>
        </div>
      </GeoSection>

      <GeoSection tone="light" eyebrow="Approach" title="How we solved it">
        <ul className="geo-list">
          {study.approach.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </GeoSection>

      <GeoSection tone="paper" eyebrow="Architecture" title="System shape">
        <div className="geo-grid-2">
          {study.architecture.map((item, index) => (
            <article className="geo-card" key={item}>
              <span className="geo-card-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p>{item}</p>
            </article>
          ))}
        </div>
      </GeoSection>

      <GeoSection tone="light" eyebrow="Stack" title="Technology used">
        <div className="geo-snapshot-links">
          {study.stack.map((item) => (
            <span className="geo-chip" key={item}>
              {item}
            </span>
          ))}
        </div>
        <div className="geo-split" style={{ marginTop: 32 }}>
          <div className="geo-prose">
            <h3>What this case study demonstrates</h3>
            <p>
              The useful signal is not the headline number alone. It is the
              design decision behind it: separating reads from writes under
              civic peak load, keeping irreversible workflow actions behind
              approval gates, or making a payment flow idempotent when the
              network drops.
            </p>
          </div>
          <div>
            <table className="geo-table">
              <caption>Engagement facts</caption>
              <tbody>
                <tr>
                  <th scope="row">Studio</th>
                  <td>{SITE.name}</td>
                </tr>
                <tr>
                  <th scope="row">Category</th>
                  <td>{study.category}</td>
                </tr>
                <tr>
                  <th scope="row">Delivery base</th>
                  <td>Kolkata, India</td>
                </tr>
                <tr>
                  <th scope="row">Last reviewed</th>
                  <td>{study.updated}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </GeoSection>

      <GeoSection tone="paper" eyebrow="Questions" title="Case study FAQs" id="faq">
        <FaqBlock faqs={study.faqs} />
      </GeoSection>

      <GeoSection tone="light" eyebrow="More work" title="Other case studies">
        <div className="geo-grid-2">
          {others.map((item) => (
            <Link
              className="geo-service-card"
              href={`/work/${item.slug}`}
              key={item.slug}
            >
              <span className="geo-card-index">{item.category}</span>
              <h3>{item.name}</h3>
              <p>{item.summary}</p>
              <span className="geo-card-more">Read case study →</span>
            </Link>
          ))}
        </div>
      </GeoSection>

      <GeoCta
        title="Have a similar constraint?"
        copy="Send the scale, the failure mode and the deadline. We will tell you what architecture we would test first."
      />
    </GeoPage>
  );
}
