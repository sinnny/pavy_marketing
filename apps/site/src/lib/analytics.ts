/**
 * Analytics utility for GA4 integration with Google Consent Mode v2 support.
 */
import { getUTMParams } from './utm';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

/**
 * Initializes GA4 with the given measurement ID.
 * Sets default consent to 'denied' for Consent Mode v2 compliance.
 */
export function initGA4(measurementId: string): void {
  if (!measurementId || typeof window === 'undefined') return;

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };

  // Set default consent mode: denied (Consent Mode v2)
  window.gtag('consent', 'default', {
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

  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    send_page_view: false, // Handle page views manually for SPA
  });
}

/**
 * Updates consent state when user accepts analytics cookies.
 */
export function grantAnalyticsConsent(): void {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      analytics_storage: 'granted',
    });
  }
}

/**
 * Tracks a page view event.
 */
export function trackPageView(path: string, title?: string): void {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    const utmParams = getUTMParams();
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title || document.title,
      ...utmParams,
    });
  }
}

/**
 * Tracks a custom event.
 */
export function trackEvent(name: string, params?: Record<string, unknown>): void {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    const utmParams = getUTMParams();
    const eventParams = utmParams ? { ...params, ...utmParams } : params;
    window.gtag('event', name, eventParams);
  }
}
