export type ConsentCategory = "analytics" | "marketing";

export type ConsentState = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
};

const STORAGE_KEY = "agropest_cookie_consent";
const CONSENT_VERSION = 1;

type StoredConsent = ConsentState & { version: number };

export function readConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredConsent;
    if (parsed.version !== CONSENT_VERSION) return null;
    return {
      necessary: true,
      analytics: !!parsed.analytics,
      marketing: !!parsed.marketing,
      timestamp: parsed.timestamp
    };
  } catch {
    return null;
  }
}

export function writeConsent(prefs: { analytics: boolean; marketing: boolean }): ConsentState {
  const state: ConsentState = {
    necessary: true,
    analytics: prefs.analytics,
    marketing: prefs.marketing,
    timestamp: Date.now()
  };
  if (typeof window !== "undefined") {
    const stored: StoredConsent = { ...state, version: CONSENT_VERSION };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  }
  return state;
}
