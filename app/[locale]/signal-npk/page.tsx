import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Cairo, IBM_Plex_Mono } from "next/font/google";
import CompositionMatrix, { type Variant, type MatrixLabels } from "./_CompositionMatrix";
import MechanismSection from "./_MechanismSection";

/* ————————————————————————————————————————————————————————————————
   SIGNAL NPK — fluid agri-tech landing page
   Vibrant Leaf Green #008D36 · Midnight Ink #17142D
   Glassmorphism · radiating-signal motif · 3-variant color system
   ———————————————————————————————————————————————————————————————— */

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap"
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap"
});

const GREEN = "#008D36";
const INK = "#17142D";
const BLUE = "#1D4ED8";
const AMBER = "#B45309";

type Locale = "ar" | "en";

/* ————————————————————————————————————————————————————————————————
   CONTENT DICTIONARY
   ———————————————————————————————————————————————————————————————— */

const content = {
  en: {
    dir: "ltr" as const,
    meta: {
      title: "Signal NPK — A Signal the Plants Understand | AgroPest Control",
      description:
        "Signal NPK: three fully soluble, fast-acting NPK formulations (20-20-20, 14-48-0, 12-05-40) with a chelated micronutrient deck and 2.5% active organic catalyst. Manufactured in the EU by Eurogro."
    },
    langSwitch: { label: "العربية", href: "/ar/signal-npk" },
    brand: { name: "SIGNAL", sub: "NPK SERIES" },
    nav: [
      { label: "The Matrix", href: "#matrix" },
      { label: "Mechanism", href: "#mechanism" },
      { label: "Usage", href: "#usage" },
      { label: "Supply", href: "#supply" }
    ],
    hero: {
      kicker: "Foliar & fertigation nutrition system",
      slogan: ["Signal..", "A signal the", "plants understand."],
      lead: "Three precision NPK formulations built on high-purity, low-salt raw materials — absorbed through the leaf within hours, not days. One chelated micronutrient deck, one organic catalyst, three macro ratios to steer the entire season.",
      ctaPrimary: "Explore the matrix",
      ctaSecondary: "Talk to an agronomist",
      badges: [
        { big: "100%", small: "Fully soluble · zero residue" },
        { big: "LOW-BIURET", small: "High-purity urea source" },
        { big: "FAST", small: "Leaf response in hours" }
      ],
      packAlt: "Signal NPK 20-20-20 soluble fertilizer pack"
    },
    matrix: {
      index: "01 — THE MATRIX",
      title: "One system. Three signals.",
      intro: "Every Signal formulation shares the same chelated micronutrient deck and active organic catalyst — only the macro ratio changes. Switch the variant to see the full composition.",
      labels: {
        macroTitle: "Macro elements",
        microTitle: "Chelated micronutrient deck",
        microNote: "shared across all three formulations · w/w %",
        organicTitle: "Active organic catalyst",
        organicValue: "2.5%",
        organicText:
          "Organic matter carrying vitamins, polysaccharides and free amino acids — the biological trigger that accelerates uptake and metabolic response inside the plant.",
        regLabel: "Ministry of Agriculture reg.",
        wPercent: "w/w %",
        micro: [
          { symbol: "Fe", label: "Iron", value: "0.10" },
          { symbol: "Zn", label: "Zinc", value: "0.05" },
          { symbol: "Mn", label: "Manganese", value: "0.05" },
          { symbol: "B", label: "Boron", value: "0.02" },
          { symbol: "Mo", label: "Molybdenum", value: "0.001" },
          { symbol: "Cu", label: "Copper", value: "0.03" }
        ]
      },
      variants: [
        {
          id: "20-20-20",
          name: "Balanced",
          tagline: "Whole-season drive",
          npk: "20-20-20",
          stage: "Active vegetative growth",
          color: GREEN,
          soft: "#E9F6EE",
          image: "/images/products/signal-npk-20-20-20-product.png",
          reg: "12528 / 1",
          macro: [
            { symbol: "N", label: "Nitrogen", value: "20" },
            { symbol: "P₂O₅", label: "Phosphorus", value: "20" },
            { symbol: "K₂O", label: "Potassium", value: "20" }
          ],
          focus: "The all-rounder — equal macro thirds for steady canopy build and balanced vegetative drive across the whole season."
        },
        {
          id: "14-48-0",
          name: "High Phosphorus",
          tagline: "Root & bloom",
          npk: "14-48-0",
          stage: "Rooting · transplanting · flowering",
          color: BLUE,
          soft: "#EAF0FD",
          image: "/images/products/signal-npk-14-48-0-product.png",
          reg: "12525 / 1",
          macro: [
            { symbol: "N", label: "Nitrogen", value: "14" },
            { symbol: "P₂O₅", label: "Phosphorus", value: "48" },
            { symbol: "K₂O", label: "Potassium", value: "0" }
          ],
          focus: "A phosphorus surge for establishment — pushes root architecture at transplanting and fuels flower initiation and fruit set."
        },
        {
          id: "12-05-40",
          name: "High Potassium",
          tagline: "Fill & finish",
          npk: "12-05-40",
          stage: "Fruit filling · colour · quality",
          color: AMBER,
          soft: "#FBF1E6",
          image: "/images/products/signal-npk-12-5-40-product.png",
          reg: "14152 / 1",
          macro: [
            { symbol: "N", label: "Nitrogen", value: "12" },
            { symbol: "P₂O₅", label: "Phosphorus", value: "05" },
            { symbol: "K₂O", label: "Potassium", value: "40" }
          ],
          focus: "The finisher — potassium-loaded for fruit sizing, sugar transport, colour development and final harvest quality."
        }
      ]
    },
    mech: {
      index: "02 — MECHANISM",
      title: "From leaf surface to phloem, in hours.",
      intro: "Signal bypasses the bottlenecks of soil nutrition entirely. Nutrients enter through the leaf surface and travel both directions through the phloem, reaching the tissue that needs them within hours of spraying.",
      steps: [
        {
          no: "01",
          title: "Foliar intake",
          text: "The fully soluble, low-salt formulation penetrates the leaf cuticle and enters through the stomata — bypassing soil alkalinity, low soil temperature, drought, salinity and damaged root systems."
        },
        {
          no: "02",
          title: "Phloem loading",
          text: "Monosaccharides and organic elements act as transport vectors, loading nutrients directly into the sieve tubes of the phloem immediately after leaf entry."
        },
        {
          no: "03",
          title: "Bi-directional transport",
          text: "Nutrients move acropetally and basipetally at once — feeding shoots, fruit and roots from a single foliar application, with visible response within hours."
        }
      ],
      figureLabel: "FIG. 01 — PHLOEM TRANSPORT PATHWAY"
    },
    usage: {
      index: "03 — USAGE GUIDE",
      title: "Two routes in. One clean tank.",
      intro: "Signal dissolves completely with no residue — nozzles and drip lines stay clean.",
      cards: [
        {
          title: "Foliar spraying",
          rate: "2 – 3",
          unit: "g / litre of water",
          note: "Full-cover spray targeting leaf undersides, where stomatal density peaks. Spray in mild temperatures — early morning or late afternoon."
        },
        {
          title: "Fertigation / soil",
          rate: "4 – 5",
          unit: "g / litre of water",
          note: "Delivered through the irrigation or drip fertigation system with the water flow. Prepare fresh with continuous agitation."
        }
      ],
      timingHead: "Season program",
      timing: [
        { stage: "Establishment & rooting", formula: "14-48-0", color: BLUE, window: "Transplanting → early vegetative" },
        { stage: "Vegetative growth", formula: "20-20-20", color: GREEN, window: "Active shoot & canopy build" },
        { stage: "Flowering & set", formula: "14-48-0", color: BLUE, window: "Pre-bloom → fruit set" },
        { stage: "Fruit filling & finish", formula: "12-05-40", color: AMBER, window: "Sizing → colour → harvest" }
      ],
      practiceHead: "Best practice",
      practice: [
        "Target the lower leaf surface, where stomatal availability is highest.",
        "Align the spray with the wind vector so the cloud carries onto the canopy.",
        "Compatible with most fertilizers and pesticides — always run a jar test before tank-mixing.",
        "Never leave a mixed tank overnight."
      ]
    },
    footer: {
      index: "04 — SUPPLY",
      title: "Manufactured in the EU. Delivered to your field.",
      cols: [
        {
          h: "DISTRIBUTED IN EGYPT BY",
          lines: ["AgroPest Control for Trading", "80 Tayaran st., New Nozha", "Cairo, Egypt"]
        },
        {
          h: "PACKAGING",
          lines: ["1 kg fully soluble powder", "Shelf life: 5 years from production", "Store sealed, cool and dry"]
        },
        {
          h: "REGISTRATION — EGYPT",
          lines: ["20-20-20 · 12528 / 1", "14-48-0 · 12525 / 1", "12-05-40 · 14152 / 1"]
        }
      ],
      contactHead: "TECHNICAL SUPPORT",
      phones: ["+20 101 486 3909", "+20 100 252 0979"],
      email: "info@agropestcontrol.com",
      site: "www.agropestcontrol.com",
      legal: "© AgroPest Control for Trading — Signal is manufactured by Eurogro, Greece."
    }
  },
  ar: {
    dir: "rtl" as const,
    meta: {
      title: "سيجنال NPK — إشارة يفهمها النبات | أجروبست كنترول",
      description:
        "سيجنال NPK: ثلاث تركيبات تامة الذوبان سريعة المفعول (20-20-20 و14-48-0 و12-05-40) مع مجموعة عناصر صغرى مخلبية ومحفّز عضوي نشط 2.5%. تصنيع أوروبي بواسطة يورو جرو."
    },
    langSwitch: { label: "English", href: "/en/signal-npk" },
    brand: { name: "سيجنال", sub: "سلسلة NPK" },
    nav: [
      { label: "المصفوفة", href: "#matrix" },
      { label: "آلية العمل", href: "#mechanism" },
      { label: "الاستخدام", href: "#usage" },
      { label: "التوريد", href: "#supply" }
    ],
    hero: {
      kicker: "نظام تغذية ورقي وأرضي متكامل",
      slogan: ["سيجنال..", "إشارة", "يفهمها النبات."],
      lead: "ثلاث تركيبات NPK دقيقة مبنية على خامات عالية النقاوة منخفضة الملوحة — يمتصها النبات عبر الورقة خلال ساعات لا أيام. مجموعة عناصر صغرى مخلبية واحدة، ومحفّز عضوي واحد، وثلاث نسب كبرى تقود الموسم بأكمله.",
      ctaPrimary: "استكشف المصفوفة",
      ctaSecondary: "تحدث مع مهندس زراعي",
      badges: [
        { big: "100%", small: "تام الذوبان · بدون رواسب" },
        { big: "منخفض البيوريت", small: "يوريا عالية النقاوة" },
        { big: "سريع", small: "استجابة ورقية خلال ساعات" }
      ],
      packAlt: "عبوة سماد سيجنال NPK 20-20-20 تام الذوبان"
    },
    matrix: {
      index: "01 — المصفوفة",
      title: "نظام واحد. ثلاث إشارات.",
      intro: "تشترك كل تركيبات سيجنال في نفس مجموعة العناصر الصغرى المخلبية والمحفّز العضوي النشط — يتغيّر توازن العناصر الكبرى فقط. بدّل بين التركيبات لعرض التركيب الكامل.",
      labels: {
        macroTitle: "العناصر الكبرى",
        microTitle: "العناصر الصغرى المخلبية",
        microNote: "مشتركة بين التركيبات الثلاث · وزن/وزن %",
        organicTitle: "المحفّز العضوي النشط",
        organicValue: "2.5%",
        organicText:
          "مادة عضوية تحمل الفيتامينات والسكريات المتعددة والأحماض الأمينية الحرة — المحفّز الحيوي الذي يسرّع الامتصاص والاستجابة الأيضية داخل النبات.",
        regLabel: "تسجيل وزارة الزراعة",
        wPercent: "وزن/وزن %",
        micro: [
          { symbol: "Fe", label: "حديد", value: "0.10" },
          { symbol: "Zn", label: "زنك", value: "0.05" },
          { symbol: "Mn", label: "منجنيز", value: "0.05" },
          { symbol: "B", label: "بورون", value: "0.02" },
          { symbol: "Mo", label: "موليبدنم", value: "0.001" },
          { symbol: "Cu", label: "نحاس", value: "0.03" }
        ]
      },
      variants: [
        {
          id: "20-20-20",
          name: "المتوازن",
          tagline: "قيادة الموسم كاملًا",
          npk: "20-20-20",
          stage: "النمو الخضري النشط",
          color: GREEN,
          soft: "#E9F6EE",
          image: "/images/products/signal-npk-20-20-20-product.png",
          reg: "12528 / 1",
          macro: [
            { symbol: "N", label: "نيتروجين", value: "20" },
            { symbol: "P₂O₅", label: "فوسفور", value: "20" },
            { symbol: "K₂O", label: "بوتاسيوم", value: "20" }
          ],
          focus: "التركيبة الشاملة — أثلاث كبرى متساوية لبناء مجموع خضري ثابت ونمو متوازن على مدار الموسم."
        },
        {
          id: "14-48-0",
          name: "عالي الفسفور",
          tagline: "تجذير وإزهار",
          npk: "14-48-0",
          stage: "التجذير · الشتل · الإزهار",
          color: BLUE,
          soft: "#EAF0FD",
          image: "/images/products/signal-npk-14-48-0-product.png",
          reg: "12525 / 1",
          macro: [
            { symbol: "N", label: "نيتروجين", value: "14" },
            { symbol: "P₂O₅", label: "فوسفور", value: "48" },
            { symbol: "K₂O", label: "بوتاسيوم", value: "0" }
          ],
          focus: "دفعة فسفورية للتأسيس — تدفع بناء المجموع الجذري عند الشتل وتغذي بدء الإزهار وعقد الثمار."
        },
        {
          id: "12-05-40",
          name: "عالي البوتاسيوم",
          tagline: "امتلاء وإنهاء",
          npk: "12-05-40",
          stage: "امتلاء الثمار · التلوين · الجودة",
          color: AMBER,
          soft: "#FBF1E6",
          image: "/images/products/signal-npk-12-5-40-product.png",
          reg: "14152 / 1",
          macro: [
            { symbol: "N", label: "نيتروجين", value: "12" },
            { symbol: "P₂O₅", label: "فوسفور", value: "05" },
            { symbol: "K₂O", label: "بوتاسيوم", value: "40" }
          ],
          focus: "تركيبة الإنهاء — محمّلة بالبوتاسيوم لتحجيم الثمار ونقل السكريات وتطوير اللون وجودة الحصاد النهائية."
        }
      ]
    },
    mech: {
      index: "02 — آلية العمل",
      title: "من سطح الورقة إلى اللحاء، خلال ساعات.",
      intro: "يتجاوز سيجنال معوقات التغذية الأرضية تمامًا. تدخل العناصر عبر سطح الورقة وتنتقل في الاتجاهين خلال اللحاء، لتصل إلى الأنسجة المحتاجة خلال ساعات من الرش.",
      steps: [
        {
          no: "01",
          title: "الامتصاص الورقي",
          text: "التركيبة تامة الذوبان منخفضة الملوحة تنفذ عبر الطبقة الشمعية للورقة وتدخل من خلال الثغور — متجاوزةً قلوية التربة وبرودتها والجفاف والملوحة وتلف الجذور."
        },
        {
          no: "02",
          title: "التحميل في اللحاء",
          text: "تعمل السكريات الأحادية والعناصر العضوية كوسائط نقل، فتُحمَّل العناصر مباشرة في الخلايا الغربالية باللحاء فور دخولها الورقة."
        },
        {
          no: "03",
          title: "انتقال في الاتجاهين",
          text: "تتحرك العناصر صعودًا وهبوطًا معًا — لتغذي الأفرع والثمار والجذور من رشة واحدة، باستجابة ملحوظة خلال ساعات."
        }
      ],
      figureLabel: "شكل 01 — مسار الانتقال عبر اللحاء"
    },
    usage: {
      index: "03 — دليل الاستخدام",
      title: "طريقان للداخل. تنك نظيف دائمًا.",
      intro: "يذوب سيجنال ذوبانًا تامًا دون أي رواسب — فتبقى البشابير وخطوط التنقيط نظيفة.",
      cards: [
        {
          title: "الرش الورقي",
          rate: "2 – 3",
          unit: "جم / لتر ماء",
          note: "رش غامر يستهدف السطح السفلي للأوراق حيث تتركز الثغور. يُرَش في الحرارة المعتدلة — الصباح الباكر أو قبيل الغروب."
        },
        {
          title: "التسميد الأرضي / بالتنقيط",
          rate: "4 – 5",
          unit: "جم / لتر ماء",
          note: "يُضاف مع مياه الري أو عبر شبكة التسميد بالتنقيط. يُحضَّر المحلول طازجًا مع تقليب مستمر."
        }
      ],
      timingHead: "برنامج الموسم",
      timing: [
        { stage: "التأسيس والتجذير", formula: "14-48-0", color: BLUE, window: "الشتل ← بداية النمو الخضري" },
        { stage: "النمو الخضري", formula: "20-20-20", color: GREEN, window: "بناء المجموع الخضري النشط" },
        { stage: "الإزهار والعقد", formula: "14-48-0", color: BLUE, window: "قبيل التزهير ← عقد الثمار" },
        { stage: "امتلاء الثمار والإنهاء", formula: "12-05-40", color: AMBER, window: "التحجيم ← التلوين ← الحصاد" }
      ],
      practiceHead: "أفضل الممارسات",
      practice: [
        "استهداف السطح السفلي للورقة حيث تبلغ كثافة الثغور ذروتها.",
        "توجيه الرش مع اتجاه الرياح حتى يُحمل الرذاذ إلى المجموع الخضري.",
        "يقبل الخلط مع معظم الأسمدة والمبيدات — مع إجراء اختبار توافق قبل الخلط دائمًا.",
        "لا يُترك التنك مخلوطًا لليوم التالي."
      ]
    },
    footer: {
      index: "04 — التوريد",
      title: "تصنيع أوروبي. يصل إلى حقلك.",
      cols: [
        {
          h: "الوكيل والموزّع في مصر",
          lines: ["أجروبست كنترول للتجارة", "80 ش الطيران، النزهة الجديدة", "القاهرة، مصر"]
        },
        {
          h: "العبوات",
          lines: ["1 كجم مسحوق تام الذوبان", "الصلاحية: 5 سنوات من تاريخ الإنتاج", "يُحفظ محكم الغلق في مكان بارد وجاف"]
        },
        {
          h: "التسجيل — مصر",
          lines: ["20-20-20 · 12528 / 1", "14-48-0 · 12525 / 1", "12-05-40 · 14152 / 1"]
        }
      ],
      contactHead: "الدعم الفني",
      phones: ["+20 101 486 3909", "+20 100 252 0979"],
      email: "info@agropestcontrol.com",
      site: "www.agropestcontrol.com",
      legal: "© أجروبست كنترول للتجارة — سيجنال من تصنيع يورو جرو، اليونان."
    }
  }
};

