"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
import { ProductVisual } from "@/components/ProductVisual";
import type { Locale } from "@/lib/content";
import type { ProductCategorySlug, ProductDetail, ProductSelectorCategory, ProductSelectorFilter } from "@/lib/products";

type ProductBrowserProduct = Pick<
  ProductDetail,
  "categorySlug" | "crops" | "galleryImage" | "galleryImageAlt" | "name" | "positioning" | "registrationStatus" | "slug" | "subcategory"
> & {
  href: string;
};

type ProductPortfolioBrowserProps = {
  content: {
    title: string;
    description: string;
    viewProduct: string;
    viewModeLabel: string;
    viewModes: {
      grid: string;
      list: string;
      gallery: string;
    };
    emptyLabel: string;
    selectCategoryLabel: string;
    categories: ProductSelectorCategory[];
  };
  initialCategorySlug?: ProductCategorySlug;
  initialSubcategory?: string;
  locale: Locale;
  products: ProductBrowserProduct[];
};

type ProductViewMode = "grid" | "list" | "gallery";

const productViewModes: ProductViewMode[] = ["grid", "list", "gallery"];

function isCategorySlug(value: string | undefined, categories: ProductSelectorCategory[]): value is ProductCategorySlug {
  return categories.some((category) => category.slug === value);
}

function filterMatchesSubcategory(filter: ProductSelectorFilter, subcategory: string | undefined) {
  if (!subcategory) {
    return false;
  }

  return filter.subcategories?.includes(subcategory) ?? false;
}

function resolveInitialFilterIndex(category: ProductSelectorCategory | null, initialSubcategory: string | undefined) {
  if (!category || !initialSubcategory) {
    return 0;
  }

  const matchedFilterIndex = category.filters.findIndex((filter) => filterMatchesSubcategory(filter, initialSubcategory));
  return matchedFilterIndex >= 0 ? matchedFilterIndex : 0;
}

function updateBrowserUrl(slug: ProductCategorySlug, filter?: ProductSelectorFilter) {
  if (typeof window === "undefined") {
    return;
  }

  const url = new URL(window.location.href);
  url.searchParams.set("category", slug);

  const subcategory = filter?.subcategories?.[0];

  if (subcategory) {
    url.searchParams.set("subcategory", subcategory);
  } else {
    url.searchParams.delete("subcategory");
  }

  window.history.replaceState(null, "", `${url.pathname}?${url.searchParams.toString()}${url.hash}`);
}

