import type { Metadata } from "next";
import { isLocale, type Locale } from "@/i18n/config";
import { getDict } from "@/i18n";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/motion/Reveal";

const content = {
  en: [
    {
      h: "Data We Collect",
      p: "When you submit a form on this website (test drive, quotation, service booking or contact), we collect the details you provide: your name, phone/WhatsApp number, city, preferred model and any notes. We do not collect payment information through this website.",
    },
    {
      h: "How We Use Your Data",
      p: "Your details are used solely to respond to your enquiry — arranging test drives, preparing quotations, booking service appointments and following up on your request. Data is shared only with the NATCO sales and service teams.",
    },
    {
      h: "WhatsApp Communication",
      p: "When you choose 'Send via WhatsApp', your message is transmitted through WhatsApp and is subject to WhatsApp's own terms and privacy policy. We recommend reviewing them.",
    },
    {
      h: "Cookies & Analytics",
      p: "This website may use basic analytics cookies to understand visitor behaviour and improve the experience. No personally identifying information is sold or shared with advertisers.",
    },
    {
      h: "Your Rights",
      p: "You may request access to, correction of, or deletion of your personal data at any time by contacting us at the details on the Contact page.",
    },
  ],
  ar: [
    {
      h: "البيانات التي نجمعها",
      p: "عند إرسال نموذج عبر هذا الموقع (تجربة قيادة، عرض سعر، حجز صيانة أو تواصل)، نجمع البيانات التي تقدمها: الاسم، رقم الهاتف/واتساب، المدينة، الطراز المفضل وأي ملاحظات. لا نجمع أي بيانات دفع عبر هذا الموقع.",
    },
    {
      h: "كيف نستخدم بياناتك",
      p: "تُستخدم بياناتك حصرياً للرد على استفسارك — ترتيب تجارب القيادة، إعداد عروض الأسعار، حجز مواعيد الصيانة ومتابعة طلبك. ولا تُشارك البيانات إلا مع فرق المبيعات والخدمة في ناتكو.",
    },
    {
      h: "التواصل عبر واتساب",
      p: "عند اختيار «إرسال عبر واتساب»، تُنقل رسالتك عبر تطبيق واتساب وتخضع لشروطه وسياسة الخصوصية الخاصة به. ننصح بالاطلاع عليها.",
    },
    {
      h: "ملفات تعريف الارتباط والتحليلات",
      p: "قد يستخدم هذا الموقع ملفات تعريف ارتباط تحليلية أساسية لفهم سلوك الزوار وتحسين التجربة. ولا تُباع أي معلومات تعريفية شخصية أو تُشارك مع معلنين.",
    },
    {
      h: "حقوقك",
      p: "يمكنك طلب الوصول إلى بياناتك الشخصية أو تصحيحها أو حذفها في أي وقت عبر التواصل معنا من خلال بيانات صفحة التواصل.",
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
  return { title: dict.legal.privacyTitle, description: dict.legal.privacyMeta };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const dict = getDict(locale);

  return (
    <div className="pb-24">
      <PageHeader title={dict.legal.privacyTitle} />
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
