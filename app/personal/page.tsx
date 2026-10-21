import type { Metadata } from "next";
import Portfolio from "@/components/Portfolio";

export const metadata: Metadata = {
  title: "Personal",
  description:
    "A little world of Meghna — favourite things, small joys, and memories.",
  alternates: { canonical: "/personal" },
  openGraph: { url: "/personal" },
};

export default function PersonalPage() {
  return <Portfolio mode="personal" />;
}
