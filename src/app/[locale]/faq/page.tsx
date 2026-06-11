import type { Metadata } from "next";
import Link from "next/link";
import { isLocale, type Locale } from "@/i18n/config";
import { getDict } from "@/i18n";
import PageHeader from "@/components/ui/PageHeader";
import FaqAccordion from "@/components/ui/FaqAccordion";
import Reveal from "@/components/motion/Reveal";
import { waLink } from "@/lib/whatsapp";
import { btnPrimary, btnWhatsapp } from "@/components/ui/buttons";
import { WhatsAppIcon } from "@/components/ui/icons";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDict(isLocale(locale) ? locale : "en");
  return { title: dict.faqPage.metaTitle, description: dict.faqPage.metaDescription };
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const dict = getDict(locale);

  // FAQPage schema for rich results
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dict.faqPage.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <div className="pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <PageHeader kicker={dict.faqPage.kicker} title={dict.faqPage.title} />
      <div className="mx-auto max-w-3xl px-5">
        <FaqAccordion items={dict.faqPage.items} />
        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link href={`/${locale}/contact`} className={btnPrimary}>
              {dict.nav.contact}
            </Link>
            <a
              href={waLink(dict.whatsapp.templates.general)}
              target="_blank"
              rel="noopener noreferrer"
              className={btnWhatsapp}
            >
              <WhatsAppIcon className="h-5 w-5" />
              {dict.common.whatsappInquiry}
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
