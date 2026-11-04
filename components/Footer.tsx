"use client";

import { useEffect, useState } from "react";
import { MagneticButton } from "./MagneticButton";
import { sound } from "@/lib/sound";
import { ArrowUp, Atom, FileText, Globe } from "lucide-react";

export function Footer() {
  const [times, setTimes] = useState({
    zurich: "--:--:--",
    tokyo: "--:--:--",
    sf: "--:--:--",
    london: "--:--:--",
  });

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      const formatTime = (timeZone: string) => {
        return new Intl.DateTimeFormat("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone,
        }).format(now);
      };

      setTimes({
        zurich: formatTime("Europe/Zurich"),
        tokyo: formatTime("Asia/Tokyo"),
        sf: formatTime("America/Los_Angeles"),
        london: formatTime("Europe/London"),
      });
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full border-t border-white/10 bg-forest-950 pt-20 pb-12 px-4 sm:px-8 overflow-hidden font-mono text-xs">
      {/* Subtle top subtle border glow */}
      <div className="mx-auto max-w-7xl">
        {/* World Timezones Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-14 border-b border-white/10">
          <div className="p-4 rounded-2xl border border-white/5 bg-forest-900/30">
            <span className="text-white/40 block mb-1">ZURICH [HQ]</span>
            <span className="font-bold text-white text-base">{times.zurich}</span>
            <span className="text-[10px] text-mint-accent/80 block mt-1">47.3769° N, 8.5417° E</span>
          </div>

          <div className="p-4 rounded-2xl border border-white/5 bg-forest-900/30">
            <span className="text-white/40 block mb-1">TOKYO [LAB]</span>
            <span className="font-bold text-white text-base">{times.tokyo}</span>
            <span className="text-[10px] text-mint-accent/80 block mt-1">35.6762° N, 139.6503° E</span>
          </div>

          <div className="p-4 rounded-2xl border border-white/5 bg-forest-900/30">
            <span className="text-white/40 block mb-1">SAN FRANCISCO</span>
            <span className="font-bold text-white text-base">{times.sf}</span>
            <span className="text-[10px] text-mint-accent/80 block mt-1">37.7749° N, 122.4194° W</span>
          </div>

          <div className="p-4 rounded-2xl border border-white/5 bg-forest-900/30">
            <span className="text-white/40 block mb-1">LONDON</span>
            <span className="font-bold text-white text-base">{times.london}</span>
            <span className="text-[10px] text-mint-accent/80 block mt-1">51.5074° N, 0.1278° W</span>
          </div>
        </div>

        {/* Middle Footer Editorial Brand */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5 mb-4">
              <Atom className="h-5 w-5 text-mint-accent" />
              <span className="font-display text-2xl font-bold tracking-tight text-white">
                ZERO UNIVERSITY<span className="text-mint-accent">.</span>
              </span>
            </div>
            <p className="font-serif italic text-base text-white/70 max-w-sm mb-6 font-light">
              &ldquo;An unaccredited sanctuary for those who refuse to wait for permission to understand the world.&rdquo;
            </p>
            <div className="flex items-center gap-2 text-mint-accent text-[11px]">
              <Globe className="h-3.5 w-3.5" />
              <span>POST-DISCIPLINARY JURISDICTION // INDEPENDENT COMMONS</span>
            </div>
          </div>

          <div className="md:col-span-3 flex flex-col gap-3">
            <span className="text-white/40 tracking-widest uppercase mb-1">Navigation</span>
            <a href="#manifesto" className="text-white/70 hover:text-mint-accent transition-colors">
              // 01. The Manifesto
            </a>
            <a href="#problem" className="text-white/70 hover:text-mint-accent transition-colors">
              // 02. The Paradox
            </a>
            <a href="#transformation" className="text-white/70 hover:text-mint-accent transition-colors">
              // 03. Metamorphosis
            </a>
            <a href="#experience" className="text-white/70 hover:text-mint-accent transition-colors">
              // 04. Interface OS
            </a>
            <a href="#tracks" className="text-white/70 hover:text-mint-accent transition-colors">
              // 05. Research Tracks
            </a>
          </div>

          <div className="md:col-span-4 flex flex-col justify-between h-full">
            <div>
              <span className="text-white/40 tracking-widest uppercase mb-2 block">
                Foundational Codex
              </span>
              <a
                href="#manifesto"
                onClick={(e) => {
                  e.preventDefault();
                  sound.playClick();
                  alert("Zero University Manifesto Codex [PDF, 42 pages] downloading in background.");
                }}
                className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-forest-900/40 p-3 text-xs text-white/80 hover:border-mint-accent hover:text-white transition-all"
              >
                <FileText className="h-4 w-4 text-mint-accent" />
                <span>DOWNLOAD COMPLETE ZERO MANIFESTO (PDF)</span>
              </a>
            </div>

            {/* Back to top button */}
            <div className="mt-8 flex justify-end">
              <MagneticButton
                onClick={scrollToTop}
                strength={0.3}
                dataCursor="TOP"
                className="flex items-center gap-2 rounded-full border border-white/15 bg-forest-900/60 px-4 py-2 text-xs text-white/80 hover:border-mint-accent hover:text-mint-accent transition-all"
              >
                <span>RETURN TO APEX</span>
                <ArrowUp className="h-3.5 w-3.5" />
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-white/40 text-[11px]">
          <div>
            © 2026 ZERO UNIVERSITY FOUNDATION. INSPIRED BY WHY ZERO UNIVERSITY.
          </div>
          <div className="flex items-center gap-6">
            <span>UNACCREDITED & PROUD</span>
            <span>NO GRADES</span>
            <span>ALL MASTERY</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
