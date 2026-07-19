import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { DocumentLanguage } from "@/components/DocumentLanguage";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { getSiteContent, isLocale, locales } from "@/lib/content";

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

type LocaleParamsProps = {
  params: Promise<{
    locale: string;
  }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// 1. Added 'async' here and changed return type to Promise<Metadata>
export async function generateMetadata({ params }: LocaleParamsProps): Promise<Metadata> {
  // 2. Await the params before using them
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  if (!isLocale(locale)) {
    return {};
  }

  const content = getSiteContent(locale);

  return {
    title: {
      default: content.company.name,
      template: `%s | ${content.company.shortName}`
    },
    description: content.company.tagline
  };
}

// 3. Added 'async' here
export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  // 4. Await the params before using them
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  if (!isLocale(locale)) {
    notFound();
  }

  const content = getSiteContent(locale);

  return (
    <div className="min-h-screen text-start" dir={content.direction} lang={locale}>
      <DocumentLanguage direction={content.direction} locale={locale} />
      <Navbar content={content} locale={locale} />
      <main>{children}</main>
      <Footer content={content} locale={locale} />
    </div>
  );
}