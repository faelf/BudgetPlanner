import { useState } from 'react';
import { Link } from 'react-router-dom'
import Button from '../components/Button.tsx';

interface RegisterForm {
  username: string;
  email: string;
  password: string;
}

type FormError = {
  field: string;
  message: string;
};

function Register() {

  const [error, setError] = useState<FormError | null>(null);

  const [form, setForm] = useState<RegisterForm>({
    username: '',
    email: '',
    password: '',
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error?.field === name) {
      setError(null);
    }
  }

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    
    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
  
      const data = await response.json();

      if (!response.ok) {
        setError(data.detail);
        return
      }

    } catch (error) {
      setError({
        field: 'form',
        message: 'Unable to connect to the server',
      });
    }
  }

  return (
    <form className='form' id='register-user' onSubmit={handleSubmit}>
      <h2 className='form__title' >Register</h2>

      <div className='form__body'>

        <div className='input'>
          <input
            className={`input__field ${
              error?.field === 'username' ? 'input__field--error' : ''
            }`}
            type='text'
            name='username'
            placeholder='Enter your username'
            value={form.username}
            onChange={handleChange}
            autoComplete='username'
          />

          {error?.field === 'username' && (
            <p className='input__error'>
              {error.message}
            </p>
          )}

          <div className='input__icon'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
              <circle cx='12' cy='8' r='5'/>
              <path d='M20 21a8 8 0 0 0-16 0'/>
            </svg>
          </div>
        </div>

        

        <div className='input'>
          <input
            className={`input__field ${error?.field === 'email' ? 'input__field--error' : ''}`}
            type='email'
            name='email'
            placeholder={
              error?.field === 'email'
                ? error.message
                : 'Enter your email'
            }
            value={form.email}
            onChange={handleChange}
            autoComplete='email'
          />
          <div className='input__icon'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
              <path d='m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7'/>
              <rect x='2' y='4' width='20' height='16' rx='2'/>
            </svg>
          </div>
        </div>

        <div className='input'>
          <input className='input__field' type='password' name='password' placeholder='Enter your password' value={form.password} onChange={handleChange} autoComplete="new-password" />
          <div className='input__icon'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
              <path d='M12.4 2.7a2.5 2.5 0 0 1 3.4 0l5.5 5.5a2.5 2.5 0 0 1 0 3.4l-3.7 3.7a2.5 2.5 0 0 1-3.4 0L8.7 9.8a2.5 2.5 0 0 1 0-3.4z'/>
              <path d='m14 7 3 3'/>
              <path d='m9.4 10.6-6.814 6.814A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814'/>
            </svg>
          </div>
        </div>
        
        <Button type='submit' variant='primary'>Register</Button>

      </div>

      {error?.field === 'form' && (
        <p className='form__error'>
          {error.message}
        </p>
      )}

      <p className='form__description'>Already have an account ? <Link to='/auth/login'>Login</Link></p>
    </form>
  );
}

export default Register;