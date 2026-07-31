import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { enContent } from "@/lib/content/en";
import { AnalyticsScripts } from "@/components/consent/AnalyticsScripts";
import { ConsentProvider } from "@/components/consent/ConsentProvider";
import { CookieConsentBanner } from "@/components/consent/CookieConsentBanner";
import { StructuredData } from "@/components/StructuredData";
import { absoluteUrl, siteUrl } from "@/lib/seo";

const { company } = enContent;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: company.name,
    template: `%s | ${company.shortName}`
  },
  description: company.tagline,
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    title: company.name,
    description: company.tagline,
    url: siteUrl,
    siteName: company.shortName,
    locale: "en_US",
    alternateLocale: "ar_EG",
    type: "website",
    images: [{ url: absoluteUrl(enContent.images.hero.home), width: 1200, height: 630, alt: company.name }]
  },
  twitter: {
    card: "summary_large_image",
    title: company.name,
    description: company.tagline,
    images: [absoluteUrl(enContent.images.hero.home)]
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://use.typekit.net" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://p.typekit.net" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://use.typekit.net/gjc0cjr.css" />
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MKBHZ3L8"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <StructuredData />
        <ConsentProvider>
          {children}
          <AnalyticsScripts />
          <CookieConsentBanner />
        </ConsentProvider>
      </body>
    </html>
  );
}
