"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { RevealItem, StaggerContainer } from "@/components/animations";
import { RivalDuoSectionKicker } from "@/components/RivalDuoSectionKicker";
import { RivalDuoFit } from "@/components/RivalDuoFit";

const BLUE = "#0E4B9F";
const ORANGE = "#F14723";
const INK = "#0A2A57";
const premiumEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

export type RivalDuoTimingStage = {
  day: string;
  label: string;
  text: string;
  advice: string;
  note?: string;
  highlighted?: boolean;
};

type RivalDuoTimingSectionProps = {
  kicker: string;
  title: string;
  imageSrc: string;
  imageAlt?: string;
  rtl: boolean;
  stages: readonly RivalDuoTimingStage[];
  timingTitle: string;
};

export function RivalDuoTimingSection({ kicker, title, imageSrc, imageAlt, rtl, stages, timingTitle }: RivalDuoTimingSectionProps) {
  const defaultIndex = Math.max(
    0,
    stages.findIndex((stage) => stage.highlighted)
  );
  const [active, setActive] = useState(defaultIndex);
  const reducedMotion = useReducedMotion();

  const containerRef = useRef<HTMLDivElement>(null);
  const imageBoxRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [linePath, setLinePath] = useState("");
  const [prevPath, setPrevPath] = useState("");
  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(null);
  const [glowXOffsets, setGlowXOffsets] = useState<number[]>([0, 0, 0, 0]);

  const activeStage = stages[active];
  const n = stages.length;
  // Anchor X as a fraction of the actual image width, at the root of each stage.
  // RTL: image is mirrored, so Day 0 (seed) is on the far right.
  const stageAnchorsRTL = [0.89, 0.68, 0.47, 0.17];
  const stageAnchorsLTR = [0.11, 0.32, 0.53, 0.825];
  // Per-stage X offset as % of image width (responsive to screen size).
  const stageXOffsetsPct = [0.01, 0.025, 0.05, 0.05];
  // Per-stage X offset for glow as % of image width.
  const stageGlowXOffsetsPct = [-0.01, 0.07, 0.1, 0.07];
  // Y offset for lines as % of image height.
  const startYOffsetPct = -0.2;

  useEffect(() => {
    function recompute() {
      const container = containerRef.current;
      const img = imageRef.current;
      if (!container || !img) return;

      const containerRect = container.getBoundingClientRect();
      const imgRect = img.getBoundingClientRect();

      // RivalDuoFit scales this section with a transform, so getBoundingClientRect
      // reports visual px while the offsets below are applied as layout px. Divide
      // the scale back out, or every offset shrinks as the section does — which
      // drifts the glow away from the plants once the screen gets narrow enough
      // for the section to be scaled down at all.
      const fit = img.offsetWidth ? imgRect.width / img.offsetWidth : 1;
      const imgWidth = imgRect.width / fit;
      const imgHeight = imgRect.height / fit;

      // Kept in sync at every width, not just desktop — otherwise shrinking the
      // window past the breakpoint leaves the last desktop offsets applied.
      setGlowXOffsets(stageGlowXOffsetsPct.map((pct) => imgWidth * pct));

      const card = cardRefs.current[active];
      if (!card || window.innerWidth < 1024) {
        setLinePath("");
        setStartPoint(null);
        return;
      }
      const cardRect = card.getBoundingClientRect();

      // Where the image actually sits inside the master container (accounts for
      // the object-contain letterbox whitespace in the padded white box).
      const relativeImgLeft = (imgRect.left - containerRect.left) / fit;
      const relativeImgBottom = (imgRect.bottom - containerRect.top) / fit;

      const anchors = rtl ? stageAnchorsRTL : stageAnchorsLTR;
      const anchor = anchors[active] ?? 0.5;

      // Start: beneath the roots of the active plant stage, just above the soil edge.
      const xOffsetPx = imgWidth * (stageXOffsetsPct[active] ?? 0);
      const yOffsetPx = imgHeight * startYOffsetPct;
      const startX = relativeImgLeft + imgWidth * anchor + xOffsetPx;
      const startY = relativeImgBottom - 10 + yOffsetPx;

      // End: top-center of the active card.
      const endX = (cardRect.left - containerRect.left) / fit + cardRect.width / fit / 2;
      const endY = (cardRect.top - containerRect.top) / fit;

      const midY = (startY + endY) / 2;
      const newPath = `M ${startX} ${startY} C ${startX} ${midY}, ${endX} ${midY}, ${endX} ${endY}`;

      setPrevPath(linePath);
      setLinePath(newPath);
      setStartPoint({ x: startX, y: startY });
    }
    recompute();
    const settleId = window.setTimeout(recompute, 300);

    // "resize" fires before the image has reflowed, so measuring straight from it
    // reads the previous width and leaves the glow offset stale — the drift that
    // shows up as the window gets narrower. Re-measure once layout has settled.
    let frameId = 0;
    let trailingId = 0;
    function scheduleRecompute() {
      recompute();
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(() => window.requestAnimationFrame(recompute));
      window.clearTimeout(trailingId);
      trailingId = window.setTimeout(recompute, 200);
    }
    window.addEventListener("resize", scheduleRecompute);

    // Covers the resizes that never touch the window: RivalDuoFit rescaling the
    // section, and the image finishing loading.
    const observer = new ResizeObserver(scheduleRecompute);
    if (imageRef.current) observer.observe(imageRef.current);
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", scheduleRecompute);
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(trailingId);
      window.clearTimeout(settleId);
    };
  }, [active, rtl, n, linePath]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const cards = Array.from(scroller.querySelectorAll<HTMLElement>("[data-index]"));
    const observer = new IntersectionObserver(
      (entries) => {
        let best: { index: number; ratio: number } | null = null;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-index"));
            if (!best || entry.intersectionRatio > best.ratio) {
              best = { index: idx, ratio: entry.intersectionRatio };
            }
          }
        }
        if (best) setActive(best.index);
      },
      { root: scroller, threshold: [0.6, 0.75, 0.9], rootMargin: "0px -30% 0px -30%" }
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [n]);

  function selectMobile(index: number) {
    setActive(index);
    const scroller = scrollerRef.current;
    const card = scroller?.querySelector<HTMLElement>(`[data-index="${index}"]`);
    card?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }

  function cardVisual(stage: RivalDuoTimingStage, isActive: boolean) {
    return {
      className:
        "flex flex-col h-[150px] w-full rounded-[1.25rem] border-2 p-3 text-start transition-all duration-300 " +
        (isActive ? "shadow-[0_18px_45px_rgba(14,75,159,0.18)]" : "border-slate-100 bg-white hover:border-slate-200"),
      style: isActive
        ? { borderColor: stage.highlighted ? ORANGE : BLUE, backgroundColor: stage.highlighted ? "#FFF6F3" : "#EEF4FF" }
        : undefined
    };
  }

  return (
    <section className="relative flex h-[calc(100svh-5rem)] snap-start items-center overflow-hidden px-4 py-6 sm:px-6 lg:px-8">
      <RivalDuoFit>
      <motion.div
        className="container-shell w-full"
        initial={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: reducedMotion ? 0 : 0.85, ease: premiumEase }}
      >
        <RivalDuoSectionKicker>{kicker}</RivalDuoSectionKicker>
        <h2 className="mt-4 max-w-4xl text-3xl font-extrabold leading-[1.15]" style={{ color: INK }}>
          {title}
        </h2>

        <div ref={containerRef} className="relative mt-3 w-full">
          <motion.div
            ref={imageBoxRef}
            className="relative mx-auto w-fit max-w-full overflow-hidden rounded-[1.75rem] bg-white p-2 shadow-[0_20px_60px_rgba(14,75,159,0.10)] sm:p-3"
            initial={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: reducedMotion ? 0 : 0.9, ease: premiumEase, delay: reducedMotion ? 0 : 0.1 }}
          >
            <img
              ref={imageRef}
              src={imageSrc}
              alt={imageAlt ?? ""}
              onLoad={() => window.dispatchEvent(new Event("resize"))}
              className="mx-auto block h-auto max-h-[clamp(200px,34vh,460px)] w-auto max-w-full object-contain lg:max-h-[clamp(260px,46vh,560px)]"
              style={{ transform: rtl ? "scaleX(-1)" : undefined }}
            />
            {stages.map((stage, i) => {
              const effIndex = rtl ? n - 1 - i : i;
              const widthPct = 100 / n;
              return (
                <div
                  key={stage.day}
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 transition-opacity duration-[400ms] ease-in-out"
                  style={{
                    left: `calc(${effIndex * widthPct}% + ${glowXOffsets[i] ?? 0}px)`,
                    width: `${widthPct}%`,
                    opacity: active === i ? 1 : 0,
                    background: `radial-gradient(ellipse 60% 50% at center, ${(stage.highlighted ? ORANGE : BLUE)}66 0%, ${(stage.highlighted ? ORANGE : BLUE)}33 50%, transparent 80%)`
                  }}
                />
              );
            })}
          </motion.div>

          {!reducedMotion && linePath && (
            <svg className="pointer-events-none absolute left-0 top-0 z-10 hidden h-full w-full lg:block" width="100%" height="100%" aria-hidden="true">
              <defs>
                <filter id="rival-line-glow" x="-150%" y="-150%" width="400%" height="400%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              {prevPath && (
                <motion.path
                  d={prevPath}
                  fill="none"
                  stroke={activeStage.highlighted ? ORANGE : BLUE}
                  strokeWidth={5}
                  strokeLinecap="round"
                  strokeDasharray="7 7"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                />
              )}
              <motion.path
                key={active}
                d={linePath}
                fill="none"
                stroke={activeStage.highlighted ? ORANGE : BLUE}
                strokeWidth={2.5}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
              {startPoint && (
                <motion.circle
                  key={`dot-${active}`}
                  cx={startPoint.x}
                  cy={startPoint.y}
                  r={8}
                  fill="none"
                  stroke={activeStage.highlighted ? ORANGE : BLUE}
                  strokeWidth={2}
                  filter="url(#rival-line-glow)"
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={{ opacity: [0.55, 1, 0.55], scale: 1 }}
                  transition={{
                    opacity: { duration: 2, ease: "easeInOut", repeat: Infinity },
                    scale: { duration: 0.45, ease: "easeOut" }
                  }}
                  style={{ transformOrigin: `${startPoint.x}px ${startPoint.y}px` }}
                />
              )}
            </svg>
          )}

          <StaggerContainer className="relative z-20 mt-3 hidden gap-2 lg:grid lg:grid-cols-4" amount={0.2}>
            {stages.map((stage, i) => {
              const isActive = active === i;
              const visual = cardVisual(stage, isActive);
              return (
                <RevealItem key={stage.day}>
                  <button
                    ref={(el) => {
                      cardRefs.current[i] = el;
                    }}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={isActive}
                    className={visual.className}
                    style={visual.style}
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.12em]" style={{ color: isActive && stage.highlighted ? ORANGE : BLUE }}>
                      {stage.day}
                    </p>
                    <p className="mt-1 text-base font-extrabold" style={{ color: INK }}>
                      {stage.label}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-600">{stage.text}</p>
                  </button>
                </RevealItem>
              );
            })}
          </StaggerContainer>

          <div
            ref={scrollerRef}
            className="relative z-20 mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto px-[14%] pb-1 lg:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {stages.map((stage, i) => {
              const isActive = active === i;
              const visual = cardVisual(stage, isActive);
              return (
                <button
                  key={stage.day}
                  data-index={i}
                  type="button"
                  onClick={() => selectMobile(i)}
                  aria-pressed={isActive}
                  className={"w-[72%] flex-shrink-0 snap-center " + visual.className}
                  style={visual.style}
                >
                  <p className="text-xs font-bold uppercase tracking-[0.12em]" style={{ color: isActive && stage.highlighted ? ORANGE : BLUE }}>
                    {stage.day}
                  </p>
                  <p className="mt-1 text-base font-extrabold" style={{ color: INK }}>
                    {stage.label}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-600">{stage.text}</p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div className="rounded-[1.25rem] border-2 border-slate-100 bg-white p-3">
            <p className="text-xs font-bold uppercase tracking-[0.12em]" style={{ color: BLUE }}>
              {timingTitle} · {activeStage.day}
            </p>
            <AnimatePresence mode="wait">
              <motion.p
                key={active}
                initial={{ opacity: reducedMotion ? 1 : 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="mt-1 text-sm leading-6 text-slate-600"
              >
                {activeStage.advice}
              </motion.p>
            </AnimatePresence>
          </div>
          <AnimatePresence mode="wait">
            {activeStage.note && (
              <motion.div
                key={active}
                initial={{ opacity: reducedMotion ? 1 : 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="rounded-[1.25rem] border-2 p-3"
                style={{ borderColor: ORANGE + "55", backgroundColor: "#FFF6F3" }}
              >
                <p className="text-sm leading-6 text-slate-700">{activeStage.note}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
      </RivalDuoFit>
    </section>
  );
}
