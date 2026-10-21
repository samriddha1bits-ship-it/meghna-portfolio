import type { Metadata, Viewport } from "next";
import { siteDescription, siteName, siteUrl } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Meghna Bose — Writer & Creative Mind",
    template: "%s | Meghna Bose",
  },
  description: siteDescription,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName,
    title: "Meghna Bose — Writer & Creative Mind",
    description: siteDescription,
    url: "/",
    images: [
      {
        url: "/meghna-portrait.jpg",
        alt: "Portrait of Meghna Bose",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Meghna Bose — Writer & Creative Mind",
    description: siteDescription,
    images: ["/meghna-portrait.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0d0b12",
};

const fontsHref =
  "https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600&display=swap";

// Runs before first paint so returning visitors never see a wrong-theme flash.
// Saved choice wins; otherwise follow the OS setting; fall back to dark.
const themeScript = `(function(){try{var t=localStorage.getItem("meghna-theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}document.documentElement.dataset.theme=t}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="stylesheet" href={fontsHref} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
