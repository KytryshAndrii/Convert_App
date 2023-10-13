/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow:{
        '3xl': '-2px 21px 30px -20px rgba(34, 60, 80, 0.18)',
        '4xl': '-1px 1px 7px 1px rgba(34, 60, 80, 0.2)',
    },
      padding: {
        '21': '5.25rem',
    },
  },
  plugins: [],
}}