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
      },
      colors: {
        // primary: '#393E46',
        // secondary: '#222831',
        // navbar: '#222831',
        primary: 'rgb(31 41 55)',
        secondary: 'rgb(17 24 39)',
        navbar: 'rgb(17 24 39)',
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
