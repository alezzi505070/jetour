import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dict } from "@/i18n";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/motion/Reveal";
import { waLink } from "@/lib/whatsapp";
import { btnGhost, btnWhatsapp } from "@/components/ui/buttons";
import { WhatsAppIcon, ArrowIcon } from "@/components/ui/icons";

export default function OffersTeaser({ locale, dict }: { locale: Locale; dict: Dict }) {
  const offer = dict.offersPage.launchOffer;
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
      <SectionHeading kicker={dict.home.offersKicker} title={dict.home.offersTitle} />
      <div className="grid gap-6 lg:grid-cols-2">
        <Reveal>
          <div className="card-line group relative h-full overflow-hidden rounded-3xl p-8 transition-colors duration-500 hover:border-accent-500/30 lg:p-10">
            <span className="inline-block rounded-md border border-accent-500/25 bg-accent-500/8 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-accent-600">
              {offer.badge}
            </span>
            <h3 className="mt-5 text-2xl font-extrabold text-ink">{offer.title}</h3>
            <p className="mt-4 leading-relaxed text-steel-300">{offer.text}</p>
            <p className="mt-4 text-xs leading-relaxed text-steel-400">{offer.note}</p>
            <Link
              href={`/${locale}/offers`}
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-ink transition-colors hover:text-accent-600"
            >
              {dict.common.learnMore}
              <ArrowIcon />
            </Link>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="glass flex h-full flex-col items-center justify-center gap-6 rounded-3xl p-8 text-center lg:p-10">
            <p className="max-w-md leading-relaxed text-steel-200">{dict.home.offersEmpty}</p>
            <a
              href={waLink(dict.whatsapp.templates.offers)}
              target="_blank"
              rel="noopener noreferrer"
              className={btnWhatsapp}
            >
              <WhatsAppIcon className="h-5 w-5" />
              {dict.home.offersCta}
            </a>
            <Link href={`/${locale}/offers`} className={btnGhost}>
              {dict.nav.offers}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
