const imagePaths = {
  hero: {
    home: "/images/hero/agropest-field.jpg",
    greenhouse: "/images/hero/agropest-greenhouse.jpg",
    about: "/images/backgrounds/agropest-showroom-facade.jpg",
    solutions: "/images/hero/solutions-logistics.jpg",
    products: "/images/hero/products-crop-inputs.jpg",
    library: "/images/hero/library-documents.jpg",
    libraryPreview: "/images/hero/library-brochures-stack.jpg",
    partner: "/images/hero/about-partnership.jpg",
    contact: "/images/hero/contact-greenhouse.jpg"
  },
  categories: {
    cropProtection: "/images/categories/crop-protection-field.jpg",
    plantNutrition: "/images/categories/plant-nutrition-field.jpg",
    technicalSupport: "/images/categories/technical-support-field.jpg"
  },
  products: {
    cropProtection: "/images/products/crop-protection-range.jpg",
    fertilizer: "/images/products/fertilizer-range.jpg",
    technicalMaterials: "/images/products/technical-materials.jpg"
  },
  backgrounds: {
    fieldRows: "/images/backgrounds/egypt-field-rows.jpg",
    warehouse: "/images/backgrounds/warehouse-coordination.jpg",
    showroomFacade: "/images/backgrounds/agropest-showroom-facade.jpg"
  }
};

const whatsappHref = "https://wa.me/201288816352";

