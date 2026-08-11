"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { IBM_Plex_Mono } from "next/font/google";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import MechanismSection from "./_MechanismSection";
import type { Locale, SignalNpkContent } from "./page";

/* ————————————————————————————————————————————————————————————————
   SIGNAL NPK — dedicated mobile-first landing (client)
   Sticky section tabs · horizontal variant switcher · accordion ·
   read-more expanders · sticky action bar. Built standalone from the
   desktop tree — shares only brand colour, fonts and the page-level
   keyframes <style> block injected by page.tsx.
   ———————————————————————————————————————————————————————————————— */

const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], display: "swap" });

const GREEN = "#008D36";
const INK = "#17142D";
const MINT = "#3fbf6e";

const ui = {
  en: { more: "Read more", less: "Show less" },
  ar: { more: "اقرأ المزيد", less: "عرض أقل" }
} as const;

/* ---------------------------------------------------------------- helpers */

function reducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "start" });
}

/** Keeps the active chip centred in a horizontal strip; relative scrollBy stays correct under RTL. */
function centerInStrip(strip: HTMLElement | null, selector: string) {
  const chip = strip?.querySelector<HTMLElement>(selector);
  if (!strip || !chip) return;
  const stripRect = strip.getBoundingClientRect();
  const chipRect = chip.getBoundingClientRect();
  const delta = chipRect.left + chipRect.width / 2 - (stripRect.left + stripRect.width / 2);
  if (Math.abs(delta) < 1) return;
  strip.scrollBy({ left: delta, behavior: reducedMotion() ? "auto" : "smooth" });
}

/* ---------------------------------------------------------------- primitives */

function SignalMark({ size = 36, color = GREEN }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path
        d="M32 6c-4.5 6.5-5.8 13.2-4 20.4C24 21 18.6 17.6 11.6 16.6c1 8.4 5.6 14.8 13.6 18.8h13.6c8-4 12.6-10.4 13.6-18.8-7 1-12.4 4.4-16.4 9.8 1.8-7.2.5-13.9-4-20.4Z"
        fill={color}
      />
      <path d="M20 44c3.4-2.7 7.4-4 12-4s8.6 1.3 12 4" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M25 52c2.1-1.6 4.4-2.4 7-2.4s4.9.8 7 2.4" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="32" cy="59" r="2.6" fill={color} />
    </svg>
  );
}

function RadiatingRings({
  className = "",
  color = GREEN,
  rings = 3,
  duration = 4.8
}: {
  className?: string;
  color?: string;
  rings?: number;
  duration?: number;
}) {
  return (
    <div className={`pointer-events-none absolute ${className}`} style={{ color }} aria-hidden="true">
      {Array.from({ length: rings }).map((_, i) => (
        <span key={i} className="sg-ring" style={{ animationDelay: `${(i * duration) / rings}s` }} />
      ))}
    </div>
  );
}

function SectionHead({ index, title, dark = false }: { index: string; title: string; dark?: boolean }) {
  return (
    <div>
      <span
        className={`${mono.className} inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[10px] font-medium tracking-[0.2em] ${
          dark ? "border-white/15 bg-white/5 text-[#3fbf6e]" : "border-[#008D36]/20 bg-white/70 text-[#008D36]"
        }`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
        {index}
      </span>
      <h2 className={`mt-3.5 text-[26px] font-black leading-[1.32] tracking-tight ${dark ? "text-white" : "text-[#17142D]"}`}>
        {title}
      </h2>
    </div>
  );
}

/** Clamps a section intro to 4 lines behind a full-width tap target. Text is never removed, only folded. */
function ReadMore({ text, dark = false, labels }: { text: string; dark?: boolean; labels: { more: string; less: string } }) {
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
    <div className="mt-3">
      <p
        ref={textRef}
        className={`text-[15px] leading-8 ${open ? "" : "line-clamp-4"} ${dark ? "text-white/65" : "text-slate-600"}`}
      >
        {text}
      </p>
      {clamped ? (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className={`mt-1 inline-flex min-h-[44px] items-center gap-1.5 text-sm font-bold ${dark ? "text-[#3fbf6e]" : "text-[#008D36]"}`}
        >
          {open ? labels.less : labels.more}
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          >
            <path d="M6 9 L12 15 L18 9" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      ) : null}
    </div>
  );
}

