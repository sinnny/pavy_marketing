import type { Config } from 'tailwindcss';
import sharedPreset from '@pavy/tailwind-config/preset';

const config: Config = {
  presets: [sharedPreset],
  content: ['./src/**/*.{ts,tsx}'],
};

export default config;
