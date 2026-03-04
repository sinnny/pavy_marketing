import * as React from 'react';
import type {
  IconColorStop,
  IconFamily,
  IconThemeAlias,
  IconThemeColors,
  IconThemeVariant,
} from '@pavy/types';
import { ICON_THEMES, resolveIconThemeSelection } from '../lib/icon-themes.js';

export interface AIIconProps extends React.HTMLAttributes<HTMLDivElement> {
  family?: IconFamily;
  variant?: IconThemeVariant;
  alias?: IconThemeAlias;
  glass?: boolean;
  customColors?: Partial<IconThemeColors>;
}

function isGradient(value?: string | IconColorStop[]): value is IconColorStop[] {
  return Array.isArray(value);
}

function mergeColors(
  baseColors: IconThemeColors,
  customColors?: Partial<IconThemeColors>,
): IconThemeColors {
  if (!customColors) return baseColors;
  return { ...baseColors, ...customColors };
}

function getGradientStops(
  value: string | IconColorStop[] | undefined,
  fallback: IconColorStop[],
): IconColorStop[] {
  if (isGradient(value) && value.length > 0) return value;
  if (typeof value === 'string') {
    return [
      { offset: '0%', color: value },
      { offset: '100%', color: value },
    ];
  }
  return fallback;
}

function getSolidColor(value: string | IconColorStop[] | undefined, fallback: string): string {
  if (typeof value === 'string') return value;
  if (isGradient(value) && value[0]?.color) return value[0].color;
  return fallback;
}

function gradientFill(id: string) {
  return `url(#${id})`;
}

