import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import StickyLogoBar from "./_StickyLogoBar";
import { getLocalePage, type LocalePageProps } from "@/app/[locale]/_utils";
import { locales, type Locale } from "@/lib/content";

const cairo = Cairo({ subsets: ["arabic", "latin"], weight: ["400", "500", "600", "700", "800"], display: "swap" });

/* Brand palette sampled from the Lasix 70 WG leaflet & logo assets */
const PETROL = "#0B4B67"; // wordmark / headings
const ORANGE = "#F07728"; // checkmark / accents
const CYAN = "#3FC8E4"; // checkmark offset shadow
const GREEN = "#2B9646"; // field-green tiles
const TEAL = "#0C594F"; // deep teal tiles
const CREAM = "#F7F2EF"; // warm paper background
const YELLOW = "#F2CE1B"; // sachet yellow

const content = {
  en: {
    dir: "ltr",
    nav: { name: "LASIX 70 WG", tag: "Insecticide", reg: "Reg. No. 4828" },
    logo: { src: "/images/featured/lasix-featured-logo-en-transparent.png", w: 2598, h: 1051 },
    hero: {
      kicker: "Systemic Insecticide — Water Dispersible Granules",
      slogan: "A clear path to whitefly control",
      sub: "Complete systemic protection",
      lead: "Lasix 70 WG is a systemic neonicotinoid insecticide with contact and stomach action, engineered against sucking and piercing pests — whitefly, aphids, leafminers and thrips.",
      ctaPrimary: "View application rates",
      ctaSecondary: "Contact AgroPest",
      stats: [
        { label: "Active ingredient", value: "Acetamiprid 70%", unit: "w/w" },
        { label: "IRAC group", value: "4A", unit: "Neonicotinoid" },
        { label: "PHI — tomato", value: "8", unit: "days" },
        { label: "Registration (Egypt)", value: "4828", unit: "Ministry of Agriculture" }
      ]
    },
    mech: {
      kicker: "Mechanism of Action",
      title: "Why is Lasix 70 WG your smartest choice?",
      intro: "One active ingredient, four coordinated lines of defence — from the first contact to season-long systemic cover.",
      items: [
        {
          no: "01",
          title: "Central nervous system knockdown",
          text: "Acetamiprid targets the insect's central nervous system, causing paralysis and rapid death. Feeding stops almost immediately — and with it, virus transmission."
        },
        {
          no: "02",
          title: "Rapid anti-feeding effect",
          text: "Whitefly feeding is shut down fast, limiting direct crop damage and the spread of Tomato Yellow Leaf Curl Virus (TYLCV)."
        },
        {
          no: "03",
          title: "Multi-stage efficacy",
          text: "Active against several stages of the whitefly life cycle — eggs, nymphs and adults — for a more complete clean-up and fewer re-infestations."
        },
        {
          no: "04",
          title: "Protection of new growth",
          text: "Readily absorbed and translocated with the sap into new shoots and hard-to-reach tissue, protecting the undersides of leaves where sucking pests feed."
        }
      ],
      residualTitle: "Long-lasting residual control",
      residualText: "Dependable residual activity reduces the number of repeat applications and keeps protection continuous between sprays.",
      wgTitle: "User-friendly WG formulation",
      wgText: "Water-dispersible granules measure and mix easily, dissolve excellently, and cut dust exposure during spray preparation compared with conventional powders."
    },
    rates: {
      kicker: "Recommendations & Application Rates",
      title: "Registered use & global rates",
      egyptTitle: "Egypt — Agricultural Pesticide Committee, Reg. No. 4828",
      egyptText: "Registered on tomato for whitefly control at 12.5 g / 100 L of water. For best results, start spraying at the first sign of infestation.",
      tableTitle: "Global recommendations & use-rate table",
      cols: { crop: "Crop", pests: "Target pests", rate: "Rate g / 100 L water", notes: "Application notes" },
      rows: [
        {
          crop: "Tomatoes & vegetables",
          pests: "Aphids, whitefly, leafminers, thrips",
          rate: "12.5 – 22.5 g",
          notes: "Apply as a full-cover spray to all plant parts with a spreader-sticker. Test the spreader on a small area first for crop safety."
        },
        {
          crop: "Citrus",
          pests: "Leafminers, aphids, mealybug, thrips, jassids (leafhoppers)",
          rate: "12.5 – 17.5 g",
          notes: "Ensure thorough coverage of new flush, where leafminers and sucking pests concentrate."
        }
      ],
      note: "Rates (g / 100 L water) are based on an average spray volume of about 170 L per feddan. Always adjust the concentration to the actual spray volume used in your field so the correct dose per area is applied."
    },
    timing: {
      kicker: "Timing & Method of Use",
      title: "From scouting to a safe harvest",
      steps: [
        {
          tag: "Scout",
          title: "Start at first infestation",
          text: "Monitor the crop and begin spraying as soon as the first whitefly adults or nymphs appear — early timing is what keeps TYLCV out of the field."
        },
        {
          tag: "Mix",
          title: "Prepare the spray solution",
          text: "Pre-mix the required quantity of Lasix 70 WG with a small amount of water in a separate container, then add the remaining water slowly while stirring until fully dissolved. Add to the spray tank under continuous agitation and spray immediately."
        },
        {
          tag: "Spray",
          title: "Full coverage, bee-safe timing",
          text: "Cover all plant parts — especially leaf undersides. To protect pollinators, apply during periods of low bee activity: early morning or late evening."
        },
        {
          tag: "Rotate",
          title: "Resistance management (IRAC 4A)",
          text: "Never rely on a single insecticide. Rotate Lasix 70 WG with products from different IRAC mode-of-action groups (e.g. 4C, 4D, 28, 23, 16, 7C) to keep every solution effective."
        },
        {
          tag: "Harvest",
          title: "PHI: 8 days on tomato",
          text: "The short pre-harvest interval fits multi-pick tomato cycles, giving you flexibility and safety in managing the crop through ripening."
        }
      ],
      mixTitle: "Tank-mix compatibility",
      mixOk: "Compatible in diluted solution with most fungicides and insecticides commonly used on tomato, with Spinosad SC 480, and with medium mineral oils.",
      mixNo: "Do not mix with strongly alkaline compounds or strongly alkaline spray water. Always run a small-scale compatibility test before preparing large tank volumes."
    },
    footer: {
      kicker: "Packaging & Registration",
      title: "Lasix 70 WG — at a glance",
      packLabel: "Packaging",
      pack: "40 g water-soluble sachets — carton box",
      formLabel: "Formulation",
      form: "WG — water dispersible granules, Acetamiprid 70% w/w",
      regLabel: "Registration",
      reg: "Registered with the Egyptian Ministry of Agriculture, Reg. No. 4828 — tomato / whitefly",
      agentLabel: "Agent in the Arab Republic of Egypt",
      agent: "AgroPest Control for Trading",
      address: "New Nubariya — Beheira, K 80 Alexandria–Cairo Desert Road",
      phone: "002 0128 881635",
      email: "info@agropestcontrol.com",
      site: "www.agropestcontrol.com",
      safety: "Always read and follow the product label in full for complete use and safety instructions. Take measures to prevent surface run-off into water bodies.",
      slogan: "Use responsibly — for a better tomorrow!"
    }
  },
  ar: {
    dir: "rtl",
    nav: { name: "لازيكس 70 دبليو جي", tag: "مبيد حشري", reg: "رقم التسجيل 4828" },
    logo: { src: "/images/featured/lasix-featured-logo-ar-transparent.png", w: 2780, h: 1287 },
    hero: {
      kicker: "مبيد حشري جهازي — حبيبات قابلة للانتشار في الماء",
      slogan: "طريق واضح لمكافحة الذبابة البيضاء",
      sub: "حماية جهازية شاملة",
      lead: "لازيكس 70 دبليو جي مبيد حشري جهازي من مجموعة النيونيكوتينويد، فعال بالملامسة وسم معدي، مصمم لمكافحة الآفات الثاقبة الماصة — الذبابة البيضاء، المن، صانعات الأنفاق، والتربس.",
      ctaPrimary: "اطلع على معدلات الاستخدام",
      ctaSecondary: "تواصل مع اجروبست",
      stats: [
        { label: "المادة الفعالة", value: "أسيتامبرايد 70%", unit: "وزن / وزن" },
        { label: "مجموعة IRAC", value: "4A", unit: "نيونيكوتينويد" },
        { label: "فترة ما قبل الحصاد — طماطم", value: "8", unit: "أيام" },
        { label: "التسجيل (مصر)", value: "4828", unit: "وزارة الزراعة المصرية" }
      ]
    },
    mech: {
      kicker: "آلية التأثير",
      title: "لماذا يعتبر لازيكس 70 دبليو جي خيارك الأذكى؟",
      intro: "مادة فعالة واحدة، وأربعة خطوط دفاع متكاملة — من أول ملامسة إلى حماية جهازية تمتد طوال الموسم.",
      items: [
        {
          no: "01",
          title: "استهداف الجهاز العصبي المركزي",
          text: "يستهدف الأسيتامبرايد الجهاز العصبي المركزي للحشرة، مما يسبب شللاً وموتاً سريعاً، ويوقف بفعالية التغذية وانتقال الإصابة بالفيروس."
        },
        {
          no: "02",
          title: "تأثير إسقاط سريع",
          text: "اختبر توقفاً سريعاً لتغذية الذبابة البيضاء، مما يقلل الضرر الفوري للمحصول وانتشار فيروس تجعد واصفرار أوراق الطماطم TYLCV."
        },
        {
          no: "03",
          title: "فعالية متعددة المراحل",
          text: "يستهدف مراحل متعددة من دورة حياة الذبابة البيضاء — البيض، اليرقات، والحشرات البالغة — لمكافحة أكثر اكتمالاً ومنع تجدد الإصابة."
        },
        {
          no: "04",
          title: "حماية النموات الجديدة",
          text: "يمتصه النبات بسهولة وينتقل بسرعة مع العصارة النباتية إلى النموات الحديثة والمناطق التي يصعب الوصول إليها، بما يشمل الجانب السفلي من الأوراق حيث تتغذى الآفات الماصة."
        }
      ],
      residualTitle: "مكافحة متبقية طويلة",
      residualText: "نشاط متبقٍ يمكن الاعتماد عليه يقلل من تكرار التطبيقات ويوفر حماية مستمرة بين الرشات.",
      wgTitle: "تركيبة سهلة الاستخدام (WG)",
      wgText: "حبيبات قابلة للانتشار في الماء تضمن سهولة القياس والخلط وقابلية ذوبان ممتازة، وتقلل من التعرض للغبار أثناء تحضير محلول الرش مقارنة بالتركيبات البودرية التقليدية."
    },
    rates: {
      kicker: "التوصيات وإرشادات الاستخدام",
      title: "الاستخدام المسجل والمعدلات العالمية",
      egyptTitle: "مصر — لجنة مبيدات الآفات الزراعية، تسجيل رقم 4828",
      egyptText: "مسجل للاستخدام على الطماطم لمكافحة الذبابة البيضاء بمعدل 12,5 جرام / 100 لتر ماء. للحصول على أفضل النتائج، ابدأ الرش عند بداية ظهور الإصابة.",
      tableTitle: "جدول التوصيات ومعدلات الاستخدام العالمية",
      cols: { crop: "المحصول", pests: "الآفات المستهدفة", rate: "المعدل جرام / 100 لتر ماء", notes: "ملاحظات التطبيق" },
      rows: [
        {
          crop: "الطماطم والخضروات",
          pests: "المن، الذبابة البيضاء، صانعات الأنفاق، التربس",
          rate: "12,5 – 22,5 جرام",
          notes: "يطبق كرش يغطي جميع أجزاء النبات مع استخدام مادة ناشرة. عند الخلط، قم بمعاملة مساحة صغيرة أولاً للتأكد من أن المادة الناشرة لا تسبب سمية للنبات."
        },
        {
          crop: "الموالح",
          pests: "صانعات الأنفاق، المن، البق الدقيقي، التربس، الجاسيد (نطاطات الأوراق)",
          rate: "12,5 – 17,5 جرام",
          notes: "احرص على تغطية كاملة للنموات الحديثة حيث تتركز صانعات الأنفاق والآفات الماصة."
        }
      ],
      note: "تم حساب المعدلات (جرام / 100 لتر ماء) بناءً على متوسط حجم رش يبلغ حوالي 170 لتراً من محلول الرش للفدان الواحد. يجب دائماً ضبط التركيز بناءً على حجم الرش الفعلي المستخدم في حقلك لضمان تطبيق الجرعة الصحيحة."
    },
    timing: {
      kicker: "التوقيت وطريقة الاستخدام",
      title: "من المتابعة الحقلية إلى حصاد آمن",
      steps: [
        {
          tag: "المتابعة",
          title: "ابدأ عند بداية الإصابة",
          text: "تابع المحصول وابدأ الرش فور ظهور أول حشرات بالغة أو حوريات للذبابة البيضاء — التوقيت المبكر هو ما يمنع فيروس TYLCV من دخول الحقل."
        },
        {
          tag: "الخلط",
          title: "تحضير محلول الرش",
          text: "اخلط الكمية المطلوبة من لازيكس 70 دبليو جي مع كمية صغيرة من الماء في وعاء منفصل لتحضير محلول متجانس، ثم أضف الكمية المتبقية من الماء ببطء مع الاستمرار في التقليب حتى يذوب المنتج تماماً. أضف المحلول النهائي إلى تانك الرش مع التقليب المستمر ثم قم بالرش مباشرة."
        },
        {
          tag: "الرش",
          title: "تغطية شاملة وتوقيت آمن للنحل",
          text: "غطِّ جميع أجزاء النبات — وخاصة الجانب السفلي من الأوراق. لحماية الملقحات، طبق خلال فترات انخفاض نشاط النحل: في الصباح الباكر أو في المساء المتأخر."
        },
        {
          tag: "التناوب",
          title: "إدارة المقاومة (IRAC 4A)",
          text: "لا تعتمد أبداً على مبيد حشري واحد. قم دائماً بتناوب لازيكس 70 دبليو جي مع منتجات من مجموعات مختلفة لطرق العمل في IRAC (مثل 4C ،4D ،28 ،23 ،16 ،7C) للحفاظ على فعالية الحلول."
        },
        {
          tag: "الحصاد",
          title: "فترة ما قبل الحصاد: 8 أيام للطماطم",
          text: "الفترة القصيرة قبل الحصاد مثالية لدورات القطف المتعددة للطماطم، مما يمنحك مزيداً من الأمان والمرونة في إدارة المحصول خلال مرحلة نضج الثمار."
        }
      ],
      mixTitle: "قابلية الخلط في تانك الرش",
      mixOk: "قابل للخلط في محلوله المخفف مع معظم المبيدات الفطرية والحشرية شائعة الاستخدام على محصول الطماطم، ومع سبينوساد SC 480 والزيوت المعدنية المتوسطة.",
      mixNo: "غير قابل للخلط مع المركبات ذات التفاعل القلوي الشديد أو مع مياه الرش شديدة القلوية. يوصى دائماً بإجراء اختبار خلط على نطاق صغير قبل تحضير كميات كبيرة في خزان الرش."
    },
    footer: {
      kicker: "العبوات والتسجيل",
      title: "لازيكس 70 دبليو جي — في لمحة",
      packLabel: "العبوة",
      pack: "أكياس 40 جرام — عبوة كرتونية",
      formLabel: "التركيبة",
      form: "WG — حبيبات قابلة للانتشار في الماء، أسيتامبرايد 70% وزن/وزن",
      regLabel: "التسجيل",
      reg: "مسجل لدى وزارة الزراعة المصرية برقم 4828 — الطماطم / الذبابة البيضاء",
      agentLabel: "الوكيل بجمهورية مصر العربية",
      agent: "اجروبست كنترول للتجارة",
      address: "النوبارية الجديدة — البحيرة، ك 80 طريق اسكندرية — القاهرة الصحراوي",
      phone: "002 0128 881635",
      email: "info@agropestcontrol.com",
      site: "www.agropestcontrol.com",
      safety: "اقرأ دائماً واتبع ملصق المنتج كاملاً للحصول على تعليمات وإرشادات السلامة الكاملة. نفذ إجراءات لمنع الجريان السطحي إلى المسطحات المائية.",
      slogan: "استخدم بمسؤولية من أجل غد أفضل!"
    }
  }
} as const;

