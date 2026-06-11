"use client";

import Link from "next/link";
import Image from "@/components/ui/Image";
import { motion, useReducedMotion } from "framer-motion";
import type { VehicleModel } from "@/data/models";
import type { Locale } from "@/i18n/config";
import type { Dict } from "@/i18n";
import { cn } from "@/lib/utils";
import { ArrowIcon } from "@/components/ui/icons";

/** Premium vehicle card — glass body, floating cutout that lifts on hover. */
export default function ModelCard({
  model,
  locale,
  dict,
  priority = false,
  className,
}: {
  model: VehicleModel;
  locale: Locale;
  dict: Dict;
  priority?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const available = model.availability === "available";

  return (
    <motion.article
      whileHover={reduce ? undefined : { y: -10 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={cn(
        "group card-line relative flex flex-col overflow-hidden rounded-3xl",
        "transition-shadow duration-500 hover:shadow-[0_24px_70px_-18px_rgba(37,99,235,0.25)]",
        className,
      )}
    >
      {/* availability badge */}
      <span
        className={cn(
          "absolute top-4 z-10 rounded-full px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] ltr:left-4 rtl:right-4",
          available
            ? "border border-emerald-600/25 bg-emerald-50 text-emerald-700"
            : "border border-sand-400/30 bg-amber-50 text-sand-300",
        )}
        title={dict.common.verifyAvailability}
      >
        {available ? dict.common.available : dict.common.comingSoon}
      </span>

      {/* hover glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        aria-hidden="true"
      >
        <div className="absolute -top-24 left-1/2 h-48 w-[120%] -translate-x-1/2 rounded-[100%] bg-accent-500/12 blur-3xl" />
      </div>

      {/* vehicle cutout */}
      <Link
        href={`/${locale}/models/${model.slug}`}
        className="relative block px-6 pt-12"
        aria-label={model.name[locale]}
      >
        <motion.div
          className="relative mx-auto aspect-[16/9] w-full"
          whileHover={reduce ? undefined : { scale: 1.04 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <Image
            src={model.cutout}
            alt={model.name[locale]}
            fill
            priority={priority}
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 380px"
            className="object-contain drop-shadow-[0_24px_28px_rgba(23,52,118,0.25)] transition-transform duration-700 group-hover:-translate-y-1"
          />
        </motion.div>
        {/* floor line */}
        <div
          className="mx-auto mt-1 h-px w-3/4 bg-gradient-to-r from-transparent via-ink/15 to-transparent transition-all duration-700 group-hover:via-accent-500/50"
          aria-hidden="true"
        />
      </Link>

      {/* body */}
      <div className="flex flex-1 flex-col gap-2 p-6 pt-5">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-lg font-extrabold tracking-wide text-ink">
            {model.name[locale]}
          </h3>
          <span className="rounded-md border border-ink/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-steel-400">
            {model.hybrid ? "i-DM" : dict.common.series[model.series]}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-steel-300">{model.tagline[locale]}</p>

        <div className="mt-auto flex items-center gap-4 pt-4">
          <Link
            href={`/${locale}/models/${model.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-ink transition-colors hover:text-accent-600"
          >
            {dict.common.viewDetails}
            <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </Link>
          <Link
            href={`/${locale}/quote?model=${model.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-steel-400 transition-colors hover:text-ink"
          >
            {dict.common.requestQuote}
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
