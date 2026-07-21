import Link from "next/link";
import { RevealSection } from "@/components/animations";
import { localizeHref, type Locale, type SiteContent } from "@/lib/content";

type TechnicalLibraryPreviewProps = {
  content: SiteContent;
  locale: Locale;
  className?: string;
};

export function TechnicalLibraryPreview({ content, locale, className = "" }: TechnicalLibraryPreviewProps) {
  const { technicalLibraryPreview } = content;

  return (
    <section className={`bg-white py-16 sm:py-20 lg:py-[86px] ${className}`}>
      <div className="container-shell grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-14">
        <RevealSection amount={0.15}>
          <div className="relative min-h-[195px] overflow-hidden bg-agri-blue shadow-soft sm:min-h-[250px] lg:min-h-[280px]">
            <img
              src={technicalLibraryPreview.image}
              alt={technicalLibraryPreview.imageAlt}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-agri-blue/90 via-agri-blue/20 to-transparent" />
            <div className="absolute top-5 start-5 end-5 border border-white/20 bg-white/10 p-5 text-white backdrop-blur-sm sm:top-8 sm:start-8 sm:end-8">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-agri-gold">{technicalLibraryPreview.panel.eyebrow}</p>
              <p className="mt-3 text-2xl font-bold tracking-normal">{technicalLibraryPreview.panel.title}</p>
            </div>
          </div>
        </RevealSection>

        <RevealSection amount={0.15} delay={0.08}>
          <p className="eyebrow">{technicalLibraryPreview.eyebrow}</p>
          <h2 className="section-title mt-3">{technicalLibraryPreview.title}</h2>
          <p className="section-copy">{technicalLibraryPreview.description}</p>

          <Link href={localizeHref(locale, technicalLibraryPreview.cta.href)} className="btn-primary mt-8">
            {technicalLibraryPreview.cta.label}
          </Link>
        </RevealSection>
      </div>
    </section>
  );
}
