import { APP_URL } from "../data/landingContent";

export default function FinalCTA() {
  return (
    <section className="final-cta-section" id="login">
      <div className="final-cta-shell glass-shell">
        <div>
          <span className="eyebrow">Autobroll</span>
          <h2>Premium edits. Cleaner proof.</h2>
          <p>Swap your video links later from one file and keep the layout intact.</p>
        </div>

        <div className="final-cta-actions">
          <a href={APP_URL} className="button button--primary">
            Start creating
          </a>
          <a href="#top" className="button button--ghost">
            Back to top
          </a>
        </div>
      </div>
    </section>
  );
}
