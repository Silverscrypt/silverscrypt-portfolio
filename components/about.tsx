import { about } from "@/lib/content";

export function About() {
  return (
    <section id="about" className="about" aria-labelledby="about-title">
      <p className="page-eyebrow">{about.eyebrow}</p>
      <h2 id="about-title" className="about-title">
        {about.title}
      </h2>
      <div className="about-body">
        {about.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
