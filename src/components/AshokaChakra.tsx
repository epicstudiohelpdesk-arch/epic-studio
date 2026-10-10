import React from "react";

interface AshokaChakraProps {
  className?: string;
  size?: number | string;
  color?: string;
}

const SPOKE_ANGLES = Array.from({ length: 24 }, (_, i) => i * 15);

export default function AshokaChakra({
  className = "",
  size = "100%",
  color = "currentColor",
}: AshokaChakraProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`ashoka-chakra-svg ${className}`.trim()}
      data-anim-scope
      style={{ color }}
      role="img"
      aria-label="Ashoka Chakra — Architectural Watermark of Indian Engineering Heritage"
    >
      {/* Outer Dual Calibration Rims */}
      <circle
        cx="100"
        cy="100"
        r="94"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeDasharray="1.5 3"
        opacity="0.6"
      />
      <circle
        cx="100"
        cy="100"
        r="91"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle
        cx="100"
        cy="100"
        r="86"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.75"
      />

      {/* 24 Outer Circumference Nodes / Jewels */}
      {SPOKE_ANGLES.map((deg) => (
        <g key={`bead-${deg}`} transform={`rotate(${deg + 7.5} 100 100)`}>
          <circle
            cx="100"
            cy="14"
            r="1.6"
            fill="currentColor"
          />
          <circle
            cx="100"
            cy="14"
            r="2.8"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.5"
          />
        </g>
      ))}

      {/* 24 Faceted Architectural Spokes */}
      {SPOKE_ANGLES.map((deg) => (
        <g key={`spoke-${deg}`} transform={`rotate(${deg} 100 100)`}>
          {/* Left Facet */}
          <path
            d="M 100 21 L 98.6 85.5 L 100 100 Z"
            fill="currentColor"
            opacity="0.85"
          />
          {/* Right Facet (Subtle shading differential for faceted 3D metal/stone effect) */}
          <path
            d="M 100 21 L 101.4 85.5 L 100 100 Z"
            fill="currentColor"
            opacity="0.5"
          />
          {/* Spoke Center Ridge Line */}
          <line
            x1="100"
            y1="21"
            x2="100"
            y2="100"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.9"
          />
          {/* Spoke Base Triangular Support Foot */}
          <polygon
            points="97.4,82 100,24 102.6,82"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.4"
          />
        </g>
      ))}

      {/* Center Hub — Proportionally Reduced Precision Concentric Architecture */}
      <circle
        cx="100"
        cy="100"
        r="16.5"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <circle
        cx="100"
        cy="100"
        r="13.5"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeDasharray="1.5 1.5"
        opacity="0.6"
      />
      <circle
        cx="100"
        cy="100"
        r="9.5"
        fill="currentColor"
        opacity="0.85"
      />
      <circle
        cx="100"
        cy="100"
        r="4.5"
        fill="#f8f9fa"
      />
      <circle
        cx="100"
        cy="100"
        r="1.8"
        fill="currentColor"
      />
    </svg>
  );
}
