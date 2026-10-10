"use client";

import React, { useState, useEffect, Fragment } from "react";

function Widget({ title, badge, children }: { title: string; badge: string; children: React.ReactNode }) {
  return (
    <div className="preview-widget">
      <div className="widget-header">
        <span className="widget-title">{title}</span>
        <span className="widget-badge">{badge}</span>
      </div>
      <div className="widget-body">{children}</div>
    </div>
  );
}

function ChartHead({ title, value }: { title: string; value: string }) {
  return (
    <div className="chart-head">
      <span>{title}</span>
      <strong>{value}</strong>
    </div>
  );
}

function AreaChart({ line, area }: { line: string; area: string }) {
  return (
    <div className="chart-box">
      <svg className="chart-svg" viewBox="0 0 240 64" preserveAspectRatio="none" aria-hidden="true">
        <g className="chart-grid">
          <line x1="0" y1="16" x2="240" y2="16" />
          <line x1="0" y1="32" x2="240" y2="32" />
          <line x1="0" y1="48" x2="240" y2="48" />
        </g>
        <line className="chart-axis" x1="0" y1="63" x2="240" y2="63" />
        <path className="chart-area" d={area} />
        <path className="chart-line" d={line} />
      </svg>
    </div>
  );
}

function KpiRow({ items }: { items: { val: string; lbl: string }[] }) {
  return (
    <div className="kpi-row">
      {items.map((it) => (
        <div className="kpi-cell" key={it.lbl}>
          <strong>{it.val}</strong>
          <span>{it.lbl}</span>
        </div>
      ))}
    </div>
  );
}

