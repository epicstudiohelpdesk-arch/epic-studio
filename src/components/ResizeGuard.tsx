"use client";

import { useEffect } from "react";

export default function ResizeGuard() {
  useEffect(() => {
    // Mobile touch screens do not have window resize drag handles.
    // Skipping on touch devices avoids invalidating computed styles on all DOM elements (*)
    // during mobile viewport adjustments or virtual keyboard toggles.
    const isTouch =
      typeof window !== "undefined" &&
      (window.innerWidth <= 768 || window.matchMedia("(pointer: coarse)").matches);
    if (isTouch) return;

    const root = document.documentElement;
    let settleTimeout: NodeJS.Timeout | null = null;
    let lastWidth = typeof window !== "undefined" ? window.innerWidth : 0;

    const handleResize = () => {
      // Ignore mobile browser URL bar / address bar collapsing/expanding on scroll
      // (address bar show/hide only changes innerHeight, not innerWidth)
      if (typeof window !== "undefined" && window.innerWidth === lastWidth) {
        return;
      }
      if (typeof window !== "undefined") {
        lastWidth = window.innerWidth;
      }

      if (!root.classList.contains("is-resizing")) {
        root.classList.add("is-resizing");
      }
      if (settleTimeout !== null) clearTimeout(settleTimeout);
      settleTimeout = setTimeout(() => {
        root.classList.remove("is-resizing");
        settleTimeout = null;
      }, 180);
    };

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      if (settleTimeout !== null) clearTimeout(settleTimeout);
      root.classList.remove("is-resizing");
    };
  }, []);

  return null;
}
