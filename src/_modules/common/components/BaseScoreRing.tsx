import { EScoreTone } from '@/_modules/config/enums';
import { scoreTone } from '@/_modules/common/utils/utilsFormat';
import { t } from '@/_modules/i18next/i18n';

import Col from './Col';
import Row from './Row';
import TextPrimary from './TextPrimary';

const STROKE: Record<EScoreTone, string> = {
  [EScoreTone.GOOD]: 'stroke-good',
  [EScoreTone.OK]: 'stroke-ok',
  [EScoreTone.POOR]: 'stroke-poor',
};
const TEXT: Record<EScoreTone, string> = {
  [EScoreTone.GOOD]: 'text-good',
  [EScoreTone.OK]: 'text-ok',
  [EScoreTone.POOR]: 'text-poor',
};

const RADIUS = 16;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function BaseScoreRing({ score, label }: { score: number; label: string }) {
  const tone = scoreTone(score);

  return (
    <Col as="figure" className="items-center gap-1.5">
      <Row className="relative size-11">
        <svg viewBox="0 0 40 40" className="size-full -rotate-90" aria-hidden="true">
          <circle cx="20" cy="20" r={RADIUS} fill="none" strokeWidth="3" className="stroke-border" />
          <circle
            cx="20"
            cy="20"
            r={RADIUS}
            fill="none"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={`${(score / 100) * CIRCUMFERENCE} ${CIRCUMFERENCE}`}
            className={STROKE[tone]}
          />
        </svg>
        <TextPrimary
          as="span"
          className={`absolute inset-0 flex items-center justify-center font-mono text-xs font-medium tabular-nums ${TEXT[tone]}`}
        >
          {score}
        </TextPrimary>
      </Row>
      <TextPrimary as="span" className="text-center font-mono text-2xs leading-tight text-subtle">
        <TextPrimary as="span" className="sr-only">
          {t('performance.scoreLabel', { label, score })}
        </TextPrimary>
        <TextPrimary as="span" aria-hidden="true">
          {label}
        </TextPrimary>
      </TextPrimary>
    </Col>
  );
}
