import { Suspense } from "react";
import type { Metadata } from "next";
import { isLocale, type Locale } from "@/i18n/config";
import { getDict } from "@/i18n";
import PageHeader from "@/components/ui/PageHeader";
import LeadForm from "@/components/forms/LeadForm";
import Reveal from "@/components/motion/Reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDict(isLocale(locale) ? locale : "en");
  return { title: dict.quotePage.metaTitle, description: dict.quotePage.metaDescription };
}

export default async function QuotePage({
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
        kicker={dict.quotePage.kicker}
        title={dict.quotePage.title}
        sub={dict.quotePage.sub}
      />
      <div className="mx-auto max-w-3xl px-5">
        <Reveal delay={0.2}>
          <Suspense fallback={<div className="h-[400px] animate-pulse bg-white/5 rounded-3xl" />}>
            <LeadForm kind="quote" locale={locale} dict={dict} />
          </Suspense>
        </Reveal>
        <p className="mt-6 text-center text-xs leading-relaxed text-steel-400">
          {dict.quotePage.note}
        </p>
      </div>
    </div>
  );
}
