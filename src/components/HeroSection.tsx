"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Header from "@/components/Header";
import LineSidebar from "@/components/LineSidebar";
import DiwaliFireworks from "@/components/DiwaliFireworks";
import HeroDiyaDuo from "@/components/HeroDiyaDuo";

const stats = [
  ["500", "+", "Happy client"],
  ["125", "+", "Project done"],
  ["450", "+", "Winning awards"],
];

const marqueeItems = [
  "Branding",
  "Graphic design",
  "Web design",
  "Digital marketing",
  "Creative strategy",
];

// Stable reference so the memoized LineSidebar never re-renders needlessly
const SIDEBAR_ITEMS = ["Overview", "Strategy", "Creative", "Growth"];

export default function HeroSection() {
  // Flag to toggle automatic acts rotation loop (true: rotating through all acts, false: pinned)
  const ENABLE_ACTS_LOOP = true;

  // Animation states: 'phone-entering' | 'phone-active' | 'phone-sinking' | 'jumping' | 'spread' | 'cards-sinking' | 'center-active' | 'center-sinking' | 'initial' | 'sinking'
  // Act 1: Mobile Apps -> Act 2: Website Design -> Act 3: Social Media Management -> Act 4: Creative Agency -> Loop
  const [animState, setAnimState] = useState<
    | "initial"
    | "sinking"
    | "jumping"
    | "spread"
    | "cards-sinking"
    | "phone-entering"
    | "phone-active"
    | "phone-sinking"
    | "center-active"
    | "center-sinking"
    | "resetting"
  >("phone-entering");

  // Immediate preloading & background GPU decode of all hero acts assets to eliminate lagging and late loading
  useEffect(() => {
    const heroAssets = [
      "/assets/mid.webp",
      "/assets/orange-screen.webp",
      "/assets/ios-logo-clean.webp",
      "/assets/android-logo-clean.webp",
      "/assets/3rdmockup.webp",
      "/assets/2ndmockup.webp",
      "/assets/pets.webp",
      "/assets/facebookmock.webp",
      "/assets/keyboard-asset.webp",
      "/assets/person.webp",
      "/assets/phone.png",
    ];

    heroAssets.forEach((src) => {
      const img = new Image();
      img.src = src;
      if ("decode" in img) {
        img.decode().catch(() => {});
      }
    });
  }, []);

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // Pause purely decorative infinite animations while the hero is offscreen
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => el.classList.toggle("is-offscreen", !entry.isIntersecting),
      { rootMargin: "120px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    // Apply act flips on a frame boundary: a raw setTimeout callback can land
    // mid-frame, so the style recalc collides with the frame deadline and the
    // entry/exit transition stutters right at its first frames.
    const go = (state: Parameters<typeof setAnimState>[0]) => {
      requestAnimationFrame(() => setAnimState(state));
    };

    if (!ENABLE_ACTS_LOOP) {
      go("initial");
      return;
    }

    let activeTimers: NodeJS.Timeout[] = [];

    const clearAllTimers = () => {
      activeTimers.forEach(clearTimeout);
      activeTimers = [];
    };

    const runAnimationLoop = (isInitial = false) => {
      clearAllTimers();

      const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

      if (isInitial) {
        // Micro-delay on first page mount to trigger full rising entrance animation from bottom
        activeTimers.push(
          setTimeout(() => {
            go("phone-active");
          }, 160)
        );
      } else {
        // Direct transition when looping back
        go("phone-active");
      }

      // 1. Mobile Apps sinks down
      activeTimers.push(
        setTimeout(() => {
          go("phone-sinking");
        }, isInitial ? 3900 : 3750)
      );

      if (isMobile) {
        // Mobile Sequence: Mobile Apps -> Creative Agency -> Website Design -> Social Media Management -> Loop
        // 2. Act 2 (Mobile): CREATIVE AGENCY (Person + Creative Agency Headline)
        activeTimers.push(
          setTimeout(() => {
            go("initial");
          }, isInitial ? 4400 : 4250)
        );

        activeTimers.push(
          setTimeout(() => {
            go("sinking");
          }, isInitial ? 8100 : 7950)
        );

        // 3. Act 3 (Mobile): WEBSITE DESIGN (Triple Browser Mockups)
        activeTimers.push(
          setTimeout(() => {
            go("spread");
          }, isInitial ? 8600 : 8450)
        );

        activeTimers.push(
          setTimeout(() => {
            go("cards-sinking");
          }, isInitial ? 12800 : 12650)
        );

        // 4. Act 4 (Mobile): SOCIAL MEDIA MANAGEMENT (3D Phone Man Asset)
        activeTimers.push(
          setTimeout(() => {
            go("center-active");
          }, isInitial ? 13300 : 13150)
        );

        activeTimers.push(
          setTimeout(() => {
            go("center-sinking");
          }, isInitial ? 17000 : 16850)
        );

        // 5. Restart Loop back to Act 1 (MOBILE APPS)
        activeTimers.push(
          setTimeout(() => {
            runAnimationLoop(false);
          }, isInitial ? 17500 : 17350)
        );
      } else {
        // Desktop Sequence: Mobile Apps -> Website Design -> Social Media Management -> Creative Agency -> Loop
        // 2. Act 2: WEBSITE DESIGN (Triple Browser Mockups + WEBSITE DESIGN Typography)
        activeTimers.push(
          setTimeout(() => {
            go("spread");
          }, isInitial ? 4400 : 4250)
        );

        activeTimers.push(
          setTimeout(() => {
            go("cards-sinking");
          }, isInitial ? 8600 : 8450)
        );

        // 3. Act 3: SOCIAL MEDIA MANAGEMENT (3D Phone Man Asset + SOCIAL MEDIA MANAGEMENT Typography)
        activeTimers.push(
          setTimeout(() => {
            go("center-active");
          }, isInitial ? 9100 : 8950)
        );

        // Social Media Management sinks down
        activeTimers.push(
          setTimeout(() => {
            go("center-sinking");
          }, isInitial ? 12800 : 12650)
        );

        // 4. Act 4: CREATIVE AGENCY (Person with Camera + CREATIVE AGENCY Headline)
        activeTimers.push(
          setTimeout(() => {
            go("initial");
          }, isInitial ? 13300 : 13150)
        );

        activeTimers.push(
          setTimeout(() => {
            go("sinking");
          }, isInitial ? 17000 : 16850)
        );

        // 5. Restart Loop back to Act 1 (MOBILE APPS)
        activeTimers.push(
          setTimeout(() => {
            runAnimationLoop(false);
          }, isInitial ? 17500 : 17350)
        );
      }
    };

    const isSplashActive = () => {
      if (typeof window === "undefined") return false;
      return (
        document.documentElement.getAttribute("data-splash-active") === "true" ||
        document.body.classList.contains("splash-active") ||
        (window as unknown as { __SPLASH_ACTIVE__?: boolean }).__SPLASH_ACTIVE__ === true ||
        document.querySelector(".splash-overlay:not(.is-exiting)") !== null
      );
    };

    let splashListenerAttached = false;
    const startLoopOnSplashDismiss = () => {
      splashListenerAttached = false;
      runAnimationLoop(true);
    };

    if (isSplashActive()) {
      splashListenerAttached = true;
      window.addEventListener("splash:dismiss", startLoopOnSplashDismiss, { once: true });
      window.addEventListener("splash:closed", startLoopOnSplashDismiss, { once: true });
    } else {
      runAnimationLoop(true);
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearAllTimers();
      } else if (!isSplashActive()) {
        runAnimationLoop(true);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearAllTimers();
      if (splashListenerAttached) {
        window.removeEventListener("splash:dismiss", startLoopOnSplashDismiss);
        window.removeEventListener("splash:closed", startLoopOnSplashDismiss);
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [ENABLE_ACTS_LOOP]);

  const isPersonHidden =
    animState === "sinking" ||
    animState === "jumping" ||
    animState === "spread" ||
    animState === "cards-sinking" ||
    animState === "phone-entering" ||
    animState === "phone-active" ||
    animState === "phone-sinking" ||
    animState === "center-active" ||
    animState === "center-sinking";

  const isWebsiteVisible = animState === "jumping" || animState === "spread";
  const isWebsiteSinking = animState === "cards-sinking";

  const isPhoneEntering = animState === "phone-entering";
  const isPhoneVisible = animState === "phone-active";
  const isPhoneSinking = animState === "phone-sinking";

  const isCenterVisible = animState === "center-active";
  const isCenterSinking = animState === "center-sinking";

  const isAgencyVisible = animState === "initial";
  const isAgencySinking = animState === "sinking";

  // Static subtrees: rendered once, skipped by React on every act flip
  const statsGrid = useMemo(
    () => (
      <div className="hero-stats">
        {stats.map(([value, sign, label]) => (
          <div className="stat" key={label}>
            <strong>
              {value}
              <span aria-hidden="true">{sign}</span>
            </strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
    ),
    []
  );

  const marquee = useMemo(
    () => (
      <div className="marquee-strip" aria-label="Creative services">
        <div className="marquee-track">
          {[0, 1, 2].map((copy) =>
            marqueeItems.map((item, index) => (
              <span
                className="marquee-item"
                key={`${copy}-${item}`}
                aria-hidden={copy > 0}
              >
                {item}
                {index < marqueeItems.length - 1 && <i />}
              </span>
            ))
          )}
        </div>
      </div>
    ),
    []
  );

  return (
    <div className="hero-master-wrapper" ref={wrapperRef}>
      <div className={`hero-wrap anim-${animState}`}>
        <section className="hero-section" aria-labelledby="hero-title">
          <Header />

          <div className="hero-grid">
            <aside className={`hero-social ${isWebsiteVisible ? "hero-social-website-visible" : ""} ${isWebsiteSinking ? "cards-sinking" : ""}`} aria-label="Client proof">
              <div className="avatar-stack" aria-hidden="true">
                <span>
                  <img src="/assets/avatar-1.jpg" alt="EPIC STUDIO satisfied enterprise client avatar" decoding="async" />
                </span>
                <span>
                  <img src="/assets/avatar-2.jpg" alt="EPIC STUDIO corporate client review avatar" decoding="async" />
                </span>
                <span>
                  <img src="/assets/avatar-3.jpg" alt="EPIC STUDIO partner agency avatar" decoding="async" />
                </span>
              </div>
              <p>
                Senior
                <br />
                engineers,
                <br />
                designers &amp;
                <br />
                AI builders.
              </p>
              <div className="hero-social-stats" aria-label="Key metrics">
                <div className="social-stat-item">
                  <strong className="stat-value">
                    500<span className="stat-plus">+</span>
                  </strong>
                  <span className="stat-label">Happy clients</span>
                  <div className="stat-underline" aria-hidden="true" />
                </div>
                <div className="social-stat-item">
                  <strong className="stat-value">
                    125<span className="stat-plus">+</span>
                  </strong>
                  <span className="stat-label">Projects shipped</span>
                  <div className="stat-underline" aria-hidden="true" />
                </div>
                <div className="social-stat-item">
                  <strong className="stat-value">
                    450<span className="stat-plus">+</span>
                  </strong>
                  <span className="stat-label">Awards won</span>
                </div>
              </div>
            </aside>

            <div className="hero-copy">
              <svg
                className="hero-dark-star"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M 50 0 Q 50 50 100 50 Q 50 50 50 100 Q 50 50 0 50 Q 50 50 50 0 Z"
                  fill="#000000"
                />
              </svg>
              <h1 id="hero-title" className={isPersonHidden ? "headline-sunk" : ""}>
                <span className="hero-creative-eyebrow">Senior-only technology &amp; design studio</span>
                <span className="hero-title-creative">Creative</span>
                <span className="hero-title-agency-wrapper">
                  <span className="stroke">Agency</span>
                  <span className="hero-scroll-hint" aria-hidden="true">
                    <span className="scroll-hint-line">Scroll to explore more of our</span>
                    <span className="scroll-hint-line">
                      services <span className="scroll-hint-arrow" aria-hidden="true">→</span>
                    </span>
                  </span>
                </span>
              </h1>

              {/* Front Outline Layer (overlays in front of the person with identical positioning) */}
              <div className="hero-outline-layer" aria-hidden="true">
                <div className={`hero-outline ${isPersonHidden ? "headline-sunk" : ""}`}>
                  <span className="hero-title-creative">Creative</span>
                  <span className="hero-title-agency-wrapper">
                    <span className="stroke">Agency</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="hero-action">
              <div className="hero-action-desc-container">
                {/* 1. Mobile Apps Description */}
                <p
                  className={`hero-action-desc hero-action-mobile-desc ${
                    isPhoneVisible ? "desc-active" : ""
                  } ${isPhoneSinking ? "desc-sinking" : ""}`}
                >
                  <span>We build powerful mobile apps with</span>
                  <span>seamless UX, smart technology,</span>
                  <span>stunning design, and exceptional performance.</span>
                </p>

                {/* 2. Website Design Description */}
                <p
                  className={`hero-action-desc hero-action-website-desc ${
                    isWebsiteVisible ? "desc-active" : ""
                  } ${isWebsiteSinking ? "desc-sinking" : ""}`}
                >
                  <span>We create stunning websites, seamless</span>
                  <span>interfaces and digital experiences</span>
                  <span>built to perform.</span>
                </p>

                {/* 3. Social Media & Content Description */}
                <p
                  className={`hero-action-desc hero-action-social-desc ${
                    isCenterVisible ? "desc-active" : ""
                  } ${isCenterSinking ? "desc-sinking" : ""}`}
                >
                  <span>We build bold social brands through</span>
                  <span>smart content, strategic campaigns,</span>
                  <span>and lasting engagement.</span>
                </p>

                {/* 4. Creative Agency Description */}
                <p
                  className={`hero-action-desc hero-action-agency-desc ${
                    isAgencyVisible ? "desc-active" : ""
                  } ${isAgencySinking ? "desc-sinking" : ""}`}
                >
                  <span>We design and engineer digital</span>
                  <span>products end to end — strategy,</span>
                  <span>interface and production code.</span>
                </p>
              </div>

              <div className={`hero-buttons ${isPersonHidden ? "buttons-sunk" : ""}`}>
                <a className="dark-button" href="/contact">
                  Get started
                  <span aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </a>
              </div>
            </div>
          </div>

          <svg
            className="hero-mobile-star"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M 50 0 Q 50 50 100 50 Q 50 50 50 100 Q 50 50 0 50 Q 50 50 50 0 Z"
              fill="#000000"
            />
          </svg>

          <span className="hero-spark spark-a" aria-hidden="true" />
          <span className="hero-spark spark-b" aria-hidden="true" />

          {statsGrid}

          {/* Animated Person Container */}
          <div className={`hero-person-stage ${isPersonHidden ? "person-sunk" : ""}`}>
            <img
              className="hero-person"
              src="/assets/person.webp"
              onError={(e) => {
                e.currentTarget.src = "/assets/person.png";
              }}
              alt="EPIC STUDIO Creative Director & Lead Product Architect"
              fetchPriority="high"
              loading="eager"
              decoding="async"
            />

            {/* Curving rail text along the left side of the pant structure */}
            <div className="person-curved-rail" aria-hidden="true">
              <svg viewBox="0 0 50 200" className="person-curve-svg">
                <path
                  id="person-pant-path"
                  d="M 28 195 C 12 135 14 65 34 10"
                  fill="none"
                  stroke="none"
                />
                <text>
                  <textPath href="#person-pant-path" startOffset="50%" textAnchor="middle">
                    NOT A REAL PERSON
                  </textPath>
                </text>
              </svg>
            </div>
          </div>
        </section>

        {/* Background Typography (WEBSITE DESIGN) */}
        <div
          className={`hero-bg-typography typography-website ${
            isWebsiteVisible ? "typography-active" : ""
          } ${isWebsiteSinking ? "cards-sinking" : ""}`}
          aria-hidden="true"
        >
          <div className="bg-typography-inner">
            <span className="bg-text-word bg-word-website">WEBSITE</span>
            <span className="bg-text-word bg-word-design">DESIGN</span>
            <div className={`hero-website-features desktop-only-website-features ${isWebsiteVisible ? "features-active" : ""} ${isWebsiteSinking ? "features-sinking" : ""}`}>
              <span>SEO</span>
              <span className="feat-dot">·</span>
              <span>TRAFFIC</span>
              <span className="feat-dot">·</span>
              <span>VISIBILITY</span>
              <span className="feat-dot">·</span>
              <span>GROWTH</span>
            </div>
          </div>
        </div>

        {/* Professional White-Themed Triple Browser Window Mockup Stage (WEBSITE DESIGN) */}
        <div
          className={`hero-browser-stage ${
            isWebsiteVisible ? "browser-stage-active" : ""
          } ${isWebsiteSinking ? "browser-stage-sinking" : ""} ${
            animState === "spread" ? "browser-stage-spread" : ""
          }`}
          aria-label="Website design browser mockup"
        >
          {/* Mobile vertical feature rail anchored inside browser stage */}
          <div
            className={`hero-website-features mobile-only-website-features ${
              isWebsiteVisible ? "features-active" : ""
            } ${isWebsiteSinking ? "features-sinking" : ""}`}
            aria-hidden="true"
          >
            <span>SEO</span>
            <span className="feat-dot">·</span>
            <span>TRAFFIC</span>
            <span className="feat-dot">·</span>
            <span>VISIBILITY</span>
            <span className="feat-dot">·</span>
            <span>GROWTH</span>
          </div>

          {/* Tertiary Browser Mockup (Behind Top, Top Portion Prominently Visible) */}
          <div className="browser-window browser-window-tertiary" aria-hidden="true">
            <div className="top-bar">
              <div className="circles">
                <div className="circle circle-red" />
                <div className="circle circle-yellow" />
                <div className="circle circle-green" />
              </div>
              <div className="browser-nav-arrows">
                <svg viewBox="0 0 24 24" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                <svg viewBox="0 0 24 24" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
              <div className="browser-address-bar">
                <svg className="browser-ssl-icon" viewBox="0 0 24 24" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span className="browser-url-text">epic-studio.in/design-system</span>
              </div>
              <div className="browser-actions-right">
                <svg viewBox="0 0 24 24" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                </svg>
              </div>
            </div>
            <div className="content">
              <img
                src="/assets/3rdmockup.webp"
                onError={(e) => {
                  e.currentTarget.src = "/assets/3rdmockup.png";
                }}
                alt="Website design project showcase"
                className="browser-mockup-img"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>

          {/* Secondary Browser Mockup (Behind & Left Side, deeper in marquee) */}
          <div className="browser-window browser-window-secondary" aria-hidden="true">
            <div className="top-bar">
              <div className="circles">
                <div className="circle circle-red" />
                <div className="circle circle-yellow" />
                <div className="circle circle-green" />
              </div>
              <div className="browser-nav-arrows">
                <svg viewBox="0 0 24 24" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                <svg viewBox="0 0 24 24" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
              <div className="browser-address-bar">
                <svg className="browser-ssl-icon" viewBox="0 0 24 24" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span className="browser-url-text">epic-studio.in/dashboard</span>
              </div>
              <div className="browser-actions-right">
                <svg viewBox="0 0 24 24" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                </svg>
              </div>
            </div>
            <div className="content">
              <img
                src="/assets/2ndmockup.webp"
                onError={(e) => {
                  e.currentTarget.src = "/assets/2ndmockup.png";
                }}
                alt="Website design background preview"
                className="browser-mockup-img"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>

          {/* Primary Browser Mockup (Front, overlapping mockups) */}
          <div className="browser-window browser-window-primary">
            <div className="top-bar">
              <div className="circles">
                <div className="circle circle-red" />
                <div className="circle circle-yellow" />
                <div className="circle circle-green" />
              </div>
              <div className="browser-nav-arrows">
                <svg viewBox="0 0 24 24" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                <svg viewBox="0 0 24 24" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
              <div className="browser-address-bar">
                <svg className="browser-ssl-icon" viewBox="0 0 24 24" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span className="browser-url-text">epic-studio.in/work/pets-app</span>
              </div>
              <div className="browser-actions-right">
                <svg viewBox="0 0 24 24" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                </svg>
              </div>
            </div>
            <div className="content">
              <img
                src="/assets/pets.webp"
                onError={(e) => {
                  e.currentTarget.src = "/assets/pets.png";
                }}
                alt="Website design showcase preview"
                className="browser-mockup-img"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </div>

        {/* Background Typography behind iPhone Mockup (MOBILE APPS) */}
        <div
          className={`hero-bg-typography typography-mobile ${
            isPhoneEntering ? "phone-entering" : ""
          } ${isPhoneVisible ? "typography-active" : ""} ${
            isPhoneSinking ? "cards-sinking" : ""
          }`}
          aria-hidden="true"
        >
          <div className="bg-typography-inner">
            <span className="hero-mobile-eyebrow">WE BUILD POWERFUL</span>
            <span className="bg-text-word bg-word-mobile">MOBILE</span>
            <span className="bg-text-word bg-word-apps">APPS</span>
            {/* Desktop features sentence centered under APPS */}
            <div
              className={`hero-mobile-features desktop-only-features ${
                isPhoneVisible ? "features-active" : ""
              } ${isPhoneSinking ? "features-sinking" : ""}`}
              aria-hidden="true"
            >
              <span>UI/UX</span>
              <span className="feat-dot">·</span>
              <span>PERFORMANCE</span>
              <span className="feat-dot">·</span>
              <span>SECURITY</span>
              <span className="feat-dot">·</span>
              <span>SCALABILITY</span>
            </div>
          </div>
        </div>

        {/* Dual iPhone Showcase Stage (Main Dark Phone + Secondary Orange Phone Behind Left) */}
        <div
          className={`hero-phone-stage ${
            isPhoneEntering ? "phone-entering" : ""
          } ${isPhoneVisible ? "phone-stage-active" : ""} ${
            isPhoneSinking ? "phone-stage-sinking" : ""
          }`}
          aria-label="Mobile app preview"
        >
          {/* Mobile vertical feature rail anchored inside phone stage */}
          <div
            className={`hero-mobile-features mobile-only-features ${
              isPhoneVisible ? "features-active" : ""
            } ${isPhoneSinking ? "features-sinking" : ""}`}
            aria-hidden="true"
          >
            <span>UI/UX</span>
            <span className="feat-dot">·</span>
            <span>PERFORMANCE</span>
            <span className="feat-dot">·</span>
            <span>SECURITY</span>
            <span className="feat-dot">·</span>
            <span>SCALABILITY</span>
          </div>
          {/* Compact Professional iOS Logo Badge (Above Secondary Orange iPhone) */}
          <div
            className={`hero-ios-badge ${
              isPhoneEntering ? "phone-entering" : ""
            } ${isPhoneVisible ? "phone-active" : ""} ${
              isPhoneSinking ? "phone-sinking" : ""
            }`}
            aria-hidden="true"
          >
            {/* Desktop Badge */}
            <img
              src="/assets/ios_desk.png"
              alt="iOS Platform"
              className="hero-ios-badge-img desktop-only-badge"
              loading="eager"
              decoding="async"
            />
            {/* Mobile Curved Badge */}
            <svg
              className="hero-ios-badge-svg mobile-only-badge"
              viewBox="-8 -16 132 68"
              fill="none"
              style={{ overflow: "visible" }}
              xmlns="http://www.w3.org/2000/svg"
              aria-label="iOS Logo"
            >
              <defs>
                <path id="hero-ios-corner-arc" d="M 8 42 C 10 16, 38 10, 102 14" />
              </defs>
              {/* Apple Icon aligned along top-left corner curve */}
              <g transform="translate(2, 6) rotate(-24) scale(1.2)">
                <path
                  d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.64-.78 1.08-1.86.96-2.95-1 .04-2.14.65-2.78 1.4-.57.66-.99 1.74-.86 2.79 1.11.09 2.05-.56 2.68-1.24z"
                  fill="#ffffff"
                />
              </g>
              {/* "iOS" Text curving over the rounded corner */}
              <text
                fill="#ffffff"
                fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif"
                fontWeight="700"
                fontSize="20"
                letterSpacing="-0.3"
              >
                <textPath href="#hero-ios-corner-arc" startOffset="38%">
                  iOS
                </textPath>
              </text>
            </svg>
          </div>

          {/* Compact Professional Android Logo Badge (Above Mockup beside Orange Phone) */}
          <div
            className={`hero-android-badge ${
              isPhoneEntering ? "phone-entering" : ""
            } ${isPhoneVisible ? "phone-active" : ""} ${
              isPhoneSinking ? "phone-sinking" : ""
            }`}
            aria-hidden="true"
          >
            {/* Desktop Badge */}
            <img
              src="/assets/android_desk.webp"
              alt="Android Platform"
              className="hero-android-badge-img desktop-only-badge"
              loading="eager"
              decoding="async"
            />
            {/* Mobile Curved Badge */}
            <svg
              className="hero-android-badge-svg mobile-only-badge"
              viewBox="-8 -16 154 72"
              fill="none"
              style={{ overflow: "visible" }}
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Android Logo"
            >
              <defs>
                <path id="hero-android-rainbow-arc" d="M 6 38 C 32 8, 110 10, 142 48" />
              </defs>
              {/* Android Robot Head Icon */}
              <g transform="translate(2, 6) rotate(-22) scale(1.15)">
                <path
                  d="M18.4395 5.5586c-.675 1.1664-1.352 2.3318-2.0274 3.498-.0366-.0155-.0742-.0286-.1113-.043-1.8249-.6957-3.484-.8-4.42-.787-1.8551.0185-3.3544.4643-4.2597.8203-.084-.1494-1.7526-3.021-2.0215-3.4864a1.1451 1.1451 0 0 0-.1406-.1914c-.3312-.364-.9054-.4859-1.379-.203-.475.282-.7136.9361-.3886 1.5019 1.9466 3.3696-.0966-.2158 1.9473 3.3593.0172.031-.4946.2642-1.3926 1.0177C2.8987 12.176.452 14.772 0 18.9902h24c-.119-1.1108-.3686-2.099-.7461-3.0683-.7438-1.9118-1.8435-3.2928-2.7402-4.1836a12.1048 12.1048 0 0 0-2.1309-1.6875c.6594-1.122 1.312-2.2559 1.9649-3.3848.2077-.3615.1886-.7956-.0079-1.1191a1.1001 1.1001 0 0 0-.8515-.5332c-.5225-.0536-.9392.3128-1.0488.5449zm-.0391 8.461c.3944.5926.324 1.3306-.1563 1.6503-.4799.3197-1.188.0985-1.582-.4941-.3944-.5927-.324-1.3307.1563-1.6504.4727-.315 1.1812-.1086 1.582.4941zM7.207 13.5273c.4803.3197.5506 1.0577.1563 1.6504-.394.5926-1.1038.8138-1.584.4941-.48-.3197-.5503-1.0577-.1563-1.6504.4008-.6021 1.1087-.8106 1.584-.4941z"
                  fill="#3DDC84"
                />
              </g>
              {/* "Android" Text along the rainbow arc with bent right side */}
              <text
                fill="#ffffff"
                fontFamily="-apple-system, BlinkMacSystemFont, 'Roboto', 'SF Pro Display', sans-serif"
                fontWeight="700"
                fontSize="19"
                letterSpacing="-0.2"
              >
                <textPath href="#hero-android-rainbow-arc" startOffset="29%">
                  Android
                </textPath>
              </text>
            </svg>
          </div>

          {/* Secondary Orange iPhone (Tucked Behind Left Side) */}
          <div
            className={`hero-phone-mockup phone-orange-secondary ${
              isPhoneEntering ? "phone-entering" : ""
            } ${isPhoneVisible ? "phone-active" : ""} ${
              isPhoneSinking ? "phone-sinking" : ""
            }`}
          >
            <div className="outside-border outside-border-orange">
              <div className="silencer" />
              <div className="volume-up" />
              <div className="volume-down" />
              <div className="button-on" />
              <div className="inside-border">
                {/* Camera Notch */}
                <div className="camera">
                  <div className="camera-dot">
                    <div className="camera-dot-2" />
                    <div className="camera-dot-3" />
                  </div>
                  <div className="camera-speaker" />
                </div>

                {/* Battery and Signal */}
                <div className="t-r-info">
                  <div className="dots">...</div>
                  <div className="battery">
                    <div className="bar" />
                    <div className="dot" />
                  </div>
                </div>

                {/* Date */}
                <div className="date">Tuesday, 9 August</div>

                {/* Screen UI Image */}
                <img
                  src="/assets/orange-screen.webp"
                  onError={(e) => {
                    e.currentTarget.src = "/assets/orange-phone.webp";
                  }}
                  alt="App UI Preview"
                  className="orange-screen-img"
                  fetchPriority="high"
                  loading="eager"
                  decoding="async"
                />

                {/* Torch */}
                <div className="torch-outter">
                  <div className="light" />
                  <div className="top" />
                  <div className="switch-section" />
                  <div className="switch">
                    <div className="dot" />
                  </div>
                </div>

                {/* Camera */}
                <div className="camera-outter">
                  <div className="box" />
                  <div className="eye" />
                  <div className="circle" />
                  <div className="dot" />
                </div>

                {/* Bottom Line */}
                <div className="bottom-line" />
              </div>
            </div>
          </div>

          {/* Primary Dark iPhone Mockup (Front) */}
          <div
            className={`hero-phone-mockup phone-dark-primary ${
              isPhoneEntering ? "phone-entering" : ""
            } ${isPhoneVisible ? "phone-active" : ""} ${
              isPhoneSinking ? "phone-sinking" : ""
            }`}
          >
            <div className="outside-border">
              <div className="silencer" />
              <div className="volume-up" />
              <div className="volume-down" />
              <div className="button-on" />
              <div className="inside-border">
                {/* Camera */}
                <div className="camera">
                  <div className="camera-dot">
                    <div className="camera-dot-2" />
                    <div className="camera-dot-3" />
                  </div>
                  <div className="camera-speaker" />
                </div>

                {/* Battery and Signal */}
                <div className="t-r-info">
                  <div className="dots">...</div>
                  <div className="battery">
                    <div className="bar" />
                    <div className="dot" />
                  </div>
                </div>

                {/* Screen UI Image */}
                <img
                  src="/assets/mid.webp"
                  onError={(e) => {
                    e.currentTarget.src = "/assets/mid.png";
                  }}
                  alt="App UI Preview"
                  className="phone-screen-img"
                  fetchPriority="high"
                  loading="eager"
                  decoding="async"
                />

                {/* Torch */}
                <div className="torch-outter">
                  <div className="light" />
                  <div className="top" />
                  <div className="switch-section" />
                  <div className="switch">
                    <div className="dot" />
                  </div>
                </div>

                {/* Camera */}
                <div className="camera-outter">
                  <div className="box" />
                  <div className="eye" />
                  <div className="circle" />
                  <div className="dot" />
                </div>

                {/* Bottom Line */}
                <div className="bottom-line" />
              </div>
            </div>
          </div>
        </div>


        {/* Background Typography behind 3D Asset (SOCIAL MEDIA MANAGEMENT) */}
        <div
          className={`hero-bg-typography typography-social ${
            isCenterVisible ? "typography-active" : ""
          } ${isCenterSinking ? "cards-sinking" : ""}`}
          aria-hidden="true"
        >
          <div className="bg-typography-inner">
            <span className="hero-social-eyebrow">We build bold social brands through...</span>
            <span className="bg-text-word bg-word-social">SOCIAL MEDIA</span>
            <span className="bg-text-word bg-word-management stroke">&amp; CONTENT</span>
            <div
              className={`hero-social-platforms ${
                isCenterVisible ? "platforms-active" : ""
              } ${isCenterSinking ? "platforms-sinking" : ""}`}
              aria-label="Social media channels"
            >
              <div className="platform-item platform-ig" title="Instagram">
                <span className="platform-badge">
                  <img
                    src="/assets/icons8-instagram-logo-48.png"
                    alt="Instagram"
                    className="platform-icon"
                    loading="eager"
                    decoding="async"
                  />
                </span>
                <span className="platform-name">Instagram</span>
              </div>

              <span className="platform-bullet" aria-hidden="true" />

              <div className="platform-item platform-fb" title="Facebook">
                <span className="platform-badge">
                  <img
                    src="/assets/icons8-facebook-48.png"
                    alt="Facebook"
                    className="platform-icon"
                    loading="eager"
                    decoding="async"
                  />
                </span>
                <span className="platform-name">Facebook</span>
              </div>

              <span className="platform-bullet" aria-hidden="true" />

              <div className="platform-item platform-tw" title="Twitter / X">
                <span className="platform-badge">
                  <img
                    src="/assets/icons8-twitter-50.png"
                    alt="Twitter X"
                    className="platform-icon"
                    loading="eager"
                    decoding="async"
                  />
                </span>
                <span className="platform-name">
                  <span className="tw-name-desktop">
                    X <span className="platform-subname">(formerly Twitter)</span>
                  </span>
                  <span className="tw-name-mobile">Twitter</span>
                </span>
              </div>
            </div>

            {/* Compact Interactive LineSidebar Navigation */}
            <div
              className={`hero-social-linesidebar ${
                isCenterVisible ? "sidebar-active" : ""
              } ${isCenterSinking ? "sidebar-sinking" : ""}`}
            >
              <LineSidebar
                items={SIDEBAR_ITEMS}
                accentColor="#D2FD00"
                textColor="rgba(255, 255, 255, 0.65)"
                markerColor="rgba(255, 255, 255, 0.22)"
                showIndex
                showMarker
                proximityRadius={75}
                maxShift={16}
                falloff="smooth"
                markerLength={24}
                markerGap={6}
                tickScale={0.45}
                scaleTick
                itemGap={11}
                fontSize={0.8}
                smoothing={80}
                defaultActive={0}
              />
            </div>
          </div>
        </div>

        {/* Hero Center Showcase Stage (Displays keyboard-asset.png / 3D phone man + Background iPhone Mockup) */}
        <div
          className={`hero-center-stage ${
            isCenterVisible ? "center-active" : ""
          } ${isCenterSinking ? "center-sinking" : ""}`}
          aria-label="Interactive media showcase"
        >
          {/* High-Fidelity iPhone Mockup (Positioned Behind & on the Right Side of Image) */}
          <div className="social-bg-phone" aria-hidden="true">
            {/* 3D Metallic Side Chassis (Concentric 3D Shell) */}
            <div className="social-phone-side-rim">
              <div className="side-rim-band top" />
              <div className="side-rim-power-btn" />
              <div className="side-rim-band bottom" />
            </div>

            <div className="social-phone-body">
              {/* Screen Container */}
              <div className="social-phone-screen">
                {/* Dynamic Island / Notch */}
                <div className="social-phone-dynamic-island">
                  <div className="island-pill">
                    <div className="island-camera" />
                    <div className="island-sensor" />
                  </div>
                </div>

                {/* Facebook Profile UI Image */}
                <img
                  src="/assets/facebookmock.webp"
                  onError={(e) => {
                    e.currentTarget.src = "/assets/facebookmock.png";
                  }}
                  alt="Facebook Profile Mockup"
                  className="social-phone-ui-img"
                  loading="eager"
                  decoding="async"
                />

                {/* Ambient Glass Sheen Reflection */}
                <div className="social-phone-glass-sheen" />
              </div>
            </div>
          </div>

          {/* Front Showcase Image (3D phone man / keyboard asset) */}
          <div className="hero-center-card">
            <img
              src="/assets/keyboard-asset.webp"
              onError={(e) => {
                e.currentTarget.src = "/assets/keyboard-asset.png";
              }}
              alt="Interactive Media Showcase"
              className="hero-center-img"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>



        <a className="play-button" href="#" aria-label="Play video">
          <span className="play-core" aria-hidden="true">
            <i />
          </span>
          <svg className="play-label" viewBox="0 0 100 100" fill="none" aria-hidden="true">
            <defs>
              <path id="play-btn-path" d="M 3 50 A 47 47 0 0 0 97 50" />
            </defs>
            <text fill="currentColor" fontSize="13" letterSpacing="2">
              <textPath href="#play-btn-path" startOffset="1.5%" textAnchor="start">
                ...
              </textPath>
            </text>
            <text fill="currentColor" fontSize="13" letterSpacing="2">
              <textPath href="#play-btn-path" startOffset="50%" textAnchor="middle">
                click me!
              </textPath>
            </text>
            <text fill="currentColor" fontSize="13" letterSpacing="2">
              <textPath href="#play-btn-path" startOffset="98.5%" textAnchor="end">
                ...
              </textPath>
            </text>
          </svg>
        </a>

        <div className={`hero-icons ${isPersonHidden ? "icons-sunk" : ""}`} aria-hidden="true">
          <span className="float-icon fi-ig" style={{ transform: "rotate(-16deg)" }}>
            <img src="/assets/icons8-instagram-logo-48.png" alt="EPIC STUDIO Instagram Social Media" decoding="async" />
          </span>

          <span className="float-icon fi-fb" style={{ transform: "rotate(9deg)" }}>
            <img src="/assets/icons8-facebook-48.png" alt="EPIC STUDIO Facebook Community" decoding="async" />
          </span>

          <span className="float-icon fi-tw" style={{ transform: "rotate(12deg)" }}>
            <img src="/assets/icons8-twitter-50.png" alt="EPIC STUDIO Twitter X Profile" decoding="async" />
          </span>
        </div>

        {/* Diwali Fireworks Launcher Station & Particle Canvas */}
        <DiwaliFireworks />
      </div>

      {/* Marquee Strip positioned directly beneath hero-wrap */}
      {marquee}

      {/* 2 Festive Animated & Glowing Diyas on the Marquee (Left Side) */}
      <HeroDiyaDuo />
    </div>
  );
}
