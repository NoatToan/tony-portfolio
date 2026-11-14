import Link from 'next/link';

import BaseLink from '@/_modules/common/components/BaseLink';
import Box from '@/_modules/common/components/Box';
import TextPrimary from '@/_modules/common/components/TextPrimary';
import { ELinkKind, ESectionId } from '@/_modules/config/enums';
import { SECTION_ORDER } from '@/_modules/config/sectionOrder';
import { t } from '@/_modules/i18next/i18n';
import type { PortfolioContent } from '@/_modules/server/content/schemas';

import SectionShell from './SectionShell';

export default function ContactSection({ content }: { content: PortfolioContent }) {
  const socials = content.links.filter((link) => link.kind !== ELinkKind.EMAIL);

  return (
    <SectionShell
      id={ESectionId.CONTACT}
      title={t('section.contact')}
      index={SECTION_ORDER.indexOf(ESectionId.CONTACT) + 1}
    >
      <TextPrimary as="p" className="max-w-[34rem] leading-relaxed text-muted text-pretty">
        {t('contact.lead')}
      </TextPrimary>
      <Link
        href={`mailto:${content.profile.email}`}
        className="mt-6 inline-flex min-h-hit items-center text-2xl font-medium tracking-tight underline decoration-border decoration-2 underline-offset-8 transition-[color,text-decoration-color] duration-150 ease-out hover:text-accent hover:decoration-accent sm:text-3xl"
      >
        {content.profile.email}
      </Link>
      <Box as="ul" className="mt-6 flex flex-wrap gap-x-6 text-sm text-muted">
        {socials.map((link) => (
          <Box as="li" key={link.href + link.label}>
            <BaseLink href={link.href}>{link.label}</BaseLink>
          </Box>
        ))}
        <Box as="li">
          <BaseLink href={content.resumeUrl}>{t('contact.resume')}</BaseLink>
        </Box>
      </Box>
    </SectionShell>
  );
}
