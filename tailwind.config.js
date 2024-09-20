/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'elegant': ['Great Vibes', 'cursive'],
        'great-vibes': ['Great Vibes', 'cursive'],
        'serif': ['Roboto', 'serif'],
        'dancing-script': ['Dancing Script', 'cursive'],
      },
      colors: {
        'custom-brown': '#90686F',
        'custom-gradient-start': '#ffafbd',
        'custom-gradient-end': '#ffc3a0',
      }
    },
  },
  plugins: [],
}

