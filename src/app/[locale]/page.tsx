import type { Metadata } from "next";
import { isLocale, type Locale } from "@/i18n/config";
import { getDict } from "@/i18n";
import { site } from "@/data/site";
import Hero from "@/components/home/Hero";
import FeaturedModels from "@/components/home/FeaturedModels";
import WhyJetour from "@/components/home/WhyJetour";
import Adventure from "@/components/home/Adventure";
import OffersTeaser from "@/components/home/OffersTeaser";
import TestDriveCta from "@/components/home/TestDriveCta";
import TrustSection from "@/components/home/TrustSection";
import NewsTeaser from "@/components/home/NewsTeaser";
import ContactStrip from "@/components/home/ContactStrip";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDict(isLocale(locale) ? locale : "en");
  return {
    title: { absolute: dict.meta.homeTitle },
    description: dict.meta.homeDescription,
    alternates: {
      canonical: `${site.baseUrl}/${locale}`,
      languages: { en: `${site.baseUrl}/en`, ar: `${site.baseUrl}/ar` },
    },
    openGraph: {
      title: dict.meta.homeTitle,
      description: dict.meta.homeDescription,
      images: [`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/lifestyle/home_1.jpg`],
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const dict = getDict(locale);

  // Schema.org AutoDealer markup (plan §16)
  const schema = {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    name: dict.meta.siteName,
    legalName: "NATCO Automotive Co. Ltd",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Djibouti Street, Political District",
      addressLocality: "Sana'a",
      addressCountry: "YE",
    },
    telephone: site.phone,
    email: site.email,
    brand: { "@type": "Brand", name: "JETOUR" },
    url: `${site.baseUrl}/${locale}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Hero locale={locale} dict={dict} />
      <FeaturedModels locale={locale} dict={dict} />
      <WhyJetour locale={locale} dict={dict} />
      <Adventure locale={locale} dict={dict} />
      <TrustSection locale={locale} dict={dict} />
      <OffersTeaser locale={locale} dict={dict} />
      <TestDriveCta locale={locale} dict={dict} />
      <NewsTeaser locale={locale} dict={dict} />
      <ContactStrip locale={locale} dict={dict} />
    </>
  );
}
