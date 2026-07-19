import { arContent } from "@/lib/content/ar";
import { enContent } from "@/lib/content/en";
import { defaultLocale, isLocale, type Locale } from "@/lib/content/routes";

export { defaultLocale, isLocale, languageCookieName, locales, localizeHref, switchLocalePath } from "@/lib/content/routes";
export type { Locale } from "@/lib/content/routes";
export { arContent, enContent };

export const contentByLocale = {
  en: enContent,
  ar: arContent
};

export type SiteContent = typeof enContent;

export function getSiteContent(locale: Locale = defaultLocale): SiteContent {
  return contentByLocale[locale];
}

export function getContentFromParam(locale: string | undefined): SiteContent {
  return getSiteContent(isLocale(locale) ? locale : defaultLocale);
}
