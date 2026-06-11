import type { Metadata } from "next";
import { isLocale, type Locale } from "@/i18n/config";
import { getDict } from "@/i18n";
import ModelsGrid from "@/components/models/ModelsGrid";
import SectionHeading from "@/components/ui/SectionHeading";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDict(isLocale(locale) ? locale : "en");
  return {
    title: dict.models.metaTitle,
    description: dict.models.metaDescription,
  };
}

export default async function ModelsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const dict = getDict(locale);

  return (
    <div className="relative overflow-hidden pt-32 lg:pt-40">
      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px]" aria-hidden="true">
        <div className="absolute start-1/4 top-0 h-96 w-96 rounded-full bg-accent-600/12 blur-[150px]" />
        <div className="absolute end-1/4 top-32 h-72 w-72 rounded-full bg-sky-700/10 blur-[130px]" />
      </div>
      <div className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <SectionHeading kicker="JETOUR" title={dict.models.title} sub={dict.models.sub} />
        <ModelsGrid locale={locale} dict={dict} />
      </div>
    </div>
  );
}
