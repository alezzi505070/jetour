import type { Metadata } from "next";
import Image from "@/components/ui/Image";
import { isLocale, type Locale } from "@/i18n/config";
import { getDict } from "@/i18n";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/motion/Reveal";

const newsImages = [
  "/images/lifestyle/home_3_2.jpg",
  "/images/lifestyle/home_3_5.jpg",
  "/images/lifestyle/home_3_6.jpg",
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDict(isLocale(locale) ? locale : "en");
  return { title: dict.newsPage.metaTitle, description: dict.newsPage.metaDescription };
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const dict = getDict(locale);

  return (
    <div className="pb-24">
      <PageHeader kicker={dict.newsPage.kicker} title={dict.newsPage.title} />

      <section className="mx-auto max-w-5xl space-y-8 px-5">
        {dict.newsPage.items.map((item, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <article className="card-line group grid gap-0 overflow-hidden rounded-3xl transition-colors duration-500 hover:border-ink/20 md:grid-cols-5">
              <div className="relative aspect-[16/9] md:col-span-2 md:aspect-auto">
                <Image
                  src={newsImages[i % newsImages.length]}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 90vw, 40vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-8 md:col-span-3">
                <time className="text-xs font-bold uppercase tracking-[0.2em] text-sand-300">
                  {item.date}
                </time>
                <h2 className="mt-3 text-2xl font-extrabold leading-snug text-ink">
                  {item.title}
                </h2>
                <p className="mt-4 leading-relaxed text-steel-300">{item.text}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </section>
    </div>
  );
}
