import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../components/layout/Header.tsx';
import ProtectedRoute from '../components/routing/ProtectedRoute.tsx';
import Dashboard from '../pages/Dashboard.tsx';
import Profile from '../pages/Profile.tsx';
import Users from '../pages/Users.tsx';

interface User {
  id: string;
  username: string;
  email: string;
}

export default function App() {
  const [checkingSession, setCheckingSession] = useState(true);
  const [loggedUser, setLoggedUser] = useState<User | null>(null);

  useEffect(() => {
    async function checkSession() {
      const response = await fetch('/api/auth/me', {
        credentials: 'include',
      });

      if (response.ok) {
        const user = await response.json();
        setLoggedUser(user);
        setCheckingSession(false);
      }

      if (!response.ok) {
        setCheckingSession(false);
        return;
      }
    }
    
    checkSession();
  }, []);

  return (
    <ProtectedRoute checkingSession={checkingSession} loggedUser={loggedUser}>
      <Header loggedUser={loggedUser} />
      <main>
        <div className='px-5'>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='profile' element={<Profile />} />
            <Route path='users' element={<Users />} />
          </Routes>
        </div>
      </main>
    </ProtectedRoute>
  );
}