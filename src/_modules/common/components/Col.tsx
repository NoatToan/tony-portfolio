import { cx } from '@/_modules/common/utils/utilsClassNames';

import Box, { type BoxProps } from './Box';

/** Vertical flex container. The mobile-first default for any stack of content. */
export default function Col({ className, ...rest }: BoxProps) {
  return <Box className={cx('flex flex-col', className)} {...rest} />;
}
