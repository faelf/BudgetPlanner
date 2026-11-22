import { NavLink, Link, useNavigate } from 'react-router-dom';
import ThemeMenu from './ThemeMenu.tsx';

interface User {
  id: string;
  username: string;
  email: string;
}

interface HeaderProps {
  loggedUser: User | null;
}

export default function Header({ loggedUser }: HeaderProps) {
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

    navigate('/auth');
  }

  return (
    <header className='navbar md:navbar-expand bg-1 fg-2'>
      <div className='2xl:container'>
        {!loggedUser && ( <h1 className='navbar-brand m-0'>Budget Planner</h1> )}
        {loggedUser && ( <h1 className='navbar-brand d-none md:d-block m-0'>Budget Planner</h1> )}
        {loggedUser && (
          <button className='btn-icon navbar-toggler' type='button' data-bs-toggle='drawer' data-bs-target='#navbarNav' aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon' aria-hidden='true'></span>
          </button>
        )}
        <dialog className='drawer drawer-start' tabIndex={-1} id='navbarNav' aria-labelledby='navbarNavLabel'>
          <div className='drawer-header'>
            <h5 className='drawer-title' id='navbarNavLabel'>Budget Planner</h5>
            <button type='button' className='btn-close' data-bs-dismiss='drawer' aria-label='Close'></button>
          </div>
          <div className='drawer-body'>
            <ul className='navbar-nav md:mx-auto'>
              {loggedUser && (<>
                <li className='nav-item'>
                  <NavLink className='nav-link' to='/dashboard'>Dashboard</NavLink>
                </li>
                <li className='nav-item'>
                  <button className='nav-link' type='button' data-bs-toggle='menu' aria-expanded='false'>
                    Admin
                  </button>
                  <div className='menu menu-translucent'>
                    <Link className='menu-item' to='/users'>
                      <i className='bi bi-people-fill'></i>
                      <span className='menu-item-content'>
                        Users
                        <small className='menu-item-description'>Manage users details</small>
                      </span>
                    </Link>
                  </div>
                </li>
              </>)}
            </ul>
          </div>
        </dialog>

        {loggedUser ? (<>
          {/* User Menu */}
          <button className='theme-inverse btn-text rounded-pill' type='button' data-bs-toggle='menu' aria-expanded='false'>
            {loggedUser?.username || 'username'}
            <span className='avatar avatar-xs'>
              <img className='avatar-img' src='https://i.pravatar.cc/150?u=rafael' alt='User Picture' />
            </span>
          </button>
          <div className='menu menu-translucent'>
            <Link className='menu-item' to='/profile'>
              <i className='bi bi-person-circle'></i>
              <span className='menu-item-content'>
                Profile
                <small className='menu-item-description'>Edit your personal information</small>
              </span>
            </Link>
            <ThemeMenu menuItem />
            <hr className='menu-divider'/>
            <button className='menu-item theme-danger' onClick={handleLogout}>
              <i className='bi bi-box-arrow-right'></i>
              <span className='menu-item-content'>
                Log out
                <small className='menu-item-description'>End session</small>
              </span>
            </button>
          </div>
          {/* User Menu Ends */}
        </>) : ( <ThemeMenu button /> )}
      </div>
    </header>
  )
}