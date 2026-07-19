import Link from "next/link";
import { CTASection } from "@/components/CTASection";
import { ProductNavigationTree } from "@/components/ProductNavigationTree";
import { ProductVisual } from "@/components/ProductVisual";
import { localizeHref, type Locale, type SiteContent } from "@/lib/content";
import {
  productNavigationByLocale,
  productPageContent,
  type ProductDetail,
  type ProductDocument,
  type ProductDocumentType,
  type ProductUsageRow
} from "@/lib/products";

type ProductDetailPageProps = {
  content: SiteContent;
  locale: Locale;
  product: ProductDetail;
};

type CompositionRow = {
  ingredient: string;
  ingredientAr?: string;
  ingredientEn?: string;
  concentration: string;
};

type FactRow = {
  key: string;
  label: string;
  value: string | undefined;
};

function stripTrailingSentencePunctuation(value: string | undefined) {
  return (value ?? "").trim().replace(/[.\u3002]+$/g, "");
}

const ingredientNameTranslations: Record<string, { ar: string; en: string }> = {
  acetamiprid: { ar: "\u{623}\u{633}\u{64a}\u{62a}\u{627}\u{645}\u{628}\u{631}\u{64a}\u{62f}", en: "Acetamiprid" },
  "\u{623}\u{633}\u{64a}\u{62a}\u{627}\u{645}\u{628}\u{631}\u{64a}\u{62f}": { ar: "\u{623}\u{633}\u{64a}\u{62a}\u{627}\u{645}\u{628}\u{631}\u{64a}\u{62f}", en: "Acetamiprid" },
  "\u{623}\u{633}\u{64a}\u{62a}\u{627}\u{645}\u{628}\u{631}\u{64a}\u{62f} acetamiprid": { ar: "\u{623}\u{633}\u{64a}\u{62a}\u{627}\u{645}\u{628}\u{631}\u{64a}\u{62f}", en: "Acetamiprid" },
  propamocarb: { ar: "\u{628}\u{631}\u{648}\u{628}\u{627}\u{645}\u{648}\u{643}\u{627}\u{631}\u{628}", en: "Propamocarb" },
  "\u{628}\u{631}\u{648}\u{628}\u{627}\u{645}\u{648}\u{643}\u{627}\u{631}\u{628}": { ar: "\u{628}\u{631}\u{648}\u{628}\u{627}\u{645}\u{648}\u{643}\u{627}\u{631}\u{628}", en: "Propamocarb" },
  cymoxanil: { ar: "\u{633}\u{64a}\u{645}\u{648}\u{643}\u{633}\u{627}\u{646}\u{64a}\u{644}", en: "Cymoxanil" },
  "\u{633}\u{64a}\u{645}\u{648}\u{643}\u{633}\u{627}\u{646}\u{64a}\u{644}": { ar: "\u{633}\u{64a}\u{645}\u{648}\u{643}\u{633}\u{627}\u{646}\u{64a}\u{644}", en: "Cymoxanil" },
  "propamocarb hcl": { ar: "\u{628}\u{631}\u{648}\u{628}\u{627}\u{645}\u{648}\u{643}\u{627}\u{631}\u{628} \u{647}\u{64a}\u{62f}\u{631}\u{648}\u{643}\u{644}\u{648}\u{631}\u{64a}\u{62f}", en: "Propamocarb HCl" },
  "propamocarb hydrochloride": { ar: "\u{628}\u{631}\u{648}\u{628}\u{627}\u{645}\u{648}\u{643}\u{627}\u{631}\u{628} \u{647}\u{64a}\u{62f}\u{631}\u{648}\u{643}\u{644}\u{648}\u{631}\u{64a}\u{62f}", en: "Propamocarb HCl" },
  "\u{628}\u{631}\u{648}\u{628}\u{627}\u{645}\u{648}\u{643}\u{627}\u{631}\u{628} \u{647}\u{64a}\u{62f}\u{631}\u{648}\u{643}\u{644}\u{648}\u{631}\u{64a}\u{62f}": { ar: "\u{628}\u{631}\u{648}\u{628}\u{627}\u{645}\u{648}\u{643}\u{627}\u{631}\u{628} \u{647}\u{64a}\u{62f}\u{631}\u{648}\u{643}\u{644}\u{648}\u{631}\u{64a}\u{62f}", en: "Propamocarb HCl" },
  "nitrogen (n)": { ar: "\u{646}\u{64a}\u{62a}\u{631}\u{648}\u{62c}\u{64a}\u{646} (N)", en: "Nitrogen (N)" },
  "\u{646}\u{64a}\u{62a}\u{631}\u{648}\u{62c}\u{64a}\u{646} (n)": { ar: "\u{646}\u{64a}\u{62a}\u{631}\u{648}\u{62c}\u{64a}\u{646} (N)", en: "Nitrogen (N)" },
  "phosphorus (p2o5)": { ar: "\u{641}\u{648}\u{633}\u{641}\u{648}\u{631} (P2O5)", en: "Phosphorus (P2O5)" },
  "phosphorus p2o5": { ar: "\u{641}\u{648}\u{633}\u{641}\u{648}\u{631} (P2O5)", en: "Phosphorus (P2O5)" },
  "\u{627}\u{644}\u{641}\u{648}\u{633}\u{641}\u{648}\u{631} (p2o5)": { ar: "\u{627}\u{644}\u{641}\u{648}\u{633}\u{641}\u{648}\u{631} (P2O5)", en: "Phosphorus (P2O5)" },
  "\u{641}\u{648}\u{633}\u{641}\u{648}\u{631} (p2o5)": { ar: "\u{641}\u{648}\u{633}\u{641}\u{648}\u{631} (P2O5)", en: "Phosphorus (P2O5)" },
  "potassium (k2o)": { ar: "\u{628}\u{648}\u{62a}\u{627}\u{633}\u{64a}\u{648}\u{645} (K2O)", en: "Potassium (K2O)" },
  "potassium k2o": { ar: "\u{628}\u{648}\u{62a}\u{627}\u{633}\u{64a}\u{648}\u{645} (K2O)", en: "Potassium (K2O)" },
  "\u{627}\u{644}\u{628}\u{648}\u{62a}\u{627}\u{633}\u{64a}\u{648}\u{645} (k2o)": { ar: "\u{627}\u{644}\u{628}\u{648}\u{62a}\u{627}\u{633}\u{64a}\u{648}\u{645} (K2O)", en: "Potassium (K2O)" },
  "\u{628}\u{648}\u{62a}\u{627}\u{633}\u{64a}\u{648}\u{645} (k2o)": { ar: "\u{628}\u{648}\u{62a}\u{627}\u{633}\u{64a}\u{648}\u{645} (K2O)", en: "Potassium (K2O)" },
  "chelated micronutrients": { ar: "\u{639}\u{646}\u{627}\u{635}\u{631} \u{635}\u{63a}\u{631}\u{649} \u{645}\u{62e}\u{644}\u{628}\u{64a}\u{629}", en: "Chelated micronutrients" },
  "\u{639}\u{646}\u{627}\u{635}\u{631} \u{635}\u{63a}\u{631}\u{649} \u{645}\u{62e}\u{644}\u{628}\u{64a}\u{629}": { ar: "\u{639}\u{646}\u{627}\u{635}\u{631} \u{635}\u{63a}\u{631}\u{649} \u{645}\u{62e}\u{644}\u{628}\u{64a}\u{629}", en: "Chelated micronutrients" },
  "organic matter": { ar: "\u{645}\u{627}\u{62f}\u{629} \u{639}\u{636}\u{648}\u{64a}\u{629}", en: "Organic matter" },
  "\u{645}\u{627}\u{62f}\u{629} \u{639}\u{636}\u{648}\u{64a}\u{629}": { ar: "\u{645}\u{627}\u{62f}\u{629} \u{639}\u{636}\u{648}\u{64a}\u{629}", en: "Organic matter" },
  "mono and dipotassium phosphite": { ar: "\u{623}\u{62d}\u{627}\u{62f}\u{64a} \u{648}\u{62b}\u{646}\u{627}\u{626}\u{64a} \u{641}\u{648}\u{633}\u{641}\u{64a}\u{62a} \u{627}\u{644}\u{628}\u{648}\u{62a}\u{627}\u{633}\u{64a}\u{648}\u{645}", en: "Mono and dipotassium phosphite" },
  "di-potassium phosphite": { ar: "\u{62b}\u{646}\u{627}\u{626}\u{64a} \u{641}\u{648}\u{633}\u{641}\u{64a}\u{62a} \u{627}\u{644}\u{628}\u{648}\u{62a}\u{627}\u{633}\u{64a}\u{648}\u{645}", en: "Di-potassium phosphite" },
  "\u{623}\u{62d}\u{627}\u{62f}\u{64a} \u{648}\u{62b}\u{646}\u{627}\u{626}\u{64a} \u{641}\u{648}\u{633}\u{641}\u{64a}\u{62a} \u{627}\u{644}\u{628}\u{648}\u{62a}\u{627}\u{633}\u{64a}\u{648}\u{645}": { ar: "\u{623}\u{62d}\u{627}\u{62f}\u{64a} \u{648}\u{62b}\u{646}\u{627}\u{626}\u{64a} \u{641}\u{648}\u{633}\u{641}\u{64a}\u{62a} \u{627}\u{644}\u{628}\u{648}\u{62a}\u{627}\u{633}\u{64a}\u{648}\u{645}", en: "Mono and dipotassium phosphite" },
  "phosphorus form": { ar: "\u{635}\u{648}\u{631}\u{629} \u{627}\u{644}\u{641}\u{648}\u{633}\u{641}\u{648}\u{631}", en: "Phosphorus form" },
  "source of phosphorus": { ar: "\u{645}\u{635}\u{62f}\u{631} \u{627}\u{644}\u{641}\u{648}\u{633}\u{641}\u{648}\u{631}", en: "Source of phosphorus" },
  "\u{645}\u{635}\u{62f}\u{631} \u{627}\u{644}\u{641}\u{648}\u{633}\u{641}\u{648}\u{631}": { ar: "\u{645}\u{635}\u{62f}\u{631} \u{627}\u{644}\u{641}\u{648}\u{633}\u{641}\u{648}\u{631}", en: "Source of phosphorus" },
  "source of silicon": { ar: "\u{645}\u{635}\u{62f}\u{631} \u{627}\u{644}\u{633}\u{64a}\u{644}\u{64a}\u{643}\u{648}\u{646}", en: "Source of silicon" },
  "\u{645}\u{635}\u{62f}\u{631} \u{627}\u{644}\u{633}\u{64a}\u{644}\u{64a}\u{643}\u{648}\u{646}": { ar: "\u{645}\u{635}\u{62f}\u{631} \u{627}\u{644}\u{633}\u{64a}\u{644}\u{64a}\u{643}\u{648}\u{646}", en: "Source of silicon" },
  "calcium (cao)": { ar: "\u{643}\u{627}\u{644}\u{633}\u{64a}\u{648}\u{645} (CaO)", en: "Calcium (CaO)" },
  "calcium cao": { ar: "\u{643}\u{627}\u{644}\u{633}\u{64a}\u{648}\u{645} (CaO)", en: "Calcium (CaO)" },
  "\u{627}\u{644}\u{643}\u{627}\u{644}\u{633}\u{64a}\u{648}\u{645} cao": { ar: "\u{627}\u{644}\u{643}\u{627}\u{644}\u{633}\u{64a}\u{648}\u{645} (CaO)", en: "Calcium (CaO)" },
  "boron (b)": { ar: "\u{628}\u{648}\u{631}\u{648}\u{646} (B)", en: "Boron (B)" },
  "boron b": { ar: "\u{628}\u{648}\u{631}\u{648}\u{646} (B)", en: "Boron (B)" },
  "\u{627}\u{644}\u{628}\u{648}\u{631}\u{648}\u{646} b": { ar: "\u{627}\u{644}\u{628}\u{648}\u{631}\u{648}\u{646} (B)", en: "Boron (B)" },
  "ascophyllum nodosum extract": { ar: "\u{645}\u{633}\u{62a}\u{62e}\u{644}\u{635} Ascophyllum nodosum", en: "Ascophyllum nodosum extract" },
  "\u{645}\u{633}\u{62a}\u{62e}\u{644}\u{635} ascophyllum nodosum": { ar: "\u{645}\u{633}\u{62a}\u{62e}\u{644}\u{635} Ascophyllum nodosum", en: "Ascophyllum nodosum extract" },
  "cytokinin (kinetin)": { ar: "\u{633}\u{64a}\u{62a}\u{648}\u{643}\u{64a}\u{646}\u{64a}\u{646} (\u{643}\u{64a}\u{646}\u{64a}\u{62a}\u{64a}\u{646})", en: "Cytokinin (kinetin)" },
  "\u{633}\u{64a}\u{62a}\u{648}\u{643}\u{64a}\u{646}\u{64a}\u{646} (\u{643}\u{64a}\u{646}\u{64a}\u{62a}\u{64a}\u{646})": { ar: "\u{633}\u{64a}\u{62a}\u{648}\u{643}\u{64a}\u{646}\u{64a}\u{646} (\u{643}\u{64a}\u{646}\u{64a}\u{62a}\u{64a}\u{646})", en: "Cytokinin (kinetin)" },
  "free plant-origin amino acids": { ar: "\u{623}\u{62d}\u{645}\u{627}\u{636} \u{623}\u{645}\u{64a}\u{646}\u{64a}\u{629} \u{62d}\u{631}\u{629} \u{646}\u{628}\u{627}\u{62a}\u{64a}\u{629}", en: "Free plant-origin amino acids" },
  "free plant amino acids": { ar: "\u{623}\u{62d}\u{645}\u{627}\u{636} \u{623}\u{645}\u{64a}\u{646}\u{64a}\u{629} \u{62d}\u{631}\u{629} \u{646}\u{628}\u{627}\u{62a}\u{64a}\u{629}", en: "Free plant-origin amino acids" },
  nitrogen: { ar: "\u{646}\u{64a}\u{62a}\u{631}\u{648}\u{62c}\u{64a}\u{646}", en: "Nitrogen" },
  "\u{646}\u{64a}\u{62a}\u{631}\u{648}\u{62c}\u{64a}\u{646}": { ar: "\u{646}\u{64a}\u{62a}\u{631}\u{648}\u{62c}\u{64a}\u{646}", en: "Nitrogen" },
  iron: { ar: "\u{62d}\u{62f}\u{64a}\u{62f}", en: "Iron" },
  "\u{62d}\u{62f}\u{64a}\u{62f}": { ar: "\u{62d}\u{62f}\u{64a}\u{62f}", en: "Iron" },
  boron: { ar: "\u{628}\u{648}\u{631}\u{648}\u{646}", en: "Boron" },
  "\u{628}\u{648}\u{631}\u{648}\u{646}": { ar: "\u{628}\u{648}\u{631}\u{648}\u{646}", en: "Boron" },
  copper: { ar: "\u{646}\u{62d}\u{627}\u{633}", en: "Copper" },
  "\u{646}\u{62d}\u{627}\u{633}": { ar: "\u{646}\u{62d}\u{627}\u{633}", en: "Copper" },
  manganese: { ar: "\u{645}\u{646}\u{62c}\u{646}\u{64a}\u{632}", en: "Manganese" },
  "\u{645}\u{646}\u{62c}\u{646}\u{64a}\u{632}": { ar: "\u{645}\u{646}\u{62c}\u{646}\u{64a}\u{632}", en: "Manganese" },
  molybdenum: { ar: "\u{645}\u{648}\u{644}\u{64a}\u{628}\u{62f}\u{646}\u{645}", en: "Molybdenum" },
  "\u{645}\u{648}\u{644}\u{64a}\u{628}\u{62f}\u{646}\u{645}": { ar: "\u{645}\u{648}\u{644}\u{64a}\u{628}\u{62f}\u{646}\u{645}", en: "Molybdenum" },
  zinc: { ar: "\u{632}\u{646}\u{643}", en: "Zinc" },
  "\u{632}\u{646}\u{643}": { ar: "\u{632}\u{646}\u{643}", en: "Zinc" }
};

