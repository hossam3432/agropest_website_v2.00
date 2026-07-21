import Link from "next/link";
import { localizeHref, type Locale, type SiteContent } from "@/lib/content";

type FooterProps = {
  content: SiteContent;
  locale: Locale;
};

export function Footer({ content, locale }: FooterProps) {
  const { company, footer, navigation } = content;
  const whatsappHref = content.ctaActions.whatsapp.href;

  return (
    <footer className="bg-agri-blue text-white">
      <div className="container-shell grid gap-10 py-12 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <div>
            <img src={company.logoContrastPath} alt={company.logoContrastAlt} className="h-28 w-28 max-w-full object-contain sm:h-32 sm:w-32" />
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
            <a className="text-left transition hover:text-white" href={whatsappHref} dir="ltr">
              {company.phone}
            </a>
            <p>{company.address}</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div
          className={`container-shell flex flex-col items-center gap-3 py-5 text-center text-sm text-white/60 ${
            footer.bottomNote ? "sm:flex-row sm:justify-between sm:text-start" : "sm:flex-col"
          }`}
        >
          <p>
            <span className="block">
              {footer.copyrightPrefix} {new Date().getFullYear()} {company.name}.
            </span>
            <span className="block">{footer.rightsReserved}</span>
          </p>
          {footer.bottomNote ? <p>{footer.bottomNote}</p> : null}
        </div>
      </div>
    </footer>
  );
}
