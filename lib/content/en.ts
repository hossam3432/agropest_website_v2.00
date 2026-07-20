const imagePaths = {
  hero: {
    home: "/images/hero/agropest-field.jpg",
    greenhouse: "/images/hero/agropest-greenhouse.jpg",
    about: "/images/hero/about-partnership.jpg",
    solutions: "/images/hero/solutions-logistics.jpg",
    products: "/images/hero/products-crop-inputs.jpg",
    library: "/images/hero/library-documents.jpg",
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
    warehouse: "/images/backgrounds/warehouse-coordination.jpg"
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
      eyebrow: "Agricultural solutions for Egypt",
      title: "Reliable agricultural solutions for better harvest and greater profit",
      subtitle:
        "AgroPest Control is an Egyptian agricultural trading company dedicated to selecting, registering, importing, and distributing reliable crop protection, plant nutrition, and biostimulant solutions for the Egyptian agricultural market.",
      backgroundImage: imagePaths.hero.home,
      visualImage: imagePaths.hero.greenhouse,
      visualAlt: "Agricultural greenhouse visual for AgroPest product commercialization",
      primaryCta: { label: "Explore Products", href: "/products" },
      secondaryCta: { label: "Talk to AgroPest", href: "/contact" },
      trustBadge: "Over 25 years in the Egyptian agricultural market",
      signatureCards: [
        { title: "A Carefully Selected Portfolio", description: "Selected crop protection, plant nutrition, and biostimulant solutions built around real needs in the Egyptian agricultural market." },
        { title: "Registered Products & Trusted Quality", description: "Carefully selected products supported by clear technical information and practical relevance for distributors and growers." },
        { title: "Long-Term Partnerships", description: "Serious cooperation with international companies to introduce suitable solutions to the Egyptian agricultural market, supported by organized follow-up and clear technical and commercial support." }
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
      eyebrow: "Our commitment",
      title: "AgroPest's commitment to the Egyptian agricultural market",
      paragraphs: [
        "At AgroPest, our commitment starts with the way every product is selected for our portfolio. We believe that supporting growers begins with choosing the right product, so we provide reliable agricultural solutions in crop protection, plant nutrition, and biostimulants that consider quality, official registration, and the needs of the Egyptian market, helping growers and distributors work with each product confidently for better harvests and greater profitability."
      ],
      highlights: []
    },
    productCategoriesSection: {
      eyebrow: "Product portfolio",
      title: "AgroPest Product Portfolio",
      description:
        "Explore AgroPest's selected portfolio across crop protection, plant nutrition, and biostimulants, with clear paths to the right products for each agricultural need.",
      cta: { label: "View Product Portfolio", href: "/products" }
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
      eyebrow: "Why AgroPest?",
      title: "Why the market trusts AgroPest",
      description:
        "AgroPest combines understanding of the Egyptian agricultural market, suitable product selection, and technical and commercial preparation that help distributors and growers evaluate and use each product clearly and confidently.",
      items: [
        { eyebrow: "01", title: "Product screening and selection", description: "Each product is selected after studying its technical and commercial fit and its ability to serve real needs in Egyptian fields and crops." },
        { eyebrow: "02", title: "Registration with the Egyptian Ministry of Agriculture", description: "We rely on officially registered products, supporting distributor and grower confidence while maintaining safe use and crop application." },
        { eyebrow: "03", title: "Clear technical support materials", description: "We provide technical sheets, product pages, and simplified use recommendations that help distributors present each product confidently and help growers understand its role and suitable timing." },
        { eyebrow: "04", title: "Continuity and long-term cooperation", description: "We build stable relationships with suppliers and distributors based on product quality, close follow-up, and continued availability of solutions in the market." }
      ]
    },
    partnersSection: {
      eyebrow: "Our Partners",
      title: "International expertise, selected for Egyptian agriculture",
      description:
        "AgroPest works with global agricultural suppliers to provide crop protection and plant nutrition products suited to the Egyptian market.",
      items: [
        { name: "Agrii Poland", logo: "/images/partners/agrii-logo-supplied.png", logoAlt: "Agrii Poland logo", description: "Foliar fertilization and biostimulation" },
        { name: "Agria Bulgaria", logo: "/images/partners/agria-bulgaria-logo-supplied.png", logoAlt: "Agria Bulgaria logo", description: "Crop protection solutions" },
        { name: "Eurogro Greece", logo: "/images/partners/eurogro-logo-supplied.png", logoAlt: "Eurogro Greece logo", description: "Plant nutrition and specialty fertilizers" },
        { name: "Star CropScience", logo: "/images/partners/star-cropscience-logo-supplied.png", logoAlt: "Star CropScience logo", description: "Crop protection solutions" }
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
      title: "Looking for the right solution for your crop, product line, or market opportunity?",
      description:
        "Explore the product portfolio or contact AgroPest to discuss a crop need, distributor request, supplier opportunity, or technical product information.",
      primaryLabel: "Explore Products",
      primaryHref: "/products",
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
      title: "AgroPest Control for Trading",
      subtitle: "Agricultural and commercial experience in the Egyptian market since 1995",
      description:
        "AgroPest Control for Trading is an Egyptian company operating in the agricultural market since 1995, focused on selecting, registering, importing, and distributing agricultural solutions suited to crop needs in Egypt.",
      backgroundImage: imagePaths.hero.about,
      primaryCta: { label: "View Products", href: "/products" },
      secondaryCta: { label: "Contact Us", href: "/contact" }
    },
    intro: {
      eyebrow: "Identity",
      title: "A company connecting technical expertise with market understanding",
      paragraphs: [
        "From the beginning, AgroPest's role has not been limited to supplying products. It has been about understanding the product, studying market needs, selecting the right source, and organizing the journey of an agricultural solution from evaluation and registration to reaching distributors and growers clearly and reliably.",
        "We believe a good agricultural product does not succeed by trade name alone. It needs clear quality, proper registration, accurate technical information, and practical presentation that helps it be used in the right place and at the right time.",
        "AgroPest works at an important point between the agricultural product, the international supplier, the local distributor, and the Egyptian grower. That is why we view each product as part of an integrated solution, not just a package introduced to the market."
      ]
    },
    checklistSection: {
      eyebrow: "Decision logic",
      title: "How we think when selecting a product",
      subtitle: "From market need to product readiness",
      intro: "Before presenting any product, AgroPest looks at a core set of questions:",
      items: [
        "Does the product address a real market need?",
        "Does it fit Egyptian crops and farming conditions?",
        "Is its source reliable and are its documents clear?",
        "Can it be registered and introduced in an organized way?",
        "Can the distributor explain it with confidence?",
        "Can the grower understand its benefit and how to use it?"
      ],
      conclusion: "These questions help us reduce randomness and select solutions that are more connected to market reality and more likely to continue after entry."
    },
    sections: [
      {
        eyebrow: "Philosophy",
        title: "Selection before expansion",
        paragraphs: [
          "AgroPest does not rely on random expansion in product count. We focus on building a carefully selected agricultural portfolio.",
          "We prefer products that can be understood, registered, supported, and explained clearly, because the agricultural market needs trusted solutions more than it needs many names without a clear meaning.",
          "Our philosophy is that a company's strength is not shown only by portfolio size, but by its ability to choose suitable products, present them confidently, and follow their market presence over the long term."
        ]
      },
      {
        eyebrow: "Our market position",
        title: "Between international suppliers and Egyptian field needs",
        paragraphs: [
          "AgroPest approaches the agricultural market through a practical understanding of three connected circles: the international supplier with the product and manufacturing expertise, the local distributor who needs a clear and trusted product that can be commercially presented, and the grower or agricultural engineer looking for a practical solution suited to the crop and field conditions.",
          "AgroPest's role is to organize this relationship so the product reaches the market not as a name only, but as an understood solution with a clear place in crop protection, nutrition, or plant vitality programs."
        ]
      },
      {
        eyebrow: "Beyond the product",
        title: "Not only a package, but a presentation system",
        paragraphs: [
          "AgroPest believes the success of an agricultural product depends not only on composition or country of origin, but also on how it is presented.",
          "That is why we care about preparing technical information, shaping marketing messages, developing brochures and product pages, and organizing recommendations in a way that helps the product be understood and used better.",
          "This matters to distributors because it gives them clearer selling and explanation tools, and to growers because it helps them make more informed field decisions."
        ]
      },
      {
        eyebrow: "Experience in Egypt",
        title: "Understanding crops, seasons, and decision-making",
        paragraphs: [
          "The Egyptian agricultural market has its own nature. Crops are diverse, seasons change, decisions can be fast, and growers need practical information that can be applied easily.",
          "AgroPest therefore uses a language that combines technical and practical thinking. We do not exaggerate promises or rely only on complex scientific terms. We try to present the product with clear logic: when it is used, why it is used, and what role it plays inside the agricultural program.",
          "This understanding helps us build messages that are closer to distributors and growers, and more suited to the local market."
        ]
      },
      {
        eyebrow: "Work values",
        title: "Trust before selling",
        paragraphs: [
          "AgroPest builds long-term relationships with suppliers, distributors, and customers because the agricultural market needs continuity and trust more than temporary transactions.",
          "We believe trust is built through product clarity, serious follow-up, respect for registration, honest information, and commitment to offering suitable solutions rather than quick commercial choices.",
          "For this reason, AgroPest works to keep its market presence based on seriousness, knowledge, and continuity."
        ]
      },
      {
        eyebrow: "Vision",
        title: "A clearer professional presence for selected agricultural solutions",
        paragraphs: [
          "AgroPest aims to be a trusted platform for selected agricultural solutions in Egypt through a studied product portfolio, organized technical content, and stable partnerships that help deliver real value to the market.",
          "Our vision is for distributors, growers, and international partners to feel that working with AgroPest means working with a company that understands the product, understands the market, and knows how to turn an agricultural solution into a clear and trusted presence in the field."
        ]
      }
    ],
    knowledgeRole: {
      eyebrow: "Knowledge role",
      title: "Clearer information means better use",
      description:
        "Alongside commercial work, AgroPest prepares technical and knowledge content that helps simplify agricultural information related to products, crops, and usage conditions. We believe correct information is an essential part of product value, and that supporting a grower or distributor is not only about supplying a solution, but explaining it clearly and responsibly. That is why AgroPest seeks to provide brochures, technical leaflets, visual materials, and knowledge resources that help improve decision quality in the agricultural market.",
      ctaLabel: "Explore technical resources",
      ctaHref: "/technical-library"
    },
    cta: {
      title: "Want to know more about AgroPest?",
      description: "Whether you are a distributor, farm, agricultural engineer, or company looking for a local partner in the Egyptian market, we would be glad to connect and help you find the right path.",
      primaryLabel: "Contact AgroPest",
      primaryHref: "/contact",
      secondaryLabel: "View Products",
      secondaryHref: "/products"
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
      intro: "We're building this library out product by product. Start with Rival DUO 45 SC below — more product brochures are on the way."
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
      message: "Inquiry",
      submit: "Send inquiry",
      whatsapp: "WhatsApp AgroPest"
    }
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
    title: "Practical materials ready to use",
    description: "AgroPest provides a set of technical materials that help users reach information faster, whether to understand a product, support a technical recommendation, or simplify practical agricultural topics.",
    image: imagePaths.hero.library,
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








