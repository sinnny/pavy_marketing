type ClassValue = string | number | boolean | undefined | null | ClassValue[];

export function cn(...inputs: ClassValue[]): string {
  const result: string[] = [];
  for (const input of inputs) {
    if (Array.isArray(input)) {
      const nested = cn(...input);
      if (nested) result.push(nested);
    } else if (typeof input === 'string') {
      const trimmed = input.trim();
      if (trimmed) result.push(trimmed);
    } else if (typeof input === 'number') {
      result.push(String(input));
    }
  }
  return result.join(' ');
}
