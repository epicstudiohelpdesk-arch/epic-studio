"use client";

import React, { useEffect, useRef, useCallback } from "react";
import CrackerStationArt, { CrackerStationHandle } from "./CrackerStationArt";
import "./diwali-fireworks.css";

// Flying sky rocket types matching images.jpeg
interface FlyingRocket {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  type: number; // 0: blue-star, 1: purple-polka, 2: crimson-chevron
  isFlyAway: boolean;
  targetX?: number;
  targetY?: number;
  life: number;
  maxLife: number;
  wobblePhase: number;
  exhaustParticles: TrailParticle[];
}

interface TrailParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
  color: string;
}

// Burst particle types matching new-year-s-night-...webp
interface StarburstSpoke {
  x: number;
  y: number;
  angle: number;
  length: number;
  maxLength: number;
  speed: number;
  alpha: number;
  color: string;
  spokeTip: string;
}

interface SparkParticle {
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  vx: number;
  vy: number;
  alpha: number;
  decay: number;
  size: number;
  color: string;
  gravity: number;
  flicker: boolean;
}

interface FlashCore {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
}

interface StationFountainSpark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
}

// State for each of the 3 cracker cylinders
interface BarrelSlot {
  offset: number; // 0.30, 0.49, 0.59
  angleDeg: number; // -16, -4, 32
  state: "loaded" | "igniting" | "launching" | "empty" | "reloading";
  rocketType: number; // 0: Blue, 1: Purple, 2: Crimson
  yOffset: number; // 0 when resting loaded, negative when launching, positive transitioning to 0 on reload
  launchSpeed: number;
}

const ROCKET_SRCS = [
  "/assets/rocket-blue.png",
  "/assets/rocket-purple.png",
  "/assets/rocket-crimson.png",
];

// Vibrant festive burst palettes inspired by reference image
const BURST_PALETTES = [
  {
    spokes: "#FFE066",
    spokeTip: "#76FF03",
    sparks: ["#FFD700", "#FFC107", "#FFA000", "#FFE082", "#FFFFFF"],
    core: "#FFFFFF",
  },
  {
    spokes: "#E040FB",
    spokeTip: "#FFD700",
    sparks: ["#E040FB", "#7C4DFF", "#FF4081", "#FFD700", "#FFFFFF"],
    core: "#FF80AB",
  },
  {
    spokes: "#00E5FF",
    spokeTip: "#FFEA00",
    sparks: ["#00E5FF", "#00E676", "#1DE9B6", "#FFEB3B", "#FFFFFF"],
    core: "#84FFFF",
  },
  {
    spokes: "#FF3D00",
    spokeTip: "#FFD700",
    sparks: ["#FF1744", "#FF5252", "#FF9100", "#FFEA00", "#FFF176"],
    core: "#FF8A80",
  },
  {
    spokes: "#FFEB3B",
    spokeTip: "#00E5FF",
    sparks: ["#FF1744", "#00E676", "#00E5FF", "#E040FB", "#FFD700"],
    core: "#FFFFFF",
  },
];

