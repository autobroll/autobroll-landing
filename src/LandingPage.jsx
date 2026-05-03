import { useEffect, useState } from "react";
import AmbientBackground from "./components/AmbientBackground";
import DemoStrip from "./components/DemoStrip";
import PremiumNavbar from "./components/PremiumNavbar";
import VideoGallery from "./components/VideoGallery";
import {
  demoHighlights,
  facelessIntro,
  facelessPanels,
  galleryCards,
  howItWorksIntro,
  navLinks,
  videoCamSteps,
} from "./data/landingContent";

const DEFAULT_HASH = "#showcase";
const LANDING_PAGE_TITLE = "Autobroll - Premium AI Video Editing";
const FAVICON_HREF = "/autobroll-icon.png";
const ALLOWED_HASHES = new Set(["#showcase", "#how-it-works", "#about"]);

const aboutAudience = ["Creators", "Editors", "Teams"];
const aboutValues = [
  "Speed",
  "Clarity",
  "Premium output",
  "Automatic motion design",
];

function getCurrentHash() {
  if (typeof window === "undefined") return DEFAULT_HASH;

  const { hash } = window.location;
  return ALLOWED_HASHES.has(hash) ? hash : DEFAULT_HASH;
}

function HowItWorksPage() {
  return (
    <section className="how-works-page" aria-labelledby="how-it-works-title">
      <div className="how-works-intro glass-shell">
        <div className="how-works-intro__copy">
          <span className="eyebrow-pill">{howItWorksIntro.eyebrow}</span>
          <h1 id="how-it-works-title">{howItWorksIntro.title}</h1>
          <p>{howItWorksIntro.text}</p>
        </div>
      </div>

      <div className="how-works-group">
        <div className="how-works-group__header">
          <span className="eyebrow">VideoCam pipeline</span>
          <h2>From captions to export in three clear steps.</h2>
        </div>

        <div className="how-panels-stack">
          {videoCamSteps.map((item) => (
            <article key={item.id} className="how-panel glass-shell">
              <img
                className="how-panel__image"
                src={item.imageUrl}
                alt={item.title}
                loading="lazy"
                decoding="async"
              />
              <div className="how-panel__overlay" aria-hidden="true" />
              <div className="how-panel__content">
                <span className="how-panel__step">{item.step}</span>
                <span className="eyebrow">{item.eyebrow}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="how-works-group how-works-group--faceless">
        <div className="how-works-group__header">
          <span className="eyebrow">{facelessIntro.eyebrow}</span>
          <h2>{facelessIntro.title}</h2>
          <p>{facelessIntro.text}</p>
        </div>

        <div className="how-panels-stack how-panels-stack--faceless">
          {facelessPanels.map((item) => (
            <article
              key={item.id}
              className="how-panel how-panel--faceless glass-shell"
            >
              <img
                className="how-panel__image"
                src={item.imageUrl}
                alt={item.title}
                loading="lazy"
                decoding="async"
              />
              <div className="how-panel__overlay" aria-hidden="true" />
              <div className="how-panel__content">
                <span className="eyebrow">{item.eyebrow}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutPage() {
  return (
    <section className="about-section" aria-labelledby="about-title">
      <div className="about-hero glass-shell">
        <div className="about-hero__copy">
          <span className="eyebrow-pill">About Autobroll</span>
          <h1 id="about-title">
            Built to make video editing faster, cleaner and more premium.
          </h1>
          <div className="about-copy-stack">
            <p>
              Autobroll helps creators turn raw material into polished content
              without relying on slow, fragmented workflows.
            </p>
            <p>
              From captions and visuals to faceless creation and motion design,
              the platform is built to simplify the parts of editing that
              usually take the most time.
            </p>
            <p>
              For many creators, motion design is still a major bottleneck. It
              adds quality, rhythm and impact, but it also demands time,
              technical skill and constant manual work. Autobroll is designed to
              remove that friction by making premium visual editing faster and
              more accessible.
            </p>
            <p>
              The result is a workflow built for creators who want content that
              looks dynamic, clean and high-end — without needing to be motion
              design experts.
            </p>
          </div>
        </div>
      </div>

      <div className="about-grid">
        <article className="about-card glass-shell">
          <span className="eyebrow">Built for</span>
          <h2>Who Autobroll is made for</h2>
          <div className="about-pill-grid">
            {aboutAudience.map((item) => (
              <span key={item} className="about-pill">
                {item}
              </span>
            ))}
          </div>
        </article>

        <article className="about-card glass-shell">
          <span className="eyebrow">Why Autobroll</span>
          <h2>What creators want more of</h2>
          <div className="about-pill-grid">
            {aboutValues.map((item) => (
              <span key={item} className="about-pill about-pill--accent">
                {item}
              </span>
            ))}
          </div>
        </article>
      </div>

      <article className="about-contact glass-shell">
        <div>
          <span className="eyebrow">Contact</span>
          <h2>Get in touch</h2>
          <p>
            Questions, feedback or partnership ideas? Reach out directly and we
            will get back to you.
          </p>
        </div>
        <a className="about-contact__link" href="mailto:contact@autobroll.info">
          contact@autobroll.info
        </a>
      </article>
    </section>
  );
}

export default function LandingPage() {
  const [activeHash, setActiveHash] = useState(getCurrentHash);

  useEffect(() => {
    document.title = LANDING_PAGE_TITLE;

    let favicon = document.querySelector("link[rel='icon']");

    if (!favicon) {
      favicon = document.createElement("link");
      favicon.setAttribute("rel", "icon");
      document.head.appendChild(favicon);
    }

    favicon.setAttribute("type", "image/png");
    favicon.setAttribute("href", FAVICON_HREF);
  }, []);

  useEffect(() => {
    const syncHash = () => {
      const nextHash = getCurrentHash();
      setActiveHash(nextHash);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (!ALLOWED_HASHES.has(window.location.hash)) {
      window.history.replaceState(null, "", DEFAULT_HASH);
    }

    window.addEventListener("hashchange", syncHash);

    return () => {
      window.removeEventListener("hashchange", syncHash);
    };
  }, []);

  const renderCurrentPage = () => {
    if (activeHash === "#how-it-works") {
      return <HowItWorksPage />;
    }

    if (activeHash === "#about") {
      return <AboutPage />;
    }

    return (
      <div className="main-column">
        <DemoStrip items={demoHighlights} />
        <VideoGallery cards={galleryCards} />
      </div>
    );
  };

  return (
    <div className="page-shell" id="top">
      <AmbientBackground />
      <PremiumNavbar links={navLinks} activeHref={activeHash} />

      <main className="page-content">{renderCurrentPage()}</main>
    </div>
  );
}
