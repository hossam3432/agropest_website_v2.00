import { RevealItem, RevealSection, StaggerContainer } from "@/components/animations";
import type { SiteContent } from "@/lib/content";

type CommitmentSectionProps = {
  content: SiteContent;
  className?: string;
};

export function CommitmentSection({ content, className = "" }: CommitmentSectionProps) {
  const { commitmentSection } = content.home;
  const highlights = commitmentSection.highlights as Array<{ title: string; description: string }>;

  return (
    <section className={`bg-white py-14 sm:py-16 lg:py-[84px] ${className}`}>
      <RevealSection className="container-shell" amount={0.15}>
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow">{commitmentSection.eyebrow}</p>
            <h2 className="section-title mt-3">{commitmentSection.title}</h2>
          </div>

          <div className="rounded-2xl border-s-4 border-agri-gold bg-agri-mist p-6 sm:p-8 lg:p-8">
            {commitmentSection.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-4 first:mt-0 text-lg leading-9 text-slate-700 lg:leading-8">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {highlights.length ? (
          <StaggerContainer className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:mt-6" amount={0.15}>
            {highlights.map((item, index) => (
              <RevealItem key={item.title} hoverLift>
                <article className="h-full border border-agri-line bg-white p-6 shadow-sm transition duration-300 hover:border-agri-gold hover:shadow-soft">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-agri-gold">0{index + 1}</p>
                  <h3 className="mt-4 text-xl font-bold tracking-normal text-agri-blue">{item.title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{item.description}</p>
                </article>
              </RevealItem>
            ))}
          </StaggerContainer>
        ) : null}
      </RevealSection>
    </section>
  );
}
