import { Link } from 'react-router-dom';

import './Sidenav.css';

type SidenavProps = {
  expanded: boolean;
  closeSidebar: () => void;
};

function Sidenav({ expanded, closeSidebar }: SidenavProps) {
  return (
    <nav className='nav-main' data-expanded={expanded}>
      <div className="nav-main__inner">
        <div className='nav-main__header'>
          <span className='nav-main__title'>Budget Planner</span>
          <button className='nav-main__btn' onClick={closeSidebar}>
            <svg xmlns='http://www.w3.org/2000/svg'viewBox='0 0 24 24'>
              <path d='m15 18-6-6 6-6'/>
            </svg>
          </button>
        </div>

        <div className="nav-main__divider"></div>

        <div className='nav-main__links'>
          <Link to='/dashboard' className='nav-main__link'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
              <rect width='7' height='9' x='3' y='3' rx='1'/>
              <rect width='7' height='5' x='14' y='3' rx='1'/>
              <rect width='7' height='9' x='14' y='12' rx='1'/>
              <rect width='7' height='5' x='3' y='16' rx='1'/>
            </svg>
            <span>Dashboard</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Sidenav