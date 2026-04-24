/**
 * Analytics utility for GA4 integration with Google Consent Mode v2 support.
 */
import { getUTMParams } from './utm';

type GtagArgs =
  | ['js', Date]
  | ['config', string, Record<string, unknown>?]
  | ['event', string, Record<string, unknown>?]
  | ['consent', 'default' | 'update', Record<string, unknown>];

type Gtag = (...args: GtagArgs) => void;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: Gtag;
  }
}

/**
 * Initializes GA4 with the given measurement ID.
 * Sets default consent to 'denied' for Consent Mode v2 compliance.
 * Safe to call multiple times — only the first call takes effect.
 */
export function initGA4(measurementId: string): void {
  if (!measurementId || typeof window === 'undefined') return;
  if (typeof window.gtag === 'function') return; // already initialized

  window.dataLayer = window.dataLayer || [];
  const gtag: Gtag = (...args) => {
    window.dataLayer.push(args);
  };
  window.gtag = gtag;

  // Set default consent mode: denied (Consent Mode v2)
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    wait_for_update: 500,
  });

  // Load gtag.js script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  gtag('js', new Date());
  gtag('config', measurementId, {
    send_page_view: false, // Handle page views manually for SPA
  });
}

/**
 * Updates consent state when user accepts analytics cookies.
 */
export function grantAnalyticsConsent(): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('consent', 'update', {
    analytics_storage: 'granted',
  });
}

/**
 * Tracks a page view event. Safe to call regardless of consent state —
 * Consent Mode v2 suppresses data until analytics_storage is granted.
 */
export function trackPageView(path: string, title?: string): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  const utmParams = getUTMParams() ?? {};
  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: title ?? document.title,
    ...utmParams,
  });
}

/**
 * Tracks a custom event. No-ops when gtag is not initialized
 * (e.g., missing measurement ID).
 */
export function trackEvent(name: string, params?: Record<string, unknown>): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  const utmParams = getUTMParams() ?? {};
  window.gtag('event', name, { ...params, ...utmParams });
}
