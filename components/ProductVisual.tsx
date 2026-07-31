"use client";

import { useState } from "react";
import { ResponsiveImage } from "@/components/ResponsiveImage";

type ProductVisualProps = {
  src: string;
  alt: string;
  eyebrow: string;
  label: string;
  className?: string;
  priority?: boolean;
};

export function ProductVisual({ src, alt, eyebrow, label, className, priority = false }: ProductVisualProps) {
  const [hasImageError, setHasImageError] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-transparent ${className ?? ""}`}>
      {!hasImageError ? (
        <ResponsiveImage
          alt={alt}
          className="absolute inset-0 h-full w-full object-contain"
          objectFit="contain"
          sizes="(min-width: 1024px) 50vw, 100vw"
          priority={priority}
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
