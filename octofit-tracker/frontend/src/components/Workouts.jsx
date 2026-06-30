import { useEffect, useState } from 'react';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const apiUrl = import.meta.env.DEV
          ? '/api/workouts/'
          : import.meta.env.VITE_CODESPACE_NAME
            ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
            : 'http://localhost:8000/api/workouts/';
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const data = await response.json();
        const list = Array.isArray(data) ? data : data.results || [];
        setWorkouts(list);
      } catch (err) {
        setError(err.message);
      }
    }

    loadWorkouts();
  }, []);

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4">Workouts</h2>
        {error ? <div className="alert alert-danger">{error}</div> : null}
        <ul className="list-group">
          {workouts.map((workout) => (
            <li key={workout._id || workout.id} className="list-group-item">
              <strong>{workout.name}</strong> — {workout.type} ({workout.durationMinutes} min)
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
