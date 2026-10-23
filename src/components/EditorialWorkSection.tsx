"use client";

import React, { useRef } from "react";
import useRevealOnScroll from "./useRevealOnScroll";

interface EditorialProject {
  num: string;
  category: string;
  title: string;
  oneLiner: string;
  outcome: string;
  outcomeLabel: string;
  image: string;
  fallback?: string;
  tags: string[];
  link: string;
}

const projects: EditorialProject[] = [
  {
    num: "01",
    category: "GOVTECH / DIGITAL PUBLIC PLATFORM",
    title: "WEST BENGAL EDUCATION PLATFORM",
    oneLiner:
      "Statewide learning and governance infrastructure built for examination-day concurrency.",
    outcome: "12M+",
    outcomeLabel: "STUDENTS & TEACHERS SERVED",
    image: "/assets/1.jpg",
    tags: ["NEXT.JS", "CLOUD MICROSERVICES", "AI ANALYTICS"],
    link: "/work/west-bengal-education-platform",
  },
  {
    num: "02",
    category: "SAAS PLATFORM / AI ORCHESTRATION",
    title: "OMNIFLOW AI",
    oneLiner:
      "Autonomous workflow engine executing enterprise operations in real time.",
    outcome: "3.4×",
    outcomeLabel: "FASTER ENTERPRISE OPS",
    image: "/assets/3.jpg",
    tags: ["RUST CORE", "PYTORCH", "EVENT MESH"],
    link: "/work/omniflow-ai",
  },
  {
    num: "03",
    category: "MOBILE / FINTECH",
    title: "KAIRO MOBILE",
    oneLiner:
      "Cross-border banking with hardware-enclave biometric security, shipped to global feature.",
    outcome: "$450M+",
    outcomeLabel: "TRANSACTION VOLUME PROCESSED",
    image: "/assets/orange-screen.png",
    tags: ["REACT NATIVE", "SWIFT VAULT", "GO MICROSERVICES"],
    link: "/work/kairo-mobile",
  },
];

export default function EditorialWorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useRevealOnScroll(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="edw-section"
      id="selected-work"
      aria-labelledby="edw-title"
    >
      <div className="edw-grid-bg" aria-hidden="true" />

      <div className="edw-container">
        {/* Header */}
        <header className="edw-header" data-reveal>
          <div className="edw-label-row">
            <span className="edw-section-label">08 // SELECTED WORK</span>
            <span className="edw-count-tag">03 OF 125+ SHIPPED</span>
          </div>
          <h2 id="edw-title" className="edw-headline">
            A FEW THINGS
            <br />
            WE&rsquo;VE PUT INTO <span className="edw-headline-stroke">THE WORLD.</span>
          </h2>
        </header>

        {/* Editorial project rows */}
        <div className="edw-rows">
          {projects.map((project, i) => (
            <article
              key={project.num}
              data-reveal
              style={{ transitionDelay: "60ms" }}
              className={`edw-row ${i % 2 === 1 ? "is-flipped" : ""}`}
            >
              {/* Media */}
              <a
                href={project.link}
                className="edw-media"
                tabIndex={-1}
                aria-hidden="true"
              >
                <img
                  src={project.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
                <span className="edw-media-frame" aria-hidden="true" />
                <span className="edw-media-index" aria-hidden="true">
                  {project.num}
                </span>
              </a>

              {/* Content */}
              <div className="edw-content">
                <span className="edw-num">{project.num}</span>
                <span className="edw-category">{project.category}</span>

                <h3 className="edw-title">{project.title}</h3>
                <p className="edw-oneliner">{project.oneLiner}</p>

                <div className="edw-outcome">
                  <strong>{project.outcome}</strong>
                  <span>{project.outcomeLabel}</span>
                </div>

                <div className="edw-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="edw-tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <a href={project.link} className="edw-link">
                  VIEW CASE STUDY
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.6" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Footer note */}
        <footer className="edw-footer" data-reveal>
          <p>THE HOMEPAGE IS THE TRAILER. THE CASE STUDY IS THE MOVIE.</p>
        </footer>
      </div>
    </section>
  );
}
