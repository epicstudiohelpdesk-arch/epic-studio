"use client";

import { useEffect } from "react";

/**
 * Pauses every decorative infinite animation inside any [data-anim-scope]
 * container while that container is outside the viewport (plus 120px
 * margin). SVG-path animations (stroke-dashoffset waves/flows), box-shadow
 * pulses and blur-filter orbs cannot run on the compositor, so left alone
 * they burn main-thread paint time continuously — even when scrolled far
 * out of view — starving hero act transitions of frame budget.
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

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.classList.toggle("is-offscreen", !entry.isIntersecting);
        }
      },
      { rootMargin: "120px" }
    );

    scopes.forEach((el) => {
      // Start paused until first observation confirms visibility.
      el.classList.add("is-offscreen");
      io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  return null;
}
