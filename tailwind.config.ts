import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Sans KR"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        display: ['"Playfair Display"', 'serif'],
      },
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        card: 'var(--card)',
        'card-hover': 'var(--card-hover)',
        border: 'var(--border)',
        text: 'var(--text)',
        'text-dim': 'var(--text-dim)',
        'text-muted': 'var(--text-muted)',
        accent: 'var(--accent)',
        accent2: 'var(--accent2)',
        accent3: 'var(--accent3)',
      },
      borderRadius: {
        DEFAULT: '12px',
        lg: '20px',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          from: { opacity: '0', transform: 'translateY(-8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp .5s ease forwards',
        slideDown: 'slideDown .3s ease',
      },
    },
  },
  plugins: [],
};

export default config;
