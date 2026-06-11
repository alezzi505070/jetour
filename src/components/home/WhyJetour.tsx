import type { Locale } from "@/i18n/config";
import type { Dict } from "@/i18n";
import SectionHeading from "@/components/ui/SectionHeading";
import FeatureCard from "@/components/ui/FeatureCard";
import Reveal from "@/components/motion/Reveal";

const icons = [
  // off-road
  <svg key="0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
    <path d="M3 17h2m14 0h2M7 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0Zm6 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z" strokeLinecap="round" />
    <path d="M5 17V9l3-4h6l4 4h2a2 2 0 0 1 2 2v6M2 12l3-3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  // space
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
    <path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3" strokeLinecap="round" />
    <circle cx="12" cy="12" r="3.2" />
  </svg>,
  // smart
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
    <rect x="3" y="5" width="18" height="12" rx="2" />
    <path d="M8 21h8m-4-4v4M7 9.5h4M7 12.5h7" strokeLinecap="round" />
  </svg>,
  // health
  <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
    <path d="M12 21s-7.5-4.6-9.4-9.2C1.2 8.2 3.3 5 6.6 5c2 0 3.6 1.1 4.4 2.7H13c.8-1.6 2.4-2.7 4.4-2.7 3.3 0 5.4 3.2 4 6.8C19.5 16.4 12 21 12 21Z" strokeLinejoin="round" />
  </svg>,
];

export default function WhyJetour({ dict }: { locale: Locale; dict: Dict }) {
  return (
    <section className="relative overflow-hidden bg-night-900 py-24 lg:py-32">
      {/* ambient blue glow */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -start-32 top-1/3 h-96 w-96 rounded-full bg-accent-400/15 blur-[140px]" />
      </div>
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          kicker={dict.home.whyKicker}
          title={dict.home.whyTitle}
          sub={dict.home.whySub}
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {dict.home.why.map((item, i) => (
            <Reveal key={i} delay={i * 0.12} className="h-full">
              <FeatureCard index={i} icon={icons[i]} title={item.title} text={item.text} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
