declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export type GtagConsentState = "granted" | "denied";

export type GtagConsentUpdate = {
  analytics_storage: GtagConsentState;
  ad_storage: GtagConsentState;
  ad_user_data: GtagConsentState;
  ad_personalization: GtagConsentState;
};

const DENIED_CONSENT: GtagConsentUpdate = {
  analytics_storage: "denied",
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied"
};

// Works whether or not gtag.js has actually loaded: if window.gtag isn't
// defined yet, push the arguments array straight onto dataLayer — that's
// exactly what the gtag() shim does once it's loaded, so nothing is lost.
export function pushGtagConsentUpdate(update: GtagConsentUpdate): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", update);
  } else {
    window.dataLayer.push(["consent", "update", update]);
  }
}

export function denyGtagConsent(): void {
  pushGtagConsentUpdate(DENIED_CONSENT);
}

// Matches the classic `_ga` cookie and GA4's per-stream `_ga_<CONTAINER_ID>`
// cookies, without catching unrelated cookies like `_gac_`/`_gat_`.
function isGaCookieName(name: string): boolean {
  return name === "_ga" || name.startsWith("_ga_");
}

export function clearAnalyticsCookies(): void {
  if (typeof document === "undefined") return;

  const cookieNames = document.cookie
    .split(";")
    .map((entry) => entry.split("=")[0]?.trim())
    .filter((name): name is string => !!name && isGaCookieName(name));

  if (cookieNames.length === 0) return;

  const hostname = window.location.hostname;
  const domainParts = hostname.split(".");
  const parentDomain = domainParts.length > 2 ? domainParts.slice(-2).join(".") : hostname;
  const domainVariants = Array.from(new Set([hostname, `.${hostname}`, `.${parentDomain}`]));

  for (const name of cookieNames) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    for (const domain of domainVariants) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${domain}`;
    }
  }
}
