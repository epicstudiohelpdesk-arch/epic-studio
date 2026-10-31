"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import DiwaliPoster from "./DiwaliPoster";
import "./dual-converge-modal.css";

export default function DualConvergeModal() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const didAutoTriggerRef = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Smooth closing animation (slides back out to the left)
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

  const togglePage = useCallback(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) return;
    if (isMounted && isVisible && !isClosing) {
      handleClose();
    } else {
      openPage();
    }
  }, [isMounted, isVisible, isClosing, handleClose, openPage]);

  const autoTrigger = useCallback(() => {
    if (didAutoTriggerRef.current) return;
    if (typeof window !== "undefined" && window.innerWidth < 768) return;
    didAutoTriggerRef.current = true;
    openPage();
  }, [openPage]);

  useEffect(() => {
    // Diwali modal glides in from the left side to the right position after splash screen finishes
    const handleSplashClosed = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        autoTrigger();
      }, 3500);
    };

    const handleLanternTrigger = () => {
      togglePage();
    };

    window.addEventListener("splash:closed", handleSplashClosed);
    window.addEventListener("splash:dismiss", handleSplashClosed);
    window.addEventListener("open:converge-modal", handleLanternTrigger);
    window.addEventListener("toggle:converge-modal", handleLanternTrigger);
    (window as unknown as { openConvergeModal?: () => void }).openConvergeModal = openPage;
    (window as unknown as { toggleConvergeModal?: () => void }).toggleConvergeModal = togglePage;

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
      window.removeEventListener("open:converge-modal", handleLanternTrigger);
      window.removeEventListener("toggle:converge-modal", handleLanternTrigger);
      clearTimeout(checkInitial);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [autoTrigger, togglePage]);

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

      {/* Festive Diwali Modal Covering Full Left Side to the Middle of the Screen */}
      <div
        className={`converge-dropdown-page ${isVisible && !isClosing ? "is-visible" : ""} ${
          isClosing ? "is-closing" : ""
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="EPIC STUDIO Festival Special Page"
      >
        {/* Scalable, Lightweight, Clean Light-Themed CSS Vector Poster */}
        <DiwaliPoster onClaim={handleRedirectToContact} />

        {/* Sleek Golden Close Button */}
        <button
          type="button"
          className="converge-close-btn"
          onClick={handleClose}
          aria-label="Close Diwali offer modal"
          title="Close modal"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </>
  );
}
