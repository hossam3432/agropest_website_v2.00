"use client";

import { useState } from "react";

type ProductVisualProps = {
  src: string;
  alt: string;
  eyebrow: string;
  label: string;
  className?: string;
};

export function ProductVisual({ src, alt, eyebrow, label, className }: ProductVisualProps) {
  const [hasImageError, setHasImageError] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-transparent ${className ?? ""}`}>
      {!hasImageError ? (
        <img
          alt={alt}
          className="absolute inset-0 h-full w-full object-contain"
          onError={() => setHasImageError(true)}
          src={src}
        />
      ) : null}
      
      {hasImageError ? (
        <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
          <div className="border border-white/25 bg-white/10 px-6 py-5 text-white backdrop-blur-sm">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-agri-gold">{eyebrow}</p>
            <p className="mt-3 text-xl font-bold">{label}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
