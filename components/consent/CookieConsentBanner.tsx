"use client";

import { useState } from "react";
import { useConsent } from "./ConsentProvider";

export function CookieConsentBanner() {
  const { hasResponded, acceptAll, rejectNonEssential, savePreferences } = useConsent();
  const [expanded, setExpanded] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  if (hasResponded) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-agri-line bg-white/95 p-4 shadow-soft backdrop-blur sm:p-6"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-agri-blue sm:max-w-2xl">
            We use cookies to run this site and, with your consent, to understand how it&apos;s used. Choose what
            you&apos;re comfortable with — you can change this anytime.
          </p>
          <div className="flex flex-wrap gap-2 sm:flex-nowrap">
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className="rounded-md border border-agri-line px-4 py-2 text-sm font-medium text-agri-blue transition hover:bg-agri-mist"
            >
              Customize
            </button>
            <button
              type="button"
              onClick={rejectNonEssential}
              className="rounded-md border border-agri-line px-4 py-2 text-sm font-medium text-agri-blue transition hover:bg-agri-mist"
            >
              Reject Non-Essential
            </button>
            <button
              type="button"
              onClick={acceptAll}
              className="rounded-md bg-agri-green px-4 py-2 text-sm font-medium text-white transition hover:bg-agri-greenDark"
            >
              Accept All
            </button>
          </div>
        </div>

        {expanded ? (
          <div className="grid gap-4 border-t border-agri-line pt-4 sm:grid-cols-3">
            <label className="flex items-start gap-3 text-sm text-agri-blue">
              <input type="checkbox" checked disabled className="mt-1 h-4 w-4 accent-agri-green" />
              <span>
                <span className="block font-medium">Necessary</span>
                <span className="block text-agri-blue/70">Required for the site to function. Always on.</span>
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
                <span className="block font-medium">Analytics</span>
                <span className="block text-agri-blue/70">Helps us understand site usage (Google Analytics).</span>
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
                <span className="block font-medium">Marketing</span>
                <span className="block text-agri-blue/70">Used for ads and campaign measurement.</span>
              </span>
            </label>
            <div className="sm:col-span-3">
              <button
                type="button"
                onClick={() => savePreferences({ analytics, marketing })}
                className="rounded-md bg-agri-green px-4 py-2 text-sm font-medium text-white transition hover:bg-agri-greenDark"
              >
                Save Preferences
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
