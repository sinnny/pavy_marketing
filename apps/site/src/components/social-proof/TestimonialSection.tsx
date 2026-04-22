import { useTranslation } from '@pavy/i18n';
import { TESTIMONIALS } from '../../lib/customer-data';
import TestimonialCard from './TestimonialCard';

export default function TestimonialSection() {
  const { t } = useTranslation('site');

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 font-heading">
            {t('socialProof.sectionHeading.title')}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {t('socialProof.sectionHeading.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, idx) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
