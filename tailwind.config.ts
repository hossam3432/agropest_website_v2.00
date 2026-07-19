import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
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
