import { interestsData } from "@/data/content";

export default function Interests() {
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
          <article className="interest-card" key={item.title}>
            <div className="interest-top">
              <div className="interest-icon">{item.icon}</div>
              <span className="interest-tag">{item.tag}</span>
            </div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <span className="card-arrow">↗</span>
          </article>
        ))}
      </div>
    </section>
  );
}
