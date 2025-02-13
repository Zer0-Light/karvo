
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#000000", // Black for primary text and elements
          foreground: "#B4FF00", // Neon green for contrast
        },
        secondary: {
          DEFAULT: "#B4FF00", // Neon green as secondary color
          foreground: "#000000", // Black for contrast
        },
        accent: {
          DEFAULT: "#D7FF63", // Lighter neon green for accents
          foreground: "#000000",
        },
        muted: {
          DEFAULT: "#F2FCE2", // Very light green for muted backgrounds
          foreground: "#000000",
        },
        neon: {
          DEFAULT: "#B4FF00", // Our main neon green color
          light: "#D7FF63",
          dark: "#96D600",
        },
      },
      keyframes: {
        "slide-up": {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "neon-pulse": {
          "0%, 100%": { 
            boxShadow: "0 0 10px #B4FF00, 0 0 20px #B4FF00, 0 0 30px #B4FF00",
          },
          "50%": {
            boxShadow: "0 0 15px #B4FF00, 0 0 25px #B4FF00, 0 0 35px #B4FF00",
          },
        },
      },
      animation: {
        "slide-up": "slide-up 0.6s ease-out",
        "fade-in": "fade-in 0.8s ease-out",
        "fade-up": "fade-up 0.6s ease-out",
        "neon-pulse": "neon-pulse 2s infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
