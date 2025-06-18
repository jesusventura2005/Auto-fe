/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app.{js,ts,tsx}', './src/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter-var', 'sans-serif'],
      },
      colors: {
        'color-bg': '#ffff',
        'color-bg-dark': '#020a16',
        'color-text': '#101724',
        'color-text-dark': '#f7f9fb',
        'color-title': '#009de2',
        'color-title-dark': '#ffffff',
        'color-primary': '#0059d8',
        'color-secondary': '#009de2',
        'color-border-dark': '#1a2431',
        'color-alert': '#f6363d'
      },
    },
  },
  plugins: [],
};
