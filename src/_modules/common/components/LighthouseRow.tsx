import BaseScoreRing from '@/_modules/common/components/BaseScoreRing';
import Box from '@/_modules/common/components/Box';
import Row from '@/_modules/common/components/Row';
import TextPrimary from '@/_modules/common/components/TextPrimary';
import { formatMs } from '@/_modules/common/utils/utilsFormat';
import { t } from '@/_modules/i18next/i18n';
import type { LighthouseResult } from '@/_modules/server/benchmark/benchmark';

/** One Lighthouse run (one form factor) — shared by the portfolio's Performance section and /benchmark. */
export default function LighthouseRow({ result }: { result: LighthouseResult }) {
  return (
    <Box className="grid gap-4 sm:grid-cols-[6rem_1fr] sm:items-center sm:gap-6">
      <TextPrimary as="p" className="font-mono text-xs capitalize text-subtle">
        {result.formFactor}
      </TextPrimary>
      <Row className="flex-wrap items-center gap-x-6 gap-y-4">
        <Row className="gap-4">
          <BaseScoreRing score={result.scores.performance} label={t('performance.perf')} />
          <BaseScoreRing score={result.scores.accessibility} label={t('performance.a11y')} />
          <BaseScoreRing score={result.scores.bestPractices} label={t('performance.bestPractices')} />
          <BaseScoreRing score={result.scores.seo} label={t('performance.seo')} />
        </Row>
        <Box as="dl" className="grid grid-cols-3 gap-x-5 font-mono text-xs tabular-nums">
          <Box>
            <Box as="dt" className="text-2xs text-subtle">
              LCP
            </Box>
            <Box as="dd" className="mt-0.5">
              {formatMs(result.metrics.lcp)}
            </Box>
          </Box>
          <Box>
            <Box as="dt" className="text-2xs text-subtle">
              TBT
            </Box>
            <Box as="dd" className="mt-0.5">
              {formatMs(result.metrics.tbt)}
            </Box>
          </Box>
          <Box>
            <Box as="dt" className="text-2xs text-subtle">
              CLS
            </Box>
            <Box as="dd" className="mt-0.5">
              {result.metrics.cls.toFixed(3)}
            </Box>
          </Box>
        </Box>
      </Row>
    </Box>
  );
}
