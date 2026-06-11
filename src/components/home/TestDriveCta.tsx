import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/i18n/config";
import type { Dict } from "@/i18n";
import Reveal from "@/components/motion/Reveal";
import TextReveal from "@/components/motion/TextReveal";
import { btnPrimary, btnWhatsapp } from "@/components/ui/buttons";
import Kicker from "@/components/ui/Kicker";
import { waLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/icons";

/** Full-width test-drive banner with the G700 cutout floating over the edge. */
export default function TestDriveCta({ locale, dict }: { locale: Locale; dict: Dict }) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
      <Reveal>
        <div className="card-line relative overflow-hidden rounded-[2.5rem] px-7 py-14 sm:px-12 lg:px-16 lg:py-20">
          {/* backdrop */}
          <div className="absolute inset-0 -z-10" aria-hidden="true">
            <div className="absolute inset-0 bg-gradient-to-br from-night-800 via-night-900 to-night-950" />
            <div className="absolute -bottom-24 -end-24 h-96 w-96 rounded-full bg-accent-600/18 blur-[120px]" />
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <Kicker className="mb-5">{dict.home.testDriveKicker}</Kicker>
              <h2 className="text-3xl font-extrabold leading-tight text-ink sm:text-4xl lg:text-5xl">
                <TextReveal text={dict.home.testDriveTitle} />
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-steel-300 sm:text-lg">
                {dict.home.testDriveSub}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href={`/${locale}/test-drive`} className={btnPrimary}>
                  {dict.common.bookTestDrive}
                </Link>
                <a
                  href={waLink(dict.whatsapp.templates.testDrive)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={btnWhatsapp}
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  {dict.nav.whatsapp}
                </a>
              </div>
            </div>

            <div className="relative hidden aspect-[16/9] lg:block">
              <Image
                src="/images/profiles/g700.png"
                alt={locale === "ar" ? "جيتور G700" : "JETOUR G700"}
                fill
                sizes="50vw"
                className="animate-float-slow object-contain drop-shadow-[0_36px_42px_rgba(23,52,118,0.28)]"
              />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
