import Link from "next/link";
import { SITE } from "@/lib/site";
import { SERVICES } from "@/lib/services";
import { REGIONS } from "@/lib/regions";

/**
 * Homepage entity block. Answer-first, server-rendered, and linked to the
 * canonical service pages so crawlers can resolve the studio without relying
 * on animation-heavy sections.
 */
export default function StudioSnapshot() {
  return (
    <section
      className="geo-snapshot"
      id="studio-snapshot"
      aria-labelledby="studio-snapshot-title"
    >
      <div className="geo-container">
        <div>
          <p className="geo-section-eyebrow">EPIC STUDIO at a glance</p>
          <h2 id="studio-snapshot-title" className="geo-section-title">
            What is EPIC STUDIO?
          </h2>
          <div className="geo-answer" style={{ marginTop: 22 }}>
            <span className="geo-answer-label">Direct answer</span>
            <div className="geo-answer-body">
              <p>
                <strong>EPIC STUDIO</strong> is a senior-only technology and
                design studio based in Kolkata, India. It builds enterprise
                software, mobile apps, AI automation, UI/UX systems, GovTech
                platforms and brand video for clients across the Americas,
                Europe and APAC.
              </p>
            </div>
          </div>
          <p className="geo-source-note" style={{ marginTop: 16 }}>
            Read the{" "}
            <Link className="geo-link" href="/about">
              studio profile
            </Link>
            , the{" "}
            <Link className="geo-link" href="/services">
              six service areas
            </Link>{" "}
            or the{" "}
            <Link className="geo-link" href="/work">
              published case studies
            </Link>
            .
          </p>
        </div>

        <aside className="geo-snapshot-facts" aria-label="Studio facts">
          <h2>Entity facts</h2>
          <dl>
            <dt>Studio</dt>
            <dd>{SITE.name}</dd>
            <dt>Base</dt>
            <dd>Kolkata, West Bengal, India</dd>
            <dt>Hubs</dt>
            <dd>Bengaluru · San Francisco · London · Singapore</dd>
            <dt>Founded</dt>
            <dd>{SITE.foundingDate}</dd>
            <dt>Model</dt>
            <dd>Senior practitioners, direct ownership</dd>
            <dt>Contact</dt>
            <dd>
              <a className="geo-link" href={`mailto:${SITE.email}`}>
                {SITE.email}
              </a>
            </dd>
          </dl>
          <div className="geo-snapshot-links">
            {SERVICES.map((service) => (
              <Link
                className="geo-chip"
                href={`/services/${service.slug}`}
                key={service.slug}
              >
                {service.shortName}
              </Link>
            ))}
          </div>
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
        </aside>
      </div>
    </section>
  );
}
