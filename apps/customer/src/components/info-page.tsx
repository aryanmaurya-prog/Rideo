import Link from 'next/link';

type InfoPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  sections: { title: string; copy: string }[];
};

export function InfoPage({ eyebrow, title, intro, sections }: InfoPageProps) {
  return (
    <main className="container">
      <section className="page-hero">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{intro}</p>
      </section>
      <div className="page-panel-grid" style={{ paddingBottom: 72 }}>
        {sections.map((section) => (
          <section className="content-panel" key={section.title}>
            <h2>{section.title}</h2>
            <p className="muted">{section.copy}</p>
          </section>
        ))}
      </div>
      <section className="cta-panel" style={{ marginBottom: 72 }}>
        <div><h2>Want to get moving?</h2><p>Browse the rides available in your city.</p></div>
        <Link className="button" href="/bikes">Explore bikes →</Link>
      </section>
    </main>
  );
}
