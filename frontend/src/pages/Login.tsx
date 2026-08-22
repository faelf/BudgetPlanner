import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button.tsx';

interface LoginForm {
  username: string;
  password: string;
}

function Login() {
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<LoginForm>({
    username: "",
    password: "",
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });

    setError(null);
  }

  async function submit( event: React.SubmitEvent<HTMLFormElement> ): Promise<void> {
    event.preventDefault();

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail);
        return;
      }

      navigate('/dashboard');

    } catch {
      setError('Unable to connect to the server');
    }
  }
  
  return (
    <form className='form' onSubmit={submit} autoComplete='on'>

      <h2 className='form__title'>Login</h2>

      <div className='form__body'>

        <div className='input'>
          <input className='input__field' type='text' name='username' id='username-input' placeholder='Enter your username' autoComplete='username' value={form.username} onChange={handleChange}/>
          <div className='input__icon'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
              <circle cx='12' cy='8' r='5'/>
              <path d='M20 21a8 8 0 0 0-16 0'/>
            </svg>
          </div>
        </div>

        <div className='input'>
          <input className='input__field' type='password' name='password' id='password-input' placeholder='Enter your password' autoComplete='current-password' value={form.password} onChange={handleChange}/>
          <div className='input__icon'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
              <path d='M12.4 2.7a2.5 2.5 0 0 1 3.4 0l5.5 5.5a2.5 2.5 0 0 1 0 3.4l-3.7 3.7a2.5 2.5 0 0 1-3.4 0L8.7 9.8a2.5 2.5 0 0 1 0-3.4z'/>
              <path d='m14 7 3 3'/>
              <path d='m9.4 10.6-6.814 6.814A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814'/>
            </svg>
          </div>
        </div>

        <Button type='submit' variant='primary'>Login</Button>
      </div>
      
      {error && (<p className='form__error'>{error}</p>)}

      <p className='form__description'>Don't have an account ? <Link to='/auth/register'>Register</Link></p>
    </form>
  )
}

export default Login