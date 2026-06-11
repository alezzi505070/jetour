import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { models } from "@/data/models";
import { locales } from "@/i18n/config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/models",
    "/offers",
    "/test-drive",
    "/quote",
    "/service",
    "/warranty",
    "/about",
    "/dealer",
    "/news",
    "/faq",
    "/contact",
    "/privacy",
    "/terms",
  ];

  return locales.flatMap((locale) => [
    ...staticPaths.map((path) => ({
      url: `${site.baseUrl}/${locale}${path}`,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...models.map((m) => ({
      url: `${site.baseUrl}/${locale}/models/${m.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ]);
}
