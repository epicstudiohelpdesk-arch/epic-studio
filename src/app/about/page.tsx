import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { SERVICES } from "@/lib/services";
import { CASE_STUDIES } from "@/lib/case-studies";
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
  GeoCta,
  GeoHero,
  GeoPage,
  GeoSection,
} from "@/components/geo/GeoPage";
import "@/app/geo.css";

const PATH = "/about";
const TITLE = "Studio, Model & Locations";
const DESCRIPTION =
  "EPIC STUDIO is a senior-only technology and design studio based in Kolkata, India, with client hubs in Bengaluru, San Francisco, London and Singapore.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "About", path: PATH },
];

export default function AboutPage() {
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
            type: "AboutPage",
            crumbs,
          }),
          breadcrumbNode(crumbs, PATH),
        ])}
      />

      <GeoHero
        eyebrow="About the studio"
        title={
          <>
            A STUDIO BUILT<br />
            <em>AROUND THE WORK.</em>
          </>
        }
        lead="EPIC STUDIO is a multidisciplinary technology and design studio. It combines software engineering, mobile, AI, design systems, GovTech and video production under one senior-led delivery model."
        meta="Company profile"
      />

      <GeoSection tone="paper">
        <div className="geo-split">
          <div className="geo-prose">
            <AnswerBox label="Entity summary">
              <p>
                <strong>{SITE.name}</strong> is a technology and design studio
                headquartered in Kolkata, West Bengal, India. It was founded in{" "}
                {SITE.foundingDate} and delivers enterprise software, mobile
                apps, AI automation, UI/UX systems, GovTech platforms and video
                production to clients across the Americas, Europe and APAC.
              </p>
            </AnswerBox>

            <h2 className="geo-section-title" style={{ marginTop: 32 }}>
              What the studio believes
            </h2>
            <p>
              Software should survive contact with real traffic. Design should
              survive handoff to engineering. AI should survive an evaluation
              set. Those three sentences describe most of the studio&apos;s
              operating standards — and most of the reasons projects fail
              elsewhere.
            </p>
            <p>
              The delivery model is deliberately senior-heavy. There is no
              layer of account managers translating requirements to a junior
              build team. The people in the architecture review remain
              accountable through launch.
            </p>

            <h3 style={{ marginTop: 28 }}>Published principles</h3>
            <ul className="geo-list">
              <li>Make it useful before making it beautiful.</li>
              <li>Build for production scale, not the demo.</li>
              <li>One team, one accountability line.</li>
              <li>Remove unnecessary process before adding tools.</li>
              <li>Design every system with room to evolve.</li>
            </ul>
          </div>

          <div>
            <table className="geo-table">
              <caption>Entity facts</caption>
              <tbody>
                <tr>
                  <th scope="row">Name</th>
                  <td>{SITE.name}</td>
                </tr>
                <tr>
                  <th scope="row">Type</th>
                  <td>Technology & design studio</td>
                </tr>
                <tr>
                  <th scope="row">Founded</th>
                  <td>{SITE.foundingDate}</td>
                </tr>
                <tr>
                  <th scope="row">Headquarters</th>
                  <td>Kolkata, West Bengal, India</td>
                </tr>
                <tr>
                  <th scope="row">Client hubs</th>
                  <td>
                    Bengaluru · San Francisco · London · Singapore
                    <br />
                    <Link className="geo-link" href="/locations">
                      Global delivery model →
                    </Link>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Languages</th>
                  <td>English · Hindi</td>
                </tr>
                <tr>
                  <th scope="row">Website</th>
                  <td>
                    <a className="geo-link" href={SITE.url}>
                      {SITE.domain}
                    </a>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Email</th>
                  <td>
                    <a className="geo-link" href={`mailto:${SITE.email}`}>
                      {SITE.email}
                    </a>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Phone</th>
                  <td>{SITE.phones[0].replace(/-/g, " ")}</td>
                </tr>
                <tr>
                  <th scope="row">Instagram</th>
                  <td>
                    <a
                      className="geo-link"
                      href="https://www.instagram.com/epic_studio.2024"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      @epic_studio.2024
                    </a>
                  </td>
                </tr>
                <tr>
                  <th scope="row">LinkedIn</th>
                  <td>
                    <a
                      className="geo-link"
                      href="https://www.linkedin.com/in/epic-studio-630a97341"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      EPIC STUDIO
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="geo-evidence-note">
              Entity facts on this page are the canonical values used in the
              site&apos;s structured data. If a third-party profile disagrees,
              this page and the contact page take precedence.
            </div>
          </div>
        </div>
      </GeoSection>

      <GeoSection tone="light" eyebrow="Disciplines" title="What the studio does">
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

      <GeoSection tone="paper" eyebrow="Operating model" title="How engagements work">
        <div className="geo-grid-2">
          <article className="geo-card">
            <span className="geo-card-index">01</span>
            <h3>Discovery before commitment</h3>
            <p>
              We map users, systems, compliance and the commercial deadline.
              The output is a system plan and milestone sequence — not an
              optimistic estimate.
            </p>
          </article>
          <article className="geo-card">
            <span className="geo-card-index">02</span>
            <h3>Senior practitioners</h3>
            <p>
              Architecture, implementation and design are led by the people
              accountable for the outcome. No handoff maze between pitch and
              build.
            </p>
          </article>
          <article className="geo-card">
            <span className="geo-card-index">03</span>
            <h3>Production-shaped increments</h3>
            <p>
              Work ships behind flags in short increments with tests,
              observability and rollback from the start.
            </p>
          </article>
          <article className="geo-card">
            <span className="geo-card-index">04</span>
            <h3>Handover that holds</h3>
            <p>
              Architecture decision records, runbooks and documented operating
              procedures mean your team can own the system after launch.
            </p>
          </article>
        </div>
      </GeoSection>

      <GeoSection tone="light" eyebrow="Proof" title="Selected work">
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

      <GeoCta
        title="Want the direct version?"
        copy="Skip the pitch deck. Send the constraint, the system and the deadline; we will respond with the architecture questions that matter."
      />
    </GeoPage>
  );
}
