import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { isLocale, locales, type Locale } from "@/lib/content";
import { getProductByAnySlug, getProductCategories, getProductCategory, getProducts } from "@/lib/products";

export const dynamic = "force-static";

type OgRouteParams = {
  params: Promise<{ locale: string; slug: string }>;
};

const size = { width: 1200, height: 630 };

function loadLogoDataUri() {
  const file = readFileSync(join(process.cwd(), "public/images/brand/agropest-logo-contrast.png"));
  return `data:image/png;base64,${file.toString("base64")}`;
}

export function generateStaticParams() {
  return locales.flatMap((locale) => [
    ...getProductCategories(locale).map((category) => ({ locale, slug: category.slug })),
    ...getProducts(locale).map((product) => ({ locale, slug: product.slug }))
  ]);
}

export async function GET(_request: Request, { params }: OgRouteParams) {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";

  const category = getProductCategory(locale, slug);
  const product = category ? undefined : getProductByAnySlug(locale, slug);

  const title = category?.title ?? product?.name ?? "AgroPest Control for Trading";
  const eyebrow = category?.eyebrow ?? product?.category ?? "Agricultural Solutions";
  const logo = loadLogoDataUri();

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(135deg, #0A3D2B 0%, #0F5A3C 55%, #17324D 100%)",
          fontFamily: "sans-serif"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <img src={logo} width={220} height={64} style={{ objectFit: "contain" }} />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px 24px",
              borderRadius: 999,
              background: "rgba(217, 146, 39, 0.16)",
              border: "1px solid #D99227",
              color: "#D99227",
              fontSize: 26,
              fontWeight: 600,
              letterSpacing: 1
            }}
          >
            {eyebrow}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 980 }}>
          <div style={{ width: 84, height: 6, borderRadius: 999, background: "#D99227", display: "flex" }} />
          <div style={{ display: "flex", fontSize: 64, fontWeight: 700, color: "#FFFFFF", lineHeight: 1.15 }}>
            {title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(244, 247, 245, 0.2)",
            paddingTop: 28,
            color: "#F4F7F5",
            fontSize: 24
          }}
        >
          <div style={{ display: "flex" }}>AgroPest Control for Trading</div>
          <div style={{ display: "flex", color: "#4F8F45" }}>agropestcontrol.com</div>
        </div>
      </div>
    ),
    size
  );
}
