import React from 'react';

export interface PavyLogoProps {
  variant?: 'icon' | 'horizontal' | 'vertical' | 'wordmark';
  size?: 'sm' | 'md' | 'lg' | number;
  theme?: 'light' | 'dark';
  className?: string;
}

const ICON_SIZES: Record<string, number> = { sm: 28, md: 36, lg: 44 };

const CHUBBY_WORDMARK: React.CSSProperties = {
  fontFamily: "'Inter', sans-serif",
  fontWeight: 800,
  letterSpacing: '-0.06em',
  lineHeight: 1,
};

const REFINED_WORDMARK: React.CSSProperties = {
  fontFamily: "'Inter', sans-serif",
  fontWeight: 600, // Thinner weight
  letterSpacing: '-0.04em',
  lineHeight: 1,
};

function PavyMark({ size, theme }: { size: number; theme: string }) {
  const isDark = theme === 'dark';
  const mainColor = isDark ? '#F5F5F7' : '#1D1D1F';
  const gradientId = `sparkle-gradient-${theme}`;
  const accentColor = '#6366f1'; // Signature Indigo

  return (
    <svg viewBox="0 0 100 120" width={size * (100 / 120)} height={size} fill="none" aria-hidden="true">
      <rect x="10" y="20" width="22" height="100" rx="11" fill={mainColor} />
      <circle cx="45" cy="55" r="24" stroke={mainColor} strokeWidth="22" />
      <defs>
        <linearGradient id={gradientId} x1="75" y1="5" x2="99" y2="29" gradientUnits="userSpaceOnUse">
          <stop stopColor="#A5B4FC" />
          <stop offset="1" stopColor={accentColor} />
        </linearGradient>
      </defs>
      <circle cx="87" cy="17" r="12" fill={`url(#${gradientId})`} />
    </svg>
  );
}

export function PavyLogo({
  variant = 'horizontal',
  size = 'md',
  theme = 'light',
  className,
}: PavyLogoProps) {
  const px = typeof size === 'number' ? size : ICON_SIZES[size];
  const isDark = theme === 'dark';
  const color = isDark ? '#F5F5F7' : '#1D1D1F';
  const accentColor = '#6366f1';

  if (variant === 'wordmark' || variant === 'horizontal') {
    return (
      <span className={className} style={{ ...CHUBBY_WORDMARK, fontSize: px * 0.85, color }}>
        Pavy<span style={{ color: accentColor }}>.ai</span>
      </span>
    );
  }

  if (variant === 'icon') {
    return (
      <span className={className} style={{ display: 'inline-flex', alignItems: 'center' }}>
        <PavyMark size={px} theme={theme} />
      </span>
    );
  }

  if (variant === 'vertical') {
    return (
      <span
        className={className}
        style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: px * 0.15 }}
      >
        <PavyMark size={px} theme={theme} />
        <span style={{ ...REFINED_WORDMARK, fontSize: px * 0.45, color }}>
          pavy<span style={{ color: accentColor }}>.ai</span>
        </span>
      </span>
    );
  }

  // Combined variant (side-by-side)
  return (
    <span
      className={className}
      style={{ display: 'inline-flex', alignItems: 'center', gap: px * 0.25 }}
    >
      <PavyMark size={px} theme={theme} />
      <span style={{ ...REFINED_WORDMARK, fontSize: px * 0.7, color }}>
        Pavy<span style={{ color: accentColor }}>.ai</span>
      </span>
    </span>
  );
}
