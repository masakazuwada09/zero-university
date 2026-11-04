"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { sound } from "@/lib/sound";
import { Volume2, VolumeX } from "lucide-react";

export function AudioToggle() {
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const unsub = sound.subscribe((isMuted) => {
      setMuted(isMuted);
    });
    return unsub;
  }, []);

  const handleToggle = () => {
    sound.toggleMute();
  };

  return (
    <button
      onClick={handleToggle}
      className="group relative flex items-center gap-2.5 rounded-full border border-white/10 bg-forest-900/60 px-3.5 py-1.5 backdrop-blur-md transition-all duration-300 hover:border-mint-accent/50 hover:bg-forest-850"
      aria-label={muted ? "Unmute generative soundscape" : "Mute audio"}
      data-cursor={muted ? "SOUND ON" : "MUTE"}
    >
      <div className="flex items-center gap-[3px] h-3.5">
        {[0.4, 0.9, 0.6, 0.8].map((baseHeight, i) => (
          <motion.span
            key={i}
            className={`w-[2px] rounded-full transition-colors duration-300 ${
              muted ? "bg-white/40" : "bg-mint-accent"
            }`}
            animate={
              muted
                ? { height: "4px" }
                : {
                    height: ["3px", `${baseHeight * 14}px`, "4px"],
                  }
            }
            transition={
              muted
                ? { duration: 0.3 }
                : {
                    duration: 0.6 + i * 0.15,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: i * 0.1,
                  }
            }
          />
        ))}
      </div>
      <span className="font-mono text-[11px] tracking-wider text-white/70 group-hover:text-mint-accent transition-colors">
        {muted ? "AUDIO [OFF]" : "AUDIO [LIVE]"}
      </span>
      {muted ? (
        <VolumeX className="w-3.5 h-3.5 text-white/50 group-hover:text-mint-accent transition-colors" />
      ) : (
        <Volume2 className="w-3.5 h-3.5 text-mint-accent" />
      )}
    </button>
  );
}
