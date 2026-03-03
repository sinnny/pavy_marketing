import type { WidgetIconThemeConfig } from './icon-theme.js';
export interface WidgetConfig {
    readonly id: string;
    readonly chatbotId: string;
    readonly theme: WidgetTheme;
    readonly position: WidgetPosition;
    readonly behavior: WidgetBehavior;
    readonly branding: WidgetBranding;
    readonly createdAt: string;
    readonly updatedAt: string;
}
export interface WidgetTheme {
    readonly primaryColor: string;
    readonly backgroundColor: string;
    readonly textColor: string;
    readonly fontFamily?: string;
    readonly borderRadius: number;
    readonly glassmorphism: boolean;
    readonly darkMode: boolean;
    readonly iconTheme?: WidgetIconThemeConfig;
}
export interface WidgetPosition {
    readonly placement: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
    readonly offsetX: number;
    readonly offsetY: number;
}
export interface WidgetBehavior {
    readonly autoOpen: boolean;
    readonly autoOpenDelay: number;
    readonly showOnMobile: boolean;
    readonly greeting: string;
    readonly placeholder: string;
    readonly soundEnabled: boolean;
}
export interface WidgetBranding {
    readonly logoUrl?: string;
    readonly botName: string;
    readonly botAvatarUrl?: string;
    readonly poweredBy: boolean;
}
export interface WidgetInitConfig {
    readonly chatbotId: string;
    readonly tenantId: string;
    readonly apiBaseUrl?: string;
    readonly theme?: Partial<WidgetTheme>;
    readonly position?: Partial<WidgetPosition>;
    readonly behavior?: Partial<WidgetBehavior>;
    readonly branding?: Partial<WidgetBranding>;
    readonly productContext?: ProductContext;
    readonly onEvent?: (event: WidgetEvent) => void;
}
export interface ProductContext {
    readonly productId?: string;
    readonly productName?: string;
    readonly productUrl?: string;
    readonly productImageUrl?: string;
    readonly productPrice?: number;
    readonly productCategory?: string;
}
export interface WidgetEvent {
    readonly type: WidgetEventType;
    readonly payload?: Record<string, unknown>;
    readonly timestamp: string;
}
export type WidgetEventType = 'widget:open' | 'widget:close' | 'message:sent' | 'message:received' | 'product:clicked' | 'link:clicked';
//# sourceMappingURL=widget-config.d.ts.map