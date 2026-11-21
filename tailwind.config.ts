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
        chokas: {
          light: {
            bg: "#F6F7F9",
            surface: "#FFFFFF",
            primary: "#3D43C8",
            primaryHover: "#2F34A8",
            primaryLight: "#ECEEFF",
            typography: "#161A2C",
            muted: "#5E647D",
            border: "#E2E5EE",
            glass: "rgba(255, 255, 255, 0.72)",
          },
          dark: {
            bg: "#0B0D12",
            surface: "#151821",
            surfaceHover: "#1E222F",
            primary: "#A5AAFF",
            primaryHover: "#8C92FF",
            primaryDark: "#232757",
            typography: "#F2F4F8",
            muted: "#9CA3AF",
            border: "#262C3D",
            glass: "rgba(21, 24, 33, 0.75)",
          },
        },
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.07)",
        "glass-dark": "0 8px 32px 0 rgba(0, 0, 0, 0.45)",
        glow: "0 0 25px -5px rgba(61, 67, 200, 0.35)",
        "glow-dark": "0 0 25px -5px rgba(165, 170, 255, 0.25)",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "float-slow": "float 8s ease-in-out infinite",
        "pulse-subtle": "pulseSubtle 4s ease-in-out infinite",
        "shimmer": "shimmer 2.5s infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
