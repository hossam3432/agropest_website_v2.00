"use client";

import { useEffect } from "react";

/**
 * Drives the light inside every action capsule.
 *
 * Two jobs.
 *
 * Seeding: every capsule is stamped once, on sight, with its own rest
 * composition — where its three lights sit (`--btn-s1`…`--btn-s5`), how hard
 * they burn (`--btn-sg`) and how far they spread (`--btn-ss`). Without it a
 * row of buttons is the same gradient printed four times; with it they read as
 * one family lit slightly differently. The ranges are narrow on purpose: the
 * variation should be felt, not spotted. Seeding is client-side and idempotent
 * (an already-stamped node is skipped), so it never fights hydration and a
 * button keeps its look for the life of the page.
 *
 * Tracking: the page's ambient field is fixed; a button is the one place it
 * answers the pointer. This writes the pointer position into `--btn-px` /
 * `--btn-py` on the hovered capsule — an offset the seeded anchors above are
 * displaced by — and the contact point into `--btn-bx` / `--btn-by` for the
 * press bloom.
 *
 * One delegated listener set, one rAF loop, and only ever one capsule tracked
 * at a time — hovering is exclusive, so there is nothing to iterate.
 */

const ACTION_SELECTOR =
  ".btn, .btn-primary, .btn-secondary, .btn-accent, .btn-on-dark, .btn-on-dark-outline, .btn-hero-glass";

const CENTER = 50;
/* Marks a capsule as already seeded. */
const SEEDED = "data-lume-seeded";
/* Chase rate per frame. Low enough to lag the cursor visibly — the light has
   weight — high enough to arrive before the eye calls it slow. */
const EASE = 0.22;
const SETTLED = 0.2;