/* Double checkmark — the core brand motif (orange over cyan offset) */
function BrandCheck({ size = 40, className }: { size?: number; className?: string }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <path d="M6 26 L17 42 L44 8 L40 5 L17 32 L10 23 Z" fill={CYAN} transform="translate(-1.5 1.5)" />
      <path d="M6 26 L17 42 L44 8 L40 5 L17 32 L10 23 Z" fill={ORANGE} />
    </svg>
  );
}

/* Small orange square marker used across the leaflet */
function Marker({ className }: { className?: string }) {
  return <span aria-hidden="true" className={"inline-block h-2.5 w-2.5 shrink-0 " + (className ?? "")} style={{ backgroundColor: ORANGE }} />;
}

function Kicker({ text }: { text: string }) {
  return (
    <p className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.18em]" style={{ color: ORANGE }}>
      <Marker />
      {text}
    </p>
  );
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: LocalePageProps): Metadata {
  if (!locales.includes(params.locale as Locale)) {
    return {};
  }
  const c = content[params.locale as Locale];
  return {
    title: c.nav.name + " | " + c.hero.slogan,
    description: c.hero.lead
  };
}

export default function LasixLandingPage({ params }: LocalePageProps) {
  const { locale } = getLocalePage(params.locale);
  const c = content[locale];
  const rtl = locale === "ar";

  const revealCss =
    "@keyframes lxReveal { from { opacity: 0; transform: translateY(14px) scale(0.99); } to { opacity: 1; transform: none; } } " +
    "@supports (animation-timeline: view()) { .lx-reveal { animation: lxReveal 1ms linear both; animation-timeline: view(); animation-range: entry 0% entry 55%; } } " +
    "@media (prefers-reduced-motion: reduce) { .lx-reveal { animation: none; } } " +
    ".lx-tile { transition: transform 300ms ease, filter 300ms ease, box-shadow 300ms ease; } " +
    ".lx-tile:hover { transform: scale(1.08); filter: brightness(1.15); box-shadow: 0 10px 24px rgba(0,0,0,0.28); z-index: 2; } " +
    "@media (prefers-reduced-motion: reduce) { .lx-tile { transition: none; } .lx-tile:hover { transform: none; } }";

  return (
    <main dir={c.dir} className={cairo.className + " antialiased"} style={{ backgroundColor: CREAM, color: PETROL }}>
      <style dangerouslySetInnerHTML={{ __html: revealCss }} />

      {/* ===== Top strip — sticky, logo shrinks on scroll ===== */}
      <StickyLogoBar src={c.logo.src} width={c.logo.w} height={c.logo.h} alt={c.nav.name} dir={c.dir} />

      {/* ===== 1. HERO — dual-tone split with tile mosaic ===== */}
      <section className="relative overflow-hidden" style={{ backgroundColor: PETROL }}>
        {/* subtle geometric grid pattern */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
            backgroundSize: "56px 56px"
          }}
        />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14 lg:py-24">
          <div className="lx-reveal flex flex-col justify-center">
            <p className="mb-3 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">{c.nav.name}</p>
            <Kicker text={c.hero.kicker} />
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.45] text-white sm:text-5xl lg:text-6xl">{c.hero.slogan}</h1>
            <div className="mt-4 flex items-center gap-3">
              <BrandCheck size={30} />
              <p className="text-xl font-bold sm:text-2xl" style={{ color: CYAN }}>
                {c.hero.sub}
              </p>
            </div>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">{c.hero.lead}</p>
          </div>

          {/* mosaic of solid tiles — echoes the leaflet collage */}
          <div className="lx-reveal grid grid-cols-3 gap-1.5 self-center" aria-hidden="true">
            <div className="lx-tile aspect-square" style={{ backgroundColor: GREEN }} />
            <div className="lx-tile aspect-square" style={{ backgroundColor: TEAL }} />
            <div className="lx-tile aspect-square" style={{ backgroundColor: "#ffffff14" }} />
            <div className="lx-tile aspect-square" style={{ backgroundColor: "#ffffff14" }} />
            <div className="lx-tile relative col-span-2 row-span-2 flex items-center justify-center" style={{ backgroundColor: TEAL }}>
              <BrandCheck size={96} />
            </div>
            <div className="lx-tile aspect-square" style={{ backgroundColor: GREEN }} />
            <div className="lx-tile aspect-square flex items-center justify-center" style={{ backgroundColor: YELLOW }}>
              <span className="text-[10px] font-extrabold tracking-widest" style={{ color: PETROL }}>
                70 WG
              </span>
            </div>
            <div className="lx-tile aspect-square" style={{ backgroundColor: "#ffffff14" }} />
            <div className="lx-tile aspect-square" style={{ backgroundColor: ORANGE }} />
            <div className="lx-tile aspect-square" style={{ backgroundColor: GREEN }} />
          </div>
        </div>

        {/* stat band */}
        <div className="relative border-t" style={{ borderColor: "#ffffff22", backgroundColor: "#083A50" }}>
          <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-white/10 lg:grid-cols-4" dir={c.dir}>
            {c.hero.stats.map((s) => (
              <div key={s.label} className="px-5 py-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/50">{s.label}</p>
                <p className="mt-1.5 text-2xl font-extrabold text-white">{s.value}</p>
                <p className="text-xs font-semibold" style={{ color: CYAN }}>
                  {s.unit}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 2. MECHANISM OF ACTION ===== */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="lx-reveal max-w-3xl">
          <Kicker text={c.mech.kicker} />
          <h2 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl">{c.mech.title}</h2>
          <p className="mt-4 text-base leading-relaxed sm:text-lg" style={{ color: PETROL + "B3" }}>
            {c.mech.intro}
          </p>
        </div>

        <div className="lx-reveal mt-10 grid gap-px sm:grid-cols-2" style={{ backgroundColor: "#0B4B6722" }}>
          {c.mech.items.map((m) => (
            <article key={m.no} className="group bg-white p-7 transition-colors duration-300 hover:bg-[#FDFAF7] sm:p-8">
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-extrabold tracking-widest" style={{ color: ORANGE }}>
                  {m.no}
                </span>
                <span className="h-px w-10 transition-all duration-300 group-hover:w-16" style={{ backgroundColor: ORANGE }} />
              </div>
              <h3 className="mt-4 text-xl font-extrabold">{m.title}</h3>
              <p className="mt-3 text-sm leading-relaxed sm:text-base" style={{ color: PETROL + "B3" }}>
                {m.text}
              </p>
            </article>
          ))}
        </div>

        {/* residual + WG — dual tone tiles */}
        <div className="lx-reveal mt-1.5 grid gap-1.5 lg:grid-cols-2">
          <div className="p-7 sm:p-8" style={{ backgroundColor: TEAL }}>
            <BrandCheck size={28} />
            <h3 className="mt-4 text-xl font-extrabold text-white">{c.mech.residualTitle}</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/80 sm:text-base">{c.mech.residualText}</p>
          </div>
          <div className="p-7 sm:p-8" style={{ backgroundColor: GREEN }}>
            <BrandCheck size={28} />
            <h3 className="mt-4 text-xl font-extrabold text-white">{c.mech.wgTitle}</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/80 sm:text-base">{c.mech.wgText}</p>
          </div>
        </div>
      </section>

      {/* ===== 3. APPLICATION RATES ===== */}
      <section id="rates" className="border-y bg-white" style={{ borderColor: "#0B4B6722" }}>
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="lx-reveal max-w-3xl">
            <Kicker text={c.rates.kicker} />
            <h2 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl">{c.rates.title}</h2>
          </div>

          {/* Egypt registration callout */}
          <div className="lx-reveal mt-10 grid lg:grid-cols-[6px_1fr]" style={{ backgroundColor: CREAM }}>
            <div style={{ backgroundColor: ORANGE }} />
            <div className="p-6 sm:p-8">
              <h3 className="text-lg font-extrabold sm:text-xl">{c.rates.egyptTitle}</h3>
              <p className="mt-2 text-sm leading-relaxed sm:text-base" style={{ color: PETROL + "B3" }}>
                {c.rates.egyptText}
              </p>
            </div>
          </div>

          {/* rates table */}
          <div className="lx-reveal mt-10">
            <div className="flex items-center gap-3 px-6 py-4" style={{ backgroundColor: TEAL }}>
              <Marker />
              <h3 className="text-base font-extrabold text-white sm:text-lg">{c.rates.tableTitle}</h3>
            </div>
            <div className="overflow-x-auto border border-t-0" style={{ borderColor: "#0B4B6722" }}>
              <table className="w-full min-w-[720px] border-collapse text-start">
                <thead>
                  <tr style={{ backgroundColor: CREAM }}>
                    {[c.rates.cols.crop, c.rates.cols.pests, c.rates.cols.rate, c.rates.cols.notes].map((h) => (
                      <th
                        key={h}
                        className="border-b px-6 py-4 text-start text-xs font-extrabold uppercase tracking-[0.12em]"
                        style={{ borderColor: "#0B4B6722", color: ORANGE }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {c.rates.rows.map((r) => (
                    <tr key={r.crop} className="align-top transition-colors duration-200 hover:bg-[#FDFAF7]">
                      <td className="border-b px-6 py-5 text-base font-extrabold" style={{ borderColor: "#0B4B6715" }}>
                        {r.crop}
                      </td>
                      <td className="border-b px-6 py-5 text-sm leading-relaxed sm:text-base" style={{ borderColor: "#0B4B6715", color: PETROL + "B3" }}>
                        {r.pests}
                      </td>
                      <td className="whitespace-nowrap border-b px-6 py-5 text-base font-extrabold" style={{ borderColor: "#0B4B6715", color: GREEN }}>
                        {r.rate}
                      </td>
                      <td className="border-b px-6 py-5 text-sm leading-relaxed" style={{ borderColor: "#0B4B6715", color: PETROL + "B3" }}>
                        {r.notes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="border border-t-0 px-6 py-4 text-xs leading-relaxed sm:text-sm" style={{ borderColor: "#0B4B6722", color: PETROL + "99" }}>
              {c.rates.note}
            </p>
          </div>
        </div>
      </section>

      {/* ===== 4. TIMING / PROGRESSION TIMELINE ===== */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="lx-reveal max-w-3xl">
          <Kicker text={c.timing.kicker} />
          <h2 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl">{c.timing.title}</h2>
        </div>

        <ol className="lx-reveal mt-12 grid gap-1.5 lg:grid-cols-5">
          {c.timing.steps.map((s, i) => (
            <li key={s.tag} className="relative flex flex-col border bg-white p-6" style={{ borderColor: "#0B4B6722" }}>
              <div className="flex items-center justify-between">
                <span
                  className="px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-widest text-white"
                  style={{ backgroundColor: i === c.timing.steps.length - 1 ? GREEN : PETROL }}
                >
                  {s.tag}
                </span>
                <span className="text-2xl font-extrabold" style={{ color: "#0B4B6726" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-4 text-base font-extrabold leading-snug">{s.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed" style={{ color: PETROL + "B3" }}>
                {s.text}
              </p>
              <span aria-hidden="true" className="mt-auto block pt-5">
                <span className="block h-1 w-8" style={{ backgroundColor: ORANGE }} />
              </span>
            </li>
          ))}
        </ol>

        {/* tank-mix compatibility */}
        <div className="lx-reveal mt-12 grid gap-1.5 lg:grid-cols-2">
          <div className="border bg-white p-7" style={{ borderColor: GREEN + "55" }}>
            <div className="flex items-center gap-3">
              <BrandCheck size={22} />
              <h3 className="text-lg font-extrabold">{c.timing.mixTitle}</h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed sm:text-base" style={{ color: PETROL + "B3" }}>
              {c.timing.mixOk}
            </p>
          </div>
          <div className="border bg-white p-7" style={{ borderColor: ORANGE + "66" }}>
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="flex h-[22px] w-[22px] items-center justify-center text-sm font-extrabold text-white" style={{ backgroundColor: ORANGE }}>
                !
              </span>
              <h3 className="text-lg font-extrabold">{rtl ? "تحذيرات الخلط" : "Mixing cautions"}</h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed sm:text-base" style={{ color: PETROL + "B3" }}>
              {c.timing.mixNo}
            </p>
          </div>
        </div>
      </section>

      {/* ===== 5. FOOTER / COMMERCIAL ===== */}
      <section className="text-white" style={{ backgroundColor: PETROL }}>
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="lx-reveal grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            {/* sachet visual */}
            <div className="flex flex-col items-start gap-8">
              <div>
                <Kicker text={c.footer.kicker} />
                <h2 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl">{c.footer.title}</h2>
              </div>
              <div aria-hidden="true" className="relative w-56 sm:w-64" dir="ltr">
                <div className="absolute -inset-2 translate-x-3 translate-y-3" style={{ backgroundColor: GREEN }} />
                <div className="relative flex aspect-[4/5] flex-col justify-between p-5" style={{ backgroundColor: YELLOW }}>
                  <div>
                    <p className="text-2xl font-extrabold tracking-tight" style={{ color: PETROL }}>
                      LASIX
                    </p>
                    <p className="inline-block px-1.5 text-sm font-extrabold text-white" style={{ backgroundColor: ORANGE }}>
                      70 WG
                    </p>
                  </div>
                  <BrandCheck size={64} className="self-center" />
                  <div className="flex items-end justify-between">
                    <span className="px-2 py-1 text-xs font-extrabold text-white" style={{ backgroundColor: PETROL }}>
                      40 GRAM
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: PETROL }}>
                      Insecticide
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* commercial data grid */}
            <div className="grid content-start gap-px sm:grid-cols-2" style={{ backgroundColor: "#ffffff1f" }}>
              {[
                { label: c.footer.packLabel, value: c.footer.pack },
                { label: c.footer.formLabel, value: c.footer.form },
                { label: c.footer.regLabel, value: c.footer.reg },
                { label: c.footer.agentLabel, value: c.footer.agent + " — " + c.footer.address }
              ].map((f) => (
                <div key={f.label} className="p-6" style={{ backgroundColor: PETROL }}>
                  <p className="text-[11px] font-bold uppercase tracking-[0.15em]" style={{ color: CYAN }}>
                    {f.label}
                  </p>
                  <p className="mt-2 text-sm font-semibold leading-relaxed text-white/90 sm:text-base">{f.value}</p>
                </div>
              ))}
              <div className="p-6 sm:col-span-2" style={{ backgroundColor: "#083A50" }}>
                <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm font-semibold">
                  <a href={"tel:" + c.footer.phone.replace(/\s/g, "")} className="transition-colors hover:text-white" style={{ color: CYAN }} dir="ltr">
                    {c.footer.phone}
                  </a>
                  <a href={"mailto:" + c.footer.email} className="transition-colors hover:text-white" style={{ color: CYAN }} dir="ltr">
                    {c.footer.email}
                  </a>
                  <span className="text-white/70" dir="ltr">
                    {c.footer.site}
                  </span>
                </div>
                <p className="mt-4 text-xs leading-relaxed text-white/60">{c.footer.safety}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t" style={{ borderColor: "#ffffff22" }}>
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-6 sm:px-6">
            <div className="flex items-center gap-3">
              <BrandCheck size={20} />
              <p className="text-sm font-extrabold" style={{ color: CYAN }}>
                {c.footer.slogan}
              </p>
            </div>
            <p className="text-xs text-white/50">
              {c.nav.name} — {c.nav.reg}
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}
