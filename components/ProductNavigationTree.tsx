"use client";

import Link from "next/link";
import { useState } from "react";
import { localizeHref, type Locale } from "@/lib/content";
import type { ProductCategorySlug, ProductNavigationContent, ProductNavigationSubcategory } from "@/lib/products";

type ProductNavigationTreeProps = {
  activeCategorySlug: ProductCategorySlug;
  activeProductSlug: string;
  activeSubcategory: string;
  className?: string;
  content: ProductNavigationContent;
  locale: Locale;
};

function categoryHref(locale: Locale, categorySlug: ProductCategorySlug) {
  return localizeHref(locale, `/products?category=${categorySlug}`);
}

function subcategoryHref(locale: Locale, categorySlug: ProductCategorySlug, subcategory: ProductNavigationSubcategory) {
  return localizeHref(locale, `/products?category=${categorySlug}&subcategory=${encodeURIComponent(subcategory.filterValue)}`);
}

export function ProductNavigationTree({
  activeCategorySlug,
  activeProductSlug,
  activeSubcategory,
  className,
  content,
  locale
}: ProductNavigationTreeProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={className} dir={locale === "ar" ? "rtl" : "ltr"}>
      <button
        className="flex w-full items-center justify-between border border-agri-line bg-white px-4 py-3 text-sm font-bold text-agri-blue shadow-sm lg:hidden"
        onClick={() => setIsOpen((value) => !value)}
        type="button"
      >
        <span>{content.browseLabel}</span>
        <span className="text-agri-gold">{isOpen ? "-" : "+"}</span>
      </button>

      <nav
        aria-label={content.browseLabel}
        className={`${isOpen ? "block" : "hidden"} border border-agri-line bg-white p-4 shadow-sm lg:sticky lg:top-24 lg:block lg:p-5`}
      >
        <Link
          href={localizeHref(locale, "/products")}
          className="block border-b border-agri-line pb-4 text-xs font-bold uppercase tracking-[0.18em] text-agri-gold"
        >
          {content.rootLabel}
        </Link>

        <div className="mt-5 grid gap-5">
          {content.categories.map((category) => {
            const isActiveCategory = category.slug === activeCategorySlug;

            return (
              <section key={category.slug}>
                <Link
                  href={categoryHref(locale, category.slug)}
                  className={`block border-s-2 px-3 py-2 text-sm font-bold transition ${
                    isActiveCategory
                      ? "border-agri-gold bg-agri-mist text-agri-green"
                      : "border-agri-line text-agri-blue hover:border-agri-gold hover:text-agri-green"
                  }`}
                >
                  {category.label}
                </Link>

                <div className="mt-3 grid gap-3">
                  {category.subcategories.map((subcategory) => {
                    const hasActiveProduct = subcategory.products?.some((product) => product.slug === activeProductSlug) ?? false;
                    const isActiveSubcategory =
                      isActiveCategory && (hasActiveProduct || subcategory.filterValue === activeSubcategory || subcategory.label === activeSubcategory);

                    return (
                      <div key={subcategory.label} className="border-s border-agri-line ps-3">
                        <Link
                          href={subcategoryHref(locale, category.slug, subcategory)}
                          className={`block text-xs font-bold uppercase tracking-[0.12em] transition ${
                            isActiveSubcategory ? "text-agri-gold" : "text-slate-500 hover:text-agri-green"
                          }`}
                        >
                          {subcategory.label}
                        </Link>

                        {subcategory.products?.length ? (
                          <div className="mt-2 grid gap-1.5">
                            {subcategory.products.map((product) => {
                              const isActiveProduct = product.slug === activeProductSlug;

                              if (!product.slug) {
                                return (
                                  <span
                                    key={product.label}
                                    className="flex items-center justify-between gap-2 px-3 py-2 text-sm font-semibold text-slate-400"
                                  >
                                    <span>{product.label}</span>
                                    <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-300">
                                      {content.futureLabel}
                                    </span>
                                  </span>
                                );
                              }

                              return (
                                <Link
                                  key={product.slug}
                                  href={localizeHref(locale, `/products/${category.slug}/${product.slug}`)}
                                  className={`block px-3 py-2 text-sm font-semibold transition ${
                                    isActiveProduct
                                      ? "bg-agri-gold/15 text-agri-blue ring-1 ring-agri-gold/40"
                                      : "text-agri-blue hover:bg-agri-mist hover:text-agri-green"
                                  }`}
                                >
                                  {product.label}
                                </Link>
                              );
                            })}
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
