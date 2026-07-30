/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base: 'rgb(var(--color-base) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        'surface-hover': 'rgb(var(--color-surface-hover) / <alpha-value>)',
        edge: 'rgb(var(--color-edge) / <alpha-value>)',
        'edge-hover': 'rgb(var(--color-edge-hover) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        'accent-light': 'rgb(var(--color-accent-light) / <alpha-value>)',
        'accent-dim': 'rgb(var(--color-accent) / 0.12)',
        ink: 'rgb(var(--color-ink) / <alpha-value>)',
        muted: 'rgb(var(--color-muted) / <alpha-value>)',
        faint: 'rgb(var(--color-faint) / <alpha-value>)',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(18px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        blink: {
          '0%, 96%, 100%': { transform: 'scaleY(1)' },
          '98%': { transform: 'scaleY(0.1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.6s ease forwards',
        blink: 'blink 5s ease-in-out infinite',
        float: 'float 4.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
