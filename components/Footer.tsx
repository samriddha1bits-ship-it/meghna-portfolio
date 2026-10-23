"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { instagramUrl, linkedinUrl } from "@/data/content";

const subscribe = () => () => {};
const getYear = () => new Date().getFullYear();
// Prerendering can't read the clock, so the server snapshot is fixed; the
// browser swaps in the real year right after hydration.
const getServerYear = () => 2026;

export default function Footer() {
  const year = useSyncExternalStore(subscribe, getYear, getServerYear);

  return (
    <footer className="footer">
      <button
        className="wordmark footer-logo"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        Meghna Bose<span>.</span>
      </button>
      <nav className="footer-links" aria-label="Footer">
        <Link href="/">Portfolio</Link>
        <Link href="/personal">Personal scrapbook</Link>
        <a href={instagramUrl} target="_blank" rel="me noopener noreferrer">
          Instagram
        </a>
        <a href={linkedinUrl} target="_blank" rel="me noopener noreferrer">
          LinkedIn
        </a>
      </nav>
      <p>© {year} Meghna Bose</p>
    </footer>
  );
}
