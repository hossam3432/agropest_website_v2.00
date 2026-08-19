"use client";

import { ResponsiveImage } from "@/components/ResponsiveImage";
import { CAPTION_BOX, captionClip, clip, entranceOffset, type Figure, type Point } from "./shapes";
import { tone } from "./tokens";
import { useEntrance } from "./useEntrance";

/* The page's one authored moment: the figure assembles. Each mark travels in
   along the same 45deg axis the figure is cut on, so the motion is the
   geometry restated rather than a generic reveal bolted onto it. Transform
   only — animating the clip-path would repaint the photograph every frame. */
const TRAVEL = 44;
const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
const DURATION = 620;

/** A photograph cut to the leaflet's 45deg geometry, with solid wedges sitting
    in the corners it gives up. The white grid ground shows through the gutter
    between them, which is the same negative space the printed panels used —
    only drawn by the layout now instead of baked into a bitmap. */
export function ShapedFigure({
  figure,
  src,
  alt,
  rtl,
  focus = "50% 50%",
  sizes,
  caption,
  className = ""
}: {
  figure: Figure;
  src: string;
  alt: string;
  rtl: boolean;
  focus?: string;
  sizes: string;
  /** Rendered as a solid plate over the photograph, the way the printed
      leaflet labels its images. Opaque rather than a scrim, so the text
      contrast never depends on what is behind it. */
  caption?: string;
  /** Placement on the page's grid. Never a ratio: the cuts are percentages of
      this box, so they only read 45deg while the figure keeps figure.ratio —
      a stretched figure would quietly tilt them. Callers place it with
      self-start rather than letting a grid row stretch it. */
  className?: string;
}) {
  const { ref, state } = useEntrance<HTMLElement>();
  const out = state === "offset";

  /** Marks are staggered slightly so the figure reads as assembling rather
      than as one block sliding. Capped well under the 620ms travel.

      The transition is attached only for the return journey. Carrying it on
      the displaced state too would animate the mark *out* to its offset the
      moment the hook applies it — a fly-out on mount, followed by the fly-in
      we actually want. Taking up the offset must be instant; only landing is
      animated. */
  const travelTo = (points: readonly Point[], delay: number) => {
    const [dx, dy] = entranceOffset(points, rtl, TRAVEL);
    return {
      transform: out ? `translate(${dx}px, ${dy}px)` : undefined,
      transition: state === "in" ? `transform ${DURATION}ms ${EASE} ${delay}ms` : "none"
    };
  };

  return (
    /* overflow-hidden is what lets the marks start off-frame: without it they
       would be visible floating outside the figure on their way in. */
    <figure ref={ref} className={"relative w-full overflow-hidden " + figure.ratio + " " + className}>
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: clip(figure.photo, rtl) }}>
        {/* The scale sits on an inner element: putting it on the clipped box
            would drag the cut along with it. */}
        <div
          className="h-full w-full"
          style={{
            transform: out ? "scale(1.06)" : undefined,
            transition: state === "in" ? `transform ${DURATION + 180}ms ${EASE}` : "none"
          }}
        >
          <ResponsiveImage
            src={src}
            alt={alt}
            className="h-full w-full"
            objectFit="cover"
            style={{ objectPosition: focus }}
            sizes={sizes}
          />
        </div>
      </div>

      {figure.wedges.map((wedge, i) => (
        <div
          key={wedge.fill + wedge.points.join()}
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundColor: wedge.fill,
            clipPath: clip(wedge.points, rtl),
            ...travelTo(wedge.points, i * 70)
          }}
        />
      ))}

      {caption ? (
        /* pt-8 clears the plate's own 28px cut with room for line leading, so
           the first line can use the full measure whatever the font does. The
           plate is bottom-anchored and auto-height, so extra lines grow it
           upward rather than spilling past the clip. */
        <figcaption
          className="absolute bottom-0 start-0 w-[78%] px-4 pb-4 pt-8 text-[13px] font-bold leading-[1.7] text-white"
          style={{
            backgroundColor: tone.teal,
            clipPath: captionClip(rtl),
            ...travelTo(CAPTION_BOX, 140)
          }}
        >
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
