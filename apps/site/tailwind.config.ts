import type { Config } from 'tailwindcss';
import sharedPreset from '@page-chatbot/tailwind-config';

export default {
    darkMode: ['class', '[data-theme="dark"]'],
    content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
    presets: [sharedPreset],
    theme: {
        extend: {
            colors: {
                brand: {
                    primary: '#6366f1', // Indigo 500
                    secondary: '#818cf8', // Indigo 400
                    text: '#0f172a', // Slate 900
                },
                surface: {
                    DEFAULT: '#ffffff',
                    hover: '#f8fafc', // Slate 50
                    border: '#e2e8f0' // Slate 200
                },
                glass: {
                    surface: 'rgba(255, 255, 255, 0.7)',
                    border: 'rgba(255, 255, 255, 0.3)',
                },
            },
            backdropBlur: {
                xs: '2px',
                xl: '20px', // Super smooth blur for 2026 feel
            },
            boxShadow: {
                glass: '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
                'glass-sm': '0 4px 16px 0 rgba(0, 0, 0, 0.2)',
            },
            animation: {
                'spin-y-slow': 'spin-y 12s linear infinite',
                'fade-in': 'fadeIn 0.5s ease-out forwards',
                'slide-up-fade': 'slide-up-fade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            },
            keyframes: {
                'spin-y': {
                    '0%': { transform: 'rotateY(0deg)' },
                    '100%': { transform: 'rotateY(360deg)' },
                },
                'slide-up-fade': {
                    '0%': { opacity: '0', transform: 'translateY(40px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
            },
        },
    },
} satisfies Config;
