import { cn } from '../lib/utils.js';

export interface Tab {
  readonly label: string;
  readonly value: string;
  readonly disabled?: boolean;
}

export interface TabsProps {
  readonly tabs: readonly Tab[];
  readonly activeTab: string;
  readonly onChange: (value: string) => void;
  readonly className?: string;
}

export function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
  return (
    <div className={cn('border-b border-gray-200', className)}>
      <nav className="-mb-px flex gap-4" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            role="tab"
            aria-selected={activeTab === tab.value}
            disabled={tab.disabled}
            className={cn(
              'whitespace-nowrap border-b-2 px-1 py-3 text-sm font-medium transition-colors',
              activeTab === tab.value
                ? 'border-brand-600 text-brand-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
              tab.disabled && 'cursor-not-allowed opacity-50',
            )}
            onClick={() => onChange(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
