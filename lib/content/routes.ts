export const locales = ["en", "ar"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";
export const languageCookieName = "agropest-language";

export function isLocale(value: string | undefined): value is Locale {
  return value === "en" || value === "ar";
}

export function localizeHref(locale: Locale, href: string) {
  if (!href) {
    return `/${locale}`;
  }

  if (/^(https?:|mailto:|tel:|#)/.test(href)) {
    return href;
  }

  const normalizedHref = href.startsWith("/") ? href : `/${href}`;

  if (normalizedHref === "/en" || normalizedHref.startsWith("/en/")) {
    return locale === "en" ? normalizedHref : `/ar${normalizedHref.slice(3) || ""}`;
  }

  if (normalizedHref === "/ar" || normalizedHref.startsWith("/ar/")) {
    return locale === "ar" ? normalizedHref : `/en${normalizedHref.slice(3) || ""}`;
  }

  if (normalizedHref === "/") {
    return `/${locale}`;
  }

  return `/${locale}${normalizedHref}`;
}

export function switchLocalePath(pathname: string, locale: Locale) {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length > 0 && isLocale(segments[0])) {
    segments[0] = locale;
    return `/${segments.join("/")}`;
  }

  return `/${locale}${pathname === "/" ? "" : pathname}`;
}
