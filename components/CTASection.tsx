import Link from "next/link";
import type { ReactNode } from "react";
import { RevealSection } from "@/components/animations";
import { localizeHref, type Locale } from "@/lib/content";

type CTASectionProps = {
  locale: Locale;
  eyebrow?: string;
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  tertiaryLabel?: string;
  tertiaryHref?: string;
  backgroundImage?: string;
};

function ActionLink({ href, className, children }: { href: string; className: string; children: ReactNode }) {
  if (href.startsWith("http")) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export function CTASection({
  locale,
  eyebrow,
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  tertiaryLabel,
  tertiaryHref,
  backgroundImage
}: CTASectionProps) {
  return (
    <section className="bg-agri-mist py-16 sm:py-20 lg:py-24">
      <div className="container-shell">
        <RevealSection className="relative overflow-hidden rounded-3xl bg-agri-blue px-6 py-12 text-white shadow-soft sm:px-10 sm:py-14 lg:px-12 lg:py-16" amount={0.15}>
          {backgroundImage ? (
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-cover bg-center opacity-25"
              style={{ backgroundImage: `url(${backgroundImage})` }}
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-r from-agri-blue via-agri-blue/90 to-agri-green/75" />
          <div className="absolute right-0 top-0 hidden h-full w-1/4 border-l border-white/10 bg-white/5 lg:block" />
          <div className="relative grid gap-9 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-12">
            <div className="max-w-3xl">
              {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
              <h2 className="mt-3 text-3xl font-bold leading-tight tracking-normal sm:text-4xl lg:text-5xl">{title}</h2>
              <p className="mt-4 leading-8 text-white/75">{description}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:max-w-xs lg:flex-col">
              <ActionLink href={localizeHref(locale, primaryHref)} className="btn-on-dark-outline">
                {primaryLabel}
              </ActionLink>
              {secondaryLabel && secondaryHref ? (
                <ActionLink href={localizeHref(locale, secondaryHref)} className="btn-on-dark-outline">
                  {secondaryLabel}
                </ActionLink>
              ) : null}
              {tertiaryLabel && tertiaryHref ? (
                <ActionLink href={localizeHref(locale, tertiaryHref)} className="btn-on-dark-outline">
                  {tertiaryLabel}
                </ActionLink>
              ) : null}
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}
