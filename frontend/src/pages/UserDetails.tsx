import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingScreen from '../components/layout/LoadingScreen.tsx';
import ErrorScreen from '../components/layout/ErrorScreen.tsx';
import Modal from '../components/layout/Modal.tsx';

interface User {
  id: string;
  username: string;
  email: string;
}

export default function UserDetails() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadUser() {
      try {
        const response = await fetch(`/api/user/get/${userId}`);

        if (!response.ok) {
          throw new Error(
            response.status === 404
              ? 'User not found.'
              : `Request failed with status ${response.status}`
          );
        }

        const data: User = await response.json();

        if (!cancelled) {
          setUser(data);
          setUsername(data.username);
          setEmail(data.email);
        }
      } catch (err) {
        if (!cancelled) {
          setLoadError(err instanceof Error ? err.message : 'Something went wrong');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadUser();

    return () => {
      cancelled = true;
    };
  }, [userId]);

  async function handleDelete() {
    setDeleting(true);
    setDeleteError(null);

    try {
      const response = await fetch(`/api/user/delete/${userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(
          response.status === 404
            ? 'This user no longer exists.'
            : `Request failed with status ${response.status}`
        );
      }

      navigate('/users', { replace: true });
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : 'Something went wrong');
      setDeleting(false);
    }
  }

  if (loading) return <LoadingScreen message='Loading user...' />;
  if (loadError) return <ErrorScreen />;

  return (
    <div className='2xl:container'>
      <div className='d-flex justify-content-between align-items-center mb-5 bg-1 rounded-8 p-5 shadow-lg'>
        <div>
          <h2>User Details</h2>
          <p className='text-secondary mb-0'>Manage user information</p>
        </div>

        <Modal
          id='deleteUserDialog'
          theme='danger'
          buttonLabel={<><i className='bi bi-trash me-2'></i>Delete User</>}
          title='Delete user'
          message='This will permanently delete this user. This cannot be undone.'
          footer={
            <button type='button' className='theme-danger btn-solid' onClick={handleDelete} disabled={deleting} >
            {deleting ? 'Deleting...' : 'Delete'}
            </button>
          }
        />
      </div>

      {deleteError && <p className='text-danger'>{deleteError}</p>}

      <div className="bg-1 p-5 shadow-lg bg-1 rounded-8">
        <h4 className='mb-5'>Login Information</h4>
        <div className='row'>
          {/* Personal information */}
          <div className='md:col-6'>
            <form className='h-100'>
              <div className='mb-5'>
                <label htmlFor='userId' className='form-label'>User ID</label>
                <input type='text' className='form-control' id='userId' value={userId ?? ''} disabled />
              </div>
              <div className='mb-5'>
                <label htmlFor='username' className='form-label'>Username</label>
                <input
                  type='text'
                  className='form-control'
                  id='username'
                  placeholder='Enter username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className='mb-5'>
                <label htmlFor='email' className='form-label'> Email Address </label>
                <input
                  type='email'
                  className='form-control'
                  id='email'
                  placeholder='Enter email address'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='d-flex justify-content-end gap-3'>
                <button
                  type='button'
                  className='btn-solid theme-secondary'
                  onClick={() => {
                    setUsername(user?.username ?? '');
                    setEmail(user?.email ?? '');
                  }}
                >
                  <i className='bi bi-arrow-counterclockwise me-2'></i>
                  Reset
                </button>
                <button type='submit' className='btn-solid theme-primary'>
                  <i className='bi bi-check-lg me-2'></i>
                  Save Changes
                </button>
              </div>
            </form>
          </div>
          {/* Password management */}
          <div className='md:col-6'>
            <form className='h-100 d-flex flex-column'>
              <div className='mb-5'>
                <label htmlFor='newPassword' className='form-label'> New Password </label>
                <input type='password' className='form-control' id='newPassword' placeholder='Enter new password' autoComplete='new-password' />
              </div>
              <div className='mb-5'>
                <label htmlFor='confirmPassword' className='form-label'> Confirm New Password </label>
                <input type='password' className='form-control' id='confirmPassword' placeholder='Confirm new password' autoComplete='new-password' />
              </div>
              <div className='d-flex justify-content-end gap-3 mt-auto'>
                <button type='submit' className='btn-solid theme-secondary'>
                  <i className='bi bi-key me-2'></i>
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
