'use client';

import ErrorScreen from '@/_modules/common/components/ErrorScreen';
import { ERROR_COPY } from '@/_modules/config/errorCopy';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <ErrorScreen error={error} reset={reset} labels={ERROR_COPY} />;
}
