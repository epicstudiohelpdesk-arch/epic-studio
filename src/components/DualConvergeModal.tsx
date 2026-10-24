"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import "./dual-converge-modal.css";

export default function DualConvergeModal() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const didTriggerRef = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setIsVisible(false);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("doors:closed"));
      window.dispatchEvent(new CustomEvent("converge-modal:closed"));
    }
    setTimeout(() => {
      setIsMounted(false);
      setIsClosing(false);
    }, 900);
  }, []);

  const handleRedirectToContact = useCallback(
    (_tab?: string) => {
      setIsClosing(true);
      setIsVisible(false);

      // Smoothly navigate to the /contact page directly (NOT the modal)
      setTimeout(() => {
        router.push("/contact");
      }, 180);

      setTimeout(() => {
        setIsMounted(false);
        setIsClosing(false);
      }, 500);
    },
    [router]
  );

  const triggerModal = useCallback(() => {
    if (didTriggerRef.current) return;
    didTriggerRef.current = true;

    setIsClosing(false);
    setIsMounted(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    });
  }, []);

  useEffect(() => {
    // Modal triggers a few seconds AFTER splash finishes (3.8s delay)
    const handleSplashClosed = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        triggerModal();
      }, 3800);
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
        }, 3800);
      }
    }, 150);

    return () => {
      window.removeEventListener("splash:closed", handleSplashClosed);
      window.removeEventListener("splash:dismiss", handleSplashClosed);
      window.removeEventListener("open:converge-modal", triggerModal);
      clearTimeout(checkInitial);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [triggerModal]);

  // Lock background scroll and hide background sidebars while active
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
      {/* Soft Ambient Backdrop (Subtle tint & gentle blur) */}
      <div
        className={`converge-modal-backdrop ${isVisible && !isClosing ? "is-visible" : ""} ${
          isClosing ? "is-closing" : ""
        }`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Right-Attached Executive Modal — Expanded Length & Height, Softer Shadow */}
      <div
        className={`converge-modal-drawer ${isVisible && !isClosing ? "is-visible" : ""} ${
          isClosing ? "is-closing" : ""
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Diwali Special Offer — EPIC STUDIO"
      >
        <div className="converge-modal-art">
          <img
            src="/diwali.png"
            alt="EPIC STUDIO — Diwali Special Offer"
            className="converge-modal-img"
            draggable={false}
          />

          {/* Redesigned Floating Circular Close Button */}
          <button
            type="button"
            className="converge-close-btn"
            onClick={handleClose}
            aria-label="Close Diwali Special Offer modal"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Pure Soft Feathered Bottom Overlay (NO HARD EDGES) */}
          <div className="converge-modal-bottom-overlay" aria-hidden="true" />

          {/* Executive Bottom Action Bar */}
          <div className="converge-modal-bottom-bar">
            <div className="converge-offer-badge">
              <div className="converge-diya-badge" aria-label="Diwali Diya" role="img">
                <svg className="converge-diya-svg" width="26" height="26" viewBox="0 0 32 32" fill="none">
                  <defs>
                    <linearGradient id="flameInner" x1="16" y1="3" x2="16" y2="15" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="35%" stopColor="#fef08a" />
                      <stop offset="100%" stopColor="#f59e0b" />
                    </linearGradient>
                    <linearGradient id="flameOuter" x1="16" y1="1" x2="16" y2="16" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#fef08a" />
                      <stop offset="35%" stopColor="#f97316" />
                      <stop offset="100%" stopColor="#dc2626" />
                    </linearGradient>
                    <linearGradient id="diyaBowl" x1="5" y1="15" x2="27" y2="27" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#ffe066" />
                      <stop offset="35%" stopColor="#f59e0b" />
                      <stop offset="80%" stopColor="#d97706" />
                      <stop offset="100%" stopColor="#92400e" />
                    </linearGradient>
                  </defs>
                  {/* Diya Stand / Base */}
                  <ellipse cx="16" cy="25" rx="5" ry="1.8" fill="#78350f" opacity="0.9" />
                  {/* Diya Clay / Brass Bowl */}
                  <path
                    d="M5 16.5 C6.5 24, 25.5 24, 27 16.5 C25.5 15.2, 23 15, 21.5 15.5 C18 16.6, 14 16.6, 10.5 15.5 C9 15, 6.5 15.2, 5 16.5 Z"
                    fill="url(#diyaBowl)"
                  />
                  {/* Diya Rim Highlight */}
                  <path
                    d="M6 16.8 C9 18.2, 23 18.2, 26 16.8"
                    stroke="#fef08a"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    opacity="0.85"
                  />
                  {/* Outer Glowing Flame */}
                  <path
                    d="M16 2 C17.8 5.2, 20.8 8.5, 20.8 12.2 C20.8 15.2, 18.8 16.8, 16 16.8 C13.2 16.8, 11.2 15.2, 11.2 12.2 C11.2 8.5, 14.2 5.2, 16 2 Z"
                    fill="url(#flameOuter)"
                  />
                  {/* Inner Flame Core */}
                  <path
                    d="M16 5.5 C17 7.5, 18.5 9.8, 18.5 12.2 C18.5 14, 17.3 15.2, 16 15.2 C14.7 15.2, 13.5 14, 13.5 12.2 C13.5 9.8, 15 7.5, 16 5.5 Z"
                    fill="url(#flameInner)"
                  />
                </svg>
              </div>
              <div>
                <div className="converge-badge-primary">Festive Partnership Benefit • 50% Off</div>
                <div className="converge-badge-secondary">Limited availability for upcoming project engagements</div>
              </div>
            </div>

            <div className="converge-modal-actions">
              <button
                type="button"
                className="converge-btn-secondary"
                onClick={() => handleRedirectToContact("call")}
                aria-label="Schedule a consultation on our contact page"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span>Schedule Consultation</span>
              </button>

              <button
                type="button"
                className="converge-btn-primary"
                onClick={() => handleRedirectToContact("inquiry")}
                aria-label="Claim Diwali Special Offer on our contact page"
              >
                <span>Claim Offer & Contact</span>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
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
      </div>
    </>
  );
}
