import { mobile } from "@/content";
import { ogSize, renderOg } from "@/lib/og";

export const alt = mobile.meta.title;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg(mobile);
}
