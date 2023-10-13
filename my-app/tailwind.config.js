/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow:{
        '1.5xl':'0px 8px 16px 2px rgba(34, 60, 80, 0.12)',
        '2xl': ' 0px 5px 5px -5px rgba(34, 60, 80, 0.49)',
        '3xl': '-2px 21px 30px -20px rgba(34, 60, 80, 0.18)',
        '4xl': '-1px 1px 7px 1px rgba(34, 60, 80, 0.2)',
    },
      padding: {
        '21': '5.25rem',
    },
  },
  plugins: [],
}}