export const enContent = {
  locale: "en",
  direction: "ltr",
  languageSelection: {
    title: "AgroPest Control",
    subtitle: "Agricultural solutions for the Egyptian market",
    englishLabel: "Continue in English",
    arabicLabel: "الدخول باللغة العربية"
  },
  languageSwitcher: {
    label: "Language",
    english: "English",
    arabic: "العربية"
  },
  company: {
    name: "AgroPest Control for Trading",
    shortName: "AgroPest Control",
    mark: "AP",
    logoPath: "/images/brand/agropest-logo.png",
    logoAlt: "AgroPest logo",
    logoContrastPath: "/images/brand/agropest-footer-asset-39-exact.png",
    logoContrastAlt: "AgroPest outline logo",
    descriptor: "For Trading",
    footerDescriptor: "Agricultural input trading and coordination",
    tagline: "Crop protection, plant nutrition, and agricultural product coordination for the Egyptian market, from product selection and registration support to technical and marketing readiness.",
    phone: "+20 128 88 16352",
    whatsapp: "201288816352",
    email: "info@agropestcontrol.com",
    address: "80th km Cairo-Alexandria desert road, Al Nubariya, Behera, Egypt",
    workingHours: "Sunday to Thursday, 9:00 AM - 5:00 PM"
  },
  navigation: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Solutions", href: "/solutions" },
    { label: "Products", href: "/products" },
    { label: "Technical Resources", href: "/technical-library" },
    { label: "Partner With Us", href: "/partner-with-us" },
    { label: "Contact", href: "/contact" }
  ],
  footer: {
    companyColumn: "Company",
    contactColumn: "Contact",
    bottomNote: "Built for agricultural trade partnerships.",
    copyrightPrefix: "Copyright",
    rightsReserved: "All rights reserved."
  },
  images: imagePaths,
  home: {
    hero: {
      eyebrow: "Crop protection & crop nutrition",
      title: "Registration, Import, and Distribution of Agri Inputs in Egypt",
      subtitle:
        "AgroPest Control for Trading registers, imports, and distributes crop protection products, NPK fertilizers, and biostimulants in Egypt. For international manufacturers, we are the route into the market. For Egyptian wholesalers and distributors, we supply the portfolio and build the grower demand that makes those brands move.",
      backgroundImage: imagePaths.hero.home,
      visualImage: imagePaths.hero.greenhouse,
      visualAlt: "Agricultural greenhouse visual for AgroPest product commercialization",
      primaryCta: { label: "Become a Distributor", href: "/partner-with-us" },
      secondaryCta: { label: "View the Portfolio", href: "/products" },
      trustBadge: "Established 1995 · Al Nubariya, Beheira",
      signatureCards: [
        { title: "For the International Supplier", description: "Registration, importation, and a route into established Egyptian distribution channels, with the local technical material prepared here." },
        { title: "For the Distributor", description: "A registered portfolio, complete technical documentation, and the marketing that carries each product to the grower before your rep has to explain it." },
        { title: "For the Farm", description: "Crop protection, nutrition, and stress-support products matched to the crop, the stage, and the pressure of an Egyptian season — available through your regional dealer." }
      ],
      trustPoints: [
        "In the Egyptian agricultural market since 1995",
        "Selected and registered agricultural solutions",
        "Product information prepared for local use",
        "Support for distributors, growers, and partners"
      ],
      credibilityPanel: {
        establishedLabel: "Established",
        establishedYear: "1995",
        items: ["Local market experience", "International supplier cooperation", "Distribution and product positioning"]
      }
    },
    commitmentSection: {
      eyebrow: "How demand is built",
      title: "We supply the portfolio — and we build the demand behind it",
      paragraphs: [
        "Most importers stop at the invoice. We publish the technical material that reaches the grower and the agri-retailer directly, in Arabic, crop by crop and season by season.",
        "Marketing supports the distributor. It never competes with him. We do not sell to farmers, we do not open retail, and we do not price against our own partners."
      ],
      highlights: [
        { title: "The grower learns something useful", description: "How to recognise a deficiency, read a symptom in the field, or tell a registered product from an unknown one." },
        { title: "He asks for the name he knows", description: "At the dealer he already buys from, using the product name he has seen explained rather than advertised." },
        { title: "The retailer stocks to meet it", description: "The request exists before the rep arrives, so the counter conversation starts from demand instead of persuasion." },
        { title: "The distributor buys into demand", description: "A registered product that is already asked for by name, rather than one that has to be built from nothing." }
      ]
    },
    productCategoriesSection: {
      eyebrow: "What we supply",
      title: "Two pillars, one registered portfolio",
      description:
        "Crop protection — registered insecticides and fungicides for Egyptian vegetable and field crops. Crop nutrition and yield enhancement — water-soluble NPK fertilizers, phosphites, calcium-boron, potassium silicate, and seaweed-extract biostimulants for drip, foliar, and flood systems. Every product is registered with the Ministry of Agriculture before it is offered.",
      cta: { label: "View the Full Portfolio", href: "/products" }
    },
    featuredProductLinesSection: {
      eyebrow: "Featured solutions",
      title: "Featured products and solutions from AgroPest",
      description: "",
      items: [
        {
          eyebrow: "Crop protection",
          title: "Rival Duo 45 SC",
          description: "A featured fungicide solution for late blight and downy mildew programs.",
          image: "/images/featured/rival-duo-featured-logo-en-transparent.png",
          imageAlt: "Rival Duo English logo",
          tags: [],
          href: "/rival-duo-45-sc",
          ctaLabel: "View Rival Duo"
        },
        {
          eyebrow: "NPK series",
          title: "Signal NPK Series",
          description: "A specialized NPK series designed to support plant needs across different growth stages.",
          image: "/images/featured/signal-npk-featured-logo-en-transparent.png",
          imageAlt: "Signal NPK English logo",
          tags: [],
          href: "/signal-npk",
          ctaLabel: "Explore Signal"
        },
        {
          eyebrow: "Insecticide",
          title: "Lasix 70 WG",
          description: "A systemic insecticide positioned for sucking-pest control programs in high-value vegetable crops.",
          image: "/images/featured/lasix-featured-logo-en-transparent.png",
          imageAlt: "Lasix 70 WG English logo",
          tags: [],
          href: "/lasix-70-wg",
          ctaLabel: "View Lasix"
        },
        {
          eyebrow: "Biostimulant",
          title: "Fossil 400 SL",
          description: "A seaweed extract designed to support plant vitality and improve tolerance to stress conditions.",
          image: "/images/featured/fossil-featured-logo-en-transparent.png",
          imageAlt: "Fossil 400 SL English logo",
          tags: [],
          href: "/products/specialty-fertilizers/fossil",
          ctaLabel: "View Fossil"
        }
      ]
    },
    whyAgropestSection: {
      eyebrow: "What comes with the product",
      title: "A product arrives as a complete file",
      description:
        "More than a pack. Each product is delivered with the documentation that proves it, the material that sells it at the counter, and the published content that puts it in front of the grower first.",
      imageAlt: "AgroPest team and growers inspecting a tomato field trial beside branded AgroPest flags",
      items: [
        { eyebrow: "01", title: "The registration file", description: "The registered label, the registration documentation, and the manufacturer's technical sheet. A registered product carries a reference standard and an accountable party behind it." },
        { eyebrow: "02", title: "Counter-ready material", description: "A brochure, a product page, and a recommendation table for each product — the crop it serves, the stage it serves, and the problem it addresses. Written so a retailer can repeat it accurately." },
        { eyebrow: "03", title: "Crop-specific campaigns", description: "Published technical content aimed at the crops in your territory, in the field Arabic growers actually read. This is what turns a product name into a request at the counter." },
        { eyebrow: "04", title: "A named contact", description: "Follow-up is organized and personal. One person who knows your territory and your stock position. Not a call centre." }
      ]
    },
    partnersSection: {
      eyebrow: "Manufacturers and supply partners",
      title: "Who makes what we supply",
      description:
        "We import from manufacturers we have worked with over years, and we register what we import.",
      items: [
        { name: "Agria Bulgaria", logo: "/images/partners/agria-bulgaria-logo-supplied.png", logoAlt: "Agria Bulgaria logo", description: "Bulgaria · Crop protection" },
        { name: "EuroGro Greece", logo: "/images/partners/eurogro-logo-supplied.png", logoAlt: "EuroGro Greece logo", description: "Greece · Crop nutrition and biostimulants" },
        { name: "Star CropScience", logo: "/images/partners/star-cropscience-logo-supplied.png", logoAlt: "Star CropScience logo", description: "Manufacturer · supplied via Agri Unitech (China)" },
        { name: "Agrii Poland", logo: "/images/partners/agrii-logo-supplied.png", logoAlt: "Agrii Poland logo", description: "Poland · Partnership in development" }
      ]
    },
    solutionsSection: {
      eyebrow: "For customers and distributors",
      title: "Supporting distributors and farms with suitable solutions",
      description:
        "AgroPest provides selected and registered products supported by clear technical information and materials that help distributors and growers understand each product and use it at the right time and place.",
      cta: { label: "Explore Products", href: "/products" }
    },
    librarySection: {
      eyebrow: "Technical resources",
      title: "Technical resources that support field decisions",
      description:
        "AgroPest provides technical leaflets, brochures, usage recommendations, and visual materials that help distributors, engineers, and growers understand products and practical agricultural topics more clearly and in connection with Egyptian field reality.",
      cta: { label: "Visit Technical Resources", href: "/technical-library" }
    },
    cta: {
      eyebrow: "Next step",
      title: "Three ways in",
      description:
        "Distributors evaluating a new supplier, international manufacturers looking for a route into the Egyptian market, and growers with a crop question all reach the same people. Tell us which you are. The full company record is on the About page.",
      primaryLabel: "Become a Distributor",
      primaryHref: "/partner-with-us",
      secondaryLabel: "Talk to AgroPest",
      secondaryHref: "/contact",
      tertiaryLabel: "WhatsApp",
      tertiaryHref: whatsappHref,
      backgroundImage: imagePaths.backgrounds.fieldRows
    }
  },
  about: {
    hero: {
      eyebrow: "About",
      title: "Registered Agricultural Inputs for the Egyptian Market — Since 1995",
      subtitle: "AgroPest Control for Trading · Established 1995",
      description:
        "AgroPest Control for Trading selects, registers, imports, and distributes crop protection and crop nutrition brands for the Egyptian market, with organized technical and commercial support for its wholesale and regional distribution partners.",
      backgroundImage: imagePaths.hero.about,
      backgroundPosition: "center 50%",
      backgroundScale: 1.25,
      splitOnLarge: true,
      primaryCta: { label: "Become a Distributor", href: "/partner-with-us" },
      secondaryCta: { label: "Contact Us", href: "/contact" }
    },
    intro: {
      eyebrow: "Our legacy",
      title: "Three decades in the Egyptian input market",
      paragraphs: [
        "AgroPest Control for Trading has operated in the Egyptian agricultural input market since 1995, from a base in Al Nubariya, Beheira — on the Cairo–Alexandria desert road, inside the reclaimed-land farming belt we supply.",
        "We work across two commercial pillars: crop protection, and crop nutrition and yield enhancement. Every product in the portfolio was selected, registered, imported, and supported through a deliberate selection process — from source evaluation through to the design and production of the technical material that carries it in market.",
        "We work with a carefully selected portfolio. Each product in it is followed in market and supported technically and commercially."
      ]
    },
    checklistSection: {
      eyebrow: "Selection",
      title: "How a product enters our portfolio",
      subtitle: "The questions we answer before selection, registration, and importation",
      intro: "Before AgroPest takes on a product, it must pass a fixed set of questions:",
      items: [
        "Does the product address a real, current need in the Egyptian market?",
        "Does it suit Egyptian crops and conditions — Delta clay and reclaimed sand behave differently?",
        "Is the source reliable, and is the technical documentation complete?",
        "Can it be registered and introduced in an organized way?",
        "Can the distributor explain it to a retailer with confidence?",
        "Can the grower understand what it does and when to use it?"
      ]
    },
    sections: [
      {
        eyebrow: "Our partners",
        title: "Wholesalers and regional distributors",
        paragraphs: [
          "AgroPest works with wholesalers and regional distributors across Egypt.",
          "Each partner receives registered products, clear technical documentation, and organized follow-up in market.",
          "We support the product's presence in market through technical content and marketing campaigns focused on specific crops."
        ]
      },
      {
        eyebrow: "Registration",
        title: "Registration comes before availability",
        paragraphs: [
          "Registration is the line between a genuine agricultural input and an unknown one. A registered product carries an official label, a reference standard, and an accountable party behind it.",
          "Every product we distribute is registered with the Ministry of Agriculture and the Agricultural Pesticides Committee before it is offered in the Egyptian market.",
          "The technical data given in our technical leaflets and marketing material is supported by the product's manufacturer, stated on the registered label or the product's technical documentation, or based on current scientific sources."
        ]
      },
      {
        eyebrow: "Sourcing",
        title: "Long-term supplier relationships",
        paragraphs: [
          "We take on a supplier when we can support their product properly in the Egyptian market, not when the price is briefly attractive. Suppliers currently in the portfolio include Agria (Bulgaria), EuroGro (Greece), and Agri Unitech (China).",
          "We work with suppliers over a span of years, which keeps supply stable and technical specifications consistent for each product. That continuity reaches the distributor as a settled, familiar portfolio rather than a line-up that changes from season to season."
        ]
      },
      {
        eyebrow: "Partnership",
        title: "What a distribution partnership includes",
        paragraphs: [
          "We publish organized technical content on our products and the crops they serve — to support the distributor, and to make the product's ideal use clear to the retailer and the grower.",
          "Alongside it: product technical sheets and registration documentation, brochures and product pages, and a clear use case for each product — the crop, the stage it serves, and the problem it addresses.",
          "Follow-up is organized and personal. A named point of contact, not a call center."
        ]
      },
      {
        eyebrow: "Coverage",
        title: "Where we operate",
        paragraphs: [
          "AgroPest supplies distributors across Egypt, including the Alexandria desert road corridor, the Delta, the Upper Egypt governorates, and the reclaimed-land regions of the north-west.",
          "We build long-term relationships with suppliers and distributors because the Egyptian market needs continuity more than it needs transactions."
        ]
      },
      {
        eyebrow: "Direction",
        title: "A trusted source for selected agricultural solutions",
        paragraphs: [
          "AgroPest works to remain a trusted source of selected agricultural solutions in Egypt: a studied portfolio, organized technical content, and stable partnerships.",
          "For a distributor, that means a product that is registered, understood, supported, and already asked for by name."
        ]
      }
    ],
    knowledgeRole: {
      eyebrow: "Technical content",
      title: "The technical material behind the portfolio",
      description:
        "Every product in the portfolio is documented before it is offered: a product brochure, a technical leaflet, a product page, and the registration documentation that supports it. Alongside these, we publish field-facing explanations of what a product does and when it is used, written in Arabic for the grower and the agri-retailer.",
      ctaLabel: "Explore technical resources",
      ctaHref: "/technical-library"
    },
    cta: {
      title: "Working with AgroPest",
      description: "If you are a wholesaler or regional distributor evaluating a new supplier, or an international manufacturer looking for a registration and distribution partner in Egypt, the next step is a direct conversation.",
      primaryLabel: "Become a Distributor",
      primaryHref: "/partner-with-us",
      secondaryLabel: "Contact AgroPest",
      secondaryHref: "/contact"
    }
  },
  solutionsPage: {
    hero: {
      eyebrow: "Solutions",
      title: "Agricultural solutions that make products easier to understand and use with confidence",
      subtitle:
        "AgroPest provides organized agricultural solutions that help distributors, growers, and agricultural engineers work with products more clearly in the market and field.",
      description:
        "We do not present products as trade names only. We connect each product to its practical role: what problem or stage it serves, when it can be used, what recommendation is linked to it, and how it can be explained and presented clearly.",
      backgroundImage: imagePaths.hero.solutions,
      primaryCta: { label: "View products", href: "/products" },
      secondaryCta: { label: "Contact us", href: "/contact" }
    },
    audiencesSection: {
      eyebrow: "Who AgroPest solutions are designed for",
      title: "Solutions serving the market, the field, and partnerships",
      partnerCta: { label: "Learn more about partnering with AgroPest", href: "/partner-with-us" },
      items: [
        { title: "Distributors and local customers", description: "We provide products with a clear place in the market, supported by technical information and materials that help distributors present the product, explain its value, and connect it to crop needs practically." },
        { title: "Growers and agricultural engineers", description: "We simplify product-related information so it is closer to field reality: crop, timing, purpose of use, and important notes before application." },
        { title: "Farms and agricultural companies", description: "We offer a portfolio that can be integrated into crop protection, nutrition, or stress-management programs, helping organize decisions according to crop stage and seasonal conditions." },
        { title: "International companies and suppliers", description: "We help understand Egyptian market needs and how to present products locally, with clear direction toward the appropriate partnership path." }
      ]
    },
    solutionTracksSection: {
      eyebrow: "Solution tracks",
      title: "Four practical tracks from product to decision",
      tracks: [
        { title: "Crop protection", description: "Solutions that support pest and disease management programs across different crops through products with clear recommendations and a defined place within the protection program.", detail: "This track focuses on clarity around the target problem, timing of use, suitable crop, and PHI when present, helping product use stay closer to approved recommendations.", cta: { label: "View crop protection products", href: "/products?category=agrochemicals" } },
        { title: "Plant nutrition", description: "Nutrition solutions that support plant needs across growth stages, including vegetative growth, flowering, fruit set, sizing, and fruit quality.", detail: "We present nutrition products by connecting the nutrient, crop stage, and practical purpose of use, so the product becomes a clear part of the nutrition program rather than only a composition.", cta: { label: "View plant nutrition products", href: "/products?category=specialty-fertilizers" } },
        { title: "Biostimulants and stress management", description: "Solutions that support plant physiological activity and help plants move through periods of heat, salinity, weak growth, or unsuitable conditions.", detail: "This track does not replace nutrition or protection programs, but it helps support plant balance and recovery when used at the right time within an integrated crop program.", cta: { label: "View biostimulants", href: "/products?category=specialty-fertilizers" } },
        { title: "Product technical support", description: "For a product to succeed in the market, it needs clear information that helps people understand and present it.", detail: "AgroPest prepares product pages, brochures, recommendation tables, and technical leaflets that help distributors and agricultural engineers explain products in a simpler way connected to crop needs.", cta: { label: "Explore technical resources", href: "/technical-library" } }
      ]
    },
    valueSection: {
      eyebrow: "Practical value",
      title: "How solutions turn into practical value",
      items: [
        { title: "Clear product role", description: "Each product is presented through its role inside the agricultural program, not only through its trade name." },
        { title: "Easier distributor explanation", description: "Distributors need a clear message that helps them explain the product to customers quickly and confidently." },
        { title: "Better field decisions", description: "When the recommendation is organized, choosing the right product by crop, stage, and conditions becomes easier." },
        { title: "Use closer to recommendations", description: "Clear technical information helps reduce misuse and supports commitment to suitable rates and timings." },
        { title: "Ready presentation materials", description: "Brochures, tables, and product pages make each product easier to explain in the market." }
      ]
    },
    needsSection: {
      eyebrow: "From need to suitable product",
      title: "Questions that help identify the closest track",
      intro: "AgroPest solutions start by understanding the need, then connecting it to the right product category.",
      questions: [
        "Is the problem related to a pest or disease?",
        "Does the crop need nutritional support at a certain stage?",
        "Is there heat, salinity, weak growth, or another stress condition?",
        "Does the distributor need technical material to explain the product?",
        "Is an international company looking for a suitable way to enter the Egyptian market?"
      ],
      conclusion: "Through these questions, choosing the track becomes easier and the product becomes clearer in how it is presented and used."
    },
    contentSupportSection: {
      eyebrow: "Information is part of the solution",
      title: "Content that supports the market, not only the product",
      paragraphs: [
        "AgroPest treats information as part of the solution.",
        "We provide simplified technical content that helps explain topics related to crops, pests, diseases, nutrition, stress, and how the product fits into the agricultural program.",
        "This content supports distributors in explanation, helps engineers and growers understand better, and makes products clearer inside the market."
      ],
      cta: { label: "Explore technical resources", href: "/technical-library" }
    },
    cta: {
      title: "Looking for a solution for a crop or specific problem?",
      description: "Send us the crop type, current stage, and the problem or goal you are looking for, and we will help you reach the category or product closest to your need.",
      primaryLabel: "Contact AgroPest",
      primaryHref: "/contact",
      secondaryLabel: "View Products",
      secondaryHref: "/products"
    }
  },
  productsPage: {
    hero: {
      eyebrow: "Products",
      title: "Explore AgroPest product portfolio",
      subtitle:
        "Browse the AgroPest portfolio through clear paths: start with the main sector, refine by technical category, then open each product profile for practical field and market information.",
      backgroundImage: imagePaths.hero.products
    },
    productCategoriesSection: {
      eyebrow: "Portfolio",
      title: "Product categories",
      description:
        "A premium category structure built around Crop Protection, with supporting nutrition and technical material ranges.",
      cta: { label: "Request Product Information", href: "/contact" }
    },
    rangesSection: {
      eyebrow: "Portfolio ranges",
      title: "Commercially ready product families"
    },
    cta: {
      title: "Looking for the right solution for your crop?",
      description:
        "Contact AgroPest to help you reach the product or technical category that best fits your crop, field condition, or commercial need.",
      primaryLabel: "Contact AgroPest",
      primaryHref: "/contact",
      secondaryLabel: "Explore Technical Resources",
      secondaryHref: "/technical-library"
    }
  },
  libraryPage: {
    hero: {
      eyebrow: "Technical Resources",
      title: "Practical agricultural knowledge from AgroPest",
      subtitle:
        "An organized space that brings together product brochures, technical leaflets, usage recommendations, and visual materials to help distributors, engineers, and growers understand products and agricultural topics more clearly and in closer connection with Egyptian field reality.",
      backgroundImage: imagePaths.hero.library
    },
    section: {
      eyebrow: "Technical resources",
      title: "Practical materials ready to use",
      buttonLabel: "Coming soon"
    },
    knowledgeSection: {
      eyebrow: "Enriching the Egyptian agricultural community",
      title: "Simplified knowledge connected to field reality",
      paragraphs: [
        "AgroPest believes that supporting the agricultural market is not limited to supplying products. It also extends to providing clear and practical technical content that helps explain crop needs and field conditions.",
        "Through this page, we provide simplified knowledge materials in crop protection, plant nutrition, and stress management, supporting better understanding of the problem, the right intervention timing, and the factors that affect field results."
      ],
      items: [
        { title: "Practical technical explanation", description: "Topics connected to crops, pests, diseases, nutrients, stress periods, and application timing, presented in a way that turns technical information into applicable decisions." },
        { title: "Simplified visual presentation", description: "Short videos, infographics, and illustrations that simplify technical details and present them in a modern, easy-to-understand way." },
        { title: "Support for growers, engineers, and distributors", description: "Content that helps explain why a product is used, when to apply it, and its role within crop protection or nutrition programs, supporting more confident decisions in the field and market." }
      ]
    },
    cta: {
      title: "Looking for a technical topic or explanatory material?",
      description:
        "Share the product, crop, or technical point you need, and we can help you reach the right material or prepare clearer content around it.",
      primaryLabel: "Request Technical Material",
      primaryHref: "/contact"
    }
  },
  brochuresPage: {
    hero: {
      eyebrow: "Product Brochures",
      title: "Product brochures",
      subtitle:
        "Organized materials presenting product data, composition, use areas, and key technical recommendations — ready to view or download for distributors, engineers, and growers.",
      backgroundImage: imagePaths.hero.library
    },
    section: {
      eyebrow: "Available brochures",
      title: "Browse product brochures",
      intro: "We're building this library out product by product. Browse the available brochures and technical sheets below — more are on the way."
    },
    products: [
      {
        slug: "rival-duo",
        name: "Rival DUO 45 SC",
        logo: "/images/products/rival-duo-wordmark-en.png",
        logoAlt: "Rival DUO 45 SC",
        category: "Fungicide",
        description: "A dual-action fungicide combining propamocarb and cymoxanil to support late blight and downy mildew programs in potato, tomato, cucurbits, and onion.",
        image: "/images/products/rival-duo-gallery.png",
        imageAlt: "Rival DUO 45 SC packs",
        brochureHref: "/brochures/rival-duo-45-sc-brochure.pdf",
        viewLabel: "View Brochure",
        productPageHref: "/rival-duo-45-sc",
        productPageLabel: "Open Product Page"
      },
      {
        slug: "edegal",
        name: "Edegal 72.2% SL",
        logo: "/images/featured/edegal-featured-logo-en-transparent.png",
        logoAlt: "Edegal 72.2% SL logo",
        category: "Fungicide",
        description: "A systemic fungicide containing propamocarb hydrochloride 72.2% in SL formulation, designed for prevention and early treatment of downy mildew in cucumber, cucurbits, and onion.",
        image: "/images/products/edegal-gallery.png",
        imageAlt: "Edegal 72.2% SL packs",
        brochureHref: "/brochures/edegal-72-2-sl-brochure.pdf",
        viewLabel: "View Brochure",
        productPageHref: "/edegal-72-2-sl",
        productPageLabel: "Open Product Page"
      },
      {
        slug: "lasix",
        name: "Lasix 70 WG",
        logo: "/images/featured/lasix-featured-logo-en-transparent.png",
        logoAlt: "Lasix 70 WG logo",
        category: "Insecticide",
        description: "A systemic insecticide containing acetamiprid 70% in a WG water-dispersible granule formulation, designed to control whitefly and sucking pests within integrated pest management programs.",
        image: "/images/products/lasix-gallery.png",
        imageAlt: "Lasix 70 WG packs",
        brochureHref: "/brochures/lasix-70-wg-brochure.pdf",
        viewLabel: "View Brochure",
        productPageHref: "/lasix-70-wg",
        productPageLabel: "Open Product Page"
      },
      {
        slug: "signal-npk",
        name: "Signal NPK Series",
        logo: "/images/featured/signal-npk-featured-logo-en-transparent.png",
        logoAlt: "Signal NPK Series logo",
        category: "NPK Series",
        description: "A water-soluble NPK series enriched with chelated micronutrients, designed to support plant needs across different growth stages.",
        image: "/images/products/signal-npk-gallery.png",
        imageAlt: "Signal NPK Series packs",
        brochureHref: "/brochures/signal-npk-technical-sheet.pdf",
        viewLabel: "View Technical Sheet",
        productPageHref: "/signal-npk",
        productPageLabel: "Open Product Page"
      },
      {
        slug: "fossil",
        name: "Fossil 400 SL",
        logo: "/images/featured/fossil-featured-logo-en-transparent.png",
        logoAlt: "Fossil 400 SL logo",
        category: "Biostimulant",
        description: "A liquid biostimulant based on 17% Ascophyllum nodosum seaweed extract supported with cytokinin, designed to support root activity, stress tolerance, and fruit quality.",
        image: "/images/products/fossil-gallery.png",
        imageAlt: "Fossil 400 SL pack",
        brochureHref: "/brochures/fossil-400-sl-technical-sheet.pdf",
        viewLabel: "View Technical Sheet",
        productPageHref: "/products/specialty-fertilizers/fossil",
        productPageLabel: "Open Product Page"
      },
      {
        slug: "chrome-pk",
        name: "Chrome PK",
        logo: "/images/products/chrome-pk-gallery.png",
        logoAlt: "Chrome PK pack",
        category: "Phosphite & Stress Support",
        description: "A high-concentration potassium phosphite foliar fertilizer delivering functional PK nutrition with rapid mobility and plant defense-support positioning.",
        image: "/images/products/chrome-pk-gallery.png",
        imageAlt: "Chrome PK pack",
        brochureHref: "/brochures/chrome-pk-technical-sheet.pdf",
        viewLabel: "View Technical Sheet",
        productPageHref: "/products/specialty-fertilizers/chrome-pk",
        productPageLabel: "Open Product Page"
      }
    ],
    comingSoon: {
      title: "More brochures coming soon",
      description: "Brochures for the rest of the AgroPest product portfolio are being prepared and will be added here progressively."
    },
    cta: {
      title: "Need a brochure for a specific product?",
      description: "Tell us which product you need a brochure for, and our team will help you get the right technical material.",
      primaryLabel: "Contact AgroPest",
      primaryHref: "/contact"
    }
  },
  partnerPage: {
    hero: {
      eyebrow: "For international suppliers and partners",
      title: "Partner with us",
      subtitle: "Build agricultural input opportunities in Egypt",
      description:
        "AgroPest Control works with international suppliers and partners to evaluate agricultural product opportunities and prepare them for entry into the Egyptian market through technical understanding, practical market reading, and commercial and marketing preparation that helps products appear clearly to distributors and customers.",
      backgroundImage: imagePaths.hero.partner,
      primaryCta: { label: "Start a conversation", href: "/contact" }
    },
    bridgeSection: {
      eyebrow: "Market entry",
      title: "From technical opportunity to clear market presence",
      paragraphs: [
        "Introducing a new product is not only about registration or importation. It also requires understanding market needs, competitor strength, target crops, product presentation, and the messages that help distributors and customers understand its practical value.",
        "AgroPest supports these stages through opportunity evaluation, market-scene reading, registration and import coordination, and preparation of marketing identity and technical materials that help build product presence and create demand in the Egyptian market."
      ]
    },
    servicesSection: {
      eyebrow: "Capabilities",
      title: "How we support partners",
      items: [
        { title: "Opportunity and market study", description: "Reviewing the product category, target crops, competition, expected pricing, and real market need before deeper steps are taken." },
        { title: "Registration and import readiness", description: "Coordinating specifications, certificates, labels, brochures, and samples needed to support evaluation, registration, and importation." },
        { title: "Branding and marketing materials", description: "Preparing the product story, key messages, brochures, product-page content, and materials that help present the product professionally." },
        { title: "Product marketing and demand creation", description: "Preparing suitable local messages for distributors and growers, and connecting the product to clear crop and program needs." },
        { title: "Access to distribution channels", description: "Introducing suitable products through established local channels with technical and marketing support that helps explain the product and build trust around it." }
      ]
    },
    tracksSection: {
      eyebrow: "Partnership tracks",
      title: "Practical cooperation with serious companies"
    },
    cta: {
      title: "Start with us",
      description: "If you have an agricultural product suitable for the Egyptian market, we can begin an initial review of the opportunity and define the next steps clearly and practically.",
      primaryLabel: "Contact AgroPest",
      primaryHref: "/contact"
    }
  },
  contactPage: {
    hero: {
      eyebrow: "Contact",
      title: "Speak with AgroPest Control",
      subtitle:
        "Reach out for crop protection products, fertilizers, registration coordination, import support, supplier communication, or distributor partnerships.",
      backgroundImage: imagePaths.hero.contact
    }
  },
  contactSection: {
    eyebrow: "Contact",
    defaultTitle: "Start a practical conversation",
    defaultDescription:
      "Tell us what you want to introduce, source, register, or distribute in Egypt. We will respond with the right next step.",
    methods: {
      whatsapp: "WhatsApp",
      email: "Email",
      office: "Office"
    },
    formLabels: {
      name: "Name",
      company: "Company",
      email: "Email",
      phone: "Phone",
      topic: "Topic",
      topicPlaceholder: "Select a topic",
      message: "Inquiry",
      submit: "Send inquiry",
      sending: "Sending...",
      whatsapp: "WhatsApp AgroPest",
      required: "Required"
    },
    topics: [
      { value: "product-info", label: "Product information" },
      { value: "registration-support", label: "Registration support" },
      { value: "import-support", label: "Import support" },
      { value: "partnership", label: "Distributor partnership" },
      { value: "technical-support", label: "Technical support" },
      { value: "other", label: "Other" }
    ],
    validation: {
      nameRequired: "Please enter your name.",
      emailRequired: "Please enter your email.",
      emailInvalid: "Please enter a valid, real email address.",
      topicRequired: "Please select a topic."
    },
    thankYou: {
      title: "Thank you!",
      message: "Your inquiry has been sent. We will reach out to you soon.",
      backToProducts: "Back to products",
      backToHome: "Back to home"
    },
    sendErrorMessage: "Something went wrong and your inquiry could not be sent.",
    sendErrorFallback: "Send it by email instead"
  },
  ctaActions: {
    discussPartnership: { label: "Discuss Partnership", href: "/partner-with-us" },
    requestProductInfo: { label: "Request Product Information", href: "/contact" },
    visitLibrary: { label: "Visit Technical Library", href: "/technical-library" },
    whatsapp: { label: "WhatsApp AgroPest", href: whatsappHref }
  },
  capabilitySystem: [
    { title: "Selected and registered products", eyebrow: "01", description: "A focused portfolio that considers crop needs, registration status, product quality, and fit for the Egyptian market.", detail: "Product confidence" },
    { title: "Practical crop-related information", eyebrow: "02", description: "The product role, timing, and recommendation rates are presented in a way that supports clear decisions.", detail: "Clear use logic" },
    { title: "Distributor-ready support", eyebrow: "03", description: "Brochures, product pages, recommendation tables, and support materials make products easier to present and explain to customers.", detail: "Commercial readiness" },
    { title: "Agricultural community value", eyebrow: "04", description: "Technical content and organized references help share clearer information about products and their correct use.", detail: "Useful technical content" },
    { title: "Follow-up, trust, and continuity", eyebrow: "05", description: "Serious and organized communication with distributors and customers helps maintain product clarity and long-term trust.", detail: "Stable relationship" }
  ],

  workProcess: {
    eyebrow: "For suppliers and international partners",
    title: "A serious local partner for the Egyptian agricultural market",
    description: "AgroPest supports international agricultural companies by coordinating product fit, registration readiness, importation follow-up, product positioning, and distributor access inside Egypt.",
    steps: [
      {
        title: "Opportunity fit",
        description: "Reviewing the product category, target crops, competitive landscape, and practical market need."
      },
      {
        title: "Registration readiness",
        description: "Coordinating specifications, certificates, labels, brochures, and technical files required for local evaluation."
      },
      {
        title: "Importation follow-up",
        description: "Supporting communication around shipment planning, documentation, and commercial preparation."
      },
      {
        title: "Market positioning",
        description: "Preparing the product story, technical logic, and local messages needed for distributors and customers."
      },
      {
        title: "Distribution pathway",
        description: "Introducing suitable products through local channels with clearer materials and practical market understanding."
      }
    ]
  },
  technicalLibraryPreview: {
    eyebrow: "Technical resources",
    title: "For the grower and the retail counter",
    description: "Not every visitor here is buying by the container. We publish what a grower and an agri-retailer can act on: how to recognise a nutrient deficiency or a disease in the field, what is happening inside the plant, and how to tell a registered product from an unknown one. What to apply, and at what rate, stays with the agronomist or the dealer who knows your field.",
    image: imagePaths.hero.libraryPreview,
    imageAlt: "AgroPest technical resources and agricultural knowledge center",
    panel: { eyebrow: "Agricultural knowledge", title: "Brochures, technical leaflets, visual materials, and practical agricultural knowledge." },
    documents: [
      { type: "Brochures", title: "Product brochures", description: "Organized materials presenting product data, composition, use areas, and key technical recommendations.", href: "/brochures", buttonLabel: "View Brochures" },
      { type: "Technical leaflets", title: "Technical leaflets", description: "Simplified topics explaining important points in crop protection, plant nutrition, and stress management." },
      { type: "Visual materials", title: "Visual materials", description: "Visual content that helps explain precise technical information more clearly and in an easier-to-understand way." },
      { type: "Agricultural knowledge", title: "Agricultural knowledge", description: "A knowledge contribution from AgroPest to support the Egyptian agricultural community with practical information for better understanding and more aware decisions." }
    ],
    cta: { label: "Visit Technical Resources", href: "/technical-library" }
  },
  productCategories: [
    { name: "Crop Protection", kicker: "Pesticides", description: "Insecticides and fungicides selected to support important crop protection needs in vegetables, potatoes, greenhouse crops, and other key segments.", image: imagePaths.categories.cropProtection, imageAlt: "Crop rows representing crop protection programs", tags: ["Insecticides", "Fungicides"], href: "/products?category=agrochemicals", ctaLabel: "View Crop Protection" },
    { name: "Plant Nutrition", kicker: "Fertilizers", description: "NPKs, potassium, calcium-boron, phosphites, and specialty nutrition products positioned for practical crop performance needs.", image: imagePaths.categories.plantNutrition, imageAlt: "Field representing plant nutrition programs", tags: ["Specialty fertilizers", "Foliar nutrition"], href: "/products?category=specialty-fertilizers", ctaLabel: "View Plant Nutrition" },
    { name: "Biostimulants", kicker: "Stress and growth support", description: "Seaweed extracts, amino acid-based products, and growth-support solutions that help plants perform during critical crop stages and stress periods.", image: "/images/products/fossil-gallery.png", imageAlt: "Biostimulant product for plant growth support", tags: ["Growth support", "Plant vitality"], href: "/products?category=specialty-fertilizers", ctaLabel: "View Biostimulants" }
  ],
  partnerTracks: [
    {
      title: "International suppliers",
      description: "For companies looking for a local partner who understands the Egyptian market, registration requirements, competitive dynamics, and how to build stable commercial presence for a product."
    },
    {
      title: "Local distributors",
      description: "For companies that need clearly selected products, technical and marketing support materials, and responsive commercial coordination."
    }
  ]
};








