import { useState } from 'react';
import { Link } from 'react-router-dom';

interface RegisterForm {
  username: string;
  email: string;
  password: string;
};

type FormError = {
  field: string;
  message: string;
};

export default function Register() {

  const [error, setError] = useState<FormError | null>(null);

  const [form, setForm] = useState<RegisterForm>({
    username: '',
    email: '',
    password: '',
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setForm((prev) => ({ ...prev, [name]: value, }));

    if (error?.field === name) { setError(null); }
  }

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    
    try {
      const response = await fetch('/api/user/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
  
      const data = await response.json();

      if (!response.ok) { setError(data.detail); return }

    } catch (error) {
      setError({
        field: 'form',
        message: 'Unable to connect to the server',
      });
    }
  }

  return (
    <form className='card w-50' id='register-user' onSubmit={handleSubmit} style={{ maxWidth: '100%', width: '350px' }}>

      <div className='card-header'>
        <h2 className='m-0'>Register</h2>
      </div>

      <div className='card-body'>

        <label className={`form-control form-adorn ${ error?.field === 'username' ? 'is-invalid' : '' } `}>
          <div className='form-adorn-icon' aria-hidden='true'>
            <i className="bi bi-person-fill"></i>
          </div>
          <input
            className='form-ghost'
            type='text'
            name='username'
            placeholder='Enter your username'
            value={form.username}
            onChange={handleChange}
            autoComplete='username'
          />
        </label>

        <label className={`form-control form-adorn ${ error?.field === 'username' ? 'is-invalid' : '' } `}>
          <div className='form-adorn-icon' aria-hidden='true'>
            <i className="bi bi-envelope-fill"></i>
          </div>
          <input
            className='form-ghost'
            type='email'
            name='email'
            placeholder={ error?.field === 'email' ? error.message : 'Enter your email' }
            value={form.email}
            onChange={handleChange}
            autoComplete='email'
          />
        </label>

        <label className='form-control form-adorn'>
          <div className='form-adorn-icon' aria-hidden='true'>
            <i className="bi bi-key-fill"></i>
          </div>
          <input
            className='form-ghost'
            type='password'
            name='password'
            placeholder='Enter your password'
            value={form.password}
            onChange={handleChange}
            autoComplete='new-password'
          />
        </label>

        <button type='submit' className='theme-primary btn-solid w-100'>Register</button>

        {error && (
          <div className='alert theme-danger d-flex align-items-center'>
              <i className="bi bi-exclamation-circle-fill"></i>
              <p>{error.message}</p>
            </div>
        )}

        <p className='text-center'>Already have an account ? <Link to='/auth/login'>Login</Link></p>
      </div>
    </form>
  );
}