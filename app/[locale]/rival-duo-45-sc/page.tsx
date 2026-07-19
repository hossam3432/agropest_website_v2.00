import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RevealSection, StaggerContainer, RevealItem } from "@/components/animations";
import { RivalDuoScrollShell } from "@/components/RivalDuoScrollShell";
import { RivalDuoCompositionToggle } from "@/components/RivalDuoCompositionToggle";
import { RivalDuoSectionKicker } from "@/components/RivalDuoSectionKicker";
import { RivalDuoTimingSection } from "@/components/RivalDuoTimingSection";
import { RivalDuoFit } from "@/components/RivalDuoFit";
import { getLocalePage, type LocalePageProps } from "@/app/[locale]/_utils";
import { getProductByAnySlug, getProductPath } from "@/lib/products";
import { locales, type Locale } from "@/lib/content";

const cairo = Cairo({ subsets: ["arabic", "latin"], weight: ["400", "500", "600", "700", "800"], display: "swap" });

const BLUE = "#0E4B9F";
const ORANGE = "#F14723";
const INK = "#0A2A57";

const content = {
  en: {
    nav: { eyebrow: "Rival Duo 45 SC", badge: "Preventive & Curative Fungicide" },
    hero: {
      slogan: "The protection umbrella against Late Blight",
      lead: "Rival Duo is a dual-active fungicide that controls the Oomycete fungi responsible for Late Blight and Downy Mildew.",
      ctaPrimary: "See application rates",
      ctaSecondary: "Contact AgroPest",
      compositionLabel: "Active ingredients",
      curativeLabel: "Curative window",
      curativeValue: "72 hrs",
      phiLabel: "PHI from",
      phiValue: "3 days"
    },
    s2: {
      kicker: "Preventive & Curative Action",
      title: "Blocking spore formation and disease spread",
      intro: "Rival Duo's dual formulation targets the key stages in the fungal life cycle — germination and initial infection, and the formation of mature, infectious spores.",
      stage1Title: "Stopping germination & penetration",
      stage1Text: "Prevents fungal spore germination on the leaf surface and penetration through the stomata into inner leaf layers.",
      stage2Title: "Stopping secondary spread",
      stage2Text: "Blocks the formation of sporangiophores and the spread of the spores that cause secondary infection."
    },
    s3: {
      kicker: "The Dual-Active System",
      title: "Dual protection in one product",
      card1Badge: "Systemic Action",
      card1Name: "Propamocarb 40%",
      card1Text: "Rapidly absorbed by the leaves and redistributed within plant tissue — leaves, stems, and roots. It stops fungal growth immediately, ensuring longer protection for the plant against further fungal disease.",
      card2Badge: "Local Systemic Action",
      card2Name: "Cymoxanil 5%",
      card2Text: "Has a penetrating effect from the treated leaf surface through to the opposite surface, halting the activity of fungi already present on the plant and delivering an immediate curative effect."
    },
    s4: {
      kicker: "Usage Recommendations & Application Rates",
      title: "Local and international rates, by crop",
      localTitle: "Egypt — Agricultural Pesticides Committee, Reg. No. 4244",
      cropLabel: "Crop",
      diseaseLabel: "Disease",
      rateLabel: "Rate / 100 L water",
      phiLabel: "PHI",
      local: { crop: "Potato", disease: "Late Blight (Phytophthora infestans)", rate: "200 cm³", phi: "8 days" },
      euTitle: "European Union recommendations",
      rows: [
        { family: "Solanaceae (Potato & Tomato)", disease: "Late Blight (Phytophthora infestans)", rate: "200–250 cm³", phi: "8 days" },
        { family: "Cucurbits (Cucumber & Watermelon)", disease: "Downy Mildew (Pseudoperonospora cubensis)", rate: "200–250 cm³", phi: "3 days" },
        { family: "Onion", disease: "Downy Mildew (Peronospora destructor)", rate: "200–250 cm³", phi: "15 days" }
      ]
    },
    s5: {
      kicker: "Timing & Method of Use",
      title: "Protection that stays with the potato plant, from planting to harvest",
      stages: [
        {
          label: "Planting",
          day: "Day 0",
          text: "A healthy seed tuber settles into the soil as the root system begins to form.",
          advice: "Plan ahead: the first Rival Duo application is scheduled for day 30, before Late Blight or Downy Mildew symptoms can appear."
        },
        {
          label: "Early growth",
          day: "Day 30",
          text: "The root network strengthens as the plant establishes itself in the field.",
          advice: "First application: apply Rival Duo now, before symptoms of Late Blight or Downy Mildew appear."
        },
        {
          label: "Canopy closure",
          day: "Day 60",
          text: "Foliage forms above the soil surface alongside a strong root network — the highest-risk window, under Rival Duo's dual protection.",
          advice: "Second application, at the highest-risk window. If infection occurs and symptoms appear, repeat treatment 7–10 days after the previous application.",
          note: "Under weather conditions favorable to disease development, it's advisable to add contact fungicides + systemic fungicides to the spray program.",
          highlighted: true
        },
        {
          label: "Tuber bulking",
          day: "Day 90–120",
          text: "A fully vigorous plant with dense foliage; tubers begin forming underground, protected through to harvest.",
          advice: "Standard pre-harvest intervals starting from 3 days keep the crop protected through to a safe, timely harvest."
        }
      ],
      timingTitle: "Application timing"
    },
    s7: {
      kicker: "Why Rival Duo",
      title: "Why Rival Duo",
      pillars: [
        { title: "Sustained protection", text: "A comprehensive preventive and curative effect spares you the cost of buying multiple pesticides and keeps your crop safe from start to finish." },
        { title: "Real value", text: "One dual-active product covering two mechanisms means fewer separate purchases and simpler program planning." },
        { title: "Resilience against conditions", text: "Penetrates quickly and easily and redistributes effectively, avoiding product washoff by rain." },
        { title: "Safe, fast harvest", text: "Standard pre-harvest intervals starting from 3 days give you an early-harvest advantage and faster access to markets with a healthy, safe product." }
      ]
    },
    s8: {
      eyebrow: "Rival Duo SC 45",
      tagline: "Because potato growth doesn't stop — even in the toughest humidity and fog conditions.",
      manufacturerLabel: "Manufacturer",
      manufacturer: "Agria SA — Bulgaria (European Union)",
      agentLabel: "Agent in Egypt",
      agent: "AgroPest Control for Trading",
      regLabel: "Registration",
      reg: "Egyptian Ministry of Agriculture, Reg. No. 4220",
      packLabel: "Packaging",
      pack: "Available in 5 L, 800 cc, and 400 cc packs",
      supportLabel: "Technical support",
      salesLabel: "Sales",
      ctaBrochure: "Download Brochure",
      ctaPrimary: "Open full technical page"
    }
  },
  ar: {
    nav: { eyebrow: "ريفال ديو 45 SC", badge: "مبيد فطري وقائي وعلاجي" },
    hero: {
      slogan: "مظلة الحماية من الندوة المتأخرة",
      lead: "ريفال ديو مبيد فطري ذو تركيبة مزدوجة لمكافحة الفطريات البيضية المسببة لأمراض الندوة المتأخرة والبياض الزغبي.",
      ctaPrimary: "معدلات الاستخدام",
      ctaSecondary: "تواصل مع أجروبست",
      compositionLabel: "المادة الفعّالة",
      curativeLabel: "نافذة التأثير العلاجي",
      curativeValue: "72 ساعة",
      phiLabel: "فترة ما قبل الحصاد من",
      phiValue: "3 أيام"
    },
    s2: {
      kicker: "التأثير الوقائي والعلاجي",
      title: "منع تكوين الحوامل الجرثومية وانتشار الجراثيم المسببة للمرض",
      intro: "تستهدف تركيبة ريفال ديو المزدوجة المراحل الأساسية والهامة في دورة حياة الفطر، وتحديداً مرحلة الإنبات والعدوى الأولية ومرحلة تكوين الجراثيم الناضجة المسببة للعدوى.",
      stage1Title: "منع الإنبات والاختراق",
      stage1Text: "منع إنبات جراثيم الفطر على سطح الورقة والاختراق من الثغور إلى طبقات الورقة الداخلية.",
      stage2Title: "منع انتشار العدوى",
      stage2Text: "منع تكوين الحوامل الجرثومية وانتشار الجراثيم المسببة للمرض."
    },
    s3: {
      kicker: "التركيبة المزدوجة وآلية العمل",
      title: "حماية مزدوجة في منتج واحد",
      card1Badge: "تأثير جهازي",
      card1Name: "بروباموكارب 40%",
      card1Text: "يتم امتصاص ريفال ديو بسرعة بواسطة الأوراق وتوزيعه داخل أنسجة النبات بما في ذلك الأوراق والسيقان والجذور. ريفال ديو يوقف نمو وتطور الفطر فوراً، مما يضمن حماية أطول للنبات ضد المزيد من مسببات الأمراض الفطرية.",
      card2Badge: "تأثير محلي الجهازية",
      card2Name: "سيموكسانيل 5%",
      card2Text: "له تأثير اختراقي (تأثير محلي الجهازية) من سطح الورقة المعامل إلى السطح المقابل، مما يعمل على إيقاف نشاط الفطريات الموجودة على النبات ويعطي التأثير العلاجي مباشرة بعد التطبيق."
    },
    s4: {
      kicker: "توصيات الاستخدام ومعدلات التطبيق",
      title: "توصيات محلية ودولية لكل محصول",
      localTitle: "لجنة مبيدات الآفات الزراعية بج.م.ع. — رقم تسجيل 4244",
      cropLabel: "المحصول",
      diseaseLabel: "المرض",
      rateLabel: "المعدل / 100 لتر ماء",
      phiLabel: "فترة ما قبل الحصاد",
      local: { crop: "البطاطس", disease: "الندوة المتأخرة (Phytophthora infestans)", rate: "200 سم³", phi: "8 أيام" },
      euTitle: "توصيات الاتحاد الأوروبي",
      rows: [
        { family: "العائلة الباذنجانية (بطاطس وطماطم)", disease: "الندوة المتأخرة (Phytophthora infestans)", rate: "200-250 سم³", phi: "8 أيام" },
        { family: "العائلة القرعية (خيار وبطيخ)", disease: "البياض الزغبي (Pseudoperonospora cubensis)", rate: "200-250 سم³", phi: "3 أيام" },
        { family: "البصل", disease: "البياض الزغبي (Peronospora destructor)", rate: "200-250 سم³", phi: "15 يوم" }
      ]
    },
    s5: {
      kicker: "توقيت وطريقة الاستخدام",
      title: "حماية تلازم نبات البطاطس من الزراعة وحتى الحصاد",
      stages: [
        {
          label: "بداية الزراعة",
          day: "يوم 0",
          text: "درنة تقاوي سليمة مستقرة في التربة مع بداية تكون المجموع الجذري.",
          advice: "خطط مبكرًا: أول معاملة بريفال ديو مجدولة عند عمر 30 يوم، قبل ظهور أي أعراض للندوة المتأخرة أو البياض الزغبي."
        },
        {
          label: "بداية النمو",
          day: "30 يوم",
          text: "استمرار بناء شبكة جذور قوية مع استقرار النبات في الأرض.",
          advice: "المعاملة الأولى: يتم تطبيق ريفال ديو الآن، قبل ظهور أعراض الندوة المتأخرة أو البياض الزغبي."
        },
        {
          label: "اكتمال المجموع الخضري",
          day: "60 يوم",
          text: "تكون المجموع الخضري فوق سطح التربة بالتوازي مع بناء شبكة جذور قوية — أهم نافذة حماية، تحت حماية ريفال ديو المزدوجة.",
          advice: "المعاملة الثانية، في أهم نافذة حماية. وفي حالة حدوث الإصابة وظهور الأعراض يتم تطبيق معاملة ثانية بعد 7 إلى 10 أيام من المعاملة السابقة.",
          note: "في حالة الظروف الجوية المواتية لتطور المرض والعدوى، ينصح بإضافة مبيدات فطرية ملامسة + مبيدات فطرية جهازية إلى برنامج الرش.",
          highlighted: true
        },
        {
          label: "تكوين الدرنات",
          day: "90-120 يوم",
          text: "نبات مكتمل القوة بمجموع خضري كثيف، وفي الأسفل تبدأ الدرنات بتكوين ثمار البطاطس تحت الحماية حتى الحصاد.",
          advice: "فترات الأمان القياسية التي تبدأ من 3 أيام تحافظ على حماية المحصول حتى موعد حصاد آمن."
        }
      ],
      timingTitle: "توقيت التطبيق"
    },
    s7: {
      kicker: "لماذا ريفال ديو؟",
      title: "لماذا ريفال ديو؟",
      pillars: [
        { title: "حماية مستدامة", text: "تأثير وقائي وعلاجي شامل يغنيك عن تكاليف شراء مبيدات متعددة ويضمن سلامة محصولك من البداية للنهاية." },
        { title: "توفير حقيقي", text: "منتج واحد بتأثيرين يعني مشتريات أقل وتخطيطاً أبسط لبرنامج الرش." },
        { title: "ثبات يتحدى الظروف", text: "يخترق بسرعة وسهولة وينتقل بشكل فعال، مما يتجنب أي غسيل للمنتج بواسطة المطر." },
        { title: "حصاد آمن وسريع", text: "فترات أمان قياسية تبدأ من 3 أيام تمنحك ميزة الحصاد المبكر والوصول السريع للأسواق بمنتج صحي وآمن." }
      ]
    },
    s8: {
      eyebrow: "ريفال ديو SC 45",
      tagline: "لأن نمو البطاطس لا يتوقف حتى في أصعب ظروف الرطوبة والشبورة.",
      manufacturerLabel: "المصنع المنتج",
      manufacturer: "اجريا اس ايه - بلغاريا (الاتحاد الأوروبي)",
      agentLabel: "الوكيل بجمهورية مصر العربية",
      agent: "أجروبست كنترول للتجارة",
      regLabel: "التسجيل",
      reg: "مسجل بوزارة الزراعة المصرية برقم 4220",
      packLabel: "العبوة",
      pack: "متوفر في عبوات 5 لتر و 800 سم و 400 سم",
      supportLabel: "الدعم الفني",
      salesLabel: "المبيعات",
      ctaBrochure: "تحميل البروشور",
      ctaPrimary: "فتح صفحة المنتج الفنية"
    }
  }
} as const;

