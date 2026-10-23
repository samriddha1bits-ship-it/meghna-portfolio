import { bookUrl, reviews } from "@/data/content";

export default function Reviews() {
  return (
    <section className="section reviews-section reveal" id="reviews">
      <div className="section-heading heading-row">
        <div>
          <p className="eyebrow">KIND WORDS FROM READERS</p>
          <h2>
            <span>Words that stay with you long after you’ve read them..</span>
          </h2>
        </div>
        <a
          className="inline-link review-source-top"
          href={bookUrl}
          target="_blank"
          rel="noreferrer"
        >
          Google Play Books ↗
        </a>
      </div>

      <div className="review-feature">
        <div className="review-side">
          <span className="quote-mark" aria-hidden="true">
            “
          </span>
          <p className="eyebrow">READER REVIEW</p>
          <div className="review-stars" aria-label="5 out of 5 stars">
            {"★".repeat(5)}
          </div>
          <p className="review-rating">
            5.0 <span>/ 5</span>
          </p>
          <p className="review-side-caption">Shared on Google Play Books</p>
        </div>

        <article className="review-card">
          <div className="review-card-top">
            <div className="review-avatar">{reviews[0].name.charAt(0)}</div>
            <div className="review-author">
              <h3>{reviews[0].name}</h3>
              <p>{reviews[0].date}</p>
            </div>
            <span className="verified-label">GOOGLE PLAY REVIEW ↗</span>
          </div>

          <div
            className="review-stars review-card-stars"
            aria-label={`${reviews[0].rating} out of 5 stars`}
          >
            {"★".repeat(reviews[0].rating)}
          </div>

          <blockquote>{reviews[0].text}</blockquote>

          <a
            className="review-original-link"
            href={reviews[0].url}
            target="_blank"
            rel="noreferrer"
          >
            View book listing on Google Play <span>↗</span>
          </a>
        </article>
      </div>
    </section>
  );
}
