/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  important: true,
  corePlugins: { preflight: false },
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3653FE',
          light: '#C3CCFF',
          lighter: '#F4F8FD',
        },
        gray: {
          text: '#939AA4',
          light: '#E6EBEF',
        },
        red: { DEFAULT: '#DF477E' },
        green: { DEFAULT: '#059E30' },
      },
      fontFamily: {
        sans: ['var(--font-dm-sans)', ...fontFamily.sans],
      },
    },
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '1rem',
        lg: '1rem',
        xl: '1rem',
        '2xl': '1rem',
      },
      center: true,
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
