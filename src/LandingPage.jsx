import { useEffect, useRef } from "react";
import AmbientBackground from "./components/AmbientBackground";
import PremiumNavbar from "./components/PremiumNavbar";
import VideoGallery from "./components/VideoGallery";
import {
  APP_URL,
  facelessPanels,
  faqs,
  galleryCards,
  navLinks,
  pricingPlans,
  proofMetrics,
  testimonials,
  trustPlaceholders,
  videoCamSteps,
} from "./data/landingContent";

const CONTACT_EMAIL = "contact@autobroll.info";
const SHOW_TRUST_STRIP = false;
const SHOW_SOCIAL_PROOF_SECTIONS = false;

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

function SectionIntro({ eyebrow, title, text, align = "left", aside }) {
  return (
    <div className={`section-intro section-intro--${align}`}>
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      {text ? <p>{text}</p> : aside}
    </div>
  );
}

function HeroPreview() {
  const videosRef = useRef([]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPlayback = () => {
      videosRef.current.forEach((video) => {
        if (!video) return;
        if (mediaQuery.matches) video.pause();
        else video.play().catch(() => {});
      });
    };

    syncPlayback();
    mediaQuery.addEventListener?.("change", syncPlayback);
    return () => mediaQuery.removeEventListener?.("change", syncPlayback);
  }, []);

  const featured = galleryCards[0];

  return (
    <div className="hero-preview glass-shell" aria-label="Autobroll before and after preview">
      <div className="hero-preview__toolbar">
        <div className="window-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <span>Autobroll workspace</span>
        <span className="preview-status"><i /> Export ready</span>
      </div>

      <div className="hero-preview__canvas">
        <div className="hero-preview__sidecopy">
          <span className="eyebrow">Live transformation</span>
          <strong>Raw in.<br />Polished out.</strong>
          <p>
            Autobroll watches, understands and edits your video while you do
            literally anything else.
          </p>
          <div className="preview-tool-list" aria-label="Applied Autobroll features">
            <span><i /> Captions &amp; SFX</span>
            <span><i /> B-roll and Motion</span>
            <span><i /> Faceless video</span>
          </div>
        </div>

        <div className="hero-preview__compare">
          <div className="hero-preview__video-wrap">
            <span className="compare-label">Before</span>
            <video
              ref={(node) => { videosRef.current[0] = node; }}
              src={featured.beforeVideoUrl}
              muted
              loop
              autoPlay
              playsInline
              preload="metadata"
              aria-label="Raw video before Autobroll editing"
            />
          </div>
          <div className="hero-preview__video-wrap hero-preview__video-wrap--after">
            <span className="compare-label compare-label--accent">After</span>
            <video
              ref={(node) => { videosRef.current[1] = node; }}
              src={featured.afterVideoUrl}
              muted
              loop
              autoPlay
              playsInline
              preload="metadata"
              aria-label="Polished video after Autobroll editing"
            />
          </div>
        </div>
      </div>

      <div className="hero-preview__timeline" aria-hidden="true">
        <span className="timeline-play">▶</span>
        <div className="timeline-track"><i /></div>
        <span>00:18 / 00:32</span>
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <section
      className={`hero-section${SHOW_TRUST_STRIP ? "" : " hero-section--trust-hidden"}`}
      id="top"
      aria-labelledby="hero-title"
    >
      <div className="hero-copy">
        <div className="hero-kicker"><i /> Meet the AI Director that actually edits.</div>
        <h1 id="hero-title">
          Your video editor <span className="text-gradient">won’t like this.</span>
        </h1>
        <p className="hero-copy__lead">
          Drop in your footage. Autobroll watches it, understands what matters,
          and knows exactly when to add captions, B-rolls, Punch Text, smart
          zooms and motion design.
        </p>
        <div className="hero-actions">
          <a href={APP_URL} className="button button--primary button--large">
            Start creating <ArrowIcon />
          </a>
          <a href="#showcase" className="button button--ghost button--large">
            Watch Autobroll work
          </a>
        </div>
        <div className="hero-reassurance" aria-label="Product benefits">
          <span><CheckIcon /> No timeline required</span>
          <span><CheckIcon /> Full creative control</span>
          <span><CheckIcon /> Ready to export</span>
        </div>
      </div>

      <HeroPreview />
    </section>
  );
}

function TrustStrip() {
  return (
    <section className="trust-strip" aria-label="Customer proof placeholders">
      <p>Trusted by fast-moving creators and teams</p>
      <div className="trust-logos">
        {trustPlaceholders.map((logo) => <span key={logo}>{logo}</span>)}
      </div>
      <small>Logo placeholders</small>
    </section>
  );
}

