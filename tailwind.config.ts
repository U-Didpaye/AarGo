import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        aarogya: {
          light: {
            bg: "#F4F8F7", // HealthOrbit airy background
            surface: "#FFFFFF",
            primary: "#0D7A6E", // HealthOrbit sage teal
            primaryHover: "#0B5E55", // Deep teal 900
            primaryLight: "#DAF0EC", // Soft sage tint
            vibrant: "#109485", // Electric teal 600
            accent: "#E07A68", // HealthOrbit coral for AI glow
            typography: "#0F1C1A", // Deep teal-slate text
            muted: "#4E6B63", // Calm muted sage
            border: "#DBE9E6", // Soft clinical border
            glass: "rgba(255, 255, 255, 0.82)",
          },
          dark: {
            bg: "#071112", // Deep abyssal teal void
            surface: "#0D1C1E", // Obsidian teal surface
            surfaceHover: "#13282B",
            primary: "#2DD4BF", // Luminous mint
            primaryHover: "#5EEAD4",
            primaryDark: "#0B5E55",
            vibrant: "#38BDF8", // Luminous cyan
            accent: "#F59E0B", // Warm gold for AI
            typography: "#F2FAF8", // Pure clinical off-white
            muted: "#8FA8A1", // Cool muted sage
            border: "rgba(16, 148, 133, 0.25)",
            glass: "rgba(13, 28, 30, 0.82)",
          },
        },
      },
      boxShadow: {
        glass: "0 20px 40px rgba(13, 122, 110, 0.08), inset 0 1px 1px rgba(255, 255, 255, 0.9)",
        "glass-dark": "0 20px 40px rgba(0, 0, 0, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.05)",
        "teal-glow": "0 0 25px -4px rgba(16, 148, 133, 0.35)",
        "coral-glow": "0 0 25px -4px rgba(224, 122, 104, 0.35)",
        "mint-glow": "0 0 25px -4px rgba(45, 212, 191, 0.3)",
      },
      animation: {
        "float-slow": "float 16s ease-in-out infinite",
        "pulse-subtle": "pulseSubtle 4s ease-in-out infinite",
        "spin-slow": "spinSlow 14s linear infinite",
        "spin-reverse": "spinReverse 10s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "50%": { transform: "translate(25px, -20px) scale(1.08)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
        spinSlow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        spinReverse: {
          "0%": { transform: "rotate(360deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
