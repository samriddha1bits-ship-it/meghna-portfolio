export type Theme = "dark" | "light";
export type Mode = "work" | "personal";

export const bookUrl =
  "https://play.google.com/store/books/details/Meghna_Bose_A_world_seen_at_Eighteen?id=bgPdEQAAQBAJ";

export const amazonUrl =
  "https://www.amazon.in/world-seen-at-Eighteen/dp/9372487031";

export const instagramUrl = "https://www.instagram.com/meghnaaaaa_bose/?hl=en";

export const linkedinUrl = "https://www.linkedin.com/in/meghna-bose-2485b941a/";

export const email = "meghnabosesupport@gmail.com";

export const reviews = [
  {
    name: "Samriddha Banerjee",
    rating: 5,
    date: "October 14, 2026",
    source: "Google Play Books",
    text: "Finished reading it today, and honestly, it was mind-blowing! ✨ Simple, natural, and incredibly thought-provoking, this is definitely a great read for anyone who enjoys exploring innovative and intellectual stuffs. The author's effort in putting together such a remarkable piece of work is truly commendable! Looking forward to reading more from the author in the future, for sure! 💗",
    url: bookUrl,
  },
];

export const workSections = [
  { id: "about", label: "About" },
  { id: "writing", label: "Writing" },
  { id: "education", label: "Education" },
  { id: "interests", label: "Interests" },
  { id: "reviews", label: "Reviews" },
  { id: "contact", label: "Contact" },
];

export const personalSections = [
  { id: "personal-about", label: "About Me" },
  { id: "personal-favourites", label: "Things I Love" },
  { id: "personal-memories", label: "Memories" },
];

export const interestsData = [
  {
    title: "Writing",
    description: "Finding the exact cadence and right words for unspoken ideas and emotions.",
    icon: "✍",
    tag: "CRAFT",
  },
  {
    title: "Literature",
    description: "Getting lost in diverse voices, classic narratives, and philosophical perspectives.",
    icon: "📖",
    tag: "STUDY",
  },
  {
    title: "Ideas & Inquiry",
    description: "Asking deeper questions and looking beyond the surface of everyday society.",
    icon: "✳",
    tag: "THOUGHT",
  },
  {
    title: "Performing Arts",
    description: "Exploring stagecraft, dramatic scripts, and the visceral power of live expression.",
    icon: "✧",
    tag: "STAGE",
  },
  {
    title: "Voluntary Work",
    description: "Giving time and energy to social initiatives to make a tangible difference ❤️.",
    icon: "♡",
    tag: "IMPACT",
  },
  {
    title: "Animal Welfare",
    description: "A lifelong soft spot for animals and the quiet, unconditional joy they bring.",
    icon: "🐾",
    tag: "CARE",
  },
  {
    title: "Football & Sport",
    description: "Staying active on the pitch—where strategy, rhythm, and energy meet.",
    icon: "⚽",
    tag: "MOTION",
  },
];

export const scrapbookPhotos = [
  { src: "/meghna-personal-1.jpg", alt: "Meghna smiling", caption: "a little moment of me", icon: "♡" },
  { src: "/meghna-personal-2.jpg", alt: "A candid portrait of Meghna", caption: "just being myself", icon: "☼" },
  { src: "/meghna-memory-1.jpg", alt: "Favourite portrait of Meghna", caption: "one for the memory box ♡", icon: "♡" },
  { src: "/meghna-memory-2.jpg", alt: "A happy day in Meghna’s life", caption: "somewhere in a happy memory", icon: "☼" },
  { src: "/meghna-memory-3.jpg", alt: "A candid moment with Meghna", caption: "the unplanned ones", icon: "✳" },
];
