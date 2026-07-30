type SidenavProps = {
  expanded: boolean;
  closeSidebar: () => void;
};

function Sidenav({ expanded, closeSidebar }: SidenavProps) {
  return (
    <nav className="sidenav" data-expanded={expanded} inert={!expanded}>

      <div className="sidenav-header">
        <button className="header-btn" onClick={closeSidebar}>
          <svg xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24">
            <path d="m15 18-6-6 6-6"/>
          </svg>
        </button>
      </div>

      <div className="sidenav-links">
        <a href="#" className="nav-btn">
          <svg xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24">
            <rect width="7" height="9" x="3" y="3" rx="1"/>
            <rect width="7" height="5" x="14" y="3" rx="1"/>
            <rect width="7" height="9" x="14" y="12" rx="1"/>
            <rect width="7" height="5" x="3" y="16" rx="1"/>
          </svg>
          Dashboard
        </a>
        <a href="#" className="nav-btn">
          <svg xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24">
            <path d="M8 2v3"/>
            <path d="M16 2v3"/>
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <path d="M3 9h18"/>
            <path d="M8 13h.01"/>
            <path d="M12 13h.01"/>
            <path d="M16 13h.01"/>
            <path d="M8 17h.01"/>
            <path d="M12 17h.01"/>
            <path d="M16 17h.01"/>
          </svg>
          Calendar
        </a>
      </div>

    </nav>
  )
}

export default Sidenav