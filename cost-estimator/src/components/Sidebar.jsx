import { NavLink } from 'react-router-dom';

const MAIN_LINKS = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Projects', to: '/projects' }
];

const PROJECT_LINKS = [
  { label: 'Overview', to: '/overview' },
  { label: 'Estimate', to: '/estimate' },
  { label: 'Team', to: '/team' }
];

function navClass({ isActive }) {
  return isActive ? 'nav-link active' : 'nav-link';
}

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        ProjectHub
      </div>

      <nav className="sidebar-nav">
        {MAIN_LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={navClass}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-section-label">
        Project
      </div>

      <nav className="sidebar-nav">
        {PROJECT_LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end
            className={navClass}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;