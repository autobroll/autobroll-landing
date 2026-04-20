export default function SectionPlaceholder({ eyebrow, title }) {
  return (
    <section className="placeholder-section" id={eyebrow.toLowerCase().replace(/\s*\/\s*/g, '-').replace(/\s+/g, '-')}>
      <div className="section-heading section-heading--tight placeholder-section__heading">
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h2>{title}</h2>
        </div>
      </div>

      <div className="glass-shell placeholder-canvas" aria-hidden="true" />
    </section>
  );
}
