import { Link } from 'react-router-dom';

import './Sidenav.css';

type SidenavProps = {
  expanded: boolean;
  closeSidebar: () => void;
};

function Sidenav({ expanded, closeSidebar }: SidenavProps) {
  return (
    <nav className='sidenav' data-expanded={expanded} inert={!expanded}>

      <div className='sidenav-header'>
        <button className='header-btn' onClick={closeSidebar}>
          <svg xmlns='http://www.w3.org/2000/svg'viewBox='0 0 24 24'>
            <path d='m15 18-6-6 6-6'/>
          </svg>
        </button>
      </div>

      <div className='sidenav-links'>
        <Link to='/dashboard' className='nav-btn'>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
            <rect width='7' height='9' x='3' y='3' rx='1'/>
            <rect width='7' height='5' x='14' y='3' rx='1'/>
            <rect width='7' height='9' x='14' y='12' rx='1'/>
            <rect width='7' height='5' x='3' y='16' rx='1'/>
          </svg>
          Dashboard
        </Link>
        <Link to='/auth/login' className='nav-btn'>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
            <path d='m16 17 5-5-5-5'/>
            <path d='M21 12H9'/>
            <path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4'/>
          </svg>
          Log out
        </Link>
      </div>

    </nav>
  )
}

export default Sidenav