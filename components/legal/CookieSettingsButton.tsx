"use client";

import { useConsent } from "@/components/consent/ConsentProvider";

/* Clearing the stored choice puts the consent banner back on screen, which is
   the site's only preference surface — so this is the "cookie settings link"
   the privacy policy points at, rather than a second panel to keep in sync. */
export function CookieSettingsButton({ label }: { label: string }) {
  const { resetConsent } = useConsent();

  return (
    <button type="button" onClick={resetConsent} className="btn-secondary mt-5">
      {label}
    </button>
  );
}
