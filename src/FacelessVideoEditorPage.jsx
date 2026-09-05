import { useEffect } from "react";
import AmbientBackground from "./components/AmbientBackground";
import PremiumNavbar from "./components/PremiumNavbar";
import { APP_URL } from "./data/landingContent";

const CONTACT_EMAIL = "contact@autobroll.info";
const FACELESS_UI_URL = "https://pub-29017a168d3a4edc87594d9ff9c1f185.r2.dev/Images-Pages/Landing%20Page/Faceless/Screenshot%202026-08-18%20184832.jpg";

const PAGE_NAV = [
  { label: "How it works", href: "#how-it-works" },
  { label: "AI Director", href: "#ai-director" },
  { label: "Scenes", href: "#scenes" },
  { label: "FAQ", href: "#faq" },
];

const FAQS = [
  {
    question: "What is Autobroll Faceless?",
    answer:
      "Autobroll Faceless is a video creation workflow for building visual-first videos without filming yourself. Start from a voice-over, script or idea, then use AI Director to create and refine the scenes that make up the video.",
  },
  {
    question: "Can I tell AI Director what to change?",
    answer:
      "Yes. The Faceless workspace is built around direct instructions. You can select a scene, describe what you want changed, and use AI Director to update the visual direction instead of rebuilding the scene manually.",
  },
  {
    question: "Does Autobroll generate scenes automatically?",
    answer:
      "Autobroll can structure a video into scenes and generate visuals for them. You can then review each scene, edit its visual prompt, add a reference image, regenerate it or give AI Director new instructions.",
  },
  {
    question: "Can I control individual scenes?",
    answer:
      "Yes. Scenes stay visible in the scene strip so you can select one, inspect its prompt and make targeted changes without changing the entire video.",
  },
  {
    question: "Do I need to appear on camera?",
    answer:
      "No. Faceless mode is designed for videos where the story is carried by voice-over, generated scenes, visual sequences and other supporting media rather than a filmed presenter.",
  },
  {
    question: "Can I try Autobroll for free?",
    answer:
      "Yes. You can start with Autobroll's free experience to explore the product and test the workflow before moving to a paid plan for higher usage and exports.",
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
    <article className="faceless-step-card">
      <span className="faceless-step-card__number">0{number}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function PromptExample({ label, children }) {
  return (
    <div className="faceless-prompt-example">
      <span>{label}</span>
      <p>{children}</p>
    </div>
  );
}

function Footer() {
  return (
    <footer className="site-footer faceless-footer">
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
          <a href="#ai-director">AI Director</a>
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

export default function FacelessVideoEditorPage() {
  useEffect(() => {
    document.title = "Faceless Video Generator — Create & Edit with AI | Autobroll";
  }, []);

  return (
    <div className="page-shell faceless-page">
      <AmbientBackground />
      <PremiumNavbar links={PAGE_NAV} brandHref="/" />

      <main className="page-content faceless-page__content">
        <section className="faceless-hero" id="top" aria-labelledby="faceless-hero-title">
          <div className="faceless-hero__copy">
            <div className="hero-kicker"><i /> Conversational faceless video creation.</div>
            <h1 id="faceless-hero-title">
              Faceless Video Generator
              <span className="text-gradient"> you can direct with words.</span>
            </h1>
            <p>
              Give Autobroll a voice-over, script or idea, then tell AI Director what you want. It structures the
              story into scenes, generates the visuals and lets you refine the video with direct instructions.
            </p>
            <div className="hero-actions">
              <a href={APP_URL} className="button button--primary button--large">
                Create a faceless video <ArrowIcon />
              </a>
              <a href="#ai-director" className="button button--ghost button--large">See the workflow</a>
            </div>
            <div className="hero-reassurance" aria-label="Autobroll Faceless benefits">
              <span><CheckIcon /> No camera required</span>
              <span><CheckIcon /> Scene-by-scene control</span>
              <span><CheckIcon /> Edit by instruction</span>
            </div>
          </div>

          <figure className="faceless-ui glass-shell">
            <div className="faceless-ui__bar">
              <span className="eyebrow">Faceless workspace</span>
              <span className="faceless-ui__status"><i /> AI Director online</span>
            </div>
            <img
              src={FACELESS_UI_URL}
              alt="Autobroll Faceless workspace showing the conversational AI Director, generated scene preview, visual prompt controls and scene strip"
              loading="eager"
              decoding="async"
            />
            <figcaption>Direct the edit on the left. Review and refine every scene on the right.</figcaption>
          </figure>
        </section>

        <section className="faceless-intro" aria-labelledby="faceless-intro-title">
          <span className="eyebrow">A different way to make video</span>
          <h2 id="faceless-intro-title">You do not have to build every scene by hand. Tell the system what you want.</h2>
          <p>
            Faceless creation normally means writing a script, planning shots, finding or generating visuals,
            arranging scenes and repeating the process every time something changes. Autobroll turns that workflow
            into a conversation between you and AI Director, while keeping each scene visible and editable.
          </p>
        </section>

        <section className="faceless-how" id="how-it-works" aria-labelledby="faceless-how-title">
          <div className="faceless-section-heading">
            <span className="eyebrow">How it works</span>
            <h2 id="faceless-how-title">From voice-over to visual sequence in three steps.</h2>
          </div>
          <div className="faceless-step-grid">
            <StepCard
              number={1}
              title="Start with the story"
              text="Bring in a voice-over, script or idea. Autobroll uses the spoken or written story as the foundation for the visual structure."
            />
            <StepCard
              number={2}
              title="Let AI Director build scenes"
              text="The video is broken into scenes and Autobroll creates visual directions for the moments that need imagery."
            />
            <StepCard
              number={3}
              title="Direct the changes"
              text="Select a scene and describe what should change. Refine prompts, add references, regenerate visuals and continue until the sequence feels right."
            />
          </div>
        </section>

        <section className="faceless-director" id="ai-director" aria-labelledby="faceless-director-title">
          <div className="faceless-director__copy">
            <span className="eyebrow">AI Director</span>
            <h2 id="faceless-director-title">The interface is a conversation, not a wall of controls.</h2>
            <p>
              Instead of hunting through menus, describe the result you want in natural language. AI Director can
              work on the selected scene, update its visual direction and continue the generation workflow from there.
            </p>
            <div className="faceless-prompt-list" aria-label="Examples of instructions for AI Director">
              <PromptExample label="Change the visual">Make this scene feel colder and more cinematic.</PromptExample>
              <PromptExample label="Change the subject">Use a skier walking toward camera in the mountains.</PromptExample>
              <PromptExample label="Change the scene">Replace this shot with a wide aerial view before the close-up.</PromptExample>
            </div>
          </div>
          <div className="faceless-director__visual glass-shell">
            <div className="faceless-chat-mock">
              <div className="faceless-chat-mock__system"><SparkIcon /> AI Director</div>
              <div className="faceless-chat-mock__message faceless-chat-mock__message--user">
                Make scene 13 more cinematic and keep the snowy mountain setting.
              </div>
              <div className="faceless-chat-mock__message faceless-chat-mock__message--ai">
                I’ll keep the location, push the camera closer to the skier and use a more dramatic mountain composition.
              </div>
              <div className="faceless-chat-mock__result"><i /> Scene direction updated</div>
            </div>
          </div>
        </section>

        <section className="faceless-scenes" id="scenes" aria-labelledby="faceless-scenes-title">
          <div className="faceless-section-heading faceless-section-heading--center">
            <span className="eyebrow">Scene-level control</span>
            <h2 id="faceless-scenes-title">Generate the whole story. Still control the individual scene.</h2>
            <p>
              Automation does not have to mean losing precision. The scene strip keeps the video broken into
              understandable pieces so you can work on exactly the moment that needs attention.
            </p>
          </div>

          <div className="faceless-scene-grid">
            <article className="faceless-scene-card glass-shell">
              <span>01</span>
              <h3>Edit the visual prompt</h3>
              <p>Inspect or change the description that drives the generated visual for a selected scene.</p>
            </article>
            <article className="faceless-scene-card glass-shell">
              <span>02</span>
              <h3>Add a reference image</h3>
              <p>Guide the scene with a visual reference when you need more control over subject, mood or composition.</p>
            </article>
            <article className="faceless-scene-card glass-shell">
              <span>03</span>
              <h3>Regenerate only what changed</h3>
              <p>Work on one scene without rebuilding the entire video every time you want a different visual direction.</p>
            </article>
            <article className="faceless-scene-card glass-shell">
              <span>04</span>
              <h3>Keep the story in view</h3>
              <p>Use the scene strip to move through the sequence and understand how each generated shot fits the narration.</p>
            </article>
          </div>
        </section>

        <section className="faceless-workspace" aria-labelledby="faceless-workspace-title">
          <div className="faceless-workspace__copy">
            <span className="eyebrow">Built around the finished video</span>
            <h2 id="faceless-workspace-title">Voice, visuals, scenes and direction in one workspace.</h2>
            <p>
              The Faceless workspace keeps the voice-over, AI Director, generated scene, visual prompt and scene strip
              together. You can understand what the system is doing without jumping between separate generation tools.
            </p>
            <div className="faceless-workspace__pills">
              <span>Voice-over</span>
              <span>AI Director</span>
              <span>Generated scenes</span>
              <span>Visual prompts</span>
              <span>Reference images</span>
              <span>Scene strip</span>
            </div>
          </div>
          <img
            className="faceless-workspace__image"
            src={FACELESS_UI_URL}
            alt="Autobroll Faceless interface with voice-over, AI Director, scene generation controls and scene strip"
            loading="lazy"
            decoding="async"
          />
        </section>

        <section className="faceless-use-cases" aria-labelledby="faceless-use-cases-title">
          <div className="faceless-section-heading faceless-section-heading--center">
            <span className="eyebrow">Create without filming yourself</span>
            <h2 id="faceless-use-cases-title">A faceless workflow for stories that need visuals, not a talking head.</h2>
          </div>
          <div className="faceless-use-case-grid">
            <article><strong>Storytelling</strong><p>Turn narration into a sequence of generated scenes that follows the story.</p></article>
            <article><strong>Educational videos</strong><p>Visualize concepts and examples without recording a presenter for every section.</p></article>
            <article><strong>Video essays</strong><p>Build visual coverage around a longer voice-led argument or explanation.</p></article>
            <article><strong>Creator workflows</strong><p>Create more formats without needing a new shoot every time you want to publish.</p></article>
          </div>
        </section>

        <section className="faceless-faq" id="faq" aria-labelledby="faceless-faq-title">
          <div className="faceless-faq__heading">
            <span className="eyebrow">Faceless video FAQ</span>
            <h2 id="faceless-faq-title">Questions about creating with AI Director.</h2>
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

        <section className="final-cta faceless-final-cta" aria-labelledby="faceless-final-title">
          <div className="final-cta__glow" aria-hidden="true" />
          <span className="eyebrow">Direct the video</span>
          <h2 id="faceless-final-title">Start with an idea.<br /><span className="text-gradient">Tell Autobroll what happens next.</span></h2>
          <p>Build a faceless video scene by scene, then refine the result with AI Director until it matches your direction.</p>
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
