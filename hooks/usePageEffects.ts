"use client";

import { useEffect, useState } from "react";

/** Highlights the nav link of whichever section is currently in view. */
export function useActiveSection(ids: string[], initial: string) {
  const [active, setActive] = useState(initial);
  const key = ids.join("|");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -65% 0px" }
    );
    key.split("|").forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [key]);

  return active;
}

const STAGGERED =
  ".section-heading, .section-count, .hero-copy > *, .portrait-wrap, .interest-card, .timeline-item, .review-card, .review-side, .about-grid > *, .book-art, .book-info > *";
const REVEALED = `.reveal, .reveal-stagger, .review-feature, ${STAGGERED}`;

/** Fades elements in (with a small stagger) as they scroll into view. */
export function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -36px 0px" }
    );

    document.querySelectorAll<HTMLElement>(REVEALED).forEach((el) => {
      if (el.matches(STAGGERED)) {
        el.classList.add("reveal-stagger");
        const index = Array.from(el.parentElement?.children ?? []).indexOf(el);
        el.style.setProperty("--reveal-delay", `${Math.max(0, index) * 85}ms`);
      }
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
}

/**
 * Pauses CSS animations on elements that are scrolled out of view
 * (see the [data-offscreen] rule in globals.css), saving battery on phones.
 */
export function usePauseOffscreen() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        (entry.target as HTMLElement).dataset.offscreen = String(!entry.isIntersecting);
      });
    });
    document
      .querySelectorAll(".ticker, .portrait-wrap, .book-art, .snowfall")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
