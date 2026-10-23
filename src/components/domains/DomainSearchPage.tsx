"use client";

import React, { useState, useRef } from "react";
import Header from "../Header";
import SiteFooter from "../SiteFooter";
import { TLD_LIST } from "./domainsData";
import "./domains.css";

export default function DomainSearchPage() {
  const [searchInput, setSearchInput] = useState("");
  const [selectedTldFilter, setSelectedTldFilter] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [activeTabMode, setActiveTabMode] = useState<"search" | "transfer">("search");
  const [transferAuthCode, setTransferAuthCode] = useState("");

  const heroRef = useRef<HTMLElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  // Execute Search
  const handlePerformSearch = (rawInput: string, explicitTld?: string) => {
    if (!rawInput.trim()) return;
    setIsSearching(true);
    if (explicitTld) {
      setSelectedTldFilter(explicitTld);
    }
    setTimeout(() => {
      setIsSearching(false);
    }, 280);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handlePerformSearch(searchInput);
  };

  return (
    <main className="site-shell domains-page-root">
      <section className="hero-section domains-hero-section" ref={heroRef} aria-labelledby="domains-hero-title">
        <Header />

        <div className="domains-hero-scenery" aria-hidden="true">
          <div className="domain-signal-card domain-signal-card-a">
            <span className="signal-badge-top">
              <span className="signal-dot signal-dot-green" />
              available
            </span>
            <strong>brandcraft.ai</strong>
          </div>
          <div className="domain-signal-card domain-signal-card-b">
            <span className="signal-badge-top">
              <span className="signal-dot signal-dot-cyan" />
              DNS live
            </span>
            <strong>42 ms</strong>
          </div>
          <div className="domain-signal-card domain-signal-card-c">
            <span className="signal-badge-top">
              <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              protected
            </span>
            <strong>WHOIS privacy</strong>
          </div>

          <div className="domains-horizon-graphics">
            <svg
              className="domains-horizon-svg"
              viewBox="0 0 1440 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="geomFacet1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#082fe6" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#03187a" stopOpacity="0.95" />
                </linearGradient>
                <linearGradient id="geomFacet2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#082fe6" stopOpacity="0.9" />
                </linearGradient>
                <linearGradient id="geomFacet3" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0c38ff" stopOpacity="0.75" />
                  <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.85" />
                </linearGradient>
                <linearGradient id="geomFacet4" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1e40af" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#051752" stopOpacity="0.95" />
                </linearGradient>
                <linearGradient id="geomFacetHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.2" />
                </linearGradient>
                <linearGradient id="wireframeStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#ffffff" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
                </linearGradient>
              </defs>

              {/* Geometric Isometric Floor Grid */}
              <g opacity="0.25" stroke="#ffffff" strokeWidth="0.8">
                <line x1="0" y1="260" x2="600" y2="320" />
                <line x1="0" y1="210" x2="800" y2="320" />
                <line x1="0" y1="160" x2="1000" y2="320" />
                <line x1="1440" y1="260" x2="840" y2="320" />
                <line x1="1440" y1="210" x2="640" y2="320" />
                <line x1="1440" y1="160" x2="440" y2="320" />
              </g>

              {/* Low-Poly Geometric Facet Terrain */}
              <g stroke="rgba(255, 255, 255, 0.42)" strokeWidth="1" strokeLinejoin="round">
                {/* Left Sector */}
                <polygon points="0,320 0,240 120,200 240,260" fill="url(#geomFacet1)" />
                <polygon points="0,240 80,160 120,200" fill="url(#geomFacet3)" />
                <polygon points="80,160 200,120 120,200" fill="url(#geomFacetHighlight)" />
                <polygon points="120,200 200,120 320,180" fill="url(#geomFacet2)" />
                <polygon points="120,200 320,180 240,260" fill="url(#geomFacet4)" />
                <polygon points="240,260 320,180 440,240" fill="url(#geomFacet1)" />
                <polygon points="240,260 440,240 360,320" fill="url(#geomFacet4)" />
                <polygon points="0,320 240,260 360,320" fill="url(#geomFacet1)" />

                {/* Center-Left Sector */}
                <polygon points="200,120 380,90 320,180" fill="url(#geomFacet3)" />
                <polygon points="380,90 480,150 320,180" fill="url(#geomFacetHighlight)" />
                <polygon points="320,180 480,150 440,240" fill="url(#geomFacet2)" />
                <polygon points="380,90 560,110 480,150" fill="url(#geomFacet3)" />
                <polygon points="480,150 560,110 620,190" fill="url(#geomFacet4)" />
                <polygon points="480,150 620,190 440,240" fill="url(#geomFacet1)" />
                <polygon points="440,240 620,190 580,320" fill="url(#geomFacet2)" />
                <polygon points="360,320 440,240 580,320" fill="url(#geomFacet4)" />

                {/* Center Peak Sector */}
                <polygon points="560,110 720,70 620,190" fill="url(#geomFacetHighlight)" />
                <polygon points="720,70 820,120 620,190" fill="url(#geomFacet3)" />
                <polygon points="620,190 820,120 740,220" fill="url(#geomFacet2)" />
                <polygon points="620,190 740,220 580,320" fill="url(#geomFacet1)" />
                <polygon points="580,320 740,220 780,320" fill="url(#geomFacet4)" />

                {/* Center-Right Sector */}
                <polygon points="720,70 900,80 820,120" fill="url(#geomFacetHighlight)" />
                <polygon points="820,120 900,80 980,140" fill="url(#geomFacet3)" />
                <polygon points="820,120 980,140 740,220" fill="url(#geomFacet4)" />
                <polygon points="740,220 980,140 920,230" fill="url(#geomFacet2)" />
                <polygon points="740,220 920,230 780,320" fill="url(#geomFacet1)" />
                <polygon points="780,320 920,230 960,320" fill="url(#geomFacet4)" />

                {/* Right Sector */}
                <polygon points="900,80 1080,110 980,140" fill="url(#geomFacet3)" />
                <polygon points="980,140 1080,110 1140,170" fill="url(#geomFacetHighlight)" />
                <polygon points="980,140 1140,170 920,230" fill="url(#geomFacet1)" />
                <polygon points="920,230 1140,170 1060,250" fill="url(#geomFacet2)" />
                <polygon points="920,230 1060,250 960,320" fill="url(#geomFacet3)" />
                <polygon points="960,320 1060,250 1180,320" fill="url(#geomFacet4)" />

                {/* Far Right Sector */}
                <polygon points="1080,110 1260,140 1140,170" fill="url(#geomFacetHighlight)" />
                <polygon points="1140,170 1260,140 1340,210" fill="url(#geomFacet3)" />
                <polygon points="1140,170 1340,210 1060,250" fill="url(#geomFacet2)" />
                <polygon points="1060,250 1340,210 1260,280" fill="url(#geomFacet1)" />
                <polygon points="1060,250 1260,280 1180,320" fill="url(#geomFacet4)" />
                <polygon points="1260,140 1440,180 1340,210" fill="url(#geomFacet3)" />
                <polygon points="1340,210 1440,180 1440,260" fill="url(#geomFacetHighlight)" />
                <polygon points="1340,210 1440,260 1260,280" fill="url(#geomFacet2)" />
                <polygon points="1260,280 1440,260 1440,320" fill="url(#geomFacet1)" />
                <polygon points="1180,320 1260,280 1440,320" fill="url(#geomFacet4)" />
              </g>

              {/* Floating Isometric Wireframe Cubes */}
              {/* Left Cube */}
              <g stroke="#ffffff" strokeWidth="1.2" fill="rgba(255, 255, 255, 0.08)" opacity="0.85">
                <polygon points="200,60 230,42 260,60 230,78" fill="rgba(255, 255, 255, 0.22)" />
                <polygon points="200,60 230,78 230,112 200,94" fill="rgba(56, 189, 248, 0.25)" />
                <polygon points="260,60 230,78 230,112 260,94" fill="rgba(8, 47, 230, 0.35)" />
              </g>

              {/* Right Cube */}
              <g stroke="#ffffff" strokeWidth="1.2" fill="rgba(255, 255, 255, 0.08)" opacity="0.85">
                <polygon points="1240,70 1270,52 1300,70 1270,88" fill="rgba(255, 255, 255, 0.22)" />
                <polygon points="1240,70 1270,88 1270,122 1240,104" fill="rgba(56, 189, 248, 0.25)" />
                <polygon points="1300,70 1270,88 1270,122 1300,104" fill="rgba(8, 47, 230, 0.35)" />
              </g>

              {/* Center Diamond Node */}
              <g stroke="#38bdf8" strokeWidth="1.4" fill="rgba(255, 255, 255, 0.25)">
                <polygon points="720,40 735,55 720,70 705,55" />
                <circle cx="720" cy="55" r="2.5" fill="#ffffff" />
              </g>

              {/* Precision Vertex Highlights */}
              <circle cx="380" cy="90" r="3" fill="#ffffff" />
              <circle cx="560" cy="110" r="3" fill="#ffffff" />
              <circle cx="720" cy="70" r="4" fill="#ffffff" />
              <circle cx="900" cy="80" r="3" fill="#ffffff" />
              <circle cx="1080" cy="110" r="3" fill="#ffffff" />
              <circle cx="1260" cy="140" r="3" fill="#ffffff" />
            </svg>
          </div>
        </div>

        <div className="domains-hero-content">
            <h1 id="domains-hero-title" className="domains-hero-title">
              Find the domain your brand can grow into.
            </h1>

            <p className="domains-hero-subtitle">
              Search <span className="subtitle-highlight">live availability</span>, compare <span className="subtitle-highlight">premium extensions</span>, transfer what you own, and launch with <span className="subtitle-highlight">privacy, DNS & SSL</span> built in.
            </p>

            <div className="domains-search-stack">
              <div className="domains-mode-toggle" role="tablist" aria-label="Domain search mode">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTabMode === "search"}
                  className={`mode-toggle-btn ${activeTabMode === "search" ? "active" : ""}`}
                  onClick={() => setActiveTabMode("search")}
                >
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="7" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                  <span>Register</span>
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTabMode === "transfer"}
                  className={`mode-toggle-btn ${activeTabMode === "transfer" ? "active" : ""}`}
                  onClick={() => setActiveTabMode("transfer")}
                >
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 1l4 4-4 4" />
                    <path d="M3 11V9a4 4 0 0 1 4-4h14" />
                    <path d="M7 23l-4-4 4-4" />
                    <path d="M21 13v2a4 4 0 0 1-4 4H3" />
                  </svg>
                  <span>Transfer</span>
                  <span className="mode-promo-badge">+1 year</span>
                </button>
              </div>

              <div className={`domains-search-box-card ${activeTabMode === "transfer" ? "transfer-mode-card" : ""}`}>
                {activeTabMode === "search" ? (
                  <>
                    <form onSubmit={handleFormSubmit} className="domains-search-form">
                      <div className="domains-input-shell">
                        <span className="domains-input-prefix" aria-hidden="true">
                          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M2 12h20" />
                            <path d="M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20" />
                          </svg>
                          www.
                        </span>
                        <input
                          ref={searchInputRef}
                          type="text"
                          className="domains-main-input"
                          value={searchInput}
                          onChange={(e) => setSearchInput(e.target.value)}
                          placeholder="yourbrand.com, brand.ai, studio.dev"
                          autoComplete="off"
                          autoCapitalize="off"
                          spellCheck={false}
                        />
                        {searchInput && (
                          <button
                            type="button"
                            className="domains-clear-input-btn"
                            onClick={() => {
                              setSearchInput("");
                              searchInputRef.current?.focus();
                            }}
                            aria-label="Clear domain search"
                          >
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                              <path d="M6 6l12 12M18 6L6 18" />
                            </svg>
                          </button>
                        )}
                      </div>

                      <button
                        type="submit"
                        className={`domains-hero-submit-btn ${isSearching ? "loading" : ""}`}
                        disabled={isSearching}
                      >
                        {isSearching ? (
                          <span className="btn-loading-flex">
                            <span className="search-spin-ring" />
                            <span>Checking</span>
                          </span>
                        ) : (
                          <span className="btn-normal-flex">
                            <span>Search</span>
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                          </span>
                        )}
                      </button>
                    </form>

                    <div className="domains-tld-chips-bar">
                      <span className="tld-chips-label">Popular</span>
                      <div className="tld-chips-scroll">
                        {TLD_LIST.slice(0, 10).map((item) => {
                          const isSelected = selectedTldFilter === item.tld;
                          return (
                            <button
                              key={item.tld}
                              type="button"
                              className={`instant-tld-chip ${isSelected ? "is-selected" : ""}`}
                              onClick={() => {
                                const newFilter = isSelected ? null : item.tld;
                                setSelectedTldFilter(newFilter);
                                handlePerformSearch(searchInput, newFilter || undefined);
                              }}
                            >
                              <span className="tld-name">{item.tld}</span>
                              <span className="tld-price">${item.priceFirstYear.toFixed(2)}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        alert(`Transfer initiated for ${searchInput}! Auth code validated.`);
                      }}
                      className="domains-transfer-form"
                    >
                      <div className="transfer-grid-inputs">
                        <div className="domains-input-shell">
                          <input
                            type="text"
                            className="domains-main-input"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            placeholder="mycompany.com"
                          />
                        </div>
                        <div className="domains-input-shell auth-input-shell">
                          <input
                            type="text"
                            className="domains-main-input"
                            value={transferAuthCode}
                            onChange={(e) => setTransferAuthCode(e.target.value)}
                            placeholder="EPP / Auth code"
                          />
                        </div>
                      </div>
                      <button type="submit" className="domains-hero-submit-btn">
                        <span>Verify transfer</span>
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </button>
                    </form>
                    <div className="transfer-perks-strip">
                      <span>Zero-downtime move</span>
                      <span>Extra year added</span>
                      <span>Privacy included</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="domains-guarantees-bar">
              <div className="guarantee-item">
                <span className="guarantee-icon-shell" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <circle cx="12" cy="11" r="2.5" />
                  </svg>
                </span>
                <span className="guarantee-label">Free WHOIS privacy</span>
              </div>
              <div className="guarantee-item">
                <span className="guarantee-icon-shell" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                    <line x1="7" y1="7" x2="7.01" y2="7" />
                  </svg>
                </span>
                <span className="guarantee-label">Clean renewal pricing</span>
              </div>
              <div className="guarantee-item">
                <span className="guarantee-icon-shell" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    <path d="M12 15v3" />
                  </svg>
                </span>
                <span className="guarantee-label">Instant DNS + SSL</span>
              </div>
            </div>
          </div>

        {/* Crisscrossing Coming Soon Marquee Strips */}
        <div className="domains-hero-marquees" aria-hidden="true">
          {/* Marquee 1: Top-Right to Bottom-Left */}
          <div className="crisscross-marquee-tape tape-top-right">
            <div className="marquee-track track-reverse">
              <div className="marquee-content">
                <span>COMING SOON</span>
                <span className="marquee-sep">{"//"}</span>
                <span>COMING SOON</span>
                <span className="marquee-sep">{"//"}</span>
                <span>COMING SOON</span>
                <span className="marquee-sep">{"//"}</span>
                <span>COMING SOON</span>
                <span className="marquee-sep">{"//"}</span>
                <span>COMING SOON</span>
                <span className="marquee-sep">{"//"}</span>
                <span>COMING SOON</span>
                <span className="marquee-sep">{"//"}</span>
                <span>COMING SOON</span>
                <span className="marquee-sep">{"//"}</span>
                <span>COMING SOON</span>
                <span className="marquee-sep">{"//"}</span>
              </div>
              <div className="marquee-content" aria-hidden="true">
                <span>COMING SOON</span>
                <span className="marquee-sep">{"//"}</span>
                <span>COMING SOON</span>
                <span className="marquee-sep">{"//"}</span>
                <span>COMING SOON</span>
                <span className="marquee-sep">{"//"}</span>
                <span>COMING SOON</span>
                <span className="marquee-sep">{"//"}</span>
                <span>COMING SOON</span>
                <span className="marquee-sep">{"//"}</span>
                <span>COMING SOON</span>
                <span className="marquee-sep">{"//"}</span>
                <span>COMING SOON</span>
                <span className="marquee-sep">{"//"}</span>
                <span>COMING SOON</span>
                <span className="marquee-sep">{"//"}</span>
              </div>
            </div>
          </div>

          {/* Marquee 2: Mid-Left to Bottom-Right */}
          <div className="crisscross-marquee-tape tape-mid-left">
            <div className="marquee-track track-forward">
              <div className="marquee-content">
                <span>COMING SOON</span>
                <span className="marquee-sep">{"//"}</span>
                <span>COMING SOON</span>
                <span className="marquee-sep">{"//"}</span>
                <span>COMING SOON</span>
                <span className="marquee-sep">{"//"}</span>
                <span>COMING SOON</span>
                <span className="marquee-sep">{"//"}</span>
                <span>COMING SOON</span>
                <span className="marquee-sep">{"//"}</span>
                <span>COMING SOON</span>
                <span className="marquee-sep">{"//"}</span>
                <span>COMING SOON</span>
                <span className="marquee-sep">{"//"}</span>
                <span>COMING SOON</span>
                <span className="marquee-sep">{"//"}</span>
              </div>
              <div className="marquee-content" aria-hidden="true">
                <span>COMING SOON</span>
                <span className="marquee-sep">{"//"}</span>
                <span>COMING SOON</span>
                <span className="marquee-sep">{"//"}</span>
                <span>COMING SOON</span>
                <span className="marquee-sep">{"//"}</span>
                <span>COMING SOON</span>
                <span className="marquee-sep">{"//"}</span>
                <span>COMING SOON</span>
                <span className="marquee-sep">{"//"}</span>
                <span>COMING SOON</span>
                <span className="marquee-sep">{"//"}</span>
                <span>COMING SOON</span>
                <span className="marquee-sep">{"//"}</span>
                <span>COMING SOON</span>
                <span className="marquee-sep">{"//"}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="domains-hero-blur-overlay" aria-hidden="true" />
      </section>

      <SiteFooter />
    </main>
  );
}
