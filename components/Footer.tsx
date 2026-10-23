"use client";

import { useSyncExternalStore } from "react";

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
      <p>© {year} Meghna Bose</p>
    </footer>
  );
}
