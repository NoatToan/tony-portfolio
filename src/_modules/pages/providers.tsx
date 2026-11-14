import type { ReactNode } from 'react';

import MotionProvider from '@/_modules/common/components/motion/MotionProvider';

export default function Providers({ children }: { children: ReactNode }) {
  return <MotionProvider>{children}</MotionProvider>;
}
