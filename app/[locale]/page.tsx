import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { FaqSchema } from "@/components/FaqSchema";
import { HomeHero } from "@/components/HomeHero";
import { getLocalePage, type LocalePageProps } from "@/app/[locale]/_utils";
import { buildPageMetadata } from "@/lib/seo";

const homeFaqItems = {
  en: [
    {
      question: "What does AgroPest Control do?",
      answer:
        "AgroPest Control for Trading is an Egyptian company that selects, registers, imports, and distributes crop protection products, specialty fertilizers, and biostimulants for the Egyptian agricultural market."
    },
    {
      question: "How long has AgroPest Control been operating in Egypt?",
      answer: "AgroPest Control has operated in the Egyptian agricultural market since 1995."
    },
    {
      question: "What types of products does AgroPest Control offer?",
      answer:
        "AgroPest Control's portfolio spans registered crop protection products (agrochemicals) and specialty fertilizers and biostimulants suited to Egyptian crops and farming conditions."
    },
    {
      question: "How can I contact AgroPest Control?",
      answer:
        "You can reach AgroPest Control by phone or WhatsApp at +20 128 88 16352, by email at info@agropestcontrol.com, or by visiting the contact page to send a message directly."
    }
  ],
  ar: [
    {
      question: "ما الذي تقدمه أجروبست كنترول؟",
      answer:
        "أجروبست كنترول للتجارة شركة مصرية تعمل على اختيار وتسجيل واستيراد وتوزيع منتجات وقاية المحاصيل والأسمدة المتخصصة والمحفزات الحيوية للسوق الزراعي المصري."
    },
    {
      question: "منذ متى تعمل أجروبست كنترول في مصر؟",
      answer: "تعمل أجروبست كنترول في السوق الزراعي المصري منذ عام 1995."
    },
    {
      question: "ما أنواع المنتجات التي تقدمها أجروبست كنترول؟",
      answer:
        "تضم محفظة أجروبست كنترول منتجات وقاية محاصيل مسجلة (كيماويات زراعية) بالإضافة إلى أسمدة متخصصة ومحفزات حيوية تناسب المحاصيل وظروف الزراعة المصرية."
    },
    {
      question: "كيف يمكنني التواصل مع أجروبست كنترول؟",
      answer:
        "يمكنكم التواصل مع أجروبست كنترول عبر الهاتف أو الواتساب على +20 128 88 16352، أو عبر البريد الإلكتروني info@agropestcontrol.com، أو من خلال صفحة اتصل بنا لإرسال رسالة مباشرة."
    }
  ]
};

// Below-the-fold sections all pull in framer-motion for scroll-reveal animations.
// Loading them via next/dynamic splits that cost into separate chunks instead of
// blocking the initial bundle needed to render and hydrate the hero.
const CommitmentSection = dynamic(() => import("@/components/CommitmentSection").then((mod) => mod.CommitmentSection));
const FeaturedProductLinesSection = dynamic(() => import("@/components/FeaturedProductLinesSection").then((mod) => mod.FeaturedProductLinesSection));
const ProductCategoriesSection = dynamic(() => import("@/components/ProductCategoriesSection").then((mod) => mod.ProductCategoriesSection));
const WhyAgropestSection = dynamic(() => import("@/components/WhyAgropestSection").then((mod) => mod.WhyAgropestSection));
const TechnicalLibraryPreview = dynamic(() => import("@/components/TechnicalLibraryPreview").then((mod) => mod.TechnicalLibraryPreview));
const PartnersSection = dynamic(() => import("@/components/PartnersSection").then((mod) => mod.PartnersSection));
const CTASection = dynamic(() => import("@/components/CTASection").then((mod) => mod.CTASection));

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { content, locale } = getLocalePage((await params).locale);

  const title =
    locale === "ar"
      ? "وقاية المحاصيل والأسمدة واستيراد المستلزمات الزراعية في مصر"
      : "Crop Protection, Fertilizers & Agri Imports in Egypt";
  const description =
    locale === "ar"
      ? "أجروبست كنترول شركة مصرية متخصصة في اختيار وتسجيل واستيراد وتوزيع حلول موثوقة لوقاية المحاصيل والتغذية النباتية والمحفزات الحيوية في السوق المصري منذ عام 1995."
      : "AgroPest Control selects, registers, and distributes trusted crop protection, plant nutrition, and biostimulant products for Egypt's agricultural market since 1995.";

  return buildPageMetadata({
    locale,
    content,
    path: "/",
    title,
    description,
    image: content.images.hero.home,
    imageAlt: content.company.name
  });
}

export default async function HomePage({ params }: LocalePageProps) {
  const { content, locale } = getLocalePage((await params).locale);

  return (
    <>
      <FaqSchema items={homeFaqItems[locale]} />
      <HomeHero content={content} locale={locale} />
      <CommitmentSection content={content} />
      <FeaturedProductLinesSection content={content} locale={locale} />
      <ProductCategoriesSection content={content} locale={locale} />
      <WhyAgropestSection content={content} />
      <TechnicalLibraryPreview content={content} locale={locale} />
      <PartnersSection content={content} />
      <CTASection locale={locale} {...content.home.cta} />
    </>
  );
}
