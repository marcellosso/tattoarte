/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#393E46',
        secondary: '#222831',
        detail: '#FFD369',
        letter: '#EEEEEE',
      },
    },
  },
  plugins: [],
};
