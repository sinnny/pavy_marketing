import React from 'react';
import { useTranslation } from '@pavy/i18n';
import LegalPageLayout from '../../components/legal/LegalPageLayout';
import { SEOHead } from '../../components/SEOHead';

export default function TermsOfService() {
  const { t } = useTranslation('site');

  const sections = [
    'description',
    'accounts',
    'payment',
    'usage',
    'ip',
    'liability',
    'termination',
    'law',
    'changes',
    'contact'
  ];

  return (
    <>
      <SEOHead
        title={t('seo.terms.title')}
        description={t('seo.terms.description')}
        path="/legal/terms"
      />
      <LegalPageLayout 
        title={t('pages.legal.terms.title')} 
        effectiveDate={t('pages.legal.terms.effectiveDate')}
      >
        <p>
          {t('pages.legal.terms.intro')}
        </p>

        {sections.map((section) => (
          <React.Fragment key={section}>
            <h2 id={section}>{t(`pages.legal.terms.sections.${section}.title`)}</h2>
            <p>{t(`pages.legal.terms.sections.${section}.content`)}</p>
            {t(`pages.legal.terms.sections.${section}.items`, { returnObjects: true }) instanceof Array && (
              <ul>
                {(t(`pages.legal.terms.sections.${section}.items`, { returnObjects: true }) as string[]).map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            )}
            {section === 'contact' && (
              <p>
                {t('pages.legal.terms.sections.contact.email')}
              </p>
            )}
          </React.Fragment>
        ))}
      </LegalPageLayout>
    </>
  );
}
