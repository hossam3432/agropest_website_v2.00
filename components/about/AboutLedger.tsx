"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
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
 * Welded to the base of the hero: the facts a distributor is actually checking. Each
 * figure is drawn as well as written — the mark above it is built from the number
 * itself, so the count is legible before the label is read.
 */
export function AboutLedger({ locale, entries }: AboutLedgerProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });

  return (
    <section
      ref={ref}
      className="about-ledger relative bg-agri-blue"
      aria-label={locale === "ar" ? "بيانات الشركة" : "Company record"}
    >
      <div className="container-shell border-t border-white/12 py-9 sm:py-11">
        {/* Fixed columns rather than flex-wrap: English labels are long enough to wrap
            the row, and a wrapped item would drag its inline-start divider to the head
            of the next line. Equal columns keep every rule where it belongs. */}
        <ul className="grid grid-cols-2 gap-x-6 gap-y-9 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-0">
          {entries.map((entry, index) => (
            <li
              key={entry.label}
              className={`min-w-0 lg:px-6 ${index === 0 ? "lg:ps-0" : "lg:border-s lg:border-white/15"}`}
            >
              <div className="flex h-9 items-end sm:h-11">
                <Mark kind={entry.mark} count={entry.count ?? 0} delay={index * 0.12} active={inView} />
              </div>
              <span className="about-ledger-value mt-4 block text-lg font-bold leading-tight text-white sm:text-xl">
                {entry.value}
              </span>
              <span className="mt-1 block text-[0.8125rem] leading-6 text-white/65 sm:text-sm">{entry.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
