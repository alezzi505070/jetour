"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import type { Locale } from "@/i18n/config";
import type { Dict } from "@/i18n";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "@/components/ui/icons";
import { waLink } from "@/lib/whatsapp";

export default function Header({ locale, dict }: { locale: Locale; dict: Dict }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useEffect(
    () => scrollY.on("change", (y) => setScrolled(y > 24)),
    [scrollY],
  );

  // Close the drawer on navigation (state adjustment during render)
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    if (open) setOpen(false);
  }

  // Lock body scroll while the drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const nav = [
    { href: `/${locale}/models`, label: dict.nav.models },
    { href: `/${locale}/offers`, label: dict.nav.offers },
    { href: `/${locale}/test-drive`, label: dict.nav.testDrive },
    { href: `/${locale}/service`, label: dict.nav.service },
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  const drawerExtra = [
    { href: `/${locale}/warranty`, label: dict.nav.warranty },
    { href: `/${locale}/news`, label: dict.nav.news },
    { href: `/${locale}/faq`, label: dict.nav.faq },
    { href: `/${locale}/dealer`, label: dict.nav.dealer },
  ];

  const otherLocale: Locale = locale === "en" ? "ar" : "en";
  const switchHref = pathname?.replace(`/${locale}`, `/${otherLocale}`) ?? `/${otherLocale}`;

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "glass-strong py-2.5 shadow-2xl shadow-accent-900/10" : "bg-transparent py-5",
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 lg:px-8">
          <Link
            href={`/${locale}`}
            className="group flex items-center"
            aria-label={dict.meta.siteName}
          >
            <img src="/images/brand/natco-jetour-logo.png" alt="" className="h-10 w-auto object-contain invert" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
            {nav.map((item) => {
              const active = pathname?.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative text-[13px] font-semibold uppercase tracking-[0.14em] transition-colors hover:text-ink",
                    active ? "text-ink" : "text-steel-300",
                  )}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1.5 start-0 h-[2px] w-full rounded bg-accent-500"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            {/* Language switcher */}
            <Link
              href={switchHref}
              className="rounded-full border border-ink/15 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-steel-200 transition-all hover:border-ink/40 hover:text-ink"
              aria-label={otherLocale === "ar" ? "العربية" : "English"}
            >
              {otherLocale === "ar" ? "عربي" : "EN"}
            </Link>

            {/* WhatsApp CTA */}
            <a
              href={waLink(dict.whatsapp.templates.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition-all hover:brightness-110 hover:shadow-[0_0_24px_rgba(37,211,102,0.45)] sm:inline-flex"
            >
              <WhatsAppIcon className="h-4 w-4" />
              {dict.nav.whatsapp}
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label={open ? dict.nav.close : dict.nav.menu}
              className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full border border-ink/15 transition-colors hover:border-ink/40 lg:hidden"
            >
              <motion.span
                animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="block h-[2px] w-5 bg-ink"
              />
              <motion.span
                animate={open ? { opacity: 0 } : { opacity: 1 }}
                className="block h-[2px] w-5 bg-ink"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="block h-[2px] w-5 bg-ink"
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-ink/25 backdrop-blur-sm lg:hidden"
              aria-hidden="true"
            />
            <motion.aside
              initial={{ x: locale === "ar" ? "-100%" : "100%" }}
              animate={{ x: 0 }}
              exit={{ x: locale === "ar" ? "-100%" : "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 240 }}
              className="glass-strong fixed bottom-0 top-0 z-50 flex w-[82vw] max-w-sm flex-col gap-1 overflow-y-auto p-8 pt-24 lg:hidden ltr:right-0 rtl:left-0"
              aria-label={dict.nav.menu}
            >
              {[...nav, ...drawerExtra].map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: locale === "ar" ? -24 : 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "block border-b border-ink/8 py-3.5 text-lg font-bold transition-colors hover:text-accent-600",
                      pathname?.startsWith(item.href) ? "text-accent-600" : "text-ink",
                    )}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <a
                href={waLink(dict.whatsapp.templates.general)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white"
              >
                <WhatsAppIcon className="h-5 w-5" />
                {dict.common.whatsappInquiry}
              </a>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
