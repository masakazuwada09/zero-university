"use client";

import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { sound } from "@/lib/sound";
import { XCircle, CheckCircle2, Scale, ShieldAlert } from "lucide-react";

const legacyTraits = [
  {
    title: "Isolated Silos",
    description: "Computer science, biology, and philosophy operate as rival kingdoms with zero intellectual cross-pollination.",
    stat: "4-Year Lag",
  },
  {
    title: "Passive Consumption",
    description: "Students sit in stadium halls memorizing slides to regurgitate on standardized multiple-choice exams.",
    stat: "85% Decay Rate",
  },
  {
    title: "Debt as Admission",
    description: "Undergraduates incur an average of $160,000+ debt before writing a single line of production code.",
    stat: "$1.7T National Debt",
  },
  {
    title: "Administrative Bloat",
    description: "Curriculums take 3 years to update, ensuring students learn obsolete frameworks for a non-existent job market.",
    stat: "10:1 Admin Ratio",
  },
];

const zeroTraits = [
  {
    title: "Post-Disciplinary Fusion",
    description: "Synthesize synthetic biology, machine intelligence, and existential ethics in single unified projects.",
    stat: "Unified Cognition",
  },
  {
    title: "Crucible Production",
    description: "Every fellow authors tangible prototypes, publishes reproducible research, or releases open protocols.",
    stat: "100% Artifacts",
  },
  {
    title: "Zero Tuition & Grants",
    description: "Fully funded research fellowships backed by sovereign innovation funds and mission-aligned endowments.",
    stat: "$0 Debt / $50k Grants",
  },
  {
    title: "Frontier Velocity",
    description: "Curriculum updates every week in direct collaboration with AI labs, bio-foundries, and space ventures.",
    stat: "Live Real-Time OS",
  },
];

