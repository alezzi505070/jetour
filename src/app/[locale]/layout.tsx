import type { Metadata } from "next";
import { Manrope, Tajawal } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { locales, isLocale, dirOf, type Locale } from "@/i18n/config";
import { getDict } from "@/i18n";
import { site } from "@/data/site";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import MobileActionBar from "@/components/layout/MobileActionBar";

const manrope = Manrope({
  variable: "--font-en",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const tajawal = Tajawal({
  variable: "--font-ar",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700", "800", "900"],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDict(isLocale(locale) ? locale : "en");
  return {
    metadataBase: new URL(site.baseUrl),
    title: {
      default: dict.meta.homeTitle,
      template: `%s | ${dict.meta.siteName}`,
    },
    description: dict.meta.homeDescription,
    openGraph: {
      siteName: dict.meta.siteName,
      locale: locale === "ar" ? "ar_YE" : "en_US",
      type: "website",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const dict = getDict(locale);

  return (
    <html
      lang={locale}
      dir={dirOf(locale)}
      className={`${manrope.variable} ${tajawal.variable} antialiased`}
    >
      <body className="grain min-h-screen flex flex-col bg-night-950 text-steel-100">
        <Header locale={locale} dict={dict} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale} dict={dict} />
        <WhatsAppFloat locale={locale} dict={dict} />
        <MobileActionBar locale={locale} dict={dict} />
      </body>
    </html>
  );
}
