/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors:{
        purple1: '#AD88C6',
        purple2: '#7469B6',
        purple3: '#60227C',
        grey1: '#F1F4F4',
        grey2: '#F1F1F8'
      }
    },
  },
  plugins: [],
};