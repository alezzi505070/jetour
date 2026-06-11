import type { Metadata } from "next";
import Link from "next/link";
import { isLocale, type Locale } from "@/i18n/config";
import { getDict } from "@/i18n";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/motion/Reveal";
import { waLink } from "@/lib/whatsapp";
import { btnPrimary, btnWhatsapp } from "@/components/ui/buttons";
import { WhatsAppIcon } from "@/components/ui/icons";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDict(isLocale(locale) ? locale : "en");
  return { title: dict.offersPage.metaTitle, description: dict.offersPage.metaDescription };
}

export default async function OffersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const dict = getDict(locale);
  const offer = dict.offersPage.launchOffer;

  return (
    <div className="pb-24">
      <PageHeader kicker={dict.offersPage.kicker} title={dict.offersPage.title} />

      <section className="mx-auto max-w-4xl px-5">
        <Reveal>
          <article className="card-line relative overflow-hidden rounded-[2.5rem] p-9 lg:p-14">
            <div className="absolute inset-0 -z-10" aria-hidden="true">
              <div className="absolute inset-0 bg-gradient-to-br from-night-800 to-night-950" />
              <div className="absolute -top-24 -end-24 h-72 w-72 rounded-full bg-accent-600/16 blur-[110px]" />
            </div>
            <span className="inline-block rounded-md border border-accent-500/25 bg-accent-500/8 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-accent-600">
              {offer.badge}
            </span>
            <h2 className="mt-6 text-3xl font-extrabold text-ink sm:text-4xl">{offer.title}</h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-steel-200 sm:text-lg">
              {offer.text}
            </p>
            <p className="mt-4 text-xs leading-relaxed text-steel-400">{offer.note}</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href={waLink(dict.whatsapp.templates.offers)}
                target="_blank"
                rel="noopener noreferrer"
                className={btnWhatsapp}
              >
                <WhatsAppIcon className="h-5 w-5" />
                {offer.cta}
              </a>
              <Link href={`/${locale}/quote`} className={btnPrimary}>
                {dict.common.requestQuote}
              </Link>
            </div>
          </article>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="glass mt-8 rounded-3xl p-8 text-center">
            <p className="leading-relaxed text-steel-300">{dict.home.offersEmpty}</p>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
