import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    /* Every container on the site is rounded, on one closed scale. This replaces
       Tailwind's own scale rather than extending it, so `rounded-xl`, `rounded-2xl` and
       `rounded-3xl` no longer resolve — that is what stops the 17 ad-hoc values
       (`rounded-[1.35rem]`, `rounded-[1.15rem]`, `rounded-[1.1rem]` …) creeping back.
         sm    small controls — inputs, selects, chips, badges, tags
         md    the default container — cards, panels, media frames, table shells
         lg    large surfaces — hero panels, CTA blocks, full-width feature sections
         full  actions and circles — buttons, pills, avatars, dots
         none  opt out, only where a full-bleed edge is deliberate */
    borderRadius: {
      none: "0",
      DEFAULT: "8px",
      sm: "8px",
      md: "16px",
      lg: "24px",
      full: "9999px"
    },
    extend: {
      fontFamily: {
        sans: [
          "var(--font-readex-pro)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif"
        ]
      },
      colors: {
        agri: {
          green: "#0F5A3C",
          greenDark: "#0A3D2B",
          blue: "#17324D",
          gold: "#D99227",
          orange: "#E56F2E",
          leaf: "#4F8F45",
          mist: "#F4F7F5",
          line: "#DDE7E1"
        }
      },
      boxShadow: {
        soft: "0 18px 60px rgba(23, 50, 77, 0.10)"
      }
    }
  },
  plugins: []
};

export default config;
