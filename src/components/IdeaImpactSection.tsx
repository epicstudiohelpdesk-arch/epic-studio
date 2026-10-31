"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import useRevealOnScroll from "./useRevealOnScroll";
import "./idea-impact.css";

interface StepDetail {
  id: number;
  badge: string;
  code: string;
  title: string;
  desc: string;
  metricA: string;
  metricB: string;
  tone: "lime" | "purple" | "peach";
}

const STEP_DATA: Record<number, StepDetail> = {
  1: {
    id: 1,
    badge: "①",
    code: "STEP 01 // ACCESS PERMISSION & ARCHITECTURAL CONSENT",
    title: "Scope & Security Consent Protocol",
    desc: "Customer initiates verified access consent. Founder vision and enterprise requirements are translated into zero-trust architectural boundaries and threat models.",
    metricA: "SPEC: 100% COMPLETE",
    metricB: "RISK: NEUTRALIZED",
    tone: "purple",
  },
  2: {
    id: 2,
    badge: "②",
    code: "STEP 02 // RAW INGESTION & MARKET SPEC",
    title: "Founder Vision & Friction Ingestion",
    desc: "Comprehensive ingestion of raw founder briefs, product specs, and technical constraints directly into our 5-axis synthesis pipeline.",
    metricA: "CONCURRENCY: 100K RPS",
    metricB: "LATENCY: <50MS",
    tone: "lime",
  },
  3: {
    id: 3,
    badge: "③",
    code: "STEP 03 // 5-AXIS SYNTHESIS & FRICTION REMOVAL",
    title: "Multi-Disciplinary Synthesis Engine",
    desc: "Parallel co-development across Spatial UI, distributed backend systems, and automated agent loops to eliminate legacy drag and guarantee 120 FPS performance.",
    metricA: "FRICTION: -85%",
    metricB: "RENDER: 120 FPS",
    tone: "lime",
  },
  4: {
    id: 4,
    badge: "④",
    code: "STEP 04 // INTELLIGENT SYSTEMS & LEDGER",
    title: "Autonomous Agents & Transaction Streams",
    desc: "Compounding operational leverage with deterministic ML models, real-time transaction pipelines, and event-driven data streaming directly into production.",
    metricA: "INFERENCE: SUB-SEC",
    metricB: "PIPELINES: AUTONOMOUS",
    tone: "lime",
  },
  5: {
    id: 5,
    badge: "⑤",
    code: "STEP 05 // CONTINUOUS PRODUCTION IMPACT",
    title: "Measurable Market Velocity & Enterprise Compounding",
    desc: "Automated zero-downtime deployments feed market data and exponential ROI back into the customer core, turning software into an unbeatable moat.",
    metricA: "DEPLOY: 10X FASTER",
    metricB: "SLA: 99.99%",
    tone: "peach",
  },
};

