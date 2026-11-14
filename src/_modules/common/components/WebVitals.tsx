'use client';

import { useReportWebVitals } from 'next/web-vitals';
import { useCallback, useState } from 'react';

import { EVitalName } from '@/_modules/config/enums';

import Box from './Box';
import TextPrimary from './TextPrimary';

const THRESHOLDS: Record<EVitalName, { good: number; poor: number }> = {
  [EVitalName.TTFB]: { good: 800, poor: 1800 },
  [EVitalName.FCP]: { good: 1800, poor: 3000 },
  [EVitalName.LCP]: { good: 2500, poor: 4000 },
  [EVitalName.CLS]: { good: 0.1, poor: 0.25 },
  [EVitalName.INP]: { good: 200, poor: 500 },
};
const ORDER = [EVitalName.TTFB, EVitalName.FCP, EVitalName.LCP, EVitalName.CLS, EVitalName.INP] as const;

const TONE_CLASS = { good: 'bg-good', ok: 'bg-ok', poor: 'bg-poor' } as const;

function formatValue(name: EVitalName, value: number) {
  if (name === EVitalName.CLS) return value.toFixed(3);
  return value >= 1000 ? `${(value / 1000).toFixed(2)} s` : `${Math.round(value)} ms`;
}

export interface WebVitalsLabels {
  hints: Record<EVitalName, string>;
  toneGood: string;
  toneOk: string;
  tonePoor: string;
}

/**
 * Shows this visitor's own Core Web Vitals as the browser reports them. Translated strings
 * arrive as `labels` props from the Server Component parent — i18next never ships to the client.
 */
export default function WebVitals({ labels }: { labels: WebVitalsLabels }) {
  const [values, setValues] = useState<Partial<Record<EVitalName, number>>>({});

  const report = useCallback((metric: { name: string; value: number }) => {
    if (!ORDER.some((entry) => entry === metric.name)) return;
    setValues((prev) => ({ ...prev, [metric.name]: metric.value }));
  }, []);
  useReportWebVitals(report);

  return (
    <Box as="dl" className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-5" aria-live="polite">
      {ORDER.map((name) => {
        const { good, poor } = THRESHOLDS[name];
        const value = values[name];
        const tone = value === undefined ? null : value <= good ? 'good' : value <= poor ? 'ok' : 'poor';
        const toneLabel = tone === 'good' ? labels.toneGood : tone === 'ok' ? labels.toneOk : labels.tonePoor;
        return (
          <Box key={name}>
            <Box as="dt" className="flex items-center gap-1.5 font-mono text-2xs text-subtle">
              <Box
                as="span"
                aria-hidden="true"
                className={`size-1.5 rounded-full ${tone ? TONE_CLASS[tone] : 'bg-border'}`}
              />
              {name}
            </Box>
            <Box as="dd" className="mt-1 font-mono text-sm tabular-nums">
              {value === undefined ? (
                <TextPrimary as="span" className="text-subtle">
                  —
                </TextPrimary>
              ) : (
                formatValue(name, value)
              )}
              {tone && (
                <TextPrimary as="span" className="sr-only">
                  {` (${toneLabel})`}
                </TextPrimary>
              )}
            </Box>
            {value === undefined && (
              <Box as="dd" className="mt-0.5 text-2xs leading-tight text-subtle">
                {labels.hints[name]}
              </Box>
            )}
          </Box>
        );
      })}
    </Box>
  );
}
