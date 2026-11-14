import type { CSSProperties } from 'react';

import { ETechKey } from '@/_modules/config/enums';
import { TECH_REGISTRY } from '@/_modules/config/techRegistry';
import { cx } from '@/_modules/common/utils/utilsClassNames';

import BaseIcon from './BaseIcon';

/**
 * Official brand mark for one `ETechKey`, always in its brand colour via a per-item CSS variable;
 * near-black brands use the foreground token so they stay visible in dark mode
 * (docs/DECISIONS.md "Stack icon section"). `null` when the registry has no artwork — callers
 * render the text-only fallback instead.
 */
export default function BaseTechIcon({
  techKey,
  className = 'size-5',
}: {
  techKey: ETechKey;
  className?: string;
}) {
  const entry = TECH_REGISTRY[techKey];
  if (!entry.icon) return null;

  const style = entry.hex ? ({ '--tech-hex': `#${entry.hex}` } as CSSProperties) : undefined;

  return (
    <BaseIcon
      viewBox={entry.icon.viewBox}
      path={entry.icon.path}
      fill="currentColor"
      style={style}
      className={cx(
        className,
        'shrink-0',
        !entry.hex ? 'text-fg' : entry.darkBrand ? 'tech-icon-dark-brand' : 'text-[color:var(--tech-hex)]',
      )}
    />
  );
}
