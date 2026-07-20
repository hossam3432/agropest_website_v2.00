import { localizeHref, type Locale } from "@/lib/content";

export type ProductCategorySlug = "agrochemicals" | "specialty-fertilizers";

export type ProductDocument = {
  type?: ProductDocumentType;
  title: string;
  description: string;
  status: string;
  href?: string;
};

export type ProductBenefit = {
  title: string;
  description: string;
};

export type ProductDocumentType =
  | "brochure"
  | "label"
  | "technical-sheet"
  | "registration-document"
  | "safety-information"
  | "certificate"
  | "other";

export type ProductTextItem = {
  title: string;
  description?: string;
};

export type ProductOverviewSection = {
  title?: string;
  description: string;
};

export type ProductWhenToUseSection = {
  title?: string;
  description?: string;
  items: ProductTextItem[];
};

export type ProductWhyThisProductSection = {
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  points: string[];
};

export type ProductFieldBenefitsSection = {
  title?: string;
  items: ProductBenefit[];
};

export type ProductUsageRow = {
  crop: string;
  target: string;
  dose: string;
  foliarDose?: string;
  fertigationDose?: string;
  method?: string;
  treatmentCount?: string;
  phi?: string;
  timing: string;
  interval: string;
  recommendation: string;
};

export type ProductApplicationRecommendationsSection = {
  title?: string;
  intro?: string;
  rows: ProductUsageRow[];
};

export type ProductTechnicalNotesSection = {
  title?: string;
  items: string[];
  needsManualWriting?: boolean;
};

export type ProductDocumentsSection = {
  title?: string;
  items: ProductDocument[];
};

export type ProductPageSections = {
  overview: ProductOverviewSection;
  whenToUse: ProductWhenToUseSection;
  whyThisProduct: ProductWhyThisProductSection;
  fieldBenefits: ProductFieldBenefitsSection;
  applicationRecommendations: ProductApplicationRecommendationsSection;
  technicalNotes: ProductTechnicalNotesSection;
  documents: ProductDocumentsSection;
};

export type ProductDetail = {
  slug: string;
  categorySlug: ProductCategorySlug;
  legacySlugs?: string[];
  name: string;
  category: string;
  subcategory: string;
  crops: string[];
  positioning: string;
  registrationStatus: string;
  seo?: {
    title: string;
    description: string;
    keywords?: string[];
  };
  hideRegistrationFact?: boolean;
  galleryImage: string;
  galleryImageAlt: string;
  detailImage: string;
  detailImageAlt: string;
  facts: {
    category: string;
    composition: string;
    compositionRows?: {
      ingredient: string;
      ingredientAr?: string;
      ingredientEn?: string;
      concentration: string;
    }[];
    formulation: string;
    targetCrop: string;
    target: string;
    supplier: string;
    registrationStatus: string;
  };
  overview: string;
  pageSections?: Partial<ProductPageSections>;
  benefits: ProductBenefit[];
  usageTitle?: string;
  usageIntro?: string;
  technicalNotesTitle?: string;
  technicalNotes?: string[];
  modeOfAction: {
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    points: string[];
  };
  usageGuidance: ProductUsageRow[];
  documents: ProductDocument[];
};

export type ProductCategory = {
  slug: ProductCategorySlug;
  eyebrow: string;
  title: string;
  shortTitle: string;
  description: string;
  image: string;
  imageAlt: string;
  subcategories: string[];
  featuredProductSlugs: string[];
  ctaLabel: string;
};

export type ProductSelectorFilter = {
  label: string;
  subcategories?: string[];
  statuses?: string[];
};

export type ProductSelectorCategory = {
  slug: ProductCategorySlug;
  label: string;
  description?: string;
  filters: ProductSelectorFilter[];
};

export type ProductNavigationProduct = {
  label: string;
  slug?: string;
};

export type ProductNavigationSubcategory = {
  label: string;
  filterValue: string;
  products?: ProductNavigationProduct[];
};

export type ProductNavigationCategory = {
  slug: ProductCategorySlug;
  label: string;
  subcategories: ProductNavigationSubcategory[];
};

export type ProductNavigationContent = {
  rootLabel: string;
  browseLabel: string;
  futureLabel: string;
  categories: ProductNavigationCategory[];
};

export const productPageContent = {
  "en": {
    "heroEyebrow": "Product profile",
    "requestProductInfo": "Request Product Information",
    "whatsappAgropest": "WhatsApp AgroPest",
    "downloadBrochure": "Download Brochure",
    "backToCatalog": "Back to product catalog",
    "sections": {
      "overview": "Product Overview",
      "whenToUse": "When to Use",
      "whyThisProduct": "Why This Product?",
      "fieldBenefits": "Field Benefits",
      "applicationRecommendations": "Application Recommendations",
      "technicalNotes": "Technical Notes",
      "documents": "Documents"
    },
    "sectionNotes": {
      "mappedFromExisting": "Mapped from current product data",
      "manualWritingNeeded": "Manual content writing needed",
      "technicalNotesPlaceholder": "Dedicated technical notes need a later content-writing pass. Existing recommendations, composition, and registration data have been preserved on this page."
    },
    "quickFactsTitle": "Quick Technical Facts",
    "compositionTitle": "Composition table",
    "fieldBenefitsEyebrow": "Crop response",
    "applicationRecommendationsEyebrow": "Use guide",
    "overviewEyebrow": "Product overview",
    "benefitsEyebrow": "Commercial and technical fit",
    "benefitsTitle": "Key benefits",
    "modeEyebrow": "How it works",
    "usageEyebrow": "Usage guidance",
    "usageTitle": "Approved usage recommendations and dose rates",
    "nutritionUsageTitle": "Recommended use rates and application details",
    "nutritionFormulationLabel": "Product form",
    "documentsEyebrow": "Documents",
    "documentsTitle": "Technical documents",
    "requestDocument": "Download document",
    "imagePlaceholder": "Product visual",
    "finalCta": {
      "title": "Need technical or commercial information?",
      "description": "Contact AgroPest to request product documents, distributor information, or registration-related details.",
      "primaryLabel": "Contact AgroPest",
      "primaryHref": "/contact",
      "secondaryLabel": "WhatsApp AgroPest"
    },
    "factLabels": {
      "category": "Category",
      "composition": "Active ingredient / composition",
      "formulation": "Formulation",
      "targetCrop": "Target crop",
      "target": "Target disease/pest",
      "effect": "Effect",
      "supplier": "Supplier",
      "registrationStatus": "Registration status"
    },
    "usageLabels": {
      "crop": "Crop",
      "target": "Target pest/disease",
      "dose": "Application rate per 100 L water",
      "recommendation": "Pre-harvest interval (PHI)"
    },
    "nutritionUsageLabels": {
      "crop": "Crop",
      "dose": "Rate of use",
      "details": "Further information"
    },
    "nutritionSplitUsageLabels": {
      "crop": "Crop",
      "foliarDose": "Foliar spray",
      "fertigationDose": "Fertigation",
      "details": "Further information"
    },
    "applicationLabels": {
      "crop": "Crop",
      "target": "Target",
      "dose": "Rate / dose",
      "foliarDose": "Foliar spray",
      "fertigationDose": "Fertigation",
      "timing": "Timing",
      "method": "Method",
      "treatments": "Treatments / interval",
      "phi": "PHI",
      "notes": "Notes"
    },
    "documentTypeLabels": {
      "brochure": "Brochure",
      "label": "Label",
      "technical-sheet": "Technical sheet",
      "registration-document": "Registration document",
      "safety-information": "Safety information",
      "certificate": "Certificate",
      "other": "Document"
    }
  },
  "ar": {
    "nutritionFormulationLabel": "صورة المنتج",
    "heroEyebrow": "",
    "requestProductInfo": "اطلب معلومات المنتج",
    "whatsappAgropest": "واتساب أجروبست",
    "downloadBrochure": "تحميل البروشور",
    "backToCatalog": "رجوع إلى كتالوج المنتجات",
    "sections": {
      "overview": "نظرة عامة على المنتج",
      "whenToUse": "متى يستخدم",
      "whyThisProduct": "لماذا هذا المنتج؟",
      "fieldBenefits": "الفوائد الحقلية",
      "applicationRecommendations": "توصيات الاستخدام",
      "technicalNotes": "ملاحظات فنية",
      "documents": "المستندات"
    },
    "sectionNotes": {
      "mappedFromExisting": "مبني على بيانات المنتج الحالية",
      "manualWritingNeeded": "يحتاج إلى كتابة محتوى لاحقا",
      "technicalNotesPlaceholder": "تحتاج الملاحظات الفنية المخصصة إلى مرحلة كتابة لاحقة. تم الحفاظ على التوصيات والتركيب وبيانات التسجيل الحالية في هذه الصفحة."
    },
    "quickFactsTitle": "حقائق فنية سريعة",
    "compositionTitle": "جدول التركيب",
    "fieldBenefitsEyebrow": "استجابة المحصول",
    "applicationRecommendationsEyebrow": "دليل الاستخدام",
    "overviewEyebrow": "نظرة عامة على المنتج",
    "benefitsEyebrow": "الملاءمة الفنية والتجارية",
    "benefitsTitle": "الفوائد الرئيسية",
    "modeEyebrow": "طريقة العمل",
    "usageEyebrow": "إرشادات الاستخدام",
    "usageTitle": "توصيات الاستخدام والجرعات المعتمدة",
    "nutritionUsageTitle": "توصيات الاستخدام ومعدلات الإضافة",
    "documentsEyebrow": "المستندات",
    "documentsTitle": "المستندات الفنية",
    "requestDocument": "تحميل المستند",
    "imagePlaceholder": "صورة المنتج",
    "finalCta": {
      "title": "هل تحتاج إلى معلومات فنية أو تجارية؟",
      "description": "تواصل مع أجروبست لطلب مستندات المنتج أو معلومات الموزعين أو التفاصيل المتعلقة بالتسجيل.",
      "primaryLabel": "تواصل مع أجروبست",
      "primaryHref": "/contact",
      "secondaryLabel": "واتساب أجروبست"
    },
    "factLabels": {
      "category": "الفئة",
      "composition": "المادة الفعالة / التركيب",
      "formulation": "الصيغة",
      "targetCrop": "المحصول المستهدف",
      "target": "المرض / الآفة المستهدفة",
      "effect": "التأثير",
      "supplier": "المصنع المنتج",
      "registrationStatus": "حالة التسجيل"
    },
    "usageLabels": {
      "crop": "المحصول",
      "target": "الآفة المستهدفة",
      "dose": "معدل الاستخدام (لكل 100 لتر ماء)",
      "recommendation": "فترة ما قبل الحصاد (PHI)"
    },
    "nutritionUsageLabels": {
      "crop": "المحصول",
      "dose": "معدل الاستخدام",
      "details": "معلومات إضافية"
    },
    "nutritionSplitUsageLabels": {
      "crop": "المحصول",
      "foliarDose": "الرش الورقي",
      "fertigationDose": "الإضافة مع ماء الري",
      "details": "معلومات إضافية"
    },
    "applicationLabels": {
      "crop": "المحصول",
      "target": "الهدف",
      "dose": "المعدل / الجرعة",
      "foliarDose": "الرش الورقي",
      "fertigationDose": "الإضافة مع ماء الري",
      "timing": "التوقيت",
      "method": "طريقة الاستخدام",
      "treatments": "عدد المعاملات / الفاصل",
      "phi": "فترة ما قبل الحصاد",
      "notes": "ملاحظات"
    },
    "documentTypeLabels": {
      "brochure": "بروشور",
      "label": "ملصق",
      "technical-sheet": "نشرة فنية",
      "registration-document": "مستند تسجيل",
      "safety-information": "معلومات السلامة",
      "certificate": "شهادة",
      "other": "مستند"
    }
  }
} as const;

export const productCategoryPageContent = {
  "en": {
    "categoryOverviewEyebrow": "Product portfolio",
    "categoryOverviewTitle": "Two focused portfolio systems",
    "categoryOverviewDescription": "AgroPest organizes product conversations around crop protection and plant nutrition, keeping technical sales material clear for suppliers and distributors.",
    "exploreCategory": "Explore category",
    "featuredProducts": "Featured products",
    "viewProduct": "View product",
    "filtersTitle": "Filter portfolio",
    "applyFilters": "Apply filters",
    "clearFilters": "Clear filters",
    "filterLabels": {
      "subcategory": "Subcategory",
      "crop": "Crop",
      "registrationStatus": "Registration status"
    },
    "allFilterLabel": "All",
    "categoryPageEyebrow": "Portfolio category",
    "productsInCategory": "Products in this category",
    "noProductsLabel": "No products match these filters."
  },
  "ar": {
    "categoryOverviewEyebrow": "محفظة المنتجات",
    "categoryOverviewTitle": "نظامان مركزان للمنتجات",
    "categoryOverviewDescription": "تنظم أجروبست محادثات المنتجات حول وقاية المحاصيل والتغذية النباتية، مع إبقاء المواد الفنية التجارية واضحة للموردين والموزعين.",
    "exploreCategory": "استعرض الفئة",
    "featuredProducts": "منتجات مميزة",
    "viewProduct": "عرض المنتج",
    "filtersTitle": "تصفية المحفظة",
    "applyFilters": "تطبيق المرشحات",
    "clearFilters": "مسح المرشحات",
    "filterLabels": {
      "subcategory": "الفئة الفرعية",
      "crop": "المحصول",
      "registrationStatus": "حالة التسجيل"
    },
    "allFilterLabel": "الكل",
    "categoryPageEyebrow": "فئة المحفظة",
    "productsInCategory": "منتجات هذه الفئة",
    "noProductsLabel": "لا توجد منتجات مطابقة لهذه المرشحات."
  }
} as const;

export const productPortfolioBrowserContent: Record<
  Locale,
  {
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
  }
> = {
  "en": {
    "title": "Explore AgroPest Products",
    "description": "Move between crop protection, plant nutrition, and biostimulant solutions, then choose the relevant technical subcategory to reach the products that fit your need.",
    "viewProduct": "View product",
    "viewModeLabel": "View style",
    "viewModes": {
      "grid": "Grid",
      "list": "List",
      "gallery": "Gallery"
    },
    "emptyLabel": "No products are currently listed for this selection.",
    "selectCategoryLabel": "Explore this sector",
    "categories": [
      {
        "slug": "agrochemicals",
        "label": "Crop Protection",
        "description": "Fungicide and insecticide solutions selected for important crop protection needs in vegetables, potatoes, greenhouse crops, and other key sectors.",
        "filters": [
          {
            "label": "All"
          },
          {
            "label": "Fungicides",
            "subcategories": [
              "Fungicides"
            ]
          },
          {
            "label": "Insecticides",
            "subcategories": [
              "Insecticides"
            ]
          }
        ]
      },
      {
        "slug": "specialty-fertilizers",
        "label": "Plant Nutrition",
        "description": "Specialty fertilizers, foliar nutrition, NPK ranges, and biostimulant support for practical crop performance across growth stages.",
        "filters": [
          {
            "label": "All"
          },
          {
            "label": "Water Soluble NPK",
            "subcategories": [
              "Water Soluble NPK"
            ]
          },
          {
            "label": "Phosphite & Stress Support",
            "subcategories": [
              "Phosphite & Stress Support"
            ]
          },
          {
            "label": "Biostimulants",
            "subcategories": [
              "Seaweed & Biostimulants",
              "Amino Acid Formulations"
            ]
          },
          {
            "label": "Calcium, Boron & Micronutrients",
            "subcategories": [
              "Calcium, Boron & Micronutrients"
            ]
          },
          {
            "label": "Potassium & Silicon",
            "subcategories": [
              "Potassium & Silicon"
            ]
          }
        ]
      }
    ]
  },
  "ar": {
    "title": "اكتشف منتجات أجروبست",
    "description": "انتقل بين وقاية المحاصيل والتغذية النباتية والمحفزات الحيوية، ثم اختر الفئة الفنية المناسبة للوصول إلى المنتجات التي تخدم احتياجك.",
    "viewProduct": "عرض المنتج",
    "viewModeLabel": "طريقة العرض",
    "viewModes": {
      "grid": "شبكة",
      "list": "قائمة",
      "gallery": "معرض"
    },
    "emptyLabel": "لا توجد منتجات مدرجة حاليا لهذا الاختيار.",
    "selectCategoryLabel": "استعرض هذا القطاع",
    "categories": [
      {
        "slug": "agrochemicals",
        "label": "وقاية المحاصيل",
        "description": "حلول مبيدات فطرية وحشرية مختارة لخدمة احتياجات مهمة في وقاية الخضر والبطاطس ومحاصيل الصوب وغيرها من القطاعات الرئيسية.",
        "filters": [
          {
            "label": "الكل"
          },
          {
            "label": "مبيدات فطرية",
            "subcategories": [
              "مبيدات فطرية"
            ]
          },
          {
            "label": "مبيدات حشرية",
            "subcategories": [
              "مبيدات حشرية"
            ]
          }
        ]
      },
      {
        "slug": "specialty-fertilizers",
        "label": "التغذية النباتية",
        "description": "أسمدة متخصصة، تغذية ورقية، NPK، ومحفزات حيوية لدعم النبات خلال مراحل النمو المختلفة واحتياجات الأداء العملية.",
        "filters": [
          {
            "label": "الكل"
          },
          {
            "label": "NPK ذواب",
            "subcategories": [
              "NPK قابل للذوبان في الماء"
            ]
          },
          {
            "label": "فوسفيت ودعم الإجهاد",
            "subcategories": [
              "فوسفيت ودعم الإجهاد"
            ]
          },
          {
            "label": "محفزات حيوية",
            "subcategories": [
              "أعشاب بحرية ومحفزات حيوية",
              "تركيبات أحماض أمينية"
            ]
          },
          {
            "label": "كالسيوم وبورون وعناصر صغرى",
            "subcategories": [
              "كالسيوم وبورون وعناصر صغرى"
            ]
          },
          {
            "label": "بوتاسيوم وسيليكون",
            "subcategories": [
              "بوتاسيوم وسيليكون"
            ]
          }
        ]
      }
    ]
  }
};

export const productNavigationByLocale: Record<Locale, ProductNavigationContent> = {
  "en": {
    "rootLabel": "Products",
    "browseLabel": "Browse Product Categories",
    "futureLabel": "Future profile",
    "categories": [
      {
        "slug": "agrochemicals",
        "label": "Crop Protection",
        "subcategories": [
          {
            "label": "Fungicides",
            "filterValue": "Fungicides",
            "products": [
              {
                "label": "Edegal 72.2 SL",
                "slug": "edegal"
              },
              {
                "label": "Rival DUO 45 SC",
                "slug": "rival-duo"
              }
            ]
          },
          {
            "label": "Insecticides",
            "filterValue": "Insecticides",
            "products": [
              {
                "label": "Lasix 70 WG",
                "slug": "lasix"
              }
            ]
          }
        ]
      },
      {
        "slug": "specialty-fertilizers",
        "label": "Plant Nutrition",
        "subcategories": [
          {
            "label": "Water Soluble NPK",
            "filterValue": "Water Soluble NPK",
            "products": [
              {
                "label": "Signal Balanced",
                "slug": "signal-npk-20-20-20"
              },
              {
                "label": "Signal High Phosphorus",
                "slug": "signal-npk-14-48-0"
              },
              {
                "label": "Signal High Potassium",
                "slug": "signal-npk-12-5-40"
              }
            ]
          },
          {
            "label": "Phosphite & Stress Support",
            "filterValue": "Phosphite & Stress Support",
            "products": [
              {
                "label": "Chrome PK",
                "slug": "chrome-pk"
              }
            ]
          },
          {
            "label": "Seaweed & Biostimulants",
            "filterValue": "Seaweed & Biostimulants",
            "products": [
              {
                "label": "Fossil 400 SL",
                "slug": "fossil"
              },
              {
                "label": "FoliQ AminoVigor",
                "slug": "foliq-aminovigor"
              }
            ]
          }
        ]
      }
    ]
  },
  "ar": {
    "rootLabel": "المنتجات",
    "browseLabel": "تصفح أقسام المنتجات",
    "futureLabel": "ملف قادم",
    "categories": [
      {
        "slug": "agrochemicals",
        "label": "وقاية المحاصيل",
        "subcategories": [
          {
            "label": "مبيدات فطرية",
            "filterValue": "مبيدات فطرية",
            "products": [
              {
                "label": "إديجال 72.2 SL",
                "slug": "edegal"
              },
              {
                "label": "ريفال ديو 45 SC",
                "slug": "rival-duo"
              }
            ]
          },
          {
            "label": "مبيدات حشرية",
            "filterValue": "مبيدات حشرية",
            "products": [
              {
                "label": "لاسيكس 70 WG",
                "slug": "lasix"
              }
            ]
          }
        ]
      },
      {
        "slug": "specialty-fertilizers",
        "label": "التغذية النباتية",
        "subcategories": [
          {
            "label": "NPK ذواب",
            "filterValue": "NPK قابل للذوبان في الماء",
            "products": [
              {
                "label": "سيجنال المتوازن",
                "slug": "signal-npk-20-20-20"
              },
              {
                "label": "سيجنال عالي الفوسفور",
                "slug": "signal-npk-14-48-0"
              },
              {
                "label": "سيجنال عالي البوتاسيوم",
                "slug": "signal-npk-12-5-40"
              }
            ]
          },
          {
            "label": "فوسفيت ودعم الإجهاد",
            "filterValue": "فوسفيت ودعم الإجهاد",
            "products": [
              {
                "label": "كروم PK",
                "slug": "chrome-pk"
              }
            ]
          },
          {
            "label": "أعشاب بحرية ومحفزات حيوية",
            "filterValue": "أعشاب بحرية ومحفزات حيوية",
            "products": [
              {
                "label": "فوسيل 400 SL",
                "slug": "fossil"
              },
              {
                "label": "فولي كيو أسكو فيجور",
                "slug": "foliq-ascovigor"
              }
            ]
          },
          {
            "label": "كالسيوم وبورون وعناصر صغرى",
            "filterValue": "كالسيوم وبورون وعناصر صغرى",
            "products": [
              {
                "label": "كروم CaB",
                "slug": "chrome-ca-b"
              },
              {
                "label": "فولي كيو أميكال",
                "slug": "foliq-amical"
              },
              {
                "label": "فولي كيو بورون",
                "slug": "foliq-boron"
              }
            ]
          },
          {
            "label": "بوتاسيوم وسيليكون",
            "filterValue": "بوتاسيوم وسيليكون",
            "products": [
              {
                "label": "تيسلا - سيليكات البوتاسيوم",
                "slug": "tesla"
              },
              {
                "label": "فولي كيو بوتاسيوم",
                "slug": "foliq-k-potassium"
              }
            ]
          },
          {
            "label": "أحماض أمينية",
            "filterValue": "تركيبات أحماض أمينية",
            "products": [
              {
                "label": "فولي كيو أمينو فيجور",
                "slug": "foliq-aminovigor"
              }
            ]
          }
        ]
      }
    ]
  }
};

export const productCategoriesByLocale: Record<Locale, ProductCategory[]> = {
  "en": [
    {
      "slug": "agrochemicals",
      "eyebrow": "Agrochemicals / Crop Protection",
      "title": "Crop Protection",
      "shortTitle": "Crop Protection",
      "description": "Registered crop protection profiles for insecticide and fungicide programs, organized for technical and distributor communication.",
      "image": "/images/categories/crop-protection-field.jpg",
      "imageAlt": "Crop protection portfolio image",
      "subcategories": [
        "Fungicides",
        "Insecticides"
      ],
      "featuredProductSlugs": [
        "lasix",
        "rival-duo",
        "edegal"
      ],
      "ctaLabel": "Explore Crop Protection"
    },
    {
      "slug": "specialty-fertilizers",
      "eyebrow": "Specialty Fertilizers / Plant Nutrition",
      "title": "Plant Nutrition",
      "shortTitle": "Plant Nutrition",
      "description": "Specialty nutrition, phosphite, silicon, calcium-boron, and biostimulant products for growth, quality, stress support, and distributor programs.",
      "image": "/images/categories/plant-nutrition-field.jpg",
      "imageAlt": "Plant nutrition portfolio image",
      "subcategories": [
        "Water Soluble NPK",
        "Phosphite & Stress Support",
        "Seaweed & Biostimulants",
        "Calcium, Boron & Micronutrients",
        "Potassium & Silicon",
        "Amino Acid Formulations"
      ],
      "featuredProductSlugs": [
        "signal-npk-20-20-20",
        "signal-npk-14-48-0",
        "signal-npk-12-5-40",
        "chrome-pk",
        "fossil",
        "tesla"
      ],
      "ctaLabel": "Explore Plant Nutrition"
    }
  ],
  "ar": [
    {
      "slug": "agrochemicals",
      "eyebrow": "المبيدات الزراعية / وقاية المحاصيل",
      "title": "وقاية المحاصيل",
      "shortTitle": "وقاية المحاصيل",
      "description": "ملفات منتجات مسجلة لبرامج المبيدات الحشرية والفطرية، منظمة للتواصل الفني وتواصل الموزعين.",
      "image": "/images/categories/crop-protection-field.jpg",
      "imageAlt": "صورة لمحفظة وقاية المحاصيل",
      "subcategories": [
        "مبيدات فطرية",
        "مبيدات حشرية"
      ],
      "featuredProductSlugs": [
        "lasix",
        "rival-duo",
        "edegal"
      ],
      "ctaLabel": "استعرض وقاية المحاصيل"
    },
    {
      "slug": "specialty-fertilizers",
      "eyebrow": "الأسمدة المتخصصة / التغذية النباتية",
      "title": "التغذية النباتية",
      "shortTitle": "التغذية النباتية",
      "description": "منتجات تغذية متخصصة تشمل NPK والفوسفيت والسيليكون والكالسيوم بورون والمحفزات الحيوية لدعم النمو والجودة والإجهاد وبرامج الموزعين.",
      "image": "/images/categories/plant-nutrition-field.jpg",
      "imageAlt": "صورة لمحفظة التغذية النباتية",
      "subcategories": [
        "NPK قابل للذوبان في الماء",
        "فوسفيت ودعم الإجهاد",
        "أعشاب بحرية ومحفزات حيوية",
        "كالسيوم وبورون وعناصر صغرى",
        "بوتاسيوم وسيليكون",
        "تركيبات أحماض أمينية"
      ],
      "featuredProductSlugs": [
        "signal-npk-20-20-20",
        "signal-npk-14-48-0",
        "signal-npk-12-5-40",
        "chrome-pk",
        "fossil",
        "tesla"
      ],
      "ctaLabel": "استعرض التغذية النباتية"
    }
  ]
};

