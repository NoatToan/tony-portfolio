'use client';

import { useEffect } from 'react';

import BaseButton from './BaseButton';
import Col from './Col';
import TextPrimary from './TextPrimary';

export interface ErrorScreenLabels {
  title: string;
  body: string;
  retry: string;
}

/** Shared body for every segment's `error.tsx` (fe-coding STEP 3: every route segment ships one). */
export default function ErrorScreen({
  error,
  reset,
  labels,
}: {
  error: Error & { digest?: string };
  reset: () => void;
  labels: ErrorScreenLabels;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Col className="mx-auto min-h-[60vh] max-w-[42rem] items-start justify-center gap-4 px-5">
      <TextPrimary as="h1" className="text-2xl font-semibold tracking-tight">
        {labels.title}
      </TextPrimary>
      <TextPrimary as="p" className="max-w-[30rem] leading-relaxed text-muted text-pretty">
        {labels.body}
      </TextPrimary>
      <BaseButton variant="outline" onClick={() => reset()}>
        {labels.retry}
      </BaseButton>
    </Col>
  );
}
