import type { Metadata } from "next";
import { LighthouseRow } from "@/components/PerformancePanel";
import { SiteHeader } from "@/components/SiteHeader";
import { WebVitals } from "@/components/WebVitals";
import { Section } from "@/components/ui";
import { benchmark, formatDate, formatKb, formatMs } from "@/lib/benchmark";

const title = "Performance benchmark — Tony Nguyen";
const description =
  "Measured Lighthouse scores, Core Web Vitals and first-load JavaScript for every page of this portfolio.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/benchmark" },
  openGraph: { title, description, url: "/benchmark" },
  twitter: { title, description },
};

const PAGES = ["/", "/fullstack", "/mobile"];

export default function BenchmarkPage() {
  const measured = benchmark.measuredAt && benchmark.baseUrl;

  return (
    <>
      <SiteHeader />
      <main id="main" className="mx-auto max-w-[42rem] px-5 pb-16">
        <section aria-labelledby="bench-title" className="pb-12 pt-14 sm:pt-20">
          <p className="mb-4 font-mono text-xs text-accent">/benchmark</p>
          <h1 id="bench-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Performance benchmark
          </h1>
          <p className="mt-5 leading-relaxed text-muted text-pretty">
            Every number on this page is measured, none are typed in by hand. Lighthouse runs against
            the live production site, bundle sizes come from the production build, and the live panel
            reads your own browser&apos;s Web Vitals.
          </p>
          {measured ? (
            <p className="mt-4 font-mono text-xs text-subtle">
              Measured on <time dateTime={benchmark.measuredAt!}>{formatDate(benchmark.measuredAt!)}</time>{" "}
              against <span className="text-fg">{benchmark.baseUrl}</span> · Lighthouse{" "}
              {benchmark.lighthouseVersion} · median of {benchmark.runsPerPage} runs
            </p>
          ) : (
            <p className="mt-4 font-mono text-xs text-subtle">Not measured yet. Run npm run bench.</p>
          )}
        </section>

        <Section id="lighthouse" title="Lighthouse" index={1}>
          {measured ? (
            <div className="space-y-12">
              {PAGES.map((path) => {
                const rows = benchmark.pages.filter((p) => p.path === path);
                if (rows.length === 0) return null;
                return (
                  <div key={path}>
                    <h3 className="mb-5 font-mono text-sm">{path}</h3>
                    <div className="space-y-6">
                      {rows.map((r) => (
                        <LighthouseRow key={r.formFactor} result={r} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-muted">No results yet.</p>
          )}
        </Section>

        {measured && (
          <Section id="metrics" title="Lab metrics" index={2}>
            <div className="-mx-5 overflow-x-auto px-5">
              <table className="w-full min-w-[34rem] text-left font-mono text-xs tabular-nums">
                <caption className="sr-only">Lighthouse lab metrics per page and device</caption>
                <thead className="text-subtle">
                  <tr className="border-b border-border">
                    <th scope="col" className="py-2 pr-3 font-normal">Page</th>
                    <th scope="col" className="py-2 pr-3 font-normal">Device</th>
                    <th scope="col" className="py-2 pr-3 text-right font-normal">FCP</th>
                    <th scope="col" className="py-2 pr-3 text-right font-normal">LCP</th>
                    <th scope="col" className="py-2 pr-3 text-right font-normal">TBT</th>
                    <th scope="col" className="py-2 pr-3 text-right font-normal">CLS</th>
                    <th scope="col" className="py-2 text-right font-normal">SI</th>
                  </tr>
                </thead>
                <tbody>
                  {benchmark.pages.map((r) => (
                    <tr key={r.path + r.formFactor} className="border-b border-border/60">
                      <td className="py-2 pr-3">{r.path}</td>
                      <td className="py-2 pr-3 capitalize text-muted">{r.formFactor}</td>
                      <td className="py-2 pr-3 text-right">{formatMs(r.metrics.fcp)}</td>
                      <td className="py-2 pr-3 text-right">{formatMs(r.metrics.lcp)}</td>
                      <td className="py-2 pr-3 text-right">{formatMs(r.metrics.tbt)}</td>
                      <td className="py-2 pr-3 text-right">{r.metrics.cls.toFixed(3)}</td>
                      <td className="py-2 text-right">{formatMs(r.metrics.si)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        )}

        <Section id="bundle" title="First-load JavaScript" index={3}>
          {benchmark.build ? (
            <>
              <ul className="space-y-2 font-mono text-xs tabular-nums">
                {benchmark.build.routes.map((r) => (
                  <li key={r.path} className="flex items-baseline justify-between gap-4 border-b border-border/60 pb-2">
                    <span>{r.path}</span>
                    <span>
                      <span className="text-fg">{formatKb(r.firstLoadJsGzip)}</span>
                      <span className="text-subtle"> gzip · {formatKb(r.firstLoadJsRaw)} raw · {r.files} files</span>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs leading-relaxed text-subtle">
                Sum of the JavaScript files referenced by each prerendered page, from a Next.js{" "}
                {benchmark.build.nextVersion} production build on {formatDate(benchmark.build.measuredAt)}.
              </p>
            </>
          ) : (
            <p className="text-sm text-muted">No build stats yet.</p>
          )}
        </Section>

        <Section id="live" title="Your visit" index={4}>
          <p className="mb-6 text-sm leading-relaxed text-muted">
            Real-user metrics from this page load in your browser, colour-coded against Google&apos;s
            Core Web Vitals thresholds.
          </p>
          <WebVitals />
        </Section>

        <Section id="method" title="Method" index={5}>
          <ul className="space-y-2 text-sm leading-relaxed text-muted">
            <li>Lighthouse CLI in headless Chrome, default mobile (simulated slow 4G, 4× CPU) and desktop presets.</li>
            <li>Each page and device is run several times, and the run with the median performance score is kept.</li>
            <li>Pages are static HTML served from Vercel&apos;s edge network, with no client-side data fetching.</li>
            <li>Reproduce with <code className="font-mono text-xs">npm run bench</code>.</li>
          </ul>
        </Section>
      </main>
    </>
  );
}
