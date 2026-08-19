"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import LogoSquare from "@/app/[locale]/lasix-70-wg/_LogoSquare";
import SachetVisual from "@/app/[locale]/lasix-70-wg/_SachetVisual";

/* Brand palette — sampled from the Lasix 70 WG leaflet & logo assets, matching
   the desktop landing page exactly so the two builds read as one product. */
const PETROL = "#0B4B67";
const ORANGE = "#F07728";
const CYAN = "#3FC8E4";
const GREEN = "#2B9646";
const TEAL = "#0C594F";
const premiumEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

export type LasixMobileContent = {
  readonly dir: "ltr" | "rtl";
  readonly nav: { readonly name: string; readonly tag: string; readonly reg: string };
  readonly logo: { readonly src: string; readonly w: number; readonly h: number };
  readonly hero: {
    readonly kicker: string;
    readonly slogan: string;
    readonly sub: string;
    readonly lead: string;
    readonly ctaPrimary: string;
    readonly ctaSecondary: string;
    readonly stats: readonly { readonly label: string; readonly value: string; readonly unit: string }[];
  };
  readonly mech: {
    readonly kicker: string;
    readonly title: string;
    readonly intro: string;
    readonly items: readonly { readonly no: string; readonly title: string; readonly text: string }[];
    readonly residualTitle: string;
    readonly residualText: string;
    readonly wgTitle: string;
    readonly wgText: string;
  };
  readonly rates: {
    readonly kicker: string;
    readonly title: string;
    readonly egyptTitle: string;
    readonly egyptText: string;
    readonly tableTitle: string;
    readonly cols: { readonly crop: string; readonly pests: string; readonly rate: string; readonly notes: string };
    readonly rows: readonly { readonly crop: string; readonly pests: string; readonly rate: string; readonly notes: string }[];
    readonly note: string;
  };
  readonly timing: {
    readonly kicker: string;
    readonly title: string;
    readonly steps: readonly { readonly tag: string; readonly title: string; readonly text: string }[];
    readonly mixTitle: string;
    readonly mixOk: string;
    readonly mixNo: string;
  };
  readonly footer: {
    readonly kicker: string;
    readonly title: string;
    readonly packLabel: string;
    readonly pack: string;
    readonly formLabel: string;
    readonly form: string;
    readonly regLabel: string;
    readonly reg: string;
    readonly agentLabel: string;
    readonly agent: string;
    readonly address: string;
    readonly phone: string;
    readonly email: string;
    readonly site: string;
    readonly safety: string;
    readonly slogan: string;
  };
};

type LasixMobileProps = {
  c: LasixMobileContent;
  locale: "en" | "ar";
  contactHref: string;
  phone: string;
  whatsappHref: string;
  brochureHref: string;
  technicalSheetHref: string;
};

/* Expander/action affordances are UI chrome, not leaflet copy — the only
   strings here that are not part of the original page content. */
const ui = {
  en: {
    more: "Read more",
    less: "Show less",
    call: "Call AgroPest",
    whatsapp: "WhatsApp",
    brochure: "Download brochure",
    technicalSheet: "Technical data sheet"
  },
  ar: {
    more: "اقرأ المزيد",
    less: "عرض أقل",
    call: "اتصل باجروبست",
    whatsapp: "واتساب",
    brochure: "تحميل الكتيب",
    technicalSheet: "النشرة الفنية"
  }
} as const;

/* ---------------------------------------------------------------- primitives */

/* Double checkmark — the core brand motif (orange over cyan offset), copied
   pixel-for-pixel from the desktop build. */
function BrandCheck({ size = 40, className }: { size?: number; className?: string }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <path d="M6 26 L17 42 L44 8 L40 5 L17 32 L10 23 Z" fill={CYAN} transform="translate(-1.5 1.5)" />
      <path d="M6 26 L17 42 L44 8 L40 5 L17 32 L10 23 Z" fill={ORANGE} />
    </svg>
  );
}

