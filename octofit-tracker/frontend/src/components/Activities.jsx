import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api.js';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadActivities() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/activities/`);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const data = await response.json();
        const list = Array.isArray(data) ? data : data.results || [];
        setActivities(list);
      } catch (err) {
        setError(err.message);
      }
    }

    loadActivities();
  }, []);

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h4">Activities</h2>
        {error ? <div className="alert alert-danger">{error}</div> : null}
        <ul className="list-group">
          {activities.map((activity) => (
            <li key={activity._id || activity.id} className="list-group-item">
              <strong>{activity.type}</strong> — {activity.durationMinutes} min, {activity.calories} cal
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
