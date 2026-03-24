export default function SidebarRail({ items }) {
  return (
    <aside className="sidebar-rail glass-shell" aria-label="Secondary navigation">
      <div className="sidebar-rail__group">
        {items.map((item, index) => (
          <a
            key={item.label}
            href={item.href}
            className={`sidebar-item${index === 0 ? ' sidebar-item--active' : ''}`}
          >
            <span className="sidebar-item__icon">{item.shortLabel}</span>
            <span className="sidebar-item__label">{item.label}</span>
          </a>
        ))}
      </div>

      <div className="sidebar-rail__footer">
        <a href="#help" className="sidebar-footer-link">
          Help
        </a>
        <a href="#updates" className="sidebar-footer-link">
          Updates
        </a>
      </div>
    </aside>
  );
}
