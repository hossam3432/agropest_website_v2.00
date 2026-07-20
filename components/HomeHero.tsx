"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatedAccentLine } from "@/components/animations";
import { localizeHref, type Locale, type SiteContent } from "@/lib/content";

type HomeHeroProps = {
  content: SiteContent;
  locale: Locale;
};

type SignatureCard = SiteContent["home"]["hero"]["signatureCards"][number];

function HeroSignatureCard({ card, index, isActive, isMobile = false }: { card: SignatureCard; index: number; isActive: boolean; isMobile?: boolean }) {
  return (
    <article
      className={
        isMobile
          ? "rounded-[1.75rem] border border-white/20 bg-white/95 p-6 shadow-soft"
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
      <p className="mt-4 text-base leading-8 text-slate-600">{card.description}</p>
    </article>
  );
}

export function HomeHero({ content, locale }: HomeHeroProps) {
  const { hero } = content.home;
  const signatureCards = hero.signatureCards;
  const isArabic = content.direction === "rtl";
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (signatureCards.length <= 1) return undefined;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % signatureCards.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [signatureCards.length]);

  const headlineClassName = isArabic
    ? "mt-5 w-full text-[32px] font-bold leading-[1.2] tracking-normal text-white sm:text-[38px] md:text-[44px] lg:text-[48px]"
    : "mt-5 w-full text-[32px] font-bold leading-[1.05] tracking-normal text-white sm:text-[38px] md:text-[44px] lg:text-[48px]";

  return (
    <section className="relative isolate overflow-hidden bg-[radial-gradient(circle_at_14%_12%,rgba(217,146,39,0.22),transparent_28%),linear-gradient(135deg,#06281f_0%,#0A3D2B_42%,#17324d_100%)] text-white">
      <AnimatedAccentLine className="absolute start-0 top-0 h-1 bg-agri-gold" />
      <AnimatedAccentLine className="absolute end-0 top-24 hidden h-px bg-agri-gold/50 lg:block" width="42%" delay={0.15} />
      <div className="absolute -end-28 -top-28 h-80 w-80 rounded-full border border-white/10" />
      <div className="absolute -bottom-36 start-1/4 h-96 w-96 rounded-full bg-agri-gold/10 blur-3xl" />
      <div className="hero-pattern-overlay" />

      <div className="container-shell relative grid min-h-[calc(100svh-5rem)] items-center gap-10 py-14 sm:py-16 lg:grid-cols-[0.95fr_1.05fr] lg:py-20">
        <div className={isArabic ? "text-right" : "text-left"} dir={isArabic ? "rtl" : "ltr"}>
          <div className="h-10 w-px bg-agri-gold sm:h-14" />
          <p className="eyebrow mt-6">{hero.eyebrow}</p>
          <h1 className={headlineClassName}>{hero.title}</h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">{hero.subtitle}</p>

          <div className="mt-7 inline-flex max-w-full items-center gap-3 rounded-full border border-agri-gold/35 bg-white/10 px-4 py-3 text-sm font-bold text-white shadow-sm backdrop-blur">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-agri-gold" />
            <span>{hero.trustBadge}</span>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href={localizeHref(locale, hero.primaryCta.href)} className="btn-on-dark">
              {hero.primaryCta.label}
            </Link>
            <Link href={localizeHref(locale, hero.secondaryCta.href)} className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-bold text-white shadow-sm backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-agri-gold hover:bg-white/15 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-agri-gold focus:ring-offset-2 focus:ring-offset-agri-blue">
              {hero.secondaryCta.label}
            </Link>
          </div>
        </div>

        <div className="relative" dir={isArabic ? "rtl" : "ltr"}>
          <div className="hidden min-h-[560px] lg:block">
            <div className="hero-signature-deck">
              {signatureCards.map((card, index) => {
                const position = (index - activeIndex + signatureCards.length) % signatureCards.length;
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
                    <p className="mt-5 max-w-xl text-lg leading-9 text-slate-600">{card.description}</p>
                  </article>
                );
              })}
            </div>
            <div className="absolute bottom-8 start-8 z-40 flex items-center gap-3">
              {signatureCards.map((card, index) => (
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
            <HeroSignatureCard card={signatureCards[activeIndex]} index={activeIndex} isActive isMobile />
            <div className="mt-5 flex items-center justify-between gap-4">
              <p className="text-sm font-bold text-white/70">
                {String(activeIndex + 1).padStart(2, "0")} / {String(signatureCards.length).padStart(2, "0")}
              </p>
              <div className="flex items-center gap-2">
                {signatureCards.map((card, index) => (
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
