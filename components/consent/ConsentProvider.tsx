"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { readConsent, writeConsent, type ConsentState } from "@/lib/consent";

type ConsentContextValue = {
  consent: ConsentState | null;
  hasResponded: boolean;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  savePreferences: (prefs: { analytics: boolean; marketing: boolean }) => void;
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
  }, []);

  const acceptAll = useCallback(() => apply({ analytics: true, marketing: true }), [apply]);
  const rejectNonEssential = useCallback(() => apply({ analytics: false, marketing: false }), [apply]);

  return (
    <ConsentContext.Provider
      value={{ consent, hasResponded, acceptAll, rejectNonEssential, savePreferences: apply }}
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
