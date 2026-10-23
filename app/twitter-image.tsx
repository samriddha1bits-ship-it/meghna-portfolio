import { ogSize, renderOgImage } from "@/lib/og";

export const alt = "Meghna Bose — Writer & Creative Mind";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage();
}
