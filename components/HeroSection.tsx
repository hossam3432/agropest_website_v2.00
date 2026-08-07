"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { localizeHref, type Locale } from "@/lib/content";

type HeroSectionProps = {
  locale: Locale;
  eyebrow?: string;
  title: string;
  subtitle: string;
  description?: string;
  backgroundImage?: string;
  backgroundPosition?: string;
  backgroundScale?: number;
  backgroundVideo?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  compact?: boolean;
  /** Set false when a full-bleed element (e.g. Breadcrumbs) already precedes this hero. */
  leading?: boolean;
  /** On lg+ screens, confine the image to the left panel with a solid/gradient panel on the right for the text; falls back to full-bleed cover below lg. */
  splitOnLarge?: boolean;
};

export function HeroSection({
  locale,
  eyebrow,
  title,
  subtitle,
  description,
  backgroundImage,
  backgroundPosition,
  backgroundScale,
  backgroundVideo,
  primaryCta,
  secondaryCta,
  compact = false,
  leading = true,
  splitOnLarge = false
}: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (backgroundVideo && video) {
      video.muted = true;
      video.defaultMuted = true;
      video.play().catch(() => {});
    }
  }, [backgroundVideo]);

  const imageStyle: React.CSSProperties | undefined =
    backgroundPosition || backgroundScale
      ? {
          ...(backgroundPosition ? { objectPosition: backgroundPosition } : null),
          ...(backgroundScale ? { transform: `scale(${backgroundScale})` } : null)
        }
      : undefined;

  return (
    <section
      className={`relative isolate overflow-hidden ${leading ? "-mt-24 pt-24" : ""} ${compact ? "min-h-[520px]" : "min-h-[72svh]"} bg-agri-blue`}
    >
      {backgroundVideo ? (
        <video
          ref={videoRef}
          aria-hidden="true"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
      ) : backgroundImage ? (
        <>
          <div aria-hidden="true" className={`absolute inset-0 ${splitOnLarge ? "lg:hidden" : ""}`}>
            <ResponsiveImage
              src={backgroundImage}
              alt=""
              className="h-full w-full"
              objectFit="cover"
              priority
              style={imageStyle}
            />
          </div>
          {splitOnLarge ? (
            <div aria-hidden="true" className="absolute inset-0 hidden lg:block">
              <div className="absolute inset-y-0 left-0 w-[58%] overflow-hidden">
                <ResponsiveImage
                  src={backgroundImage}
                  alt=""
                  className="h-full w-full"
                  objectFit="cover"
                  priority
                  style={imageStyle}
                />
                <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-r from-transparent via-agri-blue/60 to-agri-blue" />
              </div>
              <div className="absolute inset-y-0 right-0 w-[42%] bg-agri-blue" />
            </div>
          ) : null}
        </>
      ) : null}
      <div className={`absolute inset-0 bg-gradient-to-r from-agri-blue via-agri-blue/80 to-agri-green/40 ${splitOnLarge ? "lg:hidden" : ""}`} />
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-agri-mist to-transparent" />

      <div className="container-shell relative flex min-h-[inherit] items-center py-20">
        <div className={`max-w-3xl text-white ${splitOnLarge ? "lg:ml-auto lg:text-right" : ""}`}>
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h1
            className={`mt-5 max-w-4xl text-3xl font-bold leading-[1.22] tracking-normal sm:text-4xl sm:leading-[1.18] lg:text-5xl lg:leading-[1.16] ${
              locale === "ar" ? "lg:font-semibold" : ""
            }`}
          >
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/85 sm:text-xl">{subtitle}</p>
          {description ? <p className="mt-4 max-w-3xl text-base leading-8 text-white/75 sm:text-lg">{description}</p> : null}
          {(primaryCta || secondaryCta) ? (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {primaryCta ? (
                <Link href={localizeHref(locale, primaryCta.href)} className="btn-hero-glass">
                  {primaryCta.label}
                </Link>
              ) : null}
              {secondaryCta ? (
                <Link href={localizeHref(locale, secondaryCta.href)} className="btn-hero-glass">
                  {secondaryCta.label}
                </Link>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
