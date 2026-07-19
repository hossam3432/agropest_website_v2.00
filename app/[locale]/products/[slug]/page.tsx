import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getSiteContent, isLocale, locales, localizeHref } from "@/lib/content";
import {
  getProductByAnySlug,
  getProductCategories,
  getProductCategory,
  getProductPath,
  getProducts
} from "@/lib/products";

type ProductCategoryPageProps = {
  params: {
    locale: string;
    slug: string;
  };
  searchParams?: {
    subcategory?: string;
  };
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

export function generateMetadata({ params }: ProductCategoryPageProps): Metadata {
  const locale = params.locale;

  if (!isLocale(locale)) {
    return {};
  }

  const content = getSiteContent(locale);
  const category = getProductCategory(locale, params.slug);

  if (category) {
    return {
      title: `${category.title} | ${content.company.shortName}`,
      description: category.description
    };
  }

  const product = getProductByAnySlug(locale, params.slug);

  if (!product) {
    return {};
  }

  return {
    title: `${product.name} | ${content.company.shortName}`,
    description: product.positioning
  };
}

export default function ProductCategoryOrLegacyPage({ params, searchParams }: ProductCategoryPageProps) {
  const locale = params.locale;

  if (!isLocale(locale)) {
    notFound();
  }

  const category = getProductCategory(locale, params.slug);

  if (category) {
    const subcategoryParam = searchParams?.subcategory ? `&subcategory=${encodeURIComponent(searchParams.subcategory)}` : "";
    redirect(localizeHref(locale, `/products?category=${category.slug}${subcategoryParam}`));
  }

  const legacyProduct = getProductByAnySlug(locale, params.slug);

  if (legacyProduct) {
    redirect(getProductPath(locale, legacyProduct));
  }

  notFound();
}
