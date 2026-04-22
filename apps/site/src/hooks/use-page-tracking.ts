import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../lib/analytics';

/**
 * Hook to track page views on route changes for SPAs.
 * Should be used at the top level of the app.
 */
export function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    // We delay the trackPageView slightly to allow react-helmet-async 
    // to update the document title first.
    const timer = setTimeout(() => {
      trackPageView(location.pathname + location.search, document.title);
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname, location.search]);
}
