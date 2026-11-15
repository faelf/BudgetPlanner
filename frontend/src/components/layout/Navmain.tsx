import { Link } from 'react-router-dom';

import './Navmain.css';

type NavmainProps = {
  expanded: boolean;
  closeSidebar: () => void;
};

function Navmain({ expanded, closeSidebar }: NavmainProps) {
  return (
    <nav className='nav-main' data-expanded={expanded}>
      <div className='nav-main__inner'>
        <div className='nav-main__header'>
          <span className='nav-main__title'>Budget Planner</span>
          <button className='nav-main__btn' onClick={closeSidebar}>
            <svg xmlns='http://www.w3.org/2000/svg'viewBox='0 0 24 24'>
              <path d='m15 18-6-6 6-6'/>
            </svg>
          </button>
        </div>

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

          <div className='nav-main__divider'></div>

          <Link to='/users' className='nav-main__link'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
              <path d='M18 21a8 8 0 0 0-16 0'/>
              <circle cx='10' cy='8' r='5'/>
              <path d='M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3'/>
            </svg>
            <span>Users</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navmain