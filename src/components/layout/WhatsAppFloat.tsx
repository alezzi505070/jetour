"use client";

import { motion } from "framer-motion";
import type { Locale } from "@/i18n/config";
import type { Dict } from "@/i18n";
import { waLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/icons";

/** Persistent floating WhatsApp button with a soft pulse ring (plan §14). */
export default function WhatsAppFloat({ dict }: { locale: Locale; dict: Dict }) {
  return (
    <motion.a
      href={waLink(dict.whatsapp.templates.general)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={dict.whatsapp.floatLabel}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.4, type: "spring", stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.94 }}
      className="group fixed bottom-20 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_28px_rgba(37,211,102,0.45)] md:bottom-8 ltr:right-5 rtl:left-5 md:ltr:right-8 md:rtl:left-8"
    >
      <span
        className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse-ring"
        aria-hidden="true"
      />
      <WhatsAppIcon className="relative h-7 w-7" />
      <span className="pointer-events-none absolute whitespace-nowrap rounded-full bg-night-800 px-3.5 py-1.5 text-xs font-semibold text-ink opacity-0 shadow-xl transition-opacity duration-300 group-hover:opacity-100 ltr:right-full ltr:mr-3 rtl:left-full rtl:ml-3">
        {dict.whatsapp.floatLabel}
      </span>
    </motion.a>
  );
}
