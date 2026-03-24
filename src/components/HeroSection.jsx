function QuickStat({ value, label }) {
  return (
    <div className="quick-stat glass-shell">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

export default function HeroSection({ metrics, socialProof }) {
  return (
    <section className="intro-section" id="top">
      <div className="intro-section__copy">
        <div className="eyebrow-pill">Glass showcase landing</div>
        <h1>
          Visual proof, <span className="text-gradient">minimal text.</span>
        </h1>
        <p>
          Before / after videos first. Everything else stays quiet.
        </p>
      </div>

      <div className="intro-section__meta">
        <div className="social-proof-row social-proof-row--compact">
          {socialProof.map((item) => (
            <span key={item} className="social-proof-pill">
              {item}
            </span>
          ))}
        </div>

        <div className="quick-stats-grid">
          {metrics.map((metric) => (
            <QuickStat key={metric.label} value={metric.value} label={metric.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
