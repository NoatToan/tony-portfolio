import { ETechKey } from '@/_modules/config/enums';
import { TECH_REGISTRY } from '@/_modules/config/techRegistry';

import BaseTechIcon from './BaseTechIcon';
import Box from './Box';
import Row from './Row';
import TextPrimary from './TextPrimary';

/**
 * Stack tags for a project/experience entry (docs/DECISIONS.md "Logos on project stack tags").
 * Each tag shows the official icon before the name, muted by default and brand-coloured on
 * hover; a tech with no registry artwork falls back to text only.
 */
export default function BaseTechTagList({ keys, label }: { keys: ETechKey[]; label: string }) {
  return (
    <Box as="ul" aria-label={label} className="flex flex-wrap gap-1.5">
      {keys.map((key) => {
        const entry = TECH_REGISTRY[key];
        return (
          <Box as="li" key={key}>
            <Row className="group items-center gap-1.5 rounded-full border border-border px-2.5 py-0.5">
              <BaseTechIcon techKey={key} className="size-3" />
              <TextPrimary as="span" className="font-mono text-2xs leading-5 text-muted">
                {entry.name}
              </TextPrimary>
            </Row>
          </Box>
        );
      })}
    </Box>
  );
}
