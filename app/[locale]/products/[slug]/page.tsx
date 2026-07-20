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
  params: Promise<{
    locale: string;
    slug: string;
  }>;
  searchParams?: Promise<{
    subcategory?: string;
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

  if (category) {
    return {
      title: `${category.title} | ${content.company.shortName}`,
      description: category.description
    };
  }

  const product = getProductByAnySlug(locale, slug);

  if (!product) {
    return {};
  }

  return {
    title: `${product.name} | ${content.company.shortName}`,
    description: product.positioning
  };
}

export default async function ProductCategoryOrLegacyPage({ params, searchParams }: ProductCategoryPageProps) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const category = getProductCategory(locale, slug);

  if (category) {
    const resolvedSearchParams = await searchParams;
    const subcategoryParam = resolvedSearchParams?.subcategory
      ? `&subcategory=${encodeURIComponent(resolvedSearchParams.subcategory)}`
      : "";
    redirect(localizeHref(locale, `/products?category=${category.slug}${subcategoryParam}`));
  }

  const legacyProduct = getProductByAnySlug(locale, slug);

  if (legacyProduct) {
    redirect(getProductPath(locale, legacyProduct));
  }

  notFound();
}
