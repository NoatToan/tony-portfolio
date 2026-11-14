import type { ElementType } from 'react';

import Box, { type BoxProps } from './Box';

export interface TextPrimaryProps extends BoxProps {
  as?: 'p' | 'span' | 'label' | 'h1' | 'h2' | 'h3' | 'blockquote';
}

/** Basic text primitive. Every piece of copy renders through this instead of a raw tag. */
export default function TextPrimary({ as = 'p', ...rest }: TextPrimaryProps) {
  return <Box as={as as ElementType} {...rest} />;
}
