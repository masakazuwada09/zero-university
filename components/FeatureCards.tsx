"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { sound } from "@/lib/sound";
import {
  Network,
  Activity,
  MessageSquareCode,
  FolderGit2,
  Sparkles,
  Terminal,
  ExternalLink,
} from "lucide-react";

const cognitiveNodes = [
  { id: "ai", label: "Neuro-Symbolic AI", color: "#a3ff75", count: "14 Artifacts" },
  { id: "bio", label: "Synthetic Biology", color: "#4cdaa0", count: "09 Wetlabs" },
  { id: "crypto", label: "Cryptographic Provenance", color: "#83ecc1", count: "19 Protocols" },
  { id: "spatial", label: "Spatial Computing", color: "#e8e2d3", count: "11 Hardware" },
  { id: "ethics", label: "Existential Epistemology", color: "#a3ff75", count: "06 Treatises" },
];

const socraticQuestions = [
  {
    q: "Will machine intelligence render human reasoning redundant?",
    response:
      "When calculators arrived, we did not stop calculating; we began inventing topology. Machine cognition does not replace human inquiry—it relieves us of low-order synthesis so we can pose more audacious questions.",
    author: "Oracle Zero // Epistemic Node",
  },
  {
    q: "Why abolish grades if they measure academic competence?",
    response:
      "Grades measure compliance with predetermined answers. In the frontier of uncharted knowledge, predetermined answers do not exist. Only deployed artifacts can withstand reality.",
    author: "Oracle Zero // Pedagogy Node",
  },
  {
    q: "Can autonomous systems possess ethical culpability?",
    response:
      "Ethics is not code rules; it is an emergent consensus of consequence. We teach fellows to embed algorithmic accountability directly into the architectural substrate.",
    author: "Oracle Zero // Cybernetics Node",
  },
];

const liveFellows = [
  { city: "Zurich", project: "Bio-Carbon Crystal Lattice", latency: "14ms", status: "Compiling" },
  { city: "Tokyo", project: "Neural Latent Space Navigator", latency: "22ms", status: "Benchmarking" },
  { city: "San Francisco", project: "Zero-Knowledge Sovereign Identity", latency: "9ms", status: "Deployed" },
  { city: "Reykjavik", project: "Geothermal Grid Autonomous Router", latency: "31ms", status: "Synthesizing" },
];

