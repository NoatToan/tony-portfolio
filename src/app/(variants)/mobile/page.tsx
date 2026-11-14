import type { Metadata } from 'next';

import PortfolioScreen from '@/_modules/pages/Portfolio/PortfolioScreen';
import { mobileContent } from '@/_modules/server/content';

export const metadata: Metadata = {
  title: mobileContent.meta.title,
  description: mobileContent.meta.description,
  alternates: { canonical: '/mobile' },
  openGraph: {
    title: mobileContent.meta.title,
    description: mobileContent.meta.description,
    url: '/mobile',
  },
  twitter: { title: mobileContent.meta.title, description: mobileContent.meta.description },
};

export default function Page() {
  return <PortfolioScreen content={mobileContent} />;
}
