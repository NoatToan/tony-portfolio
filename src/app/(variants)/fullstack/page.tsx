import type { Metadata } from 'next';

import PortfolioScreen from '@/_modules/pages/Portfolio/PortfolioScreen';
import { fullstackMock } from '@/_modules/server/content';

export const metadata: Metadata = {
  title: fullstackMock.meta.title,
  description: fullstackMock.meta.description,
  alternates: { canonical: '/fullstack' },
  openGraph: {
    title: fullstackMock.meta.title,
    description: fullstackMock.meta.description,
    url: '/fullstack',
  },
  twitter: { title: fullstackMock.meta.title, description: fullstackMock.meta.description },
};

export default function Page() {
  return <PortfolioScreen content={fullstackMock} />;
}
