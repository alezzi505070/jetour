import { Suspense } from "react";
import type { Metadata } from "next";
import { isLocale, type Locale } from "@/i18n/config";
import { getDict } from "@/i18n";
import PageHeader from "@/components/ui/PageHeader";
import LeadForm from "@/components/forms/LeadForm";
import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import FeatureCard from "@/components/ui/FeatureCard";

const pillarIcons = [
  <svg key="0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
    <path d="M14.7 6.3a4.5 4.5 0 0 0-6.1 5.8L3 17.7V21h3.3l5.6-5.6a4.5 4.5 0 0 0 5.8-6.1l-2.8 2.8-2.4-.6-.6-2.4 2.8-2.8Z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-3.9 3.6-7 8-7s8 3.1 8 7" strokeLinecap="round" />
  </svg>,
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 9h18M8 3v4m8-4v4m-9 6h2m3 0h2m3 0h0M7 17h2m3 0h2" strokeLinecap="round" />
  </svg>,
  <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
    <path d="M12 3 4 6.5v5c0 4.6 3.4 8.9 8 9.5 4.6-.6 8-4.9 8-9.5v-5L12 3Z" strokeLinejoin="round" />
    <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDict(isLocale(locale) ? locale : "en");
  return { title: dict.servicePage.metaTitle, description: dict.servicePage.metaDescription };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const dict = getDict(locale);

  return (
    <div className="pb-24">
      <PageHeader
        kicker={dict.servicePage.kicker}
        title={dict.servicePage.title}
        sub={dict.servicePage.sub}
      />

      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <SectionHeading title={dict.servicePage.pillarsTitle} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {dict.servicePage.pillars.map((p, i) => (
            <Reveal key={i} delay={i * 0.1} className="h-full">
              <FeatureCard index={i} icon={pillarIcons[i]} title={p.title} text={p.text} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 pt-10">
        <SectionHeading title={dict.servicePage.formTitle} />
        <Reveal>
          <Suspense fallback={<div className="h-[400px] animate-pulse bg-white/5 rounded-3xl" />}>
            <LeadForm kind="service" locale={locale} dict={dict} />
          </Suspense>
        </Reveal>
      </section>
    </div>
  );
}
