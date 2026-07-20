import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { ProductDetailPage } from "@/components/ProductDetailPage";
import { getSiteContent, isLocale, locales } from "@/lib/content";
import {
  getProductByAnySlug,
  getProductByCategoryAndSlug,
  getProductPath,
  getProducts,
  productCategoriesByLocale
} from "@/lib/products";

type ProductPageProps = {
  params: Promise<{
    locale: string;
    slug: string;
    productSlug: string;
  }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getProducts(locale).map((product) => ({
      locale,
      slug: product.categorySlug,
      productSlug: product.slug
    }))
  );
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { locale, slug, productSlug } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const product = getProductByCategoryAndSlug(locale, slug, productSlug);
  const content = getSiteContent(locale);

  if (!product) {
    return {};
  }

  return {
    title: product.seo?.title ?? `${product.name} | ${content.company.shortName}`,
    description: product.seo?.description ?? product.positioning,
    keywords: product.seo?.keywords
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { locale, slug, productSlug } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const categoryExists = productCategoriesByLocale[locale].some((category) => category.slug === slug);

  if (!categoryExists) {
    notFound();
  }

  const product = getProductByCategoryAndSlug(locale, slug, productSlug);

  if (!product) {
    const productByAnySlug = getProductByAnySlug(locale, productSlug);

    if (productByAnySlug) {
      redirect(getProductPath(locale, productByAnySlug));
    }

    notFound();
  }

  return <ProductDetailPage content={getSiteContent(locale)} locale={locale} product={product} />;
}
