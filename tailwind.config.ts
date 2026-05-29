import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#eef3fb",
          100: "#d6e2f4",
          200: "#a8c2e6",
          300: "#7aa2d8",
          400: "#4f7fc3",
          500: "#2c5da7",
          600: "#1f4582",
          700: "#162f5c",
          800: "#0e1f3f",
          900: "#0a1730",
          950: "#050b1c",
        },
        cyan: {
          500: "#06b6d4",
          600: "#0891b2",
        },
        category: {
          gened: "#16a34a",
          math: "#f97316",
          core: "#0ea5e9",
          elective: "#a855f7",
          free: "#86efac",
          coop: "#7c3aed",
          project: "#9333ea",
          wil: "#d946ef",
          lab: "#0f172a",
        },
      },
      fontFamily: {
        sans: [
          "'Prompt'",
          "system-ui",
          "-apple-system",
          "'Segoe UI'",
          "Roboto",
          "sans-serif",
        ],
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(15,23,42,0.04), 0 4px 16px rgba(15,23,42,0.06)",
        glow: "0 0 0 1px rgba(34,211,238,0.4), 0 0 24px rgba(34,211,238,0.25)",
      },
      backgroundImage: {
        "grid-fade":
          "radial-gradient(ellipse at top, rgba(34,211,238,0.10), transparent 60%), linear-gradient(180deg, #050b1c 0%, #0a1730 100%)",
        "node-grid":
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

export default config;
