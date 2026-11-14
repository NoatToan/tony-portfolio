import Box from '@/_modules/common/components/Box';
import TextPrimary from '@/_modules/common/components/TextPrimary';
import { ESectionId } from '@/_modules/config/enums';
import { SECTION_ORDER } from '@/_modules/config/sectionOrder';
import { t } from '@/_modules/i18next/i18n';
import type { TechGroup } from '@/_modules/server/content/schemas';

import SectionShell from './SectionShell';

/** Personal capabilities, grouped with a "what I did" line per item (docs/DECISIONS.md "Tech Stack"). */
export default function TechStackSection({ techStack }: { techStack: TechGroup[] }) {
  return (
    <SectionShell
      id={ESectionId.STACK}
      title={t('section.stack')}
      index={SECTION_ORDER.indexOf(ESectionId.STACK) + 1}
    >
      <Box as="dl" className="space-y-8">
        {techStack.map((group) => (
          <Box key={group.label} className="grid gap-3 sm:grid-cols-[8.5rem_1fr] sm:gap-6">
            <Box as="dt" className="font-mono text-xs text-subtle sm:pt-0.5">
              {group.label}
            </Box>
            <Box as="dd">
              <Box as="ul" className="space-y-3">
                {group.items.map((item) => (
                  <Box as="li" key={item.name}>
                    <TextPrimary as="p" className="text-sm font-medium">
                      {item.name}
                    </TextPrimary>
                    <TextPrimary as="p" className="mt-0.5 text-sm leading-relaxed text-muted text-pretty">
                      {item.detail}
                    </TextPrimary>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </SectionShell>
  );
}
