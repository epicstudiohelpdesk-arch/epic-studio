"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import ContactPage from "./ContactPage";
import "./auto-contact-drawer.css";

export default function AutoContactDrawer() {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const didTriggerRef = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      setIsMounted(false);
    }, 620);
  }, []);

  const triggerDrawer = useCallback(() => {
    if (didTriggerRef.current) return;
    didTriggerRef.current = true;

    setIsMounted(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    });
  }, []);

  useEffect(() => {
    const handleSplashClosed = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        triggerDrawer();
      }, 1300);
    };

    window.addEventListener("splash:closed", handleSplashClosed);
    window.addEventListener("splash:dismiss", handleSplashClosed);
    window.addEventListener("open:contact-modal", triggerDrawer);
    (window as unknown as { openContactModal?: () => void }).openContactModal = triggerDrawer;

    const checkInitial = setTimeout(() => {
      const hasSplash = document.querySelector(".splash-overlay:not(.is-exiting)") !== null;
      if (!hasSplash) {
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
          triggerDrawer();
        }, 1300);
      }
    }, 150);

    return () => {
      window.removeEventListener("splash:closed", handleSplashClosed);
      window.removeEventListener("splash:dismiss", handleSplashClosed);
      window.removeEventListener("open:contact-modal", triggerDrawer);
      clearTimeout(checkInitial);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [triggerDrawer]);

  // Lock background scroll and hide background elements completely when drawer is active
  useEffect(() => {
    if (!isMounted) return;

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.classList.add("contact-drawer-open");
    document.documentElement.classList.add("contact-drawer-open");

    const blockScroll = (e: WheelEvent | TouchEvent) => {
      const target = e.target as HTMLElement | null;
      // Allow scrolling only inside overflowing custom dropdown menus
      if (target && target.closest(".custom-dropdown-menu")) {
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
      document.body.classList.remove("contact-drawer-open");
      document.documentElement.classList.remove("contact-drawer-open");
      window.removeEventListener("wheel", blockScroll);
      window.removeEventListener("touchmove", blockScroll);
    };
  }, [isMounted]);

  // Handle keyboard: close on Escape, prevent background scrolling keys
  useEffect(() => {
    if (!isVisible) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
        return;
      }

      // Prevent keys that scroll the page unless typing in input/textarea
      if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(e.key)) {
        const target = e.target as HTMLElement | null;
        const isEditable =
          target &&
          (target.tagName === "INPUT" ||
            target.tagName === "TEXTAREA" ||
            target.isContentEditable);

        if (!isEditable && e.cancelable) {
          e.preventDefault();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isVisible, handleClose]);

  if (!isMounted) return null;

  return (
    <>
      {/* Soft Dark & Blurry Backdrop */}
      <div
        className={`auto-contact-backdrop ${isVisible ? "is-visible" : ""}`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Horizontally centered, bottom-docked container */}
      <div className="auto-contact-wrapper">
        <div
          className={`auto-contact-sheet ${isVisible ? "is-visible" : ""}`}
          role="dialog"
          aria-modal="true"
          aria-label="Direct Consultation Brief — EPIC STUDIO"
          onClick={(e) => e.stopPropagation()}
        >
          <ContactPage onClose={handleClose} isModalView={true} />
        </div>
      </div>
    </>
  );
}
