import Link from 'next/link';

import BaseIcon from '@/_modules/common/components/BaseIcon';
import Box from '@/_modules/common/components/Box';
import { HeroItem, HeroStagger } from '@/_modules/common/components/motion/HeroStagger';
import SiteHeader from '@/_modules/common/components/SiteHeader';
import TextPrimary from '@/_modules/common/components/TextPrimary';
import { routeLinks } from '@/_modules/config/routeLinks';
import { t } from '@/_modules/i18next/i18n';
import type { PortfolioContent } from '@/_modules/server/content/schemas';

const ARROW_PATH = 'M7 17 17 7M8 7h9v9';

export default function HomeScreen({ variants }: { variants: readonly PortfolioContent[] }) {
  return (
    <>
      <SiteHeader />
      <Box as="main" id="main" className="mx-auto max-w-[42rem] px-5 pb-24 pt-16 sm:pt-24">
        <HeroStagger>
          <HeroItem>
            <TextPrimary as="p" className="mb-4 font-mono text-xs text-accent">
              {t('home.eyebrow')}
            </TextPrimary>
          </HeroItem>
          <HeroItem>
            <TextPrimary as="h1" className="text-4xl font-semibold tracking-tight sm:text-5xl">
              {variants[0]?.profile.name}
            </TextPrimary>
          </HeroItem>
          <HeroItem>
            <TextPrimary as="p" className="mt-5 max-w-[34rem] text-lg leading-relaxed text-muted text-pretty">
              {t('home.lead')}
            </TextPrimary>
          </HeroItem>
          <HeroItem className="mt-12">
            <Box as="ul" className="grid gap-4 sm:grid-cols-2">
              {variants.map((variant) => (
                <Box as="li" key={variant.slug}>
                  <Link
                    href={routeLinks.variant(variant.slug)}
                    className="group flex h-full flex-col justify-between gap-8 rounded-xl border border-border bg-card p-5 transition-[border-color,transform] duration-200 ease-out hover:border-accent/60 active:scale-[0.98]"
                  >
                    <Box>
                      <TextPrimary as="p" className="font-mono text-2xs text-subtle">
                        {`/${variant.slug}`}
                      </TextPrimary>
                      <TextPrimary as="h2" className="mt-2 font-medium leading-snug">
                        {variant.profile.role}
                      </TextPrimary>
                    </Box>
                    <TextPrimary
                      as="p"
                      className="inline-flex items-center gap-1 text-sm text-muted transition-[color] duration-150 ease-out group-hover:text-accent"
                    >
                      {t('home.view')}
                      <BaseIcon
                        path={ARROW_PATH}
                        className="size-3.5 rotate-45 transition-transform duration-150 ease-out group-hover:translate-x-0.5"
                      />
                    </TextPrimary>
                  </Link>
                </Box>
              ))}
            </Box>
          </HeroItem>
          <HeroItem>
            <TextPrimary as="p" className="mt-10 font-mono text-2xs text-subtle">
              <Link
                href={routeLinks.benchmark}
                className="inline-flex min-h-hit items-center underline-offset-4 hover:text-fg hover:underline"
              >
                {t('home.benchmarkLink')}
              </Link>
            </TextPrimary>
          </HeroItem>
        </HeroStagger>
      </Box>
    </>
  );
}
