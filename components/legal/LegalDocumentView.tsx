import type { ReactNode } from "react";
import Link from "next/link";
import { CookieSettingsButton } from "@/components/legal/CookieSettingsButton";
import { localizeHref, type Locale } from "@/lib/content";
import type { LegalBlock, LegalDocument } from "@/lib/content/legal-types";
import { legalLastUpdated } from "@/lib/content/legal-types";

type LegalDocumentViewProps = {
  locale: Locale;
  document: LegalDocument;
};

/* The documents carry `**bold**` and `[label](/href)` inline — the two marks the
   source text actually needs. Anything else is rendered verbatim. */
const INLINE_PATTERN = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)/;

function renderInline(text: string, locale: Locale): ReactNode[] {
  const nodes: ReactNode[] = [];
  // Fresh matcher per call: this function recurses into bold spans, and a
  // shared /g/ regex would have the inner call reset `lastIndex` out from
  // under the outer loop — which never terminates.
  const pattern = new RegExp(INLINE_PATTERN.source, "g");
  let cursor = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > cursor) {
      nodes.push(text.slice(cursor, match.index));
    }

    const [, bold, linkLabel, rawHref] = match;

    if (bold !== undefined) {
      nodes.push(
        <strong key={match.index} className="font-semibold text-agri-blue">
          {renderInline(bold, locale)}
        </strong>
      );
    } else if (linkLabel !== undefined && rawHref !== undefined) {
      const isInternal = rawHref.startsWith("/");
      const isExternal = /^https?:/.test(rawHref);

      nodes.push(
        isInternal ? (
          <Link key={match.index} href={localizeHref(locale, rawHref)} className="legal-link">
            {linkLabel}
          </Link>
        ) : (
          <a
            key={match.index}
            href={rawHref}
            className="legal-link"
            {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : null)}
          >
            {linkLabel}
          </a>
        )
      );
    }

    cursor = match.index + match[0].length;
  }

  if (cursor < text.length) {
    nodes.push(text.slice(cursor));
  }

  return nodes;
}

/* A phone number carries a leading "+", which the bidi algorithm otherwise
   flips to the far end of the run inside Arabic prose. Isolating it the way the
   footer does keeps it reading +20 128 … while the line itself stays aligned to
   the start edge — the right, on the Arabic side. */
const PHONE_PATTERN = /\+\d[\d\s()-]{5,}\d/;

function withLtrPhone(text: string): ReactNode[] {
  const pattern = new RegExp(PHONE_PATTERN.source, "g");
  const nodes: ReactNode[] = [];
  let cursor = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > cursor) {
      nodes.push(text.slice(cursor, match.index));
    }
    nodes.push(
      <bdi key={match.index} dir="ltr">
        {match[0]}
      </bdi>
    );
    cursor = match.index + match[0].length;
  }

  if (cursor < text.length) {
    nodes.push(text.slice(cursor));
  }

  return nodes;
}

function Block({ block, locale, index }: { block: LegalBlock; locale: Locale; index: number }) {
  switch (block.kind) {
    case "p":
      return <p className="mt-4 leading-8 text-slate-600">{renderInline(block.text, locale)}</p>;

    case "h3":
      return <h3 className="mt-8 text-base font-bold tracking-normal text-agri-blue sm:text-lg">{block.text}</h3>;

    case "list":
      return (
        <ul className="mt-4 grid gap-3">
          {block.items.map((item, itemIndex) => (
            <li key={itemIndex} className="relative ps-6 leading-8 text-slate-600">
              <span aria-hidden="true" className="absolute start-0 top-[0.95rem] h-1.5 w-1.5 rounded-full bg-agri-gold" />
              {renderInline(item, locale)}
            </li>
          ))}
        </ul>
      );

    case "table":
      return (
        <div className="mt-6 overflow-x-auto border border-agri-line bg-white">
          <table className="w-full min-w-[32rem] border-collapse text-start text-sm">
            {block.head ? (
              <thead>
                <tr className="bg-agri-mist">
                  {block.head.map((cell) => (
                    <th key={cell} scope="col" className="border-b border-agri-line px-5 py-3 text-start font-bold text-agri-blue">
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
            ) : null}
            <tbody>
              {block.rows.map(([label, value]) => (
                <tr key={label} className="border-b border-agri-line last:border-b-0">
                  <th scope="row" className="w-2/5 px-5 py-3 text-start align-top font-semibold text-agri-blue">
                    {label}
                  </th>
                  <td className="px-5 py-3 text-start align-top leading-7 text-slate-600">{withLtrPhone(value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "callout":
      return (
        <div className="mt-6 border-s-4 border-agri-gold bg-agri-mist p-5 sm:p-6">
          <p className="leading-8 text-agri-blue">{renderInline(block.text, locale)}</p>
        </div>
      );

    case "cookieSettings":
      return (
        <div key={index}>
          <p className="mt-4 leading-8 text-slate-600">{renderInline(block.text, locale)}</p>
          <CookieSettingsButton label={block.label} />
        </div>
      );

    case "address":
      return (
        <address className="mt-6 not-italic leading-8 text-start text-slate-600">
          <span className="block font-semibold text-agri-blue">{block.name}</span>
          {block.lines.map((line) => (
            <span key={line} className="block">
              {withLtrPhone(line)}
            </span>
          ))}
        </address>
      );
  }
}

function Blocks({ blocks, locale }: { blocks: LegalBlock[]; locale: Locale }) {
  return (
    <>
      {blocks.map((block, index) => (
        <Block key={index} block={block} locale={locale} index={index} />
      ))}
    </>
  );
}

export function LegalDocumentView({ locale, document }: LegalDocumentViewProps) {
  // Latin digits in both locales, matching how dates and phone numbers already
  // read elsewhere on the Arabic side of the site.
  const lastUpdated = new Intl.DateTimeFormat(locale === "ar" ? "ar-EG-u-nu-latn" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date(`${legalLastUpdated}T00:00:00Z`));

  return (
    <>
      <section className="-mt-24 bg-agri-blue pb-14 pt-36 text-white sm:pb-16 sm:pt-40">
        <div className="container-shell">
          <p className="eyebrow eyebrow-on-dark">{document.eyebrow}</p>
          <h1
            className={`mt-4 max-w-3xl text-3xl font-bold leading-[1.22] tracking-normal sm:text-4xl lg:text-5xl ${
              locale === "ar" ? "lg:font-semibold" : ""
            }`}
          >
            {document.title}
          </h1>
          <p className="mt-5 text-sm text-white/70">
            {document.lastUpdatedLabel}: <time dateTime={legalLastUpdated}>{lastUpdated}</time>
          </p>
        </div>
      </section>

      <section className="field-clear py-12 sm:py-16">
        <div className="container-shell grid gap-10 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-14">
          <nav aria-label={document.tocLabel} className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-agri-goldInk">{document.tocLabel}</h2>
            <ol className="mt-4 grid gap-2 border-s border-agri-line ps-4">
              {document.sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className="block text-sm leading-6 text-slate-600 transition hover:text-agri-blue">
                    {section.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <article className="max-w-3xl">
            <Blocks blocks={document.intro} locale={locale} />

            {document.sections.map((section) => (
              <section key={section.id} id={section.id} className="mt-12 scroll-mt-28 border-t border-agri-line pt-8 first:border-t-0">
                <h2 className="text-xl font-bold tracking-normal text-agri-blue sm:text-2xl">{section.heading}</h2>
                <Blocks blocks={section.blocks} locale={locale} />
              </section>
            ))}
          </article>
        </div>
      </section>
    </>
  );
}