export default function IdeaImpactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useRevealOnScroll(sectionRef);

  const [activeStep, setActiveStep] = useState<number>(1);
  const [activeNode, setActiveNode] = useState<string | null>("build");
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);
  const [inView, setInView] = useState<boolean>(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "100px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Auto-cycle through the flowchart steps in logical pipeline order every 3.5s only while visible
  useEffect(() => {
    if (!isAutoPlay || !inView) return;
    const interval = setInterval(() => {
      if (typeof document !== "undefined" && document.hidden) return;
      setActiveStep((prev) => {
        const next = (prev % 5) + 1;
        // Map step to active station according to architectural flow
        if (next === 1) setActiveNode("build");
        else if (next === 2) setActiveNode("idea");
        else if (next === 3) setActiveNode("engine");
        else if (next === 4) setActiveNode("ledger");
        else if (next === 5) setActiveNode("impact");
        return next;
      });
    }, 3500);
    return () => clearInterval(interval);
  }, [isAutoPlay, inView]);

  const selectStep = (stepNum: number) => {
    setActiveStep(stepNum);
    setIsAutoPlay(false);
    if (stepNum === 1) setActiveNode("build");
    else if (stepNum === 2) setActiveNode("idea");
    else if (stepNum === 3) setActiveNode("engine");
    else if (stepNum === 4) setActiveNode("ledger");
    else if (stepNum === 5) setActiveNode("impact");
  };

  const selectNode = (nodeKey: string, linkedStep: number) => {
    setActiveNode(nodeKey);
    setActiveStep(linkedStep);
    setIsAutoPlay(false);
  };

  return (
    <section
      ref={sectionRef}
      className="imp-diagram-section"
      id="idea-impact"
      data-anim-scope
      aria-labelledby="imp-diagram-title"
    >
      <div className="imp-diagram-container">
        {/* =========================================================================
            1. SECTION HEADER WITH MISSION-CONTROL HUD
            ========================================================================= */}
        <header className="imp-diagram-header" data-reveal>
          <div className="imp-diagram-meta-bar">
            <div className="imp-diagram-label-wrap">
              <span className="imp-diagram-label">04 // FROM IDEA → IMPACT</span>
            </div>

            <div className="imp-diagram-coords">
              <span>LAT: 28.6139° N · ARCHITECTURE_PIPELINE · REV_2026</span>
            </div>
          </div>

          <h2 id="imp-diagram-title" className="imp-diagram-headline">
            WE DON&rsquo;T JUST SHIP CODE.
            <br />
            <span className="imp-diagram-headline-stroke">WE ENGINEER MARKET IMPACT.</span>
          </h2>

          <p className="imp-diagram-subcopy">
            Every engagement travels a verified diagrammatic arc: from raw founder vision through
            our 5-axis synthesis engine, directly into high-velocity production and compounding enterprise value.
          </p>
        </header>

        {/* =========================================================================
            2. DIAGRAMMATIC FLOWCHART BOARD (NEOBRUTALIST SYSTEM CANVAS)
            ========================================================================= */}
        <div className="imp-flowchart-board" data-reveal>
          {/* Blueprint Registration Marks */}
          <span className="fc-corner-cross fc-cross-tl" aria-hidden="true">+</span>
          <span className="fc-corner-cross fc-cross-tr" aria-hidden="true">+</span>
          <span className="fc-corner-cross fc-cross-bl" aria-hidden="true">+</span>
          <span className="fc-corner-cross fc-cross-br" aria-hidden="true">+</span>

          <div className="imp-board-canvas">
            {/* -------------------------------------------------------------
                SVG CIRCUIT CONDUITS & ANIMATED PULSE PACKETS (Desktop)
                ------------------------------------------------------------- */}
            <svg
              className="fc-svg-wiring"
              viewBox="0 0 1100 560"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <marker
                  id="fcArrowBlack"
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 8 5 L 0 9 z" fill="#000000" />
                </marker>
              </defs>

              {/* Wire 1: Customer Deployment into Access Permission (Step ①) */}
              <path
                d="M 770 94 L 660 94"
                className={`fc-wire-track ${activeStep === 1 ? "is-step-active" : ""}`}
                markerEnd="url(#fcArrowBlack)"
              />
              <path
                d="M 770 94 L 660 94"
                className={`fc-wire-glow ${activeStep === 1 ? "is-step-active" : ""}`}
              />

              {/* Wire 1b: Access Permission Pill into Engine Top Pin */}
              <path
                d="M 550 113 L 550 180"
                className={`fc-wire-track ${activeStep === 1 ? "is-step-active" : ""}`}
                markerEnd="url(#fcArrowBlack)"
              />
              <path
                d="M 550 113 L 550 180"
                className={`fc-wire-glow ${activeStep === 1 ? "is-step-active" : ""}`}
              />

              {/* Wire 2: The Raw Idea (Asterisk ✱) into Synthesis Engine (Step ②) */}
              <path
                d="M 270 130 L 360 130 L 360 260 L 430 260"
                className={`fc-wire-track ${activeStep === 2 ? "is-step-active" : ""}`}
                markerEnd="url(#fcArrowBlack)"
              />
              <path
                d="M 270 130 L 360 130 L 360 260 L 430 260"
                className={`fc-wire-glow ${activeStep === 2 ? "is-step-active" : ""}`}
              />

              {/* Wire 3: Diagnostic Friction Matrix into Engine Left Pin (Step ③) */}
              <path
                d="M 190 300 L 320 300 L 320 280 L 430 280"
                className={`fc-wire-track ${activeStep === 3 ? "is-step-active" : ""}`}
                markerEnd="url(#fcArrowBlack)"
              />
              <path
                d="M 190 300 L 320 300 L 320 280 L 430 280"
                className={`fc-wire-glow ${activeStep === 3 ? "is-step-active" : ""}`}
              />

              {/* Wire 4a: Center Engine Right Pin over Currency Tile into Transactions (Step ④) */}
              <path
                d="M 670 270 L 720 270 L 720 440 L 670 440"
                className={`fc-wire-track ${activeStep === 4 ? "is-step-active" : ""}`}
              />
              <path
                d="M 670 270 L 720 270 L 720 440 L 670 440"
                className={`fc-wire-glow ${activeStep === 4 ? "is-step-active" : ""}`}
              />

              {/* Wire 4b: Transactions through Cluster Badge into Business Impact */}
              <path
                d="M 670 461 L 710 461 L 710 440 L 770 440"
                className={`fc-wire-track ${activeStep === 4 ? "is-step-active" : ""}`}
                markerEnd="url(#fcArrowBlack)"
              />
              <path
                d="M 670 461 L 710 461 L 710 440 L 770 440"
                className={`fc-wire-glow ${activeStep === 4 ? "is-step-active" : ""}`}
              />

              {/* Wire 5: Business Impact up through Stack & Trend Chart into Customer (Step ⑤) */}
              <path
                d="M 1000 440 L 1054 440 L 1054 75 L 1000 75"
                className={`fc-wire-track ${activeStep === 5 ? "is-step-active" : ""}`}
                markerEnd="url(#fcArrowBlack)"
              />
              <path
                d="M 1000 440 L 1054 440 L 1054 75 L 1000 75"
                className={`fc-wire-glow ${activeStep === 5 ? "is-step-active" : ""}`}
              />

              {/* Real-Time Animated Pulse Energy Packets (GPU-accelerated pathLength conduits) */}
              {/* Pulse 1: Customer Deployment into Access Permission */}
              <path
                d="M 770 94 L 660 94"
                className="fc-wire-packet fc-packet-purple"
                pathLength="100"
                style={{ animationDuration: "1.4s" }}
              />

              {/* Pulse 1b: Access Permission down into Engine Top Pin */}
              <path
                d="M 550 113 L 550 180"
                className="fc-wire-packet fc-packet-orange"
                pathLength="100"
                style={{ animationDuration: "1.0s" }}
              />

              {/* Pulse 2: The Raw Idea Asterisk into Engine Left Pin */}
              <path
                d="M 270 130 L 360 130 L 360 260 L 430 260"
                className="fc-wire-packet fc-packet-lime"
                pathLength="100"
                style={{ animationDuration: "2.4s" }}
              />

              {/* Pulse 3: Friction Matrix stream into Engine Left Pin */}
              <path
                d="M 190 300 L 320 300 L 320 280 L 430 280"
                className="fc-wire-packet fc-packet-lime"
                pathLength="100"
                style={{ animationDuration: "2.0s" }}
              />

              {/* Pulse 4a: Engine Right Pin into Transactions */}
              <path
                d="M 670 270 L 720 270 L 720 440 L 670 440"
                className="fc-wire-packet fc-packet-blue"
                pathLength="100"
                style={{ animationDuration: "2.2s" }}
              />

              {/* Pulse 4b: Transactions through Cluster Badge into Business Impact */}
              <path
                d="M 670 461 L 710 461 L 710 440 L 770 440"
                className="fc-wire-packet fc-packet-lime"
                pathLength="100"
                style={{ animationDuration: "1.5s" }}
              />

              {/* Pulse 5: Business Impact Feedback Loop rising into Customer */}
              <path
                d="M 1000 440 L 1054 440 L 1054 75 L 1000 75"
                className="fc-wire-packet fc-packet-orange"
                pathLength="100"
                style={{ animationDuration: "3.0s" }}
              />
            </svg>

            {/* -------------------------------------------------------------
                STEP BADGES ALONG THE CONDUITS (①, ②, ③, ④, ⑤)
                ------------------------------------------------------------- */}
            <button
              type="button"
              className={`fc-step-badge fc-badge-step-1 ${activeStep === 1 ? "is-active" : ""}`}
              onClick={() => selectStep(1)}
              title="Step ①: Access Permission & Consent"
              aria-label="Step 1: Access Permission & Consent"
            >
              ①
            </button>

            <button
              type="button"
              className={`fc-step-badge fc-badge-step-2 ${activeStep === 2 ? "is-active" : ""}`}
              onClick={() => selectStep(2)}
              title="Step ②: Raw Idea & Scope Ingestion"
              aria-label="Step 2: Raw Idea & Scope Ingestion"
            >
              ②
            </button>

            <button
              type="button"
              className={`fc-step-badge fc-badge-step-3 ${activeStep === 3 ? "is-active" : ""}`}
              onClick={() => selectStep(3)}
              title="Step ③: 5-Axis Synthesis Engine"
              aria-label="Step 3: 5-Axis Synthesis Engine"
            >
              ③
            </button>

            <button
              type="button"
              className={`fc-step-badge fc-badge-step-4 ${activeStep === 4 ? "is-active" : ""}`}
              onClick={() => selectStep(4)}
              title="Step ④: Intelligent Systems Ledger & Transactions"
              aria-label="Step 4: Intelligent Systems Ledger & Transactions"
            >
              ④
            </button>

            <button
              type="button"
              className={`fc-step-badge fc-badge-step-5 ${activeStep === 5 ? "is-active" : ""}`}
              onClick={() => selectStep(5)}
              title="Step ⑤: Enterprise Scale & Business Impact Feedback"
              aria-label="Step 5: Enterprise Scale & Business Impact Feedback"
            >
              ⑤
            </button>

            {/* Micro Emblems on Conduit Junctions */}
            <div
              className="fc-node-asterisk-badge"
              title="Raw Friction Input Terminal"
              aria-hidden="true"
            >
              ✱
            </div>

            <div
              className="fc-node-shield-badge"
              title="Architecture Security & Auth Lock"
              aria-hidden="true"
            >
              🔒
            </div>

            <div
              className="fc-node-cluster-badge"
              title="Compounding Cluster Output"
              aria-hidden="true"
            >
              ∴
            </div>

            {/* Floating Code & Velocity Chip */}
            <div className="fc-code-chip" title="Sub-50ms Edge Engine">
              <span>&lt;/&gt;</span>
              <span>SUB-50MS</span>
            </div>

            {/* -------------------------------------------------------------
                STATION 01: THE RAW IDEA (Neon Lime Folder Node)
                ------------------------------------------------------------- */}
            <div
              className={`fc-node-wrapper fc-node-idea ${activeNode === "idea" ? "is-active" : ""}`}
              onClick={() => selectNode("idea", 2)}
            >
              <div className="fc-folder-card fc-folder-lime">
                <div className="fc-folder-header">
                  <span className="fc-folder-tag">NODE // 01</span>
                  <div className="fc-folder-icon-circle">💡</div>
                </div>

                <h3 className="fc-folder-title">THE RAW IDEA</h3>
                <p className="fc-folder-desc">
                  Founder Vision, Client Brief &amp; Market Friction Matrix
                </p>

                <div className="fc-folder-footer-strip">
                  <span>INPUT INGESTION</span>
                  <span>VERIFIED ✓</span>
                </div>
              </div>

              <div className="fc-sub-label-box">
                <span className="fc-sub-label-main">INFORMATION PROVIDER</span>
                <span className="fc-sub-label-sub">EG: FOUNDER VISION / CLIENT NEED</span>
              </div>
            </div>

            {/* Micro Pixel Matrix Tile under Node 01 */}
            <div
              className="fc-pixel-matrix"
              title="Input Diagnostic Friction Grid"
              onClick={() => selectStep(3)}
            >
              <span className="pixel-dot active-lime" />
              <span className="pixel-dot active-dark" />
              <span className="pixel-dot" />
              <span className="pixel-dot active-blue" />
              <span className="pixel-dot" />
              <span className="pixel-dot" />
              <span className="pixel-dot active-lime" />
              <span className="pixel-dot active-dark" />
              <span className="pixel-dot" />
              <span className="pixel-dot active-blue" />
              <span className="pixel-dot active-dark" />
              <span className="pixel-dot" />
              <span className="pixel-dot active-lime" />
              <span className="pixel-dot" />
              <span className="pixel-dot active-dark" />
            </div>

            {/* Station 02 Top: Floating Access Permission Pill */}
            <div
              className={`fc-floating-permission ${activeStep === 1 ? "is-active" : ""}`}
              title="5-Axis Architectural Specification & Consent"
              onClick={() => selectNode("build", 1)}
            >
              <span>⚡</span>
              <span>ACCESS PERMISSION // 5-AXIS SPEC</span>
            </div>

            {/* -------------------------------------------------------------
                STATION 02: CENTER ENGINE (EPIC SYNTHESIS TERMINAL)
                ------------------------------------------------------------- */}
            <div
              className={`fc-node-wrapper fc-node-engine ${activeNode === "engine" ? "is-active" : ""}`}
              onClick={() => selectNode("engine", 3)}
            >
              <div className="fc-engine-box">
                {/* Connector Pins on Borders */}
                <span className="fc-pin fc-pin-left" aria-hidden="true" />
                <span className="fc-pin fc-pin-right" aria-hidden="true" />
                <span className="fc-pin fc-pin-top" aria-hidden="true" />
                <span className="fc-pin fc-pin-bottom" aria-hidden="true" />

                {/* Central Diamond Geometric Emblem */}
                <div className="fc-engine-emblem">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 12l10 10 10-10L12 2zm0 4.5l5.5 5.5-5.5 5.5-5.5-5.5L12 6.5z" />
                  </svg>
                </div>

                <h3 className="fc-engine-title">EPIC SYNTHESIS ENGINE</h3>
                <p className="fc-engine-subtitle">MULTI-DISCIPLINARY CORE // AGENTIC ML</p>
              </div>

              <div className="fc-sub-label-box" style={{ textAlign: "center", alignItems: "center" }}>
                <span className="fc-sub-label-main">ACCOUNT AGGREGATOR</span>
                <span className="fc-sub-label-sub">EG: EPIC 5-AXIS ARCHITECTURE</span>
              </div>
            </div>

            {/* Micro Currency Tile beside Engine Output (₹ ₹ ₹) */}
            <div
              className="fc-currency-tile"
              title="Real-Time Transaction Stream"
              onClick={() => selectStep(4)}
            >
              <span className="fc-currency-sym">₹</span>
              <span className="fc-currency-sym">₹</span>
              <span className="fc-currency-sym">₹</span>
            </div>

            {/* -------------------------------------------------------------
                STATION 03: THE PRODUCTION BUILD (Violet Folder Node)
                ------------------------------------------------------------- */}
            <div
              className={`fc-node-wrapper fc-node-build ${activeNode === "build" ? "is-active" : ""}`}
              onClick={() => selectNode("build", 1)}
            >
              <div className="fc-folder-card fc-folder-purple">
                <div className="fc-folder-header">
                  <span className="fc-folder-tag">NODE // 02</span>
                  <div className="fc-folder-icon-circle">🚀</div>
                </div>

                <h3 className="fc-folder-title">PRODUCTION BUILD</h3>
                <p className="fc-folder-desc">
                  Spatial UI/UX, Scalable APIs &amp; Cloud Infrastructure
                </p>

                <div className="fc-folder-footer-strip">
                  <span>VELOCITY SPRINTS</span>
                  <span>120 FPS</span>
                </div>
              </div>

              <div className="fc-sub-label-box">
                <span className="fc-sub-label-main">CUSTOMER DEPLOYMENT</span>
                <span className="fc-sub-label-sub">EG: HIGH-CONCURRENCY APP</span>
              </div>
            </div>

            {/* Floating Upward Trend Chart Tile (📈) beside Build */}
            <div
              className="fc-trend-tile"
              title="Exponential Market Acceleration"
              onClick={() => selectStep(5)}
            >
              <div className="fc-trend-inner">
                <svg width="84" height="42" viewBox="0 0 100 50" fill="none">
                  <polyline
                    points="5,42 28,34 50,38 72,16 94,8"
                    stroke="#ea580c"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <polygon points="94,8 86,9 92,15" fill="#ea580c" />
                </svg>
              </div>
            </div>

            {/* Floating Deliverables / Form Stack */}
            <div
              className="fc-form-stack"
              title="Verified Deliverables Ledger"
              onClick={() => selectStep(5)}
            >
              <div className="fc-stack-header" />
              <div className="fc-stack-bar bar-orange" />
              <div className="fc-stack-bar bar-blue" />
              <div className="fc-stack-bar bar-purple" />
            </div>

            {/* -------------------------------------------------------------
                STATION 04: THE BUSINESS IMPACT (Warm Peach Folder Node)
                ------------------------------------------------------------- */}
            <div
              className={`fc-node-wrapper fc-node-impact ${activeNode === "impact" ? "is-active" : ""}`}
              onClick={() => selectNode("impact", 5)}
            >
              <div className="fc-folder-card fc-folder-peach">
                <div className="fc-folder-header">
                  <span className="fc-folder-tag">NODE // 03</span>
                  <div className="fc-folder-icon-circle">📈</div>
                </div>

                <h3 className="fc-folder-title">BUSINESS IMPACT</h3>
                <p className="fc-folder-desc">
                  Compounding Valuation, Market Dominance &amp; 10x ROI
                </p>

                <div className="fc-folder-footer-strip">
                  <span>CONTINUOUS SCALE</span>
                  <span>99.99% SLA</span>
                </div>
              </div>

              <div className="fc-sub-label-box">
                <span className="fc-sub-label-main">INFORMATION USER</span>
                <span className="fc-sub-label-sub">EG: CATEGORY-DEFINING BRAND</span>
              </div>
            </div>

            {/* -------------------------------------------------------------
                BOTTOM-CENTER: INTELLIGENT SYSTEMS / VELOCITY LEDGER
                ------------------------------------------------------------- */}
            <div
              className={`fc-node-wrapper fc-node-ledger ${activeNode === "ledger" ? "is-active" : ""}`}
              onClick={() => selectNode("ledger", 4)}
            >
              <div className="fc-ledger-pill">
                <span>TRANSACTIONS</span>
                <span className="fc-ledger-black-badge">AI AGENTS &amp; ML</span>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            4. REAL-TIME FLOW METRICS STRIP
            ========================================================================= */}
        <div className="imp-diagram-metrics-banner" data-reveal>
          <div className="imp-diagram-metric-card">
            <span className="imp-diagram-metric-val">-85%</span>
            <span className="imp-diagram-metric-label">System Friction &amp; Latency</span>
          </div>

          <div className="imp-diagram-metric-card">
            <span className="imp-diagram-metric-val">10X</span>
            <span className="imp-diagram-metric-label">Deployment Velocity</span>
          </div>

          <div className="imp-diagram-metric-card">
            <span className="imp-diagram-metric-val">99.99%</span>
            <span className="imp-diagram-metric-label">High-Load Availability SLA</span>
          </div>

          <div className="imp-diagram-metric-card">
            <span className="imp-diagram-metric-val">+400%</span>
            <span className="imp-diagram-metric-label">Compounding Enterprise Velocity</span>
          </div>
        </div>

        {/* =========================================================================
            6. FINAL TRANSFORMATION STATEMENT & ACTION CTA
            ========================================================================= */}
        <footer className="imp-diagram-footer" data-reveal>
          <div className="imp-diagram-statement">
            <span className="imp-diagram-badge">Δ RAW IDEA</span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#082fe6"
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
            <span className="imp-diagram-badge lime">EXPONENTIAL IMPACT</span>
            <p className="imp-diagram-desc">
              THE DISTANCE BETWEEN THE TWO IS WHAT WE ARE HIRED TO CLOSE.
            </p>
          </div>

          <Link
            href="/contact"
            className="imp-diagram-cta-btn"
            aria-label="Accelerate your build"
          >
            <span>ACCELERATE YOUR BUILD</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="imp-btn-arrow"
              aria-hidden="true"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </footer>
      </div>
    </section>
  );
}
