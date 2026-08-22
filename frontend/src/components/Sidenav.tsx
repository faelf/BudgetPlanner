import { Link } from 'react-router-dom';

import './Sidenav.css';

type SidenavProps = {
  expanded: boolean;
  closeSidebar: () => void;
};

function Sidenav({ expanded, closeSidebar }: SidenavProps) {
  return (
    <nav className='sidenav' data-expanded={expanded} inert={!expanded}>

      <div className='sidenav__header'>
        <span className='sidenav__title'>Budget Planner</span>
        <button className='sidenav__btn' onClick={closeSidebar}>
          <svg xmlns='http://www.w3.org/2000/svg'viewBox='0 0 24 24'>
            <path d='m15 18-6-6 6-6'/>
          </svg>
        </button>
      </div>

      <div className="sidenav__divider"></div>

      <div className='sidenav__links'>
        <Link to='/dashboard' className='sidenav__link'>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
            <rect width='7' height='9' x='3' y='3' rx='1'/>
            <rect width='7' height='5' x='14' y='3' rx='1'/>
            <rect width='7' height='9' x='14' y='12' rx='1'/>
            <rect width='7' height='5' x='3' y='16' rx='1'/>
          </svg>
          Dashboard
        </Link>
        
      </div>

    </nav>
  )
}

export default Sidenav