import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';
import './App.css';

function Home() {
  return (
    <div className="container py-4">
      <h1 className="display-5 mb-4">OctoFit Tracker</h1>
      <p className="lead">A modern multi-tier fitness dashboard for teams, activities, and progress.</p>
      <div className="d-flex flex-wrap gap-2 mb-4">
        <Link className="btn btn-primary" to="/users">Users</Link>
        <Link className="btn btn-outline-primary" to="/teams">Teams</Link>
        <Link className="btn btn-outline-primary" to="/activities">Activities</Link>
        <Link className="btn btn-outline-primary" to="/leaderboard">Leaderboard</Link>
        <Link className="btn btn-outline-primary" to="/workouts">Workouts</Link>
      </div>
      <div className="alert alert-info">
        Define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> for Codespaces URLs. When it is unset, the app uses <code>http://localhost:8000</code>.
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </BrowserRouter>
  );
}
