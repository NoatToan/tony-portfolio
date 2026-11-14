import { z } from 'zod';

import {
  EDomainIcon,
  EImageKind,
  ELinkKind,
  EStackCategory,
  ETechKey,
  EVariant,
} from '@/_modules/config/enums';

/**
 * Contract for the portfolio's content (docs/DECISIONS.md). There is no backend here — every
 * field is editorial copy the site owner pastes in later — but the shape still goes through a
 * schema (15-zod-contract-first.md) so a typo in a mock file fails `tsc`/import time instead of
 * silently rendering wrong data.
 */

export const zImageAsset = z.object({
  src: z.string(),
  alt: z.string(),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
});

export const zSocialLink = z.object({
  kind: z.nativeEnum(ELinkKind),
  label: z.string(),
  href: z.string(),
});

export const zProfile = z.object({
  name: z.string(),
  avatar: zImageAsset.optional(),
  role: z.string(),
  tagline: z.string(),
  location: z.string(),
  availability: z.string().optional(),
  email: z.string(),
});

export const zExperience = z.object({
  company: z.string(),
  companyUrl: z.string().optional(),
  title: z.string(),
  period: z.string(),
  location: z.string().optional(),
  current: z.boolean().optional(),
  highlights: z.array(z.string()),
  stack: z.array(z.nativeEnum(ETechKey)),
});

export const zProjectLink = z.object({
  label: z.string(),
  href: z.string(),
});

export const zProjectImage = zImageAsset.extend({ kind: z.nativeEnum(EImageKind) });

/** One published app inside a project that ships multiple store listings (see storeAssets.ts). */
export const zProjectApp = z.object({
  slug: z.string(),
  label: z.string().optional(),
});

export const zProjectStoreLinks = z.object({
  appStore: z.url().nullable().optional(),
  playStore: z.url().nullable().optional(),
});

export const zProject = z.object({
  name: z.string(),
  description: z.string(),
  role: z.string().optional(),
  metric: z.string().optional(),
  stack: z.array(z.nativeEnum(ETechKey)),
  links: z.array(zProjectLink),
  image: zProjectImage.optional(),
  /** Key into storeAssets.json for a single-app project (icon, screenshots, store links). */
  slug: z.string().optional(),
  /** Manual override/fallback when storeAssets.json has no entry, or isn't ready yet. */
  storeLinks: zProjectStoreLinks.optional(),
  /** Manual override/fallback screenshot paths, used the same way as `storeLinks`. */
  gallery: z.array(z.string()).optional(),
  /** Multiple published apps under one project (e.g. a suite, or a user/admin pair). */
  apps: z.array(zProjectApp).optional(),
});

export const zDomain = z.object({
  name: z.string(),
  description: z.string(),
  icon: z.nativeEnum(EDomainIcon).optional(),
  tags: z.array(z.string()).optional(),
  relatedProjects: z.array(z.string()).optional(),
});

export const zTechItem = z.object({
  name: z.string(),
  detail: z.string(),
});

export const zTechGroup = z.object({
  label: z.string(),
  items: z.array(zTechItem),
});

export const zTechCategoryGroup = z.object({
  category: z.nativeEnum(EStackCategory),
  keys: z.array(z.nativeEnum(ETechKey)),
});

export const zClient = z.object({
  name: z.string(),
  logo: z.string().optional(),
  /** Key into storeAssets.json, used for the logo when `logo` isn't set directly. */
  slug: z.string().optional(),
  industry: z.string(),
  country: z.string().optional(),
  engagement: z.string(),
  relatedProject: z.string().optional(),
  url: z.string().optional(),
});

export const zCertification = z.object({
  name: z.string(),
  issuer: z.nativeEnum(ETechKey).optional(),
  issuerName: z.string(),
  issuedDate: z.string(),
  expiresDate: z.string().optional(),
  credentialId: z.string().optional(),
  credentialUrl: z.string().optional(),
});

export const zEducation = z.object({
  school: z.string(),
  degree: z.string(),
  period: z.string(),
  location: z.string().optional(),
});

export const zPortfolioContent = z.object({
  slug: z.nativeEnum(EVariant),
  variantLabel: z.string(),
  meta: z.object({ title: z.string(), description: z.string() }),
  profile: zProfile,
  summary: z.array(z.string()),
  experience: z.array(zExperience),
  projects: z.array(zProject),
  clients: z.array(zClient),
  domains: z.array(zDomain),
  techStack: z.array(zTechGroup),
  technologies: z.array(zTechCategoryGroup),
  certifications: z.array(zCertification),
  education: z.array(zEducation),
  links: z.array(zSocialLink),
  resumeUrl: z.string(),
});

export type ImageAsset = z.infer<typeof zImageAsset>;
export type SocialLink = z.infer<typeof zSocialLink>;
export type Profile = z.infer<typeof zProfile>;
export type Experience = z.infer<typeof zExperience>;
export type ProjectLink = z.infer<typeof zProjectLink>;
export type ProjectApp = z.infer<typeof zProjectApp>;
export type ProjectStoreLinks = z.infer<typeof zProjectStoreLinks>;
export type Project = z.infer<typeof zProject>;
export type Domain = z.infer<typeof zDomain>;
export type TechItem = z.infer<typeof zTechItem>;
export type TechGroup = z.infer<typeof zTechGroup>;
export type TechCategoryGroup = z.infer<typeof zTechCategoryGroup>;
export type Client = z.infer<typeof zClient>;
export type Certification = z.infer<typeof zCertification>;
export type Education = z.infer<typeof zEducation>;
export type PortfolioContent = z.infer<typeof zPortfolioContent>;
