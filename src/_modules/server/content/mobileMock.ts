// MOCK: placeholder editorial content — replace every field with real CV data before publishing
// (docs/DECISIONS.md "Content"). Parsed through zPortfolioContent so a shape error fails at
// import time, not in the rendered page (15-zod-contract-first.md).
import { EImageKind, ELinkKind, EStackCategory, ETechKey, EVariant } from '@/_modules/config/enums';

import { zPortfolioContent, type PortfolioContent } from './schemas';
import {
  sharedCertificationsMock,
  sharedClientsMock,
  sharedDomainsMock,
  sharedEducationMock,
  sharedTechStackMock,
} from './sharedMock';

const raw: PortfolioContent = {
  slug: EVariant.MOBILE,
  variantLabel: 'Mobile · React Native + Flutter',
  meta: {
    title: 'Tony Nguyen — Mobile Engineer (React Native + Flutter)',
    description:
      'Mobile engineer shipping cross-platform iOS and Android apps with React Native and Flutter. Placeholder portfolio.',
  },
  profile: {
    name: 'Tony Nguyen',
    avatar: {
      src: '/images/avatar.svg',
      alt: 'Placeholder monogram avatar for Tony Nguyen',
      width: 160,
      height: 160,
    },
    role: 'Mobile Engineer — React Native + Flutter',
    tagline:
      'I ship smooth, offline-friendly iOS and Android apps — from native device integrations to store release pipelines.',
    location: 'Ho Chi Minh City, Vietnam',
    availability: 'Open to full-time & contract roles',
    email: 'hello@example.com',
  },
  summary: [
    "Placeholder about text. I'm a mobile engineer with N+ years building cross-platform apps in React Native and Flutter. I care about 60fps interactions, startup time, and apps that keep working on a bad connection.",
    "I've worked across the whole lifecycle: native modules and BLE integrations, state and offline sync, CI/CD with Fastlane, and staged rollouts on the App Store and Google Play.",
    'I enjoy bridging product and platform — turning a rough idea into a release users actually keep.',
  ],
  experience: [
    {
      company: 'Company A (placeholder)',
      companyUrl: 'https://example.com',
      title: 'Senior Mobile Engineer',
      period: '2023 — Present',
      current: true,
      location: 'Remote',
      highlights: [
        'Placeholder: rebuilt the companion app in Flutter, cutting cold start from 3.1s to 1.2s.',
        'Placeholder: wrote BLE native modules (Swift/Kotlin) syncing data from 5 wearable brands.',
        'Placeholder: set up Fastlane + CI release trains; weekly releases with 99.8% crash-free sessions.',
      ],
      stack: [ETechKey.FLUTTER, ETechKey.DART, ETechKey.SWIFT, ETechKey.KOTLIN, ETechKey.FIREBASE],
    },
    {
      company: 'Company B (placeholder)',
      companyUrl: 'https://example.com',
      title: 'React Native Engineer',
      period: '2020 — 2023',
      location: 'Ho Chi Minh City',
      highlights: [
        'Placeholder: shipped a consumer app to 500k+ installs with a 4.7★ store rating.',
        'Placeholder: introduced offline-first sync, reducing failed submissions by 70%.',
      ],
      stack: [ETechKey.REACT_NATIVE, ETechKey.TYPESCRIPT, ETechKey.REDUX, ETechKey.EXPO],
    },
    {
      company: 'Company C (placeholder)',
      title: 'Software Engineer',
      period: '2018 — 2020',
      highlights: ['Placeholder: built hybrid field-service apps and their REST backends.'],
      stack: [ETechKey.JAVASCRIPT, ETechKey.IONIC, ETechKey.NODE],
    },
  ],
  projects: [
    {
      name: 'Project One',
      description:
        'Placeholder: unified health app — reads data from multiple smartwatch brands over BLE into one timeline.',
      role: 'Lead mobile engineer',
      metric: '5 device brands',
      stack: [ETechKey.FLUTTER, ETechKey.BLE, ETechKey.KOTLIN, ETechKey.SWIFT],
      image: {
        kind: EImageKind.PHONE,
        src: '/images/projects/mobile-1.svg',
        alt: 'Mock phone screen of a health app with activity rings and a daily timeline',
        width: 900,
        height: 1950,
      },
      links: [
        { label: 'Case study', href: 'https://example.com' },
        { label: 'Source', href: 'https://github.com/' },
      ],
    },
    {
      name: 'Project Two',
      description: 'Placeholder: field inspection app with offline forms, photo capture, and background sync.',
      role: 'Solo build',
      metric: '−70% failed syncs',
      stack: [ETechKey.REACT_NATIVE, ETechKey.EXPO, ETechKey.SQLITE, ETechKey.TYPESCRIPT],
      image: {
        kind: EImageKind.PHONE,
        src: '/images/projects/mobile-2.svg',
        alt: 'Mock phone screen of an offline inspection form with photo capture',
        width: 900,
        height: 1950,
      },
      links: [
        { label: 'App Store', href: 'https://apps.apple.com/' },
        { label: 'Google Play', href: 'https://play.google.com/' },
      ],
    },
    {
      name: 'Project Three',
      description: 'Placeholder: open-source Flutter package for animated charts on low-end devices.',
      metric: '1k+ pub.dev likes',
      stack: [ETechKey.FLUTTER, ETechKey.DART, ETechKey.CUSTOM_PAINTER],
      image: {
        kind: EImageKind.PHONE,
        src: '/images/projects/mobile-3.svg',
        alt: 'Mock phone screen of an app showing line and bar charts',
        width: 900,
        height: 1950,
      },
      links: [{ label: 'Source', href: 'https://github.com/' }],
    },
  ],
  clients: sharedClientsMock,
  domains: sharedDomainsMock,
  techStack: [
    {
      label: 'Cross-platform',
      items: [
        {
          name: 'React Native · Expo',
          detail: 'Placeholder: TypeScript apps with Reanimated, React Query and EAS builds.',
        },
        {
          name: 'Flutter · Dart',
          detail: 'Placeholder: Riverpod/Bloc architecture, CustomPainter charts, golden tests.',
        },
      ],
    },
    {
      label: 'Native & device',
      items: [
        {
          name: 'Native modules · BLE',
          detail: 'Placeholder: Swift/Kotlin bridges for Bluetooth wearables and sensors.',
        },
        { name: 'Background work', detail: 'Placeholder: background fetch, sync and local notifications.' },
      ],
    },
    {
      label: 'Release',
      items: [
        { name: 'OTA updates', detail: 'Placeholder: EAS Update / Shorebird channels with staged rollouts.' },
        {
          name: 'App Store · Google Play',
          detail: 'Placeholder: Fastlane pipelines, TestFlight, review and phased release.',
        },
      ],
    },
    ...sharedTechStackMock,
  ],
  technologies: [
    {
      category: EStackCategory.LANGUAGES,
      keys: [ETechKey.DART, ETechKey.KOTLIN, ETechKey.SWIFT, ETechKey.TYPESCRIPT],
    },
    {
      category: EStackCategory.MOBILE_FRAMEWORKS,
      keys: [ETechKey.FLUTTER, ETechKey.REACT_NATIVE, ETechKey.EXPO, ETechKey.IONIC],
    },
    {
      category: EStackCategory.STATE_DATA,
      keys: [ETechKey.REDUX, ETechKey.TANSTACK_QUERY, ETechKey.ZUSTAND, ETechKey.SQLITE],
    },
    {
      category: EStackCategory.BACKEND_SERVICES,
      keys: [ETechKey.FIREBASE, ETechKey.SUPABASE, ETechKey.REVENUECAT, ETechKey.BLE],
    },
    {
      category: EStackCategory.RELEASE,
      keys: [ETechKey.EAS, ETechKey.FASTLANE, ETechKey.APP_STORE, ETechKey.GOOGLE_PLAY],
    },
    {
      category: EStackCategory.TOOLS,
      keys: [ETechKey.SLACK, ETechKey.JIRA, ETechKey.CLICKUP, ETechKey.ASANA, ETechKey.CLAUDE, ETechKey.FIGMA],
    },
  ],
  certifications: [
    ...sharedCertificationsMock,
    {
      name: 'Meta Certified: React Native Developer',
      issuer: ETechKey.META,
      issuerName: 'Meta',
      issuedDate: '2023-11',
      credentialId: 'MOCK-META-RN-000000',
      credentialUrl: 'https://www.credly.com/badges/00000000',
    },
  ],
  education: sharedEducationMock,
  links: [
    { kind: ELinkKind.GITHUB, label: 'GitHub', href: 'https://github.com/' },
    { kind: ELinkKind.LINKEDIN, label: 'LinkedIn', href: 'https://www.linkedin.com/' },
    { kind: ELinkKind.EMAIL, label: 'Email', href: 'mailto:hello@example.com' },
  ],
  resumeUrl: '/resume-mobile.pdf',
};

export const mobileMock = zPortfolioContent.parse(raw);
