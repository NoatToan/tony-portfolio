import BaseIcon from '@/_modules/common/components/BaseIcon';
import Box from '@/_modules/common/components/Box';
import Row from '@/_modules/common/components/Row';
import TextPrimary from '@/_modules/common/components/TextPrimary';
import { EDomainIcon, ESectionId } from '@/_modules/config/enums';
import { DOMAIN_ICON_PATHS } from '@/_modules/config/domainIcons';
import { SECTION_ORDER } from '@/_modules/config/sectionOrder';
import { t } from '@/_modules/i18next/i18n';
import type { Domain } from '@/_modules/server/content/schemas';

import SectionShell from './SectionShell';

export default function DomainsSection({ domains }: { domains: Domain[] }) {
  return (
    <SectionShell
      id={ESectionId.DOMAINS}
      title={t('section.domains')}
      index={SECTION_ORDER.indexOf(ESectionId.DOMAINS) + 1}
    >
      <Box as="ul" className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
        {domains.map((domain) => (
          <Box as="li" key={domain.name} className="flex gap-3">
            <Row className="mt-0.5 size-7 shrink-0 items-center justify-center rounded-md border border-border text-muted">
              <BaseIcon path={DOMAIN_ICON_PATHS[domain.icon ?? EDomainIcon.MORE]} strokeWidth={1.6} />
            </Row>
            <Box>
              <TextPrimary as="h3" className="text-sm font-medium">
                {domain.name}
              </TextPrimary>
              <TextPrimary as="p" className="mt-1 text-sm leading-relaxed text-muted text-pretty">
                {domain.description}
              </TextPrimary>
              {domain.tags && domain.tags.length > 0 && (
                <TextPrimary as="p" className="mt-1.5 font-mono text-2xs text-subtle">
                  {domain.tags.join(' · ')}
                </TextPrimary>
              )}
            </Box>
          </Box>
        ))}
      </Box>
    </SectionShell>
  );
}
