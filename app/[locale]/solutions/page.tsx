import Link from "next/link";
import { CTASection } from "@/components/CTASection";
import { HeroSection } from "@/components/HeroSection";
import { RevealItem, RevealSection, StaggerContainer } from "@/components/animations";
import { getLocalePage, type LocalePageProps } from "@/app/[locale]/_utils";
import { localizeHref } from "@/lib/content";

export default async function SolutionsPage({ params }: LocalePageProps) {
  const { content, locale } = getLocalePage((await params).locale);
  const { solutionsPage } = content;

  return (
    <>
      <HeroSection compact locale={locale} {...solutionsPage.hero} />

      <section className="bg-agri-mist py-12 sm:py-20">
        <div className="container-shell">
          <RevealSection className="max-w-3xl" amount={0.15}>
            <p className="eyebrow">{solutionsPage.audiencesSection.eyebrow}</p>
            <h2 className="section-title mt-3">{solutionsPage.audiencesSection.title}</h2>
          </RevealSection>
          <StaggerContainer className="mt-10 grid gap-5 md:grid-cols-2" amount={0.15}>
            {solutionsPage.audiencesSection.items.map((item) => (
              <RevealItem key={item.title} hoverLift>
                <article className="group h-full border border-t-4 border-agri-line border-t-agri-gold bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-agri-green hover:border-t-agri-gold hover:bg-agri-green hover:shadow-soft sm:p-7">
                  <h3 className="text-lg font-bold tracking-normal text-agri-blue sm:text-xl transition duration-300 group-hover:text-white">{item.title}</h3>
                  <p className="mt-3 leading-7 text-slate-600 transition duration-300 group-hover:text-white/80">{item.description}</p>
                </article>
              </RevealItem>
            ))}
          </StaggerContainer>
          <RevealSection amount={0.2} delay={0.08}>
            <Link href={localizeHref(locale, solutionsPage.audiencesSection.partnerCta.href)} className="btn-secondary mt-8">
              {solutionsPage.audiencesSection.partnerCta.label}
            </Link>
          </RevealSection>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-20">
        <div className="container-shell">
          <RevealSection className="max-w-3xl" amount={0.15}>
            <p className="eyebrow">{solutionsPage.solutionTracksSection.eyebrow}</p>
            <h2 className="section-title mt-3">{solutionsPage.solutionTracksSection.title}</h2>
          </RevealSection>
          <StaggerContainer className="mt-10 grid gap-6 lg:grid-cols-2" amount={0.15}>
            {solutionsPage.solutionTracksSection.tracks.map((track, index) => (
              <RevealItem key={track.title} hoverLift>
                <article className="relative h-full overflow-hidden border border-agri-line bg-agri-mist p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-agri-gold hover:bg-white hover:shadow-soft sm:p-8">
                  <div className="absolute inset-x-0 top-0 h-1 bg-agri-gold" />
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-agri-gold">{String(index + 1).padStart(2, "0")}</p>
                  <h3 className="mt-4 text-xl font-bold tracking-normal text-agri-blue sm:text-2xl">{track.title}</h3>
                  <p className="mt-4 leading-7 text-slate-700">{track.description}</p>
                  <p className="mt-4 border-s-2 border-agri-gold ps-4 leading-7 text-slate-600">{track.detail}</p>
                  <Link href={localizeHref(locale, track.cta.href)} className="btn-secondary mt-6">
                    {track.cta.label}
                  </Link>
                </article>
              </RevealItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="bg-agri-blue py-16 text-white sm:py-20">
        <div className="container-shell">
          <RevealSection className="max-w-3xl" amount={0.15}>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-agri-gold">{solutionsPage.valueSection.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-bold tracking-normal sm:text-4xl">{solutionsPage.valueSection.title}</h2>
          </RevealSection>
          <StaggerContainer className="mt-8 grid gap-0 border-s border-white/20 sm:mt-10 lg:grid-cols-5 lg:border-s-0 lg:border-t" amount={0.15}>
            {solutionsPage.valueSection.items.map((item, index) => (
              <RevealItem key={item.title}>
                <article className="relative border-b border-white/15 py-6 ps-6 sm:py-7 sm:ps-7 lg:border-b-0 lg:border-e lg:px-5 lg:pb-0 lg:pt-10 lg:last:border-e-0">
                  <span className="absolute -start-[7px] top-8 h-3.5 w-3.5 bg-agri-gold lg:-top-[7px] lg:start-5" />
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-agri-gold">{String(index + 1).padStart(2, "0")}</p>
                  <h3 className="mt-4 text-xl font-bold tracking-normal">{item.title}</h3>
                  <p className="mt-3 leading-7 text-white/70">{item.description}</p>
                </article>
              </RevealItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="bg-agri-mist py-12 sm:py-20">
        <RevealSection className="container-shell grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start" amount={0.15}>
          <div>
            <p className="eyebrow">{solutionsPage.needsSection.eyebrow}</p>
            <h2 className="section-title mt-3">{solutionsPage.needsSection.title}</h2>
            <p className="section-copy">{solutionsPage.needsSection.intro}</p>
          </div>
          <div>
            <StaggerContainer className="relative grid gap-3 before:absolute sm:gap-4 before:bottom-6 before:top-6 before:start-[1.375rem] before:w-px before:bg-agri-green/20 sm:before:hidden" amount={0.15} stagger={0.06}>
              {solutionsPage.needsSection.questions.map((question, index) => (
                <RevealItem key={question}>
                  <div className="group relative grid gap-3 ps-14 sm:ps-16 sm:grid-cols-[4.5rem_1fr] sm:items-center sm:ps-0">
                    <div className="absolute start-0 top-0 z-10 flex h-10 w-10 items-center justify-center border border-agri-gold bg-agri-gold text-sm font-black text-agri-blue shadow-sm transition duration-300 group-hover:bg-white sm:relative sm:h-14 sm:w-14">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="border border-agri-line bg-white p-4 shadow-sm transition duration-300 group-hover:-translate-y-0.5 group-hover:border-agri-gold sm:p-5">
                      <p className="leading-7 text-slate-700">{question}</p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </StaggerContainer>
            <p className="mt-7 border-s-4 border-agri-gold bg-white p-5 leading-8 text-slate-700 shadow-sm">{solutionsPage.needsSection.conclusion}</p>
          </div>
        </RevealSection>
      </section>

      <section className="bg-white py-12 sm:py-20">
        <RevealSection className="container-shell" amount={0.15}>
          <div className="grid overflow-hidden border border-agri-line bg-agri-blue text-white shadow-soft lg:grid-cols-[0.78fr_1.22fr]">
            <div className="bg-white/5 p-5 sm:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-agri-gold">{solutionsPage.contentSupportSection.eyebrow}</p>
              <h2 className="mt-4 text-3xl font-bold tracking-normal sm:text-4xl">{solutionsPage.contentSupportSection.title}</h2>
            </div>
            <div className="p-5 sm:p-10">
              <div className="grid gap-4 text-lg leading-8 text-white/80">
                {solutionsPage.contentSupportSection.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <Link href={localizeHref(locale, solutionsPage.contentSupportSection.cta.href)} className="btn-primary mt-8">
                {solutionsPage.contentSupportSection.cta.label}
              </Link>
            </div>
          </div>
        </RevealSection>
      </section>

      <CTASection locale={locale} {...solutionsPage.cta} />
    </>
  );
}
