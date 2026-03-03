export type IconFamily = 'star' | 'wave' | 'orbit';
export type IconThemeVariant = 'standard' | 'warm' | 'fresh' | 'premium';
export type IconThemeAlias =
  | 'blue-violet'
  | 'coral-rose'
  | 'teal-blue-purple'
  | 'gold'
  | 'rainbow'
  | 'blue-indigo'
  | 'teal-cyan'
  | 'gold-fire'
  | 'blue-orbit'
  | 'violet-pulse'
  | 'teal-indigo'
  | 'pink-coral';

export interface IconColorStop {
  readonly offset: string;
  readonly color: string;
}

export interface IconThemeColors {
  readonly primary: string | IconColorStop[];
  readonly secondary?: string | IconColorStop[];
  readonly tertiary?: string | IconColorStop[];
  readonly background?: string;
  readonly border?: string;
}

export interface IconTheme {
  readonly id: string;
  readonly name: string;
  readonly family: IconFamily;
  readonly colors: IconThemeColors;
  readonly animationSpeed?: number;
}

export type IconThemeGroup = {
  readonly [key in IconThemeVariant]: IconTheme;
};

export type WidgetIconThemeConfig =
  | {
      readonly alias: IconThemeAlias;
      readonly customColors?: Partial<IconThemeColors>;
    }
  | {
      readonly family: IconFamily;
      readonly variant: IconThemeVariant;
      readonly customColors?: Partial<IconThemeColors>;
    };
