import type { Metadata } from "next";
import Portfolio from "@/components/Portfolio";
import PersonalPage from "@/components/personal/PersonalPage";

export const metadata: Metadata = {
  title: "Personal Scrapbook",
  description:
    "A little world of Meghna — favourite things, small joys, and memories.",
  alternates: { canonical: "/personal" },
  openGraph: { url: "/personal" },
};

export default function Page() {
  return (
    <Portfolio mode="personal">
      <PersonalPage />
    </Portfolio>
  );
}
