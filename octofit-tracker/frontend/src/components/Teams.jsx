import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api.js';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadTeams() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/teams/`);
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
