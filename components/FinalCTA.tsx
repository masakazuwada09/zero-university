"use client";

import { motion } from "framer-motion";
import { MagneticButton } from "./MagneticButton";
import { AnimatedText } from "./AnimatedText";
import { sound } from "@/lib/sound";
import { ArrowUpRight, Sparkles, ShieldCheck } from "lucide-react";

interface FinalCTAProps {
  onOpenApply: () => void;
}

export function FinalCTA({ onOpenApply }: FinalCTAProps) {
  return (
    <section
      id="apply"
      className="relative w-full py-32 sm:py-44 px-4 sm:px-8 border-t border-white/10 bg-forest-950/75 backdrop-blur-[2px] overflow-hidden text-center z-10"
    >
      {/* Luminous Center Ambient Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-mint-500/15 blur-[170px] pointer-events-none rounded-full" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-forest-700/30 blur-[130px] pointer-events-none rounded-full" />

      <div className="relative mx-auto max-w-5xl z-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-mint-accent/30 bg-forest-900/80 px-4 py-1.5 mb-8 backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5 text-mint-accent animate-pulse" />
          <span className="font-mono text-xs tracking-widest text-mint-300">
            COHORT IX INTAKE IS NOW OPEN • ZERO TUITION • FULLY FUNDED
          </span>
        </div>

        {/* Oversized Kinetic Heading */}
        <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase leading-[0.92] mb-6">
          <span className="block">
            <AnimatedText text="UNLEARN EVERYTHING." type="chars" delay={0.1} />
          </span>
          <span className="block font-serif italic font-normal text-gradient-mint my-2">
            Begin At Zero.
          </span>
        </h2>

        <p className="mx-auto max-w-2xl font-light text-base sm:text-xl text-white/75 leading-relaxed mb-12">
          The future will not be designed by those who memorized yesterday&apos;s blueprints.
          Join a sovereign cohort of builders, philosophers, and researchers architecting the next era.
        </p>

        {/* Giant Magnetic CTA Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <MagneticButton
            strength={0.4}
            dataCursor="APPLY"
            onClick={onOpenApply}
            className="group relative flex items-center gap-3 rounded-full bg-mint-accent px-8 sm:px-10 py-4 sm:py-5 font-mono text-sm sm:text-base font-bold text-forest-950 transition-all duration-300 hover:bg-white hover:shadow-[0_0_50px_rgba(163,255,117,0.5)]"
          >
            <span>INITIALIZE APPLICATION // COHORT IX</span>
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-forest-950 text-mint-accent transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:bg-forest-900">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </MagneticButton>
        </div>

        {/* Fellowship Details Metadata */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-6 sm:gap-10 font-mono text-xs text-white/50 border-t border-white/10 pt-8 max-w-2xl mx-auto">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-mint-accent" />
            <span>100% MERIT & ARTIFACT-BASED</span>
          </div>
          <div>
            <span>NO PREREQUISITE DEGREES</span>
          </div>
          <div>
            <span>$50,000 LIVING ENDOWMENT</span>
          </div>
        </div>
      </div>
    </section>
  );
}
