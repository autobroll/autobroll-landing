import { useEffect, useRef } from "react";
import AmbientBackground from "./components/AmbientBackground";
import PremiumNavbar from "./components/PremiumNavbar";
import { APP_URL, galleryCards, videoCamSteps } from "./data/landingContent";

const CONTACT_EMAIL = "contact@autobroll.info";

const PAGE_NAV = [
  { label: "Demo", href: "#demo" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "FAQ", href: "#faq" },
];

const FAQS = [
  {
    question: "What is an AI B-roll generator?",
    answer:
      "An AI B-roll generator helps add supporting visuals to a video based on what is being said. Autobroll analyzes the context of your footage, places relevant B-roll moments, and lets you review or change the result before export.",
  },
  {
    question: "How does Autobroll choose where to add B-roll?",
    answer:
      "Autobroll uses the meaning and timing of your footage to identify moments where a supporting visual can make the edit clearer or more engaging, instead of placing B-roll at fixed intervals.",
  },
  {
    question: "Can I change or remove the B-roll after it is added?",
    answer:
      "Yes. Autobroll is designed to keep the final creative decisions in your hands. You can review the edit and change, replace, upload, or remove visuals before exporting.",
  },
  {
    question: "Can Autobroll use generated visuals as B-roll?",
    answer:
      "Yes. Autobroll can work with generated visuals alongside stock B-roll and uploaded media, so the visual layer can match ideas that are difficult to find in ordinary footage libraries.",
  },
  {
    question: "Does Autobroll only add B-roll?",
    answer:
      "No. B-roll is one part of the editing workflow. Autobroll can also add premium captions, Punch Text, smart zooms and motion design, and it includes a separate Faceless creation workflow.",
  },
  {
    question: "Can I try Autobroll for free?",
    answer:
      "Yes. You can start with the free plan to explore the workflow before moving to a paid plan for higher usage and exports.",
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

function PlayableVideo({ src, label, accent = false, videoRef }) {
  return (
    <div className={`broll-demo__video${accent ? " broll-demo__video--after" : ""}`}>
      <span className={`broll-demo__label${accent ? " broll-demo__label--accent" : ""}`}>{label}</span>
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        autoPlay
        playsInline
        preload="metadata"
        aria-label={`${label} B-roll editing example`}
      />
    </div>
  );
}

function BrollDemo() {
  const beforeRef = useRef(null);
  const afterRef = useRef(null);
  const example = galleryCards.find((card) => card.id === "gallery-02") || galleryCards[1];

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPlayback = () => {
      [beforeRef.current, afterRef.current].forEach((video) => {
        if (!video) return;
        if (mediaQuery.matches) video.pause();
        else video.play().catch(() => {});
      });
    };

    syncPlayback();
    mediaQuery.addEventListener?.("change", syncPlayback);
    return () => mediaQuery.removeEventListener?.("change", syncPlayback);
  }, []);

  return (
    <div className="broll-demo glass-shell" id="demo" aria-label="Before and after automatic B-roll example">
      <div className="broll-demo__toolbar">
        <span className="eyebrow">B-roll transformation</span>
        <span className="broll-demo__status"><i /> Context matched</span>
      </div>
      <div className="broll-demo__videos">
        <PlayableVideo src={example.beforeVideoUrl} label="Before" videoRef={beforeRef} />
        <PlayableVideo src={example.afterVideoUrl} label="After Autobroll" accent videoRef={afterRef} />
      </div>
      <div className="broll-demo__footer">
        <span><CheckIcon /> Relevant visuals</span>
        <span><CheckIcon /> Automatic timing</span>
        <span><CheckIcon /> Fully editable</span>
      </div>
    </div>
  );
}

