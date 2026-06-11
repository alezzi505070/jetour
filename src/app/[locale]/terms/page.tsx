import type { Metadata } from "next";
import { isLocale, type Locale } from "@/i18n/config";
import { getDict } from "@/i18n";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/motion/Reveal";

const content = {
  en: [
    {
      h: "Market Variation",
      p: "Specifications, equipment, colours, availability and pricing may vary by market. All images on this website are for illustration purposes only and may show features not available in Yemen.",
    },
    {
      h: "Offers & Promotions",
      p: "Offers are subject to terms and conditions and may change without prior notice. Always verify current offers, eligibility and validity dates directly with NATCO Automotive before purchase.",
    },
    {
      h: "Warranty",
      p: "Manufacturer's warranty coverage (such as up to 1 million km or 10 years) applies only to specific models and conditions, and requires confirmation at the time of purchase. This website's warranty descriptions are informational and do not constitute a contractual commitment.",
    },
    {
      h: "Availability",
      p: "Models, trims and features listed as 'Available' or 'Coming Soon' are indicative and subject to confirmation by NATCO. No content on this website constitutes a binding offer for sale.",
    },
    {
      h: "Intellectual Property",
      p: "JETOUR, its logos and vehicle imagery are trademarks and copyrighted materials of their respective owners. NATCO trademarks belong to NATCO Automotive Co. Ltd. Reproduction without permission is prohibited.",
    },
    {
      h: "Liability",
      p: "While we strive for accuracy, this website is provided 'as is' without warranties of any kind. NATCO is not liable for decisions made solely on the basis of website content — please confirm all details with our sales team.",
    },
  ],
  ar: [
    {
      h: "اختلاف الأسواق",
      p: "قد تختلف المواصفات والتجهيزات والألوان والتوفر والأسعار حسب السوق. جميع الصور في هذا الموقع لأغراض العرض فقط وقد تُظهر تجهيزات غير متوفرة في اليمن.",
    },
    {
      h: "العروض والحملات",
      p: "تخضع العروض للشروط والأحكام وقد تتغير دون إشعار مسبق. تأكد دائماً من العروض الحالية وشروط الأهلية وتواريخ السريان مباشرة من شركة ناتكو قبل الشراء.",
    },
    {
      h: "الضمان",
      p: "تنطبق تغطية ضمان المصنع (مثل ضمان يصل إلى مليون كيلومتر أو عشر سنوات) على طرازات وشروط محددة فقط، وتتطلب التأكيد عند الشراء. أوصاف الضمان في هذا الموقع معلوماتية ولا تشكل التزاماً تعاقدياً.",
    },
    {
      h: "التوفر",
      p: "الطرازات والفئات والمواصفات المدرجة كـ«متوفرة» أو «قريباً» إرشادية وتخضع لتأكيد ناتكو. لا يشكل أي محتوى في هذا الموقع عرض بيع ملزماً.",
    },
    {
      h: "الملكية الفكرية",
      p: "جيتور وشعاراتها وصور سياراتها علامات تجارية ومواد محمية بحقوق النشر لمالكيها. وعلامات ناتكو مملوكة لشركة ناتكو للسيارات المحدودة. يُمنع إعادة النشر دون إذن.",
    },
    {
      h: "المسؤولية",
      p: "رغم حرصنا على الدقة، يُقدم هذا الموقع «كما هو» دون ضمانات من أي نوع. ولا تتحمل ناتكو مسؤولية القرارات المبنية على محتوى الموقع وحده — يرجى تأكيد جميع التفاصيل مع فريق المبيعات.",
    },
  ],
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDict(isLocale(locale) ? locale : "en");
  return { title: dict.legal.termsTitle, description: dict.legal.termsMeta };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const dict = getDict(locale);

  return (
    <div className="pb-24">
      <PageHeader title={dict.legal.termsTitle} />
      <div className="mx-auto max-w-3xl space-y-10 px-5">
        {content[locale].map((section, i) => (
          <Reveal key={i} delay={i * 0.06}>
            <section>
              <h2 className="mb-3 text-xl font-bold text-ink">{section.h}</h2>
              <p className="leading-relaxed text-steel-300">{section.p}</p>
            </section>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
