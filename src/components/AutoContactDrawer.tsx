"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import ContactPage from "./ContactPage";
import "./auto-contact-drawer.css";

export default function AutoContactDrawer() {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const isOpenRef = useRef(false);
  const initialTriggerRef = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const periodicTimerRef = useRef<NodeJS.Timeout | null>(null);

  const triggerDrawer = useCallback(() => {
    // Strictly prevent contact drawer from appearing while Diwali modal is open/visible
    if (typeof document !== "undefined") {
      const isDiwaliOpen =
        !!document.querySelector(".converge-dropdown-page") ||
        document.body.classList.contains("converge-page-open");
      if (isDiwaliOpen) {
        return;
      }
    }

    if (isOpenRef.current) return;
    isOpenRef.current = true;

    if (timerRef.current) clearTimeout(timerRef.current);
    if (periodicTimerRef.current) clearTimeout(periodicTimerRef.current);

    setIsMounted(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    });
  }, []);

  const scheduleNextPeriodic = useCallback(
    (customDelay?: number) => {
      if (periodicTimerRef.current) clearTimeout(periodicTimerRef.current);

      // Periodic reappearance interval while browsing (default: 45 seconds)
      const defaultInterval = 45000;
      const interval =
        customDelay ??
        (typeof window !== "undefined"
          ? (window as unknown as { __CONTACT_INTERVAL__?: number }).__CONTACT_INTERVAL__ ?? defaultInterval
          : defaultInterval);

      periodicTimerRef.current = setTimeout(() => {
        const isDoorsOpen =
          typeof document !== "undefined" &&
          (!!document.querySelector(".converge-modal-stage") ||
           !!document.querySelector(".converge-dropdown-page") ||
           document.body.classList.contains("converge-page-open"));
        const isHidden =
          typeof document !== "undefined" && document.visibilityState === "hidden";

        if (!isOpenRef.current && !isDoorsOpen && !isHidden) {
          triggerDrawer();
        } else {
          // If modal is already open, doors active, or tab hidden, check again after short interval
          scheduleNextPeriodic(12000);
        }
      }, interval);
    },
    [triggerDrawer]
  );

  const handleClose = useCallback(() => {
    setIsVisible(false);
    isOpenRef.current = false;
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("contact-modal:closed"));
    }
    setTimeout(() => {
      setIsMounted(false);
      // Re-trigger the contact modal periodically after a duration of browsing
      scheduleNextPeriodic();
    }, 620);
  }, [scheduleNextPeriodic]);

  useEffect(() => {
    // Suppress and close contact modal immediately when Diwali modal opens
    const handleDiwaliModalOpened = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (periodicTimerRef.current) clearTimeout(periodicTimerRef.current);
      setIsVisible(false);
      setIsMounted(false);
      isOpenRef.current = false;
    };

    // Triggers first appearance 6-7 seconds AFTER the Diwali modal is closed
    const handleDoorsClosed = () => {
      if (typeof document !== "undefined") {
        const isDiwaliOpen =
          !!document.querySelector(".converge-dropdown-page") ||
          document.body.classList.contains("converge-page-open");
        if (isDiwaliOpen) return;
      }
      if (initialTriggerRef.current) return;
      initialTriggerRef.current = true;
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        const isDiwaliOpen =
          typeof document !== "undefined" &&
          (!!document.querySelector(".converge-dropdown-page") ||
           document.body.classList.contains("converge-page-open"));
        if (!isDiwaliOpen) {
          triggerDrawer();
        }
      }, 7000);
    };

    const handleExplicitOpen = () => {
      initialTriggerRef.current = true;
      if (timerRef.current) clearTimeout(timerRef.current);
      triggerDrawer();
    };

    window.addEventListener("converge-modal:opened", handleDiwaliModalOpened);
    window.addEventListener("converge-modal:open", handleDiwaliModalOpened);
    window.addEventListener("doors:closed", handleDoorsClosed);
    window.addEventListener("converge-modal:closed", handleDoorsClosed);
    window.addEventListener("open:contact-modal", handleExplicitOpen);
    (window as unknown as { openContactModal?: () => void }).openContactModal = handleExplicitOpen;
    (window as unknown as { scheduleContactReappear?: (ms: number) => void }).scheduleContactReappear = (ms: number) =>
      scheduleNextPeriodic(ms);

    return () => {
      window.removeEventListener("converge-modal:opened", handleDiwaliModalOpened);
      window.removeEventListener("converge-modal:open", handleDiwaliModalOpened);
      window.removeEventListener("doors:closed", handleDoorsClosed);
      window.removeEventListener("converge-modal:closed", handleDoorsClosed);
      window.removeEventListener("open:contact-modal", handleExplicitOpen);
      if (timerRef.current) clearTimeout(timerRef.current);
      if (periodicTimerRef.current) clearTimeout(periodicTimerRef.current);
    };
  }, [triggerDrawer, scheduleNextPeriodic]);

  // Tab visibility listener: resume periodic scheduling when tab becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && !isOpenRef.current && initialTriggerRef.current) {
        if (!periodicTimerRef.current) {
          scheduleNextPeriodic(30000);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [scheduleNextPeriodic]);

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
