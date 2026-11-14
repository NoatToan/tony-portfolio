"use client";

import { m } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { springs } from "@/lib/motion";

const VARIANTS = [
  { href: "/fullstack", label: "Full-stack" },
  { href: "/mobile", label: "Mobile" },
] as const;

export function VariantSwitcher() {
  const pathname = usePathname();

  return (
    <ul className="flex items-center gap-1" aria-label="Portfolio variant">
      {VARIANTS.map((v) => {
        const active = pathname === v.href;
        return (
          <li key={v.href} className="relative">
            <Link
              href={v.href}
              aria-current={active ? "page" : undefined}
              className={`relative inline-flex min-h-hit items-center px-2.5 text-sm transition-[color,transform] duration-150 ease-out active:scale-[0.96] ${
                active ? "text-fg" : "text-muted hover:text-fg"
              }`}
            >
              {v.label}
              {active && (
                <m.span
                  layoutId="variant-underline"
                  aria-hidden="true"
                  className="absolute inset-x-2.5 bottom-1.5 h-px bg-accent"
                  transition={springs.snappy}
                />
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
