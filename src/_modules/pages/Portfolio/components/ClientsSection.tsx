import BaseImage from '@/_modules/common/components/BaseImage';
import BaseLink from '@/_modules/common/components/BaseLink';
import BaseMonogram from '@/_modules/common/components/BaseMonogram';
import Box from '@/_modules/common/components/Box';
import TextPrimary from '@/_modules/common/components/TextPrimary';
import { ESectionId } from '@/_modules/config/enums';
import { SECTION_ORDER } from '@/_modules/config/sectionOrder';
import { joinWith } from '@/_modules/common/utils/utilsString';
import { t } from '@/_modules/i18next/i18n';
import type { Client } from '@/_modules/server/content/schemas';

import SectionShell from './SectionShell';

function ClientTile({ client }: { client: Client }) {
  const body = (
    <>
      {client.logo ? (
        <BaseImage
          src={client.logo}
          alt={t('clients.logo', { name: client.name })}
          width={320}
          height={56}
          sizes="160px"
          fallbackLabel={t('common.imageUnavailable')}
          className="h-8 w-auto max-w-full opacity-70 grayscale transition-[filter,opacity] duration-200 ease-out group-hover:opacity-100 group-hover:grayscale-0"
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
