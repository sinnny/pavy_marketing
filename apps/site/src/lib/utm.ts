export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

const STORAGE_KEY = 'pavy_utm';

const UTM_KEYS: (keyof UTMParams)[] = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
];

type NavigateFn = (url: string, options: { replace?: boolean }) => void;

/**
 * Captures UTM parameters from the URL and stores them in sessionStorage
 * using first-touch attribution (existing values are never overwritten for
 * the duration of the session). Always strips UTM params from the URL so
 * the address bar is clean regardless of storage state.
 *
 * @param navigate Optional react-router navigate to clean the URL in-app;
 *                 falls back to `history.replaceState()` when omitted.
 */
export function captureUTMParams(navigate?: NavigateFn): void {
  if (typeof window === 'undefined') return;

  const urlParams = new URLSearchParams(window.location.search);
  const utm: UTMParams = {};
  let hasUTM = false;

  UTM_KEYS.forEach((key) => {
    const value = urlParams.get(key);
    if (value) {
      utm[key] = value;
      hasUTM = true;
    }
  });

  if (!hasUTM) return;

  // First-touch attribution: only write if no UTM is already stored for this session.
  if (!readStoredUTM()) {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(utm));
    } catch {
      // sessionStorage may be unavailable (private mode, quota, disabled storage).
    }
  }

  // Always clean the URL so campaign params don't leak into share/back-nav state.
  const newUrl = new URL(window.location.href);
  UTM_KEYS.forEach((key) => newUrl.searchParams.delete(key));

  const searchString = newUrl.searchParams.toString();
  const cleanUrl = newUrl.pathname + (searchString ? `?${searchString}` : '') + newUrl.hash;

  if (navigate) {
    navigate(cleanUrl, { replace: true });
  } else {
    window.history.replaceState({}, '', cleanUrl);
  }
}

/**
 * Retrieves the captured UTM parameters from sessionStorage.
 */
export function getUTMParams(): UTMParams | null {
  if (typeof window === 'undefined') return null;
  return readStoredUTM();
}

function readStoredUTM(): UTMParams | null {
  let stored: string | null = null;
  try {
    stored = sessionStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
  if (!stored) return null;
  try {
    return JSON.parse(stored) as UTMParams;
  } catch {
    // Clear corrupt entry so subsequent reads don't keep failing.
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // best-effort cleanup
    }
    return null;
  }
}
