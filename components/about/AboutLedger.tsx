"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { PlaceMark, PortfolioMark, SinceMark, SuppliersMark, YearsMark } from "@/components/about/LedgerMarks";
import type { Locale } from "@/lib/content";

export type LedgerMarkKind = "since" | "years" | "portfolio" | "suppliers" | "place";

export type LedgerEntry = {
  value: string;
  label: string;
  mark: LedgerMarkKind;
  /** The figure the mark is drawn from; omitted for marks that carry no count. */
  count?: number;
};

type AboutLedgerProps = {
  locale: Locale;
  entries: LedgerEntry[];
};

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function Mark({ kind, count, delay, active }: { kind: LedgerMarkKind; count: number; delay: number; active: boolean }) {
  switch (kind) {
    case "since":
      return <SinceMark delay={delay} active={active} />;
    case "years":
      return <YearsMark count={count} delay={delay} active={active} />;
    case "portfolio":
      return <PortfolioMark count={count} delay={delay} active={active} />;
    case "suppliers":
      return <SuppliersMark count={count} delay={delay} active={active} />;
    case "place":
      return <PlaceMark delay={delay} active={active} />;
  }
}

/**
 * Figures count up as their mark draws itself, so the number and the drawing land
 * together. Non-numeric values (a place name) are left alone.
 */
function LedgerValue({ value, delay, active }: { value: string; delay: number; active: boolean }) {
  const target = Number(value);
  const numeric = value.trim() !== "" && Number.isFinite(target);
  const still = Boolean(useReducedMotion());
  // Seeded with the real figure so the server-rendered markup carries the number, then
  // wound back to zero on mount — the count-up is below the fold, so the reset is never
  // seen, and a reader without JS still gets the figure.
  const progress = useMotionValue(target);
  const text = useTransform(progress, (current) => String(Math.round(current)));

  useEffect(() => {
    // A backgrounded tab has no animation frames, so winding back there would leave a
    // zero on screen with nothing to move it. Only reset where the count can actually run.
    if (!numeric || still || document.visibilityState !== "visible") return;
    progress.set(0);
  }, [numeric, progress, still]);

  useEffect(() => {
    if (!numeric || still || !active) return;
    const controls = animate(progress, target, { duration: 1.15, delay, ease: EASE });
    return () => controls.stop();
  }, [active, delay, numeric, progress, still, target]);

  if (!numeric) return <>{value}</>;

  return <motion.span>{text}</motion.span>;
}

/**
 * The facts a distributor is actually checking, read after the heritage passage that
 * makes the case for them. Each figure is drawn as well as written — the mark above it
 * is built from the number itself, so the count is legible before the label is read.
 */
export function AboutLedger({ locale, entries }: AboutLedgerProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });

  return (
    <section
      ref={ref}
      className="about-ledger field-bloom relative"
      aria-label={locale === "ar" ? "بيانات الشركة" : "Company record"}
    >
      <div className="container-shell py-12 sm:py-16">
        {/* Fixed columns rather than flex-wrap: English labels are long enough to wrap
            the row, and a wrapped item would drag its inline-start divider to the head
            of the next line. Equal columns keep every rule where it belongs. */}
        <ul className="grid grid-cols-2 gap-x-6 gap-y-12 sm:gap-x-8 lg:grid-cols-4 lg:gap-x-0">
          {entries.map((entry, index) => (
            <motion.li
              key={entry.label}
              className={`group min-w-0 lg:px-8 ${index === 0 ? "lg:ps-0" : "lg:border-s lg:border-agri-line"}`}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 0.6, ease: EASE, delay: index * 0.12 }}
            >
              <div className="flex h-16 origin-bottom items-end transition-transform duration-500 ease-out group-hover:scale-[1.06] sm:h-20">
                <Mark kind={entry.mark} count={entry.count ?? 0} delay={index * 0.12} active={inView} />
              </div>
              <span className="about-ledger-value mt-5 block text-3xl font-bold leading-none text-agri-blue sm:text-4xl lg:text-5xl">
                <LedgerValue value={entry.value} delay={index * 0.12} active={inView} />
              </span>
              <span className="mt-3 block text-sm leading-6 text-slate-600 sm:text-base">{entry.label}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
