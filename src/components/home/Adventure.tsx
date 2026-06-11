"use client";

import { useRef } from "react";
import Image from "@/components/ui/Image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import type { Locale } from "@/i18n/config";
import type { Dict } from "@/i18n";
import TextReveal from "@/components/motion/TextReveal";
import Reveal from "@/components/motion/Reveal";
import Kicker from "@/components/ui/Kicker";

/**
 * Cinematic lifestyle interlude — full-bleed parallax photography with a
 * marquee strip and floating image cards moving at different scroll speeds.
 */
export default function Adventure({ dict }: { locale: Locale; dict: Dict }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const cardLeftY = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const cardRightY = useTransform(scrollYProgress, [0, 1], [120, -40]);

  const marqueeWords = ["G700", "T2", "DASHING", "X90 PLUS", "T1", "X70 PLUS", "TRAVEL+"];

  return (
    <section ref={ref} className="relative overflow-hidden py-28 lg:py-40">
      {/* parallax backdrop */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <motion.div style={reduce ? undefined : { y: bgY }} className="absolute -inset-y-[14%] inset-x-0">
          <Image
            src="/images/lifestyle/home_2.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-night-950/72" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-night-950 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-night-950 to-transparent" />
      </div>

      {/* marquee */}
      <div className="edge-fade-x mb-16 overflow-hidden" aria-hidden="true" dir="ltr">
        <div className="flex w-max animate-marquee gap-12 whitespace-nowrap">
          {[...marqueeWords, ...marqueeWords].map((w, i) => (
            <span
              key={i}
              className="text-5xl font-extrabold uppercase tracking-[0.14em] text-transparent sm:text-6xl"
              style={{ WebkitTextStroke: "1px rgba(15,35,75,0.16)" }}
            >
              {w}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2 lg:px-8">
        <div>
          <Reveal>
            <Kicker className="mb-5 text-sand-300">{dict.home.adventureKicker}</Kicker>
          </Reveal>
          <h2 className="text-4xl font-extrabold leading-[1.1] text-ink sm:text-5xl lg:text-6xl">
            <TextReveal text={dict.home.adventureTitle1} />
            <br />
            <TextReveal
              text={dict.home.adventureTitle2}
              delay={0.25}
              wordClassName="text-gradient-silver"
            />
          </h2>
          <Reveal delay={0.35}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-steel-200">
              {dict.home.adventureText}
            </p>
          </Reveal>
          <Reveal delay={0.5}>
            <p className="mt-8 text-2xl font-bold text-sand-300">{dict.hero.slogan}</p>
          </Reveal>
        </div>

        {/* floating photo cards at different depths */}
        <div className="relative hidden h-[480px] lg:block" aria-hidden="true">
          <motion.div
            style={reduce ? undefined : { y: cardLeftY }}
            className="absolute start-0 top-10 w-[58%] overflow-hidden rounded-3xl border border-ink/10 shadow-2xl shadow-accent-900/20"
          >
            <Image
              src="/images/lifestyle/home_3_1.jpg"
              alt=""
              width={640}
              height={420}
              className="h-auto w-full object-cover"
            />
          </motion.div>
          <motion.div
            style={reduce ? undefined : { y: cardRightY }}
            className="absolute bottom-0 end-0 w-[52%] overflow-hidden rounded-3xl border border-ink/10 shadow-2xl shadow-accent-900/20"
          >
            <Image
              src="/images/lifestyle/home_3_4.jpg"
              alt=""
              width={640}
              height={420}
              className="h-auto w-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
