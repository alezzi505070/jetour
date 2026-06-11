import { site } from "@/data/site";

/**
 * Builds a wa.me deep link from a bilingual template (section 20 of the plan).
 * Placeholders like [NAME], [MODEL], [CITY], [DATE], [PHONE] are replaced when
 * provided and stripped gracefully when not.
 */
export function waLink(
  template: string,
  values: Partial<Record<"NAME" | "MODEL" | "CITY" | "DATE" | "PHONE", string>> = {},
): string {
  let message = template;
  for (const key of ["NAME", "MODEL", "CITY", "DATE", "PHONE"] as const) {
    message = message.replaceAll(`[${key}]`, values[key] ?? "…");
  }
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
