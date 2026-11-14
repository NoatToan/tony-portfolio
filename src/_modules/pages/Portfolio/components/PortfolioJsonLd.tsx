import BaseJsonLd from '@/_modules/common/components/BaseJsonLd';
import { ELinkKind } from '@/_modules/config/enums';
import { SITE_URL } from '@/_modules/config/site';
import { TECH_REGISTRY } from '@/_modules/config/techRegistry';
import type { PortfolioContent } from '@/_modules/server/content/schemas';

/** Person schema, including `hasCredential` for each certification (docs/DECISIONS.md "Certifications + Education"). */
export default function PortfolioJsonLd({ content }: { content: PortfolioContent }) {
  const socials = content.links.filter((link) => link.kind !== ELinkKind.EMAIL);

  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: content.profile.name,
    jobTitle: content.profile.role,
    description: content.profile.tagline,
    url: `${SITE_URL}/${content.slug}`,
    email: `mailto:${content.profile.email}`,
    address: { '@type': 'PostalAddress', addressLocality: content.profile.location },
    ...(content.profile.avatar ? { image: `${SITE_URL}${content.profile.avatar.src}` } : {}),
    sameAs: socials.map((link) => link.href),
    knowsAbout: content.techStack.flatMap((group) => group.items.map((item) => item.name)),
    hasCredential: content.certifications.map((certification) => ({
      '@type': 'EducationalOccupationalCredential',
      name: certification.name,
      credentialCategory: 'certification',
      recognizedBy: {
        '@type': 'Organization',
        name: certification.issuer ? TECH_REGISTRY[certification.issuer].name : certification.issuerName,
      },
      ...(certification.credentialUrl ? { url: certification.credentialUrl } : {}),
      ...(certification.credentialId ? { identifier: certification.credentialId } : {}),
      dateCreated: certification.issuedDate,
      ...(certification.expiresDate ? { expires: certification.expiresDate } : {}),
    })),
  };

  return <BaseJsonLd data={data} />;
}
