import { useEffect } from 'react';
import { Outlet, useParams, useNavigate, useLocation } from 'react-router-dom';
import { i18next } from '@pavy/i18n';
import { isSupportedLanguage, detectLanguage } from '../hooks/useLocale';

export default function LocaleWrapper() {
  const { lang } = useParams<{ lang: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!lang || !isSupportedLanguage(lang)) {
      const detected = detectLanguage();
      const rest = location.pathname.replace(`/${lang}`, '') || '';
      navigate(`/${detected}${rest}${location.search}${location.hash}`, { replace: true });
      return;
    }

    if (i18next.language !== lang) {
      i18next.changeLanguage(lang);
    }
    localStorage.setItem('Pavy.ai-lang', lang);
    document.documentElement.lang = lang;
  }, [lang, navigate, location]);

  if (!lang || !isSupportedLanguage(lang)) return null;

  return <Outlet />;
}
