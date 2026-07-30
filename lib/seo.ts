import type { Metadata } from "next";
import type { Locale, SiteContent } from "@/lib/content";

export const siteUrl = "https://www.agropestcontrol.com";

export function absoluteUrl(path: string) {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

function localizedPath(path: string, locale: Locale) {
  const rest = path.replace(/^\/(en|ar)/, "") || "/";
  return `/${locale}${rest === "/" ? "" : rest}`;
}

type BuildPageMetadataArgs = {
  locale: Locale;
  content: SiteContent;
  path: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
};

export function buildPageMetadata({ locale, content, path, title, description, image, imageAlt }: BuildPageMetadataArgs): Metadata {
  const url = absoluteUrl(localizedPath(path, locale));
  const fullTitle = `${title} | ${content.company.shortName}`;
  const ogImage = absoluteUrl(image ?? content.images.hero.home);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: absoluteUrl(localizedPath(path, "en")),
        ar: absoluteUrl(localizedPath(path, "ar")),
        "x-default": absoluteUrl(localizedPath(path, "en"))
      }
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: content.company.shortName,
      locale: locale === "ar" ? "ar_EG" : "en_US",
      alternateLocale: locale === "ar" ? "en_US" : "ar_EG",
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: imageAlt ?? fullTitle }]
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage]
    }
  };
}
