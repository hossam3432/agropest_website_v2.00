"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { clearStoredConsent, readConsent, writeConsent, type ConsentState } from "@/lib/consent";
import { clearAnalyticsCookies, denyGtagConsent } from "@/lib/gtag";

type ConsentContextValue = {
  consent: ConsentState | null;
  hasResponded: boolean;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  savePreferences: (prefs: { analytics: boolean; marketing: boolean }) => void;
  resetConsent: () => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const [hasResponded, setHasResponded] = useState(false);

  // Reading localStorage must happen post-mount: the server has no access to
  // it, so the initial client render matches the server (banner visible,
  // consent null) and only diverges here, after hydration completes.
  useEffect(() => {
    const stored = readConsent();
    if (stored) {
      setConsent(stored);
      setHasResponded(true);
    }
  }, []);

  const apply = useCallback((prefs: { analytics: boolean; marketing: boolean }) => {
    const state = writeConsent(prefs);
    setConsent(state);
    setHasResponded(true);
    // Revoking analytics consent (vs. never having granted it) means gtag.js
    // may already be loaded and GA cookies may already be on disk — tell
    // Consent Mode and sweep the cookies regardless of prior state.
    if (!prefs.analytics) {
      denyGtagConsent();
      clearAnalyticsCookies();
    }
  }, []);

  const acceptAll = useCallback(() => apply({ analytics: true, marketing: true }), [apply]);
  const rejectNonEssential = useCallback(() => apply({ analytics: false, marketing: false }), [apply]);

  const resetConsent = useCallback(() => {
    clearStoredConsent();
    denyGtagConsent();
    clearAnalyticsCookies();
    setConsent(null);
    setHasResponded(false);
  }, []);

  return (
    <ConsentContext.Provider
      value={{ consent, hasResponded, acceptAll, rejectNonEssential, savePreferences: apply, resetConsent }}
    >
      {children}
    </ConsentContext.Provider>
  );
}

export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent must be used within a ConsentProvider");
  return ctx;
}
