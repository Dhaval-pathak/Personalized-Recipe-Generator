/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightGradientStart: '#17B160',
        lightGradientEnd: '#17B169',
        darkGradientStart: '#111827',
        darkGradientEnd: '#111827', 
        navBackgroundLight: '#E5F4F1',
        navBackgroundDark: '#0F3D39',
        customGreen: '#1CAC70',
        customGreen2: '#16a34a',

      },
    },
  },
  plugins: [],
}