export const productsByLocale: Record<Locale, ProductDetail[]> = {
  en: [
        {
    "slug": "lasix",
    "categorySlug": "agrochemicals",
    "legacySlugs": [
      "lasix-70-wg"
    ],
    "name": "Lasix 70 WG",
    "category": "Crop Protection",
    "subcategory": "Insecticides",
    "crops": [
      "Tomato",
      "Pepper and eggplant",
      "Cucurbits",
      "Cucumber and squash",
      "Citrus"
    ],
    "positioning": "A clear path for whitefly control. A systemic insecticide containing acetamiprid 70% in a WG water-dispersible granule formulation, designed to control whitefly and sucking pests within integrated pest management programs.",
    "registrationStatus": "Registered and active",
    "seo": {
      "title": "Lasix 70 WG | Systemic insecticide for whitefly control | AgroPest Control",
      "description": "Lasix 70 WG is a systemic insecticide containing acetamiprid 70% WG for whitefly and sucking-pest control in vegetable crops within integrated pest management programs.",
      "keywords": [
        "Lasix 70 WG",
        "acetamiprid 70%",
        "whitefly insecticide",
        "sucking pests",
        "AgroPest Control"
      ]
    },
    "galleryImage": "/images/products/lasix-gallery.png",
    "galleryImageAlt": "Lasix 70 WG catalogue image",
    "detailImage": "/images/products/lasix-detail.png",
    "detailImageAlt": "Lasix 70 WG systemic insecticide pack for whitefly control from AgroPest Control.",
    "facts": {
      "category": "Agrochemicals > Insecticides",
      "composition": "Acetamiprid 70% w/w.",
      "compositionRows": [
        {
          "ingredient": "Acetamiprid",
          "concentration": "70% w/w"
        }
      ],
      "formulation": "WG - water-dispersible granules.",
      "targetCrop": "Tomato, pepper, eggplant, cucurbits, cucumber, squash, and citrus.",
      "target": "Sucking pests: whitefly, aphids, thrips, leaf miners, leafhoppers, and soft scale insects.",
      "supplier": "AgroUnitek - China.",
      "registrationStatus": "Registered with the Egyptian Ministry of Agriculture; registration no. 4828."
    },
    "overview": "Lasix 70 WG is a specialized insecticide solution for whitefly and sucking-pest control programs in vegetable crops and crops sensitive to these pests. It is based on acetamiprid at 70% w/w in a WG formulation, combining systemic activity with practical preparation and uniform distribution in the spray solution. Its systemic nature helps the active ingredient reach parts of new growth, while good spray coverage remains important, especially on the lower leaf surface where whitefly stages and sucking pests concentrate.",
    "pageSections": {
      "overview": {
        "title": "Product overview",
        "description": "Lasix 70 WG is a specialized insecticide solution for whitefly and sucking-pest control programs in vegetable crops and crops sensitive to these pests. It is based on acetamiprid at 70% w/w in a WG formulation, combining systemic activity with practical preparation and uniform distribution in the spray solution. Its systemic nature helps the active ingredient reach parts of new growth, while good spray coverage remains important, especially on the lower leaf surface where whitefly stages and sucking pests concentrate."
      },
      "whenToUse": {
        "title": "When to use Lasix 70 WG",
        "items": [
          {
            "title": "At the beginning of whitefly appearance",
            "description": "Early intervention is preferred when the pest is first detected, before populations increase and become harder to control."
          },
          {
            "title": "During new growth stages",
            "description": "Suitable for periods of active plant growth when new growth needs protection from sucking pests."
          },
          {
            "title": "When insect populations increase on vegetable crops",
            "description": "Fits programs for whitefly, aphids, thrips, and leaf miners, with good coverage and repeated monitoring."
          },
          {
            "title": "Within virus-transmission management programs",
            "description": "Reducing whitefly feeding activity helps reduce risks linked to whitefly-transmitted viruses, especially in early crop stages."
          },
          {
            "title": "Within an integrated control program",
            "description": "Use with alternation between insecticides from different mode-of-action groups to reduce resistance risk and avoid repeated reliance on the same mode-of-action group."
          }
        ]
      },
      "whyThisProduct": {
        "title": "Why Lasix 70 WG?",
        "description": "Lasix 70 WG does not rely only on controlling insects present on the leaf surface. It offers a practical position within pest-control programs through its high concentration, systemic nature, and easy-to-use WG formulation.",
        "image": "/images/products/lasix-mode.png",
        "imageAlt": "Lasix 70 WG positioning visual",
        "points": [
          "High concentration with low use rates per 100 L water according to approved recommendations.",
          "Systemic movement helps reach new growth and areas that are difficult to fully cover by direct spraying.",
          "The WG formulation is easy to prepare and helps reduce dust exposure compared with some traditional forms."
        ]
      },
      "fieldBenefits": {
        "title": "Field benefits",
        "items": [
          {
            "title": "Whitefly control",
            "description": "Helps reduce whitefly populations when used early and within a regular monitoring and control program."
          },
          {
            "title": "Supports protection of new growth",
            "description": "Its systemic nature helps support protection of parts of new growth that direct spraying may not cover sufficiently."
          },
          {
            "title": "Suitable for sucking pests",
            "description": "Fits programs targeting aphids, thrips, leaf miners, and other sucking pests according to crop and approved label."
          },
          {
            "title": "Helps manage virus risks",
            "description": "By limiting whitefly activity, the product helps reduce risks of virus transmission associated with this pest."
          },
          {
            "title": "Easy preparation and use",
            "description": "The WG formulation disperses in water and supports preparation of a uniform spray solution when correct mixing steps are followed."
          },
          {
            "title": "Suitable for integrated pest management programs",
            "description": "Can be used within an integrated program with rotation between mode-of-action groups to reduce pest pressure and manage resistance."
          }
        ]
      },
      "applicationRecommendations": {
        "title": "Application recommendations",
        "intro": "Use Lasix 70 WG according to approved recommendations for the target crop and pest, while respecting the pre-harvest interval for each crop.",
        "rows": [
          {
            "crop": "Tomato",
            "target": "Whitefly",
            "dose": "12.5 g / 100 L water",
            "timing": "At the beginning of pest appearance or according to pest monitoring",
            "method": "Foliar spray with good canopy coverage, especially the lower leaf surface",
            "interval": "Foliar spray with good canopy coverage, especially the lower leaf surface",
            "phi": "8 days",
            "recommendation": "8 days"
          },
          {
            "crop": "Cucumber, squash, and cucurbits",
            "target": "Whitefly, aphids, thrips, and leaf miners",
            "dose": "12.5 - 22.5 g / 100 L water",
            "timing": "At the beginning of pest appearance or according to pest monitoring",
            "method": "Foliar spray with attention to the lower leaf surface and new growth",
            "interval": "Foliar spray with attention to the lower leaf surface and new growth",
            "phi": "3 days",
            "recommendation": "3 days"
          },
          {
            "crop": "Pepper and eggplant",
            "target": "Whitefly, aphids, thrips, and leaf miners",
            "dose": "12.5 - 22.5 g / 100 L water",
            "timing": "At the beginning of pest appearance or according to pest monitoring",
            "method": "Foliar spray with good canopy coverage",
            "interval": "Foliar spray with good canopy coverage",
            "phi": "7 days",
            "recommendation": "7 days"
          },
          {
            "crop": "Citrus",
            "target": "Leaf miners, aphids, thrips, soft scale insects, and leafhoppers",
            "dose": "12.5 - 17.5 g / 100 L water",
            "timing": "At the beginning of pest appearance or according to monitoring program",
            "method": "Foliar spray with good coverage of new growth",
            "interval": "Foliar spray with good coverage of new growth",
            "phi": "7 days",
            "recommendation": "7 days"
          }
        ]
      },
      "technicalNotes": {
        "title": "Important technical guidance",
        "items": [
          "Use Lasix 70 WG according to approved recommendations for the target crop and pest.",
          "Early intervention is preferred at the beginning of pest appearance, before population density increases.",
          "Pay attention to covering the lower leaf surface where whitefly and larvae gather.",
          "Do not rely repeatedly on the same mode-of-action group; rotate with insecticides from different IRAC groups for resistance management.",
          "Avoid spraying during extreme heat or when plants are under clear stress.",
          "Conduct a simple compatibility test before tank mixing with other products.",
          "Avoid mixing with strongly alkaline products unless compatibility is confirmed.",
          "Respect the PHI for each crop."
        ]
      },
      "documents": {
        "items": [
          {
            "type": "brochure",
            "title": "Lasix 70 WG brochure",
            "description": "Product profile covering the concept, uses, and key technical messages.",
            "status": "Yes"
          },
          {
            "type": "technical-sheet",
            "title": "Technical sheet",
            "description": "Concise technical reference covering composition, formulation, use rates, and application guidance.",
            "status": "Yes"
          }
        ]
      }
    },
    "benefits": [
      {
        "title": "Whitefly control",
        "description": "Helps reduce whitefly populations when used early and within a regular monitoring and control program."
      },
      {
        "title": "Supports protection of new growth",
        "description": "Its systemic nature helps support protection of parts of new growth that direct spraying may not cover sufficiently."
      },
      {
        "title": "Suitable for sucking pests",
        "description": "Fits programs targeting aphids, thrips, leaf miners, and other sucking pests according to crop and approved label."
      },
      {
        "title": "Helps manage virus risks",
        "description": "By limiting whitefly activity, the product helps reduce risks of virus transmission associated with this pest."
      },
      {
        "title": "Easy preparation and use",
        "description": "The WG formulation disperses in water and supports preparation of a uniform spray solution when correct mixing steps are followed."
      },
      {
        "title": "Suitable for integrated pest management programs",
        "description": "Can be used within an integrated program with rotation between mode-of-action groups to reduce pest pressure and manage resistance."
      }
    ],
    "usageTitle": "Application recommendations",
    "usageIntro": "Use Lasix 70 WG according to approved recommendations for the target crop and pest, while respecting the pre-harvest interval for each crop.",
    "technicalNotesTitle": "Important technical guidance",
    "technicalNotes": [
      "Use Lasix 70 WG according to approved recommendations for the target crop and pest.",
      "Early intervention is preferred at the beginning of pest appearance, before population density increases.",
      "Pay attention to covering the lower leaf surface where whitefly and larvae gather.",
      "Do not rely repeatedly on the same mode-of-action group; rotate with insecticides from different IRAC groups for resistance management.",
      "Avoid spraying during extreme heat or when plants are under clear stress.",
      "Conduct a simple compatibility test before tank mixing with other products.",
      "Avoid mixing with strongly alkaline products unless compatibility is confirmed.",
      "Respect the PHI for each crop."
    ],
    "modeOfAction": {
      "title": "Why Lasix 70 WG?",
      "description": "Lasix 70 WG does not rely only on controlling insects present on the leaf surface. It offers a practical position within pest-control programs through its high concentration, systemic nature, and easy-to-use WG formulation.",
      "image": "/images/products/lasix-mode.png",
      "imageAlt": "Lasix 70 WG positioning visual",
      "points": [
        "High concentration with low use rates per 100 L water according to approved recommendations.",
        "Systemic movement helps reach new growth and areas that are difficult to fully cover by direct spraying.",
        "The WG formulation is easy to prepare and helps reduce dust exposure compared with some traditional forms."
      ]
    },
    "usageGuidance": [
      {
        "crop": "Tomato",
        "target": "Whitefly",
        "dose": "12.5 g / 100 L water",
        "timing": "At the beginning of pest appearance or according to pest monitoring",
        "method": "Foliar spray with good canopy coverage, especially the lower leaf surface",
        "interval": "Foliar spray with good canopy coverage, especially the lower leaf surface",
        "phi": "8 days",
        "recommendation": "8 days"
      },
      {
        "crop": "Cucumber, squash, and cucurbits",
        "target": "Whitefly, aphids, thrips, and leaf miners",
        "dose": "12.5 - 22.5 g / 100 L water",
        "timing": "At the beginning of pest appearance or according to pest monitoring",
        "method": "Foliar spray with attention to the lower leaf surface and new growth",
        "interval": "Foliar spray with attention to the lower leaf surface and new growth",
        "phi": "3 days",
        "recommendation": "3 days"
      },
      {
        "crop": "Pepper and eggplant",
        "target": "Whitefly, aphids, thrips, and leaf miners",
        "dose": "12.5 - 22.5 g / 100 L water",
        "timing": "At the beginning of pest appearance or according to pest monitoring",
        "method": "Foliar spray with good canopy coverage",
        "interval": "Foliar spray with good canopy coverage",
        "phi": "7 days",
        "recommendation": "7 days"
      },
      {
        "crop": "Citrus",
        "target": "Leaf miners, aphids, thrips, soft scale insects, and leafhoppers",
        "dose": "12.5 - 17.5 g / 100 L water",
        "timing": "At the beginning of pest appearance or according to monitoring program",
        "method": "Foliar spray with good coverage of new growth",
        "interval": "Foliar spray with good coverage of new growth",
        "phi": "7 days",
        "recommendation": "7 days"
      }
    ],
    "documents": [
      {
        "type": "brochure",
        "title": "Lasix 70 WG brochure",
        "description": "Product profile covering the concept, uses, and key technical messages.",
        "status": "Yes"
      },
      {
        "type": "technical-sheet",
        "title": "Technical sheet",
        "description": "Concise technical reference covering composition, formulation, use rates, and application guidance.",
        "status": "Yes"
      }
    ]
  },
        {
    "slug": "rival-duo",
    "categorySlug": "agrochemicals",
    "legacySlugs": [
      "rival-duo-45-sc",
      "rival-duo-sc-45"
    ],
    "name": "Rival DUO 45 SC",
    "category": "Crop Protection",
    "subcategory": "Fungicides",
    "crops": [
      "Potato",
      "Tomato",
      "Cucurbits",
      "Onion"
    ],
    "positioning": "A dual-action fungicide combining propamocarb and cymoxanil to support late blight and downy mildew programs in sensitive crops during humidity and disease-pressure periods.",
    "registrationStatus": "Registered and active",
    "seo": {
      "title": "Rival DUO 45 SC | Fungicide for late blight and downy mildew | AgroPest Control",
      "description": "Rival DUO 45 SC is a dual-action fungicide with propamocarb and cymoxanil, supporting late blight and downy mildew programs in potato, tomato, cucurbits, and onion.",
      "keywords": [
        "Rival Duo",
        "Rival Duo 45 SC",
        "fungicide",
        "late blight",
        "downy mildew",
        "propamocarb",
        "cymoxanil",
        "AgroPest Control"
      ]
    },
    "galleryImage": "/images/products/rival-duo-gallery.png",
    "galleryImageAlt": "Rival DUO 45 SC catalogue image",
    "detailImage": "/images/products/rival-duo-detail.png",
    "detailImageAlt": "Rival DUO SC 45 packs with potato tubers under a protection umbrella and potato field background.",
    "facts": {
      "category": "Agrochemicals > Fungicides",
      "composition": "Propamocarb 40% + Cymoxanil 5%.",
      "compositionRows": [
        {
          "ingredient": "Propamocarb",
          "concentration": "40%"
        },
        {
          "ingredient": "Cymoxanil",
          "concentration": "5%"
        }
      ],
      "formulation": "SC - suspension concentrate.",
      "targetCrop": "Potato, tomato, cucurbits, and onion.",
      "target": "Late blight and downy mildew.",
      "supplier": "Agria SA - Bulgaria.",
      "registrationStatus": "Registered with the Egyptian Ministry of Agriculture under registration no. 4244."
    },
    "overview": "Rival DUO 45 SC is an SC suspension concentrate fungicide combining two complementary active ingredients: propamocarb and cymoxanil. It is designed to support oomycete disease programs, especially late blight in potato and tomato and downy mildew in cucurbits and onion. Rival DUO combines preventive protection inside the plant with fast local-curative support, making it suitable during periods with higher disease-spread risk.",
    "pageSections": {
      "overview": {
        "title": "Technical product overview",
        "description": "Rival DUO 45 SC is an SC suspension concentrate fungicide combining two complementary active ingredients: propamocarb and cymoxanil. It is designed to support oomycete disease programs, especially late blight in potato and tomato and downy mildew in cucurbits and onion. Rival DUO combines preventive protection inside the plant with fast local-curative support, making it suitable during periods with higher disease-spread risk."
      },
      "whenToUse": {
        "title": "When to use",
        "items": [
          {
            "title": "Before or at the start of high humidity, dew, and fog periods."
          },
          {
            "title": "When high disease pressure is expected from late blight or downy mildew."
          },
          {
            "title": "In potato and tomato programs during sensitive late blight periods."
          },
          {
            "title": "In cucurbits and onion when conditions favor downy mildew spread."
          },
          {
            "title": "When a program needs both prevention and early curative intervention in an integrated disease-management plan."
          }
        ]
      },
      "whyThisProduct": {
        "title": "Why Rival DUO 45 SC?",
        "description": "Rival DUO 45 SC is built around dual protection. The active ingredient propamocarb supports systemic and preventive protection inside plant tissues, while cymoxanil provides fast local-systemic action that supports intervention at the earliest infection stages. This combination gives the product a clear role in late blight and downy mildew programs, especially when spray timing is difficult because of humidity, fog, or fast disease development. The SC suspension concentrate form also supports easy preparation and even distribution of the active ingredients in the spray solution.",
        "image": "/images/products/rival-duo-mode.svg",
        "imageAlt": "Rival DUO 45 SC positioning visual",
        "points": [
          "Dual protection from propamocarb and cymoxanil.",
          "A clear fit in late blight and downy mildew programs.",
          "SC formulation for practical preparation and uniform spray-solution distribution."
        ]
      },
      "fieldBenefits": {
        "title": "Field benefits",
        "items": [
          {
            "title": "Dual protection in one product",
            "description": "Combines propamocarb and cymoxanil to support prevention and early curative intervention within the control program."
          },
          {
            "title": "Strong support under disease-favorable conditions",
            "description": "Helps support late blight and downy mildew programs during high humidity, dew, and fog, which are conditions that increase the likelihood of infection appearance and spread."
          },
          {
            "title": "Support in resistance-management programs",
            "description": "Two active ingredients with different modes of action support use within rotation programs between fungicide groups."
          },
          {
            "title": "Easy-to-use formulation",
            "description": "The SC suspension concentrate form supports preparation and uniform distribution of the active ingredients in the spray solution."
          },
          {
            "title": "Better stability after spray-solution drying",
            "description": "After droplets dry on the leaf surface, the suspension concentrate form supports coverage stability and helps reduce treatment loss from dew or light rainfall."
          }
        ]
      },
      "applicationRecommendations": {
        "title": "Application recommendations",
        "intro": "Use rates according to approved recommendations, while considering crop condition and conditions favorable to disease spread, and respecting the pre-harvest interval for each crop.",
        "rows": [
          {
            "crop": "Potato",
            "target": "Late blight",
            "dose": "200 cm3 / 100 L water",
            "timing": "Preventively when favorable infection conditions are expected or at the beginning of symptom appearance",
            "method": "Foliar spray with good coverage of vegetative growth",
            "interval": "Foliar spray with good coverage of vegetative growth",
            "phi": "8 days",
            "recommendation": "8 days"
          },
          {
            "crop": "Tomato",
            "target": "Late blight",
            "dose": "200 - 250 cm3 / 100 L water",
            "timing": "At the beginning of conditions favorable to late blight appearance or within its control program",
            "method": "Foliar spray with good coverage of leaves and the lower surface as much as possible",
            "interval": "Foliar spray with good coverage of leaves and the lower surface as much as possible",
            "phi": "8 days",
            "recommendation": "8 days"
          },
          {
            "crop": "Cucurbits such as cucumber and watermelon",
            "target": "Downy mildew",
            "dose": "200 - 250 cm3 / 100 L water",
            "timing": "Before or at the beginning of conditions suitable for downy mildew spread",
            "method": "Foliar spray ensuring good coverage of vegetative growth",
            "interval": "Foliar spray ensuring good coverage of vegetative growth",
            "phi": "3 days",
            "recommendation": "3 days"
          },
          {
            "crop": "Onion",
            "target": "Downy mildew",
            "dose": "200 - 250 cm3 / 100 L water",
            "timing": "Within a downy mildew control program, especially with high humidity and fog",
            "method": "Foliar spray with good coverage of vegetative growth",
            "interval": "Foliar spray with good coverage of vegetative growth",
            "phi": "15 days",
            "recommendation": "15 days"
          }
        ]
      },
      "technicalNotes": {
        "title": "Important technical notes",
        "items": [
          "Use Rival DUO 45 SC within an integrated control program and do not rely on it alone in cases of severe infection or epidemic spread.",
          "Preventive spraying or spraying at the beginning of symptom appearance is preferred, and treatment should not be delayed during high-humidity periods.",
          "Good coverage of vegetative growth is required because coverage quality affects treatment performance.",
          "Rotate with fungicides from different groups within the resistance-management program.",
          "Shake well before use, and conduct a small compatibility test before mixing with other products.",
          "Follow the use rate and pre-harvest interval listed for each crop."
        ]
      },
      "documents": {
        "title": "Documents",
        "items": [
          {
            "type": "brochure",
            "title": "Brochure",
            "description": "Product profile covering the concept, dual composition, target crops, and key use messages.",
            "status": "Yes"
          },
          {
            "type": "label",
            "title": "Label",
            "description": "Local label reference and approved use details.",
            "status": "No / final copy needed"
          },
          {
            "type": "technical-sheet",
            "title": "Technical sheet",
            "description": "Concise technical reference covering composition, formulation, use rates, and pre-harvest intervals.",
            "status": "Yes"
          },
          {
            "type": "certificate",
            "title": "Certificates",
            "description": "Certificates and official files shared for partner discussions.",
            "status": "On request"
          }
        ]
      }
    },
    "benefits": [
      {
        "title": "Dual protection in one product",
        "description": "Combines propamocarb and cymoxanil to support prevention and early curative intervention within the control program."
      },
      {
        "title": "Suitable for disease-pressure periods",
        "description": "Helps manage late blight and downy mildew during high humidity and conditions favorable to disease spread."
      },
      {
        "title": "Support in resistance-management programs",
        "description": "Two active ingredients with different modes of action support use within rotation programs between fungicide groups."
      },
      {
        "title": "Easy-to-use SC formulation",
        "description": "The suspension concentrate formulation supports practical preparation and uniform distribution of the active ingredients in the spray solution."
      },
      {
        "title": "Better stability after spray-solution drying",
        "description": "After droplets dry on the leaf surface, the formulation supports coverage stability and helps reduce treatment loss from dew or light rainfall."
      }
    ],
    "usageTitle": "Application recommendations",
    "usageIntro": "Use rates according to approved recommendations, while considering crop condition and conditions favorable to disease spread, and respecting the pre-harvest interval for each crop.",
    "technicalNotesTitle": "Important technical notes",
    "technicalNotes": [
      "Use Rival DUO 45 SC within an integrated control program and do not rely on it alone in cases of severe infection or epidemic spread.",
      "Preventive spraying or spraying at the beginning of symptom appearance is preferred, and treatment should not be delayed during high-humidity periods.",
      "Good coverage of vegetative growth is required because coverage quality affects treatment performance.",
      "Rotate with fungicides from different groups within the resistance-management program.",
      "Shake well before use, and conduct a small compatibility test before mixing with other products.",
      "Follow the use rate and pre-harvest interval listed for each crop."
    ],
    "modeOfAction": {
      "title": "Why Rival DUO 45 SC?",
      "description": "Rival DUO 45 SC is built around dual protection. The active ingredient propamocarb supports systemic and preventive protection inside plant tissues, while cymoxanil provides fast local-systemic action that supports intervention at the earliest infection stages. This combination gives the product a clear role in late blight and downy mildew programs, especially when spray timing is difficult because of humidity, fog, or fast disease development. The SC suspension concentrate form also supports easy preparation and even distribution of the active ingredients in the spray solution.",
      "image": "/images/products/rival-duo-mode.svg",
      "imageAlt": "Rival DUO 45 SC positioning visual",
      "points": [
        "Dual protection from propamocarb and cymoxanil.",
        "A clear fit in late blight and downy mildew programs.",
        "SC formulation for practical preparation and uniform spray-solution distribution."
      ]
    },
    "usageGuidance": [
      {
        "crop": "Potato",
        "target": "Late blight",
        "dose": "200 cm3 / 100 L water",
        "timing": "Preventively when favorable infection conditions are expected or at the beginning of symptom appearance",
        "method": "Foliar spray with good coverage of vegetative growth",
        "interval": "Foliar spray with good coverage of vegetative growth",
        "phi": "8 days",
        "recommendation": "8 days"
      },
      {
        "crop": "Tomato",
        "target": "Late blight",
        "dose": "200 - 250 cm3 / 100 L water",
        "timing": "At the start of disease pressure or within a late blight control program",
        "method": "Foliar spray with good coverage of leaves and the lower surface as much as possible",
        "interval": "Foliar spray with good coverage of leaves and the lower surface as much as possible",
        "phi": "8 days",
        "recommendation": "8 days"
      },
      {
        "crop": "Cucurbits such as cucumber and watermelon",
        "target": "Downy mildew",
        "dose": "200 - 250 cm3 / 100 L water",
        "timing": "Before or at the beginning of conditions suitable for downy mildew spread",
        "method": "Foliar spray ensuring good coverage of vegetative growth",
        "interval": "Foliar spray ensuring good coverage of vegetative growth",
        "phi": "3 days",
        "recommendation": "3 days"
      },
      {
        "crop": "Onion",
        "target": "Downy mildew",
        "dose": "200 - 250 cm3 / 100 L water",
        "timing": "Within a downy mildew control program, especially with high humidity and fog",
        "method": "Foliar spray with good coverage of vegetative growth",
        "interval": "Foliar spray with good coverage of vegetative growth",
        "phi": "15 days",
        "recommendation": "15 days"
      }
    ],
    "documents": [
      {
        "type": "brochure",
        "title": "Brochure",
        "description": "Product profile covering the concept, dual composition, target crops, and key use messages.",
        "status": "Yes"
      },
      {
        "type": "label",
        "title": "Label",
        "description": "Local label reference and approved use details.",
        "status": "No / final copy needed"
      },
      {
        "type": "technical-sheet",
        "title": "Technical sheet",
        "description": "Concise technical reference covering composition, formulation, use rates, and pre-harvest intervals.",
        "status": "Yes"
      },
      {
        "type": "registration-document",
        "title": "Certificates",
        "description": "Certificates and official files shared for partner discussions.",
        "status": "On request"
      }
    ]
  },
    {
    "slug": "edegal",
    "categorySlug": "agrochemicals",
    "legacySlugs": [
      "edegal-72-2-sl"
    ],
    "name": "Edegal 72.2 SL",
    "category": "Crop Protection",
    "subcategory": "Fungicides",
    "crops": [
      "Cucumber",
      "Cucurbit family",
      "Onion"
    ],
    "positioning": "A systemic fungicide containing propamocarb hydrochloride 72.2% in SL formulation, designed for prevention and early treatment of downy mildew, especially in cucumber.",
    "registrationStatus": "Registered and active",
    "galleryImage": "/images/products/edegal-gallery.png",
    "galleryImageAlt": "Edegal 72.2 SL catalogue image",
    "detailImage": "/images/products/edegal-detail.png",
    "detailImageAlt": "Edegal 72.2 SL pack in front of cucumber plants inside a greenhouse, with downy mildew symptoms on the background leaves.",
    "facts": {
      "category": "Agrochemicals > Fungicides",
      "composition": "Propamocarb HCl 72.2%.",
      "formulation": "SL - soluble concentrate.",
      "targetCrop": "Cucumber, cucurbit family, and onion.",
      "target": "Downy mildew and oomycete diseases in early infection stages.",
      "supplier": "Agria SA - Bulgaria.",
      "registrationStatus": "Registered with the Egyptian Ministry of Agriculture; registration no. 5398."
    },
    "overview": "Edegal 72.2 SL is a specialized systemic fungicide for early protection against downy mildew in cucumber. After uptake, it moves inside plant tissues, helping protect new growth and reduce disease development before infection reaches difficult-to-control stages.",
    "benefits": [
      {
        "title": "Systemic protection from inside the plant",
        "description": "Moves within plant tissues to support effective internal protection against downy mildew."
      },
      {
        "title": "Fast start of action",
        "description": "The plant absorbs it shortly after application, supporting a rapid start of protection."
      },
      {
        "title": "Better reach to untreated areas",
        "description": "Its systemic movement helps reach parts that may not be fully covered by direct spraying."
      },
      {
        "title": "Activity through leaves and roots",
        "description": "Can be used as a foliar spray or through irrigation water according to technical recommendations."
      },
      {
        "title": "Suitable for early-protection programs",
        "description": "Supports preventive intervention before infection becomes severe, especially in greenhouses and humid conditions."
      }
    ],
    "modeOfAction": {
      "title": "How Edegal works",
      "description": "Edegal depends on propamocarb hydrochloride with systemic action. It is absorbed through leaves or roots, then moves inside the plant to help limit downy mildew development in its early stages.",
      "image": "/images/products/edegal-mode.png",
      "imageAlt": "Illustration of systemic movement of Edegal 72.2 SL inside the plant",
      "points": [
        "Spreads inside plant tissues after uptake.",
        "Helps protect new growth and untreated areas.",
        "Limits disease development when used early within a suitable control program."
      ]
    },
    "usageGuidance": [
      {
        "crop": "Cucumber",
        "target": "Downy mildew",
        "dose": "250 cm3 / 100 L water",
        "timing": "Preferably used in the early growth stages and before infection becomes severe; repeat every 7-10 days depending on disease pressure and weather conditions.",
        "interval": "Foliar spray; can also be used with irrigation water by adding the product to the irrigation network to reach the root zone.",
        "recommendation": "5 days"
      },
      {
        "crop": "Cucurbit family",
        "target": "Downy mildew",
        "dose": "250 cm3 / 100 L water",
        "timing": "Preferably used early and within a suitable preventive program.",
        "interval": "Foliar spray with good coverage.",
        "recommendation": "5 days"
      },
      {
        "crop": "Onion",
        "target": "Downy mildew",
        "dose": "250 cm3 / 100 L water",
        "timing": "Preferably used early and within a suitable preventive program.",
        "interval": "Foliar spray with good coverage.",
        "recommendation": "15 days"
      }
    ],
    "documents": [
      {
        "title": "Brochure",
        "description": "Product profile covering the concept, main uses, and key technical and commercial messages for distributors and customers.",
        "status": "Yes"
      },
      {
        "title": "Label",
        "description": "Local label reference and approved use details.",
        "status": "Yes / on photographed pack"
      },
      {
        "title": "Technical sheet",
        "description": "Concise technical reference covering composition, formulation, use rates, and the key product presentation points.",
        "status": "Yes"
      },
      {
        "title": "Certificates",
        "description": "Certificates and official files shared for partner discussions.",
        "status": "On request"
      }
    ]
  },
    {
      "slug": "signal-npk-20-20-20",
      "categorySlug": "specialty-fertilizers",
      "legacySlugs": [
            "signal-npk",
            "signal-npk-series",
            "signal-npk-balanced"
      ],
      "name": "Signal Balanced",
      "category": "Plant Nutrition",
      "subcategory": "Water Soluble NPK",
      "crops": [
            "Tomato",
            "Pepper",
            "Cucumber",
            "Squash",
            "Potato",
            "Onion",
            "Leafy vegetables",
            "Citrus",
            "Grape",
            "Strawberry",
            "Mango",
            "Pomegranate",
            "Field crops"
      ],
      "positioning": "Balanced water-soluble NPK formula enriched with chelated micronutrients and 2.5% organic matter, positioned for balanced vegetative growth, crop establishment, and steady nutritional support.",
      "registrationStatus": "Registered and active",
      "galleryImage": "/images/products/signal-npk-20-20-20-product.png",
      "galleryImageAlt": "Signal NPK series catalogue image highlighting the balanced 20-20-20 formula",
      "detailImage": "/images/products/signal-npk-20-20-20-product.png",
      "detailImageAlt": "Signal NPK water-soluble fertilizer packaging for the 20-20-20 balanced formula.",
      "facts": {
            "category": "Fertilizers > Water Soluble NPK",
            "composition": "NPK 20-20-20 + chelated micronutrients + 2.5% organic matter.",
            "compositionRows": [
                  {
                        "ingredient": "Nitrogen (N)",
                        "concentration": "20% w/w"
                  },
                  {
                        "ingredient": "Phosphorus (P2O5)",
                        "concentration": "20% w/w"
                  },
                  {
                        "ingredient": "Potassium (K2O)",
                        "concentration": "20% w/w"
                  },
                  {
                        "ingredient": "Chelated micronutrients",
                        "concentration": "Fe, Zn, Mn, B, Cu, Mo"
                  },
                  {
                        "ingredient": "Organic matter",
                        "concentration": "2.5% w/w"
                  }
            ],
            "formulation": "WSP - Water-soluble powder",
            "targetCrop": "Vegetable, fruit, nursery, and field crops",
            "target": "Balanced growth, crop establishment, and general nutritional support",
            "supplier": "Eurogro - Greece",
            "registrationStatus": "Egyptian MOA - registered and in market"
      },
      "overview": "Signal NPK 20-20-20 is the balanced formula within the Signal NPK series. It is designed for periods when the crop needs even support from nitrogen, phosphorus, and potassium, especially during establishment, vegetative growth, recovery after stress, and general maintenance feeding in foliar or fertigation programs.",
      "benefits": [
            {
                  "title": "Balanced NPK ratio",
                  "description": "Provides equal support from nitrogen, phosphorus, and potassium when the crop requires a stable nutritional base."
            },
            {
                  "title": "Fast soluble nutrition",
                  "description": "Fully soluble powder supports quick availability through foliar spray or fertigation programs."
            },
            {
                  "title": "Chelated micronutrient support",
                  "description": "Helps maintain micronutrient availability and supports enzyme activity, chlorophyll formation, and healthy plant vigor."
            },
            {
                  "title": "Useful in recovery programs",
                  "description": "A practical choice after stress periods, weak growth, or when the crop needs balanced rebuilding rather than one-directional feeding."
            },
            {
                  "title": "Flexible commercial fit",
                  "description": "Suitable as the standard Signal formula for distributors and growers before moving to High-P or High-K according to the crop stage."
            }
      ],
      "modeOfAction": {
            "title": "Balanced vegetative and establishment support",
            "description": "The 20-20-20 formula supports the crop when growth demand is distributed across canopy formation, root activity, and early productivity preparation, without pushing one nutritional direction too strongly.",
            "image": "/images/products/signal-npk-20-20-20-mode.svg",
            "imageAlt": "Signal NPK 20-20-20 balanced growth support visual",
            "points": [
                  "Nitrogen supports vegetative growth and canopy building.",
                  "Phosphorus supports root activity and energy transfer during active growth.",
                  "Potassium supports water balance, photosynthate movement, and crop strength."
            ]
      },
      "usageGuidance": [
            {
                  "crop": "Vegetable crops",
                  "target": "Balanced nutrition for tomato, pepper, cucumber, squash, potato, onion, and leafy vegetables.",
                  "dose": "Foliar: 2-3 g/L water. Fertigation: 4-5 kg/feddan per application.",
                  "timing": "Use during establishment, vegetative growth, crop recovery, or between targeted High-P and High-K applications.",
                  "interval": "Repeat every 7-14 days according to crop condition and nutrition program.",
                  "recommendation": "Ensure good coverage in foliar spray and use clean water for fertigation."
            },
            {
                  "crop": "Fruit crops",
                  "target": "Balanced nutritional support for citrus, grape, strawberry, mango, pomegranate, and orchards.",
                  "dose": "Foliar: 2-3 g/L water. Fertigation: 4-5 kg/feddan per application.",
                  "timing": "Use during active vegetative flushes, recovery periods, and general maintenance feeding.",
                  "interval": "Repeat according to canopy condition, crop load, and leaf/soil analysis.",
                  "recommendation": "Move to High-P or High-K when the crop stage becomes more specific."
            },
            {
                  "crop": "Field crops and nurseries",
                  "target": "General growth support and transplant establishment.",
                  "dose": "Foliar: 2-3 g/L water. Fertigation: 4-5 kg/feddan per application.",
                  "timing": "Use during early growth, nursery establishment, and periods of balanced nutritional demand.",
                  "interval": "Weekly or biweekly within a structured program.",
                  "recommendation": "Jar test before tank mixing; avoid strongly alkaline tank mixes."
            }
      ],
      "documents": [
            {
                  "title": "Brochure",
                  "description": "Signal NPK series brochure covering the concept, formula differences, recommended rates, and crop-stage positioning.",
                  "status": "Available"
            },
            {
                  "title": "Technical sheet",
                  "description": "Formula-specific reference covering composition, application rates, compatibility notes, and positioning in crop nutrition programs.",
                  "status": "Available / can be prepared"
            }
      ]
},
    {
      "slug": "signal-npk-14-48-0",
      "categorySlug": "specialty-fertilizers",
      "legacySlugs": [
            "signal-npk-high-phosphorus",
            "signal-high-phosphorus"
      ],
      "name": "Signal High Phosphorus",
      "category": "Plant Nutrition",
      "subcategory": "Water Soluble NPK",
      "crops": [
            "Tomato",
            "Pepper",
            "Cucumber",
            "Squash",
            "Potato",
            "Onion",
            "Leafy vegetables",
            "Citrus",
            "Grape",
            "Strawberry",
            "Mango",
            "Pomegranate",
            "Field crops"
      ],
      "positioning": "High-phosphorus water-soluble NPK formula enriched with chelated micronutrients and 2.5% organic matter, positioned for root activity, early establishment, flowering preparation, and energy-demand stages.",
      "registrationStatus": "Registered and active",
      "galleryImage": "/images/products/signal-npk-14-48-0-product.png",
      "galleryImageAlt": "Signal NPK series catalogue image highlighting the 14-48-0 high phosphorus formula",
      "detailImage": "/images/products/signal-npk-14-48-0-product.png",
      "detailImageAlt": "Signal NPK water-soluble fertilizer packaging for the 14-48-0 high phosphorus formula.",
      "facts": {
            "category": "Fertilizers > Water Soluble NPK",
            "composition": "NPK 14-48-0 + chelated micronutrients + 2.5% organic matter.",
            "compositionRows": [
                  {
                        "ingredient": "Nitrogen (N)",
                        "concentration": "14% w/w"
                  },
                  {
                        "ingredient": "Phosphorus (P2O5)",
                        "concentration": "48% w/w"
                  },
                  {
                        "ingredient": "Potassium (K2O)",
                        "concentration": "0% w/w"
                  },
                  {
                        "ingredient": "Chelated micronutrients",
                        "concentration": "Fe, Zn, Mn, B, Cu, Mo"
                  },
                  {
                        "ingredient": "Organic matter",
                        "concentration": "2.5% w/w"
                  }
            ],
            "formulation": "WSP - Water-soluble powder",
            "targetCrop": "Vegetable, fruit, nursery, and field crops",
            "target": "Root activation, establishment, flowering preparation, and energy support",
            "supplier": "Eurogro - Greece",
            "registrationStatus": "Egyptian MOA - registered and in market"
      },
      "overview": "Signal NPK 14-48-0 is the high-phosphorus formula in the Signal NPK series. It is designed for stages where the plant requires strong phosphorus support for root activity, establishment, energy transfer, early flowering preparation, and the transition into productive growth.",
      "benefits": [
            {
                  "title": "High phosphorus concentration",
                  "description": "Focused phosphorus supply supports root activity and the energy processes required during early and reproductive stages."
            },
            {
                  "title": "Useful at early growth stages",
                  "description": "Fits transplant establishment, early root development, and periods when root performance needs support."
            },
            {
                  "title": "Supports flowering preparation",
                  "description": "Can be positioned before flowering and early fruit setting when phosphorus demand is important."
            },
            {
                  "title": "Chelated micronutrients included",
                  "description": "Micronutrients help maintain balanced metabolic activity alongside the high-phosphorus ratio."
            },
            {
                  "title": "Targeted formula choice",
                  "description": "Prevents using one generic NPK ratio all season and gives the distributor a clear stage-based recommendation."
            }
      ],
      "modeOfAction": {
            "title": "Energy and root-stage nutrition",
            "description": "The 14-48-0 formula concentrates the feeding direction around phosphorus, which is central to energy transfer, root activity, and preparation for flowering and productive stages.",
            "image": "/images/products/signal-npk-14-48-0-mode.svg",
            "imageAlt": "Signal NPK 14-48-0 high phosphorus root and energy support visual",
            "points": [
                  "High phosphorus supports energy-demand processes during early growth.",
                  "Root activity is supported during transplanting, establishment, and stress recovery windows.",
                  "The formula is useful before flowering or early fruit-setting phases when phosphorus demand increases."
            ]
      },
      "usageGuidance": [
            {
                  "crop": "Vegetable crops",
                  "target": "Root activation and early establishment for tomato, pepper, cucumber, squash, potato, onion, and leafy vegetables.",
                  "dose": "Foliar: 2-3 g/L water. Fertigation: 4-5 kg/feddan per application.",
                  "timing": "Use after transplanting, during early growth, before flowering, or when root activity needs support.",
                  "interval": "Repeat every 7-14 days according to crop stage and program design.",
                  "recommendation": "Avoid unnecessary use during late fruit filling when High-K is more suitable."
            },
            {
                  "crop": "Fruit crops",
                  "target": "Flowering preparation, early fruit set support, and recovery of root activity.",
                  "dose": "Foliar: 2-3 g/L water. Fertigation: 4-5 kg/feddan per application.",
                  "timing": "Use before flowering, around early reproductive stages, or during root activity recovery windows.",
                  "interval": "Repeat based on crop load and technical program.",
                  "recommendation": "Use as a targeted High-P window, then shift to Balanced or High-K according to crop stage."
            },
            {
                  "crop": "Nurseries and field crops",
                  "target": "Seedling establishment, root activity, and early vigor.",
                  "dose": "Foliar: 2-3 g/L water. Fertigation: 4-5 kg/feddan per application.",
                  "timing": "Use during establishment and early vegetative stages.",
                  "interval": "Weekly or biweekly within a structured program.",
                  "recommendation": "Jar test before tank mixing; avoid strongly alkaline tank mixes."
            }
      ],
      "documents": [
            {
                  "title": "Brochure",
                  "description": "Signal NPK series brochure covering the concept, formula differences, recommended rates, and crop-stage positioning.",
                  "status": "Available"
            },
            {
                  "title": "Technical sheet",
                  "description": "Formula-specific reference covering composition, application rates, compatibility notes, and positioning in crop nutrition programs.",
                  "status": "Available / can be prepared"
            }
      ]
},
    {
      "slug": "signal-npk-12-5-40",
      "categorySlug": "specialty-fertilizers",
      "legacySlugs": [
            "signal-npk-high-potassium",
            "signal-high-potassium"
      ],
      "name": "Signal High Potassium",
      "category": "Plant Nutrition",
      "subcategory": "Water Soluble NPK",
      "crops": [
            "Tomato",
            "Pepper",
            "Cucumber",
            "Squash",
            "Potato",
            "Onion",
            "Leafy vegetables",
            "Citrus",
            "Grape",
            "Strawberry",
            "Mango",
            "Pomegranate",
            "Field crops"
      ],
      "positioning": "High-potassium water-soluble NPK formula enriched with chelated micronutrients and 2.5% organic matter, positioned for fruit sizing, quality, sugar movement, color, firmness, and late-stage crop support.",
      "registrationStatus": "Registered and active",
      "galleryImage": "/images/products/signal-npk-12-5-40-product.png",
      "galleryImageAlt": "Signal NPK series catalogue image highlighting the 12-5-40 high potassium formula",
      "detailImage": "/images/products/signal-npk-12-5-40-product.png",
      "detailImageAlt": "Signal NPK water-soluble fertilizer packaging for the 12-5-40 high potassium formula.",
      "facts": {
            "category": "Fertilizers > Water Soluble NPK",
            "composition": "NPK 12-5-40 + chelated micronutrients + 2.5% organic matter.",
            "compositionRows": [
                  {
                        "ingredient": "Nitrogen (N)",
                        "concentration": "12% w/w"
                  },
                  {
                        "ingredient": "Phosphorus (P2O5)",
                        "concentration": "5% w/w"
                  },
                  {
                        "ingredient": "Potassium (K2O)",
                        "concentration": "40% w/w"
                  },
                  {
                        "ingredient": "Chelated micronutrients",
                        "concentration": "Fe, Zn, Mn, B, Cu, Mo"
                  },
                  {
                        "ingredient": "Organic matter",
                        "concentration": "2.5% w/w"
                  }
            ],
            "formulation": "WSP - Water-soluble powder",
            "targetCrop": "Vegetable, fruit, and field crops during productive stages",
            "target": "Fruit sizing, quality, sugar movement, color, firmness, and late-stage support",
            "supplier": "Eurogro - Greece",
            "registrationStatus": "Egyptian MOA - registered and in market"
      },
      "overview": "Signal NPK 12-5-40 is the high-potassium formula in the Signal NPK series. It is designed for productive stages when the crop needs potassium-led nutrition to support fruit sizing, carbohydrate movement, quality expression, color, firmness, and final market value.",
      "benefits": [
            {
                  "title": "High potassium direction",
                  "description": "Supports fruit filling, sugar movement, and quality-building processes during productive stages."
            },
            {
                  "title": "Quality-focused positioning",
                  "description": "A practical formula for sizing, color, firmness, and late-stage crop finishing programs."
            },
            {
                  "title": "Lower phosphorus ratio",
                  "description": "Keeps the formula focused on potassium demand rather than early root or flowering support."
            },
            {
                  "title": "Chelated micronutrients included",
                  "description": "Supports metabolic balance during periods of heavy fruit load and active photosynthate movement."
            },
            {
                  "title": "Clear harvest-stage recommendation",
                  "description": "Gives distributors a simple answer when growers ask which Signal formula is suitable for fruit quality and finishing."
            }
      ],
      "modeOfAction": {
            "title": "Potassium-led quality and filling support",
            "description": "The 12-5-40 formula shifts the feeding direction toward potassium, which supports water balance, carbohydrate transport, fruit filling, quality development, and crop finishing.",
            "image": "/images/products/signal-npk-12-5-40-mode.svg",
            "imageAlt": "Signal NPK 12-5-40 high potassium fruit quality support visual",
            "points": [
                  "Potassium supports movement of carbohydrates from leaves to fruits and storage organs.",
                  "The formula fits fruit sizing, color, firmness, and quality windows.",
                  "It is useful during late productive stages when potassium demand is higher than phosphorus demand."
            ]
      },
      "usageGuidance": [
            {
                  "crop": "Vegetable crops",
                  "target": "Fruit sizing and quality support for tomato, pepper, cucumber, squash, potato, onion, and fruiting vegetables.",
                  "dose": "Foliar: 2-3 g/L water. Fertigation: 4-5 kg/feddan per application.",
                  "timing": "Use during fruit filling, sizing, color development, and late productive stages.",
                  "interval": "Repeat every 7-14 days according to crop load and harvest program.",
                  "recommendation": "Avoid using High-K too early when the crop still needs balanced growth or phosphorus-led establishment."
            },
            {
                  "crop": "Fruit crops",
                  "target": "Fruit sizing, color, sugar movement, firmness, and market quality.",
                  "dose": "Foliar: 2-3 g/L water. Fertigation: 4-5 kg/feddan per application.",
                  "timing": "Use during fruit enlargement, maturation, and finishing stages.",
                  "interval": "Repeat according to crop load, leaf analysis, and expected harvest window.",
                  "recommendation": "Use within a full nutrition program that also manages calcium and micronutrient needs."
            },
            {
                  "crop": "Field crops and tuber crops",
                  "target": "Storage organ filling and quality support.",
                  "dose": "Foliar: 2-3 g/L water. Fertigation: 4-5 kg/feddan per application.",
                  "timing": "Use during tuber, bulb, or storage-organ development stages.",
                  "interval": "Weekly or biweekly within a structured program.",
                  "recommendation": "Jar test before tank mixing; avoid strongly alkaline tank mixes."
            }
      ],
      "documents": [
            {
                  "title": "Brochure",
                  "description": "Signal NPK series brochure covering the concept, formula differences, recommended rates, and crop-stage positioning.",
                  "status": "Available"
            },
            {
                  "title": "Technical sheet",
                  "description": "Formula-specific reference covering composition, application rates, compatibility notes, and positioning in crop nutrition programs.",
                  "status": "Available / can be prepared"
            }
      ]
},
    {
      "slug": "chrome-pk",
      "categorySlug": "specialty-fertilizers",
      "legacySlugs": [
        "chrome-pk-foliar"
      ],
      "name": "Chrome PK",
      "category": "Plant Nutrition",
      "subcategory": "Phosphite & Stress Support",
      "crops": [
        "Onion",
        "Potato",
        "Tomato",
        "Pepper",
        "Eggplant",
        "Leafy vegetables",
        "Citrus",
        "Olive",
        "Grape",
        "Fruit trees"
      ],
      "positioning": "High-concentration potassium phosphite foliar fertilizer delivering functional PK nutrition with rapid mobility and plant defense-support positioning.",
      "registrationStatus": "Registered and active",
      "galleryImage": "/images/products/chrome-pk-gallery.png",
      "galleryImageAlt": "Chrome PK catalogue image",
      "detailImage": "/images/products/chrome-pk-detail.png",
      "detailImageAlt": "Chrome PK foliar potassium phosphite product image.",
      "facts": {
        "category": "Fertilizers > Phosphite & Stress Support",
        "composition": "Di-potassium phosphite 50% w/v; Phosphorus P2O5 30% w/v; Potassium K2O 20% w/v",
        "compositionRows": [
          {
            "ingredient": "Di-potassium phosphite",
            "concentration": "50% w/v"
          },
          {
            "ingredient": "Phosphorus (P₂O₅)",
            "concentration": "30% w/v"
          },
          {
            "ingredient": "Potassium (K₂O)",
            "concentration": "20% w/v"
          },
          {
            "ingredient": "Phosphorus form",
            "concentration": "Phosphite (PO₃³⁻)"
          }
        ],
        "formulation": "SL - Liquid foliar fertilizer",
        "targetCrop": "Vegetables, fruit crops, vine crops, olive, and citrus",
        "target": "Functional PK nutrition, stress support, and defense priming",
        "supplier": "Eurogro - Greece",
        "registrationStatus": "Egyptian MOA - registered and in market"
      },
      "overview": "Chrome PK supplies phosphorus as phosphite, not phosphate, giving it a distinct functional role. It provides rapid potassium and phosphite mobility while supporting the plant's internal defense chemistry, making it a complement to registered fungicide programs rather than a replacement for them.",
      "benefits": [
        {
          "title": "Bidirectional systemic mobility",
          "description": "Phosphite moves through both xylem and phloem, reaching new growth, roots, developing fruit, and storage tissues."
        },
        {
          "title": "Defense chemistry activation",
          "description": "Supports phytoalexin and SAR-related defense pathways relevant to Oomycete disease pressure."
        },
        {
          "title": "Rapid potassium supply",
          "description": "The 20% K₂O fraction supports stomatal regulation, fruit cell expansion, sugar loading, and quality stages."
        },
        {
          "title": "Stress conditioning",
          "description": "Foliar potassium phosphite helps maintain cellular potassium under heat, salinity, and water-deficit stress."
        },
        {
          "title": "Portfolio complement",
          "description": "Works naturally with Signal NPK, Rival Duo, Edegal, Fossil, and Chrome CaB in integrated nutrition and protection programs."
        }
      ],
      "modeOfAction": {
        "title": "Phosphite mobility and defense support",
        "description": "Phosphite enters leaf tissue and moves systemically in both directions. It is not a complete substitute for phosphate nutrition, but its elevated internal concentration can trigger defense-related pathways while potassium supports water relations and quality development.",
        "image": "/images/products/chrome-pk-mode.png",
        "imageAlt": "Chrome PK phosphite movement visual",
        "points": [
          "Supports internal defense priming without replacing registered fungicides.",
          "Potassium contributes to turgor, stomatal function, Brix, color, and fruit quality.",
          "Avoid tank mixing with calcium-rich products unless compatibility is confirmed by jar test."
        ]
      },
      "usageGuidance": [
        {
          "crop": "Vegetables",
          "target": "Onion, potato, tomato, pepper, eggplant, and leafy vegetables.",
          "dose": "2.5-3.5 cm³ / L water",
          "timing": "Use preventively in disease-risk windows, around fruit set, and during quality/stress stages.",
          "interval": "Every 10-14 days; tighten to 7-10 days in high-risk windows.",
          "recommendation": "Can complement Rival Duo or Edegal after jar test."
        },
        {
          "crop": "Grape and vine crops",
          "target": "Stress support, defense priming, and fruit quality.",
          "dose": "2.5-3.5 cm³ / L water",
          "timing": "Use before high-humidity periods, around fruit set, and through sizing/maturation.",
          "interval": "Repeat as part of a structured foliar nutrition program.",
          "recommendation": "Do not treat as a full phosphate nutrition replacement."
        },
        {
          "crop": "Fruit trees, citrus, and olive",
          "target": "Quality, stress support, and functional PK supply.",
          "dose": "2.5-3.0 cm³ / L water",
          "timing": "Use at fruit set, sizing, maturation, and post-stress recovery windows.",
          "interval": "Every 10-14 days according to program need.",
          "recommendation": "Avoid combining with calcium fertilizers in the same tank unless tested."
        }
      ],
      "documents": [
        {
          "title": "Brochure",
          "description": "Product overview, key applications, and commercial messages formatted for distributors and growers.",
          "status": ""
        },
        {
          "title": "Technical sheet",
          "description": "Composition, formulation properties, approved rates, compatibility notes, and technical positioning in a concise reference format.",
          "status": ""
        }
      ]
    },
    {
      "slug": "chrome-ca-b",
      "categorySlug": "specialty-fertilizers",
      "legacySlugs": [
        "chrome-cab",
        "chrome-ca-boron"
      ],
      "name": "Chrome CaB",
      "category": "Plant Nutrition",
      "subcategory": "Calcium, Boron & Micronutrients",
      "crops": [
        "Tomato",
        "Pepper",
        "Cucumber",
        "Eggplant",
        "Grape",
        "Citrus",
        "Apple",
        "Pear",
        "Strawberry",
        "Potato",
        "Leafy vegetables"
      ],
      "positioning": "Liquid calcium-boron foliar fertilizer combining CaO 7.8% and B 2.8% to support cell-wall structure, pollination, fruit set, firmness, and postharvest quality.",
      "registrationStatus": "Registered and active",
      "galleryImage": "/images/products/chrome-ca-b-gallery.png",
      "galleryImageAlt": "Chrome CaB catalogue image",
      "detailImage": "/images/products/chrome-ca-b-detail.png",
      "detailImageAlt": "Chrome CaB product image for calcium-boron nutrition.",
      "facts": {
        "category": "Fertilizers > Calcium, Boron & Micronutrients",
        "composition": "Calcium (CaO) 7.8% w/v; Boron (B) 2.8% w/v",
        "compositionRows": [
          {
            "ingredient": "Calcium (CaO)",
            "concentration": "7.8% w/v"
          },
          {
            "ingredient": "Boron (B)",
            "concentration": "2.8% w/v"
          }
        ],
        "formulation": "SL - Liquid foliar fertilizer",
        "targetCrop": "Fruiting vegetables, grape, citrus, fruit trees, strawberry, potato, and leafy vegetables",
        "target": "Cell-wall integrity, pollination, fruit set, firmness, and quality",
        "supplier": "Eurogro - Greece",
        "registrationStatus": "Egyptian MOA - registered and in market"
      },
      "overview": "Chrome CaB is a liquid calcium-boron fertilizer designed for crops where cell-wall integrity and reproductive success directly determine marketable yield. It supplies calcium and boron together at the stages when cell expansion, pollen tube growth, fruit set, and firmness depend on timely foliar nutrition.",
      "benefits": [
        {
          "title": "Cell-wall structural integrity",
          "description": "Calcium supports cell-wall rigidity, membrane integrity, and resistance to cracking and physiological disorders."
        },
        {
          "title": "Pollination and fruit-set support",
          "description": "Boron supports pollen tube elongation, carbohydrate movement, and early fruit set processes."
        },
        {
          "title": "Firmness and postharvest quality",
          "description": "The Ca-B combination helps improve fruit firmness, handling tolerance, and shelf-life potential."
        },
        {
          "title": "Cracking and BER reduction program",
          "description": "Useful in crops where rapid cell expansion and water fluctuations increase cracking or blossom-end-rot risk."
        },
        {
          "title": "High-demand timing precision",
          "description": "Best applied before flowering, after set, during rapid sizing, and before harvest quality windows."
        }
      ],
      "modeOfAction": {
        "title": "Calcium structure with boron vitality",
        "description": "Calcium is absorbed into expanding tissues and becomes part of cell-wall structure, while boron supports pectin cross-linking and pollen tube development. Supplying both together improves the structural foundation behind fruit quality.",
        "image": "/images/products/chrome-ca-b-mode.svg",
        "imageAlt": "Chrome CaB calcium-boron mode of action visual",
        "points": [
          "Calcium is xylem-mobile only and must be continuously supplied to growing tissues.",
          "Boron demand is concentrated around pre-flowering, flowering, and early fruit set.",
          "Avoid tank mixing with phosphates, sulfates, or strongly alkaline materials unless compatibility is verified."
        ]
      },
      "usageGuidance": [
        {
          "crop": "Fruiting vegetables",
          "target": "Tomato, pepper, cucumber, and eggplant: pollination, fruit set, cracking, and BER management.",
          "dose": "2-3 cm³ / L water",
          "timing": "Pre-flowering, full bloom to petal fall, post-set, and rapid sizing stages.",
          "interval": "Every 10-15 days; tighten to 7-10 days around flowering, fruit set, and rapid sizing.",
          "recommendation": "Prioritize when salinity, humidity, or fast growth limits calcium delivery."
        },
        {
          "crop": "Grape and vine crops",
          "target": "Fruit set, berry firmness, and postharvest quality.",
          "dose": "2-3 cm³ / L water",
          "timing": "Before flowering, after set, and through berry development.",
          "interval": "Repeat according to program and variety sensitivity.",
          "recommendation": "Avoid large gaps between applications during rapid sizing."
        },
        {
          "crop": "Fruit trees, citrus, and strawberry",
          "target": "Firmness, fruit quality, calcium-boron supply, and cracking risk reduction.",
          "dose": "2-3 cm³ / L water",
          "timing": "From pre-flowering through fruit growth and pre-harvest quality windows.",
          "interval": "Every 10-15 days according to crop stage.",
          "recommendation": "Can complement Chrome PK and Signal High-K in quality programs after jar test."
        }
      ],
      "documents": [
        {
          "title": "Brochure",
          "description": "Product overview, key applications, and commercial messages formatted for distributors and growers.",
          "status": ""
        },
        {
          "title": "Technical sheet",
          "description": "Composition, formulation properties, approved rates, compatibility notes, and technical positioning in a concise reference format.",
          "status": ""
        }
      ]
    },
    {
      "slug": "tesla",
      "categorySlug": "specialty-fertilizers",
      "legacySlugs": [
        "tesla-potassium-silicate"
      ],
      "name": "Tesla Potassium Silicate",
      "category": "Plant Nutrition",
      "subcategory": "Potassium & Silicon",
      "crops": [
        "Tomato",
        "Pepper",
        "Cucumber",
        "Eggplant",
        "Grape",
        "Citrus",
        "Apple",
        "Pear",
        "Strawberry",
        "Potato",
        "Leafy vegetables"
      ],
      "positioning": "Liquid potassium silicate fertilizer delivering 17.3% K₂O with bioavailable silicon to support structural resilience, stress tolerance, and fruit quality.",
      "registrationStatus": "Registered and active",
      "galleryImage": "/images/products/tesla-gallery.png",
      "galleryImageAlt": "Tesla Potassium Silicate catalogue image",
      "detailImage": "/images/products/tesla-detail.png",
      "detailImageAlt": "Tesla Potassium Silicate product page image.",
      "facts": {
        "category": "Fertilizers > Potassium & Silicon",
        "composition": "Potassium (K2O) 17.3% w/v; Silicon source: potassium silicate - bioavailable SiO3",
        "compositionRows": [
          {
            "ingredient": "Potassium (K₂O)",
            "concentration": "17.3% w/v"
          },
          {
            "ingredient": "Silicon source",
            "concentration": "Potassium silicate - bioavailable SiO₃"
          }
        ],
        "formulation": "SL - Liquid foliar fertilizer",
        "targetCrop": "Vegetables, vine crops, fruit trees, citrus, and protected cultivation",
        "target": "Structural reinforcement, stress tolerance, stomatal support, and fruit quality",
        "supplier": "Eurogro - Greece",
        "registrationStatus": "Egyptian MOA - registered and in market"
      },
      "overview": "Tesla is a liquid potassium silicate fertilizer for foliar and fertigation programs. It supplies potassium for osmotic regulation and sugar loading while depositing silicon into plant tissue, reinforcing surfaces and supporting resistance to heat, salinity, water deficit, lodging, and mechanical stress.",
      "benefits": [
        {
          "title": "Silicon structural reinforcement",
          "description": "Deposited silicon strengthens epidermal and vascular tissues, reducing non-stomatal water loss and improving physical resilience."
        },
        {
          "title": "Abiotic stress buffer",
          "description": "Supports heat, salinity, drought, and water-deficit tolerance by combining silicon reinforcement with foliar potassium supply."
        },
        {
          "title": "Passive disease-resistance support",
          "description": "Silicon-reinforced tissues form a physical barrier that can make pathogen penetration more difficult."
        },
        {
          "title": "Rapid potassium at critical stages",
          "description": "K₂O supports stomatal function, fruit cell expansion, sugar loading, Brix, and color expression."
        },
        {
          "title": "Harvest-quality contribution",
          "description": "Supports firmness, shelf-life, and resistance to compression and handling damage during quality stages."
        }
      ],
      "modeOfAction": {
        "title": "Silicon armor with potassium strength",
        "description": "After absorption, silicon is deposited in epidermal and vascular tissues where it forms a reinforcing layer. Potassium remains mobile, supporting stomatal regulation, osmotic balance, and sugar transport during stress and fruit development.",
        "image": "/images/products/tesla-mode.svg",
        "imageAlt": "Tesla silicon and potassium mode of action visual",
        "points": [
          "Silicon deposition is cumulative; repeated applications progressively reinforce tissues.",
          "Potassium helps maintain turgor, enzyme activity, and sugar loading under stress.",
          "Tesla is strongly alkaline; acidify tank water and avoid calcium/phosphate mixes unless jar tested."
        ]
      },
      "usageGuidance": [
        {
          "crop": "Vegetables",
          "target": "Tomato, pepper, cucumber, eggplant, potato, and leafy crops: stress tolerance and tissue strength.",
          "dose": "1-2 cm³ / L water",
          "timing": "From establishment through fruit set and early sizing; apply before heat, salinity, or disease-risk events.",
          "interval": "Every 10-14 days; tighten to 7-10 days during high stress or rapid sizing.",
          "recommendation": "Use full canopy coverage, especially young expanding leaves and shoot tips."
        },
        {
          "crop": "Grape and vine crops",
          "target": "Structural reinforcement, berry firmness, stress tolerance, and quality.",
          "dose": "1-2 cm³ / L water",
          "timing": "Use before stress windows and through fruit development.",
          "interval": "Every 10-14 days according to program.",
          "recommendation": "Do not evaluate Tesla only as a potassium source; the silicon fraction is the unique contribution."
        },
        {
          "crop": "Fruit trees, citrus, strawberry, and protected cultivation",
          "target": "Firmness, color, postharvest quality, and stress buffering.",
          "dose": "1-2 cm³ / L water",
          "timing": "Apply before heat/salinity periods, at fruit set, sizing, and pre-harvest quality windows.",
          "interval": "Every 10-14 days; integrate early in greenhouse programs.",
          "recommendation": "High pH product: manage tank pH and perform jar tests before mixing."
        }
      ],
      "documents": [
        {
          "title": "Brochure",
          "description": "Product overview, key applications, and commercial messages formatted for distributors and growers.",
          "status": ""
        },
        {
          "title": "Technical sheet",
          "description": "Composition, formulation properties, approved rates, compatibility notes, and technical positioning in a concise reference format.",
          "status": ""
        }
      ]
    },
    {
      "slug": "fossil",
      "categorySlug": "specialty-fertilizers",
      "legacySlugs": [
        "fossil-400-sl"
      ],
      "name": "Fossil 400 SL",
      "category": "Plant Nutrition",
      "subcategory": "Seaweed & Biostimulants",
      "crops": [
        "Vegetables",
        "Grapes",
        "Citrus",
        "Fruit trees",
        "Crops requiring stress support"
      ],
      "positioning": "A liquid biostimulant based on 17% Ascophyllum nodosum seaweed extract and supported with 0.4% cytokinin (kinetin), designed to support root activity, improve uptake efficiency, help crops move through stress, and support flowering, fruit set, and fruit quality.",
      "registrationStatus": "Registered and available",
      "galleryImage": "/images/products/fossil-gallery.png",
      "galleryImageAlt": "Fossil 400 SL catalogue product image",
      "detailImage": "/images/products/fossil-detail.png",
      "detailImageAlt": "Fossil 400 SL pack with a seaweed-based biostimulant concept.",
      "facts": {
        "category": "Seaweed & Biostimulants",
        "composition": "Ascophyllum nodosum extract 17%; Cytokinin (kinetin) 0.4%",
        "compositionRows": [
          {
            "ingredient": "Ascophyllum nodosum extract",
            "concentration": "17%"
          },
          {
            "ingredient": "Cytokinin (kinetin)",
            "concentration": "0.4%"
          }
        ],
        "formulation": "SL - soluble liquid",
        "targetCrop": "Vegetables, grapes, citrus, fruit trees, and stress-exposed crops",
        "target": "Root activation, uptake efficiency, stress tolerance support, fruit set, and fruit quality",
        "supplier": "Eurogro - Greece",
        "registrationStatus": "Registered and available"
      },
      "overview": "Fossil 400 SL is a liquid biostimulant based on concentrated Ascophyllum nodosum seaweed extract and supported with cytokinin in the form of kinetin. Fossil is not positioned as a direct NPK fertilizer or as a fungicide; its role is to support plant physiology, activate roots, improve nutrient-use efficiency, help plants recover from stress, and support flowering, fruit set, and fruit development. It integrates well with Signal NPK in stage-based nutrition programs: Fossil improves physiological readiness and uptake efficiency, while Signal supplies the core nutrients required by each growth stage.",
      "benefits": [
        {
          "title": "Root system activation",
          "description": "Helps encourage lateral root growth and improves the plant's ability to absorb water and nutrients, especially during transplanting and establishment."
        },
        {
          "title": "Improved nutrient uptake efficiency",
          "description": "Supports the crop's response to nutrition programs, especially when used alongside soluble fertilizers such as Signal NPK in a balanced program."
        },
        {
          "title": "Stress tolerance and recovery",
          "description": "Helps plants move through heat, cold, salinity, drought, and transplant shock by supporting internal physiological balance."
        },
        {
          "title": "Flowering and fruit set support",
          "description": "Improves crop readiness before flowering and supports fruit set retention, helping reduce flower and young fruit drop."
        },
        {
          "title": "Fruit quality development",
          "description": "Supports fruit growth, size uniformity, firmness, color development, and sugar accumulation when applied at the right timing."
        }
      ],
      "modeOfAction": {
        "title": "How Fossil Works",
        "description": "Seaweed activity with cytokinin precision. Fossil combines the broad biological activity of seaweed extract with the targeted hormonal role of cytokinin. Ascophyllum nodosum provides natural compounds such as mannitol, betaines, laminarin, alginates, and auxin-like fractions, while cytokinin supports cell division, canopy activity, fruit set, and early fruit development.",
        "image": "/images/products/fossil-mode.svg",
        "imageAlt": "Fossil 400 SL biostimulant activity pathways",
        "points": [
          "Stronger root establishment: supports an active root system early in the season, improving uptake efficiency and crop tolerance under difficult conditions.",
          "Physiological balance under stress: helps the plant maintain biological activity during heat, salinity, cold, or drought.",
          "Natural plant readiness support: seaweed compounds such as laminarin help alert the plant's natural defense readiness without positioning the product as a fungicide.",
          "Fruit set and development support: cytokinin supports cell division in growing tissues, helping during fruit set and early fruit growth."
        ]
      },
      "usageGuidance": [
        {
          "crop": "Vegetable crops",
          "target": "Tomato, pepper, cucumber, potato",
          "dose": "50 - 75 cm3 / 100 L water",
          "foliarDose": "50 - 75 cm3 / 100 L water",
          "timing": "3 - 4 days after transplanting or at full emergence",
          "interval": "",
          "recommendation": "Activate and stimulate a strong, healthy root system to overcome transplant shock."
        },
        {
          "crop": "Vegetable crops",
          "target": "Tomato, pepper, cucumber, potato",
          "dose": "50 - 75 cm3 / 100 L water",
          "foliarDose": "50 - 75 cm3 / 100 L water",
          "timing": "During active vegetative growth",
          "interval": "Repeat every 2 - 3 weeks.",
          "recommendation": "Increase vegetative growth and leaf area to improve photosynthetic efficiency."
        },
        {
          "crop": "Vegetable crops",
          "target": "Tomato, pepper, cucumber, potato",
          "dose": "50 - 75 cm3 / 100 L water",
          "foliarDose": "50 - 75 cm3 / 100 L water",
          "timing": "Before flowering and at the beginning of fruit set",
          "interval": "",
          "recommendation": "Improve flower quality, increase fruit set, and reduce flower and young fruit drop."
        },
        {
          "crop": "Vegetable crops",
          "target": "Tomato, pepper, cucumber, potato",
          "dose": "50 - 75 cm3 / 100 L water",
          "foliarDose": "50 - 75 cm3 / 100 L water",
          "timing": "During fruit growth and development",
          "interval": "Repeat every 2 - 3 weeks.",
          "recommendation": "Increase fruit size and quality, improving color, firmness, and sugar content."
        },
        {
          "crop": "Grape vines",
          "target": "Grapes",
          "dose": "50 - 75 cm3 / 100 L water",
          "foliarDose": "50 - 75 cm3 / 100 L water",
          "timing": "At the start of new spring vegetative growth",
          "interval": "",
          "recommendation": "Activate growth and build a strong, healthy canopy."
        },
        {
          "crop": "Grape vines",
          "target": "Grapes",
          "dose": "50 - 75 cm3 / 100 L water",
          "foliarDose": "50 - 75 cm3 / 100 L water",
          "timing": "1 - 2 weeks before flower opening",
          "interval": "",
          "recommendation": "Increase flower number and quality to support effective fruit set."
        },
        {
          "crop": "Grape vines",
          "target": "Grapes",
          "dose": "50 - 75 cm3 / 100 L water",
          "foliarDose": "50 - 75 cm3 / 100 L water",
          "timing": "After fruit set stabilizes and berries reach 3 - 5 mm",
          "interval": "",
          "recommendation": "Reduce young berry drop and improve cluster size and uniformity."
        },
        {
          "crop": "Grape vines",
          "target": "Grapes",
          "dose": "50 - 75 cm3 / 100 L water",
          "foliarDose": "50 - 75 cm3 / 100 L water",
          "timing": "One application after harvest",
          "interval": "",
          "recommendation": "Help vines recover from crop load stress and store reserves for the following season."
        },
        {
          "crop": "Fruit trees",
          "target": "Citrus, mango, olive, pome fruits",
          "dose": "30 - 50 cm3 / 100 L water",
          "foliarDose": "30 - 50 cm3 / 100 L water",
          "timing": "At bud swelling and the start of spring growth flushes",
          "interval": "",
          "recommendation": "Provide a strong growth push and prepare the tree for a healthy productive season."
        },
        {
          "crop": "Fruit trees",
          "target": "Citrus, mango, olive, pome fruits",
          "dose": "30 - 50 cm3 / 100 L water",
          "foliarDose": "30 - 50 cm3 / 100 L water",
          "timing": "1 - 2 weeks before flower opening",
          "interval": "",
          "recommendation": "Improve flower quality and support pollination and fertilization efficiency."
        },
        {
          "crop": "Fruit trees",
          "target": "Citrus, mango, olive, pome fruits",
          "dose": "30 - 50 cm3 / 100 L water",
          "foliarDose": "30 - 50 cm3 / 100 L water",
          "timing": "After fruit set stabilizes and petal fall",
          "interval": "",
          "recommendation": "Increase fruit set percentage and reduce natural young fruit drop."
        },
        {
          "crop": "Fruit trees",
          "target": "Citrus, mango, olive, pome fruits",
          "dose": "30 - 50 cm3 / 100 L water",
          "foliarDose": "30 - 50 cm3 / 100 L water",
          "timing": "One application after harvest",
          "interval": "",
          "recommendation": "Help trees restore activity and store carbohydrates for the new season."
        }
      ],
      "documents": [
        {
          "title": "Brochure",
          "description": "Product overview, key applications, and commercial messages formatted for distributors and growers.",
          "status": ""
        },
        {
          "title": "Technical sheet",
          "description": "Composition, formulation properties, application rates, compatibility notes, and key technical positioning in a concise reference format.",
          "status": ""
        }
      ]
    },
    {
        "slug": "foliq-aminovigor",
        "categorySlug": "specialty-fertilizers",
        "legacySlugs": [
          "foliq-amino-vigor",
          "aminovigor"
        ],
        "name": "FoliQ AminoVigor",
        "category": "Plant Nutrition",
        "subcategory": "Amino Acid Formulations",
        "crops": [
          "Corn",
          "Cereals",
          "Rapeseed",
          "Sugar beet",
          "Fruit crops",
          "Vegetables"
        ],
        "positioning": "Amino-acid biostimulant/fertilizer with plant-origin amino acids and micronutrients, designed to increase stress tolerance and support plant recovery.",
        "registrationStatus": "Under registration",
        "galleryImage": "/images/products/foliq-aminovigor-gallery.png",
        "galleryImageAlt": "FoliQ AminoVigor catalogue image",
        "detailImage": "/images/products/foliq-aminovigor-detail.png",
        "detailImageAlt": "FoliQ AminoVigor product page image",
        "facts": {
          "category": "Biostimulants / Foliar Fertilizers",
          "composition": "Free plant-origin amino acids 123 g/L, nitrogen 28 g/L, iron 22.6 g/L, boron 2.26 g/L, copper 5.65 g/L, manganese 5.65 g/L, molybdenum 0.23 g/L, zinc 5.99 g/L.",
          "formulation": "Liquid fertilizer for foliar spray and irrigation application.",
          "targetCrop": "All crops, especially stressed crops or crops needing post-winter stimulation.",
          "target": "Abiotic stress tolerance, recovery stimulation, flowering, pollination, and fruit formation support.",
          "supplier": "Agrii Poland.",
          "registrationStatus": "Under registration within the AgroPest portfolio."
        },
        "overview": "AminoVigor is positioned as a recovery and stimulation product after stress. Plant-origin amino acids and micronutrients provide a fast response that helps the plant restore normal growth and improve photosynthetic efficiency.",
        "benefits": [
          {
            "title": "Plant-origin amino acids with high biological activity",
            "description": "Plant-origin amino acids with high biological activity."
          },
          {
            "title": "Supports recovery after frost, drought, cold, heat, or",
            "description": "Supports recovery after frost, drought, cold, heat, or pesticide injury."
          },
          {
            "title": "Rich in micronutrients important for growth and",
            "description": "Rich in micronutrients important for growth and photosynthesis."
          },
          {
            "title": "Improves spray-liquid properties and adhesion to plant",
            "description": "Improves spray-liquid properties and adhesion to plant surfaces."
          },
          {
            "title": "Useful for both preventive and intervention programs",
            "description": "Useful for both preventive and intervention programs."
          },
          {
            "title": "Can be used by foliar spray or irrigation according to",
            "description": "Can be used by foliar spray or irrigation according to the program."
          }
        ],
        "modeOfAction": {
          "title": "Why FoliQ AminoVigor?",
          "description": "AminoVigor is positioned as a recovery and stimulation product after stress. Plant-origin amino acids and micronutrients provide a fast response that helps the plant restore normal growth and improve photosynthetic efficiency.",
          "image": "/images/products/foliq-aminovigor-mode.svg",
          "imageAlt": "FoliQ AminoVigor product positioning visual",
          "points": [
            "Plant-origin amino acids with high biological activity.",
            "Supports recovery after frost, drought, cold, heat, or pesticide injury.",
            "Rich in micronutrients important for growth and photosynthesis."
          ]
        },
        "usageGuidance": [
          {
            "crop": "Corn",
            "target": "Stimulate the plant and support recovery from stress.",
            "dose": "Generally 2-3 L/ha; nursery solution 1% before planting; 0.1-0.2% for some special uses according to the catalogue.",
            "timing": "After stress has passed, at spring activity, before flowering, or when growth stimulation is needed.",
            "interval": "Foliar spray; may be applied to soil/irrigation according to recommendation.",
            "recommendation": "Use within a balanced nutrition program and do not rely on it alone to correct a specific element deficiency."
          },
          {
            "crop": "Cereals",
            "target": "Stimulate the plant and support recovery from stress.",
            "dose": "Generally 2-3 L/ha; nursery solution 1% before planting; 0.1-0.2% for some special uses according to the catalogue.",
            "timing": "After stress has passed, at spring activity, before flowering, or when growth stimulation is needed.",
            "interval": "Foliar spray; may be applied to soil/irrigation according to recommendation.",
            "recommendation": "Use within a balanced nutrition program and do not rely on it alone to correct a specific element deficiency."
          },
          {
            "crop": "Rapeseed",
            "target": "Stimulate the plant and support recovery from stress.",
            "dose": "Generally 2-3 L/ha; nursery solution 1% before planting; 0.1-0.2% for some special uses according to the catalogue.",
            "timing": "After stress has passed, at spring activity, before flowering, or when growth stimulation is needed.",
            "interval": "Foliar spray; may be applied to soil/irrigation according to recommendation.",
            "recommendation": "Use within a balanced nutrition program and do not rely on it alone to correct a specific element deficiency."
          },
          {
            "crop": "Sugar beet",
            "target": "Stimulate the plant and support recovery from stress.",
            "dose": "Generally 2-3 L/ha; nursery solution 1% before planting; 0.1-0.2% for some special uses according to the catalogue.",
            "timing": "After stress has passed, at spring activity, before flowering, or when growth stimulation is needed.",
            "interval": "Foliar spray; may be applied to soil/irrigation according to recommendation.",
            "recommendation": "Use within a balanced nutrition program and do not rely on it alone to correct a specific element deficiency."
          },
          {
            "crop": "Fruit trees",
            "target": "Stimulate the plant and support recovery from stress.",
            "dose": "Generally 2-3 L/ha; nursery solution 1% before planting; 0.1-0.2% for some special uses according to the catalogue.",
            "timing": "After stress has passed, at spring activity, before flowering, or when growth stimulation is needed.",
            "interval": "Foliar spray; may be applied to soil/irrigation according to recommendation.",
            "recommendation": "Use within a balanced nutrition program and do not rely on it alone to correct a specific element deficiency."
          },
          {
            "crop": "Strawberries",
            "target": "Stimulate the plant and support recovery from stress.",
            "dose": "Generally 2-3 L/ha; nursery solution 1% before planting; 0.1-0.2% for some special uses according to the catalogue.",
            "timing": "After stress has passed, at spring activity, before flowering, or when growth stimulation is needed.",
            "interval": "Foliar spray; may be applied to soil/irrigation according to recommendation.",
            "recommendation": "Use within a balanced nutrition program and do not rely on it alone to correct a specific element deficiency."
          },
          {
            "crop": "Vegetables",
            "target": "Stimulate the plant and support recovery from stress.",
            "dose": "Generally 2-3 L/ha; nursery solution 1% before planting; 0.1-0.2% for some special uses according to the catalogue.",
            "timing": "After stress has passed, at spring activity, before flowering, or when growth stimulation is needed.",
            "interval": "Foliar spray; may be applied to soil/irrigation according to recommendation.",
            "recommendation": "Use within a balanced nutrition program and do not rely on it alone to correct a specific element deficiency."
          },
          {
            "crop": "Nursery crops",
            "target": "Stimulate the plant and support recovery from stress.",
            "dose": "Generally 2-3 L/ha; nursery solution 1% before planting; 0.1-0.2% for some special uses according to the catalogue.",
            "timing": "After stress has passed, at spring activity, before flowering, or when growth stimulation is needed.",
            "interval": "Foliar spray; may be applied to soil/irrigation according to recommendation.",
            "recommendation": "Use within a balanced nutrition program and do not rely on it alone to correct a specific element deficiency."
          }
        ],
        "documents": [
          {
            "title": "Brochure",
            "description": "Product profile covering the concept, main uses, and key technical and commercial messages for distributors and customers.",
            "status": "Yes / FoliQ catalogue"
          },
          {
            "title": "Label",
            "description": "Local label reference and approved use details.",
            "status": "No / after registration"
          },
          {
            "title": "Technical sheet",
            "description": "Concise technical reference covering composition, formulation, use rates, and the key product presentation points.",
            "status": "Yes"
          },
          {
            "title": "Certificates",
            "description": "Certificates and official files shared for partner discussions.",
            "status": "On request"
          }
        ]
      },
    {
        "slug": "foliq-ascovigor",
        "categorySlug": "specialty-fertilizers",
        "legacySlugs": [
          "foliq-asco-vigor",
          "ascovigor"
        ],
        "name": "FoliQ AscoVigor",
        "category": "Plant Nutrition",
        "subcategory": "Seaweed & Biostimulants",
        "crops": [
          "Cereals",
          "Rapeseed",
          "Sugar beet",
          "Corn",
          "Fruit crops",
          "Vegetables"
        ],
        "positioning": "A concentrated special fertilizer containing Ascophyllum nodosum seaweed extract rich in natural biostimulants, with boron, manganese, and zinc to support growth, flowering, and setting.",
        "registrationStatus": "Under registration",
        "galleryImage": "/images/products/foliq-ascovigor-gallery.png",
        "galleryImageAlt": "FoliQ AscoVigor catalogue image",
        "detailImage": "/images/products/foliq-ascovigor-detail.png",
        "detailImageAlt": "FoliQ AscoVigor product page image",
        "facts": {
          "category": "Biostimulants / Growth Stimulation Fertilizers",
          "composition": "Ascophyllum nodosum extract 144.9 g/L, boron 37.1 g/L, manganese 10 g/L, zinc 6.1 g/L, nitrogen 30 g/L.",
          "formulation": "Concentrated liquid fertilizer for foliar spray; irrigation use according to recommendation.",
          "targetCrop": "Cereals, rapeseed, sugar beet, corn, fruit trees, strawberries, grapes, tomato, pepper, cucumber, and cucurbits.",
          "target": "Growth stimulation, hormonal balance, flowering, pollination, root growth, and stress resistance.",
          "supplier": "Agrii Poland.",
          "registrationStatus": "Under registration within the AgroPest portfolio."
        },
        "overview": "AscoVigor fits stages where the plant needs a strong physiological boost. It combines natural seaweed hormones with micronutrients linked to flowering, pollination, and fruit quality.",
        "benefits": [
          {
            "title": "High concentration of marine algae extract",
            "description": "High concentration of marine algae extract."
          },
          {
            "title": "Supports flowering, pollination, and seed/fruit formation",
            "description": "Supports flowering, pollination, and seed/fruit formation."
          },
          {
            "title": "Improves root growth and reserve accumulation",
            "description": "Improves root growth and reserve accumulation."
          },
          {
            "title": "Improves tolerance to water and temperature stress",
            "description": "Improves tolerance to water and temperature stress."
          },
          {
            "title": "Supported with boron, manganese, and zinc",
            "description": "Supported with boron, manganese, and zinc."
          },
          {
            "title": "Suitable for multiple field and horticultural crops",
            "description": "Suitable for multiple field and horticultural crops."
          }
        ],
        "modeOfAction": {
          "title": "Why FoliQ AscoVigor?",
          "description": "AscoVigor fits stages where the plant needs a strong physiological boost. It combines natural seaweed hormones with micronutrients linked to flowering, pollination, and fruit quality.",
          "image": "/images/products/foliq-ascovigor-mode.svg",
          "imageAlt": "FoliQ AscoVigor product positioning visual",
          "points": [
            "High concentration of marine algae extract.",
            "Supports flowering, pollination, and seed/fruit formation.",
            "Improves root growth and reserve accumulation."
          ]
        },
        "usageGuidance": [
          {
            "crop": "Cereals",
            "target": "Stimulate growth and flowering; improve setting and stress resistance.",
            "dose": "2-3 L/ha for most crops; 3 L/ha for strawberry and grapes; vegetables such as tomato, pepper, and cucumber: 2.5 L/ha or 0.25% according to the catalogue.",
            "timing": "Early growth, before and during flowering, during setting and fruit growth, and after stress periods.",
            "interval": "Foliar spray; soil/irrigation use if the program allows.",
            "recommendation": "Use within a balanced nutrition program and test compatibility before mixing."
          },
          {
            "crop": "Rapeseed",
            "target": "Stimulate growth and flowering; improve setting and stress resistance.",
            "dose": "2-3 L/ha for most crops; 3 L/ha for strawberry and grapes; vegetables such as tomato, pepper, and cucumber: 2.5 L/ha or 0.25% according to the catalogue.",
            "timing": "Early growth, before and during flowering, during setting and fruit growth, and after stress periods.",
            "interval": "Foliar spray; soil/irrigation use if the program allows.",
            "recommendation": "Use within a balanced nutrition program and test compatibility before mixing."
          },
          {
            "crop": "Sugar beet",
            "target": "Stimulate growth and flowering; improve setting and stress resistance.",
            "dose": "2-3 L/ha for most crops; 3 L/ha for strawberry and grapes; vegetables such as tomato, pepper, and cucumber: 2.5 L/ha or 0.25% according to the catalogue.",
            "timing": "Early growth, before and during flowering, during setting and fruit growth, and after stress periods.",
            "interval": "Foliar spray; soil/irrigation use if the program allows.",
            "recommendation": "Use within a balanced nutrition program and test compatibility before mixing."
          },
          {
            "crop": "Corn",
            "target": "Stimulate growth and flowering; improve setting and stress resistance.",
            "dose": "2-3 L/ha for most crops; 3 L/ha for strawberry and grapes; vegetables such as tomato, pepper, and cucumber: 2.5 L/ha or 0.25% according to the catalogue.",
            "timing": "Early growth, before and during flowering, during setting and fruit growth, and after stress periods.",
            "interval": "Foliar spray; soil/irrigation use if the program allows.",
            "recommendation": "Use within a balanced nutrition program and test compatibility before mixing."
          },
          {
            "crop": "Fruit trees",
            "target": "Stimulate growth and flowering; improve setting and stress resistance.",
            "dose": "2-3 L/ha for most crops; 3 L/ha for strawberry and grapes; vegetables such as tomato, pepper, and cucumber: 2.5 L/ha or 0.25% according to the catalogue.",
            "timing": "Early growth, before and during flowering, during setting and fruit growth, and after stress periods.",
            "interval": "Foliar spray; soil/irrigation use if the program allows.",
            "recommendation": "Use within a balanced nutrition program and test compatibility before mixing."
          },
          {
            "crop": "Strawberries",
            "target": "Stimulate growth and flowering; improve setting and stress resistance.",
            "dose": "2-3 L/ha for most crops; 3 L/ha for strawberry and grapes; vegetables such as tomato, pepper, and cucumber: 2.5 L/ha or 0.25% according to the catalogue.",
            "timing": "Early growth, before and during flowering, during setting and fruit growth, and after stress periods.",
            "interval": "Foliar spray; soil/irrigation use if the program allows.",
            "recommendation": "Use within a balanced nutrition program and test compatibility before mixing."
          },
          {
            "crop": "Grapes",
            "target": "Stimulate growth and flowering; improve setting and stress resistance.",
            "dose": "2-3 L/ha for most crops; 3 L/ha for strawberry and grapes; vegetables such as tomato, pepper, and cucumber: 2.5 L/ha or 0.25% according to the catalogue.",
            "timing": "Early growth, before and during flowering, during setting and fruit growth, and after stress periods.",
            "interval": "Foliar spray; soil/irrigation use if the program allows.",
            "recommendation": "Use within a balanced nutrition program and test compatibility before mixing."
          },
          {
            "crop": "Vegetables",
            "target": "Stimulate growth and flowering; improve setting and stress resistance.",
            "dose": "2-3 L/ha for most crops; 3 L/ha for strawberry and grapes; vegetables such as tomato, pepper, and cucumber: 2.5 L/ha or 0.25% according to the catalogue.",
            "timing": "Early growth, before and during flowering, during setting and fruit growth, and after stress periods.",
            "interval": "Foliar spray; soil/irrigation use if the program allows.",
            "recommendation": "Use within a balanced nutrition program and test compatibility before mixing."
          }
        ],
        "documents": [
          {
            "title": "Brochure",
            "description": "Product profile covering the concept, main uses, and key technical and commercial messages for distributors and customers.",
            "status": "Yes / FoliQ catalogue"
          },
          {
            "title": "Label",
            "description": "Local label reference and approved use details.",
            "status": "No / after registration"
          },
          {
            "title": "Technical sheet",
            "description": "Concise technical reference covering composition, formulation, use rates, and the key product presentation points.",
            "status": "Yes"
          },
          {
            "title": "Certificates",
            "description": "Certificates and official files shared for partner discussions.",
            "status": "On request"
          }
        ]
      },
    {
        "slug": "foliq-amical",
        "categorySlug": "specialty-fertilizers",
        "legacySlugs": [
          "foliq-amical-free",
          "amical"
        ],
        "name": "FoliQ Amical",
        "category": "Plant Nutrition",
        "subcategory": "Calcium, Boron & Micronutrients",
        "crops": [
          "Tomato",
          "Pepper",
          "Cucumber",
          "Pome fruit",
          "Strawberry"
        ],
        "positioning": "A highly concentrated nitrogen-free calcium fertilizer supported with manganese and zinc, designed to improve fruit firmness, storage quality, and reduce calcium-deficiency disorders.",
        "registrationStatus": "Under registration",
        "galleryImage": "/images/products/foliq-amical-gallery.png",
        "galleryImageAlt": "FoliQ Amical catalogue image",
        "detailImage": "/images/products/foliq-amical-detail.png",
        "detailImageAlt": "FoliQ Amical product page image",
        "facts": {
          "category": "Fertilizers > Calcium / Quality Fertilizers",
          "composition": "Calcium (CaO) 150 g/L, manganese 6.75 g/L, zinc 6.75 g/L, nitrogen-free.",
          "formulation": "Liquid fertilizer for foliar spray.",
          "targetCrop": "Tomato, pepper, cucumber, cabbage, lettuce, apple and pear, stone fruit, berries, and strawberries.",
          "target": "Calcium deficiency, blossom-end rot, bitter pit, fruit cracking, low firmness, and weak storability.",
          "supplier": "Agrii Poland.",
          "registrationStatus": "Under registration within the AgroPest portfolio."
        },
        "overview": "Amical is positioned as a fruit and vegetable quality product because it supplies calcium without extra nitrogen push, making it appropriate before harvest and during quality, firmness, and storage programs.",
        "benefits": [
          {
            "title": "High calcium concentration without added nitrogen",
            "description": "High calcium concentration without added nitrogen."
          },
          {
            "title": "Supports fruit firmness and storage quality",
            "description": "Supports fruit firmness and storage quality."
          },
          {
            "title": "Helps reduce cracking and calcium-related physiological",
            "description": "Helps reduce cracking and calcium-related physiological disorders."
          },
          {
            "title": "Manganese and zinc support metabolism",
            "description": "Manganese and zinc support metabolism."
          },
          {
            "title": "Suitable pH supports calcium absorption efficiency",
            "description": "Suitable pH supports calcium absorption efficiency."
          },
          {
            "title": "A good fit for high-value fruit and vegetable crops",
            "description": "A good fit for high-value fruit and vegetable crops."
          }
        ],
        "modeOfAction": {
          "title": "Why FoliQ Amical?",
          "description": "Amical is positioned as a fruit and vegetable quality product because it supplies calcium without extra nitrogen push, making it appropriate before harvest and during quality, firmness, and storage programs.",
          "image": "/images/products/foliq-amical-mode.svg",
          "imageAlt": "FoliQ Amical product positioning visual",
          "points": [
            "High calcium concentration without added nitrogen.",
            "Supports fruit firmness and storage quality.",
            "Helps reduce cracking and calcium-related physiological disorders."
          ]
        },
        "usageGuidance": [
          {
            "crop": "Fruit vegetables",
            "target": "Improve calcium content and fruit quality.",
            "dose": "Vegetables: 4-5 L/ha; under covers: 0.3-0.5%. Fruit trees and berries: 3-5 L/ha according to the catalogue.",
            "timing": "From fruit set and fruit growth; repeat every 7-14 days depending on crop and calcium-deficiency risk.",
            "interval": "Foliar spray with good coverage of fruit and canopy.",
            "recommendation": "Avoid mixing with phosphates and sulfates without testing. Spray in moderate conditions."
          },
          {
            "crop": "Brassicas",
            "target": "Improve calcium content and fruit quality.",
            "dose": "Vegetables: 4-5 L/ha; under covers: 0.3-0.5%. Fruit trees and berries: 3-5 L/ha according to the catalogue.",
            "timing": "From fruit set and fruit growth; repeat every 7-14 days depending on crop and calcium-deficiency risk.",
            "interval": "Foliar spray with good coverage of fruit and canopy.",
            "recommendation": "Avoid mixing with phosphates and sulfates without testing. Spray in moderate conditions."
          },
          {
            "crop": "Lettuce",
            "target": "Improve calcium content and fruit quality.",
            "dose": "Vegetables: 4-5 L/ha; under covers: 0.3-0.5%. Fruit trees and berries: 3-5 L/ha according to the catalogue.",
            "timing": "From fruit set and fruit growth; repeat every 7-14 days depending on crop and calcium-deficiency risk.",
            "interval": "Foliar spray with good coverage of fruit and canopy.",
            "recommendation": "Avoid mixing with phosphates and sulfates without testing. Spray in moderate conditions."
          },
          {
            "crop": "Fruit trees",
            "target": "Improve calcium content and fruit quality.",
            "dose": "Vegetables: 4-5 L/ha; under covers: 0.3-0.5%. Fruit trees and berries: 3-5 L/ha according to the catalogue.",
            "timing": "From fruit set and fruit growth; repeat every 7-14 days depending on crop and calcium-deficiency risk.",
            "interval": "Foliar spray with good coverage of fruit and canopy.",
            "recommendation": "Avoid mixing with phosphates and sulfates without testing. Spray in moderate conditions."
          },
          {
            "crop": "Stone fruit",
            "target": "Improve calcium content and fruit quality.",
            "dose": "Vegetables: 4-5 L/ha; under covers: 0.3-0.5%. Fruit trees and berries: 3-5 L/ha according to the catalogue.",
            "timing": "From fruit set and fruit growth; repeat every 7-14 days depending on crop and calcium-deficiency risk.",
            "interval": "Foliar spray with good coverage of fruit and canopy.",
            "recommendation": "Avoid mixing with phosphates and sulfates without testing. Spray in moderate conditions."
          },
          {
            "crop": "Berries",
            "target": "Improve calcium content and fruit quality.",
            "dose": "Vegetables: 4-5 L/ha; under covers: 0.3-0.5%. Fruit trees and berries: 3-5 L/ha according to the catalogue.",
            "timing": "From fruit set and fruit growth; repeat every 7-14 days depending on crop and calcium-deficiency risk.",
            "interval": "Foliar spray with good coverage of fruit and canopy.",
            "recommendation": "Avoid mixing with phosphates and sulfates without testing. Spray in moderate conditions."
          }
        ],
        "documents": [
          {
            "title": "Brochure",
            "description": "Product profile covering the concept, main uses, and key technical and commercial messages for distributors and customers.",
            "status": "Yes / FoliQ catalogue"
          },
          {
            "title": "Label",
            "description": "Local label reference and approved use details.",
            "status": "No / after registration"
          },
          {
            "title": "Technical sheet",
            "description": "Concise technical reference covering composition, formulation, use rates, and the key product presentation points.",
            "status": "Yes"
          },
          {
            "title": "Certificates",
            "description": "Certificates and official files shared for partner discussions.",
            "status": "On request"
          }
        ]
      },
    {
        "slug": "foliq-k-potassium",
        "categorySlug": "specialty-fertilizers",
        "legacySlugs": [
          "foliq-potassium",
          "foliq-k"
        ],
        "name": "FoliQ K Potassium",
        "category": "Plant Nutrition",
        "subcategory": "Potassium & Silicon",
        "crops": [
          "Potato",
          "Vegetables",
          "Fruit crops",
          "Strawberry",
          "Cereals"
        ],
        "positioning": "A liquid foliar NPK fertilizer for crops with high potassium demand, supporting visible and hidden deficiency correction, fruit quality, and drought tolerance.",
        "registrationStatus": "Under registration",
        "galleryImage": "/images/products/foliq-k-potassium-gallery.png",
        "galleryImageAlt": "FoliQ K Potassium catalogue image",
        "detailImage": "/images/products/foliq-k-potassium-detail.png",
        "detailImageAlt": "FoliQ K Potassium product page image",
        "facts": {
          "category": "Fertilizers > Potassium / Liquid Foliar NPK",
          "composition": "K2O 150 g/L, P2O5 100 g/L, N 62.5 g/L, with small amounts of boron, manganese, zinc, copper, and molybdenum.",
          "formulation": "Liquid fertilizer for foliar spray and, in some cases, soil program use.",
          "targetCrop": "Cereals, rapeseed, sugar beet, corn, potato, vegetables, fruit trees, strawberries, and ornamentals.",
          "target": "Potassium deficiency, weak fruit filling, low firmness, and poor drought tolerance.",
          "supplier": "Agrii Poland.",
          "registrationStatus": "Under registration within the AgroPest portfolio."
        },
        "overview": "FoliQ K Potassium is positioned as a fast potassium option for stages with high demand for sugar transport, sizing, and firmness, while keeping the nutrition balanced with nitrogen, phosphorus, and micronutrients.",
        "benefits": [
          {
            "title": "High potassium concentration with phosphorus and nitrogen",
            "description": "High potassium concentration with phosphorus and nitrogen for balanced nutrition."
          },
          {
            "title": "Helps improve water management and drought tolerance",
            "description": "Helps improve water management and drought tolerance."
          },
          {
            "title": "Supports photosynthesis and movement of assimilates from",
            "description": "Supports photosynthesis and movement of assimilates from leaves to fruit and roots."
          },
          {
            "title": "Improves fruit firmness and market quality",
            "description": "Improves fruit firmness and market quality."
          },
          {
            "title": "Liquid formulation is easy to measure and dissolve",
            "description": "Liquid formulation is easy to measure and dissolve."
          },
          {
            "title": "Good fit for spray programs after compatibility testing",
            "description": "Good fit for spray programs after compatibility testing."
          }
        ],
        "modeOfAction": {
          "title": "Why FoliQ K Potassium?",
          "description": "FoliQ K Potassium is positioned as a fast potassium option for stages with high demand for sugar transport, sizing, and firmness, while keeping the nutrition balanced with nitrogen, phosphorus, and micronutrients.",
          "image": "/images/products/foliq-k-potassium-mode.svg",
          "imageAlt": "FoliQ K Potassium product positioning visual",
          "points": [
            "High potassium concentration with phosphorus and nitrogen for balanced nutrition.",
            "Helps improve water management and drought tolerance.",
            "Supports photosynthesis and movement of assimilates from leaves to fruit and roots."
          ]
        },
        "usageGuidance": [
          {
            "crop": "Potato",
            "target": "Correct potassium deficiency and improve sizing and quality.",
            "dose": "5 L/ha for most crops; rapeseed 4-5 L/ha; under covers 0.2-0.3% according to the catalogue.",
            "timing": "From active growth through sizing; in potato, start during intensive leaf and stem growth and repeat every 10-14 days.",
            "interval": "Foliar spray; soil use for some crops if the program allows.",
            "recommendation": "Not a replacement for base soil fertilization when deficiency is severe. Perform a compatibility test before mixing."
          },
          {
            "crop": "Vegetables",
            "target": "Correct potassium deficiency and improve sizing and quality.",
            "dose": "5 L/ha for most crops; rapeseed 4-5 L/ha; under covers 0.2-0.3% according to the catalogue.",
            "timing": "From active growth through sizing; in potato, start during intensive leaf and stem growth and repeat every 10-14 days.",
            "interval": "Foliar spray; soil use for some crops if the program allows.",
            "recommendation": "Not a replacement for base soil fertilization when deficiency is severe. Perform a compatibility test before mixing."
          },
          {
            "crop": "Fruit crops",
            "target": "Correct potassium deficiency and improve sizing and quality.",
            "dose": "5 L/ha for most crops; rapeseed 4-5 L/ha; under covers 0.2-0.3% according to the catalogue.",
            "timing": "From active growth through sizing; in potato, start during intensive leaf and stem growth and repeat every 10-14 days.",
            "interval": "Foliar spray; soil use for some crops if the program allows.",
            "recommendation": "Not a replacement for base soil fertilization when deficiency is severe. Perform a compatibility test before mixing."
          },
          {
            "crop": "Strawberries",
            "target": "Correct potassium deficiency and improve sizing and quality.",
            "dose": "5 L/ha for most crops; rapeseed 4-5 L/ha; under covers 0.2-0.3% according to the catalogue.",
            "timing": "From active growth through sizing; in potato, start during intensive leaf and stem growth and repeat every 10-14 days.",
            "interval": "Foliar spray; soil use for some crops if the program allows.",
            "recommendation": "Not a replacement for base soil fertilization when deficiency is severe. Perform a compatibility test before mixing."
          },
          {
            "crop": "Cereals",
            "target": "Correct potassium deficiency and improve sizing and quality.",
            "dose": "5 L/ha for most crops; rapeseed 4-5 L/ha; under covers 0.2-0.3% according to the catalogue.",
            "timing": "From active growth through sizing; in potato, start during intensive leaf and stem growth and repeat every 10-14 days.",
            "interval": "Foliar spray; soil use for some crops if the program allows.",
            "recommendation": "Not a replacement for base soil fertilization when deficiency is severe. Perform a compatibility test before mixing."
          },
          {
            "crop": "Corn",
            "target": "Correct potassium deficiency and improve sizing and quality.",
            "dose": "5 L/ha for most crops; rapeseed 4-5 L/ha; under covers 0.2-0.3% according to the catalogue.",
            "timing": "From active growth through sizing; in potato, start during intensive leaf and stem growth and repeat every 10-14 days.",
            "interval": "Foliar spray; soil use for some crops if the program allows.",
            "recommendation": "Not a replacement for base soil fertilization when deficiency is severe. Perform a compatibility test before mixing."
          },
          {
            "crop": "Sugar beet",
            "target": "Correct potassium deficiency and improve sizing and quality.",
            "dose": "5 L/ha for most crops; rapeseed 4-5 L/ha; under covers 0.2-0.3% according to the catalogue.",
            "timing": "From active growth through sizing; in potato, start during intensive leaf and stem growth and repeat every 10-14 days.",
            "interval": "Foliar spray; soil use for some crops if the program allows.",
            "recommendation": "Not a replacement for base soil fertilization when deficiency is severe. Perform a compatibility test before mixing."
          }
        ],
        "documents": [
          {
            "title": "Brochure",
            "description": "Product profile covering the concept, main uses, and key technical and commercial messages for distributors and customers.",
            "status": "Yes / FoliQ catalogue"
          },
          {
            "title": "Label",
            "description": "Local label reference and approved use details.",
            "status": "No / after registration"
          },
          {
            "title": "Technical sheet",
            "description": "Concise technical reference covering composition, formulation, use rates, and the key product presentation points.",
            "status": "Yes"
          },
          {
            "title": "Certificates",
            "description": "Certificates and official files shared for partner discussions.",
            "status": "On request"
          }
        ]
      },
    {
        "slug": "foliq-boron",
        "categorySlug": "specialty-fertilizers",
        "legacySlugs": [
          "foliq-boron-np",
          "boron"
        ],
        "name": "FoliQ Boron",
        "category": "Plant Nutrition",
        "subcategory": "Calcium, Boron & Micronutrients",
        "crops": [
          "Rapeseed",
          "Sugar beet",
          "Corn",
          "Potato",
          "Brassica vegetables",
          "Strawberry"
        ],
        "positioning": "A high-concentration liquid foliar boron fertilizer in ethanolamine form, designed for safe boron-deficiency prevention and better flowering, pollination, seed formation, and fruit set.",
        "registrationStatus": "Under registration",
        "galleryImage": "/images/products/foliq-boron-gallery.png",
        "galleryImageAlt": "FoliQ Boron catalogue image",
        "detailImage": "/images/products/foliq-boron-detail.png",
        "detailImageAlt": "FoliQ Boron product page image",
        "facts": {
          "category": "Fertilizers > Boron",
          "composition": "Boron 150 g/L; also contains total nitrogen 67 g/L according to the FoliQ catalogue.",
          "formulation": "Liquid foliar fertilizer, boron ethanolamine.",
          "targetCrop": "Rapeseed, sugar beet, corn, potato, brassica vegetables, carrot, celery, tobacco, pome fruit, stone fruit, and strawberry.",
          "target": "Boron deficiency, weak flowering and pollination, weak roots, fruit cracking, heart rot in beet, and poor seed formation.",
          "supplier": "Agrii Poland.",
          "registrationStatus": "Under registration within the AgroPest portfolio."
        },
        "overview": "FoliQ Boron is a specialist product when the program objective is direct boron supply at a clear concentration. It suits boron-demanding crops, especially before flowering and during stages that determine setting and final yield.",
        "benefits": [
          {
            "title": "High boron concentration in an easily absorbed form",
            "description": "High boron concentration in an easily absorbed form."
          },
          {
            "title": "Supports flowering, pollination, fertilization, and seed",
            "description": "Supports flowering, pollination, fertilization, and seed formation."
          },
          {
            "title": "Helps strengthen roots and cell walls",
            "description": "Helps strengthen roots and cell walls."
          },
          {
            "title": "Improves plant tolerance to cold and lodging when",
            "description": "Improves plant tolerance to cold and lodging when nutrition is well managed."
          },
          {
            "title": "Liquid formulation is easy to dose and dissolve",
            "description": "Liquid formulation is easy to dose and dissolve."
          },
          {
            "title": "Good crop safety when recommended rates are followed",
            "description": "Good crop safety when recommended rates are followed."
          }
        ],
        "modeOfAction": {
          "title": "Why FoliQ Boron?",
          "description": "FoliQ Boron is a specialist product when the program objective is direct boron supply at a clear concentration. It suits boron-demanding crops, especially before flowering and during stages that determine setting and final yield.",
          "image": "/images/products/foliq-boron-mode.svg",
          "imageAlt": "FoliQ Boron product positioning visual",
          "points": [
            "High boron concentration in an easily absorbed form.",
            "Supports flowering, pollination, fertilization, and seed formation.",
            "Helps strengthen roots and cell walls."
          ]
        },
        "usageGuidance": [
          {
            "crop": "Rapeseed",
            "target": "Prevent or correct boron deficiency and improve flowering and setting.",
            "dose": "Field crops generally 1 L/ha for hidden deficiency and 1.5 L/ha for visible deficiency, repeated 1-3 times by crop. Strawberry: 2 L/ha before flowering.",
            "timing": "During active growth, before flowering, or when boron-deficiency signs appear; pome and stone fruit at green bud, petal fall, and after harvest according to the catalogue.",
            "interval": "Foliar spray.",
            "recommendation": "Avoid high rates because the safety margin between boron deficiency and excess is narrow. Mix only after compatibility testing."
          },
          {
            "crop": "Sugar beet",
            "target": "Prevent or correct boron deficiency and improve flowering and setting.",
            "dose": "Field crops generally 1 L/ha for hidden deficiency and 1.5 L/ha for visible deficiency, repeated 1-3 times by crop. Strawberry: 2 L/ha before flowering.",
            "timing": "During active growth, before flowering, or when boron-deficiency signs appear; pome and stone fruit at green bud, petal fall, and after harvest according to the catalogue.",
            "interval": "Foliar spray.",
            "recommendation": "Avoid high rates because the safety margin between boron deficiency and excess is narrow. Mix only after compatibility testing."
          },
          {
            "crop": "Corn",
            "target": "Prevent or correct boron deficiency and improve flowering and setting.",
            "dose": "Field crops generally 1 L/ha for hidden deficiency and 1.5 L/ha for visible deficiency, repeated 1-3 times by crop. Strawberry: 2 L/ha before flowering.",
            "timing": "During active growth, before flowering, or when boron-deficiency signs appear; pome and stone fruit at green bud, petal fall, and after harvest according to the catalogue.",
            "interval": "Foliar spray.",
            "recommendation": "Avoid high rates because the safety margin between boron deficiency and excess is narrow. Mix only after compatibility testing."
          },
          {
            "crop": "Potato",
            "target": "Prevent or correct boron deficiency and improve flowering and setting.",
            "dose": "Field crops generally 1 L/ha for hidden deficiency and 1.5 L/ha for visible deficiency, repeated 1-3 times by crop. Strawberry: 2 L/ha before flowering.",
            "timing": "During active growth, before flowering, or when boron-deficiency signs appear; pome and stone fruit at green bud, petal fall, and after harvest according to the catalogue.",
            "interval": "Foliar spray.",
            "recommendation": "Avoid high rates because the safety margin between boron deficiency and excess is narrow. Mix only after compatibility testing."
          },
          {
            "crop": "Brassicas",
            "target": "Prevent or correct boron deficiency and improve flowering and setting.",
            "dose": "Field crops generally 1 L/ha for hidden deficiency and 1.5 L/ha for visible deficiency, repeated 1-3 times by crop. Strawberry: 2 L/ha before flowering.",
            "timing": "During active growth, before flowering, or when boron-deficiency signs appear; pome and stone fruit at green bud, petal fall, and after harvest according to the catalogue.",
            "interval": "Foliar spray.",
            "recommendation": "Avoid high rates because the safety margin between boron deficiency and excess is narrow. Mix only after compatibility testing."
          },
          {
            "crop": "Carrots",
            "target": "Prevent or correct boron deficiency and improve flowering and setting.",
            "dose": "Field crops generally 1 L/ha for hidden deficiency and 1.5 L/ha for visible deficiency, repeated 1-3 times by crop. Strawberry: 2 L/ha before flowering.",
            "timing": "During active growth, before flowering, or when boron-deficiency signs appear; pome and stone fruit at green bud, petal fall, and after harvest according to the catalogue.",
            "interval": "Foliar spray.",
            "recommendation": "Avoid high rates because the safety margin between boron deficiency and excess is narrow. Mix only after compatibility testing."
          },
          {
            "crop": "Pome fruit",
            "target": "Prevent or correct boron deficiency and improve flowering and setting.",
            "dose": "Field crops generally 1 L/ha for hidden deficiency and 1.5 L/ha for visible deficiency, repeated 1-3 times by crop. Strawberry: 2 L/ha before flowering.",
            "timing": "During active growth, before flowering, or when boron-deficiency signs appear; pome and stone fruit at green bud, petal fall, and after harvest according to the catalogue.",
            "interval": "Foliar spray.",
            "recommendation": "Avoid high rates because the safety margin between boron deficiency and excess is narrow. Mix only after compatibility testing."
          },
          {
            "crop": "Strawberries",
            "target": "Prevent or correct boron deficiency and improve flowering and setting.",
            "dose": "Field crops generally 1 L/ha for hidden deficiency and 1.5 L/ha for visible deficiency, repeated 1-3 times by crop. Strawberry: 2 L/ha before flowering.",
            "timing": "During active growth, before flowering, or when boron-deficiency signs appear; pome and stone fruit at green bud, petal fall, and after harvest according to the catalogue.",
            "interval": "Foliar spray.",
            "recommendation": "Avoid high rates because the safety margin between boron deficiency and excess is narrow. Mix only after compatibility testing."
          }
        ],
        "documents": [
          {
            "title": "Brochure",
            "description": "Product profile covering the concept, main uses, and key technical and commercial messages for distributors and customers.",
            "status": "Yes / FoliQ catalogue"
          },
          {
            "title": "Label",
            "description": "Local label reference and approved use details.",
            "status": "No / after registration"
          },
          {
            "title": "Technical sheet",
            "description": "Concise technical reference covering composition, formulation, use rates, and the key product presentation points.",
            "status": "Yes"
          },
          {
            "title": "Certificates",
            "description": "Certificates and official files shared for partner discussions.",
            "status": "On request"
          }
        ]
      }
  ],
  ar: [
        {
    "slug": "lasix",
    "categorySlug": "agrochemicals",
    "legacySlugs": [
      "lasix-70-wg"
    ],
    "name": "لازيكس 70 WG",
    "category": "وقاية المحاصيل",
    "subcategory": "مبيدات حشرية",
    "crops": [
      "الطماطم",
      "الفلفل والباذنجان",
      "العائلة القرعية",
      "الخيار والكوسة",
      "الموالح"
    ],
    "positioning": "طريق واضح لمكافحة الذبابة البيضاء. مبيد حشري جهازي يحتوي على أسيتامبريد 70% في صورة حبيبات قابلة للانتشار في الماء WG، مصمم لمكافحة الذبابة البيضاء والحشرات الثاقبة الماصة ضمن برامج المكافحة المتكاملة.",
    "registrationStatus": "مسجل ومتداول",
    "seo": {
      "title": "لازيكس 70 WG | مبيد حشري جهازي لمكافحة الذبابة البيضاء | أجروبست كنترول",
      "description": "لازيكس 70 WG مبيد حشري جهازي يحتوي على أسيتامبريد 70% WG لمكافحة الذبابة البيضاء والحشرات الثاقبة الماصة في محاصيل الخضر ضمن برامج المكافحة المتكاملة.",
      "keywords": [
        "لازيكس 70 WG",
        "Lasix 70 WG",
        "أسيتامبريد 70%",
        "مبيد الذبابة البيضاء",
        "الحشرات الثاقبة الماصة",
        "أجروبست كنترول"
      ]
    },
    "galleryImage": "/images/products/lasix-gallery.png",
    "galleryImageAlt": "صورة كتالوج Lasix 70 WG",
    "detailImage": "/images/products/lasix-detail.png",
    "detailImageAlt": "عبوة لازيكس 70 WG مبيد حشري جهازي لمكافحة الذبابة البيضاء من أجروبست كنترول",
    "facts": {
      "category": "Agrochemicals > Insecticides",
      "composition": "أسيتامبريد Acetamiprid 70% وزن/وزن",
      "compositionRows": [
        {
          "ingredient": "أسيتامبريد Acetamiprid",
          "concentration": "70% وزن/وزن"
        }
      ],
      "formulation": "WG – حبيبات قابلة للانتشار في الماء",
      "targetCrop": "الطماطم، الفلفل والباذنجان، العائلة القرعية، الخيار والكوسة والموالح",
      "target": "الحشرات الثاقبة الماصة: الذبابة البيضاء، المن، التربس، صانعات الأنفاق، نطاطات الأوراق، والحشرات القشرية الرخوة",
      "supplier": "AgroUnitek - China",
      "registrationStatus": "مسجل لدى وزارة الزراعة المصرية؛ رقم التسجيل 4828"
    },
    "overview": "يمثل لازيكس 70 WG حلاً حشرياً متخصصاً في برامج مكافحة الذبابة البيضاء والحشرات الثاقبة الماصة في محاصيل الخضر والمحاصيل الحساسة لهذه الآفات. يعتمد المنتج على أسيتامبريد بتركيز 70% وزن/وزن في صورة WG، مما يجمع بين الفاعلية الجهازية وسهولة التحضير والتوزيع المتجانس داخل محلول الرش. تساعد طبيعة المنتج الجهازية على وصول المادة الفعالة إلى أجزاء من النموات الحديثة، مع أهمية التغطية الجيدة خاصة للسطح السفلي للأوراق حيث تتركز أطوار الذبابة البيضاء والحشرات الثاقبة الماصة.",
    "pageSections": {
      "overview": {
        "title": "نظرة عامة على المنتج",
        "description": "يمثل لازيكس 70 WG حلاً حشرياً متخصصاً في برامج مكافحة الذبابة البيضاء والحشرات الثاقبة الماصة في محاصيل الخضر والمحاصيل الحساسة لهذه الآفات. يعتمد المنتج على أسيتامبريد بتركيز 70% وزن/وزن في صورة WG، مما يجمع بين الفاعلية الجهازية وسهولة التحضير والتوزيع المتجانس داخل محلول الرش. تساعد طبيعة المنتج الجهازية على وصول المادة الفعالة إلى أجزاء من النموات الحديثة، مع أهمية التغطية الجيدة خاصة للسطح السفلي للأوراق حيث تتركز أطوار الذبابة البيضاء والحشرات الثاقبة الماصة."
      },
      "whenToUse": {
        "title": "متى يستخدم لازيكس 70 WG؟",
        "items": [
          {
            "title": "عند بداية ظهور الذبابة البيضاء",
            "description": "يفضل التدخل المبكر عند رصد بداية ظهور الحشرة، قبل ارتفاع تعدادها وصعوبة السيطرة عليها."
          },
          {
            "title": "خلال مراحل النموات الحديثة",
            "description": "مناسب للفترات التي يكون فيها النبات في نمو نشط وتحتاج النموات الجديدة إلى حماية من الحشرات الثاقبة الماصة."
          },
          {
            "title": "عند ارتفاع تعداد الحشرات على محاصيل الخضر",
            "description": "يدخل ضمن برامج مكافحة الذبابة البيضاء والمن والتربس وصانعات الأنفاق، مع مراعاة التغطية الجيدة وتكرار الرصد."
          },
          {
            "title": "ضمن برامج إدارة انتقال الفيروسات",
            "description": "يساعد تقليل نشاط الذبابة البيضاء والتغذية على الحد من مخاطر انتقال الفيروسات المرتبطة بها، خاصة في المراحل المبكرة من عمر المحصول."
          },
          {
            "title": "ضمن برنامج مكافحة متكامل",
            "description": "يستخدم مع التبادل بين مبيدات من مجموعات تأثير مختلفة لتقليل فرص ظهور المقاومة، وعدم الاعتماد المتكرر على نفس مجموعة التأثير."
          }
        ]
      },
      "whyThisProduct": {
        "title": "لماذا لازيكس 70 WG؟",
        "description": "لازيكس 70 WG لا يعتمد فقط على مكافحة الحشرة الموجودة على سطح الورقة، بل يقدم تموضعاً عملياً داخل برامج المكافحة بفضل تركيزه العالي، وطبيعته الجهازية، وصورته WG سهلة الاستخدام.",
        "image": "/images/products/lasix-mode.png",
        "imageAlt": "شرح تموضع Lasix 70 WG",
        "points": [
          "تركيز عالٍ بجرعات استخدام منخفضة لكل 100 لتر ماء طبقاً للتوصيات المعتمدة.",
          "حركة جهازية تساعد على الوصول إلى النموات الحديثة والأماكن التي يصعب تغطيتها بالكامل بالرش المباشر.",
          "تركيبة WG سهلة التحضير وتساعد على تقليل الغبار مقارنة ببعض الصور التقليدية."
        ]
      },
      "fieldBenefits": {
        "title": "الفوائد الحقلية",
        "items": [
          {
            "title": "مكافحة الذبابة البيضاء",
            "description": "يساعد في خفض تعداد الذبابة البيضاء عند استخدامه مبكراً وضمن برنامج رصد ومكافحة منتظم."
          },
          {
            "title": "يدعم حماية النموات الحديثة",
            "description": "تساعد طبيعته الجهازية على دعم حماية أجزاء من النموات الجديدة التي قد لا يصلها الرش المباشر بدرجة كافية."
          },
          {
            "title": "مناسب للحشرات الثاقبة الماصة",
            "description": "يدخل ضمن برامج مكافحة المن والتربس وصانعات الأنفاق وغيرها من الآفات الثاقبة الماصة طبقاً للمحصول والنشرة المعتمدة."
          },
          {
            "title": "يساعد في إدارة مخاطر الفيروسات",
            "description": "من خلال الحد من نشاط الذبابة البيضاء، يساعد المنتج في تقليل مخاطر انتقال الفيروسات التي قد ترتبط بهذه الآفة."
          },
          {
            "title": "سهولة التحضير والاستخدام",
            "description": "صيغة WG تساعد على الانتشار في الماء وتحضير محلول رش متجانس عند اتباع خطوات الخلط الصحيحة."
          },
          {
            "title": "ملائم لبرامج المكافحة المتكاملة",
            "description": "يمكن استخدامه ضمن برنامج متكامل مع تدوير مجموعات التأثير لتقليل الضغط الحشري وإدارة المقاومة."
          }
        ]
      },
      "applicationRecommendations": {
        "title": "توصيات الاستخدام",
        "intro": "يستخدم لازيكس 70 WG وفقاً للتوصيات المعتمدة على المحصول والآفة المستهدفة، مع الالتزام بفترة ما قبل الحصاد لكل محصول.",
        "rows": [
          {
            "crop": "الطماطم",
            "target": "الذبابة البيضاء",
            "dose": "12.5 جم / 100 لتر ماء",
            "timing": "عند بداية ظهور الحشرة أو وفق برنامج رصد الحشرة",
            "method": "رش ورقي مع تغطية جيدة للمجموع الخضري، خاصة السطح السفلي للأوراق",
            "interval": "رش ورقي مع تغطية جيدة للمجموع الخضري، خاصة السطح السفلي للأوراق",
            "phi": "8 أيام",
            "recommendation": "8 أيام"
          },
          {
            "crop": "الخيار والكوسة والقرعيات",
            "target": "الذبابة البيضاء، المن، التربس وصانعات الأنفاق",
            "dose": "12.5 – 22.5 جم / 100 لتر ماء",
            "timing": "عند بداية ظهور الحشرة أو وفق برنامج رصد الحشرة",
            "method": "رش ورقي مع الاهتمام بالسطح السفلي للأوراق والنموات الحديثة",
            "interval": "رش ورقي مع الاهتمام بالسطح السفلي للأوراق والنموات الحديثة",
            "phi": "3 أيام",
            "recommendation": "3 أيام"
          },
          {
            "crop": "الفلفل والباذنجان",
            "target": "الذبابة البيضاء، المن، التربس وصانعات الأنفاق",
            "dose": "12.5 – 22.5 جم / 100 لتر ماء",
            "timing": "عند بداية ظهور الحشرة أو وفق برنامج رصد الحشرة",
            "method": "رش ورقي مع تغطية جيدة للمجموع الخضري",
            "interval": "رش ورقي مع تغطية جيدة للمجموع الخضري",
            "phi": "7 أيام",
            "recommendation": "7 أيام"
          },
          {
            "crop": "الموالح",
            "target": "صانعات الأنفاق، المن، التربس، الحشرات القشرية الرخوة ونطاطات الأوراق",
            "dose": "12.5 – 17.5 جم / 100 لتر ماء",
            "timing": "عند بداية ظهور الآفة أو وفق برنامج الرصد",
            "method": "رش ورقي مع تغطية جيدة للنموات الحديثة",
            "interval": "رش ورقي مع تغطية جيدة للنموات الحديثة",
            "phi": "7 أيام",
            "recommendation": "7 أيام"
          }
        ]
      },
      "technicalNotes": {
        "title": "إرشادات فنية مهمة",
        "items": [
          "يستخدم لازيكس 70 WG وفقاً للتوصيات المعتمدة على المحصول والآفة المستهدفة.",
          "يفضل التدخل عند بداية ظهور الحشرة وعدم الانتظار حتى ارتفاع الكثافة العددية.",
          "يجب الاهتمام بتغطية السطح السفلي للأوراق حيث تتجمع الذبابة البيضاء واليرقات.",
          "لا يعتمد على نفس مجموعة التأثير بشكل متكرر؛ يفضل التبادل مع مبيدات من مجموعات IRAC مختلفة لإدارة المقاومة.",
          "تجنب الرش وقت الحرارة الشديدة أو عند تعرض النبات لإجهاد واضح.",
          "ينصح بإجراء اختبار خلط بسيط قبل الخلط مع منتجات أخرى في تانك الرش.",
          "تجنب الخلط مع المنتجات شديدة القلوية إلا بعد التأكد من التوافق.",
          "يلزم الالتزام بفترة ما قبل الحصاد PHI لكل محصول."
        ]
      },
      "documents": {
        "items": [
          {
            "type": "brochure",
            "title": "تحميل بروشور لازيكس 70 WG",
            "description": "ملف تعريفي يعرض فكرة المنتج واستخداماته وأهم الرسائل الفنية.",
            "status": "نعم"
          },
          {
            "type": "technical-sheet",
            "title": "تحميل النشرة الفنية",
            "description": "مرجع فني مختصر يوضح التركيب، الصيغة، معدلات الاستخدام، وإرشادات التطبيق.",
            "status": "نعم"
          }
        ]
      }
    },
    "benefits": [
      {
        "title": "مكافحة الذبابة البيضاء",
        "description": "يساعد في خفض تعداد الذبابة البيضاء عند استخدامه مبكراً وضمن برنامج رصد ومكافحة منتظم."
      },
      {
        "title": "يدعم حماية النموات الحديثة",
        "description": "تساعد طبيعته الجهازية على دعم حماية أجزاء من النموات الجديدة التي قد لا يصلها الرش المباشر بدرجة كافية."
      },
      {
        "title": "مناسب للحشرات الثاقبة الماصة",
        "description": "يدخل ضمن برامج مكافحة المن والتربس وصانعات الأنفاق وغيرها من الآفات الثاقبة الماصة طبقاً للمحصول والنشرة المعتمدة."
      },
      {
        "title": "يساعد في إدارة مخاطر الفيروسات",
        "description": "من خلال الحد من نشاط الذبابة البيضاء، يساعد المنتج في تقليل مخاطر انتقال الفيروسات التي قد ترتبط بهذه الآفة."
      },
      {
        "title": "سهولة التحضير والاستخدام",
        "description": "صيغة WG تساعد على الانتشار في الماء وتحضير محلول رش متجانس عند اتباع خطوات الخلط الصحيحة."
      },
      {
        "title": "ملائم لبرامج المكافحة المتكاملة",
        "description": "يمكن استخدامه ضمن برنامج متكامل مع تدوير مجموعات التأثير لتقليل الضغط الحشري وإدارة المقاومة."
      }
    ],
    "usageTitle": "توصيات الاستخدام",
    "usageIntro": "يستخدم لازيكس 70 WG وفقاً للتوصيات المعتمدة على المحصول والآفة المستهدفة، مع الالتزام بفترة ما قبل الحصاد لكل محصول.",
    "technicalNotesTitle": "إرشادات فنية مهمة",
    "technicalNotes": [
      "يستخدم لازيكس 70 WG وفقاً للتوصيات المعتمدة على المحصول والآفة المستهدفة.",
      "يفضل التدخل عند بداية ظهور الحشرة وعدم الانتظار حتى ارتفاع الكثافة العددية.",
      "يجب الاهتمام بتغطية السطح السفلي للأوراق حيث تتجمع الذبابة البيضاء واليرقات.",
      "لا يعتمد على نفس مجموعة التأثير بشكل متكرر؛ يفضل التبادل مع مبيدات من مجموعات IRAC مختلفة لإدارة المقاومة.",
      "تجنب الرش وقت الحرارة الشديدة أو عند تعرض النبات لإجهاد واضح.",
      "ينصح بإجراء اختبار خلط بسيط قبل الخلط مع منتجات أخرى في تانك الرش.",
      "تجنب الخلط مع المنتجات شديدة القلوية إلا بعد التأكد من التوافق.",
      "يلزم الالتزام بفترة ما قبل الحصاد PHI لكل محصول."
    ],
    "modeOfAction": {
      "title": "لماذا لازيكس 70 WG؟",
      "description": "لازيكس 70 WG لا يعتمد فقط على مكافحة الحشرة الموجودة على سطح الورقة، بل يقدم تموضعاً عملياً داخل برامج المكافحة بفضل تركيزه العالي، وطبيعته الجهازية، وصورته WG سهلة الاستخدام.",
      "image": "/images/products/lasix-mode.png",
      "imageAlt": "شرح تموضع Lasix 70 WG",
      "points": [
        "تركيز عالٍ بجرعات استخدام منخفضة لكل 100 لتر ماء طبقاً للتوصيات المعتمدة.",
        "حركة جهازية تساعد على الوصول إلى النموات الحديثة والأماكن التي يصعب تغطيتها بالكامل بالرش المباشر.",
        "تركيبة WG سهلة التحضير وتساعد على تقليل الغبار مقارنة ببعض الصور التقليدية."
      ]
    },
    "usageGuidance": [
      {
        "crop": "الطماطم",
        "target": "الذبابة البيضاء",
        "dose": "12.5 جم / 100 لتر ماء",
        "timing": "عند بداية ظهور الحشرة أو وفق برنامج رصد الحشرة",
        "method": "رش ورقي مع تغطية جيدة للمجموع الخضري، خاصة السطح السفلي للأوراق",
        "interval": "رش ورقي مع تغطية جيدة للمجموع الخضري، خاصة السطح السفلي للأوراق",
        "phi": "8 أيام",
        "recommendation": "8 أيام"
      },
      {
        "crop": "الخيار والكوسة والقرعيات",
        "target": "الذبابة البيضاء، المن، التربس وصانعات الأنفاق",
        "dose": "12.5 – 22.5 جم / 100 لتر ماء",
        "timing": "عند بداية ظهور الحشرة أو وفق برنامج رصد الحشرة",
        "method": "رش ورقي مع الاهتمام بالسطح السفلي للأوراق والنموات الحديثة",
        "interval": "رش ورقي مع الاهتمام بالسطح السفلي للأوراق والنموات الحديثة",
        "phi": "3 أيام",
        "recommendation": "3 أيام"
      },
      {
        "crop": "الفلفل والباذنجان",
        "target": "الذبابة البيضاء، المن، التربس وصانعات الأنفاق",
        "dose": "12.5 – 22.5 جم / 100 لتر ماء",
        "timing": "عند بداية ظهور الحشرة أو وفق برنامج رصد الحشرة",
        "method": "رش ورقي مع تغطية جيدة للمجموع الخضري",
        "interval": "رش ورقي مع تغطية جيدة للمجموع الخضري",
        "phi": "7 أيام",
        "recommendation": "7 أيام"
      },
      {
        "crop": "الموالح",
        "target": "صانعات الأنفاق، المن، التربس، الحشرات القشرية الرخوة ونطاطات الأوراق",
        "dose": "12.5 – 17.5 جم / 100 لتر ماء",
        "timing": "عند بداية ظهور الآفة أو وفق برنامج الرصد",
        "method": "رش ورقي مع تغطية جيدة للنموات الحديثة",
        "interval": "رش ورقي مع تغطية جيدة للنموات الحديثة",
        "phi": "7 أيام",
        "recommendation": "7 أيام"
      }
    ],
    "documents": [
      {
        "type": "brochure",
        "title": "تحميل بروشور لازيكس 70 WG",
        "description": "ملف تعريفي يعرض فكرة المنتج واستخداماته وأهم الرسائل الفنية.",
        "status": "نعم"
      },
      {
        "type": "technical-sheet",
        "title": "تحميل النشرة الفنية",
        "description": "مرجع فني مختصر يوضح التركيب، الصيغة، معدلات الاستخدام، وإرشادات التطبيق.",
        "status": "نعم"
      }
    ]
  },
        {
    "slug": "rival-duo",
    "categorySlug": "agrochemicals",
    "legacySlugs": [
      "rival-duo-45-sc",
      "rival-duo-sc-45"
    ],
    "name": "ريفال ديو 45 SC",
    "category": "وقاية المحاصيل",
    "subcategory": "مبيدات فطرية",
    "crops": [
      "البطاطس",
      "الطماطم",
      "القرعيات",
      "البصل"
    ],
    "positioning": "مبيد فطري بتركيبة مزدوجة يجمع بين بروباموكارب وسيموكسانيل، لدعم برامج مكافحة الندوة المتأخرة والبياض الزغبي في المحاصيل الحساسة خلال فترات الرطوبة والضغط المرضي.",
    "registrationStatus": "مسجل ومتداول",
    "seo": {
      "title": "ريفال ديو 45 SC | مبيد فطري للندوة المتأخرة والبياض الزغبي | أجروبست كنترول",
      "description": "ريفال ديو 45 SC مبيد فطري بتركيبة مزدوجة من بروباموكارب وسيموكسانيل، لدعم برامج مكافحة الندوة المتأخرة والبياض الزغبي في البطاطس والطماطم والقرعيات والبصل.",
      "keywords": [
        "ريفال ديو",
        "Rival Duo 45 SC",
        "مبيد فطري",
        "الندوة المتأخرة",
        "البياض الزغبي",
        "بروباموكارب",
        "سيموكسانيل",
        "أجروبست كنترول"
      ]
    },
    "galleryImage": "/images/products/rival-duo-gallery.png",
    "galleryImageAlt": "صورة كتالوج Rival DUO 45 SC",
    "detailImage": "/images/products/rival-duo-detail.png",
    "detailImageAlt": "عبوات Rival DUO SC 45 مع درنات بطاطس تحت مظلة حماية وخلفية حقل بطاطس.",
    "facts": {
      "category": "Agrochemicals > Fungicides",
      "composition": "بروباموكارب 40% + سيموكسانيل 5%",
      "compositionRows": [
        {
          "ingredient": "بروباموكارب",
          "concentration": "40%"
        },
        {
          "ingredient": "سيموكسانيل",
          "concentration": "5%"
        }
      ],
      "formulation": "SC – معلق مركز",
      "targetCrop": "البطاطس، الطماطم، القرعيات، البصل",
      "target": "الندوة المتأخرة والبياض الزغبي",
      "supplier": "Agria SA – Bulgaria",
      "registrationStatus": "مسجل لدى وزارة الزراعة المصرية؛ رقم التسجيل 4244"
    },
    "overview": "ريفال ديو 45 SC مبيد فطري في صورة معلق مركز SC، يجمع بين مادتين فعالتين متكاملتين: بروباموكارب وسيموكسانيل. صُمم المنتج لدعم برامج مكافحة أمراض الأووميسيت، خاصة الندوة المتأخرة في البطاطس والطماطم، والبياض الزغبي في القرعيات والبصل. يعتمد ريفال ديو على الجمع بين حماية وقائية داخل النبات ودعم علاجي موضعي سريع، مما يجعله مناسباً للاستخدام خلال الفترات التي ترتفع فيها احتمالات انتشار المرض.",
    "pageSections": {
      "overview": {
        "title": "لمحة فنية عن المنتج",
        "description": "ريفال ديو 45 SC مبيد فطري في صورة معلق مركز SC، يجمع بين مادتين فعالتين متكاملتين: بروباموكارب وسيموكسانيل. صُمم المنتج لدعم برامج مكافحة أمراض الأووميسيت، خاصة الندوة المتأخرة في البطاطس والطماطم، والبياض الزغبي في القرعيات والبصل. يعتمد ريفال ديو على الجمع بين حماية وقائية داخل النبات ودعم علاجي موضعي سريع، مما يجعله مناسباً للاستخدام خلال الفترات التي ترتفع فيها احتمالات انتشار المرض."
      },
      "whenToUse": {
        "title": "متى تحتاج إلى استخدامه؟",
        "items": [
          {
            "title": "قبل أو مع بداية فترات الرطوبة العالية والندى والشبورة."
          },
          {
            "title": "عند توقع ضغط مرضي مرتفع للندوة المتأخرة أو البياض الزغبي."
          },
          {
            "title": "في برامج البطاطس والطماطم خلال الفترات الحساسة للإصابة بالندوة المتأخرة."
          },
          {
            "title": "في القرعيات والبصل عند وجود ظروف ملائمة لانتشار البياض الزغبي."
          },
          {
            "title": "عند الحاجة إلى منتج يجمع بين الوقاية والتدخل العلاجي المبكر ضمن برنامج مكافحة متكامل."
          }
        ]
      },
      "whyThisProduct": {
        "title": "لماذا ريفال ديو 45 SC؟",
        "description": "يعتمد ريفال ديو 45 SC على فكرة الحماية المزدوجة؛ مادة بروباموكارب تدعم الحماية الجهازية والوقائية داخل أنسجة النبات، بينما يوفر سيموكسانيل فعلاً موضعياً جهازياً سريعاً يساعد على التدخل في المراحل الأولى من العدوى. هذا الجمع يعطي المنتج مكاناً واضحاً داخل برامج مكافحة الندوة المتأخرة والبياض الزغبي، خاصة في الظروف التي قد يصعب فيها ضبط توقيت الرش بدقة بسبب الرطوبة، الشبورة، أو سرعة تطور الإصابة. كما أن صورة المركز المعلق SC تساعد على سهولة التحضير وتوزيع المادة الفعالة بصورة متجانسة داخل محلول الرش.",
        "image": "/images/products/rival-duo-mode.svg",
        "imageAlt": "شرح تموضع Rival DUO 45 SC",
        "points": [
          "حماية مزدوجة تجمع بين بروباموكارب وسيموكسانيل.",
          "مناسب لبرامج مكافحة الندوة المتأخرة والبياض الزغبي.",
          "تركيبة SC سهلة التحضير، وتساعد على توزيع متجانس داخل محلول الرش بما يدعم كفاءة التغطية أثناء التطبيق."
        ]
      },
      "fieldBenefits": {
        "title": "الفوائد العملية في الحقل",
        "items": [
          {
            "title": "حماية مزدوجة في منتج واحد",
            "description": "يجمع بين بروباموكارب وسيموكسانيل لدعم الوقاية والتدخل العلاجي المبكر ضمن برنامج المكافحة."
          },
          {
            "title": "دعم قوي في الظروف الملائمة للمرض",
            "description": "يساعد في دعم برامج مكافحة الندوة المتأخرة والبياض الزغبي خلال فترات الرطوبة العالية والندى والشبورة، وهي من الظروف التي تزيد احتمالية ظهور وانتشار الإصابة."
          },
          {
            "title": "دعم في برامج إدارة المقاومة",
            "description": "وجود مادتين فعالتين بآليتي تأثير مختلفتين يدعم استخدامه داخل برامج التبادل بين المجموعات الفطرية."
          },
          {
            "title": "تركيبة سهلة الاستخدام",
            "description": "صورة المركز المعلق SC تساعد على التحضير والتوزيع المتجانس للمادة الفعالة داخل محلول الرش."
          },
          {
            "title": "ثبات أفضل بعد جفاف محلول الرش",
            "description": "بعد جفاف الرذاذ على سطح الورقة، تساعد صورة المركز المعلق على ثبات التغطية وتقليل فقد المعاملة بفعل الندى أو الأمطار الخفيفة."
          }
        ]
      },
      "applicationRecommendations": {
        "title": "توصيات الاستخدام",
        "intro": "تُستخدم المعدلات طبقاً للتوصيات المعتمدة، مع مراعاة حالة المحصول والظروف الملائمة لانتشار المرض، والالتزام بفترة ما قبل الحصاد لكل محصول.",
        "rows": [
          {
            "crop": "البطاطس",
            "target": "الندوة المتأخرة",
            "dose": "200 سم³ / 100 لتر ماء",
            "timing": "وقائياً عند توقع ظروف ملائمة للإصابة أو عند بداية ظهور الأعراض",
            "method": "رش ورقي مع تغطية جيدة للمجموع الخضري",
            "interval": "رش ورقي مع تغطية جيدة للمجموع الخضري",
            "phi": "8 أيام",
            "recommendation": "8 أيام"
          },
          {
            "crop": "الطماطم",
            "target": "الندوة المتأخرة",
            "dose": "200 – 250 سم³ / 100 لتر ماء",
            "timing": "مع بداية الظروف الملائمة لظهور الندوة المتأخرة أو ضمن برنامج مكافحتها",
            "method": "رش ورقي مع تغطية جيدة للأوراق والسطح السفلي قدر الإمكان",
            "interval": "رش ورقي مع تغطية جيدة للأوراق والسطح السفلي قدر الإمكان",
            "phi": "8 أيام",
            "recommendation": "8 أيام"
          },
          {
            "crop": "القرعيات مثل الخيار والبطيخ",
            "target": "البياض الزغبي",
            "dose": "200 – 250 سم³ / 100 لتر ماء",
            "timing": "قبل أو عند بداية ظهور الظروف المناسبة لانتشار البياض الزغبي",
            "method": "رش ورقي مع ضمان تغطية جيدة للمجموع الخضري",
            "interval": "رش ورقي مع ضمان تغطية جيدة للمجموع الخضري",
            "phi": "3 أيام",
            "recommendation": "3 أيام"
          },
          {
            "crop": "البصل",
            "target": "البياض الزغبي",
            "dose": "200 – 250 سم³ / 100 لتر ماء",
            "timing": "ضمن برنامج مكافحة البياض الزغبي، خاصة مع الرطوبة العالية والشبورة",
            "method": "رش ورقي بتغطية جيدة للمجموع الخضري",
            "interval": "رش ورقي بتغطية جيدة للمجموع الخضري",
            "phi": "15 يوم",
            "recommendation": "15 يوم"
          }
        ]
      },
      "technicalNotes": {
        "title": "ملاحظات فنية مهمة",
        "items": [
          "يُستخدم ريفال ديو 45 SC ضمن برنامج مكافحة متكامل ولا يُعتمد عليه وحده في حالات الإصابة الشديدة أو الانتشار الوبائي.",
          "يفضل الرش الوقائي أو عند بداية ظهور الأعراض، مع عدم تأخير المعاملة في فترات الرطوبة العالية.",
          "يجب تحقيق تغطية جيدة للمجموع الخضري، لأن جودة التغطية تؤثر على كفاءة المعاملة.",
          "يُراعى التبادل مع مبيدات فطرية من مجموعات مختلفة ضمن برنامج إدارة المقاومة.",
          "يُرج جيداً قبل الاستخدام، وتُجرى تجربة خلط صغيرة قبل الخلط مع منتجات أخرى.",
          "يجب الالتزام بمعدل الاستخدام وفترة ما قبل الحصاد المذكورة لكل محصول."
        ]
      },
      "documents": {
        "title": "المستندات الفنية",
        "items": [
          {
            "type": "brochure",
            "title": "البروشور",
            "description": "ملف تعريفي يعرض فكرة المنتج، التركيبة المزدوجة، المحاصيل المستهدفة، وأهم رسائل الاستخدام.",
            "status": "نعم"
          },
          {
            "type": "label",
            "title": "الملصق",
            "description": "مرجع الملصق المحلي والاستخدامات المعتمدة.",
            "status": "لا / يحتاج إرفاق النسخة النهائية"
          },
          {
            "type": "technical-sheet",
            "title": "النشرة الفنية",
            "description": "مرجع مختصر يوضح التركيب، الصيغة، معدلات الاستخدام، وفترات ما قبل الحصاد.",
            "status": "نعم"
          },
          {
            "type": "certificate",
            "title": "الشهادات",
            "description": "الشهادات والملفات الرسمية لنقاشات الشركاء.",
            "status": "عند الطلب"
          }
        ]
      }
    },
    "benefits": [
      {
        "title": "حماية مزدوجة في منتج واحد",
        "description": "يجمع بين بروباموكارب وسيموكسانيل لدعم الوقاية والتدخل العلاجي المبكر ضمن برنامج المكافحة."
      },
      {
        "title": "مناسب لفترات الضغط المرضي",
        "description": "يساعد في إدارة الندوة المتأخرة والبياض الزغبي خلال فترات الرطوبة العالية والظروف الملائمة لانتشار المرض."
      },
      {
        "title": "دعم في برامج إدارة المقاومة",
        "description": "وجود مادتين فعالتين بآليتي تأثير مختلفتين يدعم استخدامه داخل برامج التبادل بين المجموعات الفطرية."
      },
      {
        "title": "تركيبة SC سهلة الاستخدام",
        "description": "صيغة المعلق المركز تساعد على التحضير العملي والتوزيع المتجانس للمادة الفعالة داخل محلول الرش."
      },
      {
        "title": "ثبات أفضل بعد جفاف محلول الرش",
        "description": "بعد جفاف الرذاذ على سطح الورقة، تساعد صيغة المنتج على ثبات التغطية وتقليل فقد المعاملة بفعل الندى أو الأمطار الخفيفة."
      }
    ],
    "usageTitle": "توصيات الاستخدام",
    "usageIntro": "تُستخدم المعدلات طبقاً للتوصيات المعتمدة، مع مراعاة حالة المحصول والظروف الملائمة لانتشار المرض، والالتزام بفترة ما قبل الحصاد لكل محصول.",
    "technicalNotesTitle": "ملاحظات فنية مهمة",
    "technicalNotes": [
      "يُستخدم ريفال ديو 45 SC ضمن برنامج مكافحة متكامل ولا يُعتمد عليه وحده في حالات الإصابة الشديدة أو الانتشار الوبائي.",
      "يفضل الرش الوقائي أو عند بداية ظهور الأعراض، مع عدم تأخير المعاملة في فترات الرطوبة العالية.",
      "يجب تحقيق تغطية جيدة للمجموع الخضري، لأن جودة التغطية تؤثر على كفاءة المعاملة.",
      "يُراعى التبادل مع مبيدات فطرية من مجموعات مختلفة ضمن برنامج إدارة المقاومة.",
      "يُرج جيداً قبل الاستخدام، وتُجرى تجربة خلط صغيرة قبل الخلط مع منتجات أخرى.",
      "يجب الالتزام بمعدل الاستخدام وفترة ما قبل الحصاد المذكورة لكل محصول."
    ],
    "modeOfAction": {
      "title": "لماذا ريفال ديو 45 SC؟",
      "description": "يعتمد ريفال ديو 45 SC على فكرة الحماية المزدوجة؛ مادة بروباموكارب تدعم الحماية الجهازية والوقائية داخل أنسجة النبات، بينما يوفر سيموكسانيل فعلاً موضعياً جهازياً سريعاً يساعد على التدخل في المراحل الأولى من العدوى. هذا الجمع يعطي المنتج مكاناً واضحاً داخل برامج مكافحة الندوة المتأخرة والبياض الزغبي، خاصة في الظروف التي قد يصعب فيها ضبط توقيت الرش بدقة بسبب الرطوبة، الشبورة، أو سرعة تطور الإصابة. كما أن صورة المركز المعلق SC تساعد على سهولة التحضير وتوزيع المادة الفعالة بصورة متجانسة داخل محلول الرش.",
      "image": "/images/products/rival-duo-mode.svg",
      "imageAlt": "شرح تموضع Rival DUO 45 SC",
      "points": [
        "حماية مزدوجة تجمع بين بروباموكارب وسيموكسانيل.",
        "مناسب لبرامج مكافحة الندوة المتأخرة والبياض الزغبي.",
        "تركيبة SC سهلة التحضير، وتساعد على توزيع متجانس داخل محلول الرش بما يدعم كفاءة التغطية أثناء التطبيق."
      ]
    },
    "usageGuidance": [
      {
        "crop": "البطاطس",
        "target": "الندوة المتأخرة",
        "dose": "200 سم³ / 100 لتر ماء",
        "timing": "وقائياً عند توقع ظروف ملائمة للإصابة أو عند بداية ظهور الأعراض",
        "method": "رش ورقي مع تغطية جيدة للمجموع الخضري",
        "interval": "رش ورقي مع تغطية جيدة للمجموع الخضري",
        "phi": "8 أيام",
        "recommendation": "8 أيام"
      },
      {
        "crop": "الطماطم",
        "target": "الندوة المتأخرة",
        "dose": "200 – 250 سم³ / 100 لتر ماء",
        "timing": "عند بداية الضغط المرضي أو ضمن برنامج مكافحة الندوة المتأخرة",
        "method": "رش ورقي مع تغطية جيدة للأوراق والسطح السفلي قدر الإمكان",
        "interval": "رش ورقي مع تغطية جيدة للأوراق والسطح السفلي قدر الإمكان",
        "phi": "8 أيام",
        "recommendation": "8 أيام"
      },
      {
        "crop": "القرعيات مثل الخيار والبطيخ",
        "target": "البياض الزغبي",
        "dose": "200 – 250 سم³ / 100 لتر ماء",
        "timing": "قبل أو عند بداية ظهور الظروف المناسبة لانتشار البياض الزغبي",
        "method": "رش ورقي مع ضمان تغطية جيدة للمجموع الخضري",
        "interval": "رش ورقي مع ضمان تغطية جيدة للمجموع الخضري",
        "phi": "3 أيام",
        "recommendation": "3 أيام"
      },
      {
        "crop": "البصل",
        "target": "البياض الزغبي",
        "dose": "200 – 250 سم³ / 100 لتر ماء",
        "timing": "ضمن برنامج مكافحة البياض الزغبي، خاصة مع الرطوبة العالية والشبورة",
        "method": "رش ورقي بتغطية جيدة للمجموع الخضري",
        "interval": "رش ورقي بتغطية جيدة للمجموع الخضري",
        "phi": "15 يوم",
        "recommendation": "15 يوم"
      }
    ],
    "documents": [
      {
        "type": "brochure",
        "title": "البروشور",
        "description": "ملف تعريفي يعرض فكرة المنتج، التركيبة المزدوجة، المحاصيل المستهدفة، وأهم رسائل الاستخدام.",
        "status": "نعم"
      },
      {
        "type": "label",
        "title": "الملصق",
        "description": "مرجع الملصق المحلي والاستخدامات المعتمدة.",
        "status": "لا / يحتاج إرفاق النسخة النهائية"
      },
      {
        "type": "technical-sheet",
        "title": "النشرة الفنية",
        "description": "مرجع مختصر يوضح التركيب، الصيغة، معدلات الاستخدام، وفترات ما قبل الحصاد.",
        "status": "نعم"
      },
      {
        "type": "registration-document",
        "title": "الشهادات",
        "description": "الشهادات والملفات الرسمية لنقاشات الشركاء.",
        "status": "عند الطلب"
      }
    ]
  },
    {
    "slug": "edegal",
    "categorySlug": "agrochemicals",
    "legacySlugs": [
      "edegal-72-2-sl"
    ],
    "name": "اديجال 72.2 SL",
    "category": "وقاية المحاصيل",
    "subcategory": "مبيدات فطرية",
    "crops": [
      "الخيار",
      "العائلة القرعية",
      "البصل"
    ],
    "positioning": "مبيد فطري جهازي يحتوي على بروباموكارب هيدروكلوريد 72.2% بتركيبة SL، مصمم للوقاية والعلاج المبكر للبياض الزغبي",
    "registrationStatus": "مسجل ومتداول",
    "galleryImage": "/images/products/edegal-gallery.png",
    "galleryImageAlt": "صورة كتالوج Edegal 72.2 SL",
    "detailImage": "/images/products/edegal-detail.png",
    "detailImageAlt": "عبوة Edegal 72.2 SL أمام نباتات خيار داخل صوبة وخلفية أوراق يظهر عليها البياض الزغبي.",
    "facts": {
      "category": "Agrochemicals > Fungicides",
      "composition": "Propamocarb HCl 72.2%",
      "formulation": "SL – مركز قابل للذوبان",
      "targetCrop": "الخيار والعائلة القرعية والبصل",
      "target": "البياض الزغبي وأمراض الفطريات البيضية في مراحل العدوى المبكرة",
      "supplier": "Agria SA – Bulgaria",
      "registrationStatus": "مسجل لدى وزارة الزراعة المصرية؛ رقم التسجيل 5398"
    },
    "overview": "إيديجال 72.2 SL مبيد فطري جهازي متخصص للحماية المبكرة من البياض الزغبي. يتحرك داخل أنسجة النبات بعد الامتصاص، مما يساعد على حماية النموات الحديثة وتقليل تطور المرض قبل أن يصل إلى مراحل يصعب السيطرة عليها.",
    "benefits": [
      {
        "title": "حماية جهازية من داخل النبات",
        "description": "ينتقل داخل أنسجة النبات ليساعد على توفير حماية داخلية فعالة ضد البياض الزغبي."
      },
      {
        "title": "بداية تأثير سريعة",
        "description": "يمتصه النبات خلال وقت قصير بعد التطبيق، مما يدعم سرعة بداية الحماية."
      },
      {
        "title": "وصول أفضل للمناطق غير المعاملة",
        "description": "تساعد حركته الجهازية على الوصول إلى أجزاء قد لا يغطيها الرش المباشر بكفاءة كاملة."
      },
      {
        "title": "فعالية من خلال الأوراق والجذور",
        "description": "يمكن استخدامه رشًا ورقيًا أو مع ماء الري طبقًا للتوصية الفنية."
      },
      {
        "title": "مناسب لبرامج الحماية المبكرة",
        "description": "يدعم التدخل الوقائي قبل اشتداد الإصابة، خاصة في الصوب والظروف الرطبة."
      }
    ],
    "modeOfAction": {
      "title": "طريقة عمل إيديجال",
      "description": "يعتمد إيديجال على مادة بروباموكارب هيدروكلوريد ذات التأثير الجهازي، حيث يتم امتصاصها عبر الأوراق أو الجذور ثم تتحرك داخل النبات لتساعد على الحد من تطور البياض الزغبي في مراحله الأولى.",
      "image": "/images/products/edegal-mode.png",
      "imageAlt": "شرح الحركة الجهازية لإيديجال 72.2 SL داخل النبات",
      "points": [
        "ينتشر داخل الأنسجة النباتية بعد الامتصاص.",
        "يساعد على حماية النموات الحديثة والمناطق غير المعاملة.",
        "يحد من تطور المرض عند استخدامه مبكرًا ضمن برنامج مكافحة مناسب."
      ]
    },
    "usageGuidance": [
      {
        "crop": "الخيار",
        "target": "البياض الزغبي",
        "dose": "250 سم³ / 100 لتر ماء",
        "timing": "يفضل الاستخدام في المراحل الأولى من نمو النبات وقبل اشتداد الإصابة؛ يكرر كل 7–10 أيام حسب شدة الإصابة والظروف الجوية",
        "interval": "رش ورقي؛ ويمكن استخدامه مع ماء الري بإضافة المنتج إلى شبكة الري لضمان وصوله لمنطقة الجذور.",
        "recommendation": "5 أيام"
      },
      {
        "crop": "العائلة القرعية",
        "target": "البياض الزغبي",
        "dose": "250 سم³ / 100 لتر ماء",
        "timing": "يفضل الاستخدام المبكر ضمن برنامج وقائي مناسب.",
        "interval": "رش ورقي مع تغطية جيدة.",
        "recommendation": "5 أيام"
      },
      {
        "crop": "البصل",
        "target": "البياض الزغبي",
        "dose": "250 سم³ / 100 لتر ماء",
        "timing": "يفضل الاستخدام المبكر ضمن برنامج وقائي مناسب.",
        "interval": "رش ورقي مع تغطية جيدة.",
        "recommendation": "15 يوم"
      }
    ],
    "documents": [
      {
        "title": "البروشور",
        "description": "ملف تعريفي يعرض فكرة المنتج واستخداماته الأساسية وأهم الرسائل الفنية والتجارية بطريقة مناسبة للموزعين والعملاء.",
        "status": "نعم"
      },
      {
        "title": "الملصق",
        "description": "مرجع الملصق المحلي والاستخدامات المعتمدة.",
        "status": "نعم / على العبوة المصورة"
      },
      {
        "title": "النشرة الفنية",
        "description": "مرجع فني مختصر يوضح التركيب والصيغة ومعدلات الاستخدام والنقاط الفنية الأساسية التي تساعد على تقديم المنتج بصورة دقيقة.",
        "status": "نعم"
      },
      {
        "title": "الشهادات",
        "description": "الشهادات والملفات الرسمية لنقاشات الشركاء.",
        "status": "عند الطلب"
      }
    ]
  },
    {
      "slug": "signal-npk-20-20-20",
      "categorySlug": "specialty-fertilizers",
      "legacySlugs": [
            "signal-npk",
            "signal-npk-series",
            "signal-npk-balanced"
      ],
      "name": "سيجنال المتوازن",
      "category": "التغذية النباتية",
      "subcategory": "NPK قابل للذوبان في الماء",
      "crops": [
            "الطماطم",
            "الفلفل",
            "الخيار",
            "الكوسة",
            "البطاطس",
            "البصل",
            "الخضر الورقية",
            "الموالح",
            "العنب",
            "الفراولة",
            "المانجو",
            "الرمان",
            "المحاصيل الحقلية"
      ],
      "positioning": "تركيبة NPK متوازنة قابلة للذوبان في الماء، مدعمة بعناصر صغرى مخلبية و2.5% مادة عضوية، مناسبة لدعم النمو الخضري المتوازن وتأسيس النبات وبرامج التغذية العامة.",
      "registrationStatus": "مسجل ومتداول",
      "hideRegistrationFact": true,
      "galleryImage": "/images/products/signal-npk-20-20-20-product.png",
      "galleryImageAlt": "صورة كتالوج سلسلة سيجنال NPK مع إبراز تركيبة 20-20-20 المتوازنة",
      "detailImage": "/images/products/signal-npk-20-20-20-product.png",
      "detailImageAlt": "عبوة سيجنال NPK للتركيبة المتوازنة 20-20-20.",
      "facts": {
            "category": "أسمدة > NPK قابل للذوبان في الماء",
            "composition": "NPK 20-20-20 + عناصر صغرى مخلبية + 2.5% مادة عضوية.",
            "compositionRows": [
                  {
                        "ingredient": "نيتروجين (N)",
                        "concentration": "20% وزن/وزن"
                  },
                  {
                        "ingredient": "فوسفور (P2O5)",
                        "concentration": "20% وزن/وزن"
                  },
                  {
                        "ingredient": "بوتاسيوم (K2O)",
                        "concentration": "20% وزن/وزن"
                  },
                  {
                        "ingredient": "عناصر صغرى مخلبية",
                        "concentration": "حديد، زنك، منجنيز، بورون، نحاس، موليبدنم"
                  },
                  {
                        "ingredient": "مادة عضوية",
                        "concentration": "2.5% وزن/وزن"
                  }
            ],
            "formulation": "مسحوق قابل للذوبان في الماء WSP",
            "targetCrop": "الخضر والفاكهة والمشاتل والمحاصيل الحقلية",
            "target": "نمو متوازن، تأسيس النبات، ودعم غذائي عام",
            "supplier": "Eurogro-Greece",
            "registrationStatus": "مسجل ومتداول في السوق المصري"
      },
      "overview": "سيجنال NPK 20-20-20 هو التركيبة المتوازنة داخل سلسلة سيجنال NPK. يستخدم عندما يحتاج النبات إلى دعم متوازن من النيتروجين والفوسفور والبوتاسيوم، خاصة في مراحل التأسيس والنمو الخضري واستعادة النشاط بعد الإجهاد وبرامج التغذية العامة بالرش الورقي أو مع الري.",
      "benefits": [
            {
                  "title": "نسبة NPK متوازنة",
                  "description": "يوفر دعماً متساوياً من النيتروجين والفوسفور والبوتاسيوم عندما يحتاج النبات إلى قاعدة غذائية مستقرة."
            },
            {
                  "title": "تغذية ذائبة وسريعة",
                  "description": "تركيبة قابلة للذوبان الكامل تساعد على سرعة الإتاحة عند استخدامها رشاً أو مع مياه الري."
            },
            {
                  "title": "دعم بالعناصر الصغرى المخلبية",
                  "description": "يساعد على إتاحة العناصر الصغرى ودعم العمليات الحيوية المرتبطة بالنمو وتكوين الكلوروفيل."
            },
            {
                  "title": "مناسب لبرامج الاسترداد بعد الإجهاد",
                  "description": "اختيار عملي بعد فترات الإجهاد أو ضعف النمو عندما يحتاج النبات إلى إعادة بناء متوازنة."
            }
      ],
      "modeOfAction": {
            "title": "دعم متوازن للنمو والتأسيس",
            "description": "تركيبة 20-20-20 تدعم النبات عندما يكون الاحتياج الغذائي موزعاً بين تكوين المجموع الخضري وتنشيط الجذور والاستعداد للإنتاج، دون دفع النبات في اتجاه غذائي واحد بقوة.",
            "image": "/images/products/signal-npk-20-20-20-mode.svg",
            "imageAlt": "تصور يوضح دور سيجنال NPK 20-20-20 في دعم النمو المتوازن",
            "points": [
                  "النيتروجين يدعم النمو الخضري وبناء المجموع النباتي.",
                  "الفوسفور يدعم نشاط الجذور وعمليات الطاقة أثناء النمو النشط.",
                  "البوتاسيوم يدعم الاتزان المائي وحركة نواتج البناء الضوئي وقوة النبات."
            ]
      },
      "usageGuidance": [
            {
                  "crop": "محاصيل الخضر",
                  "target": "تغذية متوازنة للطماطم والفلفل والخيار والكوسة والبطاطس والبصل والخضر الورقية.",
                  "dose": "رش ورقي: 2-3 جم/لتر ماء. مع الري: 4-5 كجم/فدان للمعاملة.",
                  "foliarDose": "2-3 جم/لتر ماء",
                  "fertigationDose": "4-5 كجم/فدان للمعاملة",
                  "timing": "يستخدم في التأسيس والنمو الخضري واستعادة النشاط أو بين معاملات عالي الفوسفور وعالي البوتاسيوم.",
                  "interval": "يكرر كل 7-14 يوماً حسب حالة المحصول وبرنامج التغذية.",
                  "recommendation": "يراعى التغطية الجيدة في الرش واستخدام مياه نظيفة عند الإضافة مع الري."
            },
            {
                  "crop": "محاصيل الفاكهة",
                  "target": "دعم غذائي متوازن للموالح والعنب والفراولة والمانجو والرمان وأشجار الفاكهة.",
                  "dose": "رش ورقي: 2-3 جم/لتر ماء. مع الري: 4-5 كجم/فدان للمعاملة.",
                  "foliarDose": "2-3 جم/لتر ماء",
                  "fertigationDose": "4-5 كجم/فدان للمعاملة",
                  "timing": "يستخدم أثناء دفعات النمو الخضري النشطة وفترات الاسترداد والتغذية العامة.",
                  "interval": "يكرر وفقاً لحالة المجموع الخضري وحمل المحصول ونتائج تحليل التربة أو النبات.",
                  "recommendation": "يتم الانتقال إلى عالي الفوسفور أو عالي البوتاسيوم عند دخول النبات في مرحلة أكثر تخصصاً."
            },
            {
                  "crop": "المحاصيل الحقلية والمشاتل",
                  "target": "دعم النمو العام وتأسيس الشتلات.",
                  "dose": "رش ورقي: 2-3 جم/لتر ماء. مع الري: 4-5 كجم/فدان للمعاملة.",
                  "foliarDose": "2-3 جم/لتر ماء",
                  "fertigationDose": "4-5 كجم/فدان للمعاملة",
                  "timing": "يستخدم في النمو المبكر والمشاتل وفترات الاحتياج الغذائي المتوازن.",
                  "interval": "أسبوعياً أو كل أسبوعين ضمن برنامج تغذية منظم.",
                  "recommendation": "يفضل إجراء اختبار توافق قبل الخلط وتجنب الخلطات شديدة القلوية."
            }
      ],
      "documents": [
            {
                  "title": "البروشور",
                  "description": "ملف تعريفي يعرض فكرة المنتج واستخداماته الأساسية وأهم الرسائل الفنية والتجارية بطريقة مناسبة للموزعين والعملاء.",
                  "status": "متاح"
            },
            {
                  "title": "النشرة الفنية",
                  "description": "مرجع فني مختصر يوضح التركيب والصيغة ومعدلات الاستخدام والنقاط الفنية الأساسية التي تساعد على تقديم المنتج بصورة دقيقة.",
                  "status": "متاح / يمكن إعداده"
            }
      ]
},
    {
      "slug": "signal-npk-14-48-0",
      "categorySlug": "specialty-fertilizers",
      "legacySlugs": [
            "signal-npk-high-phosphorus",
            "signal-high-phosphorus"
      ],
      "name": "سيجنال عالي الفوسفور",
      "category": "التغذية النباتية",
      "subcategory": "NPK قابل للذوبان في الماء",
      "crops": [
            "الطماطم",
            "الفلفل",
            "الخيار",
            "الكوسة",
            "البطاطس",
            "البصل",
            "الخضر الورقية",
            "الموالح",
            "العنب",
            "الفراولة",
            "المانجو",
            "الرمان",
            "المحاصيل الحقلية"
      ],
      "positioning": "تركيبة NPK عالية الفوسفور قابلة للذوبان في الماء، مدعمة بعناصر صغرى مخلبية و2.5% مادة عضوية، مناسبة لتنشيط الجذور والتأسيس والتحضير للتزهير ومراحل الاحتياج العالي للطاقة.",
      "registrationStatus": "مسجل ومتداول",
      "galleryImage": "/images/products/signal-npk-14-48-0-product.png",
      "galleryImageAlt": "صورة كتالوج سلسلة سيجنال NPK مع إبراز تركيبة 14-48-0 عالية الفوسفور",
      "detailImage": "/images/products/signal-npk-14-48-0-product.png",
      "detailImageAlt": "عبوة سيجنال NPK للتركيبة عالية الفوسفور 14-48-0.",
      "facts": {
            "category": "أسمدة > NPK قابل للذوبان في الماء",
            "composition": "NPK 14-48-0 + عناصر صغرى مخلبية + 2.5% مادة عضوية.",
            "compositionRows": [
                  {
                        "ingredient": "نيتروجين (N)",
                        "concentration": "14% وزن/وزن"
                  },
                  {
                        "ingredient": "فوسفور (P2O5)",
                        "concentration": "48% وزن/وزن"
                  },
                  {
                        "ingredient": "بوتاسيوم (K2O)",
                        "concentration": "0% وزن/وزن"
                  },
                  {
                        "ingredient": "عناصر صغرى مخلبية",
                        "concentration": "حديد، زنك، منجنيز، بورون، نحاس، موليبدنم"
                  },
                  {
                        "ingredient": "مادة عضوية",
                        "concentration": "2.5% وزن/وزن"
                  }
            ],
            "formulation": "مسحوق قابل للذوبان في الماء WSP",
            "targetCrop": "الخضر والفاكهة والمشاتل والمحاصيل الحقلية",
            "target": "تنشيط الجذور، التأسيس، التحضير للتزهير، ودعم الطاقة داخل النبات",
            "supplier": "Eurogro - Greece",
            "registrationStatus": "مسجل ومتداول في السوق المصري"
      },
      "overview": "سيجنال NPK 14-48-0 هو تركيبة عالي الفوسفور داخل سلسلة سيجنال NPK. يستخدم في الفترات التي يحتاج فيها النبات إلى دعم فوسفوري واضح لتنشيط الجذور والتأسيس ونقل الطاقة والتحضير للتزهير والانتقال إلى مراحل الإنتاج.",
      "benefits": [
            {
                  "title": "تركيز فوسفور مرتفع",
                  "description": "يدعم نشاط الجذور والعمليات المرتبطة بالطاقة في المراحل المبكرة ومراحل التحول للإنتاج."
            },
            {
                  "title": "مناسب لمراحل التأسيس",
                  "description": "يدخل في برامج الشتل والنمو المبكر عندما يكون تنشيط الجذور ضرورياً."
            },
            {
                  "title": "يدعم التحضير للتزهير",
                  "description": "يستخدم قبل التزهير وبداية العقد عندما يرتفع احتياج النبات للفوسفور."
            },
            {
                  "title": "مدعم بعناصر صغرى مخلبية",
                  "description": "يساعد على الحفاظ على النشاط الحيوي المتوازن بجانب النسبة العالية من الفوسفور."
            },
            {
                  "title": "اختيار مرحلي واضح",
                  "description": "يساعد الموزع على تقديم توصية مبنية على مرحلة النمو بدلاً من استخدام تركيبة واحدة طوال الموسم."
            }
      ],
      "modeOfAction": {
            "title": "تغذية موجهة للطاقة ونشاط الجذور",
            "description": "تركيبة 14-48-0 تركز اتجاه التغذية حول الفوسفور، وهو عنصر أساسي في انتقال الطاقة ونشاط الجذور والتحضير للتزهير ومراحل الإنتاج المبكرة.",
            "image": "/images/products/signal-npk-14-48-0-mode.svg",
            "imageAlt": "تصور يوضح دور سيجنال NPK 14-48-0 في دعم الجذور والطاقة",
            "points": [
                  "الفوسفور العالي يدعم العمليات الحيوية المرتبطة بالطاقة في النمو المبكر.",
                  "يدعم نشاط الجذور بعد الشتل وخلال التأسيس وفترات الاسترداد.",
                  "مناسب قبل التزهير أو في بداية العقد عندما يزيد احتياج النبات للفوسفور."
            ]
      },
      "usageGuidance": [
            {
                  "crop": "محاصيل الخضر",
                  "target": "تنشيط الجذور والتأسيس للطماطم والفلفل والخيار والكوسة والبطاطس والبصل والخضر الورقية.",
                  "dose": "رش ورقي: 2-3 جم/لتر ماء. مع الري: 4-5 كجم/فدان للمعاملة.",
                  "timing": "يستخدم بعد الشتل وأثناء النمو المبكر وقبل التزهير أو عند الحاجة إلى دعم نشاط الجذور.",
                  "interval": "يكرر كل 7-14 يوماً حسب مرحلة المحصول وبرنامج التغذية.",
                  "recommendation": "لا يفضل استخدامه بلا داعٍ في مراحل التحجيم المتأخرة حيث يكون عالي البوتاسيوم أنسب."
            },
            {
                  "crop": "محاصيل الفاكهة",
                  "target": "التحضير للتزهير ودعم بداية العقد واستعادة نشاط الجذور.",
                  "dose": "رش ورقي: 2-3 جم/لتر ماء. مع الري: 4-5 كجم/فدان للمعاملة.",
                  "timing": "يستخدم قبل التزهير أو في المراحل الإنتاجية المبكرة أو عند الحاجة إلى تنشيط الجذور.",
                  "interval": "يكرر حسب حمل المحصول والبرنامج الفني.",
                  "recommendation": "يستخدم كنافذة عالية الفوسفور ثم يتم الانتقال إلى المتوازن أو عالي البوتاسيوم حسب المرحلة."
            },
            {
                  "crop": "المشاتل والمحاصيل الحقلية",
                  "target": "تأسيس الشتلات وتنشيط الجذور ورفع الحيوية المبكرة.",
                  "dose": "رش ورقي: 2-3 جم/لتر ماء. مع الري: 4-5 كجم/فدان للمعاملة.",
                  "timing": "يستخدم في التأسيس ومراحل النمو المبكرة.",
                  "interval": "أسبوعياً أو كل أسبوعين ضمن برنامج تغذية منظم.",
                  "recommendation": "يفضل إجراء اختبار توافق قبل الخلط وتجنب الخلطات شديدة القلوية."
            }
      ],
      "documents": [
            {
                  "title": "البروشور",
                  "description": "بروشور سلسلة سيجنال NPK يوضح فكرة السلسلة واختلاف التركيبات ومعدلات الاستخدام وتموضع كل تركيبة حسب مرحلة نمو المحصول.",
                  "status": "متاح"
            },
            {
                  "title": "النشرة الفنية",
                  "description": "مرجع فني خاص بكل تركيبة يوضح التركيب ومعدلات الاستخدام وملاحظات الخلط والتموضع داخل برامج التغذية.",
                  "status": "متاح / يمكن إعداده"
            }
      ]
},
    {
      "slug": "signal-npk-12-5-40",
      "categorySlug": "specialty-fertilizers",
      "legacySlugs": [
            "signal-npk-high-potassium",
            "signal-high-potassium"
      ],
      "name": "سيجنال عالي البوتاسيوم",
      "category": "التغذية النباتية",
      "subcategory": "NPK قابل للذوبان في الماء",
      "crops": [
            "الطماطم",
            "الفلفل",
            "الخيار",
            "الكوسة",
            "البطاطس",
            "البصل",
            "الخضر الورقية",
            "الموالح",
            "العنب",
            "الفراولة",
            "المانجو",
            "الرمان",
            "المحاصيل الحقلية"
      ],
      "positioning": "تركيبة NPK عالية البوتاسيوم قابلة للذوبان في الماء، مدعمة بعناصر صغرى مخلبية و2.5% مادة عضوية، مناسبة للتحجيم والجودة وحركة السكريات واللون والصلابة ودعم المراحل الإنتاجية المتأخرة.",
      "registrationStatus": "مسجل ومتداول",
      "galleryImage": "/images/products/signal-npk-12-5-40-product.png",
      "galleryImageAlt": "صورة كتالوج سلسلة سيجنال NPK مع إبراز تركيبة 12-5-40 عالية البوتاسيوم",
      "detailImage": "/images/products/signal-npk-12-5-40-product.png",
      "detailImageAlt": "عبوة سيجنال NPK للتركيبة عالية البوتاسيوم 12-5-40.",
      "facts": {
            "category": "أسمدة > NPK قابل للذوبان في الماء",
            "composition": "NPK 12-5-40 + عناصر صغرى مخلبية + 2.5% مادة عضوية.",
            "compositionRows": [
                  {
                        "ingredient": "نيتروجين (N)",
                        "concentration": "12% وزن/وزن"
                  },
                  {
                        "ingredient": "فوسفور (P2O5)",
                        "concentration": "5% وزن/وزن"
                  },
                  {
                        "ingredient": "بوتاسيوم (K2O)",
                        "concentration": "40% وزن/وزن"
                  },
                  {
                        "ingredient": "عناصر صغرى مخلبية",
                        "concentration": "حديد، زنك، منجنيز، بورون، نحاس، موليبدنم"
                  },
                  {
                        "ingredient": "مادة عضوية",
                        "concentration": "2.5% وزن/وزن"
                  }
            ],
            "formulation": "مسحوق قابل للذوبان في الماء WSP",
            "targetCrop": "الخضر والفاكهة والمحاصيل الحقلية في مراحل الإنتاج",
            "target": "التحجيم والجودة وحركة السكريات واللون والصلابة ودعم المراحل المتأخرة",
            "supplier": "Eurogro - Greece",
            "registrationStatus": "مسجل ومتداول في السوق المصري"
      },
      "overview": "سيجنال NPK 12-5-40 هو تركيبة عالي البوتاسيوم داخل سلسلة سيجنال NPK. يستخدم في مراحل الإنتاج عندما يحتاج المحصول إلى تغذية موجهة بالبوتاسيوم لدعم التحجيم وحركة الكربوهيدرات والجودة واللون والصلابة والقيمة التسويقية النهائية.",
      "benefits": [
            {
                  "title": "اتجاه بوتاسيومي واضح",
                  "description": "يدعم امتلاء الثمار وحركة السكريات وبناء الجودة في المراحل الإنتاجية."
            },
            {
                  "title": "تموضع مرتبط بالجودة",
                  "description": "مناسب للتحجيم واللون والصلابة وبرامج إنهاء المحصول قبل الحصاد."
            },
            {
                  "title": "نسبة فوسفور منخفضة",
                  "description": "تحافظ على تركيز التوصية حول احتياج البوتاسيوم بدلاً من دعم الجذور أو التزهير."
            },
            {
                  "title": "مدعم بعناصر صغرى مخلبية",
                  "description": "يدعم الاتزان الحيوي خلال فترات الحمل العالي وحركة نواتج البناء الضوئي."
            },
            {
                  "title": "توصية واضحة لمرحلة الإنتاج",
                  "description": "يعطي إجابة مباشرة عند سؤال المزارع عن التركيبة المناسبة للتحجيم والجودة."
            }
      ],
      "modeOfAction": {
            "title": "دعم الجودة والامتلاء بقيادة البوتاسيوم",
            "description": "تركيبة 12-5-40 تحول اتجاه التغذية نحو البوتاسيوم، وهو عنصر مهم للاتزان المائي وحركة الكربوهيدرات وامتلاء الثمار وتحسين الجودة وإنهاء المحصول.",
            "image": "/images/products/signal-npk-12-5-40-mode.svg",
            "imageAlt": "تصور يوضح دور سيجنال NPK 12-5-40 في دعم التحجيم والجودة",
            "points": [
                  "البوتاسيوم يدعم حركة الكربوهيدرات من الأوراق إلى الثمار وأعضاء التخزين.",
                  "يناسب مراحل التحجيم واللون والصلابة وتحسين الجودة.",
                  "مفيد في المراحل الإنتاجية المتأخرة عندما يزيد احتياج النبات للبوتاسيوم مقارنة بالفوسفور."
            ]
      },
      "usageGuidance": [
            {
                  "crop": "محاصيل الخضر",
                  "target": "التحجيم ودعم الجودة في الطماطم والفلفل والخيار والكوسة والبطاطس والبصل ومحاصيل الخضر المثمرة.",
                  "dose": "رش ورقي: 2-3 جم/لتر ماء. مع الري: 4-5 كجم/فدان للمعاملة.",
                  "timing": "يستخدم أثناء امتلاء الثمار والتحجيم وبداية التلوين والمراحل الإنتاجية المتأخرة.",
                  "interval": "يكرر كل 7-14 يوماً حسب حمل المحصول وبرنامج الحصاد.",
                  "recommendation": "لا يستخدم مبكراً جداً عندما يكون النبات لا يزال محتاجاً للنمو المتوازن أو التأسيس بالفوسفور."
            },
            {
                  "crop": "محاصيل الفاكهة",
                  "target": "التحجيم واللون وحركة السكريات والصلابة والقيمة التسويقية.",
                  "dose": "رش ورقي: 2-3 جم/لتر ماء. مع الري: 4-5 كجم/فدان للمعاملة.",
                  "timing": "يستخدم أثناء زيادة حجم الثمار والنضج وبرامج إنهاء المحصول.",
                  "interval": "يكرر وفقاً لحمل المحصول ونتائج التحليل وموعد الحصاد المتوقع.",
                  "recommendation": "يفضل استخدامه ضمن برنامج تغذية متكامل يراعي الكالسيوم والعناصر الصغرى."
            },
            {
                  "crop": "المحاصيل الحقلية والدرنية",
                  "target": "امتلاء أعضاء التخزين ودعم الجودة.",
                  "dose": "رش ورقي: 2-3 جم/لتر ماء. مع الري: 4-5 كجم/فدان للمعاملة.",
                  "timing": "يستخدم أثناء مراحل تكوين الدرنات أو الأبصال أو أعضاء التخزين.",
                  "interval": "أسبوعياً أو كل أسبوعين ضمن برنامج تغذية منظم.",
                  "recommendation": "يفضل إجراء اختبار توافق قبل الخلط وتجنب الخلطات شديدة القلوية."
            }
      ],
      "documents": [
            {
                  "title": "البروشور",
                  "description": "بروشور سلسلة سيجنال NPK يوضح فكرة السلسلة واختلاف التركيبات ومعدلات الاستخدام وتموضع كل تركيبة حسب مرحلة نمو المحصول.",
                  "status": "متاح"
            },
            {
                  "title": "النشرة الفنية",
                  "description": "مرجع فني خاص بكل تركيبة يوضح التركيب ومعدلات الاستخدام وملاحظات الخلط والتموضع داخل برامج التغذية.",
                  "status": "متاح / يمكن إعداده"
            }
      ]
},
    {
      "slug": "chrome-pk",
      "categorySlug": "specialty-fertilizers",
      "legacySlugs": [
        "chrome-pk-foliar"
      ],
      "name": "كروم PK",
      "category": "التغذية النباتية",
      "subcategory": "فوسفيت ودعم الإجهاد",
      "crops": [
        "البصل",
        "البطاطس",
        "الطماطم",
        "الفلفل",
        "الباذنجان",
        "الخضر الورقية",
        "الموالح",
        "الزيتون",
        "العنب",
        "أشجار الفاكهة"
      ],
      "positioning": "سماد فوسفيت بوتاسيوم سائل عالي التركيز للرش الورقي، صُمم لدعم المناعة الداخلية للنبات وتحفيز آليات الدفاع الطبيعية، مع إمداد وظيفي بالفوسفيت والبوتاسيوم يساعد النبات على النمو المتوازن وتحسين جودة المحصول.",
      "registrationStatus": "مسجل ومتداول",
      "galleryImage": "/images/products/chrome-pk-gallery.png",
      "galleryImageAlt": "صورة كتالوج كروم PK",
      "detailImage": "/images/products/chrome-pk-detail.png",
      "detailImageAlt": "صورة منتج كروم PK فوسفيت بوتاسيوم للرش الورقي.",
      "facts": {
        "category": "أسمدة > فوسفيت ودعم المناعة الداخلية للنبات",
        "composition": "أحادي وثنائي فوسفيت البوتاسيوم 50% وزن/وزن؛ الفوسفور P₂O₅ 30% وزن/وزن؛ البوتاسيوم K₂O 20% وزن/وزن؛ مصدر الفوسفور: حمض الفوسفونيك / فوسفيت",
        "compositionRows": [
          {
            "ingredient": "أحادي وثنائي فوسفيت البوتاسيوم",
            "concentration": "50% وزن/وزن"
          },
          {
            "ingredient": "الفوسفور (P₂O₅)",
            "concentration": "30% وزن/وزن"
          },
          {
            "ingredient": "البوتاسيوم (K₂O)",
            "concentration": "20% وزن/وزن"
          },
          {
            "ingredient": "مصدر الفوسفور",
            "concentration": "حمض الفوسفونيك / فوسفيت"
          }
        ],
        "formulation": "SL - سماد سائل للرش الورقي",
        "targetCrop": "الخضر، البصل، البطاطس، الطماطم، الفلفل، الباذنجان، الخضر الورقية، العنب، الموالح، الزيتون، وأشجار الفاكهة",
        "target": "تحفيز آليات الدفاع الطبيعية، دعم مقاومة النبات ضد مسببات الأمراض الفطرية، تحسين تحمل الإجهاد، ودعم جودة العقد والثمار",
        "supplier": "Eurogro - Greece",
        "registrationStatus": "مسجل بوزارة الزراعة المصرية ومتداول في السوق"
      },
      "overview": "كروم PK يقدم الفوسفور في صورة فوسفيت، وهي صورة تختلف في وظيفتها عن الفوسفات التقليدي. الفوسفيت لا يُنظر إليه هنا كمصدر تغذية فوسفورية فقط، بل كعنصر وظيفي يساعد على تنشيط دفاعات النبات الداخلية ورفع جاهزيته لمواجهة الظروف التي تزيد من ضغط مسببات الأمراض الفطرية. تعمل تركيبة كروم PK على دعم النبات من خلال مسارين متكاملين: مسار دفاعي يرتبط بتحفيز آليات المقاومة الطبيعية داخل النبات، ومسار غذائي يوفر البوتاسيوم في صورة سهلة الامتصاص عبر الرش الورقي. لذلك يمثل كروم PK إضافة مهمة في برامج الخضر والفاكهة، خصوصاً في فترات الرطوبة العالية، النمو النشط، التزهير، العقد، والتحجيم.",
      "benefits": [
        {
          "title": "تحفيز المناعة الداخلية للنبات",
          "description": "يساعد كروم PK على تنشيط آليات الدفاع الطبيعية داخل النبات، مما يرفع جاهزية النبات للتعامل مع الظروف التي تزيد من ضغط الأمراض الفطرية."
        },
        {
          "title": "دعم مقاومة النبات ضد مسببات الأمراض الفطرية",
          "description": "يساهم الفوسفيت في دعم الاستجابات الدفاعية المرتبطة بمقاومة النبات، خاصة في المحاصيل المعرضة للبياض الزغبي والندوة المتأخرة."
        },
        {
          "title": "تنشيط إنتاج المركبات الدفاعية",
          "description": "يدعم كروم PK المسارات الداخلية المرتبطة بتكوين مركبات دفاعية مثل الفيتوألكسينات، وهي من المركبات التي ينتجها النبات طبيعياً للمساعدة في الحد من تطور الإصابة."
        },
        {
          "title": "دعم العقد وزيادة كفاءة الإزهار",
          "description": "يساعد استخدام كروم PK في مراحل التزهير والعقد على دعم الحالة الحيوية للنبات، مما ينعكس على كفاءة العقد وتحسين فرص الوصول إلى محصول أفضل."
        },
        {
          "title": "تحسين مواصفات الثمار",
          "description": "يساهم البوتاسيوم في تحسين انتقال السكريات من الأوراق إلى الثمار، مما يدعم اللون، الصلابة، الجودة التسويقية، وامتلاء الثمار خلال مراحل التحجيم والنضج."
        },
        {
          "title": "سهولة الدمج داخل البرامج",
          "description": "يمكن استخدام كروم PK ضمن برامج الرش الورقي القائمة مع كثير من المغذيات والمبيدات، مع ضرورة مراعاة تعليمات الخلط واختبار التوافق قبل الاستخدام."
        }
      ],
      "modeOfAction": {
        "title": "لماذا كروم PK؟",
        "description": "لأن النبات لا يحتاج فقط إلى عناصر غذائية، بل يحتاج في بعض المراحل إلى تنشيط قدرته الداخلية على المقاومة. في فترات الرطوبة العالية، النمو السريع، ضعف التهوية، أو زيادة ضغط الأمراض، يصبح دعم المناعة الداخلية للنبات جزءاً مهماً من نجاح البرنامج. كروم PK يقدم هذا الدور من خلال الفوسفيت الذي يساعد على تنبيه النبات وتحفيز دفاعاته الطبيعية، بجانب البوتاسيوم الذي يدعم الحيوية العامة، توازن الماء، انتقال السكريات، وجودة الثمار. لذلك لا يُعامل كروم PK كسماد PK تقليدي فقط، بل كمنتج تغذية وظيفية يساعد النبات على أن يكون أكثر استعداداً في الفترات الحرجة.",
        "image": "/images/products/chrome-pk-mode.png",
        "imageAlt": "حركة الفوسفيت في كروم PK",
        "points": [
          "قبل فترات الرطوبة العالية: لرفع جاهزية النبات وتنشيط دفاعاته الطبيعية قبل زيادة ضغط الأمراض.",
          "في مراحل النمو الخضري النشط: لدعم الحيوية العامة وتحسين كفاءة النبات في التعامل مع الإجهاد.",
          "قبل وأثناء التزهير: لدعم الحالة العامة للنبات وتحسين كفاءة الإزهار.",
          "بعد العقد وخلال التحجيم والنضج: لدعم بداية تكوين الثمار، الامتلاء، اللون، جودة الثمار، وتحسين الصفات التسويقية.",
          "بعد فترات الإجهاد: لمساعدة النبات على استعادة نشاطه ضمن برنامج تغذية متكامل."
        ]
      },
      "usageGuidance": [
        {
          "crop": "البصل",
          "target": "يستخدم لدعم النبات ضد ضغط الأمراض الفطرية، خاصة في مراحل النمو النشط وفترات الرطوبة.",
          "dose": "رش ورقي: 2 - 3 سم³ / لتر ماء.",
          "foliarDose": "2 - 3 سم³ / لتر ماء",
          "timing": "يمكن استخدامه قبل الزراعة أو مع بداية تكوين الدرنات حسب البرنامج الفني.",
          "interval": "يمكن تكرار المعاملة كل 10 - 14 يوماً حسب حالة النبات وضغط المرض والبرنامج المستخدم.",
          "recommendation": "يفضل استخدامه وقائياً قبل فترات الخطورة، أو عند بداية الظروف المناسبة لانتشار الأمراض."
        },
        {
          "crop": "البطاطس",
          "target": "مناسب لدعم النبات خلال مراحل النمو الخضري، بداية تكوين الدرنات، والتحجيم.",
          "dose": "رش ورقي: 2.5 - 3 سم³ / لتر ماء.",
          "foliarDose": "2.5 - 3 سم³ / لتر ماء",
          "timing": "يستخدم خلال مراحل النمو الخضري وبداية تكوين الدرنات والتحجيم.",
          "interval": "كل 10 - 14 يوماً حسب حالة النبات وضغط المرض والبرنامج المستخدم.",
          "recommendation": "يساعد في تقوية الحالة العامة للنبات ضمن برامج الوقاية المتكاملة."
        },
        {
          "crop": "الطماطم والفلفل والباذنجان",
          "target": "يستخدم في الزراعات الشتوية والربيعية لدعم مقاومة النبات ضد الندوة المتأخرة وضغط الأمراض الفطرية.",
          "dose": "رش ورقي: 2.5 - 3 سم³ / لتر ماء.",
          "foliarDose": "2.5 - 3 سم³ / لتر ماء",
          "timing": "يستخدم قبل فترات الخطورة أو مع بداية الظروف المناسبة لضغط الأمراض.",
          "interval": "كل 10 - 14 يوماً، ويمكن تقصير الفاصل في فترات الضغط العالي طبقاً لتوصيات المهندس المختص.",
          "recommendation": "يجب دمجه داخل برنامج وقائي متكامل ولا يعتبر بديلاً عن المبيدات الفطرية المسجلة عند وجود إصابة."
        },
        {
          "crop": "الخضر الورقية",
          "target": "مناسب لدعم النبات في فترات الرطوبة العالية وتحسين جاهزيته ضد ضغط الأمراض، خاصة البياض الزغبي.",
          "dose": "رش ورقي: 3 - 3.5 سم³ / لتر ماء.",
          "foliarDose": "3 - 3.5 سم³ / لتر ماء",
          "timing": "يفضل قبل فترات الرطوبة العالية أو عند بداية الظروف المناسبة لانتشار الأمراض.",
          "interval": "كل 10 - 14 يوماً حسب حالة النبات وضغط المرض.",
          "recommendation": "يجب تحقيق تغطية جيدة للمجموع الخضري للحصول على أفضل استفادة من الرش الورقي."
        },
        {
          "crop": "الموالح",
          "target": "يستخدم خلال موسم التزهير والعقد لتحسين عقد الأزهار، كما يستخدم بعد وصول الثمرة إلى حجم 3 - 5 سم لدعم الجودة والمواصفات التسويقية.",
          "dose": "رش ورقي: 2.5 - 3 سم³ / لتر ماء.",
          "foliarDose": "2.5 - 3 سم³ / لتر ماء",
          "timing": "خلال موسم التزهير والعقد، وبعد وصول الثمرة إلى حجم 3 - 5 سم.",
          "interval": "حسب مرحلة النمو وبرنامج التغذية والوقاية المستخدم.",
          "recommendation": "ينصح بإدخاله داخل برنامج متكامل يشمل التغذية المتوازنة وإدارة الري والمتابعة المستمرة لضغط الأمراض."
        },
        {
          "crop": "الزيتون والعنب",
          "target": "يستخدم قبل بداية التزهير، وحول العقد، وعند وصول الثمرة إلى حجم 3 - 5 سم لدعم العقد وتحسين جودة الثمار.",
          "dose": "رش ورقي: 2.5 - 3 سم³ / لتر ماء.",
          "foliarDose": "2.5 - 3 سم³ / لتر ماء",
          "timing": "قبل بداية التزهير، حول العقد، وعند وصول الثمرة إلى حجم 3 - 5 سم.",
          "interval": "حسب حالة النبات وبرنامج الرش الورقي المستخدم.",
          "recommendation": "يدعم العقد وتحسين جودة الثمار ضمن برنامج تغذية ووقاية متكامل."
        }
      ],
      "documents": [
        {
          "type": "brochure",
          "title": "البروشور",
          "description": "ملف تعريفي يعرض فكرة كروم PK، آلية عمل فوسفيت البوتاسيوم، دوره في دعم مقاومة النبات، توصيات الاستخدام، ومعلومات الخلط بطريقة مناسبة للموزعين والعملاء.",
          "status": ""
        },
        {
          "type": "technical-sheet",
          "title": "النشرة الفنية",
          "description": "مرجع فني مختصر يوضح التركيب، صورة المنتج، معدلات الاستخدام، وإرشادات الخلط والتطبيق.",
          "status": "نعم"
        }
      ]
    },
    {
      "slug": "chrome-ca-b",
      "categorySlug": "specialty-fertilizers",
      "legacySlugs": [
        "chrome-cab",
        "chrome-ca-boron"
      ],
      "name": "كروم CaB",
      "category": "التغذية النباتية",
      "subcategory": "كالسيوم وبورون وعناصر صغرى",
      "crops": [
        "الخضر الثمرية",
        "العنب",
        "الموالح",
        "أشجار الفاكهة",
        "الفراولة",
        "البطاطس",
        "الخضر الورقية"
      ],
      "positioning": "سماد كالسيوم-بورون سائل مركز، صُمم لدعم المحاصيل في المراحل التي تحتاج فيها إلى بناء خلوي قوي، وتلقيح جيد، وعقد متوازن، وثمار أكثر صلابة وقابلية للتداول والتخزين.",
      "registrationStatus": "مسجل ومتداول",
      "galleryImage": "/images/products/chrome-ca-b-gallery.png",
      "galleryImageAlt": "صورة كتالوج كروم CaB",
      "detailImage": "/images/products/chrome-ca-b-detail.png",
      "detailImageAlt": "صورة منتج كروم CaB لتغذية الكالسيوم والبورون.",
      "facts": {
        "category": "أسمدة > كالسيوم وبورون وعناصر صغرى",
        "composition": "الكالسيوم CaO 11% وزن/حجم؛ البورون B 2.5% وزن/حجم",
        "compositionRows": [
          {
            "ingredient": "الكالسيوم CaO",
            "concentration": "11% وزن/حجم"
          },
          {
            "ingredient": "البورون B",
            "concentration": "2.5% وزن/حجم"
          }
        ],
        "formulation": "SL - سماد سائل للرش الورقي",
        "targetCrop": "الخضر الثمرية، العنب، الموالح، أشجار الفاكهة، الفراولة، البطاطس، والخضر الورقية",
        "target": "تحسين التلقيح والعقد، رفع صلابة الثمار",
        "supplier": "Nature SA - Greece",
        "registrationStatus": "مسجل بوزارة الزراعة المصرية ومتداول في السوق"
      },
      "overview": "كروم CaB سماد كالسيوم-بورون متخصص لإمداد النبات باحتياجاته من الكالسيوم والبورون في المراحل الحساسة، حيث يساهم الكالسيوم في بناء أنسجة قوية وثمار أكثر تماسكاً، بينما يدعم البورون التلقيح، وانتقال السكريات، وتوازن النموات الحديثة. لذلك يُعد كروم CaB إضافة مهمة ضمن برامج التغذية، خاصة في المحاصيل المعرضة لمشكلات ضعف العقد، التشقق، عفن الطرف الزهري، لين الثمار، أو تراجع جودة ما بعد الحصاد.",
      "benefits": [
        {
          "title": "دعم صلابة الثمار",
          "description": "يساعد الكالسيوم على تعزيز تماسك الأنسجة وتقوية جدر الخلايا، مما ينعكس على زيادة صلابة الثمار وتحسين قدرتها على التحمل أثناء التداول والتخزين."
        },
        {
          "title": "تحسين التزهير والتلقيح",
          "description": "يساهم البورون في حيوية التزهير واستطالة أنبوبة اللقاح، مما يدعم نجاح التلقيح وبداية العقد."
        },
        {
          "title": "رفع كفاءة العقد",
          "description": "الجمع بين الكالسيوم والبورون يساعد النبات في المراحل الحساسة من التزهير حتى بداية تكوين الثمار."
        },
        {
          "title": "المساعدة في الحد من عفن الطرف الزهري",
          "description": "يساعد على دعم إمداد الثمار بالكالسيوم خلال المراحل الحرجة من النمو ويحد من ظهور عفن الطرف الزهري، خاصة في الطماطم والفلفل والمحاصيل الحساسة لنقص الكالسيوم."
        }
      ],
      "modeOfAction": {
        "title": "لماذا كروم CaB؟",
        "description": "لأن الكالسيوم عنصر محدود الحركة داخل النبات ولا ينتقل بسهولة من الأوراق القديمة إلى النموات والثمار الحديثة، لذلك يحتاج النبات إلى إمداد منتظم بالكالسيوم خلال مراحل النمو السريع. وفي نفس الوقت يكون البورون مهماً قبل وأثناء التزهير وبداية العقد، لأنه يرتبط بالتلقيح وانتقال السكريات وتكوين أنسجة أكثر توازناً. يجمع كروم CaB العنصرين في توقيت واحد ليخدم هدفين أساسيين: بناء أنسجة أقوى، وتحسين كفاءة التلقيح والعقد وجودة الثمار.",
        "image": "/images/products/chrome-ca-b-mode.svg",
        "imageAlt": "آلية عمل كروم CaB كالسيوم بورون",
        "points": [
          "قبل التزهير: لدعم جاهزية النبات وتحسين حيوية التزهير.",
          "أثناء التزهير وبداية العقد: لدعم التلقيح والعقد وتقليل أثر الإجهاد في هذه المرحلة الحساسة.",
          "بعد العقد وخلال التحجيم السريع: لدعم بناء الخلايا وصلابة الثمار وتقليل مخاطر التشقق والمشكلات الفسيولوجية.",
          "قبل الحصاد بفترة مناسبة: لتحسين الصلابة وجودة التداول والتخزين، طبقاً لطبيعة المحصول وبرنامج التغذية."
        ]
      },
      "usageGuidance": [
        {
          "crop": "الخضر الثمرية",
          "target": "الطماطم، الفلفل، الخيار، الباذنجان. يستخدم لدعم التلقيح والعقد وتقليل التشقق وعفن الطرف الزهري.",
          "dose": "رش ورقي: 2 - 3 سم³ / لتر ماء.",
          "foliarDose": "2 - 3 سم³ / لتر ماء",
          "timing": "يفضل قبل التزهير، أثناء التزهير، بعد العقد، وخلال التحجيم السريع.",
          "interval": "يكرر كل 10 - 15 يوماً، ويمكن تقصير الفترة إلى 7 - 10 أيام حول التزهير والعقد والتحجيم السريع عند ارتفاع الاحتياج.",
          "recommendation": "يفضل الرش في الصباح الباكر أو بعد العصر، مع تجنب الرش أثناء الحرارة العالية أو على نباتات مجهدة بشدة."
        },
        {
          "crop": "العنب ومحاصيل الكروم",
          "target": "لدعم العقد وصلابة الحبات وجودة ما بعد الحصاد.",
          "dose": "رش ورقي: 2 - 3 سم³ / لتر ماء.",
          "foliarDose": "2 - 3 سم³ / لتر ماء",
          "timing": "قبل التزهير، بعد العقد، وخلال نمو الحبات.",
          "interval": "يراعى عدم ترك فواصل طويلة بين الرشات في مرحلة التحجيم السريع.",
          "recommendation": "يستخدم ضمن برنامج تغذية متكامل لدعم جودة الحبات وقابلية التداول."
        },
        {
          "crop": "أشجار الفاكهة والموالح",
          "target": "لتحسين الصلابة والجودة وتقليل التشقق ودعم احتياجات الكالسيوم والبورون.",
          "dose": "رش ورقي: 2 - 3 سم³ / لتر ماء.",
          "foliarDose": "2 - 3 سم³ / لتر ماء",
          "timing": "يستخدم من قبل التزهير حتى نمو الثمار، وفي نوافذ الجودة قبل الحصاد.",
          "interval": "حسب طبيعة المحصول وبرنامج التغذية.",
          "recommendation": "لا يُخلط مباشرة مع الفوسفات أو الكبريتات أو المواد شديدة القلوية إلا بعد إجراء اختبار توافق."
        },
        {
          "crop": "الفراولة",
          "target": "لدعم التزهير والعقد وصلابة الثمار وتحسين تحمل التداول.",
          "dose": "رش ورقي: 2 - 3 سم³ / لتر ماء.",
          "foliarDose": "2 - 3 سم³ / لتر ماء",
          "timing": "يفضل استخدامه من بداية التزهير وحتى مراحل تكوين الثمار.",
          "interval": "يكرر حسب حالة النبات وشدة الاحتياج داخل البرنامج الفني.",
          "recommendation": "يجب تحقيق تغطية جيدة للمجموع الخضري خاصة في مراحل التزهير والعقد والتحجيم."
        },
        {
          "crop": "البطاطس والخضر الورقية",
          "target": "لدعم سلامة الأنسجة وتقليل آثار نقص الكالسيوم والبورون، خاصة في ظروف النمو السريع أو الإجهاد.",
          "dose": "رش ورقي: 2 - 3 سم³ / لتر ماء.",
          "foliarDose": "2 - 3 سم³ / لتر ماء",
          "timing": "يستخدم أثناء مراحل النمو النشط وعند الحاجة إلى دعم سلامة الأنسجة.",
          "interval": "يكرر وفقاً للبرنامج وحالة المحصول.",
          "recommendation": "يفضل إجراء تجربة خلط صغيرة قبل الاستخدام في الخزان، خاصة عند الخلط مع مبيدات أو مغذيات أخرى."
        }
      ],
      "documents": [
        {
          "title": "البروشور",
          "description": "ملف تعريفي يعرض فكرة المنتج واستخداماته الأساسية والرسائل الفنية والتجارية المناسبة للموزعين والعملاء.",
          "status": ""
        },
        {
          "title": "النشرة الفنية",
          "description": "مرجع فني مختصر يوضح التركيب والصيغة ومعدلات الاستخدام والتوافق والنقاط الفنية الأساسية للمنتج.",
          "status": ""
        }
      ]
    },
    {
      "slug": "tesla",
      "categorySlug": "specialty-fertilizers",
      "legacySlugs": [
        "tesla-potassium-silicate"
      ],
      "name": "تيسلا سيليكات البوتاسيوم",
      "category": "التغذية النباتية",
      "subcategory": "بوتاسيوم وسيليكون",
      "crops": [
        "الطماطم",
        "الفلفل",
        "الخيار",
        "الباذنجان",
        "العنب",
        "الموالح",
        "التفاح",
        "الكمثرى",
        "الفراولة",
        "البطاطس",
        "الخضر الورقية"
      ],
      "positioning": "سماد سيليكات بوتاسيوم سائل يحتوي على 17.3% K₂O مع سيليكون متاح حيوياً، لدعم الصلابة البنيوية وتحمل الإجهاد وجودة الثمار.",
      "registrationStatus": "مسجل ومتداول",
      "galleryImage": "/images/products/tesla-gallery.png",
      "galleryImageAlt": "صورة كتالوج تيسلا سيليكات البوتاسيوم",
      "detailImage": "/images/products/tesla-detail.png",
      "detailImageAlt": "صورة منتج تيسلا سيليكات البوتاسيوم.",
      "facts": {
        "category": "أسمدة > بوتاسيوم وسيليكون",
        "composition": "البوتاسيوم (K2O) 17.3% حجم/حجم؛ مصدر السيليكون: سيليكات بوتاسيوم - SiO3 متاح حيوياً",
        "compositionRows": [
          {
            "ingredient": "البوتاسيوم (K₂O)",
            "concentration": "17.3% حجم/حجم"
          },
          {
            "ingredient": "مصدر السيليكون",
            "concentration": "سيليكات بوتاسيوم - SiO₃ متاح حيوياً"
          }
        ],
        "formulation": "SL - سماد سائل للرش الورقي",
        "targetCrop": "الخضر والعنب والفاكهة والموالح والزراعات المحمية",
        "target": "تقوية الأنسجة، دعم الإجهاد، تنظيم الثغور، وجودة الثمار",
        "supplier": "Eurogro - Greece",
        "registrationStatus": "مسجل بوزارة الزراعة المصرية ومتداول في السوق"
      },
      "overview": "تيسلا سماد سيليكات بوتاسيوم سائل للاستخدام الورقي وبرامج التسميد، يوفر البوتاسيوم لدعم الاتزان الأسموزي وتحميل السكريات، مع ترسيب السيليكون داخل الأنسجة لتقوية الأسطح النباتية ودعم تحمل الحرارة والملوحة ونقص المياه والرقاد والإجهاد الميكانيكي.",
      "benefits": [
        {
          "title": "تدعيم بنيوي بالسيليكون",
          "description": "ترسيب السيليكون يقوي البشرة والأنسجة الوعائية ويقلل فقد الماء غير الثغري ويزيد الصلابة."
        },
        {
          "title": "مخزن ضد الإجهاد غير الحيوي",
          "description": "يجمع بين تدعيم السيليكون وإمداد البوتاسيوم لمواجهة الحرارة والملوحة والجفاف ونقص المياه."
        },
        {
          "title": "دعم مقاومة سلبية للأمراض",
          "description": "الأنسجة المدعمة بالسيليكون تعمل كحاجز مادي يجعل اختراق المسببات المرضية أكثر صعوبة."
        },
        {
          "title": "بوتاسيوم سريع في المراحل الحرجة",
          "description": "يدعم تنظيم الثغور وامتلاء الخلايا وتحميل السكريات والبركس واللون."
        },
        {
          "title": "مساهمة في جودة الحصاد",
          "description": "يساعد على الصلابة والعمر التسويقي وتحمل الضغط والخدوش أثناء التداول."
        }
      ],
      "modeOfAction": {
        "title": "درع سيليكون وقوة بوتاسيوم",
        "description": "بعد الامتصاص يترسب السيليكون في البشرة والأنسجة الوعائية مكوناً طبقة تدعيمية، بينما يبقى البوتاسيوم أكثر حركة لدعم تنظيم الثغور والاتزان الأسموزي وانتقال السكريات أثناء الإجهاد وتطور الثمار.",
        "image": "/images/products/tesla-mode.svg",
        "imageAlt": "آلية عمل تيسلا سيليكات البوتاسيوم",
        "points": [
          "ترسيب السيليكون تراكمي؛ كل معاملة منتظمة تضيف طبقة تدعيمية جديدة للأنسجة.",
          "البوتاسيوم يساعد في الحفاظ على الامتلاء الخلوي ونشاط الإنزيمات وتحميل السكريات تحت الإجهاد.",
          "المنتج عالي القلوية؛ يفضل ضبط pH الماء وتجنب الخلط مع الكالسيوم أو الفوسفات إلا بعد اختبار توافق."
        ]
      },
      "usageGuidance": [
        {
          "crop": "الخضروات",
          "target": "الطماطم والفلفل والخيار والباذنجان والبطاطس والخضر الورقية: دعم الإجهاد وصلابة الأنسجة.",
          "dose": "1-2 سم³ / لتر ماء",
          "timing": "من التأسيس حتى العقد والتحجيم المبكر، وقبل موجات الحرارة أو الملوحة أو خطورة المرض.",
          "interval": "كل 10-14 يوماً؛ تقصر إلى 7-10 أيام عند الإجهاد العالي أو التحجيم السريع.",
          "recommendation": "تغطية كاملة للمجموع الخضري خصوصاً الأوراق الحديثة والقمم النامية."
        },
        {
          "crop": "العنب ومحاصيل الكروم",
          "target": "تقوية الأنسجة وصلابة الحبات ودعم الإجهاد والجودة.",
          "dose": "1-2 سم³ / لتر ماء",
          "timing": "قبل نوافذ الإجهاد وخلال تطور الثمار.",
          "interval": "كل 10-14 يوماً حسب البرنامج.",
          "recommendation": "لا يقيم تيسلا كمصدر بوتاسيوم فقط؛ مساهمة السيليكون هي عنصر التميز."
        },
        {
          "crop": "أشجار الفاكهة والموالح والفراولة والزراعات المحمية",
          "target": "الصلابة واللون وجودة ما بعد الحصاد ودعم الإجهاد.",
          "dose": "1-2 سم³ / لتر ماء",
          "timing": "قبل الحرارة/الملوحة، وعند العقد والتحجيم وقبل نوافذ الجودة قبل الحصاد.",
          "interval": "كل 10-14 يوماً مع الدمج المبكر في برامج الصوب.",
          "recommendation": "منتج عالي pH؛ يجب إدارة pH الخزان وإجراء اختبار توافق قبل الخلط."
        }
      ],
      "documents": [
        {
          "title": "البروشور",
          "description": "ملف تعريفي يعرض فكرة المنتج واستخداماته الأساسية والرسائل الفنية والتجارية المناسبة للموزعين والعملاء.",
          "status": ""
        },
        {
          "title": "النشرة الفنية",
          "description": "مرجع فني مختصر يوضح التركيب والصيغة ومعدلات الاستخدام والتوافق والنقاط الفنية الأساسية للمنتج.",
          "status": ""
        }
      ]
    },
    {
      "slug": "fossil",
      "categorySlug": "specialty-fertilizers",
      "legacySlugs": [
        "fossil-400-sl"
      ],
      "name": "فوسيل 400 SL",
      "category": "التغذية النباتية",
      "subcategory": "أعشاب بحرية ومحفزات حيوية",
      "crops": [
        "الخضروات",
        "العنب",
        "الموالح",
        "أشجار الفاكهة",
        "المحاصيل التي تحتاج دعماً ضد الإجهاد"
      ],
      "positioning": "محفز حيوي سائل قائم على مستخلص طحالب Ascophyllum nodosum بنسبة 17% ومدعم بالسيتوكينين (كينيتين) بنسبة 0.4%، لدعم نشاط الجذور، وتحسين كفاءة الامتصاص، ومساعدة النبات على تجاوز الإجهاد، ودعم التزهير والعقد وجودة الثمار.",
      "registrationStatus": "مسجل ومتداول",
      "galleryImage": "/images/products/fossil-gallery.png",
      "galleryImageAlt": "صورة كتالوج فوسيل 400 SL",
      "detailImage": "/images/products/fossil-detail.png",
      "detailImageAlt": "عبوة فوسيل 400 SL مع مفهوم محفز حيوي قائم على الطحالب البحرية.",
      "facts": {
        "category": "أعشاب بحرية ومحفزات حيوية",
        "composition": "مستخلص Ascophyllum nodosum 17%؛ سيتوكينين (كينيتين) 0.4%",
        "compositionRows": [
          {
            "ingredient": "مستخلص Ascophyllum nodosum",
            "concentration": "17%"
          },
          {
            "ingredient": "سيتوكينين (كينيتين)",
            "concentration": "0.4%"
          }
        ],
        "formulation": "SL - سائل قابل للذوبان",
        "targetCrop": "الخضروات، العنب، الموالح، أشجار الفاكهة، والمحاصيل المعرضة للإجهاد",
        "target": "تنشيط الجذور، رفع كفاءة الامتصاص، دعم تحمل الإجهاد، تحسين العقد وجودة الثمار",
        "supplier": "Eurogro - Greece",
        "registrationStatus": "مسجل ومتداول"
      },
      "overview": "فوسيل 400 SL محفز حيوي سائل يعتمد على مستخلص مركز من طحالب Ascophyllum nodosum، مدعم بالسيتوكينين في صورة كينيتين. لا يعمل فوسيل كسماد NPK مباشر ولا كمبيد فطري، ولكن دوره الأساسي هو دعم فسيولوجيا النبات، وتنشيط الجذور، وتحسين كفاءة استخدام العناصر، ومساعدة النبات على التعافي من الإجهاد، مع دعم مراحل التزهير والعقد ونمو الثمار. يتكامل فوسيل 400 SL مع سيجنال NPK في برامج التغذية المرحلية؛ حيث يعمل فوسيل على تحسين الجاهزية الفسيولوجية وكفاءة الامتصاص، بينما يوفر سيجنال العناصر الغذائية الأساسية حسب مرحلة النمو.",
      "benefits": [
        {
          "title": "تنشيط المجموع الجذري",
          "description": "يساعد على تشجيع نمو الجذور الجانبية وتحسين قدرة النبات على امتصاص الماء والعناصر، خاصة في مراحل الشتل والتأسيس."
        },
        {
          "title": "رفع كفاءة امتصاص العناصر",
          "description": "يدعم استفادة النبات من برامج التغذية، خصوصاً عند استخدامه بجانب الأسمدة الذوابة مثل سيجنال NPK ضمن برنامج متوازن."
        },
        {
          "title": "تحمل الإجهاد والتعافي",
          "description": "يساعد النبات على تجاوز ظروف الحرارة، البرودة، الملوحة، الجفاف، وصدمة الشتل من خلال دعم التوازن الفسيولوجي داخل النبات."
        },
        {
          "title": "دعم التزهير والعقد",
          "description": "يساعد على تحسين جاهزية النبات قبل التزهير ودعم ثبات العقد وتقليل تساقط الأزهار والثمار الصغيرة."
        },
        {
          "title": "تحسين جودة الثمار",
          "description": "يدعم نمو الثمار وتحسين الحجم والتجانس والصلابة والتلوين ورفع محتوى السكر عند استخدامه في التوقيت المناسب."
        }
      ],
      "modeOfAction": {
        "title": "كيف يعمل فوسيل؟",
        "description": "نشاط طحلبي مع دقة السيتوكينين. يعتمد فوسيل على مزيج يجمع بين النشاط الحيوي الواسع لمستخلص الطحالب البحرية والدور الهرموني الموجه للسيتوكينين. مستخلص Ascophyllum nodosum يمد النبات بمركبات طبيعية مثل المانيتول، البيتينات، اللامينارين، الألجينات، ومركبات شبيهة بالأوكسينات، بينما يضيف السيتوكينين دعماً موجهاً لانقسام الخلايا، والحفاظ على نشاط المجموع الخضري، ودعم العقد ونمو الثمار.",
        "image": "/images/products/fossil-mode.svg",
        "imageAlt": "المسارات الحيوية لفوسيل 400 SL",
        "points": [
          "تأسيس جذري أقوى: يساعد على بناء مجموع جذري نشط في بداية الموسم، مما ينعكس على كفاءة الامتصاص وتحمل النبات للظروف الصعبة.",
          "توازن فسيولوجي وقت الإجهاد: يساعد النبات على الحفاظ على نشاطه الحيوي عند التعرض للحرارة أو الملوحة أو البرودة أو الجفاف.",
          "دعم طبيعي للمناعة النباتية: مركبات الطحالب مثل اللامينارين تساعد على تنبيه جاهزية النبات الدفاعية الطبيعية، دون اعتبار المنتج مبيداً فطرياً.",
          "دعم العقد ونمو الثمار: السيتوكينين يدعم انقسام الخلايا في الأنسجة النامية، مما يساعد في مراحل العقد وبداية نمو الثمار."
        ]
      },
      "usageTitle": "توصيات الاستخدام ومعدلات الإضافة",
      "usageIntro": "يستخدم فوسيل 400 SL رشا على المجموع الخضري خلال المراحل الفسيولوجية المهمة للنبات، خاصة عند التأسيس، وقبل التزهير، وأثناء العقد، وبعد موجات الإجهاد. يفضل الرش صباحا أو بعد العصر مع تغطية جيدة للنبات.",
      "usageGuidance": [
        {
          "crop": "محاصيل الخضر",
          "target": "تنشيط الجذور، دعم النمو الخضري، تحسين كفاءة الامتصاص، وتقليل أثر الإجهاد على التزهير والعقد",
          "dose": "50 - 75 سم³ / 100 لتر ماء",
          "foliarDose": "50 - 75 سم³ / 100 لتر ماء",
          "timing": "بعد الشتل أو اكتمال الإنبات، خلال النمو الخضري، قبل التزهير، وعند بداية العقد",
          "interval": "",
          "recommendation": ""
        },
        {
          "crop": "كرومات العنب",
          "target": "دعم النمو الخضري، تحسين جودة التزهير والعقد، تقليل تساقط الحبات، ومساعدة الكرمات على التعافي بعد الموسم",
          "dose": "50 - 75 سم³ / 100 لتر ماء",
          "foliarDose": "50 - 75 سم³ / 100 لتر ماء",
          "timing": "مع بداية النموات الربيعية، قبل التزهير، بعد ثبات العقد، وبعد جمع المحصول عند الحاجة",
          "interval": "",
          "recommendation": ""
        },
        {
          "crop": "أشجار الفاكهة والموالح",
          "target": "تنشيط الأشجار، تحسين جودة الأزهار والعقد، دعم نمو الثمار، والمساعدة على استعادة النشاط بعد الإجهاد",
          "dose": "30 - 50 سم³ / 100 لتر ماء",
          "foliarDose": "30 - 50 سم³ / 100 لتر ماء",
          "timing": "مع بداية النشاط الربيعي، قبل التزهير، بعد ثبات العقد، وبعد جمع المحصول",
          "interval": "",
          "recommendation": ""
        }
      ],
      "technicalNotesTitle": "إرشادات عامة للاستخدام",
      "technicalNotes": [
        "يفضل الرش في الصباح الباكر أو بعد العصر وتجنب الرش أثناء الحرارة العالية.",
        "يجب توفير تغطية متجانسة للمجموع الخضري لضمان أفضل استفادة.",
        "يمكن استخدامه ضمن برامج التغذية المرحلية بجانب الأسمدة الورقية المناسبة.",
        "ينصح بإجراء اختبار خلط قبل الاستخدام مع أي خليط جديد."
      ],
      "documents": [
        {
          "title": "البروشور",
          "description": "ملف تعريفي يعرض فكرة المنتج واستخداماته الأساسية والرسائل الفنية والتجارية المناسبة للموزعين والعملاء.",
          "status": ""
        },
        {
          "title": "النشرة الفنية",
          "description": "مرجع فني مختصر يوضح التركيب والصيغة ومعدلات الاستخدام والتوافق والنقاط الفنية الأساسية للمنتج.",
          "status": ""
        }
      ]
    },
    {
        "slug": "foliq-aminovigor",
        "categorySlug": "specialty-fertilizers",
        "legacySlugs": [
          "foliq-amino-vigor",
          "aminovigor"
        ],
        "name": "فولي كيو أمينو فيجور",
        "category": "التغذية النباتية",
        "subcategory": "تركيبات أحماض أمينية",
        "crops": [
          "الذرة",
          "الحبوب",
          "اللفت",
          "بنجر السكر",
          "الفاكهة",
          "الخضر"
        ],
        "positioning": "سماد/محفز حيوي يحتوي على أحماض أمينية نباتية المنشأ ومجموعة عناصر صغرى، مصمم لرفع مقاومة النبات للإجهاد ودعم عمليات التعافي.",
        "registrationStatus": "تحت التسجيل",
        "galleryImage": "/images/products/foliq-aminovigor-gallery.png",
        "galleryImageAlt": "صورة كتالوج فولي كيو أمينو فيجور",
        "detailImage": "/images/products/foliq-aminovigor-detail.png",
        "detailImageAlt": "عبوات فولي كيو أمينو فيجور البنفسجية مع خلفية نباتية ووسم Agrii Poland.",
        "facts": {
          "category": "Biostimulants / Foliar Fertilizers",
          "composition": "أحماض أمينية حرة نباتية 123 جم/لتر، نيتروجين 28 جم/لتر، حديد 22.6 جم/لتر، بورون 2.26، نحاس 5.65، منجنيز 5.65، موليبدنم 0.23، زنك 5.99 جم/لتر.",
          "formulation": "سماد سائل للرش الورقي والتطبيق مع الري.",
          "targetCrop": "جميع المحاصيل، خاصة المحاصيل التي تعرضت لإجهاد بيئي أو تحتاج تنشيطاً بعد الشتاء.",
          "target": "مقاومة الإجهاد غير الحيوي، تنشيط التعافي، دعم التزهير والتلقيح وتكوين الثمار.",
          "supplier": "Agrii Poland.",
          "registrationStatus": "تحت التسجيل ضمن محفظة أجروبست."
        },
        "overview": "فولي كيو أمينو فيجور يتموضع كمنتج إنقاذ وتنشيط بعد الإجهاد، حيث توفر الأحماض الأمينية النباتية والعناصر الصغرى استجابة سريعة تساعد النبات على استعادة النمو الطبيعي وتعزيز كفاءة التمثيل الضوئي.",
        "benefits": [
          {
            "title": "أحماض أمينية نباتية المنشأ ذات نشاط حيوي مرتفع",
            "description": "أحماض أمينية نباتية المنشأ ذات نشاط حيوي مرتفع."
          },
          {
            "title": "يدعم التعافي بعد الصقيع، الجفاف، البرد، الحرارة أو ضرر",
            "description": "يدعم التعافي بعد الصقيع، الجفاف، البرد، الحرارة أو ضرر المبيدات."
          },
          {
            "title": "غني بعناصر صغرى مهمة للنمو والتمثيل الضوئي",
            "description": "غني بعناصر صغرى مهمة للنمو والتمثيل الضوئي."
          },
          {
            "title": "يحسن خواص محلول الرش والالتصاق على السطح النباتي",
            "description": "يحسن خواص محلول الرش والالتصاق على السطح النباتي."
          },
          {
            "title": "مناسب للاستخدام الوقائي أو التدخلي",
            "description": "مناسب للاستخدام الوقائي أو التدخلي."
          },
          {
            "title": "يمكن استخدامه ورقياً أو مع الري وفق البرنامج",
            "description": "يمكن استخدامه ورقياً أو مع الري وفق البرنامج."
          }
        ],
        "modeOfAction": {
          "title": "لماذا فولي كيو أمينو فيجور؟",
          "description": "فولي كيو أمينو فيجور يتموضع كمنتج إنقاذ وتنشيط بعد الإجهاد، حيث توفر الأحماض الأمينية النباتية والعناصر الصغرى استجابة سريعة تساعد النبات على استعادة النمو الطبيعي وتعزيز كفاءة التمثيل الضوئي.",
          "image": "/images/products/foliq-aminovigor-mode.svg",
          "imageAlt": "شرح تموضع فولي كيو أمينو فيجور",
          "points": [
            "أحماض أمينية نباتية المنشأ ذات نشاط حيوي مرتفع.",
            "يدعم التعافي بعد الصقيع، الجفاف، البرد، الحرارة أو ضرر المبيدات.",
            "غني بعناصر صغرى مهمة للنمو والتمثيل الضوئي."
          ]
        },
        "usageGuidance": [
          {
            "crop": "الذرة",
            "target": "تنشيط النبات ودعم التعافي من الإجهاد.",
            "dose": "غالباً 2–3 لتر/هكتار؛ للمشاتل يمكن استخدام محلول 1% قبل الزراعة؛ وتوجد توصيات 0.1–0.2% لبعض الاستخدامات الخاصة وفق الكتالوج.",
            "timing": "بعد زوال الإجهاد، في بداية النشاط الربيعي، قبل التزهير أو عند الحاجة لتنشيط النمو.",
            "interval": "رش ورقي؛ ويمكن استخدامه في التربة/الري وفق التوصية.",
            "recommendation": "يفضل استخدامه مع برنامج تغذية متوازن وعدم الاعتماد عليه وحده لعلاج نقص عنصر محدد."
          },
          {
            "crop": "الحبوب",
            "target": "تنشيط النبات ودعم التعافي من الإجهاد.",
            "dose": "غالباً 2–3 لتر/هكتار؛ للمشاتل يمكن استخدام محلول 1% قبل الزراعة؛ وتوجد توصيات 0.1–0.2% لبعض الاستخدامات الخاصة وفق الكتالوج.",
            "timing": "بعد زوال الإجهاد، في بداية النشاط الربيعي، قبل التزهير أو عند الحاجة لتنشيط النمو.",
            "interval": "رش ورقي؛ ويمكن استخدامه في التربة/الري وفق التوصية.",
            "recommendation": "يفضل استخدامه مع برنامج تغذية متوازن وعدم الاعتماد عليه وحده لعلاج نقص عنصر محدد."
          },
          {
            "crop": "اللفت",
            "target": "تنشيط النبات ودعم التعافي من الإجهاد.",
            "dose": "غالباً 2–3 لتر/هكتار؛ للمشاتل يمكن استخدام محلول 1% قبل الزراعة؛ وتوجد توصيات 0.1–0.2% لبعض الاستخدامات الخاصة وفق الكتالوج.",
            "timing": "بعد زوال الإجهاد، في بداية النشاط الربيعي، قبل التزهير أو عند الحاجة لتنشيط النمو.",
            "interval": "رش ورقي؛ ويمكن استخدامه في التربة/الري وفق التوصية.",
            "recommendation": "يفضل استخدامه مع برنامج تغذية متوازن وعدم الاعتماد عليه وحده لعلاج نقص عنصر محدد."
          },
          {
            "crop": "بنجر السكر",
            "target": "تنشيط النبات ودعم التعافي من الإجهاد.",
            "dose": "غالباً 2–3 لتر/هكتار؛ للمشاتل يمكن استخدام محلول 1% قبل الزراعة؛ وتوجد توصيات 0.1–0.2% لبعض الاستخدامات الخاصة وفق الكتالوج.",
            "timing": "بعد زوال الإجهاد، في بداية النشاط الربيعي، قبل التزهير أو عند الحاجة لتنشيط النمو.",
            "interval": "رش ورقي؛ ويمكن استخدامه في التربة/الري وفق التوصية.",
            "recommendation": "يفضل استخدامه مع برنامج تغذية متوازن وعدم الاعتماد عليه وحده لعلاج نقص عنصر محدد."
          },
          {
            "crop": "أشجار الفاكهة",
            "target": "تنشيط النبات ودعم التعافي من الإجهاد.",
            "dose": "غالباً 2–3 لتر/هكتار؛ للمشاتل يمكن استخدام محلول 1% قبل الزراعة؛ وتوجد توصيات 0.1–0.2% لبعض الاستخدامات الخاصة وفق الكتالوج.",
            "timing": "بعد زوال الإجهاد، في بداية النشاط الربيعي، قبل التزهير أو عند الحاجة لتنشيط النمو.",
            "interval": "رش ورقي؛ ويمكن استخدامه في التربة/الري وفق التوصية.",
            "recommendation": "يفضل استخدامه مع برنامج تغذية متوازن وعدم الاعتماد عليه وحده لعلاج نقص عنصر محدد."
          },
          {
            "crop": "الفراولة",
            "target": "تنشيط النبات ودعم التعافي من الإجهاد.",
            "dose": "غالباً 2–3 لتر/هكتار؛ للمشاتل يمكن استخدام محلول 1% قبل الزراعة؛ وتوجد توصيات 0.1–0.2% لبعض الاستخدامات الخاصة وفق الكتالوج.",
            "timing": "بعد زوال الإجهاد، في بداية النشاط الربيعي، قبل التزهير أو عند الحاجة لتنشيط النمو.",
            "interval": "رش ورقي؛ ويمكن استخدامه في التربة/الري وفق التوصية.",
            "recommendation": "يفضل استخدامه مع برنامج تغذية متوازن وعدم الاعتماد عليه وحده لعلاج نقص عنصر محدد."
          },
          {
            "crop": "الخضر",
            "target": "تنشيط النبات ودعم التعافي من الإجهاد.",
            "dose": "غالباً 2–3 لتر/هكتار؛ للمشاتل يمكن استخدام محلول 1% قبل الزراعة؛ وتوجد توصيات 0.1–0.2% لبعض الاستخدامات الخاصة وفق الكتالوج.",
            "timing": "بعد زوال الإجهاد، في بداية النشاط الربيعي، قبل التزهير أو عند الحاجة لتنشيط النمو.",
            "interval": "رش ورقي؛ ويمكن استخدامه في التربة/الري وفق التوصية.",
            "recommendation": "يفضل استخدامه مع برنامج تغذية متوازن وعدم الاعتماد عليه وحده لعلاج نقص عنصر محدد."
          },
          {
            "crop": "محاصيل المشاتل",
            "target": "تنشيط النبات ودعم التعافي من الإجهاد.",
            "dose": "غالباً 2–3 لتر/هكتار؛ للمشاتل يمكن استخدام محلول 1% قبل الزراعة؛ وتوجد توصيات 0.1–0.2% لبعض الاستخدامات الخاصة وفق الكتالوج.",
            "timing": "بعد زوال الإجهاد، في بداية النشاط الربيعي، قبل التزهير أو عند الحاجة لتنشيط النمو.",
            "interval": "رش ورقي؛ ويمكن استخدامه في التربة/الري وفق التوصية.",
            "recommendation": "يفضل استخدامه مع برنامج تغذية متوازن وعدم الاعتماد عليه وحده لعلاج نقص عنصر محدد."
          }
        ],
        "documents": [
          {
            "title": "البروشور",
            "description": "ملف تعريفي يعرض فكرة المنتج واستخداماته الأساسية وأهم الرسائل الفنية والتجارية بطريقة مناسبة للموزعين والعملاء.",
            "status": "نعم / كتالوج فولي كيو"
          },
          {
            "title": "الملصق",
            "description": "مرجع الملصق المحلي والاستخدامات المعتمدة.",
            "status": "لا / بعد التسجيل"
          },
          {
            "title": "النشرة الفنية",
            "description": "مرجع فني مختصر يوضح التركيب والصيغة ومعدلات الاستخدام والنقاط الفنية الأساسية التي تساعد على تقديم المنتج بصورة دقيقة.",
            "status": "نعم"
          },
          {
            "title": "الشهادات",
            "description": "الشهادات والملفات الرسمية لنقاشات الشركاء.",
            "status": "عند الطلب"
          }
        ]
      },
    {
        "slug": "foliq-ascovigor",
        "categorySlug": "specialty-fertilizers",
        "legacySlugs": [
          "foliq-asco-vigor",
          "ascovigor"
        ],
        "name": "فولي كيو أسكو فيجور",
        "category": "التغذية النباتية",
        "subcategory": "أعشاب بحرية ومحفزات حيوية",
        "crops": [
          "الحبوب",
          "اللفت",
          "بنجر السكر",
          "الذرة",
          "الفاكهة",
          "الخضر"
        ],
        "positioning": "سماد خاص مركز يحتوي على مستخلص طحالب Ascophyllum nodosum غني بالمواد الطبيعية المحفزة، مع بورون ومنجنيز وزنك لدعم النمو والتزهير والعقد.",
        "registrationStatus": "تحت التسجيل",
        "galleryImage": "/images/products/foliq-ascovigor-gallery.png",
        "galleryImageAlt": "صورة كتالوج فولي كيو أسكو فيجور",
        "detailImage": "/images/products/foliq-ascovigor-detail.png",
        "detailImageAlt": "عبوات فولي كيو أسكو فيجور مع خلفية خضراء/مزرعة وشعار Agrii.",
        "facts": {
          "category": "Biostimulants / Growth Stimulation Fertilizers",
          "composition": "مستخلص Ascophyllum nodosum 144.9 جم/لتر، بورون 37.1 جم/لتر، منجنيز 10 جم/لتر، زنك 6.1 جم/لتر، نيتروجين 30 جم/لتر.",
          "formulation": "سماد سائل مركز للرش الورقي، ويمكن استخدامه مع الري حسب التوصية.",
          "targetCrop": "الحبوب، اللفت، بنجر السكر، الذرة، أشجار الفاكهة، الفراولة، العنب، الطماطم والفلفل والخيار والقرعيات.",
          "target": "تنشيط النمو، التوازن الهرموني، التزهير والتلقيح، نمو الجذور، مقاومة الإجهاد.",
          "supplier": "Agrii Poland.",
          "registrationStatus": "تحت التسجيل ضمن محفظة أجروبست."
        },
        "overview": "فولي كيو أسكو فيجور مناسب للمراحل التي يحتاج فيها النبات دفعة فسيولوجية قوية، لأنه يجمع بين الهرمونات الطبيعية الموجودة في الطحالب والعناصر الصغرى المرتبطة بالتزهير والتلقيح وجودة الثمار.",
        "benefits": [
          {
            "title": "تركيز مرتفع من مستخلص الطحالب البحرية",
            "description": "تركيز مرتفع من مستخلص الطحالب البحرية."
          },
          {
            "title": "يدعم التزهير والتلقيح وتكوين الثمار والبذور",
            "description": "يدعم التزهير والتلقيح وتكوين الثمار والبذور."
          },
          {
            "title": "يحسن نمو الجذور وتراكم المواد الاحتياطية",
            "description": "يحسن نمو الجذور وتراكم المواد الاحتياطية."
          },
          {
            "title": "يرفع تحمل النبات للإجهاد المائي والحراري",
            "description": "يرفع تحمل النبات للإجهاد المائي والحراري."
          },
          {
            "title": "مدعم بالبورون والمنجنيز والزنك",
            "description": "مدعم بالبورون والمنجنيز والزنك."
          },
          {
            "title": "مناسب لمحاصيل حقلية وبستانية متعددة",
            "description": "مناسب لمحاصيل حقلية وبستانية متعددة."
          }
        ],
        "modeOfAction": {
          "title": "لماذا فولي كيو أسكو فيجور؟",
          "description": "فولي كيو أسكو فيجور مناسب للمراحل التي يحتاج فيها النبات دفعة فسيولوجية قوية، لأنه يجمع بين الهرمونات الطبيعية الموجودة في الطحالب والعناصر الصغرى المرتبطة بالتزهير والتلقيح وجودة الثمار.",
          "image": "/images/products/foliq-ascovigor-mode.svg",
          "imageAlt": "شرح تموضع فولي كيو أسكو فيجور",
          "points": [
            "تركيز مرتفع من مستخلص الطحالب البحرية.",
            "يدعم التزهير والتلقيح وتكوين الثمار والبذور.",
            "يحسن نمو الجذور وتراكم المواد الاحتياطية."
          ]
        },
        "usageGuidance": [
          {
            "crop": "الحبوب",
            "target": "تنشيط النمو والتزهير وتحسين العقد ومقاومة الإجهاد.",
            "dose": "2–3 لتر/هكتار لمعظم المحاصيل؛ 3 لتر/هكتار للفراولة والعنب؛ للخضر مثل الطماطم والفلفل والخيار 2.5 لتر/هكتار أو 0.25% وفق الكتالوج.",
            "timing": "في بداية النمو، قبل وأثناء التزهير، أثناء العقد ونمو الثمار، وبعد فترات الإجهاد.",
            "interval": "رش ورقي، ويمكن استخدامه بالتربة/الري إذا أقر البرنامج.",
            "recommendation": "يفضل دمجه في برنامج تغذية متوازن مع مراعاة اختبار الخلط."
          },
          {
            "crop": "اللفت",
            "target": "تنشيط النمو والتزهير وتحسين العقد ومقاومة الإجهاد.",
            "dose": "2–3 لتر/هكتار لمعظم المحاصيل؛ 3 لتر/هكتار للفراولة والعنب؛ للخضر مثل الطماطم والفلفل والخيار 2.5 لتر/هكتار أو 0.25% وفق الكتالوج.",
            "timing": "في بداية النمو، قبل وأثناء التزهير، أثناء العقد ونمو الثمار، وبعد فترات الإجهاد.",
            "interval": "رش ورقي، ويمكن استخدامه بالتربة/الري إذا أقر البرنامج.",
            "recommendation": "يفضل دمجه في برنامج تغذية متوازن مع مراعاة اختبار الخلط."
          },
          {
            "crop": "بنجر السكر",
            "target": "تنشيط النمو والتزهير وتحسين العقد ومقاومة الإجهاد.",
            "dose": "2–3 لتر/هكتار لمعظم المحاصيل؛ 3 لتر/هكتار للفراولة والعنب؛ للخضر مثل الطماطم والفلفل والخيار 2.5 لتر/هكتار أو 0.25% وفق الكتالوج.",
            "timing": "في بداية النمو، قبل وأثناء التزهير، أثناء العقد ونمو الثمار، وبعد فترات الإجهاد.",
            "interval": "رش ورقي، ويمكن استخدامه بالتربة/الري إذا أقر البرنامج.",
            "recommendation": "يفضل دمجه في برنامج تغذية متوازن مع مراعاة اختبار الخلط."
          },
          {
            "crop": "الذرة",
            "target": "تنشيط النمو والتزهير وتحسين العقد ومقاومة الإجهاد.",
            "dose": "2–3 لتر/هكتار لمعظم المحاصيل؛ 3 لتر/هكتار للفراولة والعنب؛ للخضر مثل الطماطم والفلفل والخيار 2.5 لتر/هكتار أو 0.25% وفق الكتالوج.",
            "timing": "في بداية النمو، قبل وأثناء التزهير، أثناء العقد ونمو الثمار، وبعد فترات الإجهاد.",
            "interval": "رش ورقي، ويمكن استخدامه بالتربة/الري إذا أقر البرنامج.",
            "recommendation": "يفضل دمجه في برنامج تغذية متوازن مع مراعاة اختبار الخلط."
          },
          {
            "crop": "الأشجار المثمرة",
            "target": "تنشيط النمو والتزهير وتحسين العقد ومقاومة الإجهاد.",
            "dose": "2–3 لتر/هكتار لمعظم المحاصيل؛ 3 لتر/هكتار للفراولة والعنب؛ للخضر مثل الطماطم والفلفل والخيار 2.5 لتر/هكتار أو 0.25% وفق الكتالوج.",
            "timing": "في بداية النمو، قبل وأثناء التزهير، أثناء العقد ونمو الثمار، وبعد فترات الإجهاد.",
            "interval": "رش ورقي، ويمكن استخدامه بالتربة/الري إذا أقر البرنامج.",
            "recommendation": "يفضل دمجه في برنامج تغذية متوازن مع مراعاة اختبار الخلط."
          },
          {
            "crop": "الفراولة",
            "target": "تنشيط النمو والتزهير وتحسين العقد ومقاومة الإجهاد.",
            "dose": "2–3 لتر/هكتار لمعظم المحاصيل؛ 3 لتر/هكتار للفراولة والعنب؛ للخضر مثل الطماطم والفلفل والخيار 2.5 لتر/هكتار أو 0.25% وفق الكتالوج.",
            "timing": "في بداية النمو، قبل وأثناء التزهير، أثناء العقد ونمو الثمار، وبعد فترات الإجهاد.",
            "interval": "رش ورقي، ويمكن استخدامه بالتربة/الري إذا أقر البرنامج.",
            "recommendation": "يفضل دمجه في برنامج تغذية متوازن مع مراعاة اختبار الخلط."
          },
          {
            "crop": "العنب",
            "target": "تنشيط النمو والتزهير وتحسين العقد ومقاومة الإجهاد.",
            "dose": "2–3 لتر/هكتار لمعظم المحاصيل؛ 3 لتر/هكتار للفراولة والعنب؛ للخضر مثل الطماطم والفلفل والخيار 2.5 لتر/هكتار أو 0.25% وفق الكتالوج.",
            "timing": "في بداية النمو، قبل وأثناء التزهير، أثناء العقد ونمو الثمار، وبعد فترات الإجهاد.",
            "interval": "رش ورقي، ويمكن استخدامه بالتربة/الري إذا أقر البرنامج.",
            "recommendation": "يفضل دمجه في برنامج تغذية متوازن مع مراعاة اختبار الخلط."
          },
          {
            "crop": "الخضر",
            "target": "تنشيط النمو والتزهير وتحسين العقد ومقاومة الإجهاد.",
            "dose": "2–3 لتر/هكتار لمعظم المحاصيل؛ 3 لتر/هكتار للفراولة والعنب؛ للخضر مثل الطماطم والفلفل والخيار 2.5 لتر/هكتار أو 0.25% وفق الكتالوج.",
            "timing": "في بداية النمو، قبل وأثناء التزهير، أثناء العقد ونمو الثمار، وبعد فترات الإجهاد.",
            "interval": "رش ورقي، ويمكن استخدامه بالتربة/الري إذا أقر البرنامج.",
            "recommendation": "يفضل دمجه في برنامج تغذية متوازن مع مراعاة اختبار الخلط."
          }
        ],
        "documents": [
          {
            "title": "البروشور",
            "description": "ملف تعريفي يعرض فكرة المنتج واستخداماته الأساسية وأهم الرسائل الفنية والتجارية بطريقة مناسبة للموزعين والعملاء.",
            "status": "نعم / كتالوج فولي كيو"
          },
          {
            "title": "الملصق",
            "description": "مرجع الملصق المحلي والاستخدامات المعتمدة.",
            "status": "لا / بعد التسجيل"
          },
          {
            "title": "النشرة الفنية",
            "description": "مرجع فني مختصر يوضح التركيب والصيغة ومعدلات الاستخدام والنقاط الفنية الأساسية التي تساعد على تقديم المنتج بصورة دقيقة.",
            "status": "نعم"
          },
          {
            "title": "الشهادات",
            "description": "الشهادات والملفات الرسمية لنقاشات الشركاء.",
            "status": "عند الطلب"
          }
        ]
      },
    {
        "slug": "foliq-amical",
        "categorySlug": "specialty-fertilizers",
        "legacySlugs": [
          "foliq-amical-free",
          "amical"
        ],
        "name": "فولي كيو أميكال",
        "category": "التغذية النباتية",
        "subcategory": "كالسيوم وبورون وعناصر صغرى",
        "crops": [
          "الطماطم",
          "الفلفل",
          "الخيار",
          "التفاحيات",
          "الفراولة"
        ],
        "positioning": "سماد كالسيوم عالي التركيز بدون نيتروجين، مدعم بالمنجنيز والزنك ومصمم لتحسين صلابة الثمار وجودة التخزين وتقليل اضطرابات نقص الكالسيوم.",
        "registrationStatus": "تحت التسجيل",
        "galleryImage": "/images/products/foliq-amical-gallery.png",
        "galleryImageAlt": "صورة كتالوج فولي كيو أميكال",
        "detailImage": "/images/products/foliq-amical-detail.png",
        "detailImageAlt": "عبوات فولي كيو أميكال مع صور ثمار/خضروات ومؤشر N-Free.",
        "facts": {
          "category": "Fertilizers > Calcium / Quality Fertilizers",
          "composition": "Calcium (CaO) 150 جم/لتر، منجنيز 6.75 جم/لتر، زنك 6.75 جم/لتر، N-Free.",
          "formulation": "سماد سائل للرش الورقي.",
          "targetCrop": "الطماطم، الفلفل، الخيار، الكرنب، الخس، التفاح والكمثرى، الفاكهة ذات النواة، التوتيات والفراولة.",
          "target": "نقص الكالسيوم، عفن الطرف الزهري، مرارة التفاح، تشقق الثمار، ضعف الصلابة والتخزين.",
          "supplier": "Agrii Poland.",
          "registrationStatus": "تحت التسجيل ضمن محفظة أجروبست."
        },
        "overview": "فولي كيو أميكال يتموضع كمنتج جودة للفاكهة والخضروات، لأنه يزود النبات بالكالسيوم دون دفع نيتروجيني زائد، ما يجعله مناسباً لمراحل ما قبل الحصاد وتحسين التخزين والصلابة.",
        "benefits": [
          {
            "title": "كالسيوم عالي التركيز بدون إضافة نيتروجين",
            "description": "كالسيوم عالي التركيز بدون إضافة نيتروجين."
          },
          {
            "title": "يدعم صلابة الثمار وجودة التخزين",
            "description": "يدعم صلابة الثمار وجودة التخزين."
          },
          {
            "title": "يساعد على تقليل التشقق والاضطرابات الفسيولوجية المرتبطة",
            "description": "يساعد على تقليل التشقق والاضطرابات الفسيولوجية المرتبطة بالكالسيوم."
          },
          {
            "title": "إضافة المنجنيز والزنك تدعم التمثيل الغذائي",
            "description": "إضافة المنجنيز والزنك تدعم التمثيل الغذائي."
          },
          {
            "title": "pH مناسب لتحسين كفاءة امتصاص الكالسيوم",
            "description": "pH مناسب لتحسين كفاءة امتصاص الكالسيوم."
          },
          {
            "title": "مناسب لمحاصيل الفاكهة والخضر عالية القيمة",
            "description": "مناسب لمحاصيل الفاكهة والخضر عالية القيمة."
          }
        ],
        "modeOfAction": {
          "title": "لماذا فولي كيو أميكال؟",
          "description": "فولي كيو أميكال يتموضع كمنتج جودة للفاكهة والخضروات، لأنه يزود النبات بالكالسيوم دون دفع نيتروجيني زائد، ما يجعله مناسباً لمراحل ما قبل الحصاد وتحسين التخزين والصلابة.",
          "image": "/images/products/foliq-amical-mode.svg",
          "imageAlt": "شرح تموضع فولي كيو أميكال",
          "points": [
            "كالسيوم عالي التركيز بدون إضافة نيتروجين.",
            "يدعم صلابة الثمار وجودة التخزين.",
            "يساعد على تقليل التشقق والاضطرابات الفسيولوجية المرتبطة بالكالسيوم."
          ]
        },
        "usageGuidance": [
          {
            "crop": "الخضر الثمرية",
            "target": "تحسين محتوى الكالسيوم وجودة الثمار.",
            "dose": "الخضر: 4–5 لتر/هكتار؛ تحت الأغطية 0.3–0.5%. الأشجار والتوتيات: 3–5 لتر/هكتار حسب الكتالوج.",
            "timing": "من بداية العقد ونمو الثمار، ويكرر كل 7–14 يوماً حسب المحصول وخطورة نقص الكالسيوم.",
            "interval": "رش ورقي مع تغطية جيدة للثمار والمجموع الخضري.",
            "recommendation": "تجنب الخلط مع الفوسفات والكبريتات دون اختبار؛ يفضل الرش في أوقات معتدلة."
          },
          {
            "crop": "الكرنب",
            "target": "تحسين محتوى الكالسيوم وجودة الثمار.",
            "dose": "الخضر: 4–5 لتر/هكتار؛ تحت الأغطية 0.3–0.5%. الأشجار والتوتيات: 3–5 لتر/هكتار حسب الكتالوج.",
            "timing": "من بداية العقد ونمو الثمار، ويكرر كل 7–14 يوماً حسب المحصول وخطورة نقص الكالسيوم.",
            "interval": "رش ورقي مع تغطية جيدة للثمار والمجموع الخضري.",
            "recommendation": "تجنب الخلط مع الفوسفات والكبريتات دون اختبار؛ يفضل الرش في أوقات معتدلة."
          },
          {
            "crop": "الخس",
            "target": "تحسين محتوى الكالسيوم وجودة الثمار.",
            "dose": "الخضر: 4–5 لتر/هكتار؛ تحت الأغطية 0.3–0.5%. الأشجار والتوتيات: 3–5 لتر/هكتار حسب الكتالوج.",
            "timing": "من بداية العقد ونمو الثمار، ويكرر كل 7–14 يوماً حسب المحصول وخطورة نقص الكالسيوم.",
            "interval": "رش ورقي مع تغطية جيدة للثمار والمجموع الخضري.",
            "recommendation": "تجنب الخلط مع الفوسفات والكبريتات دون اختبار؛ يفضل الرش في أوقات معتدلة."
          },
          {
            "crop": "الأشجار المثمرة",
            "target": "تحسين محتوى الكالسيوم وجودة الثمار.",
            "dose": "الخضر: 4–5 لتر/هكتار؛ تحت الأغطية 0.3–0.5%. الأشجار والتوتيات: 3–5 لتر/هكتار حسب الكتالوج.",
            "timing": "من بداية العقد ونمو الثمار، ويكرر كل 7–14 يوماً حسب المحصول وخطورة نقص الكالسيوم.",
            "interval": "رش ورقي مع تغطية جيدة للثمار والمجموع الخضري.",
            "recommendation": "تجنب الخلط مع الفوسفات والكبريتات دون اختبار؛ يفضل الرش في أوقات معتدلة."
          },
          {
            "crop": "الفاكهة ذات النواة",
            "target": "تحسين محتوى الكالسيوم وجودة الثمار.",
            "dose": "الخضر: 4–5 لتر/هكتار؛ تحت الأغطية 0.3–0.5%. الأشجار والتوتيات: 3–5 لتر/هكتار حسب الكتالوج.",
            "timing": "من بداية العقد ونمو الثمار، ويكرر كل 7–14 يوماً حسب المحصول وخطورة نقص الكالسيوم.",
            "interval": "رش ورقي مع تغطية جيدة للثمار والمجموع الخضري.",
            "recommendation": "تجنب الخلط مع الفوسفات والكبريتات دون اختبار؛ يفضل الرش في أوقات معتدلة."
          },
          {
            "crop": "التوتيات",
            "target": "تحسين محتوى الكالسيوم وجودة الثمار.",
            "dose": "الخضر: 4–5 لتر/هكتار؛ تحت الأغطية 0.3–0.5%. الأشجار والتوتيات: 3–5 لتر/هكتار حسب الكتالوج.",
            "timing": "من بداية العقد ونمو الثمار، ويكرر كل 7–14 يوماً حسب المحصول وخطورة نقص الكالسيوم.",
            "interval": "رش ورقي مع تغطية جيدة للثمار والمجموع الخضري.",
            "recommendation": "تجنب الخلط مع الفوسفات والكبريتات دون اختبار؛ يفضل الرش في أوقات معتدلة."
          }
        ],
        "documents": [
          {
            "title": "البروشور",
            "description": "ملف تعريفي يعرض فكرة المنتج واستخداماته الأساسية وأهم الرسائل الفنية والتجارية بطريقة مناسبة للموزعين والعملاء.",
            "status": "نعم / كتالوج فولي كيو"
          },
          {
            "title": "الملصق",
            "description": "مرجع الملصق المحلي والاستخدامات المعتمدة.",
            "status": "لا / بعد التسجيل"
          },
          {
            "title": "النشرة الفنية",
            "description": "مرجع فني مختصر يوضح التركيب والصيغة ومعدلات الاستخدام والنقاط الفنية الأساسية التي تساعد على تقديم المنتج بصورة دقيقة.",
            "status": "نعم"
          },
          {
            "title": "الشهادات",
            "description": "الشهادات والملفات الرسمية لنقاشات الشركاء.",
            "status": "عند الطلب"
          }
        ]
      },
    {
        "slug": "foliq-k-potassium",
        "categorySlug": "specialty-fertilizers",
        "legacySlugs": [
          "foliq-potassium",
          "foliq-k"
        ],
        "name": "فولي كيو بوتاسيوم",
        "category": "التغذية النباتية",
        "subcategory": "بوتاسيوم وسيليكون",
        "crops": [
          "البطاطس",
          "الخضروات",
          "الفاكهة",
          "الفراولة",
          "الحبوب"
        ],
        "positioning": "سماد ورقي NPK سائل مصمم للمحاصيل ذات الطلب العالي على البوتاسيوم، يدعم سد النقص الظاهر والخفي وتحسين جودة الثمار وتحمل الجفاف.",
        "registrationStatus": "تحت التسجيل",
        "galleryImage": "/images/products/foliq-k-potassium-gallery.png",
        "galleryImageAlt": "صورة كتالوج فولي كيو بوتاسيوم",
        "detailImage": "/images/products/foliq-k-potassium-detail.png",
        "detailImageAlt": "عبوة فولي كيو بوتاسيوم مع صورة ثمار قوية ولون بنفسجي Agrii.",
        "facts": {
          "category": "Fertilizers > Potassium / Liquid Foliar NPK",
          "composition": "K2O 150 جم/لتر، P2O5 100 جم/لتر، N 62.5 جم/لتر، مع بورون ومنجنيز وزنك ونحاس وموليبدنم بتركيزات صغيرة.",
          "formulation": "سماد سائل للرش الورقي والتطبيق الورقي/الأرضي في بعض الحالات.",
          "targetCrop": "الحبوب، اللفت، بنجر السكر، الذرة، البطاطس، الخضر، أشجار الفاكهة، الفراولة ونباتات الزينة.",
          "target": "نقص البوتاسيوم، ضعف امتلاء الثمار، انخفاض الصلابة، ضعف تحمل الجفاف.",
          "supplier": "Agrii Poland.",
          "registrationStatus": "تحت التسجيل ضمن محفظة أجروبست."
        },
        "overview": "فولي كيو بوتاسيوم يتموضع كحل بوتاسيوم سريع للمراحل التي يرتفع فيها الطلب على النقل السكري والتحجيم والصلابة، مع تركيبة متوازنة تضمن عدم اقتصار التغذية على البوتاسيوم فقط.",
        "benefits": [
          {
            "title": "تركيز بوتاسيوم مرتفع مع فوسفور ونيتروجين لبرنامج تغذية",
            "description": "تركيز بوتاسيوم مرتفع مع فوسفور ونيتروجين لبرنامج تغذية متوازن."
          },
          {
            "title": "يساعد على تحسين إدارة الماء ورفع تحمل الجفاف",
            "description": "يساعد على تحسين إدارة الماء ورفع تحمل الجفاف."
          },
          {
            "title": "يدعم التمثيل الضوئي ونقل المواد الممثلة من الأوراق إلى",
            "description": "يدعم التمثيل الضوئي ونقل المواد الممثلة من الأوراق إلى الثمار والجذور."
          },
          {
            "title": "يحسن صلابة الثمار وجودتها التسويقية",
            "description": "يحسن صلابة الثمار وجودتها التسويقية."
          },
          {
            "title": "صيغة سائلة سهلة القياس والذوبان",
            "description": "صيغة سائلة سهلة القياس والذوبان."
          },
          {
            "title": "متوافق جيداً مع برامج الرش بعد اختبار الخلط",
            "description": "متوافق جيداً مع برامج الرش بعد اختبار الخلط."
          }
        ],
        "modeOfAction": {
          "title": "لماذا فولي كيو بوتاسيوم؟",
          "description": "فولي كيو بوتاسيوم يتموضع كحل بوتاسيوم سريع للمراحل التي يرتفع فيها الطلب على النقل السكري والتحجيم والصلابة، مع تركيبة متوازنة تضمن عدم اقتصار التغذية على البوتاسيوم فقط.",
          "image": "/images/products/foliq-k-potassium-mode.svg",
          "imageAlt": "شرح تموضع فولي كيو بوتاسيوم",
          "points": [
            "تركيز بوتاسيوم مرتفع مع فوسفور ونيتروجين لبرنامج تغذية متوازن.",
            "يساعد على تحسين إدارة الماء ورفع تحمل الجفاف.",
            "يدعم التمثيل الضوئي ونقل المواد الممثلة من الأوراق إلى الثمار والجذور."
          ]
        },
        "usageGuidance": [
          {
            "crop": "البطاطس",
            "target": "سد نقص البوتاسيوم وتحسين الجودة والتحجيم.",
            "dose": "5 لتر/هكتار لمعظم المحاصيل؛ اللفت 4–5 لتر/هكتار؛ تحت الأغطية 0.2–0.3% وفق الكتالوج.",
            "timing": "من بداية النمو النشط وحتى التحجيم؛ في البطاطس يبدأ مع النمو المكثف للأوراق والسيقان ويكرر كل 10–14 يوماً.",
            "interval": "رش ورقي؛ ويمكن استخدامه في برامج أرضية لبعض المحاصيل إذا أقر البرنامج.",
            "recommendation": "لا يستخدم بديلاً عن التسميد الأرضي الأساسي عند وجود نقص شديد؛ يفضل اختبار الخلط."
          },
          {
            "crop": "الخضر",
            "target": "سد نقص البوتاسيوم وتحسين الجودة والتحجيم.",
            "dose": "5 لتر/هكتار لمعظم المحاصيل؛ اللفت 4–5 لتر/هكتار؛ تحت الأغطية 0.2–0.3% وفق الكتالوج.",
            "timing": "من بداية النمو النشط وحتى التحجيم؛ في البطاطس يبدأ مع النمو المكثف للأوراق والسيقان ويكرر كل 10–14 يوماً.",
            "interval": "رش ورقي؛ ويمكن استخدامه في برامج أرضية لبعض المحاصيل إذا أقر البرنامج.",
            "recommendation": "لا يستخدم بديلاً عن التسميد الأرضي الأساسي عند وجود نقص شديد؛ يفضل اختبار الخلط."
          },
          {
            "crop": "الفاكهة",
            "target": "سد نقص البوتاسيوم وتحسين الجودة والتحجيم.",
            "dose": "5 لتر/هكتار لمعظم المحاصيل؛ اللفت 4–5 لتر/هكتار؛ تحت الأغطية 0.2–0.3% وفق الكتالوج.",
            "timing": "من بداية النمو النشط وحتى التحجيم؛ في البطاطس يبدأ مع النمو المكثف للأوراق والسيقان ويكرر كل 10–14 يوماً.",
            "interval": "رش ورقي؛ ويمكن استخدامه في برامج أرضية لبعض المحاصيل إذا أقر البرنامج.",
            "recommendation": "لا يستخدم بديلاً عن التسميد الأرضي الأساسي عند وجود نقص شديد؛ يفضل اختبار الخلط."
          },
          {
            "crop": "الفراولة",
            "target": "سد نقص البوتاسيوم وتحسين الجودة والتحجيم.",
            "dose": "5 لتر/هكتار لمعظم المحاصيل؛ اللفت 4–5 لتر/هكتار؛ تحت الأغطية 0.2–0.3% وفق الكتالوج.",
            "timing": "من بداية النمو النشط وحتى التحجيم؛ في البطاطس يبدأ مع النمو المكثف للأوراق والسيقان ويكرر كل 10–14 يوماً.",
            "interval": "رش ورقي؛ ويمكن استخدامه في برامج أرضية لبعض المحاصيل إذا أقر البرنامج.",
            "recommendation": "لا يستخدم بديلاً عن التسميد الأرضي الأساسي عند وجود نقص شديد؛ يفضل اختبار الخلط."
          },
          {
            "crop": "الحبوب",
            "target": "سد نقص البوتاسيوم وتحسين الجودة والتحجيم.",
            "dose": "5 لتر/هكتار لمعظم المحاصيل؛ اللفت 4–5 لتر/هكتار؛ تحت الأغطية 0.2–0.3% وفق الكتالوج.",
            "timing": "من بداية النمو النشط وحتى التحجيم؛ في البطاطس يبدأ مع النمو المكثف للأوراق والسيقان ويكرر كل 10–14 يوماً.",
            "interval": "رش ورقي؛ ويمكن استخدامه في برامج أرضية لبعض المحاصيل إذا أقر البرنامج.",
            "recommendation": "لا يستخدم بديلاً عن التسميد الأرضي الأساسي عند وجود نقص شديد؛ يفضل اختبار الخلط."
          },
          {
            "crop": "الذرة",
            "target": "سد نقص البوتاسيوم وتحسين الجودة والتحجيم.",
            "dose": "5 لتر/هكتار لمعظم المحاصيل؛ اللفت 4–5 لتر/هكتار؛ تحت الأغطية 0.2–0.3% وفق الكتالوج.",
            "timing": "من بداية النمو النشط وحتى التحجيم؛ في البطاطس يبدأ مع النمو المكثف للأوراق والسيقان ويكرر كل 10–14 يوماً.",
            "interval": "رش ورقي؛ ويمكن استخدامه في برامج أرضية لبعض المحاصيل إذا أقر البرنامج.",
            "recommendation": "لا يستخدم بديلاً عن التسميد الأرضي الأساسي عند وجود نقص شديد؛ يفضل اختبار الخلط."
          },
          {
            "crop": "بنجر السكر",
            "target": "سد نقص البوتاسيوم وتحسين الجودة والتحجيم.",
            "dose": "5 لتر/هكتار لمعظم المحاصيل؛ اللفت 4–5 لتر/هكتار؛ تحت الأغطية 0.2–0.3% وفق الكتالوج.",
            "timing": "من بداية النمو النشط وحتى التحجيم؛ في البطاطس يبدأ مع النمو المكثف للأوراق والسيقان ويكرر كل 10–14 يوماً.",
            "interval": "رش ورقي؛ ويمكن استخدامه في برامج أرضية لبعض المحاصيل إذا أقر البرنامج.",
            "recommendation": "لا يستخدم بديلاً عن التسميد الأرضي الأساسي عند وجود نقص شديد؛ يفضل اختبار الخلط."
          }
        ],
        "documents": [
          {
            "title": "البروشور",
            "description": "ملف تعريفي يعرض فكرة المنتج واستخداماته الأساسية وأهم الرسائل الفنية والتجارية بطريقة مناسبة للموزعين والعملاء.",
            "status": "نعم / كتالوج فولي كيو"
          },
          {
            "title": "الملصق",
            "description": "مرجع الملصق المحلي والاستخدامات المعتمدة.",
            "status": "لا / بعد التسجيل"
          },
          {
            "title": "النشرة الفنية",
            "description": "مرجع فني مختصر يوضح التركيب والصيغة ومعدلات الاستخدام والنقاط الفنية الأساسية التي تساعد على تقديم المنتج بصورة دقيقة.",
            "status": "نعم"
          },
          {
            "title": "الشهادات",
            "description": "الشهادات والملفات الرسمية لنقاشات الشركاء.",
            "status": "عند الطلب"
          }
        ]
      },
    {
        "slug": "foliq-boron",
        "categorySlug": "specialty-fertilizers",
        "legacySlugs": [
          "foliq-boron-np",
          "boron"
        ],
        "name": "فولي كيو بورون",
        "category": "التغذية النباتية",
        "subcategory": "كالسيوم وبورون وعناصر صغرى",
        "crops": [
          "اللفت",
          "بنجر السكر",
          "الذرة",
          "البطاطس",
          "الخضر الكرنبية",
          "الفراولة"
        ],
        "positioning": "سماد ورقي سائل عالي التركيز من البورون في صورة إيثانول أمين، مصمم للوقاية الآمنة من نقص البورون وتحسين التزهير والتلقيح وتكوين البذور والثمار.",
        "registrationStatus": "تحت التسجيل",
        "galleryImage": "/images/products/foliq-boron-gallery.png",
        "galleryImageAlt": "صورة كتالوج فولي كيو بورون",
        "detailImage": "/images/products/foliq-boron-detail.png",
        "detailImageAlt": "عبوة فولي كيو بورون مع خلفية محاصيل مزهرة وحبوب/ثمار.",
        "facts": {
          "category": "Fertilizers > Boron",
          "composition": "بورون 150 جم/لتر؛ يحتوي أيضاً على نيتروجين كلي 67 جم/لتر وفق كتالوج فولي كيو.",
          "formulation": "سماد سائل للرش الورقي، بورون إيثانول أمين.",
          "targetCrop": "اللفت، بنجر السكر، الذرة، البطاطس، الخضر الكرنبية، الجزر والكرفس، التبغ، التفاحيات، الفاكهة ذات النواة والفراولة.",
          "target": "نقص البورون، ضعف التزهير والتلقيح، ضعف الجذور، تشقق الثمار، الجفاف القلبي في البنجر، ضعف تكوين البذور.",
          "supplier": "Agrii Poland.",
          "registrationStatus": "تحت التسجيل ضمن محفظة أجروبست."
        },
        "overview": "فولي كيو بورون منتج متخصص عندما يكون هدف البرنامج هو إضافة البورون مباشرة وبتركيز واضح. يناسب المحاصيل ذات الاحتياج العالي للبورون خصوصاً قبل التزهير وأثناء المراحل التي تحدد العقد والمحصول النهائي.",
        "benefits": [
          {
            "title": "تركيز مرتفع من البورون في صورة سهلة الامتصاص",
            "description": "تركيز مرتفع من البورون في صورة سهلة الامتصاص."
          },
          {
            "title": "يدعم التزهير والتلقيح والإخصاب وتكوين البذور",
            "description": "يدعم التزهير والتلقيح والإخصاب وتكوين البذور."
          },
          {
            "title": "يساعد على تقوية الجذور وجدر الخلايا",
            "description": "يساعد على تقوية الجذور وجدر الخلايا."
          },
          {
            "title": "يرفع مقاومة النبات للبرد والرقاد بدرجة أفضل عند إدارة",
            "description": "يرفع مقاومة النبات للبرد والرقاد بدرجة أفضل عند إدارة التغذية جيداً."
          },
          {
            "title": "صيغة سائلة سهلة الجرعة والذوبان",
            "description": "صيغة سائلة سهلة الجرعة والذوبان."
          },
          {
            "title": "أمان جيد للنبات عند الالتزام بالجرعات الموصى بها",
            "description": "أمان جيد للنبات عند الالتزام بالجرعات الموصى بها."
          }
        ],
        "modeOfAction": {
          "title": "لماذا فولي كيو بورون؟",
          "description": "فولي كيو بورون منتج متخصص عندما يكون هدف البرنامج هو إضافة البورون مباشرة وبتركيز واضح. يناسب المحاصيل ذات الاحتياج العالي للبورون خصوصاً قبل التزهير وأثناء المراحل التي تحدد العقد والمحصول النهائي.",
          "image": "/images/products/foliq-boron-mode.svg",
          "imageAlt": "شرح تموضع فولي كيو بورون",
          "points": [
            "تركيز مرتفع من البورون في صورة سهلة الامتصاص.",
            "يدعم التزهير والتلقيح والإخصاب وتكوين البذور.",
            "يساعد على تقوية الجذور وجدر الخلايا."
          ]
        },
        "usageGuidance": [
          {
            "crop": "اللفت",
            "target": "الوقاية أو العلاج من نقص البورون وتحسين التزهير والعقد.",
            "dose": "للمحاصيل الحقلية غالباً 1 لتر/هكتار في النقص الخفي و1.5 لتر/هكتار في النقص الظاهر، مع تكرار 1–3 معاملات حسب المحصول. الفراولة: 2 لتر/هكتار قبل التزهير.",
            "timing": "خلال النمو النشط، قبل التزهير أو عند ظهور مؤشرات نقص البورون؛ التفاحيات والفاكهة ذات النواة في البرعم الأخضر، تساقط البتلات وبعد الحصاد وفق الكتالوج.",
            "interval": "رش ورقي.",
            "recommendation": "تجنب الجرعات العالية لأن مدى الأمان بين النقص والزيادة في البورون ضيق نسبياً؛ يفضل عدم الخلط إلا بعد اختبار توافق."
          },
          {
            "crop": "بنجر السكر",
            "target": "الوقاية أو العلاج من نقص البورون وتحسين التزهير والعقد.",
            "dose": "للمحاصيل الحقلية غالباً 1 لتر/هكتار في النقص الخفي و1.5 لتر/هكتار في النقص الظاهر، مع تكرار 1–3 معاملات حسب المحصول. الفراولة: 2 لتر/هكتار قبل التزهير.",
            "timing": "خلال النمو النشط، قبل التزهير أو عند ظهور مؤشرات نقص البورون؛ التفاحيات والفاكهة ذات النواة في البرعم الأخضر، تساقط البتلات وبعد الحصاد وفق الكتالوج.",
            "interval": "رش ورقي.",
            "recommendation": "تجنب الجرعات العالية لأن مدى الأمان بين النقص والزيادة في البورون ضيق نسبياً؛ يفضل عدم الخلط إلا بعد اختبار توافق."
          },
          {
            "crop": "الذرة",
            "target": "الوقاية أو العلاج من نقص البورون وتحسين التزهير والعقد.",
            "dose": "للمحاصيل الحقلية غالباً 1 لتر/هكتار في النقص الخفي و1.5 لتر/هكتار في النقص الظاهر، مع تكرار 1–3 معاملات حسب المحصول. الفراولة: 2 لتر/هكتار قبل التزهير.",
            "timing": "خلال النمو النشط، قبل التزهير أو عند ظهور مؤشرات نقص البورون؛ التفاحيات والفاكهة ذات النواة في البرعم الأخضر، تساقط البتلات وبعد الحصاد وفق الكتالوج.",
            "interval": "رش ورقي.",
            "recommendation": "تجنب الجرعات العالية لأن مدى الأمان بين النقص والزيادة في البورون ضيق نسبياً؛ يفضل عدم الخلط إلا بعد اختبار توافق."
          },
          {
            "crop": "البطاطس",
            "target": "الوقاية أو العلاج من نقص البورون وتحسين التزهير والعقد.",
            "dose": "للمحاصيل الحقلية غالباً 1 لتر/هكتار في النقص الخفي و1.5 لتر/هكتار في النقص الظاهر، مع تكرار 1–3 معاملات حسب المحصول. الفراولة: 2 لتر/هكتار قبل التزهير.",
            "timing": "خلال النمو النشط، قبل التزهير أو عند ظهور مؤشرات نقص البورون؛ التفاحيات والفاكهة ذات النواة في البرعم الأخضر، تساقط البتلات وبعد الحصاد وفق الكتالوج.",
            "interval": "رش ورقي.",
            "recommendation": "تجنب الجرعات العالية لأن مدى الأمان بين النقص والزيادة في البورون ضيق نسبياً؛ يفضل عدم الخلط إلا بعد اختبار توافق."
          },
          {
            "crop": "الخضر الكرنبية",
            "target": "الوقاية أو العلاج من نقص البورون وتحسين التزهير والعقد.",
            "dose": "للمحاصيل الحقلية غالباً 1 لتر/هكتار في النقص الخفي و1.5 لتر/هكتار في النقص الظاهر، مع تكرار 1–3 معاملات حسب المحصول. الفراولة: 2 لتر/هكتار قبل التزهير.",
            "timing": "خلال النمو النشط، قبل التزهير أو عند ظهور مؤشرات نقص البورون؛ التفاحيات والفاكهة ذات النواة في البرعم الأخضر، تساقط البتلات وبعد الحصاد وفق الكتالوج.",
            "interval": "رش ورقي.",
            "recommendation": "تجنب الجرعات العالية لأن مدى الأمان بين النقص والزيادة في البورون ضيق نسبياً؛ يفضل عدم الخلط إلا بعد اختبار توافق."
          },
          {
            "crop": "الجزر",
            "target": "الوقاية أو العلاج من نقص البورون وتحسين التزهير والعقد.",
            "dose": "للمحاصيل الحقلية غالباً 1 لتر/هكتار في النقص الخفي و1.5 لتر/هكتار في النقص الظاهر، مع تكرار 1–3 معاملات حسب المحصول. الفراولة: 2 لتر/هكتار قبل التزهير.",
            "timing": "خلال النمو النشط، قبل التزهير أو عند ظهور مؤشرات نقص البورون؛ التفاحيات والفاكهة ذات النواة في البرعم الأخضر، تساقط البتلات وبعد الحصاد وفق الكتالوج.",
            "interval": "رش ورقي.",
            "recommendation": "تجنب الجرعات العالية لأن مدى الأمان بين النقص والزيادة في البورون ضيق نسبياً؛ يفضل عدم الخلط إلا بعد اختبار توافق."
          },
          {
            "crop": "التفاحيات",
            "target": "الوقاية أو العلاج من نقص البورون وتحسين التزهير والعقد.",
            "dose": "للمحاصيل الحقلية غالباً 1 لتر/هكتار في النقص الخفي و1.5 لتر/هكتار في النقص الظاهر، مع تكرار 1–3 معاملات حسب المحصول. الفراولة: 2 لتر/هكتار قبل التزهير.",
            "timing": "خلال النمو النشط، قبل التزهير أو عند ظهور مؤشرات نقص البورون؛ التفاحيات والفاكهة ذات النواة في البرعم الأخضر، تساقط البتلات وبعد الحصاد وفق الكتالوج.",
            "interval": "رش ورقي.",
            "recommendation": "تجنب الجرعات العالية لأن مدى الأمان بين النقص والزيادة في البورون ضيق نسبياً؛ يفضل عدم الخلط إلا بعد اختبار توافق."
          },
          {
            "crop": "الفراولة",
            "target": "الوقاية أو العلاج من نقص البورون وتحسين التزهير والعقد.",
            "dose": "للمحاصيل الحقلية غالباً 1 لتر/هكتار في النقص الخفي و1.5 لتر/هكتار في النقص الظاهر، مع تكرار 1–3 معاملات حسب المحصول. الفراولة: 2 لتر/هكتار قبل التزهير.",
            "timing": "خلال النمو النشط، قبل التزهير أو عند ظهور مؤشرات نقص البورون؛ التفاحيات والفاكهة ذات النواة في البرعم الأخضر، تساقط البتلات وبعد الحصاد وفق الكتالوج.",
            "interval": "رش ورقي.",
            "recommendation": "تجنب الجرعات العالية لأن مدى الأمان بين النقص والزيادة في البورون ضيق نسبياً؛ يفضل عدم الخلط إلا بعد اختبار توافق."
          }
        ],
        "documents": [
          {
            "title": "البروشور",
            "description": "ملف تعريفي يعرض فكرة المنتج واستخداماته الأساسية وأهم الرسائل الفنية والتجارية بطريقة مناسبة للموزعين والعملاء.",
            "status": "نعم / كتالوج فولي كيو"
          },
          {
            "title": "الملصق",
            "description": "مرجع الملصق المحلي والاستخدامات المعتمدة.",
            "status": "لا / بعد التسجيل"
          },
          {
            "title": "النشرة الفنية",
            "description": "مرجع فني مختصر يوضح التركيب والصيغة ومعدلات الاستخدام والنقاط الفنية الأساسية التي تساعد على تقديم المنتج بصورة دقيقة.",
            "status": "نعم"
          },
          {
            "title": "الشهادات",
            "description": "الشهادات والملفات الرسمية لنقاشات الشركاء.",
            "status": "عند الطلب"
          }
        ]
      }
  ]
};

