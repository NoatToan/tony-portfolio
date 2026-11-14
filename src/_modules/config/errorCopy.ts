/**
 * Client-safe copy for the route segment error boundaries (`error.tsx`).
 *
 * `error.tsx` files are Client Components (Next.js requirement), and Client Components never
 * import the i18next instance (`_modules/i18next/i18n.ts` is Server-Component-only) — that would
 * ship i18next plus the whole locale bundle to the browser for three short strings. Kept as a
 * plain object so it stays zero extra client JS beyond the strings themselves.
 *
 * Keep in sync with `locales/en.ts` if this copy ever needs to be shared with a Server Component.
 */
export const ERROR_COPY = {
  title: 'Something went wrong',
  body: 'This page failed to render. Try again, or go back to the start.',
  retry: 'Try again',
} as const;
