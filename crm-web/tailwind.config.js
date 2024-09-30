/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Raleway', 'sans-serif'],
      },
      colors: {
        primary: '#00bf63', // Your primary color
        secondary: '#112c50', // Your secondary color
      },
    },
  },
  plugins: [],
}

