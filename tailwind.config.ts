import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: 'var(--paper)',
          dark: 'var(--paper-dark)',
          grid: '#e8dcc4',
        },
        ink: {
          DEFAULT: 'var(--ink)',
          light: 'var(--ink-light)',
          faint: 'var(--ink-faint)',
        },
        pencil: {
          blue: 'var(--pencil-blue)',
          red: 'var(--pencil-red)',
        },
        marker: {
          yellow: 'var(--highlight-yellow)',
          red: 'var(--marker-red)',
          pink: '#f48fb1',
          green: '#81c784',
          orange: '#ffb74d',
        },
        crayon: {
          green: '#66bb6a',
          purple: '#9c6ade',
        },
        eraser: '#ccc',
      },
      fontFamily: {
        heading: ['Caveat', 'cursive'],
        body: ['Patrick Hand', 'cursive'],
        accent: ['Indie Flower', 'cursive'],
      },
      animation: {
        'draw': 'draw 1.5s ease-in-out forwards',
        'draw-slow': 'draw 2.5s ease-in-out forwards',
        'wiggle': 'wiggle 0.3s ease-in-out',
        'wobble': 'wobble 2s ease-in-out infinite',
        'float-doodle': 'floatDoodle 6s ease-in-out infinite',
        'scribble-in': 'scribbleIn 0.6s ease-out forwards',
        'bounce-in': 'bounceIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards',
        'pencil-write': 'pencilWrite 0.8s ease-out forwards',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        draw: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-1deg)' },
          '50%': { transform: 'rotate(1deg)' },
        },
        wobble: {
          '0%, 100%': { transform: 'rotate(-0.5deg)' },
          '50%': { transform: 'rotate(0.5deg)' },
        },
        floatDoodle: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '25%': { transform: 'translateY(-15px) rotate(3deg)' },
          '75%': { transform: 'translateY(10px) rotate(-2deg)' },
        },
        scribbleIn: {
          '0%': { opacity: '0', transform: 'scale(0.8) rotate(-3deg)' },
          '100%': { opacity: '1', transform: 'scale(1) rotate(0deg)' },
        },
        bounceIn: {
          '0%': { opacity: '0', transform: 'scale(0.3)' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pencilWrite: {
          '0%': { width: '0%', opacity: '0' },
          '100%': { width: '100%', opacity: '1' },
        },
      },
      borderRadius: {
        'sketchy': '255px 15px 225px 15px / 15px 225px 15px 255px',
      },
    },
  },
  plugins: [],
};
export default config;