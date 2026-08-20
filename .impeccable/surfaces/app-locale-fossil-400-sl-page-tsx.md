---
version: 1
slug: "app-locale-fossil-400-sl-page-tsx"
primary_target: "app/[locale]/fossil-400-sl/page.tsx"
related_targets: ["components/fossil/index.tsx","components/fossil/content.ts"]
---

# Fossil 400 SL landing (`/[locale]/fossil-400-sl`)

**Scope & mode.** A bespoke product landing, Persuade. Bilingual EN/AR on one route tree, inside the site shell (Navbar + Footer) but on its own visual world, opting out of `.container-shell` via `native-width-page` and using `.fossil-shell` (max-w 1200).

**Audience & action.** Egyptian wholesalers, distributors and agronomists evaluating whether to carry the line. Primary action: download `/brochures/fossil-400-sl-technical-sheet.pdf` (chosen by the owner over a contact-first close). Secondary: `/contact`.

**Proof & content.** Every fact traces to one of three sources and nothing else: the Fossil brand book (`FOSSIL LANDING PAGE/Fossil brand identity.pdf` — "Inherited Resilience", "Nature Enhanced by Science", palette, wave/leaf/circle system, Aktiv Grotesk CD), the 500 cm³ pack artwork, and the product record in `lib/products.ts` (17% Ascophyllum nodosum extract, 0.4% cytokinin/kinetin, SL formulation, four mode-of-action points, stage recommendations per crop, Eurogro Greece, "Registered and available"). Copy lives in `components/fossil/content.ts`, not in `lib/content/*` — the landing has its own voice register and is not part of the site content model.

**Direction.** "Seam — leaf over wave": the logo's own grammar becomes the page structure. One wave seam separates every colour field, the marine origin sits below it and the leaf outcome above it, and the argument is made by crossing it. Chosen by the owner from three dealt structures (seed key `c95467fd`, surface scope, Persuade); the alternates were "label anatomy" and "specimen plate".

**Memorable moment.** On arrival the seam is flat and swells into the brand's crest while the pack settles into it — one authored sequence, not a per-section reveal. Afterwards the seams drift horizontally (paused off screen) and the mechanism thread draws itself along a rail as the reader descends.

**Palette.** Marine `#003549` ground, sea `#00202E` below the seam, Vigor Green `#1DB14B` fields, Aqua `#16B9EC` line work, Clean White. Two contrast rules that the brand book itself does not obey: white on Vigor Green is 2.82:1, so display type on the green field is marine ink; secondary text on marine is `#BFDCE8` (the ground's own hue lifted), never gray.

**Type.** Barlow Semi Condensed stands in for Aktiv Grotesk CD (Latin display + UI), Barlow for Latin body, Cairo for Arabic. Arabic overrides the Latin display leading in `globals.css` (`.fossil-page--ar h1/h2/h3`) because 0.94–1.02 collides Arabic marks.

**Unresolved.** Nothing links to this route yet — the featured-product entries in `lib/content/{en,ar}.ts` and the portfolio still point at `/products/specialty-fertilizers/fossil`. Decide whether the landing replaces that link, sits alongside it, or stays campaign-only (it is in `sitemap.ts` `campaignPaths`).
