"use client";

import React, { useRef, useState } from "react";
import useRevealOnScroll from "./useRevealOnScroll";

interface SystemNode {
  id: string;
  label: string;
  /** position within the map, percentage of the canvas */
  x: number;
  y: number;
  tier: "core" | "primary" | "extended";
}

const nodes: SystemNode[] = [
  { id: "core", label: "EPIC OS", x: 50, y: 50, tier: "core" },
  { id: "engineering", label: "ENGINEERING", x: 16, y: 22, tier: "primary" },
  { id: "design", label: "DESIGN", x: 50, y: 12, tier: "primary" },
  { id: "ai", label: "AI", x: 84, y: 22, tier: "primary" },
  { id: "strategy", label: "STRATEGY", x: 10, y: 62, tier: "primary" },
  { id: "growth", label: "GROWTH", x: 90, y: 62, tier: "primary" },
  { id: "industries", label: "INDUSTRIES", x: 24, y: 90, tier: "extended" },
  { id: "delivery", label: "GLOBAL DELIVERY", x: 50, y: 96, tier: "extended" },
  { id: "products", label: "PRODUCTS", x: 76, y: 90, tier: "extended" },
];

/** connection pairs drawn between node ids */
const links: Array<[string, string]> = [
  ["core", "engineering"],
  ["core", "design"],
  ["core", "ai"],
  ["core", "strategy"],
  ["core", "growth"],
  ["engineering", "design"],
  ["design", "ai"],
  ["strategy", "industries"],
  ["growth", "products"],
  ["industries", "delivery"],
  ["delivery", "products"],
];

const metrics = [
  { value: "03", label: "CORE DISCIPLINES" },
  { value: "08", label: "PRACTICE DOMAINS" },
  { value: "12+", label: "INDUSTRY CONTEXTS" },
  { value: "04", label: "GLOBAL HUBS" },
  { value: "01", label: "UNIFIED DELIVERY MODEL" },
];

export default function GlanceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  useRevealOnScroll(sectionRef);

  const nodeById = (id: string) => nodes.find((n) => n.id === id)!;

  return (
    <section
      ref={sectionRef}
      className="glc-section" data-anim-scope
      id="at-a-glance"
      aria-labelledby="glc-title"
    >
      <div className="glc-grid-bg" aria-hidden="true" />

      <div className="glc-container">
        {/* Header */}
        <header className="glc-header" data-reveal>
          <span className="glc-section-label">07 // EPIC AT A GLANCE</span>
          <h2 id="glc-title" className="glc-headline">
            ONE STUDIO.
            <br />
            ONE <span className="glc-headline-stroke">OPERATING SYSTEM.</span>
          </h2>
        </header>

        <div className="glc-body">
          {/* Ecosystem Map */}
          <div className="glc-map-shell" data-reveal>
            <div className="glc-map">
              {/* SVG link layer */}
              <svg
                className={`glc-map-links ${hoveredNode ? "has-focus" : ""}`}
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                {links.map(([a, b]) => {
                  const na = nodeById(a);
                  const nb = nodeById(b);
                  const isHot =
                    hoveredNode != null && (a === hoveredNode || b === hoveredNode);
                  return (
                    <line
                      key={`${a}-${b}`}
                      x1={na.x}
                      y1={na.y}
                      x2={nb.x}
                      y2={nb.y}
                      className={isHot ? "is-hot" : ""}
                    />
                  );
                })}
              </svg>

              {/* Nodes */}
              {nodes.map((node) => (
                <button
                  key={node.id}
                  type="button"
                  tabIndex={-1}
                  aria-hidden="true"
                  className={`glc-node glc-node-${node.tier} ${
                    hoveredNode === node.id ? "is-hot" : ""
                  } ${
                    hoveredNode && hoveredNode !== node.id && !links.some(
                      ([a, b]) =>
                        (a === hoveredNode && b === node.id) ||
                        (b === hoveredNode && a === node.id)
                    )
                      ? "is-dim"
                      : ""
                  }`}
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  {node.label}
                </button>
              ))}
            </div>

            <span className="glc-map-caption">FIG. 07 — THE EPIC ECOSYSTEM / HOW WE ARE ORGANIZED</span>
          </div>

          {/* Compact metrics ledger */}
          <div className="glc-ledger" data-reveal style={{ transitionDelay: "120ms" }}>
            <span className="glc-ledger-title">STRUCTURE, NOT BRAGGING RIGHTS</span>
            <ul>
              {metrics.map((m) => (
                <li key={m.label}>
                  <strong>{m.value}</strong>
                  <span>{m.label}</span>
                </li>
              ))}
            </ul>
            <p className="glc-ledger-note">
              Disciplines stay connected. Delivery stays unified. Context changes —
              the system does not.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