function Chevron({ open, color }: { open: boolean; color: string }) {
  return (
    <span
      aria-hidden="true"
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors duration-300"
      style={{ backgroundColor: open ? color : color + "14" }}
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        className={`transition-transform duration-300 motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
      >
        <path d="M6 9 L12 15 L18 9" stroke={open ? "#FFFFFF" : color} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

/** Pure-CSS accordion (grid-template-rows 0fr→1fr) — no animation dependency needed. */
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
  return (
    <div
      className="overflow-hidden rounded-[1.5rem] border bg-white transition-colors duration-300"
      style={{ borderColor: open ? accent : "#E7EEE9", boxShadow: open ? `0 16px 36px ${accent}1F` : "none" }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex min-h-[64px] w-full items-center gap-3 px-4 py-3.5 text-start active:bg-slate-50"
      >
        <span className="min-w-0 flex-1">{header}</span>
        <Chevron open={open} color={accent} />
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="px-4 pb-4">{children}</div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- the page */

export default function MobileLanding({ t, locale }: { t: SignalNpkContent; locale: Locale }) {
  const labels = ui[locale];
  const variants = t.matrix.variants;
  const ml = t.matrix.labels;

  const sections = [
    { id: "m-matrix", label: t.nav[0].label },
    { id: "m-mechanism", label: t.nav[1].label },
    { id: "m-usage", label: t.nav[2].label },
    { id: "m-supply", label: t.nav[3].label }
  ];

  const [activeSection, setActiveSection] = useState(sections[0].id);
  const [activeVariant, setActiveVariant] = useState(0);
  const [microOpen, setMicroOpen] = useState(true);

  const tabStripRef = useRef<HTMLDivElement>(null);
  const variantStripRef = useRef<HTMLDivElement>(null);
  const variantDetailRef = useRef<HTMLDivElement>(null);
  const variantUserSelected = useRef(false);

  const v = variants[activeVariant];

  // Scroll-spy: pick the deepest section whose top has crossed the line just
  // under the sticky tab strip. offsetParent is null while this tree is
  // display:none (desktop viewport), which skips the work entirely.
  useEffect(() => {
    const ids = sections.map((s) => s.id);
    let frame = 0;

    function update() {
      frame = 0;
      if (!tabStripRef.current?.offsetParent) return;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 150) current = id;
      }
      setActiveSection(current);
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
    centerInStrip(tabStripRef.current, `[data-tab="${activeSection}"]`);
  }, [activeSection]);

  useEffect(() => {
    if (!variantUserSelected.current) return;
    variantDetailRef.current?.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "nearest" });
    centerInStrip(variantStripRef.current, `[data-variant="${activeVariant}"]`);
  }, [activeVariant]);

  function selectVariant(i: number) {
    variantUserSelected.current = true;
    setActiveVariant(i);
  }

  return (
    <div>
      {/* ---------------------------------------------------------- HERO */}
      <section className="relative overflow-hidden bg-[#F4F8F5] px-4 pb-10 pt-8">
        <RadiatingRings className="-end-24 -top-24 h-72 w-72 opacity-70" color={GREEN} rings={3} />

        <div className="relative flex items-center gap-2.5">
          <SignalMark size={26} />
          <span className="text-lg font-black tracking-tight" style={{ color: INK }}>
            {t.brand.name}
          </span>
          <span className={`${mono.className} text-[9px] tracking-[0.3em]`} style={{ color: GREEN }} dir="ltr">
            {t.brand.sub.replace(/سلسلة\s*/, "")}
          </span>
        </div>

        <p className={`${mono.className} relative mt-6 text-[11px] font-medium uppercase tracking-[0.24em]`} style={{ color: GREEN }}>
          {t.hero.kicker}
        </p>
        <h1 className="relative mt-3 text-[32px] font-black leading-[1.22] tracking-tight" style={{ color: INK }}>
          {t.hero.slogan[0]}
          <br />
          {t.hero.slogan[1]}
          <br />
          <span style={{ color: GREEN }}>{t.hero.slogan[2]}</span>
        </h1>
        <p className="relative mt-4 text-[15px] leading-8 text-slate-600">{t.hero.lead}</p>

        <div className="relative mx-auto mt-7 flex h-64 w-full max-w-xs items-center justify-center">
          <RadiatingRings className="inset-0 m-auto h-56 w-56" color={GREEN} rings={3} />
          <ResponsiveImage
            src="/images/products/signal-npk-20-20-20-product.png"
            alt={t.hero.packAlt}
            priority
            sizes="280px"
            className="sg-float-slow relative z-10 h-full w-auto object-contain drop-shadow-2xl"
            objectFit="contain"
          />
        </div>

        <div className="relative grid grid-cols-3 gap-2.5">
          {t.hero.badges.map((b) => (
            <div
              key={b.big}
              className="rounded-2xl border border-white bg-white/80 px-2.5 py-3 text-center shadow-sm shadow-slate-900/5 backdrop-blur-sm"
            >
              <span className={`${mono.className} block text-[13px] font-bold`} style={{ color: GREEN }}>
                {b.big}
              </span>
              <span className="mt-1 block text-[10px] font-semibold leading-tight text-slate-500">{b.small}</span>
            </div>
          ))}
        </div>

        <div className="relative mt-6 grid gap-2.5">
          <button
            type="button"
            onClick={() => scrollToId("m-matrix")}
            className="flex min-h-[56px] w-full items-center justify-center rounded-full px-6 text-[15px] font-bold text-white shadow-lg shadow-[#008D36]/30 active:scale-[0.985]"
            style={{ backgroundColor: GREEN }}
          >
            {t.hero.ctaPrimary}
          </button>
          <Link
            href={`/${locale}/contact`}
            className="flex min-h-[56px] w-full items-center justify-center rounded-full border-2 px-6 text-[15px] font-bold active:scale-[0.985]"
            style={{ borderColor: GREEN, color: GREEN }}
          >
            {t.hero.ctaSecondary}
          </Link>
        </div>
      </section>

      {/* ------------------------------------------------- STICKY TAB STRIP */}
      <div className="sticky top-[70px] z-30 px-4 py-1.5">
        <div className="overflow-hidden rounded-full border border-white/70 bg-white/70 shadow-lg shadow-slate-900/10 backdrop-blur-xl">
          <div
            ref={tabStripRef}
            role="tablist"
            aria-label={t.brand.name}
            className="flex gap-1.5 overflow-x-auto p-1.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {sections.map((s) => {
              const active = activeSection === s.id;
              return (
                <button
                  key={s.id}
                  data-tab={s.id}
                  role="tab"
                  type="button"
                  aria-selected={active}
                  onClick={() => scrollToId(s.id)}
                  className={`flex min-h-[44px] shrink-0 items-center whitespace-nowrap rounded-full px-4 text-[13px] font-bold transition-colors duration-300 ${
                    active ? "text-white" : "text-slate-500"
                  }`}
                  style={active ? { backgroundColor: GREEN } : undefined}
                >
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------- MATRIX */}
      <section id="m-matrix" className="relative scroll-mt-[130px] bg-[#F4F8F5] px-4 pb-14 pt-10">
        <SectionHead index={t.matrix.index} title={t.matrix.title} />
        <ReadMore text={t.matrix.intro} labels={labels} />

        {/* horizontal variant switcher */}
        <div
          ref={variantStripRef}
          role="tablist"
          aria-label="Signal NPK variants"
          className="mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {variants.map((item, i) => {
            const selected = i === activeVariant;
            return (
              <button
                key={item.id}
                data-variant={i}
                role="tab"
                aria-selected={selected}
                type="button"
                onClick={() => selectVariant(i)}
                className="min-h-[92px] w-[168px] shrink-0 snap-center rounded-[1.5rem] p-4 text-start transition-all duration-300"
                style={{
                  backgroundColor: selected ? item.soft : "#FFFFFF",
                  boxShadow: selected ? `inset 0 0 0 2px ${item.color}, 0 14px 30px -14px ${item.color}66` : "inset 0 0 0 1px #E7EEE9"
                }}
              >
                <span className="block text-[10px] font-bold uppercase tracking-[0.14em]" style={{ color: selected ? item.color : INK + "73" }}>
                  {item.tagline}
                </span>
                <span className="mt-1 block text-base font-extrabold leading-tight" style={{ color: INK }}>
                  {item.name}
                </span>
                <span
                  className={`${mono.className} mt-1 block text-xl font-bold tabular-nums`}
                  style={{ color: selected ? item.color : INK + "4D" }}
                  dir="ltr"
                >
                  {item.npk}
                </span>
              </button>
            );
          })}
        </div>

        {/* active variant detail */}
        <div key={v.id} ref={variantDetailRef} className="sg-fade-up mt-5 scroll-mt-[130px]">
          <div
            className="relative overflow-hidden rounded-[1.75rem] border border-white p-6"
            style={{ background: `linear-gradient(165deg, ${v.soft} 0%, #ffffff 60%)` }}
          >
            <RadiatingRings className="inset-0 m-auto h-48 w-48" color={v.color} rings={3} />
            <div className="relative flex flex-col items-center text-center">
              <span className="text-[10px] font-bold uppercase tracking-[0.14em]" style={{ color: v.color }}>
                {v.tagline}
              </span>
              <h3 className="mt-1 text-xl font-black tracking-tight" style={{ color: INK }}>
                {v.name} <span className={mono.className} dir="ltr">· {v.npk}</span>
              </h3>
              <p className="mt-1 text-xs font-semibold" style={{ color: INK + "80" }}>
                {v.stage}
              </p>

              <ResponsiveImage
                src={v.image}
                alt={`Signal NPK ${v.npk} — ${v.name}`}
                sizes="240px"
                className="sg-float mt-4 h-52 w-auto object-contain drop-shadow-2xl"
                objectFit="contain"
              />
              <p className="mt-5 text-sm leading-relaxed" style={{ color: INK + "B3" }}>
                {v.focus}
              </p>
              <div
                className="mt-4 rounded-full border px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em]"
                style={{ borderColor: v.color + "40", backgroundColor: "#ffffff99", color: v.color }}
              >
                {ml.regLabel}: <span dir="ltr">{v.reg}</span>
              </div>
            </div>
          </div>

          {/* macro trio */}
          <div className="mt-4 rounded-[1.5rem] border border-slate-100 bg-white p-5">
            <h3 className="text-xs font-extrabold uppercase tracking-[0.16em]" style={{ color: v.color }}>
              {ml.macroTitle}
            </h3>
            <div className="mt-4 grid grid-cols-3 gap-2.5">
              {v.macro.map((m) => (
                <div key={m.symbol} className="rounded-2xl border p-3 text-center" style={{ borderColor: v.color + "26", backgroundColor: v.soft + "80" }}>
                  <p className={`${mono.className} text-[10px] font-bold uppercase tracking-widest`} style={{ color: INK + "73" }} dir="ltr">
                    {m.symbol}
                  </p>
                  <p className={`${mono.className} mt-1 text-2xl font-bold tabular-nums`} style={{ color: m.value === "0" ? INK + "40" : v.color }} dir="ltr">
                    {m.value}
                  </p>
                  <p className="mt-1 text-[10px] font-semibold leading-tight" style={{ color: INK + "80" }}>
                    {m.label} · {ml.wPercent}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* organic catalyst */}
          <div className="mt-4 flex items-start gap-4 rounded-[1.5rem] border p-5" style={{ borderColor: v.color + "40", backgroundColor: v.soft + "B3" }}>
            <span
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-sm font-extrabold text-white"
              style={{ backgroundColor: v.color, boxShadow: `0 10px 24px -8px ${v.color}` }}
              dir="ltr"
            >
              {ml.organicValue}
            </span>
            <div>
              <h3 className="text-[15px] font-extrabold tracking-tight" style={{ color: INK }}>
                {ml.organicTitle}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed" style={{ color: INK + "B3" }}>
                {ml.organicText}
              </p>
            </div>
          </div>
        </div>

        {/* shared micro-deck — identical across variants, shown once */}
        <div className="mt-4">
          <Disclosure
            open={microOpen}
            onToggle={() => setMicroOpen((o) => !o)}
            accent={GREEN}
            header={
              <>
                <span className="block text-sm font-extrabold" style={{ color: INK }}>
                  {ml.microTitle}
                </span>
                <span className="mt-0.5 block text-[11px] font-semibold text-slate-400">{ml.microNote}</span>
              </>
            }
          >
            <div className="grid grid-cols-3 gap-2.5 border-t border-slate-100 pt-4">
              {ml.micro.map((m) => (
                <div key={m.symbol} className="rounded-2xl border border-slate-100 bg-[#F8FBF9] p-3 text-center">
                  <p className={`${mono.className} text-sm font-extrabold`} style={{ color: GREEN }} dir="ltr">
                    {m.symbol}
                  </p>
                  <p className={`${mono.className} mt-0.5 text-xs font-bold tabular-nums`} style={{ color: INK }} dir="ltr">
                    {m.value}
                  </p>
                  <p className="mt-0.5 text-[10px] font-semibold leading-tight" style={{ color: INK + "73" }}>
                    {m.label}
                  </p>
                </div>
              ))}
            </div>
          </Disclosure>
        </div>
      </section>

      {/* ---------------------------------------------------- MECHANISM */}
      <section id="m-mechanism" className="relative scroll-mt-[130px] px-4 py-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#17142D] px-5 py-10 text-white">
          <RadiatingRings className="-end-28 -top-28 h-80 w-80 opacity-50" color={MINT} rings={3} duration={6} />
          <div className="relative">
            <SectionHead dark index={t.mech.index} title={t.mech.title} />
            <ReadMore dark text={t.mech.intro} labels={labels} />
            <div className="mt-6">
              <MechanismSection mech={t.mech} dir={t.dir} />
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- USAGE */}
      <section id="m-usage" className="relative scroll-mt-[130px] bg-[#F4F8F5] px-4 pb-14 pt-10">
        <SectionHead index={t.usage.index} title={t.usage.title} />
        <p className="mt-3 text-[15px] leading-8 text-slate-600">{t.usage.intro}</p>

        <div className="mt-5 grid gap-4">
          {t.usage.cards.map((c) => (
            <div key={c.title} className="relative overflow-hidden rounded-[1.5rem] border border-white bg-white p-5 shadow-sm shadow-slate-900/5">
              <div
                className="pointer-events-none absolute -end-10 -top-10 h-32 w-32 rounded-full bg-[radial-gradient(closest-side,#008D3618,transparent)]"
                aria-hidden="true"
              />
              <h3 className="relative text-lg font-extrabold tracking-tight" style={{ color: INK }}>
                {c.title}
              </h3>
              <div className="relative mt-3 flex items-baseline gap-2.5">
                <span className={`${mono.className} text-5xl font-semibold tabular-nums tracking-tight`} style={{ color: GREEN }} dir="ltr">
                  {c.rate}
                </span>
                <span className={`${mono.className} text-[13px] text-slate-500`}>{c.unit}</span>
              </div>
              <p className="relative mt-3 text-sm leading-relaxed text-slate-600">{c.note}</p>
            </div>
          ))}
        </div>

        <div className="mt-7">
          <h3 className={`${mono.className} text-[11px] font-medium uppercase tracking-[0.22em] text-slate-400`}>{t.usage.timingHead}</h3>
          <div className="mt-3 grid gap-2.5">
            {t.usage.timing.map((row) => (
              <div key={row.stage + row.window} className="rounded-2xl border border-slate-100 bg-white p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="flex-1 text-[15px] font-bold" style={{ color: INK }}>
                    {row.stage}
                  </span>
                  <span className={`${mono.className} rounded-full px-3 py-1 text-xs font-semibold text-white`} style={{ backgroundColor: row.color }} dir="ltr">
                    {row.formula}
                  </span>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{row.window}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-7">
          <h3 className={`${mono.className} text-[11px] font-medium uppercase tracking-[0.22em] text-slate-400`}>{t.usage.practiceHead}</h3>
          <ol className="mt-3 space-y-3.5">
            {t.usage.practice.map((p, i) => (
              <li key={p} className="flex gap-3.5 rounded-2xl border border-slate-100 bg-white p-4">
                <span className={`${mono.className} text-xs font-semibold`} style={{ color: GREEN }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm leading-relaxed text-slate-600">{p}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* -------------------------------------------------------- SUPPLY */}
      <section id="m-supply" className="relative scroll-mt-[130px] px-4 pb-8 pt-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#17142D] px-5 py-10 text-center text-white">
          <RadiatingRings className="-bottom-32 -start-32 h-72 w-72 opacity-40" color={MINT} rings={3} duration={6} />

          <div className="relative flex flex-col items-center">
            <div className="flex items-center gap-2.5">
              <SignalMark size={26} color={MINT} />
              <span className="text-xl font-black tracking-tight">{t.brand.name}</span>
              <span className={`${mono.className} text-[10px] tracking-[0.3em]`} style={{ color: MINT }} dir="ltr">
                NPK
              </span>
            </div>
            <div className="mt-4">
              <SectionHead dark index={t.footer.index} title={t.footer.title} />
            </div>
          </div>

          <div className="relative mt-6 grid gap-3 text-start">
            {t.footer.cols.map((col) => (
              <div key={col.h} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className={`${mono.className} text-[10px] font-medium uppercase tracking-[0.18em] text-[#3fbf6e]`}>{col.h}</p>
                <div className="mt-2 space-y-0.5">
                  {col.lines.map((line) => (
                    <p key={line} className="text-sm leading-relaxed text-white/75">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="relative mt-5 text-start">
            <p className={`${mono.className} text-[10px] font-medium uppercase tracking-[0.18em] text-[#3fbf6e]`}>{t.footer.contactHead}</p>
            <div className="mt-2.5 grid gap-2">
              {t.footer.phones.map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  dir="ltr"
                  className="flex min-h-[52px] items-center rounded-2xl border border-white/10 bg-white/5 px-4 text-[15px] font-bold text-white active:bg-white/10"
                >
                  {phone}
                </a>
              ))}
              <a
                href={`mailto:${t.footer.email}`}
                dir="ltr"
                className="flex min-h-[52px] items-center rounded-2xl border border-white/10 bg-white/5 px-4 text-[15px] font-bold text-white active:bg-white/10"
              >
                {t.footer.email}
              </a>
              <a
                href={`https://${t.footer.site}`}
                target="_blank"
                rel="noopener noreferrer"
                dir="ltr"
                className="flex min-h-[52px] items-center rounded-2xl border border-white/10 bg-white/5 px-4 text-[15px] font-bold text-white active:bg-white/10"
              >
                {t.footer.site}
              </a>
            </div>
          </div>

          <Link
            href={`/${locale}/brochures`}
            className="relative mt-7 flex min-h-[56px] items-center justify-center rounded-full px-6 text-[15px] font-bold text-[#17142D] shadow-lg shadow-[#3fbf6e]/30 active:scale-[0.985]"
            style={{ backgroundColor: MINT }}
          >
            {t.footer.brochureCta}
          </Link>

          <p className="relative mt-6 text-[11px] leading-relaxed text-white/40">{t.footer.legal}</p>
        </div>
      </section>
    </div>
  );
}
