/* Fossil 400 SL landing copy, both locales.

   Every fact here traces to something documented: the Fossil brand book
   ("Inherited Resilience", "Nature Enhanced by Science", the palette and the
   wave/leaf/circle system), the 500 cm³ pack artwork, and the product record
   in lib/products.ts (composition, mode of action, stage recommendations,
   supplier, registration status). Nothing is added that those three do not
   already say. */

export type FossilCopy = {
  dir: "ltr" | "rtl";
  name: string;
  lockup: { src: string; alt: string };
  hero: {
    title: string;
    lead: string;
    primary: string;
    secondary: string;
    facts: string[];
  };
  origin: {
    title: string;
    body: string[];
    compoundsTitle: string;
    compounds: string[];
  };
  crossing: {
    title: string;
    intro: string;
    sea: { value: string; label: string; note: string };
    leaf: { value: string; label: string; note: string };
    packLabel: string;
    pack: string;
  };
  mechanism: {
    title: string;
    intro: string;
    points: { title: string; text: string }[];
  };
  apply: {
    title: string;
    intro: string;
    doseLabel: string;
    stageLabel: string;
    purposeLabel: string;
    crops: {
      id: string;
      label: string;
      target: string;
      dose: string;
      stages: { when: string; why: string }[];
    }[];
    note: string;
  };
  program: {
    title: string;
    body: string;
    rows: { k: string; v: string }[];
  };
  close: {
    title: string;
    body: string;
    primary: string;
    secondary: string;
    label: string;
  };
};

