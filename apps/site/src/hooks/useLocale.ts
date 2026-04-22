import { useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { i18next } from '@pavy/i18n';

const SUPPORTED_LANGUAGES = ['en', 'ko', 'ja'] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export function isSupportedLanguage(lang: string): lang is SupportedLanguage {
  return SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage);
}

/**
 * Read a supported language code from the URL path (e.g. `/en/...` → `'en'`),
 * or `null` if the first path segment isn't a supported code. The URL is the
 * source of truth for the current language, so this must be consulted
 * *before* stored preferences — otherwise visiting `/en` while localStorage
 * holds `ko` renders the first frame in Korean.
 */
export function languageFromPath(pathname: string): SupportedLanguage | null {
  const first = pathname.split('/').filter(Boolean)[0];
  return first && isSupportedLanguage(first) ? first : null;
}

export function detectLanguage(): SupportedLanguage {
  if (typeof window !== 'undefined') {
    const fromUrl = languageFromPath(window.location.pathname);
    if (fromUrl) return fromUrl;
  }

  const stored =
    typeof localStorage !== 'undefined'
      ? localStorage.getItem('Pavy.ai-lang')
      : null;
  if (stored && isSupportedLanguage(stored)) return stored;

  const browserLang =
    typeof navigator !== 'undefined' ? navigator.language.split('-')[0] : undefined;
  if (browserLang && isSupportedLanguage(browserLang)) return browserLang;

  return 'ko';
}

export function useLocale() {
  const { lang } = useParams<{ lang: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const currentLanguage: SupportedLanguage =
    lang && isSupportedLanguage(lang) ? lang : 'ko';

  const changeLanguage = useCallback(
    (newLang: SupportedLanguage) => {
      const pathWithoutLang = location.pathname.replace(`/${currentLanguage}`, '') || '/';
      const search = location.search;
      const hash = location.hash;
      i18next.changeLanguage(newLang);
      localStorage.setItem('Pavy.ai-lang', newLang);
      document.documentElement.lang = newLang;
      navigate(`/${newLang}${pathWithoutLang === '/' ? '' : pathWithoutLang}${search}${hash}`);
    },
    [currentLanguage, location, navigate],
  );

  const localePath = useCallback(
    (path: string) => {
      const cleanPath = path.startsWith('/') ? path : `/${path}`;
      return `/${currentLanguage}${cleanPath === '/' ? '' : cleanPath}`;
    },
    [currentLanguage],
  );

  return { currentLanguage, changeLanguage, localePath, supportedLanguages: SUPPORTED_LANGUAGES } as const;
}
