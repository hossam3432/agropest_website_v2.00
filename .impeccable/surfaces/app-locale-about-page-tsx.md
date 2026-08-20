---
version: 1
slug: "app-locale-about-page-tsx"
primary_target: "app/[locale]/about/page.tsx"
related_targets: []
---

## Scope

Route `/[locale]/about` (Arabic RTL primary, English LTR). Visitor mode: **Persuade**.

## Audience and job

Primary: Egyptian wholesalers and regional distributors deciding whether to carry AgroPest. Secondary: international manufacturers seeking an Egyptian registration/distribution partner — served at the closing CTA only. Action: reach "كن موزعًا / Become a distributor".

## Chosen structure — The Filter Gate

The six selection questions are the page's spine, not a mid-scroll section. The page opens on the company and its ledger of what is true, descends through the gate as the authored moment, and everything after it is framed as *what passed through*: the portfolio, the registration, the suppliers, the coverage, the documentation. The gate answers the distributor's real question — not "what do you sell" but "how do you decide what you sell", which is the one thing a competitor cannot copy-paste.

## Memorable moment

The gate itself: six questions on a continuous vertical rail with a scroll-linked progress line that fills as the reader descends, each question latching open in turn, the rail converging at the bottom into the portfolio. One authored motion for the whole page; every other section enters quietly.

## Proof and content

All content preserved from `lib/content/{ar,en}.ts` `about`. Facts surfaced from prose into structure: 1995 / years in market / portfolio count (derived from `productNavigationByLocale`, never hardcoded) / two pillars / three suppliers / Nubaria HQ and warehouses. Supplier row shows only the three named in the About copy (Agria, EuroGro, Agri Unitech / Star CropScience per locale); Agrii Poland excluded. Imagery from `public/images/backgrounds` and `hero`.

## Constraints

Identity fixed: navy/green/gold, Readex Pro, existing button and container system. Logical properties only — RTL and LTR both correct. No letter-spacing on Arabic. Reduced-motion honored. No fabricated numbers.

## Unresolved

`ar.ts` labels `star-cropscience-logo-supplied.png` as "Agri Unitech"; `en.ts` labels it "Star CropScience — supplied via Agri Unitech (China)". Each locale renders its own existing label verbatim; the underlying inconsistency is the owner's to resolve.
