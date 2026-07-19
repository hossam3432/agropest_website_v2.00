"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RivalDuoFitProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Scales its content down (never up) so a whole section always fits inside one
 * viewport-height snap panel. Transform-only, so it never feeds back into layout.
 */
export function RivalDuoFit({ children, className }: RivalDuoFitProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const scaleRef = useRef(1);
  const boxHeightRef = useRef(0);

  useEffect(() => {
    const box = boxRef.current;
    const inner = innerRef.current;
    if (!box || !inner) return;

    function measure() {
      const available = box!.clientHeight;
      const natural = inner!.scrollHeight;
      if (!available || !natural) return;

      // The viewport changed — start over from full size, since the content may
      // now fit at a larger scale than it did before.
      if (Math.abs(available - boxHeightRef.current) > 1) {
        boxHeightRef.current = available;
        if (scaleRef.current !== 1) {
          scaleRef.current = 1;
          setScale(1);
          return; // Re-measure on the next tick, once laid out at full width.
        }
      }

      // Shrinking widens the layout box by 1/scale, which un-wraps text and makes
      // the content shorter — which would justify growing again. Only ever letting
      // the scale fall stops that loop from becoming a permanent shake.
      const next = Math.min(1, Math.floor((available / natural) * 200) / 200);
      if (next >= scaleRef.current) return;
      scaleRef.current = next;
      setScale(next);
    }

    measure();
    // Re-measure after fonts/images settle and on every viewport change.
    const settleIds = [80, 300, 900].map((delay) => window.setTimeout(measure, delay));
    const observer = new ResizeObserver(measure);
    observer.observe(box);
    observer.observe(inner);
    window.addEventListener("resize", measure);
    window.addEventListener("load", measure);
    document.fonts?.ready.then(measure).catch(() => {});
    // Safety net: measure bails out unless the scale actually falls, so this is cheap.
    const pollId = window.setInterval(measure, 500);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("load", measure);
      window.clearInterval(pollId);
      settleIds.forEach(window.clearTimeout);
    };
  }, []);

  return (
    <div ref={boxRef} className={"flex h-full w-full items-center justify-center overflow-hidden " + (className ?? "")}>
      {/* Lay out wider by 1/scale so the scaled result is always exactly 100% of
          the box — otherwise each section renders at a different visual width. */}
      <div
        ref={innerRef}
        className="shrink-0"
        style={{ width: `${100 / scale}%`, transform: `scale(${scale})`, transformOrigin: "center center" }}
      >
        {children}
      </div>
    </div>
  );
}
