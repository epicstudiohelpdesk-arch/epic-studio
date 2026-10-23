import Link from "next/link";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import type { Crumb } from "@/lib/schema";
import type { Faq, Source } from "@/lib/services";
import { SITE, CONTENT_UPDATED } from "@/lib/site";

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav className="geo-crumbs" aria-label="Breadcrumb">
      <ol>
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <li key={crumb.path}>
              {isLast ? (
                <span aria-current="page">{crumb.name}</span>
              ) : (
                <Link href={crumb.path}>{crumb.name}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function GeoPage({
  children,
  crumbs,
}: {
  children: React.ReactNode;
  crumbs: Crumb[];
}) {
  return (
    <div className="geo-page">
      <Header />
      <main id="geo-main" className="geo-main">
        <div className="geo-crumb-band">
          <div className="geo-container">
            <Breadcrumbs crumbs={crumbs} />
          </div>
        </div>
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}

export function GeoHero({
  eyebrow,
  title,
  lead,
  meta,
  actions = true,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead: string;
  meta?: string;
  actions?: boolean;
}) {
  return (
    <header className="geo-hero">
      <div className="geo-hero-grid" aria-hidden="true" />
      <div className="geo-container">
        <p className="geo-eyebrow">{eyebrow}</p>
        <h1 className="geo-title">{title}</h1>
        <p className="geo-lead">{lead}</p>
        <p className="geo-meta">
          {meta ? `${meta} · ` : ""}Last reviewed {CONTENT_UPDATED} by {SITE.name}
        </p>
        {actions ? (
          <div className="geo-actions">
            <Link className="geo-btn geo-btn-primary" href="/contact">
              Book a consultation <span aria-hidden="true">→</span>
            </Link>
            <Link className="geo-btn geo-btn-ghost" href="/work">
              See case studies
            </Link>
          </div>
        ) : null}
      </div>
    </header>
  );
}

export function AnswerBox({
  label = "Direct answer",
  children,
}: {
  label?: string;
  children: React.ReactNode;
}) {
  return (
    <aside className="geo-answer" aria-label={label}>
      <span className="geo-answer-label">{label}</span>
      <div className="geo-answer-body">{children}</div>
    </aside>
  );
}

export function GeoSection({
  id,
  eyebrow,
  title,
  children,
  tone = "light",
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  children: React.ReactNode;
  tone?: "light" | "paper" | "dark";
}) {
  return (
    <section id={id} className={`geo-section geo-section-${tone}`}>
      <div className="geo-container">
        {eyebrow || title ? (
          <header className="geo-section-head">
            {eyebrow ? <p className="geo-section-eyebrow">{eyebrow}</p> : null}
            {title ? <h2 className="geo-section-title">{title}</h2> : null}
          </header>
        ) : null}
        {children}
      </div>
    </section>
  );
}

export function FaqBlock({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="geo-faq">
      {faqs.map((faq) => (
        <article className="geo-faq-item" key={faq.question}>
          <h3 className="geo-faq-q">{faq.question}</h3>
          <p className="geo-faq-a">{faq.answer}</p>
        </article>
      ))}
    </div>
  );
}

export function SourceList({
  sources,
  note,
}: {
  sources: Source[];
  note?: string;
}) {
  return (
    <div className="geo-sources">
      {note ? <p className="geo-source-note">{note}</p> : null}
      <ol>
        {sources.map((source) => (
          <li key={source.url}>
            <a href={source.url} target="_blank" rel="noopener noreferrer">
              {source.title}
            </a>
            <span className="geo-source-publisher"> — {source.publisher}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function GeoCta({
  title = "Have a brief that needs senior hands?",
  copy = "Tell us the outcome, the constraints and the deadline. We will come back with a scoped plan, not a generic deck.",
}: {
  title?: string;
  copy?: string;
}) {
  return (
    <section className="geo-cta">
      <div className="geo-container geo-cta-inner">
        <div>
          <p className="geo-eyebrow">Next step</p>
          <h2 className="geo-cta-title">{title}</h2>
          <p className="geo-cta-copy">{copy}</p>
        </div>
        <div className="geo-cta-actions">
          <Link className="geo-btn geo-btn-primary" href="/contact">
            Start a conversation <span aria-hidden="true">→</span>
          </Link>
          <a className="geo-btn geo-btn-ghost" href={`mailto:${SITE.email}`}>
            {SITE.email}
          </a>
        </div>
      </div>
    </section>
  );
}