const en: FossilCopy = {
  dir: "ltr",
  name: "Fossil 400 SL",
  lockup: { src: "/images/fossil/fossil-lockup-en.png", alt: "Fossil 400 SL" },
  hero: {
    title: "Nature enhanced by science",
    lead: "A liquid biostimulant built on concentrated Ascophyllum nodosum seaweed extract and supported with cytokinin. It activates roots, improves nutrient-use efficiency, carries the crop through stress, and supports flowering, fruit set and fruit development.",
    primary: "Download the technical sheet",
    secondary: "Talk to AgroPest",
    facts: ["Registered and available", "SL — soluble liquid", "500 cm³", "Eurogro, Greece"]
  },
  origin: {
    title: "Inherited resilience",
    body: [
      "Fossil derives its power from Ascophyllum nodosum, a plant forged in the relentlessly harsh intertidal zones of the North Atlantic — exposed at every low tide, submerged at every high one.",
      "To survive that, the seaweed evolved a biochemical profile built for resilience. Fossil is the transfer of that profile to the crop: not a supplement, a transfer of strength."
    ],
    compoundsTitle: "What the extract carries",
    compounds: ["Mannitol", "Betaines", "Laminarin", "Alginates", "Auxin-like fractions"]
  },
  crossing: {
    title: "Two forces, one solution",
    intro: "Seaweed activity with cytokinin precision — the sea below the line, the leaf above it.",
    sea: {
      value: "17%",
      label: "Ascophyllum nodosum extract",
      note: "The broad biological activity of the seaweed: the compounds the plant built to survive the tide."
    },
    leaf: {
      value: "0.4%",
      label: "Cytokinin (kinetin)",
      note: "The targeted hormonal role: cell division, canopy activity, fruit set and early fruit growth."
    },
    packLabel: "Formulation and pack",
    pack: "SL — soluble liquid · 500 cm³ · foliar spray"
  },
  mechanism: {
    title: "How Fossil works",
    intro:
      "Ascophyllum nodosum provides natural compounds such as mannitol, betaines, laminarin, alginates and auxin-like fractions, while cytokinin supports cell division, canopy activity, fruit set and early fruit development.",
    points: [
      {
        title: "Stronger root establishment",
        text: "Supports an active root system early in the season, improving uptake efficiency and crop tolerance under difficult conditions."
      },
      {
        title: "Physiological balance under stress",
        text: "Helps the plant maintain biological activity during heat, salinity, cold or drought, and through transplant shock."
      },
      {
        title: "Natural plant readiness support",
        text: "Seaweed compounds such as laminarin help alert the plant's natural defence readiness. Fossil is not positioned as a fungicide."
      },
      {
        title: "Fruit set and development support",
        text: "Cytokinin supports cell division in growing tissues, helping through fruit set and the start of fruit growth."
      }
    ]
  },
  apply: {
    title: "When to apply",
    intro:
      "Fossil is sprayed on the canopy at the crop's decisive physiological stages: establishment, active growth, before flowering, through fruit set, and after a stress event.",
    doseLabel: "Foliar rate",
    stageLabel: "Stage",
    purposeLabel: "What it does there",
    crops: [
      {
        id: "vegetables",
        label: "Vegetables",
        target: "Tomato, pepper, cucumber, potato",
        dose: "50 – 75 cm³ / 100 L water",
        stages: [
          {
            when: "3 – 4 days after transplanting, or at full emergence",
            why: "Activate and stimulate a strong, healthy root system to overcome transplant shock."
          },
          {
            when: "During active vegetative growth — repeat every 2 – 3 weeks",
            why: "Increase vegetative growth and leaf area to improve photosynthetic efficiency."
          },
          {
            when: "Before flowering and at the beginning of fruit set",
            why: "Improve flower quality, increase fruit set, and reduce flower and young fruit drop."
          },
          {
            when: "During fruit growth — repeat every 2 – 3 weeks",
            why: "Increase fruit size and quality, improving colour, firmness and sugar content."
          }
        ]
      },
      {
        id: "grapes",
        label: "Grapes",
        target: "Grape vines",
        dose: "50 – 75 cm³ / 100 L water",
        stages: [
          { when: "At the start of new spring vegetative growth", why: "Activate growth and build a strong, healthy canopy." },
          { when: "1 – 2 weeks before flower opening", why: "Increase flower number and quality to support effective fruit set." },
          {
            when: "After fruit set stabilises, berries at 3 – 5 mm",
            why: "Reduce young berry drop and improve cluster size and uniformity."
          },
          { when: "One application after harvest", why: "Help vines recover from crop load and store reserves for the following season." }
        ]
      },
      {
        id: "trees",
        label: "Fruit trees",
        target: "Citrus, mango, olive, pome fruits",
        dose: "30 – 50 cm³ / 100 L water",
        stages: [
          {
            when: "At bud swelling and the start of spring flushes",
            why: "Provide a strong growth push and prepare the tree for a productive season."
          },
          { when: "1 – 2 weeks before flower opening", why: "Improve flower quality and support pollination and fertilisation efficiency." },
          { when: "After fruit set stabilises and petal fall", why: "Increase fruit set percentage and reduce natural young fruit drop." },
          { when: "One application after harvest", why: "Help trees restore activity and store carbohydrates for the new season." }
        ]
      }
    ],
    note: "Spray in the morning or the late afternoon, with good coverage of the canopy."
  },
  program: {
    title: "Where it fits in the programme",
    body: "Fossil is not a direct NPK fertilizer and not a fungicide. It integrates with Signal NPK in stage-based nutrition programmes: Fossil improves physiological readiness and uptake efficiency, while Signal supplies the nutrients each growth stage requires.",
    rows: [
      { k: "Category", v: "Seaweed & biostimulants" },
      { k: "Formulation", v: "SL — soluble liquid" },
      { k: "Composition", v: "Ascophyllum nodosum extract 17% · Cytokinin (kinetin) 0.4%" },
      { k: "Crops", v: "Vegetables, grapes, citrus, fruit trees, stress-exposed crops" },
      { k: "Supplier", v: "Eurogro — Greece" },
      { k: "Registration", v: "Registered and available" }
    ]
  },
  close: {
    title: "Take the technical sheet",
    body: "Composition, formulation, use rates and the technical points a distributor needs to present Fossil accurately.",
    primary: "Download the technical sheet",
    secondary: "Talk to AgroPest",
    label: "Always read the product label before use."
  }
};

