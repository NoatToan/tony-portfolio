import Link from 'next/link';
import type { ReactNode } from 'react';

import { t } from '@/_modules/i18next/i18n';
import { cx } from '@/_modules/common/utils/utilsClassNames';

import BaseIcon from './BaseIcon';
import TextPrimary from './TextPrimary';

const ARROW_PATH = 'M7 17 17 7M8 7h9v9';

export default function BaseLink({
  href,
  children,
  className = '',
  inline = false,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  /** In-text links keep line height; standalone links get a 44px hit area. */
  inline?: boolean;
}) {
  const external = /^https?:\/\//.test(href);
  // A static asset under /public (e.g. "/resume-fullstack.pdf") is not an app route — Next's
  // Link still tries to prefetch it as one and logs a 404 for the RSC payload. Skip prefetch for
  // any same-origin href whose last path segment has a file extension.
  const isStaticAsset = !external && /\.[a-z0-9]+$/i.test(href.split(/[?#]/)[0]);
  return (
    <Link
      href={href}
      prefetch={isStaticAsset ? false : undefined}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={cx(
        'group inline-flex items-center gap-1 underline-offset-4 transition-[color] duration-150 ease-out hover:text-accent hover:underline',
        !inline && 'min-h-hit',
        className,
      )}
    >
      {children}
      {external && (
        <>
          <BaseIcon
            path={ARROW_PATH}
            className="size-3.5 opacity-60 transition-transform duration-150 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
          <TextPrimary as="span" className="sr-only">
            {t('common.opensNewTab')}
          </TextPrimary>
        </>
      )}
    </Link>
  );
}
