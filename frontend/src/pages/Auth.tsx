import { useState } from 'react';

import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import ThemeMenu from '../components/layout/ThemeMenu';

type AuthMode = 'login' | 'register';

export default function Auth() {
  const [mode, setMode] = useState<AuthMode>('login');

  return (
    <div className='d-flex flex-column min-dvh-100'>
      <header className='d-flex justify-content-between align-items-center py-3 px-5'>
        <h1 className='h4 mb-0'>Budget Planner</h1>
        <ThemeMenu button />
      </header>

      <main className='d-flex justify-content-center align-items-center flex-grow-1'>
        {mode === 'login' ? (
          <Login onSwitchToRegister={() => setMode('register')} />
        ) : (
          <Register onSwitchToLogin={() => setMode('login')} />
        )}
      </main>
    </div>
  );
}