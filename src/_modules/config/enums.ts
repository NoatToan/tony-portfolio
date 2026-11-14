export enum EVariant {
  FULLSTACK = 'fullstack',
  MOBILE = 'mobile',
}

/** Section anchors, in page order (see SECTION_ORDER). */
export enum ESectionId {
  STACK = 'stack',
  TECHNOLOGIES = 'technologies',
  ABOUT = 'about',
  EXPERIENCE = 'experience',
  CLIENTS = 'clients',
  PROJECTS = 'projects',
  DOMAINS = 'domains',
  CERTIFICATIONS = 'certifications',
  PERFORMANCE = 'performance',
  CONTACT = 'contact',
}

export enum EBenchmarkSectionId {
  LIGHTHOUSE = 'lighthouse',
  METRICS = 'metrics',
  BUNDLE = 'bundle',
  LIVE = 'live',
  METHOD = 'method',
}

export enum ELinkKind {
  GITHUB = 'github',
  LINKEDIN = 'linkedin',
  EMAIL = 'email',
  WEBSITE = 'website',
}

export enum EImageKind {
  WEB = 'web',
  PHONE = 'phone',
}

export enum EDomainIcon {
  ERP = 'erp',
  ECOMMERCE = 'ecommerce',
  CRM = 'crm',
  AUTOMATION = 'automation',
  AI = 'ai',
  MORE = 'more',
}

export enum EStackCategory {
  LANGUAGES = 'languages',
  BACKEND = 'backend',
  FRONTEND = 'frontend',
  DATABASE = 'database',
  CLOUD = 'cloud',
  SERVICES = 'services',
  TOOLS = 'tools',
  MOBILE_FRAMEWORKS = 'mobileFrameworks',
  STATE_DATA = 'stateData',
  BACKEND_SERVICES = 'backendServices',
  RELEASE = 'release',
}

export enum EFormFactor {
  MOBILE = 'mobile',
  DESKTOP = 'desktop',
}

export enum EScoreTone {
  GOOD = 'good',
  OK = 'ok',
  POOR = 'poor',
}

export enum ETheme {
  LIGHT = 'light',
  DARK = 'dark',
}

export enum EVitalName {
  TTFB = 'TTFB',
  FCP = 'FCP',
  LCP = 'LCP',
  CLS = 'CLS',
  INP = 'INP',
}

/** Every technology the site can show. Name, icon and brand colour live in techRegistry. */
export enum ETechKey {
  TYPESCRIPT = 'typescript',
  JAVASCRIPT = 'javascript',
  NODE = 'node',
  NEST = 'nest',
  EXPRESS = 'express',
  GRAPHQL = 'graphql',
  REACT = 'react',
  NEXT = 'next',
  TAILWIND = 'tailwind',
  VUE = 'vue',
  POSTGRES = 'postgres',
  MYSQL = 'mysql',
  MONGODB = 'mongodb',
  REDIS = 'redis',
  PRISMA = 'prisma',
  DOCKER = 'docker',
  AWS = 'aws',
  VERCEL = 'vercel',
  GITHUB_ACTIONS = 'githubActions',
  NGINX = 'nginx',
  FIREBASE = 'firebase',
  STRIPE = 'stripe',
  REVENUECAT = 'revenuecat',
  SLACK = 'slack',
  JIRA = 'jira',
  CLICKUP = 'clickup',
  ASANA = 'asana',
  CLAUDE = 'claude',
  DART = 'dart',
  KOTLIN = 'kotlin',
  SWIFT = 'swift',
  REACT_NATIVE = 'reactNative',
  EXPO = 'expo',
  EAS = 'eas',
  FLUTTER = 'flutter',
  IONIC = 'ionic',
  REDUX = 'redux',
  TANSTACK_QUERY = 'tanstackQuery',
  ZUSTAND = 'zustand',
  SQLITE = 'sqlite',
  SUPABASE = 'supabase',
  APP_STORE = 'appStore',
  GOOGLE_PLAY = 'googlePlay',
  FASTLANE = 'fastlane',
  FIGMA = 'figma',
  TRPC = 'trpc',
  OPENAPI = 'openapi',
  WEBSOCKET = 'websocket',
  BLE = 'ble',
  CUSTOM_PAINTER = 'customPainter',
  META = 'meta',
  OPENJS = 'openjs',
  SCRUM_ORG = 'scrumOrg',
  ETS = 'ets',
  GITHUB = 'github',
  PHP = 'php',
  LARAVEL = 'laravel',
  ALGOLIA = 'algolia',
  AZURE_DEVOPS = 'azureDevops',
  CURSOR = 'cursor',
  REANIMATED = 'reanimated',
  GESTURE_HANDLER = 'gestureHandler',
  SKIA = 'skia',
  DEPLOYGATE = 'deploygate',
  NETS_CLICK = 'netsClick',
}
