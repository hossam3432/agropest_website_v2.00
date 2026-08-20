"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { localizeHref, type Locale, type SiteContent } from "@/lib/content";
import { HeroScrollReveal } from "@/components/HeroScrollReveal";

type HomeHeroProps = {
  content: SiteContent;
  locale: Locale;
};

// UI chrome only — mirrors the two extra card titles HomeMobile appends to
// the signature deck (credibility panel + trust points), kept identical here.
const ui = {
  en: { trust: "Why AgroPest", established: "Thirty years in the Egyptian agricultural market" },
  ar: { trust: "لماذا أجروبست", established: "ثلاثون عاما في السوق الزراعي المصري" }
} as const;

type HeroCard = { title: string; description?: string; points?: readonly string[] };

function HeroSignatureCard({ card, index, isActive, isMobile = false }: { card: HeroCard; index: number; isActive: boolean; isMobile?: boolean }) {
  return (
    <article
      className={
        isMobile
          ? "rounded-lg border border-white/20 bg-white/95 p-6 shadow-soft"
          : `hero-signature-card ${isActive ? "is-active" : ""}`
      }
    >
      <div className="flex items-center justify-between gap-4">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-agri-gold text-sm font-black text-white">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="h-px flex-1 bg-agri-gold/35" />
      </div>
      <h3 className="mt-6 text-2xl font-bold leading-tight tracking-normal text-agri-blue sm:text-3xl">{card.title}</h3>
      {card.points ? (
        <ul className="mt-3 grid gap-2">
          {card.points.map((point) => (
            <li key={point} className="flex items-start gap-2 text-base leading-8 text-slate-600">
              <svg viewBox="0 0 20 20" fill="none" className="mt-1.5 h-3.5 w-3.5 shrink-0 text-agri-green" aria-hidden="true">
                <path d="M4 10.5 8 14.5 16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {point}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-base leading-8 text-slate-600">{card.description}</p>
      )}
    </article>
  );
}

export function HomeHero({ content, locale }: HomeHeroProps) {
  const { hero } = content.home;
  const labels = ui[locale];
  // Same deck as HomeMobile: the three signature cards plus the credibility
  // panel and trust points, so desktop shows the identical card set.
  const heroCards: HeroCard[] = [
    { title: labels.established, points: hero.credibilityPanel.items },
    ...hero.signatureCards
  ];
  const isArabic = content.direction === "rtl";
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // Safari ignores the JSX `muted` attribute on hydration and blocks
    // autoplay unless both the `defaultMuted` and `muted` IDL properties
    // are set explicitly before play() is requested.
    video.defaultMuted = true;
    video.muted = true;

    const tryPlay = () => {
      const playPromise = video.play();
      if (playPromise) playPromise.catch(() => {});
    };

    // Safari can silently reject play() if called before enough data is
    // buffered, so retry once metadata/frames are actually available.
    video.addEventListener("loadedmetadata", tryPlay);
    video.addEventListener("canplay", tryPlay);
    tryPlay();

    // Last-resort fallback: if the platform's auto-play setting still
    // blocked it, start on the first tap/scroll so it's never stuck
    // showing a static poster.
    const onFirstInteraction = () => {
      tryPlay();
      window.removeEventListener("touchstart", onFirstInteraction);
      window.removeEventListener("click", onFirstInteraction);
      window.removeEventListener("scroll", onFirstInteraction);
    };
    window.addEventListener("touchstart", onFirstInteraction, { passive: true, once: true });
    window.addEventListener("click", onFirstInteraction, { once: true });
    window.addEventListener("scroll", onFirstInteraction, { passive: true, once: true });

    return () => {
      video.removeEventListener("loadedmetadata", tryPlay);
      video.removeEventListener("canplay", tryPlay);
      window.removeEventListener("touchstart", onFirstInteraction);
      window.removeEventListener("click", onFirstInteraction);
      window.removeEventListener("scroll", onFirstInteraction);
    };
  }, []);

  useEffect(() => {
    if (heroCards.length <= 1) return undefined;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroCards.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [heroCards.length]);

  const headlineClassName = isArabic
    ? "mt-5 w-full text-[32px] font-bold leading-[1.2] tracking-normal text-white sm:text-[38px] md:text-[44px] lg:text-[48px] lg:font-semibold"
    : "mt-5 w-full text-[32px] font-bold leading-[1.05] tracking-normal text-white sm:text-[38px] md:text-[44px] lg:text-[48px]";

  return (
    <section className="relative isolate -mt-24 overflow-hidden bg-[radial-gradient(circle_at_14%_12%,rgba(217,146,39,0.22),transparent_28%),linear-gradient(135deg,#06281f_0%,#0A3D2B_42%,#17324d_100%)] pt-24 text-white">
      <video
        ref={videoRef}
        aria-hidden="true"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/videos/hero-poster.jpg"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_14%_12%,rgba(217,146,39,0.14),transparent_28%),linear-gradient(135deg,rgba(6,40,31,0.5)_0%,rgba(10,61,43,0.45)_42%,rgba(23,50,77,0.5)_100%)]"
      />
      <div aria-hidden="true" className="hero-accent-line absolute start-0 top-0 h-1 w-full bg-agri-gold" />
      <div
        aria-hidden="true"
        className="hero-accent-line absolute end-0 top-24 hidden h-px w-[42%] bg-agri-gold/50 lg:block"
        style={{ animationDelay: "0.15s" }}
      />
      <div className="absolute -end-28 -top-28 h-80 w-80 rounded-full border border-white/10" />
      <div className="absolute -bottom-36 start-1/4 h-96 w-96 rounded-full bg-agri-gold/10 blur-3xl" />
      <div className="hero-pattern-overlay" />

      <div className="container-shell relative grid min-h-[calc(100svh-6rem)] items-center gap-10 py-10 sm:py-12 lg:grid-cols-[0.95fr_1.05fr] lg:py-14">
        <div className={isArabic ? "text-right" : "text-left"} dir={isArabic ? "rtl" : "ltr"}>
          <HeroScrollReveal
            eyebrow={hero.eyebrow}
            title={hero.title}
            subtitle={hero.subtitle}
            eyebrowClassName="mt-6"
            titleClassName={headlineClassName}
            subtitleClassName="mt-6 max-w-2xl text-base leading-8 text-white/75 sm:text-lg"
          />

          <div className="mt-7 inline-flex max-w-full items-center gap-2 rounded-full border border-agri-gold/35 bg-white/10 px-3 py-2.5 text-xs font-bold text-white shadow-sm backdrop-blur sm:gap-3 sm:px-4 sm:py-3 sm:text-sm">
            <span className="inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-agri-gold" />
            <span className="whitespace-nowrap">{hero.trustBadge}</span>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href={localizeHref(locale, hero.primaryCta.href)} className="btn-hero-glass">
              {hero.primaryCta.label}
            </Link>
            <Link href={localizeHref(locale, hero.secondaryCta.href)} className="btn-hero-glass">
              {hero.secondaryCta.label}
            </Link>
          </div>
        </div>

        <div className="relative" dir={isArabic ? "rtl" : "ltr"}>
          <div className="hidden min-h-[560px] lg:block">
            <div className="hero-signature-deck">
              {heroCards.map((card, index) => {
                const position = (index - activeIndex + heroCards.length) % heroCards.length;
                const state = position === 0 ? "is-active" : position === 1 ? "is-next" : "is-back";
                return (
                  <article key={card.title} className={`hero-signature-card ${state}`}>
                    <div className="flex items-center justify-between gap-4">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-agri-gold text-sm font-black text-white">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="h-px flex-1 bg-agri-gold/35" />
                    </div>
                    <h3 className="mt-8 text-4xl font-bold leading-tight tracking-normal text-agri-blue">{card.title}</h3>
                    {card.points ? (
                      <ul className="mt-5 grid gap-2.5">
                        {card.points.map((point) => (
                          <li key={point} className="flex items-start gap-2.5 text-lg leading-9 text-slate-600">
                            <svg viewBox="0 0 20 20" fill="none" className="mt-2 h-4 w-4 shrink-0 text-agri-green" aria-hidden="true">
                              <path d="M4 10.5 8 14.5 16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            {point}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-5 max-w-xl text-lg leading-9 text-slate-600">{card.description}</p>
                    )}
                  </article>
                );
              })}
            </div>
            <div className="absolute bottom-8 start-8 z-40 flex items-center gap-3">
              {heroCards.map((card, index) => (
                <button
                  key={card.title}
                  type="button"
                  aria-label={`Show slide ${index + 1}`}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${index === activeIndex ? "w-10 bg-agri-gold" : "w-2.5 bg-white/35 hover:bg-white/65"}`}
                />
              ))}
            </div>
          </div>

          <div className="lg:hidden">
            <HeroSignatureCard card={heroCards[activeIndex]} index={activeIndex} isActive isMobile />
            <div className="mt-5 flex items-center justify-between gap-4">
              <p className="text-sm font-bold text-white/70">
                {String(activeIndex + 1).padStart(2, "0")} / {String(heroCards.length).padStart(2, "0")}
              </p>
              <div className="flex items-center gap-2">
                {heroCards.map((card, index) => (
                  <button
                    key={card.title}
                    type="button"
                    aria-label={`Show slide ${index + 1}`}
                    onClick={() => setActiveIndex(index)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${index === activeIndex ? "w-8 bg-agri-gold" : "w-2.5 bg-white/35"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
