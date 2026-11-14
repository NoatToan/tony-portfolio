import { EScoreTone } from '@/_modules/config/enums';
import { SCORE_BANDS } from '@/_modules/config/site';

export function formatKb(bytes: number) {
  return `${(bytes / 1024).toFixed(1)} kB`;
}

export function formatMs(ms: number) {
  return ms >= 1000 ? `${(ms / 1000).toFixed(2)} s` : `${Math.round(ms)} ms`;
}

export function scoreTone(score: number) {
  if (score >= SCORE_BANDS.good) return EScoreTone.GOOD;
  return score >= SCORE_BANDS.ok ? EScoreTone.OK : EScoreTone.POOR;
}

/**
 * `yearMonth` is normally a fixed "YYYY-MM" string — deterministic on server and client. A
 * plain "YYYY" (no month) renders as-is: some source material (e.g. a CV certification) only
 * gives the year, and inventing a month would be a fabricated detail.
 */
export function formatYearMonth(yearMonth: string) {
  if (!yearMonth.includes('-')) return yearMonth;
  const [year, month] = yearMonth.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, 1)).toLocaleDateString('en-GB', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
