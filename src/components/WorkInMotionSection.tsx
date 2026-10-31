"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import useRevealOnScroll from "./useRevealOnScroll";
import AshokaChakra from "./AshokaChakra";

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

interface WebShowcaseCard {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  tldr: string;
  badge: string;
  url: string;
  image: string;
  fallback: string;
  accent: string;
}

const webShowcaseCards: WebShowcaseCard[] = [
  {
    id: "heavy-graphics",
    tag: "THE WEB CAN",
    title: "Render heavy graphics in the browser",
    subtitle: "High-performance WebGL, WebGPU & real-time canvas simulations",
    tldr: "Modern browser engines now support native multithreaded compute, hardware-accelerated shaders, and 60FPS fluid physics directly without third-party plugins.",
    badge: "WEBGL 2.0 / WEBGPU",
    url: "epic-studio.in/work/pets-app",
    image: "/assets/pets.webp",
    fallback: "/assets/pets.png",
    accent: "#0b57d0",
  },
  {
    id: "app-navigations",
    tag: "THE WEB CAN",
    title: "Deliver app-like navigations & state",
    subtitle: "Zero-latency page transitions with speculative prefetching",
    tldr: "Preserve scroll states, morph DOM elements between route changes, and eliminate loading spinners entirely with predictive asset hydration.",
    badge: "VIEW TRANSITIONS API",
    url: "epic-studio.in/work/omniflow-saas",
    image: "/assets/2ndmockup.webp",
    fallback: "/assets/2ndmockup.png",
    accent: "#c9ff17",
  },
  {
    id: "secure-logins",
    tag: "THE WEB CAN",
    title: "Simplify secure enterprise workflows",
    subtitle: "Frictionless authentication, biometric Passkeys & WebAuthn",
    tldr: "Replace friction-heavy SMS codes and redirects with on-device Face ID, Touch ID, and hardware security keys adhering to SOC-2 & HIPAA criteria.",
    badge: "WEBAUTHN / PASSKEYS",
    url: "epic-studio.in/work/fintech-hub",
    image: "/assets/3rdmockup.webp",
    fallback: "/assets/3rdmockup.png",
    accent: "#9333ea",
  },
  {
    id: "edge-performance",
    tag: "THE WEB CAN",
    title: "Scale sub-second Next.js platforms",
    subtitle: "Edge rendering, streaming HTML & globally distributed caches",
    tldr: "Deliver initial content in under 40ms from 300+ edge locations worldwide, keeping Core Web Vitals strictly in the 99th percentile.",
    badge: "EDGE RUNTIME / RSC",
    url: "epic-studio.in/work/aura-commerce",
    image: "/assets/pets.webp",
    fallback: "/assets/pets.png",
    accent: "#f43f5e",
  },
  {
    id: "design-systems",
    tag: "THE WEB CAN",
    title: "Unify multi-brand design tokens",
    subtitle: "Cohesive multi-platform design tokens & component registries",
    tldr: "Synchronize typography, dynamic color palettes, spacing hierarchies, and motion parameters seamlessly across web, iOS, and Android applications.",
    badge: "TOKEN ARCHITECTURE",
    url: "epic-studio.in/work/design-systems",
    image: "/assets/2ndmockup.webp",
    fallback: "/assets/2ndmockup.png",
    accent: "#0284c7",
  },
];

const AUTO_INTERVAL = 4600;
const AUTO_LOOP = false; // Disabled tab auto-looping

