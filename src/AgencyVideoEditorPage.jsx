import { useEffect } from "react";
import AmbientBackground from "./components/AmbientBackground";
import PremiumNavbar from "./components/PremiumNavbar";
import { APP_URL } from "./data/landingContent";

const CONTACT_EMAIL = "contact@autobroll.info";

const PAGE_NAV = [
  { label: "Workflow", href: "#workflow" },
  { label: "Presets", href: "#presets" },
  { label: "Features", href: "#features" },
  { label: "FAQ", href: "#faq" },
];

const FAQS = [
  {
    question: "What is an AI video editor for agencies?",
    answer:
      "An AI video editor for agencies helps reduce repetitive editing work across a high-volume client workflow. Autobroll can create a first pass with B-roll, premium captions, Punch Text, smart zooms and motion design, while editors keep control of the final result.",
  },
  {
    question: "Can an agency keep a different style for each client?",
    answer:
      "Yes. Autobroll presets let you save caption and Punch Text styling so a client-specific visual system can be reused on future projects without rebuilding the same settings from scratch.",
  },
  {
    question: "Does Autobroll fully replace the editor?",
    answer:
      "No. Autobroll is designed to accelerate the first pass and repetitive parts of the workflow. Editors can review, replace, remove and refine the generated choices before export.",
  },
  {
    question: "What parts of an edit can Autobroll automate?",
    answer:
      "Depending on the workflow, Autobroll can help with context-aware B-roll, premium captions, Punch Text, smart camera zooms and motion design, with separate tools for faceless scene creation.",
  },
  {
    question: "Is Autobroll useful for short-form client content?",
    answer:
      "Yes. The workflow is designed around fast-moving video formats such as UGC, talking-head content, ads, social clips and other short-form client deliverables.",
  },
  {
    question: "Can agencies try Autobroll before committing to a paid plan?",
    answer:
      "Yes. Agencies can start with the free plan to test the workflow and decide where Autobroll fits into their editing process before increasing usage.",
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
    <article className="agency-step-card">
      <span className="agency-step-card__number">0{number}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function WorkflowPreview() {
  return (
    <div className="agency-workflow-preview glass-shell" aria-label="Agency editing workflow preview">
      <div className="agency-workflow-preview__topbar">
        <div>
          <span className="eyebrow">Agency workspace</span>
          <strong>Client edit queue</strong>
        </div>
        <span className="agency-live-status"><i /> Workflow ready</span>
      </div>

      <div className="agency-workflow-preview__body">
        <div className="agency-client-stack">
          <article className="agency-client-card agency-client-card--active">
            <div className="agency-client-card__head">
              <span>CLIENT 01</span>
              <b>In edit</b>
            </div>
            <strong>Talking-head campaign</strong>
            <small>Preset · Clean Social</small>
            <div className="agency-progress"><i style={{ width: "84%" }} /></div>
            <div className="agency-client-card__tags">
              <span>B-roll</span><span>Captions</span><span>Punch</span>
            </div>
          </article>

          <article className="agency-client-card">
            <div className="agency-client-card__head">
              <span>CLIENT 02</span>
              <b>Ready</b>
            </div>
            <strong>UGC ad batch</strong>
            <small>Preset · Bold Product</small>
            <div className="agency-progress"><i style={{ width: "100%" }} /></div>
            <div className="agency-client-card__tags">
              <span>Captions</span><span>Zooms</span><span>Motion</span>
            </div>
          </article>

          <article className="agency-client-card">
            <div className="agency-client-card__head">
              <span>CLIENT 03</span>
              <b>Queued</b>
            </div>
            <strong>Founder clips</strong>
            <small>Preset · Minimal Brand</small>
            <div className="agency-progress"><i style={{ width: "36%" }} /></div>
            <div className="agency-client-card__tags">
              <span>B-roll</span><span>Captions</span>
            </div>
          </article>
        </div>

        <div className="agency-edit-panel">
          <div className="agency-edit-panel__header">
            <span>Autobroll first pass</span>
            <strong>Talking-head campaign</strong>
          </div>
          <div className="agency-video-frame">
            <div className="agency-video-frame__subject" aria-hidden="true">
              <span />
              <i />
            </div>
            <div className="agency-video-frame__caption">YOUR NEXT <em>CLIENT</em></div>
            <div className="agency-video-frame__punch">MOVE FASTER</div>
          </div>
          <div className="agency-edit-checks">
            <span><CheckIcon /> B-roll placed</span>
            <span><CheckIcon /> Caption preset applied</span>
            <span><CheckIcon /> Smart zooms added</span>
            <span><CheckIcon /> Ready for editor review</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="site-footer agency-footer">
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
          <a href="#workflow">Workflow</a>
          <a href="#presets">Presets</a>
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

export default function AgencyVideoEditorPage() {
  useEffect(() => {
    document.title = "AI Video Editor for Agencies | Autobroll";
  }, []);

  return (
    <div className="page-shell agency-page">
      <AmbientBackground />
      <PremiumNavbar links={PAGE_NAV} brandHref="/" />

      <main className="page-content agency-page__content">
        <section className="agency-hero" id="top" aria-labelledby="agency-hero-title">
          <div className="agency-hero__copy">
            <div className="hero-kicker"><i /> Built for client volume, not template volume.</div>
            <h1 id="agency-hero-title">
              AI Video Editor for Agencies
              <span className="text-gradient"> that keeps the editor in control.</span>
            </h1>
            <p>
              Produce more client videos without rebuilding the same edit every time. Autobroll creates a fast first pass
              with B-roll, premium captions, Punch Text, smart zooms and motion design — then your team refines the final cut.
            </p>
            <div className="hero-actions">
              <a href={APP_URL} className="button button--primary button--large">
                Try Autobroll for your agency <ArrowIcon />
              </a>
              <a href="#workflow" className="button button--ghost button--large">See the workflow</a>
            </div>
            <div className="hero-reassurance" aria-label="Autobroll agency benefits">
              <span><CheckIcon /> Reusable client presets</span>
              <span><CheckIcon /> Faster first pass</span>
              <span><CheckIcon /> Full creative control</span>
            </div>
          </div>

          <WorkflowPreview />
        </section>

        <section className="agency-intro" aria-labelledby="agency-intro-title">
          <span className="eyebrow">Scale the workflow, not the sameness</span>
          <h2 id="agency-intro-title">Every client can keep their own look. Your team just stops rebuilding it from zero.</h2>
          <p>
            Agency editing gets repetitive long before it gets creative: recreate the caption style, search for B-roll,
            add the same camera movement, rebuild text hierarchy and repeat it across the next batch. Autobroll handles more
            of that setup while leaving the final decisions with the editor.
          </p>
        </section>

        <section className="agency-how" id="workflow" aria-labelledby="agency-workflow-title">
          <div className="agency-section-heading">
            <span className="eyebrow">Agency workflow</span>
            <h2 id="agency-workflow-title">From raw client footage to an editable first pass in three steps.</h2>
          </div>
          <div className="agency-step-grid">
            <StepCard
              number={1}
              title="Bring in the footage"
              text="Start with the client video and let Autobroll analyze the spoken content, timing and visual opportunities in the edit."
            />
            <StepCard
              number={2}
              title="Apply the client system"
              text="Reuse the caption and Punch Text preset for that client, then let Autobroll build the first visual pass around it."
            />
            <StepCard
              number={3}
              title="Review, refine and export"
              text="Your editor keeps the final say: replace visuals, adjust text, change timing and polish the result before delivery."
            />
          </div>
        </section>

        <section className="agency-presets" id="presets" aria-labelledby="agency-presets-title">
          <div className="agency-presets__visual glass-shell" aria-hidden="true">
            <div className="agency-preset-column">
              <span className="eyebrow">Client presets</span>
              <article className="agency-preset-card agency-preset-card--active">
                <div><i /> Client 01</div>
                <strong>Clean Social</strong>
                <small>Caption + Punch system</small>
              </article>
              <article className="agency-preset-card">
                <div><i /> Client 02</div>
                <strong>Bold Product</strong>
                <small>Caption + Punch system</small>
              </article>
              <article className="agency-preset-card">
                <div><i /> Client 03</div>
                <strong>Minimal Brand</strong>
                <small>Caption + Punch system</small>
              </article>
            </div>
            <div className="agency-preset-preview">
              <span>PRESET APPLIED</span>
              <strong>One client.<br /><em>One visual system.</em></strong>
              <p>Typography · Colors · Punch hierarchy · Spacing</p>
            </div>
          </div>

          <div className="agency-presets__copy">
            <span className="eyebrow">My Presets</span>
            <h2 id="agency-presets-title">Save the brand once. Reuse it on the next client video.</h2>
            <p>
              Store caption and Punch Text styling as a reusable preset for each client. Instead of recreating fonts,
              colors and hierarchy every time, your team starts the next project with the visual system already in place.
            </p>
            <ul className="agency-check-list">
              <li><CheckIcon /> Keep client styles separated</li>
              <li><CheckIcon /> Apply saved styling to new projects</li>
              <li><CheckIcon /> Update the preset when the brand evolves</li>
            </ul>
          </div>
        </section>

        <section className="agency-features" id="features" aria-labelledby="agency-features-title">
          <div className="agency-section-heading agency-section-heading--center">
            <span className="eyebrow">One workflow, multiple editing layers</span>
            <h2 id="agency-features-title">Automate the repeatable parts without flattening every edit into a template.</h2>
            <p>Use the layers that fit the client, then keep editing the result instead of accepting a locked output.</p>
          </div>
          <div className="agency-feature-grid">
            <article><SparkIcon /><strong>Context-aware B-roll</strong><p>Place supporting visuals around the moments where the spoken content actually calls for them.</p></article>
            <article><SparkIcon /><strong>Premium Captions</strong><p>Build readable animated captions with a visual system that can be reused across client projects.</p></article>
            <article><SparkIcon /><strong>Punch Text</strong><p>Give hooks, claims, CTAs and important phrases a stronger layer of animated emphasis.</p></article>
            <article><SparkIcon /><strong>Smart Zooms</strong><p>Add camera movement to talking-head content without manually keyframing every beat from scratch.</p></article>
            <article><SparkIcon /><strong>Motion Design</strong><p>Bring richer visual moments into the edit when captions and B-roll are not enough.</p></article>
            <article><SparkIcon /><strong>Faceless Creation</strong><p>Use a separate conversational workflow to generate and refine scenes from a script, voice-over or idea.</p></article>
          </div>
        </section>

        <section className="agency-control" aria-labelledby="agency-control-title">
          <div className="agency-control__copy">
            <span className="eyebrow">AI first pass. Human final cut.</span>
            <h2 id="agency-control-title">Your editors do not lose the timeline. They lose the repetitive setup.</h2>
            <p>
              Autobroll is built to produce an editable starting point, not a black-box final video. The team can still
              replace B-roll, change caption styling, remove a zoom, adjust timing or ignore an AI choice entirely.
            </p>
          </div>
          <div className="agency-control__flow glass-shell" aria-label="Autobroll agency editing flow">
            <div><span>01</span><strong>AI first pass</strong><small>Analyze + assemble</small></div>
            <i aria-hidden="true">→</i>
            <div><span>02</span><strong>Editor review</strong><small>Refine the choices</small></div>
            <i aria-hidden="true">→</i>
            <div><span>03</span><strong>Client-ready cut</strong><small>Export with control</small></div>
          </div>
        </section>

        <section className="agency-use-cases" aria-labelledby="agency-use-cases-title">
          <div className="agency-section-heading agency-section-heading--center">
            <span className="eyebrow">Built around agency deliverables</span>
            <h2 id="agency-use-cases-title">A faster editing layer for the content your clients already ask for.</h2>
          </div>
          <div className="agency-use-case-grid">
            <article><strong>UGC &amp; paid social</strong><p>Move faster through hooks, captions, product moments, B-roll and short-form ad variations.</p></article>
            <article><strong>Talking-head content</strong><p>Turn raw speaker footage into a richer first pass with captions, visual cutaways and camera movement.</p></article>
            <article><strong>Founder &amp; personal brand clips</strong><p>Reuse a recognizable text system while keeping each edit responsive to what is actually being said.</p></article>
            <article><strong>Recurring client batches</strong><p>Carry the visual system from one project to the next instead of recreating the same styling every week.</p></article>
          </div>
        </section>

        <section className="agency-faq" id="faq" aria-labelledby="agency-faq-title">
          <div className="agency-faq__heading">
            <span className="eyebrow">Questions, answered</span>
            <h2 id="agency-faq-title">Before you put Autobroll into the agency workflow.</h2>
            <p>Need something specific? <a href={`mailto:${CONTACT_EMAIL}`}>Talk to us directly.</a></p>
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

        <section className="final-cta agency-final-cta" aria-labelledby="agency-final-cta-title">
          <div className="final-cta__glow" aria-hidden="true" />
          <span className="eyebrow">More client videos. Less repeated setup.</span>
          <h2 id="agency-final-cta-title">Scale the edit queue.<br /><span className="text-gradient">Keep the creative control.</span></h2>
          <p>Build the first pass in Autobroll, then let your editors do the part that actually needs an editor.</p>
          <div className="hero-actions hero-actions--centered">
            <a href={APP_URL} className="button button--primary button--large">Start creating <ArrowIcon /></a>
            <a href={`mailto:${CONTACT_EMAIL}`} className="button button--ghost button--large">Talk to us</a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
