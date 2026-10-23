"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import useRevealOnScroll from "./useRevealOnScroll";

type ModeId = "web" | "mobile" | "ai" | "brand" | "social" | "product";

interface WorkMode {
  id: ModeId;
  num: string;
  name: string;
  caption: string;
  marker: string;
}

const workModes: WorkMode[] = [
  { id: "web", num: "01", name: "WEB", caption: "Marketing sites & web platforms", marker: "SYS.WEB/RENDER" },
  { id: "mobile", num: "02", name: "MOBILE", caption: "Native iOS & Android products", marker: "SYS.MOB/BUILD" },
  { id: "ai", num: "03", name: "AI", caption: "Agents, workflows & automation", marker: "SYS.AI/ORCHESTRATE" },
  { id: "brand", num: "04", name: "BRAND", caption: "Identity systems & visual language", marker: "SYS.BRAND/DEFINE" },
  { id: "social", num: "05", name: "SOCIAL", caption: "Content engines & campaigns", marker: "SYS.SOC/DISTRIBUTE" },
  { id: "product", num: "06", name: "PRODUCT", caption: "SaaS platforms & dashboards", marker: "SYS.PROD/SCALE" },
];

const AUTO_INTERVAL = 4600;

export default function WorkInMotionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeMode, setActiveMode] = useState<ModeId>("web");
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(true);
  useRevealOnScroll(sectionRef);

  // Track whether the section is on screen; the auto-rotator below only runs
  // while visible, so scrolling away or hiding the tab stops all its work.
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
    if (paused || !inView) return;
    const timer = setInterval(() => {
      if (document.hidden) return;
      setActiveMode((prev) => {
        const idx = workModes.findIndex((m) => m.id === prev);
        return workModes[(idx + 1) % workModes.length].id;
      });
    }, AUTO_INTERVAL);
    return () => clearInterval(timer);
  }, [paused, inView]);

  const selectMode = useCallback((id: ModeId) => {
    setActiveMode(id);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="wim-section" data-anim-scope
      id="work-in-motion"
      aria-labelledby="wim-title"
    >
      <div className="wim-grid-bg" aria-hidden="true" />
      <span className="wim-ring wim-ring-a" aria-hidden="true" />
      <span className="wim-ring wim-ring-b" aria-hidden="true" />
      <span className="wim-cross wim-cross-a" aria-hidden="true">+</span>
      <span className="wim-cross wim-cross-b" aria-hidden="true">+</span>

      <div className="wim-container">
        {/* Section Header */}
        <header className="wim-header" data-reveal>
          <div className="wim-label-row">
            <span className="wim-section-label">03 // THE WORK IN MOTION</span>
            <span className="wim-live-pill">
              <i className="wim-live-dot" aria-hidden="true" />
              LIVE SYSTEMS — NOT SCREENSHOTS
            </span>
          </div>

          <h2 id="wim-title" className="wim-headline">
            DON&rsquo;T JUST READ ABOUT
            <br />
            WHAT WE BUILD.{" "}
            <span className="wim-headline-stroke">SEE IT MOVE.</span>
          </h2>
        </header>

        {/* Interactive Stage */}
        <div
          className="wim-stage-shell"
          data-reveal
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Mode Index Rail */}
          <div className="wim-mode-rail" role="tablist" aria-label="Types of Epic work">
            {workModes.map((mode) => {
              const isActive = activeMode === mode.id;
              return (
                <button
                  key={mode.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`wim-mode-item ${isActive ? "is-active" : ""}`}
                  onClick={() => selectMode(mode.id)}
                  onMouseEnter={() => selectMode(mode.id)}
                >
                  <span className="wim-mode-num">{mode.num}</span>
                  <span className="wim-mode-name">{mode.name}</span>
                  <svg
                    className="wim-mode-arrow"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </button>
              );
            })}

            <div className="wim-rail-footnote">
              <span>EPIC / OUTPUT</span>
              <span>{String(workModes.findIndex((m) => m.id === activeMode) + 1).padStart(2, "0")}—06</span>
            </div>
          </div>

          {/* Visual Stage */}
          <div className={`wim-viewport mode-${activeMode}`}>
            <div className="wim-viewport-frame" aria-hidden="true" />

            {/* Corner markers */}
            <span className="wim-corner wim-corner-tl" aria-hidden="true" />
            <span className="wim-corner wim-corner-tr" aria-hidden="true" />
            <span className="wim-corner wim-corner-bl" aria-hidden="true" />
            <span className="wim-corner wim-corner-br" aria-hidden="true" />

            {/* Floating technical labels */}
            <span className="wim-float-tag wim-tag-top">
              {workModes.find((m) => m.id === activeMode)?.marker}
            </span>
            <span className="wim-float-tag wim-tag-bottom">
              RENDERED BY EPIC STUDIO · 60FPS
            </span>

            {/* ---------- WEB ---------- */}
            <div className={`wim-world ${activeMode === "web" ? "is-visible" : ""}`} aria-hidden={activeMode !== "web"}>
              <div className="wim-browser">
                <div className="wim-browser-bar">
                  <span className="wdot d-red" />
                  <span className="wdot d-yellow" />
                  <span className="wdot d-green" />
                  <span className="wim-url">epic-studio.in/work/pets-app</span>
                </div>
                <div className="wim-browser-body">
                  <img src="/assets/pets.webp" onError={(e) => { e.currentTarget.src = "/assets/pets.png"; }} alt="" loading="lazy" decoding="async" />
                </div>
              </div>
              <div className="wim-chip-row">
                <span className="wim-chip">NEXT.JS</span>
                <span className="wim-chip">HEADLESS CMS</span>
                <span className="wim-chip lime">SUB-SECOND LOADS</span>
              </div>
              <span className="wim-num-watermark">01</span>
            </div>

            {/* ---------- MOBILE ---------- */}
            <div className={`wim-world ${activeMode === "mobile" ? "is-visible" : ""}`} aria-hidden={activeMode !== "mobile"}>
              <div className="wim-phone">
                <span className="wim-phone-notch" aria-hidden="true" />
                <img src="/assets/mid.webp" onError={(e) => { e.currentTarget.src = "/assets/mid.png"; }} alt="" loading="lazy" decoding="async" />
              </div>
              <div className="wim-phone-secondary" aria-hidden="true">
                <img src="/assets/orange-screen.webp" onError={(e) => { e.currentTarget.src = "/assets/orange-screen.png"; }} alt="" loading="lazy" decoding="async" />
              </div>
              <div className="wim-chip-row">
                <span className="wim-chip">SWIFT</span>
                <span className="wim-chip">KOTLIN</span>
                <span className="wim-chip lime">4.9★ STORE RATING</span>
              </div>
              <span className="wim-num-watermark">02</span>
            </div>

            {/* ---------- AI ---------- */}
            <div className={`wim-world ${activeMode === "ai" ? "is-visible" : ""}`} aria-hidden={activeMode !== "ai"}>
              <div className="wim-ai-graph">
                <svg viewBox="0 0 520 300" fill="none" aria-hidden="true">
                  <path className="ai-flow f1" d="M70 150 C 140 150, 150 80, 230 80" />
                  <path className="ai-flow f2" d="M70 150 C 140 150, 150 220, 230 220" />
                  <path className="ai-flow f3" d="M310 80 C 380 80, 390 130, 450 145" />
                  <path className="ai-flow f4" d="M310 220 C 380 220, 390 170, 450 155" />
                  <circle cx="70" cy="150" r="10" className="ai-node n-input" />
                  <rect x="230" y="58" width="80" height="44" rx="10" className="ai-node n-agent" />
                  <rect x="230" y="198" width="80" height="44" rx="10" className="ai-node n-agent" />
                  <circle cx="450" cy="150" r="14" className="ai-node n-output" />
                  <text x="270" y="85" textAnchor="middle" className="ai-label">AGENT</text>
                  <text x="270" y="225" textAnchor="middle" className="ai-label">AGENT</text>
                  <text x="52" y="128" textAnchor="middle" className="ai-label small">INPUT</text>
                  <text x="452" y="122" textAnchor="middle" className="ai-label small">OUTPUT</text>
                </svg>
                <div className="wim-ai-readout">
                  <span className="readout-line"><i /> PIPELINE #4821 — RUNNING</span>
                  <span className="readout-line dim"><i /> COMPLIANCE CHECK — PASSED</span>
                </div>
              </div>
              <div className="wim-chip-row">
                <span className="wim-chip">LLM ORCHESTRATION</span>
                <span className="wim-chip lime">AUTONOMOUS WORKFLOWS</span>
              </div>
              <span className="wim-num-watermark">03</span>
            </div>

            {/* ---------- BRAND ---------- */}
            <div className={`wim-world ${activeMode === "brand" ? "is-visible" : ""}`} aria-hidden={activeMode !== "brand"}>
              <div className="wim-brand-board">
                <div className="brand-type-cell">
                  <span className="brand-glyph">Aa</span>
                  <span className="brand-cell-cap">DISPLAY / CONDENSED</span>
                </div>
                <div className="brand-mark-cell">
                  <svg viewBox="0 0 100 100" fill="none" aria-hidden="true">
                    <path d="M 50 0 Q 50 50 100 50 Q 50 50 50 100 Q 50 50 0 50 Q 50 50 50 0 Z" fill="#c9ff17" transform="scale(0.72)" style={{ transformOrigin: "50px 50px" }} />
                  </svg>
                  <span className="brand-cell-cap">PRIMARY MARK</span>
                </div>
                <div className="brand-swatch-row">
                  <span style={{ background: "#082fe6" }} />
                  <span style={{ background: "#c9ff17" }} />
                  <span style={{ background: "#090a0f" }} />
                  <span style={{ background: "#f8f8f2" }} />
                </div>
                <span className="brand-cell-cap swatch-cap">CORE PALETTE — 04</span>
              </div>
              <div className="wim-chip-row">
                <span className="wim-chip">IDENTITY SYSTEM</span>
                <span className="wim-chip">DESIGN TOKENS</span>
                <span className="wim-chip lime">42 MARKETS UNIFIED</span>
              </div>
              <span className="wim-num-watermark">04</span>
            </div>

            {/* ---------- SOCIAL ---------- */}
            <div className={`wim-world ${activeMode === "social" ? "is-visible" : ""}`} aria-hidden={activeMode !== "social"}>
              <div className="wim-phone wim-phone-social">
                <span className="wim-phone-notch" aria-hidden="true" />
                <img src="/assets/facebookmock.webp" onError={(e) => { e.currentTarget.src = "/assets/facebookmock.png"; }} alt="" loading="lazy" decoding="async" />
              </div>
              <div className="wim-social-orbit" aria-hidden="true">
                <span className="orbit-chip oc-fb">FB</span>
                <span className="orbit-chip oc-ig">IG</span>
                <span className="orbit-chip oc-tw">X</span>
                <svg viewBox="0 0 200 200" className="orbit-rings">
                  <circle cx="100" cy="100" r="94" />
                  <circle cx="100" cy="100" r="64" />
                </svg>
              </div>
              <div className="wim-chip-row">
                <span className="wim-chip">CONTENT ENGINES</span>
                <span className="wim-chip lime">CAMPAIGNS THAT CONVERT</span>
              </div>
              <span className="wim-num-watermark">05</span>
            </div>

            {/* ---------- PRODUCT ---------- */}
            <div className={`wim-world ${activeMode === "product" ? "is-visible" : ""}`} aria-hidden={activeMode !== "product"}>
              <div className="wim-browser wim-browser-product">
                <div className="wim-browser-bar">
                  <span className="wdot d-red" />
                  <span className="wdot d-yellow" />
                  <span className="wdot d-green" />
                  <span className="wim-url">app.omniflow.ai/pipelines</span>
                </div>
                <div className="wim-browser-body">
                  <img src="/assets/2ndmockup.webp" onError={(e) => { e.currentTarget.src = "/assets/2ndmockup.png"; }} alt="" loading="lazy" decoding="async" />
                </div>
              </div>
              <div className="wim-product-stat" aria-hidden="true">
                <strong>450K+</strong>
                <span>AUTOMATED RUNS / MONTH</span>
              </div>
              <div className="wim-chip-row">
                <span className="wim-chip">MULTI-TENANT SAAS</span>
                <span className="wim-chip lime">EVENT-DRIVEN CORE</span>
              </div>
              <span className="wim-num-watermark">06</span>
            </div>
          </div>
        </div>

        {/* Section footer line */}
        <footer className="wim-footer" data-reveal>
          <p>
            EPIC DOES NOT PRODUCE STATIC DELIVERABLES. EPIC CREATES LIVING DIGITAL SYSTEMS —
            BUILT TO RUN, MEASURE AND EVOLVE.
          </p>
          <a href="#lets-build" className="wim-footer-link">
            LET&rsquo;S BUILD
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.6" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </footer>
      </div>
    </section>
  );
}
