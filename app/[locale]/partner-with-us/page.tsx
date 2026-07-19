import { RevealItem, RevealSection, StaggerContainer } from "@/components/animations";
import { CTASection } from "@/components/CTASection";
import { HeroSection } from "@/components/HeroSection";
import { getLocalePage, type LocalePageProps } from "@/app/[locale]/_utils";

export default function PartnerWithUsPage({ params }: LocalePageProps) {
  const { content, locale } = getLocalePage(params.locale);
  const { partnerPage, partnerTracks } = content;

  return (
    <>
      <HeroSection compact locale={locale} {...partnerPage.hero} />

      <section className="bg-white py-12 sm:py-20">
        <div className="container-shell">
          <div className="border-s-4 border-agri-gold bg-agri-mist p-5 shadow-sm sm:p-8 lg:p-10">
            <p className="eyebrow">{partnerPage.bridgeSection.eyebrow}</p>
            <h2 className="section-title mt-3">{partnerPage.bridgeSection.title}</h2>
            <div className="mt-5 grid gap-4 text-base leading-8 text-slate-600 sm:mt-6 sm:text-lg lg:grid-cols-2">
              {partnerPage.bridgeSection.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-agri-blue py-10 text-white sm:py-12 lg:py-14">
        <div className="container-shell">
          <RevealSection className="max-w-4xl" amount={0.15}>
            <p className="eyebrow">{partnerPage.servicesSection.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-bold tracking-normal sm:text-4xl">{partnerPage.servicesSection.title}</h2>
          </RevealSection>

          <StaggerContainer className="mt-8 grid gap-0 border-s border-white/20 sm:mt-12 lg:mt-14 lg:grid-cols-5 lg:border-s-0 lg:border-t" amount={0.15}>
            {partnerPage.servicesSection.items.map((item, index) => (
              <RevealItem key={item.title}>
                <article className="relative border-b border-white/15 py-6 ps-6 sm:py-7 sm:ps-7 lg:border-b-0 lg:border-e lg:px-6 lg:pb-0 lg:pt-11 lg:last:border-e-0">
                  <span className="absolute -start-[7px] top-8 h-3.5 w-3.5 bg-agri-gold lg:-top-[7px] lg:start-5" />
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-agri-gold">{String(index + 1).padStart(2, "0")}</p>
                  <h3 className="mt-4 text-xl font-bold tracking-normal">{item.title}</h3>
                  <p className="mt-4 leading-7 text-white/70">{item.description}</p>
                </article>
              </RevealItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-20">
        <div className="container-shell">
          <p className="eyebrow">{partnerPage.tracksSection.eyebrow}</p>
          <h2 className="section-title mt-3">{partnerPage.tracksSection.title}</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {partnerTracks.map((track) => (
              <article key={track.title} className="card border-t-4 border-t-agri-gold p-5 sm:p-8">
                <h3 className="text-xl font-semibold text-agri-blue sm:text-2xl">{track.title}</h3>
                <p className="mt-4 leading-7 text-slate-600">{track.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection locale={locale} {...partnerPage.cta} />
    </>
  );
}
