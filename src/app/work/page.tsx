import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { CASE_STUDIES } from "@/lib/case-studies";
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
  GeoCta,
  GeoHero,
  GeoPage,
  GeoSection,
} from "@/components/geo/GeoPage";
import "@/app/geo.css";

const PATH = "/work";
const TITLE = "Case Studies — GovTech, AI & Fintech";
const DESCRIPTION =
  "EPIC STUDIO case studies: the West Bengal Education Platform, Omniflow AI and Kairo Mobile, with architecture notes, stacks and reported outcomes.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Work", path: PATH },
];

export default function WorkIndexPage() {
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
        ])}
      />

      <GeoHero
        eyebrow="Selected work"
        title={
          <>
            SYSTEMS IN<br />
            <em>PRODUCTION.</em>
          </>
        }
        lead="Three published engagements across public infrastructure, AI orchestration and cross-border finance. Each case study documents the constraint, the architecture and the reported result — including what the number does and does not prove."
        meta="Case studies"
        actions={false}
      />

      <GeoSection tone="paper">
        <div className="geo-split">
          <div className="geo-prose">
            <AnswerBox label="How to read this page">
              <p>
                The metrics below are EPIC STUDIO&apos;s published project
                results. They are useful directional evidence, not independently
                audited benchmarks. For due diligence, ask for the measurement
                basis, the client reference and the operating period behind each
                number.
              </p>
            </AnswerBox>
            <h2 className="geo-section-title" style={{ marginTop: 32 }}>
              Scale is a constraint, not a badge.
            </h2>
            <p>
              Public examination traffic, real-time enterprise workflows and
              regulated money movement all punish brittle architecture. The
              studio&apos;s work is organised around the failure mode first:
              peak concurrency, irreversible actions, or a dropped connection
              during a payment.
            </p>
          </div>
          <div>
            <table className="geo-table">
              <caption>Case study index</caption>
              <tbody>
                {CASE_STUDIES.map((study) => (
                  <tr key={study.slug}>
                    <th scope="row">{study.category}</th>
                    <td>
                      <Link className="geo-link" href={`/work/${study.slug}`}>
                        {study.name}
                      </Link>
                      <br />
                      <span className="geo-source-publisher">
                        {study.headlineMetric.value}{" "}
                        {study.headlineMetric.label}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </GeoSection>

      <GeoSection tone="light" eyebrow="Case studies" title="Read the detail">
        <div className="geo-grid-3">
          {CASE_STUDIES.map((study, index) => (
            <Link
              className="geo-service-card"
              href={`/work/${study.slug}`}
              key={study.slug}
            >
              <span className="geo-card-index">
                0{index + 1} {"//"} {study.category}
              </span>
              <h3>{study.name}</h3>
              <p>{study.summary}</p>
              <span className="geo-card-more">
                {study.headlineMetric.value} {study.headlineMetric.label} →
              </span>
            </Link>
          ))}
        </div>
      </GeoSection>

      <GeoCta
        title="Bring us the constraint that keeps breaking."
        copy="Peak load, regulated data, a legacy system nobody wants to touch — that is the useful starting point for a conversation."
      />
    </GeoPage>
  );
}
