const colors = require("tailwindcss/colors")

module.exports = {
  purge: ['./src/**/*.js', './src/**/*.jsx', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      white: "white",
      transparent: "transparent",
      red: colors.red,
      green: colors.green,
      indigo: colors.indigo,
      blue: colors.lightBlue,
      gray: colors.warmGray,
    },
    fontFamily: {
      'sans': `Montserrat, -apple-system, Roboto, "Helvetica Neue", sans-serif`,
      'openSans': `Open Sans, Arial, sans-serif`,
      'roboto': `Robot, Arial, sans-serif`,
    },
    extend: {},
  },
  variants: {
    extend: {
      opacity: ['disabled'],
    },
  },
  plugins: [],
}
