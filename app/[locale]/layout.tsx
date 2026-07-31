import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { DocumentLanguage } from "@/components/DocumentLanguage";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { getSiteContent, isLocale, locales } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

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
  const url = absoluteUrl(`/${locale}`);
  const ogLocale = locale === "ar" ? "ar_EG" : "en_US";

  return {
    title: {
      default: content.company.name,
      template: `%s | ${content.company.shortName}`
    },
    description: content.company.tagline,
    alternates: {
      canonical: url,
      languages: {
        en: absoluteUrl("/en"),
        ar: absoluteUrl("/ar"),
        "x-default": absoluteUrl("/en")
      }
    },
    openGraph: {
      title: content.company.name,
      description: content.company.tagline,
      url,
      siteName: content.company.shortName,
      locale: ogLocale,
      alternateLocale: locale === "ar" ? "en_US" : "ar_EG",
      type: "website",
      images: [{ url: absoluteUrl(content.images.hero.home), width: 1200, height: 630, alt: content.company.name }]
    },
    twitter: {
      card: "summary_large_image",
      title: content.company.name,
      description: content.company.tagline,
      images: [absoluteUrl(content.images.hero.home)]
    }
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
      {locale === "ar" ? (
        <>
          {/* forma-djr-arabic is an Arabic-only Adobe Fonts kit — it has no Latin
              glyphs, so it's scoped to /ar only. Loaded non-render-blocking (preload
              + swap) since the kit CSS itself chains an @import to p.typekit.net. */}
          <link rel="preconnect" href="https://use.typekit.net" crossOrigin="anonymous" />
          <link rel="preconnect" href="https://p.typekit.net" crossOrigin="anonymous" />
          <link rel="preload" as="style" href="https://use.typekit.net/gjc0cjr.css" />
          <script
            dangerouslySetInnerHTML={{
              __html:
                "(function(){var l=document.createElement('link');l.rel='stylesheet';l.href='https://use.typekit.net/gjc0cjr.css';document.head.appendChild(l);})();"
            }}
          />
          <noscript>
            <link rel="stylesheet" href="https://use.typekit.net/gjc0cjr.css" />
          </noscript>
        </>
      ) : null}
      <DocumentLanguage direction={content.direction} locale={locale} />
      <Navbar content={content} locale={locale} />
      <main className="pt-24">{children}</main>
      <Footer content={content} locale={locale} />
    </div>
  );
}