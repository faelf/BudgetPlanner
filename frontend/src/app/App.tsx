import { useState } from 'react';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../components/Header.tsx';
import Sidenav from '../components/Sidenav.tsx';
import Dashboard from '../pages/Dashboard.tsx';
import Profile from '../pages/Profile.tsx';

import './App.css';

interface User {
  id: string;
  username: string;
  email: string;
}

function App() {

  const [loggedUser, setLoggedUser] = useState<User | null>(null);

  useEffect(() => {
    async function checkSession() {
      const response = await fetch('/api/auth/me', {
        credentials: 'include',
      });

      if (!response.ok) {
        console.log('User is not logged in');
        return;
      }

      const user = await response.json();

      setLoggedUser(user);
    }

    checkSession();
  }, []);

  const [expanded, setExpanded] = useState(false);

  return (
    <div className='logged-in'>
      <Sidenav closeSidebar={() => setExpanded(prev => !prev)} expanded={expanded} />
      <Header openSidebar={() => setExpanded(prev => !prev)} loggedUser={loggedUser} />
      <main className='main-content'>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='profile' element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;