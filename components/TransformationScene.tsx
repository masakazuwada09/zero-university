"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sound } from "@/lib/sound";
import { Sparkles, ArrowRight, Dna, Compass, Lightbulb, Binary } from "lucide-react";

const stages = [
  {
    step: "01",
    id: "unlearning",
    name: "Dismantle Dogma",
    subtitle: "The Unlearning Crucible",
    icon: Compass,
    quote: "You cannot pour new wine into a vessel filled with the debris of an obsolete syllabus.",
    description:
      "Before building the future, fellows undergo a rigorous unlearning sequence. We deconstruct conventional assumptions about career ladders, department silos, and artificial boundaries between code, biology, and art.",
    manifestoLine: "To create the unprecedented, one must first forget what is customary.",
    actionItem: "Audit & purge outdated mental models with visiting philosophers.",
  },
  {
    step: "02",
    id: "synthesis",
    name: "Trans-Domain Fusion",
    subtitle: "The Combinatorial Leap",
    icon: Binary,
    quote: "Breakthroughs don't occur in the center of disciplines; they detonate at their intersections.",
    description:
      "Fellows combine disparate domains into unexpected hypotheses. What happens when transformer architectures are applied to epigenetic sequencing? What happens when distributed cryptography meets cognitive neuroscience?",
    manifestoLine: "Knowledge is not a file cabinet; it is an interconnected neural lattice.",
    actionItem: "Cross-fertilize biology, synthetic cognition, and radical aesthetics.",
  },
  {
    step: "03",
    id: "crucible",
    name: "Proof of Artifact",
    subtitle: "The 100-Day Foundry",
    icon: Dna,
    quote: "If you cannot manifest it in the physical or digital substrate, you do not truly comprehend it.",
    description:
      "No term papers. No abstract slides. In 100-day cycles, fellows manufacture physical devices, train novel foundation models, or deploy governance systems in real-world testbeds.",
    manifestoLine: "The only valid exam is public scrutiny by the frontier.",
    actionItem: "Ship open-source repositories and hardware schematics to the world.",
  },
  {
    step: "04",
    id: "emergence",
    name: "Sovereign Impact",
    subtitle: "The Perpetual Vanguard",
    icon: Lightbulb,
    quote: "You do not graduate from Zero. You enter the permanent intellectual commons.",
    description:
      "Fellows launch venture studios, independent research labs, or novel cultural institutions. The Zero network remains a lifelong distributed node network of collaborators, patrons, and co-founders.",
    manifestoLine: "We do not prepare you for existing systems; we fund you to replace them.",
    actionItem: "Seed independent laboratories backed by sovereign endowments.",
  },
];

export function TransformationScene() {
  const [activeStage, setActiveStage] = useState(0);
  const current = stages[activeStage];
  const Icon = current.icon;

  return (
    <section
      id="transformation"
      className="relative w-full py-28 sm:py-36 px-4 sm:px-8 bg-beige-100/90 text-beige-900 backdrop-blur-md transition-colors duration-700 overflow-hidden z-10"
    >
      {/* Editorial Decorative Background Elements */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-forest-950 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-forest-950 to-transparent pointer-events-none" />
      <div className="absolute -top-32 right-10 w-96 h-96 bg-mint-300/30 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-32 left-10 w-96 h-96 bg-beige-300/40 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-beige-300 pb-8 mb-16">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-forest-700 mb-3">
              <Sparkles className="h-3.5 w-3.5" />
              <span>// 03. THE TRANSFORMATION</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-beige-900 uppercase">
              The Metamorphosis <br />
              <span className="font-serif italic font-normal text-forest-700">
                Of The Mind.
              </span>
            </h2>
          </div>

          <div className="max-w-md font-mono text-xs sm:text-sm text-beige-800/80 leading-relaxed">
            <p>
              [ PHASE TRANSITION ] : The shift from passive consumer of obsolete theory
              to sovereign architect of frontier reality.
            </p>
          </div>
        </div>

        {/* Metamorphosis Stage Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-12">
          {stages.map((stage, idx) => {
            const isSelected = activeStage === idx;
            const StageIcon = stage.icon;
            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setActiveStage(idx);
                }}
                data-cursor="SELECT"
                className={`flex flex-col items-start p-5 rounded-2xl border text-left transition-all duration-300 ${
                  isSelected
                    ? "border-forest-700 bg-white shadow-xl -translate-y-1"
                    : "border-beige-300/80 bg-beige-200/50 hover:bg-white/60 hover:border-beige-400"
                }`}
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <span className="font-mono text-xs font-bold text-forest-700">
                    STAGE {stage.step}
                  </span>
                  <StageIcon
                    className={`h-4 w-4 ${
                      isSelected ? "text-forest-700" : "text-beige-800/50"
                    }`}
                  />
                </div>
                <div className="font-display font-bold text-sm sm:text-base text-beige-900">
                  {stage.name}
                </div>
                <div className="font-mono text-[11px] text-beige-800/70 mt-1">
                  {stage.subtitle}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Deep Dive Canvas / Panel */}
        <div className="relative rounded-3xl border border-beige-300 bg-white/90 p-8 sm:p-14 shadow-2xl backdrop-blur-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* Left Column: Philosophical Quote & Manifesto */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div className="inline-flex items-center gap-2 rounded-full border border-forest-600/20 bg-forest-50 px-3.5 py-1 mb-6 w-fit">
                  <Icon className="h-4 w-4 text-forest-700" />
                  <span className="font-mono text-xs font-semibold text-forest-800 tracking-wider">
                    PARADIGM PHASE {current.step} OF 04
                  </span>
                </div>

                <blockquote className="font-serif italic text-2xl sm:text-3xl lg:text-4xl text-beige-900 leading-snug mb-8">
                  &ldquo;{current.quote}&rdquo;
                </blockquote>

                <p className="text-base sm:text-lg text-beige-800 leading-relaxed font-light mb-8">
                  {current.description}
                </p>

                <div className="p-4 rounded-xl border border-beige-300 bg-beige-50 flex items-start gap-3">
                  <ArrowRight className="h-5 w-5 text-forest-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono text-xs uppercase tracking-wider text-forest-800 font-bold block mb-0.5">
                      TACTICAL PROTOCOL
                    </span>
                    <span className="text-xs sm:text-sm text-beige-800 font-medium">
                      {current.actionItem}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Metamorphic Diagram */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 rounded-2xl border border-beige-200 bg-beige-50/80">
                <div className="relative w-48 h-48 sm:w-60 sm:h-60 flex items-center justify-center">
                  {/* Concentric rotating indicator */}
                  <div className="absolute inset-0 rounded-full border border-dashed border-forest-600/30 animate-spin-slow" />
                  <div className="absolute inset-4 rounded-full border border-forest-600/20" />
                  <div className="absolute inset-10 rounded-full border border-forest-700/40 bg-white flex flex-col items-center justify-center shadow-inner">
                    <Icon className="h-10 w-10 text-forest-700 mb-2 animate-pulse" />
                    <span className="font-mono text-xs font-bold text-forest-800 tracking-widest uppercase">
                      {current.name}
                    </span>
                    <span className="font-mono text-[10px] text-forest-600 mt-0.5">
                      PHASE // {current.step}
                    </span>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <p className="font-mono text-xs text-beige-800/80 italic">
                    {current.manifestoLine}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