export const AIIcon = React.forwardRef<HTMLDivElement, AIIconProps>(
  (
    {
      family,
      variant,
      alias,
      glass = true,
      customColors,
      className = '',
      ...props
    },
    ref,
  ) => {
    const id = React.useId().replace(/:/g, '');
    const selection = resolveIconThemeSelection({ alias, family, variant });
    const resolvedFamily = selection.family;
    const resolvedVariant = selection.variant;

    const baseTheme = ICON_THEMES[resolvedFamily][resolvedVariant];
    const colors = mergeColors(baseTheme.colors, customColors);

    const gid = (base: string) => `${base}-${id}`;

    const styles = `
      .fab-${id} {
        width: 64px; height: 64px;
        border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        position: relative;
        cursor: pointer;
        background: rgba(255,255,255,0.15);
        backdrop-filter: blur(24px) saturate(180%) brightness(1.08);
        -webkit-backdrop-filter: blur(24px) saturate(180%) brightness(1.08);
        border: 1px solid rgba(255,255,255,0.4);
        box-shadow:
          inset 0 1px 2px rgba(255,255,255,0.8),
          inset 0 -1px 2px rgba(0,0,0,0.02),
          0 4px 12px rgba(0,0,0,0.08),
          0 8px 32px rgba(0,0,0,0.06);
        transition: transform 0.22s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.22s ease;
      }
      .dark .fab-${id} {
        background: rgba(255,255,255,0.10);
        border: 1px solid rgba(255,255,255,0.48);
        box-shadow:
          inset 0 1px 0 rgba(255,255,255,0.75),
          inset 0 -1px 0 rgba(0,0,0,0.06),
          0 4px 20px rgba(0,0,0,0.40),
          0 1px 4px rgba(0,0,0,0.20);
      }
      
      .fab-${id}::before {
        content: '';
        position: absolute;
        top: 2px; left: 17%; right: 17%; height: 34%;
        border-radius: 50%;
        background: linear-gradient(180deg, rgba(255,255,255,0.5) 0%, transparent 100%);
        pointer-events: none;
      }
      .dark .fab-${id}::before {
        background: linear-gradient(180deg, rgba(255,255,255,0.62) 0%, transparent 100%);
      }

      .fab-${id}::after {
        content: '';
        position: absolute;
        bottom: -11px; left: 50%;
        transform: translateX(-50%);
        width: 34px; height: 8px;
        background: radial-gradient(ellipse, rgba(0,0,0,0.1) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
      }
      .dark .fab-${id}::after {
        background: radial-gradient(ellipse, rgba(0,0,0,0.35) 0%, transparent 70%);
      }

      .fab-${id}:hover { 
        transform: translateY(-3px) scale(1.06); 
        box-shadow:
          inset 0 1px 2px rgba(255,255,255,0.9),
          inset 0 -1px 2px rgba(0,0,0,0.02),
          0 6px 16px rgba(0,0,0,0.1),
          0 12px 36px rgba(0,0,0,0.08);
      }
      .dark .fab-${id}:hover {
        box-shadow:
          inset 0 1px 0 rgba(255,255,255,0.75),
          inset 0 -1px 0 rgba(0,0,0,0.06),
          0 4px 20px rgba(0,0,0,0.40),
          0 1px 4px rgba(0,0,0,0.20);
      }
      .fab-${id}:active { transform: scale(0.96); }

      .star-${id} { animation: star-spin-${id} 8s ease-in-out infinite; }
      @keyframes star-spin-${id} {
        0%,100% { transform: rotate(0deg) scale(1); }
        25% { transform: rotate(45deg) scale(1.08); }
        50% { transform: rotate(90deg) scale(1); }
        75% { transform: rotate(135deg) scale(1.08); }
      }

      .wbar-${id} { width: 2.8px; border-radius: 10px; animation: wv-${id} 1.4s ease-in-out infinite; }
      @keyframes wv-${id} {
        0%,100% { height: 5px; opacity: 0.55; }
        50% { height: 20px; opacity: 1; }
      }

      .orbit-spin-${id} { transform-origin: 14px 14px; animation: ospin-${id} 5s linear infinite; }
      .orbit-spin-rev-${id} { transform-origin: 14px 14px; animation: ospin-${id} 3.5s linear infinite reverse; }
      @keyframes ospin-${id} { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

      .pulse-ring-${id} { animation: pring-${id} 2.2s ease-out infinite; transform-origin: center; }
      .pulse-ring2-${id} { animation: pring-${id} 2.2s ease-out 0.7s infinite; transform-origin: center; }
      @keyframes pring-${id} {
        0% { transform: scale(0.5); opacity: 0.9; }
        100% { transform: scale(1.6); opacity: 0; }
      }
    `;

    const renderStar = () => {
      const starPath =
        'M14 0.5C14 0.5 12 12 0.5 14C0.5 14 12 16 14 27.5C14 27.5 16 16 27.5 14C27.5 14 16 12 14 0.5Z';
      const primary = getGradientStops(colors.primary, [
        { offset: '0%', color: '#60a5fa' },
        { offset: '100%', color: '#a78bfa' },
      ]);
      const gradientId = gid('star-primary');

      return (
        <div className={`star-${id}`}>
          <svg width="30" height="30" viewBox="0 0 28 28" fill="none">
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
                {primary.map((stop, index) => (
                  <stop key={`${stop.offset}-${index}`} offset={stop.offset} stopColor={stop.color} />
                ))}
              </linearGradient>
            </defs>
            <path d={starPath} fill={gradientFill(gradientId)} />
          </svg>
        </div>
      );
    };

    const renderWave = () => {
      const primary = getGradientStops(colors.primary, [
        { offset: '0%', color: '#93c5fd' },
        { offset: '100%', color: '#3b82f6' },
      ]);
      const secondary = getGradientStops(colors.secondary, [
        { offset: '0%', color: '#c4b5fd' },
        { offset: '100%', color: '#8b5cf6' },
      ]);
      const tertiary = getGradientStops(colors.tertiary, [
        { offset: '0%', color: '#a5b4fc' },
        { offset: '100%', color: '#6366f1' },
      ]);

      const toCssGradient = (stops: IconColorStop[]) =>
        `linear-gradient(180deg, ${stops.map((s) => `${s.color}`).join(',')})`;

      if (resolvedVariant === 'premium') {
        const topColors = isGradient(colors.primary) ? colors.primary : [];
        const bottomColors = isGradient(colors.secondary) ? colors.secondary : [];
        const fallbackTop = ['#f87171', '#facc15', '#60a5fa', '#c084fc', '#f472b6'];
        const fallbackBottom = ['#fb923c', '#4ade80', '#818cf8', '#e879f9', '#fb7185'];

        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            {[0, 1, 2, 3, 4].map((index) => (
              <div
                key={index}
                className={`wbar-${id}`}
                style={{
                  animationDelay:
                    index === 2 ? '0.28s' : index === 1 || index === 3 ? '0.14s' : '0.00s',
                  background: `linear-gradient(180deg, ${topColors[index]?.color ?? fallbackTop[index]
                    }, ${bottomColors[index]?.color ?? fallbackBottom[index]})`,
                }}
              />
            ))}
          </div>
        );
      }

      const leftRight = primary;
      const inner = tertiary;
      const center = secondary;

      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
          <div className={`wbar-${id}`} style={{ animationDelay: '0.00s', background: toCssGradient(leftRight) }} />
          <div className={`wbar-${id}`} style={{ animationDelay: '0.14s', background: toCssGradient(inner) }} />
          <div className={`wbar-${id}`} style={{ animationDelay: '0.28s', background: toCssGradient(center) }} />
          <div className={`wbar-${id}`} style={{ animationDelay: '0.14s', background: toCssGradient(inner) }} />
          <div className={`wbar-${id}`} style={{ animationDelay: '0.00s', background: toCssGradient(leftRight) }} />
        </div>
      );
    };

    const renderOrbit = () => {
      if (resolvedVariant === 'standard') {
        const primary = getGradientStops(colors.primary, [
          { offset: '0%', color: '#60a5fa' },
          { offset: '100%', color: '#a78bfa' },
        ]);
        const dotColor = getSolidColor(colors.secondary, '#93c5fd');
        const gradientId = gid('orbit-standard');

        return (
          <svg
            width="32"
            height="32"
            viewBox="0 0 28 28"
            fill="none"
            style={{ position: 'relative', zIndex: 2, overflow: 'visible' }}
          >
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
                {primary.map((stop, index) => (
                  <stop key={`${stop.offset}-${index}`} offset={stop.offset} stopColor={stop.color} />
                ))}
              </linearGradient>
            </defs>
            <circle
              cx="14"
              cy="14"
              r="11.5"
              stroke={gradientFill(gradientId)}
              strokeWidth="1.6"
              strokeDasharray="48 24"
              strokeLinecap="round"
            />
            <g className={`orbit-spin-${id}`}>
              <circle cx="14" cy="2.5" r="2.5" fill={dotColor} />
            </g>
            <circle cx="14" cy="14" r="3" fill={gradientFill(gradientId)} />
          </svg>
        );
      }

      if (resolvedVariant === 'fresh') {
        const primary = getGradientStops(colors.primary, [
          { offset: '0%', color: '#2dd4bf' },
          { offset: '100%', color: '#818cf8' },
        ]);
        const arc2 = getGradientStops(colors.secondary ?? colors.primary, [
          { offset: '0%', color: '#818cf8' },
          { offset: '100%', color: '#2dd4bf' },
        ]);
        const g1 = gid('orbit-fresh-1');
        const g2 = gid('orbit-fresh-2');

        return (
          <svg
            width="32"
            height="32"
            viewBox="0 0 28 28"
            fill="none"
            style={{ position: 'relative', zIndex: 2, overflow: 'visible' }}
          >
            <defs>
              <linearGradient id={g1} x1="0" y1="0" x2="1" y2="1">
                {primary.map((stop, index) => (
                  <stop key={`${stop.offset}-${index}`} offset={stop.offset} stopColor={stop.color} />
                ))}
              </linearGradient>
              <linearGradient id={g2} x1="1" y1="0" x2="0" y2="1">
                {arc2.map((stop, index) => (
                  <stop key={`${stop.offset}-${index}`} offset={stop.offset} stopColor={stop.color} />
                ))}
              </linearGradient>
            </defs>
            <g className={`orbit-spin-${id}`}>
              <circle
                cx="14"
                cy="14"
                r="11"
                stroke={gradientFill(g1)}
                strokeWidth="1.5"
                strokeDasharray="40 30"
                strokeLinecap="round"
              />
            </g>
            <g className={`orbit-spin-rev-${id}`}>
              <circle
                cx="14"
                cy="14"
                r="7"
                stroke={gradientFill(g2)}
                strokeWidth="1.3"
                strokeDasharray="24 20"
                strokeLinecap="round"
              />
            </g>
            <circle cx="14" cy="14" r="2.8" fill={gradientFill(g1)} />
          </svg>
        );
      }

      const primary = getGradientStops(colors.primary, [
        { offset: '0%', color: '#c084fc' },
        { offset: '100%', color: '#818cf8' },
      ]);
      const gradientId = gid(`orbit-${resolvedVariant}`);

      return (
        <svg
          width="32"
          height="32"
          viewBox="0 0 28 28"
          fill="none"
          style={{ position: 'relative', zIndex: 2, overflow: 'visible' }}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
              {primary.map((stop, index) => (
                <stop key={`${stop.offset}-${index}`} offset={stop.offset} stopColor={stop.color} />
              ))}
            </linearGradient>
          </defs>
          <circle cx="14" cy="14" r="4" fill={gradientFill(gradientId)} />
          <circle
            cx="14"
            cy="14"
            r="9"
            stroke={gradientFill(gradientId)}
            strokeWidth="1.2"
            className={`pulse-ring-${id}`}
          />
          <circle
            cx="14"
            cy="14"
            r="9"
            stroke={gradientFill(gradientId)}
            strokeWidth="1.2"
            className={`pulse-ring2-${id}`}
          />
        </svg>
      );
    };

    const renderIcon = () => {
      if (resolvedFamily === 'star') return renderStar();
      if (resolvedFamily === 'wave') return renderWave();
      return renderOrbit();
    };

    return (
      <div ref={ref} className={className} {...props}>
        <style dangerouslySetInnerHTML={{ __html: styles }} />
        {glass ? <div className={`fab-${id}`}>{renderIcon()}</div> : renderIcon()}
      </div>
    );
  },
);

AIIcon.displayName = 'AIIcon';
