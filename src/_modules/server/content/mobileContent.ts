// Real editorial content, sourced from the user's mobile CVs (docs/drive-scan-notes.md,
// docs/DECISIONS.md "Mobile variant uses real CV content"). Conflicts between CV versions are
// resolved in favour of the newest mobile CV (TonyNguyen_Mobile_Engineer, 2026-11-11), with the
// Senior React Native CV used to fill in detail the newest CV compresses (e.g. per-app bullets).
// Remaining `// MOCK:` comments mark the few fields with no source material at all — see the
// task report for the full list. Parsed through zPortfolioContent so a shape error fails at
// import time, not in the rendered page (15-zod-contract-first.md).
import { EDomainIcon, ELinkKind, EStackCategory, ETechKey, EVariant } from '@/_modules/config/enums';

import { zPortfolioContent, type Certification, type Client, type Domain, type Education, type Project } from './schemas';
import { getStoreAsset } from './storeAssets';

/** Store listing, when the store-asset agent found one — otherwise an honest "unconfirmed" card. */
function unconfirmedDescription(slug: string, fallback: string): string {
  return getStoreAsset(slug)?.shortDescription || fallback;
}

const certifications: Certification[] = [
  {
    name: 'Professional Scrum Master II (PSM II)',
    issuer: ETechKey.SCRUM_ORG,
    issuerName: 'Scrum.org',
    issuedDate: '2024',
  },
  {
    name: 'Professional Scrum Master I (PSM I)',
    issuer: ETechKey.SCRUM_ORG,
    issuerName: 'Scrum.org',
    issuedDate: '2023',
  },
  {
    name: 'TOEIC — 800',
    issuer: ETechKey.ETS,
    issuerName: 'ETS',
    issuedDate: '2023',
  },
  {
    name: 'Japanese-Language Proficiency Test N3 (JLPT N3)',
    issuerName: 'Japan Foundation / JEES',
    issuedDate: '2020',
  },
];

const education: Education[] = [
  {
    school: 'Saigon University',
    degree: 'Bachelor of Information Technology',
    period: '2016 — 2020',
  },
];

