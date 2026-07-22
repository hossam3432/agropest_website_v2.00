"use client";

import { useState, type CSSProperties, type MouseEvent } from "react";
import Link from "next/link";
import { RevealItem, RevealSection, StaggerContainer } from "@/components/animations";
import { localizeHref, type Locale, type SiteContent } from "@/lib/content";

type FeaturedProductLinesSectionProps = {
  content: SiteContent;
  locale: Locale;
  className?: string;
};

type FeaturedItem = SiteContent["home"]["featuredProductLinesSection"]["items"][number];

type FeaturedCardProps = {
  item: FeaturedItem;
  locale: Locale;
  mode: "mobile" | "desktop";
  index?: number;
};

function FeaturedProductCard({ item, locale, mode, index = 0 }: FeaturedCardProps) {
  const tiltValues = [-4, -1.5, 1.5, 4];
  const isDesktop = mode === "desktop";
  const isRtl = locale === "ar";

  return (
    <article
      className={
        isDesktop
          ? "relative rounded-lg featured-deck-card group/card flex h-full min-h-[462px] flex-col overflow-hidden bg-agri-mist shadow-sm"
          : "relative rounded-lg group/card min-h-[198px] overflow-hidden bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgb(23_50_77_/_0.12)]"
      }
      style={isDesktop ? ({ "--card-tilt": `${tiltValues[index] ?? 0}deg` } as CSSProperties) : undefined}
    >
      <div
        className={
          isDesktop
            ? "relative flex min-h-56 items-center justify-center overflow-hidden border-b border-agri-line bg-white p-8 md:min-h-64 lg:min-h-[200px] lg:p-6"
            : "absolute inset-0 flex items-center justify-center overflow-hidden bg-white p-10"
        }
      >
        <div
          className={`relative z-10 flex items-center justify-center ${
            isDesktop ? "h-24 w-full max-w-[220px] md:h-28 md:max-w-[240px]" : "h-24 w-full max-w-[180px]"
          }`}
        >
          <img
            src={item.image}
            alt={item.imageAlt}
            className="h-full w-full object-contain transition duration-700 group-hover/card:scale-105"
            style={
              item.image.includes("lasix-featured-logo") || item.image.includes("fossil-featured-logo")
                ? { transform: "scale(0.75)" }
                : undefined
            }
          />
        </div>
      </div>
      <div className={isDesktop ? "flex flex-1 flex-col p-5 pb-24" : "absolute inset-0 z-10"}>
        {isDesktop ? (
          <>
            <h3 className="text-xl font-bold tracking-normal text-agri-blue">{item.title}</h3>
            <span className="mt-2 h-0.5 w-12 bg-agri-gold" />
            {item.eyebrow ? (
              <span className="mt-3 inline-flex w-fit items-center rounded-lg border border-agri-green bg-transparent px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-agri-green">
                {item.eyebrow}
              </span>
            ) : null}
            {item.tags.length ? (
              <div className="featured-card-tags mt-4 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span key={tag} className="rounded-lg border border-agri-green bg-transparent px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-agri-green">
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </>
        ) : null}
        {isDesktop ? (
          <p className="featured-card-description flex-1 mt-3 line-clamp-3 leading-6 text-slate-600">{item.description}</p>
        ) : null}
        {isDesktop ? (
          <Link
            href={localizeHref(locale, item.href)}
            className={`featured-card-cta btn-secondary absolute w-fit bottom-5 ${isRtl ? "left-5" : "right-5"}`}
          >
            {item.ctaLabel}
          </Link>
        ) : (
          <Link
            href={localizeHref(locale, item.href)}
            aria-label={item.ctaLabel}
            className={`featured-card-cta absolute bottom-3 flex h-8 w-8 items-center justify-center rounded-full border border-agri-green bg-white text-agri-green transition group-hover/card:bg-agri-green group-hover/card:text-white ${
              isRtl ? "left-3 rotate-180" : "right-3"
            }`}
          >
            <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
              <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        )}
      </div>
    </article>
  );
}

export function FeaturedProductLinesSection({ content, locale, className = "" }: FeaturedProductLinesSectionProps) {
  const { featuredProductLinesSection } = content.home;
  const [activeDesktopIndex, setActiveDesktopIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  function handleDeckMouseMove(event: MouseEvent<HTMLDivElement>) {
    const container = event.currentTarget;
    const rect = container.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    // Hit-test against each card's live rect (not a fixed equal-width split) so the
    // active card doesn't lose the highlight while the pointer travels down toward
    // its CTA once the card has grown wider via the hover transition.
    let nextIndex = activeDesktopIndex;
    for (const child of Array.from(container.children)) {
      const childRect = (child as HTMLElement).getBoundingClientRect();
      if (event.clientX >= childRect.left && event.clientX < childRect.right) {
        nextIndex = Array.from(container.children).indexOf(child);
        break;
      }
    }

    setMousePosition({ x, y });
    setActiveDesktopIndex(nextIndex);
  }

  function handleDeckMouseLeave() {
    setActiveDesktopIndex(null);
    setMousePosition({ x: 50, y: 50 });
  }

  return (
    <section className={`relative overflow-hidden bg-[radial-gradient(circle_at_12%_10%,rgba(217,146,39,0.18),transparent_28%),linear-gradient(135deg,#06281f_0%,#0A3D2B_48%,#17324d_100%)] py-16 text-white sm:py-20 lg:py-[108px] ${className}`} dir={content.direction}>
      <div className="absolute inset-x-0 top-0 h-1 bg-agri-gold" />
      <div className="absolute inset-x-0 top-0 hidden h-32 border-b border-white/10 bg-white/5 lg:block" />
      <RevealSection className="container-shell" amount={0.15}>
        <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div>
            <p className="eyebrow text-agri-gold">{featuredProductLinesSection.eyebrow}</p>
            <h2 className="section-title mt-3 text-white">{featuredProductLinesSection.title}</h2>
          </div>
          {featuredProductLinesSection.description ? (
            <p className="section-copy text-white/75 lg:justify-self-end">{featuredProductLinesSection.description}</p>
          ) : null}
        </div>

        <StaggerContainer className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 lg:hidden" amount={0.15}>
          {featuredProductLinesSection.items.map((item) => (
            <RevealItem key={item.title}>
              <FeaturedProductCard item={item} locale={locale} mode="mobile" />
            </RevealItem>
          ))}
        </StaggerContainer>

        <StaggerContainer
          className={`featured-product-deck mt-8 hidden min-h-[484px] gap-0 lg:flex ${activeDesktopIndex !== null ? "is-pointer-controlled" : ""}`}
          amount={0.15}
          onMouseLeave={handleDeckMouseLeave}
          onMouseMove={handleDeckMouseMove}
          style={
            {
              "--featured-mouse-x": `${mousePosition.x}%`,
              "--featured-mouse-y": `${mousePosition.y}%`
            } as CSSProperties
          }
        >
          {featuredProductLinesSection.items.map((item, index) => (
            <RevealItem
              key={item.title}
              className={`featured-deck-item ${
                activeDesktopIndex === index ? "is-pointer-active" : activeDesktopIndex === null ? "" : "is-pointer-muted"
              }`}
              hoverLift={false}
            >
              <FeaturedProductCard item={item} locale={locale} mode="desktop" index={index} />
            </RevealItem>
          ))}
        </StaggerContainer>
      </RevealSection>
    </section>
  );
}

