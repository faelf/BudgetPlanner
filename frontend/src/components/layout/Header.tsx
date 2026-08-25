import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

interface User {
  id: string;
  username: string;
  email: string;
}

interface HeaderProps {
  openSidebar: () => void;
  loggedUser: User | null;
}

function Header({ openSidebar, loggedUser }: HeaderProps) {
  const navigate = useNavigate();

  async function handleLogout() {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      console.log('Logout failed');
      return;
    }

    navigate('/auth/login');
  }

  return (
    <header className='main-header'>

      <button className='main-header__burger-btn' onClick={openSidebar}>
        <svg xmlns='http://www.w3.org/2000/svg'viewBox='0 0 24 24'>
          <path d='M4 5h16'/>
          <path d='M4 12h16'/>
          <path d='M4 19h16'/>
        </svg>
      </button>

      <div className="spacer"></div>

      <div className='user-menu'>

        <button className='user-menu__btn' popoverTarget='user-menu' popoverTargetAction='toggle'>
          <span className='user-menu__prof-pic'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
              <circle cx='12' cy='8' r='5' />
              <path d='M20 21a8 8 0 0 0-16 0' />
            </svg>
          </span>
          <span className='user-menu__indicator'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
              <circle cx='12' cy='12' r='10'/>
              <path d='m16 10-4 4-4-4'/>
            </svg>
          </span>
        </button>

        <dialog id='user-menu' className='user-menu__dialog' popover=''>
          <div className='user-menu__header'>
            <span className='user-menu__username'>{loggedUser?.username || 'username'}</span>
            <span className='user-menu__email'>{loggedUser?.email || 'example@mail.com'}</span>
          </div>
          <div className='user-menu__divider'></div>
          <Link to='/profile' className='user-menu__item'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
              <path d='M2 21a8 8 0 0 1 10.821-7.487'/>
              <path d='M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z'/>
              <circle cx='10' cy='8' r='5'/>
            </svg>
            <span>Profile</span>
          </Link>
          <button onClick={handleLogout} className='user-menu__item'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
              <path d='m16 17 5-5-5-5'/>
              <path d='M21 12H9'/>
              <path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4'/>
            </svg>
            <span>Log out</span>
          </button>
        </dialog>
      </div>
    </header>
  )
}

export default Header