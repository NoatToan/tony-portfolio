"use client";

import { m, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { springs } from "@/lib/motion";

type Item = { readonly id: string; readonly label: string };

/**
 * Section navigation with scroll progress.
 * ≥1024px: fixed right rail (ticks + labels + progress track + % counter).
 * <1024px: 2px top progress bar + a small floating section list.
 * Plain <a href="#id"> links, so it all works without JS.
 */
export function SectionRail({ items }: { items: readonly Item[] }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const sheetRef = useRef<HTMLDetailsElement>(null);

  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, springs.progress);
  const progress = reduce ? scrollYProgress : smooth;

  // Counter text is written straight to the DOM: no React re-render per frame.
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (counterRef.current) counterRef.current.textContent = `${Math.round(v * 100)}%`;
  });

  // Active section: the one crossing the viewport's middle band.
  useEffect(() => {
    const els = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  function go(e: MouseEvent<HTMLAnchorElement>, id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    history.pushState(null, "", `#${id}`);
    el.setAttribute("tabindex", "-1");
    el.focus({ preventScroll: true });
    setActive(id);
    if (sheetRef.current) sheetRef.current.open = false;
  }

  return (
    <>
      {/* Mobile/tablet: top progress bar */}
      <m.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-accent lg:hidden"
        style={{ scaleX: progress }}
      />

      {/* Desktop rail */}
      <nav
        aria-label="Sections"
        className="fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 lg:block"
      >
        <div className="relative pr-0.5">
          <span
            aria-hidden="true"
            className="absolute bottom-5 right-[0.3125rem] top-5 w-px bg-border"
          />
          <m.span
            aria-hidden="true"
            className="absolute bottom-5 right-[0.3125rem] top-5 w-px origin-top bg-accent"
            style={{ scaleY: progress }}
          />
          <ul className="relative flex flex-col">
            {items.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => go(e, item.id)}
                    aria-current={isActive ? "true" : undefined}
                    className="group flex min-h-hit items-center justify-end gap-3 rounded-sm"
                  >
                    <span
                      className={`font-mono text-2xs transition-[opacity,transform,color] duration-200 ease-out group-hover:translate-x-0 group-hover:text-fg group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 ${
                        isActive
                          ? "translate-x-0 text-muted opacity-100"
                          : "translate-x-1 text-subtle opacity-0"
                      }`}
                    >
                      {item.label}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`block h-px origin-right bg-current transition-[transform,color] duration-200 ease-out ${
                        isActive
                          ? "w-3 scale-x-100 text-accent"
                          : "w-3 scale-x-50 text-subtle group-hover:scale-x-100 group-hover:text-fg"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <p className="mt-4 text-right font-mono text-2xs tabular-nums text-subtle">
          <span ref={counterRef}>0%</span>
          <span className="sr-only"> of page read</span>
        </p>
      </nav>

      {/* Mobile/tablet: floating section list */}
      <details
        ref={sheetRef}
        className="group fixed bottom-4 right-4 z-40 lg:hidden [&_summary::-webkit-details-marker]:hidden"
      >
        <summary
          aria-label="Jump to section"
          className="ml-auto flex size-hit cursor-pointer list-none items-center justify-center rounded-full border border-border bg-bg/90 text-muted shadow-sm backdrop-blur-md transition-[color,transform] duration-150 ease-out hover:text-fg active:scale-[0.96]"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
            <path d="M4 7h16M4 12h10M4 17h13" />
          </svg>
        </summary>
        <nav
          aria-label="Sections"
          className="absolute bottom-14 right-0 w-52 rounded-xl border border-border bg-bg/95 p-1.5 shadow-lg backdrop-blur-md"
        >
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => go(e, item.id)}
                  aria-current={active === item.id ? "true" : undefined}
                  className={`flex min-h-hit items-center rounded-lg px-3 text-sm transition-[color,background-color] duration-150 ease-out hover:bg-accent-soft hover:text-fg ${
                    active === item.id ? "text-fg" : "text-muted"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </details>
    </>
  );
}
