"use client";

import { useState } from "react";
import Image from "next/image";
import ScrollButton from "@/components/ScrollButton";
import { amazonUrl, bookUrl } from "@/data/content";

export default function Writing() {
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const tiltX = (0.5 - y) * 16;
    const tiltY = (x - 0.5) * 18;
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translateY(-8px) scale(1.03)`,
      transition: "transform 0.12s ease-out",
    });
  }

  function handleMouseLeave() {
    setTiltStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)",
      transition: "transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1)",
    });
  }

  return (
    <section className="section writing-section reveal" id="writing">
      <div className="section-heading heading-row">
        <div>
          <p className="eyebrow">SELECTED WORK</p>
          <h2>
            Words into <span>worlds.</span>
          </h2>
        </div>
        <span className="section-count">FEATURED BOOK</span>
      </div>

      <div className="book-feature">
        <div
          className="book-art"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="book-halo" />
          <div className="book-3d-stage">
            <div
              className="book-image-wrap interactive-book-wrap"
              style={tiltStyle}
            >
              <Image
                src="/book-cover.jpg"
                alt="Cover of A World Seen at Eighteen by Meghna Bose"
                width={431}
                height={690}
                sizes="(max-width: 800px) 80vw, 380px"
                className="book-cover"
                priority
              />
              <div className="book-shine" />
            </div>
          </div>
          <div className="book-art-label">A BOOK BY MEGHNA BOSE</div>
        </div>

        <div className="book-info">
          <p className="eyebrow">
            <span className="book-dot" /> FEATURED PUBLICATION
          </p>
          <h3>
            A World Seen
            <br />
            <em>at Eighteen</em>
          </h3>
          <p className="book-byline">A book by Meghna Bose</p>
          <div className="book-rule" />
          <p className="book-description">
            A thoughtful exploration of the world through the lens of eighteen — an
            invitation to pause, reflect, and see familiar things in a new light.
          </p>
          <div className="book-tags">
            <span>Non-fiction</span>
            <span>Reflection</span>
            <span>51 pages</span>
            <span>ISBN 9372487031</span>
          </div>

          <div className="book-actions">
            <a
              className="primary-button link-button"
              href={bookUrl}
              target="_blank"
              rel="noreferrer"
            >
              Google Play Books ↗
            </a>
            <a
              className="secondary-button link-button"
              href={amazonUrl}
              target="_blank"
              rel="noreferrer"
            >
              Amazon India ↗
            </a>
            <ScrollButton className="secondary-button" target="poetry">
              Read Poetry ✦
            </ScrollButton>
          </div>
          <p className="book-footnote">Published by Writer&apos;s Pocket</p>
        </div>
      </div>
    </section>
  );
}
