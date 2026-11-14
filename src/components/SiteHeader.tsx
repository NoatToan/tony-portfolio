import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { VariantSwitcher } from "./VariantSwitcher";

export const SECTION_NAV = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "clients", label: "Clients" },
  { id: "projects", label: "Projects" },
  { id: "domains", label: "Domains" },
  { id: "stack", label: "Tech Stack" },
  { id: "performance", label: "Performance" },
  { id: "contact", label: "Contact" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[42rem] items-center justify-between gap-2 px-5">
        <nav aria-label="Site" className="flex items-center gap-3">
          <Link
            href="/"
            aria-label="Tony Nguyen, home"
            className="group -ml-1.5 inline-flex size-hit items-center justify-center transition-transform duration-150 ease-out active:scale-[0.96]"
          >
            <span className="inline-flex size-8 items-center justify-center rounded-md border border-border font-mono text-2xs font-medium text-fg transition-[border-color] duration-150 ease-out group-hover:border-accent">
              TN
            </span>
          </Link>
          <VariantSwitcher />
        </nav>
        <div className="-mr-2.5">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
