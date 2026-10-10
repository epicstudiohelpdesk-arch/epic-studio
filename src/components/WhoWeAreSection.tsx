"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import AshokaChakra from "./AshokaChakra";
import WaterSpreadDesign from "./WaterSpreadDesign";

export default function WhoWeAreSection() {
  const [currentStat, setCurrentStat] = useState<number>(0);
  const targetStat = 250;

  // Stat Counter Animation
  useEffect(() => {
    let frameId: number;
    let start: number | null = null;
    const duration = 1800;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCurrentStat(Math.floor(eased * targetStat));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <section className="who-classic-section" id="who-we-are" aria-labelledby="who-we-are-title">
      {/* Hero Blue Ambient Color Leak (Fluid atmospheric spread below marquee into 01 section) */}
      <div className="who-hero-blue-leak" aria-hidden="true" />

      {/* Organic Water Spread Out Design (Liquid waves, specular shimmer crests & droplet ripples) */}
      <WaterSpreadDesign />

      {/* Background Architectural Grid (Exact same grid design and 64px spacing as hero section) */}
      <div
        className="who-classic-grid-bg"
        style={{
          backgroundImage:
            "linear-gradient(rgba(8, 47, 230, 0.085) 1px, transparent 1px), linear-gradient(90deg, rgba(8, 47, 230, 0.085) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          backgroundPosition: "0 0",
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.8) 75%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.8) 75%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* Symbolic Architecture: Ashoka Chakra representing Indian Origin */}
      <div className="who-chakra-monument" aria-hidden="true">
        <AshokaChakra />
      </div>

      <div className="who-classic-container">
        
        {/* =========================================================================
            1. SECTION HEADER
           ========================================================================= */}
        <header className="who-classic-masthead">
          <div className="who-classic-brand-badge">
            <span className="who-classic-badge-tag">01 // WHO WE ARE</span>
          </div>
        </header>

        {/* =========================================================================
            2. CLASSIC EDITORIAL HERO & MANIFESTO
           ========================================================================= */}
        <div className="who-classic-hero-block">
          <div className="who-classic-headline-wrap">
            <h2 id="who-we-are-title" className="who-classic-title">
              WE ARCHITECT THE DIGITAL SYSTEMS THAT <span className="who-classic-title-serif">SHAPE GLOBAL INDUSTRIES.</span>
            </h2>
          </div>

          {/* Asymmetric Split: Founder Manifesto & Scale Monolith */}
          <div className="who-classic-split-row">
            
            {/* Left: Founder Manifesto Block */}
            <div className="who-classic-manifesto">
              <div className="who-classic-quote-bar" aria-hidden="true" />
              <div className="who-classic-manifesto-content">
                <p className="who-classic-manifesto-text">
                  &ldquo;Software shouldn&apos;t just function — it must command authority. We founded Epic Studio to fuse deep Indian software engineering rigor with relentless Silicon Valley product craft. No junior buffers, no technical debt — just senior staff architects building category-defining digital platforms.&rdquo;
                </p>
                <div className="who-classic-manifesto-author">
                  <strong>EPIC STUDIO LEADERSHIP COLLECTIVE</strong>
                  <span>Bengaluru · San Francisco · London</span>
                </div>
              </div>
            </div>

            {/* Right: Scale & Production Monolith */}
            <div className="who-classic-scale-monolith">
              <div className="who-classic-scale-top">
                <span className="who-classic-scale-tag">PRODUCTION SCALE</span>
                <div className="who-classic-scale-live-pill">
                  <span className="classic-live-dot" /> ACTIVE PLATFORMS
                </div>
              </div>

              <div className="who-classic-scale-number-wrap">
                <span className="who-classic-scale-num">{currentStat}</span>
                <span className="who-classic-scale-plus">+</span>
              </div>
              <span className="who-classic-scale-label">Enterprise Platforms &amp; AI Systems Deployed Globally</span>

              <div className="who-classic-scale-quick-metrics">
                <div className="who-classic-quick-metric-item">
                  <strong>100%</strong>
                  <span>Senior Staff Only</span>
                </div>
                <div className="who-classic-quick-metric-item">
                  <strong>99.99%</strong>
                  <span>System SLA Uptime</span>
                </div>
                <div className="who-classic-quick-metric-item">
                  <strong>14-Day</strong>
                  <span>Sprint Velocity</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* =========================================================================
            3. GLOBAL OPERATING FOOTPRINT & ACTION BAR
           ========================================================================= */}
        <div className="who-classic-action-bar">
          <div className="who-classic-action-hubs">
            <div className="who-classic-action-hub-item">
              <span className="classic-action-hub-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="4" width="16" height="16" rx="2" />
                  <rect x="9" y="9" width="6" height="6" />
                  <line x1="9" y1="1" x2="9" y2="4" />
                  <line x1="15" y1="1" x2="15" y2="4" />
                  <line x1="9" y1="20" x2="9" y2="23" />
                  <line x1="15" y1="20" x2="15" y2="23" />
                  <line x1="20" y1="9" x2="23" y2="9" />
                  <line x1="20" y1="14" x2="23" y2="14" />
                  <line x1="1" y1="9" x2="4" y2="9" />
                  <line x1="1" y1="14" x2="4" y2="14" />
                </svg>
              </span>
              <div className="classic-action-hub-text">
                <strong>ENGINEERING LABS</strong>
                <span>Kolkata, India</span>
              </div>
            </div>
            <div className="who-classic-action-hub-divider" aria-hidden="true" />
            <div className="who-classic-action-hub-item">
              <span className="classic-action-hub-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </span>
              <div className="classic-action-hub-text">
                <strong>GLOBAL CLIENT HUBS</strong>
                <span>San Francisco · London · Singapore · India</span>
              </div>
            </div>
          </div>

          <div className="who-classic-action-buttons">
            <a href="#capabilities" className="who-classic-ghost-btn">
              <span>EXPLORE ALL CAPABILITIES</span>
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>

            <Link href="/contact" className="who-classic-cta-btn">
              <span>BOOK ARCHITECTURE REVIEW</span>
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.6" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
