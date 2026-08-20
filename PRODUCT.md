# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary — Egyptian wholesalers and regional distributors.** They decide whether to carry an AgroPest product line. They are evaluating a supplier, not browsing: they need to know the product is registered, that the documentation behind it is complete, that the portfolio will still exist next season, and that a named person will answer the phone. Confirmed as the lead audience for `/about`.

**Secondary — international manufacturers and suppliers** seeking an Egyptian partner to register, import, and distribute their line. They arrive at `/about` to assess whether AgroPest can carry a product through registration and into the market properly. Served at the closing CTA, not in the lead narrative.

**Tertiary — agronomists, farm managers, and retailers** who reach product and technical-library pages through search and want to understand what a product does and when to use it.

## Product Purpose

AgroPest Control for Trading selects, registers, imports, and distributes crop-protection and plant-nutrition products in the Egyptian market, and supplies the technical and commercial material that lets a distributor sell them with confidence. The site's job is to make the portfolio and the process behind it legible enough that a distributor initiates contact. Success on `/about` is a distributor reaching the "كن موزعًا / Become a distributor" step believing the company is a durable, documented supplier rather than a trader of opportunistic stock.

## Positioning

AgroPest's differentiator is the **selection filter, not the catalogue**. A product enters the portfolio only after passing a fixed set of questions — real market need, fit with Egyptian crops and soils (Delta clay and reclaimed-land sand behave differently), a credible source with complete technical documentation, registrability, explainability by the distributor to the retailer, and comprehensibility by the farmer. Supplier relationships are entered when the product can be supported properly in Egypt, not when the price is briefly attractive. The result a competitor cannot copy-paste: a small, stable, fully documented portfolio that does not churn from season to season.

## Operating Context

- Founded 1995; headquarters and warehouses in **Nubaria, Beheira governorate**, on the Cairo–Alexandria Desert Road, inside the reclaimed-land region it serves.
- Two business pillars: **crop protection** (agrochemicals) and **plant nutrition / productivity improvement** (specialty fertilizers, biostimulants).
- Every distributed product is registered with the **Ministry of Agriculture and the Agricultural Pesticides Committee** before market entry. Registration is presented as the dividing line between a genuine agricultural input and an unknown one: a registered product has a label, a reference sample, and an accountable party behind it.
- Distribution reaches the Alexandria Desert Road corridor, the Delta, Upper Egypt governorates, and north-west reclaimed-land areas.
- Every product ships with a documentation set: brochure, technical sheet, product page, and registration documents.
- Follow-up is a named contact, explicitly not a call centre.

## Capabilities and Constraints

- Next.js 16 App Router, React 19, TypeScript, Tailwind 3, framer-motion + GSAP. Static export (`out/`).
- Bilingual **Arabic (RTL, default) and English (LTR)**, one route tree under `app/[locale]`, all content in `lib/content/ar.ts` and `lib/content/en.ts`. Arabic is the primary market language.
- Arabic is a joined script: positive letter-spacing is forcibly zeroed site-wide in RTL. Any new type treatment must survive that.
- Layout uses logical properties (`ps-`/`pe-`, `start`/`end`) throughout; direction-agnostic layout is a hard requirement, not a nicety.
- Desktop shell: `.container-shell` runs at `min(80%, 1152px)` above 1000px, except on bespoke product landings that opt out via `.native-width-page`.
- Cookie consent gate is active; analytics are consent-conditional.

## Brand Commitments

- Name: **أجروبست كنترول للتجارة / AgroPest Control for Trading**. Established 1995.
- Palette in `tailwind.config.ts`: navy `#17324D`, green `#0F5A3C`, dark green `#0A3D2B`, gold `#D99227`, orange `#E56F2E`, leaf `#4F8F45`, mist `#F4F7F5`, line `#DDE7E1`.
- Typeface: **Readex Pro**, one family for both scripts.
- Logo assets in `public/images/brand/`.
- Voice: factual, unembellished, technical. It states what is documented and refuses superlatives. Claims are attributed to the manufacturer, the product label, or recent scientific sources. Future work must not add marketing claims this voice would not make.
- Confirmed by the user: `/about` keeps the AgroPest identity — layout, imagery, and type carry the ambition, not a new palette.

## Evidence on Hand

- **Real supplier relationships, named in About copy:** Agria (Bulgaria), EuroGro (Greece), Agri Unitech (China). Logos in `public/images/partners/`. A fourth partner, Agrii Poland, is marked "Partnership in development" in `en.ts` and is **excluded from `/about`** by user decision.
- **Portfolio size:** 15 products in the portfolio navigation tree (`productNavigationByLocale` in `lib/products.ts`); 3 of them (Lasix 70 WG, Rival Duo 45 SC, Edegal 72.2 SL) currently have full detail pages. Any count shown on the site must be derived from that data, never hardcoded.
- **Real photography** in `public/images/`: showroom facade, Nubaria warehouse and warehouse coordination, field rows, field-day trials, greenhouse. Confirmed usable as `/about` proof imagery.
- **Nubaria warehouses** confirmed by the user as a proof point for the credentials band.
- **Known inconsistency, unresolved by the user:** `ar.ts` labels `star-cropscience-logo-supplied.png` as "Agri Unitech", while `en.ts` labels the same file "Star CropScience — supplied via Agri Unitech (China)". Future work must not silently pick one.
- **Absent — must not be fabricated:** distributor counts, governorate counts, tonnage, revenue, market share, staff numbers, customer testimonials, certifications beyond Ministry/Pesticides-Committee registration, and any award or ranking.

## Product Principles

1. **Registration is the argument.** The single fact that separates AgroPest from an unknown supplier is that every product is registered before it reaches the market. Surface it as proof, never as a footnote.
2. **The filter before the catalogue.** How a product enters the portfolio matters more than how many products are in it. A small, deliberate portfolio is the position, not a limitation to be hidden.
3. **Documentation is the product.** Brochure, technical sheet, product page, registration file. A distributor buys the paperwork as much as the drum.
4. **Continuity over transactions.** Long-term supplier and distributor relationships are the stated reason the portfolio is stable. Never frame the business around deals or price.
5. **Say only what is documented.** No superlatives, no invented numbers, no borrowed credentials. Every figure on the site must trace to real data in the repository or to a fact the owner confirmed.

## Accessibility & Inclusion

- Arabic RTL and English LTR must both be fully correct: mirrored layout, no clipped ligatures, no letter-spacing on Arabic.
- Reduced-motion is honored throughout via `useReducedMotion` and `prefers-reduced-motion` media queries; new motion must follow.
- Body text ≥ 4.5:1 contrast, including secondary text on navy and green surfaces.
