import type { MetadataRoute } from "next";
import { locales, type Locale } from "@/lib/content";
import { getProductPath, getProducts } from "@/lib/products";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

const marketingPaths = ["", "about", "solutions", "products", "technical-library", "brochures", "partner-with-us", "contact"];

const campaignPaths = ["signal-npk", "edegal-72-2-sl", "lasix-70-wg", "rival-duo-45-sc"];

function localePath(locale: Locale, path: string) {
  return `/${locale}${path ? `/${path}` : ""}`;
}

function alternatesFor(path: string) {
  return {
    languages: {
      ...Object.fromEntries(locales.map((locale) => [locale, absoluteUrl(localePath(locale, path))])),
      "x-default": absoluteUrl(localePath("en", path))
    } as Record<string, string>
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const path of marketingPaths) {
    for (const locale of locales) {
      entries.push({
        url: absoluteUrl(localePath(locale, path)),
        lastModified,
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : 0.8,
        alternates: alternatesFor(path)
      });
    }
  }

  for (const path of campaignPaths) {
    for (const locale of locales) {
      entries.push({
        url: absoluteUrl(localePath(locale, path)),
        lastModified,
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: alternatesFor(path)
      });
    }
  }

  for (const locale of locales) {
    for (const product of getProducts(locale)) {
      entries.push({
        url: absoluteUrl(getProductPath(locale, product)),
        lastModified,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: alternatesFor(`products/${product.categorySlug}/${product.slug}`)
      });
    }
  }

  return entries;
}
