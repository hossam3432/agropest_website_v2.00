"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";

type RivalDuoScrollShellProps = {
  children: ReactNode;
};

export function RivalDuoScrollShell({ children }: RivalDuoScrollShellProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ container: containerRef });
  // At the top of the page progress is 0, so a raw scaleY leaves nothing on
  // screen but the faint track. Keep a visible cap at all times.
  const fillScale = useTransform(scrollYProgress, [0, 1], [0.08, 1]);

  // A hard fling on a phone carries the native momentum scroll across several
  // snap panels at once. Drive the panning by hand instead: follow the finger,
  // never past one panel, and settle onto exactly one neighbour per gesture.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let startY = 0;
    let startScrollTop = 0;
    let dragging = false;
    let locked = false;
    let unlockId = 0;

    const page = () => el.clientHeight || 1;
    const lastIndex = () => Math.max(0, Math.round(el.scrollHeight / page()) - 1);

    function settleTo(index: number) {
      const target = Math.min(lastIndex(), Math.max(0, index));
      locked = true;
      el!.scrollTo({ top: target * page(), behavior: reducedMotion ? "auto" : "smooth" });
      window.clearTimeout(unlockId);
      unlockId = window.setTimeout(() => {
        locked = false;
        el!.style.scrollSnapType = "";
      }, 620);
    }

    function onTouchStart(event: TouchEvent) {
      if (locked || event.touches.length !== 1) return;
      dragging = true;
      startY = event.touches[0].clientY;
      startScrollTop = el!.scrollTop;
      // Mandatory snap re-snaps mid-drag and fights the manual scrollTop below.
      el!.style.scrollSnapType = "none";
    }

    function onTouchMove(event: TouchEvent) {
      if (!dragging || locked) return;
      const delta = startY - event.touches[0].clientY;
      const bounded = Math.max(-page(), Math.min(page(), delta));
      el!.scrollTop = startScrollTop + bounded;
    }

    function onTouchEnd(event: TouchEvent) {
      if (!dragging) return;
      dragging = false;
      const endY = event.changedTouches[0]?.clientY ?? startY;
      const delta = startY - endY;
      const from = Math.round(startScrollTop / page());
      const threshold = Math.min(80, page() * 0.12);
      settleTo(delta > threshold ? from + 1 : delta < -threshold ? from - 1 : from);
    }

    // Trackpad inertia sends a long tail of wheel events for one flick, which
    // walks through panels the same way. One panel per gesture, tail ignored.
    function onWheel(event: WheelEvent) {
      if (Math.abs(event.deltaY) < 4) return;
      event.preventDefault();
      if (locked) return;
      el!.style.scrollSnapType = "none";
      settleTo(Math.round(el!.scrollTop / page()) + (event.deltaY > 0 ? 1 : -1));
    }

    // Set from JS so the page still scrolls normally if this never runs.
    const previousTouchAction = el.style.touchAction;
    el.style.touchAction = "pan-x";

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("touchcancel", onTouchEnd, { passive: true });
    el.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      window.clearTimeout(unlockId);
      el.style.touchAction = previousTouchAction;
      el.style.scrollSnapType = "";
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
      el.removeEventListener("wheel", onWheel);
    };
  }, [reducedMotion]);

  return (
    <div className="relative">
      {/* Logical inset: stays on the left in RTL, mirrors to the right in LTR. */}
      <div className="pointer-events-none fixed inset-y-20 end-3 z-30 hidden w-32 sm:block">
        <div className="relative h-full w-full">
          {/* 8-digit hex: Tailwind never emitted the `bg-[#0E4B9F]/12` opacity
              modifier on an arbitrary hex, so these tracks rendered transparent. */}
          <div className="absolute end-0 top-0 h-full w-[20px] rounded-t-full rounded-b-full bg-[#0E4B9F3D]" />
          <div className="absolute end-0 top-0 h-full w-[8px] rounded-t-full rounded-b-full bg-[#F147233D]" />
          <motion.div
            className="absolute end-0 top-0 w-[20px] origin-top rounded-t-full rounded-b-full bg-[#0E4B9F]"
            style={{ scaleY: reducedMotion ? 1 : fillScale, height: "100%" }}
          />
          <motion.div
            className="absolute end-0 top-0 w-[8px] origin-top rounded-t-full rounded-b-full bg-[#F14723]"
            style={{ scaleY: reducedMotion ? 1 : fillScale, height: "100%" }}
          />
        </div>
      </div>
      <div
        ref={containerRef}
        className="snap-y snap-mandatory overflow-y-auto overflow-x-hidden"
        style={{ height: "calc(100svh - 5rem)" }}
      >
        {children}
      </div>
    </div>
  );
}
