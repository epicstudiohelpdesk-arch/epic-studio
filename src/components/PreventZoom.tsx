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

    // 4. Prevent double-tap to zoom on iOS devices
    let lastTouchEnd = 0;
    const preventDoubleTap = (e: TouchEvent) => {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    };

    // 5. Disable hover effects while actively scrolling
    let scrollTimeout: NodeJS.Timeout | null = null;
    const handleScroll = () => {
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

    document.addEventListener("gesturestart", preventGesture, { passive: false });
    document.addEventListener("gesturechange", preventGesture, { passive: false });
    document.addEventListener("gestureend", preventGesture, { passive: false });
    window.addEventListener("wheel", preventWheelZoom, { passive: false });
    window.addEventListener("keydown", preventKeyZoom);
    document.addEventListener("touchend", preventDoubleTap, { passive: false });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("gesturestart", preventGesture);
      document.removeEventListener("gesturechange", preventGesture);
      document.removeEventListener("gestureend", preventGesture);
      window.removeEventListener("wheel", preventWheelZoom);
      window.removeEventListener("keydown", preventKeyZoom);
      document.removeEventListener("touchend", preventDoubleTap);
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      document.body.classList.remove("is-scrolling");
    };
  }, []);

  return null;
}
