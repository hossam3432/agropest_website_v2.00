"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { isLocale, languageCookieName, type Locale, type SiteContent } from "@/lib/content";

type LanguageSelectionProps = {
  content: SiteContent;
};

export function LanguageSelection({ content }: LanguageSelectionProps) {
  const router = useRouter();
  const { company, languageSelection } = content;

  useEffect(() => {
    const preferredLocale = window.localStorage.getItem(languageCookieName);

    if (isLocale(preferredLocale ?? undefined)) {
      router.replace(`/${preferredLocale}`);
    }
  }, [router]);

  const chooseLanguage = (locale: Locale) => {
    window.localStorage.setItem(languageCookieName, locale);
    document.cookie = `${languageCookieName}=${locale}; path=/; max-age=31536000; SameSite=Lax`;
    router.push(`/${locale}`);
  };

  return (
    <main className="relative isolate flex min-h-screen items-center overflow-hidden bg-agri-mist px-4 py-10">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center opacity-[0.18]"
        style={{ backgroundImage: "url(/images/backgrounds/egypt-field-rows.jpg)" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(10,61,43,0.96)_0%,rgba(23,50,77,0.88)_42%,rgba(244,247,245,0.94)_100%)]" />
      <div className="absolute start-0 top-0 h-1 w-full bg-agri-gold" />
      <div className="container-shell relative">
        <section className="mx-auto max-w-3xl border border-white/15 bg-white/95 p-7 text-center shadow-soft backdrop-blur sm:p-10 lg:p-12">
          <div className="mx-auto flex h-28 w-28 items-center justify-center overflow-hidden border border-agri-line bg-white p-2 shadow-sm sm:h-32 sm:w-32">
            <img src={company.logoPath} alt={company.logoAlt} className="h-full w-full object-contain" />
          </div>
          <p className="mt-6 text-sm font-bold uppercase tracking-[0.22em] text-agri-gold">{company.descriptor}</p>
          <h1 className="mt-3 text-4xl font-bold tracking-normal text-agri-blue sm:text-5xl">{languageSelection.title}</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-slate-600">{languageSelection.subtitle}</p>

          <div className="mx-auto mt-9 grid max-w-xl gap-3 sm:grid-cols-2">
            <button className="btn-primary" type="button" onClick={() => chooseLanguage("en")}>
              {languageSelection.englishLabel}
            </button>
            <button className="btn-secondary" dir="rtl" type="button" onClick={() => chooseLanguage("ar")}>
              {languageSelection.arabicLabel}
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
