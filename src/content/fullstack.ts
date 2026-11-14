import { sharedClients, sharedDomains, sharedTechStack } from "./shared";
import type { PortfolioContent } from "./types";

// PLACEHOLDER CONTENT — replace every field with real details before publishing.
export const fullstack: PortfolioContent = {
  slug: "fullstack",
  variantLabel: "Full-stack · Node.js + React/Next.js",
  meta: {
    title: "Tony Nguyen — Full-stack Engineer (Node.js + React/Next.js)",
    description:
      "Full-stack engineer building reliable Node.js backends and fast React/Next.js frontends. Placeholder portfolio.",
  },
  profile: {
    name: "Tony Nguyen",
    avatar: { src: "/images/avatar.svg", alt: "Placeholder monogram avatar for Tony Nguyen", width: 160, height: 160 },
    role: "Full-stack Engineer — Node.js (BE) + React/Next.js (FE)",
    tagline:
      "I build typed, well-tested web products end to end — from API design and data models to accessible, fast interfaces.",
    location: "Ho Chi Minh City, Vietnam",
    availability: "Open to full-time & contract roles",
    email: "hello@example.com",
  },
  summary: [
    "Placeholder about text. I'm a full-stack engineer with N+ years shipping production web apps. On the backend I design REST and GraphQL APIs in Node.js/TypeScript with PostgreSQL; on the frontend I build with React and Next.js, caring about performance budgets and accessibility.",
    "I like owning features end to end: talking to users, shaping the data model, writing the tests, and watching the metrics after release.",
    "Outside work I tinker with developer tooling and write short notes on what I learn.",
  ],
  experience: [
    {
      company: "Company A (placeholder)",
      companyUrl: "https://example.com",
      title: "Senior Full-stack Engineer",
      period: "2023 — Present",
      current: true,
      location: "Remote",
      highlights: [
        "Placeholder: cut p95 API latency by 45% by introducing query batching and Redis caching.",
        "Placeholder: led migration from Pages Router to App Router across 40+ routes with zero downtime.",
        "Placeholder: mentored 3 engineers; introduced contract tests between services.",
      ],
      stack: ["TypeScript", "Node.js", "NestJS", "PostgreSQL", "Next.js", "AWS"],
    },
    {
      company: "Company B (placeholder)",
      companyUrl: "https://example.com",
      title: "Full-stack Engineer",
      period: "2020 — 2023",
      location: "Ho Chi Minh City",
      highlights: [
        "Placeholder: built a multi-tenant admin dashboard used by 200+ business customers.",
        "Placeholder: raised Lighthouse performance score from 58 to 96 on the marketing site.",
      ],
      stack: ["React", "Express", "MongoDB", "Docker", "GitHub Actions"],
    },
    {
      company: "Company C (placeholder)",
      title: "Software Engineer",
      period: "2018 — 2020",
      highlights: [
        "Placeholder: shipped payment and invoicing integrations for an internal ERP.",
      ],
      stack: ["JavaScript", "Node.js", "MySQL", "Vue"],
    },
  ],
  projects: [
    {
      name: "Project One",
      description:
        "Placeholder: real-time fleet tracking dashboard — streams device telemetry over WebSockets and renders live maps.",
      role: "Solo build · BE + FE",
      metric: "10k events/min",
      stack: ["Next.js", "Node.js", "WebSocket", "PostgreSQL"],
      image: { kind: "web", src: "/images/projects/fullstack-1.svg", alt: "Mock screenshot of a fleet tracking dashboard with a live map and KPI cards", width: 1600, height: 1000 },
      links: [
        { label: "Live", href: "https://example.com" },
        { label: "Source", href: "https://github.com/" },
      ],
    },
    {
      name: "Project Two",
      description:
        "Placeholder: headless e-commerce storefront with ISR product pages and a typed checkout API.",
      role: "Lead engineer",
      metric: "−38% checkout time",
      stack: ["Next.js", "tRPC", "Prisma", "Stripe"],
      image: { kind: "web", src: "/images/projects/fullstack-2.svg", alt: "Mock screenshot of an e-commerce storefront with a product grid", width: 1600, height: 1000 },
      links: [{ label: "Case study", href: "https://example.com" }],
    },
    {
      name: "Project Three",
      description:
        "Placeholder: open-source CLI that scaffolds typed REST clients from OpenAPI specs.",
      metric: "300+ GitHub stars",
      stack: ["TypeScript", "Node.js", "OpenAPI"],
      image: { kind: "web", src: "/images/projects/fullstack-3.svg", alt: "Mock screenshot of a terminal running a CLI code generator", width: 1600, height: 1000 },
      links: [{ label: "Source", href: "https://github.com/" }],
    },
  ],
  clients: sharedClients,
  domains: sharedDomains,
  techStack: [
    {
      label: "Backend",
      items: [
        { name: "Node.js · NestJS · Express", detail: "Placeholder: modular APIs with typed DTOs, guards and OpenAPI docs." },
        { name: "REST & GraphQL", detail: "Placeholder: versioned REST plus a GraphQL gateway for the dashboard." },
        { name: "Queues", detail: "Placeholder: BullMQ jobs for emails, exports and webhook retries." },
      ],
    },
    {
      label: "Data",
      items: [
        { name: "PostgreSQL · Prisma", detail: "Placeholder: schema design, migrations and query tuning with indexes." },
        { name: "Redis", detail: "Placeholder: caching, rate limiting and session storage." },
      ],
    },
    {
      label: "Frontend",
      items: [
        { name: "React · Next.js", detail: "Placeholder: App Router, Server Components and static-first pages." },
        { name: "TypeScript · Tailwind CSS", detail: "Placeholder: shared types end to end, design tokens in CSS." },
      ],
    },
    {
      label: "Infra & delivery",
      items: [
        { name: "Docker · CI/CD", detail: "Placeholder: containerised services, GitHub Actions with preview deploys." },
        { name: "AWS · Vercel", detail: "Placeholder: ECS/RDS for APIs, Vercel for web, IaC for both." },
      ],
    },
    ...sharedTechStack,
  ],
  links: [
    { kind: "github", label: "GitHub", href: "https://github.com/" },
    { kind: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/" },
    { kind: "email", label: "Email", href: "mailto:hello@example.com" },
  ],
  resumeUrl: "/resume-fullstack.pdf",
};
