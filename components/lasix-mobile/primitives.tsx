"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { tone } from "./tokens";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** The double checkmark, orange over a cyan offset — the brand's core motif.
    Drawn rather than loaded wherever it appears at small sizes. */
export function BrandCheck({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <path d="M6 26 L17 42 L44 8 L40 5 L17 32 L10 23 Z" fill={tone.cyan} transform="translate(-1.5 1.5)" />
      <path d="M6 26 L17 42 L44 8 L40 5 L17 32 L10 23 Z" fill={tone.orange} />
    </svg>
  );
}

/** A solid block on the white grid. The gutter around it is the leaflet's
    white line, so blocks never carry borders, radii or shadows of their own. */
export function Block({
  id,
  fill,
  className = "",
  children
}: {
  id?: string;
  fill?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={"p-6 lg:p-9 " + className} style={fill ? { backgroundColor: fill } : undefined}>
      {children}
    </section>
  );
}

/** Section heading. The leaflet names each section on its own marked line, so
    the label is set as a marked rule rather than as a floating eyebrow. */
export function Heading({
  label,
  title,
  onDark = false
}: {
  label: string;
  title: string;
  onDark?: boolean;
}) {
  return (
    <header>
      {/* The rule keeps the brand orange; the label does not. Orange is 2.5:1
          on cream, which is fine for a graphic mark and not for type. */}
      <p
        className="flex items-center gap-2.5 text-[11px] font-extrabold uppercase tracking-[0.14em] lg:text-[12px]"
        style={{ color: onDark ? "rgba(255,255,255,0.88)" : tone.petrol }}
      >
        <span aria-hidden="true" className="h-[3px] w-7 lg:w-10" style={{ backgroundColor: onDark ? tone.cyan : tone.orange }} />
        {label}
      </p>
      <h2
        className="mt-4 text-[27px] font-extrabold leading-[1.24] lg:mt-5 lg:text-[36px]"
        style={{ color: onDark ? "#FFFFFF" : tone.petrol, textWrap: "balance" }}
      >
        {title}
      </h2>
    </header>
  );
}

function Chevron({ open, color }: { open: boolean; color: string }) {
  return (
    <span
      aria-hidden="true"
      className="flex h-9 w-9 shrink-0 items-center justify-center transition-colors duration-300 lg:h-11 lg:w-11"
      style={{ backgroundColor: open ? color : "rgba(11,75,103,0.06)" }}
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className={"transition-transform duration-300 lg:h-[18px] lg:w-[18px] " + (open ? "rotate-180" : "")}>
        <path d="M6 9 L12 15 L18 9" stroke={open ? "#FFFFFF" : color} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

/** Keeps the leaflet's dense technical copy off the screen until asked for.
    Nothing is removed — the full text is always in the document. */
export function Disclosure({
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
    <div className="overflow-hidden bg-white transition-colors duration-300" style={{ boxShadow: open ? `inset 0 0 0 2px ${accent}` : "inset 0 0 0 1px rgba(11,75,103,0.14)" }}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex min-h-[64px] w-full items-center gap-3 px-4 py-3.5 text-start transition-colors duration-200 focus-visible:outline-none active:bg-[#FDFAF7] lg:min-h-[72px] lg:gap-4 lg:px-6 lg:py-4 lg:hover:bg-[#FDFAF7]"
        style={{ outlineColor: accent }}
      >
        <span className="min-w-0 flex-1">{header}</span>
        <Chevron open={open} color={accent} />
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="body"
            initial={{ height: 0 }}
            animate={{ height: "auto", transition: { duration: reducedMotion ? 0.12 : 0.34, ease } }}
            exit={{ height: 0, transition: { duration: reducedMotion ? 0.1 : 0.22, ease } }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 lg:px-6 lg:pb-6">{children}</div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

/** Clamps long body copy behind a full-width tap target, and only when the copy
    actually overflows. */
export function ReadMore({
  text,
  labels,
  onDark = false
}: {
  text: string;
  labels: { more: string; less: string };
  onDark?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [clamped, setClamped] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    function measure() {
      const el = ref.current;
      if (!el || open) return;
      setClamped(el.scrollHeight - el.clientHeight > 1);
    }
    measure();
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => window.removeEventListener("resize", measure);
  }, [open, text]);

  const accent = onDark ? tone.cyanInk : tone.petrol;

  return (
    <div>
      <p
        ref={ref}
        className={"text-[15px] leading-[1.9] lg:text-[16px] " + (onDark ? "text-white/90" : "text-slate-600") + (open ? "" : " line-clamp-4")}
      >
        {text}
      </p>
      {clamped ? (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="mt-1 inline-flex min-h-[44px] items-center gap-1.5 text-sm font-bold"
          style={{ color: accent }}
        >
          {open ? labels.less : labels.more}
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={"transition-transform duration-300 " + (open ? "rotate-180" : "")}>
            <path d="M6 9 L12 15 L18 9" stroke={accent} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      ) : null}
    </div>
  );
}
