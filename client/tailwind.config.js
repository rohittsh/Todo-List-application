import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        'grid-light': 'linear-gradient(120deg, rgba(99,102,241,.08) 1px, transparent 0), linear-gradient(60deg, rgba(99,102,241,.08) 1px, transparent 0)',
      },
    },
  },
  plugins: [],
};


