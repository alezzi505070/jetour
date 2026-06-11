import { en, type Dict } from "./en";
import { ar } from "./ar";
import type { Locale } from "./config";

const dictionaries: Record<Locale, Dict> = { en, ar };

export function getDict(locale: Locale): Dict {
  return dictionaries[locale] ?? en;
}

export type { Dict };
export * from "./config";
