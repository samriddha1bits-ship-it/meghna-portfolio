import Image from "next/image";
import ScrollButton from "@/components/ScrollButton";
import { instagramUrl, linkedinUrl } from "@/data/content";

export default function Hero() {
  return (
              <section className="hero" id="about">
                <div className="hero-copy reveal">
                  <div className="eyebrow-pill">
                    <span className="live-dot" />
                    <span>WRITER · CREATIVE MIND</span>
                  </div>

                  <h1>
                    Meghna
                    <br />
                    <span>Bose.</span>
                  </h1>

                  <p className="hero-description">
                    Exploring the world through words, ideas, and the little things
                    that make us feel a little more human.
                  </p>

                  <div className="hero-buttons">
                    <ScrollButton className="primary-button" target="writing">
                      Explore my work <span>↗</span>
                    </ScrollButton>
                    <ScrollButton className="secondary-button" target="contact" focusId="contact-name">
                      ✉ Send an email
                    </ScrollButton>
                  </div>

                  <div className="hero-socials">
                    <span className="socials-label">
                      Here are my <strong>socials</strong>
                    </span>
                    <div className="social-links">
                      <a
                        href={instagramUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Instagram"
                      >
                        <svg
                          className="social-brand-icon"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                          fill="none"
                        >
                          <rect
                            x="3"
                            y="3"
                            width="18"
                            height="18"
                            rx="5"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
                          <circle cx="17.5" cy="6.8" r="1.2" fill="currentColor" />
                        </svg>
                        Instagram <span aria-hidden="true">↗</span>
                      </a>
                      <a
                        href={linkedinUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="LinkedIn"
                      >
                        <svg
                          className="social-brand-icon"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                          fill="currentColor"
                        >
                          <path d="M5.2 3.5a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4ZM3.4 9.4H7v11.2H3.4V9.4Zm5.8 0h3.4v1.5h.05c.47-.89 1.63-1.83 3.35-1.83 3.58 0 4.24 2.35 4.24 5.4v6.13h-3.55v-5.43c0-1.3-.02-2.97-1.81-2.97-1.81 0-2.09 1.41-2.09 2.87v5.53H9.2V9.4Z" />
                        </svg>
                        LinkedIn <span aria-hidden="true">↗</span>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="portrait-wrap reveal">
                  <div className="portrait-glow" />
                  <div className="portrait-backdrop-card" />
                  <div className="portrait-frame">
                    <div className="portrait-img-container">
                      <Image
      src="/meghna-portrait.jpg"
      alt="Portrait of Meghna Bose"
      width={400}
      height={400}
      sizes="(max-width: 800px) 85vw, 385px"
      priority
      className="portrait"
    />
                    </div>
                    <div className="portrait-caption">
                      <span>MEGHNA BOSE</span>
                      <span>WRITER / DREAMER</span>
                    </div>
                  </div>
                  <div className="floating-note note-top">
                    <span className="note-symbol">✳</span>
                    <span>
                      Words can make
                      <br />
                      worlds.
                    </span>
                  </div>
                  <div className="floating-note note-bottom">
                    <span className="tiny-star">🖋</span>
                    <span>Currently writing</span>
                  </div>
                </div>
              </section>
  );
}
