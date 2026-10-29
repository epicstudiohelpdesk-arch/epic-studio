"use client";

import { useEffect, type RefObject } from "react";

export default function useRevealOnScroll(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const targets = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (targets.length === 0) return;

    const isMobile =
      typeof window !== "undefined" &&
      (window.innerWidth <= 1060 || window.matchMedia("(pointer: coarse)").matches);

    // On mobile devices or browsers without IntersectionObserver, reveal immediately.
    // This eliminates blank/black screen voids during fast touch scrolling flings.
    if (isMobile || !("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-inview"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-inview");
            observer.unobserve(entry.target);
          }
        });
      },
      // Preemptive 600px margin reveals content well before reaching viewport,
      // guaranteeing contents load instantly during fast scrolling.
      { threshold: 0, rootMargin: "600px 0px 600px 0px" }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ref]);
}
