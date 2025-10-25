/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}","./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: { boxShadow: { glass: "0 10px 40px rgba(0,0,0,0.45)" } }
  },
  plugins: []
}