export function ActionLight() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    let tracked: HTMLElement | null = null;
    let targetX = CENTER;
    let targetY = CENTER;
    let currentX = CENTER;
    let currentY = CENTER;
    let frame = 0;

    /* ── Seeding ───────────────────────────────────────────────────────── */

    const pick = (min: number, max: number) => min + Math.random() * (max - min);

    function seed(el: HTMLElement) {
      if (el.hasAttribute(SEEDED)) return;
      el.setAttribute(SEEDED, "");

      // A third of the capsules run the composition the other way round — gold
      // leading, green trailing. It is the one variation big enough to notice,
      // so it stays rare.
      const flipped = Math.random() < 0.34;
      const leafX = flipped ? pick(64, 90) : pick(10, 36);
      const goldX = flipped ? pick(10, 36) : pick(64, 90);

      el.style.setProperty("--btn-s1", leafX.toFixed(1));
      el.style.setProperty("--btn-s2", pick(2, 30).toFixed(1));
      el.style.setProperty("--btn-s3", goldX.toFixed(1));
      el.style.setProperty("--btn-s4", pick(6, 34).toFixed(1));
      el.style.setProperty("--btn-s5", pick(38, 64).toFixed(1));
      el.style.setProperty("--btn-sg", pick(0.82, 1.2).toFixed(3));
      el.style.setProperty("--btn-ss", pick(0.86, 1.16).toFixed(3));
    }

    function seedWithin(root: ParentNode) {
      if (root instanceof HTMLElement && root.matches(ACTION_SELECTOR)) seed(root);
      root.querySelectorAll<HTMLElement>(ACTION_SELECTOR).forEach(seed);
    }

    seedWithin(document);

    // Navigations and deferred sections bring in capsules that were not here on
    // mount. Batched into one pass per frame so a burst of mutations costs one.
    let seedFrame = 0;
    const observer = new MutationObserver(() => {
      if (seedFrame) return;
      seedFrame = requestAnimationFrame(() => {
        seedFrame = 0;
        seedWithin(document);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    /* ── Tracking ──────────────────────────────────────────────────────── */

    function paint(el: HTMLElement, x: number, y: number) {
      el.style.setProperty("--btn-px", x.toFixed(2));
      el.style.setProperty("--btn-py", y.toFixed(2));
    }

    function step() {
      frame = 0;
      const el = tracked;
      if (!el) return;

      currentX += (targetX - currentX) * EASE;
      currentY += (targetY - currentY) * EASE;
      paint(el, currentX, currentY);

      const done = Math.abs(targetX - currentX) < SETTLED && Math.abs(targetY - currentY) < SETTLED;
      if (done) {
        // Land exactly, then stop. A capsule released back to centre is no
        // longer tracked and costs nothing until the pointer returns.
        paint(el, targetX, targetY);
        if (targetX === CENTER && targetY === CENTER) {
          el.style.removeProperty("--btn-px");
          el.style.removeProperty("--btn-py");
          tracked = null;
        }
        return;
      }

      frame = requestAnimationFrame(step);
    }

    function run() {
      if (!frame) frame = requestAnimationFrame(step);
    }

    function release() {
      if (!tracked) return;
      targetX = CENTER;
      targetY = CENTER;
      run();
    }

    /** Pointer position inside `el`, as a percentage of its box. */
    function locate(el: HTMLElement, clientX: number, clientY: number) {
      const box = el.getBoundingClientRect();
      if (!box.width || !box.height) return null;
      return {
        x: ((clientX - box.left) / box.width) * 100,
        y: ((clientY - box.top) / box.height) * 100
      };
    }

    function onPointerMove(event: PointerEvent) {
      // Touch only fires move while dragging, and a tap that nudged the light
      // would fight the burst. Touch gets the press and nothing else.
      if (event.pointerType === "touch" || reduced.matches) return;

      const target = event.target as Element | null;
      const el = target?.closest?.(ACTION_SELECTOR) as HTMLElement | null;

      if (!el) {
        release();
        return;
      }

      if (el !== tracked) {
        // Hand the previous capsule back to centre before adopting the new one.
        if (tracked) {
          tracked.style.removeProperty("--btn-px");
          tracked.style.removeProperty("--btn-py");
        }
        tracked = el;
        currentX = CENTER;
        currentY = CENTER;
      }

      const at = locate(el, event.clientX, event.clientY);
      if (!at) return;
      targetX = at.x;
      targetY = at.y;
      run();
    }

    function burst(el: HTMLElement, x: number, y: number) {
      el.style.setProperty("--btn-bx", x.toFixed(2));
      el.style.setProperty("--btn-by", y.toFixed(2));
      // Restart the animation on a repeat press: drop the class, force the
      // style recalc, add it back.
      el.classList.remove("is-bursting");
      void el.offsetWidth;
      el.classList.add("is-bursting");
    }

    function onPointerDown(event: PointerEvent) {
      const target = event.target as Element | null;
      const el = target?.closest?.(ACTION_SELECTOR) as HTMLElement | null;
      if (!el || reduced.matches) return;

      const at = locate(el, event.clientX, event.clientY);
      burst(el, at ? at.x : CENTER, at ? at.y : CENTER);
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Enter" && event.key !== " ") return;
      if (event.repeat || reduced.matches) return;

      const el = (event.target as Element | null)?.closest?.(ACTION_SELECTOR) as HTMLElement | null;
      if (!el) return;

      // Keyboard has no contact point, so the light comes from the middle.
      burst(el, CENTER, CENTER);
    }

    function onAnimationEnd(event: AnimationEvent) {
      if (event.animationName !== "action-burst") return;
      (event.target as HTMLElement | null)?.classList.remove("is-bursting");
    }

    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerdown", onPointerDown, { passive: true });
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("animationend", onAnimationEnd);
    // Leaving the window strands the light wherever it was.
    document.addEventListener("pointerleave", release);
    window.addEventListener("blur", release);

    return () => {
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("animationend", onAnimationEnd);
      document.removeEventListener("pointerleave", release);
      window.removeEventListener("blur", release);
      observer.disconnect();
      if (seedFrame) cancelAnimationFrame(seedFrame);
      if (frame) cancelAnimationFrame(frame);
      if (tracked) {
        tracked.style.removeProperty("--btn-px");
        tracked.style.removeProperty("--btn-py");
      }
    };
  }, []);

  return null;
}
