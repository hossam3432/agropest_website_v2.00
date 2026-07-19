import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { DocumentLanguage } from "@/components/DocumentLanguage";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { getSiteContent, isLocale, locales } from "@/lib/content";

type LocaleLayoutProps = {
  children: ReactNode;
  params: {
    locale: string;
  };
};

type LocaleParamsProps = {
  params: {
    locale: string;
  };
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: LocaleParamsProps): Metadata {
  if (!isLocale(params.locale)) {
    return {};
  }

  const content = getSiteContent(params.locale);

  return {
    title: {
      default: content.company.name,
      template: `%s | ${content.company.shortName}`
    },
    description: content.company.tagline
  };
}

export default function LocaleLayout({ children, params }: LocaleLayoutProps) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  const content = getSiteContent(params.locale);

  return (
    <div className="min-h-screen text-start" dir={content.direction} lang={params.locale}>
      <DocumentLanguage direction={content.direction} locale={params.locale} />
      <Navbar content={content} locale={params.locale} />
      <main>{children}</main>
      <Footer content={content} locale={params.locale} />
    </div>
  );
}
