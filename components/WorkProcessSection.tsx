import { RevealItem, RevealSection, StaggerContainer } from "@/components/animations";
import type { SiteContent } from "@/lib/content";

type WorkProcessSectionProps = {
  content: SiteContent;
};

export function WorkProcessSection({ content }: WorkProcessSectionProps) {
  const { workProcess } = content;

  return (
    <section className="field-bloom field-bloom-flip py-8 sm:py-10 lg:py-12">
      <div className="container-shell">
        <RevealSection className="max-w-4xl" amount={0.15}>
          <p className="eyebrow">{workProcess.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-bold tracking-normal text-agri-blue sm:text-4xl">{workProcess.title}</h2>
          <p className="mt-5 max-w-3xl leading-8 text-slate-600">{workProcess.description}</p>
        </RevealSection>

        <StaggerContainer className="mt-12 grid gap-0 border-s border-agri-line lg:mt-14 lg:grid-cols-5 lg:border-s-0 lg:border-t">
          {workProcess.steps.map((step, index) => (
            <RevealItem key={step.title}>
              <article className="relative border-b border-agri-line py-7 ps-7 lg:border-b-0 lg:border-e lg:px-6 lg:pb-0 lg:pt-11 lg:last:border-e-0">
                <span className="absolute -start-[7px] top-8 h-3.5 w-3.5 bg-agri-gold lg:-top-[7px] lg:start-5" />
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-agri-goldInk">0{index + 1}</p>
                <h3 className="mt-4 text-xl font-bold tracking-normal text-agri-blue">{step.title}</h3>
                <p className="mt-4 leading-7 text-slate-600">{step.description}</p>
              </article>
            </RevealItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
