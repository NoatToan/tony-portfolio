'use client';

import Image from 'next/image';
import { useState } from 'react';

import { cx } from '@/_modules/common/utils/utilsClassNames';

import Box from './Box';

/**
 * Tiny client leaf (fe-coding: Client Components never import the i18next instance —
 * `fallbackLabel` is already-translated text passed down from the Server Component caller, per
 * `common.imageUnavailable`). `onError` requires a Client Component, so this stays the smallest
 * possible one rather than lifting the whole call-site tree to the client.
 */
export default function BaseImage({
  src,
  alt,
  width,
  height,
  sizes,
  className,
  priority = false,
  fallbackLabel = 'Image unavailable',
  unoptimized = true,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  className?: string;
  priority?: boolean;
  /** Already-translated copy for the failed-image tile (ai/shared-fe/10 §3). */
  fallbackLabel?: string;
  /**
   * Defaults to `true` to keep the existing mock-SVG behaviour (bundled SVG/illustrative mocks
   * gain nothing from Next's optimizer, so serving them verbatim avoids an extra request hop).
   * Pass `false` for real raster photos (store icons, screenshots, feature graphics, client
   * logos) so Next generates a responsive `srcset` through `/_next/image`.
   */
  unoptimized?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    // Labelled tile, not a broken-image glyph — same box (aspect-ratio + className) so there is
    // no layout shift relative to the image it replaces.
    return (
      <Box
        role="img"
        aria-label={fallbackLabel}
        style={{ aspectRatio: `${width} / ${height}` }}
        className={cx(
          'flex items-center justify-center overflow-hidden border border-dashed border-border bg-card p-1 text-center font-mono text-2xs text-subtle',
          className,
        )}
      >
        {fallbackLabel}
      </Box>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      unoptimized={unoptimized}
      onError={() => setFailed(true)}
      className={cx(className)}
    />
  );
}
