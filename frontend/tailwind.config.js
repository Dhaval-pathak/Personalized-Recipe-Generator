/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightGradientStart: 'rgb(34, 197, 94)',
        lightGradientEnd: '#22c55e',
        darkGradientStart: '#111827',
        darkGradientEnd: '#111827', 
        navBackgroundLight: '#E5F4F1',
        navBackgroundDark: '#0F3D39',
      },
    },
  },
  plugins: [],
}
