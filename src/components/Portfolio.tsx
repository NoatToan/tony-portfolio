import Image from "next/image";
import Link from "next/link";
import type { PortfolioContent } from "@/content";
import type { Project } from "@/content/types";
import { siteUrl } from "@/lib/site";
import { DomainIcon } from "./DomainIcon";
import { HeroItem, HeroStagger } from "./motion/HeroStagger";
import { PerformancePanel } from "./PerformancePanel";
import { ExternalLink, Section, TagList } from "./ui";

function ProjectImage({ image }: { image: NonNullable<Project["image"]> }) {
  if (image.kind === "phone") {
    return (
      <div className="w-24 shrink-0 transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:-rotate-3 motion-reduce:transform-none sm:w-28">
        <div className="rounded-[1.25rem] bg-fg p-1 shadow-sm">
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="112px"
            unoptimized
            className="aspect-[9/19.5] h-auto w-full rounded-[1rem] bg-bg"
          />
        </div>
      </div>
    );
  }
  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      sizes="(min-width: 720px) 656px, calc(100vw - 56px)"
      unoptimized
      className="aspect-[16/10] h-auto w-full rounded-lg bg-bg outline -outline-offset-1 outline-outline"
    />
  );
}

function ProjectBody({ project }: { project: Project }) {
  return (
    <div className="min-w-0 flex-1">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="font-medium">{project.name}</h3>
        {project.metric && (
          <p className="rounded-md bg-accent-soft px-2 py-0.5 font-mono text-2xs text-accent">
            {project.metric}
          </p>
        )}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted text-pretty">{project.description}</p>
      {project.role && <p className="mt-2 font-mono text-2xs text-subtle">{project.role}</p>}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <TagList items={project.stack} label={`${project.name} stack`} />
        {project.links.length > 0 && (
          <ul className="flex gap-4 text-sm">
            {project.links.map((link) => (
              <li key={link.href + link.label}>
                <ExternalLink href={link.href}>
                  {link.label}
                  <span className="sr-only"> for {project.name}</span>
                </ExternalLink>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export function Portfolio({ content }: { content: PortfolioContent }) {
  const { profile, summary, experience, projects, clients, domains, techStack, links, resumeUrl } =
    content;
  const socials = links.filter((l) => l.kind !== "email");
  const showLiveDot = content.slug === "fullstack";

  const countries = new Set(clients.map((c) => c.country).filter(Boolean)).size;
  const industries = new Set(clients.map((c) => c.industry)).size;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    description: profile.tagline,
    url: `${siteUrl}/${content.slug}`,
    email: `mailto:${profile.email}`,
    address: { "@type": "PostalAddress", addressLocality: profile.location },
    ...(profile.avatar ? { image: `${siteUrl}${profile.avatar.src}` } : {}),
    sameAs: socials.map((l) => l.href),
    knowsAbout: techStack.flatMap((g) => g.items.map((i) => i.name)),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <main id="main" className="mx-auto max-w-[42rem] px-5">
        {/* Hero */}
        <section aria-labelledby="hero-title" className="pb-14 pt-14 sm:pt-20">
          <HeroStagger>
            <HeroItem className="mb-6 flex items-center gap-4">
              {profile.avatar && (
                <Image
                  src={profile.avatar.src}
                  alt={profile.avatar.alt}
                  width={profile.avatar.width}
                  height={profile.avatar.height}
                  sizes="56px"
                  unoptimized
                  loading="eager"
                  fetchPriority="high"
                  className="size-14 rounded-full outline -outline-offset-1 outline-outline"
                />
              )}
              <p className="font-mono text-xs leading-relaxed text-accent">{profile.role}</p>
            </HeroItem>
            <HeroItem>
              <h1
                id="hero-title"
                className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl"
              >
                {profile.name}
              </h1>
            </HeroItem>
            <HeroItem>
              <p className="mt-5 max-w-[36rem] text-lg leading-relaxed text-muted text-pretty">
                {profile.tagline}
              </p>
            </HeroItem>
            <HeroItem>
              <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-subtle">
                <span>{profile.location}</span>
                {profile.availability && (
                  <>
                    <span aria-hidden="true">/</span>
                    <span className="inline-flex items-center gap-1.5">
                      <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
                      {profile.availability}
                    </span>
                  </>
                )}
              </p>
            </HeroItem>
            <HeroItem className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={resumeUrl}
                className="inline-flex min-h-hit items-center gap-2 rounded-md bg-fg px-4 text-sm font-medium text-bg transition-[opacity,transform] duration-150 ease-out hover:opacity-85 active:scale-[0.96]"
              >
                Download résumé
                <span className="font-mono text-2xs opacity-70">PDF</span>
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex min-h-hit items-center rounded-md border border-border px-4 text-sm transition-[color,border-color,transform] duration-150 ease-out hover:border-accent hover:text-accent active:scale-[0.96]"
              >
                Get in touch
              </a>
              <ul className="flex items-center gap-4 pl-1 text-sm text-muted">
                {socials.map((l) => (
                  <li key={l.href + l.label}>
                    <ExternalLink href={l.href}>{l.label}</ExternalLink>
                  </li>
                ))}
              </ul>
            </HeroItem>
          </HeroStagger>
        </section>

        <Section id="about" title="About" index={1}>
          <div className="space-y-4 leading-relaxed text-muted text-pretty">
            {summary.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Section>

        <Section id="experience" title="Experience" index={2}>
          <ol className="space-y-10">
            {experience.map((job) => (
              <li
                key={job.company + job.period}
                className="grid gap-2 sm:grid-cols-[8.5rem_1fr] sm:gap-6"
              >
                <p className="flex items-center gap-2 self-start pt-0.5 font-mono text-xs text-subtle">
                  {job.current && showLiveDot && (
                    <span className="live-dot relative size-1.5 shrink-0 rounded-full bg-good text-good">
                      <span className="sr-only">Current role</span>
                    </span>
                  )}
                  {job.period}
                </p>
                <div>
                  <h3 className="font-medium leading-snug">
                    {job.title}
                    <span className="text-subtle"> · </span>
                    {job.companyUrl ? (
                      <ExternalLink href={job.companyUrl} inline>
                        {job.company}
                      </ExternalLink>
                    ) : (
                      job.company
                    )}
                  </h3>
                  {job.location && <p className="mt-0.5 text-xs text-subtle">{job.location}</p>}
                  <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-muted">
                    {job.highlights.map((h) => (
                      <li key={h} className="relative pl-4">
                        <span
                          aria-hidden="true"
                          className="absolute left-0 top-[0.7em] h-px w-2 bg-subtle"
                        />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4">
                    <TagList items={job.stack} label={`Stack at ${job.company}`} />
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="clients" title="Clients" index={3}>
          <p className="mb-6 text-sm text-muted">
            Worked with <span className="tabular-nums text-fg">{clients.length}</span> clients across{" "}
            <span className="tabular-nums text-fg">{countries}</span>{" "}
            {countries === 1 ? "country" : "countries"} in{" "}
            <span className="tabular-nums text-fg">{industries}</span>{" "}
            {industries === 1 ? "industry" : "industries"}.
          </p>
          <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
            {clients.map((client) => {
              const body = (
                <>
                  {client.logo ? (
                    <Image
                      src={client.logo}
                      alt={`${client.name} logo`}
                      width={320}
                      height={56}
                      unoptimized
                      className="h-8 w-auto max-w-full opacity-70 grayscale transition-[filter,opacity] duration-200 ease-out group-hover:opacity-100 group-hover:grayscale-0"
                    />
                  ) : (
                    <p className="flex h-8 items-center font-medium">{client.name}</p>
                  )}
                  <p className="mt-3 font-mono text-2xs text-subtle">
                    {client.industry}
                    {client.country ? ` · ${client.country}` : ""}
                  </p>
                  <p className="mt-0.5 text-xs leading-snug text-muted">{client.engagement}</p>
                </>
              );
              return (
                <li key={client.name} className="group bg-bg p-4">
                  {client.url ? (
                    <a href={client.url} target="_blank" rel="noopener noreferrer" className="block">
                      {body}
                    </a>
                  ) : (
                    body
                  )}
                </li>
              );
            })}
          </ul>
        </Section>

        <Section id="projects" title="Selected projects" index={4}>
          <ul className="grid gap-4">
            {projects.map((project) => (
              <li key={project.name}>
                <article className="group rounded-2xl border border-border bg-card p-2 transition-[border-color] duration-200 ease-out hover:border-accent/50">
                  {project.image?.kind === "phone" ? (
                    <div className="flex gap-5 p-3">
                      <ProjectImage image={project.image} />
                      <ProjectBody project={project} />
                    </div>
                  ) : (
                    <>
                      {project.image && <ProjectImage image={project.image} />}
                      <div className="p-3 pt-4">
                        <ProjectBody project={project} />
                      </div>
                    </>
                  )}
                </article>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="domains" title="Domains" index={5}>
          <ul className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {domains.map((d) => (
              <li key={d.name} className="flex gap-3">
                <span className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-md border border-border text-muted">
                  <DomainIcon kind={d.icon} />
                </span>
                <div>
                  <h3 className="text-sm font-medium">{d.name}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted text-pretty">{d.description}</p>
                  {d.tags && d.tags.length > 0 && (
                    <p className="mt-1.5 font-mono text-2xs text-subtle">{d.tags.join(" · ")}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="stack" title="Tech stack" index={6}>
          <dl className="space-y-8">
            {techStack.map((group) => (
              <div key={group.label} className="grid gap-3 sm:grid-cols-[8.5rem_1fr] sm:gap-6">
                <dt className="font-mono text-xs text-subtle sm:pt-0.5">{group.label}</dt>
                <dd>
                  <ul className="space-y-3">
                    {group.items.map((item) => (
                      <li key={item.name}>
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="mt-0.5 text-sm leading-relaxed text-muted text-pretty">
                          {item.detail}
                        </p>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section id="performance" title="Performance" index={7}>
          <PerformancePanel path={`/${content.slug}`} />
        </Section>

        <Section id="contact" title="Contact" index={8}>
          <p className="max-w-[34rem] leading-relaxed text-muted text-pretty">
            Open to new opportunities. The fastest way to reach me is email — I usually reply
            within a day.
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-6 inline-flex min-h-hit items-center text-2xl font-medium tracking-tight underline decoration-border decoration-2 underline-offset-8 transition-[color,text-decoration-color] duration-150 ease-out hover:text-accent hover:decoration-accent sm:text-3xl"
          >
            {profile.email}
          </a>
          <ul className="mt-6 flex flex-wrap gap-x-6 text-sm text-muted">
            {socials.map((l) => (
              <li key={l.href + l.label}>
                <ExternalLink href={l.href}>{l.label}</ExternalLink>
              </li>
            ))}
            <li>
              <ExternalLink href={resumeUrl}>Résumé (PDF)</ExternalLink>
            </li>
          </ul>
        </Section>
      </main>

      <footer className="mx-auto max-w-[42rem] px-5">
        <p className="border-t border-border py-6 font-mono text-2xs text-subtle">
          {profile.name} · Built with Next.js & Tailwind CSS ·{" "}
          <Link href="/benchmark" className="inline-flex min-h-hit items-center underline-offset-4 hover:text-fg hover:underline">
            Benchmark
          </Link>
        </p>
      </footer>
    </>
  );
}
