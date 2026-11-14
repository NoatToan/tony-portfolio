/**
 * Colours for contexts that cannot read CSS variables (next/og ImageResponse).
 * Mirrors the dark theme tokens in app/globals.css.
 */
export const OG_THEME = {
  bg: '#0a0a0a',
  fg: '#ededed',
  muted: '#a3a3a3',
  border: '#333333',
  accent: '#2dd4bf',
} as const;

/**
 * `<meta name="theme-color">` (browser chrome tint) is set via Next's `viewport` export, which
 * takes a literal string — it cannot read a CSS custom property. These mirror `--bg` light/dark
 * in app/globals.css; keep both in sync by hand when that token changes.
 */
export const THEME_COLORS = {
  light: '#fafafa',
  dark: '#0a0a0a',
} as const;
