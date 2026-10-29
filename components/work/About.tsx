import ScrollButton from "@/components/ScrollButton";

export default function About() {
  return (
    <section className="section about-section reveal" id="about-intro">
      <div className="section-heading">
        <p className="eyebrow">A LITTLE INTRODUCTION</p>
        <h2>
          A mind full of <span>stories.</span>
        </h2>
      </div>

      <div className="about-grid">
        <div>
          <p className="large-copy editorial-drop-cap">
            I believe the world is made of stories — the ones we tell, the ones we
            keep to ourselves, and the ones we&apos;re still learning how to understand.
          </p>

          <div className="about-highlights-row">
            <div className="highlight-pill">
              <span className="pill-icon">📚</span>
              <div>
                <strong>2 Books</strong>
                <small>Published Works</small>
              </div>
            </div>
            <div className="highlight-pill">
              <span className="pill-icon">🎭</span>
              <div>
                <strong>Performing Arts</strong>
                <small>Presidency University</small>
              </div>
            </div>
            <div className="highlight-pill">
              <span className="pill-icon">✍</span>
              <div>
                <strong>Journalism</strong>
                <small>Media &amp; Inquiries</small>
              </div>
            </div>
          </div>
        </div>

        <div className="about-detail">
          <p>
            <strong>
              Meghna Bose is an eighteen year old Performing Arts undergraduate at
              Presidency University and the author of two published English books.
              Drawn to ideas, observations, and the curious details of everyday life,
              she uses her writing—spanning poetry, short stories, scripts, and reflective
              essays—to look a little closer at human emotions and society.
            </strong>
          </p>
          <p>
            Aspiring to a career in journalism and media, Meghna aims to combine creative expression
            with responsible, impactful reporting to create work that feels thoughtful,
            genuine, and worth returning to.
          </p>

          <div className="about-actions-row">
            <ScrollButton className="inline-link" target="writing">
              Discover my book <span>↗</span>
            </ScrollButton>
            <span className="link-separator">·</span>
            <ScrollButton className="inline-link" target="poetry">
              Read poetry ↗
            </ScrollButton>
          </div>
        </div>
      </div>
    </section>
  );
}
