"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "@/components/Lightbox";
import { scrapbookPhotos } from "@/data/content";

// One pending animation frame per photo, so fast mouse moves don't pile up work.
const pendingFrames = new WeakMap<HTMLElement, number>();

export default function PersonalPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [heartPopped, setHeartPopped] = useState(false);

  function handlePhotoTilt(event: React.MouseEvent<HTMLElement>) {
    const el = event.currentTarget;
    const { clientX, clientY } = event;
    const pending = pendingFrames.get(el);
    if (pending !== undefined) cancelAnimationFrame(pending);
    const id = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width;
      const y = (clientY - rect.top) / rect.height;
      el.style.setProperty("--tilt-x", `${((0.5 - y) * 20).toFixed(2)}deg`);
      el.style.setProperty("--tilt-y", `${((x - 0.5) * 20).toFixed(2)}deg`);
      el.style.setProperty("--glare-x", `${(x * 100).toFixed(1)}%`);
      el.style.setProperty("--glare-y", `${(y * 100).toFixed(1)}%`);
      el.dataset.tilting = "true";
    });
    pendingFrames.set(el, id);
  }

  function resetPhotoTilt(event: React.MouseEvent<HTMLElement>) {
    const el = event.currentTarget;
    const pending = pendingFrames.get(el);
    if (pending !== undefined) cancelAnimationFrame(pending);
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

  return (
    <>
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
                    <div className="photo-placeholder" aria-hidden="true" />
                    <Image
        src="/meghna-personal-1.jpg"
        alt="Meghna smiling"
        width={874}
        height={1100}
        sizes="(max-width: 800px) 85vw, 420px"
        priority
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
                      <div className="photo-placeholder" aria-hidden="true" />
                      <Image
        src="/meghna-personal-2.jpg"
        alt="A candid portrait of Meghna"
        width={825}
        height={1100}
        sizes="(max-width: 800px) 70vw, 300px"
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
                      <div className="photo-placeholder" aria-hidden="true" />
                      <Image
        src="/meghna-memory-1.jpg"
        alt="Favourite portrait of Meghna"
        width={1440}
        height={1440}
        sizes="(max-width: 800px) 80vw, 340px"
        onError={(event) => {
        event.currentTarget.style.display = "none";
      }}
      />
                      <figcaption>one for the memory box ♡</figcaption>
                    </figure>
                    <figure className="memory-photo memory-photo-wide" {...photoProps(3)}>
                      <span className="photo-tape" />
                      <div className="photo-placeholder" aria-hidden="true" />
                      <Image
        src="/meghna-memory-2.jpg"
        alt="A happy day in Meghna’s life"
        width={1100}
        height={1100}
        sizes="(max-width: 800px) 90vw, 560px"
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
                      <div className="photo-placeholder" aria-hidden="true" />
                      <Image
        src="/meghna-memory-3.jpg"
        alt="A candid moment with Meghna"
        width={1080}
        height={810}
        sizes="(max-width: 800px) 60vw, 300px"
        onError={(event) => {
        event.currentTarget.style.display = "none";
      }}
      />
                      <figcaption>the unplanned ones</figcaption>
                    </figure>
                  </div>
                </section>
              </section>
      {lightboxIndex !== null && (
        <Lightbox
          index={lightboxIndex}
          onChange={setLightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}
