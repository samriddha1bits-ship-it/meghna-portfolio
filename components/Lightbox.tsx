"use client";

import { useEffect } from "react";
import Image from "next/image";
import { scrapbookPhotos } from "@/data/content";

type Props = {
  index: number;
  onChange: (index: number) => void;
  onClose: () => void;
};

export default function Lightbox({ index, onChange, onClose }: Props) {
  const total = scrapbookPhotos.length;
  const photo = scrapbookPhotos[index];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        onClose(); // let the shell open the command palette
      } else if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        onChange((index + 1) % total);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        onChange((index - 1 + total) % total);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, total, onChange, onClose]);

  return (
    <div
      className="lightbox-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Scrapbook photo viewer"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="lightbox-stage">
        <button
          type="button"
          className="lightbox-nav"
          aria-label="Previous photo"
          onClick={() => onChange((index - 1 + total) % total)}
        >
          ←
        </button>

        <div className="lightbox-polaroid" key={photo.src}>
          <span className="lightbox-tape" aria-hidden="true" />
          <div className="lightbox-topbar">
            <span className="lightbox-counter">
              0{index + 1} / 0{total}
            </span>
            <button
              type="button"
              className="lightbox-close"
              aria-label="Close photo viewer"
              onClick={onClose}
            >
              ✕ ESC
            </button>
          </div>

          <div className="lightbox-media">
            <div className="photo-placeholder lightbox-placeholder" aria-hidden="true" />
            <Image
              src={photo.src}
              alt={photo.alt}
              width={880}
              height={1056}
              sizes="(max-width: 800px) 92vw, 520px"
              priority
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
          </div>

          <div className="lightbox-footer">
            <p className="lightbox-caption">{photo.caption}</p>
            <span className="lightbox-hint">Use ← → keys to browse</span>
          </div>
        </div>

        <button
          type="button"
          className="lightbox-nav"
          aria-label="Next photo"
          onClick={() => onChange((index + 1) % total)}
        >
          →
        </button>
      </div>
    </div>
  );
}
