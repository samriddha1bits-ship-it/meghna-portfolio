import type { MetadataRoute } from "next";
import { siteDescription, siteName, siteTitle } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteTitle,
    short_name: siteName,
    description: siteDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#0d0b12",
    theme_color: "#0d0b12",
    icons: [{ src: "/icon", sizes: "512x512", type: "image/png" }],
  };
}
