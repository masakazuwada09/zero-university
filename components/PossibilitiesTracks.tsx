"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { sound } from "@/lib/sound";
import { Sparkles, ArrowRight, X, Cpu, Dna, Rocket, Palette } from "lucide-react";

interface Track {
  id: string;
  code: string;
  title: string;
  category: string;
  icon: typeof Cpu;
  accent: string;
  statement: string;
  focus: string[];
  deliverables: string[];
  mentors: string[];
}

const tracks: Track[] = [
  {
    id: "cognition",
    code: "TRACK 01",
    title: "Artificial General Cognition & Epistemology",
    category: "SYNTHETIC INTELLECT",
    icon: Cpu,
    accent: "#a3ff75",
    statement:
      "Beyond predictive tokens: investigating neuro-symbolic reasoning, world models, recursive self-improvement, and cognitive sovereignty.",
    focus: [
      "Latent space mechanistic interpretability",
      "Non-Euclidean cognitive geometry",
      "Autonomous agent consensus game theory",
      "AI alignment under existential uncertainty",
    ],
    deliverables: [
      "Train a self-verifying theorem-proving neural architecture",
      "Deploy open-source mechanistic interpretability suite",
      "Publish preprint on cognitive agency models",
    ],
    mentors: [
      "Dr. Elena Vance (Ex-DeepMind Fellow)",
      "Julian Thorne (Foundational Logic Chair)",
    ],
  },
  {
    id: "biology",
    code: "TRACK 02",
    title: "Synthetic Biology & Cellular Computing",
    category: "LIVING SUBSTRATES",
    icon: Dna,
    accent: "#4cdaa0",
    statement:
      "Treating nucleic acids and cellular metabolic cascades as programmable substrates for planetary resilience and longevity.",
    focus: [
      "De novo protein folding and macrocyclic design",
      "Biomimetic carbon mineralization lattices",
      "Engineered organoid sensory interfaces",
      "Decentralized wetlab reproducibility networks",
    ],
    deliverables: [
      "Synthesize novel enzyme with targeted catalytic function",
      "Deploy open wetlab automation protocol",
      "Fabricate living mycelial architectural tile",
    ],
    mentors: [
      "Dr. Marcus Chen (Synthetic Genomics Lab)",
      "Aria Lindqvist (Biomimetic Materials Group)",
    ],
  },
  {
    id: "planetary",
    code: "TRACK 03",
    title: "Autonomous Systems & Planetary Engineering",
    category: "INFRASTRUCTURE",
    icon: Rocket,
    accent: "#83ecc1",
    statement:
      "Designing resilient cyber-physical infrastructure capable of operating autonomously in deep space, oceans, and extreme climates.",
    focus: [
      "Subsea autonomous environmental monitors",
      "Closed-loop life support thermodynamics",
      "Decentralized energy micro-grid mesh routing",
      "Fault-tolerant radiation-hardened firmware",
    ],
    deliverables: [
      "Manufacture high-altitude atmospheric sensor node",
      "Deploy self-healing microgrid dispatch controller",
      "Publish thermal simulation engine for orbital habitats",
    ],
    mentors: [
      "Commander Tariq Al-Mansoor (Autonomous Aerospace)",
      "Valerie Koslov (Cryogenic Systems Engineer)",
    ],
  },
  {
    id: "aesthetics",
    code: "TRACK 04",
    title: "Radical Aesthetics & Spatial Computing",
    category: "PERCEPTUAL DESIGN",
    icon: Palette,
    accent: "#e8e2d3",
    statement:
      "Architecting new sensory media, holographic interaction paradigms, and spatial digital worlds that elevate human agency.",
    focus: [
      "Sub-perceptual latency neural tactile interfaces",
      "Generative real-time volumetric cinema",
      "Post-flat UX: volumetric cognitive workspaces",
      "Multi-sensory generative synthesis",
    ],
    deliverables: [
      "Release spatial computing creative workspace app",
      "Author immersive 4D interactive documentary",
      "Build spatial haptic prototype controller",
    ],
    mentors: [
      "Kaito Tanaka (Spatial UX Pioneer)",
      "Mira Sorensen (Generative Media Artist)",
    ],
  },
];