function normalizeIngredientKey(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[\u2082]/g, "2")
    .replace(/[\u2083]/g, "3")
    .replace(/[\u2085]/g, "5")
    .replace(/[\u2080]/g, "0")
    .replace(/\s+/g, " ");
}

function getLocalizedIngredientName(row: CompositionRow, locale: Locale) {
  const explicitName = locale === "ar" ? row.ingredientAr : row.ingredientEn;

  if (explicitName) {
    return explicitName;
  }

  const translatedName = ingredientNameTranslations[normalizeIngredientKey(row.ingredient)];

  return translatedName ? translatedName[locale] : row.ingredient;
}

function parseCompositionRows(value: string | undefined): CompositionRow[] {
  const cleanValue = stripTrailingSentencePunctuation(value);

  if (!cleanValue) {
    return [];
  }

  const rows = cleanValue
    .replace(/\s+and\s+/gi, ", ")
    .split(/[,;\u060C\u061B+]+/)
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const match = part.match(
        /^(.*?)(\d+(?:[.,]\d+)?\s*(?:%|g\/?L|g\/?l|\u062C\u0645\/?\u0644\u062A\u0631|\u0648\u0632\u0646\/?\u0648\u0632\u0646|\u0648\u0632\u0646\/?\u062D\u062C\u0645|w\/?w|w\/?v)(?:\s*(?:w\/?w|w\/?v|\u0648\u0632\u0646\/?\u0648\u0632\u0646|\u0648\u0632\u0646\/?\u062D\u062C\u0645|\u062C\u0645\/?\u0644\u062A\u0631|g\/?L|g\/?l))?)/i
      );

      if (!match) {
        return null;
      }

      const ingredient = match[1].trim().replace(/[(:\uFF1A-]+$/g, "").trim();
      const concentration = match[2].trim();

      if (!ingredient || !concentration) {
        return null;
      }

      return { ingredient, concentration };
    })
    .filter((row): row is CompositionRow => Boolean(row));

  return rows.length ? rows : [{ ingredient: cleanValue, concentration: "-" }];
}

