import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dict } from "@/i18n";
import { site } from "@/data/site";
import Reveal from "@/components/motion/Reveal";
import TextReveal from "@/components/motion/TextReveal";
import { btnPrimary, btnGhost } from "@/components/ui/buttons";
import { PhoneIcon, PinIcon } from "@/components/ui/icons";
import Kicker from "@/components/ui/Kicker";

export default function ContactStrip({ locale, dict }: { locale: Locale; dict: Dict }) {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-8 pt-12 lg:px-8">
      <div className="card-line relative overflow-hidden rounded-[2.5rem] p-8 sm:p-12 lg:p-16">
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          <div className="absolute inset-0 bg-[url('/jetore/images/lifestyle/home_3_3.jpg')] bg-cover bg-center opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-night-950 via-night-950/92 to-night-950/70" />
        </div>
        <div className="max-w-2xl">
          <Reveal>
            <Kicker className="mb-5">{dict.home.contactKicker}</Kicker>
          </Reveal>
          <h2 className="text-3xl font-extrabold text-ink sm:text-4xl lg:text-5xl">
            <TextReveal text={dict.home.contactTitle} />
          </h2>
          <Reveal delay={0.2}>
            <p className="mt-5 text-base leading-relaxed text-steel-300 sm:text-lg">
              {dict.home.contactText}
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-7 space-y-2.5 text-sm text-steel-200">
              <p className="flex items-center gap-2.5">
                <PinIcon className="h-4.5 w-4.5 shrink-0 text-accent-600" />
                {locale === "ar" ? site.addressAr : site.addressEn}
              </p>
              <p className="flex items-center gap-2.5">
                <PhoneIcon className="h-4.5 w-4.5 shrink-0 text-accent-600" />
                <a href={`tel:${site.phoneHref}`} dir="ltr" className="hover:text-ink">
                  {site.phone}
                </a>
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href={`/${locale}/contact`} className={btnPrimary}>
                {dict.nav.contact}
              </Link>
              <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className={btnGhost}>
                {dict.common.location}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
