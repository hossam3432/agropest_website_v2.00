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
import { absoluteUrl } from "@/lib/seo";

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

  const ogImage = absoluteUrl(`/api/og/${locale}/${product.slug}`);

  return {
    title: product.seo?.title ?? `${product.name} | ${content.company.shortName}`,
    description: product.seo?.description ?? product.positioning,
    keywords: product.seo?.keywords,
    alternates: {
      canonical: absoluteUrl(`/${locale}/products/${slug}/${productSlug}`),
      languages: {
        en: absoluteUrl(`/en/products/${slug}/${productSlug}`),
        ar: absoluteUrl(`/ar/products/${slug}/${productSlug}`),
        "x-default": absoluteUrl(`/en/products/${slug}/${productSlug}`)
      }
    },
    openGraph: { images: [{ url: ogImage, width: 1200, height: 630, alt: product.name }] },
    twitter: { card: "summary_large_image", images: [ogImage] }
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
