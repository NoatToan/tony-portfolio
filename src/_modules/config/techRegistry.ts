import {
  siAlgolia,
  siAppstore,
  siBluetooth,
  siClaude,
  siClickup,
  siAsana,
  siCursor,
  siDart,
  siDocker,
  siExpo,
  siExpress,
  siFastlane,
  siFigma,
  siFirebase,
  siFlutter,
  siGithub,
  siGithubactions,
  siGoogleplay,
  siGraphql,
  siIonic,
  siJavascript,
  siJira,
  siKotlin,
  siLaravel,
  siMeta,
  siMongodb,
  siMysql,
  siNestjs,
  siNextdotjs,
  siNginx,
  siNodedotjs,
  siOpenapiinitiative,
  siOpenjsfoundation,
  siPhp,
  siPostgresql,
  siPrisma,
  siReact,
  siReactquery,
  siRedis,
  siRedux,
  siRevenuecat,
  siSocketdotio,
  siSqlite,
  siStripe,
  siSupabase,
  siSwift,
  siTailwindcss,
  siTrpc,
  siTypescript,
  siVercel,
  siVuedotjs,
  type SimpleIcon,
} from 'simple-icons';

import { ETechKey } from '@/_modules/config/enums';
import { DEVICON_PATHS } from '@/_modules/config/techIconsDevicon';

export interface TechIconPath {
  viewBox: string;
  path: string;
}

export interface TechEntry {
  name: string;
  /** Official brand hex without '#'. Brand data, not a UI token (see docs/DECISIONS.md). */
  hex: string | undefined;
  icon: TechIconPath | undefined;
  /** True when the brand colour is too dark to read on the dark theme. */
  darkBrand: boolean;
}

const SI_VIEWBOX = '0 0 24 24';

/** Relative luminance (WCAG) of a hex colour, used for the dark-theme fallback. */
function luminance(hex: string) {
  const channel = (i: number) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(0) + 0.7152 * channel(2) + 0.0722 * channel(4);
}

function fromSimpleIcon(name: string, icon: SimpleIcon): TechEntry {
  return {
    name,
    hex: icon.hex,
    icon: { viewBox: SI_VIEWBOX, path: icon.path },
    darkBrand: luminance(icon.hex) < 0.05,
  };
}

function fromDevicon(name: string, hex: string, icon: TechIconPath): TechEntry {
  return { name, hex, icon, darkBrand: luminance(hex) < 0.05 };
}

/** No official mark available: rendered as a text-only tag or a monogram. */
function textOnly(name: string): TechEntry {
  return { name, hex: undefined, icon: undefined, darkBrand: false };
}

