import Link from "next/link";
import { RevealItem, RevealSection, StaggerContainer } from "@/components/animations";
import { localizeHref, type Locale, type SiteContent } from "@/lib/content";

type CapabilitySystemSectionProps = {
  content: SiteContent;
  locale: Locale;
  eyebrow?: string;
  title?: string;
  description?: string;
  cta?: { label: string; href: string };
  className?: string;
};

export function CapabilitySystemSection({
  content,
  locale,
  eyebrow = content.home.solutionsSection.eyebrow,
  title = content.home.solutionsSection.title,
  description = content.home.solutionsSection.description,
  cta = content.home.solutionsSection.cta,
  className = "bg-white"
}: CapabilitySystemSectionProps) {
  return (
    <section className={`${className} py-16 sm:py-20 lg:py-24`}>
      <RevealSection className="container-shell grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:items-start" amount={0.15}>
        <div className="lg:sticky lg:top-28">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="section-title mt-3">{title}</h2>
          <p className="section-copy">{description}</p>
          {cta ? (
            <Link href={localizeHref(locale, cta.href)} className="btn-secondary mt-8">
              {cta.label}
            </Link>
          ) : null}
        </div>

        <StaggerContainer className="border-y border-agri-line" amount={0.15}>
          {content.capabilitySystem.map((capability) => (
            <RevealItem key={capability.title}>
              <article className="grid gap-5 border-b border-agri-line py-7 last:border-b-0 sm:grid-cols-[5rem_1fr] lg:py-8">
                <div>
                  <p className="text-3xl font-bold text-agri-gold">{capability.eyebrow}</p>
                </div>
                <div className="grid gap-4 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
                  <div>
                    <h3 className="text-2xl font-bold tracking-normal text-agri-blue">{capability.title}</h3>
                    <p className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-agri-green">{capability.detail}</p>
                  </div>
                  <p className="leading-7 text-slate-600">{capability.description}</p>
                </div>
              </article>
            </RevealItem>
          ))}
        </StaggerContainer>
      </RevealSection>
    </section>
  );
}
