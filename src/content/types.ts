/**
 * Shared content schema for every portfolio variant.
 * Edit the data files (fullstack.ts, mobile.ts); the layout reads only this shape.
 */

export type LinkKind = "github" | "linkedin" | "email" | "website" | "x";

export interface SocialLink {
  kind: LinkKind;
  label: string;
  href: string;
}

export interface ImageAsset {
  /** Path under /public (e.g. "/images/avatar.svg") or an absolute URL allowed in next.config. */
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Profile {
  name: string;
  /** Hero avatar. Swap for a real photo later (square works best). */
  avatar?: ImageAsset;
  /** Specific role title shown under the name. */
  role: string;
  /** One-line value statement for the hero. */
  tagline: string;
  location: string;
  /** Short availability note, e.g. "Open to remote roles". Optional. */
  availability?: string;
  email: string;
}

export interface Experience {
  company: string;
  companyUrl?: string;
  title: string;
  /** Free-form, e.g. "2023 — Present". */
  period: string;
  location?: string;
  /** Marks the current role (gets the live status dot on the full-stack variant). */
  current?: boolean;
  /** 2–3 impact bullets, metrics first. */
  highlights: string[];
  stack: string[];
}

export interface ProjectLink {
  label: "Live" | "Source" | "Case study" | "App Store" | "Google Play" | string;
  href: string;
}

export interface Project {
  name: string;
  /** One line: problem → outcome. */
  description: string;
  role?: string;
  /** Headline metric, e.g. "40% faster checkout". */
  metric?: string;
  stack: string[];
  links: ProjectLink[];
  /**
   * Thumbnail. kind "web" renders 16:10 in a plain frame,
   * kind "phone" renders 9:19.5 inside a phone frame.
   */
  image?: ImageAsset & { kind: "web" | "phone" };
}

export type DomainIcon = "erp" | "ecommerce" | "crm" | "automation" | "ai" | "more";

export interface Domain {
  name: string;
  /** One line. */
  description: string;
  icon?: DomainIcon;
  tags?: string[];
  /** Names of projects in this file that relate to the domain. */
  relatedProjects?: string[];
}

export interface TechItem {
  name: string;
  /** Short "what I did with it" line. */
  detail: string;
}

export interface TechGroup {
  label: string;
  items: TechItem[];
}

export interface Client {
  name: string;
  /** Logo under /public. Rendered grayscale, full colour on hover. */
  logo?: string;
  industry: string;
  country?: string;
  /** e.g. "Mobile app · 2023–2024" */
  engagement: string;
  relatedProject?: string;
  url?: string;
}

export interface PortfolioContent {
  /** Route slug, also used for OG/canonical. */
  slug: "fullstack" | "mobile";
  /** Short label used on the landing page. */
  variantLabel: string;
  meta: {
    title: string;
    description: string;
  };
  profile: Profile;
  /** About paragraphs (2–3). */
  summary: string[];
  experience: Experience[];
  projects: Project[];
  clients: Client[];
  domains: Domain[];
  /** Grouped capabilities. Replaces the old flat skills list. */
  techStack: TechGroup[];
  links: SocialLink[];
  /** Path under /public or absolute URL. */
  resumeUrl: string;
}
