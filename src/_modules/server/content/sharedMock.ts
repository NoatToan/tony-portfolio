// MOCK: placeholder editorial content shared by both variants, pending the user's real CV data
// (docs/DECISIONS.md "Content"). Every client name is fictional; logos are monochrome SVGs.
import { EDomainIcon, ETechKey } from '@/_modules/config/enums';

import type { Certification, Client, Domain, Education, TechGroup } from './schemas';

export const sharedDomainsMock: Domain[] = [
  {
    name: 'ERP',
    description: 'Placeholder: inventory, purchasing and invoicing modules for mid-size operations.',
    icon: EDomainIcon.ERP,
    tags: ['Inventory', 'Invoicing', 'Reporting'],
  },
  {
    name: 'E-commerce',
    description: 'Placeholder: storefronts, checkout flows and order management at scale.',
    icon: EDomainIcon.ECOMMERCE,
    tags: ['Checkout', 'Payments', 'Catalog'],
  },
  {
    name: 'CRM',
    description: 'Placeholder: pipelines, customer timelines and sales automation.',
    icon: EDomainIcon.CRM,
    tags: ['Pipelines', 'Segmentation'],
  },
  {
    name: 'Automation & integrations',
    description: 'Placeholder: workflow bots and syncs across Slack, Asana, ClickUp and Jira.',
    icon: EDomainIcon.AUTOMATION,
    tags: ['Slack', 'Asana', 'ClickUp', 'Jira'],
  },
  {
    name: 'AI harness',
    description:
      'Placeholder: agentic code automation — Claude Code / LLM agents that run dev workflows end to end.',
    icon: EDomainIcon.AI,
    tags: ['Claude Code', 'LLM agents', 'CI bots'],
  },
  {
    name: 'More…',
    description: 'Placeholder slot for additional domains from the CV.',
    icon: EDomainIcon.MORE,
  },
];

export const sharedTechStackMock: TechGroup[] = [
  {
    label: 'Architecture',
    items: [
      { name: 'Multi-tenancy', detail: 'Placeholder: tenant isolation, per-tenant config and feature flags.' },
      {
        name: 'Event-driven services',
        detail: 'Placeholder: queues and webhooks to decouple slow work from requests.',
      },
      {
        name: 'Offline-first sync',
        detail: 'Placeholder: conflict-aware local cache with background reconciliation.',
      },
    ],
  },
  {
    label: 'Payments & subscriptions',
    items: [
      {
        name: 'RevenueCat',
        detail: 'Placeholder: iOS/Android in-app subscriptions, entitlements and paywall tests.',
      },
      { name: 'Stripe', detail: 'Placeholder: checkout, billing portal and webhook-driven fulfilment.' },
    ],
  },
  {
    label: 'Firebase',
    items: [
      { name: 'Auth & Firestore', detail: 'Placeholder: social sign-in, security rules and realtime data.' },
      { name: 'Cloud Functions', detail: 'Placeholder: triggers, scheduled jobs and server-side validation.' },
      {
        name: 'FCM, Crashlytics, Remote Config, Analytics',
        detail: 'Placeholder: push campaigns, crash triage, staged rollouts and funnels.',
      },
    ],
  },
];

export const sharedClientsMock: Client[] = [
  {
    name: 'Acme Retail',
    logo: '/images/clients/acme-retail.svg',
    industry: 'Retail',
    country: 'Australia',
    engagement: 'E-commerce platform · 2023–2024',
  },
  {
    name: 'Northwind Logistics',
    logo: '/images/clients/northwind.svg',
    industry: 'Logistics',
    country: 'Singapore',
    engagement: 'Fleet tracking · 2022–2023',
  },
  {
    name: 'Globex Health',
    logo: '/images/clients/globex-health.svg',
    industry: 'Healthcare',
    country: 'United States',
    engagement: 'Patient app · 2024–Present',
  },
  {
    name: 'Initech',
    logo: '/images/clients/initech.svg',
    industry: 'Finance',
    country: 'Vietnam',
    engagement: 'ERP modules · 2021–2022',
  },
  {
    name: 'Umbrella Mobility',
    logo: '/images/clients/umbrella.svg',
    industry: 'Mobility',
    country: 'Japan',
    engagement: 'Rider app · 2022',
  },
  {
    name: 'Hooli Learn',
    logo: '/images/clients/hooli.svg',
    industry: 'Education',
    country: 'Vietnam',
    engagement: 'LMS integrations · 2020–2021',
  },
];

export const sharedCertificationsMock: Certification[] = [
  {
    name: 'Professional Scrum Master I (PSM I)',
    issuer: ETechKey.SCRUM_ORG,
    issuerName: 'Scrum.org',
    issuedDate: '2022-03',
    credentialId: 'MOCK-PSM1-00000',
    credentialUrl: 'https://www.scrum.org/certificates/000000',
  },
  {
    name: 'Professional Scrum Master II (PSM II)',
    issuer: ETechKey.SCRUM_ORG,
    issuerName: 'Scrum.org',
    issuedDate: '2023-01',
    credentialId: 'MOCK-PSM2-00000',
    credentialUrl: 'https://www.scrum.org/certificates/000000',
  },
  {
    name: 'TOEIC — 915/990',
    issuer: ETechKey.ETS,
    issuerName: 'ETS',
    issuedDate: '2021-06',
    expiresDate: '2023-06',
  },
  {
    name: 'AWS Certified Developer — Associate',
    issuer: ETechKey.AWS,
    issuerName: 'Amazon Web Services',
    issuedDate: '2023-09',
    expiresDate: '2026-09',
    credentialId: 'MOCK-AWS-0000000',
    credentialUrl: 'https://www.credly.com/badges/00000000',
  },
];

export const sharedEducationMock: Education[] = [
  {
    school: 'Mock University of Technology',
    degree: 'B.Eng. in Computer Science',
    period: '2014 — 2018',
    location: 'Ho Chi Minh City, Vietnam',
  },
];
