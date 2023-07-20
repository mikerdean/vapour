/** @type {import('tailwindcss').Config} */
export default {
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
