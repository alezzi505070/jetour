import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dict } from "@/i18n";
import Reveal from "@/components/motion/Reveal";
import Counter from "@/components/motion/Counter";
import TextReveal from "@/components/motion/TextReveal";
import { CheckIcon } from "@/components/ui/icons";
import { btnGhost } from "@/components/ui/buttons";
import Kicker from "@/components/ui/Kicker";

/** Warranty trust block — the 1,000,000 km headline number front and centre. */
export default function TrustSection({ locale, dict }: { locale: Locale; dict: Dict }) {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden="true"
      >
        <div className="h-[480px] w-[480px] rounded-full bg-accent-600/8 blur-[160px]" />
      </div>
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2 lg:px-8">
        <div>
          <Reveal>
            <Kicker className="mb-5">{dict.home.trustKicker}</Kicker>
          </Reveal>
          <h2 className="text-3xl font-extrabold leading-tight text-ink sm:text-4xl lg:text-5xl">
            <TextReveal text={dict.home.trustTitle} />
          </h2>
          <Reveal delay={0.25}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-steel-300 sm:text-lg">
              {dict.home.trustText}
            </p>
          </Reveal>
          <ul className="mt-8 space-y-3.5">
            {dict.home.trustPoints.map((point, i) => (
              <Reveal key={i} delay={0.3 + i * 0.1}>
                <li className="flex items-center gap-3 text-steel-100">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 ring-1 ring-emerald-500/30">
                    <CheckIcon className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-medium sm:text-base">{point}</span>
                </li>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.7}>
            <p className="mt-6 text-xs leading-relaxed text-steel-400">{dict.home.trustNote}</p>
            <div className="mt-7">
              <Link href={`/${locale}/warranty`} className={btnGhost}>
                {dict.nav.warranty}
              </Link>
            </div>
          </Reveal>
        </div>

        {/* big number panel */}
        <Reveal direction="end" delay={0.2}>
          <div className="glass relative overflow-hidden rounded-[2rem] p-10 text-center lg:p-14">
            <div
              className="absolute -top-20 left-1/2 h-40 w-[120%] -translate-x-1/2 rounded-[100%] bg-accent-500/15 blur-3xl"
              aria-hidden="true"
            />
            <p className="text-[13px] font-bold uppercase tracking-[0.3em] text-steel-400">
              {dict.hero.stats.warranty.label}
            </p>
            <p className="mt-4 text-6xl font-extrabold text-ink sm:text-7xl" dir="ltr">
              <Counter value={1000000} duration={2.4} />
            </p>
            <p className="mt-2 text-xl font-bold text-accent-600">
              {locale === "ar" ? "كيلومتر" : "kilometres"}
            </p>
            <div className="mx-auto my-7 h-px w-2/3 bg-gradient-to-r from-transparent via-ink/20 to-transparent" />
            <p className="text-4xl font-extrabold text-ink" dir="ltr">
              <Counter value={10} duration={1.6} />
            </p>
            <p className="mt-1 text-sm font-semibold uppercase tracking-[0.2em] text-steel-300">
              {locale === "ar" ? "سنوات ضمان" : "years of warranty"}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
