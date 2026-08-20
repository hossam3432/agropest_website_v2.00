"use client";

import { useState } from "react";
import { RevealItem, RevealSection, StaggerContainer } from "@/components/animations";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import type { SiteContent } from "@/lib/content";

type PartnersSectionProps = {
  content: SiteContent;
  className?: string;
};

export function PartnersSection({ content, className = "" }: PartnersSectionProps) {
  const { partnersSection } = content.home;
  const [activePartner, setActivePartner] = useState<string | null>(null);

  return (
    <section className={`field-bloom field-bloom-flip py-12 sm:py-14 lg:py-[105px] ${className}`}>
      <RevealSection className="container-shell" amount={0.15}>
        <div className="max-w-3xl">
          <p className="eyebrow">{partnersSection.eyebrow}</p>
          <h2 className="section-title mt-3">{partnersSection.title}</h2>
          <p className="section-copy mt-4">{partnersSection.description}</p>
        </div>

        <StaggerContainer className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:mt-7" amount={0.15}>
          {partnersSection.items.map((partner) => {
            const isActive = partner.name === activePartner;

            return (
              <RevealItem key={partner.name} hoverLift>
                <button
                  aria-pressed={isActive}
                  className={`group grid min-h-[308px] w-full grid-rows-[8.25rem_auto_auto] rounded-md border border-agri-line bg-white px-4 py-5 text-center shadow-sm transition duration-300 hover:shadow-soft focus:outline-none focus:ring-2 focus:ring-agri-goldInk focus:ring-offset-2 focus:ring-offset-white sm:min-h-[345px] sm:grid-rows-[9.75rem_2.25rem_3.75rem] sm:px-6 sm:py-7 ${
 isActive ? "shadow-soft" : ""
 }`}
                  onClick={() => setActivePartner(isActive ? null : partner.name)}
                  type="button"
                >
                  <div className="flex h-full items-center justify-center">
                    <ResponsiveImage
                      src={partner.logo}
                      alt={partner.logoAlt}
                      sizes="190px"
                      objectFit="contain"
                      className="max-h-16 w-full max-w-[190px] object-contain opacity-90 transition duration-300 group-hover:scale-105 group-hover:opacity-100"
                    />
                  </div>
                  <p className="flex items-center justify-center text-base font-black tracking-tight text-black">{partner.name}</p>
                  <p className="flex items-start justify-center text-sm font-semibold leading-6 text-black">{partner.description}</p>
                </button>
              </RevealItem>
            );
          })}
        </StaggerContainer>
      </RevealSection>
    </section>
  );
}
