import Link from "next/link";
import { CTASection } from "@/components/CTASection";
import { HeroSection } from "@/components/HeroSection";
import { RevealItem, RevealSection, StaggerContainer } from "@/components/animations";
import { getLocalePage, type LocalePageProps } from "@/app/[locale]/_utils";
import { localizeHref } from "@/lib/content";

export default function AboutPage({ params }: LocalePageProps) {
  const { content, locale } = getLocalePage(params.locale);
  const { about } = content;

  return (
    <>
      <HeroSection compact locale={locale} {...about.hero} />

      <section className="bg-agri-mist py-12 sm:py-20">
        <RevealSection className="container-shell grid gap-7 sm:gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start" amount={0.15}>
          <div>
            <p className="eyebrow">{about.intro.eyebrow}</p>
            <h2 className="section-title mt-3">{about.intro.title}</h2>
          </div>
          <StaggerContainer className="grid gap-4 text-base leading-8 text-slate-600 sm:gap-6 sm:text-lg" amount={0.15}>
            {about.intro.paragraphs.map((paragraph) => (
              <RevealItem key={paragraph}>
                <p>{paragraph}</p>
              </RevealItem>
            ))}
          </StaggerContainer>
        </RevealSection>
      </section>

      <section className="bg-white py-12 sm:py-20">
        <div className="container-shell">
          <StaggerContainer className="grid gap-8 lg:grid-cols-2" amount={0.15}>
            {about.sections.slice(0, 2).map((section) => (
              <RevealItem key={section.title} hoverLift>
                <article className="group card h-full border-t-4 border-t-agri-gold p-5 transition duration-300 hover:-translate-y-1 hover:border-agri-green hover:border-t-agri-gold hover:bg-agri-green hover:shadow-soft sm:p-8">
                  <p className="eyebrow transition duration-300 group-hover:text-white/80">{section.eyebrow}</p>
                  <h2 className="mt-3 text-xl font-bold tracking-normal text-agri-blue transition duration-300 group-hover:text-white sm:text-3xl">{section.title}</h2>
                  <div className="mt-4 grid gap-3 leading-7 text-slate-600 sm:mt-5 sm:gap-4 transition duration-300 group-hover:text-white/80">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </article>
              </RevealItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="bg-agri-blue py-16 text-white sm:py-20">
        <RevealSection className="container-shell grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start" amount={0.15}>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-agri-gold">{about.checklistSection.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-bold tracking-normal sm:text-4xl">{about.checklistSection.title}</h2>
            <p className="mt-4 text-lg font-semibold text-white/80">{about.checklistSection.subtitle}</p>
            <p className="mt-5 leading-8 text-white/70">{about.checklistSection.intro}</p>
          </div>
          <div>
            <StaggerContainer className="relative grid gap-3 before:absolute sm:gap-4 before:bottom-6 before:top-6 before:start-[1.375rem] before:w-px before:bg-white/20 sm:before:hidden lg:gap-5" amount={0.15} stagger={0.06}>
              {about.checklistSection.items.map((item, index) => (
                <RevealItem key={item}>
                  <div className="group relative grid gap-3 ps-14 sm:ps-16 sm:grid-cols-[4.5rem_1fr] sm:items-center sm:ps-0">
                    <div className="absolute start-0 top-0 z-10 flex h-10 w-10 items-center justify-center border border-agri-gold bg-agri-gold text-sm font-black text-agri-blue shadow-sm transition duration-300 group-hover:bg-white sm:relative sm:h-14 sm:w-14">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="border border-white/15 bg-white/5 p-4 transition duration-300 group-hover:-translate-y-0.5 group-hover:border-agri-gold group-hover:bg-white/10 sm:p-5">
                      <p className="leading-7 text-white/80">{item}</p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </StaggerContainer>
            <RevealSection amount={0.2} delay={0.12}>
              <p className="mt-7 border-s-4 border-agri-gold bg-white/5 p-5 leading-8 text-white/75">{about.checklistSection.conclusion}</p>
            </RevealSection>
          </div>
        </RevealSection>
      </section>

      <section className="bg-agri-mist py-12 sm:py-20">
        <div className="container-shell">
          <StaggerContainer className="grid gap-6 md:grid-cols-2" amount={0.15}>
            {about.sections.slice(2, 6).map((section) => (
              <RevealItem key={section.title} hoverLift>
                <article className="group h-full border border-t-4 border-agri-line border-t-agri-gold bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-agri-green hover:border-t-agri-gold hover:bg-agri-green hover:shadow-soft sm:p-8">
                  <p className="eyebrow transition duration-300 group-hover:text-white/80">{section.eyebrow}</p>
                  <h2 className="mt-3 text-xl font-bold tracking-normal text-agri-blue sm:text-2xl transition duration-300 group-hover:text-white">{section.title}</h2>
                  <div className="mt-4 grid gap-3 leading-7 text-slate-600 sm:mt-5 sm:gap-4 transition duration-300 group-hover:text-white/80">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </article>
              </RevealItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-20">
        <RevealSection className="container-shell" amount={0.15}>
          <div className="grid overflow-hidden border border-agri-line bg-agri-blue text-white shadow-soft lg:grid-cols-[0.78fr_1.22fr]">
            <div className="bg-white/5 p-5 sm:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-agri-gold">{about.knowledgeRole.eyebrow}</p>
              <h2 className="mt-4 text-3xl font-bold tracking-normal sm:text-4xl">{about.knowledgeRole.title}</h2>
            </div>
            <div className="p-5 sm:p-10">
              <p className="text-lg leading-8 text-white/80">{about.knowledgeRole.description}</p>
              <Link href={localizeHref(locale, about.knowledgeRole.ctaHref)} className="btn-primary mt-8">
                {about.knowledgeRole.ctaLabel}
              </Link>
            </div>
          </div>
        </RevealSection>
      </section>

      <CTASection locale={locale} {...about.cta} />
    </>
  );
}
