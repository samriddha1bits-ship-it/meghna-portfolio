"use client";

import { useEffect, useRef, useState } from "react";


type Theme = "dark" | "light";
type Mode = "work" | "personal";

const bookUrl =
  "https://play.google.com/store/books/details/Meghna_Bose_A_world_seen_at_Eighteen?id=bgPdEQAAQBAJ";

const amazonUrl =
  "https://www.amazon.in/world-seen-at-Eighteen/dp/9372487031";

const instagramUrl = "https://www.instagram.com/meghnaaaaa_bose/?hl=en";

const linkedinUrl = "https://www.linkedin.com/in/meghna-bose-2485b941a/";

const email = "meghnabosesupport@gmail.com";

const reviews = [
  {
    name: "Samriddha Banerjee",
    rating: 5,
    date: "October 14, 2026",
    source: "Google Play Books",
    text: "Finished reading it today, and honestly, it was mind-blowing! ✨ Simple, natural, and incredibly thought-provoking, this is definitely a great read for anyone who enjoys exploring innovative and intellectual stuffs. The author's effort in putting together such a remarkable piece of work is truly commendable! Looking forward to reading more from the author in the future, for sure! 💗",
    url: bookUrl,
  },
];

const workSections = [
  { id: "about", label: "About" },
  { id: "writing", label: "Writing" },
  { id: "education", label: "Education" },
  { id: "interests", label: "Interests" },
  { id: "reviews", label: "Reviews" },
  { id: "contact", label: "Contact" },
];

const personalSections = [
  { id: "personal-about", label: "About Me" },
  { id: "personal-favourites", label: "Things I Love" },
  { id: "personal-memories", label: "Memories" },
];

