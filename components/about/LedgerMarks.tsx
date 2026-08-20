"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

/**
 * Marks for the About ledger. Each one is drawn *from* the figure beside it — the ruler
 * carries one tick per year, the grid one unit per product, the delta one line per
 * supplier — so the drawing is a reading of the number, not decoration next to it.
 *
 * Every mark sits on the same BASELINE and inside the same band, so the five read as one
 * row rather than five loose diagrams. Geometry runs left-to-right and is mirrored under
 * RTL by the wrapper, so the marks are read in the direction of the text above them.
 *
 * The markup always renders; only the entrance is gated on `active`, driven by variants
 * from the root svg so the whole row costs one observer rather than one per element.
 */

const VIEW_W = 120;
const VIEW_H = 44;
const BASELINE = 34;
const BAND_TOP = 8;
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* The marks are drawn in 1–2.5px strokes on a light band. Full #D99227 reads at
   2.6:1 there and the hairlines disappear; goldInk is the same hue carried down
   to 5.9:1. The substrate rules are navy at low alpha for the same reason —
   white at 24% was legible only because the ground used to be navy. */
const GOLD = "#7E5111";
const SUBSTRATE = "rgba(23,50,77,0.20)";

type MarkProps = {
  /** The figure the mark is drawn from. */
  count: number;
  /** Entrance delay so the row resolves in reading order. */
  delay?: number;
  /** Whether the ledger has been scrolled into view. */
  active: boolean;
};

type PlainMarkProps = Omit<MarkProps, "count">;

function draw(delay: number, duration = 0.7): Variants {
  return {
    hidden: { pathLength: 0 },
    shown: { pathLength: 1, transition: { duration, ease: EASE, delay } }
  };
}

function fade(delay: number, duration = 0.3): Variants {
  return {
    hidden: { opacity: 0 },
    shown: { opacity: 1, transition: { duration, ease: EASE, delay } }
  };
}

function pop(delay: number, duration = 0.42): Variants {
  return {
    hidden: { scale: 0 },
    shown: { scale: 1, transition: { duration, ease: EASE, delay } }
  };
}

function Svg({ children, active, flip = true }: { children: ReactNode; active: boolean; flip?: boolean }) {
  const still = Boolean(useReducedMotion());

  return (
    <motion.svg
      aria-hidden="true"
      focusable="false"
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      className={`h-9 w-[7rem] overflow-visible sm:h-11 sm:w-[7.5rem] ${flip ? "rtl:-scale-x-100" : ""}`}
      fill="none"
      initial={still ? false : "hidden"}
      animate={still || active ? "shown" : "hidden"}
    >
      {children}
    </motion.svg>
  );
}

/** Founding year — the origin tick of the timeline the next mark measures. */
export function SinceMark({ delay = 0, active }: PlainMarkProps) {
  // Inset so the origin cap clears the column divider once the mark is mirrored in RTL.
  const left = 9;
  const right = VIEW_W - 4;
  const ticks = 12;
  const step = (right - left) / (ticks - 1);

  return (
    <Svg active={active}>
      <motion.line
        x1={left}
        y1={BASELINE}
        x2={right}
        y2={BASELINE}
        stroke={SUBSTRATE}
        strokeWidth={1}
        strokeLinecap="round"
        variants={draw(delay)}
      />
      {Array.from({ length: ticks - 1 }, (_, i) => {
        const x = left + step * (i + 1);
        return (
          <motion.line
            key={x}
            x1={x}
            y1={BASELINE - 7}
            x2={x}
            y2={BASELINE}
            stroke={SUBSTRATE}
            strokeWidth={1}
            strokeLinecap="round"
            variants={fade(delay + 0.3 + i * 0.03)}
          />
        );
      })}
      <motion.line
        x1={left}
        y1={BAND_TOP + 4}
        x2={left}
        y2={BASELINE}
        stroke={GOLD}
        strokeWidth={2.5}
        strokeLinecap="round"
        variants={draw(delay + 0.2, 0.5)}
      />
      <motion.rect
        x={left - 4}
        y={BAND_TOP - 4}
        width={9}
        height={9}
        fill={GOLD}
        style={{ transformOrigin: `${left + 0.5}px ${BAND_TOP + 0.5}px` }}
        variants={pop(delay + 0.45)}
      />
    </Svg>
  );
}

/** Years traded — one tick per year, every fifth one taller. */
export function YearsMark({ count, delay = 0, active }: MarkProps) {
  const ticks = Math.max(count, 1);
  const left = 4;
  const right = VIEW_W - 4;
  const step = ticks > 1 ? (right - left) / (ticks - 1) : 0;

  return (
    <Svg active={active}>
      <line x1={left} y1={BASELINE} x2={right} y2={BASELINE} stroke={SUBSTRATE} strokeWidth={1} strokeLinecap="round" />
      {Array.from({ length: ticks }, (_, i) => {
        const x = left + step * i;
        const major = i % 5 === 0 || i === ticks - 1;
        return (
          <motion.line
            key={i}
            x1={x}
            y1={BASELINE - (major ? BASELINE - BAND_TOP : 11)}
            x2={x}
            y2={BASELINE}
            stroke={GOLD}
            strokeWidth={major ? 1.4 : 1}
            strokeLinecap="round"
            style={{ transformOrigin: `${x}px ${BASELINE}px` }}
            variants={{
              hidden: { scaleY: 0, opacity: 0 },
              shown: {
                scaleY: 1,
                opacity: major ? 1 : 0.6,
                transition: { duration: 0.45, ease: EASE, delay: delay + i * 0.012 }
              }
            }}
          />
        );
      })}
    </Svg>
  );
}

