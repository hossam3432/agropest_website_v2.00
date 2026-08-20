import type { CSSProperties } from "react";
import { FOSSIL, WAVE, WAVE_BOX, WAVE_VERTICAL } from "./tokens";

/* Every mark on this page is drawn from the three shapes the Fossil brand book
   names — the wave, the leaf and the circle — at one stroke weight. No icon
   library, no glyphs. */

type WaveEdgeProps = {
  /** Colour of the field the seam opens into: the filled wave carries it. */
  fill: string;
  /** Colour of the two open crests. Aqua on marine, marine on light grounds. */
  crest?: string;
  /** Height of the seam in px at each breakpoint. */
  className?: string;
  /** Mirrors the wave vertically, for a seam that closes a light field. */
  flip?: boolean;
  style?: CSSProperties;
  /** Marks the paths so the scroll drift can find them. */
  drift?: boolean;
};

/** The seam. Every colour field on this page ends in one. */
export function WaveEdge({ fill, crest = FOSSIL.aqua, className, flip = false, style, drift = true }: WaveEdgeProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox={WAVE_BOX}
      preserveAspectRatio="none"
      style={{ display: "block", transform: flip ? "scaleY(-1)" : undefined, ...style }}
    >
      <g className={drift ? "fossil-drift" : undefined}>
        {[0, 1440].map((offset) => (
          <g key={offset} transform={`translate(${offset},0)`}>
            <path d={WAVE.crestA} fill="none" stroke={crest} strokeWidth={2} vectorEffect="non-scaling-stroke" opacity={0.55} />
            <path d={WAVE.crestB} fill="none" stroke={crest} strokeWidth={2} vectorEffect="non-scaling-stroke" opacity={0.32} />
          </g>
        ))}
      </g>
      <path d={WAVE.fill} fill={fill} />
    </svg>
  );
}

/** The hero seam: the same wave, animated once on arrival, with the paths exposed. */
export function HeroSeam({ fill, className }: { fill: string; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox={WAVE_BOX}
      preserveAspectRatio="none"
      style={{ display: "block", overflow: "hidden" }}
    >
      <g className="fossil-hero-drift">
        {[0, 1440].map((offset) => (
          <g key={offset} transform={`translate(${offset},0)`}>
            <path
              className="fossil-crest-a"
              d={WAVE.crestA}
              fill="none"
              stroke={FOSSIL.aqua}
              strokeWidth={2}
              vectorEffect="non-scaling-stroke"
              opacity={0.7}
            />
            <path
              className="fossil-crest-b"
              d={WAVE.crestB}
              fill="none"
              stroke={FOSSIL.aqua}
              strokeWidth={2}
              vectorEffect="non-scaling-stroke"
              opacity={0.4}
            />
          </g>
        ))}
      </g>
      <path className="fossil-seam-fill" d={WAVE.fill} fill={fill} />
    </svg>
  );
}

/** The seam on its side — the thread the mechanism steps hang from. */
export function WaveThread({ className, color = FOSSIL.aqua }: { className?: string; color?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 40 1080" preserveAspectRatio="none" fill="none">
      <path
        className="fossil-thread"
        d={WAVE_VERTICAL}
        stroke={color}
        strokeWidth={2}
        vectorEffect="non-scaling-stroke"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** The brand book's leaf, as an outline. Used at scale, never as a bullet. */
export function LeafOutline({ className, color = FOSSIL.green }: { className?: string; color?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 420 300" fill="none">
      <path
        d="M8 292C8 292 26 176 108 106C190 36 330 26 412 12C412 12 402 158 320 220C238 282 116 268 60 292"
        stroke={color}
        strokeWidth={2.5}
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M60 292C120 214 214 140 340 74"
        stroke={color}
        strokeWidth={2.5}
        vectorEffect="non-scaling-stroke"
        opacity={0.6}
      />
    </svg>
  );
}

type IconProps = { className?: string };

const iconBase = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const
};

/** Root establishment. */
export function IconRoots({ className }: IconProps) {
  return (
    <svg {...iconBase} className={className}>
      <path d="M12 12v9" />
      <path d="M12 12c0-2.6 1.9-4.4 4.6-4.6C16.6 10 14.7 12 12 12Z" />
      <path d="M12 12c0-2.6-1.9-4.4-4.6-4.6C7.4 10 9.3 12 12 12Z" />
      <path d="M12 15.5c-1.7.9-2.6 2.4-2.9 4.4" />
      <path d="M12 15.5c1.7.9 2.6 2.4 2.9 4.4" />
      <path d="M12 3.5V7" />
    </svg>
  );
}

/** Physiological balance under stress: the circle held level by the wave. */
export function IconBalance({ className }: IconProps) {
  return (
    <svg {...iconBase} className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.9 13.6c1.6-1.6 3.2-1.6 4.7 0 1.6 1.6 3.2 1.6 4.7 0 1.6-1.6 3.2-1.6 4.7 0" />
      <path d="M12 9.4c0-1.7 1.2-2.9 3-3-.1 1.8-1.3 3-3 3Z" />
      <path d="M12 9.4V6.9" />
    </svg>
  );
}

/** Natural readiness: the leaf under cover. */
export function IconReadiness({ className }: IconProps) {
  return (
    <svg {...iconBase} className={className}>
      <path d="M12 3.2 4.8 6v6c0 4 3 7.2 7.2 8.8 4.2-1.6 7.2-4.8 7.2-8.8V6L12 3.2Z" />
      <path d="M12 14.4c0-2.7 1.9-4.5 4.7-4.7-.1 2.8-2 4.7-4.7 4.7Z" />
      <path d="M12 14.4V9.7" />
    </svg>
  );
}

/** Fruit set and early fruit growth: cell division inside the fruit. */
export function IconFruit({ className }: IconProps) {
  return (
    <svg {...iconBase} className={className}>
      <path d="M12 8.2c4 0 6.6 2.6 6.6 6.1S15.7 21 12 21s-6.6-3.2-6.6-6.7S8 8.2 12 8.2Z" />
      <path d="M12 8.2V4.4" />
      <path d="M12 5.6c1.2-1.6 2.9-2.2 5-2-.2 2.1-1.9 3.4-4 3.2" />
      <path d="M8.6 13.2h6.8" />
    </svg>
  );
}
