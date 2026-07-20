import { RevealItem, RevealSection, StaggerContainer } from "@/components/animations";
import type { SiteContent } from "@/lib/content";

type WhyAgropestSectionProps = {
  content: SiteContent;
};

export function WhyAgropestSection({ content }: WhyAgropestSectionProps) {
  const { whyAgropestSection } = content.home;

  return (
    <section className="bg-agri-greenDark py-14 text-white sm:py-16 lg:py-20">
      <RevealSection className="container-shell" amount={0.15}>
        <div>
          <p className="eyebrow text-agri-gold">{whyAgropestSection.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-normal sm:text-4xl">{whyAgropestSection.title}</h2>
          <p className="section-copy mt-4 max-w-3xl text-white/70">{whyAgropestSection.description}</p>
        </div>

        <StaggerContainer className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-4" amount={0.15}>
          {whyAgropestSection.items.map((item) => (
            <RevealItem key={item.title} hoverLift>
              <article className="h-full rounded-2xl bg-white/[0.06] p-6 backdrop-blur-sm transition duration-300 hover:bg-white/[0.1]">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-agri-gold">{item.eyebrow}</p>
                <h3 className="mt-4 text-xl font-bold tracking-normal">{item.title}</h3>
                <p className="mt-3 leading-7 text-white/70">{item.description}</p>
              </article>
            </RevealItem>
          ))}
        </StaggerContainer>
      </RevealSection>
    </section>
  );
}
