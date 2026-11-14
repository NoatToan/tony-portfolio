import { ImageResponse } from 'next/og';

import { OG_THEME } from '@/_modules/config/theme';
import type { PortfolioContent } from '@/_modules/server/content/schemas';

export const OG_SIZE = { width: 1200, height: 630 };

/**
 * JUSTIFIED EXCEPTION to "no raw HTML outside Base*" (fe-coding STEP 2 §2): this tree is not
 * rendered by the browser DOM. `ImageResponse` runs it through Satori, which rasterises a fixed
 * subset of `div`/`span` with literal `style` objects into a PNG — it does not read Tailwind
 * classes, cannot host `Col`/`Row`/`TextPrimary` (they emit `className`, which Satori ignores),
 * and never hydrates or needs ARIA. `Col`/`Row`/`TextPrimary` would silently render unstyled here.
 */

export function renderOg(content: PortfolioContent | null) {
  const title = content?.profile.name ?? 'Tony Nguyen';
  const role = content?.profile.role ?? 'Software Engineer';
  const tags = content
    ? content.techStack.flatMap((group) => group.items.map((item) => item.name.split(' · ')[0])).slice(0, 5)
    : [];

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          background: OG_THEME.bg,
          color: OG_THEME.fg,
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', fontSize: 26, color: OG_THEME.accent }}>
          {content ? `~/${content.slug}` : '~/portfolio'}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -2 }}>{title}</div>
          <div style={{ fontSize: 38, color: OG_THEME.muted, marginTop: 16 }}>{role}</div>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          {tags.map((tag) => (
            <div
              key={tag}
              style={{
                display: 'flex',
                border: `1px solid ${OG_THEME.border}`,
                borderRadius: 999,
                padding: '8px 20px',
                fontSize: 22,
                color: OG_THEME.muted,
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
