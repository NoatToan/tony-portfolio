import BaseLink from '@/_modules/common/components/BaseLink';
import BaseMonogram from '@/_modules/common/components/BaseMonogram';
import BaseTechIcon from '@/_modules/common/components/BaseTechIcon';
import Box from '@/_modules/common/components/Box';
import Col from '@/_modules/common/components/Col';
import Row from '@/_modules/common/components/Row';
import TextPrimary from '@/_modules/common/components/TextPrimary';
import { ESectionId } from '@/_modules/config/enums';
import { SECTION_ORDER } from '@/_modules/config/sectionOrder';
import { TECH_REGISTRY } from '@/_modules/config/techRegistry';
import { formatYearMonth } from '@/_modules/common/utils/utilsFormat';
import { joinWith } from '@/_modules/common/utils/utilsString';
import { t } from '@/_modules/i18next/i18n';
import type { Certification, Education } from '@/_modules/server/content/schemas';

import SectionShell from './SectionShell';

function CertificationRow({ certification }: { certification: Certification }) {
  const hasIcon = certification.issuer && TECH_REGISTRY[certification.issuer].icon;

  return (
    <Box as="li" className="flex gap-4">
      {hasIcon && certification.issuer ? (
        <Row className="mt-0.5 size-9 shrink-0 items-center justify-center rounded-lg border border-border">
          <BaseTechIcon techKey={certification.issuer} className="size-5" />
        </Row>
      ) : (
        <BaseMonogram label={certification.issuerName} className="mt-0.5 size-9 shrink-0" />
      )}
      <Box className="min-w-0 flex-1">
        <TextPrimary as="h3" className="text-sm font-medium">
          {certification.name}
        </TextPrimary>
        <TextPrimary as="p" className="mt-0.5 font-mono text-2xs text-subtle">
          {joinWith(
            '·',
            certification.issuerName,
            formatYearMonth(certification.issuedDate),
            certification.expiresDate ? t('certifications.expires', { date: formatYearMonth(certification.expiresDate) }) : '',
            certification.credentialId ? t('certifications.credentialId', { id: certification.credentialId }) : '',
          )}
        </TextPrimary>
        {certification.credentialUrl && (
          <Box className="mt-1.5">
            <BaseLink href={certification.credentialUrl} inline>
              {t('certifications.verify')}
              <TextPrimary as="span" className="sr-only">
                {` ${t('certifications.verifyFor', { name: certification.name })}`}
              </TextPrimary>
            </BaseLink>
          </Box>
        )}
      </Box>
    </Box>
  );
}

function EducationRow({ education }: { education: Education }) {
  return (
    <Box as="li">
      <TextPrimary as="h3" className="text-sm font-medium">
        {education.degree}
      </TextPrimary>
      <TextPrimary as="p" className="mt-0.5 font-mono text-2xs text-subtle">
        {joinWith('·', education.school, education.period, education.location)}
      </TextPrimary>
    </Box>
  );
}

export default function CertificationsSection({
  certifications,
  education,
}: {
  certifications: Certification[];
  education: Education[];
}) {
  return (
    <SectionShell
      id={ESectionId.CERTIFICATIONS}
      title={t('section.certifications')}
      index={SECTION_ORDER.indexOf(ESectionId.CERTIFICATIONS) + 1}
    >
      <Col className="gap-10">
        <Box as="ul" className="grid gap-6 sm:grid-cols-2">
          {certifications.map((certification) => (
            <CertificationRow key={certification.name} certification={certification} />
          ))}
        </Box>
        <Box>
          <TextPrimary as="p" className="mb-4 font-mono text-xs text-subtle">
            {t('certifications.education')}
          </TextPrimary>
          <Box as="ul" className="space-y-4">
            {education.map((item) => (
              <EducationRow key={item.school + item.degree} education={item} />
            ))}
          </Box>
        </Box>
      </Col>
    </SectionShell>
  );
}
