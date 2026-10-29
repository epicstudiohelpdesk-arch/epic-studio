"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import ModalPullRope from "./ModalPullRope";
import "./dual-converge-modal.css";

export default function DualConvergeModal() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const didAutoTriggerRef = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Smooth upward closing animation (slides back up into the ceiling)
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
    }, 950);
  }, []);

  const handleRedirectToContact = useCallback(
    () => {
      setIsClosing(true);
      setIsVisible(false);

      setTimeout(() => {
        router.push("/contact");
      }, 180);

      setTimeout(() => {
        setIsMounted(false);
        setIsClosing(false);
      }, 950);
    },
    [router]
  );

  const openPage = useCallback(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) return;
    setIsClosing(false);
    setIsMounted(true);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("converge-modal:opened"));
      window.dispatchEvent(new CustomEvent("converge-modal:open"));
    }
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    });
  }, []);

  const autoTrigger = useCallback(() => {
    if (didAutoTriggerRef.current) return;
    if (typeof window !== "undefined" && window.innerWidth < 768) return;
    didAutoTriggerRef.current = true;
    openPage();
  }, [openPage]);

  useEffect(() => {
    // Drop-down page glides in from the top after splash screen finishes
    const handleSplashClosed = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        autoTrigger();
      }, 3500);
    };

    window.addEventListener("splash:closed", handleSplashClosed);
    window.addEventListener("splash:dismiss", handleSplashClosed);
    window.addEventListener("open:converge-modal", openPage);
    (window as unknown as { openConvergeModal?: () => void }).openConvergeModal = openPage;

    const checkInitial = setTimeout(() => {
      const hasSplash = document.querySelector(".splash-overlay:not(.is-exiting)") !== null;
      if (!hasSplash) {
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
          autoTrigger();
        }, 3500);
      }
    }, 150);

    return () => {
      window.removeEventListener("splash:closed", handleSplashClosed);
      window.removeEventListener("splash:dismiss", handleSplashClosed);
      window.removeEventListener("open:converge-modal", openPage);
      clearTimeout(checkInitial);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [autoTrigger, openPage]);

  // Lock background scroll while drop-down page is active
  useEffect(() => {
    if (!isMounted) return;

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.classList.add("converge-page-open");
    document.documentElement.classList.add("converge-page-open");

    const blockScroll = (e: WheelEvent | TouchEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest(".converge-dropdown-page")) {
        return;
      }
      if (e.cancelable) {
        e.preventDefault();
      }
    };

    window.addEventListener("wheel", blockScroll, { passive: false });
    window.addEventListener("touchmove", blockScroll, { passive: false });

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.classList.remove("converge-page-open");
      document.documentElement.classList.remove("converge-page-open");
      window.removeEventListener("wheel", blockScroll);
      window.removeEventListener("touchmove", blockScroll);
    };
  }, [isMounted]);

  // Close on Escape key
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
      {/* Ambient Backdrop under bottom rounded corners */}
      <div
        className={`converge-backdrop ${isVisible && !isClosing ? "is-visible" : ""} ${
          isClosing ? "is-closing" : ""
        }`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Drop-Down Page Moving in from Top to Bottom with Rounded Bottom Corners */}
      <div
        className={`converge-dropdown-page ${isVisible && !isClosing ? "is-visible" : ""} ${
          isClosing ? "is-closing" : ""
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="EPIC STUDIO Festival Special Page"
      >
        {/* The Image contained directly inside the page itself, covering the entire modal area */}
        <div className="converge-page-img-wrap">
          <img
            src="/diwali.png"
            alt="EPIC STUDIO — Diwali Festival Special Offer"
            className="converge-page-img"
            draggable={false}
          />
        </div>

        {/* Short Pull Rope System attached at the bottom rim of the modal (20px gap from corner) */}
        <ModalPullRope
          onPullClose={handleClose}
          isModalVisible={isVisible && !isClosing}
        />

        {/* Bottom Content Bar (Action CTA) */}
        <div className="converge-bottom-bar">
          <button
            type="button"
            className="converge-cta-primary"
            onClick={() => handleRedirectToContact()}
            aria-label="Claim Diwali Special Offer on our contact page"
          >
            <span className="converge-cta-sparkle" aria-hidden="true">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
              </svg>
            </span>
            <span className="converge-cta-text">Claim Offer & Contact</span>
            <svg
              className="converge-cta-arrow"
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
    </>
  );
}
