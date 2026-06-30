import express from 'express';
import mongoose from 'mongoose';
import { connectToDatabase } from './config/database.js';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models.js';

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());
app.use((req, res, next) => {
  const origin = req.headers.origin;
  const isAllowedOrigin = (value: string | undefined) => {
    if (!value) return false;

    try {
      const { hostname } = new URL(value);
      return (
        hostname === 'localhost' ||
        hostname === '127.0.0.1' ||
        hostname === '[::1]' ||
        hostname.endsWith('.app.github.dev')
      );
    } catch {
      return false;
    }
  };

  if (origin && isAllowedOrigin(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Vary', 'Origin');
  } else {
    res.header('Access-Control-Allow-Origin', '*');
  }

  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  return next();
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', baseUrl });
});

app.get('/api/users/', async (_req, res) => {
  const users = await User.find().lean();
  res.json(users);
});

app.post('/api/users/', async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});

app.get('/api/teams/', async (_req, res) => {
  const teams = await Team.find().populate('members').lean();
  res.json(teams);
});

app.post('/api/teams/', async (req, res) => {
  const team = await Team.create(req.body);
  res.status(201).json(team);
});

app.get('/api/activities/', async (_req, res) => {
  const activities = await Activity.find().populate('user').lean();
  res.json(activities);
});

app.post('/api/activities/', async (req, res) => {
  const activity = await Activity.create(req.body);
  res.status(201).json(activity);
});

app.get('/api/leaderboard/', async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find().populate('user').lean();
  res.json(leaderboard);
});

app.post('/api/leaderboard/', async (req, res) => {
  const entry = await LeaderboardEntry.create(req.body);
  res.status(201).json(entry);
});

app.get('/api/workouts/', async (_req, res) => {
  const workouts = await Workout.find().lean();
  res.json(workouts);
});

app.post('/api/workouts/', async (req, res) => {
  const workout = await Workout.create(req.body);
  res.status(201).json(workout);
});

connectToDatabase()
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Backend running on port ${PORT}`);
      console.log(`API base URL: ${baseUrl}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection failed', error);
    process.exit(1);
  });