function isUnderRegistrationStatus(status: string) {
  return status.toLowerCase().includes("under registration") || status.includes("\u062A\u062D\u062A \u0627\u0644\u062A\u0633\u062C\u064A\u0644");
}

function cleanDoseText(value: string | undefined) {
  return (value ?? "").trim().replace(/[.\u060C,]+$/g, "");
}

function splitNutritionDose(row: ProductUsageRow) {
  if (row.foliarDose || row.fertigationDose) {
    return {
      foliarDose: cleanDoseText(row.foliarDose ?? row.dose),
      fertigationDose: cleanDoseText(row.fertigationDose ?? "-")
    };
  }

  const dose = row.dose.trim();
  const foliarMatch = dose.match(
    /(?:Foliar(?: spray)?|\u0631\u0634 \u0648\u0631\u0642\u064A)\s*:\s*(.*?)(?:[.\u060C]\s*(?:Fertigation|With irrigation|\u0645\u0639 \u0627\u0644\u0631\u064A)\s*:|$)/i
  );
  const fertigationMatch = dose.match(/(?:Fertigation|With irrigation|\u0645\u0639 \u0627\u0644\u0631\u064A)\s*:\s*(.*?)(?:[.\u060C]|$)/i);

  return {
    foliarDose: cleanDoseText(foliarMatch?.[1] ?? dose),
    fertigationDose: cleanDoseText(fertigationMatch?.[1] ?? "-")
  };
}

