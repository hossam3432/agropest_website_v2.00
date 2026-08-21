import type { Metadata } from "next";
import Link from "next/link";
import { CTASection } from "@/components/CTASection";
import { HeroSection } from "@/components/HeroSection";
import { RevealItem, RevealSection, StaggerContainer } from "@/components/animations";
import { getLocalePage, type LocalePageProps } from "@/app/[locale]/_utils";
import { localizeHref } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { content, locale } = getLocalePage((await params).locale);

  const title = locale === "ar" ? "المصادر الفنية ومركز المعرفة الزراعية" : "Technical Resources & Agricultural Knowledge Center";
  const description =
    locale === "ar"
      ? "تصفح مكتبة أجروبست الفنية التي تضم بروشورات المنتجات والنشرات الفنية وتوصيات الاستخدام والمواد المرئية لدعم الموزعين والمهندسين والمزارعين في مصر."
      : "Access AgroPest's technical library of product brochures, leaflets, usage recommendations, and visual materials supporting distributors, engineers, and growers across Egypt.";

  return buildPageMetadata({
    locale,
    content,
    path: "/technical-library",
    title,
    description,
    image: content.images.hero.library,
    imageAlt: title
  });
}

export default async function TechnicalLibraryPage({ params }: LocalePageProps) {
  const { content, locale } = getLocalePage((await params).locale);
  const { libraryPage, technicalLibraryPreview } = content;

  return (
    <>
      <HeroSection compact locale={locale} {...libraryPage.hero} />

      <section className="field-clear py-12 sm:py-20">
        <div className="container-shell">
          <RevealSection className="max-w-3xl" amount={0.15}>
            <p className="eyebrow">{libraryPage.knowledgeSection.eyebrow}</p>
            <h2 className="section-title mt-3">{libraryPage.knowledgeSection.title}</h2>
            <div className="mt-5 grid gap-4 text-base leading-8 text-slate-600 sm:mt-6 sm:text-lg">
              {libraryPage.knowledgeSection.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </RevealSection>

          <StaggerContainer className="mt-10 grid gap-5 lg:grid-cols-3" amount={0.15}>
            {libraryPage.knowledgeSection.items.map((item) => (
              <RevealItem key={item.title} hoverLift>
                <article className="group h-full card p-5 transition duration-300 sm:p-6 hover:-translate-y-1 hover:border-agri-green hover:bg-agri-green hover:shadow-soft">
                  <h3 className="text-lg font-bold sm:text-xl tracking-normal text-agri-blue transition duration-300 group-hover:text-white">{item.title}</h3>
                  <p className="mt-3 leading-7 text-slate-600 transition duration-300 group-hover:text-white/80">{item.description}</p>
                </article>
              </RevealItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="field-veil py-12 sm:py-16">
        <div className="container-shell">
          <RevealSection amount={0.15}>
            <p className="eyebrow">{libraryPage.section.eyebrow}</p>
          </RevealSection>
          <div className="mt-3 grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <RevealSection amount={0.15}>
              <h2 className="section-title">{libraryPage.section.title}</h2>
              <p className="section-copy">{technicalLibraryPreview.description}</p>
            </RevealSection>
            <StaggerContainer className="grid gap-4" amount={0.15}>
              {technicalLibraryPreview.documents.map((document) => (
                <RevealItem key={document.type} hoverLift>
                  <article className="group grid gap-3 rounded-md border border-agri-line bg-white p-4 shadow-sm sm:p-5 transition duration-300 hover:-translate-y-1 hover:border-agri-green hover:bg-agri-green hover:shadow-soft sm:grid-cols-[11rem_1fr]">
                    <p className="text-sm font-bold uppercase tracking-[0.16em] text-agri-gold transition duration-300 group-hover:text-white/80">{document.type}</p>
                    <div>
                      <h3 className="text-lg font-bold sm:text-xl tracking-normal text-agri-blue transition duration-300 group-hover:text-white">{document.title}</h3>
                      <p className="mt-2 leading-7 text-slate-600 transition duration-300 group-hover:text-white/80">{document.description}</p>
                      {document.href ? (
                        <Link href={localizeHref(locale, document.href)} className="btn-secondary mt-4">
                          {document.buttonLabel ?? libraryPage.section.buttonLabel}
                        </Link>
                      ) : (
                        <button className="btn-secondary mt-4 cursor-not-allowed opacity-60" type="button" disabled aria-disabled="true">
                          {libraryPage.section.buttonLabel}
                        </button>
                      )}
                    </div>
                  </article>
                </RevealItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      <CTASection locale={locale} {...libraryPage.cta} />
    </>
  );
}
