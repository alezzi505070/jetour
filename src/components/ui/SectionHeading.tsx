import Reveal from "@/components/motion/Reveal";
import TextReveal from "@/components/motion/TextReveal";
import Kicker from "@/components/ui/Kicker";
import { cn } from "@/lib/utils";

/** Standard section heading: editorial kicker + cinematic word-reveal title + sub. */
export default function SectionHeading({
  kicker,
  title,
  sub,
  align = "center",
  className,
}: {
  kicker?: string;
  title: string;
  sub?: string;
  align?: "center" | "start";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-12 max-w-3xl lg:mb-16",
        align === "center" ? "mx-auto text-center" : "text-start",
        className,
      )}
    >
      {kicker && (
        <Reveal direction="up" duration={0.7}>
          <Kicker center={align === "center"} className="mb-5">
            {kicker}
          </Kicker>
        </Reveal>
      )}
      <h2 className="text-3xl font-extrabold leading-tight text-ink sm:text-4xl lg:text-5xl">
        <TextReveal text={title} delay={0.1} />
      </h2>
      {sub && (
        <Reveal direction="up" delay={0.25}>
          <p className="mt-5 text-base leading-relaxed text-steel-300 sm:text-lg">{sub}</p>
        </Reveal>
      )}
    </div>
  );
}
