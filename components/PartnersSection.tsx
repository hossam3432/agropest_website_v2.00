"use client";

import { useState } from "react";
import { RevealItem, RevealSection, StaggerContainer } from "@/components/animations";
import type { SiteContent } from "@/lib/content";

type PartnersSectionProps = {
  content: SiteContent;
};

export function PartnersSection({ content }: PartnersSectionProps) {
  const { partnersSection } = content.home;
  const [activePartner, setActivePartner] = useState<string | null>(null);

  return (
    <section className="bg-gradient-to-br from-agri-blue via-agri-greenDark to-agri-blue py-12 text-white sm:py-14 lg:py-16">
      <RevealSection className="container-shell" amount={0.15}>
        <div className="max-w-3xl">
          <p className="eyebrow">{partnersSection.eyebrow}</p>
          <h2 className="section-title mt-3 text-white">{partnersSection.title}</h2>
          <p className="section-copy mt-4 text-white/80">{partnersSection.description}</p>
        </div>

        <StaggerContainer className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" amount={0.15}>
          {partnersSection.items.map((partner) => {
            const isActive = partner.name === activePartner;

            return (
              <RevealItem key={partner.name} hoverLift>
                <button
                  aria-pressed={isActive}
                  className={`group grid min-h-[205px] w-full grid-rows-[5.5rem_auto_auto] border bg-white px-4 py-5 text-center shadow-sm transition duration-300 hover:border-agri-gold hover:bg-white hover:shadow-soft focus:outline-none focus:ring-2 focus:ring-agri-gold focus:ring-offset-2 focus:ring-offset-agri-blue sm:min-h-[230px] sm:grid-rows-[6.5rem_2.25rem_3.75rem] sm:px-6 sm:py-7 ${
                    isActive ? "border-agri-gold shadow-soft" : "border-agri-line"
                  }`}
                  onClick={() => setActivePartner(isActive ? null : partner.name)}
                  type="button"
                >
                  <div className="flex h-full items-center justify-center">
                    <img
                      src={partner.logo}
                      alt={partner.logoAlt}
                      className={`max-h-16 w-full max-w-[190px] object-contain opacity-90 transition duration-300 group-hover:scale-105 group-hover:opacity-100 ${
                        isActive ? "grayscale-0 contrast-100" : "grayscale contrast-125"
                      }`}
                    />
                  </div>
                  <p className="flex items-center justify-center text-base font-black tracking-tight text-slate-700">{partner.name}</p>
                  <p className="flex items-start justify-center text-sm font-semibold leading-6 text-slate-500">{partner.description}</p>
                </button>
              </RevealItem>
            );
          })}
        </StaggerContainer>
      </RevealSection>
    </section>
  );
}
