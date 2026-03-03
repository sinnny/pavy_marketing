import type { ReactNode } from 'react';
import { cn } from '../lib/utils.js';

export interface SidebarItem {
  readonly label: string;
  readonly value: string;
  readonly icon?: ReactNode;
}

export interface SidebarProps {
  readonly items: readonly SidebarItem[];
  readonly activeItem: string;
  readonly onSelect: (value: string) => void;
  readonly header?: ReactNode;
  readonly footer?: ReactNode;
  readonly className?: string;
}

export function Sidebar({ items, activeItem, onSelect, header, footer, className }: SidebarProps) {
  return (
    <aside
      className={cn('flex h-full w-64 flex-col border-r border-gray-200 bg-white', className)}
    >
      {header ? <div className="border-b border-gray-200 p-4">{header}</div> : null}
      <nav className="flex-1 overflow-y-auto p-2">
        {items.map((item) => (
          <button
            key={item.value}
            className={cn(
              'flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
              activeItem === item.value
                ? 'bg-brand-50 text-brand-700'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
            )}
            onClick={() => onSelect(item.value)}
          >
            {item.icon ? <span className="h-5 w-5 flex-shrink-0">{item.icon}</span> : null}
            {item.label}
          </button>
        ))}
      </nav>
      {footer ? <div className="border-t border-gray-200 p-4">{footer}</div> : null}
    </aside>
  );
}
