import Link from "next/link";
import {
  benchmark,
  buildStatFor,
  formatDate,
  formatKb,
  formatMs,
  resultsFor,
  type LighthouseResult,
} from "@/lib/benchmark";
import { ScoreRing } from "./ScoreRing";
import { WebVitals } from "./WebVitals";

export function LighthouseRow({ result }: { result: LighthouseResult }) {
  const { scores, metrics } = result;
  return (
    <div className="grid gap-4 sm:grid-cols-[6rem_1fr] sm:items-center sm:gap-6">
      <p className="font-mono text-xs capitalize text-subtle">{result.formFactor}</p>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
        <div className="flex gap-4">
          <ScoreRing score={scores.performance} label="Perf" />
          <ScoreRing score={scores.accessibility} label="A11y" />
          <ScoreRing score={scores.bestPractices} label="Best pr." />
          <ScoreRing score={scores.seo} label="SEO" />
        </div>
        <dl className="grid grid-cols-3 gap-x-5 font-mono text-xs tabular-nums">
          <div>
            <dt className="text-2xs text-subtle">LCP</dt>
            <dd className="mt-0.5">{formatMs(metrics.lcp)}</dd>
          </div>
          <div>
            <dt className="text-2xs text-subtle">TBT</dt>
            <dd className="mt-0.5">{formatMs(metrics.tbt)}</dd>
          </div>
          <div>
            <dt className="text-2xs text-subtle">CLS</dt>
            <dd className="mt-0.5">{metrics.cls.toFixed(3)}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

export function PerformancePanel({ path }: { path: string }) {
  const results = resultsFor(path);
  const build = buildStatFor(path);

  return (
    <div className="space-y-10">
      {results.length > 0 && benchmark.measuredAt && benchmark.baseUrl ? (
        <div className="space-y-6">
          <p className="text-sm leading-relaxed text-muted text-pretty">
            Lighthouse {benchmark.lighthouseVersion} against the live production page, measured on{" "}
            <time dateTime={benchmark.measuredAt}>{formatDate(benchmark.measuredAt)}</time>
            {benchmark.runsPerPage > 1 ? ` (median of ${benchmark.runsPerPage} runs)` : ""}.
          </p>
          {results.map((r) => (
            <LighthouseRow key={r.formFactor} result={r} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted">
          Not measured yet. Run <code className="font-mono text-xs">npm run bench</code> after a
          production deploy.
        </p>
      )}

      {build && (
        <p className="font-mono text-xs text-subtle">
          First-load JS for this page:{" "}
          <span className="tabular-nums text-fg">{formatKb(build.firstLoadJsGzip)}</span> gzip ·{" "}
          {build.files} files
        </p>
      )}

      <div>
        <h3 className="mb-4 text-sm font-medium">
          Your visit <span className="font-mono text-2xs font-normal text-subtle">· live, from your browser</span>
        </h3>
        <WebVitals />
      </div>

      <Link
        href="/benchmark"
        className="inline-flex min-h-hit items-center gap-1 text-sm text-muted underline-offset-4 transition-[color] duration-150 ease-out hover:text-accent hover:underline"
      >
        Full benchmark and method →
      </Link>
    </div>
  );
}
