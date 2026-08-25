import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../components/layout/Header.tsx';
import Navmain from '../components/layout/Navmain.tsx';
import ProtectedRoute from '../components/routing/ProtectedRoute.tsx';
import Dashboard from '../pages/Dashboard.tsx';
import Profile from '../pages/Profile.tsx';

import './App.css';

interface User {
  id: string;
  username: string;
  email: string;
}

function App() {
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

  const [expanded, setExpanded] = useState(false);

  return (
    <ProtectedRoute checkingSession={checkingSession} loggedUser={loggedUser}>
      <div className='logged-in'>
        <Navmain closeSidebar={() => setExpanded(prev => !prev)} expanded={expanded} />
        <Header openSidebar={() => setExpanded(prev => !prev)} loggedUser={loggedUser} />
        <main className='main-content'>
          <div className="main-content__inner">
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='profile' element={<Profile />} />
            </Routes>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

export default App;