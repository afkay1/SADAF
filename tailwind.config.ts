import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#f4efe6",
        ink: "#10283a",
        aqua: "#bcd9d8",
        lagoon: "#0b3a42",
        coral: "#e07a5f",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        script: ["var(--font-script)", "cursive"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      keyframes: {
        spinSlow: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        pulseRing: {
          "0%": { transform: "scale(1)", opacity: "0.7" },
          "100%": { transform: "scale(2.1)", opacity: "0" },
        },
      },
      animation: {
        "spin-slow": "spinSlow 32s linear infinite",
        "pulse-ring": "pulseRing 2.2s ease-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
