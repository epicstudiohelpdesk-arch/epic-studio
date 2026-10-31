"use client";

import React from "react";
import "./diwali-poster.css";

interface DiwaliPosterProps {
  onClaim: () => void;
}

export default function DiwaliPoster({ onClaim }: DiwaliPosterProps) {
  return (
    <div className="journal-poster-root">
      {/* =========================================================================
          1. ARTWORK LAYER: 03 JOURNAL (SLIGHTLY SHIFTED TO THE LEFT)
          ========================================================================= */}
      <div className="journal-art-layer" aria-hidden="true">
        <img
          src="/editorial-journal@2x.jpg"
          alt="While You're Building Your Business... — Epic Studio Editorial"
          className="journal-art-img"
          draggable={false}
        />
      </div>

      {/* =========================================================================
          2. ARCHITECTURAL GRID OVERLAY (OVERLAYS THE IMAGE)
          ========================================================================= */}
      <div className="journal-grid-overlay" aria-hidden="true" />
      <span className="journal-grid-crosshair journal-crosshair-tl" aria-hidden="true">+</span>
      <span className="journal-grid-crosshair journal-crosshair-tr" aria-hidden="true">+</span>
      <span className="journal-grid-crosshair journal-crosshair-bl" aria-hidden="true">+</span>
      <span className="journal-grid-crosshair journal-crosshair-br" aria-hidden="true">+</span>

      {/* =========================================================================
          3. TOP-LEFT BRANDING BLOCK
          ========================================================================= */}
      <div className="journal-header-block">
        <h2 className="journal-brand-title">Epic Studio</h2>
        <p className="journal-brand-subtitle">A Brand add value to a Brand</p>
      </div>

      {/* =========================================================================
          4. RIGHT PORTION: LARGE STYLED 50% OFFER & DIWALI SPECIAL TEXTUALS
          ========================================================================= */}
      <div className="journal-offer-right">
        <span className="journal-offer-upto">UP TO</span>

        <div className="journal-offer-num-row">
          <span className="journal-offer-large-50">50%</span>
          <span className="journal-offer-off-tag">OFF</span>
        </div>

        {/* DIWALI SPECIAL positioned directly below the large 50% textual */}
        <div className="journal-diwali-special-text">
          DIWALI SPECIAL
        </div>

        <div className="journal-offer-divider" />

        <p className="journal-offer-desc">
          Websites, Mobile Apps &amp; High-Growth Digital Systems.
        </p>
      </div>

      {/* =========================================================================
          5. BOTTOM FOOTER BAR (HANDLE ON LEFT, CLAIM OFFER ON BOTTOM RIGHT)
          ========================================================================= */}
      <div className="journal-footer-bar">
        {/* Bottom Left Handle */}
        <div className="journal-handle-block">
          <span className="journal-handle-text">@epicstudio.in</span>
          <span className="journal-handle-sub">DESIGN · DEVELOP · SCALE</span>
        </div>

        {/* Bottom Right Claim Offer CTA Button */}
        <div className="journal-footer-action">
          <button
            type="button"
            className="journal-bottom-claim-btn"
            onClick={onClaim}
            aria-label="Claim Festive 50% Offer and Contact Us"
          >
            <span>Claim Offer</span>
            <svg
              className="journal-claim-arrow"
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
