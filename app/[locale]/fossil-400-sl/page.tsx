import type { Metadata } from "next";
import { Barlow, Barlow_Semi_Condensed, Cairo } from "next/font/google";
import { FossilLanding } from "@/components/fossil";
import { fossilCopy } from "@/components/fossil/content";
import { getLocalePage, type LocalePageProps } from "@/app/[locale]/_utils";
import { locales, type Locale } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

/* Aktiv Grotesk CD is the Fossil brand book's face; Barlow Semi Condensed is
   the closest obtainable equivalent — same neo-grotesque skeleton, same
   condensed width, and it carries the book's thin-to-bold range. Barlow at
   normal width runs the body copy. Arabic has no condensed equivalent and no
   case, so it runs on Cairo, matching the Arabic logotype's geometry. */
const barlow = Barlow({ subsets: ["latin"], weight: ["400", "500", "600"], display: "swap", variable: "--font-fossil-body" });
const barlowCondensed = Barlow_Semi_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-fossil-display"
});
const cairo = Cairo({ subsets: ["arabic", "latin"], weight: ["400", "500", "600", "700"], display: "swap", variable: "--font-fossil-ar" });

/* The direction contract for this surface. Emitted into the built markup so it
   can be audited against the render, not only against the source. */
const DIRECTION_CONTRACT = `
THESIS: Fossil's own logo grammar — leaf over wave — is the page's structure. One seam runs the height
of the site; the marine origin sits below it, the leaf outcome above it, and the argument is made by
crossing it. Refuses the agrochemical default: white ground, stat strip, grid of icon cards.
OWN-WORLD: Marine #003549 ground, Vigor Green #1DB14B fields, Aqua #16B9EC line work, Clean White.
Wave, leaf and circle are the only shapes, at one stroke weight. Condensed grotesque caps (Barlow Semi
Condensed for Latin, Cairo for Arabic). Fields, rules and the seam — no cards, no eyebrows.
STORY: A distributor sees a biostimulant whose strength is inherited from a seaweed that survives the
North Atlantic intertidal zone, understands what 17% extract and 0.4% cytokinin do in a crop, finds the
stage and the rate for the crop they sell, and leaves with the technical sheet.
FIRST VIEWPORT: Full-bleed marine. Lockup top-start, headline in condensed caps at display scale,
lead and two actions beneath (technical sheet primary, contact secondary). The 500 cm³ pack stands at
the end side, its base inside the seam. The seam cuts the viewport low and opens into the sea band.
FORM: structure 4 of 7 (seam: leaf over wave), dealt lead by the roll; seed key c95467fd.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict,
DESIGN.md, and every shipping raster carrying its provenance.
`;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    return {};
  }

  const c = fossilCopy[locale as Locale];

  return {
    title: `${c.name} — ${c.hero.title}`,
    description: c.hero.lead,
    alternates: {
      canonical: absoluteUrl(`/${locale}/fossil-400-sl`),
      languages: {
        en: absoluteUrl("/en/fossil-400-sl"),
        ar: absoluteUrl("/ar/fossil-400-sl"),
        "x-default": absoluteUrl("/en/fossil-400-sl")
      }
    },
    openGraph: {
      title: `${c.name} — ${c.hero.title}`,
      description: c.hero.lead,
      url: absoluteUrl(`/${locale}/fossil-400-sl`),
      type: "website",
      images: [{ url: absoluteUrl("/images/fossil/fossil-500cc.png"), alt: c.name }]
    }
  };
}

export default async function FossilLandingPage({ params }: LocalePageProps) {
  const { locale } = getLocalePage((await params).locale);
  const c = fossilCopy[locale];

  return (
    /* A div, not a <main>: the locale layout already opens one, and nesting a
       second is invalid and gives assistive tech two main landmarks. */
    <div
      dir={c.dir}
      className={`${barlow.variable} ${barlowCondensed.variable} ${cairo.variable} fossil-page fossil-page--${locale} native-width-page antialiased`}
    >
      <div hidden dangerouslySetInnerHTML={{ __html: `<!--${DIRECTION_CONTRACT}-->` }} />
      <FossilLanding c={c} locale={locale} />
    </div>
  );
}
