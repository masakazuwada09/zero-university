"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { AnimatedText } from "./AnimatedText";
import { sound } from "@/lib/sound";
import { Layers, Zap, Sparkles, Orbit } from "lucide-react";

const pillars = [
  {
    code: "00",
    metric: "0",
    unit: "LECTURES",
    title: "Radical Active Creation",
    description:
      "Knowledge absorbed passively decays in days. Knowledge forged through crucible builds becomes irreversible intuition. At Zero, you learn exclusively by authoring novel artifacts.",
    icon: Zap,
    tag: "PEDAGOGY",
    parallaxSpeed: 0.18,
  },
  {
    code: "01",
    metric: "100%",
    unit: "PROOF-OF-WORK",
    title: "Artifacts Over Credentials",
    description:
      "The diploma is a relic of low-trust societies. Our graduates don't hold degrees; they hold deployed smart contracts, synthetic gene circuits, and published scientific preprints.",
    icon: Layers,
    tag: "VERIFICATION",
    parallaxSpeed: -0.12,
  },
  {
    code: "02",
    metric: "12:1",
    unit: "INTENSITY RATIO",
    title: "Recursive Mentorship",
    description:
      "Replace academic bureaucracy with socratic masterclasses. Fellows collaborate side-by-side with frontier pioneers who are actively reshaping human capability.",
    icon: Orbit,
    tag: "SYNTHESIS",
    parallaxSpeed: 0.22,
  },
];

export function StorySection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax offsets for 3 columns
  const yCol1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const yCol2 = useTransform(scrollYProgress, [0, 1], [10, -20]);
  const yCol3 = useTransform(scrollYProgress, [0, 1], [90, -80]);

  const yOffsets = [yCol1, yCol2, yCol3];

  // Heading scroll scale and subtle opacity scrub
  const textScale = useTransform(scrollYProgress, [0.1, 0.4], [0.94, 1]);
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0.5, 1]);

  return (
    <section
      ref={containerRef}
      id="manifesto"
      className="relative w-full py-28 sm:py-36 px-4 sm:px-8 border-t border-white/10 bg-forest-950/70 backdrop-blur-[2px] overflow-hidden z-10"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-forest-800/20 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-mint-500/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          style={{ scale: textScale, opacity: textOpacity }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-white/10 pb-8 mb-16 sm:mb-24"
        >
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-mint-accent mb-3">
              <Sparkles className="h-3.5 w-3.5 animate-pulse" />
              <span>// 01. THE MANIFESTO</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase">
              The Illusion of <br className="hidden sm:inline" />
              <span className="font-serif italic font-normal text-gradient-mint">
                Accreditation.
              </span>
            </h2>
          </div>

          <div className="max-w-md font-mono text-xs sm:text-sm text-white/60 leading-relaxed">
            <p>
              [ AXIOM 01 ] : The traditional university was optimized for industrial repeatability.
              We are building the cognitive crucible for unpredictable genius.
            </p>
          </div>
        </motion.div>

        {/* Oversized Editorial Text Statement with Scroll-Linked Mask */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 sm:mb-28"
        >
          <p className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-offwhite/90 leading-[1.25] tracking-tight font-light">
            Higher education has not fundamentally evolved in{" "}
            <span className="font-display font-bold text-mint-accent underline decoration-mint-accent/40 decoration-wavy">
              400 years
            </span>
            . The lecture hall was conceived before the printing press was ubiquitous.
            The grading rubric was invented to sort assembly-line labor.{" "}
            <span className="text-white font-normal italic">
              We did not set out to optimize this machine. We dissolved it to Zero.
            </span>
          </p>
        </motion.div>

        {/* 3 Pillar Crucible Grid with Multiplane Parallax Scroll */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            const yParallax = yOffsets[idx];

            return (
              <motion.div
                key={pillar.code}
                style={{ y: yParallax }}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => sound.playHover()}
                data-cursor="DISCOVER"
                className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-forest-900/40 p-8 backdrop-blur-md transition-all duration-500 hover:border-mint-accent/50 hover:bg-forest-900/80 hover:shadow-[0_20px_50px_rgba(76,218,160,0.1)]"
              >
                {/* Subtle top indicator */}
                <div className="flex items-center justify-between font-mono text-xs text-white/40 mb-12">
                  <span className="flex items-center gap-1.5 text-mint-accent/80">
                    <Icon className="h-4 w-4" />
                    <span>[{pillar.tag}]</span>
                  </span>
                  <span>{pillar.code} / 03</span>
                </div>

                {/* Metric Display */}
                <div className="mb-8">
                  <div className="font-display text-5xl sm:text-6xl font-black tracking-tight text-white group-hover:text-mint-accent transition-colors duration-300">
                    <AnimatedText text={pillar.metric} type="chars" delay={0.2 + idx * 0.1} />
                  </div>
                  <div className="font-mono text-xs uppercase tracking-widest text-mint-300 mt-1">
                    {pillar.unit}
                  </div>
                </div>

                {/* Details */}
                <div>
                  <h3 className="font-display text-xl font-bold text-white mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-sm font-light text-white/70 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                {/* Subtle inner hover glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-radial-gradient from-mint-500/10 via-transparent to-transparent" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
