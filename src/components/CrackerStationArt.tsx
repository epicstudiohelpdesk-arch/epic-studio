"use client";

import React, { forwardRef, useImperativeHandle, useRef } from "react";

export interface CrackerStationHandle {
  setBarrelRocket: (
    barrelIndex: number,
    yOffset: number,
    visible: boolean,
    rocketType: number
  ) => void;
}

const CrackerStationArt = forwardRef<CrackerStationHandle>((_, ref) => {
  // Direct DOM refs to the 3 nested rockets inside the barrels for 60fps hardware-accelerated transforms
  const leftRocketRef = useRef<SVGGElement | null>(null);
  const centerRocketRef = useRef<SVGGElement | null>(null);
  const rightRocketRef = useRef<SVGGElement | null>(null);

  const leftRocketTypeRef = useRef<SVGGElement | null>(null);
  const centerRocketTypeRef = useRef<SVGGElement | null>(null);
  const rightRocketTypeRef = useRef<SVGGElement | null>(null);

  useImperativeHandle(ref, () => ({
    setBarrelRocket: (barrelIndex, yOffset, visible, rocketType) => {
      const rocketEl =
        barrelIndex === 0
          ? leftRocketRef.current
          : barrelIndex === 1
          ? centerRocketRef.current
          : rightRocketRef.current;

      const typeEl =
        barrelIndex === 0
          ? leftRocketTypeRef.current
          : barrelIndex === 1
          ? centerRocketTypeRef.current
          : rightRocketTypeRef.current;

      if (!rocketEl) return;

      // Update visibility & position along barrel axis
      rocketEl.style.opacity = visible ? "1" : "0";
      const baseX = barrelIndex === 0 ? 83 : barrelIndex === 1 ? 138 : 163;
      const baseY = barrelIndex === 0 ? 76 : barrelIndex === 1 ? 54 : 84;
      rocketEl.setAttribute(
        "transform",
        `translate(${baseX}, ${baseY + yOffset})`
      );

      // Update rocket visual pattern (0: Blue Star, 1: Purple Polka, 2: Crimson Chevron)
      if (typeEl && typeEl.dataset.type !== String(rocketType)) {
        typeEl.dataset.type = String(rocketType);
        // Toggle active type child
        Array.from(typeEl.children).forEach((child, idx) => {
          (child as SVGElement).style.display =
            idx === rocketType ? "inline" : "none";
        });
      }
    },
  }));

  // Reusable SVG Rocket Types
  const renderRocketTypes = () => (
    <>
      {/* Type 0: Blue Star Rocket */}
      <g style={{ display: "inline" }}>
        {/* Stick */}
        <line
          x1="0"
          y1="10"
          x2="0"
          y2="105"
          stroke="#FFFFFF"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="0"
          y1="10"
          x2="0"
          y2="105"
          stroke="#D32F2F"
          strokeWidth="3"
          strokeDasharray="4 6"
          strokeLinecap="round"
        />
        {/* Cone */}
        <polygon
          points="0,-36 -9,-14 9,-14"
          fill="url(#csa-goldHoriz)"
          stroke="#FFE082"
          strokeWidth="0.8"
        />
        {/* Body */}
        <rect
          x="-7.5"
          y="-14"
          width="15"
          height="24"
          fill="url(#csa-indigoGrad)"
          rx="1"
        />
        {/* Stars */}
        <polygon
          points="0,-9 1.5,-5 5,-5 2,-3 3,1 0,-1.5 -3,1 -2,-3 -5,-5 -1.5,-5"
          fill="#FFD700"
          transform="scale(0.65)"
        />
        <polygon
          points="0,3 1.5,7 5,7 2,9 3,13 0,10.5 -3,13 -2,9 -5,7 -1.5,7"
          fill="#FFD700"
          transform="scale(0.65)"
        />
        {/* Collar */}
        <rect
          x="-8"
          y="8"
          width="16"
          height="2.5"
          fill="url(#csa-goldHoriz)"
        />
      </g>

      {/* Type 1: Purple Polka Rocket */}
      <g style={{ display: "none" }}>
        {/* Stick */}
        <line
          x1="0"
          y1="10"
          x2="0"
          y2="105"
          stroke="#FFFFFF"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="0"
          y1="10"
          x2="0"
          y2="105"
          stroke="#00BCD4"
          strokeWidth="3"
          strokeDasharray="4 6"
          strokeLinecap="round"
        />
        {/* Cone */}
        <polygon
          points="0,-34 -8,-14 8,-14"
          fill="#AB47BC"
          stroke="#E1BEE7"
          strokeWidth="0.8"
        />
        {/* Body */}
        <rect
          x="-7"
          y="-14"
          width="14"
          height="22"
          fill="url(#csa-goldHoriz)"
          rx="1"
        />
        {/* Purple Diamonds */}
        <polygon
          points="0,-8 2.5,-5 0,-2 -2.5,-5"
          fill="#7B1FA2"
        />
        <polygon
          points="0,1 2.5,4 0,7 -2.5,4"
          fill="#7B1FA2"
        />
        {/* Collar */}
        <rect
          x="-7.5"
          y="7"
          width="15"
          height="2.5"
          fill="#6A1B9A"
        />
      </g>

      {/* Type 2: Crimson Chevron Rocket */}
      <g style={{ display: "none" }}>
        {/* Stick */}
        <line
          x1="0"
          y1="10"
          x2="0"
          y2="105"
          stroke="#FFFFFF"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="0"
          y1="10"
          x2="0"
          y2="105"
          stroke="#FF5722"
          strokeWidth="3"
          strokeDasharray="4 6"
          strokeLinecap="round"
        />
        {/* Cone */}
        <polygon
          points="0,-34 -8,-14 8,-14"
          fill="url(#csa-goldHoriz)"
          stroke="#FFE082"
          strokeWidth="0.8"
        />
        {/* Body */}
        <rect
          x="-7"
          y="-14"
          width="14"
          height="22"
          fill="url(#csa-emberGrad)"
          rx="1"
        />
        {/* Gold Chevrons */}
        <path
          d="M -5 -6 L 0 -3 L 5 -6"
          stroke="#FFD700"
          strokeWidth="1.6"
          fill="none"
        />
        <path
          d="M -5 1 L 0 4 L 5 1"
          stroke="#FFD700"
          strokeWidth="1.6"
          fill="none"
        />
        {/* Collar */}
        <rect
          x="-7.5"
          y="7"
          width="15"
          height="2.5"
          fill="url(#csa-goldHoriz)"
        />
      </g>
    </>
  );

  return (
    <svg
      viewBox="0 0 280 200"
      width="100%"
      height="100%"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      style={{ overflow: "visible" }}
    >
      <defs>
        {/* Metallic Gold Gradients */}
        <linearGradient id="csa-goldHoriz" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#D48800" />
          <stop offset="20%" stopColor="#FFD54F" />
          <stop offset="45%" stopColor="#FFF9C4" />
          <stop offset="65%" stopColor="#FFE082" />
          <stop offset="85%" stopColor="#FFB300" />
          <stop offset="100%" stopColor="#B36B00" />
        </linearGradient>

        <linearGradient id="csa-goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFE082" />
          <stop offset="35%" stopColor="#FFD700" />
          <stop offset="70%" stopColor="#FFA000" />
          <stop offset="100%" stopColor="#FF6F00" />
        </linearGradient>

        {/* Center Cylinder: Imperial Crimson / Velvety Maroon */}
        <linearGradient id="csa-maroonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3E0012" />
          <stop offset="18%" stopColor="#880E4F" />
          <stop offset="48%" stopColor="#C2185B" />
          <stop offset="78%" stopColor="#880E4F" />
          <stop offset="100%" stopColor="#28000C" />
        </linearGradient>

        {/* Left Cylinder: Royal Indigo / Sapphire */}
        <linearGradient id="csa-indigoGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0B1033" />
          <stop offset="18%" stopColor="#1A237E" />
          <stop offset="48%" stopColor="#283593" />
          <stop offset="78%" stopColor="#1A237E" />
          <stop offset="100%" stopColor="#06091F" />
        </linearGradient>

        {/* Right Cylinder: Ruby / Ember Orange */}
        <linearGradient id="csa-emberGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#460B00" />
          <stop offset="18%" stopColor="#B71C1C" />
          <stop offset="48%" stopColor="#D84315" />
          <stop offset="78%" stopColor="#BF360C" />
          <stop offset="100%" stopColor="#330000" />
        </linearGradient>

        {/* Warm Drop Shadow */}
        <filter id="csa-dropShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow
            dx="0"
            dy="6"
            stdDeviation="5"
            floodColor="#FF6F00"
            floodOpacity="0.4"
          />
        </filter>
      </defs>

      {/* 1. FESTIVE BRASS PEDESTAL TRAY AT BASE */}
      <g id="csa-tray">
        <ellipse
          cx="140"
          cy="180"
          rx="118"
          ry="16"
          fill="url(#csa-goldGrad)"
          opacity="0.25"
          filter="blur(5px)"
        />
        <ellipse
          cx="140"
          cy="176"
          rx="112"
          ry="14"
          fill="url(#csa-goldHoriz)"
          stroke="#FFE082"
          strokeWidth="1.2"
        />
        <ellipse
          cx="140"
          cy="175"
          rx="104"
          ry="11"
          fill="#2E1B0E"
          stroke="#FFB300"
          strokeWidth="0.8"
        />
        <circle cx="42" cy="174" r="1.8" fill="#FFF9C4" />
        <circle cx="62" cy="178" r="1.8" fill="#FFF9C4" />
        <circle cx="86" cy="182" r="1.8" fill="#FFF9C4" />
        <circle cx="114" cy="184" r="2" fill="#FFFFFF" />
        <circle cx="140" cy="185" r="2.2" fill="#FFFFFF" />
        <circle cx="166" cy="184" r="2" fill="#FFFFFF" />
        <circle cx="194" cy="182" r="1.8" fill="#FFF9C4" />
        <circle cx="218" cy="178" r="1.8" fill="#FFF9C4" />
        <circle cx="238" cy="174" r="1.8" fill="#FFF9C4" />
      </g>

      {/* 2. CYLINDER 1: LEFT BARREL (Tilted -16 deg) */}
      <g
        transform="translate(85, 172) rotate(-16) translate(-85, -172)"
        filter="url(#csa-dropShadow)"
      >
        {/* Dark Inside Nozzle Cavity */}
        <ellipse
          cx="83"
          cy="76"
          rx="17"
          ry="4"
          fill="#100500"
          stroke="#FF9800"
          strokeWidth="0.8"
        />

        {/* NESTED ROCKET INSIDE LEFT CYLINDER (Layered between back and front wall) */}
        <g
          ref={leftRocketRef}
          transform="translate(83, 76)"
          style={{ transition: "opacity 0.15s ease" }}
        >
          <g ref={leftRocketTypeRef} data-type="1">
            {renderRocketTypes()}
          </g>
        </g>

        {/* Front Cylinder Wall (Covers stick and lower rocket inside the tube!) */}
        <path
          d="M 62 76 L 104 76 L 108 172 L 58 172 Z"
          fill="url(#csa-indigoGrad)"
        />
        <rect
          x="57"
          y="165"
          width="52"
          height="8"
          fill="url(#csa-goldHoriz)"
          rx="2"
          stroke="#FFD54F"
          strokeWidth="0.8"
        />
        {/* Top Front Brass Nozzle Rim Lip */}
        <ellipse
          cx="83"
          cy="76"
          rx="21"
          ry="5.5"
          fill="url(#csa-goldHoriz)"
          stroke="#FFF9C4"
          strokeWidth="1"
          clipPath="url(#csa-frontRimClip)"
        />
        <rect
          x="61"
          y="87"
          width="44"
          height="4"
          fill="url(#csa-goldHoriz)"
        />
        <rect
          x="60.5"
          y="93"
          width="45"
          height="2"
          fill="url(#csa-goldHoriz)"
        />
        <g fill="url(#csa-goldHoriz)">
          <polygon points="83,103 87,109 83,115 79,109" />
          <polygon points="69,113 72,118 69,123 66,118" />
          <polygon points="97,113 100,118 97,123 94,118" />
          <polygon points="83,123 87,129 83,135 79,129" />
          <polygon points="83,141 86,145 83,149 80,145" />
        </g>
        <rect
          x="59"
          y="154"
          width="48"
          height="3"
          fill="url(#csa-goldHoriz)"
        />
      </g>

      {/* 3. CYLINDER 3: RIGHT BARREL (Tilted +32 deg) */}
      <g
        transform="translate(165, 172) rotate(32) translate(-165, -172)"
        filter="url(#csa-dropShadow)"
      >
        {/* Dark Inside Nozzle Cavity */}
        <ellipse
          cx="163"
          cy="84"
          rx="17"
          ry="4"
          fill="#100500"
          stroke="#FF9800"
          strokeWidth="0.8"
        />

        {/* NESTED ROCKET INSIDE RIGHT CYLINDER */}
        <g
          ref={rightRocketRef}
          transform="translate(163, 84)"
          style={{ transition: "opacity 0.15s ease" }}
        >
          <g ref={rightRocketTypeRef} data-type="2">
            {renderRocketTypes()}
          </g>
        </g>

        {/* Front Cylinder Wall */}
        <path
          d="M 142 84 L 184 84 L 188 172 L 138 172 Z"
          fill="url(#csa-emberGrad)"
        />
        <rect
          x="137"
          y="165"
          width="52"
          height="8"
          fill="url(#csa-goldHoriz)"
          rx="2"
          stroke="#FFD54F"
          strokeWidth="0.8"
        />
        <ellipse
          cx="163"
          cy="84"
          rx="21"
          ry="5.5"
          fill="url(#csa-goldHoriz)"
          stroke="#FFF9C4"
          strokeWidth="1"
        />
        <path
          d="M 142 97 L 184 111 L 184 117 L 142 103 Z"
          fill="url(#csa-goldHoriz)"
        />
        <path
          d="M 141 115 L 185 129 L 185 135 L 141 121 Z"
          fill="url(#csa-goldHoriz)"
        />
        <path
          d="M 140 133 L 186 147 L 186 153 L 140 139 Z"
          fill="url(#csa-goldHoriz)"
        />
        <circle cx="163" cy="101" r="2" fill="#FFF9C4" />
        <circle cx="153" cy="123" r="2" fill="#FFF9C4" />
        <circle cx="173" cy="123" r="2" fill="#FFF9C4" />
        <circle cx="163" cy="143" r="2" fill="#FFF9C4" />
      </g>

      {/* 4. CYLINDER 2: CENTER MAIN BARREL (Foreground prominence, -4 deg) */}
      <g
        transform="translate(138, 174) rotate(-4) translate(-138, -174)"
        filter="url(#csa-dropShadow)"
      >
        {/* Dark Inside Nozzle Cavity */}
        <ellipse
          cx="138"
          cy="54"
          rx="23"
          ry="5"
          fill="#170000"
          stroke="#FF5722"
          strokeWidth="1"
        />

        {/* NESTED ROCKET INSIDE CENTER CYLINDER */}
        <g
          ref={centerRocketRef}
          transform="translate(138, 54)"
          style={{ transition: "opacity 0.15s ease" }}
        >
          <g ref={centerRocketTypeRef} data-type="0">
            {renderRocketTypes()}
          </g>
        </g>

        {/* Front Cylinder Wall (Covers stick and lower body!) */}
        <path
          d="M 110 56 L 166 56 L 170 174 L 106 174 Z"
          fill="url(#csa-maroonGrad)"
        />
        <rect
          x="105"
          y="165"
          width="66"
          height="10"
          fill="url(#csa-goldHoriz)"
          rx="2.5"
          stroke="#FFD54F"
          strokeWidth="1"
        />
        <rect x="107" y="167" width="62" height="2" fill="#FFF9C4" />
        <rect
          x="109"
          y="54"
          width="58"
          height="8"
          fill="url(#csa-goldHoriz)"
          rx="2"
          stroke="#FFD54F"
          strokeWidth="0.8"
        />
        <ellipse
          cx="138"
          cy="54"
          rx="29"
          ry="6.5"
          fill="url(#csa-goldHoriz)"
          stroke="#FFF9C4"
          strokeWidth="1.2"
        />
        <rect
          x="110"
          y="69"
          width="56.5"
          height="4"
          fill="url(#csa-goldHoriz)"
        />
        <rect
          x="110.5"
          y="75"
          width="55.5"
          height="2"
          fill="url(#csa-goldHoriz)"
        />
        <rect
          x="111"
          y="79"
          width="54.5"
          height="1.5"
          fill="url(#csa-goldHoriz)"
        />
        <rect
          x="107.5"
          y="149"
          width="61.5"
          height="1.5"
          fill="url(#csa-goldHoriz)"
        />
        <rect
          x="107"
          y="152"
          width="62.5"
          height="2"
          fill="url(#csa-goldHoriz)"
        />
        <rect
          x="106.5"
          y="156"
          width="63.5"
          height="4"
          fill="url(#csa-goldHoriz)"
        />

        {/* Central Ornate Mandala Emblem */}
        <g
          transform="translate(138, 114)"
          fill="url(#csa-goldHoriz)"
          stroke="#FFE082"
          strokeWidth="0.6"
        >
          <circle
            cx="0"
            cy="0"
            r="9"
            fill="none"
            stroke="url(#csa-goldHoriz)"
            strokeWidth="1.6"
          />
          <circle cx="0" cy="0" r="4.5" fill="#FFD700" />
          <circle cx="0" cy="0" r="2.2" fill="#FFF9C4" />
          <path
            d="M 0,-9 Q 4.5,-16 0,-20 Q -4.5,-16 0,-9 Z"
            fill="url(#csa-goldHoriz)"
          />
          <path
            d="M 0,9 Q 4.5,16 0,20 Q -4.5,16 0,9 Z"
            fill="url(#csa-goldHoriz)"
          />
          <path
            d="M -9,0 Q -16,-4.5 -20,0 Q -16,4.5 -9,0 Z"
            fill="url(#csa-goldHoriz)"
          />
          <path
            d="M 9,0 Q 16,-4.5 20,0 Q 16,4.5 9,0 Z"
            fill="url(#csa-goldHoriz)"
          />
          <path
            d="M -6.5,-6.5 Q -12,-12 -14,-14 Q -9,-15 -6.5,-6.5 Z"
            fill="url(#csa-goldHoriz)"
          />
          <path
            d="M 6.5,-6.5 Q 12,-12 14,-14 Q 9,-15 6.5,-6.5 Z"
            fill="url(#csa-goldHoriz)"
          />
          <path
            d="M -6.5,6.5 Q -12,12 -14,14 Q -9,15 -6.5,6.5 Z"
            fill="url(#csa-goldHoriz)"
          />
          <path
            d="M 6.5,6.5 Q 12,12 14,14 Q 9,15 6.5,6.5 Z"
            fill="url(#csa-goldHoriz)"
          />
        </g>
      </g>
    </svg>
  );
});

CrackerStationArt.displayName = "CrackerStationArt";

export default CrackerStationArt;
