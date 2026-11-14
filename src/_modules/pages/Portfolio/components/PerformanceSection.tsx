import Link from 'next/link';

import LighthouseRow from '@/_modules/common/components/LighthouseRow';
import Box from '@/_modules/common/components/Box';
import Col from '@/_modules/common/components/Col';
import TextPrimary from '@/_modules/common/components/TextPrimary';
import WebVitals from '@/_modules/common/components/WebVitals';
import { ESectionId, EVitalName } from '@/_modules/config/enums';
import { routeLinks } from '@/_modules/config/routeLinks';
import { SECTION_ORDER } from '@/_modules/config/sectionOrder';
import { formatKb } from '@/_modules/common/utils/utilsFormat';
import { t } from '@/_modules/i18next/i18n';
import { benchmark, buildStatFor, formatMeasuredDate, resultsFor } from '@/_modules/server/benchmark/benchmark';

import SectionShell from './SectionShell';

export default function PerformanceSection({ path }: { path: string }) {
  const results = resultsFor(path);
  const build = buildStatFor(path);
  const measured = results.length > 0 && benchmark.measuredAt && benchmark.baseUrl;

  return (
    <SectionShell
      id={ESectionId.PERFORMANCE}
      title={t('section.performance')}
      index={SECTION_ORDER.indexOf(ESectionId.PERFORMANCE) + 1}
    >
      <Col className="gap-10">
        {measured && benchmark.measuredAt ? (
          <Col className="gap-6">
            <TextPrimary as="p" className="text-sm leading-relaxed text-muted text-pretty">
              {t('performance.measured', {
                version: benchmark.lighthouseVersion,
                date: formatMeasuredDate(benchmark.measuredAt),
                runs: benchmark.runsPerPage,
              })}
            </TextPrimary>
            {results.map((result) => (
              <LighthouseRow key={result.formFactor} result={result} />
            ))}
          </Col>
        ) : (
          <TextPrimary as="p" className="text-sm text-muted">
            {t('performance.notMeasured')}
          </TextPrimary>
        )}

        {build && (
          <TextPrimary as="p" className="font-mono text-xs text-subtle">
            {t('performance.firstLoad', { size: formatKb(build.firstLoadJsGzip), files: build.files })}
          </TextPrimary>
        )}

        <Box>
          <TextPrimary as="h3" className="mb-4 text-sm font-medium">
            {t('performance.yourVisit')}
            <TextPrimary as="span" className="font-mono text-2xs font-normal text-subtle">
              {` · ${t('performance.yourVisitHint')}`}
            </TextPrimary>
          </TextPrimary>
          <WebVitals
            labels={{
              hints: {
                [EVitalName.TTFB]: t('performance.hintTtfb'),
                [EVitalName.FCP]: t('performance.hintFcp'),
                [EVitalName.LCP]: t('performance.hintLcp'),
                [EVitalName.CLS]: t('performance.hintCls'),
                [EVitalName.INP]: t('performance.hintInp'),
              },
              toneGood: t('performance.toneGood'),
              toneOk: t('performance.toneOk'),
              tonePoor: t('performance.tonePoor'),
            }}
          />
        </Box>

        <Link
          href={routeLinks.benchmark}
          className="inline-flex min-h-hit items-center gap-1 text-sm text-muted underline-offset-4 transition-[color] duration-150 ease-out hover:text-accent hover:underline"
        >
          {t('performance.fullLink')}
        </Link>
      </Col>
    </SectionShell>
  );
}
