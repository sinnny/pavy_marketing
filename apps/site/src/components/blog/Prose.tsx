import type { ReactNode } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ProseProps {
  children: ReactNode;
  className?: string;
}

export function Prose({ children, className }: ProseProps) {
  return (
    <div
      className={cn(
        'prose prose-lg prose-indigo dark:prose-invert max-w-3xl mx-auto',
        // Customizations
        'prose-headings:font-heading prose-headings:font-bold',
        'prose-a:text-brand-primary prose-a:no-underline hover:prose-a:underline',
        'prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-800',
        'prose-img:rounded-2xl prose-img:shadow-xl',
        className
      )}
    >
      {children}
    </div>
  );
}
