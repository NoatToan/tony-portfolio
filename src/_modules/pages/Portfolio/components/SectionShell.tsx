import type { ReactNode } from 'react';

import { Reveal } from '@/_modules/common/components/motion/Reveal';
import TextPrimary from '@/_modules/common/components/TextPrimary';
import type { ESectionId } from '@/_modules/config/enums';
import { padIndex } from '@/_modules/common/utils/utilsString';

/** One portfolio section: numbered mono heading + a scroll-reveal wrapper, per docs/DECISIONS.md. */
export default function SectionShell({
  id,
  title,
  index,
  children,
}: {
  id: ESectionId;
  title: string;
  index: number;
  children: ReactNode;
}) {
  return (
    <Reveal id={id} aria-labelledby={`${id}-title`} className="border-t border-border py-14">
      <TextPrimary
        as="h2"
        id={`${id}-title`}
        className="mb-8 font-mono text-xs uppercase tracking-[0.18em] text-subtle"
      >
        <TextPrimary as="span" className="text-accent">
          {padIndex(index)}
        </TextPrimary>
        <TextPrimary as="span" aria-hidden="true">
          {' · '}
        </TextPrimary>
        {title}
      </TextPrimary>
      {children}
    </Reveal>
  );
}
