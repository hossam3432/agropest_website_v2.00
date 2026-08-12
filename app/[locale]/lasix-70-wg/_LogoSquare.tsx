"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ResponsiveImage } from "@/components/ResponsiveImage";

const CREAM = "#F7F2EF";
const DOCK_TOP = 70; // px — scroll threshold that triggers the dock (also where the frozen anchor naturally lands)
const DOCK_SIZE = 96; // px
const SCROLL_DELAY = 0; // px — the large logo tracks scroll immediately, so it doesn't linger over content scrolling up beneath it

type Props = {
  src: string;
  alt: string;
  dir: string;
};

type Box = { top: number; left: number; width: number; height: number };

/* Single logo + container: sits at its natural hero position and tracks the
   page as it scrolls. The moment it crosses DOCK_TOP it freezes in place —
   `update` below stops touching `box` entirely — and an inner wrapper scales
   that frozen footprint down to the small badge size with
   `transform-origin: top left`. The shrink therefore pivots exactly from the
   corner the box was already sitting at when it froze: nothing slides to a
   separately-tuned position while it scales, only the size changes.

   The floating badge itself is portaled to document.body: the hero section
   it's measured from has `overflow-hidden` (for its own decorative content),
   and `position: fixed` descendants are still clipped by an ancestor's
   overflow — without the portal the badge vanishes as soon as that section
   scrolls entirely out of view, well before the page ends. */
export default function LogoSquare({ src, alt, dir }: Props) {
  const spacerRef = useRef<HTMLDivElement>(null);
  const restTopRef = useRef(0);
  const [box, setBox] = useState<Box | null>(null);
  const [docked, setDocked] = useState(false);

  useLayoutEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    const measure = () => {
      const el = spacerRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      restTopRef.current = r.top + window.scrollY;
      setBox({ top: r.top, left: r.left, width: r.width, height: r.height });
    };

    const update = () => {
      const effectiveScrollY = Math.max(0, window.scrollY - SCROLL_DELAY);
      const naturalTop = restTopRef.current - effectiveScrollY;
      const isDocked = naturalTop <= DOCK_TOP;
      setDocked(isDocked);
      if (!isDocked) {
        const el = spacerRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        setBox({ top: naturalTop, left: r.left, width: r.width, height: r.height });
      }
    };

    measure();
    update();

    const onScroll = () => update();
    const onResize = () => {
      measure();
      update();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Once docked, `box` stops updating, so top/left below are exactly the
  // position it was at the instant it crossed DOCK_TOP — never a separately
  // tuned target position. Only the scale changes after that point.
  const naturalSize = box?.width || DOCK_SIZE;
  const scale = docked ? DOCK_SIZE / naturalSize : 1;

  const positionStyle = {
    top: box?.top ?? 0,
    left: box?.left ?? 0,
    width: box?.width ?? 0,
    height: box?.height ?? 0
  };

  return (
    <div
      ref={spacerRef}
      aria-hidden="true"
      className="relative -mt-12 mb-8 h-[152px] w-[152px] sm:-mt-16 sm:mb-10 sm:h-[230px] sm:w-[230px] md:h-[173px] md:w-[173px] lg:mt-0 lg:h-[230px] lg:w-[230px]"
    >
      {box &&
        createPortal(
          <div className="lx-logo-drop fixed z-40" style={positionStyle}>
            <div
              className="h-full w-full transition-transform duration-500 ease-out"
              style={{ transform: `scale(${scale})`, transformOrigin: "top left", backgroundColor: CREAM }}
            >
              <span aria-hidden="true" className="absolute inset-x-0 bottom-full h-[2000px]" style={{ backgroundColor: CREAM }} />
              <ResponsiveImage
                src={src}
                alt={alt}
                priority
                sizes="230px"
                objectFit="contain"
                className="lx-logo-fade relative h-full w-full object-contain p-[28px] sm:p-[43px] md:p-[32px] lg:p-[43px]"
              />
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
