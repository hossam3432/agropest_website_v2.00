import Link from "next/link";
import { localizeHref, type Locale } from "@/lib/content";

type HeroSectionProps = {
  locale: Locale;
  eyebrow?: string;
  title: string;
  subtitle: string;
  description?: string;
  backgroundImage?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  compact?: boolean;
};

export function HeroSection({
  locale,
  eyebrow,
  title,
  subtitle,
  description,
  backgroundImage,
  primaryCta,
  secondaryCta,
  compact = false
}: HeroSectionProps) {
  return (
    <section className={`relative isolate overflow-hidden ${compact ? "min-h-[380px]" : "min-h-[72svh]"} bg-agri-blue`}>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center"
        style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-agri-blue via-agri-blue/80 to-agri-green/40" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-agri-mist to-transparent" />

      <div className="container-shell relative flex min-h-[inherit] items-center py-20">
        <div className="max-w-3xl text-white">
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h1 className="mt-5 max-w-4xl text-3xl font-bold leading-[1.22] tracking-normal sm:text-4xl sm:leading-[1.18] lg:text-5xl lg:leading-[1.16]">{title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/85 sm:text-xl">{subtitle}</p>
          {description ? <p className="mt-4 max-w-3xl text-base leading-8 text-white/75 sm:text-lg">{description}</p> : null}
          {(primaryCta || secondaryCta) ? (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {primaryCta ? (
                <Link href={localizeHref(locale, primaryCta.href)} className="btn-accent">
                  {primaryCta.label}
                </Link>
              ) : null}
              {secondaryCta ? (
                <Link href={localizeHref(locale, secondaryCta.href)} className="btn-on-dark">
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
