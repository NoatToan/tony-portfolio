import type { ReactNode } from 'react';

import SectionRail, { type SectionRailItem } from '@/_modules/common/components/SectionRail';
import SiteHeader from '@/_modules/common/components/SiteHeader';
import { SECTION_ORDER } from '@/_modules/config/sectionOrder';
import { t } from '@/_modules/i18next/i18n';

const RAIL_ITEMS: readonly SectionRailItem[] = SECTION_ORDER.map((id) => ({
  id,
  label: t(`rail.${id}`),
}));

export default function VariantsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <SectionRail
        items={RAIL_ITEMS}
        labels={{
          sectionsNav: t('common.sectionsNav'),
          jumpToSection: t('common.jumpToSection'),
          pageRead: t('common.pageRead'),
        }}
      />
      {children}
    </>
  );
}
