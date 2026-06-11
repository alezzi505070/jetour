import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dict } from "@/i18n";
import { site } from "@/data/site";
import { waLink } from "@/lib/whatsapp";
import { PhoneIcon, PinIcon, SteeringIcon, WhatsAppIcon } from "@/components/ui/icons";

/** Sticky bottom quick-action bar — mobile only (plan §7). */
export default function MobileActionBar({ locale, dict }: { locale: Locale; dict: Dict }) {
  const actions = [
    {
      key: "call",
      href: `tel:${site.phoneHref}`,
      label: dict.common.call,
      icon: <PhoneIcon className="h-5 w-5" />,
      external: false,
    },
    {
      key: "whatsapp",
      href: waLink(dict.whatsapp.templates.general),
      label: dict.nav.whatsapp,
      icon: <WhatsAppIcon className="h-5 w-5" />,
      external: true,
    },
    {
      key: "testdrive",
      href: `/${locale}/test-drive`,
      label: dict.nav.testDrive,
      icon: <SteeringIcon className="h-5 w-5" />,
      external: false,
      internal: true,
    },
    {
      key: "location",
      href: site.mapsUrl,
      label: dict.common.location,
      icon: <PinIcon className="h-5 w-5" />,
      external: true,
    },
  ];

  return (
    <nav
      className="glass-strong fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t border-ink/10 pb-[env(safe-area-inset-bottom)] md:hidden"
      aria-label={dict.nav.menu}
    >
      {actions.map((a) =>
        a.internal ? (
          <Link
            key={a.key}
            href={a.href}
            className="flex flex-col items-center gap-1 py-2.5 text-steel-200 transition-colors active:text-accent-600"
          >
            {a.icon}
            <span className="text-[10px] font-semibold">{a.label}</span>
          </Link>
        ) : (
          <a
            key={a.key}
            href={a.href}
            {...(a.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="flex flex-col items-center gap-1 py-2.5 text-steel-200 transition-colors active:text-accent-600"
          >
            {a.icon}
            <span className="text-[10px] font-semibold">{a.label}</span>
          </a>
        ),
      )}
    </nav>
  );
}
