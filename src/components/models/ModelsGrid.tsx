"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import type { Locale } from "@/i18n/config";
import type { Dict } from "@/i18n";
import { models, type Series } from "@/data/models";
import ModelCard from "./ModelCard";
import { cn } from "@/lib/utils";

type Filter = "all" | Series;

/** Filterable model grid with springy layout transitions between filters. */
export default function ModelsGrid({ locale, dict }: { locale: Locale; dict: Dict }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const [filter, setFilter] = useState<Filter>("all");

  const filters: Filter[] = ["all", "G", "T", "X", "D"];
  const visible = filter === "all" ? models : models.filter((m) => m.series === filter);

  return (
    <div>
      {/* filter pills */}
      <LayoutGroup id="model-filter">
        <div
          className="mb-12 flex flex-wrap items-center justify-center gap-2.5"
          role="tablist"
          aria-label={dict.models.title}
        >
          {filters.map((f) => {
            const active = filter === f;
            return (
              <button
                key={f}
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(f)}
                className={cn(
                  "relative rounded-full px-6 py-2.5 text-sm font-bold uppercase tracking-wider transition-colors duration-300",
                  active ? "text-white" : "text-steel-400 hover:text-ink",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="filter-pill"
                    transition={{ type: "spring", stiffness: 320, damping: 28 }}
                    className="absolute inset-0 rounded-full bg-accent-500 shadow-[0_0_28px_rgba(37,99,235,0.35)]"
                  />
                )}
                <span className="relative">{dict.common.series[f === "all" ? "all" : f]}</span>
              </button>
            );
          })}
        </div>
      </LayoutGroup>

      {/* grid */}
      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((model, i) => (
            <motion.div
              key={model.slug}
              layout
              initial={mounted ? { opacity: 0, scale: 0.92, y: 30 } : false}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ duration: 0.45, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
            >
              <ModelCard model={model} locale={locale} dict={dict} priority={i < 3} className="h-full" />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <p className="mt-10 text-center text-xs text-steel-400">{dict.common.verifyAvailability}</p>
    </div>
  );
}