export const TECH_REGISTRY: Record<ETechKey, TechEntry> = {
  [ETechKey.TYPESCRIPT]: fromSimpleIcon('TypeScript', siTypescript),
  [ETechKey.JAVASCRIPT]: fromSimpleIcon('JavaScript', siJavascript),
  [ETechKey.NODE]: fromSimpleIcon('Node.js', siNodedotjs),
  [ETechKey.NEST]: fromSimpleIcon('NestJS', siNestjs),
  [ETechKey.EXPRESS]: fromSimpleIcon('Express', siExpress),
  [ETechKey.GRAPHQL]: fromSimpleIcon('GraphQL', siGraphql),
  [ETechKey.REACT]: fromSimpleIcon('React', siReact),
  [ETechKey.NEXT]: fromSimpleIcon('Next.js', siNextdotjs),
  [ETechKey.TAILWIND]: fromSimpleIcon('Tailwind CSS', siTailwindcss),
  [ETechKey.VUE]: fromSimpleIcon('Vue', siVuedotjs),
  [ETechKey.POSTGRES]: fromSimpleIcon('PostgreSQL', siPostgresql),
  [ETechKey.MYSQL]: fromSimpleIcon('MySQL', siMysql),
  [ETechKey.MONGODB]: fromSimpleIcon('MongoDB', siMongodb),
  [ETechKey.REDIS]: fromSimpleIcon('Redis', siRedis),
  [ETechKey.PRISMA]: fromSimpleIcon('Prisma', siPrisma),
  [ETechKey.DOCKER]: fromSimpleIcon('Docker', siDocker),
  [ETechKey.AWS]: fromDevicon('AWS', 'FF9900', DEVICON_PATHS.aws),
  [ETechKey.VERCEL]: fromSimpleIcon('Vercel', siVercel),
  [ETechKey.GITHUB_ACTIONS]: fromSimpleIcon('GitHub Actions', siGithubactions),
  [ETechKey.NGINX]: fromSimpleIcon('Nginx', siNginx),
  [ETechKey.FIREBASE]: fromSimpleIcon('Firebase', siFirebase),
  [ETechKey.STRIPE]: fromSimpleIcon('Stripe', siStripe),
  [ETechKey.REVENUECAT]: fromSimpleIcon('RevenueCat', siRevenuecat),
  [ETechKey.SLACK]: fromDevicon('Slack', '4A154B', DEVICON_PATHS.slack),
  [ETechKey.JIRA]: fromSimpleIcon('Jira', siJira),
  [ETechKey.CLICKUP]: fromSimpleIcon('ClickUp', siClickup),
  [ETechKey.ASANA]: fromSimpleIcon('Asana', siAsana),
  [ETechKey.CLAUDE]: fromSimpleIcon('Claude', siClaude),
  [ETechKey.DART]: fromSimpleIcon('Dart', siDart),
  [ETechKey.KOTLIN]: fromSimpleIcon('Kotlin', siKotlin),
  [ETechKey.SWIFT]: fromSimpleIcon('Swift', siSwift),
  [ETechKey.REACT_NATIVE]: fromSimpleIcon('React Native', siReact),
  [ETechKey.EXPO]: fromSimpleIcon('Expo', siExpo),
  [ETechKey.EAS]: fromSimpleIcon('EAS / OTA', siExpo),
  [ETechKey.FLUTTER]: fromSimpleIcon('Flutter', siFlutter),
  [ETechKey.IONIC]: fromSimpleIcon('Ionic', siIonic),
  [ETechKey.REDUX]: fromSimpleIcon('Redux', siRedux),
  [ETechKey.TANSTACK_QUERY]: fromSimpleIcon('TanStack Query', siReactquery),
  // devicon's Zustand artwork is a 57 kB bitmap trace; text-only keeps the page small.
  [ETechKey.ZUSTAND]: textOnly('Zustand'),
  [ETechKey.SQLITE]: fromSimpleIcon('SQLite', siSqlite),
  [ETechKey.SUPABASE]: fromSimpleIcon('Supabase', siSupabase),
  [ETechKey.APP_STORE]: fromSimpleIcon('App Store', siAppstore),
  [ETechKey.GOOGLE_PLAY]: fromSimpleIcon('Google Play', siGoogleplay),
  [ETechKey.FASTLANE]: fromSimpleIcon('Fastlane', siFastlane),
  [ETechKey.FIGMA]: fromSimpleIcon('Figma', siFigma),
  [ETechKey.TRPC]: fromSimpleIcon('tRPC', siTrpc),
  [ETechKey.OPENAPI]: fromSimpleIcon('OpenAPI', siOpenapiinitiative),
  [ETechKey.WEBSOCKET]: fromSimpleIcon('WebSocket', siSocketdotio),
  [ETechKey.BLE]: fromSimpleIcon('BLE', siBluetooth),
  [ETechKey.CUSTOM_PAINTER]: textOnly('CustomPainter'),
  [ETechKey.META]: fromSimpleIcon('Meta', siMeta),
  [ETechKey.OPENJS]: fromSimpleIcon('OpenJS Foundation', siOpenjsfoundation),
  [ETechKey.SCRUM_ORG]: textOnly('Scrum.org'),
  [ETechKey.ETS]: textOnly('ETS'),
  [ETechKey.GITHUB]: fromSimpleIcon('GitHub', siGithub),
  [ETechKey.PHP]: fromSimpleIcon('PHP', siPhp),
  [ETechKey.LARAVEL]: fromSimpleIcon('Laravel', siLaravel),
  [ETechKey.ALGOLIA]: fromSimpleIcon('Algolia', siAlgolia),
  [ETechKey.AZURE_DEVOPS]: fromDevicon('Azure DevOps', '0078D4', DEVICON_PATHS.azuredevops),
  [ETechKey.CURSOR]: fromSimpleIcon('Cursor', siCursor),
  // No official mark for these React Native libraries — text-only tags.
  [ETechKey.REANIMATED]: textOnly('Reanimated'),
  [ETechKey.GESTURE_HANDLER]: textOnly('Gesture Handler'),
  [ETechKey.SKIA]: textOnly('Skia'),
  [ETechKey.DEPLOYGATE]: textOnly('DeployGate'),
  [ETechKey.NETS_CLICK]: textOnly('NETS Click'),
};

export const techSymbolId = (key: ETechKey) => `tech-${key}`;
