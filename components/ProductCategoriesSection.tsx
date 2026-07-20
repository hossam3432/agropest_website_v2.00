import Link from "next/link";
import { RevealSection } from "@/components/animations";
import { localizeHref, type Locale, type SiteContent } from "@/lib/content";

type ProductCategoriesSectionProps = {
  content: SiteContent;
  locale: Locale;
  eyebrow?: string;
  title?: string;
  description?: string;
  cta?: { label: string; href: string };
  className?: string;
};

export function ProductCategoriesSection({
  content,
  locale,
  eyebrow = content.home.productCategoriesSection.eyebrow,
  title = content.home.productCategoriesSection.title,
  description = content.home.productCategoriesSection.description,
  cta = content.home.productCategoriesSection.cta,
  className = "bg-agri-mist"
}: ProductCategoriesSectionProps) {
  return (
    <section className={`${className} py-12 sm:py-14 lg:py-16`}>
      <RevealSection className="container-shell" amount={0.15}>
        <div className="relative overflow-hidden rounded-2xl border border-agri-line bg-white p-6 shadow-soft sm:p-8 lg:p-10">
          <div className="absolute inset-y-0 end-0 hidden w-1/3 bg-gradient-to-s from-agri-green/10 to-transparent lg:block" />
          <div className="relative grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-4xl">
              <p className="eyebrow">{eyebrow}</p>
              <h2 className="section-title mt-3">{title}</h2>
              {description ? <p className="section-copy">{description}</p> : null}
            </div>
            {cta ? (
              <Link href={localizeHref(locale, cta.href)} className="btn-secondary w-full sm:w-fit lg:justify-self-end">
                {cta.label}
              </Link>
            ) : null}
          </div>
        </div>
      </RevealSection>
    </section>
  );
}