function hasDoseValue(value: string | undefined) {
  const normalizedValue = cleanDoseText(value).toLowerCase();

  return Boolean(normalizedValue && normalizedValue !== "-" && normalizedValue !== "n/a" && normalizedValue !== "na");
}

function normalizeDocumentType(document: ProductDocument): ProductDocumentType {
  if (document.type) {
    return document.type;
  }

  const title = document.title.toLowerCase();
  const combined = [document.title, document.description, document.status].join(" ").toLowerCase();

  if (title.includes("brochure") || document.title.includes("\u0627\u0644\u0628\u0631\u0648\u0634\u0648\u0631")) {
    return "brochure";
  }

  if (title.includes("technical sheet") || document.title.includes("\u0627\u0644\u0646\u0634\u0631\u0629 \u0627\u0644\u0641\u0646\u064A\u0629")) {
    return "technical-sheet";
  }

  if (title.includes("label") || document.title.includes("\u0627\u0644\u0645\u0644\u0635\u0642")) {
    return "label";
  }

  if (combined.includes("registration") || combined.includes("\u062A\u0633\u062C\u064A\u0644")) {
    return "registration-document";
  }

  if (combined.includes("safety") || combined.includes("msds") || combined.includes("\u0633\u0644\u0627\u0645\u0629")) {
    return "safety-information";
  }

  if (title.includes("certificate") || title.includes("coa") || document.title.includes("\u0634\u0647\u0627\u062F\u0629") || document.title.includes("\u0627\u0644\u0634\u0647\u0627\u062F\u0627\u062A")) {
    return "certificate";
  }

  return "other";
}

function buildWhenToUseItems(product: ProductDetail) {
  return product.usageGuidance.map((row) => ({
    title: row.crop,
    description: [row.target, row.timing].filter(Boolean).join(" - ")
  }));
}

function getApplicationSummary(row: ProductUsageRow, isNutritionProduct: boolean) {
  if (isNutritionProduct) {
    return [row.target, row.recommendation].filter(Boolean).join(" ");
  }

  return row.recommendation;
}

