import { CTASection } from "@/components/CTASection";
import { HeroSection } from "@/components/HeroSection";
import { ProductPortfolioBrowser } from "@/components/ProductPortfolioBrowser";
import { getLocalePage, type LocalePageProps } from "@/app/[locale]/_utils";
import { getProductPath, getProducts, productPortfolioBrowserContent, type ProductCategorySlug } from "@/lib/products";

type ProductsPageProps = LocalePageProps & {
  searchParams?: Promise<{
    category?: string;
    subcategory?: string;
  }>;
};

function isProductCategorySlug(value: string | undefined): value is ProductCategorySlug {
  return value === "agrochemicals" || value === "specialty-fertilizers";
}

export default async function ProductsPage({ params, searchParams }: ProductsPageProps) {
  const { content, locale } = getLocalePage((await params).locale);
  const resolvedSearchParams = await searchParams;
  const { productsPage } = content;
  const categoryParam = resolvedSearchParams?.category;
  const initialCategorySlug: ProductCategorySlug | undefined = isProductCategorySlug(categoryParam) ? categoryParam : undefined;
  const initialSubcategory = resolvedSearchParams?.subcategory;
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

      <ProductPortfolioBrowser
        content={productPortfolioBrowserContent[locale]}
        initialCategorySlug={initialCategorySlug}
        initialSubcategory={initialSubcategory}
        locale={locale}
        products={portfolioProducts}
      />


      <CTASection locale={locale} {...productsPage.cta} />
    </>
  );
}
