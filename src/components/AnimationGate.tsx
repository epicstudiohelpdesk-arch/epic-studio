"use client";

import { useEffect } from "react";

/**
 * Pauses heavy decorative infinite SVG/canvas animations inside [data-anim-scope]
 * when scrolled far outside the viewport (> 600px buffer).
 * Generous buffer ensures animations are already running smoothly before entering view.
 */
export default function AnimationGate() {
  useEffect(() => {
    const scopes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-anim-scope]")
    );
    if (scopes.length === 0) return;

    if (typeof IntersectionObserver === "undefined") {
      return;
    }

    const isMobile =
      typeof window !== "undefined" &&
      (window.innerWidth <= 860 || window.matchMedia("(pointer: coarse)").matches);

    const rootMargin = isMobile ? "150px 0px 150px 0px" : "350px 0px 350px 0px";

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.classList.toggle("is-offscreen", !entry.isIntersecting);
        }
      },
      { rootMargin }
    );

    scopes.forEach((el) => {
      io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  return null;
}
