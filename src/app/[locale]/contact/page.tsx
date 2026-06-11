import type { Metadata } from "next";
import { isLocale, type Locale } from "@/i18n/config";
import { getDict } from "@/i18n";
import { site } from "@/data/site";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/motion/Reveal";
import { waLink } from "@/lib/whatsapp";
import { btnWhatsapp } from "@/components/ui/buttons";
import { PhoneIcon, PinIcon, WhatsAppIcon } from "@/components/ui/icons";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDict(isLocale(locale) ? locale : "en");
  return { title: dict.contactPage.metaTitle, description: dict.contactPage.metaDescription };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const dict = getDict(locale);
  const c = dict.contactPage;

  return (
    <div className="pb-24">
      <PageHeader kicker={c.kicker} title={c.title} sub={c.sub} />

      <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-2 lg:px-8">
        {/* details */}
        <Reveal>
          <div className="card-line h-full rounded-[2rem] p-8 lg:p-10">
            <h2 className="text-xl font-extrabold text-ink">{c.showroom}</h2>
            <ul className="mt-7 space-y-6">
              <li className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-500/12 text-accent-600">
                  <PinIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-steel-400">
                    {dict.common.location}
                  </p>
                  <p className="mt-1 text-steel-100">{c.address}</p>
                  <a
                    href={site.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-sm font-semibold text-accent-600 hover:underline"
                  >
                    Google Maps ↗
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-500/12 text-accent-600">
                  <PhoneIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-steel-400">
                    {c.phoneLabel}
                  </p>
                  <a href={`tel:${site.phoneHref}`} dir="ltr" className="mt-1 block text-steel-100 hover:text-ink">
                    {site.phone}
                  </a>
                  <a href={`mailto:${site.email}`} className="mt-0.5 block text-sm text-steel-300 hover:text-ink">
                    {site.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-500/12 text-accent-600">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3.5 2" strokeLinecap="round" />
                  </svg>
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-steel-400">
                    {c.hoursLabel}
                  </p>
                  <p className="mt-1 text-steel-100">{c.hours}</p>
                  <p className="mt-0.5 text-xs text-steel-400">{c.hoursNote}</p>
                </div>
              </li>
            </ul>
            <div className="mt-9">
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
          </div>
        </Reveal>

        {/* map */}
        <Reveal delay={0.15}>
          <div className="card-line h-full min-h-[420px] overflow-hidden rounded-[2rem]">
            <iframe
              title={c.showroom}
              src="https://www.google.com/maps?q=Djibouti%20Street%2C%20Sana%27a%2C%20Yemen&output=embed"
              className="h-full min-h-[420px] w-full border-0 grayscale-[35%] contrast-[1.05]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
