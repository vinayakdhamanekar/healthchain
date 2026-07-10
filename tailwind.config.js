/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-schibsted)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      colors: {
        brand: {
          bg: "#F4EFE8",
          pill: "#FBF9F4",
          terra: "#A8543C",
          dark: "#292621",
          nav: "#3A352E",
          muted: "#6B665D",
          border: "#E5DECF",
        },
      },

      // ✅ MOVE THESE HERE
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marqueeReverse: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
      },

      animation: {
        marquee: "marquee 30s linear infinite",
        marqueeReverse: "marqueeReverse 30s linear infinite",
      },
    },
  },

  plugins: [],
};

export default config;