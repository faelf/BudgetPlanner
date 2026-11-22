import { useState } from 'react';

import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import Header from '../components/layout/Header';

type AuthMode = 'login' | 'register';

export default function Auth() {
  const [mode, setMode] = useState<AuthMode>('login');

  return (
    <div className='d-flex flex-column min-dvh-100'>
      <Header loggedUser={null} />

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