"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  languageCookieName,
  localizeHref,
  switchLocalePath,
  type Locale,
  type SiteContent
} from "@/lib/content";

type NavbarProps = {
  content: SiteContent;
  locale: Locale;
};

export function Navbar({ content, locale }: NavbarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { company, languageSwitcher, navigation } = content;
  const navCta = content.ctaActions.whatsapp;

  const saveLanguagePreference = (nextLocale: Locale) => {
    window.localStorage.setItem(languageCookieName, nextLocale);
    document.cookie = `${languageCookieName}=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;
    setIsOpen(false);
  };

  const languageOptions: Array<{ locale: Locale; label: string }> = [
    { locale: "en", label: languageSwitcher.english },
    { locale: "ar", label: languageSwitcher.arabic }
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-agri-line bg-white/95 backdrop-blur">
      <nav className="container-shell flex min-h-20 items-center justify-between gap-4">
        <Link href={localizeHref(locale, "/")} className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
          <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden border border-agri-line bg-white p-1 shadow-sm">
            <img src={company.logoPath} alt={company.logoAlt} className="h-full w-full object-contain" />
          </span>
          <span className="min-w-0">
            <span className="block text-base font-bold text-agri-blue sm:text-lg">{company.shortName}</span>
            <span className="block text-xs font-medium uppercase tracking-[0.16em] text-slate-500">{company.descriptor}</span>
          </span>
        </Link>

        <button
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-agri-line bg-white xl:hidden"
          onClick={() => setIsOpen((value) => !value)}
          type="button"
        >
          <span className="flex w-5 flex-col gap-1">
            <span className="h-0.5 rounded bg-agri-blue" />
            <span className="h-0.5 rounded bg-agri-blue" />
            <span className="h-0.5 rounded bg-agri-blue" />
          </span>
        </button>

        <div className="hidden items-center gap-1 xl:flex">
          {navigation.map((item) => {
            const href = localizeHref(locale, item.href);
            const active = href === `/${locale}` ? pathname === href : pathname.startsWith(href);
            return (
              <Link
                key={item.href}
                href={href}
                className={`rounded-md px-3 py-2 text-sm font-semibold transition ${
                  active ? "bg-agri-mist text-agri-green" : "text-slate-600 hover:bg-agri-mist hover:text-agri-green"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 xl:flex">
          <div className="flex items-center border border-agri-line bg-white p-1" aria-label={languageSwitcher.label}>
            {languageOptions.map((option) => (
              <Link
                key={option.locale}
                href={switchLocalePath(pathname, option.locale)}
                className={`px-3 py-1.5 text-xs font-bold transition ${
                  option.locale === locale ? "bg-agri-green text-white" : "text-slate-600 hover:text-agri-green"
                }`}
                hrefLang={option.locale}
                onClick={() => saveLanguagePreference(option.locale)}
              >
                {option.label}
              </Link>
            ))}
          </div>
          <a className="rounded-md bg-agri-gold px-4 py-2 text-sm font-bold text-white transition hover:bg-agri-orange" href={navCta.href}>
            {navCta.label}
          </a>
        </div>
      </nav>

      {isOpen ? (
        <div className="border-t border-agri-line bg-white xl:hidden">
          <div className="container-shell py-4">
            <div className="grid gap-1">
              {navigation.map((item) => {
                const href = localizeHref(locale, item.href);
                const active = href === `/${locale}` ? pathname === href : pathname.startsWith(href);
                return (
                  <Link
                    key={item.href}
                    href={href}
                    className={`rounded-md px-3 py-3 text-sm font-semibold ${
                      active ? "bg-agri-mist text-agri-green" : "text-slate-600"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <div className="mt-3 grid grid-cols-2 border border-agri-line bg-white p-1" aria-label={languageSwitcher.label}>
                {languageOptions.map((option) => (
                  <Link
                    key={option.locale}
                    href={switchLocalePath(pathname, option.locale)}
                    className={`px-3 py-2 text-center text-sm font-bold ${
                      option.locale === locale ? "bg-agri-green text-white" : "text-slate-600"
                    }`}
                    hrefLang={option.locale}
                    onClick={() => saveLanguagePreference(option.locale)}
                  >
                    {option.label}
                  </Link>
                ))}
              </div>
              <a
                className="mt-3 rounded-md bg-agri-gold px-4 py-3 text-center text-sm font-bold text-white"
                href={navCta.href}
                onClick={() => setIsOpen(false)}
              >
                {navCta.label}
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
