"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  src: string;
  width: number;
  height: number;
  alt: string;
  dir: string;
};

/* White strip pinned under the site nav — the logo shrinks once the page scrolls */
export default function StickyLogoBar({ src, width, height, alt, dir }: Props) {
  const [shrunk, setShrunk] = useState(false);

  useEffect(() => {
    const onScroll = () => setShrunk(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      dir={dir}
      className="sticky top-[81px] z-40 border-b transition-shadow duration-300"
      style={{ borderColor: "#0B4B6722", backgroundColor: "#ffffff", boxShadow: shrunk ? "0 6px 18px rgba(11,75,103,0.08)" : "none" }}
    >
      <div
        className={
          "mx-auto flex max-w-6xl items-center px-4 transition-all duration-300 ease-out sm:px-6 " +
          (shrunk ? "py-2" : "py-5")
        }
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority
          className={"w-auto transition-all duration-300 ease-out " + (shrunk ? "h-10 sm:h-11" : "h-20 sm:h-24")}
        />
      </div>
    </header>
  );
}
