import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './style/styles.css';

import App from './app/App.tsx';
import Auth from './app/Auth.tsx';

createRoot(document.getElementById('app')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/auth/*' element={<Auth />} />
        <Route path='/*' element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);