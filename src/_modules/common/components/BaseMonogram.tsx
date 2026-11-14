import { cx } from '@/_modules/common/utils/utilsClassNames';

import Row from './Row';
import TextPrimary from './TextPrimary';

function initialsOf(label: string) {
  return label
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

/** Fallback for a logo that does not exist yet — never a fake brand mark. */
export default function BaseMonogram({ label, className = 'size-8' }: { label: string; className?: string }) {
  return (
    <Row
      className={cx(
        'shrink-0 items-center justify-center rounded-full border border-border text-muted',
        className,
      )}
    >
      <TextPrimary as="span" className="font-mono text-2xs font-medium">
        {initialsOf(label)}
      </TextPrimary>
    </Row>
  );
}
