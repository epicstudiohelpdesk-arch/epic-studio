"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import useRevealOnScroll from "./useRevealOnScroll";
import "./PricingSection.css";

type Currency = "INR" | "USD";
type BillingModel = "sprint" | "monthly";

interface TierPlan {
  id: string;
  name: string;
  tagline: string;
  badge?: string;
  isPopular?: boolean;
  priceSprintINR: string;
  priceSprintUSD: string;
  priceMonthlyINR: string;
  priceMonthlyUSD: string;
  timelineSprint: string;
  timelineMonthly: string;
  description: string;
  deliverables: string[];
  ctaText: string;
}

const PRICING_TIERS: TierPlan[] = [
  {
    id: "mvp",
    name: "SPRINT MVP",
    tagline: "For early founders & rapid idea validation",
    badge: "FOUNDER SPRINT",
    isPopular: false,
    priceSprintINR: "₹24,999",
    priceSprintUSD: "$349",
    priceMonthlyINR: "₹49,999",
    priceMonthlyUSD: "$649",
    timelineSprint: "10 – 14 Days Delivery",
    timelineMonthly: "Continuous Monthly Sprints",
    description:
      "A production-grade web application engineered with 60FPS fluid UI, rock-solid auth, cloud hosting, and zero technical debt.",
    deliverables: [
      "Production Next.js / React application",
      "Figma design system & responsive UI/UX",
      "Supabase / PostgreSQL database & schema",
      "Authentication & transactional email capture",
      "Automated Vercel / Cloudflare CI/CD deploy",
      "100% Code & IP ownership transferred",
      "14-day complimentary bug warranty",
    ],
    ctaText: "START MVP SPRINT",
  },
  {
    id: "growth",
    name: "GROWTH BUILD",
    tagline: "Full-stack scalable web & mobile platform",
    badge: "RECOMMENDED",
    isPopular: true,
    priceSprintINR: "₹69,999",
    priceSprintUSD: "$899",
    priceMonthlyINR: "₹1,24,999",
    priceMonthlyUSD: "$1,599",
    timelineSprint: "3 – 4 Weeks Delivery",
    timelineMonthly: "Dedicated Engineering Pod",
    description:
      "Complete product ecosystem with cross-platform mobile apps, secure payments, role-based controls, and operational admin telemetry.",
    deliverables: [
      "Full-stack Web + iOS/Android mobile product",
      "Custom REST / GraphQL APIs (Node.js / Go)",
      "Payment gateway integration (Stripe / Razorpay)",
      "Role-Based Access Control (RBAC) & teams",
      "Custom admin management & analytics console",
      "Dockerized CI/CD automated pipeline",
      "Strict Bilateral NDA & IP assignment deed",
      "30-day post-launch warranty & SLA support",
    ],
    ctaText: "BUILD FULL PRODUCT",
  },
  {
    id: "ai",
    name: "AI & SCALE",
    tagline: "Autonomous multi-agent loops & RAG pipelines",
    badge: "ENTERPRISE AUTOMATION",
    isPopular: false,
    priceSprintINR: "₹1,49,999",
    priceSprintUSD: "$1,899",
    priceMonthlyINR: "₹2,49,999",
    priceMonthlyUSD: "$3,199",
    timelineSprint: "4 – 6 Weeks Delivery",
    timelineMonthly: "Continuous AI Systems Retainer",
    description:
      "Compounding operational leverage with sub-50ms vector retrieval, autonomous multi-model agent orchestration, and distributed workflows.",
    deliverables: [
      "Autonomous agent loops & tool orchestration",
      "Sub-50ms vector search & RAG (pgvector / Qdrant)",
      "Multi-model routing (Claude, GPT, Gemini)",
      "Event-driven background queues (Redis / Inngest)",
      "Cost guardrails, rate limiting & trace telemetry",
      "OpenTelemetry & Langfuse observability stack",
      "Enterprise security audit & IP assignment",
      "45-day post-launch warranty & model tuning",
    ],
    ctaText: "ENGINEER AI SYSTEM",
  },
];

