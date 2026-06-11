import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getDict } from "@/i18n";
import { getModel, models } from "@/data/models";
import { site } from "@/data/site";
import { waLink } from "@/lib/whatsapp";
import Reveal from "@/components/motion/Reveal";
import TextReveal from "@/components/motion/TextReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Kicker from "@/components/ui/Kicker";
import Gallery from "@/components/models/Gallery";
import Car360, { ODD_TURNTABLE } from "@/components/models/Car360";
import { btnGhost, btnPrimary, btnWhatsapp } from "@/components/ui/buttons";
import { ArrowIcon, WhatsAppIcon } from "@/components/ui/icons";

export function generateStaticParams() {
  return locales.flatMap((locale) => models.map((m) => ({ locale, slug: m.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const model = getModel(slug);
  if (!model) return {};
  return {
    title: `${model.name[locale]} — ${model.tagline[locale]}`,
    description: model.overview[locale],
    openGraph: {
      title: model.name[locale],
      description: model.overview[locale],
      images: [model.hero],
    },
  };
}

export default async function ModelPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const dict = getDict(locale);
  const model = getModel(slug);
  if (!model) notFound();

  const available = model.availability === "available";

  const specRows: { label: string; value: string }[] = [
    { label: dict.models.engine, value: model.specs.engine[locale] },
    { label: dict.models.power, value: model.specs.power[locale] },
    { label: dict.models.torque, value: model.specs.torque[locale] },
    { label: dict.models.transmission, value: model.specs.transmission[locale] },
    { label: dict.models.dimensions, value: model.specs.dimensions[locale] },
    { label: dict.models.seats, value: model.specs.seats[locale] },
    { label: dict.models.fuelType, value: model.specs.powertrain[locale] },
  ];

  // Product schema with no price (plan §16: offers price intentionally absent)
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: model.name.en,
    brand: { "@type": "Brand", name: "JETOUR" },
    description: model.overview.en,
    image: `${site.baseUrl}${model.hero}`,
    offers: {
      "@type": "Offer",
      availability: available ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
      seller: { "@type": "AutoDealer", name: "NATCO Automotive Co. Ltd" },
    },
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* ---- Hero ---- */}
      <header className="relative flex min-h-[88svh] items-end overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src={model.hero}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night-950 via-night-950/45 to-night-950/25" />
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-night-950/85 to-transparent" />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 pt-44 lg:px-8">
          <Reveal direction="up" duration={0.7}>
            <Link
              href={`/${locale}/models`}
              className="mb-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-steel-300 transition-colors hover:text-ink"
            >
              <ArrowIcon className="h-3.5 w-3.5 rotate-180 rtl:rotate-0" />
              {dict.common.backToModels}
            </Link>
          </Reveal>
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={
                available
                  ? "rounded-md border border-emerald-600/25 bg-emerald-50 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-700"
                  : "rounded-md border border-sand-400/30 bg-amber-50 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-sand-300"
              }
              title={dict.common.verifyAvailability}
            >
              {available ? dict.common.available : dict.common.comingSoon}
            </span>
            {model.hybrid && (
              <span className="rounded-md border border-sky-600/25 bg-sky-50 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-sky-700">
                HYBRID i-DM
              </span>
            )}
          </div>
          <h1 className="mt-5 text-5xl font-extrabold leading-none text-ink sm:text-6xl lg:text-7xl">
            <TextReveal text={model.name[locale]} />
          </h1>
          <Reveal delay={0.25}>
            <p className="mt-4 max-w-xl text-lg font-medium text-steel-200 sm:text-xl">
              {model.tagline[locale]}
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href={`/${locale}/quote?model=${model.slug}`} className={btnPrimary}>
                {dict.common.requestQuote}
              </Link>
              <Link href={`/${locale}/test-drive?model=${model.slug}`} className={btnGhost}>
                {dict.common.bookTestDrive}
              </Link>
              <a
                href={waLink(dict.whatsapp.templates.price, { MODEL: model.name[locale] })}
                target="_blank"
                rel="noopener noreferrer"
                className={btnWhatsapp}
              >
                <WhatsAppIcon className="h-5 w-5" />
                {dict.nav.whatsapp}
              </a>
            </div>
          </Reveal>
        </div>
      </header>

      {/* ---- Overview ---- */}
      <section className="mx-auto max-w-4xl px-5 py-20 text-center lg:px-8">
        <Reveal>
          <Kicker center className="mb-6">
            {dict.models.overview}
          </Kicker>
        </Reveal>
        <p className="text-xl font-medium leading-relaxed text-steel-100 sm:text-2xl">
          <TextReveal text={model.overview[locale]} stagger={0.015} />
        </p>
      </section>

      {/* ---- 360 viewer (hero models only) ---- */}
      {model.has360 && (
        <section className="relative mx-auto max-w-6xl overflow-hidden px-5 pb-12 lg:px-8">
          <div className="card-line relative rounded-[2.5rem] px-6 py-12 sm:px-12">
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(ellipse_at_bottom,rgba(37,99,235,0.08),transparent_65%)]"
              aria-hidden="true"
            />
            <Car360
              basePath={`/images/360/${model.slug}`}
              alt={`${model.name[locale]} 360°`}
              className="mx-auto aspect-[16/9] w-full max-w-4xl"
              frames={model.slug === "g700" ? ODD_TURNTABLE : undefined}
            />
            <p className="mt-4 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-steel-400">
              {dict.hero.dragHint} — 360°
            </p>
          </div>
        </section>
      )}

      {/* ---- Highlights ---- */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <SectionHeading kicker={model.name[locale]} title={dict.models.highlights} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {model.highlights.map((h, i) => (
            <Reveal key={i} delay={i * 0.1} className="h-full">
              <div className="glass group h-full rounded-3xl p-7 transition-all duration-500 hover:border-accent-500/35">
                <span className="text-4xl font-extrabold text-ink/12 transition-colors duration-500 group-hover:text-accent-500/30" dir="ltr">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-lg font-bold text-ink">{h.title[locale]}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-steel-300">{h.text[locale]}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---- Gallery ---- */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <SectionHeading kicker={dict.models.gallery} title={model.name[locale]} />
        <Gallery images={model.gallery} alt={model.name[locale]} />
      </section>

      {/* ---- Specs ---- */}
      <section className="mx-auto max-w-4xl px-5 py-16 lg:px-8">
        <SectionHeading kicker={dict.models.specs} title={model.name[locale]} />
        <Reveal>
          <div className="card-line overflow-hidden rounded-3xl">
            <table className="w-full text-start">
              <tbody>
                {specRows.map((row, i) => (
                  <tr
                    key={row.label}
                    className={i % 2 === 0 ? "bg-ink/[0.025]" : ""}
                  >
                    <th
                      scope="row"
                      className="w-2/5 px-6 py-4 text-start text-xs font-bold uppercase tracking-[0.16em] text-steel-400"
                    >
                      {row.label}
                    </th>
                    <td className="px-6 py-4 text-sm font-medium text-steel-100">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-5 text-center text-xs leading-relaxed text-steel-400">
            {dict.common.disclaimerSpecs}
          </p>
        </Reveal>
      </section>

      {/* ---- Final CTA ---- */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <Reveal>
          <div className="card-line relative overflow-hidden rounded-[2.5rem] p-10 text-center lg:p-16">
            <div className="absolute inset-0 -z-10" aria-hidden="true">
              <div className="absolute inset-0 bg-gradient-to-br from-night-800 to-night-950" />
              <div className="absolute -top-20 left-1/2 h-56 w-[110%] -translate-x-1/2 rounded-[100%] bg-accent-600/14 blur-3xl" />
            </div>
            <div className="relative mx-auto mb-8 aspect-[16/7] w-full max-w-xl">
              <Image
                src={model.cutout}
                alt={model.name[locale]}
                fill
                sizes="(max-width: 640px) 90vw, 560px"
                className="animate-float object-contain drop-shadow-[0_30px_36px_rgba(23,52,118,0.28)]"
              />
            </div>
            <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">
              {dict.models.ctaTitle.replace("{model}", model.name[locale])}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-steel-300">{dict.models.ctaSub}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href={`/${locale}/quote?model=${model.slug}`} className={btnPrimary}>
                {dict.common.requestQuote}
              </Link>
              <Link href={`/${locale}/test-drive?model=${model.slug}`} className={btnGhost}>
                {dict.common.bookTestDrive}
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </article>
  );
}
