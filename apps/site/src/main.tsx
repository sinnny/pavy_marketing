import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { initI18n } from '@pavy/i18n';
import { detectLanguage } from './hooks/useLocale';
import './index.css';
import App from './App';

const detectedLang = detectLanguage();

initI18n({
  defaultLanguage: detectedLang,
  fallbackLanguage: 'en',
  namespaces: ['common', 'site'],
  defaultNamespace: 'site',
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
);
