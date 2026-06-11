"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Word-by-word cinematic headline reveal — each word rises out of a clip mask
 * with a slight blur, staggered. The parent (unclipped) element drives
 * `whileInView`; words inherit the variant, since a clipped word would never
 * intersect the viewport on its own. RTL-safe.
 */
export default function TextReveal({
  text,
  className,
  wordClassName,
  active = true,
  delay = 0,
  stagger = 0.07,
  once = true,
}: {
  text: string;
  className?: string;
  /** Applied per word — use for gradient text (background-clip must sit on the transformed element). */
  wordClassName?: string;
  active?: boolean;
  delay?: number;
  stagger?: number;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  const words = text.split(/\s+/).filter(Boolean);

  if (reduce) return <span className={cn(className, wordClassName)}>{text}</span>;

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };
  const word: Variants = {
    hidden: { y: "115%", opacity: 0 },
    visible: {
      y: "0%",
      opacity: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.span
      className={cn("inline-block", className)}
      aria-label={text}
      initial="hidden"
      animate={active ? undefined : "hidden"}
      whileInView={active ? "visible" : undefined}
      viewport={active ? { once, amount: 0.4 } : undefined}
      variants={container}
    >
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-baseline"
          aria-hidden="true"
        >
          <motion.span
            className={cn("inline-block will-change-transform", wordClassName)}
            variants={word}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </motion.span>
  );
}
