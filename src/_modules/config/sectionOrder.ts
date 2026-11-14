import { ESectionId } from '@/_modules/config/enums';

/**
 * Section order for both variants (see docs/DECISIONS.md "Section order revised").
 * Hero has no entry (it is not a rail destination); index starts at 1 for the rail's
 * optional mono counter.
 */
export const SECTION_ORDER: readonly ESectionId[] = [
  ESectionId.STACK,
  ESectionId.TECHNOLOGIES,
  ESectionId.ABOUT,
  ESectionId.EXPERIENCE,
  ESectionId.CLIENTS,
  ESectionId.PROJECTS,
  ESectionId.DOMAINS,
  ESectionId.CERTIFICATIONS,
  ESectionId.PERFORMANCE,
  ESectionId.CONTACT,
];