function getMethod(row: ProductUsageRow) {
  return row.method ?? row.interval;
}

function getTreatmentCount(row: ProductUsageRow) {
  return row.treatmentCount ?? row.recommendation;
}

function getCompositionUnit(product: ProductDetail, locale: Locale) {
  const formulation = product.facts.formulation.toLowerCase();
  const isPowderProduct =
    product.slug === "lasix" ||
    product.slug.startsWith("signal-") ||
    formulation.includes("wg") ||
    formulation.includes("wsp") ||
    formulation.includes("powder") ||
    formulation.includes("مسحوق") ||
    formulation.includes("حبيبات");

  if (locale === "ar") {
    return isPowderProduct ? "وزن/وزن" : "وزن/حجم";
  }

  return isPowderProduct ? "w/w" : "w/v";
}

function formatPercentValue(value: number) {
  return Number.isInteger(value) ? String(value) : value.toFixed(2).replace(/0+$/g, "").replace(/\.$/, "");
}

function formatCompositionConcentration(value: string, product: ProductDetail, locale: Locale) {
  const trimmedValue = value.trim();
  const unit = getCompositionUnit(product, locale);
  const gramPerLiterMatch = trimmedValue.match(/^(\d+(?:[.,]\d+)?)\s*(?:g\/?L|g\/?l|جم\/?لتر)$/i);

  if (gramPerLiterMatch) {
    const percentValue = Number(gramPerLiterMatch[1].replace(",", ".")) / 10;

    return `${formatPercentValue(percentValue)}% ${unit}`;
  }

  const percentMatch = trimmedValue.match(/^(\d+(?:[.,]\d+)?)\s*%(?:\s*(?:w\/?w|w\/?v|وزن\/?وزن|وزن\/?حجم|حجم\/?حجم))?$/i);

  if (percentMatch) {
    return `${percentMatch[1]}% ${unit}`;
  }

  return trimmedValue;
}

