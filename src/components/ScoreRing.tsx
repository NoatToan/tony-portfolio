import { scoreTone } from "@/lib/benchmark";

const STROKE = { good: "stroke-good", ok: "stroke-ok", poor: "stroke-poor" } as const;
const TEXT = { good: "text-good", ok: "text-ok", poor: "text-poor" } as const;

export function ScoreRing({ score, label, size = 44 }: { score: number; label: string; size?: number }) {
  const r = 16;
  const c = 2 * Math.PI * r;
  const tone = scoreTone(score);
  return (
    <figure className="flex flex-col items-center gap-1.5">
      <div className="relative" style={{ width: `${size / 16}rem`, height: `${size / 16}rem` }}>
        <svg viewBox="0 0 40 40" className="size-full -rotate-90" aria-hidden="true">
          <circle cx="20" cy="20" r={r} fill="none" strokeWidth="3" className="stroke-border" />
          <circle
            cx="20"
            cy="20"
            r={r}
            fill="none"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={`${(score / 100) * c} ${c}`}
            className={STROKE[tone]}
          />
        </svg>
        <span
          className={`absolute inset-0 flex items-center justify-center font-mono text-xs font-medium tabular-nums ${TEXT[tone]}`}
        >
          {score}
        </span>
      </div>
      <figcaption className="text-center font-mono text-2xs leading-tight text-subtle">
        <span className="sr-only">{`${label} score ${score} of 100`}</span>
        <span aria-hidden="true">{label}</span>
      </figcaption>
    </figure>
  );
}
