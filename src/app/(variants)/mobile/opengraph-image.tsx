import { OG_SIZE, renderOg } from '@/_modules/server/og/renderOg';
import { mobileContent } from '@/_modules/server/content';

export const alt = mobileContent.meta.title;
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function Image() {
  return renderOg(mobileContent);
}
