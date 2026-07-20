import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import Link from "next/link";
import { RevealSection, StaggerContainer, RevealItem } from "@/components/animations";
import { getLocalePage, type LocalePageProps } from "@/app/[locale]/_utils";
import { locales, type Locale } from "@/lib/content";

const cairo = Cairo({ subsets: ["arabic", "latin"], weight: ["400", "500", "600", "700", "800"], display: "swap" });

const BLUE = "#283593";
const GREEN = "#8BC34A";
const ORANGE = "#E65100";

const content = {
  en: {
    eyebrow: "Edegal 72.2% SL",
    badge: "Systemic Fungicide — Group F4 / 28",
    hero: {
      title: "Start protection early, before disease begins",
      lead: "Advanced early-stage agricultural shielding.",
      body: "A propamocarb hydrochloride soluble concentrate that moves inside cucumber tissue to build a botanical shield against downy mildew — before symptoms appear.",
      ctaPrimary: "Application matrix",
      ctaSecondary: "Talk to AgroPest",
      stats: [
        { label: "Active ingredient", value: "72.2%", note: "Propamocarb HCl" },
        { label: "Pre-harvest interval", value: "5 days", note: "Cucumber" },
        { label: "Rate", value: "250 cm³", note: "per 100 L water" }
      ],
      mediaCaption: "500 cc & 250 cc packs"
    },
    challenge: {
      kicker: "The greenhouse equation",
      title: "Humidity is the accelerant, not the disease",
      riskLabel: "The environmental risk",
      riskTitle: "Warm, saturated greenhouse air",
      riskBody: "High humidity and warm greenhouse conditions place the crop under botanical stress and speed the spread of downy mildew. By the time lesions are visible on the leaf, the infection cycle is already several generations deep.",
      riskPoints: [
        "Leaf wetness and condensation extend spore viability",
        "Dense canopies leave untreated interior surfaces",
        "Visible symptoms lag behind actual infection"
      ],
      solutionLabel: "The Edegal answer",
      solutionTitle: "A barrier built before the breach",
      solutionBody: "Applied early, Edegal is taken up and redistributed inside the plant, establishing internal protection ahead of infection rather than chasing it. Intervention happens while the pathogen is still at its most controllable stage.",
      solutionPoints: [
        "Preventive positioning in the early growth stages",
        "Protection carried into new, untreated growth",
        "Repeat every 7–10 days under disease pressure"
      ]
    },
    pillars: {
      kicker: "Mechanism of action",
      title: "Three pillars of in-plant defense",
      intro: "Propamocarb hydrochloride does not sit on the surface waiting. It enters, distributes, and stays with the crop as it grows.",
      items: [
        {
          index: "01",
          title: "Internal distribution",
          arabic: "تأثير جهازي",
          text: "Moves effortlessly inside plant tissues to cover areas the spray boom never reached, closing the gaps left by dense canopy growth."
        },
        {
          index: "02",
          title: "Rapid uptake",
          arabic: "استجابة سريعة",
          text: "Absorbed quickly through both roots and leaves, so defense begins within the critical hours after application rather than days."
        },
        {
          index: "03",
          title: "Upward mobility",
          arabic: "فعالية جهازية عبر الجذور",
          text: "Applied through irrigation, it travels upward with the transpiration stream to protect new growth as the crop expands."
        }
      ]
    },
    usage: {
      kicker: "Application & usage matrix",
      title: "Registered specifications",
      intro: "Use according to Ministry of Agriculture recommendations.",
      rows: [
        { label: "Target crop", value: "Cucumber", arabic: "الخيار" },
        { label: "Target disease", value: "Downy mildew", arabic: "البياض الزغبي" },
        { label: "Application rate", value: "250 cm³ / 100 L water", arabic: "٢٥٠ سم٣ / ١٠٠ لتر ماء" },
        { label: "Pre-harvest interval (PHI)", value: "5 days", arabic: "٥ أيام" },
        { label: "Restricted entry interval (REI)", value: "24 hours", arabic: "٢٤ ساعة" },
        { label: "Formulation", value: "SL — soluble concentrate", arabic: "مركز قابل للذوبان في الماء" }
      ],
      methodsLabel: "Application methods",
      methods: [
        { title: "Foliar spray", arabic: "رش ورقي", text: "Full-coverage spray with attention to the underside of the leaf." },
        { title: "Drip irrigation", arabic: "مع ماء الري", text: "Added to the irrigation network to reach the root zone directly." }
      ]
    },
    footer: {
      kicker: "Commercial & registration",
      title: "Registered, imported, and supported locally",
      items: [
        { label: "Registration", value: "Egyptian Ministry of Agriculture — Reg. No. 5398" },
        { label: "Manufacturer", value: "Agria SA — Bulgaria (European Union)" },
        { label: "Agent & distributor", value: "AgroPest Control for Trading" },
        { label: "Available packaging", value: "500 cc and 250 cc" }
      ],
      cta: "Contact AgroPest Control",
      note: "Always read the label before use. Keep out of reach of children."
    }
  },
  ar: {
    eyebrow: "ايديجال ٧٢٫٢٪ SL",
    badge: "مبيد فطري جهازي — مجموعة F4 / 28",
    hero: {
      title: "ابدأ الحماية مبكراً قبل أن يبدأ المرض",
      lead: "حماية زراعية متقدمة في المراحل المبكرة.",
      body: "مركز قابل للذوبان في الماء من بروباموكارب هيدروكلوريد ينتقل داخل أنسجة نبات الخيار ليبني درعاً نباتياً ضد البياض الزغبي قبل ظهور الأعراض.",
      ctaPrimary: "جدول الاستخدام",
      ctaSecondary: "تواصل مع اجروبست",
      stats: [
        { label: "المادة الفعالة", value: "72.2%", note: "بروباموكارب هيدروكلوريد" },
        { label: "فترة ما قبل الحصاد", value: "٥ أيام", note: "الخيار" },
        { label: "المعدل", value: "250 cm³", note: "لكل ١٠٠ لتر ماء" }
      ],
      mediaCaption: "عبوات ٥٠٠ سم٣ و ٢٥٠ سم٣"
    },
    challenge: {
      kicker: "معادلة الصوبة",
      title: "الرطوبة هي المُسرِّع وليست المرض",
      riskLabel: "الخطر البيئي",
      riskTitle: "هواء دافئ ومشبع داخل الصوبة",
      riskBody: "الرطوبة المرتفعة تسرع انتشار الأمراض، وظروف الصوبة الدافئة تضع المحصول تحت إجهاد نباتي. وعند ظهور البقع على الورقة تكون دورة الإصابة قد تقدمت بالفعل عدة أجيال.",
      riskPoints: [
        "بلل الأوراق والتكثف يطيل حياة الجراثيم",
        "كثافة المجموع الخضري تترك أسطحاً داخلية دون معاملة",
        "الأعراض الظاهرة تتأخر عن الإصابة الفعلية"
      ],
      solutionLabel: "حل ايديجال",
      solutionTitle: "حاجز يُبنى قبل الاختراق",
      solutionBody: "عند الاستخدام المبكر يُمتص ايديجال ويعاد توزيعه داخل النبات، فيُنشئ حماية داخلية تسبق الإصابة بدلاً من ملاحقتها، ويتم التدخل بينما لا يزال المُمْرِض في أسهل مراحله للمكافحة.",
      solutionPoints: [
        "استخدام وقائي في مراحل النمو المبكرة",
        "حماية تمتد إلى النمو الحديث غير المعامل",
        "يكرر كل ٧–١٠ أيام حسب شدة الإصابة"
      ]
    },
    pillars: {
      kicker: "آلية التأثير",
      title: "ثلاث ركائز للدفاع داخل النبات",
      intro: "بروباموكارب هيدروكلوريد لا يبقى على السطح في انتظار المرض، بل يدخل ويتوزع ويلازم المحصول أثناء نموه.",
      items: [
        {
          index: "٠١",
          title: "انتقال داخلي",
          arabic: "تأثير جهازي",
          text: "ينتقل بسهولة داخل أنسجة النبات ليغطي المناطق التي لم يصلها الرش، ويسد الفجوات الناتجة عن كثافة النمو الخضري."
        },
        {
          index: "٠٢",
          title: "امتصاص سريع",
          arabic: "استجابة سريعة",
          text: "يُمتص سريعاً عبر الجذور والأوراق، فيبدأ الدفاع خلال الساعات الحرجة الأولى بعد المعاملة وليس بعد أيام."
        },
        {
          index: "٠٣",
          title: "حركة صاعدة",
          arabic: "فعالية جهازية عبر الجذور",
          text: "عند الإضافة مع ماء الري ينتقل صعوداً مع تيار النتح ليحمي النموات الحديثة مع اتساع المحصول."
        }
      ]
    },
    usage: {
      kicker: "جدول الاستخدام والمعدلات",
      title: "المواصفات المسجلة",
      intro: "الاستعمال طبقاً لتوصيات وزارة الزراعة.",
      rows: [
        { label: "المحصول", value: "الخيار", arabic: "Cucumber" },
        { label: "المرض المستهدف", value: "البياض الزغبي", arabic: "Downy mildew" },
        { label: "معدل الاستخدام", value: "٢٥٠ سم٣ / ١٠٠ لتر ماء", arabic: "250 cm³ / 100 L" },
        { label: "فترة ما قبل الحصاد (PHI)", value: "٥ أيام", arabic: "5 days" },
        { label: "فترة الدخول المحظورة (REI)", value: "٢٤ ساعة", arabic: "24 hours" },
        { label: "التركيب", value: "مركز قابل للذوبان في الماء", arabic: "SL" }
      ],
      methodsLabel: "طرق الاستخدام",
      methods: [
        { title: "رش ورقي", arabic: "Foliar spray", text: "رش بتغطية كاملة مع العناية بالسطح السفلي للورقة." },
        { title: "مع ماء الري", arabic: "Drip irrigation", text: "يضاف إلى شبكة الري ليصل مباشرة إلى منطقة الجذور." }
      ]
    },
    footer: {
      kicker: "بيانات تجارية وتسجيلية",
      title: "مُسجل ومستورد وبدعم فني محلي",
      items: [
        { label: "رقم التسجيل", value: "وزارة الزراعة المصرية — رقم ٥٣٩٨" },
        { label: "الشركة المنتجة", value: "أجريا اس ايه — بلغاريا (الاتحاد الأوروبي)" },
        { label: "الوكيل والموزع", value: "اجروبست كنترول للتجارة" },
        { label: "العبوات المتاحة", value: "٥٠٠ سم٣ و ٢٥٠ سم٣" }
      ],
      cta: "تواصل مع اجروبست كنترول",
      note: "اقرأ البطاقة الاستدلالية قبل الاستخدام. يحفظ بعيداً عن متناول الأطفال."
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
    title: c.eyebrow + " | " + c.hero.title,
    description: c.hero.body
  };
}

type IconProps = { className?: string; style?: React.CSSProperties };

function LeafIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className} style={style}>
      <path d="M20 4c0 9-5.5 14-12 14H4c0-8 5-13 12-13h4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M4 20c3-6 7-9 12-11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function DropIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className} style={style}>
      <path d="M12 3c4 5 6 8 6 10.5A6 6 0 0 1 6 13.5C6 11 8 8 12 3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9.5 14a2.5 2.5 0 0 0 2.5 2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function ShieldMark({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className} style={style}>
      <path d="M12 2.5 20 5.5v6c0 5-3.4 8.6-8 10.5-4.6-1.9-8-5.5-8-10.5v-6l8-3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="m8.5 12 2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default async function EdegalLandingPage({ params }: LocalePageProps) {
  const { locale } = getLocalePage((await params).locale);
  const c = content[locale];
  const isRtl = locale === "ar";
  const contactHref = "/" + locale + "/contact";
  const dirAttr = isRtl ? "rtl" : "ltr";

  return (
    <div dir={dirAttr} className={cairo.className + " edegal-landing bg-white text-slate-800"}>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1E2875] via-[#283593] to-[#141C55]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,.55) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.55) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse at 50% 0%, black, transparent 72%)",
            WebkitMaskImage: "radial-gradient(ellipse at 50% 0%, black, transparent 72%)"
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 h-[28rem] w-[28rem] rounded-full blur-3xl"
          style={{ backgroundColor: GREEN, opacity: 0.22, insetInlineEnd: "-6rem" }}
        />
        <div className="container-shell relative px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <RevealSection className="text-white" amount={0.2}>
              <span
                className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em]"
                style={{ borderColor: GREEN + "80", color: GREEN }}
              >
                <ShieldMark className="h-4 w-4" />
                {c.badge}
              </span>
              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.28em] text-white/60">{c.eyebrow}</p>
              <h1 className="mt-3 text-3xl font-extrabold leading-[1.2] sm:text-4xl lg:text-5xl">{c.hero.title}</h1>
              <p className="mt-4 text-lg font-semibold" style={{ color: GREEN }}>
                {c.hero.lead}
              </p>
              <p className="mt-4 max-w-xl text-base leading-8 text-white/75">{c.hero.body}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#usage"
                  className="rounded-xl px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:brightness-110"
                  style={{ backgroundColor: ORANGE }}
                >
                  {c.hero.ctaPrimary}
                </a>
                <Link
                  href={contactHref}
                  className="rounded-xl border border-white/30 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/15"
                >
                  {c.hero.ctaSecondary}
                </Link>
              </div>

              <dl className="mt-10 grid gap-4 sm:grid-cols-3">
                {c.hero.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-white/15 bg-white/[0.07] p-4 backdrop-blur-sm"
                  >
                    <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-white/50">{stat.label}</dt>
                    <dd dir="ltr" className="mt-1 text-2xl font-extrabold text-white" style={{ textAlign: isRtl ? "right" : "left" }}>
                      {stat.value}
                    </dd>
                    <dd className="mt-0.5 text-xs text-white/60">{stat.note}</dd>
                  </div>
                ))}
              </dl>
            </RevealSection>

            {/* Oversized media container — 3D render slot */}
            <RevealSection className="relative" amount={0.2}>
              <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-white/15 bg-gradient-to-br from-white/15 via-white/5 to-transparent shadow-[inset_0_2px_40px_rgba(0,0,0,0.35)]">
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-2/3"
                  style={{ background: "radial-gradient(ellipse at 50% 100%, " + GREEN + "40, transparent 70%)" }}
                />
                <img
                  src="/images/products/edegal-bottles-hero.png"
                  alt={c.eyebrow}
                  className="absolute inset-0 h-full w-full object-contain p-6 drop-shadow-2xl"
                />
                <span className="absolute bottom-5 start-6 rounded-full bg-black/35 px-4 py-1.5 text-xs font-semibold text-white/85 backdrop-blur-sm">
                  {c.hero.mediaCaption}
                </span>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* CHALLENGE VS SOLUTION */}
      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <RevealSection className="container-shell" amount={0.2}>
          <p className="text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: ORANGE }}>
            {c.challenge.kicker}
          </p>
          <h2 className="mt-3 max-w-3xl text-2xl font-extrabold leading-tight sm:text-3xl lg:text-4xl" style={{ color: BLUE }}>
            {c.challenge.title}
          </h2>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <span
                className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em]"
                style={{ backgroundColor: ORANGE + "14", color: ORANGE }}
              >
                {c.challenge.riskLabel}
              </span>
              <h3 className="mt-4 text-xl font-bold" style={{ color: BLUE }}>
                {c.challenge.riskTitle}
              </h3>
              <p className="mt-3 text-base leading-8 text-slate-600">{c.challenge.riskBody}</p>
              <div className="mt-6 aspect-video overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-orange-50 via-amber-50 to-white shadow-[inset_0_2px_24px_rgba(230,81,0,0.10)]">
                <div className="flex h-full w-full items-center justify-center">
                  <DropIcon className="h-16 w-16" style={{ color: ORANGE }} />
                </div>
              </div>
              <ul className="mt-6 space-y-3">
                {c.challenge.riskPoints.map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-7 text-slate-600">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: ORANGE }} />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border p-7 text-white shadow-lg" style={{ borderColor: BLUE, backgroundColor: BLUE }}>
              <span
                className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em]"
                style={{ backgroundColor: GREEN + "26", color: GREEN }}
              >
                {c.challenge.solutionLabel}
              </span>
              <h3 className="mt-4 text-xl font-bold">{c.challenge.solutionTitle}</h3>
              <p className="mt-3 text-base leading-8 text-white/75">{c.challenge.solutionBody}</p>
              <div className="mt-6 aspect-video overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-white/15 via-white/5 to-transparent shadow-[inset_0_2px_24px_rgba(0,0,0,0.35)]">
                <div className="flex h-full w-full items-center justify-center">
                  <ShieldMark className="h-16 w-16" style={{ color: GREEN }} />
                </div>
              </div>
              <ul className="mt-6 space-y-3">
                {c.challenge.solutionPoints.map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-7 text-white/80">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: GREEN }} />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </RevealSection>
      </section>

      {/* THREE PILLARS */}
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <RevealSection className="container-shell" amount={0.2}>
          <p className="text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: ORANGE }}>
            {c.pillars.kicker}
          </p>
          <h2 className="mt-3 max-w-3xl text-2xl font-extrabold leading-tight sm:text-3xl lg:text-4xl" style={{ color: BLUE }}>
            {c.pillars.title}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">{c.pillars.intro}</p>

          <StaggerContainer className="mt-10 grid gap-6 md:grid-cols-3">
            {c.pillars.items.map((item) => (
              <RevealItem key={item.title}>
                <article className="group h-full rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex items-center justify-between gap-4">
                    <span
                      className="flex h-12 w-12 items-center justify-center rounded-2xl text-lg font-extrabold text-white"
                      style={{ backgroundColor: BLUE }}
                    >
                      {item.index}
                    </span>
                    <span
                      className="h-1.5 flex-1 rounded-full"
                      style={{ background: "linear-gradient(to " + (isRtl ? "left" : "right") + ", " + GREEN + ", transparent)" }}
                    />
                  </div>
                  <h3 className="mt-5 text-lg font-bold" style={{ color: BLUE }}>
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm font-semibold" style={{ color: ORANGE }}>
                    {item.arabic}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
                  <div
                    className="mt-6 aspect-video rounded-2xl border border-slate-200 shadow-[inset_0_2px_20px_rgba(40,53,147,0.10)]"
                    style={{ background: "linear-gradient(135deg, " + GREEN + "1F, " + BLUE + "14)" }}
                  >
                    <div className="flex h-full w-full items-center justify-center">
                      <LeafIcon className="h-12 w-12" style={{ color: BLUE, opacity: 0.55 }} />
                    </div>
                  </div>
                </article>
              </RevealItem>
            ))}
          </StaggerContainer>
        </RevealSection>
      </section>

      {/* USAGE MATRIX */}
      <section id="usage" className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <RevealSection className="container-shell" amount={0.2}>
          <p className="text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: ORANGE }}>
            {c.usage.kicker}
          </p>
          <h2 className="mt-3 text-2xl font-extrabold leading-tight sm:text-3xl lg:text-4xl" style={{ color: BLUE }}>
            {c.usage.title}
          </h2>
          <p className="mt-3 text-sm text-slate-500">{c.usage.intro}</p>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <dl>
                {c.usage.rows.map((row, index) => (
                  <div
                    key={row.label}
                    className={
                      "flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-6 py-5 sm:px-8 " +
                      (index % 2 === 1 ? "bg-slate-50/70 " : "") +
                      (index > 0 ? "border-t border-slate-100" : "")
                    }
                  >
                    <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">{row.label}</dt>
                    <dd className="flex items-baseline gap-3">
                      <span className="text-lg font-extrabold" style={{ color: BLUE }}>
                        {row.value}
                      </span>
                      <span className="text-sm text-slate-400">{row.arabic}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">{c.usage.methodsLabel}</p>
                <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                  {c.usage.methods.map((method, index) => (
                    <div
                      key={method.title}
                      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="flex h-11 w-11 items-center justify-center rounded-xl"
                          style={{ backgroundColor: (index === 0 ? GREEN : BLUE) + "1A", color: index === 0 ? "#5E8F26" : BLUE }}
                        >
                          {index === 0 ? <LeafIcon className="h-6 w-6" /> : <DropIcon className="h-6 w-6" />}
                        </span>
                        <div>
                          <p className="text-sm font-bold" style={{ color: BLUE }}>
                            {method.title}
                          </p>
                          <p className="text-xs font-semibold" style={{ color: ORANGE }}>
                            {method.arabic}
                          </p>
                        </div>
                      </div>
                      <p className="mt-3 text-sm leading-7 text-slate-600">{method.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-100 shadow-[inset_0_2px_28px_rgba(40,53,147,0.08)]">
                <img
                  src="/images/products/edegal-label-500.jpg"
                  alt={c.eyebrow}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </RevealSection>
      </section>

      {/* COMMERCIAL FOOTER */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-24" style={{ backgroundColor: BLUE }}>
        <RevealSection className="container-shell text-white" amount={0.2}>
          <p className="text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: GREEN }}>
            {c.footer.kicker}
          </p>
          <h2 className="mt-3 max-w-3xl text-2xl font-extrabold leading-tight sm:text-3xl lg:text-4xl">{c.footer.title}</h2>

          <dl className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {c.footer.items.map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/15 bg-white/[0.06] p-5 backdrop-blur-sm">
                <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-white/50">{item.label}</dt>
                <dd className="mt-2 text-sm font-bold leading-7 text-white">{item.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href={contactHref}
              className="rounded-xl px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:brightness-110"
              style={{ backgroundColor: ORANGE }}
            >
              {c.footer.cta}
            </Link>
            <p className="text-xs text-white/55">{c.footer.note}</p>
          </div>
        </RevealSection>
      </section>
    </div>
  );
}
