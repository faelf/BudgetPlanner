import { useEffect, useState } from 'react';
import Table from '../components/content/Table.tsx';

// Matches UserResponse from the backend.
interface User {
  id: string;
  username: string;
  email: string;
}

// Describes the columns. `key` is the property read from each row.
const columns = [
  { key: 'username', label: 'User' },
  { key: 'email', label: 'Email Address' },
];

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await fetch('api/user/get/all');

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

  // Picks only the fields the table displays.
  const rows = users.map((u) => ({ username: u.username, email: u.email }));

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Could not load users: {error}</p>;

  return (
    <div className='2xl:container'>
      <h2>Users</h2>
      <Table columns={columns} rows={rows} />
    </div>
  );
}