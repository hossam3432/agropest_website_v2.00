"use client";

import { useState } from "react";

const PETROL = "#0B4B67";
const ORANGE = "#F07728";
const CYAN = "#3FC8E4";
const GREEN = "#2B9646";
const YELLOW = "#F2CE1B";

function BrandCheck({ size = 40, className }: { size?: number; className?: string }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <path d="M6 26 L17 42 L44 8 L40 5 L17 32 L10 23 Z" fill={CYAN} transform="translate(-1.5 1.5)" />
      <path d="M6 26 L17 42 L44 8 L40 5 L17 32 L10 23 Z" fill={ORANGE} />
    </svg>
  );
}

/* Footer sachet — the whole square is a toggle between 20g and 40g on tap/click */
export default function SachetVisual() {
  const [big, setBig] = useState(false);

  return (
    <div className="relative w-56 self-center sm:w-64 lg:self-start" dir="ltr">
      <div aria-hidden="true" className="absolute -inset-2 translate-x-3 translate-y-3" style={{ backgroundColor: GREEN }} />
      <button
        type="button"
        onClick={() => setBig((v) => !v)}
        aria-label="Toggle sachet weight between 20 grams and 40 grams"
        className="relative flex aspect-[4/5] w-full flex-col justify-between p-5 text-start transition-transform duration-200 active:scale-[0.97]"
        style={{ backgroundColor: YELLOW }}
      >
        <div>
          <p className="text-2xl font-extrabold tracking-tight" style={{ color: PETROL }}>
            LASIX
          </p>
          <p className="inline-block px-1.5 text-sm font-extrabold text-white" style={{ backgroundColor: ORANGE }}>
            70 WG
          </p>
        </div>
        <BrandCheck size={64} className="self-center" />
        <div className="flex items-end justify-between">
          <span
            className="px-2 py-1 text-xs font-extrabold text-white transition-colors duration-200"
            style={{ backgroundColor: PETROL }}
          >
            {big ? "40 GRAM" : "20 GRAM"}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: PETROL }}>
            Insecticide
          </span>
        </div>
      </button>
    </div>
  );
}
