import { Route, Routes } from 'react-router-dom';

import Login from '../pages/Login';
import Register from '../pages/Register';

function Auth() {
  return (
    <main className='main-auth'>
      <Routes>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
      </Routes>
    </main>
  );
}

export default Auth;