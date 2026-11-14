import { OG_SIZE, renderOg } from '@/_modules/server/og/renderOg';

export const alt = 'Tony Nguyen — Software Engineer';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function Image() {
  return renderOg(null);
}
