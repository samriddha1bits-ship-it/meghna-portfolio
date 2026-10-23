import { amazonUrl, bookUrl, instagramUrl, linkedinUrl } from "@/data/content";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://meghna-portfolio-eta.vercel.app";

export const siteName = "Meghna Bose";
export const siteTitle = "Meghna Bose — Writer & Author of A World Seen at Eighteen";
export const siteDescription =
  "Meghna Bose is a writer and aspiring journalist, author of A World Seen at Eighteen. Explore her book, writing, interests and get in touch.";

export const socialProfiles = [instagramUrl, linkedinUrl];
export { amazonUrl, bookUrl };
