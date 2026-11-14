import { EVariant } from '@/_modules/config/enums';

export const routeLinks = {
  home: '/',
  benchmark: '/benchmark',
  variant: (variant: EVariant) => `/${variant}`,
  hash: (id: string) => `#${id}`,
} as const;
