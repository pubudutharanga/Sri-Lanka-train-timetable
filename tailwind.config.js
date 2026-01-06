/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./pages/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        'sl-blue': '#0b5fff',
        'sl-green': '#0fa77a',
        'sl-gold': '#f6c84c'
      }
    },
  },
  plugins: [],
}
