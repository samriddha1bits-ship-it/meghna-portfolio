import { email, type Mode, type Theme } from "@/data/content";

export type Command = { label: string; detail: string; action: string };

export function buildCommands(mode: Mode, theme: Theme): Command[] {
  const themeCommand = {
    label: "Toggle Theme",
    detail: `Switch to ${theme === "dark" ? "light" : "dark"} mode`,
    action: "theme",
  };
  const copyEmail = { label: "Copy Email", detail: email, action: "copy-email" };

  if (mode === "work") {
    return [
      { label: "About", detail: "Meet Meghna & her philosophy", action: "about" },
      { label: "Publication", detail: "A World Seen at Eighteen", action: "writing" },
      { label: "Education", detail: "Presidency University & academic journey", action: "education" },
      { label: "Interests", detail: "Creative pursuits & inspirations", action: "interests" },
      { label: "Reviews", detail: "Reader testimonials", action: "reviews" },
      { label: "Contact", detail: "Send a direct message", action: "contact" },
      { label: "Switch to Personal Mode", detail: "Open the personal scrapbook", action: "personal" },
      themeCommand,
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
    copyEmail,
  ];
}
