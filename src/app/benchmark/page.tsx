import type { Metadata } from 'next';

import BenchmarkScreen from '@/_modules/pages/Benchmark/BenchmarkScreen';
import { t } from '@/_modules/i18next/i18n';

export const metadata: Metadata = {
  title: t('meta.benchmarkTitle'),
  description: t('meta.benchmarkDescription'),
  alternates: { canonical: '/benchmark' },
  openGraph: { title: t('meta.benchmarkTitle'), description: t('meta.benchmarkDescription'), url: '/benchmark' },
  twitter: { title: t('meta.benchmarkTitle'), description: t('meta.benchmarkDescription') },
};

export default function Page() {
  return <BenchmarkScreen />;
}
