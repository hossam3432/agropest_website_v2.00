import { CTASection } from "@/components/CTASection";
import { HeroSection } from "@/components/HeroSection";
import { ProductPortfolioBrowser } from "@/components/ProductPortfolioBrowser";
import { getLocalePage, type LocalePageProps } from "@/app/[locale]/_utils";
import { getProductPath, getProducts, productPortfolioBrowserContent } from "@/lib/products";

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
      <HeroSection compact locale={locale} {...productsPage.hero} />

      <ProductPortfolioBrowser content={productPortfolioBrowserContent[locale]} locale={locale} products={portfolioProducts} />


      <CTASection locale={locale} {...productsPage.cta} />
    </>
  );
}
