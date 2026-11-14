import Link from 'next/link';

import BaseLink from '@/_modules/common/components/BaseLink';
import Box from '@/_modules/common/components/Box';
import TextPrimary from '@/_modules/common/components/TextPrimary';
import { EVariant } from '@/_modules/config/enums';
import { routeLinks } from '@/_modules/config/routeLinks';
import { REPO_URL } from '@/_modules/config/site';
import { t } from '@/_modules/i18next/i18n';
import type { PortfolioContent } from '@/_modules/server/content/schemas';

import AboutSection from './components/AboutSection';
import CertificationsSection from './components/CertificationsSection';
import ClientsSection from './components/ClientsSection';
import ContactSection from './components/ContactSection';
import DomainsSection from './components/DomainsSection';
import ExperienceSection from './components/ExperienceSection';
import HeroSection from './components/HeroSection';
import PerformanceSection from './components/PerformanceSection';
import PortfolioJsonLd from './components/PortfolioJsonLd';
import ProjectsSection from './components/ProjectsSection';
import TechnologiesSection from './components/TechnologiesSection';
import TechStackSection from './components/TechStackSection';

/** Full portfolio layout for one variant, in the section order from docs/DECISIONS.md. */
export default function PortfolioScreen({ content }: { content: PortfolioContent }) {
  return (
    <>
      <PortfolioJsonLd content={content} />
      <Box as="main" id="main" className="mx-auto max-w-[42rem] px-5">
        <HeroSection content={content} />
        <TechStackSection techStack={content.techStack} />
        <TechnologiesSection technologies={content.technologies} />
        <AboutSection summary={content.summary} />
        <ExperienceSection experience={content.experience} showLiveDot={content.slug === EVariant.FULLSTACK} />
        <ClientsSection clients={content.clients} />
        <ProjectsSection projects={content.projects} />
        <DomainsSection domains={content.domains} />
        <CertificationsSection certifications={content.certifications} education={content.education} />
        <PerformanceSection path={routeLinks.variant(content.slug)} />
        <ContactSection content={content} />
      </Box>

      <Box as="footer" className="mx-auto max-w-[42rem] px-5">
        <TextPrimary as="p" className="border-t border-border py-6 font-mono text-2xs text-subtle">
          {`${content.profile.name} · ${t('common.builtWith')} · `}
          <Link
            href={routeLinks.benchmark}
            className="inline-flex min-h-hit items-center underline-offset-4 hover:text-fg hover:underline"
          >
            {t('common.benchmark')}
          </Link>
          {' · '}
          <BaseLink href={REPO_URL} inline>
            {t('common.sourceLink')}
          </BaseLink>
        </TextPrimary>
      </Box>
    </>
  );
}
