import type { ReactNode } from "react";
import { Reveal } from "./motion/Reveal";

export function ArrowUpRight({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <li className="rounded-full border border-border px-2.5 py-0.5 font-mono text-2xs leading-5 text-muted">
      {children}
    </li>
  );
}

export function TagList({ items, label }: { items: string[]; label: string }) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <Tag key={item}>{item}</Tag>
      ))}
    </ul>
  );
}

export function ExternalLink({
  href,
  children,
  className = "",
  inline = false,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  /** In-text links keep line height; standalone links get a 44px hit area. */
  inline?: boolean;
}) {
  const external = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group inline-flex items-center gap-1 underline-offset-4 ${inline ? "" : "min-h-hit"} transition-[color] duration-150 ease-out hover:text-accent hover:underline ${className}`}
    >
      {children}
      {external && (
        <>
          <ArrowUpRight className="size-3.5 opacity-60 transition-transform duration-150 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          <span className="sr-only">(opens in a new tab)</span>
        </>
      )}
    </a>
  );
}

export function Section({
  id,
  title,
  index,
  children,
}: {
  id: string;
  title: string;
  index: number;
  children: ReactNode;
}) {
  return (
    <Reveal id={id} aria-labelledby={`${id}-title`} className="border-t border-border py-14">
      <h2
        id={`${id}-title`}
        className="mb-8 font-mono text-xs uppercase tracking-[0.18em] text-subtle"
      >
        <span className="text-accent">{String(index).padStart(2, "0")}</span>
        <span aria-hidden="true"> · </span>
        {title}
      </h2>
      {children}
    </Reveal>
  );
}
