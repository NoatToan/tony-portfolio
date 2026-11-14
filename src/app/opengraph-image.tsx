import { ogSize, renderOg } from "@/lib/og";

export const alt = "Tony Nguyen — Software Engineer";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg(null);
}
