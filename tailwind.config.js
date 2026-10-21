/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        github: {
          0: '#ebedf0',
          1: '#9be9a8',
          2: '#40c463',
          3: '#30a14e',
          4: '#216e39',
        },
      },
    },
  },
  plugins: [],
}
