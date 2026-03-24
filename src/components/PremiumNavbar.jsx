export default function PremiumNavbar({ links, statusText }) {
  return (
    <header className="site-header">
      <div className="glass-shell navbar-shell">
        <div className="navbar-shell__left">
          <a className="brand-mark" href="#top" aria-label="Autobroll home">
            <span className="brand-mark__orb" />
            <span className="brand-mark__text">Autobroll</span>
          </a>
          <span className="navbar-kicker">Premium AI editing</span>
        </div>

        <nav className="nav-links" aria-label="Primary navigation">
          {links.map((link) => (
            <a key={link.label} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="navbar-shell__right">
          <span className="navbar-status">{statusText}</span>
          <a href="#top" className="button button--primary button--nav">
            Log In
          </a>
        </div>
      </div>
    </header>
  );
}
