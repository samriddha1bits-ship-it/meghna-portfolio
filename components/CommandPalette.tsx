"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Command } from "@/data/commands";

type Props = {
  commands: Command[];
  onRun: (action: string) => void;
  onClose: () => void;
};

export default function CommandPalette({ commands, onRun, onClose }: Props) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return commands.filter((c) => `${c.label} ${c.detail}`.toLowerCase().includes(q));
  }, [commands, query]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-cmd-index="${selected}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [selected]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelected((prev) => (filtered.length ? (prev + 1) % filtered.length : 0));
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelected((prev) => (filtered.length ? (prev - 1 + filtered.length) % filtered.length : 0));
      } else if (event.key === "Enter" && filtered[selected]) {
        event.preventDefault();
        onRun(filtered[selected].action);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [filtered, selected, onRun, onClose]);

  return (
    <div
      className="command-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="command-dialog" role="dialog" aria-modal="true" aria-label="Command Menu">
        <div className="command-input-row">
          <span className="command-search-icon" aria-hidden="true">⌕</span>
          <input
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelected(0);
            }}
            placeholder="Where would you like to go?"
            aria-label="Search commands"
          />
          <button className="esc-button" onClick={onClose}>
            ESC
          </button>
        </div>
        <p className="command-label">QUICK NAVIGATION</p>
        <div className="command-list" ref={listRef} role="listbox" aria-label="Commands">
          {filtered.map((item, idx) => (
            <button
              data-cmd-index={idx}
              className={`command-item ${idx === selected ? "active" : ""}`}
              key={item.action}
              role="option"
              aria-selected={idx === selected}
              onMouseEnter={() => setSelected(idx)}
              onClick={() => onRun(item.action)}
            >
              <span className="command-item-icon" aria-hidden="true">↗</span>
              <span className="command-item-text">
                <strong>{item.label}</strong>
                <small>{item.detail}</small>
              </span>
              <span className="command-enter" aria-hidden="true">↵</span>
            </button>
          ))}
          {filtered.length === 0 && <p className="no-commands">No matching commands found.</p>}
        </div>
        <div className="command-footer">
          Navigate <kbd>↑</kbd> <kbd>↓</kbd> · Select <kbd>↵</kbd> · Close <kbd>Esc</kbd>
        </div>
      </div>
    </div>
  );
}
