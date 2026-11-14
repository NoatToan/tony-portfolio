import Col from '@/_modules/common/components/Col';
import TextPrimary from '@/_modules/common/components/TextPrimary';
import { ESectionId } from '@/_modules/config/enums';
import { SECTION_ORDER } from '@/_modules/config/sectionOrder';
import { t } from '@/_modules/i18next/i18n';

import SectionShell from './SectionShell';

export default function AboutSection({ summary }: { summary: string[] }) {
  return (
    <SectionShell id={ESectionId.ABOUT} title={t('section.about')} index={SECTION_ORDER.indexOf(ESectionId.ABOUT) + 1}>
      <Col className="gap-4 leading-relaxed text-muted text-pretty">
        {summary.map((paragraph) => (
          <TextPrimary key={paragraph} as="p">
            {paragraph}
          </TextPrimary>
        ))}
      </Col>
    </SectionShell>
  );
}
