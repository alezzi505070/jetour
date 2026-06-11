import { cn } from "@/lib/utils";

/**
 * Modern bento feature card: white surface with a blue-tinted shadow, an
 * oversized ghost numeral, a thin-stroke icon, and an accent hairline that
 * sweeps in on hover. Replaces the old icon-in-tinted-square pattern.
 */
export default function FeatureCard({
  index,
  icon,
  title,
  text,
  className,
}: {
  index: number;
  icon?: React.ReactNode;
  title: string;
  text: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative h-full overflow-hidden rounded-3xl border border-ink/8 bg-white p-7",
        "shadow-[0_26px_60px_-30px_rgba(37,99,235,0.28)] transition-all duration-500",
        "hover:-translate-y-1.5 hover:shadow-[0_36px_80px_-30px_rgba(37,99,235,0.45)]",
        className,
      )}
    >
      {/* accent hairline sweeps in on hover */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-accent-500 via-accent-400 to-transparent transition-transform duration-500 group-hover:scale-x-100 rtl:origin-right rtl:bg-gradient-to-l"
      />
      {/* ghost numeral */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-4 select-none text-[88px] font-extrabold leading-none tracking-tighter text-ink/[0.05] transition-colors duration-500 group-hover:text-accent-500/10 ltr:-right-1 rtl:-left-1"
        dir="ltr"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {icon && (
        <div className="relative mb-6 text-accent-600 transition-transform duration-500 group-hover:scale-110 [&_svg]:h-9 [&_svg]:w-9">
          {icon}
        </div>
      )}
      <h3 className="relative mb-2.5 text-lg font-bold text-ink">{title}</h3>
      <p className="relative text-sm leading-relaxed text-steel-300">{text}</p>
    </div>
  );
}
