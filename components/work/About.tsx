import ScrollButton from "@/components/ScrollButton";

export default function About() {
  return (
    <section className="section about-section reveal">
      <div className="section-heading">
        <p className="eyebrow">A LITTLE INTRODUCTION</p>
        <h2>
          A mind full of <span>stories.</span>
        </h2>
      </div>

      <div className="about-grid">
        <div>
          <p className="large-copy">
            I believe the world is made of stories — the ones we tell, the ones we
            keep to ourselves, and the ones we&apos;re still learning how to understand.
          </p>
        </div>

        <div className="about-detail">
          <p>
            <strong>
              Meghna Bose is an eighteen year old Performing Arts undergraduate at
              Presidency University and the author of two published English books.
              Drawn to ideas, observations, and the curious details of everyday life,
              she uses her writing—spanning poetry, short stories, scripts, and reflective
              essays—to look a little closer at human emotions and society. Aspiring to a
              career in journalism and media, Meghna aims to combine creative expression
              with responsible, impactful reporting to create work that feels thoughtful,
              genuine, and worth returning to.
            </strong>
          </p>
          <ScrollButton className="inline-link" target="writing">
            Discover my book <span>↗</span>
          </ScrollButton>
        </div>
      </div>
    </section>
  );
}
