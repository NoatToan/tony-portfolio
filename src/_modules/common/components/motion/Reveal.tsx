'use client';

import { useReducedMotion } from 'motion/react';
import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';

import { motionTokens } from '@/_modules/config/motion';

/*
 * Section reveal on scroll, once. The server output is fully visible (and so is the first client
 * render). After hydration, only sections still below the fold are moved to the hidden state,
 * then revealed when they enter the viewport. Sections already on screen never flash, content is
 * readable without JS, and there is no layout shift (transform/opacity only). Equivalent to
 * whileInView + viewport.once, but driven by IntersectionObserver and the Web Animations API so
 * no hidden state is ever server-rendered.
 */
export function Reveal({
  as: Tag = 'section',
  children,
  className,
  style,
  ...rest
}: {
  as?: 'section' | 'div';
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  id?: string;
  'aria-labelledby'?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    const hidden = `translateY(${motionTokens.distance.md}px)`;
    el.style.opacity = '0';
    el.style.transform = hidden;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();
        const anim = el.animate(
          { opacity: [0, 1], transform: [hidden, 'translateY(0px)'] },
          {
            duration: motionTokens.duration.slow * 1000,
            easing: `cubic-bezier(${motionTokens.easing.out.join(',')})`,
            fill: 'backwards',
          },
        );
        el.style.opacity = '';
        el.style.transform = '';
        anim.play();
      },
      { rootMargin: '0px 0px -10% 0px' },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      el.style.opacity = '';
      el.style.transform = '';
    };
  }, [reduce]);

  return (
    <Tag ref={ref as never} className={className} style={style} {...rest}>
      {children}
    </Tag>
  );
}
