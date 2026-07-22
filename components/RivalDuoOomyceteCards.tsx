"use client";

import { useLayoutEffect, useRef, useState } from "react";

const ORANGE = "#F14723";
const BLUE = "#0E4B9F";
const INK = "#0A2A57";

type RivalDuoOomyceteCardsProps = {
  card1: { image: string; title: string; text: string };
  card2: { image: string; title: string; text: string };
};

export function RivalDuoOomyceteCards({ card1, card2 }: RivalDuoOomyceteCardsProps) {
  const overlay1Ref = useRef<HTMLDivElement>(null);
  const overlay2Ref = useRef<HTMLDivElement>(null);
  const [overlayHeight, setOverlayHeight] = useState<number | undefined>(undefined);

  useLayoutEffect(() => {
    function recompute() {
      const h1 = overlay1Ref.current?.scrollHeight ?? 0;
      const h2 = overlay2Ref.current?.scrollHeight ?? 0;
      setOverlayHeight(Math.max(h1, h2));
    }
    setOverlayHeight(undefined);
    recompute();
    const observer = new ResizeObserver(recompute);
    if (overlay1Ref.current) observer.observe(overlay1Ref.current);
    if (overlay2Ref.current) observer.observe(overlay2Ref.current);
    return () => observer.disconnect();
  }, [card1.title, card1.text, card2.title, card2.text]);

  return (
    <div className="mt-4 grid gap-4 sm:mt-5 sm:grid-cols-2 sm:gap-5">
      <article className="relative mx-auto w-[68%] overflow-hidden rounded-[1.75rem] shadow-[0_20px_60px_rgba(14,75,159,0.12)] sm:w-full lg:w-[78%]">
        <div className="h-72 w-full overflow-hidden bg-white sm:h-[clamp(280px,36vh,400px)]">
          <img src={card1.image} alt="" className="h-full w-full object-cover" />
        </div>
        <div ref={overlay1Ref} className="absolute inset-x-0 bottom-0 bg-white/70 p-4 backdrop-blur-sm sm:p-6" style={{ height: overlayHeight }}>
          <p className="text-sm font-bold uppercase tracking-[0.14em]" style={{ color: ORANGE }}>01</p>
          <h3 className="mt-1 text-lg font-extrabold sm:text-2xl" style={{ color: INK }}>{card1.title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base sm:leading-[38px]">{card1.text}</p>
        </div>
      </article>
      <article className="relative mx-auto w-[68%] overflow-hidden rounded-[1.75rem] shadow-[0_20px_60px_rgba(14,75,159,0.12)] sm:w-full lg:w-[78%]">
        <div className="h-72 w-full overflow-hidden bg-white sm:h-[clamp(280px,36vh,400px)]">
          <img src={card2.image} alt="" className="h-full w-full object-cover" />
        </div>
        <div ref={overlay2Ref} className="absolute inset-x-0 bottom-0 bg-white/70 p-4 backdrop-blur-sm sm:p-6" style={{ height: overlayHeight }}>
          <p className="text-sm font-bold uppercase tracking-[0.14em]" style={{ color: BLUE }}>02</p>
          <h3 className="mt-1 text-lg font-extrabold sm:text-2xl" style={{ color: INK }}>{card2.title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base sm:leading-[38px]">{card2.text}</p>
        </div>
      </article>
    </div>
  );
}