/* ————————————————————————————————————————————————————————————————
   GLOBAL KEYFRAMES — radiating signal · float · fade
   ———————————————————————————————————————————————————————————————— */

const keyframes = `
@keyframes sgRadiate {
  0%   { transform: scale(0.22); opacity: 0.75; }
  60%  { opacity: 0.18; }
  100% { transform: scale(1.05); opacity: 0; }
}
@keyframes sgFloat {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-12px); }
}
@keyframes sgFadeUp {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}
.sg-ring {
  position: absolute;
  inset: 0;
  border-radius: 9999px;
  border: 1.5px solid currentColor;
  opacity: 0;
  animation: sgRadiate 4.8s cubic-bezier(0.16, 1, 0.3, 1) infinite;
}
.sg-float { animation: sgFloat 6s ease-in-out infinite; }
.sg-float-slow { animation: sgFloat 8s ease-in-out infinite; }
.sg-fade-up { animation: sgFadeUp 0.6s ease both; }
@media (prefers-reduced-motion: reduce) {
  .sg-ring, .sg-float, .sg-float-slow, .sg-fade-up, .animate-ping { animation: none !important; }
}
`;

/* ————————————————————————————————————————————————————————————————
   PRIMITIVES
   ———————————————————————————————————————————————————————————————— */

