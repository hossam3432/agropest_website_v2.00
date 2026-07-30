import Link from "next/link";
import { localizeHref, type Locale } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

export type BreadcrumbItem = {
  label: string;
  href: string;
};

type BreadcrumbsProps = {
  locale: Locale;
  homeLabel: string;
  items: BreadcrumbItem[];
};

function toSafeJson(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function Breadcrumbs({ locale, homeLabel, items }: BreadcrumbsProps) {
  const trail: BreadcrumbItem[] = [{ label: homeLabel, href: "/" }, ...items];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: absoluteUrl(localizeHref(locale, item.href))
    }))
  };

  return (
    <nav aria-label="Breadcrumb" className="border-b border-agri-line bg-agri-mist">
      <ol className="container-shell flex flex-wrap items-center gap-2 py-3 text-sm text-slate-600">
        {trail.map((item, index) => {
          const isLast = index === trail.length - 1;

          return (
            <li key={item.href} className="flex items-center gap-2">
              {index > 0 && (
                <span aria-hidden="true" className="text-slate-400">
                  /
                </span>
              )}
              {isLast ? (
                <span aria-current="page" className="font-semibold text-agri-blue">
                  {item.label}
                </span>
              ) : (
                <Link href={localizeHref(locale, item.href)} className="transition hover:text-agri-green">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toSafeJson(breadcrumbSchema) }} />
    </nav>
  );
}
