import Link from 'next/link';

import { EVariant } from '@/_modules/config/enums';
import { REPO_URL } from '@/_modules/config/site';
import { routeLinks } from '@/_modules/config/routeLinks';
import { t } from '@/_modules/i18next/i18n';

import Box from './Box';
import GitHubSourceIcon from './GitHubSourceIcon';
import Row from './Row';
import TextPrimary from './TextPrimary';
import ThemeToggle from './ThemeToggle';
import VariantSwitcher from './VariantSwitcher';

export default function SiteHeader() {
  return (
    <Box as="header" className="sticky top-0 z-40 border-b border-border/70 bg-bg/85 backdrop-blur-md">
      <Row className="mx-auto h-14 max-w-[42rem] items-center justify-between gap-2 px-5">
        <Box as="nav" aria-label={t('common.siteNav')}>
          <Row className="items-center gap-3">
            <Link
              href={routeLinks.home}
              className="group -ml-1.5 inline-flex size-hit items-center justify-center transition-transform duration-150 ease-out active:scale-[0.96]"
            >
              <Row className="size-8 items-center justify-center rounded-md border border-border transition-[border-color] duration-150 ease-out group-hover:border-accent">
                <TextPrimary as="span" className="font-mono text-2xs font-medium text-fg">
                  TN
                </TextPrimary>
                {/*
                  No `aria-label` override here (axe "label-content-name-mismatch": an accessible
                  name must contain the visible text, and "Tony Nguyen, home" does not contain
                  "TN"). An sr-only suffix extends the visible "TN" into the full accessible name
                  instead.
                */}
                <TextPrimary as="span" className="sr-only">
                  {` ${t('common.home')}`}
                </TextPrimary>
              </Row>
            </Link>
            <VariantSwitcher
              navLabel={t('common.variantNav')}
              variantLabels={{
                [EVariant.FULLSTACK]: t('variant.fullstack'),
                [EVariant.MOBILE]: t('variant.mobile'),
              }}
            />
          </Row>
        </Box>
        <Row className="-mr-2.5 items-center">
          <GitHubSourceIcon href={REPO_URL} label={t('common.viewSource')} />
          <ThemeToggle label={t('common.toggleTheme')} title={t('common.toggleTheme')} />
        </Row>
      </Row>
    </Box>
  );
}