// Named brands the user confirmed are safe to show publicly (docs/DECISIONS.md). Everything
// else stays anonymized the way the CV anonymizes it ("Singapore client", "Japan client", …).
const clients: Client[] = [
  {
    name: 'BreadTalk Group Rewards',
    slug: 'breadtalk',
    industry: 'F&B & retail loyalty',
    country: 'Singapore',
    engagement: 'Consumer loyalty app · ~150 outlets',
    relatedProject: 'Singapore F&B & Retail Loyalty Suite',
  },
  {
    name: 'KOI Thé',
    slug: 'koithe',
    industry: 'F&B & retail loyalty',
    country: 'Singapore',
    engagement: 'F&B loyalty app',
    relatedProject: 'Singapore F&B & Retail Loyalty Suite',
  },
  {
    name: 'KLV',
    slug: 'klv',
    industry: 'F&B & retail loyalty',
    country: 'Singapore',
    engagement: 'F&B loyalty app',
    relatedProject: 'Singapore F&B & Retail Loyalty Suite',
  },
  {
    name: 'Crystal Jade',
    slug: 'crystal-jade',
    industry: 'F&B & retail loyalty',
    country: 'Singapore',
    engagement: 'F&B loyalty app',
    relatedProject: 'Singapore F&B & Retail Loyalty Suite',
  },
  {
    name: 'Great Rewards',
    slug: 'great-rewards',
    industry: 'F&B & retail loyalty',
    country: 'Singapore',
    engagement: 'Retail loyalty app',
    relatedProject: 'Singapore F&B & Retail Loyalty Suite',
  },
  {
    name: 'Rewards+ (i12 Katong)',
    slug: 'rewards-plus-i12',
    industry: 'F&B & retail loyalty',
    country: 'Singapore',
    engagement: 'Mall loyalty app',
    relatedProject: 'Singapore F&B & Retail Loyalty Suite',
  },
  {
    name: 'Wisma Atria Rewards',
    slug: 'wisma-atria',
    industry: 'F&B & retail loyalty',
    country: 'Singapore',
    engagement: 'Mall loyalty app',
    relatedProject: 'Singapore F&B & Retail Loyalty Suite',
  },
  {
    name: 'S3 Rewards',
    slug: 's3-rewards',
    industry: 'F&B & retail loyalty',
    country: 'Singapore',
    engagement: 'Retail loyalty app',
    relatedProject: 'Singapore F&B & Retail Loyalty Suite',
  },
  {
    name: 'TCCG Rewards+',
    slug: 'tccg-rewards',
    industry: 'F&B & retail loyalty',
    country: 'Singapore',
    engagement: 'F&B loyalty app',
    relatedProject: 'Singapore F&B & Retail Loyalty Suite',
  },
  {
    name: 'Paragon Club',
    slug: 'paragon-club',
    industry: 'F&B & retail loyalty',
    country: 'Singapore',
    engagement: 'Mall loyalty app',
    relatedProject: 'Singapore F&B & Retail Loyalty Suite',
  },
  {
    name: 'SnapStudy.ai',
    slug: 'snapstudy',
    industry: 'EdTech / AI',
    engagement: 'AI homework helper · iOS & Android',
    relatedProject: 'SnapStudy.ai',
    url: 'https://snapstudy.ai',
  },
  {
    name: 'Telemax Connect',
    slug: 'telemax',
    industry: 'Fleet telematics',
    country: 'Australia',
    engagement: 'Field operations app',
    relatedProject: 'Telemax Connect',
  },
  {
    name: 'Sega Sammy',
    slug: 'sega-sammy-user',
    industry: 'Gaming / leisure clubs',
    country: 'Japan',
    engagement: 'Multi-tenant club ERP/CRM · player & admin apps',
    relatedProject: 'Sega Sammy Poker Club',
  },
  {
    name: 'Lamo – Learn and Earn',
    slug: 'lamo',
    industry: 'EdTech / Web3',
    country: 'Singapore',
    engagement: 'Decentralized learn-to-earn platform',
    relatedProject: 'Lamo – Learn and Earn',
  },
  {
    name: 'Singapore News',
    slug: 'singapore-news',
    industry: 'Unconfirmed',
    engagement: 'App (details unconfirmed — see report)',
    relatedProject: 'Singapore News',
  },
  {
    name: 'KiddiHub',
    slug: 'kiddihub',
    industry: 'EdTech',
    country: 'Vietnam',
    engagement: 'Parent–school real-time chat app',
    relatedProject: 'KiddiHub',
  },
  {
    name: 'Miesgo',
    slug: 'miesgo',
    industry: 'Unconfirmed',
    engagement: 'App (details unconfirmed — see report)',
    relatedProject: 'Miesgo',
  },
  {
    name: 'Recoup Health',
    slug: 'recoup-health',
    industry: 'Unconfirmed',
    engagement: 'App (details unconfirmed — see report)',
    relatedProject: 'Recoup Health',
  },
  {
    name: 'Carhartt',
    slug: 'carhartt',
    industry: 'Unconfirmed',
    engagement: 'App (details unconfirmed — see report)',
    relatedProject: 'Carhartt',
  },
];

const domains: Domain[] = [
  {
    name: 'ERP / CRM',
    description:
      'Built ERP/CRM workflow modules (request-payment approval, staff transfer, admin consoles) for OPPO Vietnam, and a multi-tenant club-management ERP/CRM for a Japan poker-club chain.',
    icon: EDomainIcon.ERP,
    tags: ['Multi-tenant', 'Workflow approval'],
  },
  {
    name: 'F&B & retail loyalty',
    description:
      'Maintained and revamped a portfolio of 8–9 Singapore F&B and retail loyalty apps (CRM, e-commerce and CMS integrations), led by BreadTalk Group Rewards across ~150 outlets.',
    icon: EDomainIcon.ECOMMERCE,
    tags: ['Loyalty', 'CMS', 'Figma UI revamps'],
  },
  {
    name: 'EdTech',
    description:
      'Shipped an AI homework helper (SnapStudy.ai), a learn-to-earn education platform (Lamo) and a parent–school chat app (KiddiHub).',
    tags: ['AI tutoring', 'Learn-to-earn', 'School messaging'],
  },
  {
    name: 'Fintech & payments',
    description:
      'Integrated Stripe (Apple Pay, Google Pay, Mastercard/Visa) and the NETS Click native payment SDK into React Native loyalty apps.',
    tags: ['Stripe', 'NETS Click'],
  },
  {
    name: 'Fleet & IoT telematics',
    description:
      'Built a GPS device-pairing and live map/health-dashboard field app for an Australian fleet telematics client, plus Bluetooth wearable and camera-tethering IoT presale POCs.',
    tags: ['BLE', 'Maps', 'Skia canvas'],
  },
  {
    name: 'AI-assisted development',
    description: 'Uses Claude and Cursor AI daily to keep code consistent with best practices.',
    icon: EDomainIcon.AI,
    tags: ['Claude', 'Cursor AI'],
  },
];

