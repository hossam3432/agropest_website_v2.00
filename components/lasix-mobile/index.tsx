"use client";

import { useState } from "react";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import type { LasixMobileContent } from "@/components/LasixMobile";
import { ShapedFigure } from "./ShapedFigure";
import { bandFigure, crossFigure } from "./shapes";
import { Block, BrandCheck, Disclosure, Heading, ReadMore } from "./primitives";
import { altText, asset, figCaption } from "./assets";
import { tone } from "./tokens";

type Props = {
  c: LasixMobileContent;
  locale: "en" | "ar";
  brochureHref: string;
  technicalSheetHref: string;
};

/* Affordance labels — the only strings here that are not leaflet copy. */
const ui = {
  en: {
    more: "Read more",
    less: "Show less",
    brochure: "Download brochure",
    technicalSheet: "Technical data sheet"
  },
  ar: {
    more: "اقرأ المزيد",
    less: "عرض أقل",
    brochure: "تحميل الكتيب",
    technicalSheet: "النشرة الفنية"
  }
} as const;

/* Blocks sit 20px in from each edge, so no image ever needs a full-width
   source. Half-width blocks lose the gutter between them as well.

   From lg the same blocks are laid on a 12-column grid capped at 80rem, so
   every source has a hard ceiling there — a column is never wider than the
   span it was given. The px values below are those spans at the cap. */
const SIZES = "(min-width: 1024px) 620px, calc(100vw - 40px)";
const SIZES_HALF = "(min-width: 1024px) 360px, calc((100vw - 60px) / 2)";
/** Five of twelve — the portrait photographs paired with a text block. */
const SIZES_TALL = "(min-width: 1024px) 500px, calc(100vw - 40px)";
/** The full twelve. */
const SIZES_BAND = "(min-width: 1024px) 1220px, calc(100vw - 40px)";

/** A plain photographic block. Deliberately still: the shaped figures carry
    this page's one authored entrance, and repeating it on every photograph
    would spend the effect without adding meaning. */
function Photo({
  src,
  alt,
  ratio,
  focus = "50% 50%",
  sizes = SIZES,
  priority = false,
  className = ""
}: {
  src: string;
  alt: string;
  ratio: string;
  /** object-position. Sources far taller than their block need the subject
      named, or object-cover crops it out of the middle band. */
  focus?: string;
  sizes?: string;
  priority?: boolean;
  /** Placement on the page's grid. A plain photograph carries no geometry, so
      unlike ShapedFigure it is free to stretch to a row's height. */
  className?: string;
}) {
  return (
    /* The image is taken out of flow so the block never inherits a height from
       it. That matters on the grid: a photograph left in flow sizes its own row
       to the source's intrinsic ratio, and the blocks beside it get dragged to
       match. Out of flow, the row is sized by the text and the photograph fills
       whatever that comes to. */
    <div className={"relative w-full overflow-hidden " + ratio + " " + className}>
      <ResponsiveImage
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full"
        objectFit="cover"
        style={{ objectPosition: focus }}
        sizes={sizes}
        priority={priority}
      />
    </div>
  );
}

