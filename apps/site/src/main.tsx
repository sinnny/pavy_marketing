import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { initI18n } from '@page-chatbot/i18n';
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
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
