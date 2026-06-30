import { useEffect, useState } from 'react';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadTeams() {
      try {
        const apiUrl = import.meta.env.DEV
          ? '/api/teams/'
          : import.meta.env.VITE_CODESPACE_NAME
            ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
            : 'http://localhost:8000/api/teams/';
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const data = await response.json();
        const list = Array.isArray(data) ? data : data.results || [];
        setTeams(list);
      } catch (err) {
        setError(err.message);
      }
    }

    loadTeams();
  }, []);

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4">Teams</h2>
        {error ? <div className="alert alert-danger">{error}</div> : null}
        <ul className="list-group">
          {teams.map((team) => (
            <li key={team._id || team.id} className="list-group-item">
              <strong>{team.name}</strong> — {team.sport || 'Team'}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
