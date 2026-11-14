import Link from 'next/link';

import { ETechKey } from '@/_modules/config/enums';

import BaseButton from './BaseButton';
import BaseTechIcon from './BaseTechIcon';

/**
 * "View source" link in the top bar — the official GitHub mark from the shared tech registry,
 * same size/affordances as `ThemeToggle` (docs/DECISIONS.md: top bar keeps monogram, variant
 * switch and theme toggle; this is the one addition for "visitors who want to look at the code").
 */
export default function GitHubSourceIcon({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}>
      <BaseButton as="span" variant="bare" className="!px-0 size-hit justify-center rounded-md">
        <BaseTechIcon techKey={ETechKey.GITHUB} className="size-4" />
      </BaseButton>
    </Link>
  );
}
