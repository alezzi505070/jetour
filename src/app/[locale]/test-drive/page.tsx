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
  return { title: dict.testDrivePage.metaTitle, description: dict.testDrivePage.metaDescription };
}

export default async function TestDrivePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ model?: string }>;
}) {
  const [{ locale: raw }, { model }] = await Promise.all([params, searchParams]);
  const locale: Locale = isLocale(raw) ? raw : "en";
  const dict = getDict(locale);

  return (
    <div className="pb-24">
      <PageHeader
        kicker={dict.testDrivePage.kicker}
        title={dict.testDrivePage.title}
        sub={dict.testDrivePage.sub}
      />
      <div className="mx-auto max-w-3xl px-5">
        <Reveal delay={0.2}>
          <LeadForm kind="testDrive" locale={locale} dict={dict} defaultModel={model} />
        </Reveal>
      </div>
    </div>
  );
}
