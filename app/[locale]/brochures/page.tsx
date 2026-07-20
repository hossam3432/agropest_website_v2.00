import Link from "next/link";
import { CTASection } from "@/components/CTASection";
import { HeroSection } from "@/components/HeroSection";
import { RevealItem, RevealSection, StaggerContainer } from "@/components/animations";
import { getLocalePage, type LocalePageProps } from "@/app/[locale]/_utils";
import { localizeHref } from "@/lib/content";

export default async function BrochuresPage({ params }: LocalePageProps) {
  const { content, locale } = getLocalePage((await params).locale);
  const { brochuresPage } = content;

  return (
    <>
      <HeroSection compact locale={locale} {...brochuresPage.hero} />

      <section className="bg-white py-12 sm:py-20">
        <div className="container-shell">
          <RevealSection className="max-w-3xl" amount={0.15}>
            <p className="eyebrow">{brochuresPage.section.eyebrow}</p>
            <h2 className="section-title mt-3">{brochuresPage.section.title}</h2>
            <p className="section-copy">{brochuresPage.section.intro}</p>
          </RevealSection>

          <StaggerContainer className="mt-10 grid gap-6 md:grid-cols-2" amount={0.15}>
            {brochuresPage.products.map((product) => (
              <RevealItem key={product.slug} hoverLift>
                <article className="group flex h-full flex-col overflow-hidden border border-agri-line bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-agri-gold hover:shadow-soft">
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <img src={product.logo} alt={product.logoAlt} className="ml-auto h-20 w-auto object-contain sm:h-24" />
                    <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-agri-gold">{product.category}</p>
                    <p className="mt-3 flex-1 leading-7 text-slate-600">{product.description}</p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <a href={product.brochureHref} target="_blank" rel="noopener noreferrer" className="btn-primary">
                        {product.viewLabel}
                      </a>
                      <Link href={localizeHref(locale, product.productPageHref)} className="btn-secondary">
                        {product.productPageLabel}
                      </Link>
                    </div>
                  </div>
                </article>
              </RevealItem>
            ))}
          </StaggerContainer>

          <RevealSection amount={0.15} delay={0.08}>
            <div className="mt-8 border-s-4 border-agri-gold bg-agri-mist p-5 sm:p-6">
              <h3 className="text-lg font-bold tracking-normal text-agri-blue sm:text-xl">{brochuresPage.comingSoon.title}</h3>
              <p className="mt-2 leading-7 text-slate-600">{brochuresPage.comingSoon.description}</p>
            </div>
          </RevealSection>
        </div>
      </section>

      <CTASection locale={locale} {...brochuresPage.cta} />
    </>
  );
}
