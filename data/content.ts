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
  { id: "poetry", label: "Poetry" },
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

export interface Poem {
  id: string;
  title: string;
  subtitle: string;
  theme: string;
  readTime: string;
  excerpt: string;
  stanzas: string[];
  signoff: string;
  source: string;
  tags: string[];
  featuredVerse: string;
}

export const poems: Poem[] = [
  {
    id: "solitude-haven",
    title: "Solitude's Haven",
    subtitle: "On yearning for quiet shores, starry skies, and the peace within",
    theme: "Solitude & Peace",
    readTime: "2 min read",
    excerpt:
      "Sometimes, I yearn to flee, to a tiny isle, alone and free, where I'm the sole inhabitant, with only my dreams to see...",
    featuredVerse:
      "For in the stillness, I'd rediscover, the peace that lies within, and the beauty of solitude, that lets my heart win.",
    stanzas: [
      `Sometimes, I yearn to flee,
to a tiny isle, alone and free,
Where I'm the sole inhabitant,
with only my dreams to see.
I'd sit in silence, gazing up at the starry sky,
Reminders of my passions,
and the dreams that make me sigh.`,
      `The leaves would whisper secrets,
as I share my stories true,
Hoping they'll listen closely,
and understand me anew,
The waves would caress my feet,
and wash away my pain,
As I stand beneath the open sky,
where freedom's winds reign.`,
      `In this haven, I'd find solace,
a reprieve from life's din,
A chance to breathe, to recharge,
and let my spirit grin.
For in the stillness, I'd rediscover,
the peace that lies within,
And the beauty of solitude,
that lets my heart win.`,
    ],
    signoff: "-Meghna",
    source: "Written by Meghna Bose (ki likhbo!?)",
    tags: ["Solitude", "Dreams", "Peace", "Poetry"],
  },
  {
    id: "ask-the-moon",
    title: "Ask the Moon",
    subtitle: "A heartfelt confession carried by the winds, darkness, and broken stars",
    theme: "Love & Devotion",
    readTime: "2 min read",
    excerpt:
      "If you ever wonder how much I adore, ask the moon, which reminds me of you, and I implore...",
    featuredVerse:
      "For in your presence, all shadows disappear, leaving only the light of love, pure and clear.",
    stanzas: [
      `If you ever wonder how much I adore,
Ask the moon, which reminds me of you, and I implore.
If trust in me ever falters and fades,
Ask the broken stars,
which I've pieced together in shades.`,
      `If you question the depths of my heart's embrace
Ask the darkness, which flees at your radiant grace
For in your presence, all shadows disappear
Leaving only the light of love,
pure and clear`,
      `And if you feel my love is insufficient, dear
Ask the winds, which carry my whispers, my love to hear
For in their gentle breeze, my heart's secrets are told
A love confession, that only to you is unfold`,
      `But if displeasure clouds your lovely face
Do not seek solace in another's embrace
For only I, can understand the depths of our pain
And only I, can love you back to love again.`,
    ],
    signoff: "-Meghna",
    source: "Written by Meghna Bose (ki likhbo!?)",
    tags: ["Love", "Moonlight", "Confession", "Poetry"],
  },
  {
    id: "a-tapestry-anew",
    title: "A Tapestry Anew",
    subtitle: "On shedding borrowed expectations and reclaiming one's own voice and light",
    theme: "Self-Discovery",
    readTime: "2 min read",
    excerpt:
      "In chasing crowns for every head but mine, a daughter, friend, a sister intertwined, the tapestry I weave, a vibrant scene, yet threads of self, forgotten, unseen...",
    featuredVerse:
      "A tapestry anew, with threads of gold, my own heart's song, a story to be told.",
    stanzas: [
      `In chasing crowns for every head but mine,
A daughter, friend, a sister intertwined,
The tapestry I weave, a vibrant scene,
Yet threads of self, forgotten, unseen.`,
      `I chase applause in every role I play,
Their dreams I chase, while mine drift far away.
Aching to please, I lose myself in haste,
My heart, a whisper, drowned in echoes chased.`,
      `The mirror shows a stranger, not quite true,
Reflection blurred by all I strive to do.
A symphony of wants, a borrowed score,
But where's the melody my own soul craves for?`,
      `The world falls silent, and in this quiet space,
My heart confronts me, etched upon my face.
"What of your dreams? Your laughter, and your light?"
A hollow echo in the fading night.`,
      `No more, I vow, this self-inflicted plight,
To rediscover, claim what is my right.
A tapestry anew, with threads of gold,
My own heart's song, a story to be told.`,
    ],
    signoff: "-Meghna",
    source: "Written by Meghna Bose (ki likhbo!?)",
    tags: ["Identity", "Voice", "Self-Love", "Poetry"],
  },
  {
    id: "in-the-darkest-veil",
    title: "In the Darkest Veil",
    subtitle: "Echoes of moonlit strolls and the ache of longing in midnight's hollow",
    theme: "Longing & Memory",
    readTime: "2 min read",
    excerpt:
      "In the darkest veil of night's embrace, memories of our moonlit strolls entwine, hand in hand, hearts beating as one, now, in their absence, my soul is undone...",
    featuredVerse:
      "Yet still, my heart cries out, a desperate plea, for your return, even in slumber's decree...",
    stanzas: [
      `In the darkest veil of night's embrace,
Memories of our moonlit strolls entwine,
Hand in hand, hearts beating as one,
Now, in their absence, my soul is undone.`,
      `The shadows scream, a deafening call,
For your return, even as a fleeting fall;
A whispered promise, a haunting sigh,
Echoes of what could never die.`,
      `In midnight's hollow, where dreams unfold,
My heart aches, a heavy, mournful gold,
Fate's cruel hand, a promise unkept,
Forever lost, in eternal sleep.`,
      `Yet still, my heart cries out, a desperate plea,
For your return, even in slumber's decree,
A dream, a whisper, a ghostly refrain,
To ease the ache, the longing, the pain.`,
    ],
    signoff: "-Meghna",
    source: "Written by Meghna Bose (ki likhbo!?)",
    tags: ["Longing", "Midnight", "Echoes", "Poetry"],
  },
];
