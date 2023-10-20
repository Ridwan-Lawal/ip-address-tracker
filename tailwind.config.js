/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.js", "./index.html"],
  theme: {
    fontFamily: {
      sans: ["Rubik", "sans-serif"],
    },
    extend: {
      colors: {
        veryDarkGray: "hsl(0, 0%, 17%)",
        darkGray: "hsl(0, 0%, 59%)",
      },
      backgroundImage: {
        "header-mobile": "url('/images/pattern-bg-mobile.png')",
        "header-desktop": "url('/images/pattern-bg-desktop.png')",
      },
    },
  },
  plugins: [],
};
