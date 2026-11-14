import Link from 'next/link';

import BaseImage from '@/_modules/common/components/BaseImage';
import BaseLink from '@/_modules/common/components/BaseLink';
import BaseMonogram from '@/_modules/common/components/BaseMonogram';
import BaseTechIcon from '@/_modules/common/components/BaseTechIcon';
import BaseTechTagList from '@/_modules/common/components/BaseTechTagList';
import Box from '@/_modules/common/components/Box';
import Row from '@/_modules/common/components/Row';
import TextPrimary from '@/_modules/common/components/TextPrimary';
import { joinWith } from '@/_modules/common/utils/utilsString';
import { EImageKind, ESectionId, ETechKey } from '@/_modules/config/enums';
import { SECTION_ORDER } from '@/_modules/config/sectionOrder';
import { TECH_REGISTRY } from '@/_modules/config/techRegistry';
import { t } from '@/_modules/i18next/i18n';
import { getStoreAsset, type StoreAsset } from '@/_modules/server/content/storeAssets';
import type { Project } from '@/_modules/server/content/schemas';

import SectionShell from './SectionShell';

/**
 * Store marketing images (docs/DECISIONS.md "Store marketing images"). Real screenshots and
 * icons come in whatever pixel size the store agent downloaded; these constants only fix the
 * *aspect ratio* Next.js reserves before load (web.dev CLS) — the real file is still what paints,
 * scaled to fit via CSS, so a slightly different source ratio never shifts layout.
 */
const SHOT_W = 440;
const SHOT_H = 953; // ~9:19.5, a standard phone screenshot ratio.
const ICON_PX = 128;
const COVER_W = 1024;
const COVER_H = 500; // Google Play's feature graphic ratio.

interface ResolvedApp {
  slug: string;
  label?: string;
  asset?: StoreAsset;
}

/** One app (by `slug`), several (`apps`), or none — always degrades to "no store data". */
function resolveApps(project: Project): ResolvedApp[] {
  if (project.apps && project.apps.length > 0) {
    return project.apps.map((app) => ({ slug: app.slug, label: app.label, asset: getStoreAsset(app.slug) }));
  }
  if (project.slug) {
    const found = getStoreAsset(project.slug);
    const fallback: StoreAsset | undefined =
      !found && (project.storeLinks || project.gallery)
        ? {
            appStoreUrl: project.storeLinks?.appStore,
            playStoreUrl: project.storeLinks?.playStore,
            screenshots: project.gallery,
          }
        : undefined;
    return [{ slug: project.slug, asset: found ?? fallback }];
  }
  return [];
}

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

/** Google Play feature graphic, used as the card's cover when a store listing has one. */
function CoverImage({ src, name }: { src: string; name: string }) {
  return (
    <BaseImage
      src={src}
      alt={t('projects.coverImage', { name })}
      width={COVER_W}
      height={COVER_H}
      sizes="(min-width: 720px) 656px, calc(100vw - 56px)"
      fallbackLabel={t('common.imageUnavailable')}
      unoptimized={false}
      className="aspect-[1024/500] h-auto w-full rounded-lg bg-bg object-cover outline -outline-offset-1 outline-outline"
    />
  );
}

function AppIcon({ src, name, className = 'size-10' }: { src: string; name: string; className?: string }) {
  return (
    <BaseImage
      src={src}
      alt={t('projects.appIcon', { name })}
      width={ICON_PX}
      height={ICON_PX}
      sizes="48px"
      fallbackLabel={t('common.imageUnavailable')}
      unoptimized={false}
      className={`${className} shrink-0 rounded-[0.65rem] object-cover ring-1 ring-border`}
    />
  );
}

