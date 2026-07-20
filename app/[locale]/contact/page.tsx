import { ContactSection } from "@/components/ContactSection";
import { HeroSection } from "@/components/HeroSection";
import { getLocalePage, type LocalePageProps } from "@/app/[locale]/_utils";

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
