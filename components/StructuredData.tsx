import { enContent } from "@/lib/content/en";
import { absoluteUrl, siteUrl } from "@/lib/seo";

const { company } = enContent;

const address = {
  "@type": "PostalAddress",
  streetAddress: "80th km Cairo-Alexandria Desert Road, Al Nubariya",
  addressLocality: "Al Nubariya",
  addressRegion: "Al Buhayrah",
  addressCountry: "EG"
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: company.name,
  alternateName: company.shortName,
  url: siteUrl,
  logo: absoluteUrl(company.logoPath),
  description: company.tagline,
  email: company.email,
  telephone: company.phone,
  address,
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: company.phone,
      email: company.email,
      contactType: "customer service",
      areaServed: "EG",
      availableLanguage: ["English", "Arabic"]
    }
  ]
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteUrl}/#localbusiness`,
  parentOrganization: { "@id": `${siteUrl}/#organization` },
  name: company.name,
  image: absoluteUrl(company.logoPath),
  url: siteUrl,
  telephone: company.phone,
  email: company.email,
  address,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "09:00",
      closes: "17:00"
    }
  ]
};

function toSafeJson(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function StructuredData() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toSafeJson(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toSafeJson(localBusinessSchema) }} />
    </>
  );
}
