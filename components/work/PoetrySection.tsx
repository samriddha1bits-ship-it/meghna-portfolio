"use client";

import { useEffect, useRef, useState } from "react";
import { poems, type Poem } from "@/data/content";

export default function PoetrySection() {
  const [selectedPoem, setSelectedPoem] = useState<Poem | null>(null);
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [likedPoems, setLikedPoems] = useState<Record<string, boolean>>({});
  const [copiedVerse, setCopiedVerse] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Dialog management
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (selectedPoem && !dialog.open) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
    } else if (!selectedPoem && dialog.open) {
      dialog.close();
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedPoem]);

  // Click outside to close backdrop handler
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    function handleBackdropClick(event: MouseEvent) {
      if (!dialog || event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      const isInside =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width;
      if (!isInside) {
        setSelectedPoem(null);
      }
    }

    dialog.addEventListener("click", handleBackdropClick);
    return () => {
      dialog.removeEventListener("click", handleBackdropClick);
    };
  }, []);

  function handleLike(poemId: string) {
    if (likedPoems[poemId]) return;
    setLikes((prev) => ({ ...prev, [poemId]: (prev[poemId] || 0) + 1 }));
    setLikedPoems((prev) => ({ ...prev, [poemId]: true }));
  }

  function copyVerse(verseText: string, poemTitle: string) {
    if (!navigator.clipboard) return;
    navigator.clipboard
      .writeText(`“${verseText}”\n— Meghna Bose, from “${poemTitle}”`)
      .then(() => {
        setCopiedVerse(true);
        setTimeout(() => setCopiedVerse(false), 2400);
      });
  }

  return (
    <section className="section poetry-section reveal" id="poetry">
      <div className="section-heading heading-row">
        <div>
          <p className="eyebrow">ORIGINAL POETRY · BY MEGHNA BOSE</p>
          <h2>
            Verses from <span>the soul.</span>
          </h2>
          <p className="section-subtext">
            Original poems exploring solitude, moonlight, quiet yearnings, and finding one&apos;s own voice.
          </p>
        </div>
        <span className="section-count">4 POEMS</span>
      </div>

      <div className="poetry-grid">
        {poems.map((poem) => {
          const poemLikes = (likes[poem.id] || 0) + 14;
          const isLiked = likedPoems[poem.id];

          return (
            <article className="poetry-card" key={poem.id}>
              <div className="poetry-card-top">
                <span className="poetry-theme-pill">{poem.theme}</span>
                <span className="poetry-time-pill">{poem.readTime}</span>
              </div>

              <h3 className="poetry-card-title">{poem.title}</h3>
              <p className="poetry-card-subtitle">{poem.subtitle}</p>

              <blockquote className="poetry-card-verse">
                “{poem.featuredVerse}”
              </blockquote>

              <div className="poetry-card-footer">
                <div className="poetry-tags">
                  {poem.tags.map((tag) => (
                    <span key={tag} className="tag-chip">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="poetry-card-actions">
                  <button
                    type="button"
                    className={`poem-like-btn ${isLiked ? "liked" : ""}`}
                    onClick={() => handleLike(poem.id)}
                    aria-label={`Like ${poem.title} (${poemLikes} likes)`}
                    title="Appreciate this poem"
                  >
                    <span>{isLiked ? "♥" : "♡"}</span>
                    <span>{poemLikes}</span>
                  </button>

                  <button
                    type="button"
                    className="read-poem-btn"
                    onClick={() => setSelectedPoem(poem)}
                  >
                    Read Poem ✦
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Poem Reader Dialog Modal */}
      <dialog
        ref={dialogRef}
        closedby="any"
        className="poem-reader-dialog"
        aria-label={selectedPoem?.title || "Poem Reader"}
        onClose={() => setSelectedPoem(null)}
      >
        {selectedPoem && (
          <div className="poem-dialog-content">
            <header className="poem-dialog-header">
              <div className="poem-header-meta">
                <span className="poetry-theme-pill">{selectedPoem.theme}</span>
                <span className="poem-dot">·</span>
                <span className="poetry-time-pill">{selectedPoem.readTime}</span>
              </div>
              <button
                type="button"
                className="poem-close-btn"
                onClick={() => setSelectedPoem(null)}
                aria-label="Close poem reader"
              >
                ✕
              </button>
            </header>

            <h2 className="poem-dialog-title">{selectedPoem.title}</h2>
            <p className="poem-dialog-subtitle">{selectedPoem.subtitle}</p>
            <p className="poem-dialog-byline">
              Written by <strong>Meghna Bose</strong> · <em>Presidency University</em>
            </p>

            <div className="poem-pull-quote">
              <span className="quote-flourish" aria-hidden="true">
                “
              </span>
              <p className="quote-line">{selectedPoem.featuredVerse}</p>
              <button
                type="button"
                className={`copy-quote-btn ${copiedVerse ? "copied" : ""}`}
                onClick={() => copyVerse(selectedPoem.featuredVerse, selectedPoem.title)}
              >
                {copiedVerse ? "Copied verse! ✨" : "Copy Verse 📋"}
              </button>
            </div>

            <div className="poem-stanzas-container">
              {selectedPoem.stanzas.map((stanza, idx) => (
                <div key={idx} className="poem-stanza">
                  {stanza.split("\n").map((line, lineIdx) => (
                    <p key={lineIdx} className="poem-line">
                      {line}
                    </p>
                  ))}
                </div>
              ))}
            </div>

            <div className="poem-signoff-wrap">
              <span className="poem-signoff-dash">—</span>
              <span className="poem-signoff-name">{selectedPoem.signoff}</span>
            </div>

            <footer className="poem-dialog-footer">
              <div className="poem-reaction-wrap">
                <button
                  type="button"
                  className={`dialog-like-btn ${likedPoems[selectedPoem.id] ? "liked" : ""}`}
                  onClick={() => handleLike(selectedPoem.id)}
                >
                  <span className="heart-icon">
                    {likedPoems[selectedPoem.id] ? "♥" : "♡"}
                  </span>
                  <span>
                    {likedPoems[selectedPoem.id] ? "Appreciated! Liked" : "Appreciate poem"} (
                    {(likes[selectedPoem.id] || 0) + 14})
                  </span>
                </button>
              </div>

              <button
                type="button"
                className="secondary-button"
                onClick={() => setSelectedPoem(null)}
              >
                Close Poem
              </button>
            </footer>
          </div>
        )}
      </dialog>
    </section>
  );
}
