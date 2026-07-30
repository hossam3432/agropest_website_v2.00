type ProductSchemaProps = {
  name: string;
  description: string;
  url?: string;
  image?: string | string[];
  sku?: string;
  category?: string;
  brandName?: string;
  registrationNumber?: string;
  activeIngredient?: string | string[];
};

function toSafeJson(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function ProductSchema({
  name,
  description,
  url,
  image,
  sku,
  category,
  brandName,
  registrationNumber,
  activeIngredient
}: ProductSchemaProps) {
  const activeIngredients = Array.isArray(activeIngredient) ? activeIngredient : activeIngredient ? [activeIngredient] : [];

  const additionalProperty = [
    ...(registrationNumber ? [{ "@type": "PropertyValue", name: "Registration Number", value: registrationNumber }] : []),
    ...activeIngredients.map((ingredient) => ({ "@type": "PropertyValue", name: "Active Ingredient", value: ingredient }))
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    ...(url ? { url } : {}),
    ...(image ? { image } : {}),
    ...(sku ? { sku } : {}),
    ...(category ? { category } : {}),
    ...(registrationNumber ? { identifier: registrationNumber } : {}),
    ...(brandName ? { brand: { "@type": "Brand", name: brandName } } : {}),
    ...(additionalProperty.length ? { additionalProperty } : {})
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toSafeJson(schema) }} />;
}
