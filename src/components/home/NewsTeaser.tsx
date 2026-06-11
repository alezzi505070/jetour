import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/i18n/config";
import type { Dict } from "@/i18n";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/motion/Reveal";

const newsImages = [
  "/images/lifestyle/home_3_2.jpg",
  "/images/lifestyle/home_3_5.jpg",
  "/images/lifestyle/home_3_6.jpg",
];

export default function NewsTeaser({ locale, dict }: { locale: Locale; dict: Dict }) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
      <SectionHeading kicker={dict.home.newsKicker} title={dict.home.newsTitle} />
      <div className="grid gap-6 md:grid-cols-3">
        {dict.newsPage.items.map((item, i) => (
          <Reveal key={i} delay={i * 0.12} className="h-full">
            <Link
              href={`/${locale}/news`}
              className="card-line group flex h-full flex-col overflow-hidden rounded-3xl transition-all duration-500 hover:border-ink/20"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={newsImages[i % newsImages.length]}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 90vw, 30vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night-950/80 to-transparent" />
                <span className="absolute bottom-3 start-4 text-xs font-bold uppercase tracking-widest text-sand-300">
                  {item.date}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-bold leading-snug text-ink transition-colors group-hover:text-accent-600">
                  {item.title}
                </h3>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-steel-300">
                  {item.text}
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
