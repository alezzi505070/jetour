"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/** Default 36-frame turntable: 00.png … 35.png */
const FULL_TURNTABLE = Array.from({ length: 36 }, (_, i) => `${String(i).padStart(2, "0")}.png`);

/** G700 ships an 18-frame turntable using odd frames only: 01.png … 35.png */
export const ODD_TURNTABLE = Array.from({ length: 18 }, (_, i) => `${String(i * 2 + 1).padStart(2, "0")}.png`);

/**
 * Interactive turntable viewer built from JETOUR's official exterior photography.
 * Renders on a `<canvas>` for sub-millisecond drawing performance (bypassing DOM repaint lag).
 * Uses Linear Interpolation (lerping) to smooth pointer jitter, and friction decay
 * to simulate physical momentum scroll. Defer-loads off-screen frames during idle time.
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

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const [dragging, setDragging] = useState(false);
  const reduce = useReducedMotion();

  // Reference tables and loaded elements
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const isReadyRef = useRef(false);

  // Animation values
  const targetFrameRef = useRef(startIndex);
  const currentFrameRef = useRef(startIndex);
  const velocityRef = useRef(0);
  const lastPointerXRef = useRef(0);
  const lastPointerTimeRef = useRef(0);
  const autoRotateAccumulator = useRef(0);

  const getFrameSrc = (index: number) => {
    const normalized = ((index % count) + count) % count;
    return `${basePath}/${frames[normalized]}`;
  };

  const drawFrame = (frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const normalizedIndex = ((Math.round(frameIndex) % count) + count) % count;
    const img = imagesRef.current[normalizedIndex] || imagesRef.current[startIndex];

    if (img && img.complete && img.naturalWidth > 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
  };

  // 1. Preload active frame immediately, then defer loading other frames.
  useEffect(() => {
    let cancelled = false;
    const imgs: HTMLImageElement[] = [];

    const initialImg = new Image();
    initialImg.src = getFrameSrc(startIndex);
    initialImg.onload = initialImg.onerror = () => {
      if (cancelled) return;
      imgs[startIndex] = initialImg;
      setReady(true);
      isReadyRef.current = true;
      drawFrame(startIndex);

      // Preload remaining frames in idle time
      const preloadRest = () => {
        if (cancelled) return;
        for (let i = 0; i < count; i++) {
          if (i === startIndex) continue;
          const img = new Image();
          img.src = getFrameSrc(i);
          imgs[i] = img;
        }
        imagesRef.current = imgs;
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
      imgs.forEach((img) => {
        if (img) img.onload = img.onerror = null;
      });
    };
  }, [basePath, frames, count, startIndex]);

  // Redraw when viewport scale changes
  useEffect(() => {
    if (ready) {
      drawFrame(currentFrameRef.current);
    }
  }, [ready]);

  // 2. Momentum & LERP loop
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const loop = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1); // cap dt at 100ms
      lastTime = now;

      // 1. Apply Momentum Decay when NOT dragging
      if (!dragging) {
        if (Math.abs(velocityRef.current) > 0.05) {
          targetFrameRef.current += velocityRef.current * dt * 60;
          velocityRef.current *= Math.exp(-4.2 * dt); // friction decay rate
        } else {
          velocityRef.current = 0;
          // 2. Idle Auto-Rotate
          if (autoRotate && !reduce && isReadyRef.current) {
            autoRotateAccumulator.current += dt * (count >= 30 ? 6.5 : 4.5);
            if (autoRotateAccumulator.current >= 1) {
              targetFrameRef.current += Math.floor(autoRotateAccumulator.current);
              autoRotateAccumulator.current %= 1;
            }
          }
        }
      }

      // 3. Linear Interpolation (lerping)
      if (isReadyRef.current) {
        const lerpFactor = reduce ? 1 : Math.min(14 * dt, 1);
        const diff = targetFrameRef.current - currentFrameRef.current;
        currentFrameRef.current += diff * lerpFactor;
        drawFrame(currentFrameRef.current);
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [dragging, autoRotate, reduce, count]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (!ready) return;
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.setPointerCapture(e.pointerId);
    }
    setDragging(true);
    velocityRef.current = 0;
    lastPointerXRef.current = e.clientX;
    lastPointerTimeRef.current = performance.now();
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging || !ready) return;

    const now = performance.now();
    const dt = now - lastPointerTimeRef.current;
    const dx = e.clientX - lastPointerXRef.current;

    // Swipe sensitivity: 10 pixels of drag rotates 1 frame
    const pxPerFrame = 10;
    const frameDelta = -dx / pxPerFrame;

    targetFrameRef.current += frameDelta;

    if (dt > 0) {
      // Calculate instantaneous velocity (frames/sec)
      velocityRef.current = (frameDelta / dt) * 1000;
    }

    lastPointerXRef.current = e.clientX;
    lastPointerTimeRef.current = now;
  };

  const onPointerUp = () => {
    setDragging(false);
    // Limit max velocity to prevent infinite/dizzy spinning
    const maxVelocity = 45;
    velocityRef.current = Math.max(-maxVelocity, Math.min(maxVelocity, velocityRef.current));
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
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      onPointerCancel={onPointerUp}
      role="img"
      aria-label={alt}
    >
      <canvas
        ref={canvasRef}
        width={1024}
        height={576}
        className="h-full w-full object-contain drop-shadow-[0_42px_50px_rgba(23,52,118,0.30)]"
      />
      {!ready && (
        <span
          className="absolute bottom-3 start-1/2 h-1 w-28 -translate-x-1/2 overflow-hidden rounded-full bg-ink/10"
          aria-hidden="true"
        >
          <span className="block h-full w-1/3 animate-shimmer rounded-full bg-gradient-to-r from-transparent via-accent-500 to-transparent bg-[length:200%_100%]" />
        </span>
      )}
    </div>
  );
}
