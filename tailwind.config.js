/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
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