export function PossibilitiesTracks() {
  const [activeModalTrack, setActiveModalTrack] = useState<Track | null>(null);

  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yColOdd = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const yColEven = useTransform(scrollYProgress, [0, 1], [70, -60]);

  const handleOpenModal = (track: Track) => {
    sound.playClick();
    setActiveModalTrack(track);
  };

  const handleCloseModal = () => {
    sound.playClick();
    setActiveModalTrack(null);
  };

  return (
    <section
      ref={containerRef}
      id="tracks"
      className="relative w-full py-28 sm:py-36 px-4 sm:px-8 border-t border-white/10 bg-forest-950/75 backdrop-blur-[2px] overflow-hidden z-10"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-mint-500/10 blur-[160px] pointer-events-none rounded-full" />

      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-white/10 pb-8 mb-16 sm:mb-20">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-mint-accent mb-3">
              <Sparkles className="h-3.5 w-3.5 animate-pulse" />
              <span>// 05. THE POSSIBILITIES</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase">
              Choose Your <br />
              <span className="font-serif italic font-normal text-gradient-mint">
                Uncharted Trajectory.
              </span>
            </h2>
          </div>

          <div className="max-w-md font-mono text-xs sm:text-sm text-white/60 leading-relaxed">
            <p>
              [ FOUR CRUCIBLE TRACKS ] : Select your research vector. Every fellow is funded
              for 100 days of unsupervised frontier creation.
            </p>
          </div>
        </div>

        {/* 4 Interactive Tracks Cards Grid with Alternating Parallax */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tracks.map((track, idx) => {
            const Icon = track.icon;
            const yOffset = idx % 2 === 0 ? yColOdd : yColEven;

            return (
              <motion.div
                key={track.id}
                style={{ y: yOffset }}
                initial={{ opacity: 0, y: 50, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.8, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => sound.playHover()}
                data-cursor="INSPECT"
                onClick={() => handleOpenModal(track)}
                className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-forest-900/40 p-8 sm:p-10 backdrop-blur-md transition-all duration-500 hover:border-mint-accent/50 hover:bg-forest-900/80 hover:shadow-[0_20px_50px_rgba(76,218,160,0.12)] cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                    <div className="flex items-center gap-2 font-mono text-xs tracking-wider" style={{ color: track.accent }}>
                      <Icon className="h-4 w-4" />
                      <span>[{track.category}]</span>
                    </div>
                    <span className="font-mono text-xs text-white/40">{track.code}</span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:text-mint-accent transition-colors duration-300">
                    {track.title}
                  </h3>

                  <p className="text-sm font-light text-white/70 leading-relaxed mb-8">
                    {track.statement}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {track.focus.slice(0, 2).map((item, i) => (
                      <span
                        key={i}
                        className="rounded-full border border-white/10 bg-forest-950/60 px-3 py-1 font-mono text-[11px] text-white/60"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10 font-mono text-xs text-mint-accent group-hover:translate-x-1 transition-transform">
                    <span>INSPECT FULL HORIZON BLUEPRINT</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>

                {/* Subtle Hover Radial Aura */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 80% 20%, ${track.accent}15, transparent 70%)`,
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Track Detail Inspection Drawer / Modal */}
      <AnimatePresence>
        {activeModalTrack && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-forest-950/80 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-3xl rounded-3xl border border-mint-accent/40 bg-forest-900/95 p-8 sm:p-12 shadow-[0_0_80px_rgba(76,218,160,0.15)] overflow-hidden max-h-[90vh] overflow-y-auto no-scrollbar"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={handleCloseModal}
                className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-forest-950 text-white hover:border-mint-accent hover:text-mint-accent transition-colors"
                aria-label="Close track blueprint"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-2 font-mono text-xs tracking-wider mb-2" style={{ color: activeModalTrack.accent }}>
                <span>[{activeModalTrack.code}]</span>
                <span>•</span>
                <span>{activeModalTrack.category}</span>
              </div>

              <h3 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
                {activeModalTrack.title}
              </h3>

              <p className="font-serif italic text-lg sm:text-xl text-offwhite/85 mb-8 leading-relaxed">
                &ldquo;{activeModalTrack.statement}&rdquo;
              </p>

              {/* Research Vectors */}
              <div className="mb-8">
                <h4 className="font-mono text-xs uppercase tracking-widest text-mint-accent mb-4">
                  // CRITICAL INQUIRY VECTORS
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeModalTrack.focus.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl border border-white/10 bg-forest-950/70 font-mono text-xs text-white/80"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Mandatory Crucible Deliverables */}
              <div className="mb-8">
                <h4 className="font-mono text-xs uppercase tracking-widest text-mint-accent mb-4">
                  // MANDATORY 100-DAY PROOF OF WORK
                </h4>
                <div className="flex flex-col gap-2.5">
                  {activeModalTrack.deliverables.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3.5 rounded-xl border border-mint-accent/20 bg-forest-800/40 text-xs font-mono text-white/90"
                    >
                      <span className="h-2 w-2 rounded-full bg-mint-accent shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visiting Mentors */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs text-white/50">
                <div>
                  <span className="text-white/40 block mb-1">FELLOWSHIP MENTORS:</span>
                  <span className="text-white/80">{activeModalTrack.mentors.join(" • ")}</span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    handleCloseModal();
                    const applyBtn = document.getElementById("apply");
                    if (applyBtn) applyBtn.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="rounded-full bg-mint-accent px-5 py-2.5 font-mono text-xs font-bold text-forest-950 hover:bg-white transition-colors text-center"
                >
                  APPLY FOR THIS TRACK
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
