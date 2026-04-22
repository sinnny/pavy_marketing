import React from 'react';
import { useTranslation } from '@pavy/i18n';
import LegalPageLayout from '../../components/legal/LegalPageLayout';
import { SEOHead } from '../../components/SEOHead';

export default function PrivacyPolicy() {
  const { t } = useTranslation('site');
  
  const sections = [
    'collection',
    'usage',
    'sharing',
    'security',
    'gdpr',
    'cookies',
    'contact'
  ];

  return (
    <>
      <SEOHead
        title={t('seo.privacy.title')}
        description={t('seo.privacy.description')}
        path="/legal/privacy"
      />
      <LegalPageLayout 
        title={t('pages.legal.privacy.title')} 
        effectiveDate={t('pages.legal.privacy.effectiveDate')}
      >
        <p>
          {t('pages.legal.privacy.intro')}
        </p>

        {sections.map((section) => (
          <React.Fragment key={section}>
            <h2 id={section}>{t(`pages.legal.privacy.sections.${section}.title`)}</h2>
            <p>{t(`pages.legal.privacy.sections.${section}.content`)}</p>
            {t(`pages.legal.privacy.sections.${section}.items`, { returnObjects: true }) instanceof Array && (
              <ul>
                {(t(`pages.legal.privacy.sections.${section}.items`, { returnObjects: true }) as string[]).map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            )}
            {section === 'contact' && (
              <p>
                {t('pages.legal.privacy.sections.contact.email')}
              </p>
            )}
          </React.Fragment>
        ))}
      </LegalPageLayout>
    </>
  );
}
