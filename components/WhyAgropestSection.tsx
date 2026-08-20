import { RevealItem, RevealSection, StaggerContainer } from "@/components/animations";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import type { SiteContent } from "@/lib/content";

type WhyAgropestSectionProps = {
  content: SiteContent;
  className?: string;
};

export function WhyAgropestSection({ content, className = "" }: WhyAgropestSectionProps) {
  const { whyAgropestSection } = content.home;

  return (
    <section className={`bg-agri-greenDark py-14 text-white sm:py-16 lg:py-[114px] ${className}`}>
      <RevealSection className="container-shell" amount={0.15}>
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div>
            <p className="eyebrow text-agri-gold">{whyAgropestSection.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-bold leading-tight tracking-normal sm:text-4xl">{whyAgropestSection.title}</h2>
            <p className="section-copy mt-4 max-w-3xl text-white/70">{whyAgropestSection.description}</p>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-md border border-white/10 shadow-soft">
            <ResponsiveImage
              src="/images/backgrounds/field-day-trials.jpg"
              alt={whyAgropestSection.imageAlt}
              className="h-full w-full"
              objectFit="cover"
              sizes="(min-width: 1024px) 46vw, 100vw"
            />
          </div>
        </div>

        <StaggerContainer className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:mt-7" amount={0.15}>
          {whyAgropestSection.items.map((item) => (
            <RevealItem key={item.title} hoverLift>
              <article className="h-full rounded-md bg-white/[0.06] p-6 backdrop-blur-sm transition duration-300 hover:bg-white/[0.1]">
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
