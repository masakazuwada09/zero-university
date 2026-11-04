"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sound } from "@/lib/sound";
import { X, Check, ArrowRight, Sparkles } from "lucide-react";

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ApplicationModal({ isOpen, onClose }: ApplicationModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    track: "cognition",
    obsession: "",
    unpopularOpinion: "",
    proofOfWork: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playWarp();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-forest-950/85 backdrop-blur-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 30 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl rounded-3xl border border-mint-accent/40 bg-forest-900/95 p-8 sm:p-12 shadow-[0_0_90px_rgba(76,218,160,0.18)] max-h-[92vh] overflow-y-auto no-scrollbar"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-forest-950 text-white hover:border-mint-accent hover:text-mint-accent transition-colors"
              aria-label="Close application form"
            >
              <X className="h-5 w-5" />
            </button>

            {!submitted ? (
              <div>
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-mint-accent mb-2">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>// ZERO FELLOWSHIP APPLICATION</span>
                </div>

                <h3 className="font-display text-3xl sm:text-4xl font-bold text-white mb-2">
                  Initiate Cohort IX
                </h3>

                <p className="font-mono text-xs text-white/60 mb-8">
                  Zero does not ask for transcripts, GPA, or standardized test scores.
                  We evaluate only clarity of thought, intellectual courage, and tangible proof of mastery.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-wider text-white/70 mb-1.5">
                        Your Identity / Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ada Lovelace"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-forest-950/80 px-4 py-2.5 font-mono text-xs text-white placeholder-white/30 focus:border-mint-accent focus:outline-none focus:ring-1 focus:ring-mint-accent"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-wider text-white/70 mb-1.5">
                        Transmission Endpoint / Email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="ada@sovereign.xyz"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-forest-950/80 px-4 py-2.5 font-mono text-xs text-white placeholder-white/30 focus:border-mint-accent focus:outline-none focus:ring-1 focus:ring-mint-accent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-white/70 mb-1.5">
                      Chosen Inquiry Track
                    </label>
                    <select
                      value={formData.track}
                      onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-forest-950/80 px-4 py-2.5 font-mono text-xs text-white focus:border-mint-accent focus:outline-none focus:ring-1 focus:ring-mint-accent"
                    >
                      <option value="cognition">Track 01: Artificial General Cognition & Epistemology</option>
                      <option value="biology">Track 02: Synthetic Biology & Living Substrates</option>
                      <option value="planetary">Track 03: Autonomous Systems & Planetary Engineering</option>
                      <option value="aesthetics">Track 04: Radical Aesthetics & Spatial Computing</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-white/70 mb-1.5">
                      What is your singular intellectual obsession for the next 100 days?
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="e.g. Synthesizing de novo protein folds to catalytically bind microplastics at ocean temperatures..."
                      value={formData.obsession}
                      onChange={(e) => setFormData({ ...formData, obsession: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-forest-950/80 p-3 font-mono text-xs text-white placeholder-white/30 focus:border-mint-accent focus:outline-none focus:ring-1 focus:ring-mint-accent"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-white/70 mb-1.5">
                      What is one idea you believe is true that almost nobody agrees with?
                    </label>
                    <textarea
                      required
                      rows={2}
                      placeholder="Your honest unconventional conviction..."
                      value={formData.unpopularOpinion}
                      onChange={(e) => setFormData({ ...formData, unpopularOpinion: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-forest-950/80 p-3 font-mono text-xs text-white placeholder-white/30 focus:border-mint-accent focus:outline-none focus:ring-1 focus:ring-mint-accent"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-white/70 mb-1.5">
                      Proof of Work URL (GitHub, ArXiv, Figma, Video demo)
                    </label>
                    <input
                      type="url"
                      required
                      placeholder="https://github.com/..."
                      value={formData.proofOfWork}
                      onChange={(e) => setFormData({ ...formData, proofOfWork: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-forest-950/80 px-4 py-2.5 font-mono text-xs text-white placeholder-white/30 focus:border-mint-accent focus:outline-none focus:ring-1 focus:ring-mint-accent"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      data-cursor="TRANSMIT"
                      className="group flex w-full items-center justify-center gap-2 rounded-full bg-mint-accent py-3.5 font-mono text-xs font-bold text-forest-950 hover:bg-white transition-all shadow-lg shadow-mint-accent/20"
                    >
                      <span>TRANSMIT APPLICATION TO EVALUATION ORACLE</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              /* Success Confirmation */
              <div className="text-center py-10">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-mint-accent/20 border border-mint-accent text-mint-accent">
                  <Check className="h-8 w-8" />
                </div>

                <div className="font-mono text-xs text-mint-accent uppercase tracking-widest mb-2">
                  [ TRANSMISSION VERIFIED // ID: {Math.random().toString(36).substring(2, 9).toUpperCase()} ]
                </div>

                <h3 className="font-display text-3xl font-bold text-white mb-3">
                  Crucible Intake Received.
                </h3>

                <p className="font-serif italic text-base text-offwhite/80 max-w-md mx-auto mb-8">
                  &ldquo;We evaluate your proof of work with high-order scrutiny. If your thesis sparks intellectual resonance, our council will contact your transmission endpoint within 48 hours.&rdquo;
                </p>

                <button
                  type="button"
                  onClick={handleReset}
                  className="rounded-full border border-white/20 bg-forest-950 px-6 py-2.5 font-mono text-xs text-white hover:border-mint-accent hover:text-mint-accent transition-colors"
                >
                  RETURN TO ARCHITECTURE
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
