"use client";

import React, { useRef } from "react";
import useRevealOnScroll from "./useRevealOnScroll";

interface Principle {
  num: string;
  statement: string;
  statementAccent?: string;
  support: string[];
}

const principles: Principle[] = [
  {
    num: "01",
    statement: "MAKE IT",
    statementAccent: "USEFUL.",
    support: ["Beautiful is not enough."],
  },
  {
    num: "02",
    statement: "BUILD FOR",
    statementAccent: "REAL SCALE.",
    support: ["Production first.", "Decoration second."],
  },
  {
    num: "03",
    statement: "ONE TEAM.",
    statementAccent: "ONE ACCOUNTABILITY.",
    support: ["No handoff maze."],
  },
  {
    num: "04",
    statement: "REMOVE THE",
    statementAccent: "UNNECESSARY.",
    support: ["Less process.", "More progress."],
  },
  {
    num: "05",
    statement: "DESIGN FOR",
    statementAccent: "WHAT'S NEXT.",
    support: ["Every system should have room to evolve."],
  },
];

export default function PrinciplesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useRevealOnScroll(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="prn-section"
      id="principles"
      aria-labelledby="prn-title"
    >
      <div className="prn-grid-bg" aria-hidden="true" />

      <div className="prn-container">
        {/* Header */}
        <header className="prn-header" data-reveal>
          <span className="prn-section-label">05 // THE EPIC PRINCIPLES</span>
          <h2 id="prn-title" className="prn-headline">
            WHAT WE BELIEVE
            <br />
            SHOULD BE <span className="prn-headline-stroke">NON-NEGOTIABLE.</span>
          </h2>
          <span className="prn-version-tag">MANIFESTO — v2.6 / BINDING</span>
        </header>

        {/* Manifesto rows */}
        <div className="prn-list">
          {principles.map((p, i) => (
            <article
              key={p.num}
              data-reveal
              className={`prn-row ${i % 2 === 1 ? "is-flipped" : ""}`}
            >
              <span className="prn-row-num" aria-hidden="true">
                {p.num}
              </span>
              <div className="prn-row-body">
                <h3 className="prn-row-statement">
                  {p.statement}{" "}
                  <span className="prn-row-accent">{p.statementAccent}</span>
                </h3>
              </div>
              <div className="prn-row-support">
                {p.support.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* Closing signature line */}
        <footer className="prn-footer" data-reveal>
          <span className="prn-footer-line" aria-hidden="true" />
          <p>
            CAPABILITY IS WHAT WE ADVERTISE. CHARACTER IS WHAT CLIENTS RENEW.
          </p>
        </footer>
      </div>
    </section>
  );
}
