"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

export interface BookPageData {
  id: number;
  src: string;
  alt: string;
  title: string;
  subtitle?: string;
  pageNumber: number;
  caption?: string;
  washiColor?: string;
}

const BOOK_PAGES: BookPageData[] = [
  {
    id: 1,
    src: "/Personalbookimg/2.jpg",
    alt: "Meghna memory - Page 1",
    title: "Quiet Mornings",
    subtitle: "A moment paused in time",
    pageNumber: 1,
    caption: "The gentle light that starts the day.",
    washiColor: "washi-rose",
  },
  {
    id: 2,
    src: "/Personalbookimg/3.jpg",
    alt: "Meghna memory - Page 2",
    title: "In the Pages",
    subtitle: "Words that stay with you",
    pageNumber: 2,
    caption: "The day I turned nineteen.",
    washiColor: "washi-sage",
  },
  {
    id: 3,
    src: "/Personalbookimg/4.jpg",
    alt: "Meghna memory - Page 3",
    title: "Wanderer's Glance",
    subtitle: "Streets, skies & stories",
    pageNumber: 3,
    caption: "It's Diwali guys !!",
    washiColor: "washi-peach",
  },
  {
    id: 4,
    src: "/Personalbookimg/5.jpg",
    alt: "Meghna memory - Page 4",
    title: "Unplanned Joys",
    subtitle: "The sweetest memories",
    pageNumber: 4,
    caption: "Laughter caught completely by surprise.",
    washiColor: "washi-lavender",
  },
  {
    id: 5,
    src: "/Personalbookimg/6.jpg",
    alt: "Meghna memory - Page 5",
    title: "Golden Hour",
    subtitle: "Soft warmth & quiet thoughts",
    pageNumber: 5,
    caption: "When the sky turns into a watercolor painting.",
    washiColor: "washi-gold",
  },
  {
    id: 6,
    src: "/Personalbookimg/7.jpg",
    alt: "Meghna memory - Page 6",
    title: "Still Reflections",
    subtitle: "Grounded & grateful",
    pageNumber: 6,
    caption: "Taking a deep breath and letting the moment be.",
    washiColor: "washi-rose",
  },
  {
    id: 7,
    src: "/Personalbookimg/8.jpg",
    alt: "Meghna memory - Page 7",
    title: "Everyday Magic",
    subtitle: "Details worth noticing",
    pageNumber: 7,
    caption: "The little things that make the heart feel full.",
    washiColor: "washi-sage",
  },
  {
    id: 8,
    src: "/Personalbookimg/9.jpg",
    alt: "Meghna memory - Page 8",
    title: "Carrying The Light",
    subtitle: "Forward into tomorrow",
    pageNumber: 8,
    caption: "A keepsake for the days yet to be lived.",
    washiColor: "washi-peach",
  },
];

interface Spread {
  left: BookPageData | null;
  right: BookPageData | null;
  type: "cover" | "spread" | "end";
}

// Spreads definition:
// Spread 0: Cover (Left: Frontispiece 1.jpg, Right: Dedication & Title Plate)
// Spread 1: Pages 1 & 2 (2.jpg & 3.jpg)
// Spread 2: Pages 3 & 4 (4.jpg & 5.jpg)
// Spread 3: Pages 5 & 6 (6.jpg & 7.jpg)
// Spread 4: Pages 7 & 8 (8.jpg & 9.jpg)
// Spread 5: End (Inside Back Cover & Epilogue)
const SPREADS: Spread[] = [
  { left: null, right: null, type: "cover" },
  { left: BOOK_PAGES[0], right: BOOK_PAGES[1], type: "spread" },
  { left: BOOK_PAGES[2], right: BOOK_PAGES[3], type: "spread" },
  { left: BOOK_PAGES[4], right: BOOK_PAGES[5], type: "spread" },
  { left: BOOK_PAGES[6], right: BOOK_PAGES[7], type: "spread" },
  { left: null, right: null, type: "end" },
];

const pendingFrames = new WeakMap<HTMLElement, number>();

