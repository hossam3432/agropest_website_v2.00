/* Sampled from the Behance slides. Petrol and orange already match the desktop
   build, so the two renderings of the product stay one brand. */
export const tone = {
  /** Deep green — the darkest block. White body copy clears 8:1 here. */
  teal: "#045A4D",
  /** Field green. White text on this measures 3.85:1, so it carries headings
      and large figures only; body copy on green uses greenInk instead. */
  green: "#3B9347",
  /** Field green pulled down until white body copy clears 5.3:1. Same hue. */
  greenInk: "#2F7A39",
  /** Warm off-white plate. Distinct from the pure-white grid ground. */
  cream: "#F5F0EA",
  petrol: "#0B4B67",
  /** Brand orange. 2.9:1 against white and 2.5:1 against cream, so it is a
      fill, a rule and an icon colour — never a text colour. */
  orange: "#F07728",
  /** Orange deepened until white body copy clears 4.6:1. Filled buttons only. */
  orangeInk: "#C2540E",
  /** Brand cyan, from the checkmark's offset. 4.1:1 on the deep green. */
  cyan: "#3FC8E4",
  /** Cyan lifted until small text clears 4.9:1 on the deep green. */
  cyanInk: "#6FD8EE"
} as const;
