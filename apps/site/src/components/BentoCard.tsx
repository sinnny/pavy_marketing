import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type BentoVariant = 'default' | 'primary' | 'dark';

interface BentoCardProps {
  className?: string;
  variant?: BentoVariant;
  children: ReactNode;
  /** Disable padding when the card hosts an edge-to-edge image. */
  bare?: boolean;
}

const VARIANT_CLASSES: Record<BentoVariant, string> = {
  default: 'bg-white border border-slate-200',
  primary: 'bg-brand-primary text-white shadow-lg shadow-indigo-500/20',
  dark: 'bg-slate-900 text-white',
};

/**
 * Wrapper for cards in a Bento grid. Handles motion-on-scroll, rounded corners,
 * and color variants. Layout (col-span / row-span) is supplied via `className`.
 */
export default function BentoCard({
  className,
  variant = 'default',
  children,
  bare = false,
}: BentoCardProps) {
  const variantClass = VARIANT_CLASSES[variant];
  const padding = bare ? '' : 'p-9 lg:p-11';

  return (
    <motion.div
      className={`group relative rounded-3xl overflow-hidden ${variantClass} ${padding} ${className ?? ''}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
