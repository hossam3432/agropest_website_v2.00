"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/* ————————————————————————————————————————————————————————————————
   SIGNAL NPK — interactive composition matrix (client)
   Variant switcher: Balanced · High Phosphorus · High Potassium
   ———————————————————————————————————————————————————————————————— */

export type Variant = {
  id: string;
  name: string;
  tagline: string;
  npk: string;
  stage: string;
  color: string;
  soft: string;
  image: string;
  reg: string;
  macro: ReadonlyArray<{ symbol: string; label: string; value: string }>;
  focus: string;
};

export type MatrixLabels = {
  macroTitle: string;
  microTitle: string;
  microNote: string;
  organicTitle: string;
  organicValue: string;
  organicText: string;
  regLabel: string;
  wPercent: string;
  micro: ReadonlyArray<{ symbol: string; label: string; value: string }>;
};

const INK = "#17142D";

export default function CompositionMatrix({
  variants,
  labels,
  dir
}: {
  variants: ReadonlyArray<Variant>;
  labels: MatrixLabels;
  dir: "ltr" | "rtl";
}) {
  const [active, setActive] = useState(0);
  const v = variants[active];
  const detailRef = useRef<HTMLDivElement>(null);
  const userSelected = useRef(false);

  const select = (i: number) => {
    userSelected.current = true;
    setActive(i);
  };

  useEffect(() => {
    if (!userSelected.current) return;
    detailRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [active]);

  return (
    <div dir={dir}>
      {/* ————— variant switcher ————— */}
      <div
        role="tablist"
        aria-label="Signal NPK variants"
        className="grid gap-3 rounded-3xl border border-white/70 bg-white/50 p-3 shadow-lg shadow-slate-900/5 backdrop-blur-md sm:grid-cols-3"
      >
        {variants.map((item, i) => {
          const selected = i === active;
          return (
            <button
              key={item.id}
              role="tab"
              aria-selected={selected}
              onClick={() => select(i)}
              className="group relative overflow-hidden rounded-2xl p-5 text-start transition-all duration-300"
              style={{
                backgroundColor: selected ? item.soft : "transparent",
                boxShadow: selected ? `inset 0 0 0 1.5px ${item.color}, 0 12px 32px -12px ${item.color}66` : "inset 0 0 0 1px transparent"
              }}
            >
              {/* radiating dot */}
              <span className="absolute end-4 top-4 flex h-3 w-3 items-center justify-center" aria-hidden="true">
                <span
                  className={`absolute inline-flex h-full w-full rounded-full ${selected ? "animate-ping" : ""}`}
                  style={{ backgroundColor: item.color, opacity: selected ? 0.4 : 0 }}
                />
                <span
                  className="relative inline-flex h-2 w-2 rounded-full transition-colors"
                  style={{ backgroundColor: selected ? item.color : INK + "26" }}
                />
              </span>
              <span
                className="block text-[10px] font-bold uppercase tracking-[0.18em] transition-colors"
                style={{ color: selected ? item.color : INK + "73" }}
              >
                {item.tagline}
              </span>
              <span className="mt-1.5 block text-lg font-extrabold tracking-tight" style={{ color: INK }}>
                {item.name}
              </span>
              <span
                className="mt-0.5 block font-mono text-2xl font-bold tabular-nums tracking-tight transition-colors"
                style={{ color: selected ? item.color : INK + "4D" }}
                dir="ltr"
              >
                {item.npk}
              </span>
            </button>
          );
        })}
      </div>

      {/* ————— active variant detail ————— */}
      <div ref={detailRef} key={v.id} className="sg-fade-up mt-5 grid scroll-mt-32 gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        {/* pack visual */}
        <div
          className="relative overflow-hidden rounded-3xl border border-white/70 p-8 shadow-xl shadow-slate-900/5 backdrop-blur-md"
          style={{ background: `linear-gradient(160deg, ${v.soft} 0%, #ffffffcc 55%, ${v.soft} 100%)` }}
        >
          {/* radiating rings behind the pack */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <div className="relative aspect-square w-56 sm:w-80 md:w-[420px]" style={{ color: v.color }}>
              <span className="sg-ring" />
              <span className="sg-ring" style={{ animationDelay: "1.6s" }} />
              <span className="sg-ring" style={{ animationDelay: "3.2s" }} />
            </div>
          </div>
          <div className="relative flex flex-col items-center">
            <Image
              src={v.image}
              alt={`Signal NPK ${v.npk} — ${v.name}`}
              width={640}
              height={640}
              sizes="(min-width: 640px) 360px, 280px"
              className="sg-float h-64 w-auto object-contain drop-shadow-2xl sm:h-80"
              priority={false}
            />
            <p className="mt-6 max-w-sm text-center text-sm leading-relaxed sm:text-base" style={{ color: INK + "B3" }}>
              {v.focus}
            </p>
            <div
              className="mt-5 rounded-full border px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em]"
              style={{ borderColor: v.color + "40", backgroundColor: "#ffffff99", color: v.color }}
            >
              {labels.regLabel}: <span dir="ltr">{v.reg}</span>
            </div>
          </div>
        </div>

        {/* data panels */}
        <div className="flex flex-col gap-5">
          {/* macro trio */}
          <div className="rounded-3xl border border-white/70 bg-white/60 p-6 shadow-lg shadow-slate-900/5 backdrop-blur-md sm:p-7">
            <h3 className="text-xs font-extrabold uppercase tracking-[0.18em]" style={{ color: v.color }}>
              {labels.macroTitle}
            </h3>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {v.macro.map((m) => (
                <div
                  key={m.symbol}
                  className="rounded-2xl border p-4 text-center transition-colors duration-300"
                  style={{ borderColor: v.color + "26", backgroundColor: v.soft + "80" }}
                >
                  <p className="font-mono text-[11px] font-bold uppercase tracking-widest" style={{ color: INK + "73" }} dir="ltr">
                    {m.symbol}
                  </p>
                  <p className="mt-1 font-mono text-3xl font-bold tabular-nums sm:text-4xl" style={{ color: m.value === "0" ? INK + "40" : v.color }} dir="ltr">
                    {m.value}
                  </p>
                  <p className="mt-1 text-[11px] font-semibold leading-tight" style={{ color: INK + "80" }}>
                    {m.label} · {labels.wPercent}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* micro deck */}
          <div className="rounded-3xl border border-white/70 bg-white/60 p-6 shadow-lg shadow-slate-900/5 backdrop-blur-md sm:p-7">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-xs font-extrabold uppercase tracking-[0.18em]" style={{ color: INK }}>
                {labels.microTitle}
              </h3>
              <p className="text-[11px] font-semibold" style={{ color: INK + "73" }}>
                {labels.microNote}
              </p>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2.5 sm:grid-cols-6">
              {labels.micro.map((m) => (
                <div key={m.symbol} className="rounded-2xl border border-slate-200/70 bg-white/70 p-3 text-center">
                  <p className="font-mono text-sm font-extrabold" style={{ color: v.color }} dir="ltr">
                    {m.symbol}
                  </p>
                  <p className="mt-0.5 font-mono text-xs font-bold tabular-nums" style={{ color: INK }} dir="ltr">
                    {m.value}
                  </p>
                  <p className="mt-0.5 text-[10px] font-semibold leading-tight" style={{ color: INK + "73" }}>
                    {m.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* organic catalyst */}
          <div
            className="flex items-start gap-5 rounded-3xl border p-6 shadow-lg shadow-slate-900/5 backdrop-blur-md sm:p-7"
            style={{ borderColor: v.color + "40", backgroundColor: v.soft + "B3" }}
          >
            <span
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-lg font-extrabold text-white shadow-lg transition-colors duration-300"
              style={{ backgroundColor: v.color, boxShadow: `0 12px 28px -10px ${v.color}` }}
              dir="ltr"
            >
              {labels.organicValue}
            </span>
            <div>
              <h3 className="text-base font-extrabold tracking-tight" style={{ color: INK }}>
                {labels.organicTitle}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed" style={{ color: INK + "B3" }}>
                {labels.organicText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
