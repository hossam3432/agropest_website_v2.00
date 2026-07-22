"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const CREAM = "#F7F2EF";

type Props = {
  src: string;
  alt: string;
  dir: string;
};

/* Hero logo square: drops in + fades on load, then flies into a small docked
   badge under the sticky navbar once the page is scrolled past the hero. */
export default function LogoSquare({ src, alt, dir }: Props) {
  const [docked, setDocked] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setDocked((prev) => (prev ? y > 140 : y > 220));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const sideClass = dir === "rtl" ? "right-4 sm:right-6" : "left-4 sm:left-6";

  return (
    <div className="relative -mt-12 mb-8 h-[152px] w-[152px] sm:-mt-16 sm:mb-10 sm:h-[230px] sm:w-[230px] md:h-[173px] md:w-[173px] lg:mt-0 lg:h-[230px] lg:w-[230px]">
      {/* invisible spacer — keeps the hero column's height stable once the square docks and leaves flow */}
      <div aria-hidden="true" className="h-full w-full" />

      <div
        className={
          "lx-logo-drop transition-[top,left,right,width,height] duration-500 ease-out " +
          (docked ? "fixed top-[81px] z-40 h-24 w-24 " + sideClass : "absolute inset-0")
        }
        style={{ backgroundColor: CREAM }}
      >
        {!docked && (
          <span aria-hidden="true" className="absolute inset-x-0 bottom-full h-[2000px]" style={{ backgroundColor: CREAM }} />
        )}
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
    </div>
  );
}
