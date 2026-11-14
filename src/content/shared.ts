import type { Client, Domain, TechGroup } from "./types";

// PLACEHOLDER CONTENT shared by both variants. All client names are fictional.

export const sharedDomains: Domain[] = [
  {
    name: "ERP",
    description: "Placeholder: inventory, purchasing and invoicing modules for mid-size operations.",
    icon: "erp",
    tags: ["Inventory", "Invoicing", "Reporting"],
  },
  {
    name: "E-commerce",
    description: "Placeholder: storefronts, checkout flows and order management at scale.",
    icon: "ecommerce",
    tags: ["Checkout", "Payments", "Catalog"],
  },
  {
    name: "CRM",
    description: "Placeholder: pipelines, customer timelines and sales automation.",
    icon: "crm",
    tags: ["Pipelines", "Segmentation"],
  },
  {
    name: "Automation & integrations",
    description: "Placeholder: workflow bots and syncs across Slack, Asana, ClickUp and Jira.",
    icon: "automation",
    tags: ["Slack", "Asana", "ClickUp", "Jira"],
  },
  {
    name: "AI harness",
    description:
      "Placeholder: agentic code automation — Claude Code / LLM agents that run dev workflows end to end.",
    icon: "ai",
    tags: ["Claude Code", "LLM agents", "CI bots"],
  },
  {
    name: "More…",
    description: "Placeholder slot for additional domains from the CV.",
    icon: "more",
  },
];

export const sharedTechStack: TechGroup[] = [
  {
    label: "Architecture",
    items: [
      { name: "Multi-tenancy", detail: "Placeholder: tenant isolation, per-tenant config and feature flags." },
      { name: "Event-driven services", detail: "Placeholder: queues and webhooks to decouple slow work from requests." },
      { name: "Offline-first sync", detail: "Placeholder: conflict-aware local cache with background reconciliation." },
    ],
  },
  {
    label: "Payments & subscriptions",
    items: [
      { name: "RevenueCat", detail: "Placeholder: iOS/Android in-app subscriptions, entitlements and paywall tests." },
      { name: "Stripe", detail: "Placeholder: checkout, billing portal and webhook-driven fulfilment." },
    ],
  },
  {
    label: "Firebase",
    items: [
      { name: "Auth & Firestore", detail: "Placeholder: social sign-in, security rules and realtime data." },
      { name: "Cloud Functions", detail: "Placeholder: triggers, scheduled jobs and server-side validation." },
      { name: "FCM, Crashlytics, Remote Config, Analytics", detail: "Placeholder: push campaigns, crash triage, staged rollouts and funnels." },
    ],
  },
];

export const sharedClients: Client[] = [
  { name: "Acme Retail", logo: "/images/clients/acme-retail.svg", industry: "Retail", country: "Australia", engagement: "E-commerce platform · 2023–2024" },
  { name: "Northwind Logistics", logo: "/images/clients/northwind.svg", industry: "Logistics", country: "Singapore", engagement: "Fleet tracking · 2022–2023" },
  { name: "Globex Health", logo: "/images/clients/globex-health.svg", industry: "Healthcare", country: "United States", engagement: "Patient app · 2024–Present" },
  { name: "Initech", logo: "/images/clients/initech.svg", industry: "Finance", country: "Vietnam", engagement: "ERP modules · 2021–2022" },
  { name: "Umbrella Mobility", logo: "/images/clients/umbrella.svg", industry: "Mobility", country: "Japan", engagement: "Rider app · 2022" },
  { name: "Hooli Learn", logo: "/images/clients/hooli.svg", industry: "Education", country: "Vietnam", engagement: "LMS integrations · 2020–2021" },
];
