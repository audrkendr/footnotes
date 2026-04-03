/** @type {import('tailwindcss').Config} */
export default {
  // 1. Where to look for classes
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // 2. Customizing the design
  theme: {
    extend: {
      colors: {
        // You can add a custom 'spotify' green here!
        'spotify-green': '#1DB954',
      },
    },
  },
  // 3. Extra tools (leave empty for now)
  plugins: [],
}