/** Portfolio size — one unit per product, five to a row, standing on the baseline. */
export function PortfolioMark({ count, delay = 0, active }: MarkProps) {
  const units = Math.max(count, 1);
  const perRow = 5;
  const rows = Math.ceil(units / perRow);
  const w = 7;
  const h = 7;
  const gapX = 6;
  const gapY = 4;
  const gridW = perRow * w + (perRow - 1) * gapX;
  const gridH = rows * h + (rows - 1) * gapY;
  const originX = (VIEW_W - gridW) / 2;
  const originY = BASELINE - gridH;

  return (
    <Svg active={active} flip={false}>
      <line x1={4} y1={BASELINE} x2={VIEW_W - 4} y2={BASELINE} stroke={SUBSTRATE} strokeWidth={1} strokeLinecap="round" />
      {Array.from({ length: units }, (_, i) => {
        const col = i % perRow;
        const row = Math.floor(i / perRow);
        const x = originX + col * (w + gapX);
        const y = originY + row * (h + gapY);
        return (
          <motion.g
            key={i}
            variants={{
              hidden: { opacity: 0, y: -4 },
              shown: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE, delay: delay + i * 0.03 } }
            }}
          >
            <rect x={x} y={y + 1.5} width={w} height={h - 1.5} stroke={GOLD} strokeWidth={1.2} />
            <line x1={x + 2} y1={y} x2={x + w - 2} y2={y} stroke={GOLD} strokeWidth={1.2} strokeLinecap="round" />
          </motion.g>
        );
      })}
    </Svg>
  );
}

/** Suppliers — one inbound line per source, converging on a single point of entry. */
export function SuppliersMark({ count, delay = 0, active }: MarkProps) {
  const lines = Math.max(count, 1);
  const startX = 4;
  const nodeX = VIEW_W - 20;
  const nodeY = (BAND_TOP + BASELINE) / 2;
  const spread = (BASELINE - BAND_TOP) / 2;

  return (
    <Svg active={active}>
      {Array.from({ length: lines }, (_, i) => {
        const offset = lines > 1 ? (i / (lines - 1) - 0.5) * 2 * spread : 0;
        const y = nodeY + offset;
        const d = `M ${startX} ${y} C ${startX + 34} ${y} ${nodeX - 34} ${nodeY} ${nodeX} ${nodeY}`;
        return (
          <motion.path
            key={i}
            d={d}
            stroke={GOLD}
            strokeWidth={1.3}
            strokeLinecap="round"
            variants={draw(delay + i * 0.1, 0.75)}
          />
        );
      })}
      <motion.rect
        x={nodeX - 5}
        y={nodeY - 5}
        width={10}
        height={10}
        fill={GOLD}
        style={{ transformOrigin: `${nodeX}px ${nodeY}px` }}
        variants={pop(delay + 0.6, 0.45)}
      />
    </Svg>
  );
}

/** Base of operations — a marker placed on the road it sits on. */
export function PlaceMark({ delay = 0, active }: PlainMarkProps) {
  const roadTop = BASELINE - 8;
  const pinX = 74;

  return (
    <Svg active={active}>
      {[roadTop, BASELINE].map((y, i) => (
        <motion.line
          key={y}
          x1={4}
          y1={y}
          x2={VIEW_W - 4}
          y2={y}
          stroke={SUBSTRATE}
          strokeWidth={1}
          strokeLinecap="round"
          variants={draw(delay + i * 0.08)}
        />
      ))}
      <motion.line
        x1={8}
        y1={roadTop + 4}
        x2={VIEW_W - 8}
        y2={roadTop + 4}
        stroke={SUBSTRATE}
        strokeWidth={1}
        strokeDasharray="5 6"
        strokeLinecap="round"
        variants={draw(delay + 0.2, 0.8)}
      />
      <motion.g
        variants={{
          hidden: { opacity: 0, y: -8 },
          shown: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE, delay: delay + 0.45 } }
        }}
      >
        <path
          d={`M ${pinX} ${roadTop} C ${pinX - 8} ${roadTop - 8} ${pinX - 8} ${BAND_TOP} ${pinX} ${BAND_TOP} C ${
            pinX + 8
          } ${BAND_TOP} ${pinX + 8} ${roadTop - 8} ${pinX} ${roadTop} Z`}
          stroke={GOLD}
          strokeWidth={1.5}
          strokeLinejoin="round"
        />
        <circle cx={pinX} cy={BAND_TOP + 6} r={2.6} fill={GOLD} />
      </motion.g>
    </Svg>
  );
}
