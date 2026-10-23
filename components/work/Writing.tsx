import Image from "next/image";
import { amazonUrl, bookUrl } from "@/data/content";

export default function Writing() {
  return (
              <section className="section writing-section reveal" id="writing">
                <div className="section-heading heading-row">
                  <div>
                    <p className="eyebrow">SELECTED WORK</p>
                    <h2>
                      Words into <span>worlds.</span>
                    </h2>
                  </div>
                  <span className="section-count">PUBLICATION</span>
                </div>

                <div className="book-feature">
                  <div className="book-art">
                    <div className="book-halo" />
                    <div className="book-3d-stage">
                      <div className="book-image-wrap">
                        <Image
      src="/book-cover.jpg"
      alt="Cover of A World Seen at Eighteen by Meghna Bose"
      width={431}
      height={690}
      sizes="(max-width: 800px) 80vw, 380px"
      className="book-cover"
    />
                        <div className="book-shine" />
                      </div>
                    </div>
                    <div className="book-art-label">A STORY BY MEGHNA BOSE</div>
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
                    </div>
                    <div className="book-actions">
                      <a
                        className="primary-button link-button"
                        href={bookUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Read on Google Play <span>↗</span>
                      </a>
                      <a
                        className="secondary-button link-button"
                        href={amazonUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Find on Amazon ↗
                      </a>
                    </div>
                    <p className="book-footnote">Published by Writer&apos;s Pocket</p>
                  </div>
                </div>
              </section>
  );
}
