"use client";

import { motion, useScroll, useTransform } from "framer-motion";

/** Precomputed 5-point star outline, outer radius 31.5 / inner radius 12.38, tip pointing up. */
const STAR_PATH =
  "M0,-31.5 L7.27,-10.01 L29.95,-9.74 L11.77,3.83 L18.52,25.47 L0,12.38 L-18.52,25.47 L-11.77,3.83 L-29.95,-9.74 L-7.27,-10.01 Z";

// Rounded to 2dp — Math.cos/sin can differ in their last bit between server
// and client JS engines, which is enough to trip up SSR hydration checks.
const round2 = (n: number) => Math.round(n * 100) / 100;

const STAR_POSITIONS = Array.from({ length: 12 }, (_, i) => {
  const angle = (i / 12) * 2 * Math.PI - Math.PI / 2;
  return { cx: round2(200 + 150 * Math.cos(angle)), cy: round2(200 + 150 * Math.sin(angle)) };
});

/**
 * Scroll-linked rotating ring of 12 EU stars — a quiet nod to the "manufactured
 * in the EU" claim. Anchored so its centre sits on the container's top-left
 * corner (physically, even in RTL) with a radius that scales down at wider
 * breakpoints (85% width on mobile down to 35% at xl). The container needs
 * `relative overflow-hidden`, and the section's text/CTA need z-10 to sit
 * above this (z-0).
 */
export default function EuStarsBackground({ opacity = "opacity-30" }: { opacity?: string }) {
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <div
      aria-hidden="true"
      className={`absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rtl:-translate-x-1/2 w-[95%] sm:w-[80%] md:w-[58%] lg:w-[46%] xl:w-[40%] aspect-square z-0 pointer-events-none origin-center ${opacity}`}
    >
      {/* Rotation lives on this inner element — framer-motion writes `rotate`
          as a raw inline `transform`, which would otherwise clobber the
          outer div's Tailwind translate classes used for anchoring. */}
      <motion.div style={{ rotate }} className="h-full w-full">
        <svg viewBox="0 0 400 400" className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          {STAR_POSITIONS.map((s, i) => (
            <path
              key={i}
              d={STAR_PATH}
              fill="#FFD700"
              transform={`translate(${s.cx} ${s.cy}) scale(0.85)`}
            />
          ))}
        </svg>
      </motion.div>
    </div>
  );
}
