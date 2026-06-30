import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models.js';
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';
async function seed() {
    console.log('Seed the octofit_db database with test data');
    await mongoose.connect(MONGO_URI);
    const db = mongoose.connection.db;
    if (db) {
        await db.dropDatabase().catch(() => undefined);
    }
    const users = await User.insertMany([
        {
            name: 'Avery Chen',
            email: 'avery@example.com',
            age: 29,
            fitnessGoal: 'Build endurance',
            location: 'Seattle'
        },
        {
            name: 'Mina Patel',
            email: 'mina@example.com',
            age: 31,
            fitnessGoal: 'Increase strength',
            location: 'Austin'
        },
        {
            name: 'Jordan Kim',
            email: 'jordan@example.com',
            age: 27,
            fitnessGoal: 'Improve mobility',
            location: 'Denver'
        }
    ]);
    const teams = await Team.insertMany([
        {
            name: 'Peak Performers',
            sport: 'Running',
            city: 'Seattle',
            members: [users[0]._id, users[1]._id]
        },
        {
            name: 'Momentum Squad',
            sport: 'CrossFit',
            city: 'Austin',
            members: [users[2]._id]
        }
    ]);
    await Activity.insertMany([
        {
            user: users[0]._id,
            type: 'Run',
            durationMinutes: 35,
            calories: 320,
            date: new Date('2026-06-29')
        },
        {
            user: users[1]._id,
            type: 'Strength',
            durationMinutes: 50,
            calories: 410,
            date: new Date('2026-06-28')
        },
        {
            user: users[2]._id,
            type: 'Yoga',
            durationMinutes: 30,
            calories: 180,
            date: new Date('2026-06-27')
        }
    ]);
    await LeaderboardEntry.insertMany([
        {
            user: users[0]._id,
            points: 1240,
            rank: 1,
            streak: 6
        },
        {
            user: users[1]._id,
            points: 1180,
            rank: 2,
            streak: 4
        },
        {
            user: users[2]._id,
            points: 1090,
            rank: 3,
            streak: 2
        }
    ]);
    await Workout.insertMany([
        {
            name: 'HIIT Cardio',
            type: 'Cardio',
            durationMinutes: 25,
            difficulty: 'Intermediate',
            focusArea: 'Endurance',
            equipment: 'bike'
        },
        {
            name: 'Power Strength',
            type: 'Strength',
            durationMinutes: 40,
            difficulty: 'Advanced',
            focusArea: 'Upper body',
            equipment: 'dumbbells'
        },
        {
            name: 'Recovery Flow',
            type: 'Mobility',
            durationMinutes: 20,
            difficulty: 'Beginner',
            focusArea: 'Flexibility',
            equipment: 'mat'
        }
    ]);
    console.log('Seed data inserted successfully');
    console.log(`Teams created: ${teams.length}`);
    await mongoose.disconnect();
}
seed().catch((error) => {
    console.error('Seeding failed', error);
    process.exit(1);
});
