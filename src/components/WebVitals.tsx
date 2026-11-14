"use client";

import { useReportWebVitals } from "next/web-vitals";
import { useCallback, useState } from "react";

type Name = "TTFB" | "FCP" | "LCP" | "CLS" | "INP";

const ORDER: { name: Name; good: number; poor: number; hint: string }[] = [
  { name: "TTFB", good: 800, poor: 1800, hint: "time to first byte" },
  { name: "FCP", good: 1800, poor: 3000, hint: "first contentful paint" },
  { name: "LCP", good: 2500, poor: 4000, hint: "final after first click/keypress" },
  { name: "CLS", good: 0.1, poor: 0.25, hint: "final when the tab is hidden" },
  { name: "INP", good: 200, poor: 500, hint: "needs an interaction" },
];

const TONE = {
  good: "bg-good",
  ok: "bg-ok",
  poor: "bg-poor",
} as const;

function format(name: Name, value: number) {
  if (name === "CLS") return value.toFixed(3);
  return value >= 1000 ? `${(value / 1000).toFixed(2)} s` : `${Math.round(value)} ms`;
}

/** Shows this visitor's own Core Web Vitals as the browser reports them. */
export function WebVitals() {
  const [values, setValues] = useState<Partial<Record<Name, number>>>({});

  const report = useCallback((metric: { name: string; value: number }) => {
    if (!ORDER.some((o) => o.name === metric.name)) return;
    setValues((prev) => ({ ...prev, [metric.name]: metric.value }));
  }, []);
  useReportWebVitals(report);

  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-5" aria-live="polite">
      {ORDER.map(({ name, good, poor, hint }) => {
        const v = values[name];
        const tone = v === undefined ? null : v <= good ? "good" : v <= poor ? "ok" : "poor";
        return (
          <div key={name}>
            <dt className="flex items-center gap-1.5 font-mono text-2xs text-subtle">
              <span
                aria-hidden="true"
                className={`size-1.5 rounded-full ${tone ? TONE[tone] : "bg-border"}`}
              />
              {name}
            </dt>
            <dd className="mt-1 font-mono text-sm tabular-nums">
              {v === undefined ? <span className="text-subtle">—</span> : format(name, v)}
              {tone && <span className="sr-only"> ({tone})</span>}
            </dd>
            {v === undefined && <dd className="mt-0.5 text-2xs leading-tight text-subtle">{hint}</dd>}
          </div>
        );
      })}
    </dl>
  );
}
