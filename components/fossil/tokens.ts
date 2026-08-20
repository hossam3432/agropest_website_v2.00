/* Fossil 400 SL — palette and wave geometry.

   Colours are the four the Fossil brand book names ("BALANCING NATURE +
   SCIENCE"): Vigor Green, Marine Blue, Aqua Blue, Clean White. The two extra
   marine values are the same hue driven darker and lighter for the sea band
   and for hairlines; nothing else is invented.

   The wave paths are the page's structure, not decoration. Every `*_FLAT`
   variant shares its wave's command structure exactly so GSAP can interpolate
   between them, and the three open waves are periodic — the tangent leaving
   x=0 matches the tangent arriving at x=1440 — so a copy translated one width
   over drifts seamlessly. */

export const FOSSIL = {
  /** Marine Blue — the brand's ground: "evokes the sea and conveys scientific trust". */
  marine: "#003549",
  /** The sea below the seam. Marine driven down, same hue. */
  marineDeep: "#00202E",
  /** Hairlines and inset panels on marine. */
  marineLift: "#0A4A63",
  /** Vigor Green — "healthy plant life and vigorous growth". */
  green: "#1DB14B",
  greenDeep: "#0E7C36",
  /** Aqua Blue — "the energy and power of the ocean". Line work, never text at body size on white. */
  aqua: "#16B9EC",
  /** Clean White. */
  white: "#FFFFFF",
  /** Secondary text on marine — the ground's own hue lifted, never gray. 9.8:1 on marine. */
  sea: "#BFDCE8",
  /** Secondary text on the green field — marine ink at 4.7:1, the field's own dark. */
  leafInk: "#00303F"
} as const;

/** viewBox all wave paths are drawn in. Rendered with preserveAspectRatio="none". */
export const WAVE_BOX = "0 0 1440 140";

export const WAVE = {
  /** The filled sea. Carries the colour of the field the seam opens into. */
  fill: "M0,58 C180,8 360,108 720,58 C1080,8 1260,108 1440,58 L1440,140 L0,140 Z",
  fillFlat: "M0,58 C180,58 360,58 720,58 C1080,58 1260,58 1440,58 L1440,140 L0,140 Z",
  /** Two open crests above the fill — the brand book's doubled wave rule. */
  crestA: "M0,50 C180,0 360,100 720,50 C1080,0 1260,100 1440,50",
  crestAFlat: "M0,50 C180,50 360,50 720,50 C1080,50 1260,50 1440,50",
  crestB: "M0,72 C200,30 380,114 720,72 C1060,30 1240,114 1440,72",
  crestBFlat: "M0,72 C200,72 380,72 720,72 C1060,72 1240,72 1440,72"
} as const;

/** The seam turned on its side: the thread that runs down the mechanism section. */
export const WAVE_VERTICAL = "M20,0 C-14,120 54,240 20,360 C-14,480 54,600 20,720 C-14,840 54,960 20,1080";

export const EASE_OUT = "power3.out";
