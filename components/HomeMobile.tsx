"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from "framer-motion";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { localizeHref, type Locale, type SiteContent } from "@/lib/content";

type HomeMobileProps = {
  content: SiteContent;
  locale: Locale;
};

const premiumEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

// UI chrome only — affordance labels that aren't page copy (mirrors the
// pattern used by RivalDuoMobile: everything else on this page is sourced
// straight from lib/content so no original text is paraphrased or dropped).
const ui = {
  en: {
    more: "Read more",
    less: "Show less",
    trust: "Why AgroPest",
    established: "Thirty years in the Egyptian agricultural market"
  },
  ar: {
    more: "اقرأ المزيد",
    less: "عرض أقل",
    trust: "لماذا أجروبست",
    established: "ثلاثون عاما في السوق الزراعي المصري"
  }
} as const;

/* ---------------------------------------------------------------- helpers */

function scrollStripToIndex(strip: HTMLElement | null, index: number, reducedMotion: boolean | null) {
  const child = strip?.children[index] as HTMLElement | undefined;
  if (!strip || !child) return;
  const stripRect = strip.getBoundingClientRect();
  const childRect = child.getBoundingClientRect();
  const delta = childRect.left + childRect.width / 2 - (stripRect.left + stripRect.width / 2);
  if (Math.abs(delta) < 1) return;
  strip.scrollBy({ left: delta, behavior: reducedMotion ? "auto" : "smooth" });
}

/* ---------------------------------------------------------------- primitives */

function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return <p className={`eyebrow ${dark ? "text-agri-gold" : ""}`}>{children}</p>;
}

function Dots({ count, active, onSelect, dark = false }: { count: number; active: number; onSelect: (index: number) => void; dark?: boolean }) {
  if (count <= 1) return null;
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          type="button"
          aria-label={`${index + 1}`}
          onClick={() => onSelect(index)}
          className={`h-2.5 rounded-full transition-all duration-300 ${
            index === active ? "w-8 bg-agri-gold" : `w-2.5 ${dark ? "bg-white/35" : "bg-agri-line"}`
          }`}
        />
      ))}
    </div>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
        open ? "border-agri-gold bg-agri-gold" : "border-agri-line bg-white"
      }`}
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
        <path
          d="M6 9 L12 15 L18 9"
          stroke={open ? "#ffffff" : "#17324D"}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/** Accordion row — large tap target header, height-animated body. Nothing removed, just folded. */
function Disclosure({
  open,
  onToggle,
  header,
  children
}: {
  open: boolean;
  onToggle: () => void;
  header: ReactNode;
  children: ReactNode;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <div
      className={`overflow-hidden rounded-[1.25rem] border bg-white transition-colors duration-300 ${
        open ? "border-agri-gold shadow-soft" : "border-agri-line"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex min-h-[64px] w-full items-center gap-3 px-5 py-4 text-start active:bg-agri-mist"
      >
        <span className="min-w-0 flex-1">{header}</span>
        <Chevron open={open} />
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.32, ease: premiumEase }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-1.5">{children}</div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

