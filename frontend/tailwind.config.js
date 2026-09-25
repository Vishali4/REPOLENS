/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          main: '#07070A',
          secondary: '#0D0B12',
        },
        card: {
          main: '#111018',
          hover: '#171321',
        },
        purple: {
          primary: '#8B5CF6',
          bright: '#A855F7',
          light: '#C084FC',
          glow: 'rgba(139, 92, 246, 0.25)',
        },
        text: {
          main: '#F5F3FF',
          secondary: '#A1A1AA',
          muted: '#71717A',
        },
        border: {
          subtle: '#27232F',
          glow: 'rgba(168, 85, 247, 0.4)',
        },
        status: {
          success: '#22C55E',
          warning: '#F59E0B',
          error: '#EF4444',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'glow-sm': '0 0 15px rgba(139, 92, 246, 0.2)',
        'glow-md': '0 0 25px rgba(168, 85, 247, 0.3)',
        'glow-lg': '0 0 40px rgba(168, 85, 247, 0.35)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
};
