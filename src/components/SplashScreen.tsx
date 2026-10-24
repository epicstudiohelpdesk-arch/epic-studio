"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import "./splash.css";

const AUTO_DISMISS_MS = 2200;
const EXIT_DURATION_MS = 800;

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const hasStartedExit = useRef(false);
  const exitTimer = useRef<number | null>(null);

  const dismissSplash = useCallback(() => {
    if (hasStartedExit.current) return;

    hasStartedExit.current = true;
    setIsExiting(true);

    if (typeof document !== "undefined") {
      document.documentElement.removeAttribute("data-splash-active");
      document.body.classList.remove("splash-active");
    }
    if (typeof window !== "undefined") {
      (window as unknown as { __SPLASH_ACTIVE__?: boolean }).__SPLASH_ACTIVE__ = false;
      window.dispatchEvent(new CustomEvent("splash:dismiss"));
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    exitTimer.current = window.setTimeout(
      () => {
        setIsVisible(false);
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("splash:closed"));
        }
      },
      reducedMotion ? 0 : EXIT_DURATION_MS,
    );
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-splash-active", "true");
      document.body.classList.add("splash-active");
    }
    if (typeof window !== "undefined") {
      (window as unknown as { __SPLASH_ACTIVE__?: boolean }).__SPLASH_ACTIVE__ = true;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
      if (typeof document !== "undefined") {
        document.documentElement.removeAttribute("data-splash-active");
        document.body.classList.remove("splash-active");
      }
      if (typeof window !== "undefined") {
        (window as unknown as { __SPLASH_ACTIVE__?: boolean }).__SPLASH_ACTIVE__ = false;
      }
      if (exitTimer.current !== null) window.clearTimeout(exitTimer.current);
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible || isExiting) return;

    const autoDismissTimer = window.setTimeout(dismissSplash, AUTO_DISMISS_MS);
    return () => window.clearTimeout(autoDismissTimer);
  }, [dismissSplash, isExiting, isVisible]);

  useEffect(() => {
    if (!isVisible || isExiting) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        dismissSplash();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dismissSplash, isExiting, isVisible]);

  const rafId = useRef<number | null>(null);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    const clientX = event.clientX;
    const clientY = event.clientY;

    if (rafId.current !== null) return;

    rafId.current = window.requestAnimationFrame(() => {
      const x = (clientX / window.innerWidth - 0.5) * 2;
      const y = (clientY / window.innerHeight - 0.5) * 2;
      target.style.setProperty("--pointer-x", `${x * 14}px`);
      target.style.setProperty("--pointer-y", `${y * 14}px`);
      rafId.current = null;
    });
  };

  useEffect(() => {
    return () => {
      if (rafId.current !== null) window.cancelAnimationFrame(rafId.current);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`splash-overlay${isExiting ? " is-exiting" : ""}`}
      onPointerMove={handlePointerMove}
      onClick={dismissSplash}
      role="dialog"
      aria-modal="true"
      aria-label="EPIC STUDIO portfolio introduction"
    >
      <div className="splash-curtain splash-curtain-left" aria-hidden="true" />
      <div className="splash-curtain splash-curtain-right" aria-hidden="true" />

      <div className="splash-content">
        <span className="splash-sr-only">Press Escape, Enter, or Space to continue.</span>

        <span className="splash-corner splash-corner-tl">AI Automation</span>
        <span className="splash-corner splash-corner-tr">Design</span>
        <span className="splash-corner splash-corner-bl">Business Analytics</span>
        <span className="splash-corner splash-corner-br">Creative Tech</span>

        <main className="splash-center">
          <div className="splash-title" aria-label="Epic Studio — Creative Agency">
            <span className="splash-word-epic" aria-hidden="true">Epic&nbsp;</span>
            <div className="splash-studio-col">
              <span className="splash-word-studio" aria-hidden="true">Studio</span>
              <p className="splash-subtitle">Creative Agency</p>
            </div>
          </div>
        </main>

        <div className="splash-art" aria-hidden="true">
          <span className="splash-float-badge splash-badge-ps">
            <svg viewBox="0 0 100 100" className="splash-icon-svg">
              <rect x="8" y="8" width="84" height="84" rx="8" fill="#001d34" stroke="#00a8e8" strokeWidth="7" />
              <text x="50" y="68" textAnchor="middle" fill="#00a8e8" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="45">Ps</text>
            </svg>
          </span>

          <span className="splash-float-badge splash-badge-html">
            <svg viewBox="0 0 100 100" className="splash-icon-svg">
              <path fill="#e44d26" d="M12 8h76l-7 75-31 9-31-9z" />
              <path fill="#f16529" d="M50 15h29l-6 62-23 7z" />
              <path fill="#fff" d="M27 27h46l-2 10H39l1 9h29l-3 28-16 5-17-5-1-14h10l1 7 7 2 7-2 1-11H33z" />
            </svg>
          </span>

          <span className="splash-float-badge splash-badge-python">
            <svg viewBox="0 0 100 100" className="splash-icon-svg">
              <path d="M49.6,8 C27.5,8 29,17.6 29,17.6 L29.1,27.5 L50.2,27.5 L50.2,30.6 L18.6,30.6 C18.6,30.6 8,29.3 8,51.4 C8,73.5 17.3,72.2 17.3,72.2 L23.5,72.2 L23.5,63.5 C23.5,63.5 23.1,53.2 33.6,53.2 L54.7,53.2 C54.7,53.2 64.6,53.6 64.6,44 L64.6,18.8 C64.6,18.8 66.2,8 49.6,8 Z M37.8,14.6 C40.4,14.6 42.5,16.7 42.5,19.3 C42.5,21.9 40.4,24 37.8,24 C35.2,24 33.1,21.9 33.1,19.3 C33.1,16.7 35.2,14.6 37.8,14.6 Z" fill="#0877b9" />
              <path d="M50.4,92 C72.5,92 71,82.4 71,82.4 L70.9,72.5 L49.8,72.5 L49.8,69.4 L81.4,69.4 C81.4,69.4 92,70.7 92,48.6 C92,26.5 82.7,27.8 82.7,27.8 L76.5,27.8 L76.5,36.5 C76.5,36.5 76.9,46.8 66.4,46.8 L45.3,46.8 C45.3,46.8 35.4,46.4 35.4,56 L35.4,81.2 C35.4,81.2 33.8,92 50.4,92 Z M62.2,85.4 C59.6,85.4 57.5,83.3 57.5,80.7 C57.5,78.1 59.6,76 62.2,76 C64.8,76 66.9,78.1 66.9,80.7 C66.9,83.3 64.8,85.4 62.2,85.4 Z" fill="#ffd43b" />
            </svg>
          </span>

          <span className="splash-float-badge splash-badge-pr">
            <svg viewBox="0 0 100 100" className="splash-icon-svg">
              <rect x="8" y="8" width="84" height="84" rx="8" fill="#1b002c" stroke="#d633e8" strokeWidth="7" />
              <text x="50" y="68" textAnchor="middle" fill="#e344f0" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="45">Pr</text>
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}
