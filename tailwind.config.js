/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'deep-purple': '#1E1E2F',
        'purple': {
          300: '#B794F4',
          400: '#9F7AEA',
          500: '#805AD5',
          600: '#622f70',
          700: '#622f70',
          800: '#44337A',
          900: '#322659',
        }
      },
      animation: {
        'fadeIn': 'fadeIn 0.3s ease-in-out',
        'pulse': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin': 'spin 10s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.scrollbar-thin': {
          'scrollbar-width': 'thin',
          '&::-webkit-scrollbar': {
            width: '6px',
          },
        },
        '.scrollbar-thumb-purple-600': {
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#622f70',
            borderRadius: '3px',
          },
        },
        '.scrollbar-track-purple-900': {
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#322659',
            borderRadius: '3px',
          },
        },
      });
    },
  ],
};