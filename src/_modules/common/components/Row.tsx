import { cx } from '@/_modules/common/utils/utilsClassNames';

import Box, { type BoxProps } from './Box';

/** Horizontal flex container. */
export default function Row({ className, ...rest }: BoxProps) {
  return <Box className={cx('flex flex-row', className)} {...rest} />;
}