const projects: Project[] = [
  {
    name: 'Singapore F&B & Retail Loyalty Suite',
    description:
      'Maintained and revamped 8–9 F&B and retail loyalty apps for a Singapore client, led by BreadTalk Group Rewards covering ~150 outlets (Din Tai Fung, BreadTalk, Toast Box, Food Republic). Upgraded the portfolio from React Native 0.62 to 0.72, migrated it for Android SDK 35 and the 16 KB page-size requirement, and replaced Firebase Dynamic Links ahead of its deprecation. Integrated the NETS Click native payment SDK and Stripe (Apple Pay, Google Pay, Mastercard/Visa), patched unmaintained third-party React Native libraries with patch-package, and led full UI revamps from Figma while keeping CRM, e-commerce and CMS integrations stable.',
    role: 'Mobile Team Leader & Scrum Master',
    metric: '~150 outlets · 10 apps',
    stack: [
      ETechKey.REACT_NATIVE,
      ETechKey.TYPESCRIPT,
      ETechKey.REDUX,
      ETechKey.TANSTACK_QUERY,
      ETechKey.FIREBASE,
      ETechKey.STRIPE,
      ETechKey.NETS_CLICK,
      ETechKey.GRAPHQL,
      ETechKey.ALGOLIA,
      ETechKey.AZURE_DEVOPS,
    ],
    links: [],
    apps: [
      { slug: 'breadtalk', label: 'BreadTalk Group Rewards' },
      { slug: 'koithe', label: 'KOI Thé' },
      { slug: 'klv', label: 'KLV' },
      { slug: 'crystal-jade', label: 'Crystal Jade' },
      { slug: 'great-rewards', label: 'Great Rewards' },
      { slug: 'rewards-plus-i12', label: 'Rewards+ (i12 Katong)' },
      { slug: 'wisma-atria', label: 'Wisma Atria Rewards' },
      { slug: 's3-rewards', label: 'S3 Rewards' },
      { slug: 'tccg-rewards', label: 'TCCG Rewards+' },
      { slug: 'paragon-club', label: 'Paragon Club' },
    ],
  },
  {
    name: 'SnapStudy.ai',
    description:
      'Built the camera-capture experience for an AI homework helper: students photograph a question and get step-by-step, ChatGPT-style streamed explanations. Implemented animated capture states, swipe interactions with Gesture Handler, card animations with Reanimated v2/v3 (interpolation, withSpring physics, debounced animations and explicit transition states), a customised MathJax renderer for React Native, and in-app purchases.',
    role: 'React Native Developer',
    stack: [ETechKey.REACT_NATIVE, ETechKey.TYPESCRIPT, ETechKey.REANIMATED, ETechKey.GESTURE_HANDLER],
    links: [{ label: 'snapstudy.ai', href: 'https://snapstudy.ai' }],
    slug: 'snapstudy',
  },
  {
    name: 'Telemax Connect',
    description:
      'Field app for an Australian fleet telematics client: pairs GPS devices to rental and subscription vehicles and guides operators through device changeovers step by step. Rendered a custom vehicle trip/event timeline on a React Native Skia canvas that stayed smooth with large event sets, and built a live map and device-health dashboard (network, satellite, CAN, battery) with a connection health check.',
    role: 'React Native / Mobile Developer',
    stack: [ETechKey.REACT_NATIVE, ETechKey.TYPESCRIPT, ETechKey.SKIA],
    links: [],
    slug: 'telemax',
  },
  {
    name: 'Sega Sammy Poker Club',
    description:
      "Multi-tenant ERP/CRM for a Japan client's poker clubs, covering the club-management backend and its player-facing and staff-facing mobile apps. Designed the system flows, sequence diagrams and database schema on PHP Laravel, Vue (inside Blade) and MySQL for a team of 12; restructured the React Native player app, managed the mobile repo and release branching, and integrated deep linking and social login (Apple, Twitter, LINE).",
    role: 'Fullstack Team Leader / Mobile Team Leader',
    metric: 'Team of 12',
    stack: [
      ETechKey.PHP,
      ETechKey.LARAVEL,
      ETechKey.VUE,
      ETechKey.MYSQL,
      ETechKey.REACT_NATIVE,
      ETechKey.REDUX,
      ETechKey.FASTLANE,
      ETechKey.DEPLOYGATE,
    ],
    links: [],
    apps: [
      { slug: 'sega-sammy-user', label: 'Player app' },
      { slug: 'sega-sammy-admin', label: 'Admin app' },
    ],
  },
  {
    name: 'Lamo – Learn and Earn',
    description:
      "Decentralized, learn-to-earn education platform for a Singapore client, with a blockchain back end and tools for tracking a personal financial roadmap. Clarified specifications and estimated the project at initiation, built the React Native app architecture and the Fastlane/DeployGate mobile CI/CD pipeline, integrated Firebase Authentication (Facebook, Google, Apple), push notifications, Crashlytics and AdMob, and mentored new team members.",
    role: 'Mobile Team Leader / Fullstack Developer',
    stack: [ETechKey.REACT_NATIVE, ETechKey.REDUX, ETechKey.NEST, ETechKey.POSTGRES, ETechKey.FIREBASE, ETechKey.FASTLANE, ETechKey.DEPLOYGATE],
    links: [],
    slug: 'lamo',
  },
  // MOCK: no CV or drive-notes mention of "Singapore News" (confirmed by a Drive full-text
  // search) — role/stack are intentionally left blank rather than guessed. Description falls
  // back to the store listing's own copy when the store-asset agent found one.
  {
    name: 'Singapore News',
    description: unconfirmedDescription(
      'singapore-news',
      'A published app in this portfolio — role and stack are not yet confirmed from any CV on file.',
    ),
    stack: [],
    links: [],
    slug: 'singapore-news',
  },
  {
    name: 'KiddiHub',
    description:
      'Real-time chat app connecting school administrators and parents for a Vietnam EdTech client, integrated with the KiddiHub school management system. Implemented instant message notifications, chat features (copy/paste, contact renaming) and a consultant screen.',
    role: 'React Native Developer',
    stack: [ETechKey.REACT_NATIVE, ETechKey.TYPESCRIPT],
    links: [],
    slug: 'kiddihub',
  },
  // MOCK: no CV or drive-notes mention of "Miesgo" (confirmed by a Drive full-text search).
  {
    name: 'Miesgo',
    description: unconfirmedDescription(
      'miesgo',
      'A published app in this portfolio — role and stack are not yet confirmed from any CV on file.',
    ),
    stack: [],
    links: [],
    slug: 'miesgo',
  },
  // MOCK: "Recoup Health" has no confirmed CV match. The CV's web-only "Healthcare Services
  // Platform" (Singapore/India client) is a *possible* loose connection, but that project is
  // React/Express, not a mobile app, so it isn't used here — see the report.
  {
    name: 'Recoup Health',
    description: unconfirmedDescription(
      'recoup-health',
      'A published app in this portfolio — role and stack are not yet confirmed from any CV on file.',
    ),
    stack: [],
    links: [],
    slug: 'recoup-health',
  },
  // MOCK: no CV or drive-notes mention of an e-commerce/retail project matching "Carhartt".
  {
    name: 'Carhartt',
    description: unconfirmedDescription(
      'carhartt',
      'A published app in this portfolio — role and stack are not yet confirmed from any CV on file.',
    ),
    stack: [],
    links: [],
    slug: 'carhartt',
  },
  {
    name: 'Clean Mail',
    description:
      'Mail client syncing messages from Gmail and Outlook, optimised for promotional mail. Built the project structure for high-performance, reactive persisted local storage and reusable hooks for mail actions across the app.',
    role: 'React Native Developer',
    stack: [ETechKey.REACT_NATIVE, ETechKey.TYPESCRIPT],
    links: [],
    slug: 'clean-mail',
  },
  {
    name: 'SchoolHub',
    description:
      'Education platform helping parents and schools find each other. Built the app architecture and integrated third-party services (Firebase Dynamic Links, Fastlane, DeployGate) on React Native with Redux-Saga.',
    role: 'React Native Developer',
    stack: [ETechKey.REACT_NATIVE, ETechKey.REDUX, ETechKey.FASTLANE, ETechKey.DEPLOYGATE],
    links: [],
    slug: 'schoolhub',
  },
  {
    name: 'Helpdesk Ticket Service',
    description:
      'Multi-tenant helpdesk ticket service for a Singapore managed-service client, serving incident, change and service-request management across many companies. Led the full migration of the legacy app to a newer React Native version for a 9-person team, restructured the codebase into Domain-Driven Design, and built the chat module on a customised Gifted Chat, patching third-party packages to meet project requirements.',
    role: 'FE Team Leader (React Native / Next.js)',
    metric: 'Team of 9',
    stack: [ETechKey.REACT_NATIVE, ETechKey.REDUX],
    links: [],
  },
  {
    name: 'Camera & IoT POCs for Presale',
    description:
      'R&D proof-of-concepts for prospective clients: a Flutter app streaming patient-monitoring wristband data over Bluetooth to a Next.js full-stack system for monitoring and alerts, and a Flutter app with native Kotlin modules transferring images from Sony/Fujifilm cameras over TCP/IP and FTP to the cloud. Used to cost and plan presale proposals — this is the one concrete Flutter showcase from the CVs.',
    role: 'Flutter Developer',
    stack: [ETechKey.FLUTTER, ETechKey.DART, ETechKey.KOTLIN, ETechKey.NEXT],
    links: [],
  },
];

