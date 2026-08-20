/* About — visitor mode: Persuade. Structure: The Filter Gate.
   Audience: Egyptian wholesalers and regional distributors deciding whether to
   carry AgroPest; international manufacturers served at the closing CTA only.
   Thesis: the question is not what AgroPest sells, it is how AgroPest decides
   what to sell. The six selection questions are the page's spine; everything
   after the gate is framed as what passed through it.
   Moment: one authored motion — the gate's scroll-linked rail. Every other
   section enters quietly.
   Fixed: navy/green/gold, Readex Pro, existing button and container system.
   Every figure is derived from real data or repeated from the prose beside it. */

import type { Metadata } from "next";
import Link from "next/link";
import { CTASection } from "@/components/CTASection";
import { HeroSection } from "@/components/HeroSection";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { RevealItem, RevealSection, StaggerContainer } from "@/components/animations";
import { AboutLedger, type LedgerEntry } from "@/components/about/AboutLedger";
import { SelectionGate } from "@/components/about/SelectionGate";
import { AccountableIcon, DocumentIcon, LabelIcon, RegionIcon, SampleIcon } from "@/components/about/icons";
import { getLocalePage, type LocalePageProps } from "@/app/[locale]/_utils";
import { localizeHref } from "@/lib/content";
import { getPortfolioSize } from "@/lib/products";
import { buildPageMetadata } from "@/lib/seo";

const FOUNDING_YEAR = 1995;

const registrationMarkIcons = [LabelIcon, SampleIcon, AccountableIcon];

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { content, locale } = getLocalePage((await params).locale);

  const title = locale === "ar" ? "من نحن – شركة تجارة زراعية منذ 1995" : "About Us – Agrochemical Trading Since 1995";
  const description =
    locale === "ar"
      ? "تعرف على أجروبست كنترول للتجارة، الشركة المصرية المتخصصة في اختيار وتسجيل واستيراد وتوزيع حلول وقاية المحاصيل والتغذية النباتية والمحفزات الحيوية منذ عام 1995."
      : "Learn about AgroPest Control for Trading, an Egyptian agricultural company selecting, registering, importing, and distributing crop protection, plant nutrition, and biostimulant solutions since 1995.";

  return buildPageMetadata({
    locale,
    content,
    path: "/about",
    title,
    description,
    image: content.images.hero.about,
    imageAlt: title
  });
}

