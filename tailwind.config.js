/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        display: ['Space Grotesk', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        background: 'hsl(220 13% 6%)',
        foreground: 'hsl(210 40% 98%)',
        card: 'hsl(216 10% 10%)',
        'card-foreground': 'hsl(210 40% 98%)',
        popover: 'hsl(224 71% 4%)',
        'popover-foreground': 'hsl(210 40% 98%)',
        primary: {
          DEFAULT: '#f97316', // Orange from logo
          foreground: 'hsl(0 0% 100%)',
        },
        secondary: {
          DEFAULT: '#051212ff', // Teal from logo
          foreground: 'hsl(220 13% 6%)',
        },
        muted: {
          DEFAULT: 'hsl(215, 20%, 18%)',
          foreground: 'hsl(215.4 16.3% 56.9%)',
        },
        accent: {
          DEFAULT: '#f97316',
          foreground: 'hsl(0 0% 100%)',
        },
        border: 'hsl(215, 18%, 20%)',
        input: 'hsl(215, 18%, 20%)',
        ring: '#f97316',
      },
      borderRadius: {
        lg: `0.75rem`,
        md: `calc(0.75rem - 2px)`,
        sm: `calc(0.75rem - 4px)`,
      },
      boxShadow: {
        'glow': '0 0 20px 0px hsl(28 96% 51% / 0.25)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