function ProductPortfolioBrowserView({ content, initialCategorySlug, initialSubcategory, locale, products }: ProductPortfolioBrowserProps) {
  const initialCategory = isCategorySlug(initialCategorySlug, content.categories) ? initialCategorySlug : null;
  const initialCategoryObject = initialCategory ? content.categories.find((category) => category.slug === initialCategory) ?? null : null;
  const [activeCategorySlug, setActiveCategorySlug] = useState<ProductCategorySlug | null>(initialCategory);
  const [activeFilterIndex, setActiveFilterIndex] = useState(() => resolveInitialFilterIndex(initialCategoryObject, initialSubcategory));
  const [viewMode, setViewMode] = useState<ProductViewMode>("grid");
  const activeCategory = activeCategorySlug ? content.categories.find((category) => category.slug === activeCategorySlug) ?? null : null;
  const activeFilter = activeCategory ? activeCategory.filters[activeFilterIndex] ?? activeCategory.filters[0] : null;
  const productGridClass =
    viewMode === "gallery"
      ? "grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
      : viewMode === "list"
        ? "grid gap-4"
        : "grid gap-5 lg:grid-cols-2";

  const visibleProducts = useMemo(() => {
    if (!activeCategory || !activeFilter) {
      return [];
    }

    const categoryProducts = products.filter((product) => product.categorySlug === activeCategory.slug);
    const hasSubcategoryFilter = Boolean(activeFilter.subcategories?.length);
    const hasStatusFilter = Boolean(activeFilter.statuses?.length);

    if (!hasSubcategoryFilter && !hasStatusFilter) {
      return categoryProducts;
    }

    return categoryProducts.filter((product) => {
      const matchesSubcategory = activeFilter.subcategories?.includes(product.subcategory) ?? false;
      const matchesStatus = activeFilter.statuses?.includes(product.registrationStatus) ?? false;

      return matchesSubcategory || matchesStatus;
    });
  }, [activeCategory, activeFilter, products]);

  function handleCategoryChange(slug: ProductCategorySlug) {
    setActiveCategorySlug(slug);
    setActiveFilterIndex(0);
    updateBrowserUrl(slug);
  }

  function handleFilterChange(index: number) {
    if (!activeCategory) {
      return;
    }

    const nextFilter = activeCategory.filters[index] ?? activeCategory.filters[0];
    setActiveFilterIndex(index);
    updateBrowserUrl(activeCategory.slug, nextFilter);
  }

  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20" dir={locale === "ar" ? "rtl" : "ltr"}>
      <div className="container-shell">
        <div className="overflow-hidden border border-agri-line bg-agri-mist p-6 shadow-sm sm:p-8 lg:p-10">
          <div className="max-w-4xl">
            <h2 className="section-title">{content.title}</h2>
            <p className="section-copy">{content.description}</p>
          </div>
        </div>

        <div className="mt-8 grid items-stretch gap-4 md:grid-cols-2 lg:mt-10">
          {content.categories.map((category, index) => {
            const isActive = category.slug === activeCategory?.slug;
            const hasActiveCategory = Boolean(activeCategory);

            return (
              <button
                key={category.slug}
                className={`group relative min-h-[180px] overflow-hidden rounded-2xl text-start transition duration-300 sm:min-h-[220px] md:transform ${
                  isActive
                    ? "z-10 scale-100 border-agri-green bg-agri-green p-5 text-white shadow-soft sm:p-8 md:scale-[1.03]"
                    : hasActiveCategory
                      ? "scale-[0.96] border-agri-line bg-white p-5 text-agri-blue opacity-80 shadow-sm hover:scale-100 hover:border-agri-gold hover:opacity-100 hover:shadow-soft sm:p-6"
                      : "border-agri-line bg-white p-5 text-agri-blue shadow-sm hover:-translate-y-1 hover:border-agri-gold hover:shadow-soft sm:p-7"
                }`}
                onClick={() => handleCategoryChange(category.slug)}
                type="button"
              >
                <span
                  className={`absolute end-5 top-5 text-5xl font-black leading-none opacity-10 transition ${
                    isActive ? "text-white" : "text-agri-green group-hover:text-agri-gold"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className={`block h-1 w-14 transition ${isActive ? "bg-agri-gold" : "bg-agri-green group-hover:bg-agri-gold"}`} />
                <span className="mt-4 block text-xl font-bold tracking-normal sm:mt-5 sm:text-2xl">{category.label}</span>
                {category.description ? (
                  <span className={`mt-4 block leading-7 ${isActive ? "text-white/80" : "text-slate-600"}`}>{category.description}</span>
                ) : null}
                <span
                  className={`mt-6 inline-flex items-center rounded-full px-4 py-2 text-sm font-bold transition ${
                    isActive
                      ? "bg-agri-gold text-agri-blue"
                      : "bg-white text-agri-green group-hover:text-agri-gold"
                  }`}
                >
                  {content.selectCategoryLabel}
                  <span className="mx-2" aria-hidden="true">→</span>
                </span>
              </button>
            );
          })}
        </div>

        {activeCategory ? (
          <>
            <div className="mt-7 grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
              <div className="grid grid-cols-1 gap-2 min-[420px]:grid-cols-2 sm:flex sm:flex-wrap">
                {activeCategory.filters.map((filter, index) => {
                  const isActive = index === activeFilterIndex;

                  return (
                    <button
                      key={filter.label}
                      className={`min-h-11 rounded-full px-3 py-2 text-center text-xs font-bold leading-5 transition duration-300 sm:px-4 sm:text-sm ${
                        isActive
                          ? "bg-agri-gold text-white"
                          : "bg-white text-agri-blue hover:text-agri-green"
                      }`}
                      onClick={() => handleFilterChange(index)}
                      type="button"
                    >
                      {filter.label}
                    </button>
                  );
                })}
              </div>
              <div className="hidden border border-agri-line bg-white p-2 lg:block">
                <p className="px-2 pb-2 text-xs font-bold uppercase tracking-[0.14em] text-agri-gold">{content.viewModeLabel}</p>
                <div className="grid grid-cols-3 gap-1">
                  {productViewModes.map((mode) => {
                    const isActive = mode === viewMode;

                    return (
                      <button
                        key={mode}
                        className={`min-h-10 rounded-full px-3 py-2 text-xs font-bold transition duration-300 ${
                          isActive
                            ? "bg-agri-green text-white"
                            : "bg-agri-mist text-agri-blue hover:text-agri-green"
                        }`}
                        onClick={() => setViewMode(mode)}
                        type="button"
                      >
                        {content.viewModes[mode]}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-9">
              {visibleProducts.length > 0 ? (
                <div className={productGridClass}>
                  {visibleProducts.map((product) => (
                    <Link
                      key={product.slug}
                      href={product.href}
                      className={`group grid grid-cols-[5.75rem_minmax(0,1fr)] min-[420px]:grid-cols-[7rem_minmax(0,1fr)] overflow-hidden rounded-lg bg-agri-mist shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-soft ${
                        viewMode === "gallery"
                          ? "lg:block"
                          : viewMode === "list"
                            ? "grid sm:grid-cols-[13rem_minmax(0,1fr)] lg:grid-cols-[15rem_minmax(0,1fr)]"
                            : "grid sm:grid-cols-[0.42fr_1fr]"
                      }`}
                    >
                      <ProductVisual
                        alt={product.galleryImageAlt}
                        className={`h-full min-h-[8.5rem] w-full min-[420px]:min-h-[10rem] ${
                          viewMode === "gallery"
                            ? "lg:h-72 xl:h-80"
                            : viewMode === "list"
                              ? "sm:h-full"
                              : "sm:h-full"
                        }`}
                        eyebrow={activeCategory.label}
                        label={product.name}
                        src={product.galleryImage}
                      />
                      <div className={`flex min-w-0 flex-col p-3 min-[420px]:p-4 sm:p-5 ${viewMode === "list" ? "lg:p-5" : "lg:p-6"}`}>
                        <div className="flex flex-wrap gap-2">
                          <span className="rounded-lg bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-agri-green sm:px-3 sm:text-xs sm:tracking-[0.14em]">
                            {product.subcategory}
                          </span>
                        </div>
                        <h3 className={`${viewMode === "list" ? "mt-2 text-lg sm:mt-3 sm:text-xl" : "mt-2 text-lg sm:mt-4 sm:text-2xl"} font-bold tracking-normal text-agri-blue transition group-hover:text-agri-green`}>
                          {product.name}
                        </h3>
                        <p className={`${viewMode === "gallery" ? "mt-2 sm:mt-3" : "mt-2"} line-clamp-3 text-sm leading-6 text-slate-600 sm:text-base sm:leading-7 lg:line-clamp-none`}>{product.positioning}</p>
                        <div className="mt-5 hidden flex-wrap gap-2 sm:flex">
                          {product.crops.slice(0, 3).map((crop) => (
                            <span key={crop} className="rounded-lg bg-white px-3 py-1 text-xs font-bold text-slate-600">
                              {crop}
                            </span>
                          ))}
                        </div>
                        <span className="mt-4 inline-flex w-fit rounded-full border border-agri-green bg-agri-green px-3 py-1.5 text-xs font-bold text-white transition group-hover:border-agri-gold group-hover:bg-agri-gold group-hover:text-white group-active:border-agri-gold group-active:bg-agri-gold sm:mt-6">
                          {content.viewProduct}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="border border-agri-line bg-agri-mist p-8 text-center">
                  <p className="text-lg font-bold text-agri-blue">{content.emptyLabel}</p>
                </div>
              )}
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}

type ProductPortfolioBrowserPublicProps = Omit<ProductPortfolioBrowserProps, "initialCategorySlug" | "initialSubcategory">;

// The site is statically exported, so ?category= / ?subcategory= are only readable on the client.
// Keying on the query string lets the view re-initialise its state once the real params arrive.
function ProductPortfolioBrowserFromUrl(props: ProductPortfolioBrowserPublicProps) {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") ?? undefined;
  const subcategory = searchParams.get("subcategory") ?? undefined;

  return (
    <ProductPortfolioBrowserView
      {...props}
      key={searchParams.toString()}
      initialCategorySlug={isCategorySlug(category, props.content.categories) ? category : undefined}
      initialSubcategory={subcategory}
    />
  );
}

export function ProductPortfolioBrowser(props: ProductPortfolioBrowserPublicProps) {
  return (
    <Suspense fallback={<ProductPortfolioBrowserView {...props} />}>
      <ProductPortfolioBrowserFromUrl {...props} />
    </Suspense>
  );
}
