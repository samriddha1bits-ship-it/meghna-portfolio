"use client";

import { useRef } from "react";
import { interestsData } from "@/data/content";

export default function Interests() {
  const cardsRef = useRef<Map<string, HTMLElement>>(new Map());

  function handleCardMove(e: React.MouseEvent<HTMLElement>, key: string) {
    const card = cardsRef.current.get(key);
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const tiltX = (0.5 - y) * 12;
    const tiltY = (x - 0.5) * 12;

    card.style.setProperty("--tilt-x", `${tiltX.toFixed(2)}deg`);
    card.style.setProperty("--tilt-y", `${tiltY.toFixed(2)}deg`);
    card.style.setProperty("--glare-x", `${(x * 100).toFixed(1)}%`);
    card.style.setProperty("--glare-y", `${(y * 100).toFixed(1)}%`);
    card.dataset.tilting = "true";
  }

  function handleCardLeave(key: string) {
    const card = cardsRef.current.get(key);
    if (!card) return;
    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
    delete card.dataset.tilting;
  }

  return (
    <section className="section interests-section reveal" id="interests">
      <div className="section-heading">
        <p className="eyebrow">THINGS THAT INSPIRE ME</p>
        <h2>
          Curious by <span>nature.</span>
        </h2>
      </div>

      <div className="interest-grid">
        {interestsData.map((item) => (
          <article
            ref={(el) => {
              if (el) cardsRef.current.set(item.title, el);
              else cardsRef.current.delete(item.title);
            }}
            className="interest-card tilt-card"
            key={item.title}
            onMouseMove={(e) => handleCardMove(e, item.title)}
            onMouseLeave={() => handleCardLeave(item.title)}
          >
            <div className="card-glare" aria-hidden="true" />
            <div className="interest-top">
              <div className="interest-icon">{item.icon}</div>
              <span className="interest-tag">{item.tag}</span>
            </div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <span className="card-arrow" aria-hidden="true">
              ↗
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
