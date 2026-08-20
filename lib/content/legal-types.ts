/* Structure shared by the legal pages (privacy policy, terms and conditions).
   The documents are authored as data rather than JSX so both locales stay in
   lockstep and the renderer, the table of contents and the metadata all read
   from one source. Inline `**bold**` and `[label](/href)` are the only markup
   the renderer understands — see components/legal/LegalDocument.tsx. */

export type LegalBlock =
  | { kind: "p"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "table"; head?: [string, string]; rows: [string, string][] }
  | { kind: "callout"; text: string }
  /* Renders the paragraph, then the control that reopens the cookie banner —
     the "cookie settings link" the policy text promises. */
  | { kind: "cookieSettings"; text: string; label: string }
  | { kind: "address"; name: string; lines: string[] };

export type LegalSection = {
  id: string;
  heading: string;
  blocks: LegalBlock[];
};

export type LegalDocument = {
  eyebrow: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  lastUpdatedLabel: string;
  tocLabel: string;
  intro: LegalBlock[];
  sections: LegalSection[];
};

export type LegalContent = {
  privacy: LegalDocument;
  terms: LegalDocument;
};

/* Both documents carry the same "Last updated" stamp; bump it whenever either
   is revised. */
export const legalLastUpdated = "2026-08-21";

export const legalPaths = {
  privacy: "/privacy-policy",
  terms: "/terms"
} as const;
