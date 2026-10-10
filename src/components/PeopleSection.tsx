"use client";

import React, { useRef } from "react";
import useRevealOnScroll from "./useRevealOnScroll";

interface Person {
  initials: string;
  name: string;
  role: string;
  discipline: "STRATEGY" | "DESIGN" | "ENGINEERING" | "AI" | "GROWTH";
  location: string;
  snippet: string;
  tone: "blue" | "navy" | "ink" | "lime";
}

const people: Person[] = [
  {
    initials: "AS",
    name: "A. SEN",
    role: "PRINCIPAL ENGINEER",
    discipline: "ENGINEERING",
    location: "KOLKATA, IN",
    snippet: "Architects systems that survive contact with real traffic.",
    tone: "navy",
  },
  {
    initials: "RM",
    name: "R. MITRA",
    role: "DESIGN DIRECTOR",
    discipline: "DESIGN",
    location: "BENGALURU, IN",
    snippet: "Obsessed with type, grids and the last 2%.",
    tone: "blue",
  },
  {
    initials: "SK",
    name: "S. KHAN",
    role: "HEAD OF AI",
    discipline: "AI",
    location: "SAN FRANCISCO, US",
    snippet: "Ships models that hold up outside the notebook.",
    tone: "ink",
  },
  {
    initials: "DV",
    name: "D. VERMA",
    role: "GROWTH LEAD",
    discipline: "GROWTH",
    location: "LONDON, UK",
    snippet: "Turns product truth into pipeline.",
    tone: "lime",
  },
];

export default function PeopleSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useRevealOnScroll(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="ppl-section"
      id="people"
      aria-labelledby="ppl-title"
    >
      <div className="ppl-grid-bg" aria-hidden="true" />

      <div className="ppl-container">
        {/* Header */}
        <header className="ppl-header" data-reveal>
          <div className="ppl-label-row">
            <span className="ppl-section-label">09 // THE PEOPLE BEHIND THE SYSTEM</span>
          </div>
          <h2 id="ppl-title" className="ppl-headline">
            BUILT BY PEOPLE
            <br />
            WHO CARE ABOUT <span className="ppl-headline-stroke">THE DETAILS.</span>
          </h2>
          <p className="ppl-support-line">
            SENIOR THINKERS. DESIGNERS. ENGINEERS. BUILDERS.
          </p>
        </header>

        {/* Editorial portrait spread */}
        <div className="ppl-spread">
          {people.map((person, i) => (
            <figure
              key={person.initials}
              data-reveal
              style={{ transitionDelay: `${i * 110}ms` }}
              className={`ppl-plate tone-${person.tone} ${i % 2 === 1 ? "is-raised" : ""}`}
            >
              {/* Abstract portrait plate */}
              <div className="ppl-portrait">
                <span className="ppl-portrait-grid" aria-hidden="true" />
                <span className="ppl-monogram">{person.initials}</span>
                <span className="ppl-plate-code" aria-hidden="true">
                  EP-{String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <figcaption className="ppl-meta">
                <span className="ppl-discipline">{person.discipline}</span>
                <strong className="ppl-name">{person.name}</strong>
                <span className="ppl-role">{person.role}</span>
                <span className="ppl-location">
                  <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                    <path d="M12 21s-7-5.6-7-11a7 7 0 1 1 14 0c0 5.4-7 11-7 11z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                  {person.location}
                </span>

                <span className="ppl-snippet">{person.snippet}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Footer line */}
        <footer className="ppl-footer" data-reveal>
          <span className="ppl-footer-line" aria-hidden="true" />
          <p>NO JUNIOR BUFFERS. NO HANDOFF MAZE. THE PEOPLE YOU MEET ARE THE PEOPLE WHO BUILD.</p>
        </footer>
      </div>
    </section>
  );
}
