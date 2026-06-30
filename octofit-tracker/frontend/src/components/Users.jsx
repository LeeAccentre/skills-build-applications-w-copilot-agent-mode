import { useEffect, useState } from 'react';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadUsers() {
      try {
        const apiUrl = import.meta.env.DEV
          ? '/api/users/'
          : import.meta.env.VITE_CODESPACE_NAME
            ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
            : 'http://localhost:8000/api/users/';
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const data = await response.json();
        const list = Array.isArray(data) ? data : data.results || [];
        setUsers(list);
      } catch (err) {
        setError(err.message);
      }
    }

    loadUsers();
  }, []);

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4">Users</h2>
        {error ? <div className="alert alert-danger">{error}</div> : null}
        <ul className="list-group">
          {users.map((user) => (
            <li key={user._id || user.id} className="list-group-item">
              <strong>{user.name}</strong> — {user.email}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
