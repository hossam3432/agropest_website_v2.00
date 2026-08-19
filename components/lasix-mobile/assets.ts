/* Every image the mobile page uses, declared once here and referenced by name
   from the sections below. Keeping the program in one place is what makes it
   reviewable: you can see at a glance that each section gets one photograph and
   that no asset is doing double duty.

   Paths resolve through ResponsiveImage's manifest (avif/webp/fallback, 400 to
   2000px). `next/image` is inert in this project — the static export sets
   images.unoptimized — so ResponsiveImage is the real optimisation path. */
export const asset = {
  /** Arabic and Latin wordmark lockups, petrol on transparent: light plates only. */
  logoAr: "/images/lasix/lasix-logo-ar.png",
  logoEn: "/images/lasix/lasix-logo-en.png",
  /** The double checkmark as artwork rather than inline SVG — it carries the
      brand's cyan offset and the print texture the drawn version cannot. */
  check: "/images/lasix/lasix-check.png",

  /* Photography, one per section. */
  whitefly: "/images/lasix/lasix-whitefly.jpg",
  tylcv: "/images/lasix/lasix-tylcv.jpg",
  /** The WG formulation being made up in the tank — the claim, demonstrated. */
  mixing: "/images/lasix/lasix-mixing.jpg",

  /* The two field shots that carry the section transitions. They are plain
     photographs: the diagonal framing that used to be baked into the panel
     bitmaps is now geometry in shapes.ts, cut around them at run time. */
  farmerCheck: "/images/lasix/lasix-farmer-check.jpg",
  tomatoClose: "/images/lasix/lasix-tomato-close.jpg",

  /* Product shots already staged in the repo for the desktop build. */
  carton: "/images/products/lasix-detail.png",
  sachet: "/images/products/lasix-gallery.png"
} as const;

/** Visible labels printed onto a figure. Distinct from alt text: the caption
    names the condition for a sighted reader, the alt describes the picture. */
export const figCaption = {
  en: { tylcv: "How Tomato Yellow Leaf Curl Virus infection presents" },
  ar: { tylcv: "مظهر الاصابة بفيروس تجعد وإصفرار اوراق الطماطم" }
} as const;

/** Alt text is content, so it is localised alongside the copy rather than
    hardcoded at the call site. Panels are decorative and take alt="". */
export const altText = {
  en: {
    logo: "LASIX 70 WG",
    whitefly: "Adult whitefly and nymph on the underside of a tomato leaf",
    tylcv: "A tomato shoot curled and distorted by Tomato Yellow Leaf Curl Virus",
    mixing: "Gloved hands emptying a Lasix 70 WG sachet into a tank of water",
    farmerCheck: "A grower looking down a treated tomato field at sunrise",
    tomatoClose: "Ripe tomatoes on a healthy, undamaged vine",
    carton: "Lasix 70 WG carton with 40 g sachets",
    sachet: "Lasix 70 WG 40 g sachet",
    check: ""
  },
  ar: {
    logo: "لازيكس 70 دبليو جي",
    whitefly: "ذبابة بيضاء كاملة وحورية على السطح السفلي لورقة الطماطم",
    tylcv: "نمو طماطم متجعد ومشوه بفعل فيروس تجعد واصفرار أوراق الطماطم",
    mixing: "يدان بقفازات تفرغان كيس لازيكس 70 دبليو جي في خزان ماء",
    farmerCheck: "مزارع ينظر إلى حقل طماطم معالج عند شروق الشمس",
    tomatoClose: "ثمار طماطم ناضجة على نبات سليم غير مصاب",
    carton: "كرتونة لازيكس 70 دبليو جي مع أكياس 40 جرام",
    sachet: "كيس لازيكس 70 دبليو جي 40 جرام",
    check: ""
  }
} as const;
