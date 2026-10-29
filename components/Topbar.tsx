"use client";

import { useEffect, useRef } from "react";
import type { Mode, Theme } from "@/data/content";

type Props = {
  theme: Theme;
  mode: Mode;
  sections: { id: string; label: string }[];
  activeSection: string;
  onNavigate: (id: string) => void;
  onToggleTheme: () => void;
  onOpenPalette: () => void;
  onSwitchMode: (mode: Mode) => void;
};

export default function Topbar({
  theme,
  mode,
  sections,
  activeSection,
  onNavigate,
  onToggleTheme,
  onOpenPalette,
  onSwitchMode,
}: Props) {
  const mobileNavRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = mobileNavRef.current;
    const activeChip = nav?.querySelector<HTMLElement>(".chip.active");
    if (!nav || !activeChip) return;

    const navRect = nav.getBoundingClientRect();
    const chipRect = activeChip.getBoundingClientRect();
    const left = nav.scrollLeft + chipRect.left - navRect.left - (nav.clientWidth - chipRect.width) / 2;
    nav.scrollTo({
      left,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  }, [activeSection]);

  return (
    <>
    <header className="topbar">
      <button
        className="wordmark"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        Meghna Bose<span>.</span>
      </button>

      <nav className="desktop-nav" aria-label="Primary Navigation">
        {sections.map((section) => (
          <button
            key={section.id}
            className={activeSection === section.id ? "nav-link active" : "nav-link"}
            onClick={() => onNavigate(section.id)}
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
          onClick={() => onOpenPalette()}
        >
          <span className="cmd-icon">⌘</span>
          <span className="cmd-shortcut">K</span>
        </button>
        <button
          className="icon-button theme-toggle"
          aria-label="Toggle color theme"
          title="Switch theme"
          onClick={onToggleTheme}
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
          onClick={() => onSwitchMode("work")}
        >
          <span className="mode-dot" /> Work
        </button>
        <button
          role="tab"
          aria-selected={mode === "personal"}
          className={mode === "personal" ? "mode-option selected" : "mode-option"}
          onClick={() => onSwitchMode("personal")}
        >
          <span className="mode-dot" /> Personal
        </button>
      </div>
    </div>

    <nav ref={mobileNavRef} className="mobile-nav" aria-label="Sections">
      {sections.map((section) => (
        <button
          key={section.id}
          className={activeSection === section.id ? "chip active" : "chip"}
          aria-current={activeSection === section.id ? "location" : undefined}
          onClick={() => onNavigate(section.id)}
        >
          {section.label}
        </button>
      ))}
    </nav>
    </>
  );
}
