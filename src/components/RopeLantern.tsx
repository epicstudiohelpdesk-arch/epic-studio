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
  const burstSparkles = useCallback(() => {
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
    // Lantern is strictly hidden on mobile screens (display: none !important via CSS);
    // skip entire Matter.js physics engine setup and 60fps loop on mobile to preserve CPU & memory.
    if (typeof window !== "undefined" && window.innerWidth <= 768) {
      return;
    }

    const stage = stageRef.current;
    const pathElm = pathRef.current;
    const handleElm = handleRef.current;
    if (!stage || !pathElm || !handleElm) return;

    // Dimensions & Geometry
    const stageWidth = 160;
    const anchorX = 80;
    const anchorY = 2;
    const linkCount = 6;
    const linkSpacing = 8.5;

    // Create Matter Engine with high numerical stability (zero constraint shudder)
    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 0.98, scale: 0.001 },
      constraintIterations: 8,
      positionIterations: 8,
      velocityIterations: 8,
    });

    const ropeGroup = Matter.Body.nextGroup(true);

    // Create Chain Bodies with realistic mass and low air resistance for genuine pendulum physics
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
          frictionAir: 0.007,
          mass: 0.14,
        });
      }
    );

    // Chain constraints: low internal link damping allows natural catenary flexing and swinging
    Matter.Composites.chain(rope, 0, 0.45, 0, -0.45, {
      stiffness: 0.97,
      damping: 0.06,
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
      stiffness: 0.98,
      damping: 0.08,
      length: 0,
    });

    // The Handle: bottom body with weighted physical inertia
    const handleBody = rope.bodies[rope.bodies.length - 1];
    Matter.Body.setMass(handleBody, 3.0);
    handleBody.frictionAir = 0.009;

    // Mouse / drag constraint with smooth elastic spring
    const restHandleY = anchorY + linkCount * linkSpacing;
    const mouseConstraint = Matter.Constraint.create({
      pointA: { x: anchorX, y: restHandleY },
      bodyB: handleBody,
      pointB: { x: 0, y: 0 },
      stiffness: 0.0000000001,
      damping: 0.35,
      length: 0,
    });

    Matter.World.add(engine.world, [anchor, rope, fixToAnchor, mouseConstraint]);

    // Drag interaction & momentum tracking
    let isDragging = false;
    let pointerStartX = 0;
    let pointerStartY = 0;
    let hasTriggeredPull = false;
    let dragDistanceTotal = 0;
    let animFrameId: number | null = null;
    let isSleeping = false;
    let stillFrames = 0;

    let lastPointerX = 0;
    let lastPointerY = 0;
    let pointerVelX = 0;
    let pointerVelY = 0;
    let lastPointerTime = 0;
    let currentTilt = 0;

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
      wakeUp();
      handleElm.setPointerCapture(e.pointerId);
      isDragging = true;
      hasTriggeredPull = false;
      dragDistanceTotal = 0;
      pointerStartX = e.clientX;
      pointerStartY = e.clientY;
      lastPointerX = e.clientX;
      lastPointerY = e.clientY;
      pointerVelX = 0;
      pointerVelY = 0;
      lastPointerTime = performance.now();

      const coords = getStageCoords(e);
      mouseConstraint.pointA = { x: coords.x, y: coords.y };
      mouseConstraint.stiffness = 0.42;
      mouseConstraint.damping = 0.32;

      handleElm.classList.add("is-grabbing");
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;

      const now = performance.now();
      const dt = Math.max(1, now - lastPointerTime);
      const rawVx = (e.clientX - lastPointerX) / dt;
      const rawVy = (e.clientY - lastPointerY) / dt;
      pointerVelX = pointerVelX * 0.3 + rawVx * 0.7;
      pointerVelY = pointerVelY * 0.3 + rawVy * 0.7;
      lastPointerX = e.clientX;
      lastPointerY = e.clientY;
      lastPointerTime = now;

      const deltaX = e.clientX - pointerStartX;
      const deltaY = e.clientY - pointerStartY;
      dragDistanceTotal = Math.hypot(deltaX, deltaY);

      const coords = getStageCoords(e);

      // Smooth elastic pull kinematics with natural 2D freedom
      const rawDeltaX = coords.x - anchorX;
      const rawDeltaY = coords.y - restHandleY;

      // Soft exponential resistance curve:
      // Lateral freedom: allows graceful swings up to 60px sideways
      const maxPullX = 60;
      const dampedDeltaX =
        Math.sign(rawDeltaX) *
        maxPullX *
        (1 - Math.exp(-Math.abs(rawDeltaX) / 44));

      // Vertical freedom: downward pull up to 52px, gentle upward push resistance up to -14px
      let dampedDeltaY = 0;
      if (rawDeltaY >= 0) {
        const maxPullY = 52;
        dampedDeltaY = maxPullY * (1 - Math.exp(-rawDeltaY / 32));
      } else {
        dampedDeltaY = -14 * (1 - Math.exp(rawDeltaY / 20));
      }

      mouseConstraint.pointA = {
        x: anchorX + dampedDeltaX,
        y: restHandleY + dampedDeltaY,
      };

      // Intentional pull threshold (smooth trigger)
      if (dampedDeltaY > 26 && !hasTriggeredPull) {
        hasTriggeredPull = true;
        setIsRadiant((prev) => !prev);
        playChime();
        burstSparkles();
        window.dispatchEvent(new CustomEvent("open:converge-modal"));
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

      // Detach mouse constraint
      mouseConstraint.stiffness = 0.0000000001;

      // Current displacement from rest position
      const dispX = handleBody.position.x - anchorX;
      const dispY = handleBody.position.y - restHandleY;

      // Case 1: Click / tap with minimal drag -> gentle, playful pendulum kick
      if (dragDistanceTotal < 6) {
        const clickDirection = Math.random() > 0.5 ? 1 : -1;
        const clickForceX = clickDirection * (0.024 + Math.random() * 0.012);
        Matter.Body.applyForce(handleBody, handleBody.position, {
          x: clickForceX,
          y: 0.012,
        });
        setIsRadiant((prev) => !prev);
        playChime();
        burstSparkles();
        window.dispatchEvent(new CustomEvent("open:converge-modal"));
        return;
      }

      // Case 2: Drag / pull release
      // 1) Carry-over gesture flick momentum
      const gestureForceX = Math.max(-0.045, Math.min(0.045, pointerVelX * 0.024));
      const gestureForceY = Math.max(-0.03, Math.min(0.03, pointerVelY * 0.016));

      // 2) Stored elastic tension swing impulse:
      // When pulled sideways or down, releasing converts tension into natural harmonic pendulum swing
      let swingKickX = 0;
      if (Math.abs(dispX) > 6) {
        // Sideways release: strong harmonic swing back towards center and beyond
        swingKickX = -Math.sign(dispX) * Math.min(0.042, Math.abs(dispX) * 0.001);
      } else if (dispY > 8) {
        // Downward pull release: tension conversion generates an organic pendulum swing
        const randomDir = Math.random() > 0.5 ? 1 : -1;
        swingKickX = randomDir * Math.min(0.038, 0.016 + (dispY / 44) * 0.022);
      }

      Matter.Body.applyForce(handleBody, handleBody.position, {
        x: swingKickX + gestureForceX,
        y: gestureForceY,
      });
    };

    handleElm.addEventListener("pointerdown", onPointerDown);
    handleElm.addEventListener("pointerenter", wakeUp);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);

    // Animation Loop with zero-overhead idle sleep during scrolling
    let time = 0;

    function wakeUp() {
      stillFrames = 0;
      if (isSleeping || !animFrameId) {
        isSleeping = false;
        if (!animFrameId) {
          animFrameId = requestAnimationFrame(render);
        }
      }
    }

    const render = () => {
      if (typeof document !== "undefined" && document.hidden) {
        animFrameId = null;
        return;
      }

      time += 1;
      const bodies = rope.bodies;

      // Track settling when user is not dragging
      if (!isDragging) {
        const velX = handleBody.velocity.x;
        const velY = handleBody.velocity.y;
        const dispX = Math.abs(handleBody.position.x - anchorX);
        const dispY = Math.abs(handleBody.position.y - restHandleY);

        if (
          Math.abs(velX) < 0.08 &&
          Math.abs(velY) < 0.08 &&
          dispX < 0.8 &&
          dispY < 0.8
        ) {
          stillFrames++;
        } else {
          stillFrames = 0;
        }

        // Micro ambient room breeze when idle and active
        if (stillFrames < 40) {
          const breeze =
            (Math.sin(time * 0.018) * 0.000035 +
             Math.sin(time * 0.031) * 0.00002);
          Matter.Body.applyForce(handleBody, handleBody.position, {
            x: breeze,
            y: 0,
          });
        }
      }

      Matter.Engine.update(engine, 1000 / 60);

      // Once settled for 60 frames (~1 sec resting still), enter sleep mode to save 100% CPU
      if (!isDragging && stillFrames > 60) {
        for (let i = 0; i < bodies.length; i++) {
          Matter.Body.setPosition(bodies[i], {
            x: anchorX,
            y: anchorY + (i + 1) * linkSpacing,
          });
          Matter.Body.setVelocity(bodies[i], { x: 0, y: 0 });
        }
        currentTilt = 0;
        handleElm.style.transform = `translate3d(${anchorX - 22}px, ${restHandleY - 4}px, 0) rotate(0deg)`;
        pathElm.setAttribute("d", `M ${anchorX} ${anchorY} L ${anchorX} ${restHandleY}`);
        const linkDoms = linkRefs.current;
        for (let i = 0; i < linkDoms.length && i < bodies.length - 1; i++) {
          const el = linkDoms[i];
          if (!el) continue;
          const my = anchorY + (i + 0.5) * linkSpacing;
          el.setAttribute("transform", `translate(${anchorX}, ${my}) rotate(0)`);
        }

        animFrameId = null;
        isSleeping = true;
        return;
      }

      // Construct smooth rope path
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
        const deg = Math.atan2(p2.x - p1.x, p2.y - p1.y) * (180 / Math.PI);

        el.setAttribute(
          "transform",
          `translate(${mx}, ${my}) rotate(${deg})`
        );
      }

      // Position and tilt lantern handle
      const hx = handleBody.position.x;
      const hy = handleBody.position.y;
      const prevBody = bodies[bodies.length - 2];

      // Exact angle of the bottom chain segment connecting to the lantern
      const bottomLinkDeg =
        Math.atan2(hx - prevBody.position.x, hy - prevBody.position.y) *
        (180 / Math.PI);

      // Smooth physical low-pass filter for natural angular inertia during pendulum swings
      currentTilt += (bottomLinkDeg - currentTilt) * 0.24;

      // Top suspension ring is at (22, 4) in the 44x104 lantern
      handleElm.style.transform = `translate3d(${hx - 22}px, ${hy - 4}px, 0) rotate(${currentTilt.toFixed(2)}deg)`;

      animFrameId = requestAnimationFrame(render);
    };

    const handleVisChange = () => {
      if (typeof document !== "undefined" && !document.hidden) {
        wakeUp();
      } else if (animFrameId) {
        cancelAnimationFrame(animFrameId);
        animFrameId = null;
      }
    };
    document.addEventListener("visibilitychange", handleVisChange);
    window.addEventListener("scroll", wakeUp, { passive: true });

    animFrameId = requestAnimationFrame(render);

    return () => {
      if (animFrameId) cancelAnimationFrame(animFrameId);
      document.removeEventListener("visibilitychange", handleVisChange);
      window.removeEventListener("scroll", wakeUp);
      handleElm.removeEventListener("pointerdown", onPointerDown);
      handleElm.removeEventListener("pointerenter", wakeUp);
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
            {[0, 1, 2, 3, 4].map((i) => (
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