type RivalDuoLandingProps = LocalePageProps;

function getRivalDuo(locale: Locale) {
  const product = getProductByAnySlug(locale, "rival-duo");

  if (!product) {
    notFound();
  }

  return product;
}

function DoubleLine({ className, rtl }: { className?: string; rtl?: boolean }) {
  const origin = rtl ? "right center" : "left center";
  return (
    <div className={"flex flex-col gap-1.5 " + (className ?? "")}>
      <span
        className="rival-line-trim h-2 w-20 rounded-full sm:h-2.5 sm:w-28"
        style={{ backgroundColor: ORANGE, transformOrigin: origin, animationDelay: "0s" }}
      />
      <span
        className="rival-line-trim h-3 w-32 rounded-full sm:h-4 sm:w-44"
        style={{ backgroundColor: BLUE, transformOrigin: origin, animationDelay: "0.15s" }}
      />
    </div>
  );
}

function ScrollCue() {
  return (
    <svg aria-hidden="true" className="animate-bounce" width="42" height="48" viewBox="0 0 42 48" fill="none">
      <path d="M9 12 L21 24 L33 12" stroke={BLUE} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 26 L21 38 L33 26" stroke={ORANGE} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: RivalDuoLandingProps): Metadata {
  if (!locales.includes(params.locale as Locale)) {
    return {};
  }

  const locale = params.locale as Locale;
  const product = getRivalDuo(locale);
  const c = content[locale];

  return {
    title: product.name + " | " + c.hero.slogan,
    description: product.seo?.description ?? product.positioning,
    keywords: product.seo?.keywords
  };
}

export default function RivalDuoLandingPage({ params }: RivalDuoLandingProps) {
  const { locale } = getLocalePage(params.locale);
  const product = getRivalDuo(locale);
  const c = content[locale];
  const productHref = getProductPath(locale, product);
  const wordmark = locale === "ar" ? "/images/products/rival-duo-wordmark-ar.png" : "/images/products/rival-duo-wordmark-en.png";
  const arabicFontCss =
    locale === "ar"
      ? ".rival-landing { font-family: \"forma-djr-arabic-text\", " +
        cairo.style.fontFamily +
        "; } .rival-landing h1, .rival-landing h2, .rival-landing h3 { font-family: \"forma-djr-arabic-banner\", " +
        cairo.style.fontFamily +
        "; } .rival-landing .font-extrabold { font-weight: 700; }"
      : "";
  const animationCss =
    "@keyframes rivalTrimDraw { 0% { transform: scaleX(0); } 15% { transform: scaleX(1); } 100% { transform: scaleX(1); } } " +
    ".rival-line-trim { transform: scaleX(0); animation: rivalTrimDraw 10s ease-out infinite; } " +
    "@media (prefers-reduced-motion: reduce) { .rival-line-trim { animation: none; transform: scaleX(1); } }";
  return (
    <main className={cairo.className + " rival-landing bg-white text-[" + INK + "]"}>
      <style dangerouslySetInnerHTML={{ __html: arabicFontCss + " " + animationCss }} />
      <RivalDuoScrollShell>
        {/* SECTIONS 1–3 share ONE oversized umbrella line-art background (off-white) */}
        <div className="relative bg-[#F5F8FC]">
          <div className="pointer-events-none absolute inset-0 z-0">
            <div className="sticky top-0 flex h-[calc(100svh-5rem)] w-full items-center justify-center overflow-hidden">
              <img src="/images/products/rival-duo-umbrella-lineart.png" alt="" aria-hidden="true" className="h-[140%] w-auto max-w-none opacity-[0.13]" style={locale === "ar" ? { transform: "scaleX(-1)" } : undefined} />
            </div>
          </div>
          <div className="relative z-10">

          {/* SECTION 1 — HERO */}
          <section className="relative flex h-[calc(100svh-5rem)] snap-start items-center overflow-hidden px-4 py-6 sm:px-6 lg:px-8">
            <RivalDuoFit>
            <RevealSection className="container-shell relative w-full" amount={0.2}>
              <div className="mx-auto max-w-4xl">
                <div className="flex flex-wrap items-center gap-5">
                  <img src={wordmark} alt={c.nav.eyebrow} className="h-24 w-auto object-contain sm:h-[120px] lg:h-36" />
                </div>
                <DoubleLine className="mt-6" rtl={locale === "ar"} />
                <span className="mt-3 inline-block rounded-full border-2 px-5 py-2.5 text-sm font-normal uppercase tracking-[0.14em] sm:text-base" style={{ borderColor: ORANGE, color: ORANGE }}>{c.nav.badge}</span>
                <h1 className="mt-4 max-w-3xl text-3xl font-extrabold leading-[1.15] tracking-normal" style={{ color: INK }}>
                  {c.hero.slogan}
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg sm:leading-9">
                  {c.hero.lead}
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.25rem] border-2 bg-white/75 p-5 backdrop-blur-sm" style={{ borderColor: ORANGE + "33" }}>
                    <p className="text-xs font-normal uppercase tracking-[0.14em] text-slate-400">{c.hero.compositionLabel}</p>
                    <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      {product.facts.compositionRows?.map((row, index) => (
                        <div key={row.ingredient} className="flex items-baseline gap-2">
                          {index > 0 && <span className="text-3xl font-bold text-slate-300">+</span>}
                          <span dir="ltr" className="text-4xl font-extrabold sm:text-5xl" style={{ color: index === 0 ? BLUE : ORANGE }}>{row.concentration}</span>
                          <span className="text-base font-bold text-slate-500">{row.ingredient}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-[1.25rem] border-2 bg-white/75 p-5 backdrop-blur-sm" style={{ borderColor: BLUE + "33" }}>
                    <p className="text-xs font-normal uppercase tracking-[0.14em] text-slate-400">{c.hero.curativeLabel}</p>
                    <div className="mt-2 flex items-baseline gap-3">
                      <span dir="ltr" className="text-4xl font-extrabold sm:text-5xl" style={{ color: BLUE }}>{c.hero.curativeValue}</span>
                    </div>
                  </div>
                </div>
              </div>
            </RevealSection>
            </RivalDuoFit>
            <div className="pointer-events-none absolute inset-x-0 bottom-5 flex justify-center">
              <ScrollCue />
            </div>
          </section>

          {/* SECTION — DUAL COMPOSITION (حماية مزدوجة في منتج واحد) */}
          <section className="relative flex h-[calc(100svh-5rem)] snap-start items-center overflow-hidden px-4 py-6 sm:px-6 lg:px-8">
            <RivalDuoFit>
            <RevealSection className="container-shell w-full" amount={0.2}>
              <div className="flex flex-wrap items-center gap-5">
                <RivalDuoSectionKicker>{c.s3.kicker}</RivalDuoSectionKicker>
                <img src="/images/products/rival-duo-shield-logo.png" alt="" className="h-16 w-auto object-contain sm:h-20" />
              </div>
              <h2 className="mt-4 max-w-4xl text-3xl font-extrabold leading-[1.15]" style={{ color: INK }}>{c.s3.title}</h2>
              <RivalDuoCompositionToggle
                card1={{ badge: c.s3.card1Badge, name: c.s3.card1Name, text: c.s3.card1Text }}
                card2={{ badge: c.s3.card2Badge, name: c.s3.card2Name, text: c.s3.card2Text }}
              />
            </RevealSection>
            </RivalDuoFit>
          </section>

          {/* SECTION — TIMING / POTATO PROGRESSION (حماية تلازم نبات البطاطس) */}
          <RivalDuoTimingSection
            kicker={c.s5.kicker}
            title={c.s5.title}
            imageSrc="/images/products/rival-duo-potato-progression.png"
            rtl={locale === "ar"}
            stages={c.s5.stages}
            timingTitle={c.s5.timingTitle}
          />

          {/* SECTION — PREVENTIVE & CURATIVE OOMYCETE ACTION (منع تكوين الحوامل الجرثومية) */}
          <section className="relative flex h-[calc(100svh-5rem)] snap-start items-center overflow-hidden px-4 py-6 sm:px-6 lg:px-8">
          <RivalDuoFit>
          <RevealSection className="container-shell relative z-10 w-full" amount={0.2}>
            <RivalDuoSectionKicker>{c.s2.kicker}</RivalDuoSectionKicker>
            <h2 className="mt-4 max-w-4xl text-3xl font-extrabold leading-[1.15]" style={{ color: INK }}>{c.s2.title}</h2>
            <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-[42px]">{c.s2.intro}</p>
            <div className="mt-4 grid gap-4 sm:mt-5 sm:grid-cols-2 sm:gap-5">
              <article className="overflow-hidden rounded-[1.75rem] bg-white shadow-[0_20px_60px_rgba(14,75,159,0.12)]">
                <div className="h-20 w-full overflow-hidden bg-[#0A2A57] sm:h-[clamp(140px,26vh,350px)]">
                  <img src="/images/products/rival-duo-oomycete-germinate.png" alt="" className="h-full w-full object-cover" />
                </div>
                <div className="p-4 sm:p-6">
                  <p className="text-sm font-bold uppercase tracking-[0.14em]" style={{ color: ORANGE }}>01</p>
                  <h3 className="mt-1 text-lg font-extrabold sm:text-2xl" style={{ color: INK }}>{c.s2.stage1Title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base sm:leading-[38px]">{c.s2.stage1Text}</p>
                </div>
              </article>
              <article className="overflow-hidden rounded-[1.75rem] bg-white shadow-[0_20px_60px_rgba(14,75,159,0.12)]">
                <div className="h-20 w-full overflow-hidden bg-[#0A2A57] sm:h-[clamp(140px,26vh,300px)]">
                  <img src="/images/products/rival-duo-oomycete-blocked.png" alt="" className="h-full w-full object-cover" />
                </div>
                <div className="p-4 sm:p-6">
                  <p className="text-sm font-bold uppercase tracking-[0.14em]" style={{ color: BLUE }}>02</p>
                  <h3 className="mt-1 text-lg font-extrabold sm:text-2xl" style={{ color: INK }}>{c.s2.stage2Title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base sm:leading-[38px]">{c.s2.stage2Text}</p>
                </div>
              </article>
            </div>
          </RevealSection>
          </RivalDuoFit>
        </section>

          {/* SECTION 4 — APPLICATION RATES (توصيات محلية ودولية) */}
          <section id="s4" className="relative flex h-[calc(100svh-5rem)] snap-start items-center overflow-hidden px-4 py-6 sm:px-6 lg:px-8">
          <RivalDuoFit>
          <RevealSection className="container-shell relative z-10 w-full" amount={0.2}>
            <RivalDuoSectionKicker>{c.s4.kicker}</RivalDuoSectionKicker>
            <h2 className="mt-4 max-w-4xl text-3xl font-extrabold leading-[1.15]" style={{ color: INK }}>{c.s4.title}</h2>

            <div className="mt-4 overflow-hidden rounded-[1.5rem] border-2 sm:mt-5" style={{ borderColor: BLUE + "22" }}>
              <p className="px-4 py-2.5 text-base font-normal text-white sm:px-6 sm:py-3 sm:text-lg" style={{ backgroundColor: BLUE }}>{c.s4.localTitle}</p>
              <div className="grid grid-cols-2 gap-3 bg-[#F8FAFD] px-4 py-3 sm:grid-cols-4 sm:gap-4 sm:px-6 sm:py-4">
                <div><p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">{c.s4.cropLabel}</p><p className="mt-1 text-lg font-extrabold sm:text-xl" style={{ color: INK }}>{c.s4.local.crop}</p></div>
                <div><p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">{c.s4.diseaseLabel}</p><p className="mt-1 text-base font-bold text-slate-600">{c.s4.local.disease}</p></div>
                <div><p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">{c.s4.rateLabel}</p><p className="mt-1 text-lg font-extrabold sm:text-xl" style={{ color: ORANGE }}>{c.s4.local.rate}</p></div>
                <div><p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">{c.s4.phiLabel}</p><p className="mt-1 text-lg font-extrabold sm:text-xl" style={{ color: BLUE }}>{c.s4.local.phi}</p></div>
              </div>
            </div>

            <p className="mt-4 text-sm font-bold uppercase tracking-[0.14em] text-slate-400 sm:mt-5">{c.s4.euTitle}</p>
            <div className="mt-2.5 grid gap-2 sm:mt-3 sm:gap-3">
              {c.s4.rows.map((row) => (
                <div key={row.family} className="grid grid-cols-2 gap-2 rounded-[1.25rem] border-2 border-slate-100 bg-[#F8FAFD] p-3 sm:grid-cols-4 sm:items-center sm:gap-3 sm:p-4">
                  <p className="text-sm font-extrabold sm:text-base" style={{ color: INK }}>{row.family}</p>
                  <p className="text-sm text-slate-600">{row.disease}</p>
                  <p className="text-sm font-extrabold sm:text-base" style={{ color: ORANGE }}>{row.rate}</p>
                  <p className="text-sm font-extrabold sm:text-base" style={{ color: BLUE }}>{row.phi}</p>
                </div>
              ))}
            </div>
          </RevealSection>
          </RivalDuoFit>
        </section>

          {/* SECTION 7 — WHY RIVAL DUO */}
          <section className="relative flex h-[calc(100svh-5rem)] snap-start items-center overflow-hidden px-4 py-6 sm:px-6 lg:px-8">
          <RivalDuoFit>
          <RevealSection className="container-shell relative z-10 w-full" amount={0.2}>
            <div className="flex flex-wrap items-center gap-4 sm:gap-5">
              <img src="/images/products/rival-duo-shield-logo.png" alt="" className="h-12 w-auto object-contain sm:h-20" />
              <h2 className="text-3xl font-extrabold leading-[1.15]" style={{ color: INK }}>{c.s7.title}</h2>
            </div>
            <StaggerContainer className="mt-4 grid gap-3 sm:mt-6 sm:grid-cols-2 sm:gap-4" amount={0.15}>
              {c.s7.pillars.map((pillar, index) => (
                <RevealItem key={pillar.title}>
                  <div
                    className={`group h-full cursor-pointer rounded-[1.5rem] bg-white p-4 shadow-[0_18px_55px_rgba(14,75,159,0.1)] transition-colors duration-300 sm:p-6 ${
                      index % 2 === 0 ? "hover:bg-[#0E4B9F] active:bg-[#0E4B9F]" : "hover:bg-[#F14723] active:bg-[#F14723]"
                    }`}
                  >
                    <span
                      className={`text-base font-bold transition-colors duration-300 group-hover:text-white group-active:text-white ${
                        index % 2 === 0 ? "text-[#0E4B9F]" : "text-[#F14723]"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-2 text-xl font-extrabold text-[#0A2A57] transition-colors duration-300 group-hover:text-white group-active:text-white sm:text-2xl">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600 transition-colors duration-300 group-hover:text-white/90 group-active:text-white/90 sm:text-base">
                      {pillar.text}
                    </p>
                  </div>
                </RevealItem>
              ))}
            </StaggerContainer>
          </RevealSection>
          </RivalDuoFit>
        </section>

          {/* SECTION 8 — COMMERCIAL / CONTACT */}
          <section className="relative flex h-[calc(100svh-5rem)] snap-start items-center overflow-hidden px-4 py-6 sm:px-6 lg:px-8">
          <RivalDuoFit>
          <RevealSection className="container-shell relative z-10 w-full" amount={0.2}>
            <div className="grid gap-4 sm:gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
              {/* Mobile: bleed the bottles past the container — the image is width-bound there, so max-h alone can't enlarge it. */}
              <div className="-mx-[5%] sm:mx-auto sm:w-3/4">
                <img src="/images/products/rival-duo-bottles-2026.png" alt={c.s8.eyebrow} className="mx-auto h-auto max-h-[clamp(320px,68vh,720px)] w-3/4 object-contain drop-shadow-[0_30px_60px_rgba(14,75,159,0.25)] sm:w-full" />
              </div>
              <div className="ml-auto mr-[50px]">
                <img src={wordmark} alt={c.nav.eyebrow} className="h-20 w-auto object-contain sm:h-24" />
                <h2 className="mt-4 max-w-xl text-xl font-extrabold leading-[1.3] sm:text-2xl lg:text-3xl" style={{ color: INK }}>{c.s8.tagline}</h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div><p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">{c.s8.manufacturerLabel}</p><p className="mt-1 text-base font-bold" style={{ color: INK }}>{c.s8.manufacturer}</p></div>
                  <div><p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">{c.s8.agentLabel}</p><p className="mt-1 text-base font-bold" style={{ color: INK }}>{c.s8.agent}</p></div>
                  <div><p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">{c.s8.regLabel}</p><p className="mt-1 text-sm text-slate-600">{c.s8.reg}</p></div>
                  <div><p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">{c.s8.packLabel}</p><p className="mt-1 text-sm text-slate-600">{c.s8.pack}</p></div>
                </div>
                <div className="mt-6 flex flex-wrap gap-4">
                  <a
                    href="/brochures/rival-duo-45-sc-brochure.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full px-7 py-4 text-base font-normal text-white transition hover:opacity-90"
                    style={{ backgroundColor: ORANGE }}
                  >
                    {c.s8.ctaBrochure}
                  </a>
                  <Link href={productHref} className="rounded-full border-[3px] px-7 py-4 text-base font-normal transition hover:text-white" style={{ borderColor: BLUE, color: BLUE }}>
                    {c.s8.ctaPrimary}
                  </Link>
                </div>
              </div>
            </div>
          </RevealSection>
          </RivalDuoFit>
        </section>
          </div>
        </div>
      </RivalDuoScrollShell>
    </main>
  );
}
