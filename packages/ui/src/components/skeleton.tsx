import { cn } from '../lib/utils.js';

export interface SkeletonProps {
  readonly className?: string;
  readonly variant?: 'text' | 'circular' | 'rectangular';
  readonly width?: string | number;
  readonly height?: string | number;
}

export function Skeleton({ className, variant = 'text', width, height }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse bg-gray-200',
        variant === 'text' && 'h-4 rounded',
        variant === 'circular' && 'rounded-full',
        variant === 'rectangular' && 'rounded-md',
        className,
      )}
      style={{ width, height }}
    />
  );
}