/** Clamps long copy behind a tap target. Full text stays in the DOM either way. */
function ReadMore({ text, labels, dark = false }: { text: string; labels: { more: string; less: string }; dark?: boolean }) {
  const [open, setOpen] = useState(false);
  const [clamped, setClamped] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    function measure() {
      const el = textRef.current;
      if (!el || open) return;
      setClamped(el.scrollHeight - el.clientHeight > 1);
    }
    measure();
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => window.removeEventListener("resize", measure);
  }, [open, text]);

  return (
    <div>
      <p
        ref={textRef}
        className={`text-[15px] leading-8 ${dark ? "text-white/75" : "text-slate-600"} ${open ? "" : "line-clamp-4"}`}
      >
        {text}
      </p>
      {clamped ? (
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          className={`mt-1 inline-flex min-h-11 items-center gap-1.5 text-sm font-bold ${dark ? "text-agri-gold" : "text-agri-green"}`}
        >
          {open ? labels.less : labels.more}
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
            <path d="M6 9 L12 15 L18 9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      ) : null}
    </div>
  );
}

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ---------------------------------------------------------------- the page */

export function HomeMobile({ content, locale }: HomeMobileProps) {
  const { home } = content;
  const labels = ui[locale];
  const reducedMotion = useReducedMotion();
  const isRtl = content.direction === "rtl";

  const tabs = [
    { id: "m-story", label: home.commitmentSection.eyebrow },
    { id: "m-products", label: home.featuredProductLinesSection.eyebrow },
    { id: "m-categories", label: home.productCategoriesSection.eyebrow },
    { id: "m-why", label: home.whyAgropestSection.eyebrow },
    { id: "m-library", label: content.technicalLibraryPreview.eyebrow },
    { id: "m-partners", label: home.partnersSection.eyebrow },
    { id: "m-cta", label: home.cta.eyebrow ?? "" }
  ].filter((tab) => tab.label);

  const [activeTab, setActiveTab] = useState(tabs[0]?.id);
  const [openHighlight, setOpenHighlight] = useState<number | null>(null);
  const [openWhy, setOpenWhy] = useState<number | null>(0);
  const [heroIndex, setHeroIndex] = useState(0);
  const [partnerIndex, setPartnerIndex] = useState(0);
  const [productIndex, setProductIndex] = useState(0);

  const tabStripRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const highlights = home.commitmentSection.highlights as Array<{ title: string; description: string }>;

  // The three signature cards plus the credibility content that used to live in
  // the folded "established" accordion — now just more swipeable cards.
  type HeroCard = { title: string; description?: string; points?: readonly string[] };
  const heroCards: HeroCard[] = [
    ...home.hero.signatureCards,
    { title: labels.established, points: home.hero.credibilityPanel.items },
    { title: labels.trust, points: home.hero.trustPoints }
  ];

  function stepHero(step: number) {
    setHeroIndex((current) => (current + step + heroCards.length) % heroCards.length);
  }

  const partners = home.partnersSection.items;

  function stepPartner(step: number) {
    setPartnerIndex((current) => (current + step + partners.length) % partners.length);
  }

  const featuredProducts = home.featuredProductLinesSection.items;

  function stepProduct(step: number) {
    setProductIndex((current) => (current + step + featuredProducts.length) % featuredProducts.length);
  }

  // Same hero video as desktop. Bail out while this tree is display:none (desktop
  // width) so the hidden copy never fights the visible HomeHero video for playback.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !video.offsetParent) return;
    // Safari ignores the JSX `muted` attribute on hydration and blocks autoplay
    // unless both the `defaultMuted` and `muted` IDL properties are set explicitly
    // before play() is requested.
    video.defaultMuted = true;
    video.muted = true;

    const tryPlay = () => {
      const playPromise = video.play();
      if (playPromise) playPromise.catch(() => {});
    };

    // Safari can silently reject play() if called before enough data is buffered,
    // so retry once metadata/frames are actually available.
    video.addEventListener("loadedmetadata", tryPlay);
    video.addEventListener("canplay", tryPlay);
    tryPlay();

    // Last-resort fallback: if the platform's auto-play setting still blocked it,
    // start on the first tap/scroll so it's never stuck showing a static poster.
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

  // Scroll-spy for the sticky tab strip — bail out entirely while this tree is
  // display:none (desktop), same guard RivalDuoMobile uses.
  useEffect(() => {
    const ids = tabs.map((tab) => tab.id);
    let frame = 0;

    function update() {
      frame = 0;
      if (!tabStripRef.current?.offsetParent) return;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 160) current = id;
      }
      setActiveTab(current);
    }

    function onScroll() {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    scrollStripToIndex(tabStripRef.current, tabs.findIndex((tab) => tab.id === activeTab), reducedMotion);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, reducedMotion]);

  function scrollToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
  }

  return (
    <div className="bg-white">
      {/* ---------------------------------------------------------------- HERO */}
      <section className="relative isolate overflow-hidden px-5 pb-14 pt-[104px] text-white">
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
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_16%_10%,rgba(217,146,39,0.2),transparent_30%),linear-gradient(150deg,rgba(6,40,31,0.62)_0%,rgba(10,61,43,0.56)_46%,rgba(23,50,77,0.6)_100%)]"
        />
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-agri-gold" />

        <div className="h-10 w-px bg-agri-gold mb-5" />
        <Eyebrow dark>{home.hero.eyebrow}</Eyebrow>
        <h1 className="mt-5 text-[28px] font-bold leading-[1.2] tracking-normal">{home.hero.title}</h1>
        <p className="mt-5 text-[15px] leading-8 text-white/75">{home.hero.subtitle}</p>

        <div className="mt-6 inline-flex max-w-full items-center gap-2 rounded-full border border-agri-gold/35 bg-white/10 px-4 py-3 text-xs font-bold shadow-sm backdrop-blur">
          <span className="inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-agri-gold" />
          <span>{home.hero.trustBadge}</span>
        </div>

        <div className="mt-8 grid gap-3">
          <Link href={localizeHref(locale, home.hero.primaryCta.href)} className="btn-hero-glass min-h-[56px] w-full">
            {home.hero.primaryCta.label}
          </Link>
          <Link href={localizeHref(locale, home.hero.secondaryCta.href)} className="btn-hero-glass min-h-[56px] w-full">
            {home.hero.secondaryCta.label}
          </Link>
        </div>

        {/* Signature-card deck: stacked like the desktop version. Drag the top card
            left/right to cycle, or tap a dot. */}
        <div className="relative mt-9 min-h-[336px]">
          {heroCards.map((card, index) => {
            const total = heroCards.length;
            const position = (index - heroIndex + total) % total;
            const state = position === 0 ? "active" : position === 1 ? "next" : "back";
            const sign = isRtl ? -1 : 1;
            const variants = {
              active: { x: 0, y: 0, scale: 1, rotate: sign * -1.4, opacity: 1 },
              next: { x: sign * 14, y: 10, scale: 0.94, rotate: sign * 2.6, opacity: 0.62 },
              back: { x: sign * -10, y: 18, scale: 0.88, rotate: sign * -3.6, opacity: 0.32 }
            } as const;

            function onDragEnd(_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
              if (info.offset.x < -50 || info.velocity.x < -350) stepHero(1);
              else if (info.offset.x > 50 || info.velocity.x > 350) stepHero(-1);
            }

            return (
              <motion.article
                key={card.title}
                drag={state === "active" ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.65}
                onDragEnd={state === "active" ? onDragEnd : undefined}
                animate={variants[state]}
                transition={{ duration: reducedMotion ? 0 : 0.45, ease: premiumEase }}
                style={{ zIndex: position === 0 ? 30 : position === 1 ? 20 : 10 }}
                className={`absolute inset-x-0 top-0 touch-pan-y rounded-[1.75rem] border border-white/20 bg-white/95 p-7 text-agri-blue shadow-soft ${
                  state === "active" ? "cursor-grab active:cursor-grabbing" : "pointer-events-none"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-agri-gold text-sm font-black text-white">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px flex-1 bg-agri-gold/35" />
                </div>
                <h3 className="mt-7 text-2xl font-bold leading-tight">{card.title}</h3>
                {card.points ? (
                  <ul className="mt-4 grid gap-2.5">
                    {card.points.map((point) => (
                      <li key={point} className="flex items-start gap-2 text-[15px] leading-7 text-slate-600">
                        <svg viewBox="0 0 20 20" fill="none" className="mt-1.5 h-3.5 w-3.5 shrink-0 text-agri-green" aria-hidden="true">
                          <path d="M4 10.5 8 14.5 16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {point}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4 text-[15px] leading-8 text-slate-600">{card.description}</p>
                )}
              </motion.article>
            );
          })}
        </div>
        <div className="mt-6 flex items-center justify-between gap-4">
          <p className="text-sm font-bold text-white/70">
            {String(heroIndex + 1).padStart(2, "0")} / {String(heroCards.length).padStart(2, "0")}
          </p>
          <Dots count={heroCards.length} active={heroIndex} onSelect={setHeroIndex} dark />
        </div>
      </section>

      {/* ---------------------------------------------------------- STICKY TABS */}
      <div ref={tabStripRef} className="sticky top-[70px] z-30 px-3 py-2">
        <div
          className="flex gap-1.5 overflow-x-auto rounded-full border border-white/40 bg-white/20 p-1.5 backdrop-blur-xl backdrop-saturate-150 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),inset_0_-1px_3px_rgba(15,23,42,0.1),inset_0_0_18px_rgba(217,146,39,0.08),0_8px_24px_rgba(15,23,42,0.12)] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => scrollToSection(tab.id)}
                aria-current={isActive ? "true" : undefined}
                className={`flex min-h-11 shrink-0 items-center whitespace-nowrap rounded-full px-4 text-[13px] font-bold transition-colors duration-300 ${
                  isActive
                    ? "bg-agri-green text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.25)]"
                    : "text-agri-blue [text-shadow:0_0_8px_rgba(255,255,255,0.9),0_1px_3px_rgba(255,255,255,0.7)]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* --------------------------------------------------------- STORY (commitment) */}
      <section id="m-story" className="scroll-mt-[150px] bg-white px-5 pb-14 pt-12">
        <Eyebrow>{home.commitmentSection.eyebrow}</Eyebrow>
        <h2 className="mt-6 text-[26px] font-bold leading-tight text-agri-blue">{home.commitmentSection.title}</h2>

        <div className="mt-8 rounded-[1.5rem] border-s-4 border-agri-gold bg-agri-mist p-6">
          {home.commitmentSection.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-5 text-[15px] leading-8 text-slate-700 first:mt-0">
              {paragraph}
            </p>
          ))}
        </div>

        {highlights.length ? (
          <div className="mt-6 grid gap-3">
            {highlights.map((item, index) => (
              <Disclosure
                key={item.title}
                open={openHighlight === index}
                onToggle={() => setOpenHighlight(openHighlight === index ? null : index)}
                header={
                  <span className="flex items-center gap-3">
                    <span className="text-xs font-bold text-agri-gold">0{index + 1}</span>
                    <span className="text-[15px] font-bold text-agri-blue">{item.title}</span>
                  </span>
                }
              >
                <p className="text-[15px] leading-8 text-slate-600">{item.description}</p>
              </Disclosure>
            ))}
          </div>
        ) : null}
      </section>

      {/* ----------------------------------------------------- FEATURED PRODUCTS */}
      <section
        id="m-products"
        className="scroll-mt-[150px] relative isolate overflow-hidden bg-[radial-gradient(circle_at_18%_8%,rgba(217,146,39,0.2),transparent_32%),linear-gradient(150deg,#06281f_0%,#0A3D2B_50%,#17324d_100%)] px-5 pb-14 pt-14 text-white"
      >
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-agri-gold" />
        <Eyebrow dark>{home.featuredProductLinesSection.eyebrow}</Eyebrow>
        <h2 className="mt-4 text-[26px] font-bold leading-tight">{home.featuredProductLinesSection.title}</h2>
        {home.featuredProductLinesSection.description ? (
          <p className="mt-4 text-[15px] leading-8 text-white/75">{home.featuredProductLinesSection.description}</p>
        ) : null}

        {/* Draggable stacked deck — same mechanics as the hero signature-card deck:
            top card is dragged/tapped to cycle, with next/back cards peeking behind. */}
        <div className="relative mt-8 min-h-[500px]">
          {featuredProducts.map((item, index) => {
            const total = featuredProducts.length;
            const position = (index - productIndex + total) % total;
            const state = position === 0 ? "active" : position === 1 ? "next" : "back";
            const sign = isRtl ? -1 : 1;
            const variants = {
              active: { x: 0, y: 0, scale: 1, rotate: sign * -1.4, opacity: 1 },
              next: { x: sign * 14, y: 10, scale: 0.94, rotate: sign * 2.6, opacity: 0.62 },
              back: { x: sign * -10, y: 18, scale: 0.88, rotate: sign * -3.6, opacity: 0.32 }
            } as const;

            function onDragEnd(_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
              if (info.offset.x < -50 || info.velocity.x < -350) stepProduct(1);
              else if (info.offset.x > 50 || info.velocity.x > 350) stepProduct(-1);
            }

            return (
              <motion.article
                key={item.title}
                drag={state === "active" ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.65}
                onDragEnd={state === "active" ? onDragEnd : undefined}
                animate={variants[state]}
                transition={{ duration: reducedMotion ? 0 : 0.45, ease: premiumEase }}
                style={{ zIndex: position === 0 ? 30 : position === 1 ? 20 : 10 }}
                className={`absolute inset-x-9 top-0 touch-pan-y overflow-hidden rounded-[1.75rem] bg-white text-agri-blue shadow-[0_20px_50px_rgba(0,0,0,0.35)] ${
                  state === "active" ? "cursor-grab active:cursor-grabbing" : "pointer-events-none"
                }`}
              >
                <div className="relative flex h-52 items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_30%,rgba(217,146,39,0.18),transparent_60%)] px-8 pb-6 pt-11">
                  <ResponsiveImage
                    src={item.image}
                    alt={item.imageAlt}
                    sizes="82vw"
                    className="h-full w-full object-contain"
                    objectFit="contain"
                    style={{ transform: `scale(${item.image.includes("fossil-featured-logo") ? 0.82 : 0.68})` }}
                  />
                </div>
                <div className="p-6 pb-7">
                  {item.eyebrow ? (
                    <span className="inline-flex w-fit items-center rounded-lg border border-agri-green px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-agri-green">
                      {item.eyebrow}
                    </span>
                  ) : null}
                  <h3 className="mt-3 text-xl font-bold leading-tight text-agri-blue">{item.title}</h3>
                  {item.tags.length ? (
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span key={tag} className="rounded-lg border border-agri-green px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-agri-green">
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  <p className="mt-4 text-[15px] leading-7 text-slate-600">{item.description}</p>
                  <Link
                    href={localizeHref(locale, item.href)}
                    className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-agri-green px-5 text-sm font-bold text-white shadow-sm transition duration-300 active:bg-agri-greenDark"
                  >
                    {item.ctaLabel}
                    <ArrowIcon className={`h-4 w-4 ${isRtl ? "rotate-180" : ""}`} />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          <p className="text-sm font-bold text-white/70">
            {String(productIndex + 1).padStart(2, "0")} / {String(featuredProducts.length).padStart(2, "0")}
          </p>
          <Dots count={featuredProducts.length} active={productIndex} onSelect={setProductIndex} dark />
        </div>
      </section>

      {/* -------------------------------------------------------------- CATEGORIES */}
      <section id="m-categories" className="scroll-mt-[150px] bg-agri-mist px-5 py-14">
        <div className="rounded-[1.5rem] border border-agri-line bg-white p-7 shadow-soft">
          <Eyebrow>{home.productCategoriesSection.eyebrow}</Eyebrow>
          <h2 className="mt-4 text-[24px] font-bold leading-tight text-agri-blue">{home.productCategoriesSection.title}</h2>
          {home.productCategoriesSection.description ? (
            <div className="mt-4">
              <ReadMore text={home.productCategoriesSection.description} labels={labels} />
            </div>
          ) : null}
          {home.productCategoriesSection.cta ? (
            <Link href={localizeHref(locale, home.productCategoriesSection.cta.href)} className="btn-secondary mt-6 min-h-[52px] w-full">
              {home.productCategoriesSection.cta.label}
            </Link>
          ) : null}
        </div>
      </section>

      {/* ------------------------------------------------------------- WHY AGROPEST */}
      <section id="m-why" className="scroll-mt-[150px] bg-agri-greenDark px-5 py-14 text-white">
        <Eyebrow dark>{home.whyAgropestSection.eyebrow}</Eyebrow>
        <h2 className="mt-4 text-[26px] font-bold leading-tight">{home.whyAgropestSection.title}</h2>
        <p className="mt-4 text-[15px] leading-8 text-white/70">{home.whyAgropestSection.description}</p>

        <div className="relative mt-6 aspect-[16/10] overflow-hidden rounded-[1.5rem] border border-white/10 shadow-soft">
          <ResponsiveImage
            src="/images/backgrounds/field-day-trials.jpg"
            alt={home.whyAgropestSection.imageAlt}
            className="h-full w-full"
            objectFit="cover"
            sizes="100vw"
          />
        </div>

        <div className="mt-6 grid gap-3">
          {home.whyAgropestSection.items.map((item, index) => (
            <Disclosure
              key={item.title}
              open={openWhy === index}
              onToggle={() => setOpenWhy(openWhy === index ? null : index)}
              header={
                <span className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-agri-gold text-xs font-black text-white">
                    {item.eyebrow}
                  </span>
                  <span className="min-w-0 text-[15px] font-bold text-agri-blue">{item.title}</span>
                </span>
              }
            >
              <p className="text-[15px] leading-8 text-slate-600">{item.description}</p>
            </Disclosure>
          ))}
        </div>
      </section>

      {/* --------------------------------------------------------- TECHNICAL LIBRARY */}
      <section id="m-library" className="scroll-mt-[150px] bg-white px-5 py-14">
        <div className="relative min-h-[190px] overflow-hidden rounded-[1.5rem] bg-agri-blue shadow-soft">
          <ResponsiveImage
            src={content.technicalLibraryPreview.image}
            alt={content.technicalLibraryPreview.imageAlt}
            sizes="100vw"
            className="absolute inset-0 h-full w-full object-cover"
            objectFit="cover"
          />
        </div>
        <div className="mt-8">
          <Eyebrow>{content.technicalLibraryPreview.eyebrow}</Eyebrow>
          <h2 className="mt-3 text-[24px] font-bold leading-tight text-agri-blue">{content.technicalLibraryPreview.title}</h2>
        </div>
        <p className="mt-6 text-[15px] leading-8 text-slate-600">{content.technicalLibraryPreview.description}</p>
        <Link href={localizeHref(locale, content.technicalLibraryPreview.cta.href)} className="btn-primary mt-6 min-h-[52px] w-full">
          {content.technicalLibraryPreview.cta.label}
        </Link>
      </section>

      {/* ------------------------------------------------------------------ PARTNERS */}
      <section id="m-partners" className="scroll-mt-[150px] relative isolate bg-gradient-to-br from-agri-blue via-agri-greenDark to-agri-blue px-5 py-14 text-white">
        <Eyebrow dark>{home.partnersSection.eyebrow}</Eyebrow>
        <h2 className="mt-4 text-[26px] font-bold leading-tight">{home.partnersSection.title}</h2>
        <p className="mt-4 text-[15px] leading-8 text-white/80">{home.partnersSection.description}</p>

        {/* Draggable stacked deck — same mechanics as the hero signature-card deck:
            top card is dragged/tapped to cycle, with next/back cards peeking behind. */}
        <div className="relative mt-8 min-h-[440px]">
          {partners.map((partner, index) => {
            const total = partners.length;
            const position = (index - partnerIndex + total) % total;
            const state = position === 0 ? "active" : position === 1 ? "next" : "back";
            const sign = isRtl ? -1 : 1;
            const variants = {
              active: { x: 0, y: 0, scale: 1, rotate: sign * -1.4, opacity: 1 },
              next: { x: sign * 14, y: 10, scale: 0.94, rotate: sign * 2.6, opacity: 0.62 },
              back: { x: sign * -10, y: 18, scale: 0.88, rotate: sign * -3.6, opacity: 0.32 }
            } as const;

            function onDragEnd(_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
              if (info.offset.x < -50 || info.velocity.x < -350) stepPartner(1);
              else if (info.offset.x > 50 || info.velocity.x > 350) stepPartner(-1);
            }

            return (
              <motion.article
                key={partner.name}
                drag={state === "active" ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.65}
                onDragEnd={state === "active" ? onDragEnd : undefined}
                animate={variants[state]}
                transition={{ duration: reducedMotion ? 0 : 0.45, ease: premiumEase }}
                style={{ zIndex: position === 0 ? 30 : position === 1 ? 20 : 10 }}
                className={`absolute inset-x-9 top-0 flex min-h-[420px] touch-pan-y flex-col justify-center rounded-[1.75rem] border border-white/20 bg-white/95 p-7 text-center text-agri-blue shadow-soft ${
                  state === "active" ? "cursor-grab active:cursor-grabbing" : "pointer-events-none"
                }`}
              >
                <div className="flex h-24 w-full items-center justify-center">
                  <ResponsiveImage
                    src={partner.logo}
                    alt={partner.logoAlt}
                    sizes="220px"
                    objectFit="contain"
                    className="max-h-20 w-full max-w-[220px] object-contain"
                  />
                </div>
                <p className="mt-5 text-lg font-black tracking-tight">{partner.name}</p>
                <p className="mt-3 text-[15px] font-semibold leading-6 text-slate-600">{partner.description}</p>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          <p className="text-sm font-bold text-white/70">
            {String(partnerIndex + 1).padStart(2, "0")} / {String(partners.length).padStart(2, "0")}
          </p>
          <Dots count={partners.length} active={partnerIndex} onSelect={setPartnerIndex} dark />
        </div>
      </section>

      {/* --------------------------------------------------------------------- CTA */}
      <section id="m-cta" className="scroll-mt-[150px] bg-agri-mist px-5 py-14">
        <div className="relative overflow-hidden rounded-[1.75rem] bg-agri-blue px-6 py-9 text-white shadow-soft">
          {home.cta.backgroundImage ? (
            <div aria-hidden="true" className="absolute inset-0 opacity-25">
              <ResponsiveImage src={home.cta.backgroundImage} alt="" className="h-full w-full" objectFit="cover" />
            </div>
          ) : null}
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-agri-blue via-agri-blue/90 to-agri-green/75" />
          <div className="relative">
            {home.cta.eyebrow ? <Eyebrow dark>{home.cta.eyebrow}</Eyebrow> : null}
            <h2 className="mt-4 text-[26px] font-bold leading-tight">{home.cta.title}</h2>
            <p className="mt-4 text-[15px] leading-8 text-white/75">{home.cta.description}</p>

            <div className="mt-7 grid gap-3">
              <Link href={localizeHref(locale, home.cta.primaryHref)} className="btn-on-dark-outline min-h-[54px] w-full">
                {home.cta.primaryLabel}
              </Link>
              {home.cta.secondaryLabel && home.cta.secondaryHref ? (
                <Link href={localizeHref(locale, home.cta.secondaryHref)} className="btn-on-dark-outline min-h-[54px] w-full">
                  {home.cta.secondaryLabel}
                </Link>
              ) : null}
              {home.cta.tertiaryLabel && home.cta.tertiaryHref ? (
                <a href={home.cta.tertiaryHref} className="btn-on-dark-outline min-h-[54px] w-full">
                  {home.cta.tertiaryLabel}
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
