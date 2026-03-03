import type { Config } from 'tailwindcss';
import sharedPreset from '@page-chatbot/tailwind-config/preset';

const config: Config = {
  presets: [sharedPreset],
  content: ['./src/**/*.{ts,tsx}'],
};

export default config;
