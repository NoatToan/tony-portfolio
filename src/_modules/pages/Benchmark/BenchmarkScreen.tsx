import BaseLink from '@/_modules/common/components/BaseLink';
import LighthouseRow from '@/_modules/common/components/LighthouseRow';
import Box from '@/_modules/common/components/Box';
import SiteHeader from '@/_modules/common/components/SiteHeader';
import TextPrimary from '@/_modules/common/components/TextPrimary';
import WebVitals from '@/_modules/common/components/WebVitals';
import { EBenchmarkSectionId, EVitalName } from '@/_modules/config/enums';
import { routeLinks } from '@/_modules/config/routeLinks';
import { REPO_URL } from '@/_modules/config/site';
import { formatKb, formatMs } from '@/_modules/common/utils/utilsFormat';
import { t } from '@/_modules/i18next/i18n';
import { benchmark, formatMeasuredDate } from '@/_modules/server/benchmark/benchmark';
import { variants } from '@/_modules/server/content';

import BenchmarkSectionShell from './components/BenchmarkSectionShell';

const PAGES = [routeLinks.home, ...variants.map((variant) => routeLinks.variant(variant.slug))];

export default function BenchmarkScreen() {
  const measured = Boolean(benchmark.measuredAt && benchmark.baseUrl);

  return (
    <>
      <SiteHeader />
      <Box as="main" id="main" className="mx-auto max-w-[42rem] px-5 pb-16">
        <Box as="section" aria-labelledby="bench-title" className="pb-12 pt-14 sm:pt-20">
          <TextPrimary as="p" className="mb-4 font-mono text-xs text-accent">
            {routeLinks.benchmark}
          </TextPrimary>
          <TextPrimary as="h1" id="bench-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {t('benchmark.title')}
          </TextPrimary>
          <TextPrimary as="p" className="mt-5 leading-relaxed text-muted text-pretty">
            {t('benchmark.lead')}
          </TextPrimary>
          <TextPrimary as="p" className="mt-3 text-sm text-muted">
            {`${t('benchmark.sourceLead')} `}
            <BaseLink href={REPO_URL} inline>
              {t('benchmark.sourceLink')}
            </BaseLink>
          </TextPrimary>
          <TextPrimary as="p" className="mt-4 font-mono text-xs text-subtle">
            {measured && benchmark.measuredAt
              ? t('benchmark.measuredOn', {
                  date: formatMeasuredDate(benchmark.measuredAt),
                  url: benchmark.baseUrl,
                  version: benchmark.lighthouseVersion,
                  runs: benchmark.runsPerPage,
                })
              : t('benchmark.notMeasured')}
          </TextPrimary>
        </Box>

        <BenchmarkSectionShell id={EBenchmarkSectionId.LIGHTHOUSE} title={t('benchmark.lighthouse')} index={1}>
          {measured ? (
            <Box className="space-y-12">
              {PAGES.map((path) => {
                const rows = benchmark.pages.filter((page) => page.path === path);
                if (rows.length === 0) return null;
                return (
                  <Box key={path}>
                    <TextPrimary as="h3" className="mb-5 font-mono text-sm">
                      {path}
                    </TextPrimary>
                    <Box className="space-y-6">
                      {rows.map((row) => (
                        <LighthouseRow key={row.formFactor} result={row} />
                      ))}
                    </Box>
                  </Box>
                );
              })}
            </Box>
          ) : (
            <TextPrimary as="p" className="text-sm text-muted">
              {t('benchmark.noResults')}
            </TextPrimary>
          )}
        </BenchmarkSectionShell>

        {measured && (
          <BenchmarkSectionShell id={EBenchmarkSectionId.METRICS} title={t('benchmark.metrics')} index={2}>
            <Box className="-mx-5 overflow-x-auto px-5">
              <Box as="table" className="w-full min-w-[34rem] text-left font-mono text-xs tabular-nums">
                <Box as="caption" className="sr-only">
                  {t('benchmark.metricsCaption')}
                </Box>
                <Box as="thead" className="text-subtle">
                  <Box as="tr" className="border-b border-border">
                    <Box as="th" scope="col" className="py-2 pr-3 font-normal">
                      {t('benchmark.page')}
                    </Box>
                    <Box as="th" scope="col" className="py-2 pr-3 font-normal">
                      {t('benchmark.device')}
                    </Box>
                    <Box as="th" scope="col" className="py-2 pr-3 text-right font-normal">
                      FCP
                    </Box>
                    <Box as="th" scope="col" className="py-2 pr-3 text-right font-normal">
                      LCP
                    </Box>
                    <Box as="th" scope="col" className="py-2 pr-3 text-right font-normal">
                      TBT
                    </Box>
                    <Box as="th" scope="col" className="py-2 pr-3 text-right font-normal">
                      CLS
                    </Box>
                    <Box as="th" scope="col" className="py-2 text-right font-normal">
                      SI
                    </Box>
                  </Box>
                </Box>
                <Box as="tbody">
                  {benchmark.pages.map((row) => (
                    <Box as="tr" key={row.path + row.formFactor} className="border-b border-border/60">
                      <Box as="td" className="py-2 pr-3">
                        {row.path}
                      </Box>
                      <Box as="td" className="py-2 pr-3 capitalize text-muted">
                        {row.formFactor}
                      </Box>
                      <Box as="td" className="py-2 pr-3 text-right">
                        {formatMs(row.metrics.fcp)}
                      </Box>
                      <Box as="td" className="py-2 pr-3 text-right">
                        {formatMs(row.metrics.lcp)}
                      </Box>
                      <Box as="td" className="py-2 pr-3 text-right">
                        {formatMs(row.metrics.tbt)}
                      </Box>
                      <Box as="td" className="py-2 pr-3 text-right">
                        {row.metrics.cls.toFixed(3)}
                      </Box>
                      <Box as="td" className="py-2 text-right">
                        {formatMs(row.metrics.si)}
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </BenchmarkSectionShell>
        )}

        <BenchmarkSectionShell id={EBenchmarkSectionId.BUNDLE} title={t('benchmark.bundle')} index={3}>
          {benchmark.build ? (
            <>
              <Box as="ul" className="space-y-2 font-mono text-xs tabular-nums">
                {benchmark.build.routes.map((route) => (
                  <Box
                    as="li"
                    key={route.path}
                    className="flex items-baseline justify-between gap-4 border-b border-border/60 pb-2"
                  >
                    <TextPrimary as="span">{route.path}</TextPrimary>
                    <TextPrimary as="span" className="text-subtle">
                      {t('benchmark.bundleRow', {
                        gzip: formatKb(route.firstLoadJsGzip),
                        raw: formatKb(route.firstLoadJsRaw),
                        files: route.files,
                      })}
                    </TextPrimary>
                  </Box>
                ))}
              </Box>
              <TextPrimary as="p" className="mt-4 text-xs leading-relaxed text-subtle">
                {t('benchmark.bundleNote', {
                  version: benchmark.build.nextVersion,
                  date: formatMeasuredDate(benchmark.build.measuredAt),
                })}
              </TextPrimary>
            </>
          ) : (
            <TextPrimary as="p" className="text-sm text-muted">
              {t('benchmark.noBuild')}
            </TextPrimary>
          )}
        </BenchmarkSectionShell>

        <BenchmarkSectionShell id={EBenchmarkSectionId.LIVE} title={t('benchmark.live')} index={4}>
          <TextPrimary as="p" className="mb-6 text-sm leading-relaxed text-muted">
            {t('benchmark.liveLead')}
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
        </BenchmarkSectionShell>

        <BenchmarkSectionShell id={EBenchmarkSectionId.METHOD} title={t('benchmark.method')} index={5}>
          <Box as="ul" className="space-y-2 text-sm leading-relaxed text-muted">
            <Box as="li">{t('benchmark.method1')}</Box>
            <Box as="li">{t('benchmark.method2')}</Box>
            <Box as="li">{t('benchmark.method3')}</Box>
            <Box as="li">{t('benchmark.method4')}</Box>
          </Box>
        </BenchmarkSectionShell>
      </Box>
    </>
  );
}
