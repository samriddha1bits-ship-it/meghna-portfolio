
export default function Education() {
  return (
    <section className="section education-section reveal" id="education">
      <div className="section-heading">
        <p className="eyebrow">THE JOURNEY SO FAR</p>
        <h2>
          Learning, <span>always.</span>
        </h2>
      </div>

      <div className="timeline">
        <div className="timeline-item">
          <span className="timeline-marker active-marker" />
          <div>
            <h3>Presidency University</h3>
            <p className="muted">
              A chapter of learning, exploration, and discovering new perspectives.
            </p>
          </div>
          <span className="timeline-number">2026 – Present</span>
        </div>

        <div className="timeline-item">
          <span className="timeline-marker active-marker" />
          <div>
            <h3>Kalyani Public School, Saltlake</h3>
            <p className="muted">
              The foundation years that shaped a love for learning, ideas, and creativity.
            </p>
          </div>
          <span className="timeline-number">2011 – 2026</span>
        </div>

        <div className="timeline-item">
          <span className="timeline-marker active-marker" />
          <div>
            <p className="timeline-date">BEYOND THE CLASSROOM</p>
            <h3>Writing &amp; creative exploration</h3>
            <p className="muted">
              Turning observations and ideas into work that can be shared with others.
            </p>
          </div>
          <span className="timeline-number" />
        </div>
      </div>
    </section>
  );
}
