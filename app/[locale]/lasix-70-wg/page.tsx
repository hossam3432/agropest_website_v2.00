import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import { LasixMobileV2 } from "@/components/lasix-mobile";
import { getLocalePage, type LocalePageProps } from "@/app/[locale]/_utils";
import { locales, type Locale } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

const cairo = Cairo({ subsets: ["arabic", "latin"], weight: ["400", "500", "600", "700", "800"], display: "swap" });

/* Brand palette sampled from the Lasix 70 WG leaflet & logo assets. The
   section colours now live with the layout, in components/lasix-mobile/tokens;
   what stays here is only what dresses the page shell itself. */
const PETROL = "#0B4B67"; // wordmark / headings
const CREAM = "#F7F2EF"; // warm paper background

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
      pack: "20 g & 40 g water-soluble sachets — carton box",
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
      title: "توصيات الاستخدام",
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
      title: "لازيكس 70 دبليو جي",
      packLabel: "العبوة",
      pack: "أكياس 20 و 40 جرام",
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

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    return {};
  }
  const c = content[locale as Locale];
  return {
    title: c.nav.name + " | " + c.hero.slogan,
    description: c.hero.lead,
    alternates: {
      canonical: absoluteUrl(`/${locale}/lasix-70-wg`),
      languages: {
        en: absoluteUrl("/en/lasix-70-wg"),
        ar: absoluteUrl("/ar/lasix-70-wg"),
        "x-default": absoluteUrl("/en/lasix-70-wg")
      }
    }
  };
}

export default async function LasixLandingPage({ params }: LocalePageProps) {
  const { locale } = getLocalePage((await params).locale);
  const c = content[locale];

  return (
    /* One layout at every width. What was a phone-only build is now the page:
       the leaflet's block-and-gap grid, stacked on a narrow screen and dealt
       onto twelve columns from lg. The previous desktop build — a separate
       set of sections with its own hero, mosaic and table — is gone rather
       than hidden, so there is a single rendering of this product to maintain
       and no chance of the two drifting apart. It is in git if it is wanted
       back. */
    <main dir={c.dir} className={cairo.className + " native-width-page antialiased"} style={{ backgroundColor: CREAM, color: PETROL }}>
      <LasixMobileV2
        c={c}
        locale={locale}
        brochureHref="/brochures/lasix-70-wg-brochure.pdf"
        technicalSheetHref="/brochures/lasix-70-wg-technical-sheet.pdf"
      />
    </main>
  );
}
