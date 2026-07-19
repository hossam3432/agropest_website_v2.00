"use client";

import { useState } from "react";

const BLUE = "#0E4B9F";
const ORANGE = "#F14723";
const INK = "#0A2A57";

type CardContent = {
  badge: string;
  name: string;
  text: string;
};

type RivalDuoCompositionToggleProps = {
  card1: CardContent;
  card2: CardContent;
};

export function RivalDuoCompositionToggle({ card1, card2 }: RivalDuoCompositionToggleProps) {
  const [active, setActive] = useState<1 | 2>(1);

  const cards = [
    { key: 1 as const, content: card1, color: BLUE },
    { key: 2 as const, content: card2, color: ORANGE }
  ];

  return (
    <div className="mt-5 flex flex-col gap-5 lg:flex-row">
      {cards.map(({ key, content, color }) => {
        const isActive = active === key;
        return (
          <article
            key={key}
            role="button"
            tabIndex={0}
            aria-pressed={isActive}
            onClick={() => setActive(key)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setActive(key);
              }
            }}
            className="flex-1 cursor-pointer select-none rounded-[1.5rem] bg-white p-6 shadow-[0_20px_60px_rgba(14,75,159,0.12)] transition-all duration-300 active:scale-[0.98] sm:p-7"
            style={{ boxShadow: isActive ? `0 20px 60px ${color}33, 0 0 0 2px ${color}` : "0 20px 60px rgba(14,75,159,0.12)" }}
          >
            <span
              className="inline-block rounded-full px-4 py-1.5 text-xs font-normal uppercase tracking-[0.12em] text-white sm:text-sm"
              style={{ backgroundColor: color }}
            >
              {content.badge}
            </span>
            <h3 className="mt-3 text-xl font-extrabold sm:text-2xl" style={{ color: INK }}>{content.name}</h3>
            <p className="mt-3 text-base leading-7 text-slate-600">{content.text}</p>
          </article>
        );
      })}
    </div>
  );
}
