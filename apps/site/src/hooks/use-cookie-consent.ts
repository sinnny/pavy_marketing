import { useState, useEffect, useCallback } from 'react';

export interface CookieConsent {
  essential: true;
  analytics: boolean;
  marketing: boolean;
  consentedAt: string;
}

const STORAGE_KEY = 'pavy_cookie_consent';

export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsent | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setConsent(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse cookie consent', e);
      }
    }
  }, []);

  const hasConsented = useCallback(() => {
    return consent !== null;
  }, [consent]);

  const acceptAll = useCallback(() => {
    const newConsent: CookieConsent = {
      essential: true,
      analytics: true,
      marketing: true,
      consentedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newConsent));
    setConsent(newConsent);
  }, []);

  const rejectAll = useCallback(() => {
    const newConsent: CookieConsent = {
      essential: true,
      analytics: false,
      marketing: false,
      consentedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newConsent));
    setConsent(newConsent);
  }, []);

  const savePreferences = useCallback((preferences: Partial<CookieConsent>) => {
    const newConsent: CookieConsent = {
      essential: true,
      analytics: preferences.analytics ?? false,
      marketing: preferences.marketing ?? false,
      consentedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newConsent));
    setConsent(newConsent);
  }, []);

  return {
    consent,
    hasConsented,
    acceptAll,
    rejectAll,
    savePreferences,
  };
}
