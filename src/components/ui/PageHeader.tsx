import Reveal from "@/components/motion/Reveal";
import TextReveal from "@/components/motion/TextReveal";
import Kicker from "@/components/ui/Kicker";

/** Interior page hero — editorial kicker, cinematic title, optional sub, ambient glow. */
export default function PageHeader({
  kicker,
  title,
  sub,
}: {
  kicker?: string;
  title: string;
  sub?: string;
}) {
  return (
    <header className="relative overflow-hidden pb-14 pt-36 text-center lg:pt-44">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute start-1/3 top-0 h-80 w-80 rounded-full bg-accent-400/15 blur-[140px]" />
        <div className="absolute end-1/4 top-24 h-64 w-64 rounded-full bg-sky-400/15 blur-[120px]" />
      </div>
      <div className="mx-auto max-w-3xl px-5">
        {kicker && (
          <Reveal duration={0.7}>
            <Kicker center className="mb-6">
              {kicker}
            </Kicker>
          </Reveal>
        )}
        <h1 className="text-4xl font-extrabold leading-tight text-ink sm:text-5xl lg:text-6xl">
          <TextReveal text={title} delay={0.1} />
        </h1>
        {sub && (
          <Reveal delay={0.3}>
            <p className="mt-6 text-base leading-relaxed text-steel-300 sm:text-lg">{sub}</p>
          </Reveal>
        )}
      </div>
    </header>
  );
}
