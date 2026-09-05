import { useEffect } from "react";
import AmbientBackground from "./components/AmbientBackground";
import PremiumNavbar from "./components/PremiumNavbar";
import { APP_URL } from "./data/landingContent";

const CONTACT_EMAIL = "contact@autobroll.info";
const PUNCH_UI_PRIMARY = "https://pub-29017a168d3a4edc87594d9ff9c1f185.r2.dev/Images-Pages/Landing%20Page/PunchText/Screenshot%202026-09-05%20191033.png";
const PUNCH_UI_SECONDARY = "https://pub-29017a168d3a4edc87594d9ff9c1f185.r2.dev/Images-Pages/Landing%20Page/PunchText/Screenshot%202026-09-05%20191229.png";

const PAGE_NAV = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Punch Text", href: "#punch-text" },
  { label: "Presets", href: "#presets" },
  { label: "FAQ", href: "#faq" },
];

const FAQS = [
  {
    question: "What are automatic AI captions?",
    answer:
      "Automatic AI captions turn the speech in your video into timed on-screen text. Autobroll generates the caption timing, then lets you style the result with animated caption presets, fonts, colors, sizing and layout controls.",
  },
  {
    question: "What is Punch Text in Autobroll?",
    answer:
      "Punch Text is a second text layer for moments that deserve more emphasis than normal captions. Use it to make hooks, key words and short phrases hit harder with larger animated text and dedicated styling.",
  },
  {
    question: "Can I customize the caption and Punch Text styles?",
    answer:
      "Yes. You can adjust fonts, colors, sizing, spacing and available style controls, then review the result before export.",
  },
  {
    question: "Can I save my caption and Punch Text settings?",
    answer:
      "Yes. Autobroll lets you save caption and Punch Text settings as presets so you can reuse a visual system across future projects instead of rebuilding it every time.",
  },
  {
    question: "Can I still edit the captions after they are generated?",
    answer:
      "Yes. The automatic pass is editable. You can refine the text, timing and styling and keep control of the final look before export.",
  },
  {
    question: "Does Autobroll only create captions?",
    answer:
      "No. Captions and Punch Text can be combined with context-aware B-roll, smart zooms, motion design and Autobroll's separate Faceless creation workflow.",
  },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11M11 6l4 4-4 4" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="m4 10 4 4 8-9" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2l1.6 5.2L19 9l-5.4 1.8L12 16l-1.6-5.2L5 9l5.4-1.8L12 2Z" />
      <path d="M19 15l.9 2.8L23 19l-3.1 1.2L19 23l-.9-2.8L15 19l3.1-1.2L19 15Z" />
    </svg>
  );
}

