"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { defaultLocale, isLocale, type Locale } from "@/lib/content";
import { useConsent } from "./ConsentProvider";

const copy: Record<Locale, Record<string, string>> = {
  en: {
    label: "Cookie consent",
    intro:
      "We use cookies to run this site and, with your consent, to understand how it’s used. Choose what you’re comfortable with — you can change this anytime.",
    customize: "Customize",
    reject: "Reject Non-Essential",
    accept: "Accept All",
    necessary: "Necessary",
    necessaryDesc: "Required for the site to function. Always on.",
    analytics: "Analytics",
    analyticsDesc: "Helps us understand site usage (Google Analytics).",
    marketing: "Marketing",
    marketingDesc: "Used for ads and campaign measurement.",
    save: "Save Preferences"
  },
  ar: {
    label: "الموافقة على ملفات تعريف الارتباط",
    intro:
      "نستخدم ملفات تعريف الارتباط لتشغيل هذا الموقع، وبموافقتك، لفهم طريقة استخدامه. اختر ما يناسبك — ويمكنك تغيير ذلك في أي وقت.",
    customize: "تخصيص",
    reject: "رفض غير الضروري",
    accept: "قبول الكل",
    necessary: "ضرورية",
    necessaryDesc: "لازمة لعمل الموقع. مفعّلة دائمًا.",
    analytics: "التحليلات",
    analyticsDesc: "تساعدنا على فهم استخدام الموقع (Google Analytics).",
    marketing: "التسويق",
    marketingDesc: "تُستخدم للإعلانات وقياس الحملات.",
    save: "حفظ التفضيلات"
  }
};

export function CookieConsentBanner() {
  const { hasResponded, acceptAll, rejectNonEssential, savePreferences } = useConsent();
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  const segment = pathname?.split("/").filter(Boolean)[0];
  const locale = isLocale(segment) ? segment : defaultLocale;
  const t = copy[locale];

  if (hasResponded) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t.label}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-agri-line bg-white/95 p-4 shadow-soft backdrop-blur sm:p-6"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-agri-blue sm:max-w-2xl">{t.intro}</p>
          <div className="flex flex-wrap gap-2 sm:flex-nowrap">
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className="btn btn-sm"
            >
              {t.customize}
            </button>
            <button
              type="button"
              onClick={rejectNonEssential}
              className="btn btn-sm"
            >
              {t.reject}
            </button>
            <button
              type="button"
              onClick={acceptAll}
              className="btn btn-sm btn-solid"
            >
              {t.accept}
            </button>
          </div>
        </div>

        {expanded ? (
          <div className="grid gap-4 border-t border-agri-line pt-4 sm:grid-cols-3">
            <label className="flex items-start gap-3 text-sm text-agri-blue">
              <input type="checkbox" checked disabled className="mt-1 h-4 w-4 accent-agri-green" />
              <span>
                <span className="block font-medium">{t.necessary}</span>
                <span className="block text-agri-blue/70">{t.necessaryDesc}</span>
              </span>
            </label>
            <label className="flex items-start gap-3 text-sm text-agri-blue">
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="mt-1 h-4 w-4 accent-agri-green"
              />
              <span>
                <span className="block font-medium">{t.analytics}</span>
                <span className="block text-agri-blue/70">{t.analyticsDesc}</span>
              </span>
            </label>
            <label className="flex items-start gap-3 text-sm text-agri-blue">
              <input
                type="checkbox"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
                className="mt-1 h-4 w-4 accent-agri-green"
              />
              <span>
                <span className="block font-medium">{t.marketing}</span>
                <span className="block text-agri-blue/70">{t.marketingDesc}</span>
              </span>
            </label>
            <div className="sm:col-span-3">
              <button
                type="button"
                onClick={() => savePreferences({ analytics, marketing })}
                className="btn btn-sm"
              >
                {t.save}
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
