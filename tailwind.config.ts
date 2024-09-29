import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/utils/parse.tsx",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "var(--font-roboto)",
          "Hiragino Kaku Gothic ProN",
          "Hiragino Sans",
          "Meiryo",
          "ui-sans-serif",
          "system-ui",
        ],
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-hero-patterns"),
  ],
};
export default config;
