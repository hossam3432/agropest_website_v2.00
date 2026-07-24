"use client";

import type { ReactNode } from "react";
import type { ConsentCategory } from "@/lib/consent";
import { useConsent } from "./ConsentProvider";

type ConsentGateProps = {
  category: ConsentCategory;
  children: ReactNode;
};

// Children are never mounted until consent for `category` is explicitly
// granted — no script tags exist in the DOM pre-consent, not even inert ones.
export function ConsentGate({ category, children }: ConsentGateProps) {
  const { consent } = useConsent();
  if (!consent || !consent[category]) return null;
  return <>{children}</>;
}