function handlePhotoTilt(event: React.MouseEvent<HTMLElement>) {
  const el = event.currentTarget;
  const { clientX, clientY } = event;
  const pending = pendingFrames.get(el);
  if (pending !== undefined) cancelAnimationFrame(pending);
  const id = requestAnimationFrame(() => {
    const rect = el.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width;
    const y = (clientY - rect.top) / rect.height;
    el.style.setProperty("--tilt-x", `${((0.5 - y) * 18).toFixed(2)}deg`);
    el.style.setProperty("--tilt-y", `${((x - 0.5) * 18).toFixed(2)}deg`);
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

export default function PersonalFlipbook() {
  const [currentSpread, setCurrentSpread] = useState(0);
  const [animatingDir, setAnimatingDir] = useState<"forward" | "backward" | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isMobileSingle, setIsMobileSingle] = useState(false);
  const [singlePageIndex, setSinglePageIndex] = useState(0); // 0 to 9 (0: Cover, 1-8: Pages, 9: End)
  const [zoomImage, setZoomImage] = useState<BookPageData | { src: string; alt: string; title: string; caption?: string } | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);

  const totalSpreads = SPREADS.length;
  const isAnimating = animatingDir !== null;
  const bookContainerRef = useRef<HTMLDivElement>(null);

  // Auto-detect mobile screen width on mount & resize
  useEffect(() => {
    function checkMobile() {
      if (window.innerWidth < 768) {
        setIsMobileSingle(true);
      } else {
        setIsMobileSingle(false);
      }
    }
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Preload sound files for instant zero-latency playback on mobile and desktop
  useEffect(() => {
    if (typeof window !== "undefined") {
      const a1 = new Audio("/sounds/turning-page-of-book-tomas-herudek-1-00-03.mp3");
      const a2 = new Audio("/sounds/book-shut-epic-stock-media-1-00-00.mp3");
      a1.preload = "auto";
      a2.preload = "auto";
    }
  }, []);

  // Sync single page index with double spread index when switching modes
  const handleToggleViewMode = () => {
    if (!isMobileSingle) {
      if (currentSpread === 0) setSinglePageIndex(0);
      else if (currentSpread === totalSpreads - 1) setSinglePageIndex(9);
      else setSinglePageIndex((currentSpread - 1) * 2 + 1);
      setIsMobileSingle(true);
    } else {
      if (singlePageIndex === 0) setCurrentSpread(0);
      else if (singlePageIndex >= 9) setCurrentSpread(totalSpreads - 1);
      else setCurrentSpread(Math.floor((singlePageIndex - 1) / 2) + 1);
      setIsMobileSingle(false);
    }
  };

  // Play page flipping sound using newly added audio file
  const playFlipSound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const audio = new Audio("/sounds/turning-page-of-book-tomas-herudek-1-00-03.mp3");
      audio.volume = 0.55;
      const p = audio.play();
      if (p !== undefined) p.catch(() => { });
    } catch { }
  }, [soundEnabled]);

  // Play book closing / shut sound using newly added audio file
  const playShutSound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const audio = new Audio("/sounds/book-shut-epic-stock-media-1-00-00.mp3");
      audio.volume = 0.65;
      const p = audio.play();
      if (p !== undefined) p.catch(() => { });
    } catch { }
  }, [soundEnabled]);

  const flipForward = useCallback(() => {
    if (isMobileSingle) {
      if (singlePageIndex < 9) {
        if (singlePageIndex === 8) {
          playShutSound();
        } else {
          playFlipSound();
        }
        setSinglePageIndex((prev) => prev + 1);
      }
      return;
    }

    if (isAnimating || currentSpread >= totalSpreads - 1) return;
    if (currentSpread === totalSpreads - 2) {
      playShutSound();
    } else {
      playFlipSound();
    }
    setAnimatingDir("forward");
    window.setTimeout(() => {
      setCurrentSpread((prev) => prev + 1);
      setAnimatingDir(null);
    }, 600);
  }, [isMobileSingle, singlePageIndex, isAnimating, currentSpread, totalSpreads, playFlipSound, playShutSound]);

  const flipBackward = useCallback(() => {
    if (isMobileSingle) {
      if (singlePageIndex > 0) {
        if (singlePageIndex === 1) {
          playShutSound();
        } else {
          playFlipSound();
        }
        setSinglePageIndex((prev) => prev - 1);
      }
      return;
    }

    if (isAnimating || currentSpread <= 0) return;
    if (currentSpread === 1) {
      playShutSound();
    } else {
      playFlipSound();
    }
    setAnimatingDir("backward");
    window.setTimeout(() => {
      setCurrentSpread((prev) => prev - 1);
      setAnimatingDir(null);
    }, 600);
  }, [isMobileSingle, singlePageIndex, isAnimating, currentSpread, playFlipSound, playShutSound]);

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        flipForward();
      } else if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        flipBackward();
      } else if (e.key === "Home") {
        if (isMobileSingle) setSinglePageIndex(0);
        else setCurrentSpread(0);
      } else if (e.key === "End") {
        if (isMobileSingle) setSinglePageIndex(9);
        else setCurrentSpread(totalSpreads - 1);
      } else if (e.key === "Escape" && zoomImage) {
        setZoomImage(null);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [flipForward, flipBackward, isMobileSingle, totalSpreads, zoomImage]);

  // Touch Swipe Handlers optimized for mobile devices
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null || touchStartY === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;

    // Only flip if swipe is predominantly horizontal to avoid interfering with vertical page scrolling
    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY) * 1.3) {
      if (diffX > 0) flipForward();
      else flipBackward();
    }
    setTouchStartX(null);
    setTouchStartY(null);
  };

  // Active double spread
  const activeSpread = SPREADS[currentSpread];
  const nextSpread = currentSpread < totalSpreads - 1 ? SPREADS[currentSpread + 1] : null;
  const prevSpread = currentSpread > 0 ? SPREADS[currentSpread - 1] : null;

  // ---------------------------------------------------------------------------
  // RENDER HELPERS FOR SPREAD PAGES
  // ---------------------------------------------------------------------------

  // Left Page: Frontispiece (Spread 0)
  const renderCoverLeft = () => (
    <div className="book-page-inner cover-frontispiece-inner">
      <div className="page-top-bar">
        <span className="folio-num">FOLIO № 00 • FRONTISPIECE</span>
        <button
          type="button"
          className="zoom-pill"
          onClick={(e) => {
            e.stopPropagation();
            setZoomImage({
              src: "/Personalbookimg/1.jpg",
              alt: "Meghna cover portrait with dog",
              title: "Where The Story Begins",
              caption: "A warm companion, a quiet smile, and life's sweetest moments ♡",
            });
          }}
          aria-label="Zoom in on cover photo"
        >
          🔍
        </button>
      </div>

      <div
        className="page-art-box cover-art-mat"
        onMouseMove={handlePhotoTilt}
        onMouseLeave={resetPhotoTilt}
        onClick={(e) => {
          e.stopPropagation();
          setZoomImage({
            src: "/Personalbookimg/1.jpg",
            alt: "Meghna cover portrait with dog",
            title: "Where The Story Begins",
            caption: "A warm companion, a quiet smile, and life's sweetest moments ♡",
          });
        }}
      >
        <span className="washi-strip washi-gold" aria-hidden="true" />
        <span className="photo-corner-tab corner-tl" aria-hidden="true" />
        <span className="photo-corner-tab corner-tr" aria-hidden="true" />
        <span className="photo-corner-tab corner-bl" aria-hidden="true" />
        <span className="photo-corner-tab corner-br" aria-hidden="true" />
        <Image
          src="/Personalbookimg/1.jpg"
          alt="Meghna cover portrait with dog"
          width={680}
          height={680}
          priority
          className="page-photo"
          sizes="(max-width: 1200px) 40vw, 480px"
        />
      </div>

      <div className="page-bottom-meta">
        <h4 className="page-meta-title">Where The Story Begins</h4>
        <p className="page-meta-caption">A warm companion, a gentle smile, and life&apos;s sweetest days ♡</p>
        <span className="page-num">— FRONTISPIECE —</span>
      </div>
    </div>
  );

  // Right Page: Dedication Plate (Spread 0)
  const renderCoverRight = () => (
    <div className="book-page-inner cover-dedication-inner">
      <div className="cover-bookplate">
        <span className="book-corner corner-tl" aria-hidden="true" />
        <span className="book-corner corner-tr" aria-hidden="true" />
        <span className="book-corner corner-bl" aria-hidden="true" />
        <span className="book-corner corner-br" aria-hidden="true" />

        <div className="bookplate-badge">
          <span>✦ A VISUAL ARCHIVE ✦</span>
        </div>

        <div className="bookplate-headings">
          <h3 className="bookplate-title">My Gallery</h3>
          <p className="bookplate-subtitle">Moments, musings &amp; memories ♡</p>
          <div className="bookplate-divider">✦ ─── ✳ ─── ✦</div>
        </div>

        <p className="bookplate-inscription">
          “Photographs are little bookmarks in time — holding onto the sunlight of unhurried mornings, laughter caught unaware, and the stories lived between the lines.”
        </p>

        <div className="bookplate-sign">with love, Meghna ♡</div>

        <button
          type="button"
          className="bookplate-open-btn"
          onClick={(e) => {
            e.stopPropagation();
            flipForward();
          }}
        >
          <span>Open Scrapbook</span>
          <span className="btn-arrow">→</span>
        </button>
      </div>
    </div>
  );

  // Normal Inside Page (Spreads 1 to 4)
  const renderPageInner = (page: BookPageData) => (
    <div className="book-page-inner">
      <div className="page-top-bar">
        <span className="folio-num">FOLIO № 0{page.pageNumber}</span>
        <button
          type="button"
          className="zoom-pill"
          onClick={(e) => {
            e.stopPropagation();
            setZoomImage(page);
          }}
          aria-label={`Zoom in on ${page.title}`}
        >
          🔍
        </button>
      </div>

      <div
        className="page-art-box"
        onMouseMove={handlePhotoTilt}
        onMouseLeave={resetPhotoTilt}
        onClick={(e) => {
          e.stopPropagation();
          setZoomImage(page);
        }}
      >
        <span className={`washi-strip ${page.washiColor || "washi-rose"}`} aria-hidden="true" />
        <span className="photo-corner-tab corner-tl" aria-hidden="true" />
        <span className="photo-corner-tab corner-tr" aria-hidden="true" />
        <span className="photo-corner-tab corner-bl" aria-hidden="true" />
        <span className="photo-corner-tab corner-br" aria-hidden="true" />
        <Image
          src={page.src}
          alt={page.alt}
          width={640}
          height={640}
          className="page-photo"
          sizes="(max-width: 1200px) 40vw, 480px"
        />
      </div>

      <div className="page-bottom-meta">
        <h4 className="page-meta-title">{page.title}</h4>
        <p className="page-meta-caption">{page.caption}</p>
        <span className="page-num">— {page.pageNumber} —</span>
      </div>
    </div>
  );

  // End Spread Left (Spread 5)
  const renderEndLeft = () => (
    <div className="book-page-inner end-page-left">
      <span className="end-symbol">✦</span>
      <h3>Carrying The Memories</h3>
      <p>
        “Some moments are made to be kept safe between pages — reminding us that ordinary days are often the most extraordinary.”
      </p>
      <span className="end-signature">Meghna ♡</span>
    </div>
  );

  // End Spread Right (Spread 5)
  const renderEndRight = () => (
    <div className="book-page-inner end-page-right">
      <div className="back-cover-emboss">
        <span className="back-crest">✳</span>
        <h4>To Be Continued...</h4>
        <p>More stories waiting to be lived &amp; written.</p>
        <button
          type="button"
          className="read-again-btn"
          onClick={() => {
            playShutSound();
            setCurrentSpread(0);
          }}
        >
          ↺ Return to Cover
        </button>
      </div>
    </div>
  );

  // ---------------------------------------------------------------------------
  // SINGLE PAGE CONTENT (MOBILE / TOGGLED)
  // ---------------------------------------------------------------------------
  const renderSinglePageContent = () => {
    if (singlePageIndex === 0) {
      return (
        <div className="single-page cover-single-page" onClick={flipForward}>
          <div className="cover-bookplate">
            <span className="book-corner corner-tl" aria-hidden="true" />
            <span className="book-corner corner-tr" aria-hidden="true" />
            <span className="book-corner corner-bl" aria-hidden="true" />
            <span className="book-corner corner-br" aria-hidden="true" />

            <div className="bookplate-badge">
              <span>✦ A VISUAL ARCHIVE ✦</span>
            </div>

            <div
              className="page-art-box cover-single-art"
              onMouseMove={handlePhotoTilt}
              onMouseLeave={resetPhotoTilt}
              onClick={(e) => {
                e.stopPropagation();
                setZoomImage({
                  src: "/Personalbookimg/1.jpg",
                  alt: "Meghna cover portrait with dog",
                  title: "Where The Story Begins",
                  caption: "A warm companion, a quiet smile, and life's sweetest moments ♡",
                });
              }}
            >
              <span className="washi-strip washi-gold" aria-hidden="true" />
              <Image
                src="/Personalbookimg/1.jpg"
                alt="Cover photo"
                width={800}
                height={800}
                priority
                className="page-photo"
              />
            </div>

            <div className="bookplate-headings">
              <h3 className="bookplate-title">My Gallery</h3>
              <p className="bookplate-subtitle">Moments, musings &amp; memories ♡</p>
            </div>

            <button
              type="button"
              className="bookplate-open-btn"
              onClick={(e) => {
                e.stopPropagation();
                flipForward();
              }}
            >
              <span>Tap to Open Book</span>
              <span className="btn-arrow">→</span>
            </button>
          </div>
        </div>
      );
    }

    if (singlePageIndex === 9) {
      return (
        <div className="single-page end-single-page">
          <div className="book-end-inner">
            <span className="end-sparkle">✦</span>
            <h3>The End of This Chapter</h3>
            <p className="end-quote">
              “Every picture holds a feeling words could never quite describe, and every story carries a heartbeat worth saving.”
            </p>
            <p className="end-signoff">collected with love ♡</p>
            <button
              type="button"
              className="end-restart-btn"
              onClick={() => {
                playShutSound();
                setSinglePageIndex(0);
              }}
            >
              <span>↺ Read From Beginning</span>
            </button>
          </div>
        </div>
      );
    }

    const pageData = BOOK_PAGES[singlePageIndex - 1];
    return (
      <div className="single-page normal-single-page">
        <div className="book-page-plate">
          <div className="page-header-row">
            <span className="page-folio">FOLIO № {pageData.pageNumber}</span>
            <button
              type="button"
              className="page-zoom-btn"
              aria-label={`Zoom in on ${pageData.title}`}
              onClick={(e) => {
                e.stopPropagation();
                setZoomImage(pageData);
              }}
            >
              🔍 Zoom
            </button>
          </div>

          <div
            className="page-image-holder"
            onMouseMove={handlePhotoTilt}
            onMouseLeave={resetPhotoTilt}
            onClick={() => setZoomImage(pageData)}
            role="button"
            tabIndex={0}
            aria-label={`View photo ${pageData.title} full size`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setZoomImage(pageData);
            }}
          >
            <span className={`washi-strip ${pageData.washiColor || "washi-rose"}`} aria-hidden="true" />
            <span className="photo-corner-tab corner-tl" aria-hidden="true" />
            <span className="photo-corner-tab corner-tr" aria-hidden="true" />
            <span className="photo-corner-tab corner-bl" aria-hidden="true" />
            <span className="photo-corner-tab corner-br" aria-hidden="true" />
            <Image
              src={pageData.src}
              alt={pageData.alt}
              width={720}
              height={720}
              className="page-actual-img"
              sizes="(max-width: 768px) 85vw, 420px"
            />
          </div>

          <div className="page-caption-block">
            <h4 className="page-title">{pageData.title}</h4>
            <p className="page-desc">{pageData.caption}</p>
            <span className="page-number-tag">— Page {pageData.pageNumber} of 8 —</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="flipbook-wrapper"
      ref={bookContainerRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-label="Meghna's Personal Double Page Flipbook"
    >
      {/* Flipbook Header / Controls Toolbar */}
      <div className="flipbook-toolbar">
        <div className="flipbook-status">
          <span className="status-dot" aria-hidden="true" />
          <span className="status-title">MY GALLERY</span>
          <span className="status-sep">•</span>
          <span className="status-text">
            {isMobileSingle ? (
              singlePageIndex === 0 ? (
                "Cover"
              ) : singlePageIndex === 9 ? (
                "Inside Back Cover"
              ) : (
                `Page ${singlePageIndex} of 8`
              )
            ) : currentSpread === 0 ? (
              "Cover Spread"
            ) : currentSpread === totalSpreads - 1 ? (
              "Inside Back Cover"
            ) : (
              `Spread ${currentSpread} of 4 (Pages ${(currentSpread - 1) * 2 + 1} & ${(currentSpread - 1) * 2 + 2})`
            )}
          </span>
        </div>

        <div className="flipbook-actions">
          {/* Sound Toggle */}
          <button
            type="button"
            className="toolbar-btn"
            onClick={() => setSoundEnabled(!soundEnabled)}
            aria-label={soundEnabled ? "Mute flip sound" : "Enable flip sound"}
            title={soundEnabled ? "Sound on" : "Sound muted"}
          >
            {soundEnabled ? "🔊 Sound On" : "🔇 Sound Off"}
          </button>

          {/* View Mode Toggle */}
          <button
            type="button"
            className="toolbar-btn"
            onClick={handleToggleViewMode}
            aria-label={isMobileSingle ? "Switch to Double Spread view" : "Switch to Single Page view"}
            title="Toggle book layout"
          >
            {isMobileSingle ? "📖 Double Spread" : "📄 Single Page"}
          </button>
        </div>
      </div>

      {/* Main Flipbook Stage */}
      <div className="flipbook-stage">
        {isMobileSingle ? (
          /* Single Page Stage with Side Arrows */
          <div className="single-page-stage">
            <button
              type="button"
              className="book-side-nav nav-prev"
              onClick={flipBackward}
              disabled={singlePageIndex === 0}
              aria-label="Previous Page"
              title="Previous Page (Left Arrow)"
            >
              <span className="nav-chevron">‹</span>
            </button>

            <div className="single-page-viewport">
              {renderSinglePageContent()}

              {/* Mobile Nav Arrows Bar */}
              <div className="single-nav-bar">
                <button
                  type="button"
                  className="nav-arrow nav-arrow-left"
                  onClick={flipBackward}
                  disabled={singlePageIndex === 0}
                  aria-label="Previous Page"
                >
                  ◀ Prev
                </button>
                <span className="nav-page-count">
                  {singlePageIndex === 0
                    ? "Cover"
                    : singlePageIndex === 9
                      ? "End"
                      : `Page ${singlePageIndex} of 8`}
                </span>
                <button
                  type="button"
                  className="nav-arrow nav-arrow-right"
                  onClick={flipForward}
                  disabled={singlePageIndex === 9}
                  aria-label="Next Page"
                >
                  Next ▶
                </button>
              </div>
            </div>

            <button
              type="button"
              className="book-side-nav nav-next"
              onClick={flipForward}
              disabled={singlePageIndex === 9}
              aria-label="Next Page"
              title="Next Page (Right Arrow)"
            >
              <span className="nav-chevron">›</span>
            </button>
          </div>
        ) : (
          /* Double Page Spread 3D Mode */
          <div className="double-page-stage">
            {/* Left Nav Button */}
            <button
              type="button"
              className="book-side-nav nav-prev"
              onClick={flipBackward}
              disabled={currentSpread === 0 || isAnimating}
              aria-label="Turn to previous spread"
              title="Previous pages (Left Arrow)"
            >
              <span className="nav-chevron">‹</span>
            </button>

            {/* The 3D Book Container */}
            <div className="book-3d is-open">
              {/* Stacked Paper Block Shadow / Thickness */}
              <div className="book-binding-shadow" aria-hidden="true" />
              <div className="book-page-edges-left" aria-hidden="true" />
              <div className="book-page-edges-right" aria-hidden="true" />
              <div className="book-center-spine" aria-hidden="true" />
              <div className="book-ribbon-marker" aria-hidden="true" />

              {/* COVER SPREAD (Spread 0) */}
              {currentSpread === 0 && !isAnimating && (
                <div className="book-open-spread cover-spread-spread">
                  <div
                    className="book-page page-left"
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      setZoomImage({
                        src: "/Personalbookimg/1.jpg",
                        alt: "Meghna cover portrait with dog",
                        title: "Where The Story Begins",
                        caption: "A warm companion, a quiet smile, and life's sweetest moments ♡",
                      });
                    }}
                    title="Click portrait to zoom"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        setZoomImage({
                          src: "/Personalbookimg/1.jpg",
                          alt: "Meghna cover portrait with dog",
                          title: "Where The Story Begins",
                          caption: "A warm companion, a quiet smile, and life's sweetest moments ♡",
                        });
                      }
                    }}
                  >
                    <div className="book-gutter-shadow gutter-left" aria-hidden="true" />
                    {renderCoverLeft()}
                    <span className="curl-hint curl-left" aria-hidden="true" />
                  </div>

                  <div
                    className="book-page page-right"
                    role="button"
                    tabIndex={0}
                    onClick={flipForward}
                    title="Click right page to turn to Page 1"
                    aria-label="Open album to Page 1"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") flipForward();
                    }}
                  >
                    <div className="book-gutter-shadow gutter-right" aria-hidden="true" />
                    {renderCoverRight()}
                    <span className="curl-hint curl-right" aria-hidden="true" />
                  </div>
                </div>
              )}

              {/* END SPREAD (Spread 5) */}
              {currentSpread === totalSpreads - 1 && !isAnimating && (
                <div className="book-end-spread">
                  <div className="book-page page-left">
                    <div className="book-gutter-shadow gutter-left" aria-hidden="true" />
                    {renderEndLeft()}
                    <span className="curl-hint curl-left" aria-hidden="true" />
                  </div>
                  <div className="book-page page-right">
                    <div className="book-gutter-shadow gutter-right" aria-hidden="true" />
                    {renderEndRight()}
                    <span className="curl-hint curl-right" aria-hidden="true" />
                  </div>
                </div>
              )}

              {/* ACTIVE STATIC SPREAD (Spreads 1, 2, 3, 4) */}
              {activeSpread.type === "spread" && !isAnimating && (
                <div className="book-open-spread">
                  {/* Left Page */}
                  <div
                    className="book-page page-left"
                    onClick={flipBackward}
                    role="button"
                    tabIndex={0}
                    title="Click left page to flip back"
                    aria-label={`Page ${activeSpread.left?.pageNumber}: ${activeSpread.left?.title}. Click to turn back.`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") flipBackward();
                    }}
                  >
                    <div className="book-gutter-shadow gutter-left" aria-hidden="true" />
                    {activeSpread.left && renderPageInner(activeSpread.left)}
                    <span className="curl-hint curl-left" aria-hidden="true" />
                  </div>

                  {/* Right Page */}
                  <div
                    className="book-page page-right"
                    onClick={flipForward}
                    role="button"
                    tabIndex={0}
                    title="Click right page to flip forward"
                    aria-label={`Page ${activeSpread.right?.pageNumber}: ${activeSpread.right?.title}. Click to turn forward.`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") flipForward();
                    }}
                  >
                    <div className="book-gutter-shadow gutter-right" aria-hidden="true" />
                    {activeSpread.right && renderPageInner(activeSpread.right)}
                    <span className="curl-hint curl-right" aria-hidden="true" />
                  </div>
                </div>
              )}

              {/* 3D TURNING ANIMATION LEAF (FORWARD) */}
              {isAnimating && animatingDir === "forward" && nextSpread && (
                <div className="book-turning-stage forward-flip">
                  {/* Underneath Left: current left page (or cover frontispiece) */}
                  <div className="book-page page-left under-left">
                    {currentSpread === 0
                      ? renderCoverLeft()
                      : activeSpread.left
                        ? renderPageInner(activeSpread.left)
                        : null}
                  </div>

                  {/* Underneath Right: upcoming right page */}
                  <div className="book-page page-right under-right">
                    {nextSpread.right
                      ? renderPageInner(nextSpread.right)
                      : renderEndRight()}
                  </div>

                  {/* The Flipping Leaf */}
                  <div className="flipping-leaf flip-forward-anim">
                    {/* Front Face: current right page turning away to left */}
                    <div className="leaf-face leaf-front">
                      {currentSpread === 0
                        ? renderCoverRight()
                        : activeSpread.right
                          ? renderPageInner(activeSpread.right)
                          : null}
                      <div className="leaf-shadow-overlay" />
                    </div>

                    {/* Back Face: upcoming left page landing on left */}
                    <div className="leaf-face leaf-back">
                      {nextSpread.left
                        ? renderPageInner(nextSpread.left)
                        : renderEndLeft()}
                      <div className="leaf-shadow-overlay" />
                    </div>
                  </div>
                </div>
              )}

              {/* 3D TURNING ANIMATION LEAF (BACKWARD) */}
              {isAnimating && animatingDir === "backward" && prevSpread && (
                <div className="book-turning-stage backward-flip">
                  {/* Underneath Left: upcoming target left page */}
                  <div className="book-page page-left under-left">
                    {prevSpread.type === "cover"
                      ? renderCoverLeft()
                      : prevSpread.left
                        ? renderPageInner(prevSpread.left)
                        : null}
                  </div>

                  {/* Underneath Right: current right page */}
                  <div className="book-page page-right under-right">
                    {currentSpread === totalSpreads - 1
                      ? renderEndRight()
                      : activeSpread.right
                        ? renderPageInner(activeSpread.right)
                        : null}
                  </div>

                  {/* The Flipping Leaf rotating from Left to Right */}
                  <div className="flipping-leaf flip-backward-anim">
                    {/* Front Face: current left page turning to right */}
                    <div className="leaf-face leaf-front">
                      {currentSpread === totalSpreads - 1
                        ? renderEndLeft()
                        : activeSpread.left
                          ? renderPageInner(activeSpread.left)
                          : null}
                      <div className="leaf-shadow-overlay" />
                    </div>

                    {/* Back Face: upcoming right page landing on right */}
                    <div className="leaf-face leaf-back">
                      {prevSpread.type === "cover"
                        ? renderCoverRight()
                        : prevSpread.right
                          ? renderPageInner(prevSpread.right)
                          : null}
                      <div className="leaf-shadow-overlay" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Nav Button */}
            <button
              type="button"
              className="book-side-nav nav-next"
              onClick={flipForward}
              disabled={currentSpread === totalSpreads - 1 || isAnimating}
              aria-label="Turn to next spread"
              title="Next pages (Right Arrow)"
            >
              <span className="nav-chevron">›</span>
            </button>
          </div>
        )}
      </div>

      {/* Spread Navigation Indicators Bar */}
      <div className="flipbook-navigation-bar">
        <button
          type="button"
          className="nav-step-btn"
          onClick={() => {
            playShutSound();
            if (isMobileSingle) setSinglePageIndex(0);
            else setCurrentSpread(0);
          }}
          disabled={isMobileSingle ? singlePageIndex === 0 : currentSpread === 0}
          aria-label="Jump to Cover"
        >
          ⏮ Cover
        </button>

        <div className="spread-dots-list" role="tablist" aria-label="Book spreads">
          {SPREADS.map((sp, idx) => {
            const isActive = !isMobileSingle && currentSpread === idx;
            const label =
              idx === 0
                ? "Cover"
                : idx === totalSpreads - 1
                  ? "Epilogue"
                  : `Pages ${(idx - 1) * 2 + 1}–${(idx - 1) * 2 + 2}`;

            return (
              <button
                key={idx}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`spread-dot ${isActive ? "is-active" : ""}`}
                onClick={() => {
                  if (idx === 0 || idx === totalSpreads - 1) {
                    playShutSound();
                  } else {
                    playFlipSound();
                  }

                  if (isMobileSingle) {
                    if (idx === 0) setSinglePageIndex(0);
                    else if (idx === totalSpreads - 1) setSinglePageIndex(9);
                    else setSinglePageIndex((idx - 1) * 2 + 1);
                  } else {
                    if (currentSpread !== idx) {
                      setCurrentSpread(idx);
                    }
                  }
                }}
              >
                <span className="dot-bullet" />
                <span className="dot-label">{label}</span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          className="nav-step-btn"
          onClick={() => {
            playShutSound();
            if (isMobileSingle) setSinglePageIndex(9);
            else setCurrentSpread(totalSpreads - 1);
          }}
          disabled={isMobileSingle ? singlePageIndex === 9 : currentSpread === totalSpreads - 1}
          aria-label="Jump to End"
        >
          End ⏭
        </button>
      </div>

      {/* Lightbox / High-Res Zoom Modal */}
      {zoomImage && (
        <div
          className="book-zoom-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Zoomed Photo"
          onClick={() => setZoomImage(null)}
        >
          <div className="book-zoom-card" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="book-zoom-close"
              onClick={() => setZoomImage(null)}
              aria-label="Close zoomed view"
            >
              ✕
            </button>
            <div className="book-zoom-img-frame">
              <Image
                src={zoomImage.src}
                alt={zoomImage.alt}
                width={1200}
                height={1200}
                className="book-zoom-img"
              />
            </div>
            <div className="book-zoom-info">
              <h4>{zoomImage.title}</h4>
              {"caption" in zoomImage && zoomImage.caption && <p>{zoomImage.caption}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
