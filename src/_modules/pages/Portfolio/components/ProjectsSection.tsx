import Link from 'next/link';

import BaseImage from '@/_modules/common/components/BaseImage';
import BaseLink from '@/_modules/common/components/BaseLink';
import BaseTechTagList from '@/_modules/common/components/BaseTechTagList';
import Box from '@/_modules/common/components/Box';
import Row from '@/_modules/common/components/Row';
import TextPrimary from '@/_modules/common/components/TextPrimary';
import { EImageKind, ESectionId } from '@/_modules/config/enums';
import { SECTION_ORDER } from '@/_modules/config/sectionOrder';
import { t } from '@/_modules/i18next/i18n';
import type { Project } from '@/_modules/server/content/schemas';

import SectionShell from './SectionShell';

/** Thumbnails open the full-size screenshot in a new tab — zero-JS, no modal infra needed. */
function ProjectImage({ image, name }: { image: NonNullable<Project['image']>; name: string }) {
  const openLabel = t('projects.openImage', { name });
  if (image.kind === EImageKind.PHONE) {
    return (
      <Box className="w-24 shrink-0 transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:-rotate-3 motion-reduce:transform-none sm:w-28">
        <Box className="rounded-[1.25rem] bg-fg p-1 shadow-sm">
          <Link href={image.src} target="_blank" rel="noopener noreferrer" prefetch={false} aria-label={openLabel} className="block">
            <BaseImage
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="112px"
              fallbackLabel={t('common.imageUnavailable')}
              className="aspect-[9/19.5] h-auto w-full rounded-[1rem] bg-bg"
            />
          </Link>
        </Box>
      </Box>
    );
  }
  return (
    <Link href={image.src} target="_blank" rel="noopener noreferrer" prefetch={false} aria-label={openLabel} className="block">
      <BaseImage
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes="(min-width: 720px) 656px, calc(100vw - 56px)"
        fallbackLabel={t('common.imageUnavailable')}
        className="aspect-[16/10] h-auto w-full rounded-lg bg-bg outline -outline-offset-1 outline-outline"
      />
    </Link>
  );
}

function ProjectBody({ project }: { project: Project }) {
  return (
    <Box className="min-w-0 flex-1">
      <Row className="flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <TextPrimary as="h3" className="font-medium">
          {project.name}
        </TextPrimary>
        {project.metric && (
          <TextPrimary as="p" className="rounded-md bg-accent-soft px-2 py-0.5 font-mono text-2xs text-accent">
            {project.metric}
          </TextPrimary>
        )}
      </Row>
      <TextPrimary as="p" className="mt-2 text-sm leading-relaxed text-muted text-pretty">
        {project.description}
      </TextPrimary>
      {project.role && (
        <TextPrimary as="p" className="mt-2 font-mono text-2xs text-subtle">
          {project.role}
        </TextPrimary>
      )}
      <Row className="mt-4 flex-wrap items-center justify-between gap-3">
        <BaseTechTagList keys={project.stack} label={t('projects.stack', { name: project.name })} />
        {project.links.length > 0 && (
          <Box as="ul" className="flex gap-4 text-sm">
            {project.links.map((link) => (
              <Box as="li" key={link.href + link.label}>
                <BaseLink href={link.href}>
                  {link.label}
                  <TextPrimary as="span" className="sr-only">
                    {` ${t('projects.linkFor', { name: project.name })}`}
                  </TextPrimary>
                </BaseLink>
              </Box>
            ))}
          </Box>
        )}
      </Row>
    </Box>
  );
}

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <SectionShell
      id={ESectionId.PROJECTS}
      title={t('section.projects')}
      index={SECTION_ORDER.indexOf(ESectionId.PROJECTS) + 1}
    >
      <Box as="ul" className="grid gap-4">
        {projects.map((project) => (
          <Box as="li" key={project.name}>
            <Box
              as="article"
              className="group rounded-2xl border border-border bg-card p-2 transition-[border-color] duration-200 ease-out hover:border-accent/50"
            >
              {project.image?.kind === EImageKind.PHONE ? (
                <Row className="gap-5 p-3">
                  <ProjectImage image={project.image} name={project.name} />
                  <ProjectBody project={project} />
                </Row>
              ) : (
                <>
                  {project.image && <ProjectImage image={project.image} name={project.name} />}
                  <Box className="p-3 pt-4">
                    <ProjectBody project={project} />
                  </Box>
                </>
              )}
            </Box>
          </Box>
        ))}
      </Box>
    </SectionShell>
  );
}