export default async function AboutPage({ params }: LocalePageProps) {
  const { content, locale } = getLocalePage((await params).locale);
  const { about } = content;
  const { proof } = about;

  // The hero eyebrow duplicated the navigation's current-page label and the h1
  // beneath it; the heading carries the page on its own.
  const { eyebrow: _heroEyebrow, ...hero } = about.hero;

  const [partnersSection, registrationSection, sourcingSection, partnershipSection, coverageSection, directionSection] =
    about.sections;

  const portfolioSize = getPortfolioSize(locale);
  const yearsTrading = new Date().getFullYear() - FOUNDING_YEAR;

  // Each mark is generated from the figure beside it, so the drawing and the number can
  // never disagree — add a product and the portfolio grid gains a unit on its own.
  const ledgerEntries: LedgerEntry[] = [
    { value: String(FOUNDING_YEAR), label: proof.ledger.sinceLabel, mark: "since" },
    { value: String(yearsTrading), label: proof.ledger.yearsLabel, mark: "years", count: yearsTrading },
    { value: String(portfolioSize), label: proof.ledger.productsLabel, mark: "portfolio", count: portfolioSize },
    {
      value: String(proof.suppliers.items.length),
      label: proof.ledger.suppliersLabel,
      mark: "suppliers",
      count: proof.suppliers.items.length
    },
    { value: proof.ledger.baseValue, label: proof.ledger.baseLabel, mark: "place" }
  ];

  return (
    <div className="about-page">
      <div className="lg:-mt-24">
        <HeroSection locale={locale} {...hero} fadeToMist={false} />
      </div>

      <AboutLedger locale={locale} entries={ledgerEntries} />

      {/* Heritage — the place and the span, anchored to a real photograph of it. */}
      <section className="bg-agri-mist py-14 sm:py-24">
        <RevealSection
          className="container-shell grid items-center gap-9 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14"
          amount={0.15}
        >
          <figure className="relative m-0 overflow-hidden rounded-md">
            <ResponsiveImage
              src={proof.heritage.image}
              alt={proof.heritage.imageAlt}
              className="h-[280px] w-full sm:h-[380px] lg:h-[460px]"
              objectFit="cover"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-agri-blue/85 px-4 py-3 text-[0.8125rem] leading-6 text-white/85 backdrop-blur-sm sm:px-5">
              {proof.heritage.imageAlt}
            </figcaption>
          </figure>

          <div>
            <h2 className="section-title">{about.intro.title}</h2>
            <StaggerContainer className="mt-6 grid gap-5 text-base leading-8 text-slate-600 sm:text-lg" amount={0.15}>
              {about.intro.paragraphs.map((paragraph) => (
                <RevealItem key={paragraph}>
                  <p className="max-w-[68ch]">{paragraph}</p>
                </RevealItem>
              ))}
            </StaggerContainer>
          </div>
        </RevealSection>
      </section>

      {/* The gate — the page's spine and its one authored motion. */}
      <SelectionGate
        locale={locale}
        title={about.checklistSection.title}
        subtitle={about.checklistSection.subtitle}
        intro={about.checklistSection.intro}
        items={about.checklistSection.items}
        stepLabel={proof.gate.stepLabel}
        progressLabel={proof.gate.progressLabel}
        outcomeTitle={proof.gate.outcomeTitle}
        outcomeDetail={proof.gate.outcomeDetail.replace("{count}", String(portfolioSize))}
        outcomeLink={proof.gate.outcomeLink}
        outcomeHref={proof.gate.outcomeHref}
      />

      {/* Registration — the heaviest single proof on the page, so it gets its own weight. */}
      <section className="bg-white py-14 sm:py-24">
        <RevealSection className="container-shell" amount={0.15}>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-14">
            <div>
              <h2 className="section-title">{registrationSection.title}</h2>
              <div className="mt-6 grid gap-5 text-base leading-8 text-slate-600 sm:text-lg">
                {registrationSection.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="max-w-[68ch]">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className="rounded-md bg-agri-blue p-6 text-white sm:p-8">
              <h3 className="text-lg font-bold leading-8 sm:text-xl">{proof.registration.marksTitle}</h3>
              <StaggerContainer className="mt-6 grid gap-4" amount={0.2} stagger={0.07}>
                {proof.registration.marks.map((mark, index) => {
                  const MarkIcon = registrationMarkIcons[index] ?? LabelIcon;

                  return (
                    <RevealItem key={mark}>
                      <div className="flex items-center gap-4 border-b border-white/12 pb-4 last:border-b-0 last:pb-0">
                        <span className="flex h-11 w-11 flex-none items-center justify-center rounded-sm border border-agri-gold/60 text-agri-gold">
                          <MarkIcon className="h-5 w-5" />
                        </span>
                        <p className="text-base leading-7 text-white/90">{mark}</p>
                      </div>
                    </RevealItem>
                  );
                })}
              </StaggerContainer>
              <p className="mt-6 border-t border-white/12 pt-5 text-sm leading-7 text-agri-gold">
                {proof.registration.authority}
              </p>
            </div>
          </div>
        </RevealSection>
      </section>

      {/* Suppliers — the named relationships behind the portfolio. */}
      <section className="bg-agri-mist py-14 sm:py-24">
        <RevealSection className="container-shell" amount={0.15}>
          <div className="max-w-3xl">
            <h2 className="section-title">{sourcingSection.title}</h2>
            <div className="mt-6 grid gap-5 text-base leading-8 text-slate-600 sm:text-lg">
              {sourcingSection.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <StaggerContainer className="mt-10 grid gap-4 sm:grid-cols-3" amount={0.15} stagger={0.07}>
            {proof.suppliers.items.map((supplier) => (
              <RevealItem key={supplier.name}>
                <div className="flex h-full flex-col justify-between gap-6 rounded-md border-[0.5px] border-agri-line bg-white p-6">
                  <div className="flex h-16 items-center">
                    <ResponsiveImage
                      src={supplier.logo}
                      alt={supplier.logoAlt}
                      className="max-h-14 w-auto max-w-[160px]"
                      objectFit="contain"
                      sizes="160px"
                    />
                  </div>
                  <div>
                    <p className="text-base font-bold text-agri-blue">{supplier.name}</p>
                    <p className="mt-1 text-sm leading-7 text-slate-600">{supplier.origin}</p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </StaggerContainer>
        </RevealSection>
      </section>

      {/* What the distributor actually receives — partners + partnership, one argument. */}
      <section className="bg-white py-14 sm:py-24">
        <RevealSection className="container-shell" amount={0.15}>
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-14">
            <div>
              <h2 className="section-title">{partnersSection.title}</h2>
              <div className="mt-6 grid gap-5 text-base leading-8 text-slate-600 sm:text-lg">
                {partnersSection.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="max-w-[68ch]">
                    {paragraph}
                  </p>
                ))}
              </div>

              <h3 className="mt-10 text-xl font-bold tracking-normal text-agri-blue sm:text-2xl">
                {partnershipSection.title}
              </h3>
              <StaggerContainer className="mt-5 grid gap-0" amount={0.15} stagger={0.07}>
                {partnershipSection.paragraphs.map((paragraph) => (
                  <RevealItem key={paragraph}>
                    <p className="border-b border-agri-line py-4 text-base leading-8 text-slate-600 last:border-b-0 sm:text-lg">
                      {paragraph}
                    </p>
                  </RevealItem>
                ))}
              </StaggerContainer>
            </div>

            <figure className="relative m-0 overflow-hidden rounded-md lg:sticky lg:top-32">
              <ResponsiveImage
                src={proof.distributor.image}
                alt={proof.distributor.imageAlt}
                className="h-[280px] w-full sm:h-[400px] lg:h-[520px]"
                objectFit="cover"
                sizes="(min-width: 1024px) 34vw, 100vw"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-agri-blue/85 px-4 py-3 text-[0.8125rem] leading-6 text-white/85 backdrop-blur-sm sm:px-5">
                {proof.distributor.imageAlt}
              </figcaption>
            </figure>
          </div>
        </RevealSection>
      </section>

      {/* Coverage and direction — one dark band, the page's second and final weight. */}
      <section className="relative isolate overflow-hidden bg-agri-greenDark py-16 text-white sm:py-24">
        <div aria-hidden="true" className="absolute inset-0 opacity-20">
          <ResponsiveImage
            src={proof.coverage.image}
            alt=""
            className="h-full w-full"
            objectFit="cover"
            sizes="100vw"
          />
        </div>
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-agri-greenDark via-agri-greenDark/90 to-agri-blue" />

        <RevealSection className="container-shell relative" amount={0.15}>
          <div className="grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:gap-14">
            <div>
              <h2 className="text-2xl font-bold leading-[1.25] tracking-normal sm:text-4xl">{coverageSection.title}</h2>
              <div className="mt-6 grid gap-5 leading-8 text-white/75">
                {coverageSection.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <StaggerContainer className="grid gap-0 self-start" amount={0.15} stagger={0.07}>
              {proof.coverage.regions.map((region) => (
                <RevealItem key={region}>
                  <div className="flex items-center gap-4 border-b border-white/15 py-4 first:border-t first:border-white/15">
                    <RegionIcon className="h-5 w-5 flex-none text-agri-gold" />
                    <p className="text-base leading-7 text-white sm:text-lg">{region}</p>
                  </div>
                </RevealItem>
              ))}
            </StaggerContainer>
          </div>

          <div className="mt-14 border-t border-white/15 pt-10 sm:mt-16 sm:pt-12">
            <h2 className="max-w-4xl text-2xl font-bold leading-[1.3] tracking-normal sm:text-[2.125rem] sm:leading-[1.28]">
              {directionSection.title}
            </h2>
            <div className="mt-6 grid max-w-3xl gap-5 text-base leading-8 text-white/75 sm:text-lg">
              {directionSection.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </RevealSection>
      </section>

      {/* The documentation set that ships with every product in the portfolio. */}
      <section className="bg-white py-14 sm:py-24">
        <RevealSection className="container-shell" amount={0.15}>
          <div className="grid gap-8 rounded-lg border-[0.5px] border-agri-line bg-agri-mist p-6 sm:p-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-14">
            <div className="flex items-start gap-5">
              <span className="flex h-12 w-12 flex-none items-center justify-center rounded-sm border border-agri-gold/70 text-agri-gold">
                <DocumentIcon className="h-6 w-6" />
              </span>
              <h2 className="text-2xl font-bold leading-[1.28] tracking-normal text-agri-blue sm:text-3xl">
                {about.knowledgeRole.title}
              </h2>
            </div>
            <div>
              <p className="max-w-[68ch] text-base leading-8 text-slate-600 sm:text-lg">
                {about.knowledgeRole.description}
              </p>
              <Link href={localizeHref(locale, about.knowledgeRole.ctaHref)} className="btn-primary mt-7">
                {about.knowledgeRole.ctaLabel}
              </Link>
            </div>
          </div>
        </RevealSection>
      </section>

      <CTASection locale={locale} {...about.cta} />
    </div>
  );
}
