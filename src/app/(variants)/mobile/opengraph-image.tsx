import { OG_SIZE, renderOg } from '@/_modules/server/og/renderOg';
import { mobileMock } from '@/_modules/server/content';

export const alt = mobileMock.meta.title;
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function Image() {
  return renderOg(mobileMock);
}
