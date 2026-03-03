import { useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { i18next } from '@page-chatbot/i18n';

const SUPPORTED_LANGUAGES = ['en', 'ko', 'ja'] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export function isSupportedLanguage(lang: string): lang is SupportedLanguage {
  return SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage);
}

export function detectLanguage(): SupportedLanguage {
  const stored = localStorage.getItem('Pavy.ai-lang');
  if (stored && isSupportedLanguage(stored)) return stored;

  const browserLang = navigator.language.split('-')[0];
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
