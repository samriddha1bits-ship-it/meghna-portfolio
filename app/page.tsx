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

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600&display=swap');

        :root {
          --bg: #0d0b12;
          --surface: #15121c;
          --surface-2: #1c1725;
          --text: #f4eff9;
          --muted: #a49aac;
          --line: rgba(231, 216, 255, 0.13);
          --accent: #c7a5ff;
          --accent-2: #9b73e8;
          --star: #f5d9a5;
          --shadow: rgba(0, 0, 0, 0.35);
        }

        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; scroll-padding-top: 100px; }
        body { margin: 0; background: var(--bg); }
        button, input, textarea { font: inherit; }
        button, a { -webkit-tap-highlight-color: transparent; }
        a { color: inherit; text-decoration: none; }
        button { color: inherit; }
        ::selection { background: var(--accent); color: #17121f; }

        .site {
          position: relative;
          min-height: 100vh;
          overflow-x: clip;
          background:
            radial-gradient(ellipse at 78% 10%, rgba(101, 58, 145, 0.15), transparent 36%),
            radial-gradient(ellipse at 10% 45%, rgba(70, 50, 112, 0.1), transparent 36%),
            var(--bg);
          color: var(--text);
          font-family: 'DM Sans', sans-serif;
          transition: background .3s, color .3s;
        }
        .site.light {
          --bg: #f7f3fb;
          --surface: #fff;
          --surface-2: #eee7f7;
          --text: #251c30;
          --muted: #766b82;
          --line: rgba(66, 45, 87, 0.15);
          --accent: #8253c8;
          --accent-2: #6841a7;
          --star: #9563d7;
          --shadow: rgba(49, 31, 69, 0.12);
          background:
            radial-gradient(ellipse at 80% 10%, rgba(175, 130, 235, 0.16), transparent 35%),
            var(--bg);
        }

        .ambient-noise {
          pointer-events: none;
          position: fixed;
          inset: 0;
          z-index: 25;
          opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        .snowfall {
          position: fixed;
          inset: 0;
          z-index: 26;
          overflow: hidden;
          pointer-events: none;
          user-select: none;
        }
        .snowflake {
          position: absolute;
          top: -12vh;
          display: block;
          color: #fff;
          line-height: 1;
          text-shadow: 0 0 7px rgba(226, 237, 255, 0.6);
          animation-name: gentle-snowfall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform;
        }
        @keyframes gentle-snowfall {
          0% { transform: translate3d(0, -5vh, 0) rotate(0deg); }
          25% { transform: translate3d(14px, 25vh, 0) rotate(90deg); }
          50% { transform: translate3d(-10px, 55vh, 0) rotate(180deg); }
          75% { transform: translate3d(16px, 85vh, 0) rotate(270deg); }
          100% { transform: translate3d(-5px, 115vh, 0) rotate(360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .snowflake { animation: none; display: none; }
        }

        .reveal,
        .reveal-stagger {
          opacity: 0;
          transform: translate3d(0, 22px, 0);
          transition: opacity 700ms cubic-bezier(0.16, 1, 0.3, 1), transform 700ms cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform;
        }
        .reveal-stagger { transition-delay: var(--reveal-delay, 0ms); }
        .reveal.is-visible,
        .reveal-stagger.is-visible {
          opacity: 1;
          transform: translate3d(0, 0, 0);
          will-change: auto;
        }
        @media (prefers-reduced-motion: reduce) {
          .reveal, .reveal-stagger { opacity: 1; transform: none; transition: none; will-change: auto; }
        }

        .topbar {
          height: 76px;
          padding: 0 7.2%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--line);
          position: sticky;
          top: 0;
          z-index: 60;
          isolation: isolate;
          background: color-mix(in srgb, var(--bg) 76%, transparent);
          -webkit-backdrop-filter: blur(18px) saturate(145%);
          backdrop-filter: blur(18px) saturate(145%);
          box-shadow: 0 8px 28px rgba(0, 0, 0, 0.08);
        }
        .wordmark {
          border: 0;
          background: transparent;
          padding: 0;
          font-size: 25px;
          letter-spacing: -2px;
          font-weight: 700;
          cursor: pointer;
        }
        .wordmark span { color: var(--accent); }
        .desktop-nav { display: flex; align-items: center; gap: 27px; }
        .nav-link {
          position: relative;
          border: 0;
          background: transparent;
          padding: 9px 0;
          color: var(--muted);
          cursor: pointer;
          font-size: 12px;
          transition: color .2s;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          left: 0;
          right: 100%;
          bottom: 1px;
          height: 1px;
          background: var(--accent);
          transition: right .25s;
        }
        .nav-link:hover, .nav-link.active { color: var(--text); }
        .nav-link:hover::after, .nav-link.active::after { right: 0; }
        .top-actions { display: flex; gap: 8px; align-items: center; }

        .cmd-trigger {
          height: 38px;
          padding: 0 12px;
          border-radius: 999px;
          background: var(--surface);
          border: 1px solid var(--line);
          display: inline-flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          color: var(--muted);
          transition: border-color .2s, color .2s;
        }
        .cmd-trigger:hover { border-color: var(--accent); color: var(--text); }

        .icon-button {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: var(--surface);
          border: 1px solid var(--line);
          cursor: pointer;
          font-size: 17px;
          display: grid;
          place-items: center;
          transition: border-color .2s, transform .2s;
        }
        .icon-button:hover { border-color: var(--accent); transform: translateY(-2px); }

        .mode-switch-wrap {
          display: flex;
          justify-content: center;
          margin-top: 24px;
          position: relative;
          z-index: 2;
        }
        .mode-switch {
          width: max-content;
          display: flex;
          gap: 4px;
          border: 1px solid var(--line);
          border-radius: 100px;
          padding: 4px;
          background: var(--surface);
        }
        .mode-option {
          border: 0;
          background: transparent;
          border-radius: 100px;
          color: var(--muted);
          padding: 9px 17px;
          display: flex;
          gap: 8px;
          align-items: center;
          font-size: 11px;
          cursor: pointer;
          transition: background .2s, color .2s;
        }
        .mode-option.selected { background: var(--surface-2); color: var(--text); }
        .mode-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--muted); }
        .selected .mode-dot { background: var(--accent); box-shadow: 0 0 8px var(--accent); }

        .hero {
          max-width: 1150px;
          margin: 0 auto;
          min-height: 610px;
          padding: 84px 40px 38px;
          display: grid;
          grid-template-columns: 1.1fr .9fr;
          align-items: center;
          gap: 65px;
          position: relative;
          z-index: 1;
        }
        .eyebrow-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 5px 12px;
          border-radius: 999px;
          border: 1px solid var(--line);
          background: var(--surface);
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 1.4px;
          color: var(--muted);
          margin-bottom: 20px;
        }
        .eyebrow {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 1.8px;
          color: var(--muted);
          line-height: 1.7;
          margin: 0 0 20px;
        }
        .live-dot {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #a8d9b6;
          box-shadow: 0 0 9px rgba(168, 217, 182, .6);
        }
        .hero h1, .personal-page h1 {
          font-size: clamp(66px, 8vw, 112px);
          line-height: .91;
          letter-spacing: -7px;
          margin: 0;
          font-weight: 600;
        }
        .hero h1 span, .personal-page h1 span {
          color: var(--accent);
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-weight: 500;
        }
        .hero-description {
          color: var(--muted);
          font-size: 15px;
          line-height: 1.9;
          max-width: 425px;
          margin: 27px 0 28px;
        }
        .hero-buttons, .book-actions { display: flex; align-items: center; gap: 20px; flex-wrap: wrap; }
        .hero-socials { margin-top: 24px; }
        .socials-label { display: block; margin: 0 0 7px; color: var(--muted); font-size: 12px; }
        .socials-label strong { color: var(--text); }
        .social-links { display: flex; flex-wrap: wrap; gap: 8px; }
        .social-links a {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 11px;
          border: 1px solid var(--line);
          border-radius: 5px;
          background: var(--surface);
          color: var(--muted);
          font-size: 10px;
          transition: color .2s, border-color .2s, transform .2s;
        }
        .social-brand-icon { width: 15px; height: 15px; flex: 0 0 15px; }
        .social-links a:hover { color: var(--text); border-color: var(--accent); transform: translateY(-2px); }

        .primary-button, .secondary-button {
          min-height: 46px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          border: 1px solid var(--accent);
          padding: 0 19px;
          border-radius: 5px;
          background: var(--accent);
          color: #21162e;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: transform .2s, box-shadow .2s, background .2s;
        }
        .site.light .primary-button { color: #fff; }
        .primary-button:hover { transform: translateY(-3px); box-shadow: 0 9px 25px rgba(161, 118, 220, .22); }

        .secondary-button { color: var(--text); background: var(--surface); border-color: var(--line); font-weight: 500; }
        .secondary-button:hover { border-color: var(--accent); transform: translateY(-2px); }

        .inline-link {
          border: 0;
          padding: 8px 0;
          color: var(--text);
          background: transparent;
          font-size: 12px;
          cursor: pointer;
        }
        .inline-link span { color: var(--accent); margin-left: 7px; }

        .portrait-wrap { position: relative; max-width: 385px; justify-self: center; width: 100%; }
        .portrait-glow {
          position: absolute;
          inset: 10% -10% -5%;
          border-radius: 50%;
          background: rgba(139, 93, 201, .2);
          filter: blur(65px);
        }
        .portrait-backdrop-card {
          position: absolute;
          inset: 0;
          border: 1px solid var(--line);
          background: var(--surface);
          transform: rotate(-3deg) translate(-8px, 6px);
          border-radius: 4px;
        }
        .portrait-frame {
          position: relative;
          padding: 11px;
          border: 1px solid rgba(202, 171, 255, .3);
          background: var(--surface);
          transform: rotate(2deg);
          box-shadow: 0 25px 75px var(--shadow);
        }
        .portrait-img-container { overflow: hidden; }
        .portrait {
          display: block;
          width: 100%;
          height: 425px;
          object-fit: cover;
          object-position: center;
          filter: saturate(.85);
          transition: transform .5s;
        }
        .portrait-wrap:hover .portrait { transform: scale(1.02); }
        .portrait-caption {
          display: flex;
          justify-content: space-between;
          gap: 8px;
          padding: 13px 3px 2px;
          color: var(--muted);
          font-family: 'DM Mono', monospace;
          font-size: 8px;
          letter-spacing: 1.2px;
        }
        .floating-note {
          position: absolute;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 15px;
          border: 1px solid var(--line);
          background: var(--surface);
          box-shadow: 0 10px 30px var(--shadow);
          color: var(--muted);
          font-size: 10px;
          line-height: 1.6;
          animation: float 5s ease-in-out infinite;
        }
        .note-top { top: 12%; left: -55px; }
        .note-bottom { right: -25px; bottom: 16%; animation-delay: -2s; }
        .note-symbol { font-size: 22px; color: var(--accent); }
        .tiny-star { color: var(--star); font-size: 17px; }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }

        .ticker {
          overflow: hidden;
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          padding: 17px 0;
          background: rgba(142, 102, 190, .045);
          position: relative;
          z-index: 1;
        }
        .ticker-track { display: flex; width: max-content; animation: marquee 35s linear infinite; }
        .ticker-track span {
          flex-shrink: 0;
          font: 10px 'DM Mono', monospace;
          letter-spacing: 2px;
          color: var(--muted);
          white-space: nowrap;
        }
        .ticker-track b { color: var(--accent); padding: 0 28px; }
        @keyframes marquee { to { transform: translateX(-50%); } }

        .section {
          max-width: 1080px;
          margin: 0 auto;
          padding: 88px 40px;
          position: relative;
          z-index: 1;
        }
        .section-heading { margin-bottom: 45px; }
        .section-heading .eyebrow { margin-bottom: 15px; }
        .section-heading h2, .contact-panel h2 {
          font-size: clamp(35px, 4.7vw, 58px);
          letter-spacing: -2.5px;
          line-height: 1.1;
          font-weight: 500;
          margin: 0;
        }
        .section-heading h2 span, .contact-panel h2 span {
          color: var(--accent);
          font-family: 'Playfair Display', serif;
          font-style: italic;
        }

        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 90px; }
        .large-copy {
          font-family: 'Playfair Display', serif;
          font-size: 25px;
          line-height: 1.65;
          margin: 0;
          max-width: 450px;
        }
        .about-detail { color: var(--muted); font-size: 13px; line-height: 2; }
        .about-detail p { margin: 0 0 17px; }
        .about-detail .inline-link { margin-top: 8px; color: var(--text); }

        .heading-row { display: flex; justify-content: space-between; align-items: end; gap: 20px; }
        .section-count { font: 9px 'DM Mono', monospace; letter-spacing: 1.5px; color: var(--muted); padding-bottom: 8px; }

        .book-feature {
          display: grid;
          grid-template-columns: .9fr 1.1fr;
          gap: 80px;
          align-items: center;
          border: 1px solid var(--line);
          background: linear-gradient(125deg, rgba(149, 106, 208, .08), rgba(255,255,255,.01));
          padding: 55px;
          position: relative;
          border-radius: 12px;
        }
        .book-art {
          min-height: 380px;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .book-halo {
          position: absolute;
          width: 260px;
          height: 260px;
          border-radius: 50%;
          background: rgba(143, 100, 205, .18);
          filter: blur(50px);
        }
        .book-3d-stage { perspective: 1200px; transform-style: preserve-3d; }
        .book-image-wrap {
          position: relative;
          isolation: isolate;
          width: min(100%, 265px);
          transform: rotate(-4deg) rotateY(-12deg) rotateX(2deg);
          transform-style: preserve-3d;
          box-shadow: 18px 25px 50px rgba(0,0,0,.42), -3px 0 8px rgba(255,255,255,.08);
          border-radius: 3px 5px 5px 3px;
          transition: transform .55s cubic-bezier(.2,.7,.2,1), box-shadow .55s ease;
        }
        .book-image-wrap::before {
          content: "";
          position: absolute;
          z-index: -1;
          top: 5px;
          right: -9px;
          bottom: 4px;
          width: 10px;
          border-radius: 0 3px 3px 0;
          background: repeating-linear-gradient(90deg, #e8e0d4 0 1px, #bdb2a3 1px 2px, #f5eee3 2px 3px);
          transform: translateZ(-2px) skewY(1deg);
          box-shadow: 3px 4px 7px rgba(0,0,0,.2);
        }
        .book-image-wrap::after {
          content: "";
          position: absolute;
          z-index: 2;
          left: 0;
          top: 0;
          bottom: 0;
          width: 11px;
          border-radius: 3px 0 0 3px;
          pointer-events: none;
          background: linear-gradient(90deg, rgba(0,0,0,.46), rgba(255,255,255,.13) 45%, transparent);
          box-shadow: inset -1px 0 rgba(255,255,255,.18);
        }
        .book-image-wrap:hover {
          transform: rotate(-1deg) rotateY(-19deg) rotateX(1deg) translateY(-7px) scale(1.025);
          box-shadow: 25px 32px 58px rgba(0,0,0,.48), -4px 0 10px rgba(255,255,255,.12);
        }
        .book-cover { display: block; width: 100%; height: auto; object-fit: contain; border-radius: 3px 5px 5px 3px; }
        .book-shine {
          position: absolute;
          z-index: 3;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          border-radius: inherit;
          background: linear-gradient(112deg, transparent 25%, rgba(255,255,255,.02) 37%, rgba(255,255,255,.24) 49%, rgba(255,255,255,.04) 58%, transparent 72%);
          transform: translateX(-135%) skewX(-15deg);
          transition: transform .8s cubic-bezier(.2,.7,.2,1);
        }
        .book-image-wrap:hover .book-shine { transform: translateX(135%) skewX(-15deg); }
        .book-art-label { position: absolute; bottom: -24px; color: var(--muted); font: 8px 'DM Mono', monospace; letter-spacing: 2px; }
        .book-info .eyebrow { margin-bottom: 20px; }
        .book-dot { display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: var(--accent); margin-right: 8px; }
        .book-info h3 { font: 500 clamp(38px, 4.2vw, 55px)/1.1 'Playfair Display', serif; letter-spacing: -1.5px; margin: 0 0 15px; }
        .book-info h3 em { color: var(--accent); }
        .book-byline { font-size: 12px; color: var(--muted); }
        .book-rule { width: 48px; height: 1px; background: var(--accent); margin: 26px 0; }
        .book-description { color: var(--muted); font-size: 13px; line-height: 1.9; max-width: 440px; }
        .book-tags { display: flex; flex-wrap: wrap; gap: 8px; margin: 22px 0 30px; }
        .book-tags span { border: 1px solid var(--line); padding: 7px 10px; color: var(--muted); font: 9px 'DM Mono', monospace; border-radius: 4px; }
        .link-button { text-decoration: none; }
        .book-footnote { margin-top: 22px; font: 9px 'DM Mono', monospace; color: var(--muted); }

        .timeline { border-top: 1px solid var(--line); }
        .timeline-item {
          display: grid;
          grid-template-columns: 18px 1fr auto;
          gap: 25px;
          align-items: start;
          padding: 30px 5px;
          border-bottom: 1px solid var(--line);
          transition: background .2s;
        }
        .timeline-item:hover { background: rgba(150, 110, 200, 0.02); }
        .timeline-marker { margin-top: 4px; width: 9px; height: 9px; border: 1px solid var(--accent); border-radius: 50%; box-shadow: 0 0 12px rgba(190, 149, 255, .25); }
        .active-marker { background: var(--accent); }
        .timeline-date { font: 9px 'DM Mono', monospace; letter-spacing: 1.5px; color: var(--accent); margin: 0 0 12px; }
        .timeline-item h3 { font: 500 21px 'Playfair Display', serif; margin: 0 0 10px; }
        .muted { color: var(--muted); font-size: 12px; line-height: 1.8; margin: 0; }
        .timeline-number { font: 11px 'DM Mono', monospace; color: var(--muted); }

        .interest-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 13px; }
        .interest-card {
          min-height: 220px;
          position: relative;
          padding: 22px 20px 25px;
          background: var(--surface);
          border: 1px solid var(--line);
          border-radius: 8px;
          transition: transform .25s, border-color .25s, background .25s;
        }
        .interest-card:hover { transform: translateY(-6px); border-color: var(--accent); background: var(--surface-2); }
        .interest-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .interest-icon { font-size: 23px; color: var(--accent); }
        .interest-tag {
          font: 8px 'DM Mono', monospace;
          letter-spacing: 1.4px;
          color: var(--muted);
          padding: 3px 7px;
          border-radius: 999px;
          border: 1px solid var(--line);
        }
        .interest-card h3 { font: 500 19px 'Playfair Display', serif; margin: 0 0 10px; }
        .interest-card p { color: var(--muted); font-size: 11px; line-height: 1.8; margin: 0; }
        .card-arrow { position: absolute; bottom: 18px; right: 18px; color: var(--accent); opacity: 0; transition: opacity .2s; }
        .interest-card:hover .card-arrow { opacity: 1; }

        .review-feature { display: grid; grid-template-columns: .65fr 1.35fr; border: 1px solid var(--line); border-radius: 12px; overflow: hidden; background: var(--surface); }
        .review-side { padding: 35px; background: linear-gradient(150deg, rgba(142, 101, 197, .14), transparent); border-right: 1px solid var(--line); }
        .quote-mark { display: block; font: 100px/.8 'Playfair Display', serif; color: var(--accent); opacity: .8; margin-bottom: 32px; }
        .review-side .eyebrow { margin-bottom: 15px; }
        .review-stars { color: var(--star); letter-spacing: 4px; font-size: 16px; }
        .review-rating { font: 50px 'Playfair Display', serif; margin: 8px 0; }
        .review-rating span { font: 12px 'DM Sans', sans-serif; color: var(--muted); }
        .review-side-caption { font-size: 10px; color: var(--muted); line-height: 1.8; }
        .review-card { padding: 37px 40px; }
        .review-card-top { display: flex; align-items: center; gap: 13px; flex-wrap: wrap; }
        .review-avatar { width: 42px; height: 42px; display: grid; place-items: center; border-radius: 50%; background: var(--surface-2); border: 1px solid var(--line); color: var(--accent); font: 19px 'Playfair Display', serif; }
        .review-author { flex: 1; }
        .review-author h3 { font-size: 12px; margin: 0 0 5px; font-weight: 600; }
        .review-author p { font-size: 10px; margin: 0; color: var(--muted); }
        .verified-label { font: 8px 'DM Mono', monospace; letter-spacing: .8px; color: var(--muted); padding: 4px 8px; border-radius: 4px; background: var(--surface-2); border: 1px solid var(--line); }
        .review-card-stars { margin-top: 24px; font-size: 13px; }
        .review-card blockquote { margin: 16px 0 24px; color: var(--text); font: 17px/1.9 'Playfair Display', serif; }
        .review-original-link { display: inline-flex; gap: 8px; color: var(--accent); font-size: 11px; border-bottom: 1px solid var(--line); padding-bottom: 6px; }
        .review-original-link:hover { border-color: var(--accent); }

        .contact-section { padding-bottom: 100px; }
        .contact-panel {
          overflow: hidden;
          position: relative;
          padding: 70px 65px;
          border: 1px solid var(--line);
          border-radius: 12px;
          background: linear-gradient(125deg, rgba(139, 96, 196, .13), rgba(255,255,255,.01));
        }
        .contact-orb { position: absolute; width: 300px; height: 300px; right: -70px; top: -90px; background: rgba(151, 108, 220, .16); filter: blur(65px); border-radius: 50%; }
        .contact-panel > *:not(.contact-orb) { position: relative; }
        .contact-panel h2 { font-size: clamp(50px, 6vw, 76px); }
        .contact-description { max-width: 420px; color: var(--muted); font-size: 13px; line-height: 1.9; margin: 22px 0 27px; }
        .email-display { color: var(--muted); font: 10px 'DM Mono', monospace; margin-top: 20px; }
        .contact-form { display: grid; gap: 10px; max-width: 560px; margin-top: 28px; }
        .contact-form label { margin-top: 8px; color: var(--muted); font: 9px 'DM Mono', monospace; letter-spacing: 1px; text-transform: uppercase; }
        .contact-form input, .contact-form textarea { width: 100%; min-width: 0; border: 1px solid var(--line); border-radius: 4px; background: var(--surface); color: var(--text); padding: 13px 14px; outline: none; font: 12px 'DM Sans', sans-serif; resize: vertical; }
        .contact-form input:focus, .contact-form textarea:focus { border-color: var(--accent); box-shadow: 0 0 0 2px color-mix(in srgb, var(--accent) 18%, transparent); }
        .contact-form input::placeholder, .contact-form textarea::placeholder { color: var(--muted); opacity: .75; }
        .contact-form button { justify-self: start; margin-top: 12px; }
        .contact-form button:disabled { opacity: .65; cursor: wait; }
        .contact-status { color: var(--accent); font-size: 12px; line-height: 1.7; margin: 5px 0 0; }
        .email-display a { color: var(--text); text-decoration: underline; text-decoration-color: var(--line); text-underline-offset: 4px; }
        .email-display a:hover { color: var(--accent); }

        .footer {
          position: relative;
          z-index: 1;
          border-top: 1px solid var(--line);
          min-height: 85px;
          padding: 20px 7.2%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
          flex-wrap: wrap;
        }
        .footer-logo { font-size: 20px; }
        .footer p { color: var(--muted); font-size: 9px; margin: 0; }

        /* Personal mode: cream, rose, and paper scrapbook palette */
        .site:has(.scrapbook-page) {
          --scrap-cream: #fbf3e7;
          --scrap-paper: #fffaf1;
          --scrap-rose: #d79b9d;
          --scrap-rose-dark: #a85f68;
          --scrap-brown: #6c4a3c;
          --scrap-ink: #50382f;
          --scrap-muted: #8a7064;
          --bg: #fbf3e7;
          --surface: #fffaf1;
          --surface-2: #f4e6d8;
          --text: #50382f;
          --muted: #8a7064;
          --line: rgba(108, 74, 60, 0.16);
          --accent: #a85f68;
          background: #fbf3e7;
          color: var(--scrap-ink);
        }

        .site.dark:has(.scrapbook-page) {
          --scrap-cream: #171321;
          --scrap-paper: #211b2d;
          --scrap-rose: #c99bbd;
          --scrap-rose-dark: #e0a9c7;
          --scrap-brown: #f0e5f4;
          --scrap-ink: #eee5f2;
          --scrap-muted: #b8a9c5;
          --bg: #100d18;
          --surface: #211b2d;
          --surface-2: #2d243b;
          --text: #eee5f2;
          --muted: #b8a9c5;
          --line: rgba(224, 169, 199, 0.16);
          --accent: #e0a9c7;
          background: radial-gradient(ellipse at 75% 12%, rgba(139, 92, 184, .18), transparent 40%), #100d18;
          color: var(--scrap-ink);
        }

        .personal-page {
          position: relative;
          z-index: 1;
          max-width: 1120px;
          min-height: 65vh;
          margin: 0 auto;
          padding: 32px 38px 80px;
          color: var(--scrap-ink);
        }
        .scrapbook-topline {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          padding: 13px 0;
          border-top: 1px solid #d8c4b3;
          border-bottom: 1px solid #d8c4b3;
          color: var(--scrap-muted);
          font: 10px 'DM Mono', monospace;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }
        .site.dark:has(.scrapbook-page) .scrapbook-topline { border-color: #45344f; }
        .scrapbook-topline span:last-child {
          text-transform: none;
          letter-spacing: .3px;
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-size: 13px;
        }
        .scrapbook-hero {
          position: relative;
          display: grid;
          grid-template-columns: 1.1fr .9fr;
          align-items: center;
          gap: 38px;
          min-height: 490px;
          padding: 55px 4% 60px;
          perspective: 1200px;
        }
        .scrapbook-hero-copy { position: relative; z-index: 1; }
        .personal-eyebrow, .scrap-section-heading p {
          color: var(--scrap-rose-dark);
          font: 10px 'DM Mono', monospace;
          letter-spacing: 2px;
        }
        .scrapbook-page h1 {
          margin: 18px 0 0;
          color: var(--scrap-brown);
          font: 500 clamp(58px, 8vw, 98px)/.95 'Playfair Display', serif;
          letter-spacing: -4px;
        }
        .scrapbook-page h1 em, .scrap-section-heading h2 em {
          color: var(--scrap-rose-dark);
          font-weight: 500;
        }
        .scrapbook-page h1 span { color: var(--scrap-rose); }
        .scrapbook-page .personal-intro {
          margin: 25px 0 12px;
          max-width: 430px;
          color: var(--scrap-muted);
          font: 17px/1.9 'Playfair Display', serif;
        }
        .handwritten-note {
          display: inline-block;
          transform: rotate(-4deg);
          color: var(--scrap-rose-dark);
          font: italic 18px 'Playfair Display', serif;
        }

        /* 3D cursor-tracking polaroid photos */
        .portrait-scrap,
        .memory-photo {
          --base-rot: 0deg;
          --base-y: 0px;
          --tilt-x: 0deg;
          --tilt-y: 0deg;
          --glare-x: 50%;
          --glare-y: 50%;
          position: relative;
          min-width: 0;
          cursor: pointer;
          background: var(--scrap-paper);
          border: 1px solid #ead9c9;
          transform-style: preserve-3d;
          will-change: transform;
          transform: perspective(950px) translateY(var(--base-y)) rotate(var(--base-rot)) rotateX(var(--tilt-x)) rotateY(var(--tilt-y)) translateZ(0);
          transition: transform .48s cubic-bezier(0.2, 0.7, 0.2, 1), box-shadow .32s ease, filter .28s ease;
        }
        .portrait-scrap:focus-visible,
        .memory-photo:focus-visible {
          outline: 2px solid var(--scrap-rose-dark);
          outline-offset: 6px;
        }
        .portrait-scrap {
          padding: 13px 13px 38px;
          box-shadow: 0 3px 0 rgba(60, 35, 45, .08), 0 16px 28px rgba(20, 12, 25, .2), 0 30px 48px rgba(20, 12, 25, .09);
        }
        .memory-photo {
          margin: 0;
          padding: 12px 12px 39px;
          box-shadow: 0 8px 0 -3px rgba(100, 70, 90, .16), 0 20px 30px rgba(15, 8, 25, .2);
        }
        .portrait-scrap::after,
        .memory-photo::after {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 3;
          pointer-events: none;
          opacity: 0;
          background: radial-gradient(
            circle at var(--glare-x) var(--glare-y),
            rgba(255, 255, 255, 0.32),
            rgba(255, 255, 255, 0.06) 42%,
            transparent 70%
          );
          transition: opacity .25s ease;
        }
        .portrait-scrap[data-tilting="true"],
        .memory-photo[data-tilting="true"] {
          z-index: 5;
          transform: perspective(950px) translateY(calc(var(--base-y) - 8px)) rotate(calc(var(--base-rot) * 0.35)) rotateX(var(--tilt-x)) rotateY(var(--tilt-y)) scale(1.03);
          transition: transform 80ms ease-out, box-shadow .28s ease, filter .28s ease;
          box-shadow: 0 6px 0 rgba(60, 35, 45, .08), 0 26px 40px rgba(20, 12, 25, .26), 0 42px 62px rgba(20, 12, 25, .14);
          filter: saturate(1.05);
        }
        .portrait-scrap[data-tilting="true"]::after,
        .memory-photo[data-tilting="true"]::after {
          opacity: 1;
        }

        .portrait-scrap-hero {
          --base-rot: 3deg;
          width: min(100%, 350px);
          justify-self: center;
        }
        .portrait-scrap-small {
          --base-rot: -4deg;
        }
        .memory-photo-tall {
          --base-rot: -3deg;
        }
        .memory-photo-wide {
          --base-rot: 2deg;
          --base-y: 25px;
        }
        .memory-photo-small {
          --base-rot: 3deg;
        }

        .portrait-scrap img, .memory-photo img {
          position: absolute;
          inset: 13px 13px 38px;
          width: calc(100% - 26px);
          height: calc(100% - 51px);
          object-fit: cover;
          z-index: 2;
        }
        .memory-photo img {
          inset: 12px 12px 39px;
          width: calc(100% - 24px);
          height: calc(100% - 51px);
        }
        .photo-placeholder {
          min-height: 240px;
          height: 100%;
          aspect-ratio: 4/5;
          background: linear-gradient(145deg, #f2dfd7, #f8eade 52%, #ead4c3);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          gap: 10px;
          padding: 20px;
          color: var(--scrap-brown);
        }
        .portrait-scrap-hero .photo-placeholder { min-height: 350px; }
        .portrait-scrap-small .photo-placeholder { min-height: 220px; }
        .memory-photo .photo-placeholder { min-height: 190px; aspect-ratio: 4/4.5; }
        .placeholder-icon {
          display: grid;
          place-items: center;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(255, 250, 241, .75);
          color: var(--scrap-rose-dark);
          font-size: 26px;
        }
        .placeholder-sparkle { align-self: flex-end; color: var(--scrap-rose-dark); font-size: 24px; }
        .photo-placeholder strong { font: 500 17px 'Playfair Display', serif; }
        .photo-placeholder small { color: var(--scrap-muted); font: 10px/1.7 'DM Sans', sans-serif; }
        .photo-placeholder code { font-size: 10px; }
        .photo-caption {
          position: absolute;
          bottom: 12px;
          left: 0;
          right: 0;
          text-align: center;
          color: var(--scrap-muted);
          font: italic 14px 'Playfair Display', serif;
        }
        .memory-photo figcaption {
          position: absolute;
          bottom: 10px;
          left: 5px;
          right: 5px;
          text-align: center;
          color: var(--scrap-muted);
          font: italic 13px 'Playfair Display', serif;
        }
        .tape, .photo-tape {
          position: absolute;
          z-index: 4;
          width: 85px;
          height: 23px;
          background: rgba(215, 155, 157, .55);
          left: calc(50% - 42px);
          top: -10px;
          transform: rotate(-5deg);
        }
        .doodle { position: absolute; color: var(--scrap-rose); font-size: 48px; }
        .doodle-heart { right: 2%; bottom: 42px; transform: rotate(12deg); }
        .heart-like-button {
          padding: 0;
          border: 0;
          background: transparent;
          cursor: pointer;
          line-height: 1;
          transition: color .18s ease, transform .18s ease;
          -webkit-tap-highlight-color: transparent;
        }
        .heart-like-button:hover { transform: rotate(12deg) scale(1.08); }
        .heart-like-button.heart-popped {
          color: #ff3f70;
          transform: rotate(12deg) scale(1.28);
          animation: heart-like-pop .85s ease both;
        }
        @keyframes heart-like-pop {
          0% { color: var(--scrap-rose); transform: rotate(12deg) scale(1); }
          25% { color: #ff315f; transform: rotate(0deg) scale(1.38); }
          65% { color: #ff315f; transform: rotate(8deg) scale(1.18); }
          100% { color: var(--scrap-rose); transform: rotate(12deg) scale(1); }
        }
        .heart-like-button:focus-visible { outline: 2px solid #ff6b91; outline-offset: 6px; border-radius: 8px; }
        .doodle-star { top: 45px; right: 44%; font-size: 28px; }

        .scrapbook-section { padding: 44px 0 25px; }
        .scrap-section-heading { display: flex; align-items: center; gap: 17px; margin-bottom: 28px; }
        .section-sticker {
          flex: 0 0 47px;
          width: 47px;
          height: 47px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: #ead4c3;
          color: var(--scrap-brown);
          font: italic 19px 'Playfair Display', serif;
          transform: rotate(-8deg);
        }
        .sticker-rose { background: #efd5d4; color: #a85f68; transform: rotate(6deg); }
        .sticker-brown { background: #d9c2ae; transform: rotate(-4deg); }
        .scrap-section-heading p { margin: 0 0 7px; font-size: 9px; }
        .scrap-section-heading h2 { margin: 0; color: var(--scrap-brown); font: 500 clamp(32px, 4vw, 48px)/1.1 'Playfair Display', serif; }

        .about-note-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) minmax(0, .75fr) minmax(0, 1fr);
          align-items: center;
          gap: clamp(18px, 2vw, 28px);
          perspective: 1200px;
        }
        .about-note-grid > *, .favourite-grid > *, .memory-board > * { min-width: 0; }
        .paper-note {
          position: relative;
          min-width: 0;
          overflow-wrap: break-word;
          background: #fff9ef;
          padding: clamp(24px, 2.4vw, 34px) clamp(20px, 2vw, 30px) 27px;
          border: 1px solid #ead9c9;
          transform: rotate(-1.2deg) translateZ(0);
          box-shadow: 0 3px 0 rgba(70, 42, 48, .06), 0 15px 25px rgba(35, 20, 30, .13), 0 28px 48px rgba(35, 20, 30, .07);
          transition: transform .28s ease, box-shadow .28s ease;
        }
        .paper-note:hover {
          transform: rotate(-.3deg) translateY(-5px) rotateX(1deg);
          box-shadow: 0 5px 0 rgba(70, 42, 48, .05), 0 22px 32px rgba(35, 20, 30, .17), 0 36px 55px rgba(35, 20, 30, .1);
        }
        .note-pin { position: absolute; right: 18px; top: 10px; color: var(--scrap-rose); font-size: 19px; }
        .note-script { color: var(--scrap-rose-dark) !important; font: italic 22px 'Playfair Display', serif !important; }
        .paper-note p { color: var(--scrap-muted); font-size: 13px; line-height: 1.85; }
        .paper-note .note-signoff {
          margin-top: 20px;
          margin-bottom: 0;
          padding-top: 2px;
          color: var(--scrap-brown);
          font: italic 15px/1.7 'Playfair Display', serif;
        }

        .little-facts { padding: 17px 0 17px 20px; border-left: 1px dashed #d5b7a7; }
        .fact-label { color: var(--scrap-rose-dark); font: 9px 'DM Mono', monospace; letter-spacing: 1px; }
        .little-facts p {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          color: var(--scrap-muted);
          font-size: 12px;
          line-height: 1.7;
          margin: 17px 0 0;
        }
        .little-facts p span {
          flex: 0 0 20px;
          text-align: center;
          color: var(--scrap-rose-dark);
          font-size: 16px;
          line-height: 1.3;
          margin-right: 0;
        }

        .favourite-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; }
        .favourite-card {
          position: relative;
          min-width: 0;
          min-height: 235px;
          padding: 24px 19px 22px;
          border: 1px solid #ead9c9;
          transform-style: preserve-3d;
          transition: transform .3s ease, box-shadow .3s ease, filter .28s ease;
          box-shadow: 0 7px 0 -3px rgba(100, 70, 90, .12), 0 16px 24px rgba(30, 18, 30, .12);
          overflow-wrap: anywhere;
        }
        .favourite-card:hover {
          transform: translateY(-7px) rotate(0deg) scale(1.015);
          box-shadow: 0 18px 32px rgba(25, 15, 25, .15);
          filter: saturate(1.05);
        }
        .favourite-books { background: #f7e8df; transform: rotate(-1deg); }
        .favourite-people { background: #f8f0df; transform: translateY(10px) rotate(1deg); }
        .favourite-art { background: #f0dfdf; transform: rotate(-.5deg); }
        .favourite-days { background: #eee5d6; transform: translateY(8px) rotate(1deg); }
        .favourite-doodle { display: block; color: var(--scrap-rose-dark); font-size: 27px; margin-bottom: 23px; }
        .favourite-category { display: block; color: var(--scrap-muted); font: 8px 'DM Mono', monospace; letter-spacing: 1px; }
        .favourite-card h3 { margin: 9px 0; color: var(--scrap-brown); font: 500 21px 'Playfair Display', serif; }
        .favourite-card p { margin: 0; color: var(--scrap-muted); font-size: 11px; line-height: 1.8; }
        .favourite-bottom { display: block; margin-top: 18px; color: var(--scrap-rose-dark); font: italic 12px 'Playfair Display', serif; }

        .memories-intro { max-width: 650px; margin: -10px 0 32px 64px; color: var(--scrap-muted); font: 15px/1.8 'Playfair Display', serif; }
        .memory-board {
          display: grid;
          grid-template-columns: 1fr 1.15fr .9fr;
          grid-template-rows: auto auto;
          align-items: center;
          gap: 25px;
          padding: 8px 10px 25px;
          perspective: 1200px;
        }
        .memory-quote {
          grid-column: 2;
          grid-row: 2;
          align-self: start;
          text-align: center;
          padding: 8px 25px 15px;
          color: var(--scrap-brown);
        }
        .memory-quote span { color: var(--scrap-rose); font: 70px/.7 'Playfair Display', serif; }
        .memory-quote p { font: italic 19px/1.6 'Playfair Display', serif; }
        .memory-quote small { color: var(--scrap-muted); font: 10px 'DM Mono', monospace; letter-spacing: 1px; }

        /* Scrapbook photo lightbox */
        .lightbox-overlay {
          position: fixed;
          inset: 0;
          z-index: 110;
          display: grid;
          place-items: center;
          padding: 24px;
          background: rgba(16, 11, 20, 0.8);
          backdrop-filter: blur(12px);
          animation: lightbox-fade 220ms ease-out;
        }
        @keyframes lightbox-fade { from { opacity: 0; } to { opacity: 1; } }
        .lightbox-stage {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 22px;
          width: min(100%, 640px);
        }
        .lightbox-polaroid {
          position: relative;
          width: min(100%, 440px);
          background: var(--scrap-paper, #fffaf1);
          border: 1px solid #ead9c9;
          padding: 16px 16px 24px;
          box-shadow: 0 30px 90px rgba(0, 0, 0, 0.55);
          animation: lightbox-pop 280ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes lightbox-pop {
          from { opacity: 0; transform: scale(0.92) rotate(-2deg); }
          to { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        .lightbox-tape {
          position: absolute;
          z-index: 4;
          width: 105px;
          height: 26px;
          background: rgba(215, 155, 157, 0.62);
          left: calc(50% - 52px);
          top: -12px;
          transform: rotate(-3deg);
        }
        .lightbox-topbar { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
        .lightbox-counter { font: 10px 'DM Mono', monospace; letter-spacing: 1.5px; color: var(--scrap-muted, #8a7064); }
        .lightbox-close {
          border: 1px solid var(--line);
          border-radius: 4px;
          background: transparent;
          color: var(--scrap-muted, #8a7064);
          padding: 4px 8px;
          font: 9px 'DM Mono', monospace;
          cursor: pointer;
          transition: border-color .2s, color .2s;
        }
        .lightbox-close:hover { border-color: var(--scrap-rose-dark, #a85f68); color: var(--scrap-ink, #50382f); }
        .lightbox-media {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 4.8;
          overflow: hidden;
          background: #f3e4d8;
        }
        .lightbox-placeholder { min-height: 100%; height: 100%; }
        .lightbox-media img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 2;
        }
        .lightbox-footer { margin-top: 18px; text-align: center; }
        .lightbox-caption { margin: 0 0 6px; color: var(--scrap-brown, #6c4a3c); font: italic 21px 'Playfair Display', serif; }
        .lightbox-hint { display: block; color: var(--scrap-muted, #8a7064); font: 9px 'DM Mono', monospace; letter-spacing: 1px; }
        .lightbox-nav {
          flex: 0 0 44px;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.22);
          background: rgba(255, 250, 241, 0.14);
          color: #fff;
          font-size: 18px;
          display: grid;
          place-items: center;
          cursor: pointer;
          transition: transform .2s ease, background .2s ease, border-color .2s ease;
        }
        .lightbox-nav:hover { transform: scale(1.08); background: rgba(255, 250, 241, 0.26); border-color: #d79b9d; }

        /* Dark theme overrides for Personal scrapbook mode */
        .site.dark:has(.scrapbook-page) .portrait-scrap,
        .site.dark:has(.scrapbook-page) .memory-photo {
          background: var(--scrap-paper);
          border-color: #493850;
          box-shadow: 0 12px 28px rgba(0, 0, 0, .28);
        }
        .site.dark:has(.scrapbook-page) .portrait-scrap[data-tilting="true"],
        .site.dark:has(.scrapbook-page) .memory-photo[data-tilting="true"] {
          box-shadow: 0 26px 48px rgba(0, 0, 0, .48);
        }
        .site.dark:has(.scrapbook-page) .portrait-scrap::after,
        .site.dark:has(.scrapbook-page) .memory-photo::after {
          background: radial-gradient(
            circle at var(--glare-x) var(--glare-y),
            rgba(240, 215, 255, 0.2),
            rgba(240, 215, 255, 0.04) 42%,
            transparent 70%
          );
        }
        .site.dark:has(.scrapbook-page) .photo-placeholder {
          background: linear-gradient(145deg, #30243a, #241d30 52%, #38283d);
          color: var(--scrap-brown);
        }
        .site.dark:has(.scrapbook-page) .placeholder-icon { background: #3c2d46; color: var(--scrap-rose-dark); }
        .site.dark:has(.scrapbook-page) .lightbox-polaroid { background: var(--scrap-paper); border-color: #493850; }
        .site.dark:has(.scrapbook-page) .lightbox-media { background: #30243a; }
        .site.dark:has(.scrapbook-page) .paper-note {
          background: #211a2b;
          border-color: #493850;
          box-shadow: 0 3px 0 rgba(0, 0, 0, .15), 0 16px 28px rgba(0, 0, 0, .28), 0 30px 48px rgba(0, 0, 0, .14);
        }
        .site.dark:has(.scrapbook-page) .paper-note:hover {
          box-shadow: 0 5px 0 rgba(0, 0, 0, .2), 0 22px 34px rgba(0, 0, 0, .34), 0 38px 58px rgba(0, 0, 0, .18);
        }
        .site.dark:has(.scrapbook-page) .favourite-books { background: #302337; }
        .site.dark:has(.scrapbook-page) .favourite-people { background: #302a35; }
        .site.dark:has(.scrapbook-page) .favourite-art { background: #332431; }
        .site.dark:has(.scrapbook-page) .favourite-days { background: #292431; }
        .site.dark:has(.scrapbook-page) .favourite-card { border-color: #493850; box-shadow: 0 7px 15px rgba(0, 0, 0, .2); }
        .site.dark:has(.scrapbook-page) .section-sticker { background: #382b43; color: #ead9f0; }
        .site.dark:has(.scrapbook-page) .sticker-rose { background: #442b40; color: #efb7d1; }
        .site.dark:has(.scrapbook-page) .sticker-brown { background: #3b2d3b; }
        .site.dark:has(.scrapbook-page) .little-facts { border-left-color: #493850; }

        .command-overlay {
          position: fixed;
          inset: 0;
          z-index: 100;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: min(18vh, 150px) 20px 30px;
          background: rgba(4, 3, 8, .72);
          backdrop-filter: blur(10px);
        }
        .command-dialog {
          width: min(100%, 530px);
          border-radius: 12px;
          overflow: hidden;
          background: var(--surface);
          border: 1px solid var(--line);
          box-shadow: 0 30px 100px rgba(0, 0, 0, .45);
        }
        .command-input-row { display: flex; align-items: center; gap: 12px; padding: 17px; border-bottom: 1px solid var(--line); }
        .command-search-icon { color: var(--accent); font-size: 23px; }
        .command-input-row input { flex: 1; min-width: 0; border: 0; outline: 0; color: var(--text); background: transparent; font-size: 13px; }
        .command-input-row input::placeholder { color: var(--muted); }
        .esc-button { border: 1px solid var(--line); border-radius: 4px; background: transparent; color: var(--muted); padding: 5px 7px; font: 9px 'DM Mono', monospace; cursor: pointer; }
        .command-label { margin: 18px 17px 9px; font: 9px 'DM Mono', monospace; letter-spacing: 1.3px; color: var(--muted); }
        .command-list { padding: 0 8px 10px; max-height: 50vh; overflow: auto; }
        .command-item {
          display: flex;
          width: 100%;
          align-items: center;
          gap: 12px;
          border: 0;
          border-radius: 6px;
          background: transparent;
          padding: 12px 10px;
          text-align: left;
          cursor: pointer;
          transition: background .18s ease, transform .18s ease, box-shadow .18s ease;
        }
        .command-item.active, .command-item:hover, .command-item:focus-visible {
          background: var(--surface-2);
          box-shadow: inset 2px 0 0 var(--accent);
          outline: none;
        }
        .command-item:hover { transform: translateX(3px); }
        .command-item-icon {
          width: 28px;
          height: 28px;
          border-radius: 4px;
          display: grid;
          place-items: center;
          border: 1px solid var(--line);
          color: var(--accent);
          transition: background .18s ease, border-color .18s ease, transform .18s ease;
        }
        .command-item:hover .command-item-icon, .command-item.active .command-item-icon {
          background: var(--bg);
          border-color: var(--accent);
          transform: scale(1.05);
        }
        .command-item-text { display: flex; flex: 1; flex-direction: column; gap: 4px; }
        .command-item-text strong { font-size: 11px; font-weight: 600; }
        .command-item-text small { font-size: 10px; color: var(--muted); }
        .command-enter { color: var(--muted); transition: color .18s ease, transform .18s ease; }
        .command-item:hover .command-enter, .command-item.active .command-enter {
          color: var(--accent);
          transform: translateX(2px);
        }
        .no-commands { padding: 18px; color: var(--muted); font-size: 12px; }
        .command-footer { border-top: 1px solid var(--line); padding: 12px 17px; color: var(--muted); font-size: 9px; }
        kbd { border: 1px solid var(--line); border-radius: 3px; padding: 2px 4px; margin: 0 3px; font-family: 'DM Mono', monospace; }

        @media (max-width: 800px) {
          .topbar { padding: 0 5%; height: 68px; }
          .desktop-nav { gap: 13px; }
          .nav-link { font-size: 10px; }
          .hero { grid-template-columns: 1fr .8fr; gap: 30px; padding: 70px 28px 34px; min-height: 560px; }
          .hero h1 { font-size: clamp(60px, 9vw, 82px); letter-spacing: -4px; }
          .portrait { height: 340px; }
          .note-top { left: -25px; }
          .note-bottom { right: -12px; }
          .section { padding: 70px 28px; }
          .book-feature { padding: 35px; gap: 40px; }
          .book-art { min-height: 300px; }
          .book-image-wrap { width: min(100%, 220px); }
          .interest-grid { grid-template-columns: repeat(2, 1fr); }
          .about-grid { gap: 40px; }
          .review-card { padding: 28px; }
          .review-side { padding: 25px; }
        }

        @media (max-width: 560px) {
          .topbar { height: 64px; }
          .desktop-nav { display: none; }
          .mode-switch { margin-top: 17px; }
          .hero { grid-template-columns: 1fr; padding: 65px 25px 30px; gap: 48px; }
          .hero h1 { font-size: 82px; }
          .hero-description { font-size: 14px; }
          .portrait-wrap { width: min(82%, 320px); margin: 0 auto; }
          .portrait { height: 365px; }
          .note-top { left: -35px; }
          .note-bottom { right: -25px; }
          .section { padding: 62px 23px; }
          .section-heading h2 { font-size: 38px; letter-spacing: -1.5px; }
          .about-grid { grid-template-columns: 1fr; gap: 25px; }
          .large-copy { font-size: 23px; }
          .heading-row { align-items: flex-start; flex-direction: column; }
          .book-feature { grid-template-columns: 1fr; gap: 40px; padding: 27px 22px; }
          .book-art { min-height: 340px; }
          .book-image-wrap { width: 220px; }
          .book-info h3 { font-size: 43px; }
          .book-actions { align-items: stretch; flex-direction: column; gap: 12px; }
          .book-actions > * { width: 100%; }
          .timeline-item { gap: 12px; }
          .timeline-number { display: none; }
          .interest-grid { grid-template-columns: 1fr 1fr; gap: 9px; }
          .interest-card { min-height: 205px; padding: 17px 13px; }
          .interest-card h3 { font-size: 17px; }
          .review-feature { grid-template-columns: 1fr; }
          .review-side { border-right: 0; border-bottom: 1px solid var(--line); padding: 25px; }
          .quote-mark { font-size: 70px; margin-bottom: 15px; }
          .review-rating { font-size: 40px; }
          .review-card { padding: 25px 20px; }
          .review-card blockquote { font-size: 16px; }
          .verified-label { width: fit-content; }
          .contact-panel { padding: 45px 25px; }
          .contact-panel h2 { font-size: 57px; }
          .footer { padding: 20px 23px; }
          .footer p { max-width: 145px; line-height: 1.6; }
          .scrapbook-page { padding: 22px 20px 55px; }
          .scrapbook-topline { font-size: 8px; letter-spacing: .8px; }
          .scrapbook-hero { grid-template-columns: 1fr; gap: 28px; padding: 38px 2% 45px; }
          .scrapbook-page h1 { font-size: clamp(58px, 17vw, 78px); letter-spacing: -3px; }
          .portrait-scrap-hero { width: min(86%, 330px); }
          .portrait-scrap-hero .photo-placeholder { min-height: 290px; }
          .doodle-heart { right: 0; bottom: 5px; }
          .doodle-star { right: 8%; top: 25px; }
          .about-note-grid { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 18px; }
          .paper-note { grid-column: 1 / -1; }
          .paper-note .note-signoff { margin-top: 22px; }
          .little-facts { padding-left: 14px; }
          .favourite-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
          .favourite-card { min-height: 220px; padding: 20px 15px; }
          .memories-intro { margin: 0 0 25px; }
          .memory-board { grid-template-columns: 1fr 1fr; gap: 20px 14px; padding: 0 5px 15px; }
          .memory-photo-wide { --base-y: 0px; }
          .memory-quote { grid-column: 1 / -1; grid-row: auto; padding: 10px 10px; }
          .memory-photo .photo-placeholder { min-height: 160px; padding: 12px; }
          .placeholder-icon { width: 38px; height: 38px; }
          .photo-placeholder strong { font-size: 14px; }
          .lightbox-stage { gap: 10px; }
          .lightbox-nav { width: 36px; height: 36px; flex: 0 0 36px; font-size: 15px; }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: .01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: .01ms !important;
          }
        }


        /* Dreamy cosmic polish: restrained stars, violet depth, and a luminous book. */
        .site.dark {
          --bg: #090713;
          --surface: rgba(22, 17, 38, .88);
          --surface-2: rgba(37, 27, 59, .92);
          --text: #f8f4ff;
          --muted: #b0a5c7;
          --line: rgba(210, 190, 255, .17);
          --accent: #d0b4ff;
          --accent-2: #a985f5;
          background:
            radial-gradient(ellipse at 50% -12%, rgba(112, 69, 180, .28), transparent 50%),
            radial-gradient(ellipse at 90% 35%, rgba(75, 45, 132, .16), transparent 36%),
            radial-gradient(ellipse at 8% 72%, rgba(67, 46, 118, .13), transparent 34%),
            var(--bg);
        }
        .site.dark::before {
          content: "";
          position: fixed;
          inset: -2%;
          z-index: 0;
          pointer-events: none;
          opacity: .54;
          background-image:
            radial-gradient(1px 1px at 7% 12%, rgba(255,255,255,.9) 50%, transparent 100%),
            radial-gradient(1.3px 1.3px at 21% 36%, rgba(224,211,255,.95) 50%, transparent 100%),
            radial-gradient(1px 1px at 37% 17%, rgba(255,255,255,.8) 50%, transparent 100%),
            radial-gradient(1.5px 1.5px at 52% 44%, rgba(220,205,255,.85) 50%, transparent 100%),
            radial-gradient(1px 1px at 68% 13%, rgba(255,255,255,.8) 50%, transparent 100%),
            radial-gradient(1.2px 1.2px at 81% 31%, rgba(234,224,255,.9) 50%, transparent 100%),
            radial-gradient(1px 1px at 94% 61%, rgba(255,255,255,.8) 50%, transparent 100%),
            radial-gradient(1px 1px at 13% 77%, rgba(222,208,255,.8) 50%, transparent 100%),
            radial-gradient(1.4px 1.4px at 43% 84%, rgba(255,255,255,.8) 50%, transparent 100%),
            radial-gradient(1px 1px at 74% 76%, rgba(229,215,255,.9) 50%, transparent 100%);
          background-size: 430px 390px;
          animation: starfield-float 34s ease-in-out infinite alternate;
        }
        .site.dark::after {
          content: "";
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          opacity: .42;
          background:
            radial-gradient(ellipse at 50% 14%, rgba(144, 91, 225, .09), transparent 36%),
            radial-gradient(ellipse at 50% 62%, rgba(78, 52, 143, .07), transparent 46%);
          animation: nebula-breathe 12s ease-in-out infinite alternate;
        }
        .site.light::before, .site.light::after { display: none; }
        @keyframes starfield-float {
          from { transform: translate3d(0, 0, 0); opacity: .38; }
          to { transform: translate3d(-8px, -12px, 0); opacity: .62; }
        }
        @keyframes nebula-breathe {
          from { opacity: .28; }
          to { opacity: .52; }
        }
        .site.dark .topbar {
          background: rgba(10, 7, 20, .68);
          border-color: rgba(210, 190, 255, .12);
          backdrop-filter: blur(18px) saturate(135%);
          -webkit-backdrop-filter: blur(18px) saturate(135%);
        }
        .site.dark .hero h1 {
          text-shadow: 0 0 36px rgba(174, 133, 255, .12);
        }
        .site.dark .hero h1 span {
          text-shadow: 0 0 32px rgba(177, 130, 255, .24);
        }
        .site.dark .eyebrow-pill,
        .site.dark .social-links a {
          background: rgba(24, 17, 41, .72);
          border-color: rgba(211, 190, 255, .17);
        }
        .book-feature {
          overflow: hidden;
          border-color: rgba(205, 177, 255, .2);
          background:
            radial-gradient(ellipse at 18% 50%, rgba(145, 98, 224, .13), transparent 43%),
            linear-gradient(125deg, rgba(149, 106, 208, .095), rgba(255,255,255,.012));
          box-shadow: 0 24px 80px rgba(0, 0, 0, .12), inset 0 1px rgba(255,255,255,.035);
          transition: border-color .35s ease, box-shadow .35s ease, transform .35s ease;
        }
        .site.dark .book-feature:hover {
          border-color: rgba(211, 186, 255, .32);
          box-shadow: 0 28px 90px rgba(0, 0, 0, .2), 0 0 48px rgba(127, 81, 201, .08), inset 0 1px rgba(255,255,255,.05);
        }
        .book-art { isolation: isolate; }
        .book-halo {
          width: 285px;
          height: 285px;
          background: radial-gradient(circle, rgba(196, 159, 255, .34) 0%, rgba(137, 87, 222, .17) 35%, rgba(99, 63, 164, .06) 58%, transparent 72%);
          filter: blur(22px);
          animation: book-halo-breathe 7s ease-in-out infinite alternate;
        }
        @keyframes book-halo-breathe {
          from { transform: scale(.92); opacity: .72; }
          to { transform: scale(1.08); opacity: 1; }
        }
        .book-image-wrap {
          box-shadow: 18px 25px 50px rgba(0,0,0,.48), -3px 0 8px rgba(255,255,255,.12), 0 0 34px rgba(187, 145, 255, .12);
        }
        .site.dark .book-image-wrap:hover {
          box-shadow: 25px 32px 58px rgba(0,0,0,.5), -4px 0 10px rgba(255,255,255,.16), 0 0 44px rgba(187, 145, 255, .2);
        }
        .site.dark .book-art-label { color: #c0b1df; }
        .site.dark .section-heading { text-shadow: 0 0 26px rgba(160, 120, 230, .07); }
        .site.dark .interest-card,
        .site.dark .review-card,
        .site.dark .timeline-item,
        .site.dark .contact-panel {
          box-shadow: 0 12px 40px rgba(0, 0, 0, .09);
        }
        .site.dark .interest-card:hover,
        .site.dark .review-card:hover {
          box-shadow: 0 18px 45px rgba(0, 0, 0, .16), 0 0 30px rgba(150, 103, 225, .07);
        }
        .site.dark .scrapbook-page {
          box-shadow: 0 0 80px rgba(132, 89, 200, .09);
        }
        .site.dark .memory-photo,
        .site.dark .portrait-scrap-hero {
          filter: drop-shadow(0 16px 22px rgba(0, 0, 0, .24));
        }
        .site.dark .memory-photo:hover,
        .site.dark .portrait-scrap-hero:hover {
          filter: drop-shadow(0 18px 28px rgba(0, 0, 0, .3));
        }
        .site :is(a, button, input, textarea):focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 4px;
        }
        @media (max-width: 760px) {
          .site.dark::before { opacity: .34; background-size: 360px 340px; }
          .site.dark::after { opacity: .3; }
          .book-halo { width: 235px; height: 235px; }
          .book-feature { border-radius: 10px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .site.dark::before, .site.dark::after, .book-halo { animation: none !important; }
        }

      `}</style>
    </main>
  );
}