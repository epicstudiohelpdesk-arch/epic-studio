"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Matter from "matter-js";
import "./rope-lantern.css";

interface Sparkle {
  id: number;
  tx: number;
  ty: number;
  char: string;
}

export default function RopeLantern() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(SVGGElement | null)[]>([]);

  const [isRadiant, setIsRadiant] = useState(false);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  // Sound generator using Web Audio API
  const playChime = useCallback(() => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(420, now + 0.12);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.15);
    } catch {
      // Audio not permitted or unavailable
    }
  }, []);

  // Sparkle burst helper
  const burstSparkles = useCallback((x: number, y: number) => {
    const chars = ["✦", "✧", "⋆", "•", "✨"];
    const count = 12;
    const newSparkles: Sparkle[] = [];
    const baseId = Date.now();

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
      const dist = 24 + Math.random() * 32;
      newSparkles.push({
        id: baseId + i,
        tx: Math.cos(angle) * dist,
        ty: Math.sin(angle) * dist,
        char: chars[Math.floor(Math.random() * chars.length)],
      });
    }

    setSparkles(newSparkles);
    setTimeout(() => {
      setSparkles([]);
    }, 900);
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    const pathElm = pathRef.current;
    const handleElm = handleRef.current;
    if (!stage || !pathElm || !handleElm) return;

    // Dimensions & Geometry
    const stageWidth = 160;
    const anchorX = 80;
    const anchorY = 2;
    const linkCount = 5;
    const linkSpacing = 6.5;

    // Create Matter Engine
    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 0.9, scale: 0.001 },
    });

    const ropeGroup = Matter.Body.nextGroup(true);

    // Create Chain Bodies
    const rope = Matter.Composites.stack(
      anchorX,
      anchorY,
      1,
      linkCount,
      0,
      linkSpacing,
      (x: number, y: number) => {
        return Matter.Bodies.circle(x, y, 3.5, {
          collisionFilter: { group: ropeGroup },
          frictionAir: 0.038,
          mass: 0.12,
        });
      }
    );

    // Chain constraints
    Matter.Composites.chain(rope, 0, 0.4, 0, -0.4, {
      stiffness: 0.92,
      damping: 0.22,
      length: linkSpacing,
    });

    // Anchor body at the ceiling
    const anchor = Matter.Bodies.circle(anchorX, anchorY, 2, {
      isStatic: true,
      isSensor: true,
    });

    // Constraint fixing top of rope to ceiling anchor
    const fixToAnchor = Matter.Constraint.create({
      bodyA: anchor,
      bodyB: rope.bodies[0],
      stiffness: 0.95,
      length: 0,
    });

    // The Handle: bottom body
    const handleBody = rope.bodies[rope.bodies.length - 1];
    Matter.Body.setMass(handleBody, 2.4);

    // Mouse / drag constraint
    const mouseConstraint = Matter.Constraint.create({
      pointA: { x: anchorX, y: anchorY + linkCount * linkSpacing },
      bodyB: handleBody,
      pointB: { x: 0, y: 0 },
      stiffness: 0.0000000001,
      length: 0,
    });

    Matter.World.add(engine.world, [anchor, rope, fixToAnchor, mouseConstraint]);

    // Drag interaction tracking
    let isDragging = false;
    let pointerStartX = 0;
    let pointerStartY = 0;
    let hasTriggeredPull = false;
    let dragDistanceTotal = 0;
    let animFrameId: number;

    const getStageCoords = (e: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      const scaleX = stageWidth / rect.width;
      const scaleY = 340 / rect.height;
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      };
    };

    const onPointerDown = (e: PointerEvent) => {
      handleElm.setPointerCapture(e.pointerId);
      isDragging = true;
      hasTriggeredPull = false;
      dragDistanceTotal = 0;
      pointerStartX = e.clientX;
      pointerStartY = e.clientY;

      const coords = getStageCoords(e);
      mouseConstraint.pointA = { x: coords.x, y: coords.y };
      mouseConstraint.stiffness = 0.88;

      handleElm.classList.add("is-grabbing");
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;

      const deltaX = e.clientX - pointerStartX;
      const deltaY = e.clientY - pointerStartY;
      dragDistanceTotal = Math.hypot(deltaX, deltaY);

      const coords = getStageCoords(e);
      mouseConstraint.pointA = { x: coords.x, y: coords.y };

      // Pull down trigger threshold (e.g. pulled down > 34px)
      if (deltaY > 34 && !hasTriggeredPull) {
        hasTriggeredPull = true;
        setIsRadiant((prev) => !prev);
        playChime();
        burstSparkles(handleBody.position.x, handleBody.position.y);
        window.dispatchEvent(new CustomEvent("open:converge-modal"));
        if (typeof navigator !== "undefined" && navigator.vibrate) {
          navigator.vibrate(15);
        }
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!isDragging) return;
      isDragging = false;
      handleElm.classList.remove("is-grabbing");
      try {
        handleElm.releasePointerCapture(e.pointerId);
      } catch {
        // Pointer capture release fallback
      }

      mouseConstraint.stiffness = 0.0000000001;

      // If clicked without significant drag, apply a physical impulse and toggle
      if (dragDistanceTotal < 6) {
        Matter.Body.applyForce(handleBody, handleBody.position, {
          x: (Math.random() - 0.5) * 0.02,
          y: 0.05,
        });
        setIsRadiant((prev) => !prev);
        playChime();
        burstSparkles(handleBody.position.x, handleBody.position.y);
        window.dispatchEvent(new CustomEvent("open:converge-modal"));
      }
    };

    handleElm.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);

    // Animation Loop
    let time = 0;
    const render = () => {
      animFrameId = requestAnimationFrame(render);
      time += 1;

      // Micro ambient palace breeze when idle
      if (!isDragging) {
        const breeze = Math.sin(time * 0.022) * 0.00018;
        Matter.Body.applyForce(handleBody, handleBody.position, {
          x: breeze,
          y: 0,
        });
      }

      Matter.Engine.update(engine, 1000 / 60);

      // Construct smooth rope path
      const bodies = rope.bodies;
      let pathD = `M ${anchorX} ${anchorY}`;

      for (let i = 0; i < bodies.length; i++) {
        const b = bodies[i];
        if (i === 0) {
          pathD += ` L ${b.position.x} ${b.position.y}`;
        } else {
          const prev = bodies[i - 1];
          const cx = (prev.position.x + b.position.x) / 2;
          const cy = (prev.position.y + b.position.y) / 2;
          pathD += ` Q ${prev.position.x} ${prev.position.y} ${cx} ${cy}`;
        }
      }
      pathD += ` L ${handleBody.position.x} ${handleBody.position.y}`;
      pathElm.setAttribute("d", pathD);

      // Position and rotate each chain link between bodies
      const linkDoms = linkRefs.current;
      for (let i = 0; i < linkDoms.length && i < bodies.length - 1; i++) {
        const el = linkDoms[i];
        if (!el) continue;
        const p1 = bodies[i].position;
        const p2 = bodies[i + 1].position;
        const mx = (p1.x + p2.x) / 2;
        const my = (p1.y + p2.y) / 2;
        const angleRad = Math.atan2(p2.y - p1.y, p2.x - p1.x);
        const deg = (angleRad * 180) / Math.PI + 90;

        el.setAttribute(
          "transform",
          `translate(${mx}, ${my}) rotate(${deg})`
        );
      }

      // Position and tilt lantern handle
      const hx = handleBody.position.x;
      const hy = handleBody.position.y;
      const prevBody = bodies[bodies.length - 2];
      const segmentAngle = Math.atan2(
        hx - prevBody.position.x,
        hy - prevBody.position.y
      );
      const tiltDeg = -segmentAngle * (180 / Math.PI) * 0.65;

      // Top suspension ring is at (19, 4) in the 38x90 lantern
      handleElm.style.transform = `translate3d(${hx - 19}px, ${hy - 4}px, 0) rotate(${tiltDeg}deg)`;
    };

    animFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrameId);
      handleElm.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      Matter.World.clear(engine.world, false);
      Matter.Engine.clear(engine);
    };
  }, [burstSparkles, playChime]);

  return (
    <div
      ref={containerRef}
      className={`rope-lantern-wrap ${isRadiant ? "is-radiant" : ""}`}
      title="Pull to toggle glow"
    >
      <div ref={stageRef} className="rope-lantern-stage" aria-hidden="true">
        <svg
          className="rope-lantern-svg"
          viewBox="0 0 160 340"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Golden Metallic Linear Gradient for Chain */}
            <linearGradient id="lanternGoldGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fff8db" />
              <stop offset="25%" stopColor="#f7c844" />
              <stop offset="60%" stopColor="#e59516" />
              <stop offset="90%" stopColor="#b36200" />
              <stop offset="100%" stopColor="#683400" />
            </linearGradient>

            <linearGradient id="lanternGoldSideGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ffd868" />
              <stop offset="35%" stopColor="#fff5d1" />
              <stop offset="70%" stopColor="#e59c1c" />
              <stop offset="100%" stopColor="#7a3d00" />
            </linearGradient>

            {/* Underlying golden rope gradient */}
            <linearGradient id="lanternUnderRope" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f3c648" />
              <stop offset="50%" stopColor="#e59918" />
              <stop offset="100%" stopColor="#b86d06" />
            </linearGradient>

            {/* Ceiling Rosette Mount Gradient */}
            <radialGradient id="ceilingMountGrad" cx="50%" cy="30%" r="50%">
              <stop offset="0%" stopColor="#fff8de" />
              <stop offset="45%" stopColor="#f5c23a" />
              <stop offset="85%" stopColor="#a35d03" />
            </radialGradient>
          </defs>

          {/* Ceiling Mount Ring & Bracket */}
          <g transform="translate(80, 2)">
            <ellipse
              cx="0"
              cy="0"
              rx="7"
              ry="2.8"
              fill="url(#ceilingMountGrad)"
              stroke="#683400"
              strokeWidth="0.8"
            />
            <circle
              cx="0"
              cy="2.8"
              r="3.2"
              fill="none"
              stroke="url(#lanternGoldGrad)"
              strokeWidth="1.6"
            />
          </g>

          {/* Smooth Underlying Golden Core Spline */}
          <path
            ref={pathRef}
            fill="none"
            stroke="url(#lanternUnderRope)"
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          {/* Interlocking Golden Chain Links (React declarative) */}
          <g>
            {[0, 1, 2, 3].map((i) => (
              <g
                key={i}
                ref={(el) => {
                  linkRefs.current[i] = el;
                }}
              >
                {i % 2 === 0 ? (
                  <>
                    <ellipse
                      rx="3.4"
                      ry="5.6"
                      fill="url(#lanternGoldGrad)"
                      stroke="#6d3e00"
                      strokeWidth="0.75"
                    />
                    <ellipse
                      rx="1.4"
                      ry="2.8"
                      fill="#1c1103"
                      opacity="0.7"
                    />
                    <path
                      d="M -1.8 -3.5 A 2.5 4.5 0 0 1 1.8 -3.5"
                      fill="none"
                      stroke="#fff9de"
                      strokeWidth="0.8"
                      opacity="0.85"
                    />
                  </>
                ) : (
                  <>
                    <rect
                      x="-1.8"
                      y="-5.2"
                      width="3.6"
                      height="10.4"
                      rx="1.8"
                      fill="url(#lanternGoldSideGrad)"
                      stroke="#5e3400"
                      strokeWidth="0.65"
                    />
                    <line
                      x1="0"
                      y1="-3.5"
                      x2="0"
                      y2="3.5"
                      stroke="#fffaea"
                      strokeWidth="0.9"
                      opacity="0.9"
                    />
                  </>
                )}
              </g>
            ))}
          </g>
        </svg>

        {/* Draggable Lantern Handle */}
        <div
          ref={handleRef}
          className="rope-lantern-handle"
          role="button"
          tabIndex={0}
          aria-label="Interactive Golden Chain Lantern. Pull to toggle illumination."
        >
          {/* Ambient Glowing Aura */}
          <div className="rope-lantern-aura" />

          {/* Radiant Core Glow Center */}
          <div className="rope-lantern-core-glow" />

          {/* High-Resolution Symmetrical Lantern Image with Filigree & Tassel */}
          <img
            src="/assets/lantern.png"
            alt="Golden Lantern"
            className="rope-lantern-img"
            draggable={false}
          />

          {/* Particle Burst Elements */}
          {sparkles.map((sp) => (
            <span
              key={sp.id}
              className="rope-sparkle-mote"
              style={
                {
                  "--tx": `${sp.tx}px`,
                  "--ty": `${sp.ty}px`,
                } as React.CSSProperties
              }
            >
              {sp.char}
            </span>
          ))}

          {/* Interactive Tooltip Badge */}
          <span className="rope-lantern-tooltip">
            <span>Pull</span>
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M12 5v14M19 12l-7 7-7-7"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}
