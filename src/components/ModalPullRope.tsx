"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";

interface ModalPullRopeProps {
  onPullClose: () => void;
  isModalVisible: boolean;
}

export default function ModalPullRope({
  onPullClose,
  isModalVisible,
}: ModalPullRopeProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const handleRef = useRef<SVGGElement | null>(null);
  const arrowRef = useRef<HTMLDivElement | null>(null);

  // Drag & Spring state
  const isDraggingRef = useRef(false);
  const startYRef = useRef(0);
  const startXRef = useRef(0);
  const dragDistYRef = useRef(0);
  const dragDistXRef = useRef(0);

  // Short rope dimensions (resting cord is ~46px, handle at y = 52px)
  const restingLength = 52;
  const anchorX = 22;
  const anchorY = 4;

  // Animated coordinates
  const currentYRef = useRef(restingLength);
  const currentXRef = useRef(anchorX);
  const targetYRef = useRef(restingLength);
  const targetXRef = useRef(anchorX);
  const velocityYRef = useRef(0);
  const velocityXRef = useRef(0);

  const [isPulling, setIsPulling] = useState(false);
  const [willTrigger, setWillTrigger] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [sparkles, setSparkles] = useState<
    { id: number; x: number; y: number; tx: number; ty: number; char: string }[]
  >([]);

  // Trigger spark burst around the pull ring
  const triggerSparkles = useCallback((x: number, y: number) => {
    const chars = ["✦", "✧", "⋆", "•", "✨"];
    const count = 8;
    const items = [];
    const baseId = Date.now();
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
      const dist = 14 + Math.random() * 20;
      items.push({
        id: baseId + i,
        x,
        y,
        tx: Math.cos(angle) * dist,
        ty: Math.sin(angle) * dist,
        char: chars[Math.floor(Math.random() * chars.length)],
      });
    }
    setSparkles(items);
    setTimeout(() => {
      setSparkles([]);
    }, 700);
  }, []);

  // Execute smooth modal close
  const executeClose = useCallback(() => {
    if (hasTriggered) return;
    setHasTriggered(true);
    triggerSparkles(currentXRef.current, currentYRef.current);

    // Snap rope upward with spring
    velocityYRef.current = -14;
    targetYRef.current = restingLength - 15;

    // Trigger parent close
    setTimeout(() => {
      onPullClose();
    }, 120);
  }, [hasTriggered, onPullClose, triggerSparkles, restingLength]);

  // Main 60fps spring simulation loop
  useEffect(() => {
    let animId: number;
    let time = 0;

    const update = () => {
      time += 0.04;

      if (!isDraggingRef.current && !hasTriggered) {
        // Natural subtle ambient breeze sway when idle
        const idleSwayX = Math.sin(time) * 1.5;
        targetXRef.current = anchorX + idleSwayX;
        targetYRef.current = restingLength;
      }

      // Spring physics toward target
      const k = 0.22; // stiffness
      const damping = 0.74; // friction

      const forceY = (targetYRef.current - currentYRef.current) * k;
      velocityYRef.current = (velocityYRef.current + forceY) * damping;
      currentYRef.current += velocityYRef.current;

      const forceX = (targetXRef.current - currentXRef.current) * k;
      velocityXRef.current = (velocityXRef.current + forceX) * damping;
      currentXRef.current += velocityXRef.current;

      const curX = currentXRef.current;
      const curY = currentYRef.current;

      // Update SVG Path with realistic tension curve
      if (pathRef.current) {
        const midX = anchorX + (curX - anchorX) * 0.4;
        const midY = anchorY + (curY - anchorY) * 0.5;
        pathRef.current.setAttribute(
          "d",
          `M ${anchorX},${anchorY} Q ${midX},${midY} ${curX},${curY}`
        );
      }

      // Update Handle Position
      if (handleRef.current) {
        handleRef.current.setAttribute(
          "transform",
          `translate(${curX}, ${curY})`
        );
      }

      // Update downward hover arrow position beside handle
      if (arrowRef.current) {
        arrowRef.current.style.transform = `translate3d(0, ${curY - 10}px, 0)`;
      }

      animId = requestAnimationFrame(update);
    };

    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, [restingLength, anchorX, anchorY, hasTriggered]);

  // Pointer drag handling (mouse & touch)
  const handlePointerDown = (clientX: number, clientY: number) => {
    if (hasTriggered) return;
    isDraggingRef.current = true;
    setIsPulling(true);
    startYRef.current = clientY;
    startXRef.current = clientX;
    dragDistYRef.current = 0;
    dragDistXRef.current = 0;
  };

  const handlePointerMove = (clientX: number, clientY: number) => {
    if (!isDraggingRef.current || hasTriggered) return;
    const dy = clientY - startYRef.current;
    const dx = clientX - startXRef.current;
    dragDistYRef.current = dy;
    dragDistXRef.current = dx;

    // Elastic pull resistance: downward pull is damped
    const clampedY = dy > 0 ? Math.min(42, dy * 0.65) : dy * 0.2;
    const clampedX = Math.max(-14, Math.min(14, dx * 0.2));

    targetYRef.current = restingLength + clampedY;
    targetXRef.current = anchorX + clampedX;

    if (clampedY >= 20) {
      setWillTrigger(true);
    } else {
      setWillTrigger(false);
    }
  };

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsPulling(false);

    if (dragDistYRef.current >= 18 || willTrigger) {
      executeClose();
    } else if (Math.abs(dragDistYRef.current) < 5) {
      // Tap / click without drag: play automatic smooth pull snap & close
      targetYRef.current = restingLength + 28;
      setTimeout(() => {
        executeClose();
      }, 120);
    } else {
      // Spring back to resting position
      targetYRef.current = restingLength;
      targetXRef.current = anchorX;
      setWillTrigger(false);
    }
  };

  // Bind window listeners during drag so dragging never drops outside bounds
  useEffect(() => {
    if (!isPulling) return;

    const onMouseMove = (e: MouseEvent) => {
      handlePointerMove(e.clientX, e.clientY);
    };

    const onMouseUp = () => {
      handlePointerUp();
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onTouchEnd = () => {
      handlePointerUp();
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [isPulling, willTrigger, executeClose]);

  // Reset state when modal visibility toggles
  useEffect(() => {
    if (isModalVisible) {
      setHasTriggered(false);
      setWillTrigger(false);
      setIsPulling(false);
      currentYRef.current = restingLength;
      targetYRef.current = restingLength;
      velocityYRef.current = 0;
    }
  }, [isModalVisible, restingLength]);

  return (
    <div
      ref={containerRef}
      className={`modal-pull-rope-root ${isPulling ? "is-pulling" : ""} ${
        willTrigger ? "will-trigger" : ""
      }`}
      aria-label="Interactive pull rope to close Diwali modal"
    >
      {/* SVG Canvas for Short Rope Cord & Ornate Golden Pull Handle */}
      <svg
        className="modal-pull-rope-svg"
        viewBox="0 0 44 140"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Metallic Gold Rope Gradients */}
          <linearGradient id="ropeGradShort" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#b8860b" />
            <stop offset="30%" stopColor="#ffd700" />
            <stop offset="65%" stopColor="#fff3a8" />
            <stop offset="85%" stopColor="#daa520" />
            <stop offset="100%" stopColor="#8b6508" />
          </linearGradient>

          <linearGradient id="brassGradShort" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffe58f" />
            <stop offset="30%" stopColor="#ffd700" />
            <stop offset="70%" stopColor="#d48806" />
            <stop offset="100%" stopColor="#874d00" />
          </linearGradient>

          <linearGradient id="ringShineShort" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="35%" stopColor="#ffe58f" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#d48806" stopOpacity="0" />
          </linearGradient>

          <filter id="ropeGlowShort" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow
              dx="0"
              dy="2"
              stdDeviation="2"
              floodColor="#ffb300"
              floodOpacity="0.45"
            />
          </filter>

          <filter id="ringGlowShort" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow
              dx="0"
              dy="3"
              stdDeviation="4"
              floodColor="#ffaa00"
              floodOpacity="0.6"
            />
          </filter>
        </defs>

        {/* 1. BOTTOM RIM ATTACHMENT ESCUTCHEON CLAMP */}
        <g className="rope-ceiling-mount">
          <rect
            x="12"
            y="0"
            width="20"
            height="7"
            rx="2"
            fill="url(#brassGradShort)"
            stroke="#fff1b8"
            strokeWidth="0.8"
          />
          <circle cx="22" cy="5" r="2.2" fill="#5c3800" />
          <circle cx="22" cy="5" r="1.4" fill="#ffd700" />
        </g>

        {/* 2. SHORT DYNAMIC ROPE CORD */}
        <path
          ref={pathRef}
          d={`M 22,4 Q 22,28 22,52`}
          fill="none"
          stroke="url(#ropeGradShort)"
          strokeWidth="3.2"
          strokeLinecap="round"
          filter="url(#ropeGlowShort)"
        />

        {/* Textured Rope Twist Overlay */}
        <path
          d={`M 22,4 Q 22,28 22,52`}
          fill="none"
          stroke="#fff9c4"
          strokeWidth="1"
          strokeDasharray="2.5 3"
          strokeOpacity="0.65"
        />

        {/* 3. INTERACTIVE GOLDEN PULL HANDLE */}
        <g
          ref={handleRef}
          transform={`translate(22, 52)`}
          className="rope-pull-handle"
          onMouseDown={(e) => {
            e.preventDefault();
            handlePointerDown(e.clientX, e.clientY);
          }}
          onTouchStart={(e) => {
            if (e.touches[0]) {
              handlePointerDown(e.touches[0].clientX, e.touches[0].clientY);
            }
          }}
          tabIndex={0}
          role="button"
          aria-label="Pull short rope to close Diwali offer modal"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              executeClose();
            }
          }}
        >
          {/* Brass Collar Ferrule */}
          <rect
            x="-6"
            y="-3.5"
            width="12"
            height="6"
            rx="1.5"
            fill="url(#brassGradShort)"
            stroke="#ffe58f"
            strokeWidth="0.7"
          />
          <circle cx="0" cy="0" r="1.2" fill="#874d00" />

          {/* Solid Metallic Pull Ring (compact 24px) */}
          <g filter="url(#ringGlowShort)">
            {/* Outer Ring */}
            <circle
              cx="0"
              cy="16"
              r="13.5"
              fill="url(#brassGradShort)"
              stroke="#fff9c4"
              strokeWidth="1.2"
            />
            {/* Inner Cutout */}
            <circle
              cx="0"
              cy="16"
              r="7.5"
              fill="#080910"
              stroke="#d48806"
              strokeWidth="1"
            />
            {/* Top Gloss Arc */}
            <path
              d="M -10,11 A 13 13 0 0 1 10,11"
              fill="none"
              stroke="url(#ringShineShort)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Center Gem Motif */}
            <circle cx="0" cy="16" r="3.2" fill="#ffb300" />
            <circle cx="0" cy="16" r="1.6" fill="#fff9c4" />
          </g>

          {/* Golden Silk Tassel (compact 20px) */}
          <g transform="translate(0, 30)">
            {/* Tassel Cap */}
            <path
              d="M -5,0 Q 0,-1.5 5,0 L 4,4 Q 0,3 -4,4 Z"
              fill="url(#brassGradShort)"
              stroke="#fff9c4"
              strokeWidth="0.5"
            />
            {/* Silk Strands */}
            <path
              d="M -4,4 Q -6,14 -8,20"
              stroke="#ffd700"
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M -1.5,4 Q -2,15 -3,22"
              stroke="#ffe082"
              strokeWidth="1.2"
              fill="none"
            />
            <path
              d="M 0,4 L 0,23"
              stroke="#fff9c4"
              strokeWidth="1.4"
              fill="none"
            />
            <path
              d="M 1.5,4 Q 2,15 3,22"
              stroke="#ffe082"
              strokeWidth="1.2"
              fill="none"
            />
            <path
              d="M 4,4 Q 6,14 8,20"
              stroke="#ffd700"
              strokeWidth="1"
              fill="none"
            />
          </g>
        </g>
      </svg>

      {/* Floating Sparkles on Trigger */}
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="rope-sparkle"
          style={
            {
              "--tx": `${s.tx}px`,
              "--ty": `${s.ty}px`,
              left: `${s.x}px`,
              top: `${s.y}px`,
            } as React.CSSProperties
          }
        >
          {s.char}
        </span>
      ))}

      {/* Small downward arrow displayed beside the rope when hovered */}
      <div
        ref={arrowRef}
        className="rope-hover-down-arrow"
        aria-hidden="true"
        title="Pull down to close"
        onClick={() => {
          targetYRef.current = restingLength + 28;
          setTimeout(executeClose, 120);
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="3" x2="12" y2="21" />
          <polyline points="5 14 12 21 19 14" />
        </svg>
      </div>
    </div>
  );
}
