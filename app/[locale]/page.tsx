import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { FaqSchema } from "@/components/FaqSchema";
import { HomeHero } from "@/components/HomeHero";
import { HomeMobile } from "@/components/HomeMobile";
import { getLocalePage, type LocalePageProps } from "@/app/[locale]/_utils";
import { buildPageMetadata } from "@/lib/seo";

const homeFaqItems = {
  en: [
    {
      question: "What does AgroPest Control for Trading do?",
      answer:
        "AgroPest Control for Trading is an Egyptian importer and distributor of registered crop protection products, NPK fertilizers, and biostimulants. Established in 1995 and based in Al Nubariya, Beheira, it supplies wholesalers and regional distributors across Egypt."
    },
    {
      question: "Are AgroPest's products registered in Egypt?",
      answer:
        "Yes. Every product AgroPest distributes is registered with the Ministry of Agriculture and the Agricultural Pesticides Committee before it is offered in the Egyptian market. A registered product carries an official label, a reference standard, and an accountable party behind it."
    },
    {
      question: "How do I become an agricultural input distributor with AgroPest in Egypt?",
      answer:
        "Distribution partnerships begin with a direct conversation through the Partner With Us page. Each partner receives registered products, complete technical documentation, and organized follow-up in market."
    },
    {
      question: "Which products and crops does AgroPest supply?",
      answer:
        "Two pillars: crop protection (insecticides and fungicides for vegetable and field crops) and crop nutrition and yield enhancement (water-soluble NPK fertilizers, phosphites, calcium-boron, potassium silicate, and seaweed-extract biostimulants)."
    },
    {
      question: "How can I contact AgroPest Control?",
      answer:
        "You can reach AgroPest Control by phone or WhatsApp at +20 128 88 16352, by email at info@agropestcontrol.com, or by visiting the contact page to send a message directly."
    }
  ],
  ar: [
    {
      question: "ما الذي تقدمه أجروبست كنترول للتجارة؟",
      answer:
        "أجروبست كنترول للتجارة شركة مصرية تستورد وتوزع مبيدات مسجلة وأسمدة مركبة ومحفزات حيوية. تأسست عام 1995 ومقرها النوبارية بالبحيرة، وتورّد لتجار الجملة والموزعين الإقليميين في أنحاء مصر."
    },
    {
      question: "هل منتجات أجروبست مسجلة في مصر؟",
      answer:
        "نعم. كل منتج توزعه أجروبست مسجل لدى وزارة الزراعة ولجنة مبيدات الآفات الزراعية قبل طرحه في السوق المصري. المنتج المسجل له بطاقة استدلالية رسمية وعينة قياسية وجهة مسؤولة خلفه."
    },
    {
      question: "كيف أصبح موزعا لمستلزمات زراعية مع أجروبست في مصر؟",
      answer:
        "تبدأ شراكة التوزيع بحوار مباشر من صفحة «كن موزعا». يحصل كل شريك على منتجات مسجلة، ومستندات فنية كاملة، ومتابعة منظمة في السوق."
    },
    {
      question: "ما المنتجات والمحاصيل التي تخدمها أجروبست؟",
      answer:
        "ركيزتان: وقاية المحاصيل (مبيدات حشرية وفطرية لمحاصيل الخضر والحقل)، والتغذية وتحسين المحصول (أسمدة NPK ذائبة، وفوسفيت، وكالسيوم وبورون، وسيليكات البوتاسيوم، ومحفزات حيوية من مستخلص الطحالب البحرية)."
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
      ? "مبيدات وأسمدة مسجلة في مصر — استيراد وتوزيع منذ 1995"
      : "Crop Protection, Fertilizers & Agri Imports in Egypt";
  const description =
    locale === "ar"
      ? "أجروبست كنترول للتجارة: تسجيل واستيراد وتوزيع مبيدات وأسمدة معتمدة من وزارة الزراعة المصرية، لتجار الجملة والموزعين الإقليميين ومزارع التصدير، منذ عام 1995."
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

      <div className="-mt-24 lg:hidden">
        <HomeMobile content={content} locale={locale} />
      </div>

      <div className="hidden lg:block">
        <HomeHero content={content} locale={locale} />
        <CommitmentSection content={content} />
        <FeaturedProductLinesSection content={content} locale={locale} />
        <ProductCategoriesSection content={content} locale={locale} />
        <WhyAgropestSection content={content} />
        <TechnicalLibraryPreview content={content} locale={locale} />
        <PartnersSection content={content} />
        <CTASection locale={locale} {...content.home.cta} />
      </div>
    </>
  );
}
