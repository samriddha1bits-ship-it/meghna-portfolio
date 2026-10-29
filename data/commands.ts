import { email, type Mode, type Theme } from "@/data/content";

export type Command = { label: string; detail: string; action: string };

export function buildCommands(mode: Mode, theme: Theme): Command[] {
  const themeCommand = {
    label: "Toggle Theme",
    detail: `Switch to ${theme === "dark" ? "light" : "dark"} mode`,
    action: "theme",
  };
  const copyEmail = { label: "Copy Email", detail: email, action: "copy-email" };
  const copyQuote = {
    label: "Copy Quote",
    detail: "“And the beauty of solitude, that lets my heart win.”",
    action: "copy-quote",
  };

  if (mode === "work") {
    return [
      { label: "About", detail: "Meet Meghna & her creative philosophy", action: "about" },
      { label: "Book", detail: "A World Seen at Eighteen", action: "writing" },
      { label: "Poetry", detail: "Explore original poems by Meghna", action: "poetry" },
      { label: "Education", detail: "Presidency University & academic journey", action: "education" },
      { label: "Interests", detail: "Creative pursuits & inspirations", action: "interests" },
      { label: "Reviews", detail: "Reader testimonials", action: "reviews" },
      { label: "Contact", detail: "Send a direct message", action: "contact" },
      { label: "Switch to Personal Scrapbook", detail: "Open polaroids, memories & stickers", action: "personal" },
      themeCommand,
      copyQuote,
      copyEmail,
      { label: "Google Play Books", detail: "Open official book listing", action: "play" },
      { label: "Amazon", detail: "Order paperback / Kindle edition", action: "amazon" },
      { label: "Instagram", detail: "Open Instagram profile", action: "instagram" },
      { label: "LinkedIn", detail: "Connect professionally", action: "linkedin" },
    ];
  }

  return [
    { label: "About me", detail: "A little about who I am", action: "personal-about" },
    { label: "Things I love", detail: "Small joys & favourite things", action: "personal-favourites" },
    { label: "Little bits of life", detail: "Snapshots & memories", action: "personal-memories" },
    { label: "Switch to Work Mode", detail: "Return to professional portfolio", action: "work" },
    themeCommand,
    copyQuote,
    copyEmail,
  ];
}
