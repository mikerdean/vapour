/* eslint-disable no-undef */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      transitionProperty: {
        height: "height",
        width: "width",
      },
      transitionDuration: {
        400: "400ms",
      },
      transitionTimingFunction: {
        "slide-in": "cubic-bezier(.25,.8,.25,1)",
      },
    },
    fontFamily: {
      serif: ["Roboto", "serif"],
    },
  },
  plugins: [],
};
