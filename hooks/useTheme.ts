"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { Theme } from "@/data/content";

// The inline script in layout.tsx sets <html data-theme> before first paint.
// We treat that attribute as the single source of truth and subscribe to it,
// so React never has to copy it into state from an effect.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

function getSnapshot(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export function useTheme() {
  const theme = useSyncExternalStore<Theme>(subscribe, getSnapshot, () => "dark");

  const toggleTheme = useCallback(() => {
    const next: Theme = getSnapshot() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("meghna-theme", next);
    } catch {}
  }, []);

  return { theme, toggleTheme };
}
