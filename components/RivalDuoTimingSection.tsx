"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { StaggerContainer } from "@/components/animations";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { RivalDuoSectionKicker } from "@/components/RivalDuoSectionKicker";

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
  const [active, setActive] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const reducedMotion = useReducedMotion();

  function selectCard(index: number) {
    setActive(index);
    setHasInteracted(true);
  }

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
  // Per-stage X offset for glow as % of image width, tuned against the RTL
  // (mirrored) image. The band index is already mirrored via effIndex, so in LTR
  // the offset has to flip sign too or it pushes the glow the wrong way.
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
    const settleId = window.setTimeout(recompute, 550);

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
    setHasInteracted(true);
    const scroller = scrollerRef.current;
    const card = scroller?.querySelector<HTMLElement>(`[data-index="${index}"]`);
    card?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }

  function cardVisual(stage: RivalDuoTimingStage, isActive: boolean, index: number) {
    return {
      className:
        "flex flex-col h-[150px] w-full rounded-lg border-2 p-3 text-start transition-all duration-300 xl:h-[180px] xl:p-4 " +
        (isActive ? "shadow-[0_18px_45px_rgba(14,75,159,0.18)]" : "border-slate-100 bg-white hover:border-slate-200") +
        (index === 0 && !hasInteracted ? " animate-pulse" : ""),
      style: isActive
        ? { borderColor: stage.highlighted ? ORANGE : BLUE, backgroundColor: stage.highlighted ? "#FFF6F3" : "#EEF4FF" }
        : undefined
    };
  }

  // Desktop accordion: the active stage folds open to take most of the row
  // (bigger label/body text, sized to match the composition cards above),
  // the rest collapse to a narrow tab showing only day + label. Sizing
  // (grow/basis) is set inline on the wrapper — the actual flex item in the
  // row — since Tailwind's arbitrary grow-[n] utilities lose the cascade to
  // the plain "grow" utility here; inline style always wins. The button
  // just fills its wrapper.
  function accordionCardVisual(stage: RivalDuoTimingStage, isActive: boolean, index: number) {
    return {
      // minWidth moved to a breakpoint class on the wrapper: a single px value
      // that keeps the label readable at lg wastes room at 2xl, and vice versa.
      itemStyle: { flexGrow: isActive ? 5 : 1, flexBasis: 0 },
      className:
        "flex w-full min-h-0 flex-col rounded-lg border-2 text-start transition-all duration-500 " +
        // Active scrolls rather than clips: on a short laptop the 40% share can be
        // less than the longest stage's text needs, and a centred overflow would
        // cut off the top and bottom of it.
        (isActive
          ? "justify-center overflow-y-auto p-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden 2xl:p-5"
          : "justify-center overflow-hidden p-3 hover:border-slate-200 xl:p-4") +
        (isActive ? " shadow-[0_18px_45px_rgba(14,75,159,0.18)]" : " border-slate-100 bg-white") +
        (index === 0 && !hasInteracted ? " animate-pulse" : ""),
      style: isActive
        ? { borderColor: stage.highlighted ? ORANGE : BLUE, backgroundColor: stage.highlighted ? "#FFF6F3" : "#EEF4FF" }
        : undefined
    };
  }

  return (
    // No RivalDuoFit here: the stack below divides the panel with flex instead of
    // overflowing and being scaled back down. That scaler only ever shrinks and
    // never recovers, which is what made the section decay with every click.
    // pt clears the fixed header, which overlays the top of every panel.
    <section className="relative flex h-svh snap-start items-center overflow-hidden px-4 pb-6 pt-24 sm:px-6 sm:pt-28 lg:px-8">
      <motion.div
        className="container-shell flex h-full w-full flex-col lg:mx-auto lg:max-w-6xl xl:max-w-[76rem] 2xl:max-w-[84rem]"
        initial={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: reducedMotion ? 0 : 0.85, ease: premiumEase }}
      >
        {/* lg+: a 2x2 grid — titles in the narrow start column, image in the wide
            one, cards merged across the bottom row. Below lg it degrades to the
            same single column stack as before (titles, image, card scroller).
            Rows are 3fr/2fr so the image keeps the same 60/40 share of the panel. */}
        <div
          ref={containerRef}
          className="relative flex w-full flex-1 flex-col gap-3 lg:grid lg:min-h-0 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:grid-rows-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-4 xl:grid-cols-[minmax(0,23rem)_minmax(0,1fr)]"
        >
          <div className="flex flex-col justify-center lg:min-h-0">
            <div>
              <RivalDuoSectionKicker>{kicker}</RivalDuoSectionKicker>
            </div>
            <h2
              className="mt-3 max-w-4xl text-2xl font-extrabold leading-[1.2] lg:text-[1.6rem] xl:text-[1.85rem] 2xl:text-[2.1rem]"
              style={{ color: INK }}
            >
              {title}
            </h2>
          </div>

          <div className="flex items-center justify-center lg:min-h-0">
          <motion.div
            ref={imageBoxRef}
            className="relative mx-auto flex w-fit max-w-full items-center overflow-hidden rounded-lg bg-white p-2 shadow-[0_20px_60px_rgba(14,75,159,0.10)] sm:p-3 [&_picture]:contents"
            initial={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: reducedMotion ? 0 : 0.9, ease: premiumEase, delay: reducedMotion ? 0 : 0.1 }}
          >
            {/* The cap is in viewport units, not `max-h-full`: the white box hugs
                the image on both axes (so the glow bands, which are a % of the box
                width, stay aligned to the plants), which leaves it auto-height —
                and a percentage max-height against an auto-height parent resolves
                to none. So the cap reconstructs the top row by hand: the panel
                height less its 8.5rem of padding and the 1rem row gap, times the
                3:2 row ratio.

                The 40px trailing subtraction covers the white box's own padding
                plus slack: 100svh is not always the panel's real height (browser UI
                bands can leave it a few px larger), and 0.6 of that error lands
                straight on this cap — so it buys enough margin that the image can
                never spill past its row. */}
            <ResponsiveImage
              ref={imageRef}
              src={imageSrc}
              alt={imageAlt ?? ""}
              objectFit="contain"
              sizes="(min-width: 1536px) 1400px, (min-width: 1280px) 1150px, (min-width: 1024px) 950px, 460px"
              onLoad={() => window.dispatchEvent(new Event("resize"))}
              className="mx-auto block h-auto max-h-[clamp(200px,34vh,460px)] w-auto max-w-full object-contain lg:max-h-[calc((100svh_-_9.5rem)_*_0.6_-_40px)]"
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
                    left: `calc(${effIndex * widthPct}% + ${(rtl ? 1 : -1) * (glowXOffsets[i] ?? 0)}px)`,
                    width: `${widthPct}%`,
                    opacity: active === i ? 1 : 0,
                    background: `radial-gradient(ellipse 60% 50% at center, ${(stage.highlighted ? ORANGE : BLUE)}66 0%, ${(stage.highlighted ? ORANGE : BLUE)}33 50%, transparent 80%)`
                  }}
                />
              );
            })}
          </motion.div>
          </div>

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

          {/* The merged bottom row. A grid track rather than a fixed height, so the
              open card's text differing per stage can no longer change the section's
              total height — that fluctuation is what used to ratchet the old
              fit-scaler down a notch it never gave back on every click. */}
          <StaggerContainer className="relative z-20 hidden items-stretch gap-3 lg:flex lg:min-h-0 lg:col-span-2" amount={0.2}>
            {stages.map((stage, i) => {
              const isActive = active === i;
              const visual = accordionCardVisual(stage, isActive, i);
              return (
                // Sizing (flexGrow) lives on this plain div, applied directly by
                // React's own DOM renderer. Framer Motion's own render loop owns
                // the `style` prop on `motion.*` elements and doesn't reliably
                // re-diff plain passthrough props like flexGrow on every render —
                // keeping it off any motion element avoids that desync.
                <div
                  key={stage.day}
                  className="flex min-w-0 transition-[flex-grow] duration-500 ease-out lg:min-w-[8rem] xl:min-w-[9.5rem] 2xl:min-w-[10.5rem]"
                  style={visual.itemStyle}
                >
                  <motion.div
                    className="flex w-full min-w-0 items-stretch"
                    variants={{
                      hidden: { opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 16 },
                      visible: { opacity: 1, y: 0, transition: { duration: reducedMotion ? 0 : 0.72, ease: premiumEase } }
                    }}
                  >
                  <button
                    ref={(el) => {
                      cardRefs.current[i] = el;
                    }}
                    type="button"
                    onClick={() => selectCard(i)}
                    aria-pressed={isActive}
                    aria-label={`${stage.day} — ${stage.label}`}
                    className={visual.className}
                    style={visual.style}
                  >
                    <p
                      className={
                        "font-bold uppercase tracking-[0.12em] transition-all duration-500 " +
                        (isActive ? "text-xs sm:text-sm 2xl:text-base" : "text-[11px] xl:text-xs")
                      }
                      style={{ color: isActive && stage.highlighted ? ORANGE : BLUE }}
                    >
                      {stage.day}
                    </p>
                    <p
                      className={
                        "font-extrabold transition-all duration-500 " +
                        // Collapsed tabs wrap to two lines instead of truncating:
                        // a stage name clipped mid-word ("اكتمال المجموع الخض…")
                        // makes three of the four stages unreadable at a glance.
                        (isActive
                          ? "mt-2 text-lg sm:text-xl 2xl:text-2xl"
                          : "mt-1.5 line-clamp-2 text-[13px] leading-snug xl:text-sm")
                      }
                      style={{ color: INK }}
                    >
                      {stage.label}
                    </p>
                    {isActive && (
                      <motion.div
                        key={`card-body-${active}`}
                        initial={{ opacity: reducedMotion ? 1 : 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.35, delay: reducedMotion ? 0 : 0.15 }}
                      >
                        <p className="mt-2 text-sm leading-6 text-slate-600 2xl:text-base 2xl:leading-7">{stage.text}</p>
                        {/* Advice + note live inside the open card on desktop: the
                            section is locked to one viewport panel, so a separate
                            row below would cost height that RivalDuoFit then takes
                            back out of everything by scaling the section down. */}
                        <p className="mt-2 text-sm leading-6 text-slate-700 2xl:text-base 2xl:leading-7">
                          <span className="font-bold" style={{ color: stage.highlighted ? ORANGE : BLUE }}>
                            {timingTitle}:{" "}
                          </span>
                          {stage.advice}
                        </p>
                        {stage.note && (
                          <p className="mt-2 text-xs leading-5 2xl:text-sm 2xl:leading-6" style={{ color: ORANGE }}>
                            {stage.note}
                          </p>
                        )}
                      </motion.div>
                    )}
                  </button>
                  </motion.div>
                </div>
              );
            })}
          </StaggerContainer>

          <div
            ref={scrollerRef}
            className="relative z-20 mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto px-[14%] pb-1 lg:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {stages.map((stage, i) => {
              const isActive = active === i;
              const visual = cardVisual(stage, isActive, i);
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

        {/* Mobile only — on desktop this content is folded into the open card. */}
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:hidden">
          <div className="rounded-lg border-2 border-slate-100 bg-white p-3">
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
                className="rounded-lg border-2 p-3"
                style={{ borderColor: ORANGE + "55", backgroundColor: "#FFF6F3" }}
              >
                <p className="text-sm leading-6 text-slate-700">{activeStage.note}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
