import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Table from '../components/content/Table.tsx';
import LoadingScreen from '../components/layout/LoadingScreen.tsx';
import ErrorScreen from '../components/layout/ErrorScreen.tsx';

// Matches UserResponse from the backend.
interface User {
  id: string;
  username: string;
  email: string;
}

// Describes the columns displayed in the table.
// The ID is intentionally excluded.
const columns = [
  { key: 'username', label: 'Username' },
  { key: 'email', label: 'Email Address' },
];

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  // Fetches all users from the backend.
  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await fetch('/api/user/get/all', {
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data: User[] = await response.json();
        setUsers(data);

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  // Maps user data into table rows.
  // The ID is retained for navigation but isn't displayed.
  const rows = users.map((u) => ({
    id: u.id,
    username: u.username,
    email: u.email,
  }));

  if (loading) return <LoadingScreen message='Loading users table ...' />;
  if (error) return <ErrorScreen />;

  return (
    <div className='2xl:container'>
      <h2>Users</h2>

      <Table
        columns={columns}
        rows={rows}
        onRowClick={(row) => navigate(`/users/${row.id}`)}
      />
    </div>
  );
}
