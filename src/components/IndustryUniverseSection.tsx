"use client";

import React, { useState, useRef, useEffect } from "react";
import useRevealOnScroll from "./useRevealOnScroll";

interface IndustryWorld {
  id: string;
  name: string;
  code: string;
  description: string;
  impact: string;
  /** position on the orbit ring, in degrees */
  angle: number;
}

const industries: IndustryWorld[] = [
  {
    id: "govtech",
    name: "GOVTECH",
    code: "GT",
    angle: -90,
    description: "Digital infrastructure designed for public-scale complexity.",
    impact: "STATEWIDE PLATFORMS · MILLIONS OF CITIZENS",
  },
  {
    id: "healthcare",
    name: "HEALTHCARE",
    code: "HC",
    angle: -45,
    description: "Compliant clinical systems where reliability is care.",
    impact: "ENCRYPTED TELEHEALTH · FHIR INTEROP",
  },
  {
    id: "education",
    name: "EDUCATION",
    code: "ED",
    angle: 0,
    description: "Platforms that make learning, administration and access more connected.",
    impact: "45,000+ SCHOOLS UNIFIED",
  },
  {
    id: "fintech",
    name: "FINTECH",
    code: "FT",
    angle: 45,
    description: "Secure digital products built for modern financial ecosystems.",
    impact: "SUB-10MS SETTLEMENT PIPELINES",
  },
  {
    id: "commerce",
    name: "COMMERCE",
    code: "CM",
    angle: 90,
    description: "Headless storefronts engineered for conversion at scale.",
    impact: "+180% CONVERSION LIFT",
  },
  {
    id: "manufacturing",
    name: "MANUFACTURING",
    code: "MF",
    angle: 135,
    description: "Telemetry, digital twins and predictive operations.",
    impact: "35% DOWNTIME REDUCTION",
  },
  {
    id: "proptech",
    name: "PROPTECH",
    code: "PT",
    angle: 180,
    description: "Spatial platforms for property, logistics and fleet.",
    impact: "LIVE 3D WALKTHROUGHS · FLEET TELEMETRY",
  },
  {
    id: "startups",
    name: "STARTUPS",
    code: "ST",
    angle: 225,
    description: "Zero-to-one velocity with enterprise-grade foundations.",
    impact: "CONCEPT → LIVE SCALE IN 90 DAYS",
  },
];

const ACTIVE_INDEX_DEFAULT = 2; // EDUCATION

export default function IndustryUniverseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState<string>(industries[ACTIVE_INDEX_DEFAULT].id);
  useRevealOnScroll(sectionRef);

  const active = industries.find((i) => i.id === activeId) ?? industries[0];
  const activeIdx = industries.findIndex((i) => i.id === activeId);

  // Gentle auto-rotation until user interacts; only while the section is on
  // screen so scrolling away or hiding the tab stops all its work.
  const [interacted, setInteracted] = useState(false);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "80px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (interacted || !inView) return;
    const timer = setInterval(() => {
      if (document.hidden) return;
      setActiveId((prev) => {
        const idx = industries.findIndex((i) => i.id === prev);
        return industries[(idx + 1) % industries.length].id;
      });
    }, 3800);
    return () => clearInterval(timer);
  }, [interacted, inView]);

  return (
    <section
      ref={sectionRef}
      className="unv-section" data-anim-scope
      id="industry-universe"
      aria-labelledby="unv-title"
    >
      <div className="unv-grid-bg" aria-hidden="true" />
      <span className="unv-ring unv-ring-a" aria-hidden="true" />
      <span className="unv-ring unv-ring-b" aria-hidden="true" />

      <div className="unv-container">
        {/* Header */}
        <header className="unv-header" data-reveal>
          <div className="unv-label-row">
            <span className="unv-section-label">06 // ONE STUDIO. MANY WORLDS.</span>
            <span className="unv-domain-count">08 PRACTICE DOMAINS</span>
          </div>
          <h2 id="unv-title" className="unv-headline">
            WE MOVE BETWEEN INDUSTRIES
            <br />
            <span className="unv-headline-stroke">WITHOUT LOSING THE SYSTEM.</span>
          </h2>
        </header>

        <div
          className="unv-stage"
          data-reveal
          onMouseEnter={() => setInteracted(true)}
        >
          {/* Orbit visualization */}
          <div className="unv-orbit" role="tablist" aria-label="Industries">
            <svg viewBox="0 0 100 100" className="unv-orbit-rings" aria-hidden="true">
              <circle cx="50" cy="50" r="49.5" />
              <circle cx="50" cy="50" r="36" />
              <circle cx="50" cy="50" r="22.5" />
              <line x1="0.5" y1="50" x2="99.5" y2="50" />
              <line x1="50" y1="0.5" x2="50" y2="99.5" />
            </svg>

            {/* Center Epic mark */}
            <button
              type="button"
              className={`unv-core ${activeIdx % 2 === 1 ? "is-alt" : ""}`}
              aria-hidden="true"
              tabIndex={-1}
            >
              <span className="unv-core-star">
                <svg viewBox="0 0 100 100" fill="none">
                  <path
                    d="M 50 0 Q 50 50 100 50 Q 50 50 50 100 Q 50 50 0 50 Q 50 50 50 0 Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <span className="unv-core-label">EPIC</span>
            </button>

            {/* Orbiting industry nodes */}
            {industries.map((ind) => {
              const rad = (ind.angle * Math.PI) / 180;
              const x = 50 + Math.cos(rad) * 41;
              const y = 50 + Math.sin(rad) * 41;
              const isActive = ind.id === activeId;
              return (
                <button
                  key={ind.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`unv-node ${isActive ? "is-active" : ""}`}
                  style={{ left: `${x}%`, top: `${y}%` }}
                  onClick={() => {
                    setInteracted(true);
                    setActiveId(ind.id);
                  }}
                >
                  <span className="unv-node-dot" aria-hidden="true" />
                  <span className="unv-node-name">{ind.name}</span>
                </button>
              );
            })}
          </div>

          {/* Active world detail */}
          <aside className="unv-detail" key={active.id} aria-live="polite">
            <div className="unv-detail-meta">
              <span className="unv-detail-index">
                {String(activeIdx + 1).padStart(2, "0")} / 08
              </span>
              <span className="unv-detail-code">{active.code}</span>
            </div>

            <h3 className="unv-detail-name">{active.name}</h3>
            <p className="unv-detail-desc">{active.description}</p>

            <div className="unv-detail-impact">
              <span className="impact-bar" aria-hidden="true" />
              <span>{active.impact}</span>
            </div>

            <div className="unv-detail-foot">
              SAME ENGINEERING DISCIPLINE.
              <br />
              DIFFERENT GRAVITY.
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
