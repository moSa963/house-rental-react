/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      textColor:{
        "primary": 'var(--color-text-primary)',
        "secondary": 'var(--color-text-secondary)',
        "invert": 'var(--color-text-invert)'
      },
      borderColor:{
        'primary': 'var(--color-border-primary)',
        'invert': 'var(--color-border-invert)',
      },
      colors:{
        'primary': 'var(--color-background-primary)',
        'secondary': 'var(--color-background-primary)',
        'level1': 'var(--color-background-level1)',
        "level2": 'var(--color-background-level2)',
        "level3":'var(--color-background-level3)',
        "error": 'var(--color-error)',
      }
    },
  },
  plugins: [],
}