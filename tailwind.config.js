/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.tsx"],
  darkMode: "class",
  theme: {
    extend: {
      colors: { black: "#0a1419" },
      fontFamily: { sans: ["Ubuntu", ...defaultTheme.fontFamily.sans] },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
