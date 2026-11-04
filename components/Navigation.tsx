"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AudioToggle } from "./AudioToggle";
import { MagneticButton } from "./MagneticButton";
import { sound } from "@/lib/sound";
import { Menu, X, ArrowUpRight, Atom } from "lucide-react";

interface NavigationProps {
  onOpenApply?: () => void;
}

const navLinks = [
  { label: "Manifesto", href: "#manifesto", section: "manifesto" },
  { label: "Paradox", href: "#problem", section: "problem" },
  { label: "Metamorphosis", href: "#transformation", section: "transformation" },
  { label: "Interface", href: "#experience", section: "experience" },
  { label: "3D Lab", href: "#three-lab", section: "three-lab" },
  { label: "Tracks", href: "#tracks", section: "tracks" },
];

export function Navigation({ onOpenApply }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Detect active section
      const sections = navLinks.map((item) => document.getElementById(item.section));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navLinks[i].section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => {
    sound.playClick();
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-4 px-4 sm:px-8 pointer-events-none">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          {/* Brand Logo */}
          <div className="pointer-events-auto">
            <MagneticButton href="#" strength={0.2} dataCursor="HOME">
              <div className="flex items-center gap-2.5 rounded-full border border-white/10 bg-forest-950/70 px-4 py-2 backdrop-blur-md transition-all duration-300 hover:border-mint-accent/40">
                <Atom className="h-4 w-4 text-mint-accent animate-spin-slow" />
                <span className="font-display font-bold tracking-tight text-white text-sm sm:text-base">
                  ZERO<span className="text-mint-accent">.</span>U
                </span>
                <span className="hidden sm:inline-block h-1.5 w-1.5 rounded-full bg-mint-accent animate-pulse" />
                <span className="hidden md:inline-block font-mono text-[10px] text-white/50 tracking-wider">
                  COHORT IX
                </span>
              </div>
            </MagneticButton>
          </div>

          {/* Desktop Floating Navigation Pill */}
          <nav
            className={`pointer-events-auto hidden md:flex items-center gap-1 rounded-full border px-2 py-1.5 backdrop-blur-xl transition-all duration-500 ${
              scrolled
                ? "border-white/15 bg-forest-950/85 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                : "border-white/10 bg-forest-900/50"
            }`}
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.section;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  data-cursor="GOTO"
                  className={`relative px-4 py-1.5 text-xs font-mono tracking-wider transition-colors duration-300 ${
                    isActive ? "text-mint-accent font-medium" : "text-white/70 hover:text-white"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 rounded-full bg-forest-700/60 -z-10 border border-mint-accent/30"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action: Audio & Apply */}
          <div className="pointer-events-auto flex items-center gap-2.5 sm:gap-3">
            <AudioToggle />

            <div className="hidden sm:block">
              <MagneticButton
                onClick={onOpenApply}
                strength={0.3}
                dataCursor="APPLY"
                className="group flex items-center gap-2 rounded-full border border-mint-accent/40 bg-mint-accent/10 px-4 py-2 text-xs font-mono font-medium text-mint-accent backdrop-blur-md transition-all duration-300 hover:border-mint-accent hover:bg-mint-accent hover:text-forest-950"
              >
                <span>INITIATE</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </MagneticButton>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              aria-label="Toggle Navigation Menu"
              data-cursor="MENU"
              className="md:hidden flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-forest-950/80 text-white backdrop-blur-md hover:border-mint-accent/40"
            >
              {mobileMenuOpen ? <X className="h-5 w-5 text-mint-accent" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-forest-950/95 px-6 pt-24 pb-12 backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col gap-6 pt-8">
              <p className="font-mono text-xs uppercase tracking-widest text-mint-accent/60">
                // ARCHITECTURE NAVIGATION
              </p>
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx, duration: 0.4 }}
                  className="font-display text-3xl font-bold tracking-tight text-white hover:text-mint-accent flex items-center justify-between border-b border-white/10 pb-4"
                >
                  <span>{link.label}</span>
                  <span className="font-mono text-xs text-white/40">0{idx + 1}</span>
                </motion.a>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenApply) onOpenApply();
                }}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-mint-accent py-3.5 font-mono text-sm font-bold text-forest-950"
              >
                <span>INITIATE APPLICATION</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
              <div className="flex items-center justify-between font-mono text-xs text-white/40 pt-2">
                <span>ZURICH • TOKYO • SAN FRANCISCO</span>
                <span>VER 4.0</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
