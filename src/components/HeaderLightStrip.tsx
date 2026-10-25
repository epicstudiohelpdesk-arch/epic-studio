"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import "./header-light-strip.css";

interface BulbSpec {
  s: number; // Parameter along curve 0..1
  bulbScale: number;
}

const BULB_SPECS: BulbSpec[] = [
  { s: 0.06, bulbScale: 0.92 },
  { s: 0.12, bulbScale: 0.94 },
  { s: 0.18, bulbScale: 0.96 },
  { s: 0.25, bulbScale: 0.98 },
  { s: 0.32, bulbScale: 1.0 },
  { s: 0.39, bulbScale: 1.02 },
  { s: 0.46, bulbScale: 1.04 },
  { s: 0.53, bulbScale: 1.06 },
  { s: 0.60, bulbScale: 1.08 },
  { s: 0.67, bulbScale: 1.10 },
  { s: 0.73, bulbScale: 1.12 },
  { s: 0.79, bulbScale: 1.13 },
  { s: 0.85, bulbScale: 1.14 },
  { s: 0.90, bulbScale: 1.15 },
  { s: 0.94, bulbScale: 1.16 },
  { s: 0.98, bulbScale: 1.18 },
];

interface HeaderLightStripProps {
  isScrolled?: boolean;
}