function SignalMark({ size = 36, color = GREEN }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path
        d="M32 6c-4.5 6.5-5.8 13.2-4 20.4C24 21 18.6 17.6 11.6 16.6c1 8.4 5.6 14.8 13.6 18.8h13.6c8-4 12.6-10.4 13.6-18.8-7 1-12.4 4.4-16.4 9.8 1.8-7.2.5-13.9-4-20.4Z"
        fill={color}
      />
      <path d="M20 44c3.4-2.7 7.4-4 12-4s8.6 1.3 12 4" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M25 52c2.1-1.6 4.4-2.4 7-2.4s4.9.8 7 2.4" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="32" cy="59" r="2.6" fill={color} />
    </svg>
  );
}

function RadiatingRings({
  className = "",
  color = GREEN,
  rings = 4,
  duration = 4.8
}: {
  className?: string;
  color?: string;
  rings?: number;
  duration?: number;
}) {
  return (
    <div className={`pointer-events-none absolute ${className}`} style={{ color }} aria-hidden="true">
      {Array.from({ length: rings }).map((_, i) => (
        <span key={i} className="sg-ring" style={{ animationDelay: `${(i * duration) / rings}s` }} />
      ))}
    </div>
  );
}

function SectionHead({ index, title, intro, dark = false, titleLeading = "leading-[1.4]" }: { index?: string; title: string; intro?: string; dark?: boolean; titleLeading?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {index ? (
        <span
          className={`${mono.className} inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[11px] font-medium tracking-[0.22em] ${
            dark ? "border-white/15 bg-white/5 text-[#3fbf6e]" : "border-[#008D36]/20 bg-white/60 text-[#008D36] backdrop-blur-md"
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
          {index}
        </span>
      ) : null}
      <h2 className={`mt-5 text-3xl font-black ${titleLeading} tracking-tight md:text-5xl ${dark ? "text-white" : "text-[#17142D]"}`}>
        {title}
      </h2>
      {intro ? (
        <p className={`mt-4 text-base leading-relaxed md:text-lg ${dark ? "text-white/60" : "text-slate-600"}`}>{intro}</p>
      ) : null}
    </div>
  );
}

/* ————————————————————————————————————————————————————————————————
   PAGE
   ———————————————————————————————————————————————————————————————— */

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale: Locale = (await params).locale === "ar" ? "ar" : "en";
  return { title: content[locale].meta.title, description: content[locale].meta.description };
}

export default async function SignalNpkPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (localeParam !== "ar" && localeParam !== "en") notFound();
  const locale = localeParam as Locale;
  const t = content[locale];

  return (
    <div
      dir={t.dir}
      className={`${cairo.className} relative min-h-screen overflow-x-clip bg-[#F4F8F5] text-[#17142D] antialiased`}
    >
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      {/* ambient washes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 start-1/2 h-[640px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,#008D3618,transparent)] rtl:translate-x-1/2" />
        <div className="absolute top-[38%] -start-64 h-[560px] w-[560px] rounded-full bg-[radial-gradient(closest-side,#1D4ED810,transparent)]" />
        <div className="absolute bottom-[8%] -end-64 h-[560px] w-[560px] rounded-full bg-[radial-gradient(closest-side,#B4530910,transparent)]" />
      </div>

      {/* ————— floating glass navbar ————— */}
      <header className="sticky top-[90px] z-40 px-4 pt-5">
        <div className="mx-auto flex w-fit items-center justify-center rounded-full border border-white/70 bg-white/70 py-2.5 px-5 shadow-lg shadow-slate-900/5 backdrop-blur-md">
          <a href="#top" className="flex items-center gap-2.5">
            <SignalMark size={26} />
            <span className="text-lg font-black tracking-tight">{t.brand.name}</span>
            <span className={`${mono.className} hidden text-[9px] tracking-[0.3em] text-[#008D36] sm:block`}>
              {t.brand.sub.replace(/سلسلة\s*/, "")}
            </span>
          </a>
        </div>
      </header>

      <main id="top" className="relative">
        {/* ————— hero ————— */}
        <section className="relative pb-20 pt-16 md:pb-28 md:pt-24">
          <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 md:px-8 lg:grid-cols-2 lg:gap-8">
            {/* slogan */}
            <div className="relative z-10">
              <p className={`${mono.className} text-[11px] font-medium uppercase tracking-[0.28em] text-[#008D36]`}>
                {t.hero.kicker}
              </p>
              <h1 className="mt-5 text-5xl font-black leading-[2] tracking-tight md:text-7xl">
                {t.hero.slogan[0]}
                <br />
                {t.hero.slogan[1]}
                <br />
                <span className="text-[#008D36]">{t.hero.slogan[2]}</span>
              </h1>
              <p className="mt-12 max-w-xl text-base leading-relaxed text-slate-600 md:text-lg">{t.hero.lead}</p>
            </div>

            {/* pack + radiating signal + floating badges */}
            <div className="relative mx-auto flex h-[440px] w-full max-w-lg items-center justify-center sm:h-[540px]">
              <RadiatingRings className="inset-0 m-auto h-[320px] w-[320px] sm:h-[460px] sm:w-[460px]" />
              <Image
                src="/images/products/signal-npk-20-20-20-product.png"
                alt={t.hero.packAlt}
                width={760}
                height={760}
                priority
                sizes="(min-width: 640px) 420px, 320px"
                className="sg-float-slow relative z-10 h-72 w-auto object-contain drop-shadow-2xl sm:h-96"
              />
              {t.hero.badges.map((b, i) => (
                <div
                  key={b.big}
                  className={`sg-float absolute z-20 rounded-2xl border border-white/70 bg-white/60 px-4 py-3 shadow-xl shadow-slate-900/10 backdrop-blur-md ${
                    i === 0 ? "start-0 top-10" : i === 1 ? "bottom-16 end-0" : "-start-2 bottom-24 sm:start-2"
                  }`}
                  style={{ animationDelay: `${i * 1.4}s` }}
                >
                  <span className={`${mono.className} block text-sm font-semibold text-[#008D36]`} dir="ltr">
                    {b.big}
                  </span>
                  <span className="mt-0.5 block text-[11px] font-semibold text-slate-500">{b.small}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ————— the matrix ————— */}
        <section id="matrix" className="relative scroll-mt-48 py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <SectionHead title={t.matrix.title} intro={t.matrix.intro} />
            <div className="mt-12">
              <CompositionMatrix
                variants={t.matrix.variants as ReadonlyArray<Variant>}
                labels={t.matrix.labels as MatrixLabels}
                dir={t.dir}
              />
            </div>
          </div>
        </section>

        {/* ————— mechanism showcase ————— */}
        <section id="mechanism" className="relative scroll-mt-48 px-4 py-8">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-[#17142D] px-6 py-20 text-white md:px-14 md:py-24">
            <RadiatingRings
              className="-end-40 -top-40 h-[520px] w-[520px] opacity-60"
              color="#3fbf6e"
              rings={3}
              duration={6}
            />
            <div className="pointer-events-none absolute -bottom-56 -start-56 h-[560px] w-[560px] rounded-full bg-[radial-gradient(closest-side,#008D3626,transparent)]" aria-hidden="true" />

            <div className="relative">
              <SectionHead dark title={t.mech.title} intro={t.mech.intro} titleLeading="leading-[3]" />
              <MechanismSection mech={t.mech} dir={t.dir} />
            </div>
          </div>
        </section>

        {/* ————— usage guide ————— */}
        <section id="usage" className="relative scroll-mt-48 py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <SectionHead title={t.usage.title} intro={t.usage.intro} />

            {/* application cards */}
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {t.usage.cards.map((c) => (
                <div
                  key={c.title}
                  className="group relative overflow-hidden rounded-3xl border border-white/70 bg-white/60 p-8 shadow-lg shadow-slate-900/5 backdrop-blur-md transition-shadow hover:shadow-xl"
                >
                  <div
                    className="pointer-events-none absolute -end-16 -top-16 h-48 w-48 rounded-full bg-[radial-gradient(closest-side,#008D3620,transparent)] transition-transform duration-500 group-hover:scale-125"
                    aria-hidden="true"
                  />
                  <h3 className="text-xl font-extrabold tracking-tight">{c.title}</h3>
                  <div className="mt-5 flex items-baseline gap-3">
                    <span
                      className={`${mono.className} text-6xl font-semibold tabular-nums tracking-tight text-[#008D36]`}
                      dir="ltr"
                      style={{ unicodeBidi: "bidi-override" }}
                    >
                      {c.rate}
                    </span>
                    <span className={`${mono.className} text-sm text-slate-500`}>{c.unit}</span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600">{c.note}</p>
                </div>
              ))}
            </div>

            {/* season program + best practice */}
            <div className="mt-5 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="rounded-3xl border border-white/70 bg-white/60 p-7 shadow-lg shadow-slate-900/5 backdrop-blur-md md:p-8">
                <h3 className={`${mono.className} text-[11px] font-medium uppercase tracking-[0.22em] text-slate-500`}>
                  {t.usage.timingHead}
                </h3>
                <div className="mt-5 space-y-3">
                  {t.usage.timing.map((row) => (
                    <div
                      key={row.stage + row.window}
                      className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl border border-slate-200/70 bg-white/70 px-5 py-4"
                    >
                      <span className="min-w-40 flex-1 text-sm font-bold">{row.stage}</span>
                      <span
                        className={`${mono.className} rounded-full px-3 py-1 text-xs font-semibold text-white`}
                        style={{ backgroundColor: row.color }}
                        dir="ltr"
                      >
                        {row.formula}
                      </span>
                      <span className="w-full text-xs leading-relaxed text-slate-500 sm:w-auto sm:flex-1">{row.window}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-3xl border border-white/70 bg-white/60 p-7 shadow-lg shadow-slate-900/5 backdrop-blur-md md:p-8">
                <h3 className={`${mono.className} text-[11px] font-medium uppercase tracking-[0.22em] text-slate-500`}>
                  {t.usage.practiceHead}
                </h3>
                <ol className="mt-5 space-y-4">
                  {t.usage.practice.map((p, i) => (
                    <li key={p} className="flex gap-4">
                      <span className={`${mono.className} pt-0.5 text-xs font-semibold text-[#008D36]`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm leading-relaxed text-slate-600">{p}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ————— footer ————— */}
      <footer id="supply" className="relative scroll-mt-48 px-4 pb-4">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-[#17142D] px-6 py-16 text-white md:px-14 md:py-20">
          <RadiatingRings className="-bottom-48 -start-48 h-[480px] w-[480px] opacity-40" color="#3fbf6e" rings={3} duration={6} />
          <div className="relative flex flex-col items-center justify-center text-center">
            <SectionHead dark title={t.footer.title} />
            <Link
              href={`/${locale}/brochures`}
              className="mt-10 rounded-full bg-[#3fbf6e] px-8 py-4 text-sm font-bold text-[#17142D] shadow-lg shadow-[#3fbf6e]/30 transition-colors hover:bg-[#2fa856]"
            >
              {locale === "ar" ? "تحميل النشرة الفنية" : "Download Technical Brochure"}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
