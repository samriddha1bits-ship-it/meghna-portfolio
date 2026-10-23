import Portfolio from "@/components/Portfolio";
import About from "@/components/work/About";
import Contact from "@/components/work/Contact";
import Education from "@/components/work/Education";
import Hero from "@/components/work/Hero";
import Interests from "@/components/work/Interests";
import Reviews from "@/components/work/Reviews";
import Ticker from "@/components/work/Ticker";
import Writing from "@/components/work/Writing";
import {
  amazonUrl,
  bookUrl,
  siteDescription,
  siteName,
  siteTitle,
  siteUrl,
  socialProfiles,
} from "@/lib/site";

const personId = `${siteUrl}/#person`;
const websiteId = `${siteUrl}/#website`;
const bookId = `${siteUrl}/#book`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: siteUrl,
      name: siteName,
      description: siteDescription,
      inLanguage: "en",
      publisher: { "@id": personId },
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#profile`,
      url: siteUrl,
      name: siteTitle,
      isPartOf: { "@id": websiteId },
      mainEntity: { "@id": personId },
      inLanguage: "en",
    },
    {
      "@type": "Person",
      "@id": personId,
      name: siteName,
      url: siteUrl,
      image: `${siteUrl}/meghna-portrait.jpg`,
      description: siteDescription,
      jobTitle: "Writer",
      knowsAbout: [
        "Writing",
        "Poetry",
        "Short stories",
        "Essays",
        "Journalism",
        "Literature",
        "Performing arts",
      ],
      alumniOf: { "@type": "CollegeOrUniversity", name: "Presidency University" },
      subjectOf: { "@id": bookId },
      sameAs: socialProfiles,
    },
    {
      "@type": "Book",
      "@id": bookId,
      name: "A World Seen at Eighteen",
      author: { "@id": personId },
      publisher: { "@type": "Organization", name: "Writer's Pocket" },
      inLanguage: "en",
      genre: ["Non-fiction", "Reflection"],
      numberOfPages: 51,
      isbn: "9372487031",
      image: `${siteUrl}/book-cover.jpg`,
      url: bookUrl,
      sameAs: [amazonUrl],
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
