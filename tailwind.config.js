/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Código HEX para turquesa
        turquesa: '#349EA8',
        turquesaT: '#1C5A89',

      },
    },
  },
  plugins: [],
}

