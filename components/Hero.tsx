"use client";

import { motion } from "framer-motion";
import { HeroGesturePortal } from "./HeroGesturePortal";
import { AnimatedText } from "./AnimatedText";
import { sound } from "@/lib/sound";
import { ArrowDown, Sparkles, ShieldAlert, Cpu } from "lucide-react";

export function Hero() {
  const handleWarp = () => {
    const manifesto = document.getElementById("manifesto");
    if (manifesto) {
      manifesto.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden pt-28 pb-12 px-4 sm:px-8 z-10">
      {/* Atmospheric Radial Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-forest-700/20 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute -bottom-10 left-10 w-[450px] h-[450px] bg-mint-500/10 blur-[140px] pointer-events-none rounded-full" />

      {/* Top Metadata Bar */}
      <div className="relative z-10 mx-auto max-w-7xl w-full flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-widest text-white/50 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2 text-mint-accent">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mint-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-mint-accent" />
          </span>
          <span className="font-bold">PARADIGM INITIATIVE // 2026</span>
        </div>

        <div className="hidden sm:flex items-center gap-6">
          <span className="flex items-center gap-1.5 hover:text-white transition-colors">
            <ShieldAlert className="h-3.5 w-3.5 text-mint-300" />
            ACCREDITATION: DELIBERATELY OBSOLETE
          </span>
          <span className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Cpu className="h-3.5 w-3.5 text-mint-300" />
            POST-DISCIPLINARY COGNITION
          </span>
        </div>

        <span className="text-white/40">[ 00:00:00 UTC ]</span>
      </div>

      {/* Center Cinematic Headline */}
      <div className="relative z-10 mx-auto max-w-6xl w-full text-center my-auto py-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-mint-accent/20 bg-forest-900/60 px-4 py-1 mb-6 backdrop-blur-md">
          <Sparkles className="h-3 w-3 text-mint-accent animate-pulse" />
          <span className="font-mono text-xs tracking-widest text-mint-300">
            WHY ACCUMULATE FACTS WHEN YOU CAN ARCHITECT FUTURES?
          </span>
        </div>

        {/* Oversized Headline */}
        <h1 className="font-display font-black tracking-tighter leading-[0.88] text-white select-none">
          <span className="block text-4xl sm:text-6xl md:text-8xl lg:text-9xl uppercase">
            <AnimatedText text="REIMAGINING" type="chars" duration={0.9} delay={0.1} />
          </span>

          <span className="block text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-serif italic font-normal text-gradient-mint my-1 sm:my-2">
            the Architecture of
          </span>

          <span className="block text-4xl sm:text-6xl md:text-8xl lg:text-9xl uppercase text-white/95">
            <AnimatedText text="INTELLECT." type="chars" duration={0.9} delay={0.4} />
          </span>
        </h1>

        {/* Editorial Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-6 max-w-2xl text-sm sm:text-base md:text-lg text-white/70 font-light leading-relaxed"
        >
          Zero University is an unaccredited sanctuary for autonomous polymaths.
          We replace passive lectures with crucible projects, and standardized exams with
          irreversible proofs of mastery.
        </motion.p>

        {/* Interactive Gesture Portal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 1 }}
        >
          <HeroGesturePortal onUnlock={handleWarp} />
        </motion.div>
      </div>

      {/* Bottom Indicators & Floating Elements */}
      <div className="relative z-10 mx-auto max-w-7xl w-full flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10 font-mono text-xs text-white/50">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-forest-500" />
          <span>COORDINATES: 47.3769° N, 8.5417° E</span>
        </div>

        {/* Scroll Indicator */}
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            handleWarp();
          }}
          className="group flex items-center gap-2 text-white/70 hover:text-mint-accent transition-colors cursor-pointer"
          data-cursor="SCROLL"
        >
          <span className="tracking-widest uppercase text-[11px]">SCROLL TO DISMANTLE</span>
          <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 group-hover:border-mint-accent/50 group-hover:bg-mint-accent/10 transition-all">
            <ArrowDown className="h-3.5 w-3.5 animate-bounce text-mint-accent" />
          </div>
        </button>

        <div className="hidden lg:flex items-center gap-4 text-white/40">
          <span>[ 01 PROOF OF WORK ]</span>
          <span>[ 02 RECURSIVE INQUIRY ]</span>
          <span>[ 03 POST-SILO ]</span>
        </div>
      </div>
    </section>
  );
}