export const mobileContent = zPortfolioContent.parse({
  slug: EVariant.MOBILE,
  variantLabel: 'Mobile · React Native + Flutter',
  meta: {
    title: 'Tony Nguyen — Mobile Engineer (React Native + Flutter)',
    description:
      'Senior React Native developer with ~7 years of mobile development and 10+ shipped App Store / Google Play apps — Reanimated, Gesture Handler, Skia, plus Flutter.',
  },
  profile: {
    name: 'Tony Nguyen',
    // MOCK: no photo, logo or headshot file exists anywhere in the Drive folder
    // (docs/drive-scan-notes.md §6) — kept as the placeholder monogram avatar.
    avatar: {
      src: '/images/avatar.svg',
      alt: 'Monogram avatar for Tony Nguyen',
      width: 160,
      height: 160,
    },
    role: 'Senior React Native Developer | React Native, TypeScript, Reanimated, Gesture Handler, Skia',
    tagline:
      'Has shipped and maintained 10+ production apps on the App Store and Google Play — from consumer loyalty apps for Singapore F&B and retail brands to an AI study app and a fleet telematics tool.',
    location: 'Vietnam (UTC+7)',
    availability: 'Open to remote worldwide · 6+ hours overlap with any timezone',
    email: 'truongtoanlvc@gmail.com',
  },
  summary: [
    "Mobile engineer with ~7 years of mobile development, mainly React Native, plus ~2 years of Flutter, shipping apps to both the App Store and Google Play.",
    '3 years as Frontend/Mobile Team Leader and Scrum Master, leading mobile and web delivery in Agile Scrum teams; experienced in project estimation and technical consulting.',
    'Fullstack background (2+ years with ReactJS, Next.js and PHP Laravel) for understanding applications end to end and adapting across mobile, frontend and backend roles.',
    'Cares about how a product looks, feels and moves: builds gesture-driven interactions and spring-based animations with Reanimated (v2/v3) and Gesture Handler, draws custom canvas visuals with React Native Skia, and implements high-fidelity UI from Figma with reusable components, Storybook and design tokens. Comfortable going below the JavaScript layer: debugs and patches third-party React Native libraries (JS and native iOS / Android code) with patch-package to unblock upgrades, fix native build failures and resolve platform-specific bugs.',
    'Uses AI-assisted workflows (Claude, Cursor AI) to keep code consistent with best practices. Experienced working remotely with clients in Singapore, Canada, Australia and Japan.',
  ],
  experience: [
    {
      company: 'HBLAB',
      title: 'Development Team Leader (Mobile / Frontend)',
      period: 'Jun 2020 — Oct 2026',
      current: true,
      location: 'Remote · Singapore, Canada, Australia & Japan clients',
      highlights: [
        'Led mobile and frontend development in Agile Scrum teams of 4–9 people across multiple client projects for Singapore, Canada, Australia and Japan.',
        'Owned mobile delivery end to end: architecture, implementation, code review, App Store / Google Play distribution and app version management.',
        'Built mobile CI/CD pipelines with Fastlane and DeployGate on GitLab; used Azure DevOps on enterprise projects.',
        'Acted as Scrum Master: aligned planning and resources with heads of department, managed SLA issues and coached the team on Agile practices.',
        'Estimated new features and change requests and consulted clients on technical approaches; mentored new team members.',
      ],
      stack: [ETechKey.REACT_NATIVE, ETechKey.FLUTTER, ETechKey.TYPESCRIPT, ETechKey.FASTLANE, ETechKey.DEPLOYGATE, ETechKey.AZURE_DEVOPS],
    },
    {
      company: 'Digital Avenues',
      title: 'Senior Frontend Engineer (Contract)',
      period: 'Sep 2023 — Oct 2024',
      highlights: ['Mobile (React Native / Flutter) and web (Next.js / React) frontend engineering.'],
      stack: [ETechKey.REACT_NATIVE, ETechKey.FLUTTER, ETechKey.NEXT, ETechKey.REACT],
    },
    {
      company: 'OPPO Vietnam (ERP)',
      title: 'Fullstack Developer',
      period: 'Jan 2019 — Jun 2020',
      highlights: [
        "Built ERP/CRM modules with ReactJS and PHP Laravel: request-payment workflow with role-hierarchy approval, staff transfer with automated labor-contract generation, and OPPO Career admin.",
      ],
      stack: [ETechKey.REACT, ETechKey.PHP, ETechKey.LARAVEL],
    },
  ],
  projects,
  clients,
  domains,
  techStack: [
    {
      label: 'Cross-platform',
      items: [
        {
          name: 'React Native · TypeScript',
          detail:
            '~7 years building and shipping iOS/Android apps; led React Native 0.62→0.72 upgrades, Android SDK 35 and 16 KB page-size migrations.',
        },
        {
          name: 'Flutter · Dart',
          detail: '~2 years delivering Flutter apps, plus native-Kotlin module integrations for presale POCs.',
        },
      ],
    },
    {
      label: 'Animation & interaction',
      items: [
        {
          name: 'Reanimated v2/v3 · Gesture Handler',
          detail:
            'Spring-based animations (withSpring, interpolation, debounced transitions) and swipe/pan gestures tuned for iOS and Android.',
        },
        {
          name: 'React Native Skia',
          detail: 'Custom canvas drawing — e.g. a vehicle trip/event timeline that stays smooth with large event sets.',
        },
      ],
    },
    {
      label: 'Library patching & native build',
      items: [
        {
          name: 'patch-package',
          detail:
            'Patches unmaintained third-party RN libraries (JS, Objective-C/Swift, Java/Kotlin) to fix CocoaPods/Gradle failures and unblock upgrades.',
        },
        {
          name: 'UI from Figma',
          detail: 'High-fidelity UI revamps with reusable components, Storybook and design tokens.',
        },
      ],
    },
    {
      label: 'Release & mobile services',
      items: [
        {
          name: 'Fastlane · DeployGate',
          detail: 'Mobile CI/CD pipelines, App Store / Google Play distribution and staged app versioning.',
        },
        {
          name: 'Firebase',
          detail: 'Authentication, Cloud Messaging, Crashlytics, Analytics, Remote Config, Dynamic Links migration and AdMob.',
        },
      ],
    },
  ],
  technologies: [
    {
      category: EStackCategory.LANGUAGES,
      keys: [ETechKey.TYPESCRIPT, ETechKey.JAVASCRIPT, ETechKey.DART, ETechKey.KOTLIN, ETechKey.SWIFT, ETechKey.PHP],
    },
    {
      category: EStackCategory.MOBILE_FRAMEWORKS,
      keys: [ETechKey.REACT_NATIVE, ETechKey.FLUTTER],
    },
    {
      category: EStackCategory.STATE_DATA,
      keys: [ETechKey.REDUX, ETechKey.TANSTACK_QUERY, ETechKey.ZUSTAND],
    },
    {
      category: EStackCategory.BACKEND_SERVICES,
      keys: [ETechKey.FIREBASE, ETechKey.LARAVEL, ETechKey.NEST, ETechKey.POSTGRES, ETechKey.MYSQL],
    },
    {
      category: EStackCategory.RELEASE,
      keys: [ETechKey.FASTLANE, ETechKey.DEPLOYGATE, ETechKey.APP_STORE, ETechKey.GOOGLE_PLAY],
    },
    {
      category: EStackCategory.TOOLS,
      keys: [ETechKey.JIRA, ETechKey.FIGMA, ETechKey.CLAUDE, ETechKey.CURSOR, ETechKey.GITHUB],
    },
  ],
  certifications,
  education,
  // MOCK: the CVs state explicitly that no GitHub, LinkedIn or portfolio URL exists anywhere in
  // the Drive folder (docs/drive-scan-notes.md §2/§8) — kept to Email rather than link to a
  // generic, not-actually-this-person's-profile homepage.
  links: [{ kind: ELinkKind.EMAIL, label: 'Email', href: 'mailto:truongtoanlvc@gmail.com' }],
  resumeUrl: '/resume-mobile.pdf',
});
