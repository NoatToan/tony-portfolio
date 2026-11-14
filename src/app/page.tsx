import Link from "next/link";
import { HeroItem, HeroStagger } from "@/components/motion/HeroStagger";
import { SiteHeader } from "@/components/SiteHeader";
import { ArrowUpRight } from "@/components/ui";
import { variants } from "@/content";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="mx-auto max-w-[42rem] px-5 pb-24 pt-16 sm:pt-24">
        <HeroStagger>
          <HeroItem>
            <p className="mb-4 font-mono text-xs text-accent">Software Engineer</p>
          </HeroItem>
          <HeroItem>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Tony Nguyen</h1>
          </HeroItem>
          <HeroItem>
            <p className="mt-5 max-w-[34rem] text-lg leading-relaxed text-muted text-pretty">
              Two focused versions of the same portfolio. Pick the one that matches the role
              you&apos;re hiring for.
            </p>
          </HeroItem>
          <HeroItem className="mt-12">
            <ul className="grid gap-4 sm:grid-cols-2">
              {variants.map((v) => (
                <li key={v.slug}>
                  <Link
                    href={`/${v.slug}`}
                    className="group flex h-full flex-col justify-between gap-8 rounded-xl border border-border bg-card p-5 transition-[border-color,transform] duration-200 ease-out hover:border-accent/60 active:scale-[0.98]"
                  >
                    <div>
                      <p className="font-mono text-2xs text-subtle">/{v.slug}</p>
                      <h2 className="mt-2 font-medium leading-snug">{v.profile.role}</h2>
                    </div>
                    <p className="inline-flex items-center gap-1 text-sm text-muted transition-[color] duration-150 ease-out group-hover:text-accent">
                      View portfolio
                      <ArrowUpRight className="size-3.5 rotate-45 transition-transform duration-150 ease-out group-hover:translate-x-0.5" />
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </HeroItem>
          <HeroItem>
            <p className="mt-10 font-mono text-2xs text-subtle">
              <Link href="/benchmark" className="inline-flex min-h-hit items-center underline-offset-4 hover:text-fg hover:underline">
                Performance benchmark →
              </Link>
            </p>
          </HeroItem>
        </HeroStagger>
      </main>
    </>
  );
}
