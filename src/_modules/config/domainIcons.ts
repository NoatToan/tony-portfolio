import { EDomainIcon } from '@/_modules/config/enums';

/** Hand-drawn glyph paths (stroke icons) for the Domains section. */
export const DOMAIN_ICON_PATHS: Record<EDomainIcon, string> = {
  [EDomainIcon.ERP]: 'M4 20V10l8-6 8 6v10M9 20v-6h6v6',
  [EDomainIcon.ECOMMERCE]: 'M5 7h14l-1.5 9h-11zM9 7a3 3 0 0 1 6 0M9 20h.01M15 20h.01',
  [EDomainIcon.CRM]:
    'M16 19v-1a4 4 0 0 0-8 0v1M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6M20 19v-1a3 3 0 0 0-2-2.8M4 19v-1a3 3 0 0 1 2-2.8',
  [EDomainIcon.AUTOMATION]: 'M4 12h4l2-5 4 10 2-5h4',
  [EDomainIcon.AI]: 'M12 3v3M12 18v3M3 12h3M18 12h3M7 7h10v10H7zM10 10h4v4h-4z',
  [EDomainIcon.MORE]: 'M6 12h.01M12 12h.01M18 12h.01',
};
