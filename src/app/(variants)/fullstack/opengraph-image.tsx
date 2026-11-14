import { fullstack } from "@/content";
import { ogSize, renderOg } from "@/lib/og";

export const alt = fullstack.meta.title;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg(fullstack);
}
