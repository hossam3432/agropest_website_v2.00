"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ResponsiveImage } from "@/components/ResponsiveImage";

const BLUE = "#0E4B9F";
const ORANGE = "#F14723";
const INK = "#0A2A57";
const premiumEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

// A groove carved into the page rather than a pill floating on it: dark shadow
// under the top lip, a soft dark haze all round, light catching the bottom inner
// wall and the outer bottom edge. Ambient outer shadow stays minimal — elevation
// is what makes a surface read as raised, so more of it would undo the recess.
const GROOVE_SHADOW = [
  "inset 0 2px 5px rgba(10,42,87,0.13)",
  "inset 0 0 14px rgba(10,42,87,0.07)",
  "inset 0 -1px 0 rgba(255,255,255,0.85)",
  "0 1px 0 rgba(255,255,255,0.55)",
  "0 4px 16px rgba(15,23,42,0.07)"
].join(", ");

type Stage = {
  readonly day: string;
  readonly label: string;
  readonly text: string;
  readonly advice: string;
  readonly note?: string;
  readonly highlighted?: boolean;
};

export type RivalDuoMobileContent = {
  readonly nav: { readonly eyebrow: string; readonly badge: string };
  readonly hero: {
    readonly slogan: string;
    readonly lead: string;
    readonly ctaPrimary: string;
    readonly ctaSecondary: string;
    readonly compositionLabel: string;
    readonly curativeLabel: string;
    readonly curativeValue: string;
    readonly phiLabel: string;
    readonly phiValue: string;
  };
  readonly s2: {
    readonly kicker: string;
    readonly title: string;
    readonly intro: string;
    readonly stage1Title: string;
    readonly stage1Text: string;
    readonly stage2Title: string;
    readonly stage2Text: string;
  };
  readonly s3: {
    readonly kicker: string;
    readonly title: string;
    readonly card1Badge: string;
    readonly card1Name: string;
    readonly card1Text: string;
    readonly card2Badge: string;
    readonly card2Name: string;
    readonly card2Text: string;
  };
  readonly s4: {
    readonly kicker: string;
    readonly title: string;
    readonly localTitle: string;
    readonly cropLabel: string;
    readonly diseaseLabel: string;
    readonly rateLabel: string;
    readonly phiLabel: string;
    readonly local: { readonly crop: string; readonly disease: string; readonly rate: string; readonly phi: string };
    readonly euTitle: string;
    readonly rows: readonly { readonly family: string; readonly disease: string; readonly rate: string; readonly phi: string }[];
  };
  readonly s5: {
    readonly kicker: string;
    readonly title: string;
    readonly stages: readonly Stage[];
    readonly timingTitle: string;
  };
  readonly s7: {
    readonly kicker: string;
    readonly title: string;
    readonly pillars: readonly { readonly title: string; readonly text: string }[];
  };
  readonly s8: {
    readonly eyebrow: string;
    readonly tagline: string;
    readonly manufacturerLabel: string;
    readonly manufacturer: string;
    readonly agentLabel: string;
    readonly agent: string;
    readonly regLabel: string;
    readonly reg: string;
    readonly packLabel: string;
    readonly pack: string;
    readonly supportLabel: string;
    readonly salesLabel: string;
    readonly ctaBrochure: string;
    readonly ctaPrimary: string;
  };
};

type RivalDuoMobileProps = {
  c: RivalDuoMobileContent;
  locale: "en" | "ar";
  wordmark: string;
  productHref: string;
  contactHref: string;
  brochureHref: string;
  phone: string;
  whatsappHref: string;
  compositionRows: readonly { readonly ingredient: string; readonly concentration: string }[];
};

// Expander affordances are UI chrome, not page copy — the only strings here that
// are not part of the product content.
const ui = {
  en: { more: "Read more", less: "Show less" },
  ar: { more: "اقرأ المزيد", less: "عرض أقل" }
} as const;

/* ---------------------------------------------------------------- primitives */

