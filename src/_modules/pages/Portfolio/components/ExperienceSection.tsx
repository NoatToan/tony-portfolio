import BaseLink from '@/_modules/common/components/BaseLink';
import BaseTechTagList from '@/_modules/common/components/BaseTechTagList';
import Box from '@/_modules/common/components/Box';
import TextPrimary from '@/_modules/common/components/TextPrimary';
import { ESectionId } from '@/_modules/config/enums';
import { SECTION_ORDER } from '@/_modules/config/sectionOrder';
import { t } from '@/_modules/i18next/i18n';
import type { Experience } from '@/_modules/server/content/schemas';

import SectionShell from './SectionShell';

/** Fullstack's signature detail: a pulsing "live" dot on the current role (docs/DECISIONS.md). */
export default function ExperienceSection({
  experience,
  showLiveDot,
}: {
  experience: Experience[];
  showLiveDot: boolean;
}) {
  return (
    <SectionShell
      id={ESectionId.EXPERIENCE}
      title={t('section.experience')}
      index={SECTION_ORDER.indexOf(ESectionId.EXPERIENCE) + 1}
    >
      <Box as="ol" className="space-y-10">
        {experience.map((job) => (
          <Box as="li" key={job.company + job.period} className="grid gap-2 sm:grid-cols-[8.5rem_1fr] sm:gap-6">
            <Box as="p" className="flex items-center gap-2 self-start pt-0.5 font-mono text-xs text-subtle">
              {job.current && showLiveDot && (
                <Box
                  as="span"
                  className="live-dot relative size-1.5 shrink-0 rounded-full bg-good text-good"
                >
                  <TextPrimary as="span" className="sr-only">
                    {t('common.currentRole')}
                  </TextPrimary>
                </Box>
              )}
              {job.period}
            </Box>
            <Box>
              <TextPrimary as="h3" className="font-medium leading-snug">
                {job.title}
                <TextPrimary as="span" className="text-subtle">
                  {' · '}
                </TextPrimary>
                {job.companyUrl ? (
                  <BaseLink href={job.companyUrl} inline>
                    {job.company}
                  </BaseLink>
                ) : (
                  job.company
                )}
              </TextPrimary>
              {job.location && (
                <TextPrimary as="p" className="mt-0.5 text-xs text-subtle">
                  {job.location}
                </TextPrimary>
              )}
              <Box as="ul" className="mt-3 space-y-1.5 text-sm leading-relaxed text-muted">
                {job.highlights.map((highlight) => (
                  <Box as="li" key={highlight} className="relative pl-4">
                    <Box as="span" aria-hidden="true" className="absolute left-0 top-[0.7em] h-px w-2 bg-subtle" />
                    {highlight}
                  </Box>
                ))}
              </Box>
              <Box className="mt-4">
                <BaseTechTagList keys={job.stack} label={t('experience.stack', { company: job.company })} />
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </SectionShell>
  );
}
