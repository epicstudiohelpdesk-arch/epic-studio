"use client";

import { useEffect } from "react";

export default function DynamicFavicon() {
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const updateFavicon = (isDark: boolean) => {
      const targetHref = isDark ? "/favicon.ico" : "/favicon_light.png";
      const targetType = isDark ? "image/x-icon" : "image/png";

      const iconLinks = document.querySelectorAll<HTMLLinkElement>(
        "link[rel='icon'], link[rel='shortcut icon']"
      );

      if (iconLinks.length > 0) {
        iconLinks.forEach((link) => {
          link.href = targetHref;
          if (targetType) {
            link.type = targetType;
          }
        });
      }
    };

    // Apply initial state based on current preference
    updateFavicon(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      updateFavicon(e.matches);
    };

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleChange);
      return () => {
        mediaQuery.removeEventListener("change", handleChange);
      };
    }
  }, []);

  return null;
}
