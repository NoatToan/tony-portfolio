import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Geist, Geist_Mono } from 'next/font/google';

import { SITE_URL, THEME_SCRIPT } from '@/_modules/config/site';
import { THEME_COLORS } from '@/_modules/config/theme';
import { t } from '@/_modules/i18next/i18n';
import Providers from '@/_modules/pages/providers';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  display: 'swap',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  display: 'swap',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: t('meta.homeTitle'),
    template: '%s',
  },
  description: t('meta.homeDescription'),
  openGraph: { type: 'website', siteName: 'Tony Nguyen', locale: 'en_US' },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: THEME_COLORS.light },
    { media: '(prefers-color-scheme: dark)', color: THEME_COLORS.dark },
  ],
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <head>
        {/*
          JUSTIFIED EXCEPTION: `THEME_SCRIPT` is a fixed string literal authored in
          `_modules/config/site.ts`, not user/visitor input — there is no injection surface for a
          sanitizer to guard. It must run synchronously before paint (pre-hydration) to set
          `data-theme` and avoid a flash of the wrong theme, which only an inline `<script>` can do.
        */}
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-fg focus:px-3 focus:py-2 focus:text-sm focus:text-bg"
        >
          {t('common.skipToContent')}
        </a>
        <Providers>{children}</Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
