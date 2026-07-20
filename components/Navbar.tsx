"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
  const [scrolled, setScrolled] = useState(false);
  const { company, languageSwitcher, navigation } = content;
  const navCta = content.ctaActions.whatsapp;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const saveLanguagePreference = (nextLocale: Locale) => {
    window.localStorage.setItem(languageCookieName, nextLocale);
    document.cookie = `${languageCookieName}=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;
    setIsOpen(false);
  };

  const languageOptions: Array<{ locale: Locale; label: string; short: string }> = [
    { locale: "en", label: languageSwitcher.english, short: "EN" },
    { locale: "ar", label: languageSwitcher.arabic, short: "ع" }
  ];

  return (
    <div className={`fixed inset-x-0 top-0 z-50 flex justify-center px-4 transition-all duration-300 ${scrolled ? "pt-2" : "pt-4"}`}>
      <header
        className={`w-full transition-all duration-300 ${
          scrolled ? "max-w-3xl" : "max-w-6xl"
        }`}
      >
      <nav
        className={`flex items-center justify-between gap-4 rounded-full border border-white/60 bg-white/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_8px_30px_rgba(15,23,42,0.12)] backdrop-blur-xl transition-all duration-300 ${
          scrolled ? "px-4 py-1.5" : "px-6 py-3"
        }`}
      >
        <Link href={localizeHref(locale, "/")} className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
          <span
            className={`flex shrink-0 items-center justify-center transition-all duration-300 ${
              scrolled ? "h-9 w-9" : "h-12 w-12"
            }`}
          >
            <img src={company.logoPath} alt={company.logoAlt} className="h-full w-full object-contain" />
          </span>
          {scrolled ? null : (
            <span className="min-w-0">
              <span className="block text-base font-bold text-agri-blue sm:text-lg">{company.shortName}</span>
              {locale === "en" ? null : (
                <span className="block text-xs font-medium uppercase tracking-[0.16em] text-slate-500">{company.descriptor}</span>
              )}
            </span>
          )}
        </Link>

        <button
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-agri-line bg-white xl:hidden"
          onClick={() => setIsOpen((value) => !value)}
          type="button"
        >
          <span className="flex w-5 flex-col gap-1">
            <span className="h-0.5 rounded bg-agri-blue" />
            <span className="h-0.5 rounded bg-agri-blue" />
            <span className="h-0.5 rounded bg-agri-blue" />
          </span>
        </button>

        <div className="hidden flex-nowrap items-center gap-0.5 xl:flex">
          {navigation.map((item) => {
            const href = localizeHref(locale, item.href);
            const active = href === `/${locale}` ? pathname === href : pathname.startsWith(href);
            return (
              <Link
                key={item.href}
                href={href}
                className={`whitespace-nowrap rounded-md px-2.5 py-2 text-[13px] font-semibold transition ${
                  active ? "bg-agri-mist text-agri-green" : "text-slate-600 hover:bg-agri-mist hover:text-agri-green"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 xl:flex">
          <div className="flex items-center rounded-full border border-agri-line bg-white/80 p-1" aria-label={languageSwitcher.label}>
            {languageOptions.map((option) => (
              <Link
                key={option.locale}
                href={switchLocalePath(pathname, option.locale)}
                className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${
                  option.locale === locale ? "bg-agri-green text-white" : "text-slate-600 hover:text-agri-green"
                }`}
                hrefLang={option.locale}
                onClick={() => saveLanguagePreference(option.locale)}
              >
                {scrolled ? option.short : option.label}
              </Link>
            ))}
          </div>
          <a
            className={`inline-flex items-center justify-center whitespace-nowrap rounded-full bg-agri-green font-bold text-white transition hover:bg-agri-greenDark ${
              scrolled ? "h-9 w-9 p-0" : "px-4 py-2 text-sm"
            }`}
            href={navCta.href}
            aria-label={navCta.label}
          >
            {scrolled ? (
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                <path d="M12.04 2c-5.52 0-10 4.48-10 10 0 1.77.46 3.45 1.27 4.9L2 22l5.25-1.38a9.96 9.96 0 0 0 4.79 1.22h.01c5.52 0 10-4.48 10-10s-4.48-10-10-10Zm0 18.15h-.01a8.2 8.2 0 0 1-4.17-1.14l-.3-.18-3.11.82.83-3.03-.2-.31a8.18 8.18 0 0 1-1.26-4.35c0-4.52 3.68-8.2 8.22-8.2 2.2 0 4.26.86 5.81 2.41a8.15 8.15 0 0 1 2.41 5.8c0 4.53-3.68 8.2-8.22 8.2Zm4.5-6.14c-.25-.12-1.46-.72-1.68-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.78.96-.15.16-.29.18-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.43.06-.66.31-.22.25-.87.85-.87 2.08 0 1.22.89 2.4 1.02 2.57.12.16 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.55.1.47-.07 1.46-.6 1.67-1.17.2-.58.2-1.07.14-1.17-.06-.11-.22-.17-.47-.29Z" />
              </svg>
            ) : (
              navCta.label
            )}
          </a>
        </div>
      </nav>

      {isOpen ? (
        <div className="mx-2 mb-2 mt-2 rounded-3xl border border-white/60 bg-white/90 shadow-inner backdrop-blur-xl xl:hidden">
          <div className="px-4 py-4">
            <div className="grid gap-1">
              {navigation.map((item) => {
                const href = localizeHref(locale, item.href);
                const active = href === `/${locale}` ? pathname === href : pathname.startsWith(href);
                return (
                  <Link
                    key={item.href}
                    href={href}
                    className={`rounded-full px-3 py-3 text-sm font-semibold ${
                      active ? "bg-agri-mist text-agri-green" : "text-slate-600"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <div className="mt-3 grid grid-cols-2 rounded-full border border-agri-line bg-white p-1" aria-label={languageSwitcher.label}>
                {languageOptions.map((option) => (
                  <Link
                    key={option.locale}
                    href={switchLocalePath(pathname, option.locale)}
                    className={`rounded-full px-3 py-2 text-center text-sm font-bold ${
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
                className="mt-3 rounded-full bg-agri-green px-4 py-3 text-center text-sm font-bold text-white"
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
    </div>
  );
}
