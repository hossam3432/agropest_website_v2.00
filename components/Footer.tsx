import Link from "next/link";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { localizeHref, type Locale, type SiteContent } from "@/lib/content";
import { getLegalContent, legalPaths } from "@/lib/content/legal";

type FooterProps = {
  content: SiteContent;
  locale: Locale;
};

export function Footer({ content, locale }: FooterProps) {
  const { company, contactSection, footer, navigation } = content;
  const whatsappHref = content.ctaActions.whatsapp.href;
  // The legal pages title themselves; the footer reuses those titles as its labels.
  const legal = getLegalContent(locale);
  const legalLinks = [
    { href: legalPaths.privacy, label: legal.privacy.title },
    { href: legalPaths.terms, label: legal.terms.title }
  ];

  return (
    <footer className="bg-agri-blue text-white">
      <div className="container-shell max-w-[450px] grid gap-10 py-12 lg:max-w-7xl lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <div>
            <ResponsiveImage
              src={company.logoContrastPath}
              alt={company.logoContrastAlt}
              className="h-28 w-28 max-w-full object-contain sm:h-32 sm:w-32"
              objectFit="contain"
              sizes="128px"
            />
            <p className="mt-3 text-sm text-white/70">{company.footerDescriptor}</p>
          </div>
          <p className="mt-6 max-w-md leading-7 text-white/75">{company.tagline}</p>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-agri-gold">{footer.companyColumn}</h2>
          <div className="mt-4 grid gap-3">
            {navigation.slice(1, 5).map((item) => (
              <Link key={item.href} href={localizeHref(locale, item.href)} className="text-sm text-white/75 transition hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-agri-gold">{footer.contactColumn}</h2>
          <div className="mt-4 grid gap-3 text-sm text-white/75">
            <a className="transition hover:text-white" href={`mailto:${company.email}`}>
              {company.email}
            </a>
            <a className="text-start transition hover:text-white" href={whatsappHref}>
              <bdi dir="ltr">{company.phone}</bdi>
            </a>
            <p>
              <span className="block text-xs font-bold uppercase tracking-[0.14em] text-white/50">{contactSection.methods.headquarters}</span>
              {company.headquartersAddress}
            </p>
            <p>
              <span className="block text-xs font-bold uppercase tracking-[0.14em] text-white/50">{contactSection.methods.warehouses}</span>
              {company.warehousesAddress}
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-shell max-w-[450px] flex flex-col items-center gap-4 py-5 text-center text-sm text-white/60 lg:max-w-7xl sm:flex-row sm:flex-wrap sm:justify-between sm:text-start">
          <p>
            <span className="block">
              {footer.copyrightPrefix} {new Date().getFullYear()} {company.name}.
            </span>
            <span className="block">{footer.rightsReserved}</span>
          </p>
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {legalLinks.map((item) => (
              <Link key={item.href} href={localizeHref(locale, item.href)} className="transition hover:text-white">
                {item.label}
              </Link>
            ))}
          </nav>
          {footer.bottomNote ? <p>{footer.bottomNote}</p> : null}
        </div>
      </div>
    </footer>
  );
}