function Kicker({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex flex-col overflow-hidden rounded-[0.7rem] shadow-sm">
      <span className="h-1.5" style={{ backgroundColor: ORANGE }} />
      <span
        className="px-3.5 py-2 text-[11px] font-normal uppercase leading-4 tracking-[0.12em] text-white"
        style={{ backgroundColor: BLUE }}
      >
        {children}
      </span>
    </span>
  );
}

function SectionHead({ kicker, title, logo }: { kicker: string; title: string; logo?: boolean }) {
  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        <Kicker>{kicker}</Kicker>
        {logo ? (
          <ResponsiveImage
            src="/images/products/rival-duo-shield-logo.png"
            alt=""
            aria-hidden="true"
            className="h-11 w-auto object-contain"
            objectFit="contain"
            sizes="44px"
          />
        ) : null}
      </div>
      <h2 className="mt-3.5 text-[26px] font-extrabold leading-[1.22]" style={{ color: INK }}>
        {title}
      </h2>
    </>
  );
}

function Chevron({ open, color }: { open: boolean; color: string }) {
  return (
    <span
      aria-hidden="true"
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors duration-300"
      style={{ backgroundColor: open ? color : "#EEF3FA" }}
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        className={"transition-transform duration-300 " + (open ? "rotate-180" : "")}
      >
        <path d="M6 9 L12 15 L18 9" stroke={open ? "#FFFFFF" : color} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

/** Accordion row: a 68px-tall header button plus a height-animated body. */
function Disclosure({
  open,
  onToggle,
  accent,
  header,
  children
}: {
  open: boolean;
  onToggle: () => void;
  accent: string;
  header: ReactNode;
  children: ReactNode;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <div
      className="overflow-hidden rounded-[1.35rem] border-2 bg-white transition-colors duration-300"
      style={{
        borderColor: open ? accent : "#E8EEF7",
        boxShadow: open ? `0 16px 40px ${accent}1F` : "0 8px 24px rgba(10,42,87,0.05)"
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex min-h-[68px] w-full items-center gap-3 px-4 py-3.5 text-start active:bg-slate-50"
      >
        <span className="min-w-0 flex-1">{header}</span>
        <Chevron open={open} color={accent} />
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.34, ease: premiumEase }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4">{children}</div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

/** Clamps long body copy behind a full-width tap target. Text is never removed. */
function ReadMore({ text, labels }: { text: string; labels: { more: string; less: string } }) {
  const [open, setOpen] = useState(false);
  const [clamped, setClamped] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  // The toggle is only an affordance when the clamp actually hides something —
  // which depends on how the copy wraps at this width.
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
      <p ref={textRef} className={"text-[15px] leading-8 text-slate-600 " + (open ? "" : "line-clamp-4")}>
        {text}
      </p>
      {clamped ? (
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          className="mt-1 inline-flex min-h-[44px] items-center gap-1.5 text-sm font-bold"
          style={{ color: BLUE }}
        >
          {open ? labels.less : labels.more}
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className={"transition-transform duration-300 " + (open ? "rotate-180" : "")}
          >
            <path d="M6 9 L12 15 L18 9" stroke={BLUE} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      ) : null}
    </div>
  );
}

/**
 * Horizontal-only centring for a chip strip. Relative scrollBy keeps it correct
 * under RTL, where scrollLeft origins differ across engines.
 */
function centerInStrip(strip: HTMLElement | null, selector: string, reducedMotion: boolean | null) {
  const chip = strip?.querySelector<HTMLElement>(selector);
  if (!strip || !chip) return;
  const stripRect = strip.getBoundingClientRect();
  const chipRect = chip.getBoundingClientRect();
  const delta = chipRect.left + chipRect.width / 2 - (stripRect.left + stripRect.width / 2);
  if (Math.abs(delta) < 1) return;
  strip.scrollBy({ left: delta, behavior: reducedMotion ? "auto" : "smooth" });
}

function Field({ label, value, color, large }: { label: string; value: string; color?: string; large?: boolean }) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">{label}</p>
      <p
        className={large ? "mt-0.5 text-lg font-extrabold leading-6" : "mt-0.5 text-sm font-bold leading-6"}
        style={{ color: color ?? "#475569" }}
      >
        {value}
      </p>
    </div>
  );
}

/* ---------------------------------------------------------------- the page */

export function RivalDuoMobile({
  c,
  locale,
  wordmark,
  productHref,
  contactHref,
  brochureHref,
  phone,
  whatsappHref,
  compositionRows
}: RivalDuoMobileProps) {
  const rtl = locale === "ar";
  const labels = ui[locale];
  const reducedMotion = useReducedMotion();

  const tabs = [
    { id: "m-s3", label: c.s3.kicker },
    { id: "m-s2", label: c.s2.kicker },
    { id: "m-s5", label: c.s5.kicker },
    { id: "m-s4", label: c.s4.kicker },
    { id: "m-s7", label: c.s7.kicker },
    { id: "m-s8", label: c.s8.eyebrow }
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [openComposition, setOpenComposition] = useState<number | null>(0);
  const [openRate, setOpenRate] = useState<number | null>(0);
  const [openPillar, setOpenPillar] = useState<number | null>(0);
  const [stage, setStage] = useState(0);
  const [barVisible, setBarVisible] = useState(false);

  const tabStripRef = useRef<HTMLDivElement>(null);
  const stageStripRef = useRef<HTMLDivElement>(null);

  const activeStage = c.s5.stages[stage];
  const stageCount = c.s5.stages.length;
  // Glow offsets as a fraction of image width, tuned against the RTL (mirrored)
  // artwork; the band index is already mirrored, so LTR flips the sign.
  const stageGlowXOffsetsPct = [-0.01, 0.07, 0.1, 0.07];

  function scrollToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
  }

  // Open on the whole hero. A reload restores the previous offset, which parks the
  // wordmark under the fixed navbar; back/forward keeps its restored position.
  useEffect(() => {
    if (window.matchMedia("(min-width: 1024px)").matches) return;
    if (window.location.hash) return;
    const [entry] = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
    if (entry?.type === "back_forward") return;
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  // Scroll-spy for the sticky tab strip. Sections butt directly against each
  // other, so an IntersectionObserver sees a zero-area overlap on the outgoing
  // one and can't break the tie. Pick the deepest section whose top has crossed
  // the line just under the pill instead — that is always the one being read.
  useEffect(() => {
    const ids = tabs.map((tab) => tab.id);
    let frame = 0;

    function update() {
      frame = 0;
      if (!tabStripRef.current?.offsetParent) return; // desktop: tree is display:none
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 150) current = id;
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

  // Keep the active chip centred in the strip as the page scrolls. scrollIntoView
  // would drag the whole page to the strip on mount, so pan the strip by hand.
  useEffect(() => {
    centerInStrip(tabStripRef.current, `[data-tab="${activeTab}"]`, reducedMotion);
  }, [activeTab, reducedMotion]);

  // Sticky action bar: past the hero, and out of the way once the closing
  // section (which carries the same actions inline) is reached.
  useEffect(() => {
    function onScroll() {
      const closing = document.getElementById("m-s8");
      const reachedClosing = closing ? closing.getBoundingClientRect().top < window.innerHeight - 120 : true;
      setBarVisible(window.scrollY > 420 && !reachedClosing);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  function selectStage(index: number) {
    setStage(index);
    centerInStrip(stageStripRef.current, `[data-stage="${index}"]`, reducedMotion);
  }

  return (
    <div>
      {/* ---------------------------------------------------------- HERO */}
      {/* pt clears the floating navbar in its tall (unscrolled) state, on top of
          the 6rem the layout already reserves. */}
      <section className="relative overflow-hidden bg-[#F5F8FC] px-4 pb-9 pt-10">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
          <ResponsiveImage
            src="/images/products/rival-duo-umbrella-lineart.png"
            alt=""
            aria-hidden="true"
            className="h-[115%] w-auto max-w-none opacity-[0.13]"
            objectFit="contain"
            sizes="140vw"
            priority
            style={rtl ? { transform: "scaleX(-1)" } : undefined}
          />
        </div>

        <div className="relative">
          <ResponsiveImage
            src={wordmark}
            alt={c.nav.eyebrow}
            className="h-[86px] w-auto object-contain"
            objectFit="contain"
            sizes="220px"
            priority
          />
          <div className="mt-4 flex flex-col gap-0">
            <span
              className="rival-line-trim h-2.5 w-28 rounded-full"
              style={{ backgroundColor: BLUE, transformOrigin: rtl ? "right center" : "left center", animationDelay: "0s" }}
            />
            <span
              className="rival-line-trim h-1.5 w-16 rounded-full"
              style={{ backgroundColor: ORANGE, transformOrigin: rtl ? "right center" : "left center", animationDelay: "0.1s" }}
            />
          </div>

          <span
            className="mt-3.5 inline-block rounded-full border-2 px-4 py-2 text-[13px] font-normal uppercase leading-5 tracking-[0.1em]"
            style={{ borderColor: BLUE, color: BLUE }}
          >
            {c.nav.badge}
          </span>

          <h1 className="mt-3.5 text-[30px] font-extrabold leading-[1.2]" style={{ color: INK }}>
            {c.hero.slogan}
          </h1>
          <p className="mt-3 text-[15px] leading-8 text-slate-600">{c.hero.lead}</p>

          <div className="mt-5 rounded-[1.35rem] border-2 bg-white/85 p-4 backdrop-blur-sm" style={{ borderColor: ORANGE + "33" }}>
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">{c.hero.compositionLabel}</p>
            <div className="mt-2 grid gap-1.5">
              {compositionRows.map((row, index) => (
                <div key={row.ingredient} className="flex items-baseline gap-2.5">
                  <span dir="ltr" className="text-3xl font-extrabold leading-8" style={{ color: index === 0 ? BLUE : ORANGE }}>
                    {row.concentration}
                  </span>
                  <span className="text-[15px] font-bold text-slate-500">{row.ingredient}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="rounded-[1.35rem] border-2 bg-white/85 p-4 backdrop-blur-sm" style={{ borderColor: BLUE + "33" }}>
              <p className="text-[10px] font-bold uppercase leading-4 tracking-[0.12em] text-slate-400">{c.hero.curativeLabel}</p>
              <p dir="ltr" className="mt-1.5 text-2xl font-extrabold" style={{ color: BLUE, textAlign: rtl ? "right" : "left" }}>
                {c.hero.curativeValue}
              </p>
            </div>
            <div className="rounded-[1.35rem] border-2 bg-white/85 p-4 backdrop-blur-sm" style={{ borderColor: ORANGE + "33" }}>
              <p className="text-[10px] font-bold uppercase leading-4 tracking-[0.12em] text-slate-400">{c.hero.phiLabel}</p>
              <p dir="ltr" className="mt-1.5 text-2xl font-extrabold" style={{ color: ORANGE, textAlign: rtl ? "right" : "left" }}>
                {c.hero.phiValue}
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-2.5">
            <button
              type="button"
              onClick={() => scrollToSection("m-s4")}
              className="flex min-h-[56px] w-full items-center justify-center rounded-full px-6 text-[15px] font-bold text-white shadow-[0_14px_30px_rgba(241,71,35,0.3)] active:scale-[0.985]"
              style={{ backgroundColor: ORANGE }}
            >
              {c.hero.ctaPrimary}
            </button>
            <Link
              href={contactHref}
              className="flex min-h-[56px] w-full items-center justify-center rounded-full border-[3px] px-6 text-[15px] font-bold active:scale-[0.985]"
              style={{ borderColor: BLUE, color: BLUE }}
            >
              {c.hero.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- STICKY TAB STRIP */}
      {/* Parks below the navbar's compact height with a gap, so the two glass
          pills read as separate layers instead of one merged bar. */}
      <div className="sticky top-[70px] z-30 px-4 py-1">
        <div
          className="overflow-hidden rounded-full border border-white/40 bg-white/60 backdrop-blur-xl"
          style={{ boxShadow: GROOVE_SHADOW }}
        >
          <div
            ref={tabStripRef}
            className="flex gap-1.5 overflow-x-auto p-1.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  data-tab={tab.id}
                  type="button"
                  onClick={() => scrollToSection(tab.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={
                    "flex min-h-[44px] shrink-0 items-center whitespace-nowrap rounded-full px-4 text-[13px] font-bold transition-colors duration-300 " +
                    (isActive ? "text-white" : "text-slate-500")
                  }
                  style={isActive ? { backgroundColor: BLUE } : undefined}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* --------------------------------------------- DUAL COMPOSITION (s3) */}
      <section id="m-s3" className="scroll-mt-[140px] bg-[#F5F8FC] px-4 pb-12 pt-12">
        <SectionHead kicker={c.s3.kicker} title={c.s3.title} logo />
        <div className="mt-4 grid gap-3">
          {[
            { badge: c.s3.card1Badge, name: c.s3.card1Name, text: c.s3.card1Text, color: BLUE },
            { badge: c.s3.card2Badge, name: c.s3.card2Name, text: c.s3.card2Text, color: ORANGE }
          ].map((card, index) => (
            <Disclosure
              key={card.name}
              accent={card.color}
              open={openComposition === index}
              onToggle={() => setOpenComposition(openComposition === index ? null : index)}
              header={
                <>
                  <span
                    className="inline-block rounded-full px-3 py-1 text-[10px] font-normal uppercase tracking-[0.1em] text-white"
                    style={{ backgroundColor: card.color }}
                  >
                    {card.badge}
                  </span>
                  <span className="mt-1.5 block text-xl font-extrabold" style={{ color: INK }}>
                    {card.name}
                  </span>
                </>
              }
            >
              <p className="text-[15px] leading-8 text-slate-600">{card.text}</p>
            </Disclosure>
          ))}
        </div>
      </section>

      {/* ------------------------------------ PREVENTIVE & CURATIVE (s2) */}
      <section id="m-s2" className="scroll-mt-[140px] bg-[#F5F8FC] px-4 pb-12 pt-12">
        <SectionHead kicker={c.s2.kicker} title={c.s2.title} />
        <div className="mt-3">
          <ReadMore text={c.s2.intro} labels={labels} />
        </div>
        <div className="mt-4 grid gap-4">
          {[
            { image: "/images/products/rival-duo-oomycete-germinate.png", title: c.s2.stage1Title, text: c.s2.stage1Text, number: "01", color: ORANGE },
            { image: "/images/products/rival-duo-oomycete-blocked.png", title: c.s2.stage2Title, text: c.s2.stage2Text, number: "02", color: BLUE }
          ].map((card) => (
            <article key={card.number} className="overflow-hidden rounded-[1.5rem] bg-white shadow-[0_16px_44px_rgba(14,75,159,0.1)]">
              <div className="h-52 w-full overflow-hidden">
                <ResponsiveImage src={card.image} alt="" aria-hidden="true" className="h-full w-full object-cover" objectFit="cover" sizes="100vw" />
              </div>
              <div className="p-4">
                <h3 className="text-[17px] font-extrabold leading-6" style={{ color: INK }}>
                  <span className="me-1.5" style={{ color: card.color }}>
                    {card.number}
                  </span>
                  {card.title}
                </h3>
                <p className="mt-1.5 text-[15px] leading-8 text-slate-600">{card.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------- TIMING (s5) */}
      <section id="m-s5" className="scroll-mt-[140px] bg-[#F5F8FC] px-4 pb-12 pt-12">
        <SectionHead kicker={c.s5.kicker} title={c.s5.title} />

        <div className="mt-4 overflow-hidden rounded-[1.5rem] bg-white p-2 shadow-[0_16px_44px_rgba(14,75,159,0.1)]">
          {/* Bands are percentages of the artwork, so they anchor to the image box
              itself — not the padded card, which would shift them by the padding. */}
          <div className="relative overflow-hidden">
            <ResponsiveImage
              src="/images/products/rival-duo-potato-progression.png"
              alt=""
              aria-hidden="true"
              objectFit="contain"
              sizes="100vw"
              className="block h-auto w-full object-contain"
              style={rtl ? { transform: "scaleX(-1)" } : undefined}
            />
            {c.s5.stages.map((item, index) => {
              const effIndex = rtl ? stageCount - 1 - index : index;
              const widthPct = 100 / stageCount;
              const offsetPct = (rtl ? 1 : -1) * (stageGlowXOffsetsPct[index] ?? 0) * 100;
              const glow = item.highlighted ? ORANGE : BLUE;
              return (
                <div
                  key={item.day}
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 transition-opacity duration-[400ms] ease-in-out"
                  style={{
                    left: `${effIndex * widthPct + offsetPct}%`,
                    width: `${widthPct}%`,
                    opacity: stage === index ? 1 : 0,
                    background: `radial-gradient(ellipse 60% 50% at center, ${glow}66 0%, ${glow}33 50%, transparent 80%)`
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Horizontal stage tabs */}
        <div
          ref={stageStripRef}
          className="mt-3 flex snap-x snap-mandatory gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {c.s5.stages.map((item, index) => {
            const isActive = stage === index;
            const accent = item.highlighted ? ORANGE : BLUE;
            return (
              <button
                key={item.day}
                data-stage={index}
                type="button"
                onClick={() => selectStage(index)}
                aria-pressed={isActive}
                className={
                  "flex min-h-[62px] shrink-0 snap-center flex-col justify-center rounded-[1.1rem] border-2 px-4 text-start transition-colors duration-300 " +
                  (isActive ? "" : "border-slate-100 bg-white")
                }
                style={isActive ? { borderColor: accent, backgroundColor: item.highlighted ? "#FFF6F3" : "#EEF4FF" } : undefined}
              >
                <span className="text-[11px] font-bold uppercase tracking-[0.1em]" style={{ color: isActive ? accent : "#94A3B8" }}>
                  {item.day}
                </span>
                <span className="mt-0.5 whitespace-nowrap text-sm font-extrabold" style={{ color: INK }}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={stage}
            initial={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.32, ease: premiumEase }}
            className="mt-3 rounded-[1.5rem] border-2 p-4"
            style={{
              borderColor: activeStage.highlighted ? ORANGE + "55" : BLUE + "22",
              backgroundColor: activeStage.highlighted ? "#FFF6F3" : "#F8FAFD"
            }}
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.12em]" style={{ color: activeStage.highlighted ? ORANGE : BLUE }}>
              {activeStage.day}
            </p>
            <h3 className="mt-1 text-xl font-extrabold" style={{ color: INK }}>
              {activeStage.label}
            </h3>
            <p className="mt-2 text-[15px] leading-8 text-slate-600">{activeStage.text}</p>

            <div className="mt-3.5 rounded-[1.15rem] bg-white p-3.5">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em]" style={{ color: BLUE }}>
                {c.s5.timingTitle} · {activeStage.day}
              </p>
              <p className="mt-1 text-[15px] leading-8 text-slate-600">{activeStage.advice}</p>
            </div>

            {activeStage.note ? (
              <div className="mt-2.5 rounded-[1.15rem] border-2 p-3.5" style={{ borderColor: ORANGE + "55", backgroundColor: "#FFFFFF" }}>
                <p className="text-[15px] leading-8 text-slate-700">{activeStage.note}</p>
              </div>
            ) : null}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ------------------------------------------- APPLICATION RATES (s4) */}
      <section id="m-s4" className="scroll-mt-[140px] bg-[#F5F8FC] px-4 pb-12 pt-12">
        <SectionHead kicker={c.s4.kicker} title={c.s4.title} />

        <div className="mt-4 overflow-hidden rounded-[1.5rem] border-2 bg-white" style={{ borderColor: BLUE + "22" }}>
          <p className="px-4 py-3 text-[13px] font-normal leading-5 text-white" style={{ backgroundColor: BLUE }}>
            {c.s4.localTitle}
          </p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-3.5 bg-[#F8FAFD] p-4">
            <Field label={c.s4.cropLabel} value={c.s4.local.crop} color={INK} large />
            <Field label={c.s4.rateLabel} value={c.s4.local.rate} color={ORANGE} large />
            <Field label={c.s4.phiLabel} value={c.s4.local.phi} color={BLUE} large />
            {/* Full width: the binomial is one LTR run that breaks badly in a half column. */}
            <div className="col-span-2">
              <Field label={c.s4.diseaseLabel} value={c.s4.local.disease} />
            </div>
          </div>
        </div>

        <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">{c.s4.euTitle}</p>
        <div className="mt-2.5 grid gap-2.5">
          {c.s4.rows.map((row, index) => (
            <Disclosure
              key={row.family}
              accent={BLUE}
              open={openRate === index}
              onToggle={() => setOpenRate(openRate === index ? null : index)}
              header={
                <>
                  <span className="block text-[15px] font-extrabold leading-6" style={{ color: INK }}>
                    {row.family}
                  </span>
                  <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                    {c.s4.rateLabel}
                    <span className="ms-1.5 text-sm font-extrabold tracking-normal" style={{ color: ORANGE }}>
                      {row.rate}
                    </span>
                  </span>
                </>
              }
            >
              <div className="grid gap-3 border-t border-slate-100 pt-3">
                <Field label={c.s4.diseaseLabel} value={row.disease} />
                <Field label={c.s4.phiLabel} value={row.phi} color={BLUE} large />
              </div>
            </Disclosure>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------ WHY RIVAL DUO (s7) */}
      <section id="m-s7" className="scroll-mt-[140px] bg-[#F5F8FC] px-4 pb-12 pt-12">
        <div className="flex flex-wrap items-center gap-3">
          <ResponsiveImage
            src="/images/products/rival-duo-shield-logo.png"
            alt=""
            aria-hidden="true"
            className="h-12 w-auto object-contain"
            objectFit="contain"
            sizes="48px"
          />
          <h2 className="text-[26px] font-extrabold leading-[1.22]" style={{ color: INK }}>
            {c.s7.title}
          </h2>
        </div>
        <div className="mt-4 grid gap-2.5">
          {c.s7.pillars.map((pillar, index) => {
            const accent = index % 2 === 0 ? BLUE : ORANGE;
            return (
              <Disclosure
                key={pillar.title}
                accent={accent}
                open={openPillar === index}
                onToggle={() => setOpenPillar(openPillar === index ? null : index)}
                header={
                  <span className="flex items-center gap-3">
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                      style={{ backgroundColor: accent }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 text-lg font-extrabold leading-6" style={{ color: INK }}>
                      {pillar.title}
                    </span>
                  </span>
                }
              >
                <p className="text-[15px] leading-8 text-slate-600">{pillar.text}</p>
              </Disclosure>
            );
          })}
        </div>
      </section>

      {/* ---------------------------------------------- COMMERCIAL CLOSE (s8) */}
      <section id="m-s8" className="scroll-mt-[140px] bg-[#F5F8FC] px-4 pb-14 pt-12">
        <ResponsiveImage
          src="/images/products/rival-duo-bottles-2026.png"
          alt={c.s8.eyebrow}
          className="mx-auto block h-auto max-h-[46svh] w-[82%] object-contain drop-shadow-[0_24px_44px_rgba(14,75,159,0.25)]"
          objectFit="contain"
          sizes="90vw"
        />

        <ResponsiveImage
          src={wordmark}
          alt={c.nav.eyebrow}
          className="mt-6 h-[72px] w-auto object-contain"
          objectFit="contain"
          sizes="190px"
        />
        <h2 className="mt-3.5 text-[22px] font-extrabold leading-[1.35]" style={{ color: INK }}>
          {c.s8.tagline}
        </h2>

        <div className="mt-5 grid gap-3.5 rounded-[1.5rem] border-2 border-white bg-white p-4 shadow-[0_16px_44px_rgba(14,75,159,0.08)]">
          <Field label={c.s8.manufacturerLabel} value={c.s8.manufacturer} color={INK} large />
          <Field label={c.s8.agentLabel} value={c.s8.agent} color={INK} large />
          <Field label={c.s8.regLabel} value={c.s8.reg} />
          <Field label={c.s8.packLabel} value={c.s8.pack} />
        </div>

        {locale === "ar" && (
          <div className="mt-3 grid gap-2.5">
            <a
              href="tel:01288543614"
              className="flex min-h-[60px] items-center gap-3 rounded-[1.35rem] border-2 border-white bg-white px-4 shadow-[0_10px_30px_rgba(14,75,159,0.07)] active:scale-[0.985]"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: BLUE + "14" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5L17 13l4 1.5v3a2.5 2.5 0 0 1-2.7 2.5C10.4 19.4 4.6 13.6 4 5.7A2.5 2.5 0 0 1 6.5 3Z"
                    stroke={BLUE}
                    strokeWidth="1.9"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">{c.s8.supportLabel}</span>
                <span dir="ltr" className="block text-[15px] font-extrabold" style={{ color: INK, textAlign: rtl ? "right" : "left" }}>
                  01288543614
                </span>
              </span>
            </a>
            <a
              href="tel:01005005064"
              className="flex min-h-[60px] items-center gap-3 rounded-[1.35rem] border-2 border-white bg-white px-4 shadow-[0_10px_30px_rgba(14,75,159,0.07)] active:scale-[0.985]"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: ORANGE + "14" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M3.5 20.5 5 16.4A8.2 8.2 0 1 1 8.1 19.4L3.5 20.5Z"
                    stroke={ORANGE}
                    strokeWidth="1.9"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">{c.s8.salesLabel}</span>
                <span dir="ltr" className="block text-[15px] font-extrabold" style={{ color: INK, textAlign: rtl ? "right" : "left" }}>
                  01005005064
                </span>
              </span>
            </a>
          </div>
        )}

        <div className="mt-5 grid gap-2.5">
          <a
            href={brochureHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[56px] items-center justify-center rounded-full px-6 text-[15px] font-bold text-white shadow-[0_14px_30px_rgba(241,71,35,0.3)] active:scale-[0.985]"
            style={{ backgroundColor: ORANGE }}
          >
            {c.s8.ctaBrochure}
          </a>
          <Link
            href={productHref}
            className="flex min-h-[56px] items-center justify-center rounded-full border-[3px] px-6 text-[15px] font-bold active:scale-[0.985]"
            style={{ borderColor: BLUE, color: BLUE }}
          >
            {c.s8.ctaPrimary}
          </Link>
        </div>
      </section>

      {/* --------------------------------------------- STICKY ACTION BAR */}
      <div
        className={
          "pointer-events-none fixed inset-x-0 bottom-0 z-40 transition-transform duration-300 " +
          (barVisible ? "translate-y-0" : "translate-y-[140%]")
        }
      >
        <div className="pointer-events-auto mx-3 mb-3 flex gap-2 rounded-[1.5rem] border border-white/60 bg-white/85 p-2 shadow-[0_12px_40px_rgba(10,42,87,0.18)] backdrop-blur-xl">
          <a
            href={brochureHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[52px] flex-1 items-center justify-center rounded-[1.1rem] px-3 text-center text-[13px] font-bold leading-4 text-white active:scale-[0.985]"
            style={{ backgroundColor: ORANGE }}
          >
            {c.s8.ctaBrochure}
          </a>
          <Link
            href={contactHref}
            className="flex min-h-[52px] flex-1 items-center justify-center rounded-[1.1rem] border-2 px-3 text-center text-[13px] font-bold leading-4 active:scale-[0.985]"
            style={{ borderColor: BLUE, color: BLUE }}
          >
            {c.hero.ctaSecondary}
          </Link>
        </div>
      </div>
    </div>
  );
}
