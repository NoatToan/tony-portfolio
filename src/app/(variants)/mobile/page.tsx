import type { Metadata } from 'next';

import PortfolioScreen from '@/_modules/pages/Portfolio/PortfolioScreen';
import { mobileMock } from '@/_modules/server/content';

export const metadata: Metadata = {
  title: mobileMock.meta.title,
  description: mobileMock.meta.description,
  alternates: { canonical: '/mobile' },
  openGraph: {
    title: mobileMock.meta.title,
    description: mobileMock.meta.description,
    url: '/mobile',
  },
  twitter: { title: mobileMock.meta.title, description: mobileMock.meta.description },
};

export default function Page() {
  return <PortfolioScreen content={mobileMock} />;
}
