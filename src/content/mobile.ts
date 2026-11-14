import { sharedClients, sharedDomains, sharedTechStack } from "./shared";
import type { PortfolioContent } from "./types";

// PLACEHOLDER CONTENT — replace every field with real details before publishing.
export const mobile: PortfolioContent = {
  slug: "mobile",
  variantLabel: "Mobile · React Native + Flutter",
  meta: {
    title: "Tony Nguyen — Mobile Engineer (React Native + Flutter)",
    description:
      "Mobile engineer shipping cross-platform iOS and Android apps with React Native and Flutter. Placeholder portfolio.",
  },
  profile: {
    name: "Tony Nguyen",
    avatar: { src: "/images/avatar.svg", alt: "Placeholder monogram avatar for Tony Nguyen", width: 160, height: 160 },
    role: "Mobile Engineer — React Native + Flutter",
    tagline:
      "I ship smooth, offline-friendly iOS and Android apps — from native device integrations to store release pipelines.",
    location: "Ho Chi Minh City, Vietnam",
    availability: "Open to full-time & contract roles",
    email: "hello@example.com",
  },
  summary: [
    "Placeholder about text. I'm a mobile engineer with N+ years building cross-platform apps in React Native and Flutter. I care about 60fps interactions, startup time, and apps that keep working on a bad connection.",
    "I've worked across the whole lifecycle: native modules and BLE integrations, state and offline sync, CI/CD with Fastlane, and staged rollouts on the App Store and Google Play.",
    "I enjoy bridging product and platform — turning a rough idea into a release users actually keep.",
  ],
  experience: [
    {
      company: "Company A (placeholder)",
      companyUrl: "https://example.com",
      title: "Senior Mobile Engineer",
      period: "2023 — Present",
      current: true,
      location: "Remote",
      highlights: [
        "Placeholder: rebuilt the companion app in Flutter, cutting cold start from 3.1s to 1.2s.",
        "Placeholder: wrote BLE native modules (Swift/Kotlin) syncing data from 5 wearable brands.",
        "Placeholder: set up Fastlane + CI release trains; weekly releases with 99.8% crash-free sessions.",
      ],
      stack: ["Flutter", "Dart", "Swift", "Kotlin", "Firebase"],
    },
    {
      company: "Company B (placeholder)",
      companyUrl: "https://example.com",
      title: "React Native Engineer",
      period: "2020 — 2023",
      location: "Ho Chi Minh City",
      highlights: [
        "Placeholder: shipped a consumer app to 500k+ installs with a 4.7★ store rating.",
        "Placeholder: introduced offline-first sync, reducing failed submissions by 70%.",
      ],
      stack: ["React Native", "TypeScript", "Redux Toolkit", "Expo"],
    },
    {
      company: "Company C (placeholder)",
      title: "Software Engineer",
      period: "2018 — 2020",
      highlights: ["Placeholder: built hybrid field-service apps and their REST backends."],
      stack: ["JavaScript", "Ionic", "Node.js"],
    },
  ],
  projects: [
    {
      name: "Project One",
      description:
        "Placeholder: unified health app — reads data from multiple smartwatch brands over BLE into one timeline.",
      role: "Lead mobile engineer",
      metric: "5 device brands",
      stack: ["Flutter", "BLE", "Kotlin", "Swift"],
      image: { kind: "phone", src: "/images/projects/mobile-1.svg", alt: "Mock phone screen of a health app with activity rings and a daily timeline", width: 900, height: 1950 },
      links: [
        { label: "Case study", href: "https://example.com" },
        { label: "Source", href: "https://github.com/" },
      ],
    },
    {
      name: "Project Two",
      description:
        "Placeholder: field inspection app with offline forms, photo capture, and background sync.",
      role: "Solo build",
      metric: "−70% failed syncs",
      stack: ["React Native", "Expo", "SQLite", "TypeScript"],
      image: { kind: "phone", src: "/images/projects/mobile-2.svg", alt: "Mock phone screen of an offline inspection form with photo capture", width: 900, height: 1950 },
      links: [
        { label: "App Store", href: "https://apps.apple.com/" },
        { label: "Google Play", href: "https://play.google.com/" },
      ],
    },
    {
      name: "Project Three",
      description: "Placeholder: open-source Flutter package for animated charts on low-end devices.",
      metric: "1k+ pub.dev likes",
      stack: ["Flutter", "Dart", "CustomPainter"],
      image: { kind: "phone", src: "/images/projects/mobile-3.svg", alt: "Mock phone screen of an app showing line and bar charts", width: 900, height: 1950 },
      links: [{ label: "Source", href: "https://github.com/" }],
    },
  ],
  clients: sharedClients,
  domains: sharedDomains,
  techStack: [
    {
      label: "Cross-platform",
      items: [
        { name: "React Native · Expo", detail: "Placeholder: TypeScript apps with Reanimated, React Query and EAS builds." },
        { name: "Flutter · Dart", detail: "Placeholder: Riverpod/Bloc architecture, CustomPainter charts, golden tests." },
      ],
    },
    {
      label: "Native & device",
      items: [
        { name: "Native modules · BLE", detail: "Placeholder: Swift/Kotlin bridges for Bluetooth wearables and sensors." },
        { name: "Background work", detail: "Placeholder: background fetch, sync and local notifications." },
      ],
    },
    {
      label: "Release",
      items: [
        { name: "OTA updates", detail: "Placeholder: EAS Update / Shorebird channels with staged rollouts." },
        { name: "App Store · Google Play", detail: "Placeholder: Fastlane pipelines, TestFlight, review and phased release." },
      ],
    },
    ...sharedTechStack,
  ],
  links: [
    { kind: "github", label: "GitHub", href: "https://github.com/" },
    { kind: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/" },
    { kind: "email", label: "Email", href: "mailto:hello@example.com" },
  ],
  resumeUrl: "/resume-mobile.pdf",
};
