"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import useRevealOnScroll from "./useRevealOnScroll";

interface Intention {
  id: string;
  label: string;
  ctaLine: string;
  subject: string;
}

const intentions: Intention[] = [
  {
    id: "idea",
    label: "I HAVE AN IDEA",
    ctaLine: "TELL US ABOUT THE IDEA.",
    subject: "New Idea — Let's Talk",
  },
  {
    id: "product",
    label: "I NEED A NEW PRODUCT",
    ctaLine: "LET'S SCOPE THE PRODUCT.",
    subject: "New Product Build",
  },
  {
    id: "brand",
    label: "MY BRAND NEEDS A RESET",
    ctaLine: "LET'S REBUILD THE BRAND.",
    subject: "Brand Reset",
  },
  {
    id: "ai",
    label: "I NEED AI",
    ctaLine: "LET'S FIND THE AI EDGE.",
    subject: "AI Initiative",
  },
  {
    id: "scale",
    label: "WE NEED TO SCALE",
    ctaLine: "LET'S ENGINEER FOR SCALE.",
    subject: "Scale Engineering",
  },
  {
    id: "unsure",
    label: "I'M NOT SURE YET",
    ctaLine: "A CONVERSATION IS A GOOD START.",
    subject: "Exploration Call",
  },
];

export default function LetsBuildSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedId, setSelectedId] = useState<string>("idea");
  useRevealOnScroll(sectionRef);

  const selected = intentions.find((i) => i.id === selectedId) ?? intentions[0];
  const mailto = `mailto:contact@epic-studio.in?subject=${encodeURIComponent(
    `EPIC Studio — ${selected.subject}`
  )}`;

  return (
    <section
      ref={sectionRef}
      className="bld-section"
      id="lets-build"
      aria-labelledby="bld-title"
    >
      <div className="bld-grid-bg" aria-hidden="true" />
      <span className="bld-cross bld-cross-a" aria-hidden="true">+</span>
      <span className="bld-cross bld-cross-b" aria-hidden="true">+</span>
      <span className="bld-ring" aria-hidden="true" />

      <div className="bld-container">
        {/* Header */}
        <header className="bld-header" data-reveal>
          <span className="bld-section-label">08 // LET&rsquo;S BUILD</span>
          <h2 id="bld-title" className="bld-headline">
            WHAT SHOULD
            <br />
            WE BUILD <span className="bld-headline-stroke">TOGETHER?</span>
          </h2>
        </header>

        {/* Intention selector */}
        <div
          className="bld-intentions"
          role="radiogroup"
          aria-label="What do you want to build?"
          data-reveal
        >
          {intentions.map((intention) => (
            <button
              key={intention.id}
              type="button"
              role="radio"
              aria-checked={selectedId === intention.id}
              className={`bld-intention ${selectedId === intention.id ? "is-selected" : ""}`}
              onClick={() => setSelectedId(intention.id)}
            >
              <span className="intention-tick" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3.2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              {intention.label}
            </button>
          ))}
        </div>

        {/* Dynamic response + CTA */}
        <div className="bld-response" key={selected.id}>
          <p className="bld-cta-line">{selected.ctaLine}</p>

          <div className="bld-actions">
            <Link href="/contact" className="bld-btn-primary">
              START A CONVERSATION
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.8" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>

            <a href={mailto} className="bld-btn-secondary">
              OR SEND A BRIEF DIRECTLY
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>

            <a href="#who-we-are" className="bld-btn-tertiary">
              EXPLORE EPIC
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.6" aria-hidden="true">
                <path d="M7 17L17 7M9 7h8v8" />
              </svg>
            </a>
          </div>

          <div className="bld-meta-row">
            <span>RESPONSE &lt; 24H</span>
            <i aria-hidden="true" />
            <span>CONTACT@EPIC-STUDIO.IN</span>
            <i aria-hidden="true" />
            <span>KOLKATA · SF · LONDON · SINGAPORE</span>
          </div>
        </div>
      </div>
    </section>
  );
}
