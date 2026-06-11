"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/** Default 36-frame turntable: 00.png … 35.png */
const FULL_TURNTABLE = Array.from({ length: 36 }, (_, i) => `${String(i).padStart(2, "0")}.png`);

/** G700 ships an 18-frame turntable using odd frames only: 01.png … 35.png */
export const ODD_TURNTABLE = Array.from({ length: 18 }, (_, i) => `${String(i * 2 + 1).padStart(2, "0")}.png`);

/**
 * Interactive turntable viewer built from JETOUR's official exterior
 * photography. Drag (or touch-drag) to rotate; gently auto-spins while idle.
 * Frames are preloaded and swapped on a single <img> so the browser cache
 * does the heavy lifting.
 */
export default function Car360({
  basePath,
  alt,
  className,
  autoRotate = true,
  frames = FULL_TURNTABLE,
  initialIndex,
}: {
  basePath: string; // e.g. /images/360/t2
  alt: string;
  className?: string;
  autoRotate?: boolean;
  frames?: string[];
  initialIndex?: number;
}) {
  const count = frames.length;
  const startIndex = initialIndex ?? Math.floor(count * 0.64); // side-profile beauty angle
  const [frame, setFrame] = useState(startIndex);
  const [ready, setReady] = useState(false);
  const [dragging, setDragging] = useState(false);
  const reduce = useReducedMotion();

  const frameRef = useRef(startIndex);
  const lastX = useRef(0);
  const acc = useRef(0);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const interacted = useRef(false);

  const src = useCallback(
    (i: number) => `${basePath}/${frames[((i % count) + count) % count]}`,
    [basePath, frames, count],
  );

  const setFrameSafe = useCallback(
    (i: number) => {
      const normalized = ((i % count) + count) % count;
      frameRef.current = normalized;
      setFrame(normalized);
    },
    [count],
  );

  // Preload active frame first, then defer preloading other frames to idle time.
  useEffect(() => {
    let cancelled = false;
    const imgs: HTMLImageElement[] = [];

    // 1. Load the initial visible frame immediately
    const initialImg = new Image();
    initialImg.src = src(startIndex);
    initialImg.onload = initialImg.onerror = () => {
      if (cancelled) return;
      setReady(true);

      // 2. Defer preloading the rest of the turntable frames until the browser is idle
      const preloadRest = () => {
        if (cancelled) return;
        for (let i = 0; i < count; i++) {
          if (i === startIndex) continue;
          const img = new Image();
          img.src = src(i);
          imgs.push(img);
        }
      };

      if (typeof window !== "undefined" && "requestIdleCallback" in window) {
        window.requestIdleCallback(() => preloadRest());
      } else {
        setTimeout(preloadRest, 600);
      }
    };

    return () => {
      cancelled = true;
      initialImg.onload = initialImg.onerror = null;
      imgs.forEach((img) => (img.onload = img.onerror = null));
    };
  }, [src, count, startIndex]);

  // Idle auto-rotation (paused while dragging / shortly after interaction).
  useEffect(() => {
    if (!autoRotate || !ready || reduce) return;
    const interval = count >= 30 ? 130 : 200; // slower step for sparser turntables
    const id = setInterval(() => {
      if (dragging || interacted.current) return;
      setFrameSafe(frameRef.current + 1);
    }, interval);
    return () => clearInterval(id);
  }, [autoRotate, ready, dragging, reduce, setFrameSafe, count]);

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    setDragging(true);
    interacted.current = true;
    lastX.current = e.clientX;
    acc.current = 0;
    if (idleTimer.current) clearTimeout(idleTimer.current);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    acc.current += e.clientX - lastX.current;
    lastX.current = e.clientX;
    const step = count >= 30 ? 10 : 18; // px of drag per frame
    while (Math.abs(acc.current) >= step) {
      const dir = acc.current > 0 ? -1 : 1;
      setFrameSafe(frameRef.current + dir);
      acc.current += dir * step;
    }
  };

  const endDrag = () => {
    setDragging(false);
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => (interacted.current = false), 3500);
  };

  return (
    <div
      className={cn(
        "relative select-none touch-pan-y",
        dragging ? "cursor-grabbing" : "cursor-grab",
        className,
      )}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
      onPointerCancel={endDrag}
      role="img"
      aria-label={alt}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- frame-swapped turntable; next/image would re-optimize every frame */}
      <img
        src={src(frame)}
        alt={alt}
        draggable={false}
        className="pointer-events-none h-full w-full object-contain drop-shadow-[0_42px_50px_rgba(23,52,118,0.30)]"
        fetchPriority="high"
      />
      {!ready && (
        <span
          className="absolute bottom-3 start-1/2 h-1 w-28 -translate-x-1/2 overflow-hidden rounded-full bg-ink/10 rtl:translate-x-1/2"
          aria-hidden="true"
        >
          <span className="block h-full w-1/3 animate-shimmer rounded-full bg-gradient-to-r from-transparent via-accent-500 to-transparent bg-[length:200%_100%]" />
        </span>
      )}
    </div>
  );
}
