"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sound } from "@/lib/sound";
import { Compass, Sparkles, Check } from "lucide-react";

interface HeroGesturePortalProps {
  onUnlock?: () => void;
}

export function HeroGesturePortal({ onUnlock }: HeroGesturePortalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [hintVisible, setHintVisible] = useState(true);

  const pointsRef = useRef<{ x: number; y: number; time: number }[]>([]);
  const anglesRef = useRef<number[]>([]);

  // Calculate circular angle coverage
  const calculateCoverage = useCallback(() => {
    if (anglesRef.current.length < 8) return 0;
    // Normalize angles into buckets (36 buckets for 360 deg)
    const buckets = new Set<number>();
    anglesRef.current.forEach((angle) => {
      let normalized = (angle + Math.PI * 2) % (Math.PI * 2);
      let bucket = Math.floor((normalized / (Math.PI * 2)) * 36);
      buckets.add(bucket);
    });
    // If user covered most angular buckets
    return Math.min(100, Math.round((buckets.size / 30) * 100));
  }, []);

  const triggerUnlock = useCallback(() => {
    if (isUnlocked) return;
    setIsUnlocked(true);
    sound.playWarp();
    if (onUnlock) {
      setTimeout(() => {
        onUnlock();
      }, 700);
    }
  }, [isUnlocked, onUnlock]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const render = () => {
      animId = requestAnimationFrame(render);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const now = Date.now();
      const points = pointsRef.current;

      // Filter old points
      pointsRef.current = points.filter((p) => now - p.time < 800);

      if (pointsRef.current.length > 1) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        for (let i = 1; i < pointsRef.current.length; i++) {
          const p1 = pointsRef.current[i - 1];
          const p2 = pointsRef.current[i];
          const age = (now - p2.time) / 800;
          const alpha = Math.max(0, 1 - age);

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.lineWidth = 4 * (1 - age) + 1;
          ctx.strokeStyle = `rgba(163, 255, 117, ${alpha * 0.9})`;
          ctx.shadowColor = "#a3ff75";
          ctx.shadowBlur = 12;
          ctx.stroke();
        }
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  // Update canvas sizing
  useEffect(() => {
    const updateSize = () => {
      if (canvasRef.current && containerRef.current) {
        canvasRef.current.width = containerRef.current.clientWidth;
        canvasRef.current.height = containerRef.current.clientHeight;
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (isUnlocked) return;
    setIsDrawing(true);
    setHintVisible(false);
    anglesRef.current = [];
    pointsRef.current = [];

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    pointsRef.current.push({ x, y, time: Date.now() });
    anglesRef.current.push(Math.atan2(y - centerY, x - centerX));
    sound.playHover();
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDrawing || isUnlocked) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    pointsRef.current.push({ x, y, time: Date.now() });
    const angle = Math.atan2(y - centerY, x - centerX);
    anglesRef.current.push(angle);

    const cov = calculateCoverage();
    setProgress(cov);

    if (cov >= 90) {
      setIsDrawing(false);
      triggerUnlock();
    }
  };

  const handlePointerUp = () => {
    setIsDrawing(false);
    if (progress < 90 && !isUnlocked) {
      setTimeout(() => {
        setProgress(0);
        anglesRef.current = [];
      }, 400);
    }
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      data-cursor={isUnlocked ? "UNLOCKED" : "DRAW ZERO"}
      className="relative mx-auto mt-6 flex h-48 w-48 sm:h-56 sm:w-56 cursor-crosshair items-center justify-center select-none touch-none"
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-20"
      />

      {/* Orbit Background Guides */}
      <div className="absolute inset-2 rounded-full border border-dashed border-white/15 animate-spin-slow pointer-events-none" />
      <div className="absolute inset-8 rounded-full border border-white/10 pointer-events-none" />

      {/* Progress SVG Ring */}
      <svg className="absolute inset-0 h-full w-full -rotate-90 pointer-events-none z-10">
        <circle
          cx="50%"
          cy="50%"
          r="42%"
          className="stroke-white/10 fill-none"
          strokeWidth="3"
        />
        <motion.circle
          cx="50%"
          cy="50%"
          r="42%"
          className="stroke-mint-accent fill-none"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="264%"
          animate={{
            strokeDashoffset: `${264 - (264 * progress) / 100}%`,
          }}
          transition={{ ease: "easeOut", duration: 0.15 }}
          style={{
            filter: "drop-shadow(0 0 8px rgba(163, 255, 117, 0.8))",
          }}
        />
      </svg>

      {/* Center Interactive Node */}
      <motion.div
        animate={
          isUnlocked
            ? { scale: [1, 1.3, 1.1], backgroundColor: "rgba(163, 255, 117, 0.3)" }
            : isDrawing
            ? { scale: 1.05 }
            : { scale: 1 }
        }
        className="relative z-10 flex h-20 w-20 flex-col items-center justify-center rounded-full border border-white/20 bg-forest-900/80 backdrop-blur-md transition-all duration-300"
      >
        {isUnlocked ? (
          <Check className="h-7 w-7 text-mint-accent animate-bounce" />
        ) : (
          <>
            <Compass className="h-6 w-6 text-mint-accent/90 animate-spin-slow" />
            <span className="mt-1 font-mono text-[9px] tracking-widest text-white/70">
              {progress > 0 ? `${progress}%` : "ZERO"}
            </span>
          </>
        )}
      </motion.div>

      {/* Interactive Helper Prompt */}
      <AnimatePresence>
        {hintVisible && !isUnlocked && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-center pointer-events-none"
          >
            <div className="flex items-center gap-1.5 font-mono text-[11px] tracking-widest text-mint-300">
              <Sparkles className="h-3 w-3 text-mint-accent animate-pulse" />
              <span>TRACE A CIRCLE TO WARP</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instant Skip Click Fallback */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          triggerUnlock();
        }}
        className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-[10px] font-mono tracking-wider text-white/40 hover:text-mint-accent transition-colors underline decoration-white/20 hover:decoration-mint-accent"
      >
        [ Or click here to bypass ]
      </button>
    </div>
  );
}