export default function WorkInMotionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeMode, setActiveMode] = useState<ModeId>("web");
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(true);

  // Web Showcase 3D Card Deck states (Google "The Web Can Do What!?")
  const [deckIndex, setDeckIndex] = useState(0);
  const [deckHover, setDeckHover] = useState<"none" | "left" | "right">("none");
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [detailState, setDetailState] = useState<"closed" | "opening" | "open" | "closing">("closed");
  const [isFlipping, setIsFlipping] = useState(false);

  const nextDeckCard = useCallback(() => {
    if (isFlipping || detailState !== "closed") return;
    setIsFlipping(true);
    setTimeout(() => {
      setDeckIndex((prev) => (prev + 1) % webShowcaseCards.length);
      setIsFlipping(false);
    }, 580);
  }, [isFlipping, detailState]);

  const handleOpenDetail = useCallback(() => {
    if (detailState !== "closed") return;
    setDetailState("opening");
    setPaused(true);
    setTimeout(() => {
      setDetailState("open");
    }, 520);
  }, [detailState]);

  const handleCloseDetail = useCallback(() => {
    if (detailState !== "open" && detailState !== "opening") return;
    setDetailState("closing");
    setTimeout(() => {
      setDetailState("closed");
      setPaused(false);
    }, 440);
  }, [detailState]);

  // Close detail view on Escape key
  useEffect(() => {
    if (detailState === "closed") return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleCloseDetail();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [detailState, handleCloseDetail]);

  const handleStageMouseLeave = useCallback(() => {
    setDeckHover("none");
    setIsCardHovered(false);
  }, []);

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
    if (!AUTO_LOOP || paused || !inView) return;
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
      {/* Organic Uneven Top Edge with Atmospheric Blend & Rolling Ashoka Chakra */}
      <div className="wim-top-edge-wrapper" aria-hidden="true">
        {/* Soft atmospheric gradient blend */}
        <div className="wim-edge-mist-blend" />

        {/* Sculpted organic wave contour */}
        <div className="wim-uneven-edge-svg-wrap">
          <svg
            className="wim-uneven-edge-svg"
            viewBox="0 0 1440 160"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="wimAtmosphericGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f8f9fa" stopOpacity="0.95" />
                <stop offset="55%" stopColor="#f8f9fa" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#0534f2" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="wimCrestCurveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(0, 0, 0, 0.25)" />
                <stop offset="25%" stopColor="rgba(5, 52, 242, 0.45)" />
                <stop offset="50%" stopColor="rgba(0, 0, 0, 0.35)" />
                <stop offset="75%" stopColor="rgba(5, 52, 242, 0.45)" />
                <stop offset="100%" stopColor="rgba(0, 0, 0, 0.25)" />
              </linearGradient>
            </defs>

            {/* Atmospheric secondary wave extension */}
            <path
              d="M 0 0 L 1440 0 L 1440 110 C 1340 144, 1220 90, 1152 90 C 1070 90, 930 146, 864 146 C 790 146, 650 88, 576 118 C 500 150, 340 150, 230 90 C 140 90, 60 110, 0 110 Z"
              fill="url(#wimAtmosphericGrad)"
            />

            {/* Primary sculpted uneven wave filled with preceding section background #f8f9fa */}
            <path
              d="M 0 0 L 1440 0 L 1440 96 C 1340 130, 1220 76, 1152 76 C 1070 76, 930 132, 864 132 C 790 132, 650 74, 576 104 C 500 136, 340 136, 230 76 C 140 76, 60 96, 0 96 Z"
              fill="#f8f9fa"
            />

            {/* Distinct curved boundary path traced along the wave */}
            <path
              d="M 0 96 C 60 96, 140 76, 230 76 C 340 136, 500 136, 576 104 C 650 74, 790 132, 864 132 C 930 132, 1070 76, 1152 76 C 1220 76, 1340 130, 1440 96"
              stroke="url(#wimCrestCurveGrad)"
              strokeWidth="1.6"
              fill="none"
              opacity="0.4"
            />
          </svg>
        </div>

        {/* Rolling Black Ashoka Chakra motioning above the curved path */}
        <div className="wim-chakra-conduit">
          <div className="wim-chakra-runner">
            <div className="wim-chakra-spinner">
              <AshokaChakra size="100%" color="#000000" className="wim-chakra-svg" />
            </div>
          </div>
        </div>
      </div>

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
            {activeMode !== "web" && (
              <>
                <span className="wim-float-tag wim-tag-top">
                  {workModes.find((m) => m.id === activeMode)?.marker}
                </span>
                <span className="wim-float-tag wim-tag-bottom">
                  RENDERED BY EPIC STUDIO · 60FPS
                </span>
              </>
            )}

            {/* ---------- WEB (Google Web Showcase Card Deck) ---------- */}
            {(() => {
              const currentCard = webShowcaseCards[deckIndex % webShowcaseCards.length];
              const isTiltedRight = (isCardHovered || deckHover === "right") && detailState === "closed" && !isFlipping;
              const isTiltedLeft = deckHover === "left" && detailState === "closed" && !isFlipping;

              return (
                <div className={`wim-world wim-world-web ${activeMode === "web" ? "is-visible" : ""}`} aria-hidden={activeMode !== "web"}>
                  <div
                    className={`wim-showcase-stage ${detailState !== "closed" ? "has-overlay" : ""}`}
                    onMouseLeave={handleStageMouseLeave}
                  >
                    {/* Left Action: Next Card */}
                    <button
                      type="button"
                      className={`wim-showcase-nav nav-prev ${isTiltedLeft ? "is-hovered" : ""}`}
                      onClick={nextDeckCard}
                      onMouseEnter={() => setDeckHover("left")}
                      onMouseLeave={() => setDeckHover("none")}
                      aria-label="Next Card"
                      tabIndex={detailState !== "closed" ? -1 : 0}
                    >
                      <span className="nav-text">Next Card</span>
                      <span className="nav-bar" />
                    </button>

                    {/* Right Action: Show me! */}
                    <button
                      type="button"
                      className={`wim-showcase-nav nav-next ${isTiltedRight ? "is-hovered" : ""}`}
                      onClick={handleOpenDetail}
                      onMouseEnter={() => setDeckHover("right")}
                      onMouseLeave={() => setDeckHover("none")}
                      aria-label="Show me details"
                      tabIndex={detailState !== "closed" ? -1 : 0}
                    >
                      <span className="nav-text">Show me!</span>
                      <span className="nav-bar" />
                    </button>

                    {/* Card Stack Deck */}
                    <div
                      className={`gcard-deck ${detailState !== "closed" ? "is-deck-hidden" : ""} ${isFlipping ? "is-flipping-deck" : ""}`}
                      role="region"
                      aria-label="Interactive 3D card deck"
                      onMouseEnter={() => setIsCardHovered(true)}
                      onMouseLeave={() => setIsCardHovered(false)}
                    >
                      {/* Layer 3 (Deepest) */}
                      {(() => {
                        const c3 = webShowcaseCards[(deckIndex + 3) % webShowcaseCards.length];
                        return (
                          <div className={`gcard-card gcard-layer-3 ${isFlipping ? "is-promoting" : ""}`} key={`l3-${c3.id}`} aria-hidden="true">
                            <span className="gcard-tag" style={{ color: c3.accent }}>{c3.tag}</span>
                            <h3 className="gcard-title">{c3.title}</h3>
                            <div className="gcard-browser">
                              <div className="gcard-browser-bar">
                                <span className="wdot d-red" />
                                <span className="wdot d-yellow" />
                                <span className="wdot d-green" />
                                <span className="gcard-url">{c3.url}</span>
                              </div>
                              <div className="gcard-browser-body">
                                <img src={c3.image} onError={(e) => { e.currentTarget.src = c3.fallback; }} alt="" loading="eager" decoding="async" />
                              </div>
                            </div>
                          </div>
                        );
                      })()}

                      {/* Layer 2 */}
                      {(() => {
                        const c2 = webShowcaseCards[(deckIndex + 2) % webShowcaseCards.length];
                        return (
                          <div className={`gcard-card gcard-layer-2 ${isFlipping ? "is-promoting" : ""}`} key={`l2-${c2.id}`} aria-hidden="true">
                            <span className="gcard-tag" style={{ color: c2.accent }}>{c2.tag}</span>
                            <h3 className="gcard-title">{c2.title}</h3>
                            <div className="gcard-browser">
                              <div className="gcard-browser-bar">
                                <span className="wdot d-red" />
                                <span className="wdot d-yellow" />
                                <span className="wdot d-green" />
                                <span className="gcard-url">{c2.url}</span>
                              </div>
                              <div className="gcard-browser-body">
                                <img src={c2.image} onError={(e) => { e.currentTarget.src = c2.fallback; }} alt="" loading="eager" decoding="async" />
                              </div>
                            </div>
                          </div>
                        );
                      })()}

                      {/* Layer 1 (Undercard - reveals on wing peel) */}
                      {(() => {
                        const c1 = webShowcaseCards[(deckIndex + 1) % webShowcaseCards.length];
                        const peelClass = isTiltedRight ? "peel-under-left" : isTiltedLeft ? "peel-under-right" : "";
                        return (
                          <div className={`gcard-card gcard-layer-1 ${peelClass} ${isFlipping ? "is-promoting" : ""}`} key={`l1-${c1.id}`} aria-hidden="true">
                            <span className="gcard-tag" style={{ color: c1.accent }}>{c1.tag}</span>
                            <h3 className="gcard-title">{c1.title}</h3>
                            <div className="gcard-browser">
                              <div className="gcard-browser-bar">
                                <span className="wdot d-red" />
                                <span className="wdot d-yellow" />
                                <span className="wdot d-green" />
                                <span className="gcard-url">{c1.url}</span>
                              </div>
                              <div className="gcard-browser-body">
                                <img src={c1.image} onError={(e) => { e.currentTarget.src = c1.fallback; }} alt="" loading="eager" decoding="async" />
                              </div>
                            </div>
                          </div>
                        );
                      })()}

                      {/* Layer 0 (Top card - peels open on hover & opens on click) */}
                      {(() => {
                        const c0 = currentCard;
                        const peelClass = isTiltedRight ? "peel-top-right" : isTiltedLeft ? "peel-top-left" : "";
                        const flipClass = isFlipping ? "is-sliding-back" : "";
                        return (
                          <div
                            className={`gcard-card gcard-top ${peelClass} ${flipClass}`}
                            key={`l0-${c0.id}`}
                            onClick={handleOpenDetail}
                            role="button"
                            tabIndex={detailState === "closed" ? 0 : -1}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                handleOpenDetail();
                              }
                            }}
                            aria-label={`${c0.title} - Click to expand view`}
                          >
                            <span className="gcard-tag" style={{ color: c0.accent }}>{c0.tag}</span>
                            <h3 className="gcard-title">{c0.title}</h3>
                            <div className="gcard-browser">
                              <div className="gcard-browser-bar">
                                <span className="wdot d-red" />
                                <span className="wdot d-yellow" />
                                <span className="wdot d-green" />
                                <span className="gcard-url">{c0.url}</span>
                              </div>
                              <div className="gcard-browser-body">
                                <img src={c0.image} onError={(e) => { e.currentTarget.src = c0.fallback; }} alt={c0.title} loading="eager" decoding="async" />
                              </div>
                            </div>
                            <div className="gcard-hint-badge" aria-hidden="true">
                              <span>OPEN DETAILS ↗</span>
                            </div>
                          </div>
                        );
                      })()}
                    </div>

                    {/* Bottom Pagination Dots */}
                    <div className={`wim-deck-dots ${detailState !== "closed" ? "is-hidden" : ""}`} aria-label="Card pagination">
                      {webShowcaseCards.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          className={`deck-dot ${i === deckIndex ? "is-active" : ""}`}
                          onClick={() => setDeckIndex(i)}
                          aria-label={`Go to showcase card ${i + 1}`}
                        />
                      ))}
                    </div>

                    {/* EXPANDED FULL-BOX VIEW (Google Web Showcase Card Expansion) */}
                    {detailState !== "closed" && (
                      <div
                        className={`wim-expanded-overlay ${detailState === "closing" ? "is-closing" : "is-opening"}`}
                        role="dialog"
                        aria-modal="true"
                        aria-label={currentCard.title}
                      >
                        <div className="wim-expand-header">
                          <div className="wim-expand-tag-wrap">
                            <span
                              className="wim-expand-tag"
                              style={{
                                color: currentCard.accent,
                                borderColor: `${currentCard.accent}55`,
                                backgroundColor: `${currentCard.accent}14`,
                              }}
                            >
                              {currentCard.tag}
                            </span>
                            <span className="wim-expand-badge">{currentCard.badge}</span>
                          </div>

                          {/* Close cross button (top right) */}
                          <button
                            type="button"
                            className="wim-expand-close"
                            onClick={handleCloseDetail}
                            aria-label="Close card view"
                          >
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                              <line x1="18" y1="6" x2="6" y2="18" />
                              <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                          </button>
                        </div>

                        <div className="wim-expand-body">
                          <div className="wim-expand-info">
                            <h3 className="wim-expand-title">{currentCard.title}</h3>
                            <p className="wim-expand-sub">{currentCard.subtitle}</p>
                            <div className="wim-expand-tldr" style={{ borderLeftColor: currentCard.accent }}>
                              <span className="tldr-label" style={{ color: currentCard.accent }}>TL;DR</span>
                              <p className="tldr-text">{currentCard.tldr}</p>
                            </div>
                            <div className="wim-expand-actions">
                              <a href="#lets-build" className="wim-expand-btn-primary" onClick={handleCloseDetail}>
                                <span>BUILD THIS WITH EPIC</span>
                                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5">
                                  <path d="M5 12h14M13 6l6 6-6 6" />
                                </svg>
                              </a>
                              <button type="button" className="wim-expand-btn-ghost" onClick={handleCloseDetail}>
                                Close Preview
                              </button>
                            </div>
                          </div>

                          <div className="wim-expand-browser-wrap">
                            <div className="wim-expand-browser">
                              <div className="wim-expand-browser-bar">
                                <div className="wim-browser-dots">
                                  <span className="wdot d-red" />
                                  <span className="wdot d-yellow" />
                                  <span className="wdot d-green" />
                                </div>
                                <div className="wim-expand-browser-url">
                                  <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                  </svg>
                                  <span>https://{currentCard.url}</span>
                                </div>
                                <span className="wim-expand-browser-badge">LIVE DEMO</span>
                              </div>
                              <div className="wim-expand-browser-body">
                                <img
                                  src={currentCard.image}
                                  onError={(e) => { e.currentTarget.src = currentCard.fallback; }}
                                  alt={currentCard.title}
                                  loading="eager"
                                  decoding="async"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <span className="wim-num-watermark">01</span>
                </div>
              );
            })()}

            {/* ---------- MOBILE ---------- */}
            <div className={`wim-world ${activeMode === "mobile" ? "is-visible" : ""}`} aria-hidden={activeMode !== "mobile"}>
              <div className="wim-phone">
                <span className="wim-phone-notch" aria-hidden="true" />
                <img src="/assets/mid.webp" onError={(e) => { e.currentTarget.src = "/assets/mid.png"; }} alt="" loading="eager" decoding="async" />
              </div>
              <div className="wim-phone-secondary" aria-hidden="true">
                <img src="/assets/orange-screen.webp" onError={(e) => { e.currentTarget.src = "/assets/orange-screen.png"; }} alt="" loading="eager" decoding="async" />
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
                <img src="/assets/facebookmock.webp" onError={(e) => { e.currentTarget.src = "/assets/facebookmock.png"; }} alt="" loading="eager" decoding="async" />
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
                  <img src="/assets/2ndmockup.webp" onError={(e) => { e.currentTarget.src = "/assets/2ndmockup.png"; }} alt="" loading="eager" decoding="async" />
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
