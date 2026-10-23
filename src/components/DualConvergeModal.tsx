"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import "./dual-converge-modal.css";

export default function DualConvergeModal() {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isConverged, setIsConverged] = useState(false);
  const didTriggerRef = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const convergeTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setIsVisible(false);
    setIsConverged(false);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("doors:closed"));
      window.dispatchEvent(new CustomEvent("converge-modal:closed"));
    }
    if (convergeTimerRef.current) clearTimeout(convergeTimerRef.current);
    setTimeout(() => {
      setIsMounted(false);
      setIsClosing(false);
    }, 1120);
  }, []);

  const triggerModal = useCallback(() => {
    if (didTriggerRef.current) return;
    didTriggerRef.current = true;

    setIsClosing(false);
    setIsMounted(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsVisible(true);
        if (convergeTimerRef.current) clearTimeout(convergeTimerRef.current);
        convergeTimerRef.current = setTimeout(() => {
          setIsConverged(true);
        }, 900);
      });
    });
  }, []);

  useEffect(() => {
    // 3D doors animation triggers FIRST: 1.3s after splash finishes
    const handleSplashClosed = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        triggerModal();
      }, 1300);
    };

    window.addEventListener("splash:closed", handleSplashClosed);
    window.addEventListener("splash:dismiss", handleSplashClosed);
    window.addEventListener("open:converge-modal", triggerModal);
    (window as unknown as { openConvergeModal?: () => void }).openConvergeModal = triggerModal;

    const checkInitial = setTimeout(() => {
      const hasSplash = document.querySelector(".splash-overlay:not(.is-exiting)") !== null;
      if (!hasSplash) {
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
          triggerModal();
        }, 1300);
      }
    }, 150);

    return () => {
      window.removeEventListener("splash:closed", handleSplashClosed);
      window.removeEventListener("splash:dismiss", handleSplashClosed);
      window.removeEventListener("open:converge-modal", triggerModal);
      clearTimeout(checkInitial);
      if (timerRef.current) clearTimeout(timerRef.current);
      if (convergeTimerRef.current) clearTimeout(convergeTimerRef.current);
    };
  }, [triggerModal]);

  // Lock background scroll and hide background elements completely while active
  useEffect(() => {
    if (!isMounted) return;

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.classList.add("converge-modal-open");
    document.documentElement.classList.add("converge-modal-open");

    const blockScroll = (e: WheelEvent | TouchEvent) => {
      if (e.cancelable) {
        e.preventDefault();
      }
    };

    window.addEventListener("wheel", blockScroll, { passive: false });
    window.addEventListener("touchmove", blockScroll, { passive: false });

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.classList.remove("converge-modal-open");
      document.documentElement.classList.remove("converge-modal-open");
      window.removeEventListener("wheel", blockScroll);
      window.removeEventListener("touchmove", blockScroll);
    };
  }, [isMounted]);

  // Keyboard: Close on Escape
  useEffect(() => {
    if (!isVisible) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isVisible, handleClose]);

  if (!isMounted) return null;

  return (
    <>
      {/* Fullscreen Soft Light Backdrop */}
      <div
        className={`converge-modal-backdrop ${isVisible && !isClosing ? "is-visible" : ""} ${
          isClosing ? "is-closing" : ""
        }`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Full Page Stage covering the entire website */}
      <div
        className={`converge-modal-stage ${isConverged && !isClosing ? "is-converged" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Full Page System Architecture — EPIC STUDIO"
      >
        {/* Center Seam Docking Glow Indicator */}
        <div className="converge-seam-glow" aria-hidden="true" />

        {/* LEFT HALF (50vw × 100vh): Slides smoothly from left (-100% -> 0) */}
        <section
          className={`converge-panel-left ${isVisible && !isClosing ? "is-visible" : ""} ${
            isClosing ? "is-closing" : ""
          }`}
        >
          <div className="converge-panel-glow-left" aria-hidden="true" />

          <div className="converge-header-row">
            <div className="converge-tag">
              <span className="converge-tag-dot lime" />
              SYSTEM 01 // ARCHITECTURE
            </div>
          </div>

          <div className="converge-body-content">
            <h1 className="converge-title">
              Architecture at <br />
              Enterprise Scale.
            </h1>
            <p className="converge-desc">
              Engineering mission-critical infrastructure, resilient micro-services, and zero-compromise design systems for high-growth global platforms.
            </p>

            <div className="converge-metrics-grid">
              <div className="converge-metric-item">
                <span>Distributed Edge Core</span>
                <span className="converge-metric-num">99.999% SLA</span>
              </div>
              <div className="converge-metric-item">
                <span>Sub-Millisecond Pipeline</span>
                <span className="converge-metric-num">&lt; 0.8ms</span>
              </div>
              <div className="converge-metric-item">
                <span>Autonomous AI Orchestration</span>
                <span className="converge-metric-num">ACTIVE</span>
              </div>
            </div>
          </div>

          <div className="converge-footer-status">
            <span>EPIC CORE // NODE-A</span>
            <span>SYSTEM STATE: FULLSCREEN SYNCED</span>
          </div>
        </section>

        {/* RIGHT HALF (50vw × 100vh): Slides smoothly from right (+100% -> 0) */}
        <section
          className={`converge-panel-right ${isVisible && !isClosing ? "is-visible" : ""} ${
            isClosing ? "is-closing" : ""
          }`}
        >
          <div className="converge-panel-glow-right" aria-hidden="true" />

          {/* Sleek Close Button */}
          <button
            type="button"
            className="converge-close-btn"
            onClick={handleClose}
            aria-label="Close full page overlay"
          >
            <span>Close</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <div className="converge-header-row">
            <div className="converge-tag">
              <span className="converge-tag-dot blue" />
              SYSTEM 02 // INTERFACE
            </div>
          </div>

          <div className="converge-body-content">
            <h1 className="converge-title">
              Intuitive Kinetic <br />
              Experience.
            </h1>
            <p className="converge-desc">
              Unifying human-centered ergonomics with GPU-accelerated motion systems, crafting digital products that feel tactile, fluid, and memorable.
            </p>

            <div className="converge-metrics-grid">
              <div className="converge-metric-item">
                <span>Hardware-Accelerated UI</span>
                <span className="converge-metric-num blue">120 FPS</span>
              </div>
              <div className="converge-metric-item">
                <span>Multi-Platform Parity</span>
                <span className="converge-metric-num blue">iOS • WEB • ANDROID</span>
              </div>
              <div className="converge-metric-item">
                <span>Universal Design Tokens</span>
                <span className="converge-metric-num blue">TOKENIZED</span>
              </div>
            </div>
          </div>

          <div className="converge-footer-status">
            <span>EPIC VIEW // NODE-B</span>
            <span>CONVERGENCE: COMPLETE</span>
          </div>
        </section>
      </div>
    </>
  );
}
