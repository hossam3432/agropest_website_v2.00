"use client";

import { useRef, useState } from "react";
import { IBM_Plex_Mono } from "next/font/google";

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap"
});

type Step = {
  no: string;
  title: string;
  text: string;
};

type MechanismSectionProps = {
  mech: {
    title: string;
    intro: string;
    steps: Step[];
    figureLabel: string;
  };
  dir: "ltr" | "rtl";
};

export default function MechanismSection({ mech, dir }: MechanismSectionProps) {
  const [activeStep, setActiveStep] = useState("02");
  const figureRef = useRef<HTMLDivElement>(null);

  const select = (no: string) => {
    setActiveStep(no);
    figureRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  return (
    <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-14">
      {/* steps */}
      <ol className="space-y-4">
        {mech.steps.map((s) => (
          <li
            key={s.no}
            onClick={() => select(s.no)}
            className={`flex gap-5 rounded-3xl border p-6 backdrop-blur-md transition-all cursor-pointer md:p-7 ${
              activeStep === s.no
                ? "border-[#3fbf6e]/60 bg-[#3fbf6e]/10"
                : "border-white/10 bg-white/5 hover:border-[#3fbf6e]/40"
            }`}
          >
            <span
              className={`${mono.className} flex h-11 w-11 shrink-0 items-center justify-center rounded-full border text-sm font-semibold transition-colors ${
                activeStep === s.no
                  ? "border-[#3fbf6e] bg-[#3fbf6e]/20 text-[#3fbf6e]"
                  : "border-[#3fbf6e]/40 text-[#3fbf6e]"
              }`}
            >
              {s.no}
            </span>
            <div>
              <h3 className="text-xl font-extrabold tracking-tight">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>

      {/* phloem animation slot */}
      <div ref={figureRef} className="flex scroll-mt-32 flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
        <div className="border-b border-white/10 px-6 py-4">
          <span className={`${mono.className} text-[10px] font-medium uppercase tracking-[0.22em] text-[#3fbf6e]`}>
            {mech.figureLabel}
          </span>
        </div>
        <div className="relative min-h-[380px] flex-1 flex items-center justify-center p-6">
          {activeStep === "01" && <PhloemIntakeSVG />}
          {activeStep === "02" && <PhloemLoadingSVG dir={dir} />}
          {activeStep === "03" && <BidirectionalTransportSVG />}
        </div>
      </div>
    </div>
  );
}

function PhloemIntakeSVG() {
  return (
    <svg viewBox="0 0 400 400" className="w-full h-full max-w-sm" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>{`
          .leaf-surface { fill: #3fbf6e; opacity: 0.3; }
          .cuticle { stroke: #3fbf6e; stroke-width: 2; fill: none; }
          .stoma { fill: #3fbf6e; }
          .particle { fill: #60a5fa; r: 4; }
          .label { fill: #3fbf6e; font-size: 12px; font-family: Arial; text-anchor: middle; }
        `}</style>
      </defs>

      {/* Leaf cross-section */}
      <ellipse cx="200" cy="120" rx="80" ry="100" className="leaf-surface" stroke="#3fbf6e" strokeWidth="2" />

      {/* Cuticle layer */}
      <path d="M 140 60 Q 200 30 260 60" className="cuticle" />

      {/* Stomata */}
      <ellipse cx="180" cy="180" rx="15" ry="20" fill="none" stroke="#3fbf6e" strokeWidth="1.5" />
      <path d="M 170 175 Q 180 185 190 175" stroke="#3fbf6e" strokeWidth="1" fill="none" />

      {/* Nutrient particles entering */}
      <circle cx="175" cy="150" className="particle" opacity="0.8" />
      <circle cx="185" cy="165" className="particle" opacity="0.6" />
      <circle cx="195" cy="155" className="particle" opacity="0.7" />
      <circle cx="210" cy="170" className="particle" opacity="0.5" />

      {/* Arrow showing uptake */}
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
          <polygon points="0 0, 10 3, 0 6" fill="#3fbf6e" />
        </marker>
      </defs>
      <path d="M 200 220 L 200 280" stroke="#3fbf6e" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" strokeDasharray="5,5" />

      <text x="200" y="320" className="label">Foliar Intake</text>
      <text x="200" y="340" className="label" fontSize="10" opacity="0.7">Nutrients penetrate cuticle</text>
    </svg>
  );
}

function PhloemLoadingSVG({ dir }: { dir: "ltr" | "rtl" }) {
  const isAr = dir === "rtl";
  const L = isAr
    ? {
        sievePlate: "حواجز الخلايا الغربالية",
        wall: "جدار أوعية اللحاء",
        companion: "خلايا مصاحبة",
        caption: "انتشار سيجنال NPK خلال أوعية اللحاء"
      }
    : {
        sievePlate: "Sieve plate barriers",
        wall: "Phloem vessel wall",
        companion: "Companion cells",
        caption: "Signal NPK moving through phloem vessels"
      };

  return (
    <svg viewBox="0 0 400 420" className="w-full h-full max-w-sm" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="tubeGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8ac926" />
          <stop offset="45%" stopColor="#b6e34a" />
          <stop offset="55%" stopColor="#c8ef5e" />
          <stop offset="100%" stopColor="#6fa81f" />
        </linearGradient>
        <linearGradient id="plateGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#a7d94a" />
          <stop offset="50%" stopColor="#cdf06a" />
          <stop offset="100%" stopColor="#8dbb2f" />
        </linearGradient>
        <linearGradient id="companionGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#5c8a6b" />
          <stop offset="50%" stopColor="#7ba98a" />
          <stop offset="100%" stopColor="#4a7057" />
        </linearGradient>
        <style>{`
          .lbl { fill: #d6f5c4; font-size: 11px; font-family: Arial, sans-serif; font-weight: 600; }
          .lead { stroke: #d6f5c4; stroke-width: 1.4; fill: none; }
          .node { fill: #d6f5c4; }
          .mol { stroke: #e8f7d8; stroke-width: 1.4; }
          .sg-drift { animation: sgDrift 5s ease-in-out infinite; }
          @keyframes sgDrift { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
          @media (prefers-reduced-motion: reduce) { .sg-drift { animation: none; } }
        `}</style>
        <clipPath id="tubeClip">
          <path d="M 150 60 Q 150 48 175 46 L 245 46 Q 270 48 270 60 L 270 360 Q 270 372 245 374 L 175 374 Q 150 372 150 360 Z" />
        </clipPath>
      </defs>

      {/* companion cell strip (start side) */}
      <path d="M 118 78 Q 112 72 122 70 L 138 72 Q 146 74 146 84 L 146 336 Q 146 346 138 348 L 122 350 Q 112 348 118 342 Z" fill="url(#companionGrad)" opacity="0.9" />
      <ellipse cx="132" cy="120" rx="6" ry="16" fill="#3f5f4c" opacity="0.4" />
      <ellipse cx="132" cy="200" rx="6" ry="16" fill="#3f5f4c" opacity="0.4" />
      <ellipse cx="132" cy="280" rx="6" ry="16" fill="#3f5f4c" opacity="0.4" />

      {/* main sieve tube */}
      <path
        d="M 150 60 Q 150 48 175 46 L 245 46 Q 270 48 270 60 L 270 360 Q 270 372 245 374 L 175 374 Q 150 372 150 360 Z"
        fill="url(#tubeGrad)"
      />

      {/* contents clipped to tube */}
      <g clipPath="url(#tubeClip)">
        {/* sieve plates (barriers) */}
        <g>
          <ellipse cx="210" cy="150" rx="62" ry="15" fill="url(#plateGrad)" />
          <ellipse cx="185" cy="150" rx="4" ry="6" fill="#6fa81f" opacity="0.6" />
          <ellipse cx="205" cy="152" rx="4" ry="6" fill="#6fa81f" opacity="0.6" />
          <ellipse cx="228" cy="150" rx="4" ry="6" fill="#6fa81f" opacity="0.6" />
          <ellipse cx="247" cy="151" rx="3" ry="5" fill="#6fa81f" opacity="0.6" />

          <ellipse cx="210" cy="278" rx="62" ry="15" fill="url(#plateGrad)" />
          <ellipse cx="185" cy="278" rx="4" ry="6" fill="#6fa81f" opacity="0.6" />
          <ellipse cx="205" cy="280" rx="4" ry="6" fill="#6fa81f" opacity="0.6" />
          <ellipse cx="228" cy="278" rx="4" ry="6" fill="#6fa81f" opacity="0.6" />
          <ellipse cx="247" cy="279" rx="3" ry="5" fill="#6fa81f" opacity="0.6" />
        </g>

        {/* NPK nutrient particles */}
        <g className="sg-drift">
          <circle cx="185" cy="95" r="8" fill="#2f4fd8" />
          <circle cx="182" cy="92" r="2.5" fill="#7d96f0" opacity="0.8" />
          <circle cx="235" cy="105" r="9" fill="#3fbf6e" />
          <circle cx="231" cy="101" r="2.8" fill="#a0e6bd" opacity="0.8" />
          <circle cx="205" cy="205" r="8" fill="#e23b3b" />
          <circle cx="201" cy="201" r="2.5" fill="#f59595" opacity="0.8" />
          <circle cx="243" cy="200" r="7" fill="#2f4fd8" />
          <circle cx="178" cy="320" r="9" fill="#e23b3b" />
          <circle cx="174" cy="316" r="2.8" fill="#f59595" opacity="0.8" />
          <circle cx="198" cy="338" r="8" fill="#e23b3b" />
          <circle cx="240" cy="330" r="6" fill="#3fbf6e" />
          <circle cx="220" cy="118" r="5" fill="#e23b3b" />
        </g>

        {/* molecule ball-and-stick structures */}
        <g className="mol sg-drift" style={{ animationDelay: "1.2s" }}>
          <g transform="translate(200 175)">
            <path d="M 0 0 L 12 -6 M 12 -6 L 22 2 M 22 2 L 16 14 M 16 14 L 4 14 M 4 14 L 0 0" fill="none" />
            <circle cx="0" cy="0" r="3" fill="#c8ef5e" />
            <circle cx="12" cy="-6" r="3" fill="#e23b3b" />
            <circle cx="22" cy="2" r="3" fill="#2f4fd8" />
            <circle cx="16" cy="14" r="3" fill="#c8ef5e" />
            <circle cx="4" cy="14" r="3" fill="#e23b3b" />
          </g>
          <g transform="translate(185 245)">
            <path d="M 0 0 L 12 -6 M 12 -6 L 22 2 M 22 2 L 16 14 M 16 14 L 4 14 M 4 14 L 0 0" fill="none" />
            <circle cx="0" cy="0" r="3" fill="#2f4fd8" />
            <circle cx="12" cy="-6" r="3" fill="#c8ef5e" />
            <circle cx="22" cy="2" r="3" fill="#e23b3b" />
            <circle cx="16" cy="14" r="3" fill="#2f4fd8" />
            <circle cx="4" cy="14" r="3" fill="#c8ef5e" />
          </g>
        </g>
      </g>

      {/* callout labels */}
      {/* sieve plate barrier */}
      <g>
        <rect x="300" y="140" width="7" height="7" className="node" />
        <path d="M 303 147 L 303 165 L 272 165" className="lead" />
        <text x="312" y="138" className="lbl">{L.sievePlate}</text>
      </g>
      {/* vessel wall */}
      <g>
        <rect x="300" y="215" width="7" height="7" className="node" />
        <path d="M 303 222 L 303 235 L 270 235" className="lead" />
        <text x="312" y="213" className="lbl">{L.wall}</text>
      </g>
      {/* companion cells */}
      <g>
        <rect x="46" y="255" width="7" height="7" className="node" />
        <path d="M 53 259 L 90 259 L 118 240" className="lead" />
        <text x="10" y="252" className="lbl">{L.companion}</text>
      </g>

      <text x="200" y="405" className="lbl" textAnchor="middle" fontSize="10" opacity="0.85" fill="#3fbf6e">
        {L.caption}
      </text>
    </svg>
  );
}

function BidirectionalTransportSVG() {
  return (
    <svg viewBox="0 0 400 400" className="w-full h-full max-w-sm" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>{`
          .tissue { fill: #3fbf6e; opacity: 0.15; }
          .transport-line { stroke: #3fbf6e; stroke-width: 2.5; fill: none; }
          .particle { r: 5; }
          .label { fill: #3fbf6e; font-size: 12px; font-family: Arial; text-anchor: middle; }
          .direction { fill: none; stroke: #60a5fa; stroke-width: 2; }
        `}</style>
        <marker id="up-arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
          <polygon points="0 0, 10 3, 0 6" fill="#60a5fa" />
        </marker>
      </defs>

      {/* Plant structure */}
      <g>
        {/* Shoot (top) */}
        <rect x="150" y="20" width="100" height="60" fill="#3fbf6e" opacity="0.2" rx="5" />
        <text x="200" y="55" className="label">Shoot</text>

        {/* Fruit (right) */}
        <circle cx="320" cy="140" r="40" fill="#3fbf6e" opacity="0.2" />
        <text x="320" y="145" className="label">Fruit</text>

        {/* Root (bottom) */}
        <rect x="150" y="320" width="100" height="60" fill="#3fbf6e" opacity="0.2" rx="5" />
        <text x="200" y="355" className="label">Root</text>
      </g>

      {/* Bidirectional transport paths */}
      {/* Upward path */}
      <path d="M 200 80 L 200 200" className="transport-line" stroke="#60a5fa" markerEnd="url(#up-arrow)" />

      {/* To fruit */}
      <path d="M 240 160 L 290 160" className="transport-line" stroke="#60a5fa" markerEnd="url(#up-arrow)" />

      {/* Downward path */}
      <path d="M 200 200 L 200 320" className="transport-line" stroke="#ff6b6b" markerEnd="url(#up-arrow)" />

      {/* Particles along paths */}
      <circle cx="200" cy="120" className="particle" fill="#60a5fa" opacity="0.8" />
      <circle cx="200" cy="150" className="particle" fill="#60a5fa" opacity="0.7" />
      <circle cx="260" cy="160" className="particle" fill="#60a5fa" opacity="0.8" />
      <circle cx="200" cy="240" className="particle" fill="#ff6b6b" opacity="0.7" />
      <circle cx="200" cy="280" className="particle" fill="#ff6b6b" opacity="0.8" />

      <text x="200" y="390" className="label">Bi-directional Transport</text>
      <text x="200" y="410" className="label" fontSize="10" opacity="0.7">From leaf to shoots, fruit & roots</text>
    </svg>
  );
}