export function ProductDetailPage({ content, locale, product }: ProductDetailPageProps) {
  const pageContent = productPageContent[locale];
  const isRtl = locale === "ar";
  const isNutritionProduct = product.categorySlug === "specialty-fertilizers";
  const isPesticideProduct = product.categorySlug === "agrochemicals";
  const pageSections = product.pageSections;
  const overviewSection = {
    title: pageSections?.overview?.title ?? product.name,
    description: pageSections?.overview?.description ?? product.overview
  };
  const whenToUseSection = {
    title: pageSections?.whenToUse?.title ?? pageContent.sections.whenToUse,
    description: pageSections?.whenToUse?.description,
    items: pageSections?.whenToUse?.items ?? buildWhenToUseItems(product)
  };
  const whyThisProductSection = {
    title: pageSections?.whyThisProduct?.title ?? product.modeOfAction.title,
    description: pageSections?.whyThisProduct?.description ?? product.modeOfAction.description,
    image: pageSections?.whyThisProduct?.image ?? product.modeOfAction.image,
    imageAlt: pageSections?.whyThisProduct?.imageAlt ?? product.modeOfAction.imageAlt,
    points: pageSections?.whyThisProduct?.points ?? product.modeOfAction.points
  };
  const fieldBenefitsSection = {
    title: pageSections?.fieldBenefits?.title ?? pageContent.sections.fieldBenefits,
    items: pageSections?.fieldBenefits?.items ?? product.benefits
  };
  const applicationSection = {
    title: pageSections?.applicationRecommendations?.title ?? (product.usageTitle ?? (isNutritionProduct ? pageContent.nutritionUsageTitle : pageContent.usageTitle)),
    intro: pageSections?.applicationRecommendations?.intro ?? product.usageIntro,
    rows: pageSections?.applicationRecommendations?.rows ?? product.usageGuidance
  };
  const technicalNotesSection = {
    title: pageSections?.technicalNotes?.title ?? product.technicalNotesTitle ?? pageContent.sections.technicalNotes,
    items: pageSections?.technicalNotes?.items ?? product.technicalNotes ?? [],
    needsManualWriting: pageSections?.technicalNotes?.needsManualWriting ?? !product.technicalNotes?.length
  };
  const documentsSection = {
    title: pageContent.documentsTitle,
    items: (pageSections?.documents?.items ?? product.documents).filter((document) => {
      const documentType = normalizeDocumentType(document);

      return documentType === "brochure" || documentType === "technical-sheet";
    })
  };
  const factRows: FactRow[] = [
    { key: "category", label: pageContent.factLabels.category, value: product.facts.category.split(">").pop()?.trim() },
    { key: "formulation", label: isNutritionProduct ? pageContent.nutritionFormulationLabel : pageContent.factLabels.formulation, value: product.facts.formulation },
    { key: "targetCrop", label: pageContent.factLabels.targetCrop, value: product.facts.targetCrop },
    { key: "target", label: isNutritionProduct ? pageContent.factLabels.effect : pageContent.factLabels.target, value: product.facts.target },
    { key: "supplier", label: pageContent.factLabels.supplier, value: product.facts.supplier },
    { key: "registrationStatus", label: pageContent.factLabels.registrationStatus, value: product.hideRegistrationFact ? undefined : product.facts.registrationStatus }
  ].filter((fact) => Boolean(fact.value));
  const hasFertigationRecommendation =
    isNutritionProduct && applicationSection.rows.some((row) => hasDoseValue(splitNutritionDose(row).fertigationDose));
  const backHref = localizeHref(locale, "/products?category=" + product.categorySlug + "&subcategory=" + encodeURIComponent(product.subcategory));
  const compositionHeaders = locale === "ar" ? ["العنصر", "التركيز"] : ["Ingredient", "Concentration"];
  const compositionRows = (product.facts.compositionRows ?? parseCompositionRows(product.facts.composition)).map((row) => ({
    ...row,
    ingredientLabel: getLocalizedIngredientName(row, locale)
  }));

  return (
    <>
      <section className="relative isolate bg-[linear-gradient(135deg,#0A3D2B_0%,#F4F7F5_50%,#FFFFFF_100%)] py-14 sm:py-16 lg:py-20">
        <div className="absolute start-0 top-0 h-1 w-full bg-agri-gold" />
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:items-center lg:px-8">
          <div className="min-w-0">
            <Link href={backHref} className="inline-flex items-center gap-2 text-sm font-bold text-agri-green transition hover:text-agri-gold">
              <span aria-hidden>{isRtl ? ">" : "<"}</span>
              <span>{pageContent.backToCatalog}</span>
            </Link>
            <p className="eyebrow mt-6">{pageContent.heroEyebrow}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <span className="bg-agri-green px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-white">{product.category}</span>
              {!isUnderRegistrationStatus(product.registrationStatus) ? (
                <span className="border border-agri-gold bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-agri-blue">
                  {product.registrationStatus}
                </span>
              ) : null}
            </div>
            <h1 className="mt-6 max-w-4xl text-[40px] font-bold leading-[1.02] tracking-normal text-agri-blue sm:text-[52px] lg:text-[64px]">
              {product.name}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">{product.positioning}</p>
          </div>

          <div className="min-w-0">
            <ProductVisual
              alt={product.detailImageAlt}
              className="mx-auto h-[340px] w-full max-w-[520px] shadow-soft sm:h-[440px] lg:h-[500px] xl:max-w-[560px]"
              eyebrow={pageContent.imagePlaceholder}
              label={product.name}
              src={product.detailImage}
            />
          </div>
        </div>
      </section>

      <section className="bg-agri-mist py-10 sm:py-12 lg:py-16">
        <div
          className={
            "mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 lg:px-8 " +
            (isRtl ? "lg:grid-cols-[minmax(0,1fr)_20rem]" : "lg:grid-cols-[20rem_minmax(0,1fr)]")
          }
        >
          <aside className={"min-w-0 " + (isRtl ? "lg:order-2" : "")}>
            <ProductNavigationTree
              activeCategorySlug={product.categorySlug}
              activeProductSlug={product.slug}
              activeSubcategory={product.subcategory}
              content={productNavigationByLocale[locale]}
              locale={locale}
            />
          </aside>

          <div className="min-w-0 space-y-8">
            <section className="border border-agri-line bg-white p-5 shadow-sm sm:p-7 lg:p-8">
              <p className="eyebrow">{pageContent.sections.overview}</p>
              <div className="mt-3 grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
                <div>
                  <h2 className="section-title">{overviewSection.title}</h2>
                </div>
                <p className="text-xl leading-9 text-slate-600">{overviewSection.description}</p>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {factRows.map((fact) => {
                  const displayValue = stripTrailingSentencePunctuation(fact.value);

                  return (
                    <article key={fact.key} className="border border-agri-line bg-agri-mist p-5 shadow-sm">
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-agri-gold">{fact.label}</p>
                      <p className="mt-3 text-base font-bold leading-7 text-agri-blue">{displayValue}</p>
                    </article>
                  );
                })}
              </div>

              {compositionRows.length ? (
                <div className="mt-8">
                  <p className="eyebrow">{pageContent.factLabels.composition}</p>
                  <h3 className="mt-3 text-2xl font-bold tracking-normal text-agri-blue">{pageContent.compositionTitle}</h3>
                  <div className="mt-6 overflow-hidden border border-agri-line bg-white md:hidden">
                    <div className="grid grid-cols-[minmax(0,1fr)_minmax(5.5rem,0.72fr)] gap-3 bg-agri-blue p-4 text-white">
                      <p className="text-[11px] font-bold uppercase tracking-[0.14em]">{compositionHeaders[0]}</p>
                      <p className="border-s border-white/20 ps-3 text-[11px] font-bold uppercase tracking-[0.14em]">{compositionHeaders[1]}</p>
                    </div>
                    {compositionRows.map((row) => (
                      <div
                        key={row.ingredientLabel + "-" + row.concentration}
                        className="grid grid-cols-[minmax(0,1fr)_minmax(5.5rem,0.72fr)] gap-3 border-b border-agri-line p-4 last:border-b-0"
                      >
                        <p className="break-words text-sm font-bold leading-6 text-agri-blue">{row.ingredientLabel}</p>
                        <p className="min-w-0 break-words border-s border-agri-line ps-3 text-sm leading-6 text-slate-600">{formatCompositionConcentration(row.concentration, product, locale)}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 hidden overflow-x-auto border border-agri-line bg-white md:block">
                    <table className="w-full min-w-[420px] border-collapse text-start">
                      <thead className="bg-agri-blue text-white">
                        <tr>
                          {compositionHeaders.map((header) => (
                            <th key={header} className="px-4 py-4 text-start text-xs font-bold uppercase tracking-[0.14em]">
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {compositionRows.map((row) => (
                          <tr key={row.ingredientLabel + "-" + row.concentration} className="border-b border-agri-line last:border-b-0">
                            <td className="px-4 py-4 font-bold text-agri-blue">{row.ingredientLabel}</td>
                            <td className="px-4 py-4 text-slate-600">{formatCompositionConcentration(row.concentration, product, locale)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : null}
            </section>

            <section className="border border-agri-line bg-white p-5 shadow-sm sm:p-7 lg:p-8">
              <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
                <div>
                  <h2 className="section-title">{whenToUseSection.title}</h2>
                  {whenToUseSection.description ? <p className="section-copy">{whenToUseSection.description}</p> : null}
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {whenToUseSection.items.map((item, index) => (
                    <article key={item.title + "-" + index} className="border border-agri-line bg-agri-mist p-5">
                      <h3 className="text-xl font-bold text-agri-blue">{item.title}</h3>
                      {item.description ? <p className="mt-3 leading-7 text-slate-600">{item.description}</p> : null}
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <section className="grid gap-8 border border-agri-line bg-white p-5 shadow-sm sm:p-7 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:p-8">
              <ProductVisual
                alt={whyThisProductSection.imageAlt}
                className="mx-auto h-[300px] w-full max-w-[520px] shadow-soft sm:h-[380px] lg:h-[440px]"
                eyebrow={pageContent.imagePlaceholder}
                label={whyThisProductSection.title}
                src={whyThisProductSection.image}
              />
              <div>
                <p className="eyebrow">{pageContent.sections.whyThisProduct}</p>
                <h2 className="section-title mt-3">{whyThisProductSection.title}</h2>
                {whyThisProductSection.description ? <p className="section-copy">{whyThisProductSection.description}</p> : null}
                <div className="mt-8 grid gap-3">
                  {whyThisProductSection.points.map((point) => (
                    <div key={point} className="flex gap-3 border-s-2 border-agri-gold bg-agri-mist p-4">
                      <span className="mt-2 h-2 w-2 flex-shrink-0 bg-agri-green" />
                      <p className="font-bold leading-7 text-agri-blue">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="bg-agri-blue p-5 text-white shadow-soft sm:p-7 lg:p-8">
              <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
                <div>
                  <p className="eyebrow">{pageContent.fieldBenefitsEyebrow}</p>
                  <h2 className="mt-3 text-3xl font-bold tracking-normal sm:text-4xl">{fieldBenefitsSection.title}</h2>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {fieldBenefitsSection.items.map((benefit, index) => (
                    <article key={benefit.title} className="border border-white/15 bg-white/5 p-5">
                      <p className="text-3xl font-bold text-agri-gold">{String(index + 1).padStart(2, "0")}</p>
                      <h3 className="mt-4 text-2xl font-bold tracking-normal">{benefit.title}</h3>
                      <p className="mt-3 leading-7 text-white/70">{benefit.description}</p>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <section className="scroll-mt-24 border border-agri-line bg-white p-5 shadow-sm sm:p-7 lg:p-8" id="application-recommendations">
              <p className="eyebrow">{pageContent.applicationRecommendationsEyebrow}</p>
              <h2 className="section-title mt-3">{applicationSection.title}</h2>
              {applicationSection.intro ? <p className="mt-4 max-w-3xl text-start leading-8 text-slate-600">{applicationSection.intro}</p> : null}

              <div className="mt-8 grid gap-4 md:hidden">
                {applicationSection.rows.map((row) => {
                  const splitDose = splitNutritionDose(row);
                  const summaryDoseLabel = isNutritionProduct ? pageContent.applicationLabels.foliarDose : pageContent.applicationLabels.dose;
                  const summaryDoseValue = isNutritionProduct ? splitDose.foliarDose : row.dose;
                  const applicationDetails = isPesticideProduct
                    ? [row.target, row.timing, getMethod(row), row.phi ?? row.recommendation]
                    : [row.target, row.timing, getMethod(row), getTreatmentCount(row)];

                  return (
                    <details key={row.crop + "-" + row.target} className="group border border-agri-line bg-agri-mist">
                      <summary className="grid cursor-pointer list-none gap-4 p-4 transition hover:bg-white/70 [&::-webkit-details-marker]:hidden">
                        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                          <div className="min-w-0">
                            <p className="text-xs font-bold uppercase tracking-[0.14em] text-agri-gold">{pageContent.applicationLabels.crop}</p>
                            <h3 className="mt-2 text-lg font-bold leading-7 text-agri-blue">{row.crop}</h3>
                          </div>
                          <span className="mt-1 inline-flex h-8 w-8 items-center justify-center border border-agri-gold bg-white text-lg font-bold leading-none text-agri-green transition group-open:rotate-45">
                            +
                          </span>
                        </div>
                        <div className="border-t border-agri-line pt-3">
                          <p className="text-xs font-bold uppercase tracking-[0.14em] text-agri-gold">{summaryDoseLabel}</p>
                          <p className="mt-2 font-bold leading-7 text-slate-700">{summaryDoseValue}</p>
                        </div>
                      </summary>
                      <div className="grid gap-4 border-t border-agri-line bg-white p-4">
                        {isNutritionProduct && hasFertigationRecommendation ? (
                          <div>
                            <p className="text-xs font-bold uppercase tracking-[0.14em] text-agri-gold">{pageContent.applicationLabels.fertigationDose}</p>
                            <p className="mt-2 leading-7 text-slate-600">{splitDose.fertigationDose}</p>
                          </div>
                        ) : null}
                        {applicationDetails.filter(Boolean).map((detail, index) => (
                          <div key={detail + "-" + index} className="border-t border-agri-line pt-4 first:border-t-0 first:pt-0">
                            <p className="text-xs font-bold uppercase tracking-[0.14em] text-agri-gold">
                              {index === 0
                                ? pageContent.applicationLabels.target
                                : index === 1
                                  ? pageContent.applicationLabels.timing
                                  : index === 2
                                    ? pageContent.applicationLabels.method
                                    : isPesticideProduct
                                      ? pageContent.applicationLabels.phi
                                      : pageContent.applicationLabels.treatments}
                            </p>
                            <p className="mt-2 leading-7 text-slate-600">{detail}</p>
                          </div>
                        ))}
                      </div>
                    </details>
                  );
                })}
              </div>

              <div className="mt-8 hidden overflow-x-auto border border-agri-line bg-white md:block">
                <table className="w-full min-w-[840px] border-collapse text-start">
                  <thead className="bg-agri-blue text-white">
                    <tr>
                      <th className="px-4 py-4 text-start text-xs font-bold uppercase tracking-[0.14em]">{pageContent.applicationLabels.crop}</th>
                      <th className="px-4 py-4 text-start text-xs font-bold uppercase tracking-[0.14em]">{pageContent.applicationLabels.target}</th>
                      <th className="px-4 py-4 text-start text-xs font-bold uppercase tracking-[0.14em]">
                        {isNutritionProduct ? pageContent.applicationLabels.foliarDose : pageContent.applicationLabels.dose}
                      </th>
                      {isNutritionProduct && hasFertigationRecommendation ? (
                        <th className="px-4 py-4 text-start text-xs font-bold uppercase tracking-[0.14em]">{pageContent.applicationLabels.fertigationDose}</th>
                      ) : null}
                      <th className="px-4 py-4 text-start text-xs font-bold uppercase tracking-[0.14em]">{pageContent.applicationLabels.timing}</th>
                      <th className="px-4 py-4 text-start text-xs font-bold uppercase tracking-[0.14em]">{pageContent.applicationLabels.method}</th>
                      <th className="px-4 py-4 text-start text-xs font-bold uppercase tracking-[0.14em]">
                        {isPesticideProduct ? pageContent.applicationLabels.phi : pageContent.applicationLabels.treatments}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {applicationSection.rows.map((row) => {
                      const splitDose = splitNutritionDose(row);

                      return (
                        <tr key={row.crop + "-" + row.target} className="border-b border-agri-line last:border-b-0">
                          <td className="px-4 py-4 font-bold text-agri-blue">{row.crop}</td>
                          <td className="px-4 py-4 text-slate-600">{row.target}</td>
                          <td className="px-4 py-4 text-slate-600">{isNutritionProduct ? splitDose.foliarDose : row.dose}</td>
                          {isNutritionProduct && hasFertigationRecommendation ? (
                            <td className="px-4 py-4 text-slate-600">{splitDose.fertigationDose}</td>
                          ) : null}
                          <td className="px-4 py-4 text-slate-600">{row.timing}</td>
                          <td className="px-4 py-4 text-slate-600">{getMethod(row)}</td>
                          <td className="px-4 py-4 text-slate-600">
                            {isPesticideProduct ? row.phi ?? row.recommendation : getApplicationSummary(row, isNutritionProduct)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="border border-agri-line bg-white p-5 shadow-sm sm:p-7 lg:p-8">
              <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
                <div>
                  <h2 className="section-title">{technicalNotesSection.title}</h2>
                </div>
                {technicalNotesSection.items.length ? (
                  <ul className="grid gap-3 text-start leading-7 text-slate-600 sm:grid-cols-2">
                    {technicalNotesSection.items.map((note) => (
                      <li key={note} className="flex gap-2 border border-agri-line bg-agri-mist p-4">
                        <span className="mt-3 h-1.5 w-1.5 flex-shrink-0 bg-agri-gold" />
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="border border-dashed border-agri-line bg-agri-mist p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-agri-gold">{pageContent.sectionNotes.manualWritingNeeded}</p>
                    <p className="mt-3 leading-7 text-slate-600">{pageContent.sectionNotes.technicalNotesPlaceholder}</p>
                  </div>
                )}
              </div>
            </section>

            <section className="border border-agri-line bg-white p-5 shadow-sm sm:p-7 lg:p-8" id="documents">
              <p className="eyebrow">{pageContent.sections.documents}</p>
              <div className="mt-3 grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
                <h2 className="section-title">{documentsSection.title}</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {documentsSection.items.map((document) => {
                    const documentType = normalizeDocumentType(document);
                    const documentHref = document.href ?? localizeHref(locale, "/contact");

                    return (
                      <article key={document.title + "-" + documentType} className="border border-agri-line bg-agri-mist p-5">
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-agri-gold">{pageContent.documentTypeLabels[documentType]}</p>
                        <h3 className="mt-3 text-xl font-bold text-agri-blue">{document.title}</h3>
                        <p className="mt-3 leading-7 text-slate-600">{document.description}</p>
                        <Link href={documentHref} className="btn-secondary mt-5">
                          {pageContent.requestDocument}
                        </Link>
                      </article>
                    );
                  })}
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>

      <CTASection
        description={pageContent.finalCta.description}
        locale={locale}
        primaryHref={pageContent.finalCta.primaryHref}
        primaryLabel={pageContent.finalCta.primaryLabel}
        secondaryHref={content.ctaActions.whatsapp.href}
        secondaryLabel={pageContent.finalCta.secondaryLabel}
        title={pageContent.finalCta.title}
      />
    </>
  );
}
