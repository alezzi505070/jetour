import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dict } from "@/i18n";
import { site } from "@/data/site";
import { models } from "@/data/models";

export default function Footer({ locale, dict }: { locale: Locale; dict: Dict }) {
  const year = new Date().getFullYear();

  const exploreLinks = [
    { href: `/${locale}/models`, label: dict.nav.models },
    { href: `/${locale}/offers`, label: dict.nav.offers },
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/dealer`, label: dict.nav.dealer },
    { href: `/${locale}/news`, label: dict.nav.news },
  ];
  const serviceLinks = [
    { href: `/${locale}/test-drive`, label: dict.nav.testDrive },
    { href: `/${locale}/quote`, label: dict.common.requestQuote },
    { href: `/${locale}/service`, label: dict.nav.service },
    { href: `/${locale}/warranty`, label: dict.nav.warranty },
    { href: `/${locale}/faq`, label: dict.nav.faq },
  ];

  return (
    <footer className="relative mt-24 border-t border-ink/8 bg-night-900">
      {/* subtle top glow line */}
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-500/60 to-transparent"
        aria-hidden="true"
      />
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {/* Brand block */}
        <div className="space-y-4">
          <div className="flex items-center">
            <img src="/images/brand/natco-jetour-logo.png" alt="" className="h-12 md:h-16 lg:h-20 w-auto object-contain" />
          </div>
          <p className="text-sm font-medium text-sand-300">{dict.footer.tagline}</p>
          <p className="text-sm leading-relaxed text-steel-400">{dict.footer.authorizedDealer}</p>
        </div>

        {/* Explore */}
        <nav aria-label={dict.footer.explore}>
          <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-steel-400">
            {dict.footer.explore}
          </h3>
          <ul className="space-y-2.5">
            {exploreLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-steel-200 transition-colors hover:text-accent-600">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Services */}
        <nav aria-label={dict.footer.services}>
          <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-steel-400">
            {dict.footer.services}
          </h3>
          <ul className="space-y-2.5">
            {serviceLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-steel-200 transition-colors hover:text-accent-600">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-steel-400">
            {dict.footer.contact}
          </h3>
          <ul className="space-y-2.5 text-sm text-steel-200">
            <li>{locale === "ar" ? site.addressAr : site.addressEn}</li>
            <li>
              <a href={`tel:${site.phoneHref}`} dir="ltr" className="transition-colors hover:text-accent-600">
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="transition-colors hover:text-accent-600">
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Models strip */}
      <div className="border-t border-ink/5">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-x-6 gap-y-2 px-5 py-5 lg:px-8">
          {models.map((m) => (
            <Link
              key={m.slug}
              href={`/${locale}/models/${m.slug}`}
              className="text-xs font-medium uppercase tracking-wider text-steel-400 transition-colors hover:text-ink"
            >
              {m.name[locale]}
            </Link>
          ))}
        </div>
      </div>

      <div className="border-t border-ink/5">
        <div className="mx-auto max-w-7xl space-y-3 px-5 py-6 lg:px-8">
          <p className="text-xs leading-relaxed text-steel-400/80">{dict.footer.disclaimer}</p>
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-steel-400">
            <span>
              © {year} {dict.meta.siteName}. {dict.footer.rights}
            </span>
            <span className="flex gap-5">
              <Link href={`/${locale}/privacy`} className="transition-colors hover:text-ink">
                {dict.legal.privacyTitle}
              </Link>
              <Link href={`/${locale}/terms`} className="transition-colors hover:text-ink">
                {dict.legal.termsTitle}
              </Link>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
