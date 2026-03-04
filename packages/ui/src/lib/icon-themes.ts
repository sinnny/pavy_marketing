import type {
  IconFamily,
  IconTheme,
  IconThemeAlias,
  IconThemeGroup,
  IconThemeVariant,
} from '@pavy/types';

export const STAR_THEMES: IconThemeGroup = {
  standard: {
    id: 'star-standard',
    name: 'Blue Violet',
    family: 'star',
    colors: {
      primary: [
        { offset: '0%', color: '#60a5fa' },
        { offset: '100%', color: '#a78bfa' },
      ],
    },
  },
  warm: {
    id: 'star-warm',
    name: 'Coral Rose',
    family: 'star',
    colors: {
      primary: [
        { offset: '0%', color: '#fb923c' },
        { offset: '100%', color: '#f43f5e' },
      ],
    },
  },
  fresh: {
    id: 'star-fresh',
    name: 'Teal Blue Purple',
    family: 'star',
    colors: {
      primary: [
        { offset: '0%', color: '#34d399' },
        { offset: '50%', color: '#60a5fa' },
        { offset: '100%', color: '#c084fc' },
      ],
    },
  },
  premium: {
    id: 'star-premium',
    name: 'Gold Premium',
    family: 'star',
    colors: {
      primary: [
        { offset: '0%', color: '#fde68a' },
        { offset: '100%', color: '#f59e0b' },
      ],
    },
  },
};

export const WAVE_THEMES: IconThemeGroup = {
  standard: {
    id: 'wave-standard',
    name: 'Blue Indigo',
    family: 'wave',
    colors: {
      primary: [
        { offset: '0%', color: '#93c5fd' },
        { offset: '100%', color: '#3b82f6' },
      ],
      secondary: [
        { offset: '0%', color: '#c4b5fd' },
        { offset: '100%', color: '#8b5cf6' },
      ],
      tertiary: [
        { offset: '0%', color: '#a5b4fc' },
        { offset: '100%', color: '#6366f1' },
      ],
    },
  },
  warm: {
    id: 'wave-warm',
    name: 'Gold Fire',
    family: 'wave',
    colors: {
      primary: [
        { offset: '0%', color: '#fde68a' },
        { offset: '100%', color: '#f59e0b' },
      ],
      secondary: [
        { offset: '0%', color: '#fca5a5' },
        { offset: '100%', color: '#ef4444' },
      ],
      tertiary: [
        { offset: '0%', color: '#fdba74' },
        { offset: '100%', color: '#f97316' },
      ],
    },
  },
  fresh: {
    id: 'wave-fresh',
    name: 'Teal Cyan',
    family: 'wave',
    colors: {
      primary: [
        { offset: '0%', color: '#6ee7b7' },
        { offset: '100%', color: '#10b981' },
      ],
      secondary: [
        { offset: '0%', color: '#5eead4' },
        { offset: '100%', color: '#14b8a6' },
      ],
      tertiary: [
        { offset: '0%', color: '#67e8f9' },
        { offset: '100%', color: '#06b6d4' },
      ],
    },
  },
  premium: {
    id: 'wave-premium',
    name: 'Rainbow',
    family: 'wave',
    colors: {
      primary: [
        { offset: '0', color: '#f87171' },
        { offset: '1', color: '#facc15' },
        { offset: '2', color: '#60a5fa' },
        { offset: '3', color: '#c084fc' },
        { offset: '4', color: '#f472b6' },
      ],
      secondary: [
        { offset: '0', color: '#fb923c' },
        { offset: '1', color: '#4ade80' },
        { offset: '2', color: '#818cf8' },
        { offset: '3', color: '#e879f9' },
        { offset: '4', color: '#fb7185' },
      ],
    },
  },
};

export const ORBIT_THEMES: IconThemeGroup = {
  standard: {
    id: 'orbit-standard',
    name: 'Blue Orbit',
    family: 'orbit',
    colors: {
      primary: [
        { offset: '0%', color: '#60a5fa' },
        { offset: '100%', color: '#a78bfa' },
      ],
      secondary: '#93c5fd',
    },
  },
  warm: {
    id: 'orbit-warm',
    name: 'Pink Coral Pulse',
    family: 'orbit',
    colors: {
      primary: [
        { offset: '0%', color: '#f472b6' },
        { offset: '100%', color: '#fb923c' },
      ],
    },
  },
  fresh: {
    id: 'orbit-fresh',
    name: 'Teal Indigo',
    family: 'orbit',
    colors: {
      primary: [
        { offset: '0%', color: '#2dd4bf' },
        { offset: '100%', color: '#818cf8' },
      ],
    },
  },
  premium: {
    id: 'orbit-premium',
    name: 'Violet Pulse',
    family: 'orbit',
    colors: {
      primary: [
        { offset: '0%', color: '#c084fc' },
        { offset: '100%', color: '#818cf8' },
      ],
    },
  },
};

export const ICON_THEMES = {
  star: STAR_THEMES,
  wave: WAVE_THEMES,
  orbit: ORBIT_THEMES,
} as const;

export const ICON_THEME_ALIASES: Record<
  IconThemeAlias,
  { family: IconFamily; variant: IconThemeVariant }
> = {
  'blue-violet': { family: 'star', variant: 'standard' },
  'coral-rose': { family: 'star', variant: 'warm' },
  'teal-blue-purple': { family: 'star', variant: 'fresh' },
  gold: { family: 'star', variant: 'premium' },
  rainbow: { family: 'wave', variant: 'premium' },
  'blue-indigo': { family: 'wave', variant: 'standard' },
  'teal-cyan': { family: 'wave', variant: 'fresh' },
  'gold-fire': { family: 'wave', variant: 'warm' },
  'blue-orbit': { family: 'orbit', variant: 'standard' },
  'violet-pulse': { family: 'orbit', variant: 'premium' },
  'teal-indigo': { family: 'orbit', variant: 'fresh' },
  'pink-coral': { family: 'orbit', variant: 'warm' },
};

export const DEFAULT_ICON_THEME_ALIAS: IconThemeAlias = 'blue-indigo';

export function resolveIconThemeSelection(input?: {
  alias?: IconThemeAlias;
  family?: IconFamily;
  variant?: IconThemeVariant;
}) {
  if (input?.alias) {
    return ICON_THEME_ALIASES[input.alias];
  }

  return {
    family: input?.family ?? 'wave',
    variant: input?.variant ?? 'standard',
  } satisfies { family: IconFamily; variant: IconThemeVariant };
}
