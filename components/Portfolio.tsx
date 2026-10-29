"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import CommandPalette from "@/components/CommandPalette";
import Footer from "@/components/Footer";
import Snowfall from "@/components/Snowfall";
import Topbar from "@/components/Topbar";
import CursorGlow from "@/components/effects/CursorGlow";
import ScrollProgress from "@/components/effects/ScrollProgress";
import {
  amazonUrl,
  bookUrl,
  email,
  instagramUrl,
  linkedinUrl,
  personalSections,
  workSections,
  type Mode,
} from "@/data/content";
import { buildCommands } from "@/data/commands";
import { useTheme } from "@/hooks/useTheme";
import { useActiveSection, usePauseOffscreen, useReveal } from "@/hooks/usePageEffects";
import { playThemeSound } from "@/lib/themeSound";

export type { Mode };

const externalLinks: Record<string, string> = {
  play: bookUrl,
  amazon: amazonUrl,
  instagram: instagramUrl,
  linkedin: linkedinUrl,
};

/**
 * The interactive shell: top bar, theme, command palette and page effects.
 * The page content itself is passed in as `children` so it can stay
 * server-rendered.
 */
export default function Portfolio({
  mode,
  children,
}: {
  mode: Mode;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const sections = mode === "work" ? workSections : personalSections;
  const activeSection = useActiveSection(
    sections.map((section) => section.id),
    sections[0].id
  );
  const commands = useMemo(() => buildCommands(mode, theme), [mode, theme]);

  useReveal();
  usePauseOffscreen();

  // Warm up the other page so switching modes feels instant.
  useEffect(() => {
    router.prefetch(mode === "work" ? "/personal" : "/");
  }, [mode, router]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setMenuOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const closePalette = useCallback(() => setMenuOpen(false), []);

  function handleToggleTheme() {
    playThemeSound();
    toggleTheme();
  }

  function switchMode(next: Mode) {
    router.push(next === "personal" ? "/personal" : "/");
  }

  function scrollTo(id: string) {
    setMenuOpen(false);
    const targetMode: Mode = id.startsWith("personal-") ? "personal" : "work";
    if (mode !== targetMode) {
      router.push(`${targetMode === "personal" ? "/personal" : "/"}#${id}`);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  function runCommand(action: string) {
    setMenuOpen(false);
    if (action === "personal" || action === "work") return switchMode(action);
    if (action === "theme") return handleToggleTheme();
    if (action === "copy-email") {
      void navigator.clipboard?.writeText(email);
      return;
    }
    if (action === "copy-quote") {
      void navigator.clipboard?.writeText(
        "“And the beauty of solitude, that lets my heart win.” — Meghna Bose"
      );
      return;
    }
    if (action in externalLinks) {
      window.open(externalLinks[action], "_blank", "noopener,noreferrer");
      return;
    }
    scrollTo(action);
  }

  return (
    <main className="site">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <ScrollProgress />
      <CursorGlow />
      <div className="ambient-noise" aria-hidden="true" />
      {theme === "dark" && mode === "personal" && <Snowfall />}

      <Topbar
        theme={theme}
        mode={mode}
        sections={sections}
        activeSection={activeSection}
        onNavigate={scrollTo}
        onToggleTheme={handleToggleTheme}
        onOpenPalette={() => setMenuOpen(true)}
        onSwitchMode={switchMode}
      />

      <div id="main-content" tabIndex={-1}>
        {children}
      </div>

      <Footer />

      {menuOpen && (
        <CommandPalette commands={commands} onRun={runCommand} onClose={closePalette} />
      )}
    </main>
  );
}
