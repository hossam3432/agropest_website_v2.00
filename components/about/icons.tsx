import type { SVGProps } from "react";

/**
 * One stroke weight, one cap style, one 24-unit grid for every mark on the About
 * page, so the icons read as a set rather than as borrowed glyphs.
 */
function Icon({ children, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

/** Registered label — the identification card a registered input carries. */
export function LabelIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M3.5 6.75A2.25 2.25 0 0 1 5.75 4.5h8.34c.6 0 1.17.24 1.6.66l4.15 4.16c.42.42.66 1 .66 1.59v6.34a2.25 2.25 0 0 1-2.25 2.25H5.75a2.25 2.25 0 0 1-2.25-2.25Z" />
      <path d="M7 9.5h5" />
      <path d="M7 13h8" />
      <path d="M7 16h5.5" />
    </Icon>
  );
}

/** Reference standard — the retained sample a registration is measured against. */
export function SampleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M9.75 3.5h4.5" />
      <path d="M10.5 3.5v5.28a2 2 0 0 1-.28 1.02l-4.19 7.08A2 2 0 0 0 7.75 20h8.5a2 2 0 0 0 1.72-3.12l-4.19-7.08a2 2 0 0 1-.28-1.02V3.5" />
      <path d="M7.6 14.5h8.8" />
    </Icon>
  );
}

/** Accountable party — a named company standing behind the product. */
export function AccountableIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M12 3.25 4.75 6v5.5c0 4.06 2.87 7.6 7.25 9.25 4.38-1.65 7.25-5.19 7.25-9.25V6Z" />
      <path d="m9.25 11.75 2 2 3.5-3.75" />
    </Icon>
  );
}

/** Cleared the selection filter. */
export function ClearedIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="m4.75 12.5 4.5 4.5 10-10.5" />
    </Icon>
  );
}

/** Technical documentation set. */
export function DocumentIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M13.5 3.5H7.25A2.25 2.25 0 0 0 5 5.75v12.5a2.25 2.25 0 0 0 2.25 2.25h9.5A2.25 2.25 0 0 0 19 18.25V9Z" />
      <path d="M13.5 3.5V9H19" />
      <path d="M8.5 13h7" />
      <path d="M8.5 16.5h4.5" />
    </Icon>
  );
}

/** Supplied region. */
export function RegionIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...props}>
      <path d="M12 21s6.5-5.4 6.5-10.25a6.5 6.5 0 1 0-13 0C5.5 15.6 12 21 12 21Z" />
      <circle cx="12" cy="10.5" r="2.25" />
    </Icon>
  );
}
