import { notFound } from "next/navigation";
import { getSiteContent, isLocale, type Locale } from "@/lib/content";

export type LocalePageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export function getLocalePage(localeParam: string): { locale: Locale; content: ReturnType<typeof getSiteContent> } {
  if (!isLocale(localeParam)) {
    notFound();
  }

  return {
    locale: localeParam,
    content: getSiteContent(localeParam)
  };
}
