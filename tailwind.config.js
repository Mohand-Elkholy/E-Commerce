const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./node_modules/@nextui-org/theme/dist/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}" , 
    "./index.html"
  ],
  darkMode: "class",
  theme: {
    extend: {},
  },
    
  plugins: [nextui()],
}

