export default function DemoStrip({ items }) {
  return (
    <section className="demo-strip-section" id="how-it-works">
      <div className="section-heading section-heading--tight">
        <div>
          <span className="eyebrow">Showcase</span>
          <h2>Create fast. Look premium</h2>
        </div>
      </div>

      <div className="demo-strip-grid">
        {items.map((item) => (
          <article key={item.title} className="demo-strip-card glass-shell">
            <span className="eyebrow">{item.eyebrow}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
