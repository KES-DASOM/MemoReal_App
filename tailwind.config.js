/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        purple1: '#AD88C6',
        purple2: '#7469B6',
        purple3: '#60227C',
        purple4: '#E1AFD1',
        grey1: '#F1F1F8',
        grey2: '#b3b3b3',
        grey3: '#5E5E5E',
        grey4: '#E6E6E6',
        grey5: '#9DB2CE',
      },
      fontFamily: {
        'mainFont-regular': ['NotoSansKR-Regular'],
        'mainFont-medium': ['NotoSansKR-Medium'],
        'mainFont-Bold': ['NotoSansKR-Bold'],
        subFont: ['FreesentationVF'],
      },
    },
  },
  plugins: [],
};
