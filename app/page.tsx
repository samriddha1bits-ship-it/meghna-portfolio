import Portfolio from "@/components/Portfolio";
import About from "@/components/work/About";
import Contact from "@/components/work/Contact";
import Education from "@/components/work/Education";
import Hero from "@/components/work/Hero";
import Interests from "@/components/work/Interests";
import Reviews from "@/components/work/Reviews";
import Ticker from "@/components/work/Ticker";
import Writing from "@/components/work/Writing";
import { siteDescription, siteName, siteUrl } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: siteName,
      url: siteUrl,
      image: `${siteUrl}/meghna-portrait.jpg`,
      description: siteDescription,
      jobTitle: "Writer",
      alumniOf: { "@type": "CollegeOrUniversity", name: "Presidency University" },
      sameAs: [
        "https://www.instagram.com/meghnaaaaa_bose/",
        "https://www.linkedin.com/in/meghna-bose-2485b941a/",
      ],
    },
    {
      "@type": "Book",
      name: "A World Seen at Eighteen",
      author: { "@type": "Person", name: siteName },
      publisher: { "@type": "Organization", name: "Writer's Pocket" },
      numberOfPages: 51,
      image: `${siteUrl}/book-cover.jpg`,
      url: "https://play.google.com/store/books/details/Meghna_Bose_A_world_seen_at_Eighteen?id=bgPdEQAAQBAJ",
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Portfolio mode="work">
        <Hero />
        <Ticker />
        <About />
        <Writing />
        <Education />
        <Interests />
        <Reviews />
        <Contact />
      </Portfolio>
    </>
  );
}
