/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["*.{html,js}"],
    theme: {
      extend: {
        colors: {
          'light-background': '#F2F4F8',
          'secondary-background': '#1053D4',
        },
        fontFamily: {
          'inter': ['Inter', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }