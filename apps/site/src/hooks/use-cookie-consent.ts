import { useCallback, useSyncExternalStore } from 'react';

export interface CookieConsent {
  essential: true;
  analytics: boolean;
  marketing: boolean;
  consentedAt: string;
}

const STORAGE_KEY = 'pavy_cookie_consent';
const CONSENT_UPDATE_EVENT = 'pavy:cookie-consent-update';

function writeStoredConsent(next: CookieConsent): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent<CookieConsent>(CONSENT_UPDATE_EVENT, { detail: next }));
  } catch {
    // ignore (quota exceeded, disabled storage, etc.)
  }
}

// Cache the most recent snapshot so useSyncExternalStore can return a stable
// reference when nothing has changed — otherwise React bails out with
// "getSnapshot should be cached" warnings.
let cachedSnapshot: CookieConsent | null = null;
let cachedSerialized: string | null = null;

function getSnapshot(): CookieConsent | null {
  if (typeof window === 'undefined') return null;
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    raw = null;
  }
  if (raw === cachedSerialized) return cachedSnapshot;
  cachedSerialized = raw;
  try {
    cachedSnapshot = raw ? (JSON.parse(raw) as CookieConsent) : null;
  } catch {
    cachedSnapshot = null;
  }
  return cachedSnapshot;
}

function getServerSnapshot(): CookieConsent | null {
  return null;
}

function subscribe(onStoreChange: () => void): () => void {
  const handleSameTab = () => onStoreChange();
  const handleCrossTab = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) onStoreChange();
  };
  window.addEventListener(CONSENT_UPDATE_EVENT, handleSameTab);
  window.addEventListener('storage', handleCrossTab);
  return () => {
    window.removeEventListener(CONSENT_UPDATE_EVENT, handleSameTab);
    window.removeEventListener('storage', handleCrossTab);
  };
}

export function useCookieConsent() {
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const hasConsented = useCallback(() => consent !== null, [consent]);

  const acceptAll = useCallback(() => {
    writeStoredConsent({
      essential: true,
      analytics: true,
      marketing: true,
      consentedAt: new Date().toISOString(),
    });
  }, []);

  const rejectAll = useCallback(() => {
    writeStoredConsent({
      essential: true,
      analytics: false,
      marketing: false,
      consentedAt: new Date().toISOString(),
    });
  }, []);

  const savePreferences = useCallback((preferences: Partial<CookieConsent>) => {
    writeStoredConsent({
      essential: true,
      analytics: preferences.analytics ?? false,
      marketing: preferences.marketing ?? false,
      consentedAt: new Date().toISOString(),
    });
  }, []);

  return {
    consent,
    hasConsented,
    acceptAll,
    rejectAll,
    savePreferences,
  };
}
