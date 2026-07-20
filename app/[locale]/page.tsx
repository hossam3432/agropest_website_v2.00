import { CommitmentSection } from "@/components/CommitmentSection";
import { FeaturedProductLinesSection } from "@/components/FeaturedProductLinesSection";
import { HomeHero } from "@/components/HomeHero";
import { ProductCategoriesSection } from "@/components/ProductCategoriesSection";
import { PartnersSection } from "@/components/PartnersSection";
import { TechnicalLibraryPreview } from "@/components/TechnicalLibraryPreview";
import { WhyAgropestSection } from "@/components/WhyAgropestSection";
import { getLocalePage, type LocalePageProps } from "@/app/[locale]/_utils";

export default async function HomePage({ params }: LocalePageProps) {
  const { content, locale } = getLocalePage((await params).locale);

  return (
    <>
      <HomeHero content={content} locale={locale} />
      <CommitmentSection content={content} />
      <FeaturedProductLinesSection content={content} locale={locale} />
      <ProductCategoriesSection content={content} locale={locale} />
      <WhyAgropestSection content={content} />
      <TechnicalLibraryPreview content={content} locale={locale} />
      <PartnersSection content={content} />
    </>
  );
}
