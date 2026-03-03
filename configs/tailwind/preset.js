/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc8fb',
          400: '#36acf7',
          500: '#0c93e8',
          600: '#0074c6',
          700: '#015da1',
          800: '#064f85',
          900: '#0b426e',
          950: '#072a49',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans KR', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Outfit', 'Noto Sans KR', 'sans-serif'],
      },
      spacing: {
        18: '4.5rem',
        88: '22rem',
        128: '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'star-spin': 'star-spin 8s ease-in-out infinite',
        'wv': 'wv 1.4s ease-in-out infinite',
        'ospin': 'ospin 5s linear infinite',
        'pring': 'pring 2.2s ease-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'star-spin': {
          '0%, 100%': { transform: 'rotate(0deg) scale(1)' },
          '25%': { transform: 'rotate(45deg) scale(1.08)' },
          '50%': { transform: 'rotate(90deg) scale(1)' },
          '75%': { transform: 'rotate(135deg) scale(1.08)' },
        },
        wv: {
          '0%, 100%': { height: '5px', opacity: '0.55' },
          '50%': { height: '20px', opacity: '1' },
        },
        ospin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        pring: {
          '0%': { transform: 'scale(0.5)', opacity: '0.9' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
      },
    },
  },
};
