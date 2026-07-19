import Link from "next/link";
import { CTASection } from "@/components/CTASection";
import { HeroSection } from "@/components/HeroSection";
import { getLocalePage, type LocalePageProps } from "@/app/[locale]/_utils";
import { localizeHref } from "@/lib/content";

export default function TechnicalLibraryPage({ params }: LocalePageProps) {
  const { content, locale } = getLocalePage(params.locale);
  const { libraryPage, technicalLibraryPreview } = content;

  return (
    <>
      <HeroSection compact locale={locale} {...libraryPage.hero} />

      <section className="bg-white py-12 sm:py-20">
        <div className="container-shell">
          <div className="max-w-3xl">
            <p className="eyebrow">{libraryPage.knowledgeSection.eyebrow}</p>
            <h2 className="section-title mt-3">{libraryPage.knowledgeSection.title}</h2>
            <div className="mt-5 grid gap-4 text-base leading-8 text-slate-600 sm:mt-6 sm:text-lg">
              {libraryPage.knowledgeSection.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {libraryPage.knowledgeSection.items.map((item) => (
              <article key={item.title} className="group card border-t-4 border-t-agri-gold p-5 transition duration-300 sm:p-6 hover:-translate-y-1 hover:border-agri-green hover:border-t-agri-gold hover:bg-agri-green hover:shadow-soft">
                <h3 className="text-lg font-bold sm:text-xl tracking-normal text-agri-blue transition duration-300 group-hover:text-white">{item.title}</h3>
                <p className="mt-3 leading-7 text-slate-600 transition duration-300 group-hover:text-white/80">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-agri-mist py-12 sm:py-16">
        <div className="container-shell">
          <p className="eyebrow">{libraryPage.section.eyebrow}</p>
          <div className="mt-3 grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <div>
              <h2 className="section-title">{libraryPage.section.title}</h2>
              <p className="section-copy">{technicalLibraryPreview.description}</p>
            </div>
            <div className="grid gap-4">
              {technicalLibraryPreview.documents.map((document) => (
                <article key={document.type} className="group grid gap-3 border border-t-4 border-agri-line border-t-agri-gold bg-white p-4 shadow-sm sm:p-5 transition duration-300 hover:-translate-y-1 hover:border-agri-green hover:border-t-agri-gold hover:bg-agri-green hover:shadow-soft sm:grid-cols-[11rem_1fr]">
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
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection locale={locale} {...libraryPage.cta} />
    </>
  );
}
