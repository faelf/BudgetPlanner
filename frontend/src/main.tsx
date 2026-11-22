import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Header from './components/layout/Header.tsx';
import Auth from './pages/Auth.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Profile from './pages/Profile.tsx';
import Users from './pages/Users.tsx';

import './style/styles.css';

interface User {
  id: string;
  username: string;
  email: string;
}

interface ProtectedRouteProps {
  checkingSession: boolean;
  loggedUser: User | null;
  children: React.ReactNode;
}

function ProtectedRoute({ checkingSession, loggedUser, children }: ProtectedRouteProps) {
  if (checkingSession) {
    return null;
  }

  if (!loggedUser) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}

function AuthenticatedApp() {
  const [checkingSession, setCheckingSession] = useState(true);
  const [loggedUser, setLoggedUser] = useState<User | null>(null);

  useEffect(() => {
    async function checkSession() {
      try {
        const response = await fetch('/api/auth/me', {
          credentials: 'include',
        });

        if (response.ok) {
          const user = await response.json();
          setLoggedUser(user);
        }
      } catch {
        // Server unreachable: treat as not logged in
      } finally {
        setCheckingSession(false);
      }
    }

    checkSession();
  }, []);

  return (<>
    <Header loggedUser={loggedUser} />
    <ProtectedRoute checkingSession={checkingSession} loggedUser={loggedUser}>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='users' element={<Users />} />
        <Route path='profile' element={<Profile />} />
      </Routes>
    </ProtectedRoute>
  </>);
}

createRoot(document.getElementById('app')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/auth' element={<Auth />} />
        <Route path='/*' element={<AuthenticatedApp />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);