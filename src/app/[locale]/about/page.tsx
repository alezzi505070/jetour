import type { Metadata } from "next";
import Image from "@/components/ui/Image";
import { isLocale, type Locale } from "@/i18n/config";
import { getDict } from "@/i18n";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Parallax from "@/components/motion/Parallax";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDict(isLocale(locale) ? locale : "en");
  return { title: dict.aboutPage.metaTitle, description: dict.aboutPage.metaDescription };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const dict = getDict(locale);

  return (
    <div className="pb-24">
      <PageHeader kicker={dict.aboutPage.kicker} title={dict.aboutPage.title} />

      {/* story */}
      <section className="mx-auto max-w-3xl space-y-7 px-5">
        {dict.aboutPage.paragraphs.map((p, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <p className="text-lg leading-relaxed text-steel-200">{p}</p>
          </Reveal>
        ))}
      </section>

      {/* cinematic image band */}
      <section className="relative mx-auto my-20 max-w-7xl overflow-hidden px-5 lg:px-8">
        <Reveal>
          <div className="relative h-[420px] overflow-hidden rounded-[2.5rem] border border-ink/10">
            <Parallax speed={0.4} className="absolute -inset-y-16 inset-x-0">
              <Image
                src="/images/lifestyle/home_2.jpg"
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
              />
            </Parallax>
            <div className="absolute inset-0 bg-gradient-to-t from-night-950/65 via-transparent to-night-950/25" />
            <p className="absolute bottom-8 start-8 max-w-md text-2xl font-extrabold text-ink sm:text-3xl">
              {dict.hero.slogan}
            </p>
          </div>
        </Reveal>
      </section>

      {/* Travel+ */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          kicker="Travel+"
          title={dict.aboutPage.travelTitle}
          sub={dict.aboutPage.travelText}
        />
        {/* timeline */}
        <div className="relative mx-auto mt-16 max-w-3xl">
          <div
            className="absolute bottom-4 top-4 w-px bg-gradient-to-b from-accent-500/60 via-ink/15 to-transparent ltr:left-[27px] rtl:right-[27px]"
            aria-hidden="true"
          />
          <ol className="space-y-10">
            {dict.aboutPage.timeline.map((t, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <li className="relative flex items-start gap-6 ps-0">
                  <span className="glass z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-sm font-extrabold text-accent-600">
                    {t.year}
                  </span>
                  <p className="pt-3.5 leading-relaxed text-steel-200">{t.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
