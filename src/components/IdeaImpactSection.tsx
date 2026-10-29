"use client";

import React, { useRef } from "react";
import useRevealOnScroll from "./useRevealOnScroll";

const stages = [
  {
    num: "01",
    key: "PROBLEM",
    title: "THE PROBLEM",
    tone: "problem",
    items: [
      "Fragmented systems.",
      "Weak digital experiences.",
      "Slow delivery.",
      "Disconnected teams.",
    ],
  },
  {
    num: "02",
    key: "BUILD",
    title: "THE BUILD",
    tone: "build",
    items: ["Strategy.", "Design.", "Engineering.", "AI.", "Growth."],
  },
  {
    num: "03",
    key: "OUTCOME",
    title: "THE OUTCOME",
    tone: "outcome",
    items: [
      "Faster launches.",
      "Stronger experiences.",
      "Better performance.",
      "Scalable operations.",
    ],
  },
];

export default function IdeaImpactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useRevealOnScroll(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="imp-section"
      id="idea-impact"
      data-anim-scope
      aria-labelledby="imp-title"
    >
      <div className="imp-grid-bg" aria-hidden="true" />
      <span className="imp-cross imp-cross-a" aria-hidden="true">+</span>
      <span className="imp-cross imp-cross-b" aria-hidden="true">+</span>

      <div className="imp-container">
        {/* Header */}
        <header className="imp-header" data-reveal>
          <span className="imp-section-label">04 // FROM IDEA → IMPACT</span>
          <h2 id="imp-title" className="imp-headline">
            WE DON&rsquo;T JUST SHIP PROJECTS.
            <br />
            <span className="imp-headline-stroke">WE MOVE BUSINESSES.</span>
          </h2>
          <p className="imp-subcopy">
            This is not our process — it is what changes because of it. Every engagement
            travels the same arc: from friction to build to measurable motion.
          </p>
        </header>

        {/* Transformation sequence */}
        <div className="imp-sequence">
          {/* Continuous path (desktop) */}
          <svg
            className="imp-path"
            viewBox="0 0 1200 120"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M0 60 H1140"
              stroke="rgba(201,255,23,0.4)"
              strokeWidth="1.5"
              strokeDasharray="6 8"
              className="imp-path-line"
            />
            <path d="M1128 48 L1152 60 L1128 72" stroke="#c9ff17" strokeWidth="2" fill="none" strokeLinecap="square" />
          </svg>

          {stages.map((stage) => (
            <article
              key={stage.num}
              data-reveal
              className={`imp-stage imp-stage-${stage.tone}`}
            >
              <div className="imp-stage-top">
                <span className={`imp-stage-num n-${stage.tone}`}>{stage.num}</span>
                <span className="imp-stage-key">{stage.key}</span>
              </div>
              <h3 className={`imp-stage-title t-${stage.tone}`}>{stage.title}</h3>
              <ul className={`imp-stage-list l-${stage.tone}`}>
                {stage.items.map((item) => (
                  <li key={item}>
                    {stage.tone === "build" && (
                      <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                    {stage.tone === "problem" && <span className="li-dash" aria-hidden="true" />}
                    {stage.tone === "outcome" && (
                      <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                        <path d="M7 17L17 7M9 7h8v8" />
                      </svg>
                    )}
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}

          {/* Vertical connector for mobile */}
          <span className="imp-vertical-thread" aria-hidden="true" />
        </div>

        {/* Bottom strip */}
        <footer className="imp-footer" data-reveal>
          <span className="imp-footer-mark">Δ IDEA</span>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
          <span className="imp-footer-mark lime">IMPACT</span>
          <p>THE DISTANCE BETWEEN THE TWO IS WHAT WE ARE HIRED TO CLOSE.</p>
        </footer>
      </div>
    </section>
  );
}
