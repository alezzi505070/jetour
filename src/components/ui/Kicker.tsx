import { cn } from "@/lib/utils";

/**
 * Editorial section label — a hairline dash + tracked uppercase text.
 * Replaces the old pill-chip kickers. Inherits color via `currentColor`,
 * so recolor with a text-* class.
 */
export default function Kicker({
  children,
  center = false,
  className,
}: {
  children: React.ReactNode;
  center?: boolean;
  className?: string;
}) {
  const dash = (
    <span
      aria-hidden="true"
      className="h-px w-9 bg-gradient-to-r from-current to-transparent opacity-70 rtl:bg-gradient-to-l"
    />
  );
  const dashMirror = (
    <span
      aria-hidden="true"
      className="h-px w-9 bg-gradient-to-l from-current to-transparent opacity-70 rtl:bg-gradient-to-r"
    />
  );

  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.32em] text-accent-600",
        className,
      )}
    >
      {dashMirror}
      <span>{children}</span>
      {center && dash}
    </span>
  );
}
