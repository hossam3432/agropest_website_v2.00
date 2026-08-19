import { tone } from "./tokens";

/* The leaflet cuts at 45 degrees. That is measured, not guessed: a Hough
   transform over the class boundaries inside the artwork itself (4x/Asset 8,
   10 and 11) puts 45deg at the top of the histogram in all three, and Asset 11
   — the one drawn as pure vector wedges rather than photography — also shows
   the 135deg mirror that makes the X.

   So the panels are rebuilt here as geometry rather than shipped as raster.
   The photograph becomes the fill instead of being baked in, which keeps the
   edges crisp at any density, lets the cuts mirror for Arabic, and drops the
   panel bitmaps from the bundle.

   The one thing that cannot be written as a literal: a clip-path percentage
   pair only draws 45deg when the box is square. In any other box the vertical
   component has to be scaled by the aspect, so every figure below is generated
   from its own ratio rather than hardcoded. */

export type Point = readonly [number, number];

export type Wedge = { readonly fill: string; readonly points: readonly Point[] };

export type Figure = {
  /** Tailwind aspect utility the block is drawn at. */
  readonly ratio: string;
  /** The photograph's outline. */
  readonly photo: readonly Point[];
  /** Solid blocks filling the cut corners, held off the photo by the gutter. */
  readonly wedges: readonly Wedge[];
};

/** Coordinates are LOGICAL: x = 0 is the reading-start edge. clip-path is
    geometry rather than layout and ignores `direction`, so the mirror for RTL
    is done here by hand. */
export function clip(points: readonly Point[], rtl: boolean): string {
  return `polygon(${points.map(([x, y]) => `${rtl ? 100 - x : x}% ${y}%`).join(", ")})`;
}

/** Vertical travel, in % of height, of a 45deg line that runs `dx` % of the
    width — in a box whose sides are `w` by `h`. This is the whole trick. */
const rise = (dx: number, w: number, h: number) => dx * (w / h);

/** Depth of a corner cut, and the white gutter left between the cut edge and
    the wedge that sits in it. Both in % of width, so they stay 45deg-true. */
const CUT = 30;
const GUTTER = 7;

/** Photograph with the top-start and bottom-end corners taken off — the
    leaflet's X read as a single figure. Carries the heaviest image.

    `bottomWedge` is dropped when the figure carries a caption plate: the plate
    is deep green too and lands in the same corner, so keeping both would have
    them collide rather than read as two marks. */
export function crossFigure({ w = 4, h = 5, bottomWedge = true } = {}): Figure {
  const v = (dx: number) => rise(dx, w, h);
  const inner = CUT - GUTTER;
  const wedges: Wedge[] = [{ fill: tone.green, points: [[0, 0], [inner, 0], [0, v(inner)]] }];
  if (bottomWedge) {
    wedges.push({ fill: tone.teal, points: [[100, 100], [100, 100 - v(inner)], [100 - inner, 100]] });
  }
  return {
    ratio: "aspect-[4/5]",
    photo: [
      [CUT, 0],
      [100, 0],
      [100, 100 - v(CUT)],
      [100 - CUT, 100],
      [0, 100],
      [0, v(CUT)]
    ],
    wedges
  };
}

/** Where a mark travels in from, in px, for the figure's entrance.

    The direction is derived from the shape rather than written down: whichever
    corner the mark occupies is the corner it slides out toward. dx and dy are
    given the same magnitude, which is what keeps the travel on the 45deg axis
    the figure is cut on — the motion and the geometry are the same idea.

    The returned dx is physical, so it is mirrored for RTL; dy never is. */
export function entranceOffset(points: readonly Point[], rtl: boolean, distance: number): [number, number] {
  const cx = points.reduce((a, p) => a + p[0], 0) / points.length;
  const cy = points.reduce((a, p) => a + p[1], 0) / points.length;
  const towardStart = cx < 50;
  const towardTop = cy < 50;
  const dx = (towardStart ? -distance : distance) * (rtl ? -1 : 1);
  return [dx, towardTop ? -distance : distance];
}

/** Roughly the caption plate's box, for deriving its travel the same way the
    wedges derive theirs. The plate is px-clipped, so it has no polygon. */
export const CAPTION_BOX: readonly Point[] = [[0, 72], [78, 72], [78, 100], [0, 100]];

/** The caption plate's own 45deg cut, on its top-end corner.

    This one is in pixels, not percentages, and that is the point: the plate is
    sized by its text rather than by a ratio, so there is no aspect to scale
    against. A cut of Npx across by Npx down is 45deg in any box. */
export const CAPTION_CUT = 28;

export function captionClip(rtl: boolean): string {
  const c = `${CAPTION_CUT}px`;
  return rtl
    ? `polygon(${c} 0, 100% 0, 100% 100%, 0 100%, 0 ${c})`
    : `polygon(0 0, calc(100% - ${c}) 0, 100% ${c}, 100% 100%, 0 100%)`;
}

/** Photograph with a single bottom-end corner taken off. The quieter figure —
    used where the section below it should get the attention. */
export function cornerFigure(w = 4, h = 5): Figure {
  const v = (dx: number) => rise(dx, w, h);
  const inner = CUT - GUTTER;
  return {
    ratio: "aspect-[4/5]",
    photo: [[0, 0], [100, 0], [100, 100 - v(CUT)], [100 - CUT, 100], [0, 100]],
    wedges: [{ fill: tone.teal, points: [[100, 100], [100, 100 - v(inner)], [100 - inner, 100]] }]
  };
}

/** Landscape variant, cut at the top-end corner. Suits the wide field shots,
    which would lose their horizon in a portrait crop. */
export function bandFigure(w = 3, h = 2): Figure {
  const depth = 22;
  const v = (dx: number) => rise(dx, w, h);
  const inner = depth - 6;
  return {
    ratio: "aspect-[3/2]",
    photo: [[0, 0], [100 - depth, 0], [100, v(depth)], [100, 100], [0, 100]],
    wedges: [{ fill: tone.green, points: [[100, 0], [100 - inner, 0], [100, v(inner)]] }]
  };
}
