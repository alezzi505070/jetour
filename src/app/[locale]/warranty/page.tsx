import type { Metadata } from "next";
import Link from "next/link";
import { isLocale, type Locale } from "@/i18n/config";
import { getDict } from "@/i18n";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/motion/Reveal";
import Counter from "@/components/motion/Counter";
import { btnPrimary, btnWhatsapp } from "@/components/ui/buttons";
import { waLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/icons";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDict(isLocale(locale) ? locale : "en");
  return { title: dict.warrantyPage.metaTitle, description: dict.warrantyPage.metaDescription };
}

export default async function WarrantyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const dict = getDict(locale);

  return (
    <div className="pb-24">
      <PageHeader
        kicker={dict.warrantyPage.kicker}
        title={dict.warrantyPage.title}
        sub={dict.warrantyPage.sub}
      />

      {/* big number */}
      <section className="mx-auto max-w-4xl px-5 py-8 text-center">
        <Reveal>
          <div className="card-line relative overflow-hidden rounded-[2.5rem] p-12 lg:p-16">
            <div
              className="absolute -top-24 left-1/2 h-48 w-[120%] -translate-x-1/2 rounded-[100%] bg-accent-500/14 blur-3xl"
              aria-hidden="true"
            />
            <p className="text-7xl font-extrabold text-ink sm:text-8xl" dir="ltr">
              <Counter value={1000000} duration={2.6} />
            </p>
            <p className="mt-3 text-2xl font-bold text-accent-600">
              {locale === "ar" ? "كيلومتر — أو 10 سنوات" : "kilometres — or 10 years"}
            </p>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {dict.warrantyPage.bullets.map((b, i) => (
            <Reveal key={i} delay={i * 0.12} className="h-full">
              <div className="glass h-full rounded-3xl p-8">
                <span className="text-4xl font-extrabold text-accent-500/40" dir="ltr">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-3 text-xl font-bold text-ink">{b.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-steel-300">{b.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.3}>
          <p className="mx-auto mt-10 max-w-2xl text-center text-xs leading-relaxed text-steel-400">
            {dict.warrantyPage.finePrint}
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link href={`/${locale}/quote`} className={btnPrimary}>
              {dict.common.requestQuote}
            </Link>
            <a
              href={waLink(dict.whatsapp.templates.general)}
              target="_blank"
              rel="noopener noreferrer"
              className={btnWhatsapp}
            >
              <WhatsAppIcon className="h-5 w-5" />
              {dict.common.whatsappInquiry}
            </a>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
