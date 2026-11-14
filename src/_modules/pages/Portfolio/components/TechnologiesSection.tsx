import BaseTechIcon from '@/_modules/common/components/BaseTechIcon';
import Box from '@/_modules/common/components/Box';
import Col from '@/_modules/common/components/Col';
import TextPrimary from '@/_modules/common/components/TextPrimary';
import { ESectionId } from '@/_modules/config/enums';
import { SECTION_ORDER } from '@/_modules/config/sectionOrder';
import { TECH_REGISTRY } from '@/_modules/config/techRegistry';
import { t } from '@/_modules/i18next/i18n';
import type { TechCategoryGroup } from '@/_modules/server/content/schemas';

import SectionShell from './SectionShell';

/**
 * Official icon grid grouped by category (docs/DECISIONS.md "Stack icon section"). Monochrome by
 * default, brand colour on hover; icons are inline SVG from `simple-icons`/`devicon`, rendered
 * entirely in this Server Component — zero client JS.
 */
export default function TechnologiesSection({ technologies }: { technologies: TechCategoryGroup[] }) {
  return (
    <SectionShell
      id={ESectionId.TECHNOLOGIES}
      title={t('section.technologies')}
      index={SECTION_ORDER.indexOf(ESectionId.TECHNOLOGIES) + 1}
    >
      <Col className="gap-8">
        {technologies.map((group) => (
          <Col key={group.category} className="gap-3">
            <TextPrimary as="p" className="font-mono text-xs text-subtle">
              {t(`stackCategory.${group.category}`)}
            </TextPrimary>
            <Box
              as="ul"
              aria-label={t(`stackCategory.${group.category}`)}
              className="grid grid-cols-[repeat(auto-fill,minmax(5.5rem,1fr))] gap-3"
            >
              {group.keys.map((key) => (
                <Box as="li" key={key}>
                  <Col className="group items-center gap-2 rounded-xl border border-border bg-card px-2 py-4 text-center transition-[border-color] duration-200 ease-out hover:border-accent/40">
                    <BaseTechIcon techKey={key} className="size-7" />
                    <TextPrimary as="span" className="text-2xs leading-tight text-muted">
                      {TECH_REGISTRY[key].name}
                    </TextPrimary>
                  </Col>
                </Box>
              ))}
            </Box>
          </Col>
        ))}
      </Col>
    </SectionShell>
  );
}
