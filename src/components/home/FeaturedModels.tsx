import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dict } from "@/i18n";
import { models, featuredSlugs } from "@/data/models";
import ModelCard from "@/components/models/ModelCard";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/motion/Reveal";
import { btnGhost } from "@/components/ui/buttons";

export default function FeaturedModels({ locale, dict }: { locale: Locale; dict: Dict }) {
  const featured = featuredSlugs
    .map((slug) => models.find((m) => m.slug === slug))
    .filter((m): m is NonNullable<typeof m> => Boolean(m));

  return (
    <section className="relative mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
      <SectionHeading
        kicker={dict.home.featuredKicker}
        title={dict.home.featuredTitle}
        sub={dict.home.featuredSub}
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((model, i) => (
          <Reveal key={model.slug} delay={i * 0.1} className="h-full">
            <ModelCard model={model} locale={locale} dict={dict} className="h-full" />
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.3} className="mt-12 text-center">
        <Link href={`/${locale}/models`} className={btnGhost}>
          {dict.common.viewModels}
        </Link>
      </Reveal>
    </section>
  );
}
