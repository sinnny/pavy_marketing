import { motion } from 'framer-motion';
import { useTranslation } from '@pavy/i18n';
import { Star } from 'lucide-react';
import { Testimonial } from '../../lib/customer-data';

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

export default function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
  const { t } = useTranslation('site');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full"
    >
      <div className="flex mb-4">
        {[...Array(testimonial.rating || 5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
        ))}
      </div>
      
      <blockquote className="text-lg text-slate-700 italic mb-8 flex-grow">
        "{t(testimonial.quoteKey)}"
      </blockquote>
      
      <div className="flex items-center">
        <img
          src={testimonial.avatarUrl}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full mr-4 bg-slate-100"
        />
        <div>
          <div className="font-bold text-slate-900">{testimonial.name}</div>
          <div className="text-sm text-slate-500">
            {testimonial.title}, {testimonial.company}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
