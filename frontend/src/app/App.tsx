import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../components/Header.tsx';
import Sidenav from '../components/Sidenav.tsx';
import Dashboard from '../pages/Dashboard.tsx';
import Settings from '../pages/Settings.tsx';

import './App.css';

function App() {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <Header openSidebar={() => setExpanded(true)} />

      <Sidenav closeSidebar={() => setExpanded(false)} expanded={expanded} />

      <main className='main-content'>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='settings' element={<Settings />} />
        </Routes>
      </main>
    </>
  );
}

export default App;