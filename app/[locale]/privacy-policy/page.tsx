import type { Metadata } from "next";
import { LegalDocumentView } from "@/components/legal/LegalDocumentView";
import { getLocalePage, type LocalePageProps } from "@/app/[locale]/_utils";
import { getLegalDocument, legalPaths } from "@/lib/content/legal";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { content, locale } = getLocalePage((await params).locale);
  const document = getLegalDocument(locale, "privacy");

  return buildPageMetadata({
    locale,
    content,
    path: legalPaths.privacy,
    title: document.metaTitle,
    description: document.metaDescription
  });
}

export default async function PrivacyPolicyPage({ params }: LocalePageProps) {
  const { locale } = getLocalePage((await params).locale);

  return <LegalDocumentView locale={locale} document={getLegalDocument(locale, "privacy")} />;
}
