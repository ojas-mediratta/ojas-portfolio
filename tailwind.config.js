/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#1f2430",
        panel: "#232a36",
        border: "#2b3240",
        text: "#cbccc6",
        subtext: "#9da5b4",
        "accent-blue": "#59c2ff",
        "accent-green": "#bae67e",
        "accent-yellow": "#ffcc66",
        "accent-orange": "#f28779",
        "accent-purple": "#d4bfff",
        "accent-cyan": "#95e6cb",
        "accent-white": "#cbccc6",
      },
      fontFamily: {
        sans: ["Menlo", "monospace"],
      },
    },
  },
  plugins: [],
}