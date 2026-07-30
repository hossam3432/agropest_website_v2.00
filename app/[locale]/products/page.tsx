import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTASection } from "@/components/CTASection";
import { HeroSection } from "@/components/HeroSection";
import { ProductPortfolioBrowser } from "@/components/ProductPortfolioBrowser";
import { getLocalePage, type LocalePageProps } from "@/app/[locale]/_utils";
import { getProductPath, getProducts, productPortfolioBrowserContent } from "@/lib/products";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { content, locale } = getLocalePage((await params).locale);

  const title =
    locale === "ar" ? "محفظة المنتجات – وقاية المحاصيل والأسمدة والمحفزات الحيوية" : "Product Portfolio – Crop Protection, Fertilizers & Biostimulants";
  const description =
    locale === "ar"
      ? "استعرض محفظة أجروبست كنترول الكاملة من منتجات وقاية المحاصيل المسجلة، الأسمدة المتخصصة، والمحفزات الحيوية المختارة لتناسب المحاصيل وظروف الزراعة المصرية."
      : "Browse AgroPest Control's full portfolio of registered crop protection products, specialty fertilizers, and biostimulants selected for Egyptian crops and farming conditions.";

  return buildPageMetadata({
    locale,
    content,
    path: "/products",
    title,
    description,
    image: content.images.hero.products,
    imageAlt: title
  });
}

export default async function ProductsPage({ params }: LocalePageProps) {
  const { content, locale } = getLocalePage((await params).locale);
  const { productsPage } = content;
  const portfolioProducts = getProducts(locale).map((product) => ({
    categorySlug: product.categorySlug,
    crops: product.crops,
    href: getProductPath(locale, product),
    galleryImage: product.galleryImage,
    galleryImageAlt: product.galleryImageAlt,
    name: product.name,
    positioning: product.positioning,
    registrationStatus: product.registrationStatus,
    slug: product.slug,
    subcategory: product.subcategory
  }));

  return (
    <>
      <Breadcrumbs
        locale={locale}
        homeLabel={content.navigation.find((item) => item.href === "/")?.label ?? "Home"}
        items={[{ label: content.navigation.find((item) => item.href === "/products")?.label ?? "Products", href: "/products" }]}
      />
      <HeroSection compact locale={locale} {...productsPage.hero} />

      <ProductPortfolioBrowser content={productPortfolioBrowserContent[locale]} locale={locale} products={portfolioProducts} />


      <CTASection locale={locale} {...productsPage.cta} />
    </>
  );
}