const interestsData = [
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

const scrapbookPhotos = [
  { src: "/meghna-personal-1.jpg", alt: "Meghna smiling", caption: "a little moment of me", icon: "♡" },
  { src: "/meghna-personal-2.jpg", alt: "A candid portrait of Meghna", caption: "just being myself", icon: "☼" },
  { src: "/meghna-memory-1.jpg", alt: "Favourite portrait of Meghna", caption: "one for the memory box ♡", icon: "♡" },
  { src: "/meghna-memory-2.jpg", alt: "A happy day in Meghna’s life", caption: "somewhere in a happy memory", icon: "☼" },
  { src: "/meghna-memory-3.jpg", alt: "A candid moment with Meghna", caption: "the unplanned ones", icon: "✳" },
];

export default function Home() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mode, setMode] = useState<Mode>("work");
  const [menuOpen, setMenuOpen] = useState(false);
  const [command, setCommand] = useState("");
  const [selectedCmdIndex, setSelectedCmdIndex] = useState(0);
  const [activeSection, setActiveSection] = useState("about");
  const [year, setYear] = useState(2026);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactStatus, setContactStatus] = useState("");
  const [contactSending, setContactSending] = useState(false);
  const [heartPopped, setHeartPopped] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const commandListRef = useRef<HTMLDivElement>(null);

  const activeNavSections = mode === "work" ? workSections : personalSections;

  const commands =
    mode === "work"
      ? [
          { label: "About", detail: "Meet Meghna & her philosophy", action: "about" },
          { label: "Publication", detail: "A World Seen at Eighteen", action: "writing" },
          { label: "Education", detail: "Presidency University & academic journey", action: "education" },
          { label: "Interests", detail: "Creative pursuits & inspirations", action: "interests" },
          { label: "Reviews", detail: "Reader testimonials", action: "reviews" },
          { label: "Contact", detail: "Send a direct message", action: "contact" },
          { label: "Switch to Personal Mode", detail: "Open the personal scrapbook", action: "personal" },
          { label: "Toggle Theme", detail: `Switch to ${theme === "dark" ? "light" : "dark"} mode`, action: "theme" },
          { label: "Copy Email", detail: email, action: "copy-email" },
          { label: "Google Play Books", detail: "Open official book listing", action: "play" },
          { label: "Amazon", detail: "Order paperback / Kindle edition", action: "amazon" },
          { label: "Instagram", detail: "Open Instagram profile", action: "instagram" },
          { label: "LinkedIn", detail: "Connect professionally", action: "linkedin" },
        ]
      : [
          { label: "About me", detail: "A little about who I am", action: "personal-about" },
          { label: "Things I love", detail: "Small joys & favourite things", action: "personal-favourites" },
          { label: "Little bits of life", detail: "Snapshots & memories", action: "personal-memories" },
          { label: "Switch to Work Mode", detail: "Return to professional portfolio", action: "work" },
          { label: "Toggle Theme", detail: `Switch to ${theme === "dark" ? "light" : "dark"} mode`, action: "theme" },
          { label: "Copy Email", detail: email, action: "copy-email" },
        ];

  const filteredCommands = commands.filter((item) =>
    `${item.label} ${item.detail}`.toLowerCase().includes(command.toLowerCase())
  );

  useEffect(() => {
    const savedTheme = localStorage.getItem("meghna-theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
    }
    setYear(new Date().getFullYear());
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("meghna-theme", theme);
  }, [theme]);

  useEffect(() => {
    setSelectedCmdIndex(0);
  }, [command, menuOpen, mode]);

  useEffect(() => {
    document.body.style.overflow = menuOpen || lightboxIndex !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, lightboxIndex]);

  useEffect(() => {
    if (!menuOpen || !commandListRef.current) return;
    const activeEl = commandListRef.current.querySelector<HTMLElement>(
      `[data-cmd-index="${selectedCmdIndex}"]`
    );
    activeEl?.scrollIntoView({ block: "nearest" });
  }, [selectedCmdIndex, menuOpen]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setLightboxIndex(null);
        setMenuOpen((open) => {
          setCommand("");
          setSelectedCmdIndex(0);
          return !open;
        });
        return;
      }

      if (lightboxIndex !== null && !menuOpen) {
        if (event.key === "Escape") {
          event.preventDefault();
          setLightboxIndex(null);
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          setLightboxIndex((prev) =>
            prev !== null ? (prev + 1) % scrapbookPhotos.length : null
          );
        } else if (event.key === "ArrowLeft") {
          event.preventDefault();
          setLightboxIndex((prev) =>
            prev !== null
              ? (prev - 1 + scrapbookPhotos.length) % scrapbookPhotos.length
              : null
          );
        }
        return;
      }

      if (!menuOpen) return;

      if (event.key === "Escape") {
        setMenuOpen(false);
        setCommand("");
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelectedCmdIndex((prev) =>
          filteredCommands.length > 0 ? (prev + 1) % filteredCommands.length : 0
        );
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelectedCmdIndex((prev) =>
          filteredCommands.length > 0
            ? (prev - 1 + filteredCommands.length) % filteredCommands.length
            : 0
        );
      } else if (event.key === "Enter" && filteredCommands[selectedCmdIndex]) {
        event.preventDefault();
        runCommand(filteredCommands[selectedCmdIndex].action);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [menuOpen, lightboxIndex, filteredCommands, selectedCmdIndex]);

  useEffect(() => {
    setLightboxIndex(null);
    setActiveSection(mode === "work" ? "about" : "personal-about");

    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -65% 0px" }
    );

    const currentSections = mode === "work" ? workSections : personalSections;
    currentSections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) navObserver.observe(element);
    });

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -36px 0px" }
    );

    const revealElements = document.querySelectorAll(
      ".reveal, .reveal-stagger, .section-heading, .section-count, .hero-copy > *, .portrait-wrap, .interest-card, .timeline-item, .review-feature, .review-card, .review-side, .about-grid > *, .book-art, .book-info > *"
    );
    revealElements.forEach((el) => {
      if (
        el.matches(
          ".section-heading, .section-count, .hero-copy > *, .portrait-wrap, .interest-card, .timeline-item, .review-card, .review-side, .about-grid > *, .book-art, .book-info > *"
        )
      ) {
        el.classList.add("reveal-stagger");
        const siblings = Array.from(el.parentElement?.children ?? []);
        const itemIndex = siblings.indexOf(el);
        (el as HTMLElement).style.setProperty(
          "--reveal-delay",
          `${Math.max(0, itemIndex) * 85}ms`
        );
      }
      revealObserver.observe(el);
    });

    return () => {
      navObserver.disconnect();
      revealObserver.disconnect();
    };
  }, [mode]);

  function handlePhotoTilt(event: React.MouseEvent<HTMLElement>) {
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    const tiltY = (x - 0.5) * 20; // -10deg to +10deg
    const tiltX = (0.5 - y) * 20; // -10deg to +10deg

    el.style.setProperty("--tilt-x", `${tiltX.toFixed(2)}deg`);
    el.style.setProperty("--tilt-y", `${tiltY.toFixed(2)}deg`);
    el.style.setProperty("--glare-x", `${(x * 100).toFixed(1)}%`);
    el.style.setProperty("--glare-y", `${(y * 100).toFixed(1)}%`);
    el.dataset.tilting = "true";
  }

  function resetPhotoTilt(event: React.MouseEvent<HTMLElement>) {
    const el = event.currentTarget;
    el.style.setProperty("--tilt-x", "0deg");
    el.style.setProperty("--tilt-y", "0deg");
    delete el.dataset.tilting;
  }

  function photoProps(index: number) {
    return {
      role: "button" as const,
      tabIndex: 0,
      "aria-label": `View photo up close: ${scrapbookPhotos[index].caption}`,
      onMouseMove: handlePhotoTilt,
      onMouseLeave: resetPhotoTilt,
      onClick: () => setLightboxIndex(index),
      onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setLightboxIndex(index);
        }
      },
    };
  }

  async function submitContact(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setContactSending(true);
    setContactStatus("");
    try {
      const response = await fetch("https://formsubmit.co/ajax/meghnabosesupport@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          message: contactMessage,
          _subject: `Portfolio message from ${contactName}`,
          _template: "table",
        }),
      });
      if (!response.ok) throw new Error("Message service did not accept the request.");
      setContactStatus("Thanks! Your message has been sent to Meghna.");

      window.setTimeout(() => {
        setContactStatus("");
      }, 4000);
      setContactName("");
      setContactEmail("");
      setContactMessage("");
    } catch {
      setContactStatus("Sorry, the message could not be sent. Please try emailing directly.");
    } finally {
      setContactSending(false);
    }
  }

  function playThemeSound() {
    try {
      const click003DataUri =
        "data:audio/mpeg;base64,SUQzBAAAAAAAIlRTU0UAAAAOAAADTGF2ZjYyLjMuMTAwAAAAAAAAAAAAAAD/+1DAAAAAAAAAAAAAAAAAAAAAAABJbmZvAAAADwAAAAIAAAJxAKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr//////////////////////////////////////////////////////////////////wAAAABMYXZjNjIuMTEAAAAAAAAAAAAAAAAkBYYAAAAAAAACcU7MYgYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//tQxAAACghZUlTHgAGDlWufHzAAAVWgJg3EszX3mlF95pSk7enve+GBDEMNMg4R8BLACwAsA7BVjjOhDEMQxWKx5EcJwfB/KBiU8/wI7QH+BHaA/ynv6PB8/LgQEMgD78CHO/oGiAIBAQBAYFAA1hDi4z22DmJ7Et+PSEd1f8Y4PmLI5uDYKAWyCmBlSZJ3gAmD0RBEUDS/HKFzC5iZIr/5FTIvE0Yl3/8ipkXi8Yl0u/xEFQVER7/WCoiCoKiL/4VBURPOqgAQuacbblgZh//7UsQEg8aUBv9cMIAgAAA0gAAABIKqErhFDZUNQ7PRK4S8s8r1HiuGlHuSnenrcW9yvO/PcFflep5XqPKfrO9NTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV";
      const audio = new Audio(click003DataUri);
      audio.volume = 0.45;
      void audio.play().catch(() => {});
    } catch {}
  }

  function switchMode(nextMode: Mode) {
    setMode(nextMode);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function toggleTheme() {
    playThemeSound();
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }

  function scrollTo(id: string) {
    setMenuOpen(false);
    setCommand("");
    const isPersonalTarget = id.startsWith("personal-");
    const targetMode: Mode = isPersonalTarget ? "personal" : "work";

    if (mode !== targetMode) {
      setMode(targetMode);
      window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 140);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  function openContactForm() {
    setMenuOpen(false);
    setCommand("");
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    window.setTimeout(() => {
      document.getElementById("contact-name")?.focus({ preventScroll: true });
    }, 450);
  }

  function runCommand(value: string) {
    const normalized = value.toLowerCase();
    setMenuOpen(false);
    setCommand("");

    if (normalized === "personal") {
      switchMode("personal");
      return;
    }
    if (normalized === "work") {
      switchMode("work");
      return;
    }
    if (normalized === "theme") {
      toggleTheme();
      return;
    }
    if (normalized === "copy-email") {
      void navigator.clipboard?.writeText(email);
      return;
    }
    if (normalized === "play") {
      window.open(bookUrl, "_blank", "noopener,noreferrer");
      return;
    }
    if (normalized === "amazon") {
      window.open(amazonUrl, "_blank", "noopener,noreferrer");
      return;
    }
    if (normalized === "instagram") {
      window.open(instagramUrl, "_blank", "noopener,noreferrer");
      return;
    }
    if (normalized === "linkedin") {
      window.open(linkedinUrl, "_blank", "noopener,noreferrer");
      return;
    }
    if (["personal-about", "personal-favourites", "personal-memories"].includes(normalized)) {
      scrollTo(normalized);
      return;
    }

    const found = workSections.find(
      (section) => section.id === normalized || section.label.toLowerCase() === normalized
    );
    if (found) scrollTo(found.id);
  }

  return (
    <main className={`site ${theme}`}>
      <div className="ambient-noise" aria-hidden="true" />
      {theme === "dark" && mode === "personal" && (
        <div className="snowfall" aria-hidden="true">
          {Array.from({ length: 58 }, (_, i) => (
            <span
              className="snowflake"
              key={i}
              style={{
                left: `${(i * 37 + 11) % 100}%`,
                animationDelay: `${-((i * 7) % 24)}s`,
                animationDuration: `${14 + ((i * 13) % 18)}s`,
                opacity: 0.28 + ((i * 17) % 7) / 10,
                fontSize: `${7 + ((i * 11) % 10)}px`,
              }}
            >
              {i % 4 === 0 ? "✧" : i % 3 === 0 ? "❅" : "❄"}
            </span>
          ))}
        </div>
      )}

      <header className="topbar">
        <button
          className="wordmark"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Meghna Bose<span>.</span>
        </button>

        <nav className="desktop-nav" aria-label="Primary Navigation">
          {activeNavSections.map((section) => (
            <button
              key={section.id}
              className={activeSection === section.id ? "nav-link active" : "nav-link"}
              onClick={() => scrollTo(section.id)}
            >
              {section.label}
            </button>
          ))}
        </nav>

        <div className="top-actions">
          <button
            className="cmd-trigger"
            aria-label="Open command palette"
            title="Command palette (Ctrl+K)"
            onClick={() => setMenuOpen(true)}
          >
            <span className="cmd-icon">⌘</span>
            <span className="cmd-shortcut">K</span>
          </button>
          <button
            className="icon-button theme-toggle"
            aria-label="Toggle color theme"
            title="Switch theme"
            onClick={toggleTheme}
          >
            {theme === "dark" ? "☼" : "☾"}
          </button>
        </div>
      </header>

      <div className="mode-switch-wrap">
        <div className="mode-switch" role="tablist" aria-label="Portfolio mode">
          <button
            role="tab"
            aria-selected={mode === "work"}
            className={mode === "work" ? "mode-option selected" : "mode-option"}
            onClick={() => switchMode("work")}
          >
            <span className="mode-dot" /> Work
          </button>
          <button
            role="tab"
            aria-selected={mode === "personal"}
            className={mode === "personal" ? "mode-option selected" : "mode-option"}
            onClick={() => switchMode("personal")}
          >
            <span className="mode-dot" /> Personal
          </button>
        </div>
      </div>

      {mode === "work" ? (
        <>
          <section className="hero" id="about">
            <div className="hero-copy reveal">
              <div className="eyebrow-pill">
                <span className="live-dot" />
                <span>WRITER · CREATIVE MIND</span>
              </div>

              <h1>
                Meghna
                <br />
                <span>Bose.</span>
              </h1>

              <p className="hero-description">
                Exploring the world through words, ideas, and the little things
                that make us feel a little more human.
              </p>

              <div className="hero-buttons">
                <button className="primary-button" onClick={() => scrollTo("writing")}>
                  Explore my work <span>↗</span>
                </button>
                <button className="secondary-button" onClick={openContactForm}>
                  ✉ Send an email
                </button>
              </div>

              <div className="hero-socials">
                <span className="socials-label">
                  Here are my <strong>socials</strong>
                </span>
                <div className="social-links">
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                  >
                    <svg
                      className="social-brand-icon"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      fill="none"
                    >
                      <rect
                        x="3"
                        y="3"
                        width="18"
                        height="18"
                        rx="5"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
                      <circle cx="17.5" cy="6.8" r="1.2" fill="currentColor" />
                    </svg>
                    Instagram <span aria-hidden="true">↗</span>
                  </a>
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                  >
                    <svg
                      className="social-brand-icon"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      fill="currentColor"
                    >
                      <path d="M5.2 3.5a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4ZM3.4 9.4H7v11.2H3.4V9.4Zm5.8 0h3.4v1.5h.05c.47-.89 1.63-1.83 3.35-1.83 3.58 0 4.24 2.35 4.24 5.4v6.13h-3.55v-5.43c0-1.3-.02-2.97-1.81-2.97-1.81 0-2.09 1.41-2.09 2.87v5.53H9.2V9.4Z" />
                    </svg>
                    LinkedIn <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="portrait-wrap reveal">
              <div className="portrait-glow" />
              <div className="portrait-backdrop-card" />
              <div className="portrait-frame">
                <div className="portrait-img-container">
                  <img
                    src="/meghna-portrait.jpg"
                    alt="Portrait of Meghna Bose"
                    className="portrait"
                  />
                </div>
                <div className="portrait-caption">
                  <span>MEGHNA BOSE</span>
                  <span>WRITER / DREAMER</span>
                </div>
              </div>
              <div className="floating-note note-top">
                <span className="note-symbol">✳</span>
                <span>
                  Words can make
                  <br />
                  worlds.
                </span>
              </div>
              <div className="floating-note note-bottom">
                <span className="tiny-star">🖋</span>
                <span>Currently writing</span>
              </div>
            </div>
          </section>

          <div className="ticker" aria-hidden="true">
            <div className="ticker-track">
              {Array.from({ length: 4 }, (_, i) => (
                <span key={i}>
                  WORDS &amp; IDEAS <b>✳</b> STORIES THAT STAY <b>✳</b> ASPIRING JOURNALIST <b>✳</b>
                </span>
              ))}
            </div>
          </div>

          <section className="section about-section reveal">
            <div className="section-heading">
              <p className="eyebrow">A LITTLE INTRODUCTION</p>
              <h2>
                A mind full of <span>stories.</span>
              </h2>
            </div>

            <div className="about-grid">
              <div>
                <p className="large-copy">
                  I believe the world is made of stories — the ones we tell, the ones we
                  keep to ourselves, and the ones we&apos;re still learning how to understand.
                </p>
              </div>

              <div className="about-detail">
                <p>
                  <strong>
                    Meghna Bose is an eighteen year old Performing Arts undergraduate at
                    Presidency University and the author of two published English books.
                    Drawn to ideas, observations, and the curious details of everyday life,
                    she uses her writing—spanning poetry, short stories, scripts, and reflective
                    essays—to look a little closer at human emotions and society. Aspiring to a
                    career in journalism and media, Meghna aims to combine creative expression
                    with responsible, impactful reporting to create work that feels thoughtful,
                    genuine, and worth returning to.
                  </strong>
                </p>
                <button className="inline-link" onClick={() => scrollTo("writing")}>
                  Discover my book <span>↗</span>
                </button>
              </div>
            </div>
          </section>

          <section className="section writing-section reveal" id="writing">
            <div className="section-heading heading-row">
              <div>
                <p className="eyebrow">SELECTED WORK</p>
                <h2>
                  Words into <span>worlds.</span>
                </h2>
              </div>
              <span className="section-count">PUBLICATION</span>
            </div>

            <div className="book-feature">
              <div className="book-art">
                <div className="book-halo" />
                <div className="book-3d-stage">
                  <div className="book-image-wrap">
                    <img
                      src="/book-cover.jpg"
                      alt="Cover of A World Seen at Eighteen by Meghna Bose"
                      className="book-cover"
                    />
                    <div className="book-shine" />
                  </div>
                </div>
                <div className="book-art-label">A STORY BY MEGHNA BOSE</div>
              </div>

              <div className="book-info">
                <p className="eyebrow">
                  <span className="book-dot" /> FEATURED PUBLICATION
                </p>
                <h3>
                  A World Seen
                  <br />
                  <em>at Eighteen</em>
                </h3>
                <p className="book-byline">A book by Meghna Bose</p>
                <div className="book-rule" />
                <p className="book-description">
                  A thoughtful exploration of the world through the lens of eighteen — an
                  invitation to pause, reflect, and see familiar things in a new light.
                </p>
                <div className="book-tags">
                  <span>Non-fiction</span>
                  <span>Reflection</span>
                  <span>51 pages</span>
                </div>
                <div className="book-actions">
                  <a
                    className="primary-button link-button"
                    href={bookUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Read on Google Play <span>↗</span>
                  </a>
                  <a
                    className="secondary-button link-button"
                    href={amazonUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Find on Amazon ↗
                  </a>
                </div>
                <p className="book-footnote">Published by Writer&apos;s Pocket</p>
              </div>
            </div>
          </section>

          <section className="section education-section reveal" id="education">
            <div className="section-heading">
              <p className="eyebrow">THE JOURNEY SO FAR</p>
              <h2>
                Learning, <span>always.</span>
              </h2>
            </div>

            <div className="timeline">
              <div className="timeline-item">
                <span className="timeline-marker active-marker" />
                <div>
                  <h3>Presidency University</h3>
                  <p className="muted">
                    A chapter of learning, exploration, and discovering new perspectives.
                  </p>
                </div>
                <span className="timeline-number">2026 – Present</span>
              </div>

              <div className="timeline-item">
                <span className="timeline-marker active-marker" />
                <div>
                  <h3>Kalyani Public School, Saltlake</h3>
                  <p className="muted">
                    The foundation years that shaped a love for learning, ideas, and creativity.
                  </p>
                </div>
                <span className="timeline-number">2011 – 2026</span>
              </div>

              <div className="timeline-item">
                <span className="timeline-marker active-marker" />
                <div>
                  <p className="timeline-date">BEYOND THE CLASSROOM</p>
                  <h3>Writing &amp; creative exploration</h3>
                  <p className="muted">
                    Turning observations and ideas into work that can be shared with others.
                  </p>
                </div>
                <span className="timeline-number" />
              </div>
            </div>
          </section>

          <section className="section interests-section reveal" id="interests">
            <div className="section-heading">
              <p className="eyebrow">THINGS THAT INSPIRE ME</p>
              <h2>
                Curious by <span>nature.</span>
              </h2>
            </div>

            <div className="interest-grid">
              {interestsData.map((item) => (
                <article className="interest-card" key={item.title}>
                  <div className="interest-top">
                    <div className="interest-icon">{item.icon}</div>
                    <span className="interest-tag">{item.tag}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <span className="card-arrow">↗</span>
                </article>
              ))}
            </div>
          </section>

          <section className="section reviews-section reveal" id="reviews">
            <div className="section-heading heading-row">
              <div>
                <p className="eyebrow">KIND WORDS FROM READERS</p>
                <h2>
                  <span>Words that stay with you long after you’ve read them..</span>
                </h2>
              </div>
              <a
                className="inline-link review-source-top"
                href={bookUrl}
                target="_blank"
                rel="noreferrer"
              >
                Google Play Books ↗
              </a>
            </div>

            <div className="review-feature">
              <div className="review-side">
                <span className="quote-mark" aria-hidden="true">
                  “
                </span>
                <p className="eyebrow">READER REVIEW</p>
                <div className="review-stars" aria-label="5 out of 5 stars">
                  {"★".repeat(5)}
                </div>
                <p className="review-rating">
                  5.0 <span>/ 5</span>
                </p>
                <p className="review-side-caption">Shared on Google Play Books</p>
              </div>

              <article className="review-card">
                <div className="review-card-top">
                  <div className="review-avatar">{reviews[0].name.charAt(0)}</div>
                  <div className="review-author">
                    <h3>{reviews[0].name}</h3>
                    <p>{reviews[0].date}</p>
                  </div>
                  <span className="verified-label">GOOGLE PLAY REVIEW ↗</span>
                </div>

                <div
                  className="review-stars review-card-stars"
                  aria-label={`${reviews[0].rating} out of 5 stars`}
                >
                  {"★".repeat(reviews[0].rating)}
                </div>

                <blockquote>{reviews[0].text}</blockquote>

                <a
                  className="review-original-link"
                  href={reviews[0].url}
                  target="_blank"
                  rel="noreferrer"
                >
                  View book listing on Google Play <span>↗</span>
                </a>
              </article>
            </div>
          </section>

          <section className="section contact-section reveal" id="contact">
            <div className="contact-panel">
              <div className="contact-orb" />
              <p className="eyebrow">LET&apos;S CONNECT</p>
              <h2>
                Have a story
                <br />
                to <span>share?</span>
              </h2>
              <p className="contact-description">
                For conversations about books, ideas, creative projects, or simply
                something interesting — my inbox is open.
              </p>
              <form className="contact-form" onSubmit={submitContact}>
                <label htmlFor="contact-name">Your name</label>
                <input
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  value={contactName}
                  onChange={(event) => setContactName(event.target.value)}
                  required
                  maxLength={100}
                  placeholder="Name"
                />
                <label htmlFor="contact-email">Your email</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={contactEmail}
                  onChange={(event) => setContactEmail(event.target.value)}
                  required
                  maxLength={200}
                  placeholder="you@example.com"
                />
                <label htmlFor="contact-message">Your message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={contactMessage}
                  onChange={(event) => setContactMessage(event.target.value)}
                  required
                  rows={5}
                  maxLength={5000}
                  placeholder="Write your message here..."
                />
                <button className="primary-button" type="submit" disabled={contactSending}>
                  {contactSending ? "Sending…" : "Send message"} <span>↗</span>
                </button>
                {contactStatus && (
                  <p className="contact-status" role="status">
                    {contactStatus}
                  </p>
                )}
              </form>
              <p className="email-display">
                Or email directly: <a href={`mailto:${email}`}>{email}</a>
              </p>
            </div>
          </section>
        </>
      ) : (
        <section className="personal-page scrapbook-page reveal is-visible">
          <div className="scrapbook-topline">
            <span>THE PERSONAL SCRAPBOOK</span>
            <span>little things, lovely days ✳</span>
          </div>

          <div className="scrapbook-hero">
            <div className="scrapbook-hero-copy">
              <p className="personal-eyebrow">A LITTLE MORE PERSONAL</p>
              <h1>
                A little
                <br />
                <em>world of</em>
                <br />
                Meghna<span>.</span>
              </h1>
              <p className="personal-intro">
                The bits and pieces that make me, me — favourite things, small joys,
                and memories I’d like to keep close.
              </p>
              <span className="handwritten-note">collected with love ♡</span>
            </div>
            <div className="portrait-scrap portrait-scrap-hero" {...photoProps(0)}>
              <span className="tape tape-top" />
              <div className="photo-placeholder">
                <span className="placeholder-sparkle">✳</span>
                <span className="placeholder-icon">♡</span>
                <strong>Your portrait goes here</strong>
                <small>
                  Save a photo as <code>meghna-personal-1.jpg</code>
                  <br />
                  inside the <code>public</code> folder
                </small>
              </div>
              <img
                src="/meghna-personal-1.jpg"
                alt="Meghna smiling"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />
              <span className="photo-caption">a little moment of me</span>
            </div>
            <button
              type="button"
              className={`doodle doodle-heart heart-like-button ${
                heartPopped ? "heart-popped" : ""
              }`}
              aria-label="Like this scrapbook"
              onClick={() => {
                setHeartPopped(true);
                window.setTimeout(() => setHeartPopped(false), 850);
              }}
            >
              ♡
            </button>
            <span className="doodle doodle-star">✳</span>
          </div>

          <section className="scrapbook-section about-scrap" id="personal-about">
            <div className="scrap-section-heading">
              <span className="section-sticker">01</span>
              <div>
                <p>THE PERSON BEHIND THE PAGES</p>
                <h2>
                  Hi, that’s <em>me.</em>
                </h2>
              </div>
            </div>
            <div className="about-note-grid">
              <div className="paper-note paper-note-main">
                <span className="note-pin">✦</span>
                <p className="note-script">A few things about me...</p> <br></br>
                <p>
                  I’m Meghna — a collector of words, little wonders, and conversations that stay with you long after they end. I find magic in the details most people overlook, happiness in being there for others, and stories in the most ordinary moments. A little idealistic, endlessly curious, and always evolving, I’m learning to embrace life in all its beautiful uncertainties — one thought, one experience, and one unexpected adventure at a time.
                </p>
                <p className="note-signoff">That’s the fun part, isn’t it? ♡</p>
              </div>
              <div className="portrait-scrap portrait-scrap-small tilt-left" {...photoProps(1)}>
                <span className="tape tape-top" />
                <div className="photo-placeholder">
                  <span className="placeholder-icon">☼</span>
                  <strong>Another favourite portrait</strong>
                  <small>Replace with your own photo</small>
                </div>
                <img
                  src="/meghna-personal-2.jpg"
                  alt="A candid portrait of Meghna"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
                <span className="photo-caption">just being myself</span>
              </div>
              <div className="little-facts">
                <span className="fact-label">LITTLE THINGS ABOUT ME</span>
                <p>
                  <span>♡</span> Always curious about people and try to make the world a better place.
                </p>
                <p>
                  <span>✎</span> Happiest when words find their way onto a page
                </p>
                <p>
                  <span>✊</span>Feminist by nature, on a mission to dismantle patriarchy.
                </p>
              </div>
            </div>
          </section>

          <section className="scrapbook-section favourites-scrap" id="personal-favourites">
            <div className="scrap-section-heading">
              <span className="section-sticker sticker-rose">02</span>
              <div>
                <p>SMALL JOYS, BIG FEELINGS</p>
                <h2>
                  Things I <em>love.</em>
                </h2>
              </div>
            </div>
            <div className="favourite-grid">
              <article className="favourite-card favourite-books">
                <span className="favourite-doodle">✎</span>
                <span className="favourite-category">BETWEEN THE COVERS</span>
                <h3>Books &amp; words</h3>
                <p>
                  Lines that linger, stories that feel like a conversation, and the magic of
                  finding just the right words.
                </p>
                <span className="favourite-bottom">read · write · repeat</span>
              </article>
              <article className="favourite-card favourite-people">
                <span className="favourite-doodle">♡</span>
                <span className="favourite-category">THE GOOD STUFF</span>
                <h3>People &amp; conversations</h3>
                <p>
                  Kind people, unexpected laughs, and talks that somehow turn into hours.
                </p>
                <span className="favourite-bottom">the little things matter</span>
              </article>
              <article className="favourite-card favourite-art">
                <span className="favourite-doodle">✳</span>
                <span className="favourite-category">A CREATIVE CORNER</span>
                <h3>Art &amp; expression</h3>
                <p>
                  Creative things that make the world feel a little brighter and a lot more
                  interesting.
                </p>
                <span className="favourite-bottom">make room for wonder</span>
              </article>
              <article className="favourite-card favourite-days">
                <span className="favourite-doodle">☼</span>
                <span className="favourite-category">SIMPLE PLEASURES</span>
                <h3>Slow little moments</h3>
                <p>
                  A peaceful day, a favourite song, a pretty sky, and memories made without
                  planning.
                </p>
                <span className="favourite-bottom">collecting tiny joys</span>
              </article>
            </div>
          </section>

          <section className="scrapbook-section memories-scrap" id="personal-memories">
            <div className="scrap-section-heading">
              <span className="section-sticker sticker-brown">03</span>
              <div>
                <p>SNAPSHOTS &amp; SOFT REMINDERS</p>
                <h2>
                  Little bits of <em>life.</em>
                </h2>
              </div>
            </div>
            <p className="memories-intro">
              A tiny gallery for favourite portraits, happy days, and moments worth saving.
            </p>
            <div className="memory-board">
              <figure className="memory-photo memory-photo-tall" {...photoProps(2)}>
                <span className="photo-tape" />
                <div className="photo-placeholder">
                  <span className="placeholder-icon">♡</span>
                  <strong>Favourite portrait</strong>
                  <small>
                    <code>meghna-memory-1.jpg</code>
                  </small>
                </div>
                <img
                  src="/meghna-memory-1.jpg"
                  alt="Favourite portrait of Meghna"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
                <figcaption>one for the memory box ♡</figcaption>
              </figure>
              <figure className="memory-photo memory-photo-wide" {...photoProps(3)}>
                <span className="photo-tape" />
                <div className="photo-placeholder">
                  <span className="placeholder-icon">☼</span>
                  <strong>A day to remember</strong>
                  <small>
                    <code>meghna-memory-2.jpg</code>
                  </small>
                </div>
                <img
                  src="/meghna-memory-2.jpg"
                  alt="A happy day in Meghna’s life"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
                <figcaption>somewhere in a happy memory</figcaption>
              </figure>
              <div className="memory-quote">
                <span>“</span>
                <p>
                  Not every beautiful moment needs a caption. Some are just meant to be kept.
                </p>
              </div>
              <figure className="memory-photo memory-photo-small" {...photoProps(4)}>
                <span className="photo-tape" />
                <div className="photo-placeholder">
                  <span className="placeholder-icon">✳</span>
                  <strong>A candid moment</strong>
                  <small>
                    <code>meghna-memory-3.jpg</code>
                  </small>
                </div>
                <img
                  src="/meghna-memory-3.jpg"
                  alt="A candid moment with Meghna"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
                <figcaption>the unplanned ones</figcaption>
              </figure>
            </div>
          </section>
        </section>
      )}

      <footer className="footer">
        <button
          className="wordmark footer-logo"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Meghna Bose<span>.</span>
        </button>
        <p>© {year} Meghna Bose</p>
      </footer>

      {lightboxIndex !== null && (
        <div
          className="lightbox-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Scrapbook photo viewer"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setLightboxIndex(null);
          }}
        >
          <div className="lightbox-stage">
            <button
              type="button"
              className="lightbox-nav"
              aria-label="Previous photo"
              onClick={() =>
                setLightboxIndex(
                  (lightboxIndex - 1 + scrapbookPhotos.length) % scrapbookPhotos.length
                )
              }
            >
              ←
            </button>

            <div className="lightbox-polaroid" key={scrapbookPhotos[lightboxIndex].src}>
              <span className="lightbox-tape" aria-hidden="true" />
              <div className="lightbox-topbar">
                <span className="lightbox-counter">
                  0{lightboxIndex + 1} / 0{scrapbookPhotos.length}
                </span>
                <button
                  type="button"
                  className="lightbox-close"
                  aria-label="Close photo viewer"
                  onClick={() => setLightboxIndex(null)}
                >
                  ✕ ESC
                </button>
              </div>

              <div className="lightbox-media">
                <div className="photo-placeholder lightbox-placeholder">
                  <span className="placeholder-icon">{scrapbookPhotos[lightboxIndex].icon}</span>
                  <strong>Photo coming soon</strong>
                </div>
                <img
                  src={scrapbookPhotos[lightboxIndex].src}
                  alt={scrapbookPhotos[lightboxIndex].alt}
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
              </div>

              <div className="lightbox-footer">
                <p className="lightbox-caption">{scrapbookPhotos[lightboxIndex].caption}</p>
                <span className="lightbox-hint">Use ← → keys to browse</span>
              </div>
            </div>

            <button
              type="button"
              className="lightbox-nav"
              aria-label="Next photo"
              onClick={() => setLightboxIndex((lightboxIndex + 1) % scrapbookPhotos.length)}
            >
              →
            </button>
          </div>
        </div>
      )}

      {menuOpen && (
        <div
          className="command-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setMenuOpen(false);
              setCommand("");
            }
          }}
        >
          <div className="command-dialog" role="dialog" aria-modal="true" aria-label="Command Menu">
            <div className="command-input-row">
              <span className="command-search-icon">⌕</span>
              <input
                autoFocus
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                placeholder="Where would you like to go?"
                aria-label="Search commands"
              />
              <button
                className="esc-button"
                onClick={() => {
                  setMenuOpen(false);
                  setCommand("");
                }}
              >
                ESC
              </button>
            </div>
            <p className="command-label">QUICK NAVIGATION</p>
            <div className="command-list" ref={commandListRef}>
              {filteredCommands.map((item, idx) => (
                <button
                  data-cmd-index={idx}
                  className={`command-item ${idx === selectedCmdIndex ? "active" : ""}`}
                  key={item.action}
                  aria-selected={idx === selectedCmdIndex}
                  onMouseEnter={() => setSelectedCmdIndex(idx)}
                  onClick={() => runCommand(item.action)}
                >
                  <span className="command-item-icon">↗</span>
                  <span className="command-item-text">
                    <strong>{item.label}</strong>
                    <small>{item.detail}</small>
                  </span>
                  <span className="command-enter">↵</span>
                </button>
              ))}
              {filteredCommands.length === 0 && (
                <p className="no-commands">No matching commands found.</p>
              )}
            </div>
            <div className="command-footer">
              Navigate <kbd>↑</kbd> <kbd>↓</kbd> · Select by clicking · Close <kbd>Esc</kbd>
            </div>
          </div>
        </div>
      )}


    </main>
  );
}