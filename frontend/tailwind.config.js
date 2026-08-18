/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
      },
      colors: {
        brand: {
          bg: "#000000",        // sab pages ka main dark background
          surface: "#171717",   // cards, sections ka thora lighter dark
          accent: "#a3e635",    // lime-green (buttons, highlights, links hover)
          accentDark: "#84cc16",// accent ka hover/darker shade
          text: "#ffffff",      // primary text (headings)
          muted: "#ffffff",     // secondary/paragraph text
        },
      },
    },
  },
  plugins: [],
};