import React, { useState } from 'react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  priority?: boolean;
  /**
   * Optional explicit WebP source. For local Vite-imported assets you must
   * import the `.webp` sibling yourself and pass it here — Vite hashes
   * filenames at build time so we can't derive the WebP URL at runtime.
   */
  webpSrc?: string;
  /** Tiny base64 LQIP shown as a background while the image loads. */
  placeholder?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  priority = false,
  webpSrc,
  placeholder,
  className,
  style,
  width,
  height,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const isExternal = src.startsWith('http') || src.startsWith('//');

  // For external URLs (e.g. Unsplash) we can request WebP via a query param.
  // For local assets, callers pass an explicit webpSrc (see prop docs).
  const resolvedWebp = webpSrc
    ?? (isExternal
      ? (src.includes('auto=format') || src.includes('fm=')
          ? src
          : `${src}${src.includes('?') ? '&' : '?'}fm=webp`)
      : undefined);

  const fadeInClass = priority
    ? 'opacity-100'
    : `transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`;

  const placeholderStyle: React.CSSProperties | undefined =
    placeholder && !isLoaded
      ? {
          backgroundImage: `url(${placeholder})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(12px)',
        }
      : undefined;

  return (
    <picture>
      {resolvedWebp && <source srcSet={resolvedWebp} type="image/webp" />}
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={() => setIsLoaded(true)}
        className={`${className ?? ''} ${fadeInClass}`.trim()}
        style={{ ...placeholderStyle, ...style }}
        width={width}
        height={height}
        {...props}
      />
    </picture>
  );
};

export default OptimizedImage;
