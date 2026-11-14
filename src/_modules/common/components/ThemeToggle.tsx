'use client';

import { ETheme } from '@/_modules/config/enums';
import { THEME_STORAGE_KEY } from '@/_modules/config/site';

import BaseButton from './BaseButton';
import BaseIcon from './BaseIcon';

const SUN_PATH = 'M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41';
const MOON_PATH = 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z';

/*
 * The icon state is pure CSS (driven by <html data-theme>), so the server markup is identical
 * for every visitor and there is no hydration flicker.
 */
export default function ThemeToggle({ label, title }: { label: string; title: string }) {
  return (
    <BaseButton
      variant="bare"
      aria-label={label}
      title={title}
      className="relative !px-0 size-hit justify-center rounded-md"
      onClick={() => {
        const root = document.documentElement;
        const next = root.dataset.theme === ETheme.DARK ? ETheme.LIGHT : ETheme.DARK;
        root.dataset.theme = next;
        try {
          localStorage.setItem(THEME_STORAGE_KEY, next);
        } catch {
          // Storage unavailable (private mode); theme still applies for this visit.
        }
      }}
    >
      <BaseIcon
        path={SUN_PATH}
        strokeWidth={1.75}
        className="theme-icon theme-icon-sun absolute size-4"
      />
      <BaseIcon
        path={MOON_PATH}
        strokeWidth={1.75}
        className="theme-icon theme-icon-moon absolute size-4"
      />
    </BaseButton>
  );
}