export function getProductCategories(locale: Locale) {
  return productCategoriesByLocale[locale];
}

export function getProductCategory(locale: Locale, categorySlug: string) {
  return productCategoriesByLocale[locale].find((category) => category.slug === categorySlug);
}

export function getProducts(locale: Locale) {
  return productsByLocale[locale];
}

export function getProductsByCategory(locale: Locale, categorySlug: ProductCategorySlug) {
  return productsByLocale[locale].filter((product) => product.categorySlug === categorySlug);
}

export function getProductBySlug(locale: Locale, slug: string) {
  return productsByLocale[locale].find((product) => product.slug === slug);
}

export function getProductByCategoryAndSlug(locale: Locale, categorySlug: string, productSlug: string) {
  return productsByLocale[locale].find((product) => product.categorySlug === categorySlug && product.slug === productSlug);
}

export function getProductByAnySlug(locale: Locale, slug: string) {
  return productsByLocale[locale].find((product) => product.slug === slug || product.legacySlugs?.includes(slug));
}

export function getProductPath(locale: Locale, product: ProductDetail) {
  return localizeHref(locale, `/products/${product.categorySlug}/${product.slug}`);
}

export function getCategoryPath(locale: Locale, categorySlug: ProductCategorySlug) {
  return localizeHref(locale, `/products?category=${categorySlug}`);
}

export function getCategoryFilterOptions(products: ProductDetail[]) {
  const unique = (values: string[]) => Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));

  return {
    subcategories: unique(products.map((product) => product.subcategory)),
    crops: unique(products.flatMap((product) => product.crops)),
    registrationStatuses: unique(products.map((product) => product.registrationStatus))
  };
}

export function filterProducts(
  products: ProductDetail[],
  filters: { subcategory?: string; crop?: string; status?: string }
) {
  return products.filter((product) => {
    const matchesSubcategory = !filters.subcategory || product.subcategory === filters.subcategory;
    const matchesCrop = !filters.crop || product.crops.includes(filters.crop);
    const matchesStatus = !filters.status || product.registrationStatus === filters.status;

    return matchesSubcategory && matchesCrop && matchesStatus;
  });
}



