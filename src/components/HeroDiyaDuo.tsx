"use client";

import React from "react";
import "./hero-diya-duo.css";

/**
 * HeroDiyaDuo Component
 * 
 * Renders a compact pair of traditional earthen Diyas (one primary, one smaller secondary)
 * on the left corner of the marquee along its top edge.
 * Features realistic, organic animated fire flames, blue ignition roots,
 * glowing atmospheric aura, bouncing marquee reflections, and rising heat embers.
 */
export default function HeroDiyaDuo() {
  return (
    <div
      className="hero-diya-duo-container"
      aria-label="Festive Diwali Diyas on Marquee"
      role="img"
    >
      {/* Ambient Radial Fire Glow on the Marquee & Background */}
      <div className="diya-ambient-ground-glow" aria-hidden="true" />

      {/* Surface Light Reflection along Marquee Edge */}
      <div className="diya-marquee-reflection" aria-hidden="true" />

      {/* The Two Diyas Group */}
      <div className="diya-duo-wrapper">
        {/* ====================================================================
            DIYA 1: PRIMARY (LARGER) DIYA
            ==================================================================== */}
        <div className="diya-unit diya-unit-primary">
          {/* Flame Component with Layered Realism */}
          <div className="diya-flame-system diya-flame-primary" aria-hidden="true">
            {/* Soft Ambient Halo */}
            <div className="flame-halo" />

            {/* Rising Micro Embers */}
            <div className="flame-ember ember-1" />
            <div className="flame-ember ember-2" />
            <div className="flame-ember ember-3" />

            {/* SVG Multi-Layer Flame */}
            <svg
              className="flame-svg"
              viewBox="0 0 40 65"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Outer Crimson/Orange Mantle */}
                <linearGradient id="flameOuterGradLg" x1="20" y1="60" x2="20" y2="2" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#dc2626" />
                  <stop offset="25%" stopColor="#ea580c" />
                  <stop offset="65%" stopColor="#f59e0b" />
                  <stop offset="92%" stopColor="#fef08a" />
                  <stop offset="100%" stopColor="#ffffff" />
                </linearGradient>

                {/* Golden Intermediate Body */}
                <linearGradient id="flameMidGradLg" x1="20" y1="58" x2="20" y2="8" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#ea580c" />
                  <stop offset="20%" stopColor="#f59e0b" />
                  <stop offset="65%" stopColor="#fde047" />
                  <stop offset="100%" stopColor="#ffffff" />
                </linearGradient>

                {/* White-Hot Core */}
                <linearGradient id="flameCoreGradLg" x1="20" y1="56" x2="20" y2="18" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#fef08a" />
                  <stop offset="40%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#ffffff" />
                </linearGradient>

                {/* Blue Ignition Root Gradient */}
                <radialGradient id="flameBlueRootLg" cx="20" cy="58" r="8" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.95" />
                  <stop offset="45%" stopColor="#6366f1" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0" />
                </radialGradient>

                {/* Flame Bloom Filter */}
                <filter id="flameBloomLg" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="1.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* 1. Outer Flame Aura */}
              <path
                className="flame-layer-outer"
                d="M 20 2 C 24 14, 33 26, 33 41 C 33 53, 27 60, 20 60 C 13 60, 7 53, 7 41 C 7 26, 16 14, 20 2 Z"
                fill="url(#flameOuterGradLg)"
                filter="url(#flameBloomLg)"
              />

              {/* 2. Intermediate Golden Body */}
              <path
                className="flame-layer-mid"
                d="M 20 8 C 23 18, 29 28, 29 42 C 29 52, 25 57, 20 57 C 15 57, 11 52, 11 42 C 11 28, 17 18, 20 8 Z"
                fill="url(#flameMidGradLg)"
              />

              {/* 3. Incandescent White-Hot Core */}
              <path
                className="flame-layer-core"
                d="M 20 18 C 22 25, 25 34, 25 45 C 25 53, 23 56, 20 56 C 17 56, 15 53, 15 45 C 15 34, 18 25, 20 18 Z"
                fill="url(#flameCoreGradLg)"
              />

              {/* 4. Oxygen-Rich Blue Root at the Wick */}
              <ellipse
                className="flame-layer-blue"
                cx="20"
                cy="56"
                rx="7"
                ry="3.5"
                fill="url(#flameBlueRootLg)"
              />
            </svg>
          </div>

          {/* Earthen Clay Diya Bowl */}
          <div className="diya-vessel-wrap diya-vessel-primary">
            <svg
              className="diya-vessel-svg"
              viewBox="0 0 94 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Clay Terracotta Outer Gradient */}
                <linearGradient id="clayOuterLg" x1="47" y1="8" x2="47" y2="46" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#ea580c" />
                  <stop offset="28%" stopColor="#c2410c" />
                  <stop offset="68%" stopColor="#9a3412" />
                  <stop offset="100%" stopColor="#5a1a06" />
                </linearGradient>

                {/* Terracotta Rim Highlights */}
                <linearGradient id="clayRimLg" x1="6" y1="12" x2="88" y2="12" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#d97706" />
                  <stop offset="20%" stopColor="#f59e0b" />
                  <stop offset="50%" stopColor="#fef08a" />
                  <stop offset="80%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#b45309" />
                </linearGradient>

                {/* Oil Pool Liquid Gold Gradient */}
                <linearGradient id="oilPoolLg" x1="47" y1="8" x2="47" y2="22" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#fef08a" stopOpacity="0.9" />
                  <stop offset="35%" stopColor="#f59e0b" />
                  <stop offset="80%" stopColor="#b45309" />
                  <stop offset="100%" stopColor="#78350f" />
                </linearGradient>

                {/* Bowl Contact Shadow */}
                <filter id="diyaShadowLg" x="-20%" y="-20%" width="140%" height="150%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Contact Ground Shadow */}
              <ellipse cx="47" cy="44" rx="34" ry="4" fill="rgba(15, 23, 42, 0.55)" />

              {/* Main Clay Earthen Body */}
              <path
                d="M 6 15 C 10 32, 28 44, 47 44 C 66 44, 84 32, 88 15 C 78 20, 63 22, 47 22 C 31 22, 16 20, 6 15 Z"
                fill="url(#clayOuterLg)"
              />

              {/* Terracotta Carved Ridges / Texture */}
              <path
                d="M 12 21 C 21 34, 33 40, 47 40 C 61 40, 73 34, 82 21"
                stroke="#7c2d12"
                strokeWidth="1.2"
                strokeLinecap="round"
                opacity="0.8"
              />
              <path
                d="M 19 26 C 27 35, 37 38, 47 38 C 57 38, 67 35, 75 26"
                stroke="#ea580c"
                strokeWidth="1"
                strokeLinecap="round"
                opacity="0.6"
              />

              {/* Inner Oil Reservoir Pool */}
              <ellipse cx="47" cy="15" rx="38" ry="8" fill="url(#oilPoolLg)" />

              {/* Liquid Surface Flame Reflection Ring */}
              <ellipse
                cx="47"
                cy="14"
                rx="24"
                ry="4"
                fill="#fff3a8"
                opacity="0.55"
              />

              {/* Ornate Rim Trim & Golden Petal Motifs */}
              <path
                d="M 6 15 C 16 20, 31 22, 47 22 C 63 22, 78 20, 88 15 C 80 11, 64 9, 47 9 C 30 9, 14 11, 6 15 Z"
                stroke="url(#clayRimLg)"
                strokeWidth="1.8"
                fill="none"
              />

              {/* Festive Golden Beads along Rim */}
              {[15, 24, 34, 47, 60, 70, 79].map((cx, i) => (
                <circle
                  key={i}
                  cx={cx}
                  cy={15 + Math.sin((cx / 94) * Math.PI) * 4}
                  r="1.4"
                  fill="#fef08a"
                  stroke="#b45309"
                  strokeWidth="0.5"
                />
              ))}

              {/* Cotton Wick (Baati) extending to spout */}
              <path
                d="M 47 18 C 47 14, 47 9, 47 5"
                stroke="#fef3c7"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M 47 7 L 47 4"
                stroke="#292524"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
              {/* Wick Ember Tip */}
              <circle cx="47" cy="4" r="1.6" fill="#f97316" />
            </svg>
          </div>
        </div>

        {/* ====================================================================
            DIYA 2: SECONDARY (SMALLER) DIYA (Offset Nestled Alongside)
            ==================================================================== */}
        <div className="diya-unit diya-unit-secondary">
          {/* Flame Component for Smaller Diya with Organic Staggered Flicker */}
          <div className="diya-flame-system diya-flame-secondary" aria-hidden="true">
            {/* Soft Ambient Halo */}
            <div className="flame-halo flame-halo-sm" />

            {/* Rising Micro Embers */}
            <div className="flame-ember ember-sm-1" />
            <div className="flame-ember ember-sm-2" />

            {/* SVG Multi-Layer Flame */}
            <svg
              className="flame-svg"
              viewBox="0 0 32 52"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="flameOuterGradSm" x1="16" y1="48" x2="16" y2="2" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#dc2626" />
                  <stop offset="25%" stopColor="#ea580c" />
                  <stop offset="65%" stopColor="#f59e0b" />
                  <stop offset="90%" stopColor="#fef08a" />
                  <stop offset="100%" stopColor="#ffffff" />
                </linearGradient>

                <linearGradient id="flameMidGradSm" x1="16" y1="46" x2="16" y2="7" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#ea580c" />
                  <stop offset="22%" stopColor="#f59e0b" />
                  <stop offset="68%" stopColor="#fde047" />
                  <stop offset="100%" stopColor="#ffffff" />
                </linearGradient>

                <linearGradient id="flameCoreGradSm" x1="16" y1="44" x2="16" y2="15" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#fef08a" />
                  <stop offset="40%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#ffffff" />
                </linearGradient>

                <radialGradient id="flameBlueRootSm" cx="16" cy="45" r="6" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.95" />
                  <stop offset="50%" stopColor="#6366f1" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* 1. Outer Flame Mantle */}
              <path
                className="flame-layer-outer"
                d="M 16 2 C 19 12, 26 21, 26 33 C 26 43, 21 48, 16 48 C 11 48, 6 43, 6 33 C 6 21, 13 12, 16 2 Z"
                fill="url(#flameOuterGradSm)"
              />

              {/* 2. Golden Mid Flame */}
              <path
                className="flame-layer-mid"
                d="M 16 7 C 18 15, 23 23, 23 34 C 23 42, 19 46, 16 46 C 13 46, 9 42, 9 34 C 9 23, 14 15, 16 7 Z"
                fill="url(#flameMidGradSm)"
              />

              {/* 3. White Core */}
              <path
                className="flame-layer-core"
                d="M 16 15 C 18 20, 20 27, 20 36 C 20 43, 18 45, 16 45 C 14 45, 12 43, 12 36 C 12 27, 14 20, 16 15 Z"
                fill="url(#flameCoreGradSm)"
              />

              {/* 4. Oxygen-Rich Blue Root */}
              <ellipse
                className="flame-layer-blue"
                cx="16"
                cy="45"
                rx="5"
                ry="2.8"
                fill="url(#flameBlueRootSm)"
              />
            </svg>
          </div>

          {/* Earthen Clay Diya Bowl (Smaller Scale) */}
          <div className="diya-vessel-wrap diya-vessel-secondary">
            <svg
              className="diya-vessel-svg"
              viewBox="0 0 72 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="clayOuterSm" x1="36" y1="6" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#ea580c" />
                  <stop offset="28%" stopColor="#c2410c" />
                  <stop offset="68%" stopColor="#9a3412" />
                  <stop offset="100%" stopColor="#5a1a06" />
                </linearGradient>

                <linearGradient id="clayRimSm" x1="5" y1="10" x2="67" y2="10" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#d97706" />
                  <stop offset="25%" stopColor="#f59e0b" />
                  <stop offset="50%" stopColor="#fef08a" />
                  <stop offset="75%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#b45309" />
                </linearGradient>

                <linearGradient id="oilPoolSm" x1="36" y1="6" x2="36" y2="18" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#fef08a" stopOpacity="0.9" />
                  <stop offset="35%" stopColor="#f59e0b" />
                  <stop offset="85%" stopColor="#b45309" />
                  <stop offset="100%" stopColor="#78350f" />
                </linearGradient>
              </defs>

              {/* Contact Ground Shadow */}
              <ellipse cx="36" cy="35" rx="26" ry="3" fill="rgba(15, 23, 42, 0.55)" />

              {/* Main Clay Body */}
              <path
                d="M 5 12 C 8 25, 22 35, 36 35 C 50 35, 64 25, 67 12 C 59 16, 48 18, 36 18 C 24 18, 13 16, 5 12 Z"
                fill="url(#clayOuterSm)"
              />

              {/* Ridges */}
              <path
                d="M 9 17 C 16 27, 26 31, 36 31 C 46 31, 56 27, 63 17"
                stroke="#7c2d12"
                strokeWidth="1"
                strokeLinecap="round"
                opacity="0.8"
              />

              {/* Inner Oil Reservoir Pool */}
              <ellipse cx="36" cy="12" rx="29" ry="6.2" fill="url(#oilPoolSm)" />

              {/* Flame Reflection Ring */}
              <ellipse
                cx="36"
                cy="11"
                rx="18"
                ry="3.2"
                fill="#fff3a8"
                opacity="0.55"
              />

              {/* Rim Trim */}
              <path
                d="M 5 12 C 13 16, 24 18, 36 18 C 48 18, 59 16, 67 12 C 61 9, 49 7, 36 7 C 23 7, 11 9, 5 12 Z"
                stroke="url(#clayRimSm)"
                strokeWidth="1.5"
                fill="none"
              />

              {/* Festive Golden Beads */}
              {[12, 20, 28, 36, 44, 52, 60].map((cx, i) => (
                <circle
                  key={i}
                  cx={cx}
                  cy={12 + Math.sin((cx / 72) * Math.PI) * 3}
                  r="1.1"
                  fill="#fef08a"
                  stroke="#b45309"
                  strokeWidth="0.4"
                />
              ))}

              {/* Cotton Wick (Baati) */}
              <path
                d="M 36 14 C 36 11, 36 7, 36 4"
                stroke="#fef3c7"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M 36 6 L 36 3"
                stroke="#292524"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              {/* Wick Ember Tip */}
              <circle cx="36" cy="3" r="1.3" fill="#f97316" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