function Marker({ color }: { color?: string }) {
  return <span aria-hidden="true" className="inline-block h-2.5 w-2.5 shrink-0" style={{ backgroundColor: color ?? ORANGE }} />;
}

function Kicker({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" }) {
  return (
    <p
      className="flex items-center gap-2.5 text-[11px] font-extrabold uppercase tracking-[0.14em]"
      style={{ color: tone === "dark" ? "#ffffff" : ORANGE }}
    >
      <Marker />
      {children}
    </p>
  );
}

function SectionHead({ kicker, title, tone = "light" }: { kicker: string; title: string; tone?: "light" | "dark" }) {
  return (
    <>
      <Kicker tone={tone}>{kicker}</Kicker>
      <h2 className="mt-3 text-[26px] font-extrabold leading-[1.22]" style={{ color: tone === "dark" ? "#ffffff" : PETROL }}>
        {title}
      </h2>
    </>
  );
}

function Chevron({ open, color }: { open: boolean; color: string }) {
  return (
    <span
      aria-hidden="true"
      className="flex h-9 w-9 shrink-0 items-center justify-center transition-colors duration-300"
      style={{ backgroundColor: open ? color : "#0B4B670F" }}
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className={"transition-transform duration-300 " + (open ? "rotate-180" : "")}>
        <path d="M6 9 L12 15 L18 9" stroke={open ? "#FFFFFF" : color} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

/** Accordion row: a large tappable header plus a height-animated body. Keeps
    dense leaflet copy (mechanism items, rate rows, timing steps) off the
    screen until asked for, per the brief's "collapsible accordions" ask. */
function Disclosure({
  open,
  onToggle,
  accent,
  header,
  children
}: {
  open: boolean;
  onToggle: () => void;
  accent: string;
  header: ReactNode;
  children: ReactNode;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <div
      className="overflow-hidden border-2 bg-white transition-colors duration-300"
      style={{
        borderColor: open ? accent : "#0B4B6722",
        boxShadow: open ? `0 16px 40px ${accent}1F` : "0 8px 20px rgba(11,75,103,0.05)"
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex min-h-[68px] w-full items-center gap-3 px-4 py-3.5 text-start active:bg-[#FDFAF7]"
      >
        <span className="min-w-0 flex-1">{header}</span>
        <Chevron open={open} color={accent} />
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.34, ease: premiumEase }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4">{children}</div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

/** Clamps long body copy behind a full-width tap target. Text is never
    removed — only visually collapsed, and only when it actually overflows. */
function ReadMore({ text, labels, tone = "light" }: { text: string; labels: { more: string; less: string }; tone?: "light" | "dark" }) {
  const [open, setOpen] = useState(false);
  const [clamped, setClamped] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    function measure() {
      const el = textRef.current;
      if (!el || open) return;
      setClamped(el.scrollHeight - el.clientHeight > 1);
    }
    measure();
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => window.removeEventListener("resize", measure);
  }, [open, text]);

  const accent = tone === "dark" ? CYAN : PETROL;

  return (
    <div>
      <p
        ref={textRef}
        className={"text-[15px] leading-8 " + (tone === "dark" ? "text-white/80" : "text-slate-600") + " " + (open ? "" : "line-clamp-4")}
      >
        {text}
      </p>
      {clamped ? (
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          className="mt-1 inline-flex min-h-[44px] items-center gap-1.5 text-sm font-bold"
          style={{ color: accent }}
        >
          {open ? labels.less : labels.more}
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={"transition-transform duration-300 " + (open ? "rotate-180" : "")}>
            <path d="M6 9 L12 15 L18 9" stroke={accent} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      ) : null}
    </div>
  );
}

function Field({ label, value, color, large, tone = "light" }: { label: string; value: string; color?: string; large?: boolean; tone?: "light" | "dark" }) {
  return (
    <div>
      <p className={"text-[10px] font-bold uppercase tracking-[0.12em] " + (tone === "dark" ? "text-white/50" : "text-slate-400")}>{label}</p>
      <p
        className={large ? "mt-0.5 text-lg font-extrabold leading-6" : "mt-0.5 text-sm font-bold leading-6"}
        style={{ color: color ?? (tone === "dark" ? "rgba(255,255,255,0.92)" : "#475569") }}
      >
        {value}
      </p>
    </div>
  );
}

/* ---------------------------------------------------------------- the page */

export function LasixMobile({ c, locale, contactHref, phone, whatsappHref, brochureHref, technicalSheetHref }: LasixMobileProps) {
  const rtl = locale === "ar";
  const labels = ui[locale];
  const reducedMotion = useReducedMotion();
  const mixCautionsTitle = rtl ? "تحذيرات الخلط" : "Mixing cautions";

  const [openMech, setOpenMech] = useState<number | null>(0);
  const [openRate, setOpenRate] = useState<number | null>(0);
  const [openStep, setOpenStep] = useState<number | null>(0);

  function scrollToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
  }

  return (
    <div>
      {/* ---------------------------------------------------------- HERO */}
      {/* pt-36 clears both the floating navbar's tall, unscrolled height AND
          LogoSquare's own built-in -mt-12, so the logo starts undocked at
          its full hero size (same as desktop) instead of snapping straight
          into the small docked badge. The section's own background still
          bleeds up behind the navbar. */}
      <section className="relative overflow-hidden px-4 pb-16 pt-36" style={{ backgroundColor: PETROL }}>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }}
        />

        <div className="relative">
          {/* Same container + scroll-docking behaviour as the desktop hero:
              starts at natural size here, docks into a small fixed badge
              under the navbar once scrolled. */}
          <LogoSquare src={c.logo.src} alt={c.nav.name} dir={c.dir} />

          <div className="mt-4">
            <Kicker tone="dark">{c.hero.kicker}</Kicker>
          </div>
          <h1 className="mt-3 text-[30px] font-extrabold leading-[1.25] text-white">{c.hero.slogan}</h1>

          <div className="mt-4 flex items-center gap-2.5">
            <BrandCheck size={26} />
            <p className="text-lg font-extrabold" style={{ color: CYAN }}>
              {c.hero.sub}
            </p>
          </div>
          <p className="mt-3 text-[15px] leading-8 text-white/80">{c.hero.lead}</p>

          {/* real product shot — the desktop tile mosaic is lg-only, so mobile
              had no product image at all; this fills that gap. */}
          <div className="mt-5 flex justify-center bg-white/5 p-4">
            <ResponsiveImage
              src="/images/products/lasix-gallery.png"
              alt={c.nav.name}
              className="h-auto w-[58%] max-w-[210px] object-contain drop-shadow-[0_20px_36px_rgba(0,0,0,0.35)]"
              objectFit="contain"
              sizes="220px"
            />
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2.5">
            {c.hero.stats.map((s) => (
              <div key={s.label} className=" p-3.5" style={{ backgroundColor: "#083A50" }}>
                <p className="text-[10px] font-bold uppercase leading-4 tracking-[0.1em] text-white/50">{s.label}</p>
                <p className="mt-1 text-lg font-extrabold text-white">{s.value}</p>
                <p className="text-[11px] font-semibold" style={{ color: CYAN }}>
                  {s.unit}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 grid gap-2.5">
            <button
              type="button"
              onClick={() => scrollToSection("m-rates")}
              className="flex min-h-[56px] w-full items-center justify-center px-6 text-[15px] font-bold text-white active:scale-[0.985]"
              style={{ backgroundColor: ORANGE, boxShadow: "0 14px 30px rgba(240,119,40,0.35)" }}
            >
              {c.hero.ctaPrimary}
            </button>
            <Link
              href={contactHref}
              className="flex min-h-[56px] w-full items-center justify-center border-[3px] px-6 text-[15px] font-bold text-white active:scale-[0.985]"
              style={{ borderColor: "#ffffff4D" }}
            >
              {c.hero.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------- MECHANISM OF ACTION */}
      <section id="m-mech" className="scroll-mt-[140px] px-4 pb-20 pt-16" style={{ backgroundColor: "#F7F2EF" }}>
        <SectionHead kicker={c.mech.kicker} title={c.mech.title} />
        <p className="mt-3 text-[15px] leading-8 text-slate-600">{c.mech.intro}</p>

        <div className="mt-4 grid gap-2.5">
          {c.mech.items.map((item, index) => (
            <Disclosure
              key={item.no}
              accent={ORANGE}
              open={openMech === index}
              onToggle={() => setOpenMech(openMech === index ? null : index)}
              header={
                <span className="flex items-center gap-3">
                  <span className="text-sm font-extrabold tracking-widest" style={{ color: ORANGE }}>
                    {item.no}
                  </span>
                  <span className="min-w-0 text-base font-extrabold leading-5" style={{ color: PETROL }}>
                    {item.title}
                  </span>
                </span>
              }
            >
              <p className="text-[15px] leading-8 text-slate-600">{item.text}</p>
            </Disclosure>
          ))}
        </div>

        {/* residual + WG — dual tone tiles, same as desktop */}
        <div className="mt-6 grid gap-2.5">
          <div className=" p-5" style={{ backgroundColor: TEAL }}>
            <BrandCheck size={24} />
            <h3 className="mt-3 text-lg font-extrabold text-white">{c.mech.residualTitle}</h3>
            <p className="mt-2 text-[15px] leading-8 text-white/80">{c.mech.residualText}</p>
          </div>
          <div className=" p-5" style={{ backgroundColor: GREEN }}>
            <BrandCheck size={24} />
            <h3 className="mt-3 text-lg font-extrabold text-white">{c.mech.wgTitle}</h3>
            <p className="mt-2 text-[15px] leading-8 text-white/80">{c.mech.wgText}</p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- APPLICATION RATES */}
      <section id="m-rates" className="scroll-mt-[140px] px-4 pb-20 pt-16">
        <SectionHead kicker={c.rates.kicker} title={c.rates.title} />

        <div className="mt-4 overflow-hidden border-2" style={{ borderColor: "#0B4B6722" }}>
          <div className="grid grid-cols-[6px_1fr]">
            <div style={{ backgroundColor: ORANGE }} />
            <div className="p-4">
              <h3 className="text-base font-extrabold" style={{ color: PETROL }}>
                {c.rates.egyptTitle}
              </h3>
              <div className="mt-2">
                <ReadMore text={c.rates.egyptText} labels={labels} />
              </div>
            </div>
          </div>
        </div>

        <p className="mt-10 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">{c.rates.tableTitle}</p>
        <div className="mt-2.5 grid gap-2.5">
          {c.rates.rows.map((row, index) => (
            <Disclosure
              key={row.crop}
              accent={GREEN}
              open={openRate === index}
              onToggle={() => setOpenRate(openRate === index ? null : index)}
              header={
                <>
                  <span className="block text-[15px] font-extrabold leading-6" style={{ color: PETROL }}>
                    {row.crop}
                  </span>
                  <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                    {c.rates.cols.rate}
                    <span className="ms-1.5 text-sm font-extrabold tracking-normal" style={{ color: GREEN }}>
                      {row.rate}
                    </span>
                  </span>
                </>
              }
            >
              <div className="grid gap-3 border-t pt-3" style={{ borderColor: "#0B4B6715" }}>
                <Field label={c.rates.cols.pests} value={row.pests} />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">{c.rates.cols.notes}</p>
                  <p className="mt-1 text-[15px] leading-8 text-slate-600">{row.notes}</p>
                </div>
              </div>
            </Disclosure>
          ))}
        </div>

        <div className="mt-4 bg-white p-3.5">
          <ReadMore text={c.rates.note} labels={labels} />
        </div>
      </section>

      {/* ------------------------------------------------ TIMING & METHOD */}
      <section id="m-timing" className="scroll-mt-[140px] px-4 pb-20 pt-16" style={{ backgroundColor: "#F7F2EF" }}>
        <SectionHead kicker={c.timing.kicker} title={c.timing.title} />

        <ol className="mt-4 grid gap-2.5">
          {c.timing.steps.map((step, index) => {
            const isLast = index === c.timing.steps.length - 1;
            const accent = isLast ? GREEN : PETROL;
            return (
              <li key={step.tag}>
                <Disclosure
                  accent={accent}
                  open={openStep === index}
                  onToggle={() => setOpenStep(openStep === index ? null : index)}
                  header={
                    <span className="flex items-center gap-3">
                      <span
                        className="flex h-10 w-10 shrink-0 items-center justify-center text-sm font-extrabold text-white"
                        style={{ backgroundColor: accent }}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: isLast ? GREEN : ORANGE }}>
                          {step.tag}
                        </span>
                        <span className="block text-base font-extrabold leading-5" style={{ color: PETROL }}>
                          {step.title}
                        </span>
                      </span>
                    </span>
                  }
                >
                  <p className="text-[15px] leading-8 text-slate-600">{step.text}</p>
                </Disclosure>
              </li>
            );
          })}
        </ol>

        {/* tank-mix compatibility */}
        <div className="mt-8 grid gap-2.5">
          <div className=" border-2 bg-white p-4" style={{ borderColor: GREEN + "55" }}>
            <div className="flex items-center gap-2.5">
              <BrandCheck size={20} />
              <h3 className="text-base font-extrabold" style={{ color: PETROL }}>
                {c.timing.mixTitle}
              </h3>
            </div>
            <p className="mt-2 text-[15px] leading-8 text-slate-600">{c.timing.mixOk}</p>
          </div>
          <div className=" border-2 bg-white p-4" style={{ borderColor: ORANGE + "66" }}>
            <div className="flex items-center gap-2.5">
              <span aria-hidden="true" className="flex h-6 w-6 shrink-0 items-center justify-center text-sm font-extrabold text-white" style={{ backgroundColor: ORANGE }}>
                !
              </span>
              <h3 className="text-base font-extrabold" style={{ color: PETROL }}>
                {mixCautionsTitle}
              </h3>
            </div>
            <p className="mt-2 text-[15px] leading-8 text-slate-600">{c.timing.mixNo}</p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------ PACKAGING & REGISTRATION */}
      <section id="m-footer" className="scroll-mt-[140px] px-4 pb-28 pt-16 text-white" style={{ backgroundColor: PETROL }}>
        <SectionHead kicker={c.footer.kicker} title={c.footer.title} tone="dark" />

        <div className="mt-12 flex justify-center">
          <SachetVisual />
        </div>

        <div className="mt-12 grid gap-2.5">
          {[
            { label: c.footer.packLabel, value: c.footer.pack },
            { label: c.footer.formLabel, value: c.footer.form },
            { label: c.footer.regLabel, value: c.footer.reg }
          ].map((f) => (
            <div key={f.label} className=" p-4" style={{ backgroundColor: "#083A50" }}>
              <Field label={f.label} value={f.value} tone="dark" large />
            </div>
          ))}
        </div>

        <div className="mt-4 p-4" style={{ backgroundColor: "#083A50" }}>
          <ReadMore text={c.footer.safety} labels={labels} tone="dark" />
        </div>

        <div className="mt-3 grid gap-2.5">
          <a
            href={brochureHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[56px] w-full items-center justify-center px-6 text-[15px] font-bold text-white active:scale-[0.985]"
            style={{ backgroundColor: ORANGE, boxShadow: "0 14px 30px rgba(240,119,40,0.4)" }}
          >
            {labels.brochure}
          </a>
          <a
            href={technicalSheetHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[56px] w-full items-center justify-center border-[3px] px-6 text-[15px] font-bold text-white active:scale-[0.985]"
            style={{ borderColor: "#ffffff4D" }}
          >
            {labels.technicalSheet}
          </a>
        </div>

        <div className="mt-8 flex items-center gap-3">
          <BrandCheck size={20} />
          <p className="text-sm font-extrabold" style={{ color: CYAN }}>
            {c.footer.slogan}
          </p>
        </div>
      </section>
    </div>
  );
}
