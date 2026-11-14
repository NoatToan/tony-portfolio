'use client';

import { m } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { EVariant } from '@/_modules/config/enums';
import { springs } from '@/_modules/config/motion';
import { routeLinks } from '@/_modules/config/routeLinks';

import Box from './Box';

const VARIANTS = [EVariant.FULLSTACK, EVariant.MOBILE] as const;

export interface VariantSwitcherProps {
  navLabel: string;
  variantLabels: Record<EVariant, string>;
}

/** Translated strings arrive as props from the Server Component tree — i18next never ships to the client. */
export default function VariantSwitcher({ navLabel, variantLabels }: VariantSwitcherProps) {
  const pathname = usePathname();

  return (
    <Box as="ul" className="flex items-center gap-1" aria-label={navLabel}>
      {VARIANTS.map((variant) => {
        const href = routeLinks.variant(variant);
        const active = pathname === href;
        return (
          <Box as="li" key={variant} className="relative">
            <Link
              href={href}
              aria-current={active ? 'page' : undefined}
              className={`relative inline-flex min-h-hit items-center px-2.5 text-sm transition-[color,transform] duration-150 ease-out active:scale-[0.96] ${
                active ? 'text-fg' : 'text-muted hover:text-fg'
              }`}
            >
              {variantLabels[variant]}
              {active && (
                <m.span
                  layoutId="variant-underline"
                  aria-hidden="true"
                  className="absolute inset-x-2.5 bottom-1.5 h-px bg-accent"
                  transition={springs.snappy}
                />
              )}
            </Link>
          </Box>
        );
      })}
    </Box>
  );
}