export function LasixMobileV2({ c, locale, brochureHref, technicalSheetHref }: Props) {
  const rtl = locale === "ar";
  const labels = ui[locale];
  const alt = altText[locale];
  const figCap = figCaption[locale];
  const mixCautionsTitle = rtl ? "تحذيرات الخلط" : "Mixing cautions";

  const [openMech, setOpenMech] = useState<number | null>(0);
  const [openRate, setOpenRate] = useState<number | null>(0);
  const [openStep, setOpenStep] = useState<number | null>(0);

  return (
    /* The leaflet's white lines are not drawn: the ground is white and every
       section is a solid block on it, so the gutter between blocks is the line.
       One 20px interval runs between the blocks and around the outside.

       From lg the same blocks are dealt onto a 12-column grid and the interval
       opens to 24px. Nothing about a block itself changes — same plate, same
       program, given a column span instead of the full measure — so the wide
       screen reads as the leaflet opened flat rather than as a second design.
       The 80rem cap and 32px gutter line the outer edges up with the site
       shell's own container. */
    <div
      dir={rtl ? "rtl" : "ltr"}
      className="mx-auto flex w-full max-w-[80rem] flex-col gap-5 overflow-x-clip bg-white p-5 lg:grid lg:grid-cols-12 lg:gap-6 lg:p-8"
    >
      {/* ============================================================= HERO */}
      <Block fill={tone.cream} className="pb-7 pt-8 lg:col-span-7 lg:flex lg:flex-col lg:justify-center lg:pb-12 lg:pt-12">
        <ResponsiveImage
          src={rtl ? asset.logoAr : asset.logoEn}
          alt={alt.logo}
          className="h-auto w-[68%] max-w-[230px] lg:max-w-[300px]"
          sizes="(min-width: 1024px) 300px, 230px"
          priority
        />
        <h1
          className="mt-6 text-[32px] font-extrabold leading-[1.2] lg:mt-8 lg:text-[46px] xl:text-[54px]"
          style={{ color: tone.petrol, textWrap: "balance" }}
        >
          {c.hero.slogan}
        </h1>
        <p className="mt-3 text-[15px] font-semibold leading-[1.8] lg:mt-4 lg:text-[17px]" style={{ color: tone.greenInk }}>
          {c.hero.kicker}
        </p>
      </Block>

      {/* Beside the masthead from lg, filling the row rather than holding its
          portrait ratio: a plain photograph has no cut to protect. */}
      <Photo
        src={asset.farmerCheck}
        alt={alt.farmerCheck}
        ratio="aspect-[4/5] lg:aspect-auto lg:min-h-[460px]"
        className="lg:col-span-5"
        sizes={SIZES_TALL}
        priority
      />

      <Block fill={tone.teal} className="pb-7 lg:col-span-12 lg:grid lg:grid-cols-[1.05fr_1fr] lg:items-start lg:gap-12">
        <div>
          <div className="flex items-start gap-3">
            <ResponsiveImage
              src={asset.check}
              alt=""
              aria-hidden="true"
              className="mt-1 h-auto w-9 shrink-0 lg:w-11"
              sizes="(min-width: 1024px) 44px, 36px"
            />
            <p className="text-[21px] font-extrabold leading-[1.35] text-white lg:text-[27px]">{c.hero.sub}</p>
          </div>
          <p className="mt-4 text-[15px] leading-[1.9] text-white/90 lg:text-[16px]">{c.hero.lead}</p>
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-px lg:mt-0" style={{ backgroundColor: "rgba(255,255,255,0.16)" }}>
          {c.hero.stats.map((s) => (
            <div key={s.label} className="p-4 lg:p-5" style={{ backgroundColor: tone.teal }}>
              <dt className="text-[10px] font-bold uppercase leading-4 tracking-[0.1em] text-white/75 lg:text-[11px]">
                {s.label}
              </dt>
              <dd className="mt-1.5 text-[17px] font-extrabold leading-6 text-white lg:text-[20px] lg:leading-7">{s.value}</dd>
              <dd className="text-[11px] font-semibold lg:text-[12px]" style={{ color: tone.cyanInk }}>
                {s.unit}
              </dd>
            </div>
          ))}
        </dl>
      </Block>

      {/* ============================================ MECHANISM OF ACTION */}
      <Block id="m-mech" fill={tone.cream} className="scroll-mt-[110px] pb-7 lg:col-span-12">
        <Heading label={c.mech.kicker} title={c.mech.title} />
        <p className="mt-4 text-[15px] leading-[1.9] text-slate-600 lg:max-w-3xl lg:text-[16px]">{c.mech.intro}</p>

        {/* Four numbered claims: one column of disclosures on a phone, two on
            the grid. Still disclosures — the leaflet's dense technical copy
            stays behind a deliberate tap or click at every width. */}
        <div className="mt-5 grid gap-2.5 lg:mt-7 lg:gap-3">
          {c.mech.items.map((item, i) => (
            <Disclosure
              key={item.no}
              accent={tone.orange}
              open={openMech === i}
              onToggle={() => setOpenMech(openMech === i ? null : i)}
              header={
                <span className="block text-[16px] font-extrabold leading-[1.35] lg:text-[17px]" style={{ color: tone.petrol }}>
                  {item.title}
                </span>
              }
            >
              <p className="text-[15px] leading-[1.9] text-slate-600 lg:text-[16px]">{item.text}</p>
            </Disclosure>
          ))}
        </div>
      </Block>

      {/* Half-width pair, the leaflet's own device: the pest at the reading
          edge, a solid field-green block answering it, and the grid gutter
          doing the dividing.

          From lg the wrapper dissolves (`contents`) and the three marks below
          share one row of thirds — the pest, then the two claims it sets up.
          The green square is what the phone uses in place of that pairing, so
          it stands down once the real blocks are alongside. */}
      <div className="grid grid-cols-2 gap-5 lg:contents">
        <Photo
          src={asset.whitefly}
          alt={alt.whitefly}
          ratio="aspect-square lg:aspect-auto lg:min-h-[300px]"
          className="lg:col-span-4"
          focus="50% 45%"
          sizes={SIZES_HALF}
        />
        <div aria-hidden="true" className="aspect-square lg:hidden" style={{ backgroundColor: tone.green }} />
      </div>

      <Block fill={tone.teal} className="lg:col-span-4">
        <BrandCheck size={26} className="lg:h-8 lg:w-8" />
        <h3 className="mt-3 text-[19px] font-extrabold leading-[1.3] text-white lg:text-[22px]">{c.mech.residualTitle}</h3>
        <p className="mt-2.5 text-[15px] leading-[1.9] text-white/90 lg:text-[16px]">{c.mech.residualText}</p>
      </Block>

      <Block fill={tone.greenInk} className="lg:col-span-4">
        <BrandCheck size={26} className="lg:h-8 lg:w-8" />
        <h3 className="mt-3 text-[19px] font-extrabold leading-[1.3] text-white lg:text-[22px]">{c.mech.wgTitle}</h3>
        <p className="mt-2.5 text-[15px] leading-[1.9] text-white/90 lg:text-[16px]">{c.mech.wgText}</p>
      </Block>

      {/* The formulation claim, demonstrated: granules going into the tank
          directly under the paragraph that makes the claim. Uncut — this is
          instructional, and the 45deg figures are reserved for the section
          transitions, so shaping it here would blur what a cut means.
          aspect-[7/4] is the source's own ratio, so nothing is cropped. */}
      <Photo
        src={asset.mixing}
        alt={alt.mixing}
        ratio="aspect-[7/4] lg:aspect-[24/7]"
        className="lg:col-span-12"
        sizes={SIZES_BAND}
      />

      {/* ============================== RECOMMENDATIONS & APPLICATION RATES */}
      <Block id="m-rates" fill={tone.cream} className="scroll-mt-[110px] pb-7 lg:col-span-12">
        <Heading label={c.rates.kicker} title={c.rates.title} />

        {/* The registration note and the sachet that fronts the crop list sit
            on one line from lg — both are preamble to the same table. */}
        <div className="lg:mt-7 lg:grid lg:grid-cols-[1.35fr_1fr] lg:items-center lg:gap-8">
          <div className="mt-5 grid grid-cols-[5px_1fr] bg-white lg:mt-0">
            <div style={{ backgroundColor: tone.orange }} />
            <div className="p-4 lg:p-5">
              <h3 className="text-[15px] font-extrabold leading-[1.5] lg:text-[16px]" style={{ color: tone.petrol }}>
                {c.rates.egyptTitle}
              </h3>
              <div className="mt-2">
                <ReadMore text={c.rates.egyptText} labels={labels} />
              </div>
            </div>
          </div>

          <div className="mt-7 flex items-center gap-4 lg:mt-0 lg:gap-6">
            <ResponsiveImage
              src={asset.sachet}
              alt={alt.sachet}
              className="h-auto w-[74px] shrink-0 lg:w-[96px]"
              sizes="(min-width: 1024px) 96px, 74px"
            />
            <p className="text-[11px] font-bold uppercase leading-5 tracking-[0.14em] text-slate-600 lg:text-[12px]">
              {c.rates.tableTitle}
            </p>
          </div>
        </div>

        <div className="mt-3 grid gap-2.5 lg:mt-5 lg:gap-3">
          {c.rates.rows.map((row, i) => (
            <Disclosure
              key={row.crop}
              accent={tone.greenInk}
              open={openRate === i}
              onToggle={() => setOpenRate(openRate === i ? null : i)}
              header={
                <>
                  <span className="block text-[15px] font-extrabold leading-6 lg:text-[17px]" style={{ color: tone.petrol }}>
                    {row.crop}
                  </span>
                  <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.12em] text-slate-600 lg:text-[11px]">
                    {c.rates.cols.rate}
                    <span className="ms-1.5 text-sm font-extrabold tracking-normal" style={{ color: tone.greenInk }}>
                      {row.rate}
                    </span>
                  </span>
                </>
              }
            >
              <div className="grid gap-3 border-t pt-3" style={{ borderColor: "rgba(11,75,103,0.12)" }}>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-600">{c.rates.cols.pests}</p>
                  <p className="mt-1 text-sm font-bold leading-6 text-slate-600">{row.pests}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-600">{c.rates.cols.notes}</p>
                  <p className="mt-1 text-[15px] leading-[1.9] text-slate-600 lg:text-[16px]">{row.notes}</p>
                </div>
              </div>
            </Disclosure>
          ))}
        </div>

        <div className="mt-4 bg-white p-4 lg:mt-5 lg:p-5">
          <ReadMore text={c.rates.note} labels={labels} />
        </div>
      </Block>

      {/* ======================================= TIMING & METHOD OF USE */}
      {/* The damage the product is bought to prevent, held in the leaflet's
          full X: green wedge above the reading edge, deep green below it. */}
      <ShapedFigure
        figure={crossFigure({ bottomWedge: false })}
        src={asset.tylcv}
        alt={alt.tylcv}
        caption={figCap.tylcv}
        rtl={rtl}
        sizes={SIZES_TALL}
        className="lg:col-span-5 lg:self-start"
      />

      <Block id="m-timing" fill={tone.cream} className="scroll-mt-[110px] pb-7 lg:col-span-7">
        <Heading label={c.timing.kicker} title={c.timing.title} />

        {/* One column at every width: these are five ordered steps, and
            dealing them across two would break the order the reader follows. */}
        <ol className="mt-5 grid gap-2.5 lg:mt-7 lg:gap-3">
          {c.timing.steps.map((step, i) => {
            const isLast = i === c.timing.steps.length - 1;
            const accent = isLast ? tone.greenInk : tone.petrol;
            return (
              <li key={step.tag}>
                <Disclosure
                  accent={accent}
                  open={openStep === i}
                  onToggle={() => setOpenStep(openStep === i ? null : i)}
                  header={
                    <span className="flex items-center gap-3">
                      <span
                        className="flex h-10 w-10 shrink-0 items-center justify-center text-sm font-extrabold text-white lg:h-12 lg:w-12 lg:text-base"
                        style={{ backgroundColor: accent }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0">
                        <span
                          className="block text-[10px] font-bold uppercase tracking-[0.12em] lg:text-[11px]"
                          style={{ color: isLast ? tone.greenInk : tone.petrol }}
                        >
                          {step.tag}
                        </span>
                        <span className="block text-[16px] font-extrabold leading-[1.35] lg:text-[17px]" style={{ color: tone.petrol }}>
                          {step.title}
                        </span>
                      </span>
                    </span>
                  }
                >
                  <p className="text-[15px] leading-[1.9] text-slate-600 lg:text-[16px]">{step.text}</p>
                </Disclosure>
              </li>
            );
          })}
        </ol>
      </Block>

      {/* The can and cannot of tank mixing, stacked as one half of the row
          from lg so the closing field shot can take the other half at a size
          worth looking at. `contents` keeps them plain siblings on a phone. */}
      <div className="contents lg:col-span-6 lg:flex lg:flex-col lg:gap-6">
        <Block fill={tone.greenInk}>
          <div className="flex items-center gap-2.5">
            <BrandCheck size={22} className="lg:h-7 lg:w-7" />
            <h3 className="text-[17px] font-extrabold text-white lg:text-[20px]">{c.timing.mixTitle}</h3>
          </div>
          <p className="mt-2.5 text-[15px] leading-[1.9] text-white/90 lg:text-[16px]">{c.timing.mixOk}</p>
        </Block>

        <Block fill={tone.cream}>
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="flex h-6 w-6 shrink-0 items-center justify-center text-sm font-extrabold text-white lg:h-7 lg:w-7"
              style={{ backgroundColor: tone.orangeInk }}
            >
              !
            </span>
            <h3 className="text-[17px] font-extrabold lg:text-[20px]" style={{ color: tone.petrol }}>
              {mixCautionsTitle}
            </h3>
          </div>
          <p className="mt-2.5 text-[15px] leading-[1.9] text-slate-600 lg:text-[16px]">{c.timing.mixNo}</p>
        </Block>
      </div>

      {/* ===================================== PACKAGING & REGISTRATION */}
      <ShapedFigure
        figure={bandFigure()}
        src={asset.tomatoClose}
        alt={alt.tomatoClose}
        rtl={rtl}
        sizes={SIZES}
        className="lg:col-span-6 lg:self-start"
      />

      <Block id="m-footer" fill={tone.teal} className="scroll-mt-[110px] pb-8 lg:col-span-12 lg:pb-10">
        <Heading label={c.footer.kicker} title={c.footer.title} onDark />

        {/* The carton beside the commercial data from lg, at the pack shot's
            own scale rather than stretched to the column. */}
        <div className="lg:mt-8 lg:grid lg:grid-cols-[minmax(0,340px)_1fr] lg:items-start lg:gap-10">
          <div className="mt-7 bg-white/[0.07] p-5 lg:mt-0 lg:p-7">
            <ResponsiveImage
              src={asset.carton}
              alt={alt.carton}
              className="mx-auto h-auto w-full max-w-[260px]"
              sizes="(min-width: 1024px) 300px, 260px"
            />
          </div>

          <div>
            <dl className="mt-6 grid gap-px lg:mt-0 lg:grid-cols-2" style={{ backgroundColor: "rgba(255,255,255,0.16)" }}>
              {[
                { label: c.footer.packLabel, value: c.footer.pack },
                { label: c.footer.formLabel, value: c.footer.form },
                { label: c.footer.regLabel, value: c.footer.reg },
                { label: c.footer.agentLabel, value: c.footer.agent }
              ].map((f) => (
                <div key={f.label} className="p-4 lg:p-5" style={{ backgroundColor: tone.teal }}>
                  <dt className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/75 lg:text-[11px]">{f.label}</dt>
                  <dd className="mt-1 text-[17px] font-extrabold leading-6 text-white lg:text-[19px] lg:leading-7">{f.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-4 lg:mt-5">
              <ReadMore text={c.footer.safety} labels={labels} onDark />
            </div>

            <div className="mt-6 grid gap-2.5 lg:mt-7 lg:grid-cols-2 lg:gap-3">
              <a
                href={brochureHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[56px] w-full items-center justify-center px-6 text-[15px] font-bold text-white transition-opacity duration-200 active:scale-[0.985] lg:min-h-[60px] lg:hover:opacity-90"
                style={{ backgroundColor: tone.orangeInk }}
              >
                {labels.brochure}
              </a>
              <a
                href={technicalSheetHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[56px] w-full items-center justify-center border-[3px] px-6 text-[15px] font-bold text-white transition-colors duration-200 active:scale-[0.985] lg:min-h-[60px] lg:hover:bg-white/10"
                style={{ borderColor: "rgba(255,255,255,0.32)" }}
              >
                {labels.technicalSheet}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-3 lg:mt-10">
          <BrandCheck size={20} className="lg:h-6 lg:w-6" />
          <p className="text-sm font-extrabold lg:text-base" style={{ color: tone.cyanInk }}>
            {c.footer.slogan}
          </p>
        </div>
      </Block>
    </div>
  );
}
