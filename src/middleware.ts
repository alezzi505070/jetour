import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "@/i18n/config";

function preferredLocale(request: NextRequest): string {
  const header = request.headers.get("accept-language") ?? "";
  if (/^ar\b|,\s*ar\b/i.test(header)) return "ar";
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (hasLocale) return NextResponse.next();

  const locale = preferredLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip static assets, API routes and files with extensions
  matcher: ["/((?!_next|api|images|favicon\\.ico|.*\\..*).*)"],
};
