import { useState } from 'react';

import Login from '../components/auth/Login';
import Register from '../components/auth/Register';

type AuthMode = 'login' | 'register';

export default function Auth() {
  const [mode, setMode] = useState<AuthMode>('login');

  return (
    <div className='d-flex flex-column min-dvh-100'>
      <header className='d-flex justify-content-between align-items-center py-3 px-5'>

        <h1 className='h4 mb-0'>Budget Planner</h1>

        <button type='button' className='theme-inverse btn-sm btn-text rounded-pill' data-bs-toggle='menu' data-bs-placement='bottom' aria-expanded='false'>
          <i className='bi bi-palette-fill'></i>
          <span>Change Theme</span>
        </button>

        <div className='menu'>
          <button className='menu-item' type='button'>
            <i className='bi bi-brightness-high-fill'></i>
            <span>Light</span>
          </button>
          <button className='menu-item' type='button'>
            <i className='bi bi-moon-stars-fill'></i>
            <span>Dark</span>
          </button>
        </div>
      </header>

      <main className='d-flex justify-content-center align-items-center flex-grow-1'>
        <div>
          {mode === 'login' ? (
            <Login onSwitchToRegister={() => setMode('register')} />
          ) : (
            <Register onSwitchToLogin={() => setMode('login')} />
          )}
        </div>
      </main>
    </div>
  );
}