export function EngineeringLivePreview() {
  const [commit, setCommit] = useState("3d2f9a1");
  const [status, setStatus] = useState("green");

  useEffect(() => {
    const hashes = ["3d2f9a1", "7be04cd", "a51f2b8", "f09c47d", "81e3ba0", "c4d78e2"];
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % hashes.length;
      setCommit(hashes[idx]);
      setStatus(Math.random() > 0.25 ? "green" : "amber");
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <Widget title="CI/CD Pipeline" badge="Live">
      <div className="pipeline">
        {["Build", "Test", "Deploy", "Monitor"].map((stage, i) => (
          <Fragment key={stage}>
            {i > 0 && <span className="pipeline-arrow">→</span>}
            <span className={`pipeline-stage${i === 0 ? " pipeline-stage-active" : ""}`}>{stage}</span>
          </Fragment>
        ))}
      </div>
      <ChartHead title="API latency · 24h" value="12ms" />
      <AreaChart
        line="M0 46 L30 42 L60 36 L90 40 L120 30 L150 26 L180 20 L210 15 L240 10"
        area="M0 46 L30 42 L60 36 L90 40 L120 30 L150 26 L180 20 L210 15 L240 10 L240 63 L0 63 Z"
      />
      <div className="chart-axis-labels">
        <span>00:00</span>
        <span>06:00</span>
        <span>12:00</span>
        <span>18:00</span>
        <span>now</span>
      </div>
      <div className="deploy-strip">
        <span className={`deploy-dot ${status}`} />
        <span className="deploy-text">
          {commit} · pipeline {status === "green" ? "green" : "review"} · 24 deploys/wk
        </span>
      </div>
    </Widget>
  );
}

export function AILivePreview() {
  const [promptText, setPromptText] = useState("Automate multi-lingual citizen workflows");
  const [thinking, setThinking] = useState(false);

  useEffect(() => {
    const prompts = [
      "Automate multi-lingual citizen workflows",
      "Optimize enterprise supply chain routing",
      "Synthesize real-time financial sentiment",
      "Deploy custom LLM on edge infrastructure",
    ];
    let idx = 0;
    let swapTimeout: ReturnType<typeof setTimeout> | null = null;
    const interval = setInterval(() => {
      setThinking(true);
      swapTimeout = setTimeout(() => {
        idx = (idx + 1) % prompts.length;
        setPromptText(prompts[idx]);
        setThinking(false);
      }, 600);
    }, 3500);
    return () => {
      clearInterval(interval);
      if (swapTimeout !== null) clearTimeout(swapTimeout);
    };
  }, []);

  return (
    <Widget title="Inference Engine" badge="Live">
      <div className="ai-prompt-box">
        <span className="prompt-label">Prompt</span>
        <span className="prompt-content">
          &quot;{promptText}&quot;<span className="blinking-cursor">|</span>
        </span>
      </div>
      <KpiRow
        items={[
          { val: "1.4k", lbl: "tokens/s" },
          { val: "180ms", lbl: "p50 latency" },
          { val: "128k", lbl: "context" },
        ]}
      />
      {thinking ? (
        <div className="ai-thinking">
          <span className="spinner" />
          Synthesizing response across 12 services...
        </div>
      ) : (
        <Fragment>
          <ChartHead title="Generation throughput" value="1.4k tok/s" />
          <AreaChart
            line="M0 58 L30 50 L60 44 L90 38 L120 34 L150 31 L180 30 L210 29 L240 28"
            area="M0 58 L30 50 L60 44 L90 38 L120 34 L150 31 L180 30 L210 29 L240 28 L240 63 L0 63 Z"
          />
        </Fragment>
      )}
    </Widget>
  );
}

export function GovTechLivePreview() {
  const bars = [40, 55, 38, 62, 50, 44, 58];
  const labels = ["M", "T", "W", "T", "F", "S", "S"];

  return (
    <Widget title="Citizen Services Platform" badge="Live">
      <KpiRow
        items={[
          { val: "14.2M", lbl: "citizens served" },
          { val: "99.99%", lbl: "uptime" },
          { val: "0.4s", lbl: "avg response" },
        ]}
      />
      <ChartHead title="Requests · this week" value="2.1M" />
      <div className="chart-box">
        <svg className="chart-svg" viewBox="0 0 240 64" preserveAspectRatio="none" aria-hidden="true">
          <g className="chart-grid">
            <line x1="0" y1="16" x2="240" y2="16" />
            <line x1="0" y1="32" x2="240" y2="32" />
            <line x1="0" y1="48" x2="240" y2="48" />
          </g>
          <line className="chart-axis" x1="0" y1="63" x2="240" y2="63" />
          {bars.map((h, i) => {
            const height = (h / 62) * 46;
            return (
              <rect
                key={i}
                x={i * 34 + 10}
                y={63 - height}
                width="14"
                height={height}
                rx="2"
                className={`gov-bar${i === 3 ? " gov-bar-active" : ""}`}
              />
            );
          })}
        </svg>
      </div>
      <div className="chart-axis-labels">
        {labels.map((l, i) => (
          <span key={i}>{l}</span>
        ))}
      </div>
    </Widget>
  );
}

export function CreativeLivePreview() {
  const swatches = [
    { hex: "#111827", name: "Ink" },
    { hex: "#6b7280", name: "Slate" },
    { hex: "#d1d5db", name: "Line" },
    { hex: "#f7f8fa", name: "Paper" },
  ];

  return (
    <Widget title="Design System" badge="Tokens">
      <div className="type-specimen">
        <span className="specimen-mark">Aa</span>
        <div className="specimen-lines">
          <span className="spec-line spec-line-lg" />
          <span className="spec-line" style={{ width: "82%" }} />
          <span className="spec-line spec-line-md" style={{ width: "64%" }} />
        </div>
      </div>
      <div className="swatch-row">
        {swatches.map((s) => (
          <div className="swatch-cell" key={s.name}>
            <i className="swatch" style={{ backgroundColor: s.hex, borderColor: s.hex === "#f7f8fa" ? "#e5e7eb" : "transparent" }} />
            <span>{s.name}</span>
          </div>
        ))}
      </div>
      <div className="btn-row">
        <span className="btn-pill btn-pill-solid">Primary</span>
        <span className="btn-pill btn-pill-ghost">Ghost</span>
        <span className="btn-pill btn-pill-ghost btn-pill-disabled">Disabled</span>
      </div>
    </Widget>
  );
}

export function CloudLivePreview() {
  const regions = [
    { lbl: "US-East", x: 44, y: 24 },
    { lbl: "EU-Central", x: 120, y: 12 },
    { lbl: "AP-South", x: 196, y: 24 },
    { lbl: "SG-East", x: 214, y: 62 },
    { lbl: "SA-East", x: 26, y: 62 },
    { lbl: "US-West", x: 120, y: 78 },
  ];

  return (
    <Widget title="Global Infrastructure" badge="8 Regions">
      <div className="topology">
        <svg className="topology-svg" viewBox="0 0 240 96" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          {regions.map((r) => (
            <line key={r.lbl} className="topology-link" x1="120" y1="48" x2={r.x} y2={r.y} />
          ))}
          <circle className="topology-node topology-hub" cx="120" cy="48" r="11" />
          <text className="topology-label topology-label-hub" x="120" y="51">
            LB
          </text>
          {regions.map((r) => (
            <Fragment key={r.lbl}>
              <circle className="topology-node" cx={r.x} cy={r.y} r="6.5" />
              <text className="topology-label" x={r.x} y={r.y + 15}>
                {r.lbl}
              </text>
            </Fragment>
          ))}
        </svg>
      </div>
      <div className="status-row">
        <span className="status-chip">
          <i className="status-dot" />
          All regions healthy
        </span>
        <span className="status-chip">
          <i className="status-dot" />
          99.99% uptime
        </span>
      </div>
    </Widget>
  );
}

export function GrowthLivePreview() {
  const funnel = [
    { lbl: "Impressions", val: "1.2M", w: 100 },
    { lbl: "Clicks", val: "84K", w: 76 },
    { lbl: "Sign-ups", val: "12K", w: 58 },
    { lbl: "Demos", val: "3.1K", w: 42 },
    { lbl: "Deals won", val: "940", w: 30 },
  ];

  return (
    <Widget title="Acquisition Funnel" badge="Live">
      <div className="funnel">
        {funnel.map((s, i) => (
          <div className="funnel-row" key={s.lbl}>
            <span className="funnel-idx">{i + 1}</span>
            <span className="funnel-lbl">{s.lbl}</span>
            <span className="funnel-track">
              <i style={{ width: `${s.w}%` }} />
            </span>
            <strong className="funnel-val">{s.val}</strong>
          </div>
        ))}
      </div>
      <div className="chart-head">
        <span>Overall conversion</span>
        <strong className="growth-num">+342%</strong>
      </div>
    </Widget>
  );
}

export function MobileLivePreview() {
  return (
    <Widget title="Cross-Platform Engine" badge="Native">
      <div className="platform-row">
        {["iOS", "Android", "Web"].map((p) => (
          <span className="platform-chip" key={p}>
            <i className="platform-dot" />
            {p}
          </span>
        ))}
      </div>
      <div className="big-stat">
        <strong>
          60<span>fps</span>
        </strong>
        <span>Flutter &amp; React Native runtime</span>
      </div>
      <ChartHead title="Frame time · p95" value="14.2ms" />
      <AreaChart
        line="M0 30 L40 32 L80 29 L120 33 L160 30 L200 32 L240 30"
        area="M0 30 L40 32 L80 29 L120 33 L160 30 L200 32 L240 30 L240 63 L0 63 Z"
      />
    </Widget>
  );
}

export function LabsLivePreview() {
  const bench = [
    { lbl: "WASM inference", val: "2.3ms", w: 72 },
    { lbl: "ZK verify", val: "41ms", w: 52 },
    { lbl: "Edge model acc.", val: "89%", w: 88 },
  ];

  return (
    <Widget title="R&D Sandbox" badge="Open Source">
      <div className="track-row">
        {["WebAssembly", "ZK Proofs", "Edge ML"].map((c) => (
          <span className="track-chip" key={c}>
            {c}
          </span>
        ))}
      </div>
      <div className="bench-rows">
        {bench.map((b) => (
          <div className="bench-row" key={b.lbl}>
            <span className="bench-lbl">{b.lbl}</span>
            <span className="bench-track">
              <i style={{ width: `${b.w}%` }} />
            </span>
            <strong className="bench-val">{b.val}</strong>
          </div>
        ))}
      </div>
      <div className="chart-head">
        <span>Active experiments</span>
        <strong>7</strong>
      </div>
    </Widget>
  );
}
