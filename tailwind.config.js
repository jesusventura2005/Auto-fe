/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app.{js,ts,tsx}', './src/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter-var', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
