import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

interface MetricCountUpProps {
  value: string;
  durationMs?: number;
  className?: string;
}

function parseMetric(value: string): { prefix: string; number: number | null; suffix: string } {
  const match = value.match(/^(\D*)([\d.]+)(.*)$/);
  if (!match) return { prefix: value, number: null, suffix: '' };
  const num = Number.parseFloat(match[2]);
  return {
    prefix: match[1] ?? '',
    number: Number.isFinite(num) ? num : null,
    suffix: match[3] ?? '',
  };
}

function formatNumber(n: number, original: number): string {
  const isInteger = Number.isInteger(original);
  return isInteger ? String(Math.round(n)) : n.toFixed(1);
}

export default function MetricCountUp({ value, durationMs = 1200, className }: MetricCountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const shouldReduceMotion = useReducedMotion();
  const { prefix, number, suffix } = parseMetric(value);

  const canAnimate = number !== null && !shouldReduceMotion;
  const [display, setDisplay] = useState<string>(() =>
    canAnimate ? `${prefix}${formatNumber(0, number)}${suffix}` : value,
  );

  useEffect(() => {
    if (!canAnimate || !inView || number === null) return;

    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(`${prefix}${formatNumber(number * eased, number)}${suffix}`);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [canAnimate, inView, number, prefix, suffix, durationMs]);

  return (
    <span ref={ref} className={className} aria-label={value}>
      {display}
    </span>
  );
}
