export interface SiteHeroCopy {
  badge: string;
  title1: string;
  title2: string;
  description: string;
}

export function getSiteHeroCopy(t: (key: string) => string): SiteHeroCopy {
  return {
    badge: t('hero.badge'),
    title1: t('hero.headline1'),
    title2: t('hero.headline2'),
    description: t('hero.subheading'),
  };
}