function StepCard({ number, title, text }) {
  return (
    <article className="captions-step-card">
      <span className="captions-step-card__number">0{number}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function StyleChip({ children, accent = false }) {
  return <span className={accent ? "captions-style-chip captions-style-chip--accent" : "captions-style-chip"}>{children}</span>;
}

function Footer() {
  return (
    <footer className="site-footer captions-footer">
      <div className="site-footer__brand">
        <strong>Autobroll</strong>
        <p>One creative engine for video.</p>
      </div>
      <div className="site-footer__links">
        <div>
          <span>Product</span>
          <a href="/">AI Video Editor</a>
          <a href="/ai-b-roll-generator">AI B-Roll Generator</a>
          <a href="/automatic-captions">Premium Captions</a>
          <a href="/faceless-video-editor">Faceless Video Editor</a>
          <a href="/ai-video-editor-for-agencies">For Agencies</a>
          <a href={APP_URL}>Start creating</a>
        </div>
        <div>
          <span>Explore</span>
          <a href="#how-it-works">How it works</a>
          <a href="#punch-text">Punch Text</a>
          <a href="#presets">Presets</a>
          <a href="#faq">FAQ</a>
        </div>
        <div>
          <span>Company</span>
          <a href={`mailto:${CONTACT_EMAIL}`}>Contact</a>
          <a href="/">Autobroll home</a>
        </div>
      </div>
      <div className="site-footer__bottom">
        <span>© {new Date().getFullYear()} Autobroll. All rights reserved.</span>
        <span>Built for creators, editors and teams.</span>
      </div>
    </footer>
  );
}

export default function AutomaticCaptionsPage() {
  useEffect(() => {
    document.title = "Premium Video Captions & Punch Text | Autobroll";
  }, []);

  return (
    <div className="page-shell captions-page">
      <AmbientBackground />
      <PremiumNavbar links={PAGE_NAV} brandHref="/" />

      <main className="page-content captions-page__content">
        <section className="captions-hero" id="top" aria-labelledby="captions-hero-title">
          <div className="captions-hero__copy">
            <div className="hero-kicker"><i /> Captions built for the edit, not just the transcript.</div>
            <h1 id="captions-hero-title">
              Premium Captions
              <span className="text-gradient"> with a second layer of emphasis.</span>
            </h1>
            <p>
              Turn speech into premium animated captions, then make the moments that matter hit harder with Punch Text.
              Style the whole system, save your look as a preset and keep every word editable.
            </p>
            <div className="hero-actions">
              <a href={APP_URL} className="button button--primary button--large">
                Create premium captions <ArrowIcon />
              </a>
              <a href="#punch-text" className="button button--ghost button--large">See Punch Text</a>
            </div>
            <div className="hero-reassurance" aria-label="Autobroll caption benefits">
              <span><CheckIcon /> Animated captions</span>
              <span><CheckIcon /> Punch Text</span>
              <span><CheckIcon /> Reusable presets</span>
            </div>
          </div>

          <figure className="captions-ui glass-shell">
            <div className="captions-ui__bar">
              <span className="eyebrow">Punch Text workspace</span>
              <span className="captions-ui__status"><i /> Style ready</span>
            </div>
            <img
              src={PUNCH_UI_PRIMARY}
              alt="Autobroll Punch Text workspace showing animated text styling controls and video preview"
              loading="eager"
              decoding="async"
            />
            <figcaption>Build the caption layer, then emphasize the exact words and phrases that deserve more visual weight.</figcaption>
          </figure>
        </section>

        <section className="captions-intro" aria-labelledby="captions-intro-title">
          <span className="eyebrow">More than transcription</span>
          <h2 id="captions-intro-title">Readable captions are the baseline. The visual rhythm is what makes them feel edited.</h2>
          <p>
            Autobroll gives you a caption system for modern short-form video: timed text, animated styles and detailed
            visual controls for the everyday words, plus a separate Punch Text layer for hooks, claims and key moments.
          </p>
        </section>

        <section className="captions-how" id="how-it-works" aria-labelledby="captions-how-title">
          <div className="captions-section-heading">
            <span className="eyebrow">How it works</span>
            <h2 id="captions-how-title">From spoken words to a finished text system in three steps.</h2>
          </div>
          <div className="captions-step-grid">
            <StepCard
              number={1}
              title="Generate the captions"
              text="Autobroll turns the speech in your video into timed captions so the words arrive in sync with the edit."
            />
            <StepCard
              number={2}
              title="Choose the visual language"
              text="Apply a premium caption style, then refine fonts, colors, sizing, spacing and the controls that define your look."
            />
            <StepCard
              number={3}
              title="Punch the moments that matter"
              text="Add larger animated Punch Text to hooks, key phrases and important ideas without forcing every caption to shout."
            />
          </div>
        </section>

        <section className="captions-punch" id="punch-text" aria-labelledby="captions-punch-title">
          <div className="captions-punch__copy">
            <span className="eyebrow">Punch Text</span>
            <h2 id="captions-punch-title">Not every word deserves the same weight.</h2>
            <p>
              Keep your normal captions readable, then use Punch Text as a separate layer for the phrases viewers should
              notice first. Hooks can feel bigger, key claims can land harder and important moments can have their own visual treatment.
            </p>
            <div className="captions-style-chips" aria-label="Punch Text styling examples">
              <StyleChip accent>Hooks</StyleChip>
              <StyleChip>Key phrases</StyleChip>
              <StyleChip>Claims</StyleChip>
              <StyleChip>CTAs</StyleChip>
              <StyleChip>Highlights</StyleChip>
            </div>
          </div>
          <figure className="captions-punch__image glass-shell">
            <img
              src={PUNCH_UI_SECONDARY}
              alt="Autobroll Punch Text editor with text style controls and a video preview"
              loading="lazy"
              decoding="async"
            />
            <figcaption>Caption styling and Punch Text stay part of the same editing workflow.</figcaption>
          </figure>
        </section>

        <section className="captions-style-system" aria-labelledby="captions-style-system-title">
          <div className="captions-section-heading captions-section-heading--center">
            <span className="eyebrow">Premium caption styles</span>
            <h2 id="captions-style-system-title">Choose a style, then make it yours.</h2>
            <p>
              Start from an animated caption look and tune it to the brand instead of rebuilding a text animation from zero for every video.
            </p>
          </div>
          <div className="captions-style-grid">
            <article className="captions-style-card glass-shell">
              <span>01</span>
              <strong>Word-by-word motion</strong>
              <p>Keep the caption rhythm tied to the spoken delivery so the text feels alive without becoming hard to read.</p>
            </article>
            <article className="captions-style-card glass-shell">
              <span>02</span>
              <strong>Typography controls</strong>
              <p>Adjust fonts, sizes, colors, spacing and layout details to match the visual system of the video.</p>
            </article>
            <article className="captions-style-card glass-shell">
              <span>03</span>
              <strong>Caption + Punch hierarchy</strong>
              <p>Use normal captions for continuity and a stronger Punch layer when a phrase needs extra emphasis.</p>
            </article>
            <article className="captions-style-card glass-shell">
              <span>04</span>
              <strong>Editable after generation</strong>
              <p>Automation gets the first pass on screen quickly, while the final text and style remain under your control.</p>
            </article>
          </div>
        </section>

        <section className="captions-presets" id="presets" aria-labelledby="captions-presets-title">
          <div className="captions-presets__visual glass-shell" aria-hidden="true">
            <div className="captions-preset-card captions-preset-card--active">
              <span>MY PRESET</span>
              <strong>Your next<br /><em>client</em></strong>
              <small>Caption + Punch</small>
            </div>
            <div className="captions-preset-card">
              <span>STYLE SYSTEM</span>
              <strong>One look.<br />Every video.</strong>
              <small>Reusable settings</small>
            </div>
          </div>
          <div className="captions-presets__copy">
            <span className="eyebrow">My Presets</span>
            <h2 id="captions-presets-title">Save the look once. Reuse it across the workflow.</h2>
            <p>
              Save your caption and Punch Text settings together as a preset. Apply the same typography, colors and visual hierarchy to new projects without repeating the setup every time.
            </p>
            <ul className="captions-check-list">
              <li><CheckIcon /> Save caption and Punch Text styling together</li>
              <li><CheckIcon /> Apply a preset to a new project</li>
              <li><CheckIcon /> Update the preset as the visual system evolves</li>
            </ul>
          </div>
        </section>

        <section className="captions-beyond" aria-labelledby="captions-beyond-title">
          <div className="captions-section-heading captions-section-heading--center">
            <span className="eyebrow">One edit, more than text</span>
            <h2 id="captions-beyond-title">Let captions work with the rest of the video.</h2>
          </div>
          <div className="captions-layer-grid">
            <article><SparkIcon /><strong>AI B-roll</strong><p>Add context-aware visuals around the moments the script calls for them.</p></article>
            <article><SparkIcon /><strong>Smart zooms</strong><p>Create camera movement around key moments without manually keyframing every beat.</p></article>
            <article><SparkIcon /><strong>Motion design</strong><p>Use a richer visual treatment when text and B-roll alone are not enough.</p></article>
            <article><SparkIcon /><strong>Faceless creation</strong><p>Build generated scenes from a script or voice-over in Autobroll's separate Faceless workflow.</p></article>
          </div>
        </section>

        <section className="captions-use-cases" aria-labelledby="captions-use-cases-title">
          <div className="captions-section-heading captions-section-heading--center">
            <span className="eyebrow">Built for short-form workflows</span>
            <h2 id="captions-use-cases-title">A text system for videos that need to move fast and still feel designed.</h2>
          </div>
          <div className="captions-use-case-grid">
            <article><strong>Talking-head videos</strong><p>Keep the spoken message readable while key phrases get stronger visual emphasis.</p></article>
            <article><strong>UGC &amp; ads</strong><p>Make hooks, product claims and CTAs easier to notice without styling every word the same way.</p></article>
            <article><strong>Podcasts &amp; clips</strong><p>Turn longer spoken moments into captioned short-form edits that are easier to follow without sound.</p></article>
            <article><strong>Agency workflows</strong><p>Reuse a caption and Punch system across more videos with presets instead of rebuilding the look project by project.</p></article>
          </div>
        </section>

        <section className="captions-faq" id="faq" aria-labelledby="captions-faq-title">
          <div className="captions-faq__heading">
            <span className="eyebrow">AI captions FAQ</span>
            <h2 id="captions-faq-title">Questions about captions and Punch Text.</h2>
            <p>Need something specific? <a href={`mailto:${CONTACT_EMAIL}`}>Talk to us.</a></p>
          </div>
          <div className="faq-list">
            {FAQS.map((faq, index) => (
              <details key={faq.question} open={index === 0}>
                <summary><span>{faq.question}</span><i aria-hidden="true" /></summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="final-cta captions-final-cta" aria-labelledby="captions-final-title">
          <div className="final-cta__glow" aria-hidden="true" />
          <span className="eyebrow">Make every word part of the edit</span>
          <h2 id="captions-final-title">Generate the captions.<br /><span className="text-gradient">Punch the moments that matter.</span></h2>
          <p>Build a reusable caption system, highlight the important phrases and keep full control of the final text before export.</p>
          <div className="hero-actions hero-actions--centered">
            <a href={APP_URL} className="button button--primary button--large">Start creating <ArrowIcon /></a>
            <a href="/" className="button button--ghost button--large">Explore Autobroll</a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
