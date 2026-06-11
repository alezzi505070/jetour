"use client";

import { useEffect, useRef } from "react";
import {
  useInView,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

/** Animated stat counter that springs up when scrolled into view. */
export default function Counter({
  value,
  suffix = "",
  prefix = "",
  className,
  active = true,
  duration = 1.8,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  active?: boolean;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, {
    duration: duration * 1000,
    bounce: 0,
  });

  useEffect(() => {
    if (inView && active) motionValue.set(value);
  }, [inView, active, value, motionValue]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduce) {
      el.textContent = `${prefix}${value.toLocaleString()}${suffix}`;
      return;
    }
    return spring.on("change", (latest) => {
      el.textContent = `${prefix}${Math.round(latest).toLocaleString()}${suffix}`;
    });
  }, [spring, prefix, suffix, value, reduce]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
