import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../lib/analytics';

/**
 * Hook to track page views on route changes for SPAs.
 * Should be used at the top level of the app.
 *
 * Uses a double requestAnimationFrame to let react-helmet-async commit the
 * route's <title> update before we read document.title, which gives GA4 the
 * correct page_title without a brittle magic-number setTimeout.
 */
export function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        trackPageView(location.pathname + location.search, document.title);
      });
    });

    return () => {
      cancelAnimationFrame(raf1);
      if (raf2) cancelAnimationFrame(raf2);
    };
  }, [location.pathname, location.search]);
}
