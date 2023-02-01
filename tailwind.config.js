/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: { black: "#0a1419" },
      fontFamily: { sans: ["Ubuntu", ...defaultTheme.fontFamily.sans] },
    },
  },
  plugins: [],
};