const TRUST_FACTORS = [
  {
    title: "Milestone-Gated Escrow",
    desc: "Payments released in 3 verifiable phases (30% Kickoff / 40% Staging Approval / 30% Final Delivery). Zero financial risk.",
  },
  {
    title: "100% Legal IP Transfer",
    desc: "You own every single commit, Docker container, schema, and Figma file under strict bilateral NDA from day one.",
  },
  {
    title: "Senior-Only Engineers",
    desc: "Direct communication with principal developers and software architects. Zero junior developer handoffs or buffer managers.",
  },
  {
    title: "Guaranteed Delivery SLA",
    desc: "Contractually committed sprint timelines. We deliver on schedule with zero hourly creeping bills.",
  },
  {
    title: "30-Day Free Warranty",
    desc: "Complimentary post-launch defect remediation, performance tuning, and edge-case patching included at no extra cost.",
  },
];

export default function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useRevealOnScroll(sectionRef);

  const [currency, setCurrency] = useState<Currency>("INR");
  const [billingModel, setBillingModel] = useState<BillingModel>("sprint");

  const scrollToForm = () => {
    const form = document.getElementById("lets-build");
    if (form) {
      form.scrollIntoView({ behavior: "smooth", block: "start" });
      const nameInput = document.getElementById("bld-inquiry-name");
      if (nameInput) {
        setTimeout(() => nameInput.focus(), 550);
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      className="prc-minimal-section"
      id="pricing"
      aria-labelledby="prc-minimal-title"
    >
      <div className="prc-minimal-container">
        {/* =========================================================================
            1. SECTION MASTHEAD & MINIMALIST HUD
            ========================================================================= */}
        <header className="prc-minimal-masthead" data-reveal>
          <div className="prc-minimal-badge-row">
            <span className="prc-minimal-badge">TRANSPARENT PRICING</span>
            <span className="prc-minimal-coords">
              HONEST RATES · ZERO HIDDEN AGENCY DRAG · PRODUCTION-GRADE
            </span>
          </div>

          <div className="prc-minimal-hero-split">
            <div className="prc-minimal-title-wrap">
              <h2 id="prc-minimal-title" className="prc-minimal-title">
                AFFORDABLE ARCHITECTURE.{" "}
                <span className="prc-minimal-title-serif">LEGITIMATE VALUE.</span>
              </h2>
              <p className="prc-minimal-lead">
                Senior engineering rigor without the bloated agency overhead. We deliver fixed-milestone codebases,
                verifiable sprint roadmaps, and 100% intellectual property ownership.
              </p>
            </div>

            {/* Sleek Segmented Switchers */}
            <div className="prc-minimal-controls">
              {/* Currency Segment */}
              <div className="prc-seg-group" role="radiogroup" aria-label="Currency selection">
                <button
                  type="button"
                  role="radio"
                  aria-checked={currency === "INR"}
                  className={`prc-seg-btn ${currency === "INR" ? "is-active" : ""}`}
                  onClick={() => setCurrency("INR")}
                >
                  <span>🇮🇳 INR (₹)</span>
                </button>
                <button
                  type="button"
                  role="radio"
                  aria-checked={currency === "USD"}
                  className={`prc-seg-btn ${currency === "USD" ? "is-active" : ""}`}
                  onClick={() => setCurrency("USD")}
                >
                  <span>🌐 USD ($)</span>
                </button>
              </div>

              {/* Billing Mode Segment */}
              <div className="prc-seg-group" role="radiogroup" aria-label="Billing engagement model">
                <button
                  type="button"
                  role="radio"
                  aria-checked={billingModel === "sprint"}
                  className={`prc-seg-btn ${billingModel === "sprint" ? "is-active" : ""}`}
                  onClick={() => setBillingModel("sprint")}
                >
                  <span>Fixed Sprint</span>
                </button>
                <button
                  type="button"
                  role="radio"
                  aria-checked={billingModel === "monthly"}
                  className={`prc-seg-btn ${billingModel === "monthly" ? "is-active" : ""}`}
                  onClick={() => setBillingModel("monthly")}
                >
                  <span>Monthly Pod</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* =========================================================================
            2. EDITORIAL PRICING CARDS (3-COLUMN SLEEK ARCHITECTURE)
            ========================================================================= */}
        <div className="prc-minimal-grid" data-reveal>
          {PRICING_TIERS.map((tier) => {
            const price =
              currency === "INR"
                ? billingModel === "sprint"
                  ? tier.priceSprintINR
                  : tier.priceMonthlyINR
                : billingModel === "sprint"
                ? tier.priceSprintUSD
                : tier.priceMonthlyUSD;

            const timeline =
              billingModel === "sprint" ? tier.timelineSprint : tier.timelineMonthly;

            return (
              <article
                key={tier.id}
                className={`prc-minimal-card ${tier.isPopular ? "is-popular" : ""}`}
              >
                {/* Popular Pill */}
                {tier.badge && (
                  <div className="prc-card-pill-wrap">
                    <span className="prc-card-pill">{tier.badge}</span>
                  </div>
                )}

                {/* Tier Title & Tagline */}
                <div className="prc-card-masthead">
                  <h3 className="prc-card-title">{tier.name}</h3>
                  <p className="prc-card-tagline">{tier.tagline}</p>
                </div>

                {/* Price Display */}
                <div className="prc-card-price-block">
                  <div className="prc-card-price-row">
                    <span className="prc-card-price">{price}</span>
                    <span className="prc-card-period">
                      {billingModel === "sprint" ? "/ flat milestone" : "/ month"}
                    </span>
                  </div>

                  <div className="prc-card-timeline">
                    <span className="prc-timeline-dot" aria-hidden="true" />
                    <span>{timeline}</span>
                  </div>
                </div>

                <p className="prc-card-desc">{tier.description}</p>

                {/* Deliverables Checklist */}
                <div className="prc-card-checklist">
                  <span className="prc-checklist-heading">DELIVERABLES &amp; SCOPE</span>
                  <ul>
                    {tier.deliverables.map((item, idx) => (
                      <li key={idx}>
                        <span className="prc-check-bullet" aria-hidden="true">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action CTA */}
                <div className="prc-card-cta-row">
                  <button
                    type="button"
                    onClick={scrollToForm}
                    className={`prc-minimal-btn ${tier.isPopular ? "btn-blue" : "btn-outline"}`}
                  >
                    <span>{tier.ctaText}</span>
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" className="prc-btn-arrow" aria-hidden="true">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* =========================================================================
            3. BESPOKE ENTERPRISE ARCHITECTURE ROW
            ========================================================================= */}
        <div className="prc-enterprise-row" data-reveal>
          <div className="prc-ent-left">
            <span className="prc-ent-kicker">TIER 04 // ENTERPRISE &amp; GOVTECH PLATFORMS</span>
            <h4 className="prc-ent-title">
              Need Multi-Tenant Systems, High-Concurrency Scale, or FedRAMP Compliance?
            </h4>
            <p className="prc-ent-desc">
              Dedicated Principal Architect pods, zero-trust cloud infrastructure, 99.999% SLA uptime,
              and bilateral audit certifications.
            </p>
          </div>

          <div className="prc-ent-right">
            <div className="prc-ent-cost">
              <span className="prc-ent-cost-label">Starting at</span>
              <strong className="prc-ent-cost-num">
                {currency === "INR" ? "₹2,49,999+" : "$3,299+"}
              </strong>
            </div>

            <Link href="/contact" className="prc-ent-cta">
              <span>SCHEDULE ARCHITECT DISCOVERY</span>
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>

        {/* =========================================================================
            4. THE LEGITIMACY PROTOCOL: 5 PILLARS OF INTEGRITY & TRUST
            ========================================================================= */}
        <div className="prc-trust-strip" data-reveal>
          <div className="prc-trust-masthead">
            <div className="prc-trust-badge-group">
              <span className="prc-trust-tag">THE LEGITIMACY PROTOCOL</span>
              <h3 className="prc-trust-heading">Why Partnering with EPIC STUDIO Is 100% Legitimate &amp; Safe</h3>
            </div>
            <span className="prc-trust-status-badge">
              <span className="prc-status-live-dot" aria-hidden="true" />
              BILATERAL NDA &amp; ESCROW ASSURED
            </span>
          </div>

          <div className="prc-trust-items-grid">
            {TRUST_FACTORS.map((tf, i) => (
              <div key={i} className="prc-trust-item">
                <div className="prc-trust-bullet-num">0{i + 1}</div>
                <div className="prc-trust-content">
                  <h4 className="prc-trust-item-title">{tf.title}</h4>
                  <p className="prc-trust-item-desc">{tf.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
