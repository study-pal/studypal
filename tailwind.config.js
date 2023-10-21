/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#FCF8F4',
        accent: '#EC744A',
        dark: '#1A1A1A',
        primary: '#2A6049',
      }
    },
  },
  plugins: [],
}
