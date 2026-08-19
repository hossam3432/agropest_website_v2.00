"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

export type EntranceState = "idle" | "offset" | "in";

/** Fraction of the viewport height the element's top must cross to be "seen". */
const TRIGGER = 0.85;

/** A scroll entrance that is safe to server-render.

    The trap with the usual `whileInView` + `initial` pairing is that the
    initial style is emitted into the HTML: a figure whose script never runs
    stays displaced, and one that animates opacity stays invisible. Here the
    element's resting position IS its default. The offset is only ever applied
    by the client, and only to elements that have not been seen yet — so a
    failed or slow script leaves the figure simply already assembled.

    Applying the offset in a layout effect matters: it lands before the first
    paint, so nothing on screen at mount is pulled apart and snapped back.

    The trigger is a plain throttled rect check, not an IntersectionObserver
    and not rAF-gated, on purpose. The displaced state is a lie the animation
    promises to correct, so the correction must not depend on a callback that
    might never arrive: an observer that silently fails — or a rAF that is
    paused because the document is hidden — would strand the marks out of
    position for good. Reading a rect for a handful of figures at 10Hz costs
    nothing, and it fails only if scrolling itself does. */
export function useEntrance<T extends HTMLElement>(): {
  ref: React.RefObject<T | null>;
  state: EntranceState;
} {
  const ref = useRef<T>(null);
  const [state, setState] = useState<EntranceState>("idle");

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Already in view when we mount: leave it assembled. Displacing it now
    // would read as the page breaking apart rather than arriving.
    if (el.getBoundingClientRect().top < window.innerHeight * TRIGGER) return;
    setState("offset");
  }, []);

  useEffect(() => {
    if (state !== "offset") return;

    let last = 0;
    const check = () => {
      const el = ref.current;
      if (!el) return;
      if (el.getBoundingClientRect().top < window.innerHeight * TRIGGER) setState("in");
    };
    const onScroll = () => {
      const now = Date.now();
      if (now - last < 100) return;
      last = now;
      check();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    check();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [state]);

  return { ref, state };
}
