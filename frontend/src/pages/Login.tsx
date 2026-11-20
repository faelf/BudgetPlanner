import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'

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
        credentials: 'include',
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
    <form className='card w-50' onSubmit={submit} autoComplete='on' style={{ maxWidth: '100%', width: '350px' }}>

      <div className='card-header'>
        <h2 className='m-0'>Login</h2>
      </div>

      <div className='card-body'>
        <label className='form-control form-adorn'>
          <div className='form-adorn-icon' aria-hidden='true'>
            <i className="bi bi-person-fill"></i>
          </div>
          <input className='form-ghost' type='text' name='username' id='username-input' placeholder='Enter your username' autoComplete='username' value={form.username} onChange={handleChange}/>
        </label>
        <label className='form-control form-adorn'>
          <div className='form-adorn-icon' aria-hidden='true'>
            <i className="bi bi-key-fill"></i>
          </div>
          <input className='form-ghost' type='password' name='password' id='password-input' placeholder='Enter your password' autoComplete='current-password' value={form.password} onChange={handleChange}/>
        </label>
        <button type='submit' className='theme-primary btn-solid w-100'>Login</button>

        {error && ( <div className='alert theme-danger d-flex align-items-center'>
            <i className="bi bi-exclamation-circle-fill"></i>
            <p>{error}</p>
          </div> )}

        <div className='text-center'>Don't have an account ? <Link to='/auth/register'>Register</Link></div>
      </div>
    </form>
  )
}

export default Login