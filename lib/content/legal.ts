import { arLegal } from "@/lib/content/legal.ar";
import { enLegal } from "@/lib/content/legal.en";
import type { LegalContent, LegalDocument } from "@/lib/content/legal-types";
import { defaultLocale, type Locale } from "@/lib/content/routes";

export type { LegalBlock, LegalContent, LegalDocument, LegalSection } from "@/lib/content/legal-types";
export { legalLastUpdated, legalPaths } from "@/lib/content/legal-types";

const legalByLocale: Record<Locale, LegalContent> = {
  en: enLegal,
  ar: arLegal
};

export function getLegalContent(locale: Locale = defaultLocale): LegalContent {
  return legalByLocale[locale];
}

export function getLegalDocument(locale: Locale, doc: keyof LegalContent): LegalDocument {
  return getLegalContent(locale)[doc];
}
