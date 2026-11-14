import BaseImage from '@/_modules/common/components/BaseImage';
import BaseLink from '@/_modules/common/components/BaseLink';
import BaseMonogram from '@/_modules/common/components/BaseMonogram';
import Box from '@/_modules/common/components/Box';
import TextPrimary from '@/_modules/common/components/TextPrimary';
import { ESectionId } from '@/_modules/config/enums';
import { SECTION_ORDER } from '@/_modules/config/sectionOrder';
import { isRasterImage, joinWith } from '@/_modules/common/utils/utilsString';
import { t } from '@/_modules/i18next/i18n';
import type { Client } from '@/_modules/server/content/schemas';
import { getStoreAsset } from '@/_modules/server/content/storeAssets';

import SectionShell from './SectionShell';

function ClientTile({ client }: { client: Client }) {
  // Real app icons (square) share this tile with the old wordmark mocks (landscape). The box is
  // a *fixed* size (never `w-auto`) so it can't change when the image decodes — a CSS `auto` size
  // resolves from the real decoded pixels, not the width/height attributes, so a wordmark's 320×56
  // hint would be replaced by a square icon's real 1:1 ratio post-load and shift the layout
  // (web.dev CLS; ai/shared-fe/10 §3). `object-contain` letterboxes either shape without stretching.
  const logo = client.logo ?? getStoreAsset(client.slug)?.icon;
  const body = (
    <>
      {logo ? (
        <BaseImage
          src={logo}
          alt={t('clients.logo', { name: client.name })}
          width={320}
          height={56}
          sizes="80px"
          fallbackLabel={t('common.imageUnavailable')}
          unoptimized={!isRasterImage(logo)}
          className="h-8 w-20 max-w-full object-contain opacity-70 grayscale transition-[filter,opacity] duration-200 ease-out group-hover:opacity-100 group-hover:grayscale-0"
        />
      ) : (
        <BaseMonogram label={client.name} className="size-8" />
      )}
      <TextPrimary as="p" className="mt-3 font-mono text-2xs text-subtle">
        {joinWith('·', client.industry, client.country)}
      </TextPrimary>
      <TextPrimary as="p" className="mt-0.5 text-xs leading-snug text-muted">
        {client.engagement}
      </TextPrimary>
    </>
  );

  return (
    <Box as="li" className="group bg-bg p-4">
      {client.url ? (
        <BaseLink href={client.url} className="!flex !flex-col !items-start !gap-0">
          {body}
        </BaseLink>
      ) : (
        body
      )}
    </Box>
  );
}

export default function ClientsSection({ clients }: { clients: Client[] }) {
  const countries = new Set(clients.map((client) => client.country).filter(Boolean)).size;
  const industries = new Set(clients.map((client) => client.industry)).size;

  return (
    <SectionShell
      id={ESectionId.CLIENTS}
      title={t('section.clients')}
      index={SECTION_ORDER.indexOf(ESectionId.CLIENTS) + 1}
    >
      <TextPrimary as="p" className="mb-6 text-sm text-muted">
        {t('clients.summary', { clients: clients.length, countries, industries })}
      </TextPrimary>
      <Box
        as="ul"
        className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3"
      >
        {clients.map((client) => (
          <ClientTile key={client.name} client={client} />
        ))}
      </Box>
    </SectionShell>
  );
}
