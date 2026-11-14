import Link from 'next/link';

import BaseButton from '@/_modules/common/components/BaseButton';
import BaseImage from '@/_modules/common/components/BaseImage';
import BaseLink from '@/_modules/common/components/BaseLink';
import Box from '@/_modules/common/components/Box';
import { HeroItem, HeroStagger } from '@/_modules/common/components/motion/HeroStagger';
import Row from '@/_modules/common/components/Row';
import TextPrimary from '@/_modules/common/components/TextPrimary';
import { ELinkKind } from '@/_modules/config/enums';
import { t } from '@/_modules/i18next/i18n';
import type { PortfolioContent } from '@/_modules/server/content/schemas';

export default function HeroSection({ content }: { content: PortfolioContent }) {
  const socials = content.links.filter((link) => link.kind !== ELinkKind.EMAIL);

  return (
    <Box as="section" aria-labelledby="hero-title" className="pb-14 pt-14 sm:pt-20">
      <HeroStagger>
        <HeroItem className="mb-6 flex items-center gap-4">
          {content.profile.avatar && (
            <BaseImage
              src={content.profile.avatar.src}
              alt={content.profile.avatar.alt}
              width={content.profile.avatar.width}
              height={content.profile.avatar.height}
              sizes="56px"
              priority
              fallbackLabel={t('common.imageUnavailable')}
              className="size-14 rounded-full outline -outline-offset-1 outline-outline"
            />
          )}
          <TextPrimary as="p" className="font-mono text-xs leading-relaxed text-accent">
            {content.profile.role}
          </TextPrimary>
        </HeroItem>
        <HeroItem>
          <TextPrimary
            as="h1"
            id="hero-title"
            className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl"
          >
            {content.profile.name}
          </TextPrimary>
        </HeroItem>
        <HeroItem>
          <TextPrimary as="p" className="mt-5 max-w-[36rem] text-lg leading-relaxed text-muted text-pretty">
            {content.profile.tagline}
          </TextPrimary>
        </HeroItem>
        <HeroItem>
          <Row className="mt-5 flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-subtle">
            <TextPrimary as="span">{content.profile.location}</TextPrimary>
            {content.profile.availability && (
              <>
                <TextPrimary as="span" aria-hidden="true">
                  /
                </TextPrimary>
                <Row className="items-center gap-1.5">
                  <Box as="span" aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
                  <TextPrimary as="span">{content.profile.availability}</TextPrimary>
                </Row>
              </>
            )}
          </Row>
        </HeroItem>
        <HeroItem className="mt-8 flex flex-wrap items-center gap-3">
          {/* Static PDF under /public, not an app route — prefetch would request it as one. */}
          <Link href={content.resumeUrl} prefetch={false}>
            <BaseButton as="span" variant="solid">
              {t('hero.resume')}
              <TextPrimary as="span" className="font-mono text-2xs opacity-70">
                {t('common.pdf')}
              </TextPrimary>
            </BaseButton>
          </Link>
          <Link href={`mailto:${content.profile.email}`}>
            <BaseButton as="span" variant="outline">
              {t('hero.contact')}
            </BaseButton>
          </Link>
          <Box as="ul" className="flex items-center gap-4 pl-1 text-sm text-muted">
            {socials.map((link) => (
              <Box as="li" key={link.href + link.label}>
                <BaseLink href={link.href}>{link.label}</BaseLink>
              </Box>
            ))}
          </Box>
        </HeroItem>
      </HeroStagger>
    </Box>
  );
}
