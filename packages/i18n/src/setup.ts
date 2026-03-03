import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import enCommon from './locales/en/common.json';
import koCommon from './locales/ko/common.json';
import jaCommon from './locales/ja/common.json';
import enSite from './locales/en/site.json';
import koSite from './locales/ko/site.json';
import jaSite from './locales/ja/site.json';

const allResources: Record<string, Record<string, object>> = {
  en: { common: enCommon, site: enSite },
  ko: { common: koCommon, site: koSite },
  ja: { common: jaCommon, site: jaSite },
};

export interface I18nConfig {
  readonly defaultLanguage?: string;
  readonly fallbackLanguage?: string;
  readonly namespaces?: readonly string[];
  readonly defaultNamespace?: string;
}

export function initI18n(config: I18nConfig = {}): typeof i18next {
  const {
    defaultLanguage = 'en',
    fallbackLanguage = 'en',
    namespaces = ['common'],
    defaultNamespace = namespaces[0] ?? 'common',
  } = config;

  const resources: Record<string, Record<string, object>> = {};
  for (const lang of Object.keys(allResources)) {
    resources[lang] = {};
    for (const ns of namespaces) {
      const nsData = allResources[lang]?.[ns];
      if (nsData) {
        resources[lang][ns] = nsData;
      }
    }
  }

  i18next.use(initReactI18next).init({
    resources,
    lng: defaultLanguage,
    fallbackLng: fallbackLanguage,
    defaultNS: defaultNamespace,
    ns: [...namespaces],
    interpolation: {
      escapeValue: false,
    },
  });

  return i18next;
}
