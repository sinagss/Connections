/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "theme-blue": "#1976d2",
        "theme-red": '#ef4444'

      }
    },
  },
  plugins: [],
}