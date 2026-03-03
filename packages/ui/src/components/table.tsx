import type { HTMLAttributes, ReactNode, TdHTMLAttributes, ThHTMLAttributes } from 'react';
import { cn } from '../lib/utils.js';

export function Table({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLTableElement> & { readonly children: ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className={cn('w-full text-left text-sm', className)} {...props}>
        {children}
      </table>
    </div>
  );
}

export function TableHeader({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLTableSectionElement> & { readonly children: ReactNode }) {
  return (
    <thead className={cn('border-b border-gray-200 bg-gray-50', className)} {...props}>
      {children}
    </thead>
  );
}

export function TableBody({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLTableSectionElement> & { readonly children: ReactNode }) {
  return (
    <tbody className={cn('divide-y divide-gray-100', className)} {...props}>
      {children}
    </tbody>
  );
}

export function TableRow({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLTableRowElement> & { readonly children: ReactNode }) {
  return (
    <tr className={cn('hover:bg-gray-50', className)} {...props}>
      {children}
    </tr>
  );
}

export function TableHead({
  className,
  children,
  ...props
}: ThHTMLAttributes<HTMLTableCellElement> & { readonly children: ReactNode }) {
  return (
    <th className={cn('px-4 py-3 font-medium text-gray-600', className)} {...props}>
      {children}
    </th>
  );
}

export function TableCell({
  className,
  children,
  ...props
}: TdHTMLAttributes<HTMLTableCellElement> & { readonly children: ReactNode }) {
  return (
    <td className={cn('px-4 py-3', className)} {...props}>
      {children}
    </td>
  );
}
