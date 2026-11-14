import type { CSSProperties } from 'react';

import { ETechKey } from '@/_modules/config/enums';
import { TECH_REGISTRY } from '@/_modules/config/techRegistry';
import { cx } from '@/_modules/common/utils/utilsClassNames';

import BaseIcon from './BaseIcon';

/**
 * Official brand mark for one `ETechKey`, monochrome by default and brand-coloured on hover via
 * a per-item CSS variable (docs/DECISIONS.md "Stack icon section"). `null` when the registry has
 * no artwork — callers render the text-only fallback instead.
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
        'shrink-0 text-subtle transition-colors duration-200 ease-out',
        entry.darkBrand
          ? 'group-hover:text-fg'
          : 'group-hover:text-[color:var(--tech-hex)]',
      )}
    />
  );
}
