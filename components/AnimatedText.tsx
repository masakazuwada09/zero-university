"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  className?: string;
  type?: "words" | "chars" | "mask" | "blur";
  delay?: number;
  duration?: number;
  once?: boolean;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
}

export function AnimatedText({
  text,
  className = "",
  type = "words",
  delay = 0,
  duration = 0.8,
  once = true,
  as: Component = "div",
}: AnimatedTextProps) {
  if (type === "words") {
    const words = text.split(" ");
    return (
      <Component className={cn("inline-block flex-wrap", className)}>
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden mr-[0.25em] align-top">
            <motion.span
              className="inline-block"
              initial={{ y: "115%", opacity: 0, rotateZ: 2 }}
              whileInView={{ y: "0%", opacity: 1, rotateZ: 0 }}
              viewport={{ once, margin: "-10% 0px" }}
              transition={{
                duration: duration,
                ease: [0.22, 1, 0.36, 1],
                delay: delay + i * 0.035,
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </Component>
    );
  }

  if (type === "chars") {
    const chars = Array.from(text);
    return (
      <Component className={cn("inline-block", className)}>
        {chars.map((char, i) => (
          <span key={i} className="inline-block overflow-hidden align-top">
            <motion.span
              className="inline-block"
              initial={{ y: "110%", opacity: 0 }}
              whileInView={{ y: "0%", opacity: 1 }}
              viewport={{ once, margin: "-10% 0px" }}
              transition={{
                duration: duration * 0.7,
                ease: [0.16, 1, 0.3, 1],
                delay: delay + i * 0.018,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          </span>
        ))}
      </Component>
    );
  }

  if (type === "blur") {
    return (
      <Component className={cn("inline-block", className)}>
        <motion.span
          className="inline-block"
          initial={{ opacity: 0, filter: "blur(12px)", y: 20 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once, margin: "-10% 0px" }}
          transition={{
            duration: duration * 1.1,
            ease: [0.22, 1, 0.36, 1],
            delay,
          }}
        >
          {text}
        </motion.span>
      </Component>
    );
  }

  // "mask" reveal default
  return (
    <Component className={cn("overflow-hidden block", className)}>
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        whileInView={{ y: "0%", opacity: 1 }}
        viewport={{ once, margin: "-10% 0px" }}
        transition={{
          duration: duration,
          ease: [0.22, 1, 0.36, 1],
          delay,
        }}
      >
        {text}
      </motion.div>
    </Component>
  );
}
