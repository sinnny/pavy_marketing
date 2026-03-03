export type IconFamily = 'star' | 'wave' | 'orbit';
export type IconThemeVariant = 'standard' | 'warm' | 'fresh' | 'premium';
export interface IconColorStop {
    readonly offset: string;
    readonly color: string;
}
export interface IconThemeColors {
    readonly primary: string | IconColorStop[];
    readonly secondary?: string | IconColorStop[];
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
export interface WidgetIconThemeConfig {
    readonly family: IconFamily;
    readonly variant: IconThemeVariant;
    readonly customColors?: Partial<IconThemeColors>;
}
//# sourceMappingURL=icon-theme.d.ts.map