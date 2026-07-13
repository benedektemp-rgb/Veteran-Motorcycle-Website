import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        parchment: "var(--color-parchment)",
        "parchment-dark": "var(--color-parchment-dark)",
        ink: "var(--color-ink)",
        espresso: "var(--color-espresso)",
        "espresso-dark": "var(--color-espresso-dark)",
        rust: "var(--color-rust)",
        "rust-dark": "var(--color-rust-dark)",
        mustard: "var(--color-mustard)",
        olive: "var(--color-olive)",
        cream: "var(--color-cream)",
      },
    },
  },
  plugins: [],
};

export default config;
