import { NavLink, Link, useNavigate } from 'react-router-dom';
import ThemeMenu from './ThemeMenu.tsx';

interface User {
  id: string;
  username: string;
  email: string;
}

interface NavProps {
  loggedUser: User | null;
}

export default function Header({ loggedUser }: NavProps) {
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
    <header className='d-flex justify-content-between align-items-center py-3 px-5 bg-1'>
      <h1 className='h4 mb-0' >Budget Planner</h1>
      <nav data-bs-toggle='nav-overflow'>
        <ul className='nav nav-pills'>
          <li className='nav-item'>
            <NavLink className='nav-link' to='/dashboard'>Dashboard</NavLink>
          </li>
          <li className='nav-item'>
            <button className='nav-link' type='button' data-bs-toggle='menu' aria-expanded='false'>
              Management
            </button>
            <div className='menu menu-translucent'>
              <Link className='menu-item' to='/users'>
                <i className="bi bi-people-fill"></i>
                <span className="menu-item-content">
                  Users
                  <small className="menu-item-description">Manage users details</small>
                </span>
              </Link>
            </div>
          </li>
        </ul>
      </nav>

      {/* User Menu */}
      <button className='theme-inverse btn-text rounded-pill' type='button' data-bs-toggle='menu' aria-expanded='false'>
        {loggedUser?.username || 'username'}
        <span className='avatar avatar-xs'>
          <img className='avatar-img' src='https://i.pravatar.cc/150?u=rafael' alt='User Picture' />
        </span>
      </button>
      <div className='menu menu-translucent'>
        <Link className='menu-item' to='/profile'>
          <i className="bi bi-person-circle"></i>
          <span className="menu-item-content">
            Profile
            <small className="menu-item-description">Edit your personal information</small>
          </span>
        </Link>
        <ThemeMenu menuItem />
        <hr className='menu-divider'/>
        <button className='menu-item theme-danger' onClick={handleLogout}>
          <i className="bi bi-box-arrow-right"></i>
          <span className="menu-item-content">
            Log out
            <small className="menu-item-description">End session</small>
          </span>
        </button>
      </div>
      {/* User Menu Ends */}
    </header>
  )
}