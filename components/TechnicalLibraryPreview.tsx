import Link from "next/link";
import { RevealSection } from "@/components/animations";
import { ResponsiveImage } from "@/components/ResponsiveImage";
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
      <div className="container-shell grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-14">
        <RevealSection amount={0.15}>
          <div className="relative min-h-[195px] overflow-hidden rounded-2xl bg-agri-blue shadow-soft sm:min-h-[255px] lg:min-h-[330px]">
            <ResponsiveImage
              src={technicalLibraryPreview.image}
              alt={technicalLibraryPreview.imageAlt}
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="absolute inset-0 h-full w-full object-cover"
              objectFit="cover"
            />
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
