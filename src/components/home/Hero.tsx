"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import type { Locale } from "@/i18n/config";
import type { Dict } from "@/i18n";
import Car360 from "@/components/models/Car360";
import Counter from "@/components/motion/Counter";
import TextReveal from "@/components/motion/TextReveal";
import { btnGhost, btnPrimary } from "@/components/ui/buttons";
import Kicker from "@/components/ui/Kicker";
import { waLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/icons";

/**
 * Cinematic 3D hero — six depth layers:
 *   0 background photo (slow Ken Burns)   1 atmosphere glows
 *   2 giant watermark word                3 the car (360° turntable on a
 *     mouse-tilt perspective stage)       4 headline / CTAs / stats
 *   5 vignette + scroll hint
 */
export default function Hero({ locale, dict }: { locale: Locale; dict: Dict }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Scroll choreography: car sinks & shrinks, text drifts up faster.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const carY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const carScale = useTransform(scrollYProgress, [0, 1], [1, 0.86]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const watermarkY = useTransform(scrollYProgress, [0, 1], [0, 90]);

  // Mouse-tilt 3D stage
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springX = useSpring(tiltX, { stiffness: 60, damping: 16 });
  const springY = useSpring(tiltY, { stiffness: 60, damping: 16 });

  const onMouseMove = (e: React.MouseEvent) => {
    if (reduce) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    tiltY.set(px * 7); // rotateY
    tiltX.set(py * -5); // rotateX
  };
  const onMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  const stats = [
    dict.hero.stats.warranty,
    dict.hero.stats.years,
    dict.hero.stats.countries,
    dict.hero.stats.since,
  ];

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative flex min-h-[100svh] flex-col overflow-hidden pt-28 sm:pt-32"
    >
      {/* depth-0 — cinematic backdrop */}
      <div className="absolute inset-0 -z-30" aria-hidden="true">
        <motion.div
          initial={reduce ? undefined : { scale: 1.12 }}
          animate={reduce ? undefined : { scale: 1 }}
          transition={{ duration: 14, ease: "linear" }}
          className="h-full w-full bg-[url('/images/lifestyle/home_1.jpg')] bg-cover bg-center opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night-950/70 via-night-950/82 to-night-950" />
      </div>

      {/* depth-1 — atmosphere */}
      <div className="absolute inset-0 -z-20" aria-hidden="true">
        <div className="absolute start-[8%] top-[16%] h-80 w-80 rounded-full bg-accent-400/20 blur-[130px]" />
        <div className="absolute bottom-[10%] end-[6%] h-96 w-96 rounded-full bg-sky-400/20 blur-[150px]" />
      </div>

      {/* depth-2 — giant watermark */}
      <motion.div
        style={{ y: watermarkY, opacity: fade }}
        className="pointer-events-none absolute inset-x-0 top-[30%] -z-10 flex justify-center"
        aria-hidden="true"
      >
        <motion.span
          initial={{ opacity: 0, letterSpacing: "0.6em" }}
          animate={{ opacity: 1, letterSpacing: "0.18em" }}
          transition={{ duration: 2.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="select-none whitespace-nowrap text-[19vw] font-extrabold leading-none text-transparent lg:text-[15vw]"
          style={{ WebkitTextStroke: "1px rgba(15,35,75,0.10)" }}
          dir="ltr"
        >
          JETOUR
        </motion.span>
      </motion.div>

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col px-5 lg:px-8">
        {/* depth-4 — headline */}
        <motion.div style={{ y: textY, opacity: fade }} className="relative z-10 text-center">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mb-6"
          >
            <Kicker center>{dict.hero.kicker}</Kicker>
          </motion.p>
          <h1 className="mx-auto max-w-5xl text-4xl font-extrabold leading-[1.06] text-ink sm:text-6xl lg:text-7xl">
            <TextReveal text={dict.hero.title1} delay={0.35} stagger={0.09} />
            <br />
            <TextReveal
              text={dict.hero.title2}
              delay={0.6}
              stagger={0.09}
              wordClassName="text-gradient-accent"
            />
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.0 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-steel-300 sm:text-lg"
          >
            {dict.hero.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.2 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-4"
          >
            <Link href={`/${locale}/test-drive`} className={btnPrimary}>
              {dict.common.bookTestDrive}
            </Link>
            <Link href={`/${locale}/models`} className={btnGhost}>
              {dict.common.viewModels}
            </Link>
            <a
              href={waLink(dict.whatsapp.templates.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#1DA851] transition-opacity hover:opacity-80"
            >
              <WhatsAppIcon className="h-5 w-5" />
              {dict.common.whatsappInquiry}
            </a>
          </motion.div>
        </motion.div>

        {/* depth-3 — the car on a 3D stage */}
        <motion.div
          style={{ y: carY, scale: carScale, perspective: 1200 }}
          className="relative z-0 mx-auto -mt-4 w-full max-w-4xl flex-1 sm:-mt-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{ rotateX: springX, rotateY: springY, transformStyle: "preserve-3d" }}
            className="relative"
          >
            <Car360
              basePath="/images/360/t2"
              alt={locale === "ar" ? "جيتور T2 — عرض ثلاثي الأبعاد" : "JETOUR T2 — interactive 360° view"}
              className="aspect-[16/9] w-full"
            />
            {/* floor shadow + reflection glow */}
            <div
              className="absolute -bottom-4 left-1/2 h-12 w-[72%] -translate-x-1/2 rounded-[100%] bg-ink/25 blur-2xl"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-2 left-1/2 h-px w-[60%] -translate-x-1/2 bg-gradient-to-r from-transparent via-ink/25 to-transparent"
              aria-hidden="true"
            />
          </motion.div>

          {/* drag hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.4, duration: 1 }}
            className="pointer-events-none absolute inset-x-0 bottom-2 sm:-bottom-10 flex justify-center"
            aria-hidden="true"
          >
            <span className="flex items-center gap-2 rounded-full border border-ink/12 bg-night-900/70 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-steel-300 backdrop-blur">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4">
                <path d="M8 7l-4 5 4 5M16 7l4 5-4 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {dict.hero.dragHint}
            </span>
          </motion.div>
        </motion.div>

        {/* depth-4 — stats band */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.7 }}
          className="relative z-10 mb-10 mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/5 backdrop-blur lg:grid-cols-4"
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-1 bg-night-950/55 px-4 py-6 text-center"
            >
              <span className="text-2xl font-extrabold text-ink sm:text-3xl" dir="ltr">
                <Counter value={s.value} suffix={s.suffix} duration={1.6 + i * 0.2} />
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-steel-400">
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* depth-5 — scroll hint */}
      <motion.div
        style={{ opacity: fade }}
        className="pointer-events-none absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
        aria-hidden="true"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-steel-400">
          {dict.hero.scrollHint}
        </span>
        <motion.span
          animate={reduce ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="block h-9 w-5 rounded-full border border-ink/25"
        >
          <span className="mx-auto mt-1.5 block h-2 w-1 rounded-full bg-accent-500" />
        </motion.span>
      </motion.div>
    </section>
  );
}
