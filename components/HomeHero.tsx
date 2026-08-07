"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
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
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // Safari ignores the JSX `muted` attribute on hydration and blocks
    // autoplay unless the `muted` IDL property is set explicitly.
    video.muted = true;
    const playPromise = video.play();
    if (playPromise) playPromise.catch(() => {});
  }, []);

  useEffect(() => {
    if (signatureCards.length <= 1) return undefined;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % signatureCards.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [signatureCards.length]);

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
          <div className="h-10 w-px bg-agri-gold sm:h-14" />
          <p className="eyebrow mt-6">{hero.eyebrow}</p>
          <h1 className={headlineClassName}>{hero.title}</h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">{hero.subtitle}</p>

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
