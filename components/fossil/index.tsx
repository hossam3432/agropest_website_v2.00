"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { localizeHref, type Locale } from "@/lib/content";
import type { FossilCopy } from "./content";
import { HeroSeam, IconBalance, IconFruit, IconReadiness, IconRoots, LeafOutline, WaveEdge, WaveThread } from "./shapes";
import { FOSSIL, WAVE } from "./tokens";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const TECHNICAL_SHEET = "/brochures/fossil-400-sl-technical-sheet.pdf";

const MECHANISM_ICONS = [IconRoots, IconBalance, IconReadiness, IconFruit];

type FossilLandingProps = {
  c: FossilCopy;
  locale: Locale;
};

export function FossilLanding({ c, locale }: FossilLandingProps) {
  const root = useRef<HTMLDivElement>(null);
  const [crop, setCrop] = useState(c.apply.crops[0].id);
  const activeCrop = c.apply.crops.find((entry) => entry.id === crop) ?? c.apply.crops[0];
  const isArabic = c.dir === "rtl";
  /* Arabic is a joined script: caps and tracking are Latin-only devices here. */
  const displayCase = isArabic ? "" : " uppercase";

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /* The one authored moment: the seam arrives. The wave is flat when the
           page lands and swells into the brand's own crest while the pack
           settles into it and the headline rises off it. Everything after this
           is the sea continuing to move — never a second entrance. */
        const hero = gsap.timeline({ defaults: { ease: "power3.out" } });
        hero
          .fromTo(".fossil-seam-fill", { attr: { d: WAVE.fillFlat } }, { attr: { d: WAVE.fill }, duration: 1.25, ease: "power2.inOut" }, 0)
          .fromTo(".fossil-crest-a", { attr: { d: WAVE.crestAFlat } }, { attr: { d: WAVE.crestA }, duration: 1.35, ease: "power2.inOut" }, 0.08)
          .fromTo(".fossil-crest-b", { attr: { d: WAVE.crestBFlat } }, { attr: { d: WAVE.crestB }, duration: 1.45, ease: "power2.inOut" }, 0.16)
          .from(".fossil-hero-lockup", { opacity: 0, y: 12, duration: 0.6 }, 0)
          .from(".fossil-hero-title", { opacity: 0, y: 30, duration: 0.9 }, 0.15)
          .from(".fossil-hero-lead", { opacity: 0, y: 18, duration: 0.7 }, 0.4)
          .from(".fossil-hero-action", { opacity: 0, y: 14, duration: 0.55, stagger: 0.08 }, 0.55)
          .from(".fossil-hero-bottle", { opacity: 0, y: 70, duration: 1.2 }, 0.2)
          .from(".fossil-hero-fact", { opacity: 0, y: 10, duration: 0.5, stagger: 0.07 }, 0.7);

        /* Ambient: every seam on the page drifts one full width, seamlessly,
           and stops while it is off screen. */
        const drifts = gsap.utils.toArray<SVGGElement>(".fossil-drift, .fossil-hero-drift").map((group) => {
          const tween = gsap.to(group, { x: -1440, duration: 30, ease: "none", repeat: -1 });
          ScrollTrigger.create({
            trigger: group.closest("svg") ?? group,
            start: "top bottom",
            end: "bottom top",
            onToggle: (self) => (self.isActive ? tween.play() : tween.pause())
          });
          return tween;
        });

        /* The crossing: the two halves of the formulation part at the seam. */
        gsap.to(".fossil-leaf-half", {
          y: -34,
          ease: "none",
          scrollTrigger: { trigger: ".fossil-crossing", start: "top bottom", end: "bottom top", scrub: 0.6 }
        });
        gsap.to(".fossil-sea-half", {
          y: 26,
          ease: "none",
          scrollTrigger: { trigger: ".fossil-crossing", start: "top bottom", end: "bottom top", scrub: 0.6 }
        });

        /* The mechanism thread draws itself as the reader descends it. */
        const thread = root.current?.querySelector<SVGPathElement>(".fossil-thread");
        if (thread) {
          const length = thread.getTotalLength();
          gsap.set(thread, { strokeDasharray: length, strokeDashoffset: length });
          gsap.to(thread, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: { trigger: ".fossil-mechanism", start: "top 70%", end: "bottom 75%", scrub: 0.5 }
          });
        }

        /* A step is only displaced if it is still below the fold when the page
           mounts. Anything already on screen keeps its resting state, so a
           trigger that never fires can never leave content invisible. */
        gsap.utils.toArray<HTMLElement>(".fossil-step").forEach((step, index) => {
          if (step.getBoundingClientRect().top < window.innerHeight * 0.9) return;
          gsap.from(step, {
            opacity: 0,
            y: 26,
            duration: 0.7,
            delay: (index % 2) * 0.08,
            scrollTrigger: { trigger: step, start: "top 88%", once: true }
          });
        });

        return () => {
          drifts.forEach((tween) => tween.kill());
          hero.kill();
        };
      });

      /* Reduced motion: the markup's resting state is already the finished
         state, so there is nothing to undo — only the thread needs its dash
         cleared, since that is set in script. */
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".fossil-thread", { strokeDasharray: "none", strokeDashoffset: 0 });
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <div ref={root} className="fossil-page-root">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="relative -mt-24 flex min-h-[88svh] flex-col justify-end overflow-hidden pt-24 lg:min-h-[92svh]"
        style={{ backgroundColor: FOSSIL.marine }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 end-[-10%] h-[560px] w-[560px] rounded-full opacity-[0.16] blur-[2px]"
          style={{ background: `radial-gradient(circle, ${FOSSIL.aqua} 0%, transparent 62%)` }}
        />
        <div className="fossil-shell relative z-10 grid items-end gap-6 pb-[clamp(80px,14vw,190px)] pt-8 lg:grid-cols-12 lg:gap-8 lg:pb-[clamp(120px,13vw,200px)] lg:pt-16">
          <div className="lg:col-span-7">
            <ResponsiveImage
              src={c.lockup.src}
              alt={c.lockup.alt}
              priority
              sizes="220px"
              className="fossil-hero-lockup h-14 w-auto sm:h-[68px]"
            />
            <h1
              className={"fossil-hero-title fossil-display mt-6 sm:mt-8 text-[clamp(2.5rem,8.4vw,5.25rem)] font-bold leading-[0.94] text-white" + displayCase}
              style={{ letterSpacing: isArabic ? undefined : "-0.02em" }}
            >
              {c.hero.title}
            </h1>
            <p className="fossil-hero-lead mt-5 max-w-[54ch] text-[16px] sm:mt-6 sm:text-[17px] leading-[1.7]" style={{ color: FOSSIL.sea }}>
              {c.hero.lead}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3 sm:mt-9">
              <a className="fossil-hero-action fossil-btn fossil-btn--leaf" href={TECHNICAL_SHEET} download>
                {c.hero.primary}
              </a>
              <Link className="fossil-hero-action fossil-btn fossil-btn--line" href={localizeHref(locale, "/contact")}>
                {c.hero.secondary}
              </Link>
            </div>
          </div>

          <div className="relative flex justify-center lg:col-span-5 lg:justify-end">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-[4%] h-[42%] w-[62%] rounded-full opacity-40 blur-2xl"
              style={{ background: `radial-gradient(ellipse at center, ${FOSSIL.aqua} 0%, transparent 70%)` }}
            />
            {/* Sized by height, not width: the pack is 1:2.8, so a width-driven
                image drives the hero grid to 1200px tall. */}
            <ResponsiveImage
              src="/images/fossil/fossil-500cc.png"
              alt={isArabic ? "عبوة فوسيل 400 SL سعة 500 سم³" : "The 500 cm³ Fossil 400 SL pack"}
              priority
              sizes="(min-width: 1024px) 260px, 150px"
              className="fossil-hero-bottle relative h-[clamp(240px,34vh,330px)] w-auto translate-y-[7%] lg:h-[clamp(430px,64vh,640px)] lg:translate-y-[9%]"
            />
          </div>
        </div>

        <HeroSeam
          fill={FOSSIL.marineDeep}
          className="absolute inset-x-0 bottom-0 z-20 h-[clamp(64px,11vw,150px)] w-full"
        />
      </section>

      {/* Fact strip — the sea band the seam opens into. */}
      <div style={{ backgroundColor: FOSSIL.marineDeep }}>
        <div className="fossil-shell flex flex-wrap items-center gap-x-7 gap-y-2 pb-10 pt-2 sm:pt-4">
          {c.hero.facts.map((fact) => (
            <span
              key={fact}
              className="fossil-hero-fact fossil-display flex items-center gap-3 text-[13px] font-medium sm:text-sm"
              style={{ color: FOSSIL.sea, letterSpacing: isArabic ? undefined : "0.04em" }}
            >
              <span aria-hidden="true" className="inline-block h-[6px] w-[6px] rounded-full" style={{ backgroundColor: FOSSIL.aqua }} />
              {fact}
            </span>
          ))}
        </div>
      </div>

      {/* ── Origin ───────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pb-[clamp(90px,12vw,160px)] pt-14 sm:pt-20" style={{ backgroundColor: FOSSIL.marineDeep }}>
        <div className="fossil-shell relative z-10 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <h2 className={"fossil-display text-[clamp(2rem,5.4vw,3.5rem)] font-bold leading-[1.02] text-white" + displayCase}>
              {c.origin.title}
            </h2>
            {c.origin.body.map((paragraph) => (
              <p key={paragraph} className="mt-6 max-w-[62ch] text-[17px] leading-[1.75]" style={{ color: FOSSIL.sea }}>
                {paragraph}
              </p>
            ))}
          </div>
          <div className="lg:col-span-5">
            <h3
              className="fossil-display text-[13px] font-semibold sm:text-sm"
              style={{ color: FOSSIL.aqua, letterSpacing: isArabic ? undefined : "0.14em" }}
            >
              {c.origin.compoundsTitle}
            </h3>
            <ul className="mt-5">
              {c.origin.compounds.map((compound) => (
                <li
                  key={compound}
                  className="fossil-display border-t py-4 text-[19px] font-medium text-white last:border-b sm:text-[21px]"
                  style={{ borderColor: FOSSIL.marineLift }}
                >
                  {compound}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <WaveEdge fill={FOSSIL.marine} className="absolute inset-x-0 bottom-0 h-[clamp(48px,8vw,110px)] w-full" />
      </section>

      {/* ── The crossing: leaf above the wave, sea below it ──────────────── */}
      <section className="fossil-crossing relative overflow-hidden">
        {/* Above the seam: the leaf field. */}
        <div className="relative pb-[clamp(56px,8vw,104px)] pt-16 sm:pt-24" style={{ backgroundColor: FOSSIL.marine }}>
          <LeafOutline
            className="pointer-events-none absolute top-[34%] end-0 hidden h-[300px] w-auto opacity-40 lg:block"
            color={FOSSIL.green}
          />
          <div className="fossil-shell relative z-10">
            <h2 className={"fossil-display max-w-[16ch] text-[clamp(2rem,5.4vw,3.5rem)] font-bold leading-[1.02] text-white" + displayCase}>
              {c.crossing.title}
            </h2>
            <p className="mt-5 max-w-[58ch] text-[17px] leading-[1.7]" style={{ color: FOSSIL.sea }}>
              {c.crossing.intro}
            </p>

            <div className="fossil-leaf-half relative mt-12 max-w-[46ch] sm:mt-16">
              <p className="fossil-display text-[clamp(3.5rem,11vw,7rem)] font-bold leading-[0.86]" style={{ color: FOSSIL.green }}>
                {c.crossing.leaf.value}
              </p>
              <p className="fossil-display mt-3 text-[19px] font-semibold text-white sm:text-[22px]">{c.crossing.leaf.label}</p>
              <p className="mt-3 text-[16px] leading-[1.7]" style={{ color: FOSSIL.sea }}>
                {c.crossing.leaf.note}
              </p>
            </div>
          </div>
          <WaveEdge fill={FOSSIL.marineDeep} className="absolute inset-x-0 bottom-0 h-[clamp(44px,7vw,96px)] w-full" />
        </div>

        {/* Below the seam: the sea. */}
        <div className="relative" style={{ backgroundColor: FOSSIL.marineDeep }}>
          <div className="fossil-shell relative z-10 pb-[clamp(70px,9vw,120px)] pt-8 sm:pt-4">
            <div className="fossil-sea-half max-w-[46ch] sm:ms-auto sm:text-end">
              <p className="fossil-display text-[clamp(3.5rem,11vw,7rem)] font-bold leading-[0.86]" style={{ color: FOSSIL.aqua }}>
                {c.crossing.sea.value}
              </p>
              <p className="fossil-display mt-3 text-[19px] font-semibold text-white sm:text-[22px]">{c.crossing.sea.label}</p>
              <p className="mt-3 text-[16px] leading-[1.7]" style={{ color: FOSSIL.sea }}>
                {c.crossing.sea.note}
              </p>
            </div>

            <p
              className="mt-14 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-t pt-6 text-[15px]"
              style={{ borderColor: FOSSIL.marineLift, color: FOSSIL.sea }}
            >
              <span className="fossil-display font-semibold text-white">{c.crossing.packLabel}</span>
              <span>{c.crossing.pack}</span>
            </p>
          </div>
          <WaveEdge fill={FOSSIL.white} className="absolute inset-x-0 bottom-0 h-[clamp(48px,8vw,110px)] w-full" />
        </div>
      </section>

      {/* ── Mechanism ────────────────────────────────────────────────────── */}
      <section className="fossil-mechanism relative overflow-hidden bg-white pb-[clamp(80px,11vw,150px)] pt-16 sm:pt-24">
        <div className="fossil-shell relative">
          <h2
            className={"fossil-display max-w-[18ch] text-[clamp(2rem,5.4vw,3.5rem)] font-bold leading-[1.02]" + displayCase}
            style={{ color: FOSSIL.marine }}
          >
            {c.mechanism.title}
          </h2>
          <p className="mt-5 max-w-[68ch] text-[17px] leading-[1.75]" style={{ color: "#3D5C6B" }}>
            {c.mechanism.intro}
          </p>

          {/* The seam turned on its side. Each point is a node on it, so the
              four effects read as one run of the same current. */}
          <div className="relative mt-14 sm:mt-20">
            <WaveThread className="pointer-events-none absolute inset-y-0 start-0 w-11 lg:start-1/2 lg:-ms-[22px]" color={FOSSIL.aqua} />
            <ol className="relative space-y-14 sm:space-y-16">
              {c.mechanism.points.map((point, index) => {
                const Icon = MECHANISM_ICONS[index] ?? IconRoots;
                const onEnd = index % 2 === 1;
                return (
                  <li
                    key={point.title}
                    className={
                      "fossil-step relative ps-[76px] lg:w-1/2 lg:ps-0 " + (onEnd ? "lg:ms-auto lg:ps-[76px]" : "lg:pe-[76px] lg:text-end")
                    }
                  >
                    <span
                      aria-hidden="true"
                      className={
                        "absolute top-0 flex h-11 w-11 items-center justify-center rounded-full bg-white start-0 " +
                        (onEnd ? "lg:start-[-22px]" : "lg:start-auto lg:end-[-22px]")
                      }
                      style={{ color: FOSSIL.green, boxShadow: `inset 0 0 0 1.5px ${FOSSIL.aqua}` }}
                    >
                      <Icon className="h-[22px] w-[22px]" />
                    </span>
                    <h3 className="fossil-display text-[21px] font-semibold sm:text-[24px]" style={{ color: FOSSIL.marine }}>
                      {point.title}
                    </h3>
                    <p
                      className={"mt-3 max-w-[52ch] text-[16px] leading-[1.7] " + (onEnd ? "" : "lg:ms-auto")}
                      style={{ color: "#3D5C6B" }}
                    >
                      {point.text}
                    </p>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
        <WaveEdge fill={FOSSIL.green} crest={FOSSIL.aqua} className="absolute inset-x-0 bottom-0 h-[clamp(48px,8vw,110px)] w-full" />
      </section>

      {/* ── Application ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pb-[clamp(80px,11vw,150px)] pt-14 sm:pt-20" style={{ backgroundColor: FOSSIL.green }}>
        <div className="fossil-shell relative z-10">
          <h2
            className={"fossil-display text-[clamp(2rem,5.4vw,3.5rem)] font-bold leading-[1.02]" + displayCase}
            style={{ color: FOSSIL.leafInk }}
          >
            {c.apply.title}
          </h2>
          <p className="mt-5 max-w-[64ch] text-[17px] leading-[1.7]" style={{ color: FOSSIL.leafInk }}>
            {c.apply.intro}
          </p>

          {/* Pressed buttons rather than the ARIA tab pattern: every crop stays
              reachable with Tab and activates with Enter or Space, with no
              roving-tabindex contract to half-implement. */}
          <div role="group" aria-label={c.apply.title} className="mt-9 flex flex-wrap gap-2.5">
            {c.apply.crops.map((entry) => {
              const selected = entry.id === activeCrop.id;
              return (
                <button
                  key={entry.id}
                  type="button"
                  id={`fossil-tab-${entry.id}`}
                  aria-pressed={selected}
                  aria-controls="fossil-stages"
                  onClick={() => setCrop(entry.id)}
                  className={"fossil-crop" + (selected ? " fossil-crop--on" : "")}
                >
                  {entry.label}
                </button>
              );
            })}
          </div>

          <div
            key={activeCrop.id}
            id="fossil-stages"
            role="region"
            aria-label={`${c.apply.title} — ${activeCrop.label}`}
            className="fossil-panel mt-7 overflow-hidden rounded-md bg-white"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-b px-6 py-5 sm:px-8" style={{ borderColor: "#DCEAE2" }}>
              <p className="fossil-display text-[19px] font-semibold sm:text-[21px]" style={{ color: FOSSIL.marine }}>
                {activeCrop.target}
              </p>
              <p className="text-[15px]" style={{ color: "#3D5C6B" }}>
                <span className="fossil-display font-semibold" style={{ color: FOSSIL.greenDeep }}>
                  {c.apply.doseLabel}
                </span>
                <span className="mx-2" aria-hidden="true">
                  ·
                </span>
                {activeCrop.dose}
              </p>
            </div>
            <ul>
              {activeCrop.stages.map((stage, index) => (
                <li
                  key={stage.when}
                  className="fossil-row grid gap-2 border-b px-6 py-5 last:border-b-0 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] sm:gap-8 sm:px-8"
                  style={{ borderColor: "#EDF3EF", animationDelay: `${index * 60}ms` }}
                >
                  <p className="fossil-display text-[16px] font-semibold leading-[1.45] sm:text-[17px]" style={{ color: FOSSIL.marine }}>
                    {stage.when}
                  </p>
                  <p className="text-[15px] leading-[1.65]" style={{ color: "#3D5C6B" }}>
                    {stage.why}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-6 text-[15px]" style={{ color: FOSSIL.leafInk }}>
            {c.apply.note}
          </p>
        </div>
        <WaveEdge fill={FOSSIL.marine} crest={FOSSIL.white} className="absolute inset-x-0 bottom-0 h-[clamp(48px,8vw,110px)] w-full" />
      </section>

      {/* ── Programme fit + close ────────────────────────────────────────── */}
      <section className="relative overflow-hidden pb-20 pt-16 sm:pt-24" style={{ backgroundColor: FOSSIL.marine }}>
        <div className="fossil-shell relative z-10 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <h2 className={"fossil-display max-w-[16ch] text-[clamp(1.75rem,4.4vw,2.75rem)] font-bold leading-[1.05] text-white" + displayCase}>
              {c.program.title}
            </h2>
            <p className="mt-5 max-w-[58ch] text-[17px] leading-[1.75]" style={{ color: FOSSIL.sea }}>
              {c.program.body}
            </p>
          </div>
          <dl className="lg:col-span-6">
            {c.program.rows.map((row) => (
              <div
                key={row.k}
                className="grid gap-1 border-t py-4 sm:grid-cols-[minmax(0,0.6fr)_minmax(0,1fr)] sm:gap-6"
                style={{ borderColor: FOSSIL.marineLift }}
              >
                <dt className="fossil-display text-[14px] font-semibold" style={{ color: FOSSIL.aqua }}>
                  {row.k}
                </dt>
                <dd className="text-[16px] leading-[1.6] text-white">{row.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="fossil-shell relative z-10 mt-16 border-t pt-14 sm:mt-20" style={{ borderColor: FOSSIL.marineLift }}>
          <h2 className={"fossil-display max-w-[14ch] text-[clamp(2rem,6vw,3.75rem)] font-bold leading-[0.98] text-white" + displayCase}>
            {c.close.title}
          </h2>
          <p className="mt-5 max-w-[56ch] text-[17px] leading-[1.7]" style={{ color: FOSSIL.sea }}>
            {c.close.body}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a className="fossil-btn fossil-btn--leaf" href={TECHNICAL_SHEET} download>
              {c.close.primary}
            </a>
            <Link className="fossil-btn fossil-btn--line" href={localizeHref(locale, "/contact")}>
              {c.close.secondary}
            </Link>
          </div>
          <p className="mt-8 text-[14px]" style={{ color: FOSSIL.sea }}>
            {c.close.label}
          </p>
        </div>
      </section>
    </div>
  );
}