export default function DiwaliFireworks() {
  const overlayCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const stationCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const stationRef = useRef<HTMLDivElement | null>(null);
  const crackerArtRef = useRef<CrackerStationHandle | null>(null);

  // Preloaded rocket images for sky flight
  const rocketImagesRef = useRef<HTMLImageElement[]>([]);

  // Active sky animation elements
  const rocketsRef = useRef<FlyingRocket[]>([]);
  const starburstSpokesRef = useRef<StarburstSpoke[]>([]);
  const sparkParticlesRef = useRef<SparkParticle[]>([]);
  const flashCoresRef = useRef<FlashCore[]>([]);
  const fountainSparksRef = useRef<StationFountainSpark[]>([]);

  // The 3 Cracker Barrels state: Left (-16°), Center (-4°), Right (+32°)
  const barrelsRef = useRef<BarrelSlot[]>([
    {
      offset: 0.3,
      angleDeg: -16,
      state: "loaded",
      rocketType: 1, // Purple Polka
      yOffset: 0,
      launchSpeed: 4.0,
    },
    {
      offset: 0.49,
      angleDeg: -4,
      state: "loaded",
      rocketType: 0, // Blue Star
      yOffset: 0,
      launchSpeed: 4.0,
    },
    {
      offset: 0.59,
      angleDeg: 32,
      state: "loaded",
      rocketType: 2, // Crimson Chevron
      yOffset: 0,
      launchSpeed: 4.0,
    },
  ]);

  // Wave Sequencer state: "2-3 then 2 then 4 then 3 then 5 then 1 etc one after another with milliseconds pause"
  const wavePatternRef = useRef<number[]>([3, 2, 4, 3, 5, 1]);
  const waveIndexRef = useRef<number>(0);
  const waveTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isComponentMounted = useRef<boolean>(true);

  // Trigger starburst explosion in the hero background
  const triggerBurst = useCallback((burstX: number, burstY: number) => {
    const palette =
      BURST_PALETTES[Math.floor(Math.random() * BURST_PALETTES.length)];

    // 1. Central flash core
    flashCoresRef.current.push({
      x: burstX,
      y: burstY,
      radius: 3,
      maxRadius: 34 + Math.random() * 16,
      alpha: 1.0,
      color: palette.core,
    });

    // 2. Radial Geometric Starburst Spokes
    const spokeCount = 20 + Math.floor(Math.random() * 8);
    const spokeMaxLen = 95 + Math.random() * 55;
    for (let i = 0; i < spokeCount; i++) {
      const angle =
        (i / spokeCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.06;
      starburstSpokesRef.current.push({
        x: burstX,
        y: burstY,
        angle,
        length: 0,
        maxLength: spokeMaxLen * (0.88 + Math.random() * 0.25),
        speed: 5.6 + Math.random() * 3.0,
        alpha: 1.0,
        color: palette.spokes,
        spokeTip: palette.spokeTip,
      });
    }

    // 3. Chrysanthemum / Peony needle sparks
    const sparkCount = 75 + Math.floor(Math.random() * 35);
    for (let i = 0; i < sparkCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 4.2 + Math.random() * 9.5;
      const color =
        palette.sparks[Math.floor(Math.random() * palette.sparks.length)];

      sparkParticlesRef.current.push({
        x: burstX,
        y: burstY,
        prevX: burstX,
        prevY: burstY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1.0,
        decay: 0.015 + Math.random() * 0.014,
        size: 2.0 + Math.random() * 1.6,
        color,
        gravity: 0.052,
        flicker: false,
      });
    }

    // 4. Willow / Kamuro Falling Golden Glitter
    const glitterCount = 35 + Math.floor(Math.random() * 20);
    for (let i = 0; i < glitterCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.2 + Math.random() * 5.0;
      sparkParticlesRef.current.push({
        x: burstX,
        y: burstY,
        prevX: burstX,
        prevY: burstY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed + 0.6,
        alpha: 1.0,
        decay: 0.008 + Math.random() * 0.007,
        size: 1.5 + Math.random() * 1.3,
        color: "#FFD700",
        gravity: 0.075 + Math.random() * 0.04,
        flicker: true,
      });
    }

    // Secondary flower shell (25% chance)
    if (Math.random() < 0.25) {
      setTimeout(() => {
        if (!isComponentMounted.current) return;
        const secX = burstX + (Math.random() - 0.5) * 45;
        const secY = burstY + (Math.random() - 0.5) * 35;
        const secPal =
          BURST_PALETTES[Math.floor(Math.random() * BURST_PALETTES.length)];
        flashCoresRef.current.push({
          x: secX,
          y: secY,
          radius: 2,
          maxRadius: 24,
          alpha: 0.9,
          color: secPal.core,
        });
        for (let s = 0; s < 45; s++) {
          const a = Math.random() * Math.PI * 2;
          const sp = 3.0 + Math.random() * 6.0;
          sparkParticlesRef.current.push({
            x: secX,
            y: secY,
            prevX: secX,
            prevY: secY,
            vx: Math.cos(a) * sp,
            vy: Math.sin(a) * sp,
            alpha: 1.0,
            decay: 0.018 + Math.random() * 0.014,
            size: 1.8,
            color:
              secPal.sparks[Math.floor(Math.random() * secPal.sparks.length)],
            gravity: 0.05,
            flicker: false,
          });
        }
      }, 120);
    }
  }, []);

  // Spawn flying rocket in sky canvas when its guide stick clears the cylinder
  const spawnSkyRocket = useCallback(
    (rocketType: number, barrelIndex: number, barrelAngleDeg: number) => {
      if (!stationRef.current || !overlayCanvasRef.current) return;
      const canvas = overlayCanvasRef.current;
      const parent = canvas.parentElement;
      if (!parent) return;

      const parentRect = parent.getBoundingClientRect();
      const stationRect = stationRef.current.getBoundingClientRect();
      const barrel = barrelsRef.current[barrelIndex];

      const startX =
        stationRect.left - parentRect.left + stationRect.width * barrel.offset;
      // Spawn at the height where the stick clears the top
      const startY =
        stationRect.top - parentRect.top + stationRect.height * 0.15;

      const isFlyAway = Math.random() < 0.35;
      const canvasW = parentRect.width;

      let vx: number;
      let vy: number;
      let targetX: number | undefined;
      let targetY: number | undefined;

      if (isFlyAway) {
        if (Math.random() < 0.65) {
          vx = -12 - Math.random() * 8;
          vy = -14 - Math.random() * 7;
        } else {
          vx = -4 - Math.random() * 6;
          vy = -20 - Math.random() * 6;
        }
      } else {
        const isNavbarLevel = Math.random() < 0.42;
        targetY = isNavbarLevel
          ? 65 + Math.random() * 65
          : 140 + Math.random() * 220;

        targetX = canvasW * (0.15 + Math.random() * 0.58);

        const deltaX = targetX - startX;
        const deltaY = targetY - startY;

        const frames = 48 + Math.random() * 18;
        vx = deltaX / frames;
        vy = deltaY / frames - 0.5 * 0.16 * frames;
      }

      const angle = (barrelAngleDeg * Math.PI) / 180;

      rocketsRef.current.push({
        id: Date.now() + Math.random(),
        x: startX,
        y: startY,
        vx,
        vy,
        angle,
        type: rocketType,
        isFlyAway,
        targetX,
        targetY,
        life: 0,
        maxLife: isFlyAway ? 120 : 80,
        wobblePhase: Math.random() * Math.PI * 2,
        exhaustParticles: [],
      });
    },
    []
  );

  // Trigger reload: a new rocket smoothly rises up from inside the dark barrel cavity
  const startReload = useCallback((barrelIndex: number) => {
    if (!isComponentMounted.current) return;
    const barrel = barrelsRef.current[barrelIndex];
    // Rotate to a new colorful rocket type
    barrel.rocketType =
      (barrel.rocketType + 1 + Math.floor(Math.random() * 2)) % 3;
    barrel.yOffset = 52; // starts deep inside the tube
    barrel.state = "reloading";
    crackerArtRef.current?.setBarrelRocket(
      barrelIndex,
      52,
      true,
      barrel.rocketType
    );
  }, []);

  // Launch a rocket out of a specific cylinder
  const launchRocketFromCylinder = useCallback(
    (targetBarrelIndex?: number) => {
      if (!isComponentMounted.current) return;
      const barrels = barrelsRef.current;

      // Find an available loaded barrel
      let chosenIndex = targetBarrelIndex;
      if (chosenIndex === undefined || barrels[chosenIndex].state !== "loaded") {
        const loadedIndices = barrels
          .map((b, i) => (b.state === "loaded" ? i : -1))
          .filter((i) => i !== -1);

        if (loadedIndices.length > 0) {
          chosenIndex =
            loadedIndices[Math.floor(Math.random() * loadedIndices.length)];
        } else {
          // If all barrels were firing, force immediate load on the least busy barrel
          chosenIndex = Math.floor(Math.random() * 3);
          barrels[chosenIndex].state = "loaded";
          barrels[chosenIndex].yOffset = 0;
        }
      }

      const barrel = barrels[chosenIndex];
      barrel.state = "launching";
      barrel.launchSpeed = 4.2;

      // Ignition muzzle spark flash at the nozzle mouth - clustered behind nozzle rim
      const nozzlePositions = [
        { x: 93, y: 106 },
        { x: 148, y: 84 },
        { x: 173, y: 114 },
      ];
      const noz = nozzlePositions[chosenIndex] || { x: 148, y: 84 };
      for (let f = 0; f < 14; f++) {
        fountainSparksRef.current.push({
          x: noz.x + (Math.random() - 0.5) * 8,
          y: noz.y + Math.random() * 4,
          vx: (Math.random() - 0.5) * 3.6,
          vy: -Math.random() * 3.0 - 1.0,
          alpha: 1.0,
          size: 2.0 + Math.random() * 1.5,
          color: Math.random() > 0.35 ? "#FFE082" : "#FF7043",
          life: 0,
          maxLife: 18 + Math.floor(Math.random() * 12),
        });
      }
    },
    []
  );

  // Execute a wave of rockets with millisecond pause between each
  const triggerRocketWave = useCallback(
    (customCount?: number) => {
      let waveCount = customCount;
      if (waveCount === undefined) {
        const pattern = wavePatternRef.current;
        waveCount = pattern[waveIndexRef.current];
        if (waveIndexRef.current === 0) {
          waveCount = Math.random() > 0.5 ? 2 : 3;
        }
      }

      // Available barrel order
      const barrelOrder = [1, 0, 2]; // Center, Left, Right

      for (let i = 0; i < waveCount; i++) {
        const barrelIdx = barrelOrder[i % 3];
        const delay = i * (90 + Math.random() * 70);
        setTimeout(() => {
          if (isComponentMounted.current) {
            launchRocketFromCylinder(barrelIdx);
          }
        }, delay);
      }

      waveIndexRef.current =
        (waveIndexRef.current + 1) % wavePatternRef.current.length;
    },
    [launchRocketFromCylinder]
  );

  // Periodic automatic wave sequencer
  useEffect(() => {
    isComponentMounted.current = true;

    // Preload rocket images for sky rendering
    ROCKET_SRCS.forEach((src, idx) => {
      const img = new Image();
      img.src = src;
      rocketImagesRef.current[idx] = img;
    });

    // Initialize all 3 barrels with rockets nestled inside
    barrelsRef.current.forEach((b, i) => {
      crackerArtRef.current?.setBarrelRocket(i, 0, true, b.rocketType);
    });

    const scheduleNextWave = () => {
      if (!isComponentMounted.current) return;
      const nextDelay = 2000 + Math.random() * 1000;
      waveTimerRef.current = setTimeout(() => {
        if (!isComponentMounted.current) return;
        triggerRocketWave();
        scheduleNextWave();
      }, nextDelay);
    };

    const initialTimer = setTimeout(() => {
      triggerRocketWave();
      scheduleNextWave();
    }, 900);

    return () => {
      isComponentMounted.current = false;
      clearTimeout(initialTimer);
      if (waveTimerRef.current) clearTimeout(waveTimerRef.current);
    };
  }, [triggerRocketWave]);

  // Main 60fps Animation Loop (Barrel Launches & Sky Flight & Bursts)
  useEffect(() => {
    const canvas = overlayCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrameId: number;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const render = () => {
      const parent = canvas.parentElement;
      const cw = parent ? parent.clientWidth : window.innerWidth;
      const ch = parent ? parent.clientHeight : window.innerHeight;

      ctx.clearRect(0, 0, cw, ch);

      // -----------------------------------------------------------
      // 1. UPDATE BARREL LAUNCH & RELOAD TRANSFORMS IN SVG
      // -----------------------------------------------------------
      barrelsRef.current.forEach((barrel, i) => {
        if (barrel.state === "launching") {
          // Rocket shooting UP out of the inside of the cylinder
          barrel.yOffset -= barrel.launchSpeed;
          barrel.launchSpeed += 1.35; // rapid acceleration

          crackerArtRef.current?.setBarrelRocket(
            i,
            barrel.yOffset,
            true,
            barrel.rocketType
          );

          // Once guide stick clears the top brass nozzle rim:
          if (barrel.yOffset <= -105) {
            barrel.state = "empty";
            crackerArtRef.current?.setBarrelRocket(
              i,
              barrel.yOffset,
              false,
              barrel.rocketType
            );

            // Rocket is now airborne in the sky canvas!
            spawnSkyRocket(barrel.rocketType, i, barrel.angleDeg);

            // Schedule fresh rocket rising from inside the cylinder
            const reloadDelay = 500 + Math.random() * 350;
            setTimeout(() => {
              startReload(i);
            }, reloadDelay);
          }
        } else if (barrel.state === "reloading") {
          // New rocket sliding up from deep inside the tube into view!
          barrel.yOffset = Math.max(0, barrel.yOffset - 2.6);
          crackerArtRef.current?.setBarrelRocket(
            i,
            barrel.yOffset,
            true,
            barrel.rocketType
          );

          if (barrel.yOffset <= 0) {
            barrel.state = "loaded";
          }
        }
      });

      // -----------------------------------------------------------
      // 2. RENDER SKY PARTICLES (Additive lighter blending behind components)
      // -----------------------------------------------------------
      ctx.globalCompositeOperation = "lighter";

      // 2.1 Flash Cores
      for (let i = flashCoresRef.current.length - 1; i >= 0; i--) {
        const core = flashCoresRef.current[i];
        core.radius += (core.maxRadius - core.radius) * 0.35;
        core.alpha -= 0.08;

        if (core.alpha <= 0.01) {
          flashCoresRef.current.splice(i, 1);
          continue;
        }

        const grad = ctx.createRadialGradient(
          core.x,
          core.y,
          0,
          core.x,
          core.y,
          core.radius
        );
        grad.addColorStop(0, `rgba(255, 255, 255, ${core.alpha})`);
        grad.addColorStop(0.4, `rgba(255, 235, 120, ${core.alpha * 0.8})`);
        grad.addColorStop(1, "rgba(255, 180, 0, 0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(core.x, core.y, core.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2.2 Starburst Spokes
      for (let i = starburstSpokesRef.current.length - 1; i >= 0; i--) {
        const spoke = starburstSpokesRef.current[i];
        spoke.length += spoke.speed;
        spoke.speed *= 0.94;
        spoke.alpha -= 0.02;

        if (spoke.alpha <= 0.01 || spoke.length >= spoke.maxLength) {
          starburstSpokesRef.current.splice(i, 1);
          continue;
        }

        const cosA = Math.cos(spoke.angle);
        const sinA = Math.sin(spoke.angle);
        const innerLen = Math.max(0, spoke.length * 0.28);
        const startX = spoke.x + cosA * innerLen;
        const startY = spoke.y + sinA * innerLen;
        const endX = spoke.x + cosA * spoke.length;
        const endY = spoke.y + sinA * spoke.length;

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = spoke.color;
        ctx.globalAlpha = Math.max(0, spoke.alpha);
        ctx.lineWidth = 2.4;
        ctx.lineCap = "round";
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(endX, endY, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = spoke.spokeTip;
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;

      // 2.3 Sparks & Kamuro Golden Glitter
      for (let i = sparkParticlesRef.current.length - 1; i >= 0; i--) {
        const p = sparkParticlesRef.current[i];
        p.prevX = p.x;
        p.prevY = p.y;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.95;
        p.vy *= 0.95;
        p.vy += p.gravity;
        p.alpha -= p.decay;

        if (p.alpha <= 0.01) {
          sparkParticlesRef.current.splice(i, 1);
          continue;
        }

        let renderAlpha = p.alpha;
        if (p.flicker) {
          renderAlpha *= 0.4 + Math.random() * 0.6;
        }

        ctx.beginPath();
        ctx.moveTo(p.prevX, p.prevY);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = p.color;
        ctx.globalAlpha = Math.max(0, renderAlpha);
        ctx.lineWidth = p.size;
        ctx.lineCap = "round";
        ctx.stroke();
      }
      ctx.globalAlpha = 1.0;

      // 2.4 Flying Rockets in Sky & Exhaust Trails
      for (let i = rocketsRef.current.length - 1; i >= 0; i--) {
        const r = rocketsRef.current[i];
        r.life++;
        r.wobblePhase += 0.38;

        const wiggleX = Math.sin(r.wobblePhase) * 1.1;
        r.x += r.vx + wiggleX;
        r.y += r.vy;
        r.vy += 0.16;
        r.angle = Math.atan2(r.vy, r.vx) + Math.PI / 2;

        const tailOffset = 26;
        const tailX = r.x - Math.cos(r.angle - Math.PI / 2) * tailOffset;
        const tailY = r.y - Math.sin(r.angle - Math.PI / 2) * tailOffset;

        for (let t = 0; t < 4; t++) {
          const spread = (Math.random() - 0.5) * 2.8;
          r.exhaustParticles.push({
            x: tailX + spread,
            y: tailY + spread,
            vx: -r.vx * 0.15 + (Math.random() - 0.5) * 2.5,
            vy: -r.vy * 0.15 + Math.random() * 2,
            alpha: 1.0,
            size: 2.5 + Math.random() * 2,
            color: Math.random() > 0.4 ? "#FFD54F" : "#FF5722",
          });
        }

        for (let ep = r.exhaustParticles.length - 1; ep >= 0; ep--) {
          const p = r.exhaustParticles[ep];
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= 0.055;
          p.size *= 0.94;

          if (p.alpha <= 0.02) {
            r.exhaustParticles.splice(ep, 1);
            continue;
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.max(0.5, p.size), 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.fill();
        }
        ctx.globalAlpha = 1.0;

        // Render Rocket Sprite
        const rocketImg = rocketImagesRef.current[r.type];
        if (rocketImg && rocketImg.complete) {
          ctx.save();
          ctx.translate(r.x, r.y);
          ctx.rotate(r.angle);
          const rw = 16;
          const rh = 56;
          ctx.drawImage(rocketImg, -rw / 2, -rh * 0.28, rw, rh);
          ctx.restore();
        }

        // Burst / Off-screen check
        let shouldDetonate = false;

        if (r.isFlyAway) {
          if (r.x < -80 || r.y < -80 || r.x > cw + 80) {
            rocketsRef.current.splice(i, 1);
            continue;
          }
        } else {
          const reachedTargetY = r.targetY !== undefined && r.y <= r.targetY;
          const nearApex = r.vy >= -1.0;

          if (reachedTargetY || nearApex || r.life >= r.maxLife) {
            shouldDetonate = true;
          }
        }

        if (shouldDetonate) {
          triggerBurst(r.x, r.y);
          rocketsRef.current.splice(i, 1);
        }
      }

      ctx.globalCompositeOperation = "source-over";
      animFrameId = requestAnimationFrame(render);
    };

    animFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [triggerBurst, spawnSkyRocket, startReload]);

  // Live Nozzle Spark Fountain on the Station (60fps) - lowered down & slightly behind barrels
  useEffect(() => {
    const canvas = stationCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let fountainAnimId: number;

    const FOUNTAIN_COLORS = [
      "#FFF9C4",
      "#FFE082",
      "#FFD54F",
      "#FFB300",
      "#FF8F00",
      "#FF7043",
      "#FFFFFF",
    ];

    const renderFountain = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "lighter";

      // Canvas dimensions 300 x 230:
      // SVG (280x200) sits at top: 30, left: 10
      // Barrel nozzles in this canvas coordinate space:
      // Left (-16 deg): SVG (83, 76) -> Canvas (93, 106)
      // Center (-4 deg): SVG (138, 54) -> Canvas (148, 84)
      // Right (+32 deg): SVG (163, 84) -> Canvas (173, 114)
      const nozzles = [
        { x: 93, y: 106, dirX: -0.45 },
        { x: 148, y: 84, dirX: -0.1 },
        { x: 173, y: 114, dirX: 0.65 },
      ];

      // Subtle, gentle festive spark emission from behind the nozzles
      nozzles.forEach((noz) => {
        if (Math.random() < 0.52) {
          const maxLife = 24 + Math.floor(Math.random() * 16);
          const color =
            FOUNTAIN_COLORS[Math.floor(Math.random() * FOUNTAIN_COLORS.length)];
          fountainSparksRef.current.push({
            x: noz.x + (Math.random() - 0.5) * 8,
            y: noz.y + Math.random() * 4, // Starts slightly behind nozzle rim
            vx: noz.dirX * (0.6 + Math.random() * 0.9) + (Math.random() - 0.5) * 1.2,
            vy: -Math.random() * 2.2 - 0.9, // Gentle rise: apex is ~20-30px, never reaches top edge
            alpha: 1.0,
            size: 1.4 + Math.random() * 1.4,
            color,
            life: 0,
            maxLife,
          });
        }
      });

      for (let i = fountainSparksRef.current.length - 1; i >= 0; i--) {
        const s = fountainSparksRef.current[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.12; // gentle gravity
        s.vx *= 0.98;
        s.life++;

        // Smooth gradual fade as spark ages
        const lifeProgress = s.life / s.maxLife;
        let currentAlpha = Math.max(0, 1 - lifeProgress);

        // Soft boundary protection: ensures zero opacity well before canvas top (y = 0)
        if (s.y < 45) {
          currentAlpha *= Math.max(0, (s.y - 12) / 33);
        }

        if (s.life >= s.maxLife || currentAlpha <= 0.01 || s.y > canvas.height) {
          fountainSparksRef.current.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = Math.min(1, Math.max(0, currentAlpha));
        ctx.fill();
      }

      ctx.globalCompositeOperation = "source-over";
      fountainAnimId = requestAnimationFrame(renderFountain);
    };

    fountainAnimId = requestAnimationFrame(renderFountain);

    return () => {
      cancelAnimationFrame(fountainAnimId);
    };
  }, []);

  // Handle station click: triggers immediate festive salvo from barrels
  const handleStationClick = () => {
    triggerRocketWave(3);
  };

  return (
    <>
      {/* Background Canvas for Flying Rockets & Bursts - sits BEHIND hero components */}
      <canvas
        ref={overlayCanvasRef}
        className="diwali-fireworks-canvas"
        aria-hidden="true"
      />

      {/* Cracker Station on the right side of hero section, shifted down so bottom sits behind marquee */}
      <div
        ref={stationRef}
        className="diwali-cracker-station-container"
        onClick={handleStationClick}
        title="✨ Click station to launch Diwali rockets! ✨"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleStationClick();
          }
        }}
      >
        {/* Cracker Station Art & Animated Live Nozzle Spark Fountain */}
        <div className="cracker-station-art">
          {/* Ground ambient glow */}
          <div className="cracker-station-ground-glow" />

          {/* Localized Live Fountain Spark Emitter Canvas - lowered down & positioned slightly BEHIND cracker barrels */}
          <canvas
            ref={stationCanvasRef}
            width={300}
            height={230}
            className="station-fountain-canvas"
            aria-hidden="true"
          />

          {/* Interactive vector cracker barrels with nested launching & reloading rockets */}
          <CrackerStationArt ref={crackerArtRef} />
        </div>
      </div>
    </>
  );
}
