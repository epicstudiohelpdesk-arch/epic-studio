"use client";

import { useEffect } from "react";

export default function PreventZoom() {
  useEffect(() => {
    // 1. Prevent Safari gesture pinch-to-zoom (iOS & macOS trackpads)
    const preventGesture = (e: Event) => {
      e.preventDefault();
    };

    // 2. Prevent Ctrl/Cmd + Mouse Wheel / Trackpad pinch zoom
    const preventWheelZoom = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
      }
    };

    // 3. Prevent Ctrl/Cmd + (+, -, =, 0) Keyboard zoom shortcuts
    const preventKeyZoom = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === "+" || e.key === "-" || e.key === "=" || e.key === "_" || e.key === "0")
      ) {
        e.preventDefault();
      }
    };

    // 4. Prevent double-tap to zoom on iOS devices (while preserving native button/input clicks)
    let lastTouchEnd = 0;
    const preventDoubleTap = (e: TouchEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        target.closest(
          "button, a, input, textarea, select, [role='button'], [role='tab'], [tabindex], .mobile-nav-toggle, .mobile-sub-link"
        )
      ) {
        return;
      }
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    };

    // 5. Disable hover effects while actively scrolling (Desktop with mouse only)
    let scrollTimeout: NodeJS.Timeout | null = null;
    const isTouchDevice =
      typeof window !== "undefined" &&
      (window.innerWidth <= 768 || window.matchMedia("(pointer: coarse)").matches);

    const handleScroll = () => {
      // Skip on mobile touch screens to prevent style recalibration thrashing during touch flings
      if (isTouchDevice) return;
      if (!document.body.classList.contains("is-scrolling")) {
        document.body.classList.add("is-scrolling");
      }
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      scrollTimeout = setTimeout(() => {
        document.body.classList.remove("is-scrolling");
        scrollTimeout = null;
      }, 140);
    };

    window.addEventListener("wheel", preventWheelZoom, { passive: false });
    window.addEventListener("keydown", preventKeyZoom);

    // Passive touchstart listener enables immediate CSS :active states on iOS Safari
    const enableIOSActiveStates = () => {};
    document.addEventListener("touchstart", enableIOSActiveStates, { passive: true });

    // On touch devices, native CSS `touch-action: pan-y manipulation` handles tap response
    // and double-tap zoom prevention directly on the GPU compositor thread with 0ms delay.
    // Non-passive gesture and touchend listeners on document must NOT be attached on mobile
    // because they force the browser to stall touch flings waiting for JavaScript execution.
    if (!isTouchDevice) {
      document.addEventListener("gesturestart", preventGesture, { passive: false });
      document.addEventListener("gesturechange", preventGesture, { passive: false });
      document.addEventListener("gestureend", preventGesture, { passive: false });
      window.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => {
      window.removeEventListener("wheel", preventWheelZoom);
      window.removeEventListener("keydown", preventKeyZoom);
      document.removeEventListener("touchstart", enableIOSActiveStates);
      if (!isTouchDevice) {
        document.removeEventListener("gesturestart", preventGesture);
        document.removeEventListener("gesturechange", preventGesture);
        document.removeEventListener("gestureend", preventGesture);
        window.removeEventListener("scroll", handleScroll);
      }
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      document.body.classList.remove("is-scrolling");
    };
  }, []);

  return null;
}
