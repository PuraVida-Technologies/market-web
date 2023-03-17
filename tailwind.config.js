/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  important: true,
  corePlugins: { preflight: false },
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-dm-sans)', ...fontFamily.sans],
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
