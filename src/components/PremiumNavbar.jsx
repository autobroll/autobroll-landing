import { useEffect, useState } from "react";
import "../styles/language-switch.css";
import { APP_URL } from "../data/landingContent";
import { useLanguage } from "../i18n/LanguageProvider";

const AUTOBROLL_LOGO_URL = "/AutoBroll%20blanc%20alpha.png";

export default function PremiumNavbar({ links, brandHref = "#top" }) {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="site-header">
      <div className="navbar-shell">
        <a
          className="brand-mark"
          href={brandHref}
          aria-label="Autobroll home"
          onClick={closeMenu}
        >
          <span className="brand-mark__logo-wrap" aria-hidden="true">
            <img
              className="brand-mark__logo"
              src={AUTOBROLL_LOGO_URL}
              alt=""
              loading="eager"
              decoding="async"
            />
          </span>
          <span className="brand-mark__text">Autobroll</span>
        </a>

        <nav className="nav-links nav-links--desktop" aria-label="Primary navigation">
          {links.map((link) => (
            <a key={link.label} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="navbar-actions">
          <div className="language-switch" role="group" aria-label={language === "fr" ? "Langue du site" : "Website language"} data-no-translate>
            <button type="button" lang="en" className={`language-switch__option${language === "en" ? " is-active" : ""}`} aria-pressed={language === "en"} onClick={() => setLanguage("en")}>EN</button>
            <span className="language-switch__separator" aria-hidden="true" />
            <button type="button" lang="fr" className={`language-switch__option${language === "fr" ? " is-active" : ""}`} aria-pressed={language === "fr"} onClick={() => setLanguage("fr")}>FR</button>
          </div>
          <a href={APP_URL} className="header-login">
            Log in
          </a>
          <a href={APP_URL} className="button button--primary button--nav">
            Start creating
          </a>
          <button
            className="menu-toggle"
            type="button"
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsOpen((current) => !current)}
          >
            <span />
            <span />
          </button>
        </div>

        <nav
          className={`mobile-menu${isOpen ? " mobile-menu--open" : ""}`}
          id="mobile-navigation"
          aria-label="Mobile navigation"
        >
          {links.map((link) => (
            <a key={link.label} href={link.href} onClick={closeMenu}>
              {link.label}
              <span aria-hidden="true">↗</span>
            </a>
          ))}
          <a href={APP_URL} onClick={closeMenu}>
            Log in
            <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