export default function HeaderLightStrip({ isScrolled = false }: HeaderLightStripProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const wirePathRef = useRef<SVGPathElement | null>(null);
  const wireHighlightRef = useRef<SVGPathElement | null>(null);
  const bulbsGroupRef = useRef<SVGGElement | null>(null);
  const bulbRefs = useRef<(SVGGElement | null)[]>([]);
  const bottomBracketRef = useRef<SVGGElement | null>(null);

  // Dynamic target anchor coordinates (attached to left side of screen)
  // Page coords: x = 0 (left screen edge), y ≈ 318 (level beside/under "AI builders.")
  const targetAnchorRef = useRef({ x: -302, y: 318, pRight: 165 });
  const isMobileRef = useRef(false);

  // Scroll tracking: appears ONLY in hero section; hidden when scrolled into other sections
  const [scrolledState, setScrolledState] = useState(isScrolled);
  const isScrolledRef = useRef(isScrolled);

  useEffect(() => {
    isScrolledRef.current = isScrolled;
    setScrolledState(isScrolled);
  }, [isScrolled]);

  useEffect(() => {
    const handleScroll = () => {
      const sy = window.scrollY || document.documentElement.scrollTop;
      const nextScrolled = sy > 20;
      isScrolledRef.current = nextScrolled;
      setScrolledState((prev) => (prev === nextScrolled ? prev : nextScrolled));
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Physics simulation refs
  const isDraggingRef = useRef(false);
  const startPointerXRef = useRef(0);
  const dragDeltaXRef = useRef(0);
  const swayCurrentRef = useRef(0);
  const swayVelocityRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);
  const [sparkles, setSparkles] = useState<
    { id: number; x: number; y: number; tx: number; ty: number; char: string }[]
  >([]);

  // Calculate dynamic bottom anchor flush on the side of the screen
  const updateTargetAnchor = useCallback(() => {
    if (typeof window === "undefined") return;
    const wrapEl = containerRef.current;
    if (!wrapEl) return;

    if (window.innerWidth <= 760) {
      // On mobile screens, .hero-social is display:none. Hang vertically beside brand.
      isMobileRef.current = true;
      targetAnchorRef.current = { x: 0, y: 155, pRight: 0 };
      return;
    }

    isMobileRef.current = false;
    const heroSocial = document.querySelector(".hero-social");
    const heroP = document.querySelector(".hero-social p");

    const wrapRect = wrapEl.getBoundingClientRect();
    const wrapCenterX = wrapRect.left + wrapRect.width / 2;

    let targetPageY = 320;
    let textRight = 165;
    if (heroP && heroSocial) {
      const pRect = heroP.getBoundingClientRect();
      targetPageY = pRect.bottom + 12;
      textRight = pRect.right;
    }

    // Attach flush against the left side of the screen (page x = 0)
    // svgX = 0 - wrapCenterX
    const svgX = -wrapCenterX;
    const svgY = Math.max(270, targetPageY);

    targetAnchorRef.current = { x: svgX, y: svgY, pRight: textRight };
  }, []);

  // Sparkle burst effect on tug / release
  const triggerSparkles = useCallback((x: number, y: number) => {
    const chars = ["✦", "✧", "⋆", "•", "✨"];
    const count = 8;
    const items = [];
    const baseId = Date.now();
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
      const dist = 14 + Math.random() * 22;
      items.push({
        id: baseId + i,
        x,
        y,
        tx: Math.cos(angle) * dist,
        ty: Math.sin(angle) * dist - 8,
        char: chars[Math.floor(Math.random() * chars.length)],
      });
    }
    setSparkles(items);
    setTimeout(() => {
      setSparkles([]);
    }, 750);
  }, []);

  // Keep target anchor updated on resize & scroll
  useEffect(() => {
    updateTargetAnchor();
    window.addEventListener("resize", updateTargetAnchor);
    window.addEventListener("scroll", updateTargetAnchor, { passive: true });
    return () => {
      window.removeEventListener("resize", updateTargetAnchor);
      window.removeEventListener("scroll", updateTargetAnchor);
    };
  }, [updateTargetAnchor]);

  // 60FPS dual-anchored spring & natural breeze garland physics loop
  useEffect(() => {
    let animId: number;
    let t = 0;

    const render = () => {
      // Pause physics calculations when scrolled to conserve CPU/battery
      if (isScrolledRef.current) {
        animId = requestAnimationFrame(render);
        return;
      }

      t += 0.016;

      // Ambient natural breeze
      const breezeTarget =
        Math.sin(t * 1.5) * 3.4 + Math.cos(t * 2.3) * 1.5;

      if (isDraggingRef.current) {
        const target = dragDeltaXRef.current;
        swayCurrentRef.current += (target - swayCurrentRef.current) * 0.28;
        swayVelocityRef.current = 0;
      } else {
        const displacement = swayCurrentRef.current - breezeTarget;
        const springForce = -0.045 * displacement;
        const dampingForce = -0.075 * swayVelocityRef.current;
        const accel = springForce + dampingForce;

        swayVelocityRef.current += accel;
        swayCurrentRef.current += swayVelocityRef.current;
      }

      const sway = swayCurrentRef.current;
      const endPt = targetAnchorRef.current;
      const isMob = isMobileRef.current;

      // Spline waypoints to guarantee clean clearance around text
      // Wrap center is at pageX ≈ 302
      // textRight is at pageX ≈ 165 -> svgX ≈ -137
      // We pass at svgX ≈ -115 (safely right of text), then sweep under AI builders
      const pts = isMob
        ? [
            { x: 0, y: 0 },
            { x: 0, y: endPt.y * 0.35 },
            { x: 0, y: endPt.y * 0.70 },
            { x: 0, y: endPt.y },
          ]
        : [
            { x: 0, y: 0 },                                    // Top ceiling mount beside brand
            { x: -16, y: endPt.y * 0.28 },                     // Drop past header pill
            { x: -75, y: endPt.y * 0.60 },                     // Past avatars safely
            { x: -115, y: endPt.y * 0.90 },                    // Right beside AI builders text
            { x: -160, y: endPt.y * 1.02 },                    // Beginning sweep under AI builders
            { x: endPt.x * 0.75, y: endPt.y * 1.01 },          // Sweeping along corridor
            { x: endPt.x, y: endPt.y },                        // Docking flush at screen left edge (x=0)
          ];

      // Catmull-Rom spline evaluator
      const evalSpline = (s: number) => {
        const n = pts.length - 1;
        const p = s * n;
        const i = Math.min(Math.floor(p), n - 1);
        const u = p - i;

        const p0 = pts[Math.max(i - 1, 0)];
        const p1 = pts[i];
        const p2 = pts[Math.min(i + 1, n)];
        const p3 = pts[Math.min(i + 2, n)];

        const u2 = u * u;
        const u3 = u2 * u;

        const x = 0.5 * (
          (2 * p1.x) +
          (-p0.x + p2.x) * u +
          (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * u2 +
          (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * u3
        );

        const y = 0.5 * (
          (2 * p1.y) +
          (-p0.y + p2.y) * u +
          (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * u2 +
          (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * u3
        );

        const dx = 0.5 * (
          (-p0.x + p2.x) +
          2 * (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * u +
          3 * (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * u2
        );

        const dy = 0.5 * (
          (-p0.y + p2.y) +
          2 * (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * u +
          3 * (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * u2
        );

        const angle = (Math.atan2(dy, dx) * 180) / Math.PI - 90;
        return { x, y, angle };
      };

      // Standing-wave displacement: 0 at both anchors, maximum in the center
      const getSwayOffset = (s: number) => {
        return Math.sin(Math.PI * s) * sway;
      };

      // Compute wire curve samples and update bulb positions
      const samplesCount = 42;
      const curvePoints: { x: number; y: number }[] = [];

      for (let i = 0; i <= samplesCount; i++) {
        const s = i / samplesCount;
        const pt = evalSpline(s);
        const microWave = Math.sin(s * Math.PI * 14) * 0.7 * Math.sin(Math.PI * s);
        const lateralSway = getSwayOffset(s);
        curvePoints.push({
          x: pt.x + lateralSway + microWave,
          y: pt.y,
        });
      }

      // Update bulb positions along the strand
      BULB_SPECS.forEach((spec, idx) => {
        const pt = evalSpline(spec.s);
        const lateralSway = getSwayOffset(spec.s);
        const microWave = (idx % 2 === 0 ? 0.6 : -0.6) * Math.sin(Math.PI * spec.s);
        const x = pt.x + lateralSway + microWave;
        const y = pt.y;
        const dynamicTilt = pt.angle * 0.65;

        const bulbEl = bulbRefs.current[idx];
        if (bulbEl) {
          bulbEl.setAttribute(
            "transform",
            `translate(${x.toFixed(2)}, ${y.toFixed(2)}) rotate(${dynamicTilt.toFixed(1)})`
          );
        }
      });

      // Update side-of-screen wall bracket position
      if (bottomBracketRef.current) {
        if (isMob) {
          bottomBracketRef.current.style.display = "none";
        } else {
          bottomBracketRef.current.style.display = "";
          bottomBracketRef.current.setAttribute(
            "transform",
            `translate(${endPt.x.toFixed(2)}, ${endPt.y.toFixed(2)})`
          );
        }
      }

      // Construct smooth SVG path string through curve samples
      let pathD = `M ${curvePoints[0].x.toFixed(2)} ${curvePoints[0].y.toFixed(2)}`;
      for (let i = 1; i < curvePoints.length - 1; i++) {
        const curr = curvePoints[i];
        const next = curvePoints[i + 1];
        const midX = (curr.x + next.x) / 2;
        const midY = (curr.y + next.y) / 2;
        pathD += ` Q ${curr.x.toFixed(2)} ${curr.y.toFixed(2)}, ${midX.toFixed(2)} ${midY.toFixed(2)}`;
      }
      const last = curvePoints[curvePoints.length - 1];
      pathD += ` L ${last.x.toFixed(2)} ${last.y.toFixed(2)}`;

      if (wirePathRef.current) {
        wirePathRef.current.setAttribute("d", pathD);
      }
      if (wireHighlightRef.current) {
        wireHighlightRef.current.setAttribute("d", pathD);
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Drag interaction handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    startPointerXRef.current = e.clientX;
    dragDeltaXRef.current = swayCurrentRef.current;
    setIsDragging(true);

    const onPointerMove = (moveEv: PointerEvent) => {
      if (!isDraggingRef.current) return;
      const rawDelta = moveEv.clientX - startPointerXRef.current;
      dragDeltaXRef.current = Math.max(-48, Math.min(48, rawDelta));
    };

    const onPointerUp = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        setIsDragging(false);
        triggerSparkles(targetAnchorRef.current.x + 30, targetAnchorRef.current.y - 10);
      }
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
  };

  // Subtle interactive hover sway impulse
  const handlePointerEnter = () => {
    if (!isDraggingRef.current) {
      swayVelocityRef.current += Math.random() > 0.5 ? 1.6 : -1.6;
    }
  };

  return (
    <div
      ref={containerRef}
      className={`header-light-strip-wrap ${isDragging ? "is-dragging" : ""} ${scrolledState ? "is-scrolled-hidden" : ""}`}
      onPointerEnter={handlePointerEnter}
      aria-label="Festive Diwali Fairy Light Strand connecting to the side of the screen"
    >
      <div className="header-light-strip-stage" aria-hidden="true">
        <svg
          className="header-light-strip-svg"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Top Anchor Mount Pin */}
            <linearGradient id="stripMountGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#d4af37" />
              <stop offset="50%" stopColor="#fff2a8" />
              <stop offset="100%" stopColor="#8c784f" />
            </linearGradient>

            {/* Wire Realistic Metallic Core */}
            <linearGradient id="stripWireGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#8c7c58" />
              <stop offset="35%" stopColor="#fff6df" />
              <stop offset="70%" stopColor="#d9caa0" />
              <stop offset="100%" stopColor="#70603e" />
            </linearGradient>

            {/* Bulb Socket Base */}
            <linearGradient id="stripSocketGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#3d3725" />
              <stop offset="45%" stopColor="#63593d" />
              <stop offset="85%" stopColor="#bfa45a" />
              <stop offset="100%" stopColor="#363020" />
            </linearGradient>

            {/* Radiant Ambient Atmospheric Aura (Large) */}
            <radialGradient id="stripBulbAura" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffea7a" stopOpacity="0.55" />
              <stop offset="35%" stopColor="#ffa000" stopOpacity="0.28" />
              <stop offset="65%" stopColor="#ff7000" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#ff6000" stopOpacity="0" />
            </radialGradient>

            {/* Intense Golden Bloom (Medium) */}
            <radialGradient id="stripBulbBloom" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="25%" stopColor="#fff3a1" stopOpacity="0.9" />
              <stop offset="55%" stopColor="#ffb300" stopOpacity="0.6" />
              <stop offset="85%" stopColor="#ff6a00" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#ff5500" stopOpacity="0" />
            </radialGradient>

            {/* Horizontal Starburst Flare (Anamorphic optical streak matching photo) */}
            <linearGradient id="stripFlareH" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffb300" stopOpacity="0" />
              <stop offset="25%" stopColor="#ffdb4d" stopOpacity="0.4" />
              <stop offset="48%" stopColor="#ffffff" stopOpacity="0.98" />
              <stop offset="52%" stopColor="#ffffff" stopOpacity="0.98" />
              <stop offset="75%" stopColor="#ffdb4d" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#ffb300" stopOpacity="0" />
            </linearGradient>

            {/* Vertical Starburst Flare */}
            <linearGradient id="stripFlareV" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffb300" stopOpacity="0" />
              <stop offset="25%" stopColor="#ffdb4d" stopOpacity="0.35" />
              <stop offset="48%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="52%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="75%" stopColor="#ffdb4d" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#ffb300" stopOpacity="0" />
            </linearGradient>

            {/* Wall Anchor Bracket Gradient */}
            <linearGradient id="stripBracketGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffe680" />
              <stop offset="40%" stopColor="#cfa53e" />
              <stop offset="100%" stopColor="#634e1c" />
            </linearGradient>
          </defs>

          {/* 1. Top Anchor Ring / Hook at ceiling (beside EPIC STUDIO text) */}
          <circle cx="0" cy="2" r="3" fill="url(#stripMountGrad)" />
          <circle cx="0" cy="2" r="1.4" fill="#0f172a" />
          <rect x="-1.2" y="2" width="2.4" height="4" rx="1.2" fill="url(#stripMountGrad)" />

          {/* 2. Core Hanging Wire Garland */}
          <path
            ref={wirePathRef}
            d="M 0 0 L -302 320"
            stroke="url(#stripWireGrad)"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* 3. Secondary Wire Highlight Thread */}
          <path
            ref={wireHighlightRef}
            d="M 0 0 L -302 320"
            stroke="#ffffff"
            strokeWidth="0.65"
            strokeDasharray="2.5 4"
            opacity="0.65"
            strokeLinecap="round"
          />

          {/* 4. Bulbs Group (16 Warm Glowing Micro-LEDs) */}
          <g ref={bulbsGroupRef}>
            {BULB_SPECS.map((spec, idx) => (
              <g
                key={idx}
                ref={(el) => {
                  bulbRefs.current[idx] = el;
                }}
                className="bulb-node"
                transform="translate(0, 0)"
              >
                {/* Large Atmospheric Amber Aura */}
                <circle
                  cx="0"
                  cy="1.5"
                  r={24 * spec.bulbScale}
                  fill="url(#stripBulbAura)"
                  className="light-bulb-aura"
                />

                {/* Horizontal Optical Lens Flare Streak (Matching camera flare in photo) */}
                <rect
                  x={-24 * spec.bulbScale}
                  y={1.5 - 1.2}
                  width={48 * spec.bulbScale}
                  height="2.4"
                  rx="1.2"
                  fill="url(#stripFlareH)"
                  className="light-bulb-flare"
                />

                {/* Vertical Optical Lens Flare Streak */}
                <rect
                  x="-1"
                  y={1.5 - 14 * spec.bulbScale}
                  width="2"
                  height={28 * spec.bulbScale}
                  rx="1"
                  fill="url(#stripFlareV)"
                  className="light-bulb-flare"
                />

                {/* Golden Radiant Bloom */}
                <circle
                  cx="0"
                  cy="1.5"
                  r={11 * spec.bulbScale}
                  fill="url(#stripBulbBloom)"
                  className="light-bulb-bloom"
                />

                {/* Socket Crimp Collar & Node */}
                <rect
                  x="-2"
                  y="-4.5"
                  width="4"
                  height="4.5"
                  rx="1"
                  fill="url(#stripSocketGrad)"
                />
                <line
                  x1="-2"
                  y1="-2.2"
                  x2="2"
                  y2="-2.2"
                  stroke="#ffe082"
                  strokeWidth="0.7"
                  opacity="0.9"
                />

                {/* Glowing LED Micro-Bulb Glass Capsule */}
                <ellipse
                  cx="0"
                  cy="1.5"
                  rx={2.2 * spec.bulbScale}
                  ry={3.8 * spec.bulbScale}
                  fill="#ffdf6d"
                  className="light-bulb-core"
                />

                {/* Ultra-hot White Center Filament Core */}
                <circle
                  cx="0"
                  cy="1.5"
                  r={1.3 * spec.bulbScale}
                  fill="#ffffff"
                  className="light-bulb-core"
                />

                {/* Specular Glass Glint */}
                <ellipse
                  cx="-0.8"
                  cy="0.8"
                  rx={0.6 * spec.bulbScale}
                  ry={1.5 * spec.bulbScale}
                  fill="#ffffff"
                  opacity="0.9"
                />
              </g>
            ))}
          </g>

          {/* 5. Bottom Wall Anchor Bracket flush on the side of the screen */}
          <g ref={bottomBracketRef} className="strip-bottom-bracket" transform="translate(-302, 320)">
            {/* Ambient golden glow at anchor */}
            <circle cx="2" cy="0" r="16" fill="url(#stripBulbAura)" opacity="0.65" />
            {/* Golden mounting plate flush against screen edge */}
            <rect
              x="0"
              y="-6"
              width="6"
              height="12"
              rx="1.5"
              fill="url(#stripBracketGrad)"
              stroke="#ffe680"
              strokeWidth="0.5"
            />
            {/* Central fastening rivet */}
            <circle cx="3" cy="0" r="1.5" fill="#1e1808" />
            <circle cx="2.6" cy="-0.4" r="0.6" fill="#ffffff" opacity="0.8" />
            {/* Connecting eyelet loop where wire attaches */}
            <path
              d="M 5 -3 C 8 -5, 10 -1, 6 2 Z"
              fill="none"
              stroke="url(#stripMountGrad)"
              strokeWidth="1.2"
            />
          </g>
        </svg>
      </div>

      {/* Interactive Hit Area for Tug / Drag */}
      <div
        className="header-light-strip-hitarea"
        onPointerDown={handlePointerDown}
      />

      {/* Floating Sparkles when pulled */}
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="strip-sparkle-item"
          style={
            {
              left: `${s.x}px`,
              top: `${s.y}px`,
              "--tx": `${s.tx}px`,
              "--ty": `${s.ty}px`,
            } as React.CSSProperties
          }
        >
          {s.char}
        </span>
      ))}
    </div>
  );
}