export function FeatureCards() {
  const [selectedNode, setSelectedNode] = useState(cognitiveNodes[0]);
  const [activeQuestion, setActiveQuestion] = useState(0);

  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax offsets for the 4 interface cards
  const yCard1 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const yCard2 = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const yCard3 = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const yCard4 = useTransform(scrollYProgress, [0, 1], [60, -50]);

  return (
    <section
      ref={containerRef}
      id="experience"
      className="relative w-full py-28 sm:py-36 px-4 sm:px-8 border-t border-white/10 bg-forest-950/70 backdrop-blur-[2px] overflow-hidden z-10"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-white/10 pb-8 mb-16">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-mint-accent mb-3">
              <Sparkles className="h-3.5 w-3.5 animate-pulse" />
              <span>// 04. THE EXPERIENCE</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white uppercase">
              An OS For <br />
              <span className="font-serif italic font-normal text-gradient-mint">
                Intellectual Expeditions.
              </span>
            </h2>
          </div>

          <div className="max-w-md font-mono text-xs sm:text-sm text-white/60 leading-relaxed">
            <p>
              [ INTERFACE VER 4.2 ] : Four interconnected subsystems engineered to replace
              passive learning with high-velocity collaborative discovery.
            </p>
          </div>
        </div>

        {/* 4 Feature Compositions Grid with Parallax Floating */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Card 1: Interactive Cognitive Map (Span 7) */}
          <motion.div
            style={{ y: yCard1 }}
            className="lg:col-span-7 rounded-3xl border border-white/10 bg-forest-900/50 p-8 sm:p-10 backdrop-blur-md flex flex-col justify-between hover:border-mint-accent/40 transition-all duration-300 shadow-2xl"
          >
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div className="flex items-center gap-2 text-mint-accent">
                  <Network className="h-5 w-5" />
                  <span className="font-mono text-xs font-bold tracking-wider uppercase">
                    SYSTEM 01 // DYNAMIC COGNITIVE LATTICE
                  </span>
                </div>
                <span className="font-mono text-xs text-white/40">INTERACTIVE</span>
              </div>

              <h3 className="font-display text-2xl font-bold text-white mb-2">
                Post-Disciplinary Synaptic Graph
              </h3>
              <p className="text-sm font-light text-white/70 mb-8 max-w-xl">
                Hover across the nodes to observe real-time disciplinary intersections.
                Every cohort project synthesizes at least three foundational fields.
              </p>

              {/* Node selector buttons */}
              <div className="flex flex-wrap gap-2.5 mb-8">
                {cognitiveNodes.map((node) => {
                  const isCurrent = selectedNode.id === node.id;
                  return (
                    <button
                      key={node.id}
                      onClick={() => {
                        sound.playHover();
                        setSelectedNode(node);
                      }}
                      data-cursor="NODE"
                      className={`flex items-center gap-2 rounded-full px-4 py-2 font-mono text-xs transition-all ${
                        isCurrent
                          ? "bg-mint-accent text-forest-950 font-bold shadow-lg"
                          : "border border-white/15 bg-forest-950/60 text-white/80 hover:border-mint-accent/50 hover:text-white"
                      }`}
                    >
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: isCurrent ? "#06130d" : node.color }}
                      />
                      <span>{node.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Node Detail Console */}
            <div className="rounded-2xl border border-mint-accent/20 bg-forest-950/80 p-5 font-mono text-xs">
              <div className="flex items-center justify-between text-mint-accent mb-2">
                <span className="flex items-center gap-1.5">
                  <Terminal className="h-3.5 w-3.5" />
                  <span>ACTIVE SECTOR: {selectedNode.label.toUpperCase()}</span>
                </span>
                <span>{selectedNode.count}</span>
              </div>
              <p className="text-white/60 leading-relaxed font-light">
                Connected to adjacent clusters: Synthetic Ethics, Generative Biology, High-Assurance Kernels.
                Current fellowship cohorts are actively authoring 7 production-grade blueprints in this sector.
              </p>
            </div>
          </motion.div>

          {/* Card 2: Live Global Fellow Resonance (Span 5) */}
          <motion.div
            style={{ y: yCard2 }}
            className="lg:col-span-5 rounded-3xl border border-white/10 bg-forest-900/50 p-8 sm:p-10 backdrop-blur-md flex flex-col justify-between hover:border-mint-accent/40 transition-all duration-300 shadow-2xl"
          >
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div className="flex items-center gap-2 text-mint-accent">
                  <Activity className="h-5 w-5 animate-pulse" />
                  <span className="font-mono text-xs font-bold tracking-wider uppercase">
                    SYSTEM 02 // GLOBAL TELEMETRY
                  </span>
                </div>
                <span className="font-mono text-xs text-mint-accent flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-mint-accent animate-ping" />
                  LIVE
                </span>
              </div>

              <h3 className="font-display text-2xl font-bold text-white mb-2">
                Fellow Synchrony Pulse
              </h3>
              <p className="text-sm font-light text-white/70 mb-6">
                Zero operates as a borderless network. Watch active builds occurring across global nodes in real time.
              </p>

              <div className="flex flex-col gap-3">
                {liveFellows.map((fellow, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-xl border border-white/5 bg-forest-950/50 text-xs font-mono"
                  >
                    <div>
                      <div className="font-bold text-white flex items-center gap-2">
                        <span>{fellow.city}</span>
                        <span className="text-[10px] text-white/40 font-normal">[{fellow.latency}]</span>
                      </div>
                      <div className="text-white/60 text-[11px] truncate max-w-[180px] sm:max-w-[240px]">
                        {fellow.project}
                      </div>
                    </div>
                    <span className="px-2 py-1 rounded bg-forest-800 text-mint-accent text-[10px] uppercase tracking-wider">
                      {fellow.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 font-mono text-[11px] text-white/40 flex items-center justify-between">
              <span>ACTIVE CRUCIBLE FELLOWS: 48</span>
              <span>UPTIME: 99.98%</span>
            </div>
          </motion.div>

          {/* Card 3: Socratic Dialogue Simulator (Span 6) */}
          <motion.div
            style={{ y: yCard3 }}
            className="lg:col-span-6 rounded-3xl border border-white/10 bg-forest-900/50 p-8 sm:p-10 backdrop-blur-md flex flex-col justify-between hover:border-mint-accent/40 transition-all duration-300 shadow-2xl"
          >
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div className="flex items-center gap-2 text-mint-accent">
                  <MessageSquareCode className="h-5 w-5" />
                  <span className="font-mono text-xs font-bold tracking-wider uppercase">
                    SYSTEM 03 // SOCRATIC ORACLE
                  </span>
                </div>
                <span className="font-mono text-xs text-white/40">SYNTHESIS</span>
              </div>

              <h3 className="font-display text-2xl font-bold text-white mb-2">
                Recursive Inquiries
              </h3>
              <p className="text-sm font-light text-white/70 mb-6">
                Select a core dilemma to observe how the Zero Socratic Engine deconstructs assumptions.
              </p>

              <div className="flex flex-col gap-2 mb-6">
                {socraticQuestions.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      sound.playClick();
                      setActiveQuestion(idx);
                    }}
                    data-cursor="INQUIRE"
                    className={`text-left p-3 rounded-xl border text-xs font-mono transition-all ${
                      activeQuestion === idx
                        ? "border-mint-accent/50 bg-mint-accent/10 text-white font-medium"
                        : "border-white/5 bg-forest-950/40 text-white/60 hover:text-white hover:bg-forest-950/80"
                    }`}
                  >
                    &ldquo;{item.q}&rdquo;
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeQuestion}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="rounded-2xl border border-white/10 bg-forest-950 p-5"
                >
                  <p className="font-serif italic text-base sm:text-lg text-mint-100 leading-relaxed mb-3">
                    &ldquo;{socraticQuestions[activeQuestion].response}&rdquo;
                  </p>
                  <span className="font-mono text-[10px] text-mint-accent tracking-widest uppercase">
                    // {socraticQuestions[activeQuestion].author}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Card 4: The Artifact Foundry (Span 6) */}
          <motion.div
            style={{ y: yCard4 }}
            className="lg:col-span-6 rounded-3xl border border-white/10 bg-forest-900/50 p-8 sm:p-10 backdrop-blur-md flex flex-col justify-between hover:border-mint-accent/40 transition-all duration-300 shadow-2xl"
          >
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div className="flex items-center gap-2 text-mint-accent">
                  <FolderGit2 className="h-5 w-5" />
                  <span className="font-mono text-xs font-bold tracking-wider uppercase">
                    SYSTEM 04 // THE ARTIFACT FOUNDRY
                  </span>
                </div>
                <span className="font-mono text-xs text-white/40">OPEN REPO</span>
              </div>

              <h3 className="font-display text-2xl font-bold text-white mb-2">
                Proof of Work, Not Pedigree
              </h3>
              <p className="text-sm font-light text-white/70 mb-6">
                Every graduate builds open-source prototypes, publishes papers, or manufactures hardware before exit.
              </p>

              <div className="flex flex-col gap-3 mb-6">
                <div className="p-4 rounded-xl border border-white/10 bg-forest-950 flex items-center justify-between">
                  <div>
                    <div className="font-display font-bold text-white text-sm">
                      Lattice-Bio // v3.2
                    </div>
                    <div className="font-mono text-[11px] text-white/50">
                      Open CRISPR sequence generator for targeted microbial synthesis.
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-mint-accent shrink-0" />
                </div>

                <div className="p-4 rounded-xl border border-white/10 bg-forest-950 flex items-center justify-between">
                  <div>
                    <div className="font-display font-bold text-white text-sm">
                      ZeroKernel // Neuro-OS
                    </div>
                    <div className="font-mono text-[11px] text-white/50">
                      Sub-millisecond latency EEG decoder for cognitive prosthetic control.
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-mint-accent shrink-0" />
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-forest-800/40 border border-mint-accent/20 flex items-center justify-between font-mono text-xs">
              <span className="text-white/80">TOTAL PUBLIC REPOSITORIES: 142</span>
              <span className="text-mint-accent font-bold">100% MIT LICENSED</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
