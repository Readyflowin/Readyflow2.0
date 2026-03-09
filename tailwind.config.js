/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: "#6366f1", // Vibrant button color
          dark: "#0f172a",   // Deep navy for maximum readability
          bg: "#f8fafc",     // Clean off-white canvas
        }
      },
      fontFamily: {
        // Pairing a bold tech sans with an elegant serif
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'serif'],
      },
    },
  },
  plugins: [],
}