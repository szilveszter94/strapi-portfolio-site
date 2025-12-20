const svgToDataUri = require("mini-svg-data-uri");

const { default: flattenColorPalette } = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",

      white: "rgb(var(--white) / <alpha-value>)",
      black: "rgb(var(--black) / <alpha-value>)",
      ring: "rgb(var(--ring) / <alpha-value>)",
      code: "rgb(var(--code-bg) / <alpha-value>)",
      link: "rgb(var(--link) / <alpha-value>)",

      gray: {
        50: "rgb(var(--gray-50) / <alpha-value>)",
        200: "rgb(var(--gray-200) / <alpha-value>)",
        500: "rgb(var(--gray-500) / <alpha-value>)",
        700: "rgb(var(--gray-700) / <alpha-value>)",
        900: "rgb(var(--gray-900) / <alpha-value>)",
      },

      neutral: {
        50: "rgb(var(--neutral-50) / <alpha-value>)",
        100: "rgb(var(--neutral-100) / <alpha-value>)",
        200: "rgb(var(--neutral-200) / <alpha-value>)",
        300: "rgb(var(--neutral-300) / <alpha-value>)",
        400: "rgb(var(--neutral-400) / <alpha-value>)",
        700: "rgb(var(--neutral-700) / <alpha-value>)",
        900: "rgb(var(--neutral-900) / <alpha-value>)",
        950: "rgb(var(--neutral-950) / <alpha-value>)",
      },

      primary: {
        50: "rgb(var(--primary-50) / <alpha-value>)",
        100: "rgb(var(--primary-100) / <alpha-value>)",
        700: "rgb(var(--primary-700) / <alpha-value>)",
        900: "rgb(var(--primary-900) / <alpha-value>)",
      },

      red: {
        500: "rgb(var(--red-500) / <alpha-value>)",
        600: "rgb(var(--red-600) / <alpha-value>)",
      },

      green: {
        500: "rgb(var(--green-500) / <alpha-value>)",
      },

      secondary: "rgb(var(--secondary) / <alpha-value>)",
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    addVariablesForColors,
    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "bg-dot": (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
      );
    },
  ],
};

function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(Object.entries(allColors).map(([key, val]) => [`--${key}`, val]));

  addBase({
    ":root": newVars,
  });
}
