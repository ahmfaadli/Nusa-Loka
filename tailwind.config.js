export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        'coffee-dark': '#6b3e26',
        'coffee-brown': '#8b5a2b',
        'coffee-cream': '#f5e6d3',
        'coffee-light': '#e8d5c4',
        'coffee-black': '#1a1a1a'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'serif']
      }
    }
  },
  plugins: []
}