const ar: FossilCopy = {
  dir: "rtl",
  name: "فوسيل 400 SL",
  lockup: { src: "/images/fossil/fossil-lockup-ar.png", alt: "فوسيل 400 SL" },
  hero: {
    title: "الطبيعة معززة بالعلم",
    lead: "محفز حيوي سائل يعتمد على مستخلص مركز من طحالب Ascophyllum nodosum ومدعم بالسيتوكينين. ينشّط الجذور، ويرفع كفاءة استخدام العناصر، ويساعد المحصول على تجاوز الإجهاد، ويدعم التزهير والعقد ونمو الثمار.",
    primary: "تحميل الشيت الفني",
    secondary: "تواصل مع أجروبست",
    facts: ["مسجل ومتداول", "SL — سائل قابل للذوبان", "500 سم³", "Eurogro — اليونان"]
  },
  origin: {
    title: "مقاومة موروثة",
    body: [
      "يستمد فوسيل قوته من طحلب Ascophyllum nodosum، وهو نبات تشكّل في مناطق المد والجزر شديدة القسوة شمال المحيط الأطلسي — مكشوف مع كل جزر، غارق مع كل مد.",
      "وللبقاء، طوّر هذا الطحلب تركيبًا حيويًا فريدًا للمقاومة. فوسيل هو نقل هذا التركيب إلى المحصول: ليس مجرد مكمّل، بل انتقال للقوة."
    ],
    compoundsTitle: "ماذا يحمل المستخلص",
    compounds: ["المانيتول", "البيتينات", "اللامينارين", "الألجينات", "مركبات شبيهة بالأوكسينات"]
  },
  crossing: {
    title: "قوتان، حل واحد",
    intro: "نشاط طحلبي مع دقة السيتوكينين — البحر تحت الخط، والورقة فوقه.",
    sea: {
      value: "17%",
      label: "مستخلص Ascophyllum nodosum",
      note: "النشاط الحيوي الواسع لمستخلص الطحالب: المركبات التي بناها النبات ليصمد أمام المد."
    },
    leaf: {
      value: "0.4%",
      label: "سيتوكينين (كينيتين)",
      note: "الدور الهرموني الموجه: انقسام الخلايا، نشاط المجموع الخضري، والعقد وبداية نمو الثمار."
    },
    packLabel: "التركيبة والعبوة",
    pack: "SL — سائل قابل للذوبان · 500 سم³ · رش ورقي"
  },
  mechanism: {
    title: "كيف يعمل فوسيل؟",
    intro:
      "مستخلص Ascophyllum nodosum يمد النبات بمركبات طبيعية مثل المانيتول والبيتينات واللامينارين والألجينات ومركبات شبيهة بالأوكسينات، بينما يضيف السيتوكينين دعمًا موجهًا لانقسام الخلايا ونشاط المجموع الخضري ودعم العقد ونمو الثمار.",
    points: [
      {
        title: "تأسيس جذري أقوى",
        text: "يساعد على بناء مجموع جذري نشط في بداية الموسم، مما ينعكس على كفاءة الامتصاص وتحمل النبات للظروف الصعبة."
      },
      {
        title: "توازن فسيولوجي وقت الإجهاد",
        text: "يساعد النبات على الحفاظ على نشاطه الحيوي عند التعرض للحرارة أو الملوحة أو البرودة أو الجفاف، وعند صدمة الشتل."
      },
      {
        title: "دعم طبيعي لجاهزية النبات",
        text: "مركبات الطحالب مثل اللامينارين تساعد على تنبيه جاهزية النبات الدفاعية الطبيعية، دون اعتبار المنتج مبيدًا فطريًا."
      },
      {
        title: "دعم العقد ونمو الثمار",
        text: "السيتوكينين يدعم انقسام الخلايا في الأنسجة النامية، مما يساعد في مراحل العقد وبداية نمو الثمار."
      }
    ]
  },
  apply: {
    title: "توصيات الاستخدام",
    intro:
      "يُستخدم فوسيل رشًا على المجموع الخضري خلال المراحل الفسيولوجية المهمة: التأسيس، النمو النشط، قبل التزهير، أثناء العقد، وبعد موجات الإجهاد.",
    doseLabel: "معدل الرش الورقي",
    stageLabel: "المرحلة",
    purposeLabel: "الهدف من المعاملة",
    crops: [
      {
        id: "vegetables",
        label: "محاصيل الخضر",
        target: "طماطم، فلفل، خيار، بطاطس",
        dose: "50 – 75 سم³ / 100 لتر ماء",
        stages: [
          { when: "بعد 3 – 4 أيام من الشتل أو عند اكتمال الإنبات", why: "تنشيط مجموع جذري قوي وصحي لتجاوز صدمة الشتل." },
          { when: "خلال النمو الخضري النشط — يُكرر كل 2 – 3 أسابيع", why: "زيادة النمو الخضري والمساحة الورقية لرفع كفاءة التمثيل الضوئي." },
          { when: "قبل التزهير وعند بداية العقد", why: "تحسين جودة الأزهار، زيادة العقد، وتقليل تساقط الأزهار والثمار الصغيرة." },
          { when: "أثناء نمو الثمار — يُكرر كل 2 – 3 أسابيع", why: "زيادة حجم الثمار وجودتها: التلوين والصلابة ومحتوى السكر." }
        ]
      },
      {
        id: "grapes",
        label: "كرومات العنب",
        target: "العنب",
        dose: "50 – 75 سم³ / 100 لتر ماء",
        stages: [
          { when: "مع بداية النموات الخضرية الربيعية", why: "تنشيط النمو وبناء مجموع خضري قوي وصحي." },
          { when: "قبل تفتح الأزهار بـ 1 – 2 أسبوع", why: "زيادة عدد الأزهار وجودتها لدعم العقد الفعّال." },
          { when: "بعد ثبات العقد ووصول الحبات إلى 3 – 5 مم", why: "تقليل تساقط الحبات الصغيرة وتحسين حجم العنقود وتجانسه." },
          { when: "رشة واحدة بعد جمع المحصول", why: "مساعدة الكرمات على التعافي من إجهاد الحمل وتخزين مخزون الموسم التالي." }
        ]
      },
      {
        id: "trees",
        label: "أشجار الفاكهة",
        target: "موالح، مانجو، زيتون، تفاحيات",
        dose: "30 – 50 سم³ / 100 لتر ماء",
        stages: [
          { when: "عند انتفاخ البراعم وبداية النموات الربيعية", why: "دفعة نمو قوية وتجهيز الشجرة لموسم منتج." },
          { when: "قبل تفتح الأزهار بـ 1 – 2 أسبوع", why: "تحسين جودة الأزهار ودعم كفاءة التلقيح والإخصاب." },
          { when: "بعد ثبات العقد وتساقط البتلات", why: "زيادة نسبة العقد وتقليل التساقط الطبيعي للثمار الصغيرة." },
          { when: "رشة واحدة بعد جمع المحصول", why: "استعادة نشاط الأشجار وتخزين الكربوهيدرات للموسم الجديد." }
        ]
      }
    ],
    note: "يفضل الرش صباحًا أو بعد العصر مع تغطية جيدة للمجموع الخضري."
  },
  program: {
    title: "أين يقع فوسيل في البرنامج",
    body: "فوسيل ليس سمادًا NPK مباشرًا ولا مبيدًا فطريًا. يتكامل مع سيجنال NPK في برامج التغذية المرحلية: فوسيل يحسّن الجاهزية الفسيولوجية وكفاءة الامتصاص، وسيجنال يوفر العناصر الغذائية التي تحتاجها كل مرحلة نمو.",
    rows: [
      { k: "الفئة", v: "أعشاب بحرية ومحفزات حيوية" },
      { k: "التركيبة", v: "SL — سائل قابل للذوبان" },
      { k: "التركيب", v: "مستخلص Ascophyllum nodosum 17% · سيتوكينين (كينيتين) 0.4%" },
      { k: "المحاصيل", v: "الخضروات، العنب، الموالح، أشجار الفاكهة، والمحاصيل المعرضة للإجهاد" },
      { k: "المورد", v: "Eurogro — اليونان" },
      { k: "التسجيل", v: "مسجل ومتداول" }
    ]
  },
  close: {
    title: "احصل على الشيت الفني",
    body: "التركيب، التركيبة، معدلات الاستخدام، والنقاط الفنية التي يحتاجها الموزع لعرض فوسيل بدقة.",
    primary: "تحميل الشيت الفني",
    secondary: "تواصل مع أجروبست",
    label: "اقرأ ملصق المنتج دائمًا قبل الاستخدام."
  }
};

export const fossilCopy = { en, ar } as const;
