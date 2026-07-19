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
  params: {
    locale: string;
    slug: string;
    productSlug: string;
  };
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

export function generateMetadata({ params }: ProductPageProps): Metadata {
  const locale = params.locale;

  if (!isLocale(locale)) {
    return {};
  }

  const product = getProductByCategoryAndSlug(locale, params.slug, params.productSlug);
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

export default function ProductPage({ params }: ProductPageProps) {
  const locale = params.locale;

  if (!isLocale(locale)) {
    notFound();
  }

  const categoryExists = productCategoriesByLocale[locale].some((category) => category.slug === params.slug);

  if (!categoryExists) {
    notFound();
  }

  const product = getProductByCategoryAndSlug(locale, params.slug, params.productSlug);

  if (!product) {
    const productByAnySlug = getProductByAnySlug(locale, params.productSlug);

    if (productByAnySlug) {
      redirect(getProductPath(locale, productByAnySlug));
    }

    notFound();
  }

  return <ProductDetailPage content={getSiteContent(locale)} locale={locale} product={product} />;
}
