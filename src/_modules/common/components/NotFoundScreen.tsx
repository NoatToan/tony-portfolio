import Link from 'next/link';

import { routeLinks } from '@/_modules/config/routeLinks';
import { t } from '@/_modules/i18next/i18n';

import BaseButton from './BaseButton';
import Col from './Col';
import TextPrimary from './TextPrimary';

export default function NotFoundScreen() {
  return (
    <Col className="mx-auto min-h-[60vh] max-w-[42rem] items-start justify-center gap-4 px-5">
      <TextPrimary as="h1" className="text-2xl font-semibold tracking-tight">
        {t('common.notFoundTitle')}
      </TextPrimary>
      <TextPrimary as="p" className="max-w-[30rem] leading-relaxed text-muted text-pretty">
        {t('common.notFoundBody')}
      </TextPrimary>
      <Link href={routeLinks.home}>
        <BaseButton as="span" variant="outline">
          {t('common.backHome')}
        </BaseButton>
      </Link>
    </Col>
  );
}
