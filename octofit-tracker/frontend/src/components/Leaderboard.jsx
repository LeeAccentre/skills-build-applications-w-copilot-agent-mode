import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api.js';

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/leaderboard/`);
        const data = await response.json();
        const list = Array.isArray(data) ? data : data.results || [];
        setEntries(list);
      } catch (err) {
        setError(err.message);
      }
    }

    loadLeaderboard();
  }, []);

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4">Leaderboard</h2>
        {error ? <div className="alert alert-danger">{error}</div> : null}
        <ul className="list-group">
          {entries.map((entry) => (
            <li key={entry._id || entry.id} className="list-group-item">
              <strong>{entry.rank || '-'}</strong> — {entry.user?.name || entry.name} ({entry.points || 0} pts)
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
