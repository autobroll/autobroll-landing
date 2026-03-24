export default function FeaturePills({ items }) {
  return (
    <section className="feature-pills-section" aria-label="Core characteristics">
      <div className="glass-shell feature-pills-shell">
        {items.map((item) => (
          <span key={item} className="feature-pill">
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
