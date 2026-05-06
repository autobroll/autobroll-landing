import { APP_URL } from "../data/landingContent";

const AUTOBROLL_LOGO_URL =
  'https://pub-29017a168d3a4edc87594d9ff9c1f185.r2.dev/logo/AutoBroll%206%201500x1500.png';

export default function PremiumNavbar({ links, activeHref = '#showcase' }) {
  return (
    <header className="site-header">
      <div className="glass-shell navbar-shell">
        <div className="navbar-shell__left">
          <a className="brand-mark" href="#showcase" aria-label="Autobroll home">
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
        </div>

        <nav className="nav-links" aria-label="Primary navigation">
          {links.map((link) => {
            const isActive = link.href === activeHref;
            return (
              <a
                key={link.label}
                href={link.href}
                className={`nav-link${isActive ? ' nav-link--active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="navbar-shell__right">
          <a href={APP_URL} className="button button--primary button--nav">
            Log In
          </a>
        </div>
      </div>
    </header>
  );
}
