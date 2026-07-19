import type { ReactNode } from "react";

const BLUE = "#0E4B9F";
const ORANGE = "#F14723";

export function RivalDuoSectionKicker({ children, light }: { children: ReactNode; light?: boolean }) {
  return (
    <div className="inline-flex flex-col overflow-hidden rounded-xl shadow-md">
      <span className="h-2" style={{ backgroundColor: ORANGE }} />
      <span
        className="px-6 py-3 text-base font-normal uppercase tracking-[0.14em] text-white"
        style={{ backgroundColor: light ? "rgba(255,255,255,0.18)" : BLUE, backdropFilter: light ? "blur(6px)" : undefined }}
      >
        {children}
      </span>
    </div>
  );
}