export function ProblemComparison() {
  const [activeTab, setActiveTab] = useState<"comparison" | "legacy" | "zero">("comparison");

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  // Scroll-linked 3D entry animation
  const scrollSlideLeft = useTransform(scrollYProgress, [0, 1], [-80, 0]);
  const scrollRotateLeft = useTransform(scrollYProgress, [0, 1], [-12, 0]);
  const scrollSlideRight = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const scrollRotateRight = useTransform(scrollYProgress, [0, 1], [12, 0]);
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.7], [0, 1]);

  // Interactive Card 3D Tilt Ref (mouse)
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const tiltX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { damping: 20, stiffness: 200 });
  const tiltY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { damping: 20, stiffness: 200 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={sectionRef}
      id="problem"
      className="relative w-full py-28 sm:py-36 px-4 sm:px-8 border-t border-white/10 bg-forest-950/75 backdrop-blur-[2px] overflow-hidden z-10"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-white/10 pb-8 mb-16">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-mint-accent mb-3">
              <Scale className="h-3.5 w-3.5" />
              <span>// 02. THE PARADOX</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase">
              The Factory Model <br />
              <span className="font-serif italic font-normal text-gradient-mint">
                vs. The Living System.
              </span>
            </h2>
          </div>

          {/* Interactive Mode Toggle */}
          <div className="flex items-center gap-2 rounded-full border border-white/15 bg-forest-900/60 p-1.5 backdrop-blur-md">
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab("comparison");
              }}
              className={`rounded-full px-3.5 py-1.5 font-mono text-xs transition-all ${
                activeTab === "comparison"
                  ? "bg-mint-accent text-forest-950 font-bold shadow-md"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Side-by-Side
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab("legacy");
              }}
              className={`rounded-full px-3.5 py-1.5 font-mono text-xs transition-all ${
                activeTab === "legacy"
                  ? "bg-rose-500/80 text-white font-bold"
                  : "text-white/60 hover:text-white"
              }`}
            >
              The Factory (Old)
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab("zero");
              }}
              className={`rounded-full px-3.5 py-1.5 font-mono text-xs transition-all ${
                activeTab === "zero"
                  ? "bg-mint-accent text-forest-950 font-bold"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Zero System (New)
            </button>
          </div>
        </div>

        {/* 3D Scroll-Animated Comparison Grid */}
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: 1200 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* LEFT: Legacy Academy */}
          {(activeTab === "comparison" || activeTab === "legacy") && (
            <motion.div
              style={{
                x: scrollSlideLeft,
                rotateY: scrollRotateLeft,
                opacity: scrollOpacity,
                transformStyle: "preserve-3d",
              }}
              className="relative flex flex-col justify-between rounded-3xl border border-rose-500/20 bg-charcoal-900/85 p-8 sm:p-10 backdrop-blur-md shadow-2xl transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-950/80 border border-rose-500/30 text-rose-400">
                      <ShieldAlert className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-white/90">
                        The Legacy Academy
                      </h3>
                      <p className="font-mono text-xs text-white/40">1636 — PRESENT // INDUSTRIAL OBSOLESCENCE</p>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-rose-400/80 uppercase tracking-widest border border-rose-500/30 rounded-full px-2.5 py-0.5">
                    PARADIGM 1.0
                  </span>
                </div>

                <div className="flex flex-col gap-6">
                  {legacyTraits.map((item, idx) => (
                    <div
                      key={idx}
                      className="group/item flex items-start gap-4 p-4 rounded-xl border border-white/5 bg-charcoal-800/40 hover:border-rose-500/20 transition-all"
                    >
                      <XCircle className="h-5 w-5 text-rose-400/70 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-display font-semibold text-white/90 text-sm">
                            {item.title}
                          </h4>
                          <span className="font-mono text-[10px] text-rose-400/90 font-medium">
                            {item.stat}
                          </span>
                        </div>
                        <p className="text-xs text-white/60 leading-relaxed font-light">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between font-mono text-xs text-white/40">
                <span>VERDICT: EXPENSIVE CERTIFICATES</span>
                <span className="text-rose-400 font-bold">STATUS: FRAYING</span>
              </div>
            </motion.div>
          )}

          {/* RIGHT: Zero University Architecture */}
          {(activeTab === "comparison" || activeTab === "zero") && (
            <motion.div
              style={{
                x: scrollSlideRight,
                rotateY: scrollRotateRight,
                opacity: scrollOpacity,
                transformStyle: "preserve-3d",
              }}
              className="relative flex flex-col justify-between rounded-3xl border border-mint-accent/40 bg-forest-900/75 p-8 sm:p-10 backdrop-blur-md shadow-[0_0_60px_rgba(76,218,160,0.12)] transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-mint-950 border border-mint-accent/50 text-mint-accent">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-white">
                        The Zero Architecture
                      </h3>
                      <p className="font-mono text-xs text-mint-300/80">2026+ // THE LIVING COGNITIVE ENGINE</p>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-mint-accent uppercase tracking-widest border border-mint-accent/40 rounded-full px-2.5 py-0.5 bg-mint-accent/10">
                    PARADIGM 4.0
                  </span>
                </div>

                <div className="flex flex-col gap-6">
                  {zeroTraits.map((item, idx) => (
                    <div
                      key={idx}
                      className="group/item flex items-start gap-4 p-4 rounded-xl border border-mint-accent/20 bg-forest-800/50 hover:border-mint-accent/50 hover:bg-forest-800/80 transition-all"
                    >
                      <CheckCircle2 className="h-5 w-5 text-mint-accent shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-display font-semibold text-white text-sm">
                            {item.title}
                          </h4>
                          <span className="font-mono text-[10px] text-mint-accent font-bold">
                            {item.stat}
                          </span>
                        </div>
                        <p className="text-xs text-white/75 leading-relaxed font-light">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between font-mono text-xs text-mint-300">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-mint-accent animate-pulse" />
                  VERDICT: FRONTIER CAPABILITY
                </span>
                <span className="text-mint-accent font-bold">STATUS: ACCELERATING</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
