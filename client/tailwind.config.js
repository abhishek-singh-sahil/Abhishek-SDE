/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,jsx,js}",
  ],
  theme: {
    extend: {
      colors: {
        offwhite: "#F7F6F2", // Warm off-white
        navy: "#18212B",     // Deep navy
        sage: "#7C9A8B",     // Muted sage green
        softblue: "#6B7FA3", // Soft blue
        gold: "#C89B4B",     // Warm gold
        surface: "#FFFFFF",
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "Inter", "sans-serif"],
        serif: ["'Playfair Display'", "Georgia", "serif"],
        pixel: ["'VT323'", "monospace"], // Used as a subtle icon/monogram detail
      },
      boxShadow: {
        premium: "0 10px 30px -10px rgba(24, 33, 43, 0.08)",
        premiumHover: "0 20px 40px -15px rgba(24, 33, 43, 0.15)",
        premiumInset: "inset 0 2px 4px 0 rgba(24, 33, 43, 0.06)",
      },
    },
  },
  plugins: [],
}