function StepCard({ number, title, text }) {
  return (
    <article className="broll-step-card">
      <span className="broll-step-card__number">0{number}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function FeatureCard({ eyebrow, title, text, children }) {
  return (
    <article className="broll-feature-card glass-shell">
      <div className="broll-feature-card__copy">
        <span className="eyebrow">{eyebrow}</span>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
      {children}
    </article>
  );
}

function Footer() {
  return (
    <footer className="site-footer broll-footer">
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
          <a href="#features">Features</a>
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

export default function AiBrollGeneratorPage() {
  useEffect(() => {
    document.title = "AI B-Roll Generator — Automatically Add B-Roll | Autobroll";
  }, []);

  return (
    <div className="page-shell broll-page">
      <AmbientBackground />
      <PremiumNavbar links={PAGE_NAV} brandHref="/" />

      <main className="page-content broll-page__content">
        <section className="broll-hero" id="top" aria-labelledby="broll-hero-title">
          <div className="broll-hero__copy">
            <div className="hero-kicker"><i /> AI B-roll that follows the story.</div>
            <h1 id="broll-hero-title">
              AI B-Roll Generator
              <span className="text-gradient"> that knows when to cut away.</span>
            </h1>
            <p>
              Autobroll analyzes your footage, understands what is being said and automatically adds
              context-aware B-roll at the moments where it actually helps the edit.
            </p>
            <div className="hero-actions">
              <a href={APP_URL} className="button button--primary button--large">
                Add B-roll with AI <ArrowIcon />
              </a>
              <a href="#demo" className="button button--ghost button--large">See the result</a>
            </div>
            <div className="hero-reassurance" aria-label="Autobroll B-roll benefits">
              <span><CheckIcon /> Context-aware</span>
              <span><CheckIcon /> Automatic timing</span>
              <span><CheckIcon /> Full creative control</span>
            </div>
          </div>

          <BrollDemo />
        </section>

        <section className="broll-intro" aria-labelledby="broll-intro-title">
          <span className="eyebrow">More than random cutaways</span>
          <h2 id="broll-intro-title">B-roll should explain the moment, not just fill the screen.</h2>
          <p>
            Traditional B-roll workflows mean listening through the footage, finding every visual opportunity,
            searching for assets, placing them on the timeline and adjusting the timing one by one. Autobroll
            compresses that process into a first pass you can review and refine.
          </p>
        </section>

        <section className="broll-how" id="how-it-works" aria-labelledby="broll-how-title">
          <div className="broll-section-heading">
            <span className="eyebrow">How it works</span>
            <h2 id="broll-how-title">From talking head to visual story in three steps.</h2>
          </div>
          <div className="broll-step-grid">
            <StepCard
              number={1}
              title="Upload your footage"
              text="Start with a talking-head, podcast, UGC or other voice-led video. Autobroll reads the transcript and timing of the edit."
            />
            <StepCard
              number={2}
              title="Let Autobroll find the visual moments"
              text="The AI looks for ideas, objects and key phrases that benefit from a cutaway, then builds a visual layer around the context."
            />
            <StepCard
              number={3}
              title="Review, replace and export"
              text="Keep what works, swap what does not, upload your own media when needed and finish the edit with the creative control intact."
            />
          </div>
        </section>

        <section className="broll-feature-grid" id="features" aria-label="Autobroll B-roll features">
          <FeatureCard
            eyebrow="Context first"
            title="The script decides what belongs on screen."
            text="Autobroll follows the meaning of the footage so B-roll appears around relevant ideas instead of being dropped in at arbitrary intervals."
          >
            <div className="broll-context-visual" aria-hidden="true">
              <span className="broll-context-visual__line broll-context-visual__line--muted">“We redesigned the backyard around…”</span>
              <span className="broll-context-visual__line broll-context-visual__line--active">“a custom outdoor kitchen”</span>
              <span className="broll-context-visual__arrow">↓</span>
              <span className="broll-context-visual__result"><SparkIcon /> Outdoor kitchen visual</span>
            </div>
          </FeatureCard>

          <FeatureCard
            eyebrow="Your media, your choice"
            title="Use stock B-roll, generated visuals or your own assets."
            text="The visual layer is not locked to one source. Search for existing footage, generate supporting imagery or upload the exact media you want to use."
          >
            <div className="broll-source-pills" aria-label="Available visual sources">
              <span>Stock B-roll</span>
              <span>AI visuals</span>
              <span>Uploads</span>
            </div>
          </FeatureCard>

          <FeatureCard
            eyebrow="Built to be edited"
            title="Automation makes the first pass. You make the final call."
            text="Autobroll is not a black-box render. Every B-roll choice stays part of an editable workflow so you can replace, remove or refine the result before export."
          >
            <img
              className="broll-feature-card__image"
              src={videoCamSteps[1].imageUrl}
              alt="Autobroll workspace for adding and reviewing B-roll visuals"
              loading="lazy"
              decoding="async"
            />
          </FeatureCard>
        </section>

        <section className="broll-beyond" aria-labelledby="broll-beyond-title">
          <div className="broll-beyond__copy">
            <span className="eyebrow">Beyond B-roll</span>
            <h2 id="broll-beyond-title">One edit. Every visual layer working together.</h2>
            <p>
              B-roll is only one part of Autobroll. Build the rest of the short-form edit in the same workflow
              with premium captions, Punch Text, smart zooms and motion design.
            </p>
          </div>
          <div className="broll-layer-grid">
            <article><span>01</span><strong>Premium captions</strong><p>Readable, styled captions designed for modern short-form video.</p></article>
            <article><span>02</span><strong>Punch Text</strong><p>Emphasize the words and ideas that deserve a stronger visual hit.</p></article>
            <article><span>03</span><strong>Smart zooms</strong><p>Add camera movement without manually keyframing every moment.</p></article>
            <article><span>04</span><strong>Motion design</strong><p>Bring extra visual energy to ideas that need more than a simple cutaway.</p></article>
          </div>
        </section>

        <section className="broll-use-cases" aria-labelledby="broll-use-cases-title">
          <div className="broll-section-heading broll-section-heading--center">
            <span className="eyebrow">Made for voice-led content</span>
            <h2 id="broll-use-cases-title">A faster B-roll workflow for the videos you already edit.</h2>
          </div>
          <div className="broll-use-case-grid">
            <article><strong>Talking-head videos</strong><p>Break up long face-camera sections with visual context.</p></article>
            <article><strong>UGC &amp; ads</strong><p>Support product claims and key moments with relevant visuals.</p></article>
            <article><strong>Podcasts &amp; clips</strong><p>Turn spoken ideas into more dynamic short-form sequences.</p></article>
            <article><strong>Agency workflows</strong><p>Build a strong first B-roll pass across higher video volumes.</p></article>
          </div>
        </section>

        <section className="broll-faq" id="faq" aria-labelledby="broll-faq-title">
          <div className="broll-faq__heading">
            <span className="eyebrow">AI B-roll FAQ</span>
            <h2 id="broll-faq-title">Questions about automatic B-roll.</h2>
            <p>Still need something specific? <a href={`mailto:${CONTACT_EMAIL}`}>Talk to us.</a></p>
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

        <section className="final-cta broll-final-cta" aria-labelledby="broll-final-title">
          <div className="final-cta__glow" aria-hidden="true" />
          <span className="eyebrow">Your first pass, accelerated</span>
          <h2 id="broll-final-title">Stop searching frame by frame.<br /><span className="text-gradient">Let the story find the B-roll.</span></h2>
          <p>Upload your footage, let Autobroll build the visual layer, then take control of the final edit.</p>
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