function ShowcaseSection() {
  return (
    <section className="landing-section showcase-section" id="showcase" aria-labelledby="showcase-title">
      <SectionIntro
        eyebrow="Real transformations"
        title={<span id="showcase-title">The difference should speak for itself.</span>}
        text="Compare raw footage with the finished result. Replace or reorder these examples anytime from the content file."
      />
      <VideoGallery cards={galleryCards} />
    </section>
  );
}

function ProcessSection() {
  return (
    <section className="landing-section" id="how-it-works" aria-labelledby="process-title">
      <SectionIntro
        eyebrow="How it works"
        title={<span id="process-title">From upload to export in three focused steps.</span>}
        text="A clear workflow keeps the first edit fast and the final decisions yours."
      />

      <div className="process-list">
        {videoCamSteps.map((step, index) => (
          <article className="process-card" key={step.id}>
            <div className="process-card__media">
              <img src={step.imageUrl} alt="" loading="lazy" decoding="async" />
              <span>Step {step.step}</span>
            </div>
            <div className="process-card__copy">
              <span className="process-card__number">0{index + 1}</span>
              <div>
                <span className="eyebrow">{step.eyebrow}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function CreationModes() {
  return (
    <section className="landing-section modes-section" aria-labelledby="modes-title">
      <SectionIntro
        eyebrow="Two creation modes"
        title={<span id="modes-title">Use your footage—or start with only an idea.</span>}
      />

      <div className="mode-grid">
        <article className="mode-card">
          <img src={videoCamSteps[1].imageUrl} alt="Autobroll VideoCam editing workspace" loading="lazy" />
          <div className="mode-card__shade" />
          <div className="mode-card__content">
            <span className="mode-index">01</span>
            <span className="eyebrow">VideoCam</span>
            <h3>Upgrade footage you already have.</h3>
            <p>Start with your recording, then build captions, visuals and motion around the story.</p>
          </div>
        </article>
        <article className="mode-card">
          <img src={facelessPanels[0].imageUrl} alt="Autobroll Faceless creation workspace" loading="lazy" />
          <div className="mode-card__shade" />
          <div className="mode-card__content">
            <span className="mode-index">02</span>
            <span className="eyebrow">Faceless</span>
            <h3>Create without stepping on camera.</h3>
            <p>Shape voice-led ideas into structured, visual-first videos from the Faceless studio.</p>
          </div>
        </article>
      </div>
    </section>
  );
}

function KineticDirectorSection() {
  return (
    <section
      className={`kinetic-section${SHOW_TRUST_STRIP ? "" : " kinetic-section--trust-hidden"}`}
      id="features"
      aria-labelledby="kinetic-title"
    >
      <div className="kinetic-section__copy">
        <span className="eyebrow">The AI Director</span>
        <h2 id="kinetic-title">It sees the story before it builds the edit.</h2>
        <p>
          Autobroll follows the context, rhythm and important moments in your
          footage—then turns that understanding into purposeful editing choices.
        </p>
        <a href="#how-it-works" className="button button--ghost">
          See how it works <ArrowIcon />
        </a>
      </div>

      <div className="kinetic-art" aria-hidden="true">
        <div className="kinetic-art__grid" />
        <svg className="kinetic-emblem" viewBox="0 0 800 800">
          <defs>
            <linearGradient id="kinetic-gold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#fff0bd" />
              <stop offset="0.42" stopColor="#e6bd68" />
              <stop offset="0.74" stopColor="#bd8430" />
              <stop offset="1" stopColor="#f5d99c" />
            </linearGradient>
            <radialGradient id="kinetic-navy" cx="38%" cy="30%" r="76%">
              <stop offset="0" stopColor="#1c2d48" />
              <stop offset="0.52" stopColor="#0f1f36" />
              <stop offset="1" stopColor="#07101e" />
            </radialGradient>
            <filter id="kinetic-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <mask id="kinetic-lashes-mask">
              <rect width="800" height="800" fill="white" />
              <circle cx="400" cy="400" r="306" fill="black" />
            </mask>
          </defs>

          <g className="kinetic-emblem__rosette">
            <g mask="url(#kinetic-lashes-mask)">
              {Array.from({ length: 18 }, (_, index) => (
                <ellipse
                  key={index}
                  cx="400"
                  cy="86"
                  rx="47"
                  ry="88"
                  transform={`rotate(${index * 20} 400 400)`}
                  fill="rgba(230,189,104,.025)"
                  stroke="url(#kinetic-gold)"
                  strokeWidth="4"
                />
              ))}
            </g>
            <circle cx="400" cy="400" r="310" fill="rgba(7,16,30,.24)" stroke="rgba(245,217,156,.34)" strokeWidth="3" />
            <circle cx="400" cy="400" r="299" fill="none" stroke="rgba(255,255,255,.09)" strokeWidth="2" />
          </g>

          <g className="kinetic-emblem__outer-orbit" fill="none">
            <circle cx="400" cy="400" r="276" stroke="url(#kinetic-gold)" strokeWidth="7" filter="url(#kinetic-glow)" />
            <circle cx="400" cy="400" r="261" stroke="rgba(230,189,104,.12)" strokeWidth="17" />
            <circle cx="400" cy="400" r="241" stroke="rgba(245,217,156,.42)" strokeWidth="2.5" strokeDasharray="54 38" />
          </g>

          <g className="kinetic-emblem__inner-orbit" fill="none">
            <circle cx="400" cy="400" r="187" stroke="url(#kinetic-gold)" strokeWidth="6" filter="url(#kinetic-glow)" />
            <circle cx="400" cy="400" r="173" stroke="rgba(230,189,104,.1)" strokeWidth="13" />
            <circle cx="400" cy="400" r="154" stroke="rgba(255,255,255,.2)" strokeWidth="2" strokeDasharray="12 18" />
          </g>

          <g className="kinetic-emblem__eye">
            <circle cx="400" cy="400" r="112" fill="rgba(7,16,30,.2)" stroke="rgba(255,251,236,.9)" strokeWidth="8" filter="url(#kinetic-glow)" />
            <circle cx="400" cy="400" r="96" fill="rgba(7,16,30,.34)" stroke="rgba(230,189,104,.16)" strokeWidth="2" />
            <g className="kinetic-emblem__pupil">
              <circle cx="429" cy="367" r="34" fill="rgba(7,16,30,.46)" stroke="url(#kinetic-gold)" strokeWidth="7" filter="url(#kinetic-glow)" />
              <circle cx="439" cy="355" r="5" fill="#fff6da" opacity="0.88" />
            </g>
          </g>

          <g className="kinetic-emblem__status">
            <circle cx="400" cy="400" r="344" fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="2" strokeDasharray="4 26" />
          </g>
        </svg>
      </div>
    </section>
  );
}

function BreathingWorkflowSection() {
  return (
    <section className="breathing-section" aria-labelledby="breathing-title">
      <div className="breathing-section__copy">
        <span className="eyebrow">Autobroll in motion</span>
        <h2 id="breathing-title">One upload. Every creative layer moves with it.</h2>
      </div>

      <div className="breathing-art" aria-hidden="true">
        <div className="breathing-art__grid" />
        <div className="breathing-horizon" />
        <div className="breathing-lobes">
          {Array.from({ length: 9 }, (_, index) => <i key={index} />)}
        </div>

        <div className="breathing-core">
          <span className="breathing-core__play">▶</span>
          <div className="breathing-core__signal">
            <i /><i /><i /><i /><i />
          </div>
        </div>

        <span className="breathing-tag breathing-tag--captions"><i /> Captions &amp; SFX</span>
        <span className="breathing-tag breathing-tag--visuals"><i /> B-roll &amp; Motion</span>
        <span className="breathing-tag breathing-tag--faceless"><i /> Faceless video</span>
      </div>
    </section>
  );
}

function ProofSection() {
  return (
    <section className="landing-section proof-section" id="results" aria-labelledby="proof-title">
      <div className="proof-heading">
        <span className="eyebrow">Proof at a glance</span>
        <h2 id="proof-title">Replace these placeholders with your strongest verified numbers.</h2>
        <p>This block is ready for real product or customer data before launch.</p>
      </div>
      <div className="metric-grid">
        {proofMetrics.map((metric) => (
          <div className="metric-card" key={metric.label}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="landing-section" aria-labelledby="testimonials-title">
      <SectionIntro
        eyebrow="Customer stories"
        title={<span id="testimonials-title">Let real creators close the trust gap.</span>}
        text="These cards are intentionally written as placeholders. Replace them with verified customer quotes and outcomes."
      />
      <div className="testimonial-grid">
        {testimonials.map((testimonial) => (
          <article className="testimonial-card" key={testimonial.name}>
            <div className="testimonial-card__label">Testimonial placeholder</div>
            <blockquote>“{testimonial.quote}”</blockquote>
            <div className="testimonial-card__person">
              <span className="avatar-placeholder" aria-hidden="true">+</span>
              <div><strong>{testimonial.name}</strong><span>{testimonial.role}</span></div>
              <small>{testimonial.result}</small>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section className="landing-section pricing-section" id="pricing" aria-labelledby="pricing-title">
      <SectionIntro
        eyebrow="Simple pricing"
        title={<span id="pricing-title">Start free. Scale when you’re ready.</span>}
        text="Choose the monthly video capacity that fits your workflow."
        align="center"
      />
      <div className="pricing-grid">
        {pricingPlans.map((plan) => (
          <article className={`pricing-card${plan.featured ? " pricing-card--featured" : ""}`} key={plan.name}>
            {plan.badge ? <span className="pricing-badge">{plan.badge}</span> : null}
            <span className="eyebrow">{plan.name}</span>
            <p className="pricing-card__description">{plan.description}</p>
            <div className="pricing-card__price"><strong>{plan.price}</strong><span>{plan.suffix}</span></div>
            <ul>
              {plan.features.map((feature) => <li key={feature}><CheckIcon /> {feature}</li>)}
            </ul>
            <a href={plan.href || APP_URL} className={`button ${plan.featured ? "button--primary" : "button--ghost"}`}>
              {plan.cta} <ArrowIcon />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section className="landing-section faq-section" id="faq" aria-labelledby="faq-title">
      <div className="faq-heading">
        <span className="eyebrow">Questions, answered</span>
        <h2 id="faq-title">Everything you need before your first edit.</h2>
        <p>Still have a question? <a href={`mailto:${CONTACT_EMAIL}`}>Talk to us directly.</a></p>
      </div>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <details key={faq.question} open={index === 0}>
            <summary><span>{faq.question}</span><i aria-hidden="true" /></summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="final-cta" aria-labelledby="final-cta-title">
      <div className="final-cta__glow" aria-hidden="true" />
      <span className="eyebrow">Your next edit starts here</span>
      <h2 id="final-cta-title">Create fast.<br /><span className="text-gradient">Look premium.</span></h2>
      <p>Move from raw material to polished, publish-ready content in one focused workflow.</p>
      <div className="hero-actions hero-actions--centered">
        <a href={APP_URL} className="button button--primary button--large">Start creating <ArrowIcon /></a>
        <a href={`mailto:${CONTACT_EMAIL}`} className="button button--ghost button--large">Talk to us</a>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer" id="legal-placeholder">
      <div className="site-footer__brand">
        <strong>Autobroll</strong>
        <p>AI-assisted video editing for premium content.</p>
      </div>
      <div className="site-footer__links">
        <div><span>Product</span><a href="#features">Features</a><a href="#showcase">Showcase</a><a href="#pricing">Pricing</a></div>
        <div><span>Company</span><a href={`mailto:${CONTACT_EMAIL}`}>Contact</a><a href="#faq">FAQ</a></div>
        <div><span>Legal</span><a href="#legal-placeholder">Privacy</a><a href="#legal-placeholder">Terms</a></div>
      </div>
      <div className="site-footer__bottom">
        <span>© {new Date().getFullYear()} Autobroll. All rights reserved.</span>
        <span>Built for creators, editors and teams.</span>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  useEffect(() => {
    document.title = "Autobroll — Premium AI Video Editing";
    const scrollTimers = [];

    const scrollToInitialSection = () => {
      const sectionId = window.location.hash.slice(1);
      if (!sectionId) return;

      [120, 1400].forEach((delay) => {
        scrollTimers.push(window.setTimeout(() => {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: "auto" });
        }, delay));
      });
    };

    if (document.readyState === "complete") scrollToInitialSection();
    else window.addEventListener("load", scrollToInitialSection, { once: true });

    return () => {
      window.removeEventListener("load", scrollToInitialSection);
      scrollTimers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  return (
    <div className="page-shell">
      <AmbientBackground />
      <PremiumNavbar links={navLinks} />
      <main className="page-content">
        <HeroSection />
        {SHOW_TRUST_STRIP && <TrustStrip />}
        <KineticDirectorSection />
        <ShowcaseSection />
        <ProcessSection />
        <CreationModes />
        {SHOW_SOCIAL_PROOF_SECTIONS ? (
          <>
            <ProofSection />
            <TestimonialsSection />
          </>
        ) : (
          <BreathingWorkflowSection />
        )}
        <PricingSection />
        <FAQSection />
        <FinalCTA />
      </main>
      <SiteFooter />
    </div>
  );
}
