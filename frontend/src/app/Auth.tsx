import { Route, Routes } from 'react-router-dom';

import Login from '../pages/Login';
import Register from '../pages/Register';

export default function Auth() {
  return (
    <>
    <header className='d-flex justify-content-between align-items-center py-3 px-5 mb-5 bg-1'>
      <h1 className='h4 mb-0' >Budget Planner</h1>
      <button type='button' className='theme-primary btn-solid btn-styled rounded-pill' data-bs-toggle='menu' data-bs-placement='bottom' aria-expanded='false'>
        <i className="bi bi-palette-fill"></i>
        <span>Change Theme</span>
      </button>
      <div className='menu'>
        <button className='menu-item' type='button'>
          <i className="bi bi-brightness-high-fill"></i>
          <span>Light</span>
        </button>
        <button className='menu-item' type='button'>
          <i className='bi bi-moon-stars-fill'></i>
          <span>Dark</span>
        </button>
      </div>
    </header>

    <main className='container d-flex justify-content-center align-items-center'>
      <Routes>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
      </Routes>
    </main>
    </>
  );
}