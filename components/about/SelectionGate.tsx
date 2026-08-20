"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { ClearedIcon } from "@/components/about/icons";
import { localizeHref, type Locale } from "@/lib/content";

const premiumEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

type SelectionGateProps = {
  locale: Locale;
  title: string;
  subtitle: string;
  intro: string;
  items: string[];
  stepLabel: string;
  progressLabel: string;
  outcomeTitle: string;
  outcomeLink: string;
  outcomeHref: string;
  outcomeDetail: string;
};

type GateStepProps = {
  index: number;
  question: string;
  stepLabel: string;
  forceOpen: boolean;
};

function GateStep({ index, question, stepLabel, forceOpen }: GateStepProps) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.75 });
  const open = forceOpen || inView;
  const number = String(index + 1).padStart(2, "0");

  return (
    <li ref={ref} className="gate-step relative grid grid-cols-[var(--gate-node)_1fr] items-start gap-4 sm:gap-6">
      <motion.div
        aria-hidden="true"
        className={`relative z-10 flex h-[var(--gate-node)] w-[var(--gate-node)] items-center justify-center rounded-md border text-sm font-bold transition-colors duration-500 ease-out ${
          open ? "border-agri-gold bg-agri-gold text-agri-blue" : "border-white/25 bg-agri-blue text-white/40"
        }`}
        initial={false}
        animate={{ scale: open ? 1 : 0.92 }}
        transition={{ duration: 0.5, ease: premiumEase }}
      >
        {number}
      </motion.div>

      <motion.div
        className={`min-w-0 rounded-md border p-4 transition-colors duration-500 ease-out sm:p-5 ${
          open ? "border-agri-gold/45 bg-white/[0.07]" : "border-white/12 bg-white/[0.03]"
        }`}
        initial={false}
        animate={{ opacity: open ? 1 : 0.85, y: open ? 0 : 8 }}
        transition={{ duration: 0.6, ease: premiumEase }}
      >
        <p className="text-[0.6875rem] font-bold uppercase text-agri-gold/85 sm:text-xs">
          {stepLabel} {number}
        </p>
        {/* An unreached step is signalled by its node, border, and panel tint — never by
            making its text hard to read. The dimmed state still clears 4.5:1 on navy. */}
        <p
          className={`mt-2 text-base leading-8 transition-colors duration-500 ease-out sm:text-[1.0625rem] ${
            open ? "text-white" : "text-white/75"
          }`}
        >
          {question}
        </p>
      </motion.div>
    </li>
  );
}

export function SelectionGate({
  locale,
  title,
  subtitle,
  intro,
  items,
  stepLabel,
  progressLabel,
  outcomeTitle,
  outcomeLink,
  outcomeHref,
  outcomeDetail
}: SelectionGateProps) {
  const reducedMotion = useReducedMotion();
  const railRef = useRef<HTMLDivElement>(null);
  const outcomeRef = useRef<HTMLDivElement>(null);
  const outcomeInView = useInView(outcomeRef, { once: true, amount: 0.6 });

  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 72%", "end 72%"]
  });
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 28, mass: 0.35 });

  const outcomeOpen = reducedMotion || outcomeInView;

  // No overflow-hidden on the section: it would silently disable the sticky heading below.
  return (
    <section className="selection-gate relative bg-agri-blue py-16 text-white sm:py-24">
      <div className="container-shell relative grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <h2 className="text-2xl font-bold leading-[1.25] tracking-normal sm:text-4xl">{title}</h2>
          <p className="mt-4 text-lg font-semibold leading-8 text-white/85">{subtitle}</p>
          <p className="mt-5 leading-8 text-white/70">{intro}</p>

          <div className="mt-8 hidden items-center gap-4 lg:flex">
            <span className="text-[0.6875rem] font-bold uppercase text-white/45">{progressLabel}</span>
            <span aria-hidden="true" className="relative h-px flex-1 bg-white/15">
              <motion.span
                className="absolute inset-y-0 start-0 block w-full origin-[left_center] bg-agri-gold rtl:origin-[right_center]"
                style={reducedMotion ? { scaleX: 1 } : { scaleX: progress }}
              />
            </span>
          </div>
        </div>

        <div>
          <div ref={railRef} className="gate-rail relative">
            <span
              aria-hidden="true"
              className="absolute top-[var(--gate-node-half)] bottom-[var(--gate-node-half)] start-[var(--gate-rail-x)] w-px bg-white/15"
            />
            <motion.span
              aria-hidden="true"
              className="absolute top-[var(--gate-node-half)] bottom-[var(--gate-node-half)] start-[var(--gate-rail-x)] block w-px origin-top bg-agri-gold"
              style={reducedMotion ? { scaleY: 1 } : { scaleY: progress }}
            />

            <ol className="relative grid gap-4 sm:gap-5">
              {items.map((question, index) => (
                <GateStep
                  key={question}
                  index={index}
                  question={question}
                  stepLabel={stepLabel}
                  forceOpen={Boolean(reducedMotion)}
                />
              ))}
            </ol>
          </div>

          <div
            ref={outcomeRef}
            className="gate-outcome relative mt-4 grid grid-cols-[var(--gate-node)_1fr] items-start gap-4 sm:mt-5 sm:gap-6"
          >
            {/* Connector from the last question down to the outcome node's centre —
                it stops at the node, it does not run past it, and it carries the same
                gold as the rail above so the line reads as one continuous run. */}
            <motion.span
              aria-hidden="true"
              className="absolute top-[calc(var(--gate-node)*-1)] h-[calc(var(--gate-node)*1.5)] start-[var(--gate-rail-x)] w-px origin-top bg-agri-gold"
              initial={false}
              animate={{ scaleY: outcomeOpen ? 1 : 0 }}
              transition={{ duration: 0.55, ease: premiumEase }}
            />
            <motion.div
              aria-hidden="true"
              className={`relative z-10 flex h-[var(--gate-node)] w-[var(--gate-node)] items-center justify-center rounded-md border transition-colors duration-500 ease-out ${
                outcomeOpen ? "border-agri-gold bg-agri-gold text-agri-blue" : "border-white/25 bg-agri-blue text-white/40"
              }`}
              initial={false}
              animate={{ scale: outcomeOpen ? 1 : 0.92 }}
              transition={{ duration: 0.5, ease: premiumEase }}
            >
              <ClearedIcon className="h-6 w-6 sm:h-7 sm:w-7" />
            </motion.div>

            <div className="min-w-0 rounded-md border border-agri-gold/45 bg-agri-green/25 p-5 sm:p-6">
              <p className="text-lg font-bold leading-8 text-white sm:text-xl">{outcomeTitle}</p>
              <p className="mt-2 leading-7 text-white/70">{outcomeDetail}</p>
              <Link href={localizeHref(locale, outcomeHref)} className="btn-on-dark-outline mt-5">
                {outcomeLink}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
