import { useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '../lib/utils.js';
import { useClickOutside } from '../hooks/use-click-outside.js';

export interface DropdownItem {
  readonly label: string;
  readonly value: string;
  readonly disabled?: boolean;
}

export interface DropdownProps {
  readonly trigger: ReactNode;
  readonly items: readonly DropdownItem[];
  readonly onSelect: (value: string) => void;
  readonly className?: string;
  readonly align?: 'left' | 'right';
}

export function Dropdown({ trigger, items, onSelect, className, align = 'left' }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setIsOpen(false));

  return (
    <div ref={ref} className={cn('relative inline-block', className)}>
      <div onClick={() => setIsOpen((prev) => !prev)}>{trigger}</div>
      {isOpen ? (
        <div
          className={cn(
            'absolute z-50 mt-1 min-w-[160px] rounded-md border border-gray-200 bg-white py-1 shadow-lg',
            align === 'right' ? 'right-0' : 'left-0',
          )}
        >
          {items.map((item) => (
            <button
              key={item.value}
              className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={item.disabled}
              onClick={() => {
                onSelect(item.value);
                setIsOpen(false);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
