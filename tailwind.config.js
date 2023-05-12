/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '300px',
        '3xl': '1700px',
      },
      colors: {
        primary: '#0A0909',
        secondary: '#292828',
        navbar: '#0A0909',
        detail: '#FFD369',
        letter: '#EEEEEE',
      },
      fontSize: {
        '2xs': '0.65rem',
      },
      height: {
        '90p': '90%',
      },
      zIndex: {
        100: 100,
      },
    },
  },
  plugins: [],
};
