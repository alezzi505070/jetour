"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "start" | "end" | "none";

const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 48 },
  down: { x: 0, y: -48 },
  start: { x: -56, y: 0 },
  end: { x: 56, y: 0 },
  none: { x: 0, y: 0 },
};

/**
 * Scroll-triggered reveal. Uses blur+slide for a cinematic entrance.
 * `start`/`end` are direction-agnostic offsets (fine in RTL since they're symmetric visual slides).
 */
export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.9,
  once = true,
  className,
  amount = 0.25,
}: {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  once?: boolean;
  className?: string;
  amount?: number;
}) {
  const reduce = useReducedMotion();
  const { x, y } = offsets[direction];

  const variants: Variants = {
    hidden: reduce
      ? { opacity: 0 }
      : { opacity: 0, x, y },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration, delay, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
