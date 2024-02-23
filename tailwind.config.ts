import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
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
        accent: '#4C3EA3',
      },
      fontSize: {
        '2xs': '0.65rem',
      },
      height: {
        '90p': '90%',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
export default config;
