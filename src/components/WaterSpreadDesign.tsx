import React from "react";

export default function WaterSpreadDesign() {
  return (
    <div className="who-water-spread" data-anim-scope aria-hidden="true">
      <svg
        className="who-water-svg"
        viewBox="0 0 1440 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Deep Hero Blue Fluid Gradient */}
          <linearGradient id="water-deep-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#082fe6" stopOpacity="0.28" />
            <stop offset="35%" stopColor="#0534f2" stopOpacity="0.18" />
            <stop offset="70%" stopColor="#0621ad" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#082fe6" stopOpacity="0" />
          </linearGradient>

          {/* Mid-Layer Fluid Liquid Gradient (Hero Royal Blue) */}
          <linearGradient id="water-mid-grad" x1="0%" y1="0%" x2="100%" y2="80%">
            <stop offset="0%" stopColor="#082fe6" stopOpacity="0.22" />
            <stop offset="45%" stopColor="#0534f2" stopOpacity="0.14" />
            <stop offset="85%" stopColor="#0621ad" stopOpacity="0.04" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </linearGradient>

          {/* Lime Accent Water Refraction */}
          <linearGradient id="water-lime-refract" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c9ff17" stopOpacity="0.18" />
            <stop offset="50%" stopColor="#082fe6" stopOpacity="0.08" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </linearGradient>

          {/* Radial Water Ripple Gradient */}
          <radialGradient id="water-ripple-glow" cx="50%" cy="0%" r="70%">
            <stop offset="0%" stopColor="#082fe6" stopOpacity="0.28" />
            <stop offset="45%" stopColor="#0534f2" stopOpacity="0.12" />
            <stop offset="80%" stopColor="#0621ad" stopOpacity="0.03" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>

          {/* Soft Filter for Liquid Caustic Depth */}
          <filter id="water-soft-glow" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. Base Ambient Liquid Dispersion Glow */}
        <ellipse cx="720" cy="40" rx="680" ry="180" fill="url(#water-ripple-glow)" />

        {/* 2. Deep Under-Layer Fluid Wave */}
        <path
          className="water-wave-layer wave-layer-deep"
          d="M0 0 C 180 45, 320 85, 520 60 C 720 35, 880 110, 1080 75 C 1240 45, 1360 80, 1440 50 L 1440 0 L 0 0 Z"
          fill="url(#water-deep-grad)"
        />

        {/* 3. Mid-Layer Fluid Liquid Spill (Expanding & Flowing Downward) */}
        <path
          className="water-wave-layer wave-layer-mid"
          d="M0 0 C 140 70, 290 120, 460 90 C 640 60, 780 145, 960 115 C 1140 85, 1320 130, 1440 80 L 1440 0 L 0 0 Z"
          fill="url(#water-mid-grad)"
        />

        {/* 4. Foreground Splash & Liquid Tendrils */}
        <path
          className="water-wave-layer wave-layer-front"
          d="M0 0 C 220 30, 380 95, 580 70 C 760 45, 910 125, 1120 85 C 1280 55, 1390 75, 1440 40 L 1440 0 L 0 0 Z"
          fill="url(#water-lime-refract)"
        />
      </svg>
    </div>
  );
}
