import type { Metadata } from "next";
import { ContactSection } from "@/components/ContactSection";
import { HeroSection } from "@/components/HeroSection";
import { getLocalePage, type LocalePageProps } from "@/app/[locale]/_utils";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { content, locale } = getLocalePage((await params).locale);

  const title = locale === "ar" ? "تواصل مع أجروبست كنترول – تجارة زراعية في مصر" : "Contact AgroPest Control – Agrochemical Trading Egypt";
  const description =
    locale === "ar"
      ? "تواصل مع أجروبست كنترول للاستفسار عن منتجات وقاية المحاصيل، الأسمدة، تنسيق التسجيل، دعم الاستيراد، أو شراكات التوزيع في مصر."
      : "Get in touch with AgroPest Control for crop protection products, fertilizers, registration coordination, import support, or distributor partnerships in Egypt.";

  return buildPageMetadata({
    locale,
    content,
    path: "/contact",
    title,
    description,
    image: content.images.hero.contact,
    imageAlt: title
  });
}

export default async function ContactPage({ params }: LocalePageProps) {
  const { content, locale } = getLocalePage((await params).locale);
  const { contactPage } = content;

  return (
    <>
      <HeroSection compact locale={locale} {...contactPage.hero} />
      <ContactSection content={content} />
    </>
  );
}
