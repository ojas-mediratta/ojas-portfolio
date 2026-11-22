/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        panel: "var(--color-panel)",
        border: "var(--color-border)",
        text: "var(--color-text)",
        subtext: "var(--color-subtext)",
        "accent-blue": "var(--color-accent-blue)",
        "accent-green": "var(--color-accent-green)",
        "accent-yellow": "var(--color-accent-yellow)",
        "accent-red": "var(--color-accent-red)",
        "accent-purple": "var(--color-accent-purple)",
        "accent-cyan": "var(--color-accent-cyan)",
        "accent-white": "var(--color-text)",
      },
      fontFamily: {
        sans: ["Menlo", "monospace"],
      },
      screens: {
        '3xl': '1920px',
        '4xl': '2560px',
      },
    },
  },
  plugins: [],
}
