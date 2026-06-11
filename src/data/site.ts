/**
 * Central site configuration.
 *
 * VERIFICATION STATUS (per the build plan, section 11):
 *  - phone / fax / address  → CONFIRMED from NATCO's official site (ar.natcoyemen.com)
 *  - whatsappNumber         → NEEDS VERIFICATION before launch. The number below
 *    appeared in public Facebook snippets for "JETOUR YEMEN | Official Account"
 *    but could not be independently verified. Replace once NATCO confirms.
 *  - email                  → pattern from NATCO's domain; confirm before launch.
 */
export const site = {
  phone: "+967-1-441500",
  phoneHref: "+9671441500",
  fax: "+967-1-441522",
  whatsappNumber: "967730999966", // TODO: verify with NATCO before launch
  email: "info@natcoyemen.com",
  addressEn: "Djibouti Street, Political District, Sana'a, Yemen",
  addressAr: "شارع جيبوتي، الحي السياسي، صنعاء، اليمن",
  mapsUrl: "https://maps.google.com/?q=Djibouti+Street+Sanaa+Yemen",
  baseUrl: "https://jetour-yemen.example.com", // TODO: replace with production domain
  social: {
    facebook: "https://www.facebook.com/", // TODO: verify official page URL
    instagram: "https://www.instagram.com/",
    youtube: "https://www.youtube.com/",
  },
} as const;
