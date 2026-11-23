import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Header from './components/layout/Header.tsx';
import LoadingScreen from './components/layout/LoadingScreen.tsx';
import ErrorScreen from './components/layout/ErrorScreen.tsx';
import Auth from './pages/Auth.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Profile from './pages/Profile.tsx';
import Users from './pages/Users.tsx';
import UserDetails from './pages/UserDetails.tsx';

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
    return <LoadingScreen message='Checking session...' />;
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
        <Route path='users/:userId' element={<UserDetails />} />
        <Route path='*' element={<ErrorScreen title='Page not found' message='The page you are looking for does not exist.' />} />
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