/** Thumbnail opens the full-size screenshot in a new tab (ai/shared-fe/10 §1, zero-JS variant). */
function Screenshot({ src, name, index }: { src: string; name: string; index: number }) {
  return (
    <Box className="w-16 shrink-0 transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:-rotate-3 motion-reduce:transform-none sm:w-20">
      <Box className="rounded-[1.1rem] bg-fg p-1 shadow-sm">
        <Link
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          prefetch={false}
          aria-label={`${t('projects.openImage', { name })} ${index + 1}`}
          className="block"
        >
          <BaseImage
            src={src}
            alt={`${name} screenshot ${index + 1}`}
            width={SHOT_W}
            height={SHOT_H}
            sizes="80px"
            fallbackLabel={t('common.imageUnavailable')}
            unoptimized={false}
            className="aspect-[9/19.5] h-auto w-full rounded-[0.85rem] bg-bg object-cover"
          />
        </Link>
      </Box>
    </Box>
  );
}

/** Official "App Store" / "Google Play" text links with the brand mark (external, rel=noopener via BaseLink). */
function StoreLinks({ asset, name }: { asset: StoreAsset; name: string }) {
  if (!asset.appStoreUrl && !asset.playStoreUrl) return null;
  return (
    <Box as="ul" className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm">
      {asset.appStoreUrl && (
        <Box as="li">
          <BaseLink href={asset.appStoreUrl} inline className="gap-1.5">
            <BaseTechIcon techKey={ETechKey.APP_STORE} className="size-4" />
            {TECH_REGISTRY[ETechKey.APP_STORE].name}
            <TextPrimary as="span" className="sr-only">
              {` ${t('projects.linkFor', { name })}`}
            </TextPrimary>
          </BaseLink>
        </Box>
      )}
      {asset.playStoreUrl && (
        <Box as="li">
          <BaseLink href={asset.playStoreUrl} inline className="gap-1.5">
            <BaseTechIcon techKey={ETechKey.GOOGLE_PLAY} className="size-4" />
            {TECH_REGISTRY[ETechKey.GOOGLE_PLAY].name}
            <TextPrimary as="span" className="sr-only">
              {` ${t('projects.linkFor', { name })}`}
            </TextPrimary>
          </BaseLink>
        </Box>
      )}
    </Box>
  );
}

/**
 * Display name shared by `AppBlock` and `AppGridTile`: the store listing's own name wins when
 * there's no project-level label to disambiguate; otherwise `"<project> — <app label>"` (e.g.
 * the Sega Sammy player/admin pair).
 */
function appDisplayName(app: ResolvedApp, projectName: string) {
  return app.label ? joinWith('—', projectName, app.label) : (app.asset?.name ?? projectName);
}

/**
 * One app's icon, label, store links and a row of screenshots — used for 1–2 apps per project.
 * An app storeAssets hasn't found yet (`asset` undefined/`found: false`) still renders its label
 * and a monogram fallback instead of disappearing — same degrade as `AppGridTile`.
 */
function AppBlock({ app, projectName, maxShots }: { app: ResolvedApp; projectName: string; maxShots: number }) {
  const name = appDisplayName(app, projectName);
  const icon = app.asset?.icon;
  const shots = app.asset?.screenshots?.slice(0, maxShots) ?? [];

  return (
    <Box className="rounded-xl border border-border/60 p-3">
      <Row className="items-center gap-2.5">
        {icon ? <AppIcon src={icon} name={name} /> : <BaseMonogram label={name} className="size-10" />}
        {app.label && (
          <TextPrimary as="p" className="font-mono text-2xs text-subtle">
            {app.label}
          </TextPrimary>
        )}
      </Row>
      {app.asset && (
        <Box className="mt-2.5">
          <StoreLinks asset={app.asset} name={name} />
        </Box>
      )}
      {shots.length > 0 && (
        <Row as="ul" className="mt-3 gap-3 overflow-x-auto pb-1">
          {shots.map((src, index) => (
            <Box as="li" key={src}>
              <Screenshot src={src} name={name} index={index} />
            </Box>
          ))}
        </Row>
      )}
    </Box>
  );
}

