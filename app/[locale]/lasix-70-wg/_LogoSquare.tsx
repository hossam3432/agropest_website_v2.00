"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";

const CREAM = "#F7F2EF";
const DOCK_TOP = 70; // px — clears the site navbar (scrolled/shrunk state) with a tighter gap
const DOCK_SIDE = 16; // px
const DOCK_SIZE = 96; // px
const SCROLL_DELAY = 0; // px — the large logo tracks scroll immediately, so it doesn't linger over content scrolling up beneath it

type Props = {
  src: string;
  alt: string;
  dir: string;
};

type Box = { top: number; left: number; width: number; height: number };

/* Single logo + container: sits at its natural hero position and tracks the
   page as it scrolls, then freezes into a small badge under the navbar once
   it reaches DOCK_TOP — one continuously `fixed` element, so the flight is a
   smooth resize instead of a jump between position types. */
export default function LogoSquare({ src, alt, dir }: Props) {
  const spacerRef = useRef<HTMLDivElement>(null);
  const restTopRef = useRef(0);
  const [box, setBox] = useState<Box | null>(null);
  const [docked, setDocked] = useState(false);
  const [isLg, setIsLg] = useState(false);

  useLayoutEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => setIsLg(mq.matches);
    onMq();
    mq.addEventListener("change", onMq);

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
      mq.removeEventListener("change", onMq);
    };
  }, []);

  const edgeSideStyle = dir === "rtl" ? { right: DOCK_SIDE + 20 } : { left: DOCK_SIDE - 20 };
  const dockedSideStyle = isLg && box ? { left: box.left } : edgeSideStyle;

  const style = docked
    ? { backgroundColor: CREAM, top: DOCK_TOP, width: DOCK_SIZE, height: DOCK_SIZE, ...dockedSideStyle }
    : { backgroundColor: CREAM, top: box?.top ?? 0, left: box?.left ?? 0, width: box?.width ?? 0, height: box?.height ?? 0 };

  return (
    <div
      ref={spacerRef}
      aria-hidden="true"
      className="relative -mt-12 mb-8 h-[152px] w-[152px] sm:-mt-16 sm:mb-10 sm:h-[230px] sm:w-[230px] md:h-[173px] md:w-[173px] lg:mt-0 lg:h-[230px] lg:w-[230px]"
    >
      {box && (
        <div
          className="lx-logo-drop fixed z-40 transition-[top,left,right,width,height] duration-500 ease-out"
          style={style}
        >
          <span aria-hidden="true" className="absolute inset-x-0 bottom-full h-[2000px]" style={{ backgroundColor: CREAM }} />
          <Image
            src={src}
            alt={alt}
            fill
            priority
            className={
              "lx-logo-fade relative object-contain transition-[padding] duration-500 ease-out " +
              (docked ? "p-4" : "p-[28px] sm:p-[43px] md:p-[32px] lg:p-[43px]")
            }
          />
        </div>
      )}
    </div>
  );
}
