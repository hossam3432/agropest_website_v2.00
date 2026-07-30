import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ClientRedirect } from "@/components/ClientRedirect";
import { getSiteContent, isLocale, locales, localizeHref } from "@/lib/content";
import {
  getProductByAnySlug,
  getProductCategories,
  getProductCategory,
  getProductPath,
  getProducts
} from "@/lib/products";
import { absoluteUrl } from "@/lib/seo";

type ProductCategoryPageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) => {
    const categoryParams = getProductCategories(locale).map((category) => ({
      locale,
      slug: category.slug
    }));

    const legacyProductParams = getProducts(locale).flatMap((product) => [
      { locale, slug: product.slug },
      ...(product.legacySlugs ?? []).map((legacySlug) => ({ locale, slug: legacySlug }))
    ]);

    return [...categoryParams, ...legacyProductParams];
  });
}

export async function generateMetadata({ params }: ProductCategoryPageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const content = getSiteContent(locale);
  const category = getProductCategory(locale, slug);
  const alternates = {
    canonical: absoluteUrl(`/${locale}/products/${slug}`),
    languages: {
      en: absoluteUrl(`/en/products/${slug}`),
      ar: absoluteUrl(`/ar/products/${slug}`),
      "x-default": absoluteUrl(`/en/products/${slug}`)
    }
  };

  if (category) {
    const ogImage = absoluteUrl(`/api/og/${locale}/${category.slug}`);

    return {
      title: `${category.title} | ${content.company.shortName}`,
      description: category.description,
      alternates,
      openGraph: { images: [{ url: ogImage, width: 1200, height: 630, alt: category.title }] },
      twitter: { card: "summary_large_image", images: [ogImage] }
    };
  }

  const product = getProductByAnySlug(locale, slug);

  if (!product) {
    return {};
  }

  const ogImage = absoluteUrl(`/api/og/${locale}/${product.slug}`);

  return {
    title: `${product.name} | ${content.company.shortName}`,
    description: product.positioning,
    alternates,
    openGraph: { images: [{ url: ogImage, width: 1200, height: 630, alt: product.name }] },
    twitter: { card: "summary_large_image", images: [ogImage] }
  };
}

export default async function ProductCategoryOrLegacyPage({ params }: ProductCategoryPageProps) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const category = getProductCategory(locale, slug);

  if (category) {
    return <ClientRedirect href={localizeHref(locale, `/products?category=${category.slug}`)} />;
  }

  const legacyProduct = getProductByAnySlug(locale, slug);

  if (legacyProduct) {
    return <ClientRedirect href={getProductPath(locale, legacyProduct)} />;
  }

  notFound();
}
