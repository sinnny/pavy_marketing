export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

const STORAGE_KEY = 'pavy_utm';

/**
 * Captures UTM parameters from the URL and stores them in sessionStorage.
 * Also cleans the URL by removing the UTM parameters.
 * @param navigate Optional navigate function from react-router-dom to clean URL without full page reload.
 */
export function captureUTMParams(navigate?: (url: string, options: { replace: true }) => void): void {
  if (typeof window === 'undefined') return;

  const urlParams = new URLSearchParams(window.location.search);
  const utm: UTMParams = {};
  let hasUTM = false;

  const utmKeys: (keyof UTMParams)[] = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
  ];

  utmKeys.forEach((key) => {
    const value = urlParams.get(key);
    if (value) {
      utm[key] = value;
      hasUTM = true;
    }
  });

  if (hasUTM) {
    // Store in sessionStorage for the duration of the visit
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(utm));

    // Clean URL
    const newUrl = new URL(window.location.href);
    utmKeys.forEach((key) => newUrl.searchParams.delete(key));
    
    // If the search string is empty after deletion, remove the '?'
    const searchString = newUrl.searchParams.toString();
    const cleanUrl = newUrl.pathname + (searchString ? `?${searchString}` : '') + newUrl.hash;
    
    if (navigate) {
      navigate(cleanUrl, { replace: true });
    } else {
      window.history.replaceState({}, '', cleanUrl);
    }
  }
}

/**
 * Retrieves the captured UTM parameters from sessionStorage.
 */
export function getUTMParams(): UTMParams | null {
  if (typeof window === 'undefined') return null;
  const stored = sessionStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored) as UTMParams;
  } catch (e) {
    return null;
  }
}
