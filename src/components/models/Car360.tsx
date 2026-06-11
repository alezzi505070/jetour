"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/** Default 36-frame turntable: 00.png … 35.png */
const FULL_TURNTABLE = Array.from({ length: 36 }, (_, i) => `${String(i).padStart(2, "0")}.png`);

/** G700 ships an 18-frame turntable using odd frames only: 01.png … 35.png */
export const ODD_TURNTABLE = Array.from({ length: 18 }, (_, i) => `${String(i * 2 + 1).padStart(2, "0")}.png`);

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

  // Reference hooks to store state variables without triggering constant re-renders
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const isReadyRef = useRef(false);

  // Smooth rotation animation refs
  const targetFrameRef = useRef(startIndex);
  const currentFrameRef = useRef(startIndex);
  const velocityRef = useRef(0); // frames per second rotation speed
  const lastPointerX = useRef(0);
  const lastPointerTime = useRef(0);
  const autoRotateAccumulator = useRef(0);
  const interactedRef = useRef(false);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getFrameSrc = (index: number) => {
    const normalized = ((index % count) + count) % count;
    return `${basePath}/${frames[normalized]}`;
  };

  // Draw the current frame onto the canvas
  const drawFrame = (frameVal: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Convert decimal frame index to nearest integer index
    const roundedIndex = ((Math.round(frameVal) % count) + count) % count;
    const img = imagesRef.current[roundedIndex] || imagesRef.current[startIndex];

    if (img && img.complete && img.naturalWidth > 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
  };

  // Handle device-pixel-ratio scaling to keep the canvas sharp
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

    // Standard high-definition internal resolution scaled by screen dpr
    const width = 1024;
    const height = 576;

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
  };

  // 1. Preload active frame first, then defer loading other frames to idle time.
  useEffect(() => {
    let cancelled = false;
    const imgs: HTMLImageElement[] = [];

    // Set initial canvas dimension bounds
    resizeCanvas();

    // Load active beauty frame first so visual loading is instant
    const initialImg = new Image();
    initialImg.src = getFrameSrc(startIndex);
    initialImg.onload = initialImg.onerror = () => {
      if (cancelled) return;
      imgs[startIndex] = initialImg;
      imagesRef.current = imgs;
      setReady(true);
      isReadyRef.current = true;

      // Draw initial frame immediately
      drawFrame(startIndex);

      // Defer preloading of all remaining frames
      const preloadRest = () => {
        if (cancelled) return;
        for (let i = 0; i < count; i++) {
          if (i === startIndex) continue;
          const img = new Image();
          img.src = getFrameSrc(i);
          // Set onload to draw frames as they come in if we are matching that frame
          img.onload = img.onerror = () => {
            if (!cancelled) {
              imgs[i] = img;
              imagesRef.current = imgs;
              // If we are currently showing this index, redraw
              const currentRound = ((Math.round(currentFrameRef.current) % count) + count) % count;
              if (currentRound === i) {
                drawFrame(currentFrameRef.current);
              }
            }
          };
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

  // Handle window resizing
  useEffect(() => {
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  // 2. Linear Interpolation (Lerp) and Physics Loop
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const loop = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1); // Cap delta time at 100ms
      lastTime = now;

      if (isReadyRef.current) {
        // A. Handle momentum/inertia when not dragging
        if (!dragging) {
          if (Math.abs(velocityRef.current) > 0.05) {
            targetFrameRef.current += velocityRef.current * dt;
            // Dampen velocity with friction decay
            velocityRef.current *= Math.exp(-3.8 * dt);
          } else {
            velocityRef.current = 0;

            // B. Idle auto-rotation (only when not interacting)
            if (autoRotate && !interactedRef.current && !reduce) {
              const speed = count >= 30 ? 4.5 : 3.0; // frames per second
              autoRotateAccumulator.current += dt * speed;
              if (autoRotateAccumulator.current >= 1) {
                targetFrameRef.current += Math.floor(autoRotateAccumulator.current);
                autoRotateAccumulator.current %= 1;
              }
            }
          }
        }

        // C. Interpolation (Lerp) toward target frame
        const lerpFactor = reduce ? 1.0 : Math.min(18 * dt, 1.0); // Damping constant
        const diff = targetFrameRef.current - currentFrameRef.current;
        currentFrameRef.current += diff * lerpFactor;

        // D. Draw the current interpolated frame
        drawFrame(currentFrameRef.current);
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [dragging, autoRotate, reduce, count]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (!ready) return;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    setDragging(true);
    interactedRef.current = true;
    velocityRef.current = 0;
    lastPointerX.current = e.clientX;
    lastPointerTime.current = performance.now();
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging || !ready) return;

    const now = performance.now();
    const dt = now - lastPointerTime.current;
    const dx = e.clientX - lastPointerX.current;

    // Control drag sensitivity: drag 14px to shift 1 frame
    const pxPerFrame = 14;
    const frameDelta = -dx / pxPerFrame;

    targetFrameRef.current += frameDelta;

    // Calculate instantaneous swipe velocity
    if (dt > 0) {
      velocityRef.current = (frameDelta / dt) * 1000; // frames per second
    }

    lastPointerX.current = e.clientX;
    lastPointerTime.current = now;
  };

  const endDrag = () => {
    if (!dragging) return;
    setDragging(false);

    // Limit maximum spin speed to prevent excessive spinning
    const maxVelocity = 45; // frames per second
    velocityRef.current = Math.max(-maxVelocity, Math.min(maxVelocity, velocityRef.current));

    // Reset interaction flag after an idle period (3.5 seconds)
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      interactedRef.current = false;
      autoRotateAccumulator.current = 0;
    }, 3500);
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
      <canvas
        ref={canvasRef}
        className={cn(
          "mx-auto h-full w-full object-contain drop-shadow-[0_42px_50px_rgba(23,52,118,0.30)]",
          !ready && "hidden"
        )}
      />
      {!ready && (
        <img
          src={getFrameSrc(startIndex)}
          alt={alt}
          className="mx-auto h-full w-full object-contain drop-shadow-[0_42px_50px_rgba(23,52,118,0.30)]"
          loading="eager"
        />
      )}
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