/** Compact tile for a suite with many apps — icon, name and store links only, no screenshots. */
function AppGridTile({ app, projectName }: { app: ResolvedApp; projectName: string }) {
  const name = appDisplayName(app, projectName);
  const icon = app.asset?.icon;

  return (
    <Box as="li" className="flex min-w-0 items-center gap-2 rounded-lg border border-border/60 px-2.5 py-1.5">
      {icon ? (
        <AppIcon src={icon} name={name} className="size-7" />
      ) : (
        <BaseMonogram label={name} className="size-7 shrink-0" />
      )}
      <Box className="min-w-0">
        <TextPrimary as="p" className="truncate text-xs font-medium">
          {name}
        </TextPrimary>
        {app.asset && (app.asset.appStoreUrl || app.asset.playStoreUrl) && (
          <Row className="mt-0.5 items-center gap-2.5">
            {app.asset.appStoreUrl && (
              <BaseLink href={app.asset.appStoreUrl} inline className="!gap-0.5">
                <BaseTechIcon techKey={ETechKey.APP_STORE} className="size-3" />
                <TextPrimary as="span" className="sr-only">
                  {`${TECH_REGISTRY[ETechKey.APP_STORE].name} ${t('projects.linkFor', { name })}`}
                </TextPrimary>
              </BaseLink>
            )}
            {app.asset.playStoreUrl && (
              <BaseLink href={app.asset.playStoreUrl} inline className="!gap-0.5">
                <BaseTechIcon techKey={ETechKey.GOOGLE_PLAY} className="size-3" />
                <TextPrimary as="span" className="sr-only">
                  {`${TECH_REGISTRY[ETechKey.GOOGLE_PLAY].name} ${t('projects.linkFor', { name })}`}
                </TextPrimary>
              </BaseLink>
            )}
          </Row>
        )}
      </Box>
    </Box>
  );
}

/** One app, a pair (e.g. a user/admin app), or a many-app suite grid — always optional. */
function ProjectApps({ project, apps }: { project: Project; apps: ResolvedApp[] }) {
  if (apps.length === 0) return null;

  if (apps.length <= 2) {
    return (
      <Row className="mt-4 flex-wrap gap-3" aria-label={t('projects.appsIn', { name: project.name })}>
        {apps.map((app) => (
          <Box key={app.slug} className="min-w-[13rem] flex-1">
            <AppBlock app={app} projectName={project.name} maxShots={apps.length > 1 ? 2 : 4} />
          </Box>
        ))}
      </Row>
    );
  }

  const lead = apps[0];
  const leadShots = lead?.asset?.screenshots?.slice(0, 4) ?? [];
  return (
    <Box className="mt-4">
      <Box as="ul" aria-label={t('projects.appsIn', { name: project.name })} className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {apps.map((app) => (
          <AppGridTile key={app.slug} app={app} projectName={project.name} />
        ))}
      </Box>
      {leadShots.length > 0 && (
        <Row as="ul" className="mt-3 gap-3 overflow-x-auto pb-1">
          {leadShots.map((src, index) => (
            <Box as="li" key={src}>
              <Screenshot src={src} name={lead?.asset?.name ?? project.name} index={index} />
            </Box>
          ))}
        </Row>
      )}
    </Box>
  );
}

function ProjectBody({ project, apps }: { project: Project; apps: ResolvedApp[] }) {
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
      <ProjectApps project={project} apps={apps} />
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
        {projects.map((project) => {
          const apps = resolveApps(project);
          const cover = apps[0]?.asset?.featureGraphic ?? undefined;

          return (
            <Box as="li" key={project.name}>
              <Box
                as="article"
                className="group rounded-2xl border border-border bg-card p-2 transition-[border-color] duration-200 ease-out hover:border-accent/50"
              >
                {project.image?.kind === EImageKind.PHONE ? (
                  <Row className="gap-5 p-3">
                    <ProjectImage image={project.image} name={project.name} />
                    <ProjectBody project={project} apps={apps} />
                  </Row>
                ) : (
                  <>
                    {project.image && <ProjectImage image={project.image} name={project.name} />}
                    {!project.image && cover && <CoverImage src={cover} name={project.name} />}
                    <Box className="p-3 pt-4">
                      <ProjectBody project={project} apps={apps} />
                    </Box>
                  </>
                )}
              </Box>
            </Box>
          );
        })}
      </Box>
    </SectionShell>
  );
}
