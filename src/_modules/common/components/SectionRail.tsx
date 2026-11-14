'use client';

import { m, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from 'motion/react';
import { useEffect, useRef, useState, type MouseEvent, type Ref } from 'react';

import type { ESectionId } from '@/_modules/config/enums';
import { springs } from '@/_modules/config/motion';
import { routeLinks } from '@/_modules/config/routeLinks';
import { padIndex } from '@/_modules/common/utils/utilsString';

import BaseIcon from './BaseIcon';
import Box from './Box';
import TextPrimary from './TextPrimary';

const MENU_PATH = 'M4 7h16M4 12h10M4 17h13';

export interface SectionRailItem {
  readonly id: ESectionId;
  readonly label: string;
}

export interface SectionRailLabels {
  sectionsNav: string;
  jumpToSection: string;
  pageRead: string;
}

/**
 * Section navigation with scroll progress (docs/DECISIONS.md "Right rail labels").
 * ≥1024px: fixed right rail — every label always visible; the active one is larger, full
 * contrast and accent-coloured with a longer tick; a vertical track + "NN%" counter track
 * scroll. <1024px: 2px top progress bar + a small floating section list. Plain
 * `<a href="#id">` links, so it all works without JS.
 *
 * Translated strings arrive as `labels` props — i18next never ships to the client.
 */
export default function SectionRail({
  items,
  labels,
}: {
  items: readonly SectionRailItem[];
  labels: SectionRailLabels;
}) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<ESectionId | null>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const sheetRef = useRef<HTMLDetailsElement>(null);

  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, springs.progress);
  const progress = reduce ? scrollYProgress : smooth;

  // Counter text is written straight to the DOM: no React re-render per frame.
  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    if (counterRef.current) counterRef.current.textContent = `${Math.round(value * 100)}%`;
  });

  // Active section: the one crossing the viewport's middle band.
  useEffect(() => {
    const els = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as ESectionId);
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  return (
    <>
      {/* Mobile/tablet: top progress bar */}
      <m.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-accent lg:hidden"
        style={{ scaleX: progress }}
      />

      {/* Desktop rail */}
      <Box as="nav" aria-label={labels.sectionsNav} className="fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 lg:block">
        <Box className="relative pr-0.5">
          <Box as="span" aria-hidden="true" className="absolute bottom-5 right-[0.3125rem] top-5 w-px bg-border" />
          <m.span
            aria-hidden="true"
            className="absolute bottom-5 right-[0.3125rem] top-5 w-px origin-top bg-accent"
            style={{ scaleY: progress }}
          />
          <Box as="ul" className="relative flex flex-col">
            {items.map((item, index) => {
              const isActive = active === item.id;
              return (
                <Box as="li" key={item.id}>
                  <a
                    href={routeLinks.hash(item.id)}
                    onClick={(event: MouseEvent<HTMLAnchorElement>) => {
                      const el = document.getElementById(item.id);
                      if (!el) return;
                      event.preventDefault();
                      el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
                      history.pushState(null, '', routeLinks.hash(item.id));
                      el.setAttribute('tabindex', '-1');
                      el.focus({ preventScroll: true });
                      setActive(item.id);
                      if (sheetRef.current) sheetRef.current.open = false;
                    }}
                    aria-current={isActive ? 'true' : undefined}
                    className="group flex min-h-hit origin-right items-center justify-end gap-2 rounded-sm"
                  >
                    {/*
                      Decorative ordinal (docs/DECISIONS.md: "optional '01' index in mono"). The
                      section's order and name are already conveyed by DOM order and the label
                      text, so it is aria-hidden for screen readers — but it is still visible
                      pixels for sighted low-vision users, so it also stays at full `text-subtle`
                      (4.54:1 on `--bg`, just clears the 4.5:1 WCAG AA minimum): the previous
                      `/70`-opacity "inactive" treatment measured 2.65:1 and failed Lighthouse's
                      color-contrast audit.
                    */}
                    <TextPrimary
                      as="span"
                      aria-hidden="true"
                      className="font-mono text-2xs text-subtle transition-[transform] duration-200 ease-out"
                    >
                      {padIndex(index + 1)}
                    </TextPrimary>
                    <TextPrimary
                      as="span"
                      className={`origin-right whitespace-nowrap transition-[transform,color,font-weight] duration-200 ease-out group-hover:text-fg ${
                        isActive
                          ? 'scale-110 font-semibold text-accent'
                          : 'scale-100 text-xs text-muted'
                      }`}
                      style={{ fontSize: isActive ? undefined : '0.75rem' }}
                    >
                      {item.label}
                    </TextPrimary>
                    <Box
                      as="span"
                      aria-hidden="true"
                      className={`block h-px origin-right bg-current transition-[width,color] duration-200 ease-out ${
                        isActive ? 'w-5 text-accent' : 'w-2.5 text-subtle group-hover:text-fg'
                      }`}
                    />
                  </a>
                </Box>
              );
            })}
          </Box>
        </Box>
        <TextPrimary as="p" className="mt-4 text-right font-mono text-2xs tabular-nums text-subtle">
          {/* `Box`'s ref is typed HTMLElement; HTMLSpanElement is a DOM subtype, last-resort cast. */}
          <Box as="span" ref={counterRef as unknown as Ref<HTMLElement>}>
            0%
          </Box>
          <TextPrimary as="span" className="sr-only">
            {` ${labels.pageRead}`}
          </TextPrimary>
        </TextPrimary>
      </Box>

      {/* Mobile/tablet: floating section list */}
      <Box
        as="details"
        // `Box`'s ref is typed HTMLElement; HTMLDetailsElement is a DOM subtype, last-resort cast.
        ref={sheetRef as unknown as Ref<HTMLElement>}
        className="group fixed bottom-4 right-4 z-40 lg:hidden [&_summary::-webkit-details-marker]:hidden"
      >
        <Box
          as="summary"
          aria-label={labels.jumpToSection}
          className="ml-auto flex size-hit cursor-pointer list-none items-center justify-center rounded-full border border-border bg-bg/90 text-muted shadow-sm backdrop-blur-md transition-[color,transform] duration-150 ease-out hover:text-fg active:scale-[0.96]"
        >
          <BaseIcon path={MENU_PATH} className="size-4" />
        </Box>
        <Box
          as="nav"
          aria-label={labels.sectionsNav}
          className="absolute bottom-14 right-0 w-52 rounded-xl border border-border bg-bg/95 p-1.5 shadow-lg backdrop-blur-md"
        >
          <Box as="ul">
            {items.map((item) => (
              <Box as="li" key={item.id}>
                <a
                  href={routeLinks.hash(item.id)}
                  onClick={(event: MouseEvent<HTMLAnchorElement>) => {
                    const el = document.getElementById(item.id);
                    if (!el) return;
                    event.preventDefault();
                    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
                    history.pushState(null, '', routeLinks.hash(item.id));
                    el.setAttribute('tabindex', '-1');
                    el.focus({ preventScroll: true });
                    setActive(item.id);
                    if (sheetRef.current) sheetRef.current.open = false;
                  }}
                  aria-current={active === item.id ? 'true' : undefined}
                  className={`flex min-h-hit items-center rounded-lg px-3 text-sm transition-[color,background-color] duration-150 ease-out hover:bg-accent-soft hover:text-fg ${
                    active === item.id ? 'text-fg' : 'text-muted'
                  }`}
                >
                  {item.label}
                </a>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}
