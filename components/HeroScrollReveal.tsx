"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type HeroScrollRevealProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  className?: string;
  eyebrowClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
};

export function HeroScrollReveal({
  eyebrow,
  title,
  subtitle,
  className,
  eyebrowClassName = "eyebrow",
  titleClassName = "mt-5 text-[32px] font-bold leading-[1.05] tracking-normal sm:text-[38px] md:text-[44px] lg:text-[48px]",
  subtitleClassName = "mt-6 max-w-2xl text-base leading-8 sm:text-lg"
}: HeroScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const words = title.split(" ");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out", duration: 0.8 },
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        });

        tl.from(".hero-eyebrow", { opacity: 0, y: 16 })
          .from(".hero-word", { yPercent: 100, stagger: 0.08 }, "-=0.4")
          .from(".hero-subtitle", { opacity: 0, y: 20 }, "-=0.35");

        return tl;
      });

      // prefers-reduced-motion: just show everything, no motion
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([".hero-eyebrow", ".hero-word", ".hero-subtitle"], { opacity: 1, y: 0, yPercent: 0 });
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={className}>
      <p className={`hero-eyebrow ${eyebrowClassName}`}>{eyebrow}</p>
      <h1 className={titleClassName}>
        {words.flatMap((word, i) => [
          <span key={`word-${i}`} className="inline-block overflow-hidden pb-1 align-bottom">
            <span className="hero-word inline-block">{word}</span>
          </span>,
          i < words.length - 1 ? " " : null
        ])}
      </h1>
      <p className={`hero-subtitle ${subtitleClassName}`}>{subtitle}</p>
    </div>
  );
}
