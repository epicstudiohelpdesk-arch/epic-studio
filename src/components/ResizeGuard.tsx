"use client";

import { useEffect } from "react";

export default function ResizeGuard() {
  useEffect(() => {
    const root = document.documentElement;
    let settleTimeout: NodeJS.Timeout | null = null;

    const handleResize = () => {
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
