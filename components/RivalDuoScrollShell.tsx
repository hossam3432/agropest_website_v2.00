"use client";

import { motion, useReducedMotion, useScroll } from "framer-motion";
import { useRef, type ReactNode } from "react";

type RivalDuoScrollShellProps = {
  children: ReactNode;
};

export function RivalDuoScrollShell({ children }: RivalDuoScrollShellProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ container: containerRef });

  return (
    <div className="relative">
      <div className="pointer-events-none fixed inset-y-20 left-3 z-2npm0 hidden w-32 sm:block">
        <div className="relative h-full w-full">
          <div className="absolute left-0 top-0 h-full w-[20px] rounded-t-full rounded-b-full bg-[#0E4B9F]/12" />
          <div className="absolute left-0 top-0 h-full w-[8px] rounded-t-full rounded-b-full bg-[#F14723]/12" />
          <motion.div
            className="absolute left-0 top-0 w-[20px] origin-top rounded-t-full rounded-b-full bg-[#0E4B9F]"
            style={{ scaleY: reducedMotion ? 1 : scrollYProgress, height: "100%" }}
          />
          <motion.div
            className="absolute left-0 top-0 w-[8px] origin-top rounded-t-full rounded-b-full bg-[#F14723]"
            style={{ scaleY: reducedMotion ? 1 : scrollYProgress, height: "100%" }}
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
