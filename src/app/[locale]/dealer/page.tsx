import type { Metadata } from "next";
import Image from "@/components/ui/Image";
import { isLocale, type Locale } from "@/i18n/config";
import { getDict } from "@/i18n";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/motion/Reveal";
import Counter from "@/components/motion/Counter";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDict(isLocale(locale) ? locale : "en");
  return { title: dict.dealerPage.metaTitle, description: dict.dealerPage.metaDescription };
}

export default async function DealerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const dict = getDict(locale);

  return (
    <div className="pb-24">
      <PageHeader kicker={dict.dealerPage.kicker} title={dict.dealerPage.title} />

      <section className="mx-auto max-w-3xl space-y-7 px-5">
        {dict.dealerPage.paragraphs.map((p, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <p className="text-lg leading-relaxed text-steel-200">{p}</p>
          </Reveal>
        ))}
      </section>

      {/* heritage number */}
      <section className="mx-auto max-w-4xl px-5 py-16 text-center">
        <Reveal>
          <div className="card-line relative overflow-hidden rounded-[2.5rem] p-12">
            <div
              className="absolute -top-20 left-1/2 h-40 w-[120%] -translate-x-1/2 rounded-[100%] bg-sand-400/10 blur-3xl"
              aria-hidden="true"
            />
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-steel-400">
              {locale === "ar" ? "تخدم اليمن منذ" : "Serving Yemen since"}
            </p>
            <p className="mt-3 text-7xl font-extrabold text-ink" dir="ltr">
              <Counter value={1990} duration={2} />
            </p>
          </div>
        </Reveal>
      </section>

      {/* facts grid */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {dict.dealerPage.facts.map((fact, i) => (
            <Reveal key={i} delay={i * 0.1} className="h-full">
              <div className="glass h-full rounded-3xl p-7 text-center">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-steel-400">
                  {fact.label}
                </p>
                <p className="mt-3 text-xl font-extrabold text-ink">{fact.value}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* showroom band */}
      <section className="mx-auto mt-16 max-w-7xl px-5 lg:px-8">
        <Reveal>
          <div className="relative h-[380px] overflow-hidden rounded-[2.5rem] border border-ink/10">
            <Image
              src="/images/lifestyle/home_3_3.jpg"
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night-950/85 to-night-950/20" />
            <p className="absolute bottom-8 start-8 max-w-lg text-2xl font-extrabold text-ink sm:text-3xl">
              {dict.home.contactTitle}
            